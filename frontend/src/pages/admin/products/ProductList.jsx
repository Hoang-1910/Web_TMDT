import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../../components/admin/AdminLayout';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await axios.get(`http://localhost:8000/api/admin/products?page=${page}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            
            setProducts(response.data.data || []);
            setTotalPages(Math.ceil(response.data.total / response.data.per_page));
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('admin_token');
            await axios.delete(`http://localhost:8000/api/admin/products/${id}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            
            // Refresh the current page
            await fetchProducts(currentPage);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.message || 'Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const renderPagination = () => {
        return (
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${
                        currentPage === 1 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    Previous
                </button>
                
                <span className="px-3 py-1">
                    Page {currentPage} of {totalPages}
                </span>
                
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${
                        currentPage === totalPages 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                >
                    Next
                </button>
            </div>
        );
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

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
                    <Link
                        to="/admin/products/create"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Add New Product
                    </Link>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                        {error}
                    </div>
                )}

                {products.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8 p-8 bg-white rounded-lg border">
                        No products found. Create your first product!
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-16 h-16 relative">
                                                    {product.images?.[0]?.image_url ? (
                                                        <img
                                                            src={product.images[0].image_url}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                                            <span className="text-gray-400 text-xs">No image</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{formatPrice(product.price)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.category?.name || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.brand?.name || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    product.stock?.quantity > 0 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {product.stock?.quantity || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
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
                        {renderPagination()}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProductList;