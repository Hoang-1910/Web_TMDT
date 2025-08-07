// src/components/user/Header.jsx
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">MyShop</Link>
          <nav className="space-x-4 text-sm sm:text-base">
            <Link to="/" className="text-gray-700 hover:text-blue-500">Trang chủ</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-500">Đăng nhập</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-500">Đăng ký</Link>
          </nav>
        </div>
      </header>
  );
};

export default Header;
