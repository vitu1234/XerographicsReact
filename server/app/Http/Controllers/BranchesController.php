<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Category;
use App\Models\ProductBrand;
use App\Models\Unit;
use App\Models\User;
use App\Models\UserBranch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BranchesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct()
    {
//        $this->middleware('auth');
        $this->middleware('auth:api', ['except' => ['login']]);

    }

    public function index()
    {
        $branches = Branch::all();
        $data = array(
            'branches' => $branches,
        );
        return view('branches.index')->with($data);
    }

         // handle fetch all branches ajax request
    public function fetchAllBranches() {
        // echo "df";
        $branches = Branch::all();
        $brands = ProductBrand::all();
        $units = Unit::all();
        $categories = Category::all();

        if ($branches->count() > 0) {
            $data = array(
                'error' => false,
                'message' => 'success',
                'branches' => $branches,
                'brands' => $brands,
                'units' => $units,
                'categories' => $categories,

            );

            return response()->json($data, 200);
        } else {
            $data = array(
                    'error' => true,
                    'message' => 'No branches present'
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

        //create post
        $branch = new Branch;
        $branch->branch_name = $request->input('branch_name');
        $branch->phone = $request->input('branch_phone');
        $branch->email = $request->input('branch_email');
        $branch->address = $request->input('branch_address');

        //check if branch name already exists
        $checkBranch = DB::connection('mysql')->select(
            'SELECT * 
                    FROM branches
                    WHERE branch_name = :branch_name
                    ',
            [
                'branch_name' => $request->input('branch_name')
            ]
        );

        if (empty($checkBranch)){
            if ($branch->save()) {
                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message'=>'Branch added successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message'=>'Adding branch failed, Internal server error'
                ]);
            }
        }else{
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message'=>'Adding branch failed, branch name already exists'
            ]);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request->id;
        $branch = Branch::find($id);


        $output = '
        
        
        <div class="row">
        <input type="hidden" name="ebranch_id" id="ebranch_id" value="'.$id.'" required>
        <input type="hidden" name="_token" id="_tokend" required>
        

        <div class="col-md-6">
        <div class="form-group">
        <label for="efname">Branch Name</label>
        <input type="text" class="form-control" name="ebranch_name" id="ebranch_name" placeholder="Ex: City center branch" value="'.$branch->branch_name.'" required />
        </div>
        </div>

        <div class="col-md-6">
        <div class="form-group">
        <label for="elname">Branch Phone</label>
        <input type="text" class="form-control" value="'.$branch->phone.'" name="ebranch_phone" id="ebranch_phone" placeholder="Ex: +265999xxxxx" required>
        </div>
        </div>
        

        <div class="col-md-6">
        <div class="form-group">
        <label for="elname">Branch Email</label>
        <input type="email" class="form-control" value="'.$branch->email.'" name="ebranch_email" id="ebranch_email" placeholder="Ex: example@gmail.com" required>
        </div>
        </div>

        <div class="col-md-6">
        <div class="form-group">
        <label for="elname">Branch Address</label>
        <textarea class="form-control" name="ebranch_address" id="ebranch_address" placeholder="Ex: City center behind banks" required>'.$branch->address.'</textarea>
        
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
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit(Branch $branch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Branch $branch)
    {
         //create post
        $id = $request->input('ebranch_id');
        $branch = Branch::find($id);
        $branch->branch_name = $request->input('ebranch_name');
        $branch->phone = $request->input('ebranch_phone');
        $branch->email = $request->input('ebranch_email');
        $branch->address = $request->input('ebranch_address');

        if (!empty($branch)){
            if ($branch->save()) {

                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message'=>"Branch updated successfully"
                ]);
            }else{
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message'=>"Branch updating failed, Internal server error"
                ]);
            }
        }else{
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message'=>"Branch updating failed, branch not found"
            ]);
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $branch = Branch::find($id);
        if (!empty($branch)) {
            $userbranches = UserBranch::where('branch_id',$id)->get();//get all users belonging to this branch
            if ($branch->delete()) {
                foreach($userbranches as $userbranch ){
                    $user_id= $userbranch->userid;
                    $user = User::find($user_id);
                    //delete the user
                    $user->delete();
                }

                return response()->json([
                    'status' => 200,
                    'error'=>false,
                    'message'=>'Branch deleted successfully'
                ]);
            }else{
                return response()->json([
                    'status' => 500,
                    'error'=>true,
                    'message'=>'Deleting branch failed, Internal server error'
                ]);
            }

        } else {
            return response()->json([
                'status' => 500,
                'error'=>true,
                'message'=>'Deleting branch failed, branch not found!'
            ]);
        }
    }
}
