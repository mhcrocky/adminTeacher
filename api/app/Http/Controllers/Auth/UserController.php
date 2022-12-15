<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\membership;
class UserController extends Controller
{
    public function updateUser(Request $request)
    {
        $input = $request->only(['name', 'number','calendar','bio']);

        if($request->user()->id == $request->id){
            return User::find($request->id)->update($input);
            return response()->json(['status' => 'updated']);
        }else{
            return response()->json(['status' => 'update failed']);
        }

    }
    #membership request
    public function membership(Request $request)
    {
        $id  = $request->user()->id;
        $membership = Membership::create([
            'user_id'=>$request->user_id,
            'type' =>$request->type,
            'amount'=>$request->amount,
            'status'=> 'pending',
            'update_by'=> $id
        ]);        
        return response()->json($membership,200);
    }
    #
}
