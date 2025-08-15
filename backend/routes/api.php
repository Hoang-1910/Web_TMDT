<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\StockController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\WithlistController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductImageController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\User\ProductController as UserProductController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\Admin\DashboardController;

Route::get('/', [HomeController::class, 'index']);
// Routes for user 
Route::post('/register-user', [AuthController::class, 'registerUser']);
Route::post('/login-user', [AuthController::class, 'loginUser']);
Route::get('/products', [UserProductController::class, 'index']);
Route::get('/products/{id}', [UserProductController::class, 'show']);
Route::get('/products/category/{categoryId}', [UserProductController::class, 'getByCategory']);
Route::get('/products/brand/{brandId}', [UserProductController::class, 'getByBrand']);

// Route for admin
Route::post('/register-admin', [AuthController::class, 'registerAdmin']);
Route::post('/login-admin', [AuthController::class, 'loginAdmin']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


// Admin Routes
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
    // Categories
// Routes for user 
Route::post('/register-user', [AuthController::class, 'registerUser']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Routes for admin
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('categories', CategoryController::class);
    
    // Brands
    Route::apiResource('brands', BrandController::class);
    
    // Products
    Route::apiResource('products', ProductController::class);
});


// Public Routes
Route::get('/categories', [CategoryController::class, 'publicIndex']);
Route::get('/brands', [BrandController::class, 'publicIndex']);