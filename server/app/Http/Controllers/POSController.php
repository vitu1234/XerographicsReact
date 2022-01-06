<?php

namespace App\Http\Controllers;

use App\Models\POS;
use App\Models\Customer;
use App\Models\Category;
use App\Models\Tax;
use App\Models\Invoice;
use App\Models\InvoiceDetails;
use App\Models\Product;
use App\Models\UserBranch;
use Illuminate\Http\Request;

class POSController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user_id = auth()->user()->id;
        $branch_id = UserBranch::where("userid",$user_id)->first()->branch_id;

        $customers = Customer::all();
        $products = Product::where('product_status',1)->where('branch_id',$branch_id)->get();
        $categories = Category::all();

        $data = array(
            'customers' => $customers,
            'products' => $products,
            'categories' => $categories,
        );

        return view('pos.index')->with($data);  
    }

     // handle fetch all pos products ajax request
    public function fetchAllPosProducts($category) {
        /*$users = User::where('active','1')->where(function($query) {
            $query->where('email','jdoe@example.com')
                        ->orWhere('email','johndoe@example.com');
        })->get();

        Select * from users where active = '1' and
        (email = 'jdoe@exampple.com' or email = 'johndoe@example.com');*/
        $user_id = auth()->user()->id;
        $branch_id = UserBranch::where("userid",$user_id)->first()->branch_id;

        if ($category == 'category') {
         $products = Product::where('product_status',1)->where('branch_id',$branch_id)->get();
     }else{
        $products = Product::where('product_status',1)->where('branch_id',$branch_id)->where('category_id',$category)->get();
    }

    $output = '';

    if ($products->count() > 0) {
        $output .= '
        <table id="ssPos" class="table align-items-center table-hover " ><thead class="thead-light">
        <tr>
        <th scope="col">Product Name</th>
        </tr>
        </thead>';
        foreach ($products as $product) {

            $btn_tax = '';
            $btn_no_tax = '';
            $price_formatted = 'MWK '.number_format($product->product_price,2);

            $rate  = Tax::take(1)->first();
            if (!empty($rate) > 0) {
                $tax = ($product->product_price*$rate->tax_amount)/100;
                $taxZero = 0;
                $btn_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$tax.'\',\''.$product->product_qty.'\')" type="button">with VAT(+ MWK'.number_format($tax,2).')</button>';

                $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$taxZero.'\', \''.$product->product_qty.'\')" type="button">without VAT</button>';  
            }else{

                $taxZero = 0;
                $btn_tax = '<button disabled class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$taxZero.'\',\''.$product->product_qty.'\')" type="button">with VAT(Tax not set)</button>';

                $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$taxZero.'\', \''.$product->product_qty.'\')" type="button">without VAT</button>';
            }

            

            $output.='
            <tr >
            <th scope="row">
            <div class="media align-items-center">
            <a href="#" class="avatar rounded-circle mr-2">
            <img alt="Image placeholder" src="/storage/product_images/'.$product->img_url.'">
            </a>
            <div class="media-body">

            <span class="name mb-0 text-sm">'.$product->product_name.' - MWK'.number_format($product->product_price,2).'</span>
            <small class="text-muted">In Stock('.$product->product_qty.')</small>
            '.$btn_tax.'
            '.$btn_no_tax.'
            
            </div>
            </div>

            
            </th>
            </tr>
            ';
        }
        $output .= '</tbody>
        </table>';
        echo $output;
    } else {
        echo '<h1 class="text-center text-danger my-5">No record present in the database!</h1>';
    }
}


      //get all pos products by product code, name or serial
public function fetchAllPosProductsFilter($tt) {

    // $products = Product::query()
    // ->where('product_code','LIKE',"%{$query}%")
    // ->orWhere('product_serial','LIKE',"%{$query}%")
    // ->orWhere('product_name','LIKE',"%{$query}%")
    // ->get();
    $user_id = auth()->user()->id;
    $branch_id = UserBranch::where("userid",$user_id)->first()->branch_id;

    $products = Product::where('product_status',1)->where('branch_id',$branch_id)->where(function($query) use ($tt){
        $query->where('product_code','LIKE',"%{$tt}%")
        ->orWhere('product_serial','LIKE',"%{$tt}%")
        ->orWhere('product_name','LIKE',"%{$tt}%");
    })->get();

    $output = '';

    if ($products->count() > 0) {
        $output .= '
        <table id="ssPos" class="table align-items-center table-hover " ><thead class="thead-light">
        <tr>
        <th scope="col">Product Name</th>
        </tr>
        </thead>';
        foreach ($products as $product) {
            $btn_tax = '';
            $btn_no_tax = '';
            $price_formatted = 'MWK '.number_format($product->product_price,2);

            $rate  = Tax::take(1)->first();
            if (!empty($rate) > 0) {
                $tax = ($product->product_price*$rate->tax_amount)/100;
                $taxZero = 0;
                $btn_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$tax.'\',\''.$product->product_qty.'\')" type="button">with VAT(+ MWK'.number_format($tax,2).')</button>';

                $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$taxZero.'\', \''.$product->product_qty.'\')" type="button">without VAT</button>';  
            }else{

                $taxZero = 0;
                $btn_tax = '<button disabled class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$taxZero.'\',\''.$product->product_qty.'\')" type="button">with VAT(Tax not set)</button>';

                $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$taxZero.'\', \''.$product->product_qty.'\')" type="button">without VAT</button>';
            }



            $output.='
            <tr >
            <th scope="row">
            <div class="media align-items-center">
            <a href="#" class="avatar rounded-circle mr-2">
            <img alt="Image placeholder" src="/storage/product_images/'.$product->img_url.'">
            </a>
            <div class="media-body">

            <span class="name mb-0 text-sm">'.$product->product_name.' - MWK'.number_format($product->product_price,2).'</span>
            <small class="text-muted">In Stock('.$product->product_qty.')</small>
            '.$btn_tax.'
            '.$btn_no_tax.'

            </div>
            </div>


            </th>
            </tr>
            ';
        }
        $output .= '</tbody>
        </table>';
        echo $output;
    } else {
        echo '<h3 class="text-center text-danger my-5">No record present in the database matching your search query!</h3><p class="text-center text-warning">All Products</p>';
        //retrieve all products
        $user_id = auth()->user()->id;
        $branch_id = UserBranch::where("userid",$user_id)->first()->branch_id;

        $products = Product::where('product_status',1)->where('branch_id',$branch_id)->get();
        if ($products->count() > 0) {
            $output .= '
            <table id="ssPos" class="table align-items-center table-hover " ><thead class="thead-light">
            <tr>
            <th scope="col">Product Name</th>
            </tr>
            </thead>';
            foreach ($products as $product) {
                $btn_tax = '';
                $btn_no_tax = '';
                $price_formatted = 'MWK '.number_format($product->product_price,2);

                $rate  = Tax::take(1)->first();
                if (!empty($rate) > 0) {
                    $tax = ($product->product_price*$rate->tax_amount)/100;
                    $taxZero = 0;
                    $btn_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$tax.'\',\''.$product->product_qty.'\')" type="button">with VAT(+ MWK'.number_format($tax,2).')</button>';

                    $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$taxZero.'\', \''.$product->product_qty.'\')" type="button">without VAT</button>';  
                }else{

                    $taxZero = 0;
                    $btn_tax = '<button disabled class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$taxZero.'\',\''.$product->product_qty.'\')" type="button">with VAT(Tax not set)</button>';

                    $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\''.$product->id.'\',\''.$product->product_name.'\', \''.$product->product_price.'\' ,\''.$price_formatted.'\', \''.$taxZero.'\', \''.$product->product_qty.'\')" type="button">without VAT</button>';
                }



                $output.='
                <tr >
                <th scope="row">
                <div class="media align-items-center">
                <a href="#" class="avatar rounded-circle mr-2">
                <img alt="Image placeholder" src="/storage/product_images/'.$product->img_url.'">
                </a>
                <div class="media-body">

                <span class="name mb-0 text-sm">'.$product->product_name.' - MWK'.number_format($product->product_price,2).'</span>
                <small class="text-muted">In Stock('.$product->product_qty.')</small>
                '.$btn_tax.'
                '.$btn_no_tax.'

                </div>
                </div>


                </th>
                </tr>
                ';
            }
            $output .= '</tbody>
            </table>';
            echo $output;
        } 
    }
}


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $invoice = new Invoice;
        $user_id = auth()->user()->id;
        $branch_id = UserBranch::where("userid",$user_id)->first()->branch_id;
        
        //variables from POS form
        $total_amount = $request->input('total_amount');
        $total_amountAfterDiscount = $request->input('total_amountAfterDiscount');
        $amount_paid_input = $request->input('amount_paid_input');
        $payment_type = $request->input('payment_type');
        $discount_input = $request->input('discount_input');
        $customer_id = $request->input('customer_id');
        $number_qty = $request->input('number_qty');
        $prod_id = $request->input('prod_id');
        $taxes = $request->input('tax');

        // print_r($prod_id);die();

        //invoice fields
        $invoice->branch_id = $branch_id;
        $invoice->customer_id = $customer_id;
        $invoice->sale_by = auth()->user()->id;
        $invoice->total_amount = $total_amount;
        $invoice->discount = $discount_input;
        $invoice->paid_amount = $amount_paid_input;
        $invoice->payment_type = $payment_type;
        $total_tax = 0;
         //add all the taxes together
        for($i=0; $i < count($taxes); $i++){
            $total_tax+=($taxes[$i]*$number_qty[$i]);
        }
        $invoice->total_tax = $total_tax;

        if ($invoice->save()) {
            $invoice_id = Invoice::where('sale_by',auth()->user()->id)
            ->where('customer_id',$customer_id)
            ->where('total_amount',$total_amount)
            ->where('discount',$discount_input)
            ->where('payment_type',$payment_type)
            ->first()->id; 
               // print_r($prod_id);
             //invoice details
            for ($i=0; $i < count($prod_id); $i++) { 
                $invoice_details = new InvoiceDetails;
                $product_id = $prod_id[$i];
                $product_price = Product::find($product_id)->product_price;
                $product_qty = $number_qty[$i];
                $tax_amount = ($taxes[$i])/100;
                $total_price = ($product_price + $taxes[$i]) * $product_qty;
                 //get tax 
                 // print_r($taxes[$i]);die();

                $get_tax_id = Tax::where('tax_amount',$tax_amount)->first();
                if (!empty($get_tax_id)) {
                    $invoice_details->tax  = $get_tax_id->tax_amount; 
                }
                $invoice_details->invoice_id = $invoice_id;
                $invoice_details->product_id = $product_id;

                $invoice_details->product_qty  = $product_qty;
                $invoice_details->total_price  = $total_price;

                //update product qty
                $productt = Product::find($product_id);
                $new_qty = $productt->product_qty - $product_qty;
                //update qty
                $productt->product_qty = $new_qty;

                $productt->save();
                $invoice_details->save();
            }

            return response()->json([
                'status' => 200,
                'message'=>'Sale has been saved!'
            ]);
        }else{
            return response()->json([
                'status' => 500,
                'message'=>'Sale not saved, something went wrong on server!'
            ]);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\POS  $pOS
     * @return \Illuminate\Http\Response
     */
    public function show(POS $pOS)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\POS  $pOS
     * @return \Illuminate\Http\Response
     */
    public function edit(POS $pOS)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\POS  $pOS
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, POS $pOS)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\POS  $pOS
     * @return \Illuminate\Http\Response
     */
    public function destroy(POS $pOS)
    {
        //
    }
}
