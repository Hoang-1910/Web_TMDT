<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Get all products with pagination
     */
    public function index()
    {
        $products = Product::with(['images', 'brand', 'category', 'stock'])
            ->latest()
            ->paginate(12);

        return response()->json([
            'status' => 'success',
            'data' => $products
        ]);
    }

    /**
     * Get product by ID
     */
    public function show($id)
    {
        $product = Product::with(['images', 'brand', 'category', 'stock'])
            ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $product
        ]);
    }

    /**
     * Get products by category
     */
    public function getByCategory($categoryId)
    {
        $products = Product::with(['images', 'brand', 'stock'])
            ->where('category_id', $categoryId)
            ->latest()
            ->paginate(12);

        return response()->json([
            'status' => 'success',
            'data' => $products
        ]);
    }

    /**
     * Get products by brand
     */
    public function getByBrand($brandId)
    {
        $products = Product::with(['images', 'category', 'stock'])
            ->where('brand_id', $brandId)
            ->latest()
            ->paginate(12);

        return response()->json([
            'status' => 'success',
            'data' => $products
        ]);
    }
}
