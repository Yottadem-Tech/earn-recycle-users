import { EnvelopeIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';
import { useTheme } from '../../contexts/ThemeContext';

export default function SignUp() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });
    const { isDarkMode } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement signup logic
        console.log(formData);
    };

    const handleSocialSignUp = (provider: string) => {
        // TODO: Implement social signup logic
        console.log(`Sign up with ${provider}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <ParticlesBackground isDark={isDarkMode} />
            <div className="max-w-md w-full space-y-8 relative z-10">
                <div>
                    <Link to="/" className="flex justify-center">
                        <img className="h-12 w-auto" src="https://cdn-icons-png.flaticon.com/512/1165/1165572.png" alt="EarnRecycle" />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link
                            to="/auth/login"
                            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                    {/* Social Login Buttons */}
                    <div className="mb-6">
                        <div className="flex space-x-4 justify-center">
                            <button
                                onClick={() => handleSocialSignUp('Google')}
                                className="flex items-center justify-center w-12 h-12 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </button>

                            <button
                                onClick={() => handleSocialSignUp('Apple')}
                                className="flex items-center justify-center w-12 h-12 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                            </button>

                            <button
                                onClick={() => handleSocialSignUp('Facebook')}
                                className="flex items-center justify-center w-12 h-12 border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with email</span>
                        </div>
                    </div>

                    {/* Email/Password Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="fullName" className="sr-only">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="input pl-10"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input pl-10"
                                        placeholder="Email address"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="input pl-10"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="input pl-10"
                                        placeholder="Confirm Password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="acceptTerms"
                                name="acceptTerms"
                                type="checkbox"
                                required
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="acceptTerms"
                                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                            >
                                I agree to the{' '}
                                <Link
                                    to="/terms"
                                    className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                                >
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link
                                    to="/privacy"
                                    className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                                >
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <div>
                            <button type="submit" className="btn-primary w-full">
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 