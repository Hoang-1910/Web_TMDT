// src/pages/user/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-indigo-200 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Chào mừng đến với Web TMDT</h1>
      <div className="space-x-4">
        <Link
          to="/register"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Đăng ký
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
