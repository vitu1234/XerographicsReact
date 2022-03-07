<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBranch extends Model
{
    use HasFactory;

     protected $table = 'user_branches';

    //Primary Key 
    protected $primaryKey = 'id';

    //Timestamps
    public $timestamps = true; 


    public function user(){
        return $this->hasMany('App\Models\User');
    }

    public function branch(){
        return $this->hasMany('App\Models\Branch');
    }
}
