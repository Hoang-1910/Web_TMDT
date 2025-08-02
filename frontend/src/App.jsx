import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './pages/Header'
import Login from './pages/login'
import Register from './pages/Register'
import Home from './pages/Home'
import './css/Header.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;