import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Chrome, ArrowRight } from 'lucide-react';
import { auth, db } from "../firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Notification from "../components/Notification.tsx";
import axios from "axios";
import { useTheme } from "@/lib/theme-context";


// Helper function to check/set user data and redirect
const redirectAfterAuth = async (user: any, navigate: any, showNotification: any) => {
    if (!user) {
        showNotification("User authentication failed.");
        return;
    }
    try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
            await setDoc(docRef, {
                email: user.email,
                displayName: user.displayName || "",
                quizCompleted: false,
            });
        }
        navigate("/dashboard");
    } catch (err) {
        console.error("Error checking/initializing user", err);
        navigate("/dashboard");
    }
};

export default function AuthContainer({ initialView = 'login' }: { initialView?: 'login' | 'signup' }) {
    const [isLogin, setIsLogin] = useState(initialView === 'login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [view, setView] = useState('auth');
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");

    const navigate = useNavigate();
    const { currentTheme } = useTheme();
    const isDarkTheme = currentTheme === 'clean-modern';

    const showNotificationWithMessage = (message: string, duration = 5000) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), duration);
    };

    useEffect(() => {
        setIsLogin(initialView === 'login');
        setView('auth');
        setEmail('');
        setPassword('');
        setFullName('');
    }, [initialView]);

    const handleGoogleAuth = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            const snap = await getDoc(userDocRef);
            const isNewUser = !snap.exists();

            if (isNewUser) {
                try {
                    const apiUrl = `${process.env.REACT_APP_API_URL}/api/send-welcome-email`;
                    await axios.post(apiUrl, {
                        name: user.displayName || "New User",
                        email: user.email,
                    });
                    console.log("Welcome email request sent for Google user.");
                } catch (emailError) {
                    console.error("Failed to send welcome email:", emailError);
                }
            }

            showNotificationWithMessage(`✅ Successfully signed in with Google! ${isNewUser ? 'Welcome!' : 'Welcome back!'}`);
            await redirectAfterAuth(user, navigate, showNotificationWithMessage);

        } catch (error: any) {
            console.error("Error during Google auth: ", error);
            if (error.code !== 'auth/popup-closed-by-user') {
                showNotificationWithMessage("❌ Google Sign-In failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                try {
                    const apiUrl = `${process.env.REACT_APP_API_URL}/api/send-welcome-email`;
                    await axios.post(apiUrl, {
                        name: user.displayName || "Valued User",
                        email: user.email,
                    });
                    console.log("Welcome email request sent for email user (Login).");
                } catch (emailError) {
                    console.error("Failed to send welcome email on login:", emailError);
                }

                showNotificationWithMessage("✅ Welcome back!");
                await redirectAfterAuth(user, navigate, showNotificationWithMessage);

            } else {
                if (!fullName) {
                    throw new Error("Full Name is required for sign up.");
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                const userDocRef = doc(db, "users", user.uid);
                await setDoc(userDocRef, {
                    email: email,
                    displayName: fullName,
                    quizCompleted: false,
                });

                try {
                    const apiUrl = `${process.env.REACT_APP_API_URL}/api/send-welcome-email`;
                    await axios.post(apiUrl, {
                        name: fullName,
                        email: email,
                    });
                    console.log("Welcome email request sent for new email user (Sign Up).");
                } catch (emailError) {
                    console.error("Failed to send welcome email on signup:", emailError);
                }

                showNotificationWithMessage("✅ Account created successfully! Redirecting...");
                await redirectAfterAuth(user, navigate, showNotificationWithMessage);
            }
        } catch (error: any) {
            console.error("Error during email auth:", error);
            let errorMessage = "Authentication failed. Please check your credentials.";
            if (error.message === "Full Name is required for sign up.") {
                errorMessage = "❌ Full Name is required for sign up.";
            } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = "❌ Invalid email or password.";
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = "❌ This email is already registered. Try logging in.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "❌ Password must be at least 6 characters long.";
            }
            showNotificationWithMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            showNotificationWithMessage("❌ Please enter your email address.");
            return;
        }
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            showNotificationWithMessage("✅ Password reset link sent! Check your inbox.");
            setView('auth');
        } catch (error: any) {
            console.error("Error sending password reset email:", error);
            if (error.code === 'auth/user-not-found') {
                showNotificationWithMessage("❌ No account found with that email address.");
            } else {
                showNotificationWithMessage("❌ Failed to send reset link. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const formKey = isLogin ? 'login' : 'signup';

    // Theme-aware styles
    const containerBg = isDarkTheme
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50';

    const cardBg = isDarkTheme
        ? 'bg-slate-800/90 border-slate-700'
        : 'bg-white/90 border-gray-200';

    const textPrimary = isDarkTheme ? 'text-white' : 'text-gray-900';
    const textSecondary = isDarkTheme ? 'text-slate-300' : 'text-gray-600';
    const textMuted = isDarkTheme ? 'text-slate-400' : 'text-gray-500';
    const inputBg = isDarkTheme
        ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500'
        : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500';
    const tabBg = isDarkTheme ? 'bg-slate-700' : 'bg-gray-100';
    const tabActive = isDarkTheme ? 'bg-slate-600 text-white' : 'bg-white text-gray-900';
    const tabInactive = isDarkTheme ? 'text-slate-300 hover:text-white' : 'text-gray-600 hover:text-gray-900';
    const buttonGradient = isDarkTheme
        ? 'bg-gradient-to-r from-sky-500 to-teal-500 hover:shadow-sky-500/50'
        : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-blue-500/50';
    const googleBtn = isDarkTheme
        ? 'border-slate-600 text-slate-200 hover:bg-slate-700'
        : 'border-gray-200 text-gray-700 hover:bg-gray-50';
    const dividerColor = isDarkTheme ? 'border-slate-600' : 'border-gray-200';
    const dividerText = isDarkTheme ? 'bg-slate-800 text-slate-400' : 'bg-white text-gray-500';

    // SVG filter based on theme
    const svgFilter = isDarkTheme
        ? 'brightness(0.9) saturate(1.2) hue-rotate(180deg) invert(1)'
        : 'none';

    return (
        <div className={`min-h-screen ${containerBg} flex relative overflow-hidden`}>
            <Notification message={notificationMessage} show={showNotification} />

            {/* Theme Selector removed as per requirement */}

            {/* Left Side - SVG Illustration */}
            <motion.div
                className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className={`absolute -top-20 -left-20 w-96 h-96 rounded-full ${isDarkTheme ? 'bg-sky-500/10' : 'bg-blue-400/10'} blur-3xl`}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className={`absolute -bottom-20 -right-20 w-80 h-80 rounded-full ${isDarkTheme ? 'bg-teal-500/10' : 'bg-cyan-400/10'} blur-3xl`}
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.5, 0.3, 0.5],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>

                {/* SVG Container */}
                <motion.div
                    className="relative z-10 w-full max-w-2xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img
                        src="/mainsvg/loginpage.svg"
                        alt="Career Illustration"
                        className="w-full h-auto drop-shadow-2xl"
                        style={{
                            filter: svgFilter,
                            maxHeight: '80vh',
                            objectFit: 'contain'
                        }}
                    />
                </motion.div>

                {/* Floating text overlay */}
                <motion.div
                    className="absolute bottom-12 left-12 right-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <div className={`p-6 rounded-2xl backdrop-blur-xl ${isDarkTheme ? 'bg-slate-800/60 border border-slate-700' : 'bg-white/60 border border-white/50'} shadow-xl`}>
                        <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>
                            Transform Your Career Journey
                        </h2>
                        <p className={textSecondary}>
                            AI-powered guidance for students, freshers, and professionals. Get personalized roadmaps and mentorship.
                        </p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md relative z-10"
                >
                    {/* Header/Logo */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            <img
                                src="/logo.png"
                                alt="CareerFlow Logo"
                                className="w-full h-full object-contain drop-shadow-lg"
                            />
                        </motion.div>
                        <h1 className={`text-4xl font-bold bg-gradient-to-r ${isDarkTheme ? 'from-white via-sky-200 to-white' : 'from-gray-900 via-blue-900 to-gray-900'} bg-clip-text text-transparent mb-2`}>
                            CareerFlow
                        </h1>
                        <p className={textSecondary}>Your AI-powered career guidance platform</p>
                    </div>

                    {/* Auth Box Container */}
                    <motion.div
                        className={`${cardBg} backdrop-blur-xl rounded-3xl shadow-2xl p-8 border`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {/* View Toggle */}
                        <div className={`flex gap-2 mb-6 ${tabBg} p-1 rounded-xl`}>
                            <button
                                onClick={() => { setIsLogin(true); setView('auth'); }}
                                className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-300 ${isLogin ? `${tabActive} shadow-md` : tabInactive
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => { setIsLogin(false); setView('auth'); }}
                                className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-300 ${!isLogin ? `${tabActive} shadow-md` : tabInactive
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {view === 'auth' && (
                                <motion.div
                                    key={formKey}
                                    initial={{ opacity: 0, x: isLogin ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: isLogin ? -20 : 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleGoogleAuth}
                                        disabled={loading}
                                        className={`w-full py-3.5 px-4 border-2 ${googleBtn} rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 mb-6 group disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        <Chrome className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                        Continue with Google
                                    </motion.button>

                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className={`w-full border-t ${dividerColor}`}></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className={`px-4 ${dividerText}`}>or</span>
                                        </div>
                                    </div>

                                    <form onSubmit={handleEmailAuth} className="space-y-4">
                                        <AnimatePresence mode="wait">
                                            {!isLogin && (
                                                <motion.div
                                                    key="fullname-field"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="relative pt-1"
                                                >
                                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textMuted}`} />
                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        required={!isLogin}
                                                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${inputBg}`}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="relative">
                                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textMuted}`} />
                                            <input
                                                type="email"
                                                placeholder="Email Address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className={`w-full pl-12 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${inputBg}`}
                                            />
                                        </div>

                                        <div className="relative">
                                            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textMuted}`} />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className={`w-full pl-12 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${inputBg}`}
                                            />
                                        </div>

                                        {isLogin && (
                                            <div className="flex items-center justify-between text-sm">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className={`w-4 h-4 rounded ${isDarkTheme ? 'border-slate-500 text-sky-500' : 'border-gray-300 text-blue-500'} focus:ring-blue-500`}
                                                    />
                                                    <span className={textSecondary}>Remember me</span>
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => setView('forgotPassword')}
                                                    className={`${isDarkTheme ? 'text-sky-400 hover:text-sky-300' : 'text-blue-500 hover:text-blue-600'} font-medium`}
                                                >
                                                    Forgot password?
                                                </button>
                                            </div>
                                        )}

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full py-3.5 ${buttonGradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group`}
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    {isLogin ? 'Sign In' : 'Create Account'}
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>

                                    <p className={`mt-6 text-center text-sm ${textSecondary}`}>
                                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                                        <button
                                            onClick={() => setIsLogin(!isLogin)}
                                            className={`${isDarkTheme ? 'text-sky-400 hover:text-sky-300' : 'text-blue-500 hover:text-blue-600'} font-semibold`}
                                        >
                                            {isLogin ? 'Sign up' : 'Log in'}
                                        </button>
                                    </p>
                                </motion.div>
                            )}

                            {view === 'forgotPassword' && (
                                <motion.div
                                    key="forgot"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    <h2 className={`text-2xl font-semibold ${textPrimary}`}>Reset Your Password</h2>
                                    <p className={`${textSecondary} text-sm`}>
                                        Enter your email address and we will send you a link to reset your password.
                                    </p>

                                    <form onSubmit={handlePasswordReset} className="space-y-4">
                                        <div className="relative">
                                            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${textMuted}`} />
                                            <input
                                                type="email"
                                                placeholder="Enter your registered email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className={`w-full pl-12 pr-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${inputBg}`}
                                            />
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full py-3.5 ${buttonGradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group`}
                                        >
                                            {loading ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    Send Reset Link
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>

                                    <p className="mt-6 text-center text-sm">
                                        <button
                                            type="button"
                                            onClick={() => setView('auth')}
                                            className={`${isDarkTheme ? 'text-sky-400 hover:text-sky-300' : 'text-blue-500 hover:text-blue-600'} font-medium`}
                                        >
                                            ← Back to Login
                                        </button>
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className={`text-center text-xs ${textMuted} mt-6`}
                    >
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}