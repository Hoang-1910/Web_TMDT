import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Home from './pages/user/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
