<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',        
        'description',
        'price',      
        'image',     
        'active'       
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'price' => 'float',  // Ensure 'price' is always a float
        'active' => 'boolean' // Ensure 'active' is always a boolean
    ];
}
