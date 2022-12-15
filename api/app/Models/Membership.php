<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory;
    public $fillable = ['user_id','type','amount','status','update_by'];
    
    public function user()
    {
        return $this->hasOne(User::class,'id','user_id');
    }

    public function updater()
    {
        return $this->hasOne(User::class,'id','update_by');
    }
}
