<?php

namespace App\Http\Controllers;

use App\Models\ProductBrand;
use Illuminate\Http\Request;
use DB;


class ProductBrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
//        $this->middleware('auth');
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
       $products_brand = DB::connection('mysql')->select(
           'SELECT *
                    FROM products_brand'
       );

       if (!empty($products_brand)) {
           $data = array(
               'status'=>200,
               'error' => false,
               'message' => 'success',
               'brands' => $products_brand,
           );

           return response()->json($data, 200);
       } else {
           $data = array(
               'status'=>200,
               'error' => true,
               'message' => 'No product brands found!',
           );

           return response()->json($data, 200);
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

        //check if brand name already exists
        $checkBrandName = DB::connection('mysql')->select(
            'SELECT 
                    *FROM products_brand
              WHERE brand_name =:brand_name
                    ',[
                'brand_name' => $request->input('brand_name')
            ]
        );

        if (empty($checkBrandName)){
            if ($brand->save()) {
                return response()->json([
                    'status'=>200,
                    'error' => false,
                    'message' => 'Product Brand saved',
                ]);
            }else{
                return response()->json([
                    'status'=>500,
                    'error' => true,
                    'message' => 'Internal server error, product saving failed',
                ]);
            }
        }else{
            return response()->json([
                'status'=>500,
                'error' => true,
                'message' => 'Brand name already exists, saving failed',
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
                'status'=>200,
                'error' => false,
                'message' => 'Brand name updated',
            ]);
        }else{
            return response()->json([
                'status'=>500,
                'error' => true,
                'message' => 'Brand name, saving failed',
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

        if (!empty($brand)){
            if ($brand->delete()) {

                return response()->json([
                    'status'=>200,
                    'error' => false,
                    'message' => 'Brand name deleted',
                ]);
            }else{
                return response()->json([
                    'status'=>500,
                    'error' => true,
                    'message' => 'Internal server error, Brand name deleting failed',
                ]);
            }
        }else{
            return response()->json([
                'status'=>500,
                'error' => true,
                'message' => 'Internal server error, resource not failed',
            ]);
        }


    }
}
