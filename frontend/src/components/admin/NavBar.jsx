// components/admin/Navbar.jsx
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">Trang quản trị</h1>
      <div className="flex items-center gap-2">
        <FaUserCircle className="text-2xl text-gray-600" />
        <span className="text-sm text-gray-700">Admin</span>
      </div>
    </header>
  );
};

export default Navbar;
