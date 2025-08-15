import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';

const CategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: ''
    });

    useEffect(() => {
        if (id) {
            fetchCategory();
        }
    }, [id]);

    const fetchCategory = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get(`http://localhost:8000/api/admin/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFormData({ name: response.data.name });
        } catch (error) {
            console.error('Failed to fetch category:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('admin_token');
            if (id) {
                await axios.put(`http://localhost:8000/api/admin/categories/${id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:8000/api/admin/categories', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/admin/categories');
        } catch (error) {
            console.error('Failed to save category:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    {id ? 'Edit Category' : 'Create New Category'}
                </h1>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ name: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/categories')}
                            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-lg text-white ${
                                loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        >
                            {loading ? 'Saving...' : id ? 'Update Category' : 'Create Category'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CategoryForm;