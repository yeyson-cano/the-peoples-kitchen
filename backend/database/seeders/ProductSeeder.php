<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insert sample products into the 'products' table
        DB::table('products')->insert([
            [
                'name' => 'Soviet Borsch', // Dish name
                'description' => 'Traditional beet soup with sour cream.', // Dish description
                'price' => 12.50, // Price in decimal format
                'image' => 'https://example.com/borsch.jpg', // Reference image URL
                'category' => 'Soups', // Dish category
                'active' => true, // Dish availability
                'created_at' => now(), // Creation timestamp
                'updated_at' => now(), // Last update timestamp
            ],
            [
                'name' => 'Pelmeni',
                'description' => 'Meat dumplings with butter sauce.',
                'price' => 14.00,
                'image' => 'https://example.com/pelmeni.jpg',
                'category' => 'Main Dishes',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kvas',
                'description' => 'Fermented rye drink, slightly sweet.',
                'price' => 5.00,
                'image' => 'https://example.com/kvas.jpg',
                'category' => 'Beverages',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
