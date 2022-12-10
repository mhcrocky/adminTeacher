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

    Route::get('/children/{id}/all',[UserController::class,'allChildren']);
    Route::get('/children/{id}',[UserController::class,'children']);
    Route::get('/parents/{id}',[UserController::class,'parents']);
    Route::get('/treedata/{id}',[UserController::class,'getTreeData']);
    Route::get('/user/{id}',[UserController::class,'getUser']);
    Route::post('/user',[UserController::class,'storeUser']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
