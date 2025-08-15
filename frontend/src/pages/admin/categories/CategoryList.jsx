import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get('http://localhost:8000/api/admin/categories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(response.data);
        } catch (error) {
            setError('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const token = localStorage.getItem('admin_token');
                await axios.delete(`http://localhost:8000/api/admin/categories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchCategories();
            } catch (error) {
                setError('Failed to delete category');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
                    <Link
                        to="/admin/categories/create"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add New Category
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Products Count
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{category.name}</td>
                                        <td className="px-6 py-4">{category.products_count}</td>
                                        <td className="px-6 py-4 space-x-2">
                                            <Link
                                                to={`/admin/categories/edit/${category.id}`}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id)}
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
                )}
            </div>
        </AdminLayout>
    );
};

export default CategoryList;