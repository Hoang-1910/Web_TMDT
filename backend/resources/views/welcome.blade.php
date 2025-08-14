<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Commerce Store</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>
<body class="bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <nav class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="text-2xl font-bold text-blue-600">
                    <a href="/">Store Logo</a>
                </div>

                <!-- Search Bar -->
                <div class="flex-1 mx-8">
                    <div class="relative">
                        <input type="text" placeholder="Search products..." 
                               class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <button class="absolute right-3 top-2">
                            <i class="fas fa-search text-gray-400"></i>
                        </button>
                    </div>
                </div>

                <!-- Navigation Links -->
                <div class="flex items-center space-x-6">
                    <a href="#" class="hover:text-blue-600">
                        <i class="fas fa-heart"></i>
                        <span class="ml-1">Wishlist</span>
                    </a>
                    <a href="#" class="hover:text-blue-600">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="ml-1">Cart</span>
                    </a>
                    <a href="#" class="hover:text-blue-600">
                        <i class="fas fa-user"></i>
                        <span class="ml-1">Account</span>
                    </a>
                </div>
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 mt-24 mb-16">
        <!-- Categories -->
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Categories</h2>
            <div class="grid grid-cols-6 gap-4">
                @foreach($categories as $category)
                <a href="{{ route('products.category', $category->id) }}" 
                   class="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition">
                    <i class="fas fa-folder mb-2 text-2xl text-blue-600"></i>
                    <p>{{ $category->name }}</p>
                </a>
                @endforeach
            </div>
        </div>

        <!-- Featured Products -->
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Featured Products</h2>
            <div class="grid grid-cols-4 gap-6">
                @foreach($featuredProducts as $product)
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    @if($product->images->isNotEmpty())
                        <img src="{{ asset('storage/' . $product->images->first()->image_url) }}" 
                             alt="{{ $product->name }}" 
                             class="w-full h-48 object-cover">
                    @else
                        <img src="https://via.placeholder.com/300" 
                             alt="No image" 
                             class="w-full h-48 object-cover">
                    @endif
                    <div class="p-4">
                        <h3 class="font-semibold mb-2">{{ $product->name }}</h3>
                        <p class="text-gray-600 text-sm mb-2">{{ $product->brand->name }}</p>
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="text-xl font-bold text-blue-600">${{ number_format($product->price, 2) }}</span>
                                @if($product->discount_price)
                                    <span class="text-sm text-gray-500 line-through ml-2">
                                        ${{ number_format($product->discount_price, 2) }}
                                    </span>
                                @endif
                            </div>
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
        <div class="container mx-auto px-4 py-8">
            <div class="grid grid-cols-4 gap-8">
                <!-- Company Info -->
                <div>
                    <h3 class="text-xl font-bold mb-4">About Us</h3>
                    <p class="text-gray-400">Your trusted online shopping destination for quality products and excellent service.</p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white">Home</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Products</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Categories</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white">Contact</a></li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Contact Us</h3>
                    <ul class="space-y-2">
                        <li class="flex items-center text-gray-400">
                            <i class="fas fa-map-marker-alt w-6"></i>
                            123 Store Street, City, Country
                        </li>
                        <li class="flex items-center text-gray-400">
                            <i class="fas fa-phone w-6"></i>
                            +1 234 567 890
                        </li>
                        <li class="flex items-center text-gray-400">
                            <i class="fas fa-envelope w-6"></i>
                            contact@store.com
                        </li>
                    </ul>
                </div>

                <!-- Newsletter -->
                <div>
                    <h3 class="text-xl font-bold mb-4">Newsletter</h3>
                    <p class="text-gray-400 mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
                    <div class="flex">
                        <input type="email" placeholder="Your email" 
                               class="flex-1 px-4 py-2 rounded-l-lg focus:outline-none">
                        <button class="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <!-- Copyright -->
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 Your Store. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>