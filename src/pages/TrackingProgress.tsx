import { CheckCircleIcon, MagnifyingGlassIcon, TruckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

const trackingStatuses = ['On the way', 'Collected', 'Processed'];

const trackingItems = [
    {
        id: 1,
        route: 'Brooklyn → Manhattan',
        orderId: 'RCY-14398-98567',
        status: 'In Transit',
        statusType: 'progress',
        pickup: {
            address: '456 Elm Street, Brooklyn, NY 11201, USA',
            time: '10:30 AM'
        },
        destination: {
            address: 'EcoGreen Recycling Center, Manhattan, NY 10001, USA',
            time: 'Expected: 2:30 PM'
        },
        driver: {
            name: 'Sarah Johnson',
            role: 'Pickup Driver',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b671b4c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        items: ['5kg Plastic bottles', '3kg Glass containers', '2kg Aluminum cans'],
        coordinates: { pickup: [40.6892, -73.9442] as [number, number], destination: [40.7505, -73.9934] as [number, number], current: [40.7200, -73.9700] as [number, number] }
    },
    {
        id: 2,
        route: 'Queens → Staten Island',
        orderId: 'RCY-14398-98568',
        status: 'On Pickup',
        statusType: 'active',
        pickup: {
            address: '789 Oak Avenue, Queens, NY 11375, USA',
            time: '11:45 AM'
        },
        destination: {
            address: 'Zero Waste Hub, Staten Island, NY 10301, USA',
            time: 'Expected: 3:15 PM'
        },
        driver: {
            name: 'Michael Chen',
            role: 'Pickup Driver',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        items: ['8kg Paper waste', '4kg Cardboard', '1kg Electronics'],
        coordinates: { pickup: [40.7282, -73.7949] as [number, number], destination: [40.5795, -74.1502] as [number, number], current: [40.7282, -73.7949] as [number, number] }
    },
    {
        id: 3,
        route: 'Bronx → Brooklyn',
        orderId: 'RCY-14398-98569',
        status: 'Processed',
        statusType: 'completed',
        pickup: {
            address: '321 Pine Street, Bronx, NY 10451, USA',
            time: '9:15 AM'
        },
        destination: {
            address: 'Clean Earth Solutions, Brooklyn, NY 11201, USA',
            time: 'Completed: 12:30 PM'
        },
        driver: {
            name: 'David Williams',
            role: 'Pickup Driver',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        items: ['6kg Mixed plastics', '2kg Metal cans'],
        coordinates: { pickup: [40.8176, -73.9282] as [number, number], destination: [40.6892, -73.9442] as [number, number], current: [40.6892, -73.9442] as [number, number] }
    }
];

export default function TrackingProgress() {
    const [activeStatusFilter, setActiveStatusFilter] = useState('On the way');
    const [selectedTracking, setSelectedTracking] = useState(trackingItems[0]);
    const [searchQuery, setSearchQuery] = useState('');

    const getStatusBadgeColor = (statusType: string) => {
        switch (statusType) {
            case 'progress':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'completed':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const filteredItems = trackingItems.filter(item => {
        const matchesStatus = activeStatusFilter === 'On the way' ? item.statusType !== 'completed' :
            activeStatusFilter === 'Collected' ? item.statusType === 'completed' :
                true;
        const matchesSearch = item.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.orderId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Panel - Tracking List */}
                    <div className="lg:w-96 space-y-4">
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-semibold text-gray-900">Pickup Tracking</h1>
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>

                            {/* Search Bar */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search by route or order ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                />
                                <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>

                            {/* Status Filters */}
                            <div className="flex space-x-1 mb-4">
                                {trackingStatuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setActiveStatusFilter(status)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${activeStatusFilter === status
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tracking Items List */}
                        <div className="space-y-3">
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedTracking(item)}
                                    className={`bg-white rounded-xl shadow-sm p-4 cursor-pointer transition-all border-2 ${selectedTracking.id === item.id
                                        ? 'border-primary-500 ring-2 ring-primary-100'
                                        : 'border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-medium text-gray-900">{item.route}</h3>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeColor(item.statusType)}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2">Order ID {item.orderId}</p>

                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={item.driver.avatar}
                                            alt={item.driver.name}
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.driver.name}</p>
                                            <p className="text-xs text-gray-500">{item.driver.role}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                                                <TruckIcon className="h-4 w-4" />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel - Map and Details */}
                    <div className="flex-1 space-y-6">
                        {/* Map */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="h-80 lg:h-96">
                                <MapContainer
                                    center={selectedTracking.coordinates.current}
                                    zoom={11}
                                    className="h-full w-full"
                                    key={selectedTracking.id}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    {/* Route line */}
                                    <Polyline
                                        positions={[selectedTracking.coordinates.pickup, selectedTracking.coordinates.destination]}
                                        color="#3B82F6"
                                        weight={3}
                                        opacity={0.8}
                                    />

                                    {/* Pickup marker */}
                                    <Marker position={selectedTracking.coordinates.pickup}>
                                        <Popup>
                                            <div className="text-sm">
                                                <p className="font-medium">Pickup Location</p>
                                                <p>{selectedTracking.pickup.address}</p>
                                                <p className="text-gray-500">{selectedTracking.pickup.time}</p>
                                            </div>
                                        </Popup>
                                    </Marker>

                                    {/* Destination marker */}
                                    <Marker position={selectedTracking.coordinates.destination}>
                                        <Popup>
                                            <div className="text-sm">
                                                <p className="font-medium">Recycling Center</p>
                                                <p>{selectedTracking.destination.address}</p>
                                                <p className="text-gray-500">{selectedTracking.destination.time}</p>
                                            </div>
                                        </Popup>
                                    </Marker>

                                    {/* Current location marker */}
                                    {selectedTracking.statusType !== 'completed' && (
                                        <Marker position={selectedTracking.coordinates.current}>
                                            <Popup>
                                                <div className="text-sm">
                                                    <p className="font-medium">Current Location</p>
                                                    <p>Driver: {selectedTracking.driver.name}</p>
                                                    <p className="text-gray-500">Status: {selectedTracking.status}</p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )}
                                </MapContainer>
                            </div>
                        </div>

                        {/* Detailed Tracking Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Order ID {selectedTracking.orderId}</h2>
                                    <p className="text-gray-500">{selectedTracking.route}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusBadgeColor(selectedTracking.statusType)}`}>
                                    {selectedTracking.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                {/* Pickup Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <h3 className="font-medium text-gray-900">Pickup From</h3>
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-sm text-gray-900">{selectedTracking.pickup.address}</p>
                                        <p className="text-sm text-gray-500">{selectedTracking.pickup.time}</p>
                                    </div>
                                </div>

                                {/* Destination Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <h3 className="font-medium text-gray-900">Deliver To</h3>
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-sm text-gray-900">{selectedTracking.destination.address}</p>
                                        <p className="text-sm text-gray-500">{selectedTracking.destination.time}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="font-medium text-gray-900 mb-3">Items for Recycling</h3>
                                <div className="space-y-2">
                                    {selectedTracking.items.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* QR Code Section */}
                            <div className="border-t border-gray-100 pt-6 mt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Track in Mobile App</h3>
                                        <p className="text-sm text-gray-500">Scan QR code for real-time updates</p>
                                    </div>
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <div className="w-12 h-12 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 