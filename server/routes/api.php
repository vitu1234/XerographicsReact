<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {

    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::get('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::get('user', 'App\Http\Controllers\AuthController@me');

});


Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//USER ROUTES
//all user control
Route::resource('users', 'App\Http\Controllers\UsersController');
//get all users
Route::get('/fetchAllUsers', ['App\Http\Controllers\UsersController', 'fetchAllUsers'])->name('fetchAllUsers');
// add user
Route::post('/saveUser', ['App\Http\Controllers\UsersController', 'store'])->name('saveUser');
// delete user
Route::delete('/deleteUser/{id}', ['App\Http\Controllers\UsersController', 'destroy'])->name('deleteUser');
//show edit user
Route::get('/editUser/{id}', ['App\Http\Controllers\UsersController', 'show'])->name('editUser');
// update user
Route::put('/updateUser', ['App\Http\Controllers\UsersController', 'update'])->name('updateUser');

// ===========================================================================

//USER ROUTES
//all customer control
Route::resource('customers', 'App\Http\Controllers\CustomerController');
//get all customers
Route::get('/fetchAllCustomers', ['App\Http\Controllers\CustomerController', 'fetchAllCustomers'])->name('fetchAllCustomers');
// add customer
Route::post('/saveCustomer', ['App\Http\Controllers\CustomerController', 'store'])->name('saveCustomer');
// delete customer
Route::delete('/deleteCustomer/{id}', ['App\Http\Controllers\CustomerController', 'destroy'])->name('deleteCustomer');
//show edit customer
Route::get('/editCustomer', ['App\Http\Controllers\CustomerController', 'show'])->name('editUser');
// update customer
Route::put('/updateCustomer', ['App\Http\Controllers\CustomerController', 'update'])->name('updateCustomer');

// ===========================================================================


//UNITS ROUTES
//all unit control
Route::resource('units', 'App\Http\Controllers\UnitController');
//get all users
Route::get('/fetchAllUnits', ['App\Http\Controllers\UnitController', 'fetchAllUnits'])->name('fetchAllUnits');
// add user
Route::post('/saveUnit', ['App\Http\Controllers\UnitController', 'store'])->name('saveUnit');
// delete user
Route::delete('/deleteUnit/{id}', ['App\Http\Controllers\UnitController', 'destroy'])->name('deleteUnit');
//show edit user
Route::get('/editUnit', ['App\Http\Controllers\UnitController', 'show'])->name('editUnit');
// update user
Route::put('/updateUnit', ['App\Http\Controllers\UnitController', 'update'])->name('updateUnit');

// ===========================================================================

//CATEGORIES ROUTES
//all category control
Route::resource('categories', 'App\Http\Controllers\CategoryController');
//get all categories
Route::get('/fetchAllCategories', ['App\Http\Controllers\CategoryController', 'fetchAllCategories'])->name('fetchAllCategories');
// add category
Route::post('/saveCategory', ['App\Http\Controllers\CategoryController', 'store'])->name('saveCategory');
// delete category
Route::delete('/deleteCategory/{id}', ['App\Http\Controllers\CategoryController', 'destroy'])->name('deleteCategory');
//show edit category
Route::get('/editCategory', ['App\Http\Controllers\CategoryController', 'show'])->name('editCategory');
// update category
Route::put('/updateCategory', ['App\Http\Controllers\CategoryController', 'update'])->name('updateCategory');


// ===========================================================================

//BRANCHES ROUTES
//all branches control
Route::resource('branches', 'App\Http\Controllers\BranchesController');
//get all branches
Route::get('/fetchAllBranches', ['App\Http\Controllers\BranchesController', 'fetchAllBranches'])->name('fetchAllBranches');
// add branch
Route::post('/saveBranch', ['App\Http\Controllers\BranchesController', 'store'])->name('saveBranch');
// delete branch
Route::delete('/deleteBranch/{id}', ['App\Http\Controllers\BranchesController', 'destroy'])->name('deleteBranch');
//show edit branch
Route::get('/editBranch', ['App\Http\Controllers\BranchesController', 'show'])->name('editBranch');
// update branch
Route::put('/updateBranch', ['App\Http\Controllers\BranchesController', 'update'])->name('updateBranch');


// ===========================================================================

//PRODUCTS ROUTES
//all products control
Route::resource('products', 'App\Http\Controllers\ProductController');
//get all products
Route::get('showImage/{id}', ['App\Http\Controllers\ProductController', 'showImage'])->name('showImage');
Route::get('/fetchAllProducts', ['App\Http\Controllers\ProductController', 'fetchAllProducts'])->name('fetchAllProducts');
// add product
Route::post('/saveProduct', ['App\Http\Controllers\ProductController', 'store'])->name('saveProduct');
// delete product
Route::delete('/deleteProduct/{id}', ['App\Http\Controllers\ProductController', 'destroy'])->name('deleteProduct');
//show edit product
Route::get('/editProduct', ['App\Http\Controllers\ProductController', 'show'])->name('editProduct');
// update product
Route::put('/updateProduct', ['App\Http\Controllers\ProductController', 'update'])->name('updateProduct');


// ===========================================================================

//PRODUCT BRANDS ROUTES
//all product brands control
Route::resource('brands', 'App\Http\Controllers\ProductBrandController');
//get all product brands
Route::get('/fetchAllBrands', ['App\Http\Controllers\ProductBrandController', 'fetchAllProductBrands'])->name('fetchAllProductBrands');
// add product brand
Route::post('/saveBrand', ['App\Http\Controllers\ProductBrandController', 'store'])->name('saveBrand');
// delete product brand
Route::delete('/deleteBrand/{id}', ['App\Http\Controllers\ProductBrandController', 'destroy'])->name('deleteBrand');
//show edit product brand
Route::get('/editBrand', ['App\Http\Controllers\ProductBrandController', 'show'])->name('editBrand');
// update product brand
Route::put('/updateBrand', ['App\Http\Controllers\ProductBrandController', 'update'])->name('updateBrand');

// ===========================================================================

//SETTINGS ROUTES
//all settings control
Route::resource('settings', 'App\Http\Controllers\SystemSettingsController');

// ===========================================================================

//PROFILE ROUTES
//all profile control
Route::get('/fetchActiveTax', ['App\Http\Controllers\TaxController', 'fetchActiveTax'])->name('fetchActiveTax');

// ===========================================================================

//TAX ROUTES
Route::resource('profile', 'App\Http\Controllers\UserProfileController');

// ===========================================================================


//POS ROUTES
//all pos control
Route::resource('pos', 'App\Http\Controllers\POSController');
//get all pos
Route::get('/fetchAllPosProducts/{category}', ['App\Http\Controllers\POSController', 'fetchAllPosProducts'])->name('fetchAllPosProducts');
//get all pos products by product code, name or serial
Route::get('/fetchAllPosProductsFilter/{query}', ['App\Http\Controllers\POSController', 'fetchAllPosProductsFilter'])->name('fetchAllPosProductsFilter');
// add sale
Route::post('/saveSale', ['App\Http\Controllers\POSController', 'store'])->name('saveSale');
Route::post('/saveInvoice', ['App\Http\Controllers\POSController', 'saveInvoice'])->name('saveInvoice');

//SALES ROUTES
//all sales control
Route::resource('sales', 'App\Http\Controllers\InvoiceController');
//get all sales from branch
Route::get('/fetchAllBranchSales', ['App\Http\Controllers\InvoiceController', 'fetchAllBranchSales'])->name('fetchAllBranchSales');

//USER REPORTS ROUTES
//all user reports control
Route::resource('reports/user', 'App\Http\Controllers\SalesReportsController');
// filter user sales
Route::post('/filterUserReports', ['App\Http\Controllers\SalesReportsController', 'filterUserReports'])->name('filterUserReports');
Route::post('/filterBranchReports', ['App\Http\Controllers\SalesReportsController', 'filterBranchReports'])->name('filterBranchReports');
Route::post('/filterCategoryReports', ['App\Http\Controllers\SalesReportsController', 'filterCategoryReports'])->name('filterCategoryReports');
Route::get('/invoice_details/{invoice_id}', ['App\Http\Controllers\SalesReportsController', 'invoice_details'])->name('invoice_details');

// filter branch sales
Route::get('reports/branch', ['App\Http\Controllers\SalesReportsController', 'branch_reports'])->name('branch_reports');
Route::post('/fetchAllBranchSales', ['App\Http\Controllers\SalesReportsController', 'fetchAllBranchSales'])->name('fetchAllBranchSales');

// filter category sales
Route::get('reports/category', ['App\Http\Controllers\SalesReportsController', 'category_reports'])->name('category_reports');
Route::post('/fetchAllCategorySales', ['App\Http\Controllers\SalesReportsController', 'fetchAllCategorySales'])->name('fetchAllCategorySales');
