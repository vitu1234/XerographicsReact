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
class SalesReportsController extends Controller
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

        $users = User::all();
        $today = date("Y-m-d");
        $data = array(
            'today'=>$today,
            'users' => $users
        );

        return view('reports.user_reports')->with($data);  
    }

    public function filterUserReports(Request $request){
        $selected_user_id = $request->input('filter_user');
        $start_date = date($request->input('filter_user_start')." 00:00:00");
        $end_date = date($request->input('filter_user_end')." 23:59:59");

        $invoice = Invoice::where('sale_by',$selected_user_id)
                ->whereBetween('created_at',[$start_date,$end_date])
                           ->get();

         $output = '';

        if ($invoice->count() > 0) {
            $output .= '<table class="table align-items-center table-flush table-hover mt-3" id="units_tbl">
            <thead class="thead-light">
            <tr>
            <th scope="col">Invoice #</th>
            <th scope="col">Branch Name</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Sales by</th>
            <th scope="col">Date</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody class="list">';
            foreach ($invoice as $sale) {
                $sale_id = $sale->id;
                $branch_name = Branch::find($sale->branch_id)->branch_name;
                $customer_name = Customer::find($sale->customer_id)->customer_name;
                $sales_user = User::find($sale->sale_by);
                $name = $sales_user->firstname." ".$sales_user->lastname;
                $amount = "MWK ".number_format($sale->total_amount,2);

                $new_date = date('Y-m-d', strtotime($sale->created_at));
                    

                $output.='

                <tr>
                <td >
                #'.$sale_id.'
                </td> 
                <th scope="row">
                <div class="media align-items-center">
                <div class="media-body">
                <span class="name mb-0 text-sm"> '.$branch_name.'</span>
                </div>
                </div>
                </th>

                <td >
                '.$customer_name.'
                </td> 
                <td >
                '.$name.'
                </td>
                <td >
                '.$new_date.'
                </td>  
                <td >
                '.$amount.'
                </td>               
                <td class="text-right">
                <div class="dropdown">
                <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <a href="/sales/'.$sale_id.'" class="text-primary dropdown-item ">Details</a>
                </div>
                </div>
                </td>
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


    public function branch_reports()
    {
        $user_id = auth()->user()->id;

        $branches = Branch::all();
        $today = date("Y-m-d");
        $data = array(
            'today'=>$today,
            'branches' => $branches
        );

        return view('reports.branch_reports')->with($data);  
    }

    public function fetchAllBranchSales(Request $request){
        $selected_branch_id = $request->input('filter_branch');
        $start_date = date($request->input('filter_user_start')." 00:00:00");
        $end_date = date($request->input('filter_user_end')." 23:59:59");

        $invoice = Invoice::where('branch_id',$selected_branch_id)
                ->whereBetween('created_at',[$start_date,$end_date])
                           ->get();

         $output = '';

        if ($invoice->count() > 0) {
            $output .= '<table class="table align-items-center table-flush table-hover mt-3" id="units_tbl">
            <thead class="thead-light">
            <tr>
            <th scope="col">Invoice #</th>
            <th scope="col">Branch Name</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Sales by</th>
            <th scope="col">Date</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody class="list">';
            foreach ($invoice as $sale) {
                $sale_id = $sale->id;
                $branch_name = Branch::find($sale->branch_id)->branch_name;
                $customer_name = Customer::find($sale->customer_id)->customer_name;
                $sales_user = User::find($sale->sale_by);
                $name = $sales_user->firstname." ".$sales_user->lastname;
                $amount = "MWK ".number_format($sale->total_amount,2);

                $new_date = date('Y-m-d', strtotime($sale->created_at));
                    

                $output.='

                <tr>
                <td >
                #'.$sale_id.'
                </td> 
                <th scope="row">
                <div class="media align-items-center">
                <div class="media-body">
                <span class="name mb-0 text-sm"> '.$branch_name.'</span>
                </div>
                </div>
                </th>

                <td >
                '.$customer_name.'
                </td> 
                <td >
                '.$name.'
                </td>
                <td >
                '.$new_date.'
                </td>  
                <td >
                '.$amount.'
                </td>               
                <td class="text-right">
                <div class="dropdown">
                <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <a href="/sales/'.$sale_id.'" class="text-primary dropdown-item ">Details</a>
                </div>
                </div>
                </td>
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

    public function category_reports()
    {
        $user_id = auth()->user()->id;

        $categories = Category::all();
        $today = date("Y-m-d");
        $data = array(
            'today'=>$today,
            'categories' => $categories
        );

        return view('reports.category_reports')->with($data);  
    }

    public function fetchAllCategorySales(Request $request){
        $selected_category_id = $request->input('filter_category');
        $products = Product::where('category_id',$selected_category_id)->get();
       

        $start_date = date($request->input('filter_user_start')." 00:00:00");
        $end_date = date($request->input('filter_user_end')." 23:59:59");

        if ($products->count() > 0) {
            $invoice_ids = array();
            $invoice = array();
            $i =0;
            foreach($products as $product){
                $product_id = $product->id;
                //check in product invoice details if appears | distinct
                \DB::statement("SET SQL_MODE=''");
                $invoice_details = InvoiceDetails::where('product_id',$product_id)
                        ->get()->groupBy('invoice_id');
                if ($invoice_details->count() > 0) {
                    
                    foreach($invoice_details as $invoice_detail){
                        $invoice_id = $invoice_detail[0]->invoice_id;

                        //get invoice info
                        $invoice_ids[$i] =$invoice_id;
                        ++$i;
                    }
                }
            }

            // echo "<pre>";
            //     print_r($invoice);
            // echo "</pre>";
            // die();
            $filtered_invoice_ids = array_values(array_unique($invoice_ids));
           
            for ($y=0; $y < count($filtered_invoice_ids); $y++) { 
                $invoice[$y] =Invoice::find($filtered_invoice_ids[$y]); 
            }

            $output = '';
             if (!empty($invoice)) {
            $output .= '<table class="table align-items-center table-flush table-hover mt-3" id="units_tbl">
            <thead class="thead-light">
            <tr>
            <th scope="col">Invoice #</th>
            <th scope="col">Branch Name</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Sales by</th>
            <th scope="col">Date</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody class="list">';
            foreach ($invoice as $sale) {
                $sale_id = $sale->id;
                $branch_name = Branch::find($sale->branch_id)->branch_name;
                $customer_name = Customer::find($sale->customer_id)->customer_name;
                $sales_user = User::find($sale->sale_by);
                $name = $sales_user->firstname." ".$sales_user->lastname;
                $amount = "MWK ".number_format($sale->total_amount,2);

                $new_date = date('Y-m-d', strtotime($sale->created_at));
                    

                $output.='

                <tr>
                <td >
                #'.$sale_id.'
                </td> 
                <th scope="row">
                <div class="media align-items-center">
                <div class="media-body">
                <span class="name mb-0 text-sm"> '.$branch_name.'</span>
                </div>
                </div>
                </th>

                <td >
                '.$customer_name.'
                </td> 
                <td >
                '.$name.'
                </td>
                <td >
                '.$new_date.'
                </td>  
                <td >
                '.$amount.'
                </td>               
                <td class="text-right">
                <div class="dropdown">
                <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <a href="/sales/'.$sale_id.'" class="text-primary dropdown-item ">Details</a>
                </div>
                </div>
                </td>
                </tr>

                ';
            }
            $output .= '</tbody>
            </table>';
            echo $output;
        } else {
            echo '<h1 class="text-center text-danger my-5">No record present in the database!</h1>';
        }
        }else{
            echo '<h1 class="text-center text-danger my-5">No record present in the database!</h1>';
        }

        // $invoice = Invoice::where('branch_id',$selected_branch_id)
        //         ->whereBetween('created_at',[$start_date,$end_date])
        //                    ->get();

        //  $output = '';

        // if ($invoice->count() > 0) {
        //     $output .= '<table class="table align-items-center table-flush table-hover mt-3" id="units_tbl">
        //     <thead class="thead-light">
        //     <tr>
        //     <th scope="col">Invoice #</th>
        //     <th scope="col">Branch Name</th>
        //     <th scope="col">Customer Name</th>
        //     <th scope="col">Sales by</th>
        //     <th scope="col">Date</th>
        //     <th scope="col">Total Amount</th>
        //     <th scope="col">Action</th>
        //     </tr>
        //     </thead>
        //     <tbody class="list">';
        //     foreach ($invoice as $sale) {
        //         $sale_id = $sale->id;
        //         $branch_name = Branch::find($sale->branch_id)->branch_name;
        //         $customer_name = Customer::find($sale->customer_id)->customer_name;
        //         $sales_user = User::find($sale->sale_by);
        //         $name = $sales_user->firstname." ".$sales_user->lastname;
        //         $amount = "MWK ".number_format($sale->total_amount,2);

        //         $new_date = date('Y-m-d', strtotime($sale->created_at));
                    

        //         $output.='

        //         <tr>
        //         <td >
        //         #'.$sale_id.'
        //         </td> 
        //         <th scope="row">
        //         <div class="media align-items-center">
        //         <div class="media-body">
        //         <span class="name mb-0 text-sm"> '.$branch_name.'</span>
        //         </div>
        //         </div>
        //         </th>

        //         <td >
        //         '.$customer_name.'
        //         </td> 
        //         <td >
        //         '.$name.'
        //         </td>
        //         <td >
        //         '.$new_date.'
        //         </td>  
        //         <td >
        //         '.$amount.'
        //         </td>               
        //         <td class="text-right">
        //         <div class="dropdown">
        //         <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //         <i class="fas fa-ellipsis-v"></i>
        //         </a>
        //         <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
        //         <a href="/sales/'.$sale_id.'" class="text-primary dropdown-item ">Details</a>
        //         </div>
        //         </div>
        //         </td>
        //         </tr>

        //         ';
        //     }
        //     $output .= '</tbody>
        //     </table>';
        //     echo $output;
        // } else {
        //     echo '<h1 class="text-center text-danger my-5">No record present in the database!</h1>';
        // }
    }

}
