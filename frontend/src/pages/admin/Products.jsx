// src/pages/admin/Products.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/admin/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Link
          to="/admin/products/add"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Ảnh</th>
              <th className="px-4 py-2 text-left">Tên</th>
              <th className="px-4 py-2">Giá</th>
              <th className="px-4 py-2">Danh mục</th>
              <th className="px-4 py-2">Thương hiệu</th>
              <th className="px-4 py-2">Kho</th>
              <th className="px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.product_id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={p.images?.find(img => img.is_main)?.image_url
                        ? `http://localhost:8000/storage/${p.images.find(img => img.is_main).image_url}`
                        : "https://via.placeholder.com/80"}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.price.toLocaleString()}₫</td>
                  <td className="px-4 py-2">{p.category?.name}</td>
                  <td className="px-4 py-2">{p.brand?.brand_name}</td>
                  <td className="px-4 py-2">{p.stock?.name}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/admin/products/edit/${p.product_id}`}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => {/* TODO: Xóa sản phẩm */}}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Không có sản phẩm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
