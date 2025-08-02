<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\Withlist;
use Illuminate\Support\Facades\Auth;

class WithlistController extends Controller
{
    // Hiển thị danh sách sản phẩm yêu thích của người dùng đang đăng nhập
    public function index()
    {
        $user = Auth::user();

        $wishlists = Withlist::with('product')
            ->where('user_id', $user->id)
            ->get();

        return response()->json($wishlists);
    }

    // Thêm sản phẩm vào danh sách yêu thích
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $wishlist = Withlist::firstOrCreate([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
        ]);

        return response()->json([
            'message' => 'Đã thêm vào danh sách yêu thích.',
            'data' => $wishlist
        ], 201);
    }

    // Xóa sản phẩm khỏi danh sách yêu thích
    public function destroy($productId)
    {
        $deleted = Withlist::where('user_id', Auth::id())
            ->where('product_id', $productId)
            ->delete();

        if ($deleted) {
            return response()->json(['message' => 'Đã xóa khỏi danh sách yêu thích.']);
        }

        return response()->json(['message' => 'Không tìm thấy mục cần xóa.'], 404);
    }
}
