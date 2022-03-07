<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
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
        $customers = Customer::all();
        $data = array(
            'customers' => $customers,
        );
        return view('customers.index')->with($data);
    }
 // handle fetch all users ajax request
    public function fetchAllCustomers() {

        $customers = Customer::all();

        if ($customers->count() > 0) {
            $data = array(
                'error' => false,
                'message' => 'success',
                'customers' => $customers,

            );

            return response()->json($data, 200);
        } else {
            $data = array(
                'error' => true,
                'message' => 'No customers present',
            );

            return response()->json($data, 201);
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

        // echo "df";die();
         //create customer
        $customer = new Customer;
        $checkCustomer = Customer::where('customer_phone',$request->input('customer_phone'))->get();
        if ($checkCustomer->count()  == 0) {
            $customer->customer_name = $request->input('customer_name');
            $customer->customer_phone = $request->input('customer_phone');

            if ($request->has('customer_address')) {
                $customer->address = $request->input('customer_address');
            }



            if ($customer->save()) {
                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message' => 'Customer details saved!'
                ]);
            }else{
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message' => 'Error 500: Internal server error, customer saving failed!'
                ]);
            }
        }else{
            return response()->json([
                'status' => 201,
                'error'=>true,
                'message' => 'Customer with same phone number already exists!'
            ]);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request->id;
        $customer = Customer::find($id);

        $output = '

        <div class="row">
        <input type="hidden" name="ecustomer_id" id="ecustomer_id" value="'.$id.'" required>
        <input type="hidden" name="_token" id="_tokend" required>



        <div class="col-md-6">
        <div class="form-group">
        <label for="efname">Customer Name</label>
        <input type="text" class="form-control" name="ecustomer_name" id="ecustomer_name" placeholder="Ex: John Doe" value="'.$customer->customer_name.'" required>
        </div>
        </div>

        <div class="col-md-6">
        <div class="form-group">
        <label for="elname">Customer Phone</label>
        <input type="text" class="form-control" value="'.$customer->customer_phone.'" name="ecustomer_phone" id="ecustomer_phone" placeholder="Ex: +265882992942" required>
        </div>
        </div>

        </div>

        <div class="col-md-12">
        <div class="form-group">
        <label for="epassword">Password</label>
        <textarea class="form-control" name="ecustomer_address">'.$customer->address.'</textarea>
        </div>
        </div>

        </div>


        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" id="btn_editx" class="btn btn-primary">Save</button>
        </div>

        ';
        echo $output;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
         //create post
        $id = $request->input('ecustomer_id');
        $customer = Customer::find($id);

        $customer->customer_name = $request->input('ecustomer_name');
        $customer->customer_phone = $request->input('ecustomer_phone');
        $customer->address = $request->input('ecustomer_address');

        if ($customer->save()) {

            return response()->json([
                'error' =>false,
                'status' => 200,
                'message'=>"Customer details updated"
            ]);
        }else{
            return response()->json([
                'error' =>false,
                'status' => 500,
                'message'=>"Customer details updating failed"
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $customer = Customer::find($id);
        if (!empty($customer)){
            if ($customer->delete() ) {
                return response()->json([
                    'error' =>false,
                    'status' => 200,
                    'message'=>"Customer deleted successfully"
                ]);
            }else{
                return response()->json([
                    'error' =>true,
                    'status' => 500,
                    'message'=>"Customer deleting failed"
                ]);
            }
        }else{
            return response()->json([
                'error' =>true,
                'status' => 500,
                'message'=>"Customer deleting failed, record not found!"
            ]);
        }

    }
}
