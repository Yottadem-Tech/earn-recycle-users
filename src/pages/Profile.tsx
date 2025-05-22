import { BellIcon, CreditCardIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const sections = [
    {
        id: 'personal',
        title: 'Personal Information',
        icon: UserCircleIcon,
        fields: [
            { name: 'name', label: 'Full Name', type: 'text', value: 'John Doe' },
            { name: 'email', label: 'Email', type: 'email', value: 'john@example.com' },
            { name: 'phone', label: 'Phone', type: 'tel', value: '+1 234 567 8900' },
        ],
    },
    {
        id: 'notifications',
        title: 'Notifications',
        icon: BellIcon,
        settings: [
            { name: 'pickup_reminders', label: 'Pickup Reminders', enabled: true },
            { name: 'status_updates', label: 'Status Updates', enabled: true },
            { name: 'promotions', label: 'Promotions and News', enabled: false },
        ],
    },
    {
        id: 'payment',
        title: 'Payment Methods',
        icon: CreditCardIcon,
        methods: [
            { id: 1, type: 'bank', last4: '4567', primary: true },
            { id: 2, type: 'card', last4: '8901', primary: false },
        ],
    },
    {
        id: 'security',
        title: 'Security',
        icon: KeyIcon,
        options: [
            { name: 'change_password', label: 'Change Password' },
            { name: 'two_factor', label: 'Two-Factor Authentication', enabled: false },
        ],
    },
];

export default function Profile() {
    const [activeSection, setActiveSection] = useState('personal');

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Profile Settings</h1>
            <p className="mt-1 text-gray-500">Manage your account settings and preferences</p>

            <div className="mt-6 bg-white shadow-sm rounded-lg">
                <nav className="flex divide-x divide-gray-200">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex-1 px-4 py-3 text-sm font-medium ${activeSection === section.id
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <section.icon className="h-5 w-5 mx-auto" />
                            <span className="mt-1 block">{section.title}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-6">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className={activeSection === section.id ? 'block' : 'hidden'}
                        >
                            {section.fields && (
                                <div className="space-y-4">
                                    {section.fields.map((field) => (
                                        <div key={field.name}>
                                            <label className="block text-sm font-medium text-gray-700">
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                defaultValue={field.value}
                                                className="input mt-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.settings && (
                                <div className="space-y-4">
                                    {section.settings.map((setting) => (
                                        <div
                                            key={setting.name}
                                            className="flex items-center justify-between"
                                        >
                                            <span className="text-sm font-medium text-gray-700">
                                                {setting.label}
                                            </span>
                                            <button
                                                type="button"
                                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${setting.enabled ? 'bg-primary-600' : 'bg-gray-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${setting.enabled ? 'translate-x-5' : 'translate-x-0'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {section.methods && (
                                <div className="space-y-4">
                                    {section.methods.map((method) => (
                                        <div
                                            key={method.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex items-center">
                                                <CreditCardIcon className="h-5 w-5 text-gray-400" />
                                                <span className="ml-3 text-sm font-medium text-gray-900">
                                                    {method.type === 'bank' ? 'Bank Account' : 'Credit Card'}{' '}
                                                    ending in {method.last4}
                                                </span>
                                            </div>
                                            {method.primary && (
                                                <span className="text-xs text-primary-600 font-medium">
                                                    Primary
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                    <button className="btn-secondary w-full">
                                        Add Payment Method
                                    </button>
                                </div>
                            )}

                            {section.options && (
                                <div className="space-y-4">
                                    {section.options.map((option) => (
                                        <div key={option.name}>
                                            <button className="btn-secondary w-full">
                                                {option.label}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 