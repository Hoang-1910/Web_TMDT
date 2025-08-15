import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
    const location = useLocation();

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { path: '/admin/products', label: 'Products', icon: 'fas fa-box' },
        { path: '/admin/categories', label: 'Categories', icon: 'fas fa-list' },
        { path: '/admin/orders', label: 'Orders', icon: 'fas fa-shopping-cart' },
        { path: '/admin/users', label: 'Users', icon: 'fas fa-users' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_data');
        window.location.href = '/admin/login';
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                </div>
                <nav className="mt-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 ${
                                location.pathname === item.path
                                    ? 'bg-blue-600'
                                    : 'hover:bg-gray-700'
                            }`}
                        >
                            <i className={`${item.icon} w-6`}></i>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 hover:bg-gray-700"
                    >
                        <i className="fas fa-sign-out-alt w-6"></i>
                        <span>Logout</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navigation */}
                <header className="bg-white shadow-md p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                            {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">
                                {JSON.parse(localStorage.getItem('admin_data'))?.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                <i className="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;