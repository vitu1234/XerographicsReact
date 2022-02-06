<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
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
        $categories = Category::all();
        $data = array(
            'categories' => $categories,
        );
        return view('categories.index')->with($data);
    }


         // handle fetch all categories ajax request
    public function fetchAllCategories() {
        // echo "df";
        $categories = Category::all();
        $output = '';

        if ($categories->count() > 0) {
            $data = array(
                'error' => false,
                'message' => 'success',
                'categories' => $categories,

            );

            return response()->json($data, 200);
        } else {
            $data = array(
                'error' => true,
                'message' => 'No categories present',
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



        //create category
        $category = new Category;
        $category->category_name = $request->input('category_name');
        if ($request->has('category_description')) {
            $category->category_notes = $request->input('category_description');
        }

        //check if category name already exists
        $checkCategory = DB::connection('mysql')->select(
            'SELECT * 
                    FROM categories
                    WHERE category_name = :category_name
                    ',
            [
                'category_name' => $request->input('category_name')
            ]
        );

        if (empty($checkCategory)){
            if ($category->save()) {
                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message'=>'Category added successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message'=>'Adding category failed, Internal server error'
                ]);
            }
        }else{
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message'=>'Adding category failed, category name already exists'
            ]);
        }



    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request->id;
        $category = Category::find($id);


        $output = '
        
            
           <div class="row">
           <input type="hidden" name="ecategory_id" id="ecategory_id" value="'.$id.'" required>
            <input type="hidden" name="_token" id="_tokend" required>
           

            <div class="col-md-12">
              <div class="form-group">
                <label for="efname">Category Name</label>
                <input type="text" class="form-control" name="ecategory_name" id="ecategory_name" placeholder="Ex: John" value="'.$category->category_name.'" required>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group">
              <label for="lname">Category Description</label>
                <textarea class="form-control" name="ecategory_description" id="ecategory_description" placeholder="Ex: Accessories Description">'.$category->category_notes.'</textarea>
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
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
     public function update(Request $request, Category $unit)
    {
         //create post
        $id = $request->input('ecategory_id');
        $category = Category::find($id);



        $category->category_name = $request->input('ecategory_name');
        if ($request->has('ecategory_description')) {
            $category->category_notes = $request->input('ecategory_description');
        }

        if (!empty($category)){
            if ($category->save()) {

                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message'=>"Category updated successfully"
                ]);
            }else{
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message'=>"Category updating failed, Internal server error"
                ]);
            }
        }else{
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message'=>"Category updating failed, category not found"
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
     public function destroy($id)
    {
        $category = Category::find($id);

        if (!empty($category)){
            if ($category->delete()) {

//                //delete products in this category
//                $products_in_category = Product::where('category_id',$id)->get();//get all users belonging to this branch
//                foreach($products_in_category as $product_in_category ){
//                    $product_id= $product_in_category->id;
//                    $product = User::find($product_id);
//                    if ($product->img_url != 'noimage.jpg') {
//                        //delete image
//                        Storage::delete('public/product_images/'.$product->img_url);
//                    }
//                    //delete the product
//                    $product->delete();
//                }


                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message'=>'Category deleted successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message'=>'Deleting category failed, Internal server error'
                ]);
            }
        }else{
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message'=>'Deleting category failed, category not found!'
            ]);
        }

    }
}
