// src/pages/admin/AddProduct.jsx
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";

export default function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = (form) => {
    const formData = new FormData();
    for (let key in form) {
      if (key === "images") {
        form.images.forEach(img => formData.append("images[]", img));
      } else {
        formData.append(key, form[key]);
      }
    }

    axios.post("http://localhost:8000/api/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => navigate("/admin/products"))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Thêm sản phẩm</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
