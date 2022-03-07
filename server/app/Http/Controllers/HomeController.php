<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
        $this->middleware('auth:api');

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($selected_branch, $year, $month)
    {

        $date = $year . '-' . $month . '-' . date('d') . ' 00:00:00';
        $date_min_year = DB::connection('mysql')->select(
            '
                SELECT YEAR(created_at) AS min_year FROM invoices 
                    GROUP BY YEAR(created_at) ORDER BY created_at ASC;
            '
        );
        $start_year = (!empty($date_min_year)) ? $date_min_year[0]->min_year : 2000;
        $years = array_reverse(range($start_year, strftime("%Y", time())));


        $date_thirty_days_ago = date('Y-m-d g:i:s a', strtotime("-30 days", strtotime($date))) . "<br/>"; //Thirty days before        echo "<br>";
        $id = auth()->user()->id; //get users except me
        $role = auth()->user()->role; //get users except me

        $customersSummary = DB::connection("mysql")->select(
            'SELECT 
                                CASE 
                                    WHEN (MONTH(created_at) = 1) 
                                        THEN "Jan" 
                                    WHEN (MONTH(created_at) = 2) 
                                        THEN "Feb" 
                                    WHEN (MONTH(created_at) = 3) 
                                        THEN "Mar" 
                                    WHEN (MONTH(created_at) = 4) 
                                        THEN "Apr" 
                                    WHEN (MONTH(created_at) = 5) 
                                        THEN "May" 
                                    WHEN (MONTH(created_at) = 6) 
                                        THEN "Jun" 
                                    WHEN (MONTH(created_at) = 7) 
                                        THEN "Jul" 
                                    WHEN (MONTH(created_at) = 8) 
                                        THEN "Aug" 
                                    WHEN (MONTH(created_at) = 9) 
                                        THEN "Sep" 
                                    WHEN (MONTH(created_at) = 10) 
                                        THEN "Oct" 
                                    WHEN (MONTH(created_at) = 11) 
                                        THEN "Nov" 
                                    WHEN (MONTH(created_at) = 12) 
                                        THEN "Dec" 
                                    ELSE "" END 
                                AS month_name, MONTH(created_at) month_number, COUNT(*) record_count 
                                FROM customers 
                                WHERE YEAR(created_at)=? 
                                GROUP BY MONTH(created_at),month_name;',
            [
                $year
            ]
        );


        if ($role === 'admin') {

            if ($selected_branch == 'all') {

                $salesLastThirtyDays = DB::connection('mysql')->select(
                    "SELECT * FROM `invoices` 
                            WHERE created_at >= ? 
                            ",
                    [
                        $date_thirty_days_ago]
                );

                $yearSummary = DB::connection("mysql")->select(
                    'SELECT 
                                CASE 
                                    WHEN (MONTH(created_at) = 1) 
                                        THEN "Jan" 
                                    WHEN (MONTH(created_at) = 2) 
                                        THEN "Feb" 
                                    WHEN (MONTH(created_at) = 3) 
                                        THEN "Mar" 
                                    WHEN (MONTH(created_at) = 4) 
                                        THEN "Apr" 
                                    WHEN (MONTH(created_at) = 5) 
                                        THEN "May" 
                                    WHEN (MONTH(created_at) = 6) 
                                        THEN "Jun" 
                                    WHEN (MONTH(created_at) = 7) 
                                        THEN "Jul" 
                                    WHEN (MONTH(created_at) = 8) 
                                        THEN "Aug" 
                                    WHEN (MONTH(created_at) = 9) 
                                        THEN "Sep" 
                                    WHEN (MONTH(created_at) = 10) 
                                        THEN "Oct" 
                                    WHEN (MONTH(created_at) = 11) 
                                        THEN "Nov" 
                                    WHEN (MONTH(created_at) = 12) 
                                        THEN "Dec" 
                                    ELSE "" END 
                                AS month_name, MONTH(created_at) month_number, COUNT(*) record_count 
                                FROM invoices 
                                WHERE YEAR(created_at)=? 
                                GROUP BY MONTH(created_at),month_name;',
                    [
                        $year
                    ]
                );



                $salesThisMonth = DB::connection('mysql')->select(
                    'SELECT * FROM invoices 
                        WHERE MONTH(created_at) = ? 
                        AND YEAR(created_at) = ?
                        ;',
                    [
                        $month,
                        $year
                    ]
                );
                $recent_sales = DB::connection('mysql')->select(
                    '
                    SELECT invoices.*,  users.firstname AS saleby_firstname, users.lastname AS saleby_lastname, 
                    users.email AS saleby_email, customers.customer_name, customers.customer_phone, customers.address 
                    FROM invoices
                    LEFT JOIN users
                    ON invoices.sale_by = users.id
                    LEFT JOIN branches
                    ON invoices.branch_id = branches.id
                    LEFT JOIN customers
                    ON invoices.customer_id = customers.id    
                        
                        ORDER BY invoices.id DESC LIMIT 10;'
                );
                $customers = Customer::all();
                $products_available = Product::where('product_qty', '>', '0')->get();
                $products_unavailable = Product::where('product_qty', '=', '0')->get();

            } else {

                $recent_sales = DB::connection('mysql')->select(
                    'SELECT invoices.*,  users.firstname AS saleby_firstname, users.lastname AS saleby_lastname, 
                    users.email AS saleby_email, customers.customer_name, customers.customer_phone, customers.address 
                    FROM invoices
                    LEFT JOIN users
                    ON invoices.sale_by = users.id
                    LEFT JOIN branches
                    ON invoices.branch_id = branches.id
                    LEFT JOIN customers
                    ON invoices.customer_id = customers.id 
                        WHERE invoices.branch_id =?
                        ORDER BY invoices.id DESC LIMIT 10;',
                    [
                        $selected_branch
                    ]
                );

                $user_branch_id = $selected_branch;
                $salesLastThirtyDays = DB::connection('mysql')->select(
                    "SELECT * FROM `invoices` 
                            WHERE created_at >= ? 
                            AND branch_id =?",
                    [
                        $date_thirty_days_ago,
                        $user_branch_id
                    ]
                );
                $salesThisMonth = DB::connection('mysql')->select(
                    'SELECT * FROM invoices 
                        WHERE MONTH(created_at) = ? 
                        AND YEAR(created_at) = ?
                        AND branch_id =?;',
                    [
                        $month,
                        $year,
                        $user_branch_id
                    ]
                );
                $customers = Customer::all();
                $products_available = DB::connection('mysql')->select(
                    'SELECT * 
                    FROM products 
                    WHERE product_qty > 0
                    AND branch_id =?
                    ',
                    [
                        $user_branch_id
                    ]
                );
                $products_unavailable = DB::connection('mysql')->select(
                    'SELECT * 
                    FROM products 
                    WHERE product_qty = 0
                    AND branch_id =?
                    ',
                    [
                        $user_branch_id
                    ]
                );

                $yearSummary = DB::connection("mysql")->select(
                    'SELECT 
                                CASE 
                                    WHEN (MONTH(created_at) = 1) 
                                        THEN "Jan" 
                                    WHEN (MONTH(created_at) = 2) 
                                        THEN "Feb" 
                                    WHEN (MONTH(created_at) = 3) 
                                        THEN "Mar" 
                                    WHEN (MONTH(created_at) = 4) 
                                        THEN "Apr" 
                                    WHEN (MONTH(created_at) = 5) 
                                        THEN "May" 
                                    WHEN (MONTH(created_at) = 6) 
                                        THEN "Jun" 
                                    WHEN (MONTH(created_at) = 7) 
                                        THEN "Jul" 
                                    WHEN (MONTH(created_at) = 8) 
                                        THEN "Aug" 
                                    WHEN (MONTH(created_at) = 9) 
                                        THEN "Sep" 
                                    WHEN (MONTH(created_at) = 10) 
                                        THEN "Oct" 
                                    WHEN (MONTH(created_at) = 11) 
                                        THEN "Nov" 
                                    WHEN (MONTH(created_at) = 12) 
                                        THEN "Dec" 
                                    ELSE "" END 
                                AS month_name, MONTH(created_at) month_number, COUNT(*) record_count 
                                FROM invoices 
                                WHERE YEAR(created_at)=? 
                                AND invoices.branch_id = ?
                                GROUP BY MONTH(created_at),month_name;',
                    [
                        $year,
                        $user_branch_id
                    ]
                );

            }

            $branches = Branch::all();


            $data = array(
                'error' => false,
                'message' => 'success',
                'branches' => $branches,
                'customers' => $customers,
                'products_available' => $products_available,
                'products_unavailable' => $products_unavailable,
                'salesThisMonth' => $salesThisMonth,
                'salesLastThirtyDays' => $salesLastThirtyDays,
                'year_summary' => $yearSummary,
                'customers_summary' => $customersSummary,
                'recent_sales' => $recent_sales,
                'years' => $years,

            );

            return response()->json($data, 200);
        } else {
            //get user branch
            $user_branch = DB::connection('mysql')->select(
                'SELECT * 
                    FROM user_branches 
                    WHERE userid = :user_id
                    ',
                [
                    'user_id' => $id,
                ]
            );

            $user_branch_id = $user_branch[0]->branch_id;
            $salesLastThirtyDays = DB::connection('mysql')->select(
                "SELECT * FROM `invoices` 
                            WHERE created_at >= ? 
                            AND branch_id =?",
                [
                    $date_thirty_days_ago,
                    $user_branch_id
                ]
            );
            $salesThisMonth = DB::connection('mysql')->select(
                'SELECT * FROM invoices 
                        WHERE MONTH(created_at) = ? 
                        AND YEAR(created_at) = ?
                        AND branch_id =?;',
                [
                    $month,
                    $year,
                    $user_branch_id
                ]
            );
            $customers = Customer::all();
            $products_available = DB::connection('mysql')->select(
                'SELECT * 
                    FROM products 
                    WHERE product_qty > 0
                    AND branch_id =?
                    ',
                [
                    $user_branch_id
                ]
            );
            $products_unavailable = DB::connection('mysql')->select(
                'SELECT * 
                    FROM products 
                    WHERE product_qty = 0
                    AND branch_id =?
                    ',
                [
                    $user_branch_id
                ]
            );
            $recent_sales = DB::connection('mysql')->select(
                'SELECT invoices.*,  users.firstname AS saleby_firstname, users.lastname AS saleby_lastname, 
                    users.email AS saleby_email, customers.customer_name, customers.customer_phone, customers.address 
                    FROM invoices
                    LEFT JOIN users
                    ON invoices.sale_by = users.id
                    LEFT JOIN branches
                    ON invoices.branch_id = branches.id
                    LEFT JOIN customers
                    ON invoices.customer_id = customers.id 
                        WHERE invoices.branch_id =?
                        ORDER BY invoices.id DESC LIMIT 10;
                       ',
                [
                    $selected_branch
                ]
            );
            $yearSummary = DB::connection("mysql")->select(
                'SELECT 
                                CASE 
                                    WHEN (MONTH(created_at) = 1) 
                                        THEN "Jan" 
                                    WHEN (MONTH(created_at) = 2) 
                                        THEN "Feb" 
                                    WHEN (MONTH(created_at) = 3) 
                                        THEN "Mar" 
                                    WHEN (MONTH(created_at) = 4) 
                                        THEN "Apr" 
                                    WHEN (MONTH(created_at) = 5) 
                                        THEN "May" 
                                    WHEN (MONTH(created_at) = 6) 
                                        THEN "Jun" 
                                    WHEN (MONTH(created_at) = 7) 
                                        THEN "Jul" 
                                    WHEN (MONTH(created_at) = 8) 
                                        THEN "Aug" 
                                    WHEN (MONTH(created_at) = 9) 
                                        THEN "Sep" 
                                    WHEN (MONTH(created_at) = 10) 
                                        THEN "Oct" 
                                    WHEN (MONTH(created_at) = 11) 
                                        THEN "Nov" 
                                    WHEN (MONTH(created_at) = 12) 
                                        THEN "Dec" 
                                    ELSE "" END 
                                AS month_name, MONTH(created_at) month_number, COUNT(*) record_count 
                                FROM invoices 
                                WHERE YEAR(created_at)=? 
                                AND invoices.branch_id = ?
                                GROUP BY MONTH(created_at),month_name;',
                [
                    $year,
                    $user_branch_id
                ]
            );

            $branches = DB::connection('mysql')->select(
                'SELECT * 
                    FROM branches 
                    WHERE id = :branch_id
                    ',
                [
                    'branch_id' => $user_branch_id,
                ]
            );

            $data = array(
                'error' => false,
                'message' => 'success',
                'branches' => $branches,
                'customers' => $customers,
                'products_available' => $products_available,
                'products_unavailable' => $products_unavailable,
                'salesThisMonth' => $salesThisMonth,
                'salesLastThirtyDays' => $salesLastThirtyDays,
                'year_summary' => $yearSummary,
                'customers_summary' => $customersSummary,
                'recent_sales' => $recent_sales,
                'years' => $years,

            );

            return response()->json($data, 200);
        }


    }
}
