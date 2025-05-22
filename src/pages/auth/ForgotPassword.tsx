import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';
import { useTheme } from '../../contexts/ThemeContext';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { isDarkMode } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement password reset logic
        console.log({ email });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <ParticlesBackground isDark={isDarkMode} />
                <div className="max-w-md w-full space-y-8 relative z-10">
                    <div>
                        <Link to="/" className="flex justify-center">
                            <img className="h-12 w-auto" src="/logo.svg" alt="EarnRecycle" />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                            Check your email
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                            We've sent a password reset link to {email}
                        </p>
                    </div>
                    <div className="mt-8 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                        <Link
                            to="/auth/login"
                            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                            Return to sign in
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <ParticlesBackground isDark={isDarkMode} />
            <div className="max-w-md w-full space-y-8 relative z-10">
                <div>
                    <Link to="/" className="flex justify-center">
                        <img className="h-12 w-auto" src="/logo.svg" alt="EarnRecycle" />
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form className="mt-8 space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input pl-10"
                                placeholder="Email address"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="btn-primary w-full">
                            Send reset link
                        </button>
                    </div>

                    <div className="text-center">
                        <Link
                            to="/auth/login"
                            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                            Back to sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
} 