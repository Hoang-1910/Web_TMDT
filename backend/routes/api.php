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
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\User\ProductController as UserProductController;
use App\Http\Controllers\User\HomeController;

// Public routes
Route::get('/', [HomeController::class, 'index']);
Route::post('/register-user', [AuthController::class, 'registerUser']);
Route::post('/login', [AuthController::class, 'login']);

// User routes
Route::get('/products', [UserProductController::class, 'index']);
Route::get('/products/{id}', [UserProductController::class, 'show']);
Route::get('/products/category/{categoryId}', [UserProductController::class, 'getByCategory']);
Route::get('/products/brand/{brandId}', [UserProductController::class, 'getByBrand']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Admin routes
    Route::prefix('admin')->group(function () {
        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index']);
        
        // Products
        Route::get('/products', [ProductController::class, 'index']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::get('/products/{id}', [ProductController::class, 'show']);
        Route::put('/products/{id}', [ProductController::class, 'update']);
        Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    
        // Categories
        Route::get('/categories', [CategoryController::class, 'index']);
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::get('/categories/{id}', [CategoryController::class, 'show']);
        Route::put('/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
        
        // Brands 
        Route::get('/brands', [BrandController::class, 'index']);
        Route::post('/brands', [BrandController::class, 'store']);
        Route::get('/brands/{id}', [BrandController::class, 'show']);
        Route::put('/brands/{id}', [BrandController::class, 'update']);
        Route::delete('/brands/{id}', [BrandController::class, 'destroy']);
    });
});

