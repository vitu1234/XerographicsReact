<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // insert user
        DB::table('users')->insert([
            'firstname' => 'Vitu',
            'lastname' => 'Mafeni',
            'email' => 'user1@email.com',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        //get inserted user
        $getUserByEmail = DB::select('SELECT * FROM users WHERE email = ?' , ['user1@email.com']);
        $user_id = $getUserByEmail[0]->id;

         DB::table('branches')->insert([
            'branch_name' => 'SampleBranch1',
            'phone' => '+265996670686',
            'email' => 'branch1@email.com',
            'address' => 'Lilongwe address',
        ]);
          //get inserted branch
        $getBranchByPhone = DB::select('SELECT * FROM branches WHERE phone = ?' , ['+265996670686']);
        $branch_id = $getBranchByPhone[0]->id;

         DB::table('user_branches')->insert([
            'userid' => $user_id,
            'branch_id' => $branch_id,
        ]);
    }
}
