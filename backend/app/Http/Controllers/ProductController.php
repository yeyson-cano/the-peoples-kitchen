<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Obtain all active products
     */
    public function index()
    {
        $products = Product::where('active', true)->get();
        return response()->json($products, 200);
    }
}
