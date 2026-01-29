import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Play, Square, RotateCcw, Wind, Activity, Clock, ChevronRight, Menu, X, Timer, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Assets
import logo from '../assets/logo.png';
import gyanMudra from '../assets/gyan_mudra.png';
import pranaMudra from '../assets/prana_mudra.png';
import anjaliMudra from '../assets/anjali_mudra.png';

export default function Tools() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#E9F1EE] p-4 md:p-8 font-['Outfit'] text-[#1B4332]">
            {/* Navigation */}
            <nav className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-4 rounded-3xl mb-8 md:mb-12 relative z-50">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                        <img src={logo} alt="smriti.yoga" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-2xl text-[#1B4332]">smriti.yoga</span>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/classes" className="nav-link">Classes</a>
                    <a href="/tools" className="text-[#00845A] font-bold border-b-2 border-[#00845A] pb-1">Tools</a>
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
                            <a href="/classes" className="font-bold text-[#1B4332] opacity-80">Classes</a>
                            <a href="/tools" className="font-bold text-[#00845A]">Tools</a>
                            <a href="/blogs" className="font-bold text-[#1B4332] opacity-80">Blogs</a>
                            <a href="/about" className="font-bold text-[#1B4332] opacity-80">About</a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="max-w-7xl mx-auto">
                <header className="mb-8 md:mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-[#1B4332] mb-4">Wellness Tools</h1>
                        <p className="text-[#1B4332] opacity-60 max-w-lg">
                            Track your health, practice mindfulness, and stay focused with our curated yoga and wellness tools.
                        </p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    {/* Left Column: BMI & Breathing */}
                    <div className="lg:col-span-4 space-y-8">
                        <BMICalculator />
                        <BreathingExercise />
                    </div>

                    {/* Middle/Right Column: Mudras & Meditation */}
                    <div className="lg:col-span-5">
                        <MudrasMeditation />
                    </div>

                    {/* Right Column: Exercise Timer */}
                    <div className="lg:col-span-3">
                        <ExerciseTimer />
                    </div>
                </div>
            </main>

            {/* Background decoration */}
            <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#D7E3DF] rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#D7E3DF] rounded-full blur-[120px] -z-10" />
        </div>
    );
}

function BMICalculator() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = () => {
        if (height && weight) {
            const h = parseFloat(height) / 100;
            const w = parseFloat(weight);
            const val = (w / (h * h)).toFixed(1);
            setBmi(val);

            if (val < 18.5) setCategory('Underweight');
            else if (val < 25) setCategory('Healthy');
            else if (val < 30) setCategory('Overweight');
            else setCategory('Obese');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-4 sm:p-6 rounded-[32px] border border-white/50"
        >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 bg-[#00845A]/10 rounded-xl">
                    <Activity className="w-5 h-5 text-[#00845A]" />
                </div>
                <h3 className="font-bold text-xl">BMI Calculator</h3>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold opacity-40 uppercase ml-1">Height (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="170"
                            className="w-full bg-white/50 border border-white/40 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00845A]/20 transition-all font-bold"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold opacity-40 uppercase ml-1">Weight (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="65"
                            className="w-full bg-white/50 border border-white/40 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00845A]/20 transition-all font-bold"
                        />
                    </div>
                </div>

                <button
                    onClick={calculateBMI}
                    className="w-full py-3 rounded-2xl bg-[#00845A] text-white font-bold hover:bg-[#006D4A] transition-all shadow-lg shadow-[#00845A]/20"
                >
                    Calculate
                </button>

                {bmi && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl text-center border ${category === 'Healthy' ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'
                            }`}
                    >
                        <p className="text-xs font-bold opacity-60 uppercase mb-1">Your BMI:</p>
                        <p className="text-2xl font-bold">
                            <span className={category === 'Healthy' ? 'text-green-600' : 'text-orange-600'}>{bmi}</span>
                            <span className="text-sm opacity-60 ml-2">({category})</span>
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

function BreathingExercise() {
    const [phase, setPhase] = useState('Ready'); // Ready, Inhale, Hold, Exhale
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        if (isActive) {
            if (phase === 'Ready' || (phase === 'Exhale' && timer >= 8)) {
                setPhase('Inhale');
                setTimer(0);
            } else if (phase === 'Inhale' && timer >= 4) {
                setPhase('Hold');
                setTimer(0);
            } else if (phase === 'Hold' && timer >= 4) {
                setPhase('Exhale');
                setTimer(0);
            }
        }
    }, [timer, isActive, phase]);

    const getInstruction = () => {
        switch (phase) {
            case 'Inhale': return 'Inhale for 4s';
            case 'Hold': return 'Hold for 4s';
            case 'Exhale': return 'Exhale for 8s';
            default: return 'Click Start to begin';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-4 sm:p-6 rounded-[32px] border border-white/50 relative overflow-hidden"
        >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 bg-[#00845A]/10 rounded-xl">
                    <Wind className="w-5 h-5 text-[#00845A]" />
                </div>
                <h3 className="font-bold text-xl">Breathing Exercises</h3>
            </div>

            <div className="flex flex-col items-center justify-center py-8">
                <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
                    {/* Animated Circle */}
                    <motion.div
                        animate={{
                            scale: phase === 'Inhale' ? 1.5 : phase === 'Hold' ? 1.5 : phase === 'Exhale' ? 1 : 1,
                            opacity: phase === 'Inhale' ? 0.8 : phase === 'Hold' ? 1 : phase === 'Exhale' ? 0.6 : 0.4
                        }}
                        transition={{
                            duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 0 : phase === 'Exhale' ? 8 : 1,
                            ease: "easeInOut"
                        }}
                        className="absolute w-20 h-20 md:w-32 md:h-32 bg-[#00845A] rounded-full"
                    />
                    <div className="z-10 text-white font-bold text-lg md:text-xl">
                        {isActive ? timer : ''}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <h4 className="font-bold text-lg mb-1">{phase}</h4>
                    <p className="text-sm opacity-60 font-medium">{getInstruction()}</p>
                </div>

                <button
                    onClick={() => {
                        setIsActive(!isActive);
                        if (!isActive) {
                            setPhase('Inhale');
                            setTimer(0);
                        }
                    }}
                    className={`mt-8 px-8 py-3 rounded-2xl font-bold transition-all ${isActive ? 'bg-white border border-[#00845A] text-[#00845A]' : 'bg-[#00845A] text-white'
                        }`}
                >
                    {isActive ? 'Stop' : 'Start Session'}
                </button>
            </div>
        </motion.div>
    );
}

function MudrasMeditation() {
    const mudras = [
        { name: 'Gyan Mudra', desc: 'Improves concentration and memory', img: gyanMudra },
        { name: 'Prana Mudra', desc: 'Activates energy and vital life force', img: pranaMudra },
        { name: 'Anjali Mudra', desc: 'Promotes balance and inner focus', img: anjaliMudra },
    ];

    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [selectedMinutes, setSelectedMinutes] = useState(15);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const startTimer = () => {
        setTimeLeft(selectedMinutes * 60);
        setIsActive(true);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-5 md:p-8 rounded-[40px] border border-white/50 h-full flex flex-col"
        >
            <div className="flex items-center justify-between mb-4 md:mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#00845A]/10 rounded-xl">
                        <Leaf className="w-5 h-5 text-[#00845A]" />
                    </div>
                    <h3 className="font-bold text-xl">Mudras & Meditation</h3>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
                {mudras.map((mudra, i) => (
                    <div key={i} className="text-center group">
                        <div className="w-full aspect-square bg-[#E9F1EE] rounded-3xl mb-4 overflow-hidden p-4 group-hover:shadow-inner transition-all border border-white/40">
                            <img src={mudra.img} alt={mudra.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                        </div>
                        <h4 className="font-bold text-sm mb-1">{mudra.name}</h4>
                        <p className="text-[10px] opacity-60 leading-tight">{mudra.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-auto bg-white/40 border border-white/50 rounded-[32px] p-5 md:p-8 text-center shadow-sm">
                <div className="flex justify-center gap-2 mb-6">
                    {[5, 10, 15, 20].map((m) => (
                        <button
                            key={m}
                            onClick={() => setSelectedMinutes(m)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedMinutes === m ? 'bg-[#00845A] text-white' : 'bg-white/50 opacity-60'
                                }`}
                        >
                            {m}m
                        </button>
                    ))}
                </div>

                <div className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                    {formatTime(isActive ? timeLeft : selectedMinutes * 60)}
                </div>

                <button
                    onClick={() => isActive ? setIsActive(false) : startTimer()}
                    className="w-full py-4 rounded-2xl bg-[#00845A] text-white font-bold text-sm hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[#00845A]/20 transition-all active:scale-95"
                >
                    {isActive ? 'Pause Meditation' : 'Start Meditation Timer'}
                </button>
            </div>
        </motion.div>
    );
}

function ExerciseTimer() {
    const [time, setTime] = useState(0); // in ms
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            const startTime = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        }
    };

    const stopTimer = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };

    const resetTimer = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        setTime(0);
    };

    const formatTime = () => {
        const ms = Math.floor((time % 1000) / 10);
        const sec = Math.floor((time / 1000) % 60);
        const min = Math.floor((time / 60000) % 60);
        const hrs = Math.floor(time / 3600000);

        return `${String(hrs).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-4 md:p-6 rounded-[32px] border border-white/50"
        >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 bg-[#00845A]/10 rounded-xl">
                    <Timer className="w-5 h-5 text-[#00845A]" />
                </div>
                <h3 className="font-bold text-xl">Exercise Timer</h3>
            </div>

            <div className="text-3xl md:text-4xl font-black text-center mb-8 font-mono tracking-tight">
                {formatTime()}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={isRunning ? stopTimer : startTimer}
                    className={`p-4 rounded-2xl transition-all shadow-md ${isRunning ? 'bg-white border border-red-500 text-red-500' : 'bg-[#00845A] text-white'
                        }`}
                >
                    {isRunning ? <Square className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-4 bg-white border border-white/50 rounded-2xl shadow-md hover:bg-gray-50 transition-all"
                >
                    <RotateCcw className="w-6 h-6 text-[#1B4332]" />
                </button>
            </div>
            <div className="flex justify-between mt-4 px-2">
                <span className="text-[10px] font-bold opacity-30 uppercase">{isRunning ? 'Running' : 'Ready'}</span>
                <span className="text-[10px] font-bold opacity-30 uppercase">Lap 0</span>
            </div>
        </motion.div>
    );
}
