<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    // Lấy danh sách sản phẩm (kèm quan hệ)
    public function index(){

        $products = Product::with(['images', 'category', 'brand', 'stock'])->latest()->get();
        return response()->json($products);
    }

    // Tạo mới sản phẩm kèm ảnh
    public function store(Request $request){
        // Validat dữ liệu đầu vào
        $validated = $request->validate([
            'name'           => 'required|string|max:255',
            'description'    => 'nullable|string',
            'price'          => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'stock_id'       => 'required|exists:stocks,id',
            'category_id'    => 'required|exists:categories,id',
            'brand_id'       => 'required|exists:brands,id',
            'images.*'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        // Tạo product
        $product = Product::create($validated);

        // Xử lý ảnh nếu có
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('uploads/products', 'public');

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $path,
                    'is_primary' => $index === 0
                ]);
            }
        }

        return response()->json($product->load('images'), 201);
    }

    // Hiển thị chi tiết sản phẩm
    public function show($id){

        $product = Product::with(['images', 'category', 'brand', 'stock'])->findOrFail($id);
        return response()->json($product);
    }

    // Cập nhật sản phẩm (không cập nhật ảnh ở đây)
    public function update(Request $request, $id){

        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name'           => 'sometimes|required|string|max:255',
            'description'    => 'nullable|string',
            'price'          => 'sometimes|required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'stock_id'       => 'sometimes|required|exists:stocks,id',
            'category_id'    => 'sometimes|required|exists:categories,id',
            'brand_id'       => 'sometimes|required|exists:brands,id',
        ]);

        $product->update($validated);

        return response()->json($product->load('images'));
    }

    // Xóa sản phẩm và ảnh liên quan
    public function destroy($id){
        
        $product = Product::with('images')->findOrFail($id);

        // Xóa ảnh vật lý
        foreach ($product->images as $image) {
            if (Storage::disk('public')->exists($image->image_url)) {
                Storage::disk('public')->delete($image->image_url);
            }
            $image->delete();
        }

        $product->delete();

        return response()->json(['message' => 'Product and related images deleted']);
    }
}
