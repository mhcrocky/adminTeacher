<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

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
    public function approveRequest(Request $request,$id)
    {
        # code...
    }
    public function getUser(Request $request,$id)
    {
      if(!User::find($id)){
        return response()->json(['msg'=>'User not found'], 404,);
      }
      //TODO: check authticated user can access this user's data.
      if($request->user()->hasAccess($id)){
          $treeData = User::find($id)->getTreeData();
          $treeData['data'] = User::find($id);
          $parent = User::find($id)->parent;
          if($parent){
              $treeData['data']['parent'] = [
                  'code'=>$parent->id,
                  'name'=>$parent->name,
                  'img_url'=>$parent->img_url
              ];
          }
          $treeData['parentData'] = User::find($id)->parentData();
          $treeData['childData'] = User::find($id)->childData();
          return response()->json($treeData,200);
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
