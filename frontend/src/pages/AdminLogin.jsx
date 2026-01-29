import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login
        if (email && password) {
            localStorage.setItem('adminToken', 'fake-jwt');
            navigate('/admin/dashboard');
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
                    <div className="bg-[#00845A] p-3 rounded-2xl mb-4">
                        <Leaf className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#1B4332]">Admin Portal</h1>
                    <p className="text-[#1B4332] opacity-60 text-sm mt-2">Please login to manage your studio</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#1B4332] ml-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 text-[#1B4332]" />
                            <input
                                type="email"
                                required
                                className="w-full bg-white/50 border border-white/40 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-[#00845A] outline-none transition-all"
                                placeholder="admin@yogic.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        className="w-full bg-[#00845A] text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-[#006D4A] transition-all group"
                    >
                        Sign In
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
