import { CameraIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

const categories = [
    { id: 'paper', name: 'Paper & Cardboard', price: '0.50/kg', icon: '📄' },
    { id: 'plastic', name: 'Plastic', price: '0.75/kg', icon: '🥤' },
    { id: 'metal', name: 'Metal', price: '1.00/kg', icon: '🥫' },
    { id: 'glass', name: 'Glass', price: '0.25/kg', icon: '🍶' },
    { id: 'electronics', name: 'Electronics', price: 'Variable', icon: '💻' },
];

function LocationPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    const MapEvents = () => {
        useMapEvents({
            click(e) {
                onLocationSelect(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} className="h-64 w-full rounded-lg">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents />
        </MapContainer>
    );
}

export default function RecycleRequest() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [weight, setWeight] = useState('');
    const [location, setLocation] = useState<[number, number] | null>(null);
    const [images, setImages] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission
        console.log({
            category: selectedCategory,
            weight,
            location,
            images,
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">New Recycling Request</h1>
            <p className="mt-1 text-gray-500">Fill in the details below to schedule a pickup</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
                    <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => setSelectedCategory(category.id)}
                                className={`p-4 rounded-lg flex flex-col items-center text-center transition-all
                                    ${selectedCategory === category.id
                                        ? 'border-2 border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                                        : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span className="text-2xl mb-2">{category.icon}</span>
                                <span className="text-sm font-medium">{category.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{category.price}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Estimated Weight (kg)
                    </label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="input mt-1"
                        placeholder="Enter weight in kg"
                        required
                        min="0.1"
                        step="0.1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Pickup Location
                    </label>
                    <div className="mt-1">
                        <LocationPicker
                            onLocationSelect={(lat, lng) => setLocation([lat, lng])}
                        />
                    </div>
                    {location && (
                        <p className="mt-2 text-sm text-gray-500">
                            Selected: {location[0].toFixed(6)}, {location[1].toFixed(6)}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Photos
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                            <CameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                    <span>Upload files</span>
                                    <input
                                        type="file"
                                        className="sr-only"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setImages(Array.from(e.target.files));
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                    Submit Request
                </button>
            </form>
        </div>
    );
} 