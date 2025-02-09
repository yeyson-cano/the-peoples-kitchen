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

    /**
     * Obtain details of a single product
     */
    public function show($id)
    {
        $product = Product::where('id', $id)->where('active', true)->first();

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product, 200);
    }
}
