<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\User;
use App\Models\UserBranch;
use DB;
use Hash;
use Illuminate\Http\Request;

class UsersController extends Controller
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
        $branches = Branch::all();
        $users = User::all();
        $data = array(
            'branches' => $branches,
            'users' => $users,
        );
        return view('users.index')->with($data);
    }


    // handle fetch all users ajax request
    public function fetchAllUsers()
    {
        // echo "df";
        // $me = auth()->user()->id; //get users except me
        $id = auth()->user()->id; //get users except me
        $role = auth()->user()->role; //get users except me

        //get admin role
        if ($role === 'admin') {
            $users = DB::connection('mysql')->select(
                'SELECT * 
                    FROM users
                    LEFT JOIN user_branches 
                    ON users.id = user_branches.userid  
                    WHERE users.id != :user_id
                    ',
                [
                    'user_id' => $id
                ]
            );
        } else {
            $users = DB::connection('mysql')->select(
                'SELECT * 
                    FROM users
                    LEFT JOIN user_branches 
                    ON users.id = user_branches.userid  
                    WHERE users.id != :user_id
                    AND role != :role
                    ',
                [
                    'user_id' => $id,
                    'role' => 'admin'
                ]
            );
        }


        $output = '';

        if (count($users) > 0) {
            $data = array(
                'error' => false,
                'message' => 'success',
                'users' => $users,

            );

            return response()->json($data, 200);
        } else {
            $data = array(
                'error' => true,
                'message' => 'No users present',
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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //create post
        $user = new User;
        $user->firstname = $request->input('fname');
        $user->lastname = $request->input('lname');
        $user->email = $request->input('email');
        $user->role = $request->input('urole');
        $user->password = Hash::make($request->input('password'));


        $checkUser = User::where('email', $request->input('email'))->get();
        if ($checkUser->count() == 0) {
            if ($user->save()) {

                $userbranch = new UserBranch;
                $userbranch->branch_id = $request->input('ubranch');
                //get user id of just inserted user
                $user_id = DB::table('users')->where('email', $request->input('email'))->value('id');
                $userbranch->userid = $user_id;
                $userbranch->save();
                return response()->json([
                    'status' => 200,
                    'error' => false,
                    'message' => 'user added successfully',
                ]);
            } else {
                return response()->json([
                    'status' => 500,
                    'error' => true,
                    'message' => 'failed adding user',
                ]);
            }
        } else {
            return response()->json([
                'status' => 500,
                'error' => true,
                'message' => 'Failed adding user, user already exists',
            ]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        $branches = Branch::all();
        $userbranch = DB::connection('mysql')->select(
            'SELECT * 
                    FROM user_branches
                    WHERE userid = :userid
                    ',
            [
                'userid' => $id
            ]
        );

        if (!empty($userbranch)) {
            $selected_user_branch = $userbranch[0];
        } else {
            $selected_user_branch = $userbranch;
        }


        $data = array(
            'error' => false,
            'message' => 'success',
            'user' => $user,
            'userbranch' => $selected_user_branch,
            'branches' => $branches

        );

        return response()->json($data, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //create post
        $id = $request->input('euser_id');
        $user = User::find($id);

        $user->firstname = $request->input('efname');
        $user->lastname = $request->input('elname');
        $user->email = $request->input('eemail');
        $user->role = $request->input('eurole');

        if ($request->has('epassword')) {
            $user->password = Hash::make($request->input('epassword'));
        }
        if ($request->has('user_status')) {
            $user->status = $request->input('user_status');
        }

        $userbranch = UserBranch::where('userid', $id)->first();
        // print_r($userbranch->branch_id);die();
        $userbranch->branch_id = $request->input('eubranch');
        if ($user->save() && $userbranch->save()) {

            return response()->json([
                'status' => 200,
                'error' => false,
                'message' => "User updated successfully"

            ]);
        } else {
            return response()->json([
                'status' => 500,
                'error' => true,
                'message' => 'Failed updating user, try again later!',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $user = User::find($id);
        $userbranch = DB::table('user_branches')->where('userid', $id);

        if ($user->delete() && $userbranch->delete()) {
            return response()->json([
                'status' => 200,
                'error' => false,
                'message' => "success"
            ]);
        } else {
            return response()->json([
                'status' => 500,
                'error' => false,
                'message' => "success"
            ]);
        }
    }
}
