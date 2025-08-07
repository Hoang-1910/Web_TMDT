// src/pages/user/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import UserLayout from "@/components/user/UserLayout";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (  
    <UserLayout>
      <div className="bg-gray-100 min-h-screen">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-12 px-6 text-center">
          <h1 className="text-4xl font-bold mb-2">Chào mừng đến với Web TMDT</h1>
          <p className="text-lg">Khám phá hàng ngàn sản phẩm chất lượng, giá ưu đãi!</p>
          <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition">
            Xem ngay
          </button>
        </div>

        {/* Sản phẩm nổi bật */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Sản phẩm nổi bật</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded shadow hover:shadow-md transition"
                >
                  {/* Ảnh đại diện */}
                  <img
                    src={product.images?.find((img) => img.is_primary)?.image_url || "https://via.placeholder.com/300"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t"
                  />
                  {/* Thông tin */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-700 line-clamp-2 mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">{product.price.toLocaleString()}₫</span>
                      <button className="text-sm px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Xem
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">Không có sản phẩm nào.</p>
            )}
          </div>
        </section>
      </div>
    </UserLayout>
  );
}