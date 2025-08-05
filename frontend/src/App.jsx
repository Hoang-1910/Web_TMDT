import { Routes, Route } from 'react-router-dom';
import UserLayout from './components/user/UserLayout';
import Home from './pages/user/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';

function App() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
