import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/user/Home';
import Register from '../pages/user/Register';
import Login from '../pages/user/Login';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* Các route khác */}
    </Routes>
  );
}

export default UserRoutes;
