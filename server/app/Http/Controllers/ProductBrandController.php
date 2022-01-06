<?php

namespace App\Http\Controllers;

use App\Models\ProductBrand;
use Illuminate\Http\Request;

class ProductBrandController extends Controller
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
       $productbrands = ProductBrand::all();
       $data = array(
        'productbrands' => $productbrands,
    );
       return view('brands.index')->with($data);
   }

             // handle fetch all product brands ajax request
   public function fetchAllProductBrands() {
        // echo "df";
     $productbrands = ProductBrand::all();
     $output = '';

     if ($productbrands->count() > 0) {
        $output .= '<table class="table align-items-center table-flush table-hover mt-3" id="units_tbl">
        <thead class="thead-light">
        <tr>
        <th scope="col">Brand Name</th>
        <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody class="list">';
        foreach ($productbrands as $productbrand) {
            $brand_id = $productbrand->id;

            $output.='

            <tr>
            <th scope="row">
            <div class="media align-items-center">
            <div class="media-body">
            <span class="name mb-0 text-sm"> '.$productbrand->brand_name.'</span>
            </div>
            </div>
            </th>

            <td class="text-right">
            <div class="dropdown">
            <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
            <a href="#" id="'.$productbrand->id.'" class="text-primary dropdown-item editIconBrand" data-toggle="modal" data-target="#editbrandModal">Edit</a>

            <a href="" id="delBtn'.$productbrand->id.'" onclick="deleteBrand(\''.$productbrand->id.'\',\''.$productbrand->brand_name.'\')"  class="dropdown-item text-danger">Delete</a>

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

        //create post
        $brand = new ProductBrand;
        $brand->brand_name = $request->input('brand_name');
        

        if ($brand->save()) {
            return response()->json([
                'status' => 200,
            ]);
        }else{
            return response()->json([
                'status' => 500,
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProductBrand  $productBrand
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request->id;
        $brand = ProductBrand::find($id);

        
        $output = '
        

        <div class="row">
        <input type="hidden" name="ebrand_id" id="ebrand_id" value="'.$id.'" required>
        <input type="hidden" name="_token" id="_tokend" required>


        <div class="col-md-12">
        <div class="form-group">
        <label for="efname">Branch Name</label>
        <input type="text" class="form-control" name="ebrand_name" id="ebrand_name" placeholder="Ex: Samsung" value="'.$brand->brand_name.'" required />
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
     * @param  \App\Models\ProductBrand  $productBrand
     * @return \Illuminate\Http\Response
     */
    public function edit(ProductBrand $productBrand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProductBrand  $productBrand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProductBrand $brand)
    {
         //create post
        $id = $request->input('ebrand_id');
        $brand = ProductBrand::find($id);
        $brand->brand_name = $request->input('ebrand_name');
        

        if ($brand->save()) {

            return response()->json([
                'status' => 200,
                'message'=>"saved"
            ]);
        }else{
            return response()->json([
                'status' => 500,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProductBrand  $productBrand
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $brand = ProductBrand::find($id);
        
        if ($brand->delete()) {
            
            return response()->json([
                'status' => 200,
            ]);
        }else{
            return response()->json([
                'status' => 500,
            ]);
        }
    }
}
