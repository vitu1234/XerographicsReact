<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceDetails;
use App\Models\POS;
use App\Models\Product;
use App\Models\Tax;
use App\Models\UserBranch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class POSController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function __construct()
    {
//        $this->middleware('auth');
        $this->middleware('auth:api');

    }

    public function index()
    {
        $user_id = auth()->user()->id;
        $branch_id = UserBranch::where("userid", $user_id)->first()->branch_id;

        $customers = Customer::all();
        $products = Product::where('product_status', 1)->where('branch_id', $branch_id)->get();
        $categories = Category::all();

        $data = array(
            'customers' => $customers,
            'products' => $products,
            'categories' => $categories,
        );

        return view('pos.index')->with($data);
    }

    // handle fetch all pos products ajax request
    public function fetchAllPosProducts($category)
    {
        $id = auth()->user()->id; //get users except me
        $role = auth()->user()->role; //get users except me

        if ($role === 'admin') {
            $products = DB::connection('mysql')->select(
                'SELECT products.id, products.category_id, products.unit_id, products.branch_id, products.brand_id,
                    products.product_code, products.product_serial, products.product_name, products.product_qty,
                    products.product_price, products.product_notes, products.product_status, products.img_url,  
                    categories.category_name, units.unit_name, units.unit_symbol, branches.branch_name, branches.email,
                    branches.phone, products_brand.brand_name
                    FROM products
               JOIN categories
               ON products.category_id = categories.id
               
               JOIN units
               ON products.unit_id = units.id
               
               JOIN branches
               ON products.branch_id = branches.id
               
               JOIN  products_brand 
               ON products.brand_id = products_brand.id  
               
               WHERE category_id = ?
                    ',
                [
                    $category
                ]
            );
        } else {

            $user_branch = DB::connection('mysql')->select(
                'SELECT * 
                    FROM user_branches 
                    WHERE userid = :user_id
                    ',
                [
                    'user_id' => $id,
                ]
            );

            $user_branch_id = $user_branch[0]->branch_id;
            $products = DB::connection('mysql')->select(
                'SELECT products.id, products.category_id, products.unit_id, products.branch_id, products.brand_id,
                    products.product_code, products.product_serial, products.product_name, products.product_qty,
                    products.product_price, products.product_notes, products.product_status, products.img_url,  
                    categories.category_name, units.unit_name, units.unit_symbol, branches.branch_name, branches.email,
                    branches.phone, products_brand.brand_name
                    FROM products
               JOIN categories
               ON products.category_id = categories.id
               
               JOIN units
               ON products.unit_id = units.id
               
               JOIN branches
               ON products.branch_id = branches.id
               
               JOIN  products_brand 
               ON products.brand_id = products_brand.id  
               
               WHERE category_id = ?
               AND products.branch_id = ? 
                    ',
                [
                    $category,
                    $user_branch_id
                ]
            );

        }


        if (!empty($products)) {
            $data = array(
                'status' => 200,
                'error' => false,
                'message' => 'success',
                'products' => $products,
            );

            return response()->json($data, 200);
        } else {
            $data = array(
                'status' => 200,
                'error' => true,
                'message' => 'No products found!',
            );

            return response()->json($data, 200);
        }
    }


    //get all pos products by product code, name or serial
    public function fetchAllPosProductsFilter($tt)
    {


        $user_id = auth()->user()->id;
        $branch_id = UserBranch::where("userid", $user_id)->first()->branch_id;

        $products = Product::where('product_status', 1)->where('branch_id', $branch_id)->where(function ($query) use ($tt) {
            $query->where('product_code', 'LIKE', "%{$tt}%")
                ->orWhere('product_serial', 'LIKE', "%{$tt}%")
                ->orWhere('product_name', 'LIKE', "%{$tt}%");
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
                $price_formatted = 'MWK ' . number_format($product->product_price, 2);

                $rate = Tax::take(1)->first();
                if (!empty($rate) > 0) {
                    $tax = ($product->product_price * $rate->tax_amount) / 100;
                    $taxZero = 0;
                    $btn_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\'' . $product->id . '\',\'' . $product->product_name . '\', \'' . $product->product_price . '\' ,\'' . $price_formatted . '\', \'' . $tax . '\',\'' . $product->product_qty . '\')" type="button">with VAT(+ MWK' . number_format($tax, 2) . ')</button>';

                    $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\'' . $product->id . '\',\'' . $product->product_name . '\', \'' . $product->product_price . '\' ,\'' . $price_formatted . '\', \'' . $taxZero . '\', \'' . $product->product_qty . '\')" type="button">without VAT</button>';
                } else {

                    $taxZero = 0;
                    $btn_tax = '<button disabled class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\'' . $product->id . '\',\'' . $product->product_name . '\', \'' . $product->product_price . '\' ,\'' . $price_formatted . '\', \'' . $taxZero . '\',\'' . $product->product_qty . '\')" type="button">with VAT(Tax not set)</button>';

                    $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\'' . $product->id . '\',\'' . $product->product_name . '\', \'' . $product->product_price . '\' ,\'' . $price_formatted . '\', \'' . $taxZero . '\', \'' . $product->product_qty . '\')" type="button">without VAT</button>';
                }


                $output .= '
            <tr >
            <th scope="row">
            <div class="media align-items-center">
            <a href="#" class="avatar rounded-circle mr-2">
            <img alt="Image placeholder" src="/storage/product_images/' . $product->img_url . '">
            </a>
            <div class="media-body">

            <span class="name mb-0 text-sm">' . $product->product_name . ' - MWK' . number_format($product->product_price, 2) . '</span>
            <small class="text-muted">In Stock(' . $product->product_qty . ')</small>
            ' . $btn_tax . '
            ' . $btn_no_tax . '

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
            $branch_id = UserBranch::where("userid", $user_id)->first()->branch_id;

            $products = Product::where('product_status', 1)->where('branch_id', $branch_id)->get();
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
                    $price_formatted = 'MWK ' . number_format($product->product_price, 2);

                    $rate = Tax::take(1)->first();
                    if (!empty($rate) > 0) {
                        $tax = ($product->product_price * $rate->tax_amount) / 100;
                        $taxZero = 0;
                        $btn_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\'' . $product->id . '\',\'' . $product->product_name . '\', \'' . $product->product_price . '\' ,\'' . $price_formatted . '\', \'' . $tax . '\',\'' . $product->product_qty . '\')" type="button">with VAT(+ MWK' . number_format($tax, 2) . ')</button>';

                        $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\'' . $product->id . '\',\'' . $product->product_name . '\', \'' . $product->product_price . '\' ,\'' . $price_formatted . '\', \'' . $taxZero . '\', \'' . $product->product_qty . '\')" type="button">without VAT</button>';
                    } else {

                        $taxZero = 0;
                        $btn_tax = '<button disabled class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\'' . $product->id . '\',\'' . $product->product_name . '\', \'' . $product->product_price . '\' ,\'' . $price_formatted . '\', \'' . $taxZero . '\',\'' . $product->product_qty . '\')" type="button">with VAT(Tax not set)</button>';

                        $btn_no_tax = '<button class="btn btn-sm btn-secondary mx-2" onclick="addProductToCart(\'' . $product->id . '\',\'' . $product->product_name . '\', \'' . $product->product_price . '\' ,\'' . $price_formatted . '\', \'' . $taxZero . '\', \'' . $product->product_qty . '\')" type="button">without VAT</button>';
                    }


                    $output .= '
                <tr >
                <th scope="row">
                <div class="media align-items-center">
                <a href="#" class="avatar rounded-circle mr-2">
                <img alt="Image placeholder" src="/storage/product_images/' . $product->img_url . '">
                </a>
                <div class="media-body">

                <span class="name mb-0 text-sm">' . $product->product_name . ' - MWK' . number_format($product->product_price, 2) . '</span>
                <small class="text-muted">In Stock(' . $product->product_qty . ')</small>
                ' . $btn_tax . '
                ' . $btn_no_tax . '

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
    public function saveInvoice(Request $request)
    {
        $data = $request->all();

        $sale_by = auth()->user()->id;//replace after adding auth

        //get user branch
        $user_branch = DB::connection('mysql')->select(
            'SELECT * 
                    FROM user_branches
                    WHERE userid = :user_id
                    ',
            [
                'user_id' => $sale_by
            ]
        );
        $branch_id = $user_branch[0]->branch_id;

        $amount_paid = $data['amount_paid'];
//        $customerId = $data['customerId'];
//        $discount_amount = $data['discount_amount'];
        $discount_percent = $data['discount_percent'];
        $tax_amount = !empty($data['tax_amount']) == True ? $data['tax_amount'] : 0;
        $customerId = ($data['customerId'] == -1) == False ? $data['tax_amount'] : 1;
        $discount_amount = !empty($data['discount_amount']) == True ? $data['discount_amount'] : 0;
        $tax_percent = $data['tax_percent'];
        $payment = $data['payment_type'];
        $payment_type = "";
        $total = $data['total'];
        $total_without_mod = $data['total_without_mod'];
        $amount_due = $data['amount_due'];
        $cartItems = $data['cartItems'];

        if ($payment == 1) {
            $payment_type = "Cash Payment";
        } elseif ($payment == 2) {
            $payment_type = "Mobile Money Payment";
        } elseif ($payment == 3) {
            $payment_type = "Bank Payment";
        }


        $saveData = DB::connection('mysql')->insert(
            'INSERT INTO invoices (
            branch_id,
            customer_id, 
            sale_by,
            payment_type,
            discount_amount ,  
            discount_percent,
            total_tax,
            paid_amount,
            total_before_disc_tax,
            total_after_disc_tax,
            amount_due
            )
        VALUES (
            :branch_id,
            :customer_id, 
            :sale_by,
            :payment_type,
            :discount_amount,  
            :discount_percent,  
            :total_tax,
            :paid_amount,
            :total_before_disc_tax,
            :total_after_disc_tax,
            :amount_due
            )',

            [
                'branch_id' => $branch_id,
                'customer_id' => $customerId,
                'sale_by' => $sale_by,
                'payment_type' => $payment_type,
                'discount_amount' => $discount_amount,
                'discount_percent' => $discount_percent,
                'total_tax' => $tax_amount,
                'paid_amount' => $amount_paid,
                'total_before_disc_tax' => $total_without_mod,
                'total_after_disc_tax' => $total,
                'amount_due' => $amount_due
            ]
        );

        if ($saveData) {
            //get the saved record
            $invoiceDetails = DB::connection('mysql')->select(
                'SELECT * 
                    FROM invoices
                    WHERE branch_id = :branch_id
                    AND customer_id = :customer_id
                    AND sale_by = :sale_by
                    AND payment_type = :payment_type
                    AND discount_amount = :discount_amount
                    AND total_after_disc_tax =:total_after_disc_tax
                    AND total_before_disc_tax =:total_before_disc_tax
                    ',
                [
                    'branch_id' => $branch_id,
                    'customer_id' => $customerId,
                    'sale_by' => $sale_by,
                    'payment_type' => $payment_type,
                    'discount_amount' => $discount_amount,
                    'total_after_disc_tax' => $total,
                    'total_before_disc_tax' => $total_without_mod,
                ]
            );

            if (!empty($invoiceDetails)) {
                $invoice = $invoiceDetails[0];
                $invoice_id = $invoice->id;
                for ($i = 0; $i < count($cartItems); $i++) {
                    //save invoice details
                    DB::connection('mysql')->insert(
                        'INSERT INTO invoice_details (
                            invoice_id,
                            product_id, 
                            product_qty,
                            total_price
                            )
                        VALUES (
                            :invoice_id,
                            :product_id, 
                            :product_qty,
                            :total_price
                            )',

                        [
                            'invoice_id' => $invoice_id,
                            'product_id' => $cartItems[$i]['product_id'],
                            'product_qty' => $cartItems[$i]['qty'],
                            'total_price' => ($cartItems[$i]['qty'] * $cartItems[$i]['product_price']),
                        ]
                    );

                }

                //save invoice details
                return response()->json([
                    'status' => 200,
                    'error' => false,
                    'message' => 'Sale saved successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 500,
                    'error' => true,
                    'message' => 'Something is keeping you from proceeding with this save, Internal server error'
                ]);
            }
        } else {
            return response()->json([
                'status' => 500,
                'error' => true,
                'message' => 'Saving sale failed, Internal server error'
            ]);
        }


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $invoice = new Invoice;
        $user_id = auth()->user()->id;
        $branch_id = UserBranch::where("userid", $user_id)->first()->branch_id;

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
        for ($i = 0; $i < count($taxes); $i++) {
            $total_tax += ($taxes[$i] * $number_qty[$i]);
        }
        $invoice->total_tax = $total_tax;

        if ($invoice->save()) {
            $invoice_id = Invoice::where('sale_by', auth()->user()->id)
                ->where('customer_id', $customer_id)
                ->where('total_amount', $total_amount)
                ->where('discount', $discount_input)
                ->where('payment_type', $payment_type)
                ->first()->id;
            // print_r($prod_id);
            //invoice details
            for ($i = 0; $i < count($prod_id); $i++) {
                $invoice_details = new InvoiceDetails;
                $product_id = $prod_id[$i];
                $product_price = Product::find($product_id)->product_price;
                $product_qty = $number_qty[$i];
                $tax_amount = ($taxes[$i]) / 100;
                $total_price = ($product_price + $taxes[$i]) * $product_qty;
                //get tax
                // print_r($taxes[$i]);die();

                $get_tax_id = Tax::where('tax_amount', $tax_amount)->first();
                if (!empty($get_tax_id)) {
                    $invoice_details->tax = $get_tax_id->tax_amount;
                }
                $invoice_details->invoice_id = $invoice_id;
                $invoice_details->product_id = $product_id;

                $invoice_details->product_qty = $product_qty;
                $invoice_details->total_price = $total_price;

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
                'message' => 'Sale has been saved!'
            ]);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Sale not saved, something went wrong on server!'
            ]);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\POS $pOS
     * @return \Illuminate\Http\Response
     */
    public function show(POS $pOS)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\POS $pOS
     * @return \Illuminate\Http\Response
     */
    public function edit(POS $pOS)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\POS $pOS
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, POS $pOS)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\POS $pOS
     * @return \Illuminate\Http\Response
     */
    public function destroy(POS $pOS)
    {
        //
    }
}
