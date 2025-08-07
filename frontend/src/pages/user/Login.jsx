import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert("Đăng nhập thất bại: " + JSON.stringify(data.errors));
    } else {
      alert("Đăng nhập thành công!");
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Bên trái: hình ảnh thương hiệu hoặc mô tả */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center p-10">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Chào mừng đến với ShopX</h1>
          <p className="text-lg">Trải nghiệm mua sắm tốt nhất dành cho bạn.</p>
          <img src="/assets/login-side-image.svg" alt="Shopping" className="mt-8 w-3/4 mx-auto" />
        </div>
      </div>

      {/* Bên phải: form login */}
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Đăng nhập tài khoản</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label>
                <input type="checkbox" className="mr-2" /> Ghi nhớ đăng nhập
              </label>
              <a href="#" className="text-indigo-600 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition duration-300"
            >
              Đăng nhập
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <button onClick={() => navigate("/register")} className="text-indigo-600 hover:underline">
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
