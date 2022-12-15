<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use App\Http\Controllers\UserController;



Route::middleware(['auth:sanctum'])->group(function (){


    Route::get('/user/parent/{id}/{parent_id}',[App\Http\Controllers\Admin\UserController::class,'setParent']);
    Route::get('/user/child/{id}/{child_id}',[App\Http\Controllers\Admin\UserController::class,'addChild']);

    //////
    Route::get('/request/{id}/approve',[App\Http\Controllers\Admin\UserController::class,'approveRequest']);
    Route::get('/request',[App\Http\Controllers\Admin\UserController::class,'getAllRequest']);
    ///
    Route::get('/user/{id}',[App\Http\Controllers\Admin\UserController::class,'getUser']);
    Route::post('/user',[App\Http\Controllers\Admin\UserController::class,'storeUser']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
