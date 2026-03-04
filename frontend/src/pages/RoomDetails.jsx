import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    ChevronLeft, 
    ChevronRight, 
    Calendar, 
    Users, 
    Star, 
    CheckCircle2, 
    AlertCircle, 
    Loader2, 
    ArrowLeft,
    BedDouble,
    MapPin,
    Phone,
    FileText,
    CreditCard,
    Wind,
    Wifi,
    Coffee
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const RoomDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [room, setRoom] = useState(null);
    const [category, setCategory] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    
    // Booking Form State
    const [bookingData, setBookingData] = useState({
        checkIn: '',
        checkOut: '',
        notes: '',
        guestAddress: '',
        guestPhone: ''
    });
    const [availabilityStatus, setAvailabilityStatus] = useState('idle'); // idle, checking, available, unavailable
    const [bookingStatus, setBookingStatus] = useState('idle'); // idle, submitting, success, error
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetchRoomDetails();
    }, [id]);

    const fetchRoomDetails = async () => {
        try {
            const roomRes = await axios.get(`http://localhost:8080/api/rooms/${id}`);
            setRoom(roomRes.data);
            
            const catRes = await axios.get(`http://localhost:8080/api/room-types/${roomRes.data.roomTypeId}`);
            setCategory(catRes.data);
        } catch (err) {
            console.error('Error fetching room details', err);
        } finally {
            setLoading(false);
        }
    };

    const images = room ? [room.image1, room.image2, room.image3].filter(img => img) : [];

    const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    const calculateTotalPrice = (inDate, outDate) => {
        if (!inDate || !outDate || !room) return 0;
        const start = new Date(inDate);
        const end = new Date(outDate);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return nights > 0 ? nights * room.rate : 0;
    };

    const handleDateChange = (field, value) => {
        const newData = { ...bookingData, [field]: value };
        setBookingData(newData);
        setAvailabilityStatus('idle');
        
        if (newData.checkIn && newData.checkOut) {
            setTotalPrice(calculateTotalPrice(newData.checkIn, newData.checkOut));
        }
    };

    const checkAvailability = async () => {
        if (!bookingData.checkIn || !bookingData.checkOut) return;
        
        setAvailabilityStatus('checking');
        try {
            const response = await axios.get(`http://localhost:8080/api/reservations/check-availability`, {
                params: {
                    roomId: id,
                    checkIn: bookingData.checkIn,
                    checkOut: bookingData.checkOut
                }
            });
            setAvailabilityStatus(response.data ? 'available' : 'unavailable');
        } catch (err) {
            console.error('Error checking availability', err);
            setAvailabilityStatus('idle');
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to book a room');
            navigate('/login');
            return;
        }

        setBookingStatus('submitting');
        try {
            const reservation = {
                guestId: user.id,
                roomId: id,
                checkIn: bookingData.checkIn,
                checkOut: bookingData.checkOut,
                totalCost: totalPrice,
                totalNights: Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24)),
                notes: bookingData.notes,
                guestAddress: bookingData.guestAddress,
                guestPhone: bookingData.guestPhone
            };
            
            await axios.post('http://localhost:8080/api/reservations', reservation);
            setBookingStatus('success');
            setTimeout(() => navigate('/profile'), 3000);
        } catch (err) {
            console.error('Booking failed', err);
            setBookingStatus('error');
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
        </div>
    );

    if (!room) return <div className="text-center py-40">Room not found</div>;

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Header />
            
            <main className="container mx-auto px-6 pt-32 pb-20">
                <button 
                    onClick={() => navigate('/rooms')}
                    className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 font-bold mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Selection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Side: Images and Description */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Image Gallery */}
                        <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group border border-slate-100 bg-slate-200">
                            {images.length > 0 ? (
                                <>
                                    <img 
                                        src={images[currentImageIndex]} 
                                        className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                                        alt={room.name}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
                                    
                                    {images.length > 1 && (
                                        <>
                                            <button 
                                                onClick={handlePrevImage}
                                                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button 
                                                onClick={handleNextImage}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}

                                    <div className="absolute bottom-10 left-10 right-10 flex justify-center gap-3">
                                        {images.map((_, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => setCurrentImageIndex(i)}
                                                className={`w-12 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-cyan-500 scale-110' : 'bg-white/40'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                    <BedDouble className="w-20 h-20 opacity-20 mb-4" />
                                    <p className="font-bold tracking-widest text-xs uppercase opacity-40">Media Pending</p>
                                </div>
                            )}
                        </div>

                        {/* Description and Amenities */}
                        <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-slate-100 pb-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-4 py-1.5 bg-cyan-50 text-cyan-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-cyan-100">
                                            {category?.name || 'Luxury'}
                                        </span>
                                        <div className="flex text-amber-500">
                                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                                        </div>
                                    </div>
                                    <h1 className="text-5xl font-black text-slate-900 leading-tight">{room.name}</h1>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Starting from</p>
                                    <p className="text-4xl font-black text-slate-900">Rs. {room.rate?.toLocaleString()}<span className="text-lg font-medium text-slate-400">/night</span></p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Max Capacity</p>
                                    <div className="flex items-center gap-2 text-slate-800 font-bold">
                                        <Users className="w-5 h-5 text-cyan-500" />
                                        {room.capacity} Persons
                                    </div>
                                </div>
                               
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-slate-900">Room Overview</h3>
                                <p className="text-slate-500 leading-relaxed text-lg italic">
                                    {room.description || "Designed for ultimate relaxation, this sanctuary offers a masterfully curated layout, premium linens, and floor-to-ceiling windows that capture the magic of the island landscape. Experience a stay where silence is the only soundtrack."}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {room.amenities?.map((amenity, i) => (
                                        <span key={i} className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-semibold text-slate-600 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200 border border-slate-100 sticky top-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-slate-900 text-white rounded-2xl">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Reserve Stay</h2>
                                    <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">Check Availability</p>
                                </div>
                            </div>

                            <form onSubmit={handleBookingSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Check In</label>
                                        <input 
                                            type="date" 
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            value={bookingData.checkIn}
                                            onChange={(e) => handleDateChange('checkIn', e.target.value)}
                                            className="w-full px-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none font-bold text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Check Out</label>
                                        <input 
                                            type="date" 
                                            required
                                            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                                            value={bookingData.checkOut}
                                            onChange={(e) => handleDateChange('checkOut', e.target.value)}
                                            className="w-full px-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none font-bold text-slate-700"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="button"
                                    onClick={checkAvailability}
                                    disabled={!bookingData.checkIn || !bookingData.checkOut || availabilityStatus === 'checking'}
                                    className="w-full py-4 border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-900 hover:text-white transition-all disabled:opacity-40"
                                >
                                    {availabilityStatus === 'checking' ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Check Availability'}
                                </button>

                                {availabilityStatus === 'available' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <div className="p-4 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 flex items-center gap-3 text-sm font-bold">
                                            <CheckCircle2 className="w-5 h-5" />
                                            Great! dates are available.
                                        </div>

                                        <div className="space-y-4">
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input 
                                                    type="text" 
                                                    placeholder="Physical Address" 
                                                    required
                                                    value={bookingData.guestAddress}
                                                    onChange={(e) => setBookingData({...bookingData, guestAddress: e.target.value})}
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 outline-none font-medium"
                                                />
                                            </div>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                <input 
                                                    type="tel" 
                                                    placeholder="Contact Number" 
                                                    required
                                                    value={bookingData.guestPhone}
                                                    onChange={(e) => setBookingData({...bookingData, guestPhone: e.target.value})}
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 outline-none font-medium"
                                                />
                                            </div>
                                            <div className="relative">
                                                <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                                <textarea 
                                                    placeholder="Additional Requests (Optional)" 
                                                    rows="3"
                                                    value={bookingData.notes}
                                                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 outline-none font-medium resize-none"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
                                            <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                                                <span>Total Estimation</span>
                                                <span>LKR {totalPrice.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm font-bold text-slate-500">
                                                <span>Tax & Service</span>
                                                <span className="text-emerald-600">INCLUDED</span>
                                            </div>
                                            <div className="h-px bg-slate-200 mt-2"></div>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="font-black text-slate-800">Final Price</span>
                                                <span className="text-2xl font-black text-slate-900 font-mono tracking-tighter">LKR {totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={bookingStatus === 'submitting'}
                                            className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-lg hover:bg-cyan-600 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            {bookingStatus === 'submitting' ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                                <>
                                                    Confirm Booking
                                                    <CreditCard className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                        
                                        {bookingStatus === 'success' && (
                                            <p className="text-center text-emerald-600 font-black text-sm animate-bounce">
                                                Booking successful! Redirecting...
                                            </p>
                                        )}
                                    </div>
                                )}

                                {availabilityStatus === 'unavailable' && (
                                    <div className="p-5 bg-rose-50 text-rose-700 rounded-3xl border border-rose-100 flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-4">
                                        <AlertCircle className="w-10 h-10" />
                                        Selected dates are already booked. Please try another period.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RoomDetails;
