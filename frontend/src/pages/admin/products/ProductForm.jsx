import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        brand_id: '',
        stock_quantity: '',
        images: []
    });

    useEffect(() => {
        fetchCategories();
        fetchBrands();
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get('http://localhost:8000/api/admin/categories', {
                headers: { 
                    Authorization: token,
                    Accept: 'application/json'
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchBrands = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get('http://localhost:8000/api/admin/brands', {
                headers: { 
                    Authorization: token,
                    Accept: 'application/json'
                }
            });
            setBrands(response.data);
        } catch (error) {
            console.error('Failed to fetch brands:', error);
        }
    };

    const fetchProduct = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get(`http://localhost:8000/api/admin/products/${id}`, {
                headers: { 
                    Authorization: token,
                    Accept: 'application/json'
                }
            });
            setFormData(response.data);
        } catch (error) {
            console.error('Failed to fetch product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setFormData(prev => ({
                ...prev,
                images: Array.from(files)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('admin_token');
            const formDataToSend = new FormData();

            Object.keys(formData).forEach(key => {
                if (key === 'images') {
                    formData.images.forEach(image => {
                        formDataToSend.append('images[]', image);
                    });
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            if (id) {
                await axios.post(`http://localhost:8000/api/admin/products/${id}`, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('http://localhost:8000/api/admin/products', formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            navigate('/admin/products');
        } catch (error) {
            console.error('Failed to save product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                    {id ? 'Edit Product' : 'Create New Product'}
                </h1>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Brand
                            </label>
                            <select
                                name="brand_id"
                                value={formData.brand_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select Brand</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                name="stock_quantity"
                                value={formData.stock_quantity}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Images
                            </label>
                            <input
                                type="file"
                                name="images"
                                onChange={handleChange}
                                multiple
                                accept="image/*"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/products')}
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
                            {loading ? 'Saving...' : id ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ProductForm;