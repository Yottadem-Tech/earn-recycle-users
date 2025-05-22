import { Menu, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    ChevronDownIcon,
    ClockIcon,
    CogIcon,
    GlobeAltIcon,
    InformationCircleIcon,
    MapPinIcon,
    MoonIcon,
    PlusIcon,
    SunIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

// const navigation = [//     { name: 'Home', href: '/', icon: HomeIcon },//     { name: 'Recycle', href: '/recycle', icon: ArrowPathIcon },//     { name: 'History', href: '/history', icon: ClockIcon },//     { name: 'Profile', href: '/profile', icon: UserIcon },// ];

const languages = [
    { name: 'English (US)', code: 'en-US', flag: '🇺🇸', locale: 'en-US' },
    { name: 'English (UK)', code: 'en-GB', flag: '🇬🇧', locale: 'en-GB' },
    { name: 'Français', code: 'fr-FR', flag: '🇫🇷', locale: 'fr-FR' },
];

const sidebarQuickActions = [{ name: 'New Recycle Request', icon: PlusIcon, action: 'recycle', color: 'bg-green-500' }, { name: 'Find Centers', icon: MapPinIcon, action: 'centers', color: 'bg-blue-500' }, { name: 'Track Progress', icon: ChartBarIcon, action: 'progress', color: 'bg-purple-500' }, { name: 'History', icon: ClockIcon, action: 'history', color: 'bg-orange-500' },];

const recentActivity = [
    { id: 1, action: 'Recycled 5kg plastic', time: '2 hours ago', icon: '♻️' },
    { id: 2, action: 'Earned $12.50', time: '1 day ago', icon: '💰' },
    { id: 3, action: 'Visited EcoGreen Center', time: '2 days ago', icon: '📍' },
];

const environmentalImpact = {
    co2Saved: '24.5 kg',
    treesEquivalent: '2.1',
    energySaved: '156 kWh'
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Layout() {
    const location = useLocation();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [hasNotifications] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[1]); // Default to English (UK)

    const handleQuickAction = (action: string) => {
        switch (action) {
            case 'recycle':
                window.location.href = '/recycle';
                break;
            case 'centers':
                // Scroll to map section on home page or navigate
                if (location.pathname === '/') {
                    document.querySelector('[data-map-section]')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = '/#map';
                }
                break;
            case 'progress': window.location.href = '/tracking-progress'; break; case 'history': window.location.href = '/history'; break;
        }
        setSidebarOpen(false);
    };

    const handleLanguageChange = (language: typeof languages[0]) => {
        setSelectedLanguage(language);
        // You can add logic here to handle language switching, locale changes, etc.
        console.log('Language changed to:', language.name, 'Locale:', language.locale);
    };

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">EcoActions</h2>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {/* Quick Actions */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h3>
                            <div className="space-y-2">
                                {sidebarQuickActions.map((action) => (
                                    <button
                                        key={action.name}
                                        onClick={() => handleQuickAction(action.action)}
                                        className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <div className={`p-2 rounded-lg ${action.color}`}>
                                            <action.icon className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{action.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Environmental Impact */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Environmental Impact</h3>
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <GlobeAltIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">CO₂ Saved</span>
                                    </div>
                                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">{environmentalImpact.co2Saved}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-600">🌳</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Trees Equivalent</span>
                                    </div>
                                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">{environmentalImpact.treesEquivalent}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-yellow-500">⚡</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Energy Saved</span>
                                    </div>
                                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">{environmentalImpact.energySaved}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Recent Activity</h3>
                            <div className="space-y-3">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                        <span className="text-lg">{activity.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {activity.action}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recycling Tips */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Today's Tip</h3>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                <div className="flex items-start space-x-2">
                                    <InformationCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                            Clean containers before recycling
                                        </p>
                                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                            Remove food residue to prevent contamination and improve recycling quality.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Links</h3>
                            <div className="space-y-1">
                                <Link to="/schedule" className="flex items-center space-x-2 p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>Schedule Pickup</span>
                                </Link>
                                <Link to="/centers" className="flex items-center space-x-2 p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                    <MapPinIcon className="h-4 w-4" />
                                    <span>Recycling Centers</span>
                                </Link>
                                <Link to="/settings" className="flex items-center space-x-2 p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                                    <CogIcon className="h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:ml-0">
                {/* Simplified Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            {/* Left side - Sidebar Toggle */}
                            <div className="flex items-center">
                                {/* Sidebar Toggle */}
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Bars3Icon className="h-6 w-6 lg:h-5 lg:w-5" />
                                </button>
                            </div>

                            {/* Right side - Utilities */}
                            <div className="flex items-center space-x-3">
                                {/* Language Selector */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="flex items-center space-x-2 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <span className="text-lg">{selectedLanguage.flag}</span>
                                        <ChevronDownIcon className="h-4 w-4" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {languages.map((language) => (
                                                <Menu.Item key={language.code}>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => handleLanguageChange(language)}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                                selectedLanguage.code === language.code ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200',
                                                                'flex items-center space-x-3 w-full px-4 py-2 text-sm text-left'
                                                            )}
                                                        >
                                                            <span className="text-lg">{language.flag}</span>
                                                            <span>{language.name}</span>
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                {/* Quick Action Button */}
                                <Link
                                    to="/recycle"
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="h-4 w-4 mr-1" />
                                    Recycle
                                </Link>

                                {/* Theme Toggle */}
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {isDarkMode ? (
                                        <SunIcon className="h-5 w-5" />
                                    ) : (
                                        <MoonIcon className="h-5 w-5" />
                                    )}
                                </button>

                                {/* Notifications */}
                                <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors">
                                    <BellIcon className="h-5 w-5" />
                                    {hasNotifications && (
                                        <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400" />
                                    )}
                                </button>

                                {/* User Menu */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt="User avatar"
                                        />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/profile"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                        )}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/settings"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                            'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                        )}
                                                    >
                                                        Settings
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={classNames(
                                                            active ? 'bg-gray-100 dark:bg-gray-700' : '',
                                                            'block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                                                        )}
                                                        onClick={() => {
                                                            // TODO: Implement logout
                                                            console.log('Logout clicked');
                                                        }}
                                                    >
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </main>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
} 