import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, {
                username,
                password
            });
            localStorage.setItem('adminToken', response.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#E9F1EE] flex items-center justify-center p-4 font-['Outfit']">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-10 rounded-[40px] w-full max-w-md shadow-xl"
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 flex items-center justify-center overflow-hidden mb-4">
                        <img src={logo} alt="smriti.yoga" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#1B4332]">smriti.yoga</h1>
                    <p className="text-[#1B4332] opacity-60 text-sm mt-2 font-medium">Internal Admin Access</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 px-4 py-3 rounded-2xl text-sm mb-6 text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1B4332] ml-2">Username</label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                className="w-full bg-white/50 border border-white/40 rounded-2xl py-3 px-5 focus:ring-2 focus:ring-[#00845A] outline-none transition-all placeholder:text-gray-400"
                                placeholder="Enter admin username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1B4332] ml-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 text-[#1B4332]" />
                            <input
                                type="password"
                                required
                                className="w-full bg-white/50 border border-white/40 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#00845A] outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00845A] text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-[#006D4A] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
