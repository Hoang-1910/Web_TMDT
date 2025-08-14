import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaChevronDown,
  FaUsers,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-2 rounded transition hover:bg-gray-700 ${
      isActive ? "font-semibold" : ""
    }`;

  const subLinkClass = ({ isActive }) =>
    `block px-3 py-1 rounded transition hover:bg-gray-700 ${
      isActive ? "font-semibold" : ""
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen sticky top-0">
      <div className="text-center p-4 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav className="p-4 space-y-1 text-sm">
        {/* Dashboard */}
        <NavLink to="/admin" end className={linkClass}>
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </NavLink>

        {/* Product menu */}
        <div>
          <button
            onClick={() => toggleMenu("products")}
            className="w-full flex items-center px-4 py-2 rounded hover:bg-gray-700 transition bg-inherit text-left"
          >
            <FaBox className="mr-3" />
            <span className="flex-1">Sản phẩm</span>
            <FaChevronDown
              className={`transition-transform duration-200 ${
                openMenu === "products" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openMenu === "products" && (
            <div className="ml-8 mt-1 space-y-1">
              <NavLink to="/admin/products" className={subLinkClass}>
                Tất cả sản phẩm
              </NavLink>
              <NavLink to="/admin/products/add" className={subLinkClass}>
                Thêm mới
              </NavLink>
              <NavLink to="/admin/products/categories" className={subLinkClass}>
                Danh mục
              </NavLink>
            </div>
          )}
        </div>

        {/* Users */}
        <NavLink to="/admin/users" className={linkClass}>
          <FaUsers className="mr-3" />
          Người dùng
        </NavLink>

        {/* Settings */}
        <NavLink to="/admin/settings" className={linkClass}>
          <FaCog className="mr-3" />
          Cài đặt
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
