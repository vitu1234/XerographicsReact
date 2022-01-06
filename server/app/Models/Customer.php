<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Invoice;

class Customer extends Model
{
 use HasFactory;

 protected $table = 'customers';

    //Primary Key 
 protected $primaryKey = 'id';

    //Timestamps
 public $timestamps = true; 

    public function invoice(){
     return $this->hasMany('App\Models\Invoice');
   }
}
