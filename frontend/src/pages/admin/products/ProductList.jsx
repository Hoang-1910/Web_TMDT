import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get('http://localhost:8000/api/admin/products', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(response.data.data || []); // Ensure we always have an array
        } catch (error) {
            setError('Failed to fetch products');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = localStorage.getItem('admin_token');
                await axios.delete(`http://localhost:8000/api/admin/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchProducts();
            } catch (error) {
                setError('Failed to delete product');
            }
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="p-6 text-red-500 text-center">{error}</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
                    <Link
                        to="/admin/products/create"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add New Product
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                        No products found. Create your first product!
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <img
                                                    src={product.images[0]?.image_url}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">{product.name}</td>
                                            <td className="px-6 py-4">${product.price}</td>
                                            <td className="px-6 py-4">{product.category.name}</td>
                                            <td className="px-6 py-4">{product.brand.name}</td>
                                            <td className="px-6 py-4">{product.stock.quantity}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProductList;