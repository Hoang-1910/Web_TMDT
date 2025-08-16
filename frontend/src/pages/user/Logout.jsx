import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_data');
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Logout;