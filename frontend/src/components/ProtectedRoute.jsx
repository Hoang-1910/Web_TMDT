import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  const adminData = JSON.parse(localStorage.getItem('admin_data') || '{}');

  if (!token || adminData.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;