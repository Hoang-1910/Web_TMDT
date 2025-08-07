import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import Home from './pages/user/Home';
function App() {
  return (
    <BrowserRouter>
      <UserRoutes />
    </BrowserRouter>
  );
}

export default App;




