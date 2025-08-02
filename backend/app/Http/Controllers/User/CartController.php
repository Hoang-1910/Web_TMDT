<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Modes\CartItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;


class CartController extends Controller
{
    // Lấy giỏ hàng theo user_id
    public function show($user_id)
    {
        // Validate user_id có tồn tại
        if (!User::where('id', $user_id)->exists()) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $cart = Cart::with('items.product')->where('user_id', $user_id)->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 200);
        }

        return response()->json($cart);
    }

    // Tạo cart nếu chưa có (cho user_id)
    public function createCartIfNotExists($user_id)
    {
        // Kiểm tra xem user tồn tại không
        if (!User::where('id', $user_id)->exists()) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $cart = Cart::firstOrCreate(['user_id' => $user_id]);

        return response()->json($cart, 201);
    }
}
