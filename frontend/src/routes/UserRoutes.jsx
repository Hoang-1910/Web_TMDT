import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/user/Home';
import Register from '../pages/user/Register';
import Login from '../pages/user/Login';
import AdminLogin from '../pages/admin/Login';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import ProductManagement from '../pages/admin/ProductManagement';
import CategoryManagement from '../pages/admin/CategoryManagement';
import OrderManagement from '../pages/admin/OrderManagement';
import UserManagement from '../pages/admin/UserManagement';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} /> {/* Changed from /admin to /admin/login */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/products" element={<ProductManagement />} />
      <Route path="/admin/categories" element={<CategoryManagement />} />
      <Route path="/admin/orders" element={<OrderManagement />} />
      <Route path="/admin/users" element={<UserManagement />} />
    </Routes>
  );
}

export default UserRoutes;
