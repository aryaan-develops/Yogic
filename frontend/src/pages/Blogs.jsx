import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Calendar, Clock, User, ArrowRight, Menu, X, BookOpen, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function Blogs() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [asana, setAsana] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/content`);
            setBlogs(response.data.blogs || []);
            setAsana(response.data.asanas?.[0] || null); // Get most recent asana
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
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
                    <a href="/classes" className="nav-link">Classes</a>
                    <a href="/tools" className="nav-link">Tools</a>
                    <a href="/blogs" className="text-[#00845A] font-bold border-b-2 border-[#00845A] pb-1">Blogs</a>
                    <a href="/about" className="nav-link">About</a>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden glass p-2 rounded-xl">
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
                            <a href="/" className="font-bold text-[#1B4332]">Home</a>
                            <a href="/classes" className="font-bold text-[#1B4332]">Classes</a>
                            <a href="/tools" className="font-bold text-[#1B4332]">Tools</a>
                            <a href="/blogs" className="font-bold text-[#00845A]">Blogs</a>
                            <a href="/about" className="font-bold text-[#1B4332]">About</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Blogs Section */}
                    <div className="lg:col-span-8">
                        <header className="mb-12">
                            <h1 className="text-5xl font-bold text-[#1B4332] mb-4">Yoga Insights</h1>
                            <p className="text-[#1B4332] opacity-60 max-w-lg">Explore our latest articles on mindfulness, health, and the yogic lifestyle.</p>
                        </header>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="w-8 h-8 border-4 border-[#00845A] border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {blogs.length === 0 ? (
                                    <div className="glass p-12 text-center rounded-[40px]">
                                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p className="text-[#1B4332] opacity-40 font-bold uppercase tracking-wider text-sm">No blogs published yet</p>
                                    </div>
                                ) : (
                                    blogs.map((blog, i) => (
                                        <motion.div
                                            key={blog._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="glass p-8 rounded-[48px] hover:shadow-2xl transition-all border border-white/50 group"
                                        >
                                            <div className="flex flex-col md:flex-row gap-8">
                                                {blog.image && (
                                                    <div className="md:w-1/3 aspect-video md:aspect-square rounded-[32px] overflow-hidden">
                                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                )}
                                                <div className="flex-grow space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="bg-[#00845A]/10 text-[#00845A] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">ARTICLE</span>
                                                        <span className="text-[10px] font-bold text-[#1B4332]/40 uppercase">{new Date(blog.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <h3 className="font-bold text-3xl text-[#1B4332]">{blog.title}</h3>
                                                    <p className="text-[#1B4332]/60 leading-relaxed line-clamp-3">{blog.content}</p>
                                                    <button className="flex items-center gap-2 text-[#00845A] font-bold group">
                                                        Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Asana of the Day */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-8 space-y-8">
                            {asana && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-[#1B4332] p-8 rounded-[48px] text-white shadow-xl relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-widest mb-4">
                                            <Sparkles className="w-4 h-4" /> Asana of the Day
                                        </div>
                                        {asana.image && (
                                            <div className="aspect-square rounded-3xl overflow-hidden mb-6 border-4 border-white/10">
                                                <img src={asana.image} alt={asana.name} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <h2 className="text-3xl font-bold mb-2">{asana.name}</h2>
                                        <p className="text-white/60 text-sm italic mb-6">"{asana.description}"</p>
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-xs uppercase text-green-400">Key Benefits</h4>
                                            <p className="text-sm leading-relaxed">{asana.benefits}</p>
                                        </div>
                                    </div>
                                    {/* Decoration */}
                                    <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-green-400/10 rounded-full blur-3xl" />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Background decoration */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D7E3DF] rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D7E3DF] rounded-full blur-[120px] -z-10" />
        </div>
    );
}
