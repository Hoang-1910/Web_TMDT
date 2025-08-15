<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalProducts' => Product::count(),
            'totalOrders' => Order::count(),
            'totalUsers' => User::where('role', 'user')->count(),
            'totalRevenue' => Order::where('status', 'completed')->sum('total_amount'),
            'recentOrders' => Order::with('user')
                ->latest()
                ->take(5)
                ->get()
        ];

        return response()->json($stats);
    }
}