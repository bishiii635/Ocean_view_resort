import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    User, Mail, Calendar, LogOut, MapPin, Phone, Shield, 
    Edit2, Clock, CreditCard, CheckCircle2, AlertCircle, 
    Loader2, FileText, Download, Printer, X, Eye, Star, BedDouble
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

    const getRoomName = (roomId) => rooms.find(r => r.id === roomId)?.name || 'Luxury Room';

    const handlePayNow = (reservation) => {
        setSelectedReservation(reservation);
        setIsPaymentModalOpen(true);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setPaymentStatus('processing');
        
        try {
            // Mock payment processing time
            await new Promise(resolve => setTimeout(resolve, 2000));
            
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
            alert('Payment failed. Please try again.');
        }
    };

    const handleViewInvoice = async (reservationId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/invoices/reservation/${reservationId}`);
            setViewingInvoice(response.data);
            setIsInvoiceModalOpen(true);
        } catch (err) {
            console.error('Invoice not found', err);
            alert('Invoice not available yet.');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (authLoading || (loading && !reservations.length)) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
        </div>
    );

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />
            
            <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-8 relative">
                    <div className="h-40 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551882547-ff43c636a224?auto=format&fit=crop&q=80')] opacity-20 mix-blend-overlay"></div>
                    </div>
                    <div className="px-10 pb-10">
                        <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-16 mb-8 text-center md:text-left">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-white p-1.5 shadow-2xl relative">
                                <div className="w-full h-full rounded-[2.2rem] bg-slate-100 flex items-center justify-center text-4xl font-black text-cyan-600 border-4 border-white">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 border-4 border-white rounded-2xl flex items-center justify-center text-white shadow-lg">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="md:ml-8 mt-6 md:mb-2 flex-1">
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h1>
                                <p className="text-slate-500 font-bold flex items-center justify-center md:justify-start gap-2 text-sm mt-1 uppercase tracking-widest">
                                    <Mail className="w-4 h-4 text-cyan-500" /> {user.email}
                                </p>
                            </div>
                            <div className="mt-8 md:mt-0 flex gap-4">
                               
                                <button 
                                    onClick={logout}
                                    className="flex items-center gap-2 px-6 py-3 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 hover:bg-rose-100 transition-all font-bold text-sm shadow-sm active:scale-95"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 p-1 bg-slate-100 w-fit rounded-2xl">
                            {['Overview', 'My Bookings'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
                                        activeTab === tab.toLowerCase()
                                            ? 'bg-white text-cyan-600 shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Sidebar Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-cyan-600" /> Account Level
                            </h3>
                            <div className="space-y-6 font-bold">
                                <div className="space-y-2">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Badge</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                                            <Star className="w-6 h-6 fill-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-slate-900">Gold Member</p>
                                            <p className="text-xs text-amber-600">Premium Perks Active</p>
                                        </div>
                                    </div>
                                </div>
                           
                                <div className="space-y-2 text-sm">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Total Stays</p>
                                    <p className="text-slate-800">{reservations.filter(r => r.status === 'COMPLETED').length} Completed Trips</p>
                                </div>
                            </div>
                        </div>

                       
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                            <Calendar className="w-6 h-6 text-cyan-600" /> Current & Future Stay
                                        </h3>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{reservations.filter(r => r.status !== 'REJECTED' && r.status !== 'COMPLETED').length} Bookings</span>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        {reservations.filter(r => r.status !== 'REJECTED' && r.status !== 'COMPLETED').length > 0 ? (
                                            reservations.filter(r => r.status !== 'REJECTED' && r.status !== 'COMPLETED').map(res => (
                                                <div key={res.id} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-cyan-200 transition-all group">
                                                    <div className="flex items-start gap-6">
                                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-cyan-600 shadow-sm">
                                                            <BedDouble className="w-8 h-8" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-cyan-600 uppercase tracking-widest mb-1">{getRoomName(res.roomId)}</p>
                                                            <h4 className="text-xl font-bold text-slate-900">{new Date(res.checkIn).toLocaleDateString()} - {new Date(res.checkOut).toLocaleDateString()}</h4>
                                                            <div className="flex gap-4 mt-2">
                                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                                    res.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                                                                }`}>
                                                                    {res.status}
                                                                </span>
                                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                                    res.paymentStatus === 'PAID' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'
                                                                }`}>
                                                                    {res.paymentStatus}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        {res.paymentStatus === 'UNPAID' && res.status === 'APPROVED' && (
                                                            <button 
                                                                onClick={() => handlePayNow(res)}
                                                                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-cyan-600 transition-all shadow-lg shadow-slate-200"
                                                            >
                                                                Pay Now
                                                            </button>
                                                        )}
                                                        {res.paymentStatus === 'PAID' && (
                                                            <button 
                                                                onClick={() => handleViewInvoice(res.id)}
                                                                className="px-6 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-black text-xs hover:border-slate-900 transition-all"
                                                            >
                                                                <FileText className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-slate-300">
                                                    <Calendar className="w-8 h-8" />
                                                </div>
                                                <h4 className="text-slate-800 font-bold mb-1">Adventure awaits!</h4>
                                                <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">No current bookings found. Our coastal sanctuaries are waiting for you.</p>
                                                <button onClick={() => navigate('/rooms')} className="btn-gradient px-8 py-3 rounded-2xl font-black text-sm shadow-xl shadow-cyan-200">Explore Room</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                           
                            </div>
                        )}
                        
                        {activeTab === 'my bookings' && (
                             <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-10">
                                 <h3 className="text-2xl font-black text-slate-900 mb-10">Stay History</h3>
                                 <div className="grid grid-cols-1 gap-6">
                                     {reservations.length > 0 ? (
                                         reservations.map(res => (
                                            <div key={res.id} className="p-8 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-all flex justify-between items-center">
                                                <div className="flex gap-6">
                                                    <div className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center">
                                                        <MapPin className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900">{getRoomName(res.roomId)}</h4>
                                                        <p className="text-sm text-slate-500">{new Date(res.checkIn).toLocaleDateString()} stay</p>
                                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">ID: #{res.id.slice(-6).toUpperCase()}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-slate-900">LKR {res.totalCost?.toLocaleString()}</p>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${res.status === 'COMPLETED' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                        {res.status}
                                                    </span>
                                                </div>
                                            </div>
                                         ))
                                     ) : (
                                         <p className="text-center text-slate-500 py-20 font-bold">No booking history yet.</p>
                                     )}
                                 </div>
                             </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Payment Modal */}
            {isPaymentModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsPaymentModalOpen(false)}></div>
                    <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-10 overflow-y-auto">
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-cyan-600 text-white rounded-2xl">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Secure Checkouts</h3>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Payment for Stay #{selectedReservation?.id.slice(-6).toUpperCase()}</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsPaymentModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            {paymentStatus === 'success' ? (
                                <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in duration-500">
                                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                        <CheckCircle2 className="w-12 h-12" />
                                    </div>
                                    <h4 className="text-3xl font-black text-slate-900">Payment Complete!</h4>
                                    <p className="text-slate-500 font-medium">Your stay is now fully secured. You can download the invoice from your profile.</p>
                                </div>
                            ) : (
                                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Card Holder Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={paymentData.cardHolder}
                                            onChange={(e) => setPaymentData({...paymentData, cardHolder: e.target.value})}
                                            className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 outline-none font-bold text-slate-700"
                                            placeholder="MR THARINDU SAMPATH"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Credit Card Number</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                                            <input 
                                                type="text" 
                                                required
                                                maxLength="19"
                                                value={paymentData.cardNumber}
                                                onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()})}
                                                className="w-full pl-16 pr-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 outline-none font-bold text-slate-700 font-mono"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Expiry Date</label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                value={paymentData.expiry}
                                                onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                                                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 outline-none font-bold text-slate-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">CVV</label>
                                            <input 
                                                type="password" 
                                                required
                                                maxLength="3"
                                                value={paymentData.cvv}
                                                onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                                                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 outline-none font-bold text-slate-700"
                                                placeholder="***"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center mb-4">
                                        <span className="font-black text-slate-400 text-xs uppercase tracking-widest">Total Valuation</span>
                                        <span className="text-2xl font-black text-slate-900">LKR {selectedReservation?.totalCost?.toLocaleString()}</span>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={paymentStatus === 'processing'}
                                        className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-cyan-600 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {paymentStatus === 'processing' ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>
                                                Pay Total Amount
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsInvoiceModalOpen(false)}></div>
                    <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-10 print:p-0 overflow-y-auto">
                            {/* Toolbar */}
                            <div className="flex justify-between items-center mb-10 print:hidden">
                                <h3 className="text-2xl font-black text-slate-900">Digital Statement</h3>
                                <div className="flex gap-3">
                                    <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 rounded-xl text-slate-700 font-bold text-xs hover:bg-slate-200 transition-all">
                                        <Printer className="w-4 h-4" /> Print
                                    </button>
                                    <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 text-white rounded-xl font-bold text-xs hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-200">
                                        <Download className="w-4 h-4" /> PDF
                                    </button>
                                    <button onClick={() => setIsInvoiceModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors ml-2">
                                        <X className="w-6 h-6 text-slate-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Actual Invoice Content */}
                            <div id="printable-invoice" className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm print:border-none print:shadow-none">
                                <div className="flex flex-col md:flex-row justify-between gap-10 mb-16 underline-offset-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-cyan-600 text-white rounded-xl flex items-center justify-center font-black">O</div>
                                            <h2 className="text-2xl font-black text-slate-900">Ocean<span className="text-cyan-600">View</span></h2>
                                        </div>
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose">
                                            123 Coastal Road, Galle<br/>
                                            Southern Province, Sri Lanka<br/>
                                            VAT: #SL9928374
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <h1 className="text-4xl font-black text-slate-200 uppercase tracking-widest mb-4">Invoice</h1>
                                        <div className="text-sm font-bold text-slate-900">
                                            <p>NO: <span className="text-cyan-600">OV-{viewingInvoice.id.slice(-6).toUpperCase()}</span></p>
                                            <p className="text-slate-400 text-[10px] mt-1">DATE: {new Date(viewingInvoice.invoiceDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4 border-b border-slate-100">Billed To</h4>
                                        <div>
                                            <p className="text-xl font-black text-slate-900">{viewingInvoice.guestName}</p>
                                            <p className="text-sm text-slate-500 mt-1">Member ID: #{viewingInvoice.guestId.slice(-6).toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-right">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4 border-b border-slate-100">Booking Details</h4>
                                        <div className="text-sm font-bold text-slate-900">
                                            <p>{viewingInvoice.roomName}</p>
                                            <p className="text-slate-500 text-xs">Stay ID: #{viewingInvoice.reservationId.slice(-6).toUpperCase()}</p>
                                        </div>
                                    </div>
                                </div>

                                <table className="w-full mb-16">
                                    <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="text-left py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                                            <th className="text-right py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-bold">
                                        <tr className="border-b border-slate-50">
                                            <td className="py-6 text-slate-900">Accomodation Charges ({viewingInvoice.roomName})</td>
                                            <td className="text-right text-slate-900">LKR {viewingInvoice.totalPrice?.toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-6 text-slate-400 font-medium italic">Service Charge & Government VAT</td>
                                            <td className="text-right text-emerald-600 uppercase text-[10px]">Zero Rated</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="flex justify-end pt-10 border-t-4 border-slate-900">
                                    <div className="w-full max-w-xs space-y-4">
                                        <div className="flex justify-between items-center text-sm font-black uppercase text-slate-400 tracking-widest">
                                            <span>Subtotal</span>
                                            <span className="text-slate-900">LKR {viewingInvoice.totalPrice?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4">
                                            <span className="text-xl font-black text-slate-900">Grand Total</span>
                                            <span className="text-3xl font-black text-cyan-600">LKR {viewingInvoice.totalPrice?.toLocaleString()}</span>
                                        </div>
                                        <div className="pt-8">
                                            <div className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-center border border-emerald-100">
                                                Transaction Verified & Paid
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-20 pt-10 border-t border-slate-100 text-[10px] text-slate-300 font-bold uppercase tracking-widest text-center">
                                    Thank you for Choosing Ocean View Resort - This is a computer generated statement.
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
