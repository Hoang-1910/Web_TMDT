import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBrands();
    }, []);

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
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch brands');
            setLoading(false);
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this brand?')) {
            return;
        }

        try {
            const token = localStorage.getItem('admin_token');
            await axios.delete(`http://localhost:8000/api/admin/brands/${id}`, {
                headers: { 
                    Authorization: token,
                    Accept: 'application/json'
                }
            });
            fetchBrands();
        } catch (error) {
            console.error('Failed to delete brand:', error);
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
                    <h1 className="text-2xl font-semibold text-gray-800">Brands</h1>
                    <Link
                        to="/admin/brands/create"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add New Brand
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Products Count
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {brands.map((brand) => (
                                <tr key={brand.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {brand.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {brand.products_count || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/admin/brands/edit/${brand.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(brand.id)}
                                            className="text-red-600 hover:text-red-900"
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
        </AdminLayout>
    );
};

export default BrandList;