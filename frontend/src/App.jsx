import { Routes, Route } from "react-router-dom";
import UserLayout from "./components/user/UserLayout";
import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";

function App() {
  return (
    <Routes>
      {/* Khách hàng */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<handleLogout />} />
      </Route>

      {/* Quản trị viên */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<ProductForm />} />
      </Route>
    </Routes>
  );
}

export default App;
