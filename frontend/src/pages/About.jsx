import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Youtube, Instagram, Menu, X, Heart, Wind, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Assets
import aboutImg from '../assets/about_illustration.png';
import logo from '../assets/logo.png';

export default function About() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const socialLinks = {
        youtube: "https://www.youtube.com/@smritiyoga123",
        instagram: "https://www.instagram.com/smriti.yogya"
    };

    const bubbles = [
        { text: "A Curly Girl on her Yogic Journey", x: "20%", y: "30%", delay: 0.2 },
        { text: "Masters in Yoga", x: "75%", y: "25%", delay: 0.4 },
        { text: "900K+ Community", x: "70%", y: "45%", delay: 0.6 },
    ];

    const icons = [
        { icon: <Heart className="w-5 h-5 text-rose-400" />, x: "15%", y: "20%", delay: 0.8 },
        { icon: <Wind className="w-5 h-5 text-sky-400" />, x: "30%", y: "15%", delay: 1.0 },
        { icon: <Star className="w-5 h-5 text-amber-400" />, x: "25%", y: "45%", delay: 1.2 },
        {
            icon: <Instagram className="w-6 h-6 text-pink-600" />,
            x: "85%", y: "15%", delay: 1.4,
            link: socialLinks.instagram
        },
        {
            icon: <Youtube className="w-6 h-6 text-red-600" />,
            x: "88%", y: "35%", delay: 1.6,
            link: socialLinks.youtube
        },
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] p-4 md:p-8 font-['Outfit'] text-[#1B4332] overflow-hidden">
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
                    <a href="/blogs" className="nav-link">Blogs</a>
                    <a href="/about" className="text-[#00845A] font-bold border-b-2 border-[#00845A] pb-1">About</a>
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
                            <a href="/blogs" className="font-bold text-[#1B4332]">Blogs</a>
                            <a href="/about" className="font-bold text-[#00845A]">About</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="max-w-7xl mx-auto relative min-h-[80vh] flex flex-col items-center justify-center">
                {/* Background Illustration Container */}
                <div className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] rounded-[48px] overflow-hidden shadow-2xl border-8 border-white/50 bg-gradient-to-b from-[#E9F1EE] to-white">
                    <motion.img
                        src={aboutImg}
                        alt="About Smriti"
                        className="w-full h-full object-cover object-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Overlay Decorations */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />

                    {/* Floating Text Bubbles (Desktop & Tablet) */}
                    <div className="hidden sm:block">
                        {bubbles.map((bubble, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: bubble.delay, duration: 0.6 }}
                                className="absolute glass px-6 py-3 rounded-2xl shadow-xl border border-white/60 pointer-events-none"
                                style={{ left: bubble.x, top: bubble.y }}
                            >
                                <p className="text-sm font-bold opacity-90">{bubble.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Floating Icons */}
                    <div className="hidden sm:block">
                        {icons.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: item.delay, type: "spring" }}
                                className={`absolute p-3 rounded-full shadow-lg border border-white/60 ${item.link ? 'bg-white cursor-pointer hover:scale-110 active:scale-95 transition-all' : 'glass pointer-events-none'}`}
                                style={{ left: item.x, top: item.y }}
                                onClick={() => item.link && window.open(item.link, '_blank')}
                            >
                                {item.icon}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile View Content (Since floating elements are hidden or hard to see on small screens) */}
                <div className="sm:hidden mt-8 w-full space-y-6 px-4 pb-12">
                    <div className="space-y-4">
                        {bubbles.map((bubble, i) => (
                            <div key={i} className="glass p-4 rounded-2xl text-center shadow-sm">
                                <p className="font-bold text-[#1B4332]">{bubble.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-6">
                        <button
                            onClick={() => window.open(socialLinks.instagram, '_blank')}
                            className="bg-white p-4 rounded-full shadow-lg border border-pink-100 text-pink-600 flex items-center gap-2 font-bold"
                        >
                            <Instagram />
                        </button>
                        <button
                            onClick={() => window.open(socialLinks.youtube, '_blank')}
                            className="bg-white p-4 rounded-full shadow-lg border border-red-100 text-red-600 flex items-center gap-2 font-bold"
                        >
                            <Youtube />
                        </button>
                    </div>
                </div>

                {/* Title Section (Optional, to give more context) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mt-12 mb-20 max-w-2xl px-4"
                >
                    <h1 className="text-4xl font-black text-[#1B4332] mb-4">Meet Smriti</h1>
                    <p className="text-[#1B4332] opacity-60 leading-relaxed">
                        Embarking on a journey to spread wellness and peace through the ancient art of Yoga. Join our community of over 900,000 seekers and start your transformation today.
                    </p>
                </motion.div>
            </main>

            {/* Background decoration */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FEF3F2] rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#E9F1EE] rounded-full blur-[120px] -z-10" />
        </div>
    );
}
