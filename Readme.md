# Dự án website thương mại điện tử 
# Công nghệ sử dụng: 
- Frontend: ReactJS
- Backend: Laravel

# Các bước tạo dự án
- Tạo folder dự án 
- dùng lệnh tạo backend: composer creat-project laravel/laravel backend
- dùng lệnh tạo frontend: npm create vite@latest ecommerce-frontend -- --template react
- vào thư mục frontend chạy: npm install

# Khi clone dự án
- chạy lệnh trong thư mục backend: composer install
- Thêm file .env

# Cài đặt Sanctum để dùng API
- composer require laravel/sanctum
- php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
- php artisan migrate

# Cài route và dử dụng bên frontend
- npm install axios
- npm install react-router-dom
