import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Chào mừng đến với Web TMDT</h1>
      <Link to="/register">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Đăng ký</button>
      </Link>
      <Link to="/login">
        <button className="bg-gray-500 text-white px-4 py-2 rounded">Đăng nhập</button>
      </Link>
    </div>
  );
}

export default Home;
