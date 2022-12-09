<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\User;
class UserController extends Controller
{

    public function storeUser (Request $request,)
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
    public function getUser(Request $request,$id = 0)
    {
        return response()->json(User::find($id));
    }
    public function children(Request $request ,$id  = 0)
    {
        if(User::find($id)){
            return response()->json(User::find($id)->baby );
        }
    }
    public function allChildren(Request $request )
    {
        return response()->json( $request->user()->allChildren());
    }
    public function parents(Request $request ,$id)
    {
        if(User::find($id)){
            return response()->json(User::find($id)->parent);
        }
    }
    public function getTreeData(Request $request )
    {
        $d = $request->user()->getTreeData();
        return response()->json($d,200);
    }
}
