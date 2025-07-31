<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\StockController;
use App\Http\Controllers\Admin\BrandController;

// Routes for user 
Route::post('/register-user', [AuthController::class, 'registerUser']);
Route::post('/login-user', [AuthController::class, 'loginUser']);

Route::post('/register-admin', [AuthController::class, 'registerAdmin']);
Route::post('/login-admin', [AuthController::class, 'loginAdmin']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('stocks', StockController::class);
    Route::apiResource('brands', BrandController::class);
});