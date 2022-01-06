<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;


class ProductBrand extends Model
{
    use HasFactory;

//tablename
    protected $table = 'products_brand';
        //Primary Key 
    protected $primaryKey = 'id';

    //Timestamps
    public $timestamps = true; 


    public function product(){
        return $this->hasMany('App\Models\Product');
    }
}
