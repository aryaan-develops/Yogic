import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, TrendingUp, Calendar, LogOut,
    Settings, Bell, Search, Plus, Trash2, Clock, MessageCircle, BookOpen, Sparkles, Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Schedules');
    const [loading, setLoading] = useState(false);

    // Data states
    const [schedules, setSchedules] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [asanas, setAsanas] = useState([]);

    // Form states
    const [scheduleFormData, setScheduleFormData] = useState({
        fromDay: 'Monday', toDay: 'Friday', time: '', batch: '', notes: '', whatsapp: ''
    });
    const [blogFormData, setBlogFormData] = useState({
        title: '', content: '', image: ''
    });
    const [asanaFormData, setAsanaFormData] = useState({
        name: '', description: '', benefits: '', image: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchData();
        }
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/content`);
            setSchedules(response.data.schedule || []);
            setBlogs(response.data.blogs || []);
            setAsanas(response.data.asanas || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    // --- Create Handlers ---
    const handleAddSchedule = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/schedule`, scheduleFormData);
            setScheduleFormData({ fromDay: 'Monday', toDay: 'Friday', time: '', batch: '', notes: '', whatsapp: '' });
            fetchData();
        } catch (error) {
            alert('Failed to add schedule');
        }
    };

    const handleAddBlog = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/blog`, blogFormData);
            setBlogFormData({ title: '', content: '', image: '' });
            fetchData();
        } catch (error) {
            console.error('Error adding blog:', error.response?.data || error.message);
            alert('Failed to add blog: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleImageUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const imageUrl = res.data.imageUrl;

            if (type === 'blog') {
                setBlogFormData(prev => ({ ...prev, image: imageUrl }));
            } else if (type === 'asana') {
                setAsanaFormData(prev => ({ ...prev, image: imageUrl }));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Image upload failed');
        }
    };

    const handleAddAsana = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/asana`, asanaFormData);
            setAsanaFormData({ name: '', description: '', benefits: '', image: '' });
            fetchData();
        } catch (error) {
            console.error('Error adding asana:', error.response?.data || error.message);
            alert('Failed to add asana: ' + (error.response?.data?.error || error.message));
        }
    };

    // --- Delete Handler ---
    const handleDelete = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/delete/${type}/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const stats = [
        { label: 'Total Classes', value: schedules.length.toString(), trend: '+2', icon: Calendar, color: 'text-purple-600' },
        { label: 'Blog Posts', value: blogs.length.toString(), trend: '+5', icon: BookOpen, color: 'text-blue-600' },
        { label: 'Asana Entries', value: asanas.length.toString(), trend: 'New', icon: Sparkles, color: 'text-green-600' },
    ];

    return (
        <div className="min-h-screen bg-[#F0F4F2] flex font-['Outfit']">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1B4332] text-white p-6 hidden lg:flex flex-col">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => navigate('/')}>
                        <img src={logo} alt="smriti.yoga" className="w-full h-full object-contain brightness-0 invert" />
                    </div>
                    <span className="font-bold text-xl">AdminHub</span>
                </div>

                <nav className="flex-grow space-y-2">
                    {['Dashboard', 'Schedules', 'Blogs', 'Asanas', 'Settings'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium flex items-center gap-3 ${activeTab === item ? 'bg-white/20 opacity-100 shadow-lg' : 'opacity-70 hover:opacity-100 hover:bg-white/10'}`}
                        >
                            {item === 'Dashboard' && <TrendingUp className="w-4 h-4" />}
                            {item === 'Schedules' && <Calendar className="w-4 h-4" />}
                            {item === 'Blogs' && <BookOpen className="w-4 h-4" />}
                            {item === 'Asanas' && <Sparkles className="w-4 h-4" />}
                            {item === 'Settings' && <Settings className="w-4 h-4" />}
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-white/10 space-y-4">
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500/20 text-red-100 transition-colors flex items-center gap-3">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8 overflow-y-auto">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1B4332]">{activeTab}</h1>
                        <p className="text-[#1B4332]/60 text-sm">Welcome back, Admin</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-white p-2.5 rounded-xl border border-black/5 relative hover:bg-gray-50">
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                    </div>
                </header>

                <AnimatePresence mode='wait'>
                    {activeTab === 'Dashboard' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="dashboard">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                {stats.map((stat, i) => (
                                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-black/[0.02]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-2xl bg-${stat.color.split('-')[1]}-50 ${stat.color}`}>
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">{stat.trend}</span>
                                        </div>
                                        <p className="text-[#1B4332]/50 text-sm font-medium">{stat.label}</p>
                                        <h2 className="text-3xl font-bold text-[#1B4332] mt-1">{stat.value}</h2>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'Schedules' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="schedules" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-4">
                                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-black/[0.02] sticky top-8">
                                    <h3 className="text-xl font-bold text-[#1B4332] mb-6 flex items-center gap-2">
                                        <Plus className="w-5 h-5 text-[#00845A]" /> Add New Class
                                    </h3>
                                    <form onSubmit={handleAddSchedule} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">From</label>
                                                <select value={scheduleFormData.fromDay} onChange={(e) => setScheduleFormData({ ...scheduleFormData, fromDay: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium">
                                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                                        <option key={d} value={d}>{d}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">To</label>
                                                <select value={scheduleFormData.toDay} onChange={(e) => setScheduleFormData({ ...scheduleFormData, toDay: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium">
                                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                                        <option key={d} value={d}>{d}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Class Name (Batch)</label>
                                            <input type="text" placeholder="e.g. Morning Flow" value={scheduleFormData.batch} onChange={(e) => setScheduleFormData({ ...scheduleFormData, batch: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium" required />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Time</label>
                                            <input type="text" placeholder="e.g. 07:00 AM - 08:30 AM" value={scheduleFormData.time} onChange={(e) => setScheduleFormData({ ...scheduleFormData, time: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium" required />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">WhatsApp Number</label>
                                            <input type="text" placeholder="e.g. 919876543210" value={scheduleFormData.whatsapp} onChange={(e) => setScheduleFormData({ ...scheduleFormData, whatsapp: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium" required />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Special Notes</label>
                                            <textarea placeholder="e.g. Focus on breathing..." value={scheduleFormData.notes} onChange={(e) => setScheduleFormData({ ...scheduleFormData, notes: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium min-h-[100px] resize-none" />
                                        </div>
                                        <button type="submit" className="w-full bg-[#00845A] text-white font-bold py-3 rounded-xl hover:bg-[#006D4A] transition-colors shadow-lg shadow-[#00845A]/20">Add Class Schedule</button>
                                    </form>
                                </div>
                            </div>
                            <div className="lg:col-span-8">
                                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-black/[0.02]">
                                    <h3 className="text-xl font-bold text-[#1B4332] mb-8">Current Schedules</h3>
                                    <div className="space-y-4">
                                        {schedules.map((item) => (
                                            <div key={item._id} className="flex items-center justify-between p-6 bg-[#F0F4F2]/50 rounded-[24px] group">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center font-bold text-[#00845A] shadow-sm text-xs">
                                                        {item.fromDay?.substring(0, 3)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-lg text-[#1B4332]">{item.batch}</p>
                                                        <p className="text-sm text-[#1B4332]/60">{item.time}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDelete('schedule', item._id)} className="p-2.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'Blogs' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="blogs" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-4">
                                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-black/[0.02] sticky top-8">
                                    <h3 className="text-xl font-bold text-[#1B4332] mb-6 flex items-center gap-2">
                                        <Plus className="w-5 h-5 text-[#00845A]" /> Post New Blog
                                    </h3>
                                    <form onSubmit={handleAddBlog} className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Blog Title</label>
                                            <input type="text" placeholder="e.g. Benefits of Morning Yoga" value={blogFormData.title} onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium" required />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Blog Image</label>
                                            <div className="flex gap-4 items-center">
                                                <input type="text" placeholder="Image URL" value={blogFormData.image} onChange={(e) => setBlogFormData({ ...blogFormData, image: e.target.value })} className="flex-grow bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium" />
                                                <label className="cursor-pointer bg-[#00845A]/10 p-3 rounded-xl hover:bg-[#00845A]/20 transition-all text-[#00845A]">
                                                    <Upload className="w-5 h-5" />
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'blog')} />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Content</label>
                                            <textarea placeholder="Write your blog content here..." value={blogFormData.content} onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium min-h-[200px] resize-none" required />
                                        </div>
                                        <button type="submit" className="w-full bg-[#00845A] text-white font-bold py-3 rounded-xl hover:bg-[#006D4A] transition-colors shadow-lg shadow-[#00845A]/20">Publish Blog</button>
                                    </form>
                                </div>
                            </div>
                            <div className="lg:col-span-8">
                                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-black/[0.02]">
                                    <h3 className="text-xl font-bold text-[#1B4332] mb-8">Recent Blogs</h3>
                                    <div className="space-y-4">
                                        {blogs.map((blog) => (
                                            <div key={blog._id} className="flex items-center justify-between p-6 bg-[#F0F4F2]/50 rounded-[24px]">
                                                <div className="flex items-center gap-5">
                                                    {blog.image && <img src={blog.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />}
                                                    <div>
                                                        <p className="font-bold text-lg text-[#1B4332]">{blog.title}</p>
                                                        <p className="text-xs text-[#1B4332]/40">{new Date(blog.date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDelete('blog', blog._id)} className="p-2.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'Asanas' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="asanas" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-4">
                                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-black/[0.02] sticky top-8">
                                    <h3 className="text-xl font-bold text-[#1B4332] mb-6 flex items-center gap-2">
                                        <Plus className="w-5 h-5 text-[#00845A]" /> Add Asana of the Day
                                    </h3>
                                    <form onSubmit={handleAddAsana} className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Asana Name</label>
                                            <input type="text" placeholder="e.g. Tadasana" value={asanaFormData.name} onChange={(e) => setAsanaFormData({ ...asanaFormData, name: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium" required />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Description</label>
                                            <input type="text" placeholder="Mountain Pose" value={asanaFormData.description} onChange={(e) => setAsanaFormData({ ...asanaFormData, description: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Asana Image</label>
                                            <div className="flex gap-4 items-center">
                                                <input type="text" placeholder="Image URL" value={asanaFormData.image} onChange={(e) => setAsanaFormData({ ...asanaFormData, image: e.target.value })} className="flex-grow bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium" />
                                                <label className="cursor-pointer bg-[#00845A]/10 p-3 rounded-xl hover:bg-[#00845A]/20 transition-all text-[#00845A]">
                                                    <Upload className="w-5 h-5" />
                                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'asana')} />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-[#1B4332]/40 uppercase mb-2 block">Benefits</label>
                                            <textarea placeholder="List the benefits of this asana..." value={asanaFormData.benefits} onChange={(e) => setAsanaFormData({ ...asanaFormData, benefits: e.target.value })} className="w-full bg-[#F0F4F2] border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-[#00845A]/20 transition-all font-medium min-h-[120px] resize-none" required />
                                        </div>
                                        <button type="submit" className="w-full bg-[#00845A] text-white font-bold py-3 rounded-xl hover:bg-[#006D4A] transition-colors shadow-lg shadow-[#00845A]/20">Save Asana</button>
                                    </form>
                                </div>
                            </div>
                            <div className="lg:col-span-8">
                                <div className="bg-white p-8 rounded-[40px] shadow-sm border border-black/[0.02]">
                                    <h3 className="text-xl font-bold text-[#1B4332] mb-8">Asana History</h3>
                                    <div className="space-y-4">
                                        {asanas.map((item) => (
                                            <div key={item._id} className="flex items-center justify-between p-6 bg-[#F0F4F2]/50 rounded-[24px]">
                                                <div className="flex items-center gap-5">
                                                    {item.image && <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />}
                                                    <div>
                                                        <p className="font-bold text-lg text-[#1B4332]">{item.name}</p>
                                                        <p className="text-sm text-[#1B4332]/60">{item.description}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => handleDelete('asana', item._id)} className="p-2.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
