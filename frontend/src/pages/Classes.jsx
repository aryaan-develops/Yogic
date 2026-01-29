import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Calendar, Clock, User, MessageCircle, ArrowLeft, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function Classes() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/content`);
            setSchedules(response.data.schedule || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#E9F1EE] p-4 md:p-8 font-['Outfit']">
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-4 rounded-3xl mb-12 relative z-50">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                        <img src={logo} alt="smriti.yoga" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-2xl text-[#1B4332]">smriti.yoga</span>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/classes" className="text-[#00845A] font-bold border-b-2 border-[#00845A] pb-1">Classes</a>
                    <a href="/tools" className="nav-link">Tools</a>
                    <a href="/blogs" className="nav-link">Blogs</a>
                    <a href="/about" className="nav-link">About</a>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden glass p-2 rounded-xl"
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-24 left-0 right-0 glass m-4 p-8 rounded-[32px] flex flex-col gap-6 z-50 md:hidden"
                        >
                            <a href="/" className="font-bold text-[#1B4332] opacity-80">Home</a>
                            <a href="/classes" className="font-bold text-[#00845A]">Classes</a>
                            <a href="/tools" className="font-bold text-[#1B4332] opacity-80">Tools</a>
                            <a href="/blogs" className="font-bold text-[#1B4332] opacity-80">Blogs</a>
                            <a href="/about" className="font-bold text-[#1B4332] opacity-80">About</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <h1 className="text-5xl font-bold text-[#1B4332] mb-4">Class Schedule</h1>
                            <p className="text-[#1B4332] opacity-60 max-w-lg">
                                Join our transformative sessions designed to bring balance to your body and mind.
                                Find the perfect class that fits your journey.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="glass px-6 py-4 rounded-2xl flex items-center gap-3">
                                <div className="p-2 bg-[#00845A]/10 rounded-lg">
                                    <Calendar className="w-5 h-5 text-[#00845A]" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#1B4332] opacity-40 uppercase">Flexible</p>
                                    <p className="font-bold text-[#1B4332]">Schedules</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-8 h-8 border-4 border-[#00845A] border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {schedules.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-8 rounded-[40px] hover:shadow-2xl transition-all border border-white/50 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6">
                                    <div className="bg-[#00845A]/10 text-[#00845A] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        Active Batch
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[#00845A] font-bold text-sm uppercase tracking-widest">
                                            <Calendar className="w-4 h-4" />
                                            {item.fromDay || 'NA'} - {item.toDay || 'NA'}
                                        </div>
                                        <h3 className="font-bold text-3xl text-[#1B4332] group-hover:translate-x-1 transition-transform">{item.batch}</h3>
                                    </div>

                                    <div className="flex items-center gap-3 text-[#1B4332]/60 font-medium">
                                        <div className="bg-white p-2 rounded-xl shadow-sm">
                                            <Clock className="w-5 h-5 text-[#00845A]" />
                                        </div>
                                        {item.time}
                                    </div>

                                    {item.notes && (
                                        <div className="pt-6 border-t border-[#1B4332]/5">
                                            <div className="flex gap-3">
                                                <div className="mt-1 shrink-0">
                                                    <MessageCircle className="w-5 h-5 text-[#00845A]/40" />
                                                </div>
                                                <p className="text-[#1B4332]/70 leading-relaxed italic text-sm">
                                                    "{item.notes}"
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => {
                                            if (!item.whatsapp) {
                                                alert("Contact number not available for this batch. Please contact the administrator.");
                                                return;
                                            }
                                            const message = encodeURIComponent(`Hi, I'm interested in joining the "${item.batch}" batch (${item.fromDay} - ${item.toDay}, ${item.time}). Please let me know how to proceed.`);
                                            window.open(`https://wa.me/${item.whatsapp}?text=${message}`, '_blank');
                                        }}
                                        className="w-full mt-4 py-4 rounded-2xl bg-[#00845A] text-white font-bold text-sm hover:bg-[#006D4A] transition-all transform active:scale-95 shadow-lg shadow-[#00845A]/20"
                                    >
                                        Join This Batch
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Background decoration */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D7E3DF] rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D7E3DF] rounded-full blur-[120px] -z-10" />
        </div>
    );
}
