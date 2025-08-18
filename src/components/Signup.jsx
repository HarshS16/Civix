import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden font-inter dark:bg-gray-900">
            {/* Signup Form Container */}
                <div className="rounded-2xl bg-white/80 backdrop-blur-lg p-8 shadow-2xl border border-white/20 md:p-10">
                    {/* Clerk Sign Up Component */}
                    <SignUp
                        routing="hash"
                        redirectUrl="/home"
                    />

                    {/* Footer Links */}
                    <div className="text-center pt-6 space-y-3">
                        <Link
                            to="/"
                            className="inline-block text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                        >
                            ← Back to Home
                        </Link>
                    </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
                className="!mt-16"
            />
        </div>
    );
};

export default Signup;
