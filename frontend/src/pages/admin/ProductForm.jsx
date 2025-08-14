// src/pages/admin/ProductForm.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: "",
    stock_id: "",
    category_id: "",
    brand_id: "",
    images: []
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Load select options
    axios.get("http://localhost:8000/api/categories").then(res => setCategories(res.data));
    axios.get("http://localhost:8000/api/brands").then(res => setBrands(res.data));
    axios.get("http://localhost:8000/api/stocks").then(res => setStocks(res.data));

    // Nếu có dữ liệu ban đầu (edit)
    if (Object.keys(initialData).length) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        discount_price: initialData.discount_price || "",
        stock_id: initialData.stock_id || "",
        category_id: initialData.category_id || "",
        brand_id: initialData.brand_id || "",
        images: []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setForm(prev => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submitForm} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block font-medium">Tên sản phẩm</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Mô tả</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Giá</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Giá khuyến mãi</label>
          <input
            type="number"
            name="discount_price"
            value={form.discount_price}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Kho</label>
          <select
            name="stock_id"
            value={form.stock_id}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          >
            <option value="">-- Chọn kho --</option>
            {stocks.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Danh mục</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Thương hiệu</label>
          <select
            name="brand_id"
            value={form.brand_id}
            onChange={(e) => {
              if (e.target.value === "new") {
                const newBrand = prompt("Nhập tên thương hiệu mới:");
                if (newBrand) {
                  axios.post("http://localhost:8000/api/brands", { brand_name: newBrand })
                    .then(res => {
                      setBrands(prev => [...prev, res.data]);
                      setForm(prev => ({ ...prev, brand_id: res.data.id }));
                    });
                }
              } else {
                handleChange(e);
              }
            }}
            className="border rounded w-full px-3 py-2"
            required
          >
            <option value="">-- Chọn thương hiệu --</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.brand_name}</option>
            ))}
            <option value="new">➕ Thêm thương hiệu mới</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium">Ảnh sản phẩm</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          className="border rounded w-full px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Lưu
      </button>
    </form>
  );
}
