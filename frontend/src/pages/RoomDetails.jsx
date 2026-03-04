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
    Coffee,
    Crown,
    Gem,
    Compass,
    Anchor
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
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
            <Loader2 className="w-12 h-12 text-[#C5A059] animate-spin" />
        </div>
    );

    if (!room) return <div className="text-center py-40 font-serif text-[#2C1D1A]">Sanctuary not found in heritage records.</div>;

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans">
            <Header />
            
            <main className="container mx-auto px-6 pt-48 pb-32">
                <button 
                    onClick={() => navigate('/rooms')}
                    className="flex items-center gap-3 text-[#8D6E63] hover:text-[#5D4037] font-bold text-[10px] tracking-[0.3em] uppercase mb-12 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                    Return to Collection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    {/* Left Side: Images and Description */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Image Gallery */}
                        <div className="relative h-[700px] overflow-hidden shadow-2xl group border border-[#E8E2D6] bg-white">
                            {images.length > 0 ? (
                                <>
                                    <img 
                                        src={images[currentImageIndex]} 
                                        className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
                                        alt={room.name}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#2C1D1A]/20 via-transparent to-[#2C1D1A]/40"></div>
                                    
                                    {images.length > 1 && (
                                        <>
                                            <button 
                                                onClick={handlePrevImage}
                                                className="absolute left-8 top-1/2 -translate-y-1/2 p-6 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#2C1D1A] transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button 
                                                onClick={handleNextImage}
                                                className="absolute right-8 top-1/2 -translate-y-1/2 p-6 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#2C1D1A] transition-all opacity-0 group-hover:opacity-100"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}

                                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                                        {images.map((_, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => setCurrentImageIndex(i)}
                                                className={`h-1 transition-all duration-500 ${i === currentImageIndex ? 'w-16 bg-[#C5A059]' : 'w-8 bg-white/30 hover:bg-white/60'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-[#E8E2D6]">
                                    <BedDouble className="w-24 h-24 opacity-20 mb-8" />
                                    <p className="font-bold tracking-[0.4em] text-[10px] uppercase opacity-40">Records Pending</p>
                                </div>
                            )}
                        </div>

                        {/* Description and Amenities */}
                        <div className="bg-white p-16 border border-[#E8E2D6] shadow-xl">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-16 border-b border-[#E8E2D6] pb-16">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-6 py-2 bg-[#5D4037] text-[#C5A059] text-[9px] font-bold uppercase tracking-[0.4em] border border-[#C5A059]/20">
                                            {category?.name || 'Heritage Collection'}
                                        </span>
                                        <div className="flex text-[#C5A059]">
                                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-[#C5A059]" />)}
                                        </div>
                                    </div>
                                    <h1 className="text-6xl md:text-7xl font-serif font-black text-[#2C1D1A] leading-none mb-4">{room.name}</h1>
                                    <p className="text-[#8D6E63] font-bold text-[10px] tracking-[0.4em] uppercase">Imperial Sanctuary ID: RS-{id?.padStart(3, '0')}</p>
                                </div>
                                <div className="md:text-right">
                                    <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-[0.3em] mb-2">Heritage Worth</p>
                                    <p className="text-5xl font-serif font-black text-[#2C1D1A]">LKR {room.rate?.toLocaleString()}<span className="text-sm font-bold text-[#8D6E63] uppercase tracking-widest ml-2">/night</span></p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                                <div className="space-y-4 group">
                                    <Users className="w-6 h-6 text-[#C5A059]" />
                                    <div>
                                        <p className="text-[9px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] mb-1">Noble Capacity</p>
                                        <p className="text-xl font-serif font-bold text-[#2C1D1A]">{room.capacity} Distinguished Guests</p>
                                    </div>
                                </div>
                                <div className="space-y-4 group">
                                    <Crown className="w-6 h-6 text-[#C5A059]" />
                                    <div>
                                        <p className="text-[9px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] mb-1">Sanctuary Type</p>
                                        <p className="text-xl font-serif font-bold text-[#2C1D1A]">{category?.name || 'Elite'}</p>
                                    </div>
                                </div>
                                <div className="space-y-4 group">
                                    <Compass className="w-6 h-6 text-[#C5A059]" />
                                    <div>
                                        <p className="text-[9px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] mb-1">Vista orientation</p>
                                        <p className="text-xl font-serif font-bold text-[#2C1D1A]">Oceanic Horizon</p>
                                    </div>
                                </div>
                                <div className="space-y-4 group">
                                    <Anchor className="w-6 h-6 text-[#C5A059]" />
                                    <div>
                                        <p className="text-[9px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] mb-1">Services</p>
                                        <p className="text-xl font-serif font-bold text-[#2C1D1A]">Full Concierge</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="flex items-center gap-6">
                                     <div className="h-px bg-[#C5A059] flex-1"></div>
                                     <h3 className="text-xs font-bold text-[#C5A059] tracking-[0.5em] uppercase text-center">Sanctuary Overview</h3>
                                     <div className="h-px bg-[#C5A059] flex-1"></div>
                                </div>
                                <p className="text-[#6D5B57] leading-relaxed text-xl italic font-medium">
                                    {room.description || "Designed for ultimate relaxation, this sanctuary offers a masterfully curated layout, premium linens, and floor-to-ceiling windows that capture the magic of the island landscape. Experience a stay where silence is the only soundtrack."}
                                </p>
                                <div className="flex flex-wrap gap-4 pt-10">
                                    {room.amenities?.map((amenity, i) => (
                                        <span key={i} className="px-8 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[10px] font-bold uppercase tracking-[0.2em] text-[#5D4037] flex items-center gap-3">
                                            <Gem className="w-3 h-3 text-[#C5A059]" />
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#2C1D1A] p-12 shadow-2xl sticky top-48 border border-[#C5A059]/20">
                            <div className="flex items-center gap-6 mb-12 border-b border-[#C5A059]/20 pb-8">
                                <div className="p-4 bg-[#C5A059] text-[#2C1D1A]">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-white tracking-wide">Reserve Stay</h2>
                                    <p className="text-[9px] text-[#C5A059] font-bold tracking-[0.3em] uppercase mt-2">Royal Registry</p>
                                </div>
                            </div>

                            <form onSubmit={handleBookingSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                                            Arrival Date
                                        </label>
                                        <input 
                                            type="date" 
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            value={bookingData.checkIn}
                                            onChange={(e) => handleDateChange('checkIn', e.target.value)}
                                            className="w-full px-6 py-5 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-bold text-[#C5A059] uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
                                            Departure Date
                                        </label>
                                        <input 
                                            type="date" 
                                            required
                                            min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                                            value={bookingData.checkOut}
                                            onChange={(e) => handleDateChange('checkOut', e.target.value)}
                                            className="w-full px-6 py-5 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="button"
                                    onClick={checkAvailability}
                                    disabled={!bookingData.checkIn || !bookingData.checkOut || availabilityStatus === 'checking'}
                                    className="w-full py-5 bg-transparent border border-[#C5A059] text-[#C5A059] font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all disabled:opacity-30"
                                >
                                    {availabilityStatus === 'checking' ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Consult Registry'}
                                </button>

                                {availabilityStatus === 'available' && (
                                    <div className="space-y-10 animate-in fade-in slide-in-from-top-6 duration-700 pt-8">
                                        <div className="p-6 bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-4">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Dates are vacant
                                        </div>

                                        <div className="space-y-6">
                                            <div className="relative group">
                                                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                                                <input 
                                                    type="text" 
                                                    placeholder="Physical Address" 
                                                    required
                                                    value={bookingData.guestAddress}
                                                    onChange={(e) => setBookingData({...bookingData, guestAddress: e.target.value})}
                                                    className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] outline-none text-xs tracking-wider"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                                                <input 
                                                    type="tel" 
                                                    placeholder="Noble Contact Number" 
                                                    required
                                                    value={bookingData.guestPhone}
                                                    onChange={(e) => setBookingData({...bookingData, guestPhone: e.target.value})}
                                                    className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] outline-none text-xs tracking-wider"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <FileText className="absolute left-6 top-6 w-4 h-4 text-[#C5A059]" />
                                                <textarea 
                                                    placeholder="Special Decrees or Requests" 
                                                    rows="3"
                                                    value={bookingData.notes}
                                                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                                                    className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] outline-none text-xs tracking-wider resize-none"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-white/5 border border-white/10 space-y-4">
                                            <div className="flex justify-between items-center text-[10px] font-bold text-white/50 uppercase tracking-widest">
                                                <span>Estimated Worth</span>
                                                <span className="text-white">LKR {totalPrice.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] font-bold text-white/50 uppercase tracking-widest">
                                                <span>Royal Tax</span>
                                                <span className="text-[#C5A059]">Included</span>
                                            </div>
                                            <div className="h-px bg-white/10 my-4"></div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-white text-xs uppercase tracking-[0.2em]">Final Sum</span>
                                                <span className="text-3xl font-serif font-black text-[#C5A059]">LKR {totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <button 
                                            type="submit" 
                                            disabled={bookingStatus === 'submitting'}
                                            className="w-full bg-[#C5A059] text-[#2C1D1A] py-6 font-bold text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-[#2C1D1A] transition-all shadow-2xl flex items-center justify-center gap-4"
                                        >
                                            {bookingStatus === 'submitting' ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                <>
                                                    Seal Reservation
                                                    <CreditCard className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                        
                                        {bookingStatus === 'success' && (
                                            <p className="text-center text-emerald-400 font-bold text-[10px] tracking-[0.2em] uppercase animate-pulse">
                                                Registry updated. Preparing your arrival...
                                            </p>
                                        )}
                                    </div>
                                )}

                                {availabilityStatus === 'unavailable' && (
                                    <div className="p-8 bg-rose-950/30 border border-rose-500/30 text-rose-400 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-4">
                                        <AlertCircle className="w-10 h-10" />
                                        This sanctuary is occupied during selected dates.
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
