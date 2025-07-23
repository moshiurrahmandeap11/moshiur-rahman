import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaUser, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Admin = () => {
    useEffect(() => {
        Aos.init({ duration: 800, easing: 'ease-in-out', once: true });
    }, []);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#1e293b] p-6 space-y-6" data-aos="fade-right">
                <h2 className="text-2xl font-bold text-orange-400 mb-6">Admin Panel</h2>
                <nav className="space-y-4">
                    <a href="#users" className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition">
                        <FaUser /> Users
                    </a>
                    <a href="#analytics" className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition">
                        <FaChartBar /> Analytics
                    </a>
                    <a href="#settings" className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition">
                        <FaCog /> Settings
                    </a>
                    <a href="#logout" className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition">
                        <FaSignOutAlt /> Logout
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 space-y-10">
                <section id="dashboard" className="space-y-4" data-aos="fade-up">
                    <h1 className="text-3xl font-bold text-orange-400">Dashboard Overview</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                            <h2 className="text-lg font-semibold text-orange-300 mb-2">Total Users</h2>
                            <p className="text-3xl font-bold">1,245</p>
                        </div>
                        <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                            <h2 className="text-lg font-semibold text-orange-300 mb-2">Monthly Visits</h2>
                            <p className="text-3xl font-bold">58,200</p>
                        </div>
                        <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg hover:scale-105 transition-transform">
                            <h2 className="text-lg font-semibold text-orange-300 mb-2">Revenue</h2>
                            <p className="text-3xl font-bold">$12,540</p>
                        </div>
                    </div>
                </section>

                <section id="users" className="space-y-4" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="text-2xl font-bold text-orange-400">Manage Users</h2>
                    <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-orange-300">
                                    <th className="py-2">ID</th>
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Email</th>
                                    <th className="py-2">Role</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-gray-600 hover:bg-[#334155]">
                                    <td className="py-2">1</td>
                                    <td className="py-2">John Doe</td>
                                    <td className="py-2">john@example.com</td>
                                    <td className="py-2">Admin</td>
                                    <td className="py-2">
                                        <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                                    </td>
                                </tr>
                                <tr className="border-t border-gray-600 hover:bg-[#334155]">
                                    <td className="py-2">2</td>
                                    <td className="py-2">Jane Smith</td>
                                    <td className="py-2">jane@example.com</td>
                                    <td className="py-2">User</td>
                                    <td className="py-2">
                                        <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="analytics" className="space-y-4" data-aos="fade-up" data-aos-delay="200">
                    <h2 className="text-2xl font-bold text-orange-400">Analytics Section</h2>
                    <p className="text-gray-300">[Placeholder for analytics charts and graphs]</p>
                </section>

                <section id="settings" className="space-y-4" data-aos="fade-up" data-aos-delay="300">
                    <h2 className="text-2xl font-bold text-orange-400">Settings</h2>
                    <p className="text-gray-300">[Settings configuration area]</p>
                </section>
            </main>
        </div>
    );
};

export default Admin;
