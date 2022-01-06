<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductBrand;
use App\Models\Branch;
use App\Models\Category;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; //helps with deleting files
use DB;

class ProductController extends Controller
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
        $branches = Branch::all();
        $units = Unit::all();
        $brands = ProductBrand::all();
        $categories = Category::all();
        $data = array(
            'branches' => $branches,
            'units' => $units,
            'categories' => $categories,
            'brands' => $brands,
            'message' => ""
        );
        return view('products.index')->with($data);
    }


    // handle fetch all products ajax request
    public function fetchAllProducts()
    {
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
                    '
        );

        if (!empty($products)) {
            $data = array(
                'status'=>200,
                'error' => false,
                'message' => 'success',
                'products' => $products,
            );

            return response()->json($data, 200);
        } else {
            $data = array(
                'status'=>200,
                'error' => true,
                'message' => 'No products found!',
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {




        //create product
        $product = new Product;
        $category_id = $request->input('category_id');
        $unit_id = $request->input('unit_id');
        $brand_id = $request->input('brand_id');
        $product_code = $request->input('product_code');
        $product_name = $request->input('product_name');
        $product_qty = $request->input('product_qty');
        $product_price = $request->input('product_price');
        if ($request->has('product_notes')) {
            $product_notes = $request->input('product_notes');
        }

        if ($request->has('product_serial')) {
            $product_serial = $request->input('product_serial');
        }

        if ($request->has('branch_id')) {
            $branch_id = $request->input('branch_id');
        }

        $fileNamToStore = 'noimage.jpg';
        //Handle file upload
        if ($request->hasFile('product_pic')) {
            // get filename with extension
            $fileNameWithExt = $request->file('product_pic')->getClientOriginalName();

            //get just filename
            $filename = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

            //get just extension
            $extension = $request->file('product_pic')->getClientOriginalExtension();

            //filename to store
            $fileNamToStore = $filename . '_' . time() . '.' . $extension;

            //upload the image
            $path = $request->file('product_pic')->storeAs('product_images', $fileNamToStore);

        } else {
            $fileNamToStore = 'noimage.jpg';
        }

        $product->category_id = $request->input('category_id');
        $product->unit_id = $request->input('unit_id');
        $product->branch_id = $request->input('branch_id');
        $product->brand_id = $request->input('brand_id');
        $product->product_code = $request->input('product_code');
        $product->product_name = $request->input('product_name');
        $product->product_qty = $request->input('product_qty');
        $product->product_price = $request->input('product_price');
        $product->img_url = $fileNamToStore;

        //count if same product code already exists
//        $produt_list = Product::where('product_code', '=', $request->input('product_code'))->get();
        $produt_list = DB::connection('mysql')->select(
            'SELECT 
                    *FROM products
              WHERE product_code =:product_code
                    ',[
                'product_code' => $request->input('product_code')
            ]
        );
//        $product->save();


        if (empty($produt_list)) {

            if ($product->save()) {



                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message' => 'Product saved successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message' => 'Product saving failed, Internal server error'
                ]);
            }
        } else {
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message' => 'Product with same product code already exists'
            ]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request->id;

        $product = Product::find($id);
        $category_id = $product->category_id;
        $unit_id = $product->unit_id;
        $branch_id = $product->branch_id;
        $brand_id = $product->brand_id;


        $branches = Branch::all();
        $units = Unit::all();
        $brands = ProductBrand::all();
        $categories = Category::all();

        $selected_branch = '';
        $selected_brand = '';
        $selected_category = '';
        $selected_unit = '';

        if (count($brands) > 0) {
            foreach ($brands as $brand) {
                if ($brand_id == $brand->id) {
                    $selected_brand .= '<option selected value="' . $brand->id . '">' . $brand->brand_name . '</option>';
                } else {
                    $selected_brand .= '<option value="' . $brand->id . '">' . $brand->brand_name . '</option>';
                }
            }
        }

        if (count($branches) > 0) {
            foreach ($branches as $branch) {
                if ($branch_id == $branch->id) {
                    $selected_branch .= '<option selected value="' . $branch->id . '">' . $branch->branch_name . '</option>';
                } else {
                    $selected_branch .= '<option value="' . $branch->id . '">' . $branch->branch_name . '</option>';
                }
            }
        }

        if (count($units) > 0) {
            foreach ($units as $unit) {
                if ($unit_id == $unit->id) {
                    $selected_unit .= '<option selected value="' . $unit->id . '">' . $unit->unit_name . ' - ' . $unit->unit_symbol . '</option>';
                } else {
                    $selected_unit .= '<option value="' . $unit->id . '">' . $unit->unit_name . ' - ' . $unit->unit_symbol . '</option>';
                }
            }
        }

        if (count($categories) > 0) {
            foreach ($categories as $category) {
                if ($category_id == $category->id) {
                    $selected_category .= '<option selected value="' . $category->id . '">' . $category->category_name . '</option>';
                } else {
                    $selected_category .= '<option value="' . $category->id . '">' . $category->category_name . '</option>';
                }
            }
        }

        $output = '
        <div class="row">
        <input type="hidden" name="eproduct_id" id="eproduct_id" value="' . $id . '" required>

        <div class="col-md-12">
        <div class="form-group">
        <label for="fname">Product Picture</label>
        <input accept=".png, .jpg, .jpeg" type="file" class="form-control" name="eproduct_pic" id="eproduct_pic"  />
        </div>
        </div>

        <div class="col-md-6">
        <div class="form-group">
        <label for="fname">Product Name</label>
        <input type="text" class="form-control" name="eproduct_name" id="eproduct_name" placeholder="Ex: i5 HP" required value="' . $product->product_name . '">
        </div>
        </div>

        <div class=" col-md-6">
        <div class="form-group">
        <label for="ubranch">Product Brand</label>
        <select class="form-control" name="eproduct_brand" id="eproduct_brand" required > 
        ' . $selected_brand . '                    
        </select>
        </div>
        </div>

        <div class=" col-md-6">
        <div class="form-group">
        <label for="ubranch">Product Branch</label>
        <select class="form-control" name="eproduct_branch" id="eproduct_branch" > 
        ' . $selected_branch . '
        </select>
        </div>
        </div>


        <div class="col-md-6">
        <div class="form-group">
        <label for="fname">Product Unit</label>
        <select class="form-control" name="eproduct_unit" id="eproduct_unit" required> 
        ' . $selected_unit . '
        </select>
        </div>
        </div>

        <div class=" col-md-6">
        <div class="form-group">
        <label for="ubranch">Product Category</label>
        <select class="form-control" name="eproduct_category" id="eproduct_category" required> 
        ' . $selected_category . '
        </select>
        </div>
        </div>


        <div class="col-md-6">
        <div class="form-group">
        <label for="fname">Product Code</label>
        <input type="text" class="form-control" name="eproduct_code" id="eproduct_code" placeholder="Ex: 1234567890" required value="' . $product->product_code . '">
        </div>
        </div>

        <div class="col-md-6">
        <div class="form-group">
        <label for="lname">Product Serial</label>
        <input type="text" class="form-control" name="eproduct_serial" id="eproduct_serial" placeholder="Ex: AB4H3W3E3RU355" value="' . $product->product_serial . '">
        </div>
        </div>

        <div class="col-md-6">
        <div class="form-group">
        <label for="lname">Product Quantity</label>
        <input onkeypress="return isNumberKey(event)" type="text" class="form-control" name="eproduct_qty" id="eproduct_qty" placeholder="Ex: 55" required value="' . $product->product_qty . '">
        </div>
        </div>

        <div class="col-md-6">
        <div class="form-group">
        <label for="lname">Product Price (MWK)</label>
        <input onkeypress="return isNumberKey(event)" type="text" class="form-control" name="eproduct_price" id="eproduct_price" placeholder="Ex: 55000" required value="' . $product->product_price . '">
        </div>
        </div>

        <div class="col-md-6">
        <div class="form-group">
        <label for="lname">Product Notes</label>
        <textarea class="form-control" name="eproduct_notes" id="eproduct_notes" placeholder="Ex: limited product">' . $product->product_notes . '</textarea>
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
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    public function showImage($id){
        $product =Product::find($id);
//        print_r($product);
//        echo asset("storage/TeacherImages/{$teacher->profilePic}")
        $path = asset('storage/product_images/'.$product->img_url);
        echo "PATH: ".$path;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //find product"#eproduct_id"
        $id = $request->input('eproduct_id');
        $product = Product::find($id);
        //Handle file upload
        if ($request->hasFile('eproduct_pic')) {
            // get filename with extension
            $fileNameWithExt = $request->file('eproduct_pic')->getClientOriginalName();

            //get just filename
            $filename = pathinfo($fileNameWithExt, PATHINFO_FILENAME);

            //get just extension
            $extension = $request->file('eproduct_pic')->getClientOriginalExtension();

            //filename to store
            $fileNamToStore = $filename . '_' . time() . '.' . $extension;

            //upload the image
            $path = $request->file('eproduct_pic')->storeAs('product_images', $fileNamToStore);

            $product->img_url = $fileNamToStore;

        }


        $product->category_id = $request->input('ecategory_id');
        $product->unit_id = $request->input('eunit_id');
        $product->brand_id = $request->input('ebrand_id');
        $product->product_code = $request->input('eproduct_code');
        $product->product_name = $request->input('eproduct_name');
        $product->product_qty = $request->input('eproduct_qty');
        $product->product_price = $request->input('eproduct_price');
        if ($request->has('eproduct_notes')) {
            $product->product_notes = $request->input('eproduct_notes');
        }

        if ($request->has('eproduct_serial')) {
            $product->product_serial = $request->input('eproduct_serial');
        }

        if ($request->has('ebranch_id')) {
            $product->branch_id = $request->input('ebranch_id');
        }

        if (!empty($product)){
            if ($product->save()) {
                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message' => 'Product updated successfully'
                ]);
            } else {
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message' => 'Product updating failed, Internal server error'
                ]);
            }
        }else{
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message' => 'Product updating failed, product not found'
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!empty($product)){
            if ($product->img_url != 'noimage.jpg') {
                //delete image
                Storage::delete('/' . $product->img_url);
            }
            if ($product->delete()) {
                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message' => 'Product has been deleted'
                ]);
            } else {
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message' => 'Product deleting failed, Internal server error'
                ]);
            }
        }else{
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message' => 'Product deleting failed, product not found'
            ]);
        }

    }
}
