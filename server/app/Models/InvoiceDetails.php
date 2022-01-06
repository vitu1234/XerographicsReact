<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Invoice;
use App\Models\Product;

class InvoiceDetails extends Model
{
    use HasFactory;
    protected $table = 'invoice_details';

    //Primary Key 
    protected $primaryKey = 'id';

    //Timestamps
    public $timestamps = true; 

    public function invoice()
    {
        return $this->belongsTo('App\Models\Invoice');
    }

    public function products(){
        return $this->hasMany('App\Models\Product','id', 'product_id');
    }
}
