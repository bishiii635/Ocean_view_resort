import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    CalendarDays, 
    Search, 
    Check, 
    X, 
    Eye, 
    FileText, 
    Printer, 
    Mail, 
    User, 
    BedDouble, 
    Clock, 
    CreditCard,
    AlertCircle,
    Loader2,
    Trash2
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const ReservationManagement = () => {
    const [reservations, setReservations] = useState([]);
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [viewingReservation, setViewingReservation] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    const [viewingInvoice, setViewingInvoice] = useState(null);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [resRes, usersRes, roomsRes] = await Promise.all([
                axios.get('http://localhost:8080/api/reservations'),
                axios.get('http://localhost:8080/api/users'),
                axios.get('http://localhost:8080/api/rooms')
            ]);
            setReservations(resRes.data);
            setUsers(usersRes.data);
            setRooms(roomsRes.data);
        } catch (err) {
            console.error('Error fetching data', err);
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:8080/api/reservations/${id}/status?status=${status}`);
            setSuccess(`Reservation ${status.toLowerCase()} successfully.`);
            fetchData();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(`Failed to update reservation status.`);
        }
    };

    const handleViewDetails = (reservation) => {
        const guestData = users.find(u => u.id === reservation.guestId);
        const roomData = rooms.find(r => r.id === reservation.roomId);
        setViewingReservation({ ...reservation, guest: guestData, room: roomData });
        setIsViewModalOpen(true);
    };

    const handleViewInvoice = async (reservationId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/invoices/reservation/${reservationId}`);
            setViewingInvoice(response.data);
            setIsInvoiceModalOpen(true);
        } catch (err) {
            setError('Invoice not found. Make sure the reservation is approved.');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleDeleteReservation = async (id) => {
        if (window.confirm('Are you sure you want to delete this reservation?')) {
            try {
                await axios.delete(`http://localhost:8080/api/reservations/${id}`);
                setSuccess('Reservation deleted successfully.');
                fetchData();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to delete reservation.');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'REJECTED': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'COMPLETED': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const filteredReservations = reservations.filter(res => {
        const guest = users.find(u => u.id === res.guestId);
        return guest?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               res.id.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <div className={`flex-1 mr-64 print:mr-0 ${isInvoiceModalOpen ? 'print:hidden' : ''}`}>
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm print:hidden">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <CalendarDays className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Reservation Management</h1>
                    </div>
                </header>

                <main className="p-8 print:p-0">
                    {success && (
                        <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-xl flex items-center gap-3 border border-emerald-100 animate-in fade-in slide-in-from-top-2 print:hidden">
                            <Check className="w-5 h-5" />
                            <span className="font-medium">{success}</span>
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-xl flex items-center gap-3 border border-rose-100 animate-in fade-in slide-in-from-top-2 print:hidden">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search by Guest Name or ID..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/50 border-b border-slate-100 print:bg-white">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guest</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Check In/Out</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right print:hidden">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-4" />
                                                <p className="text-slate-500 font-medium tracking-wide">Fetching reservations...</p>
                                            </td>
                                        </tr>
                                    ) : filteredReservations.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                                No reservations found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredReservations.map((res) => {
                                            const guest = users.find(u => u.id === res.guestId);
                                            return (
                                                <tr key={res.id} className="hover:bg-slate-50 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                                                                {guest?.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-800">{guest?.name}</p>
                                                                <p className="text-xs text-slate-400 font-mono">#{res.id.substring(0, 8)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                                {new Date(res.checkIn).toLocaleDateString()}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                                                {new Date(res.checkOut).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-bold text-slate-800">LKR {res.totalCost?.toLocaleString()}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-center">
                                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${getStatusColor(res.status)}`}>
                                                                {res.status}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right print:hidden">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => handleViewDetails(res)}
                                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                                title="View Details"
                                                            >
                                                                <Eye className="w-5 h-5" />
                                                            </button>
                                                            {res.status === 'PENDING' && (
                                                                <>
                                                                    <button 
                                                                        onClick={() => handleUpdateStatus(res.id, 'APPROVED')}
                                                                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                                        title="Accept"
                                                                    >
                                                                        <Check className="w-5 h-5" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleUpdateStatus(res.id, 'REJECTED')}
                                                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                                        title="Reject"
                                                                    >
                                                                        <X className="w-5 h-5" />
                                                                    </button>
                                                                </>
                                                            )}
                                                            {(res.status === 'APPROVED' || res.status === 'COMPLETED') && (
                                                                <button 
                                                                    onClick={() => handleViewInvoice(res.id)}
                                                                    className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                                                                    title="View Invoice"
                                                                >
                                                                    <FileText className="w-5 h-5" />
                                                                </button>
                                                            )}
                                                            <button 
                                                                onClick={() => handleDeleteReservation(res.id)}
                                                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                                title="Delete Reservation"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            <AdminSidebar />

            {/* View Details Modal */}
            {isViewModalOpen && viewingReservation && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 print:hidden">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)}></div>
                    <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-blue-100 text-blue-600 rounded-2xl shadow-sm">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">Reservation Timeline</h2>
                                    <p className="text-xs text-slate-400 font-medium">#{viewingReservation.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8 overflow-y-auto flex-1">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" /> Guest Information
                                    </h3>
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                        <p className="text-lg font-bold text-slate-800">{viewingReservation.guest?.name}</p>
                                        <p className="text-sm text-slate-500 font-medium mb-3">{viewingReservation.guest?.email}</p>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400">MEMBER</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <BedDouble className="w-3.5 h-3.5" /> Room Assignment
                                    </h3>
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                        <p className="text-lg font-bold text-slate-800">{viewingReservation.room?.name || 'Assigned Room'}</p>
                                        <p className="text-sm text-slate-500 font-medium mb-3">Capacity: {viewingReservation.room?.capacity || 2} Persons</p>
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-400 uppercase">
                                                {viewingReservation.room?.status || 'Active'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white shadow-xl shadow-slate-200">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Valuation</p>
                                        <p className="text-3xl font-black">LKR {viewingReservation.totalCost?.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stay Duration</p>
                                        <p className="text-xl font-bold">{viewingReservation.totalNights || '---'} Nights</p>
                                    </div>
                                </div>
                                <div className="h-px bg-slate-700/50 mb-6"></div>
                                <div className="flex justify-between items-center gap-12">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-full">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Check-In</p>
                                            <p className="text-sm font-bold">{new Date(viewingReservation.checkIn).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 border-b-2 border-dashed border-slate-700 mb-5 relative">
                                        <CalendarDays className="absolute left-1/2 -top-3 w-6 h-6 text-slate-600 -translate-x-1/2" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Check-Out</p>
                                            <p className="text-sm font-bold">{new Date(viewingReservation.checkOut).toLocaleDateString()}</p>
                                        </div>
                                        <div className="p-2 bg-rose-500/20 text-rose-400 rounded-full">
                                            <AlertCircle className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {viewingReservation.notes && (
                                <div className="space-y-3">
                                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <FileText className="w-3.5 h-3.5" /> Special Requests
                                    </h3>
                                    <div className="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 border-dashed text-slate-600 text-sm leading-relaxed italic">
                                        "{viewingReservation.notes}"
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <button 
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-3xl font-bold hover:bg-slate-200 transition-all"
                                >
                                    Dismiss
                                </button>
                                {viewingReservation.status === 'PENDING' && (
                                    <button 
                                        onClick={() => { handleUpdateStatus(viewingReservation.id, 'APPROVED'); setIsViewModalOpen(false); }}
                                        className="flex-1 py-4 bg-emerald-600 text-white rounded-3xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                                    >
                                        Approve Now
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Invoice Modal */}
            {isInvoiceModalOpen && viewingInvoice && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 print:relative print:p-0 print:block print:z-0">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md print:hidden" onClick={() => setIsInvoiceModalOpen(false)}></div>
                    <div className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl relative animate-in fade-in slide-in-from-bottom-8 duration-500 overflow-y-auto max-h-[95vh] flex flex-col p-8 print:p-0 print:shadow-none print:rounded-none print:max-h-none print:overflow-visible print:w-full">
                        <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8 print:border-slate-800">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 mb-2">INVOICE</h2>
                                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">OCEAN VIEW RESORT MANAGEMENT</p>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <div className="p-3 bg-slate-900 text-white rounded-2xl mb-4 print:hidden">
                                    <CreditCard className="w-8 h-8" />
                                </div>
                                <p className="text-slate-900 font-black text-xl">#{viewingInvoice.id}</p>
                                <p className="text-slate-400 text-xs font-bold uppercase">{new Date(viewingInvoice.invoiceDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-12 mb-12">
                            <div className="space-y-2">
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Billed To</h3>
                                <p className="text-2xl font-black text-slate-900">{viewingInvoice.guestName}</p>
                                <p className="text-slate-500 font-medium">#{viewingInvoice.guestId}</p>
                            </div>
                            <div className="text-right space-y-2">
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payment Status</h3>
                                <div className="flex justify-end">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                                        viewingInvoice.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                                    }`}>
                                        {viewingInvoice.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden rounded-[2rem] border border-slate-100 mb-12">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Description</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Details</th>
                                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-slate-800">{viewingInvoice.roomName}</p>
                                            <p className="text-xs text-slate-400 mt-1">Full stay duration charge</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className="text-sm font-bold text-slate-600">RESERVATION #{viewingInvoice.reservationId.substring(0, 10)}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className="text-lg font-black text-slate-800">LKR {viewingInvoice.totalPrice?.toLocaleString()}</p>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="bg-slate-900 text-white">
                                        <td colSpan="2" className="px-8 py-6 text-right">
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-60">Total Amount Due</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <p className="text-2xl font-black">LKR {viewingInvoice.totalPrice?.toLocaleString()}</p>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="flex gap-4 print:hidden">
                            <button 
                                onClick={() => setIsInvoiceModalOpen(false)}
                                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-3xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                            >
                                <X className="w-5 h-5" /> Close
                            </button>
                            <button 
                                onClick={handlePrint}
                                className="flex-1 py-4 bg-blue-600 text-white rounded-3xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                            >
                                <Printer className="w-5 h-5" /> Print Invoice
                            </button>
                            <button 
                                className="flex-1 py-4 bg-slate-900 text-white rounded-3xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                onClick={() => alert('Feature coming soon: Email copy to guest')}
                            >
                                <Mail className="w-5 h-5" /> Email Guest
                            </button>
                        </div>
                        
                        <div className="hidden print:block text-center text-[10px] text-slate-400 font-medium pb-8">
                            This is a computer generated invoice. No signature required. 
                            <br/>
                            © 2026 Ocean View Resort. All rights reserved.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationManagement;
