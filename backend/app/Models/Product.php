<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'discount_price', 'stock_id', 'category_id', 'brand_id'];

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }

}
