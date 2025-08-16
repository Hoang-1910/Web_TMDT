import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/user/UserLayout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// User pages
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';

// Admin pages
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/products/ProductList';
import ProductForm from './pages/admin/products/ProductForm';
import BrandList from './pages/admin/brands/BrandList';
import BrandForm from './pages/admin/brands/BrandForm';
import CategoryList from './pages/admin/categories/CategoryList';
import CategoryForm from './pages/admin/categories/CategoryForm';
import Logout from './pages/user/Logout';
function App() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/logout" element={<Logout />} />
        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductList />} />
              <Route path="products/create" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="brands" element={<BrandList />} />
              <Route path="brands/create" element={<BrandForm />} />
              <Route path="brands/edit/:id" element={<BrandForm />} />
              <Route path="categories" element={<CategoryList />} />
              <Route path="categories/create" element={<CategoryForm />} />
              <Route path="categories/edit/:id" element={<CategoryForm />} />
            </Routes>
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
