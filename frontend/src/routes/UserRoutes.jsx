import { Routes, Route } from 'react-router-dom';
import Login from '../pages/user/Login';
import Register from '../pages/user/Register';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default UserRoutes;
