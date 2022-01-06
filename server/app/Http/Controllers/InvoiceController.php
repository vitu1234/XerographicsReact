<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceDetails;
use App\Models\Branch;
use App\Models\User;
use App\Models\UserBranch;
use App\Models\Customer;
use Illuminate\Http\Request;

class InvoiceController extends Controller
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
        return view('sales.index');
    }

         // handle fetch all branch sales ajax request
    public function fetchAllBranchSales() {
        // echo "df";
        $user_id = auth()->user()->id; 
        $user = User::find($user_id);
        $role = $user->role;
        $user_branch = UserBranch::where('userid',$user_id)->first()->branch_id;

        if ($role == 'admin') {
            $sales = Invoice::all();
        }else{
            $sales = Invoice::where('branch_id',$user_branch)->get();
        }

        $output = '';

        if ($sales->count() > 0) {
            $output .= '<table class="table align-items-center table-flush table-hover mt-3" id="units_tbl">
            <thead class="thead-light">
            <tr>
            <th scope="col">Branch Name</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Sales by</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody class="list">';
            foreach ($sales as $sale) {
                $sale_id = $sale->id;
                $branch_name = Branch::find($sale->branch_id)->branch_name;
                $customer_name = Customer::find($sale->customer_id)->customer_name;
                $sales_user = User::find($sale->sale_by);
                $name = $sales_user->firstname." ".$sales_user->lastname;
                $amount = "MWK ".number_format($sale->total_amount,2);
                $output.='

                <tr>
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
                '.$amount.'
                </td>               
                <td class="text-right">
                <div class="dropdown">
                <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <a href="sales/'.$sale_id.'" class="text-primary dropdown-item ">Details</a>
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
        $id = $request->id;
        

        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $invoice = Invoice::find($id);
        $invoice_details = InvoiceDetails::where('invoice_id',$id)->get();

         $data = array(
            'invoice' => $invoice,
            'invoice_details' => $invoice_details,
        );

        return view('sales.invoice')->with($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
