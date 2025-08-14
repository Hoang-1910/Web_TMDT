<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        
        // Get latest products with their relationships
        $products = Product::with(['images', 'brand', 'category', 'stock'])
                         ->latest()
                         ->take(8)
                         ->get();

        // Get products with discount prices as featured products
        $featuredProducts = Product::with(['images', 'brand', 'category', 'stock'])
                                 ->whereNotNull('discount_price')
                                 ->latest()
                                 ->take(8)
                                 ->get();

        return view('welcome', compact('categories', 'products', 'featuredProducts'));
    }
}
