import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import MinimalBG from './MinimalBG';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isIconVisible, setIsIconVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Handle password visibility toggle
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, message } = response.data;

            const decoded = jwtDecode(token);
            console.log("Logged in as:", decoded.role);
            localStorage.setItem("token", token);
            toast.success(message || "Login successful!");
            if (decoded.role === "admin") {
                window.location.href = "/admin/dashboard";
            } else {
                navigate("/home");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
                setError(error.response.data.error);
            } else {
                toast.error("Account not verified.Please check your email or verify OTP.");
                setError("Account not verified.Please check your email or verify OTP.");
            }
        }
    };

    const handlePasswordBlur = () => {
        setTimeout(() => {
            if (!isHovered) setIsIconVisible(false);
        }, 100);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden font-inter dark:bg-gray-900">
            {/* <MinimalBG /> */}
            
            {/* Decorative background elements */}
            {/* <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-green-100 opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            </div> */}

            {/* Login Form Container */}
            <div className="relative z-10 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
                <div className="rounded-2xl bg-white/80 backdrop-blur-lg p-8 shadow-2xl border border-white/20 md:p-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-blue-500 shadow-lg">
                            <FaUser className="text-2xl text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-gray-600 text-sm">Please sign in to your account</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input Field */}
                        <div className="group">
                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-green-600">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaUser className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your.email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-3 pl-10 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none hover:border-gray-300"
                                />
                            </div>
                        </div>

                        {/* Password Input Field with Toggle */}
                        <div className="group">
                            <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700 transition-colors group-focus-within:text-green-600">
                                Password
                            </label>
                            <div
                                className="relative"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => {
                                    setIsHovered(false);
                                    if (document.activeElement.id !== 'password') {
                                        setIsIconVisible(false);
                                    }
                                }}
                            >
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaLock className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setIsIconVisible(e.target.value !== '');
                                    }}
                                    onFocus={() => {
                                        if (password !== '') setIsIconVisible(true);
                                    }}
                                    onBlur={handlePasswordBlur}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-3 pl-10 pr-12 text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:outline-none hover:border-gray-300"
                                />
                                {isIconVisible && (
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4 pt-6">
                            <button
                                type="submit"
                                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3.5 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 active:scale-[0.98]"
                            >
                                <span className="relative z-10">Sign In</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 text-lg font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:scale-[0.98]"
                            >
                                Return to Home
                            </button>
                        </div>
                    </form>

                    {/* Error Message Display */}
                    {error && (
                        <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-3">
                            <p className="text-center text-sm font-medium text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link 
                                to="/signup" 
                                className="font-semibold text-green-600 hover:text-green-700 hover:underline transition-colors duration-200"
                            >
                                Create one here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                toastClassName="rounded-xl shadow-xl border border-white/20"
                bodyClassName="text-sm font-medium"
            />
        </div>
    );
};

export default Login;
