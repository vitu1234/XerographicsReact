<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
//        if (auth()->user() != null){
//            return response()->json([ 'user' => "dk" ]);
//        }else{
//            return response()->json([ 'invalid' => "not logged in" ]);
//        }
//        return auth()->user();
        $this->middleware('auth:api', ['except' => ['login']]);
//        if(!empty(auth()->check())){
//
//            return response()->json([ 'valid' => auth()->check() ]);
//        }else{
//            return response()->json([ 'valid' => " Not logged in" ],401);
//
//        }


    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

//        setcookie('token', $token, time() + (86400 * 30), "/");


        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        //get user
        $user = $this->me()->original;
        $person = '';
        if ($user->role == 'admin') {
            $person = '101';

        } elseif ($user->role == 'manager') {
            $person = '202';
        } elseif ($user->role == 'assistant') {
            $person = '303';
        }

        //get user branch
        $userBranch = DB::connection('mysql')->select(
            'SELECT * 
                    FROM user_branches
                    WHERE userid = :user_id
                    ',
            [
                'user_id' => $user->id
            ]
        );

        $branch = '';

        if (!empty($userBranch)) {
            $branch = $userBranch[0]->branch_id;
        } else {
            $branch = -1;
        }

        return response()->json([
            'error' => false,
            'message' => 'Login success',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 100,
            'person' => $person,
            'branch' => $branch
        ])->withCookie(cookie('token', $token, 1000));

    }
}
