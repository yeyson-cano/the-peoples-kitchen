<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'quantity'
    ];

    /**
     * Relationship: A CartItem belongs to a single Product.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
