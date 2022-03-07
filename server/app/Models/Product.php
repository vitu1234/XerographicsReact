<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\InvoiceDetails;

class Product extends Model
{
    use HasFactory;
        protected $table = 'products';

    //Primary Key 
    protected $primaryKey = 'id';

    //Timestamps
    public $timestamps = true; 

    public function invoice_details()
    {
        return $this->belongsTo('App\Models\InvoiceDetails');
    }
}
