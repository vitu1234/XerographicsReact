<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    use HasFactory;
        protected $table = 'tax';

    //Primary Key 
    protected $primaryKey = 'id';

    //Timestamps
    public $timestamps = true; 
}