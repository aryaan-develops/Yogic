import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, User, Search, ArrowRight, Play, Heart, Wind, Zap, Menu, X, Instagram, Youtube, Linkedin, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function Home() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [asana, setAsana] = useState(null);

    React.useEffect(() => {
        const fetchAsana = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/content`);
                if (response.data.asanas?.length > 0) {
                    setAsana(response.data.asanas[0]);
                }
            } catch (error) {
                console.error('Error fetching asana:', error);
            }
        };
        fetchAsana();
    }, []);

    return (
        <div className="min-h-screen bg-[#E9F1EE] p-4 md:p-8 overflow-hidden font-['Outfit']">
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-4 rounded-3xl mb-12 relative z-50">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                        <img src={logo} alt="smriti.yoga" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-2xl text-[#1B4332]">smriti.yoga</span>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    <a href="/" className="text-[#00845A] font-bold border-b-2 border-[#00845A] pb-1">Home</a>
                    <a href="/classes" className="nav-link">Classes</a>
                    <a href="/tools" className="nav-link">Tools</a>
                    <a href="/blogs" className="nav-link">Blogs</a>
                    <a href="/about" className="nav-link">About</a>
                </div>

                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
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
                            initial={{ opacity: 1, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-24 left-0 right-0 glass m-4 p-8 rounded-[32px] flex flex-col gap-6 z-50 md:hidden"
                        >
                            <a href="/" className="font-bold text-[#00845A]">Home</a>
                            <a href="/classes" className="font-bold text-[#1B4332] opacity-80">Classes</a>
                            <a href="/tools" className="font-bold text-[#1B4332] opacity-80">Tools</a>
                            <a href="/blogs" className="font-bold text-[#1B4332] opacity-80">Blogs</a>
                            <a href="/about" className="font-bold text-[#1B4332] opacity-80">About</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Hero Left Content */}
                <div className="lg:col-span-4 space-y-8 pt-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 bg-white/50 w-fit px-4 py-1.5 rounded-full border border-white/40"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#00845A]" />
                        <span className="text-xs font-semibold tracking-wide uppercase opacity-70">Meditation</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[4rem] leading-[1.05] font-bold text-[#1B4332] tracking-tight"
                    >
                        Mindfullness <br />
                        <span className="flex items-center gap-3">
                            <span className="bg-white p-2 rounded-full shadow-md w-12 h-12 flex items-center justify-center overflow-hidden">
                                <img src={logo} alt="Yoga" className="w-full h-full object-cover" />
                            </span>
                            More Calm
                        </span>
                        Meaningful
                    </motion.h1>

                    <div className="flex gap-4">
                        <motion.div whileHover={{ scale: 1.1 }} className="bg-white p-3 rounded-full shadow-sm cursor-pointer border border-[#E9F1EE]"><Wind className="w-5 h-5 opacity-60 text-[#00845A]" /></motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="bg-white p-3 rounded-full shadow-sm cursor-pointer border border-[#E9F1EE]"><Heart className="w-5 h-5 opacity-60 text-[#00845A]" /></motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="bg-white p-3 rounded-full shadow-sm cursor-pointer border border-[#E9F1EE]"><Zap className="w-5 h-5 opacity-60 text-[#00845A]" /></motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="bg-white p-3 rounded-full shadow-sm cursor-pointer border border-[#E9F1EE]"><Search className="w-5 h-5 opacity-60 text-[#00845A]" /></motion.div>
                    </div>

                    <p className="text-[#1B4332] opacity-60 text-sm leading-relaxed max-w-[280px] border-t border-[#1B4332]/10 pt-6">
                        We offer a holistic approach to yoga and meditation, blending traditional practices with modern techniques to help you achieve harmony and inner peace.
                    </p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/classes')}
                            className="btn-primary flex items-center gap-2"
                        >
                            Get started
                        </button>
                        <button
                            onClick={() => navigate('/about')}
                            className="btn-secondary"
                        >
                            Explore
                        </button>
                    </div>
                </div>

                {/* Hero Center Image Area */}
                <div className="lg:col-span-5 relative flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="rounded-[40px] overflow-hidden w-full max-w-[420px] aspect-[4/5] relative shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Meditation"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay Tags */}
                        <div className="absolute top-6 left-6 flex gap-3">
                            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2">
                                <Play className="w-4 h-4 text-white fill-current" />
                                <span className="text-white text-sm font-medium">Meditation</span>
                            </div>
                            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                                <span className="text-white text-sm font-medium">Mental Less</span>
                            </div>
                        </div>

                        {/* Bottom Stat Card */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-8 right-8 glass p-6 rounded-3xl min-w-[200px]"
                        >
                            <h2 className="text-3xl font-bold text-white mb-1">&gt;240</h2>
                            <p className="text-white/80 text-xs font-medium leading-tight">people improve their mentality here</p>
                        </motion.div>

                        {/* Floating Tags */}
                        <div className="absolute bottom-8 left-8 flex gap-2">
                            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                                <span className="text-xs font-bold text-[#1B4332]">Mental health</span>
                            </div>
                            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                                <span className="text-xs font-bold text-[#1B4332]">Mindfullness</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Right Content */}
                <div className="lg:col-span-3 h-full flex flex-col pt-10">
                    <div className="space-y-4 mb-10">
                        <h3 className="text-4xl font-bold text-[#1B4332]">Explore Our Offerings</h3>
                        <p className="text-[#1B4332] opacity-50 text-sm leading-relaxed">
                            Whether you're a beginner or an experienced practitioner, our community is here to support your journey.
                        </p>
                    </div>

                    <div className="relative group flex-grow space-y-6">
                        {asana && (
                            <motion.div
                                whileHover={{ y: -5 }}
                                onClick={() => navigate('/blogs')}
                                className="bg-[#1B4332] p-6 rounded-[35px] text-white shadow-xl cursor-pointer"
                            >
                                <div className="flex items-center gap-2 text-green-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                                    <Zap className="w-3 h-3" /> Asana of the Day
                                </div>
                                <h4 className="text-xl font-bold mb-2">{asana.name}</h4>
                                <p className="text-white/60 text-[10px] line-clamp-2">{asana.description}</p>
                            </motion.div>
                        )}

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="rounded-[35px] overflow-hidden aspect-[3/4] relative shadow-xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Community"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                            <div className="absolute top-4 left-4">
                                <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                                    <span className="text-[10px] font-bold text-[#1B4332] tracking-wider uppercase">Community</span>
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6">
                                <h4 className="text-white text-3xl font-bold mb-1">&gt;240</h4>
                                <p className="text-white/70 text-[10px] leading-tight mb-4">Join our community now and start with Us</p>
                                <button
                                    onClick={() => window.open('https://www.instagram.com/channel/AbYFZnS0Da80KiH_/', '_blank')}
                                    className="w-full bg-white/20 backdrop-blur border border-white/30 text-white rounded-2xl py-2 flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-[#1B4332] transition-all"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="mt-20 relative">
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
                    <div className="bg-[#1B4332] rounded-[48px] p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
                        {/* Decorative Background Patterns */}
                        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-[#00845A] rounded-full blur-[100px] opacity-20 pointer-events-none" />

                        <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                            {/* Brand Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
                                        <img src={logo} alt="smriti.yoga" className="w-full h-full object-contain brightness-0 invert" />
                                    </div>
                                    <span className="font-bold text-3xl tracking-tight">smriti.yoga</span>
                                </div>
                                <p className="text-white/60 leading-relaxed max-w-sm">
                                    Join our community of over 900,000 seekers. We spread wellness through the ancient art of Yoga.
                                </p>
                                <div className="flex items-center gap-4">
                                    {[
                                        { icon: <Instagram className="w-5 h-5" />, link: "https://www.instagram.com/smriti.yogya" },
                                        { icon: <Youtube className="w-5 h-5" />, link: "https://www.youtube.com/@smritiyoga123" }
                                    ].map((social, i) => (
                                        <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-[#00845A] transition-all p-3 rounded-2xl">
                                            {social.icon}
                                        </a>
                                    ))}
                                    <button
                                        onClick={() => navigate('/admin/login')}
                                        className="bg-white/5 hover:bg-white/10 text-white/60 hover:text-white px-6 py-3 rounded-2xl transition-all font-bold text-sm border border-white/10"
                                    >
                                        Admin Access
                                    </button>
                                </div>
                            </div>

                            {/* Newsletter Section - Condensed */}
                            <div className="w-full max-w-md space-y-4">
                                <h4 className="font-bold text-lg">Stay in the Loop</h4>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A] transition-all flex-grow text-white font-medium placeholder:text-white/20"
                                    />
                                    <button className="bg-[#00845A] hover:bg-[#006D4A] transition-all p-3 rounded-2xl shadow-lg shadow-[#00845A]/20">
                                        <ArrowRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
                            <p>© 2026 smriti.yoga. All rights reserved.</p>
                            <div className="flex gap-6">
                                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms</a>
                            </div>
                        </div>
                    </div>

                    {/* Fun Floating Icon Effect Outside */}
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-10 right-20 hidden lg:block opacity-10"
                    >
                        <Wind className="w-40 h-40 text-[#1B4332]" />
                    </motion.div>
                </div>
            </footer>

            {/* Background decoration */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D7E3DF] rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D7E3DF] rounded-full blur-[120px] -z-10" />
        </div>
    );
}
