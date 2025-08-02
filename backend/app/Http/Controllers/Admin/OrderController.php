<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('orderItems.product')
            ->where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get();

        return response()->json($orders);
    }

    // Tạo đơn hàng mới
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cod,paypal,momo,vnpay',
        ]);

        return DB::transaction(function () use ($request) {
            $totalPrice = collect($request->items)->sum(function ($item) {
                return $item['price'] * $item['quantity'];
            });

            $order = Order::create([
                'user_id' => Auth::id(),
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            // ✅ Thêm thanh toán
            Payment::create([
                'order_id' => $order->id,
                'method' => $request->payment_method ?? 'cod',
                'status' => 'pending'
            ]);

            return response()->json([
                'message' => 'Tạo đơn hàng thành công.',
                'order' => $order->load(['orderItems.product', 'payment']),
            ], 201);
        });

    }

    // Xem chi tiết 1 đơn hàng
    public function show($id)
    {
        $order = Order::with('orderItems.product', 'payment')
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json($order);
    }

    // (Admin) cập nhật trạng thái đơn hàng
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipping,completed,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return response()->json([
            'message' => 'Cập nhật trạng thái đơn hàng thành công.',
            'order' => $order
        ]);
    }
}
