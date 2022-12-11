<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = ['name','email','password','parent_id','type','status','number','calendar','bio'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function parentData()
    {
        $users = User::get();
        $parent_list = [];
        foreach ($users as $user) {
            array_push($parent_list,[
                'code'=>$user->id,
                'name'=>$user->name,
                'img_url'=>$user->img_url
            ]);
        }
        return $parent_list;
    }
    public function getTreeData($list = [])
    {
        $me = [
            'key'=>$this->id,
            'data'=>[
                'name'=>$this->name,
                'email'=>$this->email,
                'type'=>$this->type,
                'id'=>$this->id,
                'img_url'=>$this->img_url
            ]
        ];
        $list = [];
        foreach ($this->baby as $child) {
            array_push($list,$child->getTreeData());
        }
        $me['children'] = $list;
        $me['child'] = $this->baby;
        return $me;
    }
    public function parent()
    {
        return $this->hasOne(User::class,'id','parent_id')->where([
            // 'type'=>$this->parentType(),
            'status'=>'active'
        ]);
    }
    public function baby()
    {
        return $this->hasMany(User::class,'parent_id','id')->where([
            'type'=>$this->childType(),
            'status'=>'active'
        ]);
    }
    public function allChildren($list = [],$me = false)
    {
        foreach ($this->baby as $child) {
            $list = $child->allChildren($list,true);
        }
        if($me){
            array_push($list,$this);
        }
        return $list;
    }
    public function hasAccess($id='')
    {
        return true;
    }

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function parentType()
    {
        switch ($this->type) {
            case 'owner':
                return null;
                break;
            case 'partner':
                return 'owner';
                break;
            case 'school':
                return 'partner';
                break;
            case 'teacher':
                return 'school';
                break;
            case 'user':
                return 'teacher';
                break;
        }
    }
    public function childType()
    {
        switch ($this->type) {
            case 'owner':
                return 'partner';
                break;
            case 'partner':
                return 'school';
                break;
            case 'school':
                return 'teacher';
                break;
            case 'teacher':
                return 'user';
                break;
            case 'user':
                return null;
                break;
        }
    }
}
