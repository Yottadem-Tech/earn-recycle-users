import {
    ArrowDownTrayIcon,
    CheckCircleIcon,
    ClockIcon,
    EllipsisHorizontalIcon,
    ExclamationTriangleIcon,
    FunnelIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

// Mock data - enhanced for better tracking
const allRequests = [
    {
        id: 'RCY-2024-001',
        requestName: 'Plastic Bottles Collection',
        category: 'Plastic',
        status: 'completed',
        submitted: '2024-03-15T08:30:00',
        collected: '2024-03-15T14:45:00',
        duration: '6 hours 15 minutes',
        weight: '5.2 kg',
        earnings: '$2.60',
        location: '123 Green Street, Brooklyn',
        recyclingCenter: 'EcoGreen Recycling',
    },
    {
        id: 'RCY-2024-002',
        requestName: 'Mixed Paper & Cardboard',
        category: 'Paper & Cardboard',
        status: 'processing',
        submitted: '2024-03-14T09:15:00',
        collected: '2024-03-14T16:20:00',
        duration: '7 hours 5 minutes',
        weight: '8.7 kg',
        earnings: '$4.35',
        location: '456 Eco Avenue, Manhattan',
        recyclingCenter: 'GreenCycle Corp',
    },
    {
        id: 'RCY-2024-003',
        requestName: 'Electronic Waste Pickup',
        category: 'Electronics',
        status: 'failed',
        submitted: '2024-03-13T10:00:00',
        collected: null,
        duration: 'N/A',
        weight: '0 kg',
        earnings: '$0.00',
        location: '789 Recycle Road, Queens',
        recyclingCenter: 'TechRecycle Solutions',
        failureReason: 'Items not prepared properly',
    },
    {
        id: 'RCY-2024-004',
        requestName: 'Glass Containers',
        category: 'Glass',
        status: 'completed',
        submitted: '2024-03-12T07:45:00',
        collected: '2024-03-12T13:30:00',
        duration: '5 hours 45 minutes',
        weight: '4.2 kg',
        earnings: '$1.05',
        location: '321 Sustainability St, Bronx',
        recyclingCenter: 'Crystal Clear Recycling',
    },
    {
        id: 'RCY-2024-005',
        requestName: 'Metal Cans & Aluminum',
        category: 'Metal',
        status: 'pending',
        submitted: '2024-03-11T11:20:00',
        collected: null,
        duration: 'Pending collection',
        weight: 'Est. 6.8 kg',
        earnings: 'Est. $6.80',
        location: '654 Green Ave, Staten Island',
        recyclingCenter: 'MetalWorks Recycling',
    },
    {
        id: 'RCY-2024-006',
        requestName: 'Organic Composting',
        category: 'Organic',
        status: 'completed',
        submitted: '2024-03-10T06:30:00',
        collected: '2024-03-10T12:15:00',
        duration: '5 hours 45 minutes',
        weight: '12.3 kg',
        earnings: '$3.69',
        location: '987 Compost Lane, Brooklyn',
        recyclingCenter: 'Green Earth Composting',
    },
    {
        id: 'RCY-2024-007',
        requestName: 'Textile & Clothing',
        category: 'Textiles',
        status: 'processing',
        submitted: '2024-03-09T14:00:00',
        collected: '2024-03-09T18:30:00',
        duration: '4 hours 30 minutes',
        weight: '3.1 kg',
        earnings: '$1.55',
        location: '147 Fashion St, Manhattan',
        recyclingCenter: 'Textile Renewal Co',
    },
];

const ITEMS_PER_PAGE = 3;

const STATUS_OPTIONS = [
    { value: 'all', label: 'All Status', count: allRequests.length },
    { value: 'completed', label: 'Completed', count: allRequests.filter(r => r.status === 'completed').length },
    { value: 'processing', label: 'Processing', count: allRequests.filter(r => r.status === 'processing').length },
    { value: 'pending', label: 'Pending', count: allRequests.filter(r => r.status === 'pending').length },
    { value: 'failed', label: 'Failed', count: allRequests.filter(r => r.status === 'failed').length },
] as const;

type StatusType = 'completed' | 'processing' | 'pending' | 'failed';

const getStatusConfig = (status: StatusType) => {
    switch (status) {
        case 'completed':
            return { icon: CheckCircleIcon, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' };
        case 'processing':
            return { icon: ClockIcon, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Processing' };
        case 'pending':
            return { icon: ClockIcon, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Pending' };
        case 'failed':
            return { icon: ExclamationTriangleIcon, color: 'text-red-600', bg: 'bg-red-100', label: 'Failed' };
        default:
            return { icon: ClockIcon, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Unknown' };
    }
};

const formatDateTime = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
};

export default function History() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<'all' | StatusType>('all');
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Filter requests based on search term and status
    const filteredRequests = allRequests.filter(request => {
        const matchesSearch =
            request.requestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === 'all' || request.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedRequests = filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const handleExport = () => {
        // TODO: Implement export functionality
        console.log('Exporting recycling history...');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">History</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Track your recycling requests and environmental impact
                    </p>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center gap-3">
                    {/* Filters Button */}
                    <button
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <FunnelIcon className="h-4 w-4" />
                        Filters
                    </button>

                    {/* Status Filter Pills */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        {statusFilter !== 'all' && (
                            <span className="text-xs">
                                {STATUS_OPTIONS.find(s => s.value === statusFilter)?.count} items
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 sm:w-80">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Status Filter Tabs */}
            {filtersOpen && (
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {STATUS_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setStatusFilter(option.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === option.value
                                ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                                }`}
                        >
                            {option.label} ({option.count})
                        </button>
                    ))}
                </div>
            )}

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Request
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Submitted
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Collected
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Duration
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Impact
                                </th>
                                <th className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {paginatedRequests.map((request) => {
                                const statusConfig = getStatusConfig(request.status as StatusType);
                                return (
                                    <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {request.requestName}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {request.id}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {request.category} • {request.recyclingCenter}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                                                <statusConfig.icon className="h-3 w-3 mr-1" />
                                                {statusConfig.label}
                                            </div>
                                            {request.status === 'failed' && request.failureReason && (
                                                <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                                                    {request.failureReason}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            <div>{formatDateTime(request.submitted)}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {getTimeAgo(request.submitted)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            <div>{formatDateTime(request.collected)}</div>
                                            {request.collected && (
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {getTimeAgo(request.collected)}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {request.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {request.weight}
                                            </div>
                                            <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                                {request.earnings}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <EllipsisHorizontalIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredRequests.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📋</div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">No requests found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first recycling request'}
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}            {totalPages > 1 && (<div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6 rounded-lg">                    {/* Mobile Pagination */}                    <div className="flex flex-1 justify-between sm:hidden">                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"                        >                            Previous                        </button>                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">                            Page {currentPage} of {totalPages}                        </span>                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"                        >                            Next                        </button>                    </div>                                        {/* Desktop Pagination */}                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">                        <div>                            <p className="text-sm text-gray-700 dark:text-gray-300">                                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}                                <span className="font-medium">                                    {Math.min(startIndex + ITEMS_PER_PAGE, filteredRequests.length)}                                </span>{' '}                                of <span className="font-medium">{filteredRequests.length}</span> results                            </p>                        </div>                        <div>                            <nav className="flex items-center space-x-2" aria-label="Pagination">                                {/* Previous Button - Circle */}                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"                                >                                    <span className="sr-only">Previous</span>                                    ‹                                </button>                                                                {/* Page Number Buttons - Circles */}                                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => { let pageNum; if (totalPages <= 7) { pageNum = i + 1; } else if (currentPage <= 4) { pageNum = i + 1; } else if (currentPage >= totalPages - 3) { pageNum = totalPages - 6 + i; } else { pageNum = currentPage - 3 + i; } return (<button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`relative inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full ${currentPage === pageNum ? 'bg-primary-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600' : 'text-gray-900 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0'}`}                                        >                                            {pageNum}                                        </button>); })}                                                                {/* Next Button - Circle */}                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="relative inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"                                >                                    <span className="sr-only">Next</span>                                    ›                                </button>                            </nav>                        </div>                    </div>                </div>)}                        {/* Show info when there's only one page */}            {totalPages === 1 && filteredRequests.length > 0 && (<div className="text-center py-2">                    <p className="text-sm text-gray-500 dark:text-gray-400">                        Showing all {filteredRequests.length} results                    </p>                </div>)}
        </div>
    );
} 