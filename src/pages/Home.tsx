import { ArrowPathIcon, ChevronDownIcon, CurrencyDollarIcon, MapPinIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const stats = [
    { name: 'Total Earnings', value: '$120.50', icon: CurrencyDollarIcon },
    { name: 'Recycled Items', value: '24', icon: ArrowPathIcon },
    { name: 'Total Weight', value: '48.5 kg', icon: ScaleIcon },
];

const timeFilters = ['Today', 'Yesterday', 'Last 7d', 'Last 30 d', 'Last 6m', 'All time'];

const recyclingCompanies = [
    {
        id: 1,
        name: 'EcoGreen Recycling',
        location: 'Brooklyn, NY',
        rating: 4.8,
        materials: ['Plastic', 'Glass', 'Metal'],
        pricePerKg: '$0.5',
        image: '🌱'
    },
    {
        id: 2,
        name: 'Clean Earth Solutions',
        location: 'Queens, NY',
        rating: 4.6,
        materials: ['Paper', 'Cardboard', 'Electronics'],
        pricePerKg: '$0.3',
        image: '🌍'
    },
    {
        id: 3,
        name: 'GreenCycle Corp',
        location: 'Manhattan, NY',
        rating: 4.7,
        materials: ['Plastic', 'Metal', 'Batteries'],
        pricePerKg: '$0.4',
        image: '♻️'
    },
    {
        id: 4,
        name: 'Zero Waste Hub',
        location: 'Staten Island, NY',
        rating: 4.5,
        materials: ['Organic', 'Textiles', 'Glass'],
        pricePerKg: '$0.6',
        image: '🗂️'
    }
];

export default function Home() {
    const [selectedTimeFilter, setSelectedTimeFilter] = useState('Today');
    const [selectedLocation] = useState('62 East 35th Street, Murray Hill, New York, NY 10016, United States');
    const [locationAccordionOpen, setLocationAccordionOpen] = useState(true);

    return (
        <div className="space-y-6">
            {/* Activity Period & Statistics Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">                    <h2 className="text-xl font-semibold text-gray-900">Activity Period</h2>                    <div className="text-sm text-gray-500 flex items-center">                        📅 {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}                    </div>                </div>

                {/* Time Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {timeFilters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedTimeFilter(filter)}
                            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedTimeFilter === filter
                                ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Statistics for Selected Period */}
                <div className="border-t border-gray-100 pt-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.name}
                                className="bg-gray-50 px-4 py-5 rounded-lg overflow-hidden"
                            >
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <stat.icon className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-500 truncate">
                                            {stat.name}
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Location Accordion */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden" data-map-section>
                {/* Accordion Header */}
                <div className="p-6 border-b border-gray-100">
                    <button
                        onClick={() => setLocationAccordionOpen(!locationAccordionOpen)}
                        className="w-full flex items-center justify-between text-left hover:bg-gray-50 -m-2 p-2 rounded-lg transition-colors"
                    >
                        <h2 className="text-xl font-semibold text-gray-900">Location</h2>
                        <ChevronDownIcon
                            className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${locationAccordionOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                        />
                    </button>
                </div>

                {/* Accordion Content */}
                <div className={`transition-all duration-300 ease-in-out ${locationAccordionOpen ? 'max-h-96 lg:max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}>
                    <div className="p-6 pt-4">
                        {/* Location Selector */}
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg mb-4">
                            <MapPinIcon className="h-5 w-5 text-primary-600 mr-2" />
                            <span className="text-sm text-gray-700 flex-1">{selectedLocation}</span>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-48 sm:h-64 lg:h-80 xl:h-96 px-6 pb-3">
                        <div className="h-full w-full overflow-hidden rounded-lg">
                            <MapContainer
                                center={[40.7505, -73.9934]}
                                zoom={12}
                                className="h-full w-full"
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {/* Multiple markers for different companies */}
                                <Marker position={[40.7505, -73.9934]}>
                                    <Popup>EcoGreen Recycling<br />Brooklyn, NY</Popup>
                                </Marker>
                                <Marker position={[40.7282, -73.7949]}>
                                    <Popup>Clean Earth Solutions<br />Queens, NY</Popup>
                                </Marker>
                                <Marker position={[40.7831, -73.9712]}>
                                    <Popup>GreenCycle Corp<br />Manhattan, NY</Popup>
                                </Marker>
                                <Marker position={[40.5795, -74.1502]}>
                                    <Popup>Zero Waste Hub<br />Staten Island, NY</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Recycling Companies List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Top Recycling Companies</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Company Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Materials Accepted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price per kg
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rating
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recyclingCompanies.map((company) => (
                                <tr key={company.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-lg">
                                                    {company.image}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {company.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {company.location}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {company.materials.map((material, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                                                >
                                                    {material}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {company.pricePerKg}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium text-gray-900">
                                                {company.rating}
                                            </span>
                                            <span className="ml-1 text-yellow-400">★</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                        <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors">
                                            Book
                                        </button>
                                        <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors">
                                            Contact
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 