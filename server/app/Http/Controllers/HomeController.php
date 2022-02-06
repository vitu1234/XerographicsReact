<?php

namespace App\Http\Controllers;

use App\Models\POS;
use App\Models\Customer;
use App\Models\Category;
use App\Models\Tax;
use App\Models\Invoice;
use App\Models\InvoiceDetails;
use App\Models\Product;
use App\Models\User;
use App\Models\UserBranch;
use App\Models\Branch;
use Illuminate\Http\Request;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
        $this->middleware('auth:api');

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // echo "dsjd";
        $salesLastThirtyDays = Invoice::where('created_at', '>=', Carbon::now()->subMonth()->toDateTimeString())->get();
        $salesThisMonth = Invoice::where('created_at', '>=', Carbon::now()->startOfMonth()->subMonth()->toDateString())->get();
        $customers = Customer::all();
        $products_available = Product::where('product_qty', '>', '0')->get();
        $products_unavailable = Product::where('product_qty', '=', '0')->get();
        $branches = Branch::all();


        $invoice_details = InvoiceDetails::whereYear("created_at", 2021)->selectRaw("MONTH(created_at) as month")->groupBy('created_at')->get();

        // echo "<pre>";
        //     // print_r($invoice_details);
        // echo "</pre>";
        // foreach($invoice_details as $month){
        //     echo $month->month;
        //     echo $month->tax;
        //     echo "monthname".date('M', mktime(0,0,0,$month->month,10));
        // }
        // die();
        /*
        $years = range(2000, strftime("%Y",time()));
        echo '<select>';

        foreach ($years as $year) {
            echo "<option>".$year." YEar"."</option>";
        }
        echo "<option selected value='".strftime("%Y",time())."'>".strftime("%Y",time())." YEar"."</option>";
        echo '</select>';
        die();
*/
        $years = range(2000, strftime("%Y", time()));

        $data = array(
            'error' => false,
            'message' => 'success',
            'branches' => $branches,
            'customers' => $customers,
            'products_available' => $products_available,
            'products_unavailable' => $products_unavailable,
            'salesThisMonth' => $salesThisMonth,
            'salesLastThirtyDays' => $salesLastThirtyDays,
            'years' => $years,

        );

        return response()->json($data, 200);
    }
}
