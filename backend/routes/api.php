<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\StockController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\WithlistController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductImageController;

// Routes for user 
Route::post('/register-user', [AuthController::class, 'registerUser']);
Route::post('/login-user', [AuthController::class, 'loginUser']);
// Route for admin
Route::post('/register-admin', [AuthController::class, 'registerAdmin']);
Route::post('/login-admin', [AuthController::class, 'loginAdmin']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


// Routes for admin
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('stocks', StockController::class);
    Route::apiResource('brands', BrandController::class);

    Route::get('/wishlists', [WithlistController::class, 'index']);
    Route::post('/wishlists', [WithlistController::class, 'store']);
    Route::delete('/wishlists/{product_id}', [WithlistController::class, 'destroy']);

    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{id}', [OrderController::class, 'update']); // Chỉ admin mới nên gọi
    Route::apiResource('products', ProductImageController::class);
    Route::apiResource('productImages', ProductImageController::class);

});