import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    CalendarDays, Search, Check, X, Eye, FileText, Printer, Mail, User, BedDouble, 
    Clock, CreditCard, AlertCircle, Loader2, Trash2, Crown, Gem, Sparkles, Anchor, MapPin, Compass
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

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
            setError('Registry synchronization failure.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:8080/api/reservations/${id}/status?status=${status}`);
            setSuccess(`Decree ${status.toLowerCase()} finalized.`);
            fetchData();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(`Status update failed for decree.`);
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
            setError('Statement not found. Ensure decree is validated.');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleDeleteReservation = async (id) => {
        if (window.confirm('Are you certain you wish to rescind this imperial decree?')) {
            try {
                await axios.delete(`http://localhost:8080/api/reservations/${id}`);
                setSuccess('Decree rescinded successfully.');
                fetchData();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to rescind decree.');
                setTimeout(() => setError(''), 3000);
            }
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'REJECTED': return 'bg-rose-50 text-rose-700 border-rose-100';
            case 'PENDING': return 'bg-[#5D4037]/5 text-[#5D4037] border-[#5D4037]/20';
            case 'COMPLETED': return 'bg-blue-50 text-blue-700 border-blue-100';
            default: return 'bg-[#FAF9F6] text-[#8D6E63] border-[#E8E2D6]';
        }
    };

    const filteredReservations = reservations.filter(res => {
        const guest = users.find(u => u.id === res.guestId);
        return guest?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               res.id.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <div className={`pt-40 pb-20 px-6 container mx-auto print:pt-0 ${isInvoiceModalOpen ? 'print:hidden' : ''}`}>
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 print:hidden">
                    <div className="flex items-center gap-6">
                        <div className="p-5 bg-[#2C1D1A] text-[#C5A059] shadow-2xl">
                            <CalendarDays className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2C1D1A] italic tracking-tight">Imperial Decrees</h1>
                            <p className="text-[#8D6E63] text-[10px] font-bold uppercase tracking-[0.4em]">Official schedule of the estate stays</p>
                        </div>
                    </div>
                </div>

                <main className="print:p-0">
                    {success && (
                        <div className="mb-10 p-6 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 print:hidden">
                            <Check className="w-5 h-5" />
                            <span>{success}</span>
                        </div>
                    )}
                    {error && (
                        <div className="mb-10 p-6 bg-rose-50 border border-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 animate-in fade-in slide-in-from-top-4 print:hidden">
                            <AlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="bg-white border border-[#E8E2D6] shadow-2xl overflow-hidden print:border-none print:shadow-none">
                        <div className="p-10 border-b border-[#FAF9F6] bg-[#FAF9F6]/50 flex flex-col md:flex-row md:items-center justify-between gap-8 print:hidden">
                            <div className="relative flex-1 max-w-xl">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                                <input 
                                    type="text" 
                                    placeholder="Search decrees by Noble Name or Cipher..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-14 pr-8 py-4 bg-white border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                                />
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.2em]">
                                <Sparkles className="w-4 h-4 text-[#C5A059] opacity-50" />
                                <span>Observing {filteredReservations.length} Active Decrees</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#2C1D1A] text-[#C5A059] print:bg-white print:text-black">
                                    <tr>
                                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Noble Citizen</th>
                                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Era of Stay</th>
                                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Prosperity</th>
                                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-center">Protocol</th>
                                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-right print:hidden">Decrees</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E8E2D6]">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="px-10 py-32 text-center">
                                                <Loader2 className="w-16 h-16 animate-spin text-[#C5A059] mx-auto mb-6" />
                                                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] italic animate-pulse">Syncing with Imperial Timeline...</p>
                                            </td>
                                        </tr>
                                    ) : filteredReservations.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-10 py-32 text-center">
                                                <div className="bg-[#FAF9F6] w-24 h-24 flex items-center justify-center mx-auto mb-8 border border-[#E8E2D6]">
                                                    <Compass className="w-10 h-10 text-[#E8E2D6]" />
                                                </div>
                                                <p className="text-[#8D6E63] font-serif italic text-xl">No decrees found in current era archives.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredReservations.map((res) => {
                                            const guest = users.find(u => u.id === res.guestId);
                                            return (
                                                <tr key={res.id} className="hover:bg-[#FAF9F6] transition-all duration-500 group">
                                                    <td className="px-10 py-8">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-14 h-14 bg-[#5D4037] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center font-serif font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">
                                                                {guest?.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="font-serif font-bold text-[#2C1D1A] text-xl italic opacity-90">{guest?.name}</p>
                                                                <p className="text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.2em] font-mono mt-1">#RE-{res.id.substring(0, 8)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex items-center gap-3 text-sm font-bold text-[#2C1D1A] italic">
                                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></span>
                                                                {new Date(res.checkIn).toLocaleDateString()}
                                                            </div>
                                                            <div className="flex items-center gap-3 text-sm font-bold text-[#8D6E63] italic">
                                                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-200"></span>
                                                                {new Date(res.checkOut).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8 text-lg font-serif font-black text-[#5D4037] italic">
                                                        LKR {res.totalCost?.toLocaleString()}
                                                    </td>
                                                    <td className="px-10 py-8 text-center">
                                                        <span className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] border shadow-sm ${getStatusColor(res.status)}`}>
                                                            {res.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-8 text-right print:hidden">
                                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                                            <button 
                                                                onClick={() => handleViewDetails(res)}
                                                                className="p-3 text-[#C5A059] border border-[#C5A059]/20 hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all duration-500"
                                                                title="Observe Details"
                                                            >
                                                                <Eye className="w-5 h-5" />
                                                            </button>
                                                            {res.status === 'PENDING' && (
                                                                <>
                                                                    <button 
                                                                        onClick={() => handleUpdateStatus(res.id, 'APPROVED')}
                                                                        className="p-3 text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all duration-500"
                                                                        title="Grant Access"
                                                                    >
                                                                        <Check className="w-5 h-5" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleUpdateStatus(res.id, 'REJECTED')}
                                                                        className="p-3 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all duration-500"
                                                                        title="Deny Access"
                                                                    >
                                                                        <X className="w-5 h-5" />
                                                                    </button>
                                                                </>
                                                            )}
                                                            {(res.status === 'APPROVED' || res.status === 'COMPLETED') && (
                                                                <button 
                                                                    onClick={() => handleViewInvoice(res.id)}
                                                                    className="p-3 text-amber-600 border border-amber-100 hover:bg-amber-600 hover:text-white transition-all duration-500"
                                                                    title="Observe Statement"
                                                                >
                                                                    <FileText className="w-5 h-5" />
                                                                </button>
                                                            )}
                                                            <button 
                                                                onClick={() => handleDeleteReservation(res.id)}
                                                                className="p-3 text-rose-400 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all duration-500"
                                                                title="Expunge Decree"
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

            <Footer />

            {/* View Details Modal */}
            {isViewModalOpen && viewingReservation && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 print:hidden">
                    <div className="absolute inset-0 bg-[#2C1D1A]/80 backdrop-blur-md" onClick={() => setIsViewModalOpen(false)}></div>
                    <div className="bg-white border border-[#E8E2D6] w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-500 flex flex-col max-h-[90vh] overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#C5A059]/20 translate-x-4 -translate-y-4"></div>
                        
                        <div className="p-10 border-b border-[#FAF9F6] flex justify-between items-center bg-[#FAF9F6]/50">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-[#2C1D1A] text-[#C5A059] shadow-2xl">
                                    <Clock className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-serif font-black text-[#2C1D1A] italic">Decree Particulars</h2>
                                    <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-[0.3em] font-mono mt-1">#RE-{viewingReservation.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-3 text-[#8D6E63] hover:text-[#2C1D1A] transition-all">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="p-12 space-y-10 overflow-y-auto flex-1 scrollbar-hide">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] flex items-center gap-3">
                                        <User className="w-4 h-4 text-[#C5A059]" /> Noble Citizen
                                    </h3>
                                    <div className="bg-[#FAF9F6] p-8 border border-[#E8E2D6] group hover:border-[#C5A059] transition-all duration-500">
                                        <p className="text-2xl font-serif font-bold text-[#2C1D1A] italic">{viewingReservation.guest?.name}</p>
                                        <p className="text-sm text-[#8D6E63] font-medium italic mb-5">{viewingReservation.guest?.email}</p>
                                        <div className="flex gap-2">
                                            <span className="px-4 py-1.5 border border-[#C5A059]/30 text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.2em] italic bg-white shadow-sm">Royal Member</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] flex items-center gap-3">
                                        <BedDouble className="w-4 h-4 text-[#C5A059]" /> Assigned Sanctuary
                                    </h3>
                                    <div className="bg-[#FAF9F6] p-8 border border-[#E8E2D6] group hover:border-[#C5A059] transition-all duration-500">
                                        <p className="text-2xl font-serif font-bold text-[#2C1D1A] italic">{viewingReservation.room?.name || 'Grand Sanctuary'}</p>
                                        <p className="text-sm text-[#8D6E63] font-medium italic mb-5">Capacity: {viewingReservation.room?.capacity || 2} Distinguished Persons</p>
                                        <div className="flex gap-2">
                                            <span className="px-4 py-1.5 border border-[#C5A059]/30 text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.2em] italic bg-white shadow-sm">
                                                {viewingReservation.room?.status || 'Active Registry'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-12 bg-[#2C1D1A] text-white shadow-2xl relative group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/10 to-transparent"></div>
                                <div className="flex justify-between items-center mb-10 relative z-10">
                                    <div className="space-y-2">
                                        <p className="text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.4em]">Total Prosperty</p>
                                        <p className="text-4xl font-serif font-black italic tracking-tighter">LKR {viewingReservation.totalCost?.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <p className="text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.4em]">Era Span</p>
                                        <p className="text-2xl font-serif font-black italic opacity-90">{viewingReservation.totalNights || '---'} Nights</p>
                                    </div>
                                </div>
                                <div className="h-px bg-white/10 mb-10 relative z-10"></div>
                                <div className="flex justify-between items-center gap-10 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white/5 border border-white/10 text-[#C5A059]">
                                            <Anchor className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Check-In Era</p>
                                            <p className="text-lg font-serif font-bold italic">{new Date(viewingReservation.checkIn).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 border-b border-dashed border-white/10 mb-5 relative">
                                        <Compass className="absolute left-1/2 -top-4 w-8 h-8 text-[#C5A059]/30 -translate-x-1/2" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">Check-Out Era</p>
                                            <p className="text-lg font-serif font-bold italic">{new Date(viewingReservation.checkOut).toLocaleDateString()}</p>
                                        </div>
                                        <div className="p-3 bg-white/5 border border-white/10 text-rose-400">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {viewingReservation.notes && (
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-[#C5A059]" /> Special Protocols
                                    </h3>
                                    <div className="bg-[#FAF9F6] p-8 border border-[#E8E2D6] text-[#2C1D1A] text-lg font-medium italic leading-relaxed shadow-inner">
                                        "{viewingReservation.notes}"
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-6 pt-6 relative z-10">
                                <button 
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="flex-1 py-5 bg-[#FAF9F6] text-[#8D6E63] border border-[#E8E2D6] font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-sm"
                                >
                                    Dismiss Consult
                                </button>
                                {viewingReservation.status === 'PENDING' && (
                                    <button 
                                        onClick={() => { handleUpdateStatus(viewingReservation.id, 'APPROVED'); setIsViewModalOpen(false); }}
                                        className="flex-1 py-5 bg-[#5D4037] text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl"
                                    >
                                        Grant Royal Approval
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
                    <div className="absolute inset-0 bg-[#2C1D1A]/90 backdrop-blur-md print:hidden" onClick={() => setIsInvoiceModalOpen(false)}></div>
                    <div className="bg-white border border-[#E8E2D6] w-full max-w-4xl shadow-2xl relative animate-in fade-in slide-in-from-bottom-8 duration-700 overflow-y-auto max-h-[95vh] flex flex-col p-16 print:p-0 print:shadow-none print:rounded-none print:max-h-none print:overflow-visible print:w-full print:border-none">
                         <div className="absolute top-0 right-0 w-48 h-48 border-r-2 border-t-2 border-[#C5A059]/10 translate-x-3 -translate-y-3 print:hidden"></div>
                        
                        <div className="flex justify-between items-start mb-20 border-b border-[#FAF9F6] pb-12 print:border-black/10">
                            <div>
                                <h2 className="text-6xl font-serif font-black text-[#2C1D1A] mb-4 italic italic tracking-tighter">IMPERIAL <span className="text-[#C5A059]">STATEMENT</span></h2>
                                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.5em] text-[10px]">OCEAN VIEW ESTATE RECORDS OFFICE</p>
                            </div>
                            <div className="text-right flex flex-col items-end">
                                <div className="p-4 bg-[#2C1D1A] text-[#C5A059] mb-6 shadow-2xl print:hidden">
                                    <Crown className="w-10 h-10" />
                                </div>
                                <p className="text-[#2C1D1A] font-serif font-black text-2xl italic tracking-tight">#{viewingInvoice.id}</p>
                                <p className="text-[#8D6E63] text-[9px] font-bold uppercase tracking-[0.3em] mt-2">{new Date(viewingInvoice.invoiceDate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.4em]">Respective Citizen</h3>
                                <p className="text-3xl font-serif font-black text-[#2C1D1A] italic">{viewingInvoice.guestName}</p>
                                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.2em] text-[11px] opacity-60">ID: HS-{viewingInvoice.guestId.substring(0, 8)}</p>
                            </div>
                            <div className="text-right space-y-6">
                                <h3 className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.4em]">Prosperity Protocol</h3>
                                <div className="flex justify-end">
                                    <span className={`px-6 py-2 border text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                                        viewingInvoice.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                    }`}>
                                        {viewingInvoice.paymentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden border border-[#E8E2D6] mb-20 shadow-xl">
                            <table className="w-full text-left">
                                <thead className="bg-[#2C1D1A] text-[#C5A059]">
                                    <tr>
                                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Imperial Service</th>
                                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-right">Decree Reference</th>
                                        <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-right">Prosperity Impact</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E8E2D6]">
                                    <tr className="bg-white">
                                        <td className="px-10 py-10">
                                            <p className="font-serif font-bold text-[#2C1D1A] text-2xl italic">{viewingInvoice.roomName}</p>
                                            <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-[0.2em] mt-2">Noble Sanctuary Residency</p>
                                        </td>
                                        <td className="px-10 py-10 text-right">
                                            <p className="text-[11px] font-black text-[#8D6E63] uppercase tracking-[0.1em]">DECREE: #{viewingInvoice.reservationId.substring(0, 12)}</p>
                                        </td>
                                        <td className="px-10 py-10 text-right">
                                            <p className="text-2xl font-serif font-black text-[#2C1D1A] italic">LKR {viewingInvoice.totalPrice?.toLocaleString()}</p>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr className="bg-[#FAF9F6] border-t-2 border-[#E8E2D6]">
                                        <td colSpan="2" className="px-10 py-8 text-right">
                                            <p className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.4em]">Final Treasury Valuation</p>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <p className="text-4xl font-serif font-black text-[#5D4037] italic">LKR {viewingInvoice.totalPrice?.toLocaleString()}</p>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="flex flex-wrap gap-6 print:hidden">
                            <button 
                                onClick={() => setIsInvoiceModalOpen(false)}
                                className="flex-1 py-6 bg-[#FAF9F6] text-[#8D6E63] border border-[#E8E2D6] font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-sm flex items-center justify-center gap-4"
                            >
                                <X className="w-5 h-5" /> Rescind View
                            </button>
                            <button 
                                onClick={handlePrint}
                                className="flex-1 py-6 bg-[#5D4037] text-white font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4"
                            >
                                <Printer className="w-5 h-5" /> Produce Hard Copy
                            </button>
                            <button 
                                className="flex-1 py-6 bg-[#2C1D1A] text-[#C5A059] font-bold text-[10px] uppercase tracking-[0.3em] border border-[#C5A059]/20 hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all duration-500 flex items-center justify-center gap-4"
                                onClick={() => alert('Sending electronic missive copy to noble guest...')}
                            >
                                <Mail className="w-5 h-5" /> Dispatch Missive
                            </button>
                        </div>
                        
                        <div className="hidden print:block text-center text-[9px] text-[#8D6E63] font-bold uppercase tracking-[0.3em] pt-12">
                            This chronicle is computer-verified by the Imperial Records Office. No ink-seal is required. 
                            <br/>
                            © 2026 OCEAN VIEW ESTATE. ALL NOBLE RIGHTS RESERVED.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationManagement;
