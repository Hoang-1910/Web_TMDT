// src/pages/admin/EditProduct.jsx
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductForm from "../ProductForm";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/products/${id}`)
      .then(res => setInitialData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (form) => {
    axios.put(`http://localhost:8000/api/admin/products/${id}`, form)
      .then(() => navigate("/admin/products"))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Sửa sản phẩm</h1>
      {initialData && <ProductForm initialData={initialData} onSubmit={handleSubmit} />}
    </div>
  );
}
