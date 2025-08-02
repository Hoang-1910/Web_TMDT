<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    public function index()
    {
        return response()->json(ProductImage::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'images.*' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $product = Product::findOrFail($request->product_id);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('uploads/products', 'public');

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $path,
                    'is_primary' => $index === 0
                ]);
            }

            return response()->json(['message' => 'Images uploaded successfully']);
        }

        return response()->json(['message' => 'No images found'], 400);
    }
    public function delete($id){
        $productImage = ProductImage::findOrFail($id);
        
        // Xóa file khỏi Storage
        if (Storage::disk('public')->exists($productImage->image_url)){
            Storage::disk('public')->delete($productImage->image_url);
        }
        // Xóa file khỏi DB
        $productImage->delete();
        return response()->json(['message' => 'Đã xóa ảnh']); 
    }

    public function update(Request $request, $id){

        $productImage = ProductImage::findOrFail($id);

        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        // Xoá ảnh cũ
        if (Storage::disk('public')->exists($productImage->image_url)) {
            Storage::disk('public')->delete($productImage->image_url);
        }

        // Lưu ảnh mới
        $path = $request->file('image')->store('uploads/products', 'public');

        // Cập nhật record
        $productImage->update([
            'image_url' => $path
        ]);

        return response()->json(['message' => 'Image updated successfully', 'image_url' => $path]);
    }
    public function show($id)
    {
        $productImage = ProductImage::findOrFail($id);
        return response()->json($productImage);
    }
}
