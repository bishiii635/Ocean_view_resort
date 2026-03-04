import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    User, Mail, Calendar, LogOut, MapPin, Phone, Shield, 
    Edit2, Clock, CreditCard, CheckCircle2, AlertCircle, 
    Loader2, FileText, Download, Printer, X, Eye, Star, BedDouble,
    Crown, Gem, Compass, Sparkles, Anchor, History, Waves, ShieldCheck, ArrowRight
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6]">
            <Loader2 className="w-16 h-16 text-[#C5A059] animate-spin mb-8" />
            <p className="text-[#C5A059] font-bold tracking-[0.5em] uppercase text-[10px] animate-pulse">Accessing Imperial Records...</p>
        </div>
    );

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans">
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    header, footer, main, .print-hide {
                        display: none !important;
                    }
                    #invoice-modal-container {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        display: block !important;
                        background: white !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        z-index: 9999 !important;
                    }
                    #invoice-modal-card {
                        position: static !important;
                        width: 100% !important;
                        max-width: none !important;
                        height: auto !important;
                        max-height: none !important;
                        overflow: visible !important;
                        box-shadow: none !important;
                        border: none !important;
                        background: white !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .overflow-y-auto {
                        overflow: visible !important;
                        height: auto !important;
                        max-height: none !important;
                    }
                    #printable-invoice {
                        width: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    @page {
                        size: A4;
                        margin: 10mm;
                    }
                }
            ` }} />
            <Header />
            
            <main className="pt-48 pb-40 px-6 lg:px-12 max-w-7xl mx-auto">
                
                {/* Imperial Profile Pavilion */}
                <div className="bg-white border border-[#E8E2D6] shadow-[0_50px_100px_-20px_rgba(44,29,26,0.2)] overflow-hidden mb-20 relative group">
                    {/* Header Background with Texture */}
                    <div className="h-80 bg-[#2C1D1A] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-30"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2C1D1A]"></div>
                        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] border border-[#C5A059]/5 rounded-full blur-3xl group-hover:bg-[#C5A059]/5 transition-all duration-1000"></div>
                        
                        {/* Status Label Overlay */}
                        <div className="absolute top-12 right-12">
                            <div className="px-8 py-3 bg-[#FAF9F6]/5 backdrop-blur-md border border-white/10 text-[#C5A059] text-[9px] font-black uppercase tracking-[0.5em] flex items-center gap-4">
                                <ShieldCheck className="w-4 h-4" /> Sovereign Registered
                            </div>
                        </div>
                    </div>

                    <div className="px-12 lg:px-20 pb-16">
                        <div className="relative flex flex-col md:flex-row items-center md:items-end mb-12 text-center md:text-left gap-12">
                            {/* Avatar Display - Floating with negative margin */}
                            <div className="w-56 h-56 bg-white p-4 shadow-2xl relative border border-[#E8E2D6] -mt-32 shrink-0">
                                <div className="w-full h-full bg-[#FAF9F6] border-2 border-[#C5A059]/20 flex items-center justify-center relative overflow-hidden group-inner">
                                    <span className="text-8xl font-serif font-black text-[#5D4037] relative z-10">{user.name.charAt(0).toUpperCase()}</span>
                                    <div className="absolute inset-0 bg-[#C5A059]/5 opacity-0 group-hover-inner:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#C5A059] text-[#2C1D1A] flex items-center justify-center shadow-[0_10px_30px_rgba(197,160,89,0.5)] border-4 border-white">
                                    <Crown className="w-10 h-10" />
                                </div>
                            </div>

                            {/* Info Block - Positioned on the white area for perfect visibility */}
                            <div className="flex-1 space-y-4 pt-10">
                                <div className="inline-flex items-center gap-4 text-[#C5A059] font-black text-[10px] tracking-[0.6em] uppercase">
                                    <Sparkles className="w-4 h-4" /> Distinguished Sovereign
                                </div>
                                <h1 className="text-6xl md:text-7xl font-serif font-black text-[#2C1D1A] tracking-tighter leading-none italic">{user.name}</h1>
                                <div className="flex flex-col md:flex-row items-center gap-8 text-[#8D6E63] font-bold text-[11px] tracking-[0.3em] uppercase">
                                    <span className="flex items-center gap-3 bg-[#FAF9F6] px-5 py-2 border border-[#E8E2D6] transition-colors hover:border-[#C5A059]/30"><Mail className="w-4 h-4 text-[#C5A059]" /> {user.email}</span>
                                    <span className="flex items-center gap-3 bg-[#FAF9F6] px-5 py-2 border border-[#E8E2D6] transition-colors hover:border-[#C5A059]/30"><Anchor className="w-4 h-4 text-[#C5A059]" /> Noble Heritage</span>
                                </div>
                            </div>

                            {/* Departure Control */}
                            <div className="flex items-center gap-8 self-center md:self-end pb-2">
                                <button 
                                    onClick={logout}
                                    className="group flex items-center gap-4 px-12 py-6 bg-[#2C1D1A] text-white hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 font-bold text-[11px] tracking-[0.4em] uppercase shadow-2xl relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-4"><LogOut className="w-5 h-5" /> Depart Estate</span>
                                    <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                                </button>
                            </div>
                        </div>

                        {/* Sovereign Navigation Tabs */}
                        <div className="flex border-b border-[#E8E2D6]">
                            {[
                                { id: 'overview', icon: Compass, label: 'Heritage Overview' },
                                { id: 'my bookings', icon: History, label: 'Stay Chronicles' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-16 py-8 text-[11px] font-black uppercase tracking-[0.5em] transition-all relative flex items-center gap-4 ${
                                        activeTab === tab.id
                                            ? 'text-[#2C1D1A] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1.5 after:bg-[#C5A059]'
                                            : 'text-[#8D6E63] hover:text-[#2C1D1A]'
                                    }`}
                                >
                                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#C5A059]' : 'text-current opacity-40'}`} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Merit Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Member Status Card */}
                        <div className="bg-[#2C1D1A] border border-[#C5A059]/20 p-12 relative overflow-hidden group shadow-2xl">
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
                             <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#C5A059]/5 rounded-full blur-3xl"></div>
                             
                             <div className="relative z-10">
                                <h3 className="text-xl font-serif font-black text-[#C5A059] mb-12 flex items-center gap-6 italic tracking-widest">
                                    <Shield className="w-6 h-6" /> STATUS : DECREED
                                </h3>
                                
                                <div className="space-y-12">
                                    <div className="flex flex-col items-center text-center p-10 border border-[#C5A059]/20 bg-white/5 backdrop-blur-sm">
                                        <div className="w-24 h-24 bg-[#FAF9F6] border-2 border-[#C5A059] p-4 flex items-center justify-center text-[#C5A059] mb-6 shadow-[0_0_30px_rgba(197,160,89,0.2)]">
                                            <Star className="w-12 h-12 fill-[#C5A059]" />
                                        </div>
                                        <p className="text-[#C5A059] text-[9px] font-black uppercase tracking-[0.5em] mb-2">Heritage Worth</p>
                                        <h4 className="text-4xl font-serif font-black text-white italic">Elite Sovereign</h4>
                                        <div className="mt-4 px-6 py-2 bg-[#C5A059]/10 text-[#C5A059] text-[8px] font-black tracking-[0.3em] uppercase border border-[#C5A059]/20">All Imperial Perks Active</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="p-8 bg-white/5 border border-white/5 space-y-4">
                                            <p className="text-5xl font-serif font-black text-white tracking-tighter italic">{reservations.filter(r => r.status === 'COMPLETED').length}</p>
                                            <p className="text-[9px] text-[#8D6E63] font-bold uppercase tracking-[0.3em] leading-loose">Archived <br/> Stays</p>
                                        </div>
                                        <div className="p-8 bg-white/5 border border-white/5 space-y-4">
                                            <p className="text-5xl font-serif font-black text-[#C5A059] tracking-tighter italic">{reservations.filter(r => r.status === 'APPROVED').length}</p>
                                            <p className="text-[9px] text-[#8D6E63] font-bold uppercase tracking-[0.3em] leading-loose">Future <br/> Chronicles</p>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </div>

                        {/* Quick Navigation Card */}
                        <div className="bg-white border border-[#E8E2D6] p-12 shadow-xl">
                            <h3 className="text-[10px] font-black text-[#2C1D1A] uppercase tracking-[0.5em] mb-10 pb-6 border-b border-[#E8E2D6] italic">Imperial Concierge</h3>
                            <div className="space-y-6">
                                <button onClick={() => navigate('/rooms')} className="w-full flex items-center justify-between p-6 bg-[#FAF9F6] border border-[#E8E2D6] hover:border-[#C5A059] group transition-all duration-500">
                                    <span className="text-[10px] font-black text-[#8D6E63] uppercase tracking-widest group-hover:text-[#2C1D1A]">Discover More Sanctuaries</span>
                                    <Gem className="w-4 h-4 text-[#C5A059]" />
                                </button>
                                <button onClick={() => navigate('/feedbacks')} className="w-full flex items-center justify-between p-6 bg-[#FAF9F6] border border-[#E8E2D6] hover:border-[#C5A059] group transition-all duration-500">
                                    <span className="text-[10px] font-black text-[#8D6E63] uppercase tracking-widest group-hover:text-[#2C1D1A]">Inscribe a Testament</span>
                                    <FileText className="w-4 h-4 text-[#C5A059]" />
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Timeline of Stays */}
                    <div className="lg:col-span-8 space-y-16">
                        
                        {activeTab === 'overview' && (
                            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                                <div className="bg-white border border-[#E8E2D6] shadow-2xl p-16 relative">
                                    <div className="absolute top-0 right-16 w-16 h-4 bg-[#C5A059]"></div>
                                    <div className="flex items-center justify-between mb-16 border-b border-[#E8E2D6] pb-10">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-serif font-black text-[#2C1D1A] italic tracking-tighter flex items-center gap-6">
                                                <Calendar className="w-10 h-10 text-[#C5A059]" /> Scheduled Chronicles
                                            </h3>
                                            <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-[0.4em]">Your future arrival dates at the coastal estate</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] bg-[#FAF9F6] px-6 py-3 border border-[#C5A059]/20">
                                                {reservations.filter(r => r.status !== 'REJECTED' && r.status !== 'COMPLETED').length} Active Registries
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-10">
                                        {reservations.filter(r => r.status !== 'REJECTED' && r.status !== 'COMPLETED').length > 0 ? (
                                            reservations.filter(r => r.status !== 'REJECTED' && r.status !== 'COMPLETED').map(res => (
                                                <div key={res.id} className="p-12 bg-[#FAF9F6] border border-[#E8E2D6] flex flex-col xl:flex-row xl:items-center justify-between gap-12 hover:border-[#C5A059] transition-all duration-700 group relative">
                                                    {/* Selection Glow */}
                                                    <div className="absolute top-0 left-0 w-1.5 h-0 bg-[#C5A059] group-hover:h-full transition-all duration-700"></div>
                                                    
                                                    <div className="flex items-start gap-10">
                                                        <div className="w-24 h-24 bg-white border border-[#E8E2D6] flex items-center justify-center text-[#C5A059] shadow-xl group-hover:-translate-y-2 transition-transform duration-700">
                                                            <BedDouble className="w-12 h-12" />
                                                        </div>
                                                        <div className="space-y-6">
                                                            <div className="flex items-center gap-4">
                                                                <Gem className="w-4 h-4 text-[#C5A059]" />
                                                                <p className="text-[11px] font-black text-[#C5A059] uppercase tracking-[0.4em] font-serif italic">{getRoomName(res.roomId)}</p>
                                                                <div className="h-px w-12 bg-[#C5A059]/30"></div>
                                                                <p className="text-[9px] text-[#8D6E63] font-bold uppercase tracking-widest italic leading-none">Register ID #{res.id.slice(-6).toUpperCase()}</p>
                                                            </div>
                                                            <h4 className="text-4xl font-serif font-black text-[#2C1D1A] tracking-tighter italic">
                                                                {new Date(res.checkIn).toLocaleDateString()} <span className="text-[#C5A059] text-2xl mx-4">&mdash;</span> {new Date(res.checkOut).toLocaleDateString()}
                                                            </h4>
                                                            <div className="flex flex-wrap gap-6 mt-4">
                                                                <div className={`px-6 py-2 border-2 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 ${
                                                                    res.status === 'APPROVED' ? 'border-emerald-500/20 text-emerald-600 bg-emerald-50/50' : 'border-[#C5A059]/20 text-[#C5A059] bg-[#FAF9F6]'
                                                                }`}>
                                                                    <div className={`w-2.5 h-2.5 rounded-full ${res.status === 'APPROVED' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-[#C5A059]'}`}></div>
                                                                    Registry {res.status}
                                                                </div>
                                                                <div className={`px-6 py-2 border-2 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 ${
                                                                    res.paymentStatus === 'PAID' ? 'border-emerald-500/20 text-emerald-600 bg-emerald-50/50' : 'border-rose-500/20 text-rose-600 bg-rose-50/50'
                                                                }`}>
                                                                    <div className={`w-2.5 h-2.5 rounded-full ${res.paymentStatus === 'PAID' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'}`}></div>
                                                                    Tribute {res.paymentStatus}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action Registry Controls */}
                                                    <div className="flex gap-4 xl:self-center">
                                                        {res.paymentStatus === 'UNPAID' && res.status === 'APPROVED' && (
                                                            <button 
                                                                onClick={() => handlePayNow(res)}
                                                                className="group/btn px-12 py-6 bg-[#2C1D1A] text-white font-black text-[11px] tracking-[0.5em] uppercase hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-500 shadow-2xl relative overflow-hidden"
                                                            >
                                                                <span className="relative z-10">Initiate Settlement</span>
                                                                <div className="absolute inset-x-0 bottom-0 h-0 bg-[#C5A059] group-hover/btn:h-1 transition-all duration-700"></div>
                                                            </button>
                                                        )}
                                                        {res.paymentStatus === 'PAID' && (
                                                            <button 
                                                                onClick={() => handleViewInvoice(res.id)}
                                                                className="w-20 h-20 bg-white border border-[#E8E2D6] text-[#2C1D1A] hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-700 flex items-center justify-center shadow-lg group/inv"
                                                            >
                                                                <FileText className="w-8 h-8 group-hover/inv:scale-125 transition-transform" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-32 bg-[#FAF9F6] border-2 border-dashed border-[#E8E2D6] px-12 relative">
                                                <div className="w-24 h-24 bg-white border border-[#E8E2D6] flex items-center justify-center mx-auto mb-10 shadow-2xl text-[#C5A059]">
                                                    <Waves className="w-12 h-12" />
                                                </div>
                                                <h4 className="text-4xl font-serif font-black text-[#2C1D1A] mb-6 italic tracking-tight">The Horizon is Quiet</h4>
                                                <p className="text-[#8D6E63] text-xl font-medium italic mb-12 max-w-sm mx-auto opacity-80">"Your noble journey to the ivory path has yet to be chronicled in our grand records."</p>
                                                <button onClick={() => navigate('/rooms')} className="group px-16 py-8 bg-[#2C1D1A] text-white font-black text-[11px] tracking-[0.6em] uppercase hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all duration-1000 shadow-[0_20px_50px_rgba(44,29,26,0.2)]">
                                                    Explore Sanctuaries <Sparkles className="w-4 h-4 inline-block ml-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'my bookings' && (
                             <div className="bg-white border border-[#E8E2D6] shadow-2xl p-16 animate-in slide-in-from-right-12 duration-1000">
                                 <div className="flex items-center justify-between mb-16 border-b border-[#E8E2D6] pb-10">
                                     <h3 className="text-4xl font-serif font-black text-[#2C1D1A] italic tracking-tighter flex items-center gap-6">
                                         <History className="w-10 h-10 text-[#C5A059]" /> The Imperial Registry
                                     </h3>
                                     <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-[0.5em] italic">Full Stay Archives</p>
                                 </div>

                                 <div className="grid grid-cols-1 gap-10">
                                     {reservations.length > 0 ? (
                                         reservations.map(res => (
                                            <div key={res.id} className="p-12 border border-[#E8E2D6] bg-[#FAF9F6] hover:border-[#C5A059] transition-all duration-700 flex flex-col md:flex-row justify-between items-center group relative overflow-hidden">
                                                <div className="flex items-center gap-10 w-full md:w-auto">
                                                    <div className="w-20 h-20 bg-[#2C1D1A] text-[#C5A059] flex items-center justify-center shadow-2xl group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out shrink-0">
                                                        <MapPin className="w-8 h-8" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <h4 className="font-serif font-black text-3xl text-[#2C1D1A] tracking-tighter italic">{getRoomName(res.roomId)}</h4>
                                                        <div className="flex items-center gap-4 text-[10px] text-[#8D6E63] font-bold tracking-widest uppercase italic">
                                                            <span>OV-{String(res.id).slice(-6).toUpperCase()}</span>
                                                            <div className="w-1 h-1 bg-[#C5A059] rounded-full"></div>
                                                            <span>Chronicle of {new Date(res.invoiceDate || res.checkIn).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right mt-10 md:mt-0 space-y-4">
                                                    <p className="text-[9px] text-[#8D6E63] font-black uppercase tracking-[0.4em]">Final Tribute</p>
                                                    <p className="text-4xl font-serif font-black text-[#5D4037] tracking-tighter italic">LKR {res.totalCost?.toLocaleString()}</p>
                                                    <div className={`inline-block px-5 py-1.5 text-[8px] font-black uppercase tracking-[0.4em] border ${res.status === 'COMPLETED' ? 'text-emerald-600 border-emerald-500/20 bg-emerald-50' : 'text-[#8D6E63] border-[#E8E2D6]'}`}>
                                                        RECORD: {res.status}
                                                    </div>
                                                </div>
                                            </div>
                                         ))
                                     ) : (
                                         <div className="text-center py-32 border-2 border-dashed border-[#E8E2D6] bg-[#FAF9F6]">
                                            <p className="text-[#8D6E63] text-lg font-bold uppercase tracking-[0.4em] italic">The Colonial Register is Vacant.</p>
                                         </div>
                                     )}
                                 </div>
                             </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Premium Payment Modal - Dark Heritage Vibe */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-[#2C1D1A]/95 backdrop-blur-xl" onClick={() => setIsPaymentModalOpen(false)}></div>
                    <div className="bg-white w-full max-w-xl shadow-[0_100px_150px_-50px_rgba(0,0,0,0.8)] relative z-10 flex flex-col max-h-[95vh] overflow-hidden animate-in zoom-in-95 duration-1000 border-t-8 border-[#C5A059]">
                        <div className="p-16 overflow-y-auto relative">
                            {/* Texture background for modal header */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none p-4">
                                <Gem className="w-full h-full text-[#C5A059]" />
                            </div>

                            <div className="flex justify-between items-start mb-16 border-b border-[#E8E2D6] pb-12">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="p-5 bg-[#2C1D1A] text-[#C5A059] shadow-2xl">
                                            <CreditCard className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-4xl font-serif font-black text-[#2C1D1A] tracking-tighter italic leading-none">Royal Settlement</h3>
                                            <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-[0.5em] mt-3">Registry Order OV-{String(selectedReservation?.id).slice(-6).toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setIsPaymentModalOpen(false)} className="group p-4 hover:bg-[#FAF9F6] border border-transparent hover:border-[#E8E2D6] transition-all duration-500">
                                    <X className="w-8 h-8 text-[#8D6E63] group-hover:rotate-90 transition-transform duration-700" />
                                </button>
                            </div>

                            {paymentStatus === 'success' ? (
                                <div className="text-center py-20 animate-in fade-in zoom-in-75 duration-1000">
                                    <div className="w-32 h-32 bg-emerald-50 text-emerald-600 border-2 border-emerald-100 flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                        <CheckCircle2 className="w-16 h-16" />
                                    </div>
                                    <h4 className="text-4xl font-serif font-black text-[#2C1D1A] mb-6 italic tracking-tight">Financial Covenant Sealed</h4>
                                    <p className="text-[#8D6E63] text-xl font-medium italic opacity-80 max-w-sm mx-auto">"The Imperial Treasury confirms your tribute. Your sanctuary arrival is now fully decreed."</p>
                                </div>
                            ) : (
                                <form onSubmit={handlePaymentSubmit} className="space-y-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.5em] ml-2 block italic">Sovereign Holder Designation</label>
                                        <div className="relative">
                                            <User className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059] opacity-40" />
                                            <input 
                                                type="text" 
                                                required
                                                value={paymentData.cardHolder}
                                                onChange={(e) => setPaymentData({...paymentData, cardHolder: e.target.value})}
                                                className="w-full pl-16 pr-8 py-6 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] outline-none font-black text-[13px] tracking-[0.2em] text-[#2C1D1A] uppercase placeholder:opacity-20 translate-z-0 focus:shadow-inner transition-all"
                                                placeholder="DISTINGUISHED NAME AS DECREED"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.5em] ml-2 block italic">Imperial Sequence (Card)</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059] opacity-40" />
                                            <input 
                                                type="text" 
                                                required
                                                maxLength="19"
                                                value={paymentData.cardNumber}
                                                onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()})}
                                                className="w-full pl-16 pr-8 py-6 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] outline-none font-black text-[#2C1D1A] font-mono tracking-[0.4em] text-xl transition-all"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.5em] ml-2 block italic">Continuity Date</label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                value={paymentData.expiry}
                                                onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                                                className="w-full px-8 py-6 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] outline-none font-black text-[13px] tracking-[0.4em] text-[#2C1D1A]"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.5em] ml-2 block italic">Secret Cipher (CVV)</label>
                                            <input 
                                                type="password" 
                                                required
                                                maxLength="4"
                                                value={paymentData.cvv}
                                                onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                                                className="w-full px-8 py-6 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] outline-none font-black text-[13px] tracking-[0.4em] text-[#2C1D1A]"
                                                placeholder="***"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="p-12 bg-[#2C1D1A] text-center space-y-4 relative overflow-hidden group/valuation">
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
                                        <div className="relative z-10">
                                            <span className="font-black text-[#C5A059] text-[10px] uppercase tracking-[0.6em] block mb-4 opacity-60">Calculated Heritage Tribute</span>
                                            <span className="text-5xl font-serif font-black text-white italic tracking-tighter">LKR {selectedReservation?.totalCost?.toLocaleString()}</span>
                                            <div className="mt-6 flex justify-center saturate-0 opacity-20"><Gem className="w-10 h-10 text-[#C5A059]" /></div>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={paymentStatus === 'processing'}
                                        className="w-full py-8 bg-[#C5A059] text-[#2C1D1A] font-black text-[12px] uppercase tracking-[0.6em] hover:bg-white transition-all duration-700 shadow-[0_30px_60px_#000]/30 flex items-center justify-center gap-6 group/seal"
                                    >
                                        {paymentStatus === 'processing' ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                                            <>
                                                Seal Covenants <ArrowRight className="w-5 h-5 group-hover/seal:translate-x-4 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Archival Ledger (Invoice Modal) - Heritage Edition */}
            {isInvoiceModalOpen && viewingInvoice && (
                <div id="invoice-modal-container" className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div className="absolute inset-0 bg-[#2C1D1A]/98 backdrop-blur-2xl print-hide" onClick={() => setIsInvoiceModalOpen(false)}></div>
                    <div id="invoice-modal-card" className="bg-[#FAF9F6] w-full max-w-6xl shadow-[0_100px_300px_rgba(0,0,0,1)] relative z-10 flex flex-col max-h-[96vh] overflow-hidden animate-in zoom-in-110 duration-1000 border-t-[12px] border-[#C5A059]">
                        <div className="overflow-y-auto print:overflow-visible">
                            {/* Toolbar - Regal Edition */}
                            <div className="sticky top-0 z-20 px-16 py-10 bg-white border-b border-[#E8E2D6] flex justify-between items-center print-hide shadow-sm">
                                <div className="flex items-center gap-6">
                                     <div className="w-12 h-12 bg-[#2C1D1A] flex items-center justify-center text-[#C5A059]">
                                         <FileText className="w-6 h-6" />
                                     </div>
                                     <div>
                                        <h3 className="text-2xl font-serif font-black text-[#2C1D1A] tracking-tighter italic">Royal Archive Record</h3>
                                        <p className="text-[9px] text-[#C5A059] font-black uppercase tracking-[0.4em]">Historical Statement Registry</p>
                                     </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <button onClick={handlePrint} className="group flex items-center gap-4 px-10 py-5 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] font-black text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:border-[#C5A059] transition-all duration-500">
                                        <Printer className="w-5 h-5 text-[#C5A059] group-hover:scale-110 transition-transform" /> Print Record
                                    </button>
                                    <button onClick={handlePrint} className="group flex items-center gap-4 px-10 py-5 bg-[#2C1D1A] text-white font-black text-[10px] tracking-[0.3em] uppercase hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 shadow-2xl relative overflow-hidden">
                                        <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" /> Save Archival PDF
                                    </button>
                                    <button onClick={() => setIsInvoiceModalOpen(false)} className="w-16 h-16 hover:bg-[#FAF9F6] flex items-center justify-center transition-all duration-700 ml-8 border-l border-[#E8E2D6]">
                                        <X className="w-10 h-10 text-[#2C1D1A] opacity-20 hover:opacity-100 hover:rotate-90 transition-all" />
                                    </button>
                                </div>
                            </div>

                            {/* Ledger Content - Archival Masterpiece */}
                            <div id="printable-invoice" className="bg-white p-10 lg:p-16 print:p-0 mx-auto w-full max-w-[210mm] font-serif shadow-2xl mb-20">
                                <div className="border-[12px] border-[#FAF9F6] p-10 lg:p-12 relative overflow-hidden bg-white shadow-inner min-h-[297mm] flex flex-col">
                                    
                                    {/* Watermark Logo */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none w-full max-w-lg saturate-0">
                                        <Crown className="w-full h-full text-[#C5A059]" />
                                    </div>

                                    <div className="flex flex-col lg:flex-row justify-between gap-8 mb-16 items-start relative z-10">
                                        <div className="space-y-6 flex-1">
                                            <div className="flex items-center gap-4 group">
                                                 <div className="p-3 border-2 border-[#C5A059] bg-[#2C1D1A] shadow-lg">
                                                    <Crown className="text-[#C5A059] w-10 h-10" />
                                                 </div>
                                                 <div>
                                                     <h2 className="text-4xl font-black text-[#2C1D1A] tracking-tighter uppercase leading-none">Ocean<span className="text-[#C5A059]">View</span></h2>
                                                     <p className="text-[9px] font-sans font-black text-[#C5A059] tracking-[0.5em] uppercase mt-1">Resort & Imperial Spa</p>
                                                 </div>
                                            </div>
                                            <div className="text-[10px] text-[#8D6E63] font-sans font-bold uppercase tracking-[0.2em] leading-relaxed pl-4 border-l-2 border-[#C5A059]/20 max-w-sm">
                                                Registry: 123, Ancient Ivory Path<br/>
                                                Galle, Southern Province, Sri Lanka<br/>
                                                Decree: #SL9928374-IMP
                                            </div>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <h1 className="text-6xl font-black text-[#FAF9F6] uppercase tracking-tighter mb-4 stroke-text select-none leading-none" style={{WebkitTextStroke: '2px #E8E2D6'}}>LEGER</h1>
                                            <div className="text-sm font-sans font-black text-[#2C1D1A] space-y-2">
                                                <p className="tracking-[0.1em] bg-[#2C1D1A] text-[#C5A059] inline-block px-4 py-1.5 text-xs">RECORD NO: OV-{String(viewingInvoice.id).slice(-6).toUpperCase()}</p>
                                                <p className="text-[#8D6E63] text-[9px] uppercase tracking-[0.3em] mt-2 italic">INSCRIBED ON: {new Date(viewingInvoice.invoiceDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 font-sans relative z-10">
                                        <div className="space-y-4">
                                            <h4 className="text-[9px] font-black text-[#C5A059] uppercase tracking-[0.5em] pb-3 border-b border-[#E8E2D6] italic">Sovereign Guest</h4>
                                            <div className="pt-1 space-y-2">
                                                <p className="text-3xl font-serif font-black text-[#2C1D1A] tracking-tighter italic">{viewingInvoice.guestName}</p>
                                                <div className="flex items-center gap-3 text-[9px] text-[#8D6E63] font-bold uppercase tracking-widest">
                                                    <Shield className="w-3.5 h-3.5 text-[#C5A059]" /> Registry: #{String(viewingInvoice.guestId).slice(-6).toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4 text-right">
                                            <h4 className="text-[9px] font-black text-[#C5A059] uppercase tracking-[0.5em] pb-3 border-b border-[#E8E2D6] italic text-right">Sanctuary Register</h4>
                                            <div className="pt-1 space-y-2">
                                                <p className="text-2xl font-serif font-black text-[#2C1D1A] italic leading-tight">"{viewingInvoice.roomName}"</p>
                                                <div className="flex items-center gap-3 text-[9px] text-[#8D6E63] font-bold uppercase tracking-widest justify-end">
                                                    Ref: #{String(viewingInvoice.reservationId).slice(-6).toUpperCase()} <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex-1">
                                        <table className="w-full mb-12 font-sans border-collapse">
                                            <thead>
                                                <tr className="border-b-[3px] border-[#2C1D1A]">
                                                    <th className="text-left py-4 text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.5em] italic">Decreed Stay Details</th>
                                                    <th className="text-right py-4 text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.5em] italic">Value / Tribute</th>
                                                </tr>
                                            </thead>
                                            <tbody className="font-bold">
                                                <tr className="border-b-2 border-[#FAF9F6] bg-[#FAF9F6]/30">
                                                    <td className="py-10 text-[#2C1D1A] italic text-2xl font-serif tracking-tighter">
                                                        Elite Imperial Service <br/>
                                                        <span className="text-[#8D6E63] text-xs font-sans font-black uppercase tracking-[0.3em] mt-2 block not-italic">Sanctuary: {viewingInvoice.roomName}</span>
                                                    </td>
                                                    <td className="text-right text-[#2C1D1A] text-2xl font-serif font-black align-top py-10 italic">LKR {viewingInvoice.totalPrice?.toLocaleString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-8 text-[#8D6E63] text-[9px] uppercase font-black tracking-[0.4em] font-sans flex items-center gap-4">
                                                        <div className="w-4 h-[1px] bg-[#C5A059]"></div> Imperial Service Decree & Sovereign Levies
                                                    </td>
                                                    <td className="text-right text-emerald-600 uppercase text-[9px] font-black tracking-[0.5em] font-sans italic">Settled / Sovereign Exempt</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="relative z-10 mt-auto">
                                        <div className="flex flex-col md:flex-row justify-between items-end gap-12 pt-8 border-t-4 border-[#2C1D1A]">
                                            <div className="hidden md:block">
                                                 <div className="p-6 border-2 border-double border-[#C5A059]/30 opacity-40 group rotate-[-5deg] select-none">
                                                     <p className="text-[#C5A059] text-[8px] font-black uppercase tracking-[0.6em]">AUTHENTIC LEGACY</p>
                                                     <p className="font-serif italic text-xl text-[#C5A059] mt-1">Certified Record</p>
                                                 </div>
                                            </div>
                                            <div className="w-full max-w-sm space-y-6 font-sans">
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase text-[#8D6E63] tracking-[0.4em]">
                                                    <span>Registry Sub-total</span>
                                                    <span className="text-[#2C1D1A]">LKR {viewingInvoice.totalPrice?.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-6 border-y-2 border-[#FAF9F6] bg-[#FAF9F6]/30 px-4">
                                                    <span className="text-xl font-serif font-black text-[#2C1D1A] uppercase tracking-tighter italic">Imperial Grand Total</span>
                                                    <span className="text-4xl font-serif font-black text-[#C5A059] shadow-gold-sm">LKR {viewingInvoice.totalPrice?.toLocaleString()}</span>
                                                </div>
                                                <div className="pt-4">
                                                    <div className="px-10 py-5 bg-[#2C1D1A] text-[#C5A059] text-[11px] font-black uppercase tracking-[0.6em] text-center shadow-xl font-sans relative">
                                                        TRANSACTION SEALED & DECREED
                                                        <div className="absolute top-0 left-0 w-2 h-full bg-[#C5A059]"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-20 pt-10 border-t border-[#E8E2D6]/50 text-[9px] text-[#8D6E63] font-sans font-black uppercase tracking-[0.6em] text-center italic opacity-60">
                                            AN AUTHENTIC HERITAGE OF THE SOUTHERN COAST &mdash; OCEAN VIEW RESORT
                                        </div>
                                    </div>
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
