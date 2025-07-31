<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'owner',
        'address'
    ];

    /**
     * Get the products associated with the stock.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Scope a query to find stock by name.
     */
    public function scopeFindByName($query, $name)
    {
        return $query->where('name', $name);
    }

    /**
     * Get formatted address
     */
    public function getFormattedAddressAttribute()
    {
        return $this->address ?? 'No address provided';
    }
}