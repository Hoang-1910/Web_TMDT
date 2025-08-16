import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';

const BrandForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        logo: '',
        description: ''
    });

    useEffect(() => {
        if (id) {
            fetchBrand();
        }
    }, [id]);

    const fetchBrand = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get(`http://localhost:8000/api/admin/brands/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            setFormData(response.data);
            setError(null);
        } catch (error) {
            console.error('Failed to fetch brand:', error);
            setError(error.response?.data?.message || 'Failed to fetch brand');
        }
    };

    const generateSlug = (name) => {
        return name.toLowerCase()
            .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
            .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
            .replace(/[ìíịỉĩ]/g, 'i')
            .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
            .replace(/[ùúụủũưừứựửữ]/g, 'u')
            .replace(/[ỳýỵỷỹ]/g, 'y')
            .replace(/đ/g, 'd')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = {
                ...prev,
                [name]: value
            };
            
            // Auto-generate slug when name changes
            if (name === 'name') {
                updated.slug = generateSlug(value);
            }
            
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('admin_token');
            const config = {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            if (id) {
                await axios.put(
                    `http://localhost:8000/api/admin/brands/${id}`, 
                    formData,
                    config
                );
            } else {
                await axios.post(
                    'http://localhost:8000/api/admin/brands',
                    formData,
                    config
                );
            }
            navigate('/admin/brands');
        } catch (error) {
            console.error('Failed to save brand:', error);
            if (error.response?.data?.errors) {
                const messages = Object.values(error.response.data.errors).flat();
                setError(messages.join('\n'));
            } else {
                setError(error.response?.data?.message || 'Failed to save brand');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    {id ? 'Edit Brand' : 'Create Brand'}
                </h1>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="max-w-lg bg-white rounded-lg shadow p-6">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Brand Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                            Slug
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                            Logo URL
                        </label>
                        <input
                            type="text"
                            id="logo"
                            name="logo"
                            value={formData.logo || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/brands')}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'Saving...' : 'Save Brand'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default BrandForm;