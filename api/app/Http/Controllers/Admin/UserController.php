<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Membership;
class UserController extends Controller
{
    public function setParent(Request $request,$id,$parent_id)
    {
        //check can add child;
        //check can access user
        //check max child count
        $user = User::find($id)->update(['parent_id'=>$parent_id]);
        return $user;
    }
    public function addChild(Request $request,$id,$child_id)
    {
        //check can add child;
        //check can access user
        //check max child count
        $user = User::find($child_id)->update(['parent_id'=>$id]);
        return $user;
    }
    ///admin features
    public function approveRequest(Request $request,$id)
    {
        Membership::where(['id'=>$id])->update(['status'=>'active']);
    }
    public function getAllRequest(Request $request)
    {
        $memberships = Membership::where(['status'=>'pending'])->get();
        $data = [];
        foreach ($memberships as $membership) {
            $membership->user;
            $membership->updater;
            array_push($data,$membership);
        }
        return response()->json($data,200);
    }
    ///end admin features
    public function getUser(Request $request,$id)
    {
      if(!User::find($id)){
        return response()->json(['msg'=>'User not found'], 404,);
      }
      $user = User::find($id);
      if($user->status == 'deactive'){
        return response()->json($user,200);
      }                 
      //TODO: check authticated user can access this user's data.
      if($request->user()->hasAccess($id)){
          $data =$user->getTreeData();
          $data['data'] =$user;
          $parent =$user->parent;
          if($parent){
              $data['data']['parent'] = [
                  'code'=>$parent->id,
                  'name'=>$parent->name,
                  'img_url'=>$parent->img_url
              ];
          }
          $data['childData'] = User::find($id)->childData();
          $availity = $user->availity();
          $data['data']['availity'] = $availity;

          return response()->json($data,200);
      }else{
          return response()->json(['msg'=>'permision error'], 403,);
      }
    }
    public function storeUser (Request $request,$id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
        ]);
        // return $request->id;
        $user = User::updateOrCreate([
            'id'=>$request->id,
        ],[
            'id'=>$request->id,
            'name'=>$request->name,
            'email'=>$request->email,
        ]);
        return response()->json($user);
    }

}
