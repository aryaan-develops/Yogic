import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Key, ArrowRight, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        secretKey: ''
    });
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // In a real app, verify secretKey on backend
        if (formData.secretKey === 'YOGIC-2026') {
            alert('Registration successful!');
            navigate('/admin/login');
        } else {
            alert('Invalid Secret Key');
        }
    };

    return (
        <div className="min-h-screen bg-[#E9F1EE] flex items-center justify-center p-4 font-['Outfit']">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-10 rounded-[40px] w-full max-w-lg shadow-xl"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#00845A] p-2 rounded-xl mb-3">
                        <Leaf className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#1B4332]">New Admin Access</h1>
                    <p className="text-[#1B4332] opacity-60 text-sm">Create internal administrative account</p>
                </div>

                <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#1B4332] ml-1 uppercase opacity-60">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 text-[#1B4332]" />
                            <input
                                type="text" required
                                className="w-full bg-white/50 border border-white/40 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:bg-white transition-all"
                                placeholder="John Doe"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#1B4332] ml-1 uppercase opacity-60">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 text-[#1B4332]" />
                            <input
                                type="email" required
                                className="w-full bg-white/50 border border-white/40 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:bg-white transition-all"
                                placeholder="admin@yogic.com"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#1B4332] ml-1 uppercase opacity-60">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 text-[#1B4332]" />
                            <input
                                type="password" required
                                className="w-full bg-white/50 border border-white/40 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:bg-white transition-all"
                                placeholder="••••••••"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-[#1B4332] ml-1 uppercase opacity-60 text-red-600">Secret Key</label>
                        <div className="relative">
                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400" />
                            <input
                                type="password" required
                                className="w-full bg-white/50 border border-red-200 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:bg-white transition-all"
                                placeholder="Master Key"
                                onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-[#1B4332] text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-[#000] transition-all"
                        >
                            Initialize Admin Account
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
