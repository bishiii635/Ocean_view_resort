import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    User, Mail, Calendar, LogOut, MapPin, Phone, Shield, 
    Edit2, Clock, CreditCard, CheckCircle2, AlertCircle, 
    Loader2, FileText, Download, Printer, X, Eye, Star, BedDouble,
    Crown, Gem, Compass, Sparkles, Anchor
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
    const { user, loading: authLoading, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [reservations, setReservations] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal states
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [viewingInvoice, setViewingInvoice] = useState(null);
    
    const [paymentData, setPaymentData] = useState({
        cardHolder: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }
        if (user) {
            fetchUserData();
        }
    }, [user, authLoading, navigate]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const [resRes, roomsRes] = await Promise.all([
                axios.get('http://localhost:8080/api/reservations'),
                axios.get('http://localhost:8080/api/rooms')
            ]);
            
            // Filter reservations for current user
            const userReservations = resRes.data.filter(r => r.guestId === user.id);
            setReservations(userReservations);
            setRooms(roomsRes.data);
        } catch (err) {
            console.error('Error fetching user data', err);
        } finally {
            setLoading(false);
        }
    };

    const getRoomName = (roomId) => rooms.find(r => r.id === roomId)?.name || 'Heritage Sanctuary';

    const handlePayNow = (reservation) => {
        setSelectedReservation(reservation);
        setIsPaymentModalOpen(true);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setPaymentStatus('processing');
        
        try {
            // Update status in backend
            await axios.put(`http://localhost:8080/api/reservations/${selectedReservation.id}/payment-status?status=PAID`);
            
            setPaymentStatus('success');
            setTimeout(() => {
                setIsPaymentModalOpen(false);
                setPaymentStatus('idle');
                setPaymentData({ cardHolder: '', cardNumber: '', expiry: '', cvv: '' });
                fetchUserData();
            }, 2000);
        } catch (err) {
            console.error('Payment failed', err);
            setPaymentStatus('idle');
            alert('Financial transaction failed. Please consult your bank.');
        }
    };

    const handleViewInvoice = async (reservationId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/invoices/reservation/${reservationId}`);
            setViewingInvoice(response.data);
            setIsInvoiceModalOpen(true);
        } catch (err) {
            console.error('Invoice not found', err);
            alert('Registry records for this stay are being archived. Please try again later.');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (authLoading || (loading && !reservations.length)) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
            <Loader2 className="w-12 h-12 text-[#C5A059] animate-spin" />
        </div>
    );

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans">
            <Header />
            
            <main className="pt-48 pb-32 px-6 lg:px-12 max-w-7xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white border border-[#E8E2D6] shadow-2xl overflow-hidden mb-16 relative">
                    <div className="h-64 bg-[#2C1D1A] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551882547-ff43c636a224?auto=format&fit=crop&q=80')] opacity-10 grayscale"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 border border-[#C5A059]/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <div className="px-12 pb-12">
                        <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-24 mb-12 text-center md:text-left gap-10">
                            <div className="w-48 h-48 bg-white p-3 shadow-2xl relative border border-[#E8E2D6]">
                                <div className="w-full h-full bg-[#FAF9F6] border border-[#C5A059]/30 flex items-center justify-center text-6xl font-serif font-black text-[#5D4037]">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#C5A059] text-[#2C1D1A] flex items-center justify-center shadow-xl">
                                    <Crown className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="inline-flex items-center gap-2 text-[#C5A059] font-bold text-[9px] tracking-[0.4em] uppercase">
                                    <Sparkles className="w-3 h-3" /> Distinguished Guest
                                </div>
                                <h1 className="text-5xl font-serif font-black text-[#2C1D1A] tracking-tighter">{user.name}</h1>
                                <div className="flex flex-col md:flex-row items-center gap-6 text-[#8D6E63] font-bold text-[10px] tracking-[0.2em] uppercase">
                                    <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#C5A059]" /> {user.email}</span>
                                    <span className="flex items-center gap-2"><Anchor className="w-4 h-4 text-[#C5A059]" /> Noble Citizen</span>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <button 
                                    onClick={logout}
                                    className="flex items-center gap-3 px-10 py-5 bg-[#5D4037] text-white hover:bg-[#2C1D1A] transition-all duration-500 font-bold text-[10px] tracking-[0.3em] uppercase shadow-xl"
                                >
                                    <LogOut className="w-4 h-4" /> Depart Estate
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-[#E8E2D6]">
                            {['Overview', 'My Bookings'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`px-12 py-6 text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative ${
                                        activeTab === tab.toLowerCase()
                                            ? 'text-[#2C1D1A] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#C5A059]'
                                            : 'text-[#8D6E63] hover:text-[#2C1D1A]'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Sidebar Info */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="bg-white border border-[#E8E2D6] shadow-xl p-12 relative group overflow-hidden">
                             <div className="absolute top-0 right-0 w-24 h-24 bg-[#FAF9F6] border-b border-l border-[#E8E2D6] -translate-y-12 translate-x-12 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700"></div>
                            <h3 className="text-xl font-serif font-bold text-[#2C1D1A] mb-10 flex items-center gap-4">
                                <Shield className="w-5 h-5 text-[#C5A059]" /> Account Status
                            </h3>
                            <div className="space-y-10 font-bold">
                                <div className="space-y-4">
                                    <p className="text-[9px] text-[#8D6E63] uppercase tracking-[0.4em]">Heritage Rank</p>
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-[#FAF9F6] border border-[#E8E2D6] flex items-center justify-center text-[#C5A059]">
                                            <Star className="w-7 h-7 fill-[#C5A059]" />
                                        </div>
                                        <div>
                                            <p className="text-[#2C1D1A] text-lg font-serif">Gold Member</p>
                                            <p className="text-[10px] text-[#C5A059] uppercase tracking-widest mt-1">Royal Perks Active</p>
                                        </div>
                                    </div>
                                </div>
                           
                                <div className="space-y-4 pt-10 border-t border-[#E8E2D6]">
                                    <p className="text-[9px] text-[#8D6E63] uppercase tracking-[0.4em]">Sanctuary Statistics</p>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-6 bg-[#FAF9F6] border border-[#E8E2D6]">
                                            <p className="text-3xl font-serif font-black text-[#2C1D1A] mb-1">{reservations.filter(r => r.status === 'COMPLETED').length}</p>
                                            <p className="text-[8px] text-[#8D6E63] uppercase tracking-widest leading-tight">Archived Stays</p>
                                        </div>
                                        <div className="p-6 bg-[#FAF9F6] border border-[#E8E2D6]">
                                            <p className="text-3xl font-serif font-black text-[#2C1D1A] mb-1">{reservations.filter(r => r.status === 'APPROVED').length}</p>
                                            <p className="text-[8px] text-[#8D6E63] uppercase tracking-widest leading-tight">Pending Arrivals</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {activeTab === 'overview' && (
                            <div className="space-y-12 animate-in fade-in duration-700">
                                <div className="bg-white border border-[#E8E2D6] shadow-xl p-12">
                                    <div className="flex items-center justify-between mb-12 border-b border-[#E8E2D6] pb-8">
                                        <h3 className="text-3xl font-serif font-bold text-[#2C1D1A] flex items-center gap-4">
                                            <Calendar className="w-7 h-7 text-[#C5A059]" /> Scheduled Sanctuaries
                                        </h3>
                                        <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.4em]">{reservations.filter(r => r.status !== 'REJECTED' && r.status !== 'COMPLETED').length} Registries</span>
                                    </div>
                                    
                                    <div className="space-y-8">
                                        {reservations.filter(r => r.status !== 'REJECTED' && r.status !== 'COMPLETED').length > 0 ? (
                                            reservations.filter(r => r.status !== 'REJECTED' && r.status !== 'COMPLETED').map(res => (
                                                <div key={res.id} className="p-10 bg-[#FAF9F6] border border-[#E8E2D6] flex flex-col md:flex-row md:items-center justify-between gap-10 hover:border-[#C5A059] transition-all duration-500 group relative">
                                                    <div className="absolute top-0 right-0 w-2 h-0 bg-[#C5A059] group-hover:h-full transition-all duration-700"></div>
                                                    <div className="flex items-start gap-8">
                                                        <div className="w-20 h-20 bg-white border border-[#E8E2D6] flex items-center justify-center text-[#C5A059] shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                            <BedDouble className="w-10 h-10" />
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-3">
                                                                <Gem className="w-3 h-3 text-[#C5A059]" />
                                                                <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.3em] font-serif italic">{getRoomName(res.roomId)}</p>
                                                            </div>
                                                            <h4 className="text-2xl font-serif font-black text-[#2C1D1A] tracking-tight">{new Date(res.checkIn).toLocaleDateString()} &mdash; {new Date(res.checkOut).toLocaleDateString()}</h4>
                                                            <div className="flex gap-6 mt-2">
                                                                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${
                                                                    res.status === 'APPROVED' ? 'text-emerald-600' : 'text-[#C5A059]'
                                                                }`}>
                                                                    <div className={`w-2 h-2 rounded-full ${res.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-[#C5A059]'}`}></div>
                                                                    {res.status}
                                                                </span>
                                                                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${
                                                                    res.paymentStatus === 'PAID' ? 'text-emerald-600' : 'text-rose-600'
                                                                }`}>
                                                                    <div className={`w-2 h-2 rounded-full ${res.paymentStatus === 'PAID' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                                                    Payment {res.paymentStatus}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        {res.paymentStatus === 'UNPAID' && res.status === 'APPROVED' && (
                                                            <button 
                                                                onClick={() => handlePayNow(res)}
                                                                className="px-10 py-5 bg-[#2C1D1A] text-white font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-500 shadow-2xl"
                                                            >
                                                                Initiate Payment
                                                            </button>
                                                        )}
                                                        {res.paymentStatus === 'PAID' && (
                                                            <button 
                                                                onClick={() => handleViewInvoice(res.id)}
                                                                className="w-16 h-16 bg-white border border-[#E8E2D6] text-[#2C1D1A] hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-500 flex items-center justify-center shadow-sm"
                                                            >
                                                                <FileText className="w-6 h-6" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-24 bg-[#FAF9F6] border-2 border-dashed border-[#E8E2D6] px-10">
                                                <div className="w-20 h-20 bg-white border border-[#E8E2D6] flex items-center justify-center mx-auto mb-8 shadow-sm text-[#C5A059]">
                                                    <Compass className="w-10 h-10" />
                                                </div>
                                                <h4 className="text-3xl font-serif font-bold text-[#2C1D1A] mb-4">No Sanctuaries Reserved</h4>
                                                <p className="text-[#8D6E63] font-medium italic mb-10 max-w-sm mx-auto">The southern coast awaits your arrival. Your noble journey has yet to be chronicled.</p>
                                                <button onClick={() => navigate('/rooms')} className="px-12 py-6 bg-[#2C1D1A] text-white font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all duration-700 shadow-2xl underline-offset-8">Explore Sanctuaries</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'my bookings' && (
                             <div className="bg-white border border-[#E8E2D6] shadow-xl p-12">
                                 <h3 className="text-3xl font-serif font-bold text-[#2C1D1A] mb-12 border-b border-[#E8E2D6] pb-8">Stay Chronicles</h3>
                                 <div className="grid grid-cols-1 gap-8">
                                     {reservations.length > 0 ? (
                                         reservations.map(res => (
                                            <div key={res.id} className="p-10 border border-[#E8E2D6] bg-[#FAF9F6] hover:border-[#C5A059] transition-all duration-500 flex justify-between items-center group relative overflow-hidden">
                                                <div className="flex gap-8">
                                                    <div className="w-16 h-16 bg-[#2C1D1A] text-[#C5A059] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                                                        <MapPin className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-serif font-bold text-2xl text-[#2C1D1A] tracking-tight">{getRoomName(res.roomId)}</h4>
                                                        <p className="text-xs text-[#8D6E63] font-bold tracking-widest uppercase mt-1 italic">{new Date(res.checkIn).toLocaleDateString()} stay</p>
                                                        <p className="text-[9px] font-bold uppercase text-[#C5A059] tracking-[0.4em] mt-3">Registry ID: #{res.id.slice(-6).toUpperCase()}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right space-y-2">
                                                    <p className="text-2xl font-serif font-black text-[#5D4037]">LKR {res.totalCost?.toLocaleString()}</p>
                                                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border ${res.status === 'COMPLETED' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-[#8D6E63] border-[#E8E2D6]'}`}>
                                                        {res.status}
                                                    </span>
                                                </div>
                                            </div>
                                         ))
                                     ) : (
                                         <p className="text-center text-[#8D6E63] py-24 font-bold uppercase tracking-[0.3em] italic border-2 border-dashed border-[#E8E2D6]">History is vacant.</p>
                                     )}
                                 </div>
                             </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-[#2C1D1A]/80 backdrop-blur-md" onClick={() => setIsPaymentModalOpen(false)}></div>
                    <div className="bg-white w-full max-w-lg shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-500 border border-[#C5A059]/20">
                        <div className="p-12 overflow-y-auto">
                            <div className="flex justify-between items-center mb-12 border-b border-[#E8E2D6] pb-8">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-[#C5A059] text-[#2C1D1A]">
                                        <CreditCard className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-serif font-bold text-[#2C1D1A] tracking-tight">Royal Settlement</h3>
                                        <p className="text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.3em] mt-2">Registry Inscription #{selectedReservation?.id.slice(-6).toUpperCase()}</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsPaymentModalOpen(false)} className="p-3 hover:bg-[#FAF9F6] transition-colors border border-transparent hover:border-[#E8E2D6]">
                                    <X className="w-7 h-7 text-[#8D6E63]" />
                                </button>
                            </div>

                            {paymentStatus === 'success' ? (
                                <div className="text-center py-16 animate-in fade-in zoom-in duration-700">
                                    <div className="w-24 h-24 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 className="w-12 h-12" />
                                    </div>
                                    <h4 className="text-3xl font-serif font-black text-[#2C1D1A] mb-4">Transaction Sealed</h4>
                                    <p className="text-[#8D6E63] font-medium italic">The treasury has confirmed your stay. Your sanctuary is fully secured.</p>
                                </div>
                            ) : (
                                <form onSubmit={handlePaymentSubmit} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.4em] ml-1">Account Holder Designation</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={paymentData.cardHolder}
                                            onChange={(e) => setPaymentData({...paymentData, cardHolder: e.target.value})}
                                            className="w-full px-8 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                                            placeholder="DISTINGUISHED NAME"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.4em] ml-1">Financier Card Sequence</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A059]" />
                                            <input 
                                                type="text" 
                                                required
                                                maxLength="19"
                                                value={paymentData.cardNumber}
                                                onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()})}
                                                className="w-full pl-16 pr-6 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] outline-none font-black text-[#2C1D1A] font-mono tracking-widest text-lg"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.4em] ml-1">Continuity Date</label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                value={paymentData.expiry}
                                                onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                                                className="w-full px-8 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.4em] ml-1">Secret Cipher (CVV)</label>
                                            <input 
                                                type="password" 
                                                required
                                                maxLength="3"
                                                value={paymentData.cvv}
                                                onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                                                className="w-full px-8 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                                                placeholder="***"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="p-10 bg-[#FAF9F6] border border-[#C5A059]/20 flex justify-between items-center text-center">
                                        <div className="space-y-2">
                                             <span className="font-bold text-[#8D6E63] text-[9px] uppercase tracking-[0.4em] block">Registry Worth</span>
                                             <span className="text-3xl font-serif font-black text-[#5D4037]">LKR {selectedReservation?.totalCost?.toLocaleString()}</span>
                                        </div>
                                        <Gem className="w-10 h-10 text-[#C5A059] opacity-20" />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={paymentStatus === 'processing'}
                                        className="w-full py-6 bg-[#2C1D1A] text-white font-bold text-[11px] uppercase tracking-[0.5em] hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
                                    >
                                        {paymentStatus === 'processing' ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>
                                                Seal Transaction
                                                <CreditCard className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Invoice Modal */}
            {isInvoiceModalOpen && viewingInvoice && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-[#2C1D1A]/80 backdrop-blur-md" onClick={() => setIsInvoiceModalOpen(false)}></div>
                    <div className="bg-white w-full max-w-5xl shadow-2xl relative z-10 flex flex-col max-h-[95vh] overflow-hidden animate-in zoom-in-95 duration-500 border-t-8 border-[#C5A059]">
                        <div className="p-12 print:p-0 overflow-y-auto">
                            {/* Toolbar */}
                            <div className="flex justify-between items-center mb-16 print:hidden border-b border-[#E8E2D6] pb-8">
                                <div className="flex items-center gap-4">
                                     <FileText className="w-6 h-6 text-[#C5A059]" />
                                     <h3 className="text-2xl font-serif font-bold text-[#2C1D1A]">Historical Record</h3>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={handlePrint} className="flex items-center gap-3 px-8 py-3 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-[#E8E2D6] transition-all">
                                        <Printer className="w-4 h-4" /> Print Record
                                    </button>
                                    <button onClick={handlePrint} className="flex items-center gap-3 px-8 py-3 bg-[#5D4037] text-white font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-[#2C1D1A] transition-all shadow-xl">
                                        <Download className="w-4 h-4" /> Archive PDF
                                    </button>
                                    <button onClick={() => setIsInvoiceModalOpen(false)} className="w-12 h-12 hover:bg-[#FAF9F6] flex items-center justify-center transition-colors ml-4 border border-[#E8E2D6]">
                                        <X className="w-6 h-6 text-[#8D6E63]" />
                                    </button>
                                </div>
                            </div>

                            {/* Actual Invoice Content */}
                            <div id="printable-invoice" className="bg-white p-16 border border-[#E8E2D6] shadow-sm print:border-none print:shadow-none font-serif">
                                <div className="flex flex-col md:flex-row justify-between gap-16 mb-24 items-start">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                             <div className="p-2 border-2 border-[#C5A059]">
                                                <Crown className="text-[#C5A059] w-10 h-10" />
                                             </div>
                                            <h2 className="text-4xl font-black text-[#2C1D1A] tracking-tighter uppercase">Ocean<span className="text-[#C5A059]">View</span></h2>
                                        </div>
                                        <div className="text-[10px] text-[#8D6E63] font-sans font-black uppercase tracking-[0.4em] leading-loose max-w-xs">
                                            123, Ancient Ivory Path, Galle<br/>
                                            Southern Province, Sri Lanka<br/>
                                            Imperial Registry: #SL9928374
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <h1 className="text-6xl font-black text-[#FAF9F6] uppercase tracking-[0.2em] mb-6 stroke-text select-none" style={{WebkitTextStroke: '2px #E8E2D6'}}>Statement</h1>
                                        <div className="text-sm font-sans font-bold text-[#2C1D1A] space-y-1">
                                            <p className="tracking-[0.1em]">RECORD NO: <span className="text-[#C5A059]">OV-{viewingInvoice.id.slice(-6).toUpperCase()}</span></p>
                                            <p className="text-[#8D6E63] text-[9px] uppercase tracking-[0.2em]">INSCRIBED ON: {new Date(viewingInvoice.invoiceDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-24 font-sans">
                                    <div className="space-y-6">
                                        <h4 className="text-[9px] font-black text-[#8D6E63] uppercase tracking-[0.5em] pb-4 border-b-2 border-[#C5A059]/20">Distinguished Client</h4>
                                        <div className="pt-2">
                                            <p className="text-3xl font-serif font-black text-[#2C1D1A] tracking-tight">{viewingInvoice.guestName}</p>
                                            <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.4em] mt-2">Member Registry: #{viewingInvoice.guestId.slice(-6).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6 text-right">
                                        <h4 className="text-[9px] font-black text-[#8D6E63] uppercase tracking-[0.5em] pb-4 border-b-2 border-[#C5A059]/20">Sanctuary Particulars</h4>
                                        <div className="pt-2">
                                            <p className="text-2xl font-serif font-bold text-[#2C1D1A] italic">"{viewingInvoice.roomName}"</p>
                                            <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.4em] mt-2">Inventory Registry: #{viewingInvoice.reservationId.slice(-6).toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>

                                <table className="w-full mb-24 font-sans">
                                    <thead>
                                        <tr className="border-b-4 border-[#2C1D1A]">
                                            <th className="text-left py-6 text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.5em]">Service Description</th>
                                            <th className="text-right py-6 text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.5em]">Heritage Worth</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-bold">
                                        <tr className="border-b border-[#E8E2D6]">
                                            <td className="py-10 text-[#2C1D1A] italic text-lg font-serif">Elite Accomodation Service &mdash; {viewingInvoice.roomName} Sanctuary</td>
                                            <td className="text-right text-[#2C1D1A] text-xl font-serif">LKR {viewingInvoice.totalPrice?.toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-10 text-[#8D6E63] text-[10px] uppercase font-black tracking-[0.3em] font-sans">Imperial Service Levy & Government Tax</td>
                                            <td className="text-right text-emerald-600 uppercase text-[10px] font-black tracking-[0.4em] font-sans">Exempted / Included</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="flex justify-end pt-12 border-t-8 border-[#2C1D1A]">
                                    <div className="w-full max-w-sm space-y-6 font-sans">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-[#8D6E63] tracking-[0.4em]">
                                            <span>Cumulative Subtotal</span>
                                            <span className="text-[#2C1D1A]">LKR {viewingInvoice.totalPrice?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-6 border-t border-[#E8E2D6]">
                                            <span className="text-xl font-serif font-black text-[#2C1D1A] uppercase tracking-tighter">Imperial Grand Total</span>
                                            <span className="text-4xl font-serif font-black text-[#C5A059]">LKR {viewingInvoice.totalPrice?.toLocaleString()}</span>
                                        </div>
                                        <div className="pt-10">
                                            <div className="px-8 py-4 bg-[#FAF9F6] text-[#C5A059] text-[11px] font-black uppercase tracking-[0.5em] text-center border-2 border-[#C5A059] shadow-inner font-sans">
                                                Transaction Sealed & Recorded
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-32 pt-12 border-t border-[#E8E2D6] text-[9px] text-[#8D6E63] font-sans font-black uppercase tracking-[0.6em] text-center italic">
                                    Decreed at the Ocean View Resort & Spa &mdash; An Authentic Tropical Legacy.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Profile;
