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
    Anchor,
    Sparkles,
    Waves,
    History,
    ShieldCheck
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6]">
            <Loader2 className="w-16 h-16 text-[#C5A059] animate-spin mb-8" />
            <p className="text-[#C5A059] font-bold tracking-[0.5em] uppercase text-[10px] animate-pulse">Consulting the Grand Registry...</p>
        </div>
    );

    if (!room) return <div className="min-h-screen flex items-center justify-center font-serif text-[#2C1D1A] text-4xl italic bg-[#FAF9F6]">Sanctuary not found in archives.</div>;

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans">
            <Header />
            
            <main className="container mx-auto px-6 pt-56 pb-40">
                <button 
                    onClick={() => navigate('/rooms')}
                    className="group inline-flex items-center gap-6 text-[#8D6E63] hover:text-[#2C1D1A] font-bold text-[10px] tracking-[0.5em] uppercase mb-16 transition-all duration-700"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-3 transition-transform" />
                    Archive Collection
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Cinematic Left Column: Imagery & Details */}
                    <div className="lg:col-span-8 space-y-24">
                        
                        {/* Grand Display Gallery */}
                        <div className="relative h-[800px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(44,29,26,0.3)] group bg-white border border-[#E8E2D6]">
                            {images.length > 0 ? (
                                <>
                                    <div className="absolute inset-0 z-0">
                                        <img 
                                            src={images[currentImageIndex]} 
                                            className="w-full h-full object-cover transition-all duration-[2s] ease-out scale-100 group-hover:scale-105"
                                            alt={room.name}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#2C1D1A]/30 via-transparent to-[#2C1D1A]/60 z-10"></div>
                                    
                                    {/* Navigation Arrows */}
                                    {images.length > 1 && (
                                        <>
                                            <button 
                                                onClick={handlePrevImage}
                                                className="absolute left-10 top-1/2 -translate-y-1/2 w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-[#2C1D1A] transition-all duration-700 opacity-0 group-hover:opacity-100 flex items-center justify-center z-20"
                                            >
                                                <ChevronLeft className="w-8 h-8" />
                                            </button>
                                            <button 
                                                onClick={handleNextImage}
                                                className="absolute right-10 top-1/2 -translate-y-1/2 w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white hover:text-[#2C1D1A] transition-all duration-700 opacity-0 group-hover:opacity-100 flex items-center justify-center z-20"
                                            >
                                                <ChevronRight className="w-8 h-8" />
                                            </button>
                                        </>
                                    )}

                                    {/* Page Indicators */}
                                    <div className="absolute bottom-16 left-16 flex items-end gap-6 z-20">
                                        {images.map((_, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => setCurrentImageIndex(i)}
                                                className={`transition-all duration-700 ${i === currentImageIndex ? 'w-24 h-2 bg-[#C5A059]' : 'w-12 h-1 bg-white/30 hover:bg-white/60'}`}
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Index Overlay */}
                                    <div className="absolute top-16 right-16 z-20">
                                        <div className="text-white/40 font-serif italic text-8xl font-black select-none">
                                            0{currentImageIndex + 1}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-[#E8E2D6] bg-[#FAF9F6]">
                                    <BedDouble className="w-32 h-32 opacity-10 mb-8" />
                                    <p className="font-bold tracking-[0.6em] text-[10px] uppercase opacity-40">Entry Pending...</p>
                                </div>
                            )}
                        </div>

                        {/* Sanctuary Chronicles - Content */}
                        <div className="bg-white p-20 lg:p-32 border border-[#E8E2D6] shadow-2xl relative">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-[#C5A059]/10 translate-x-4 -translate-y-4"></div>
                            
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-16 mb-24 border-b border-[#E8E2D6] pb-24">
                                <div className="space-y-10 flex-1">
                                    <div className="flex items-center gap-6">
                                        <div className="px-10 py-3 bg-[#2C1D1A] text-[#C5A059] text-[9px] font-black uppercase tracking-[0.5em] border border-[#C5A059]/30">
                                            {category?.name || 'Heritage Collection'}
                                        </div>
                                        <div className="flex text-[#C5A059] gap-1">
                                            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-[#C5A059]" />)}
                                        </div>
                                    </div>
                                    <h1 className="text-6xl md:text-9xl font-serif font-black text-[#2C1D1A] leading-[1] tracking-tighter italic">
                                        {room.name}
                                    </h1>
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-px bg-[#C5A059]"></div>
                                        <p className="text-[#8D6E63] font-bold text-[10px] tracking-[0.5em] uppercase">Imperial Inscription OV-{id?.slice(-4).toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="md:text-right space-y-4">
                                    <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-[0.4em]">Historical Worth</p>
                                    <p className="text-6xl font-serif font-black text-[#2C1D1A] tracking-tighter italic">
                                        LKR {room.rate?.toLocaleString()}
                                        <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-4 italic">/ Twilight</span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
                                {[
                                    { icon: Users, label: 'Capacity', val: `${room.capacity} Nobles` },
                                    { icon: Crown, label: 'Standard', val: category?.name || 'Elite' },
                                    { icon: Compass, label: 'Orient', val: 'Coastal Horizon' },
                                    { icon: Sparkles, label: 'Merit', val: 'Noble Distinction' }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-6 group">
                                        <div className="p-5 bg-[#FAF9F6] border border-[#E8E2D6] w-fit group-hover:border-[#C5A059] transition-all duration-700">
                                            <item.icon className="w-8 h-8 text-[#C5A059] group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black text-[#8D6E63] uppercase tracking-[0.4em]">{item.label}</p>
                                            <p className="text-xl font-serif font-black text-[#2C1D1A] italic">{item.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-16">
                                <div className="relative">
                                    <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-[#C5A059]/20 -translate-x-6 -translate-y-6"></div>
                                    <h3 className="text-2xl font-serif font-black text-[#2C1D1A] uppercase tracking-widest italic mb-10 flex items-center gap-6">
                                        The Noble Narration <Waves className="w-5 h-5 text-[#C5A059]" />
                                    </h3>
                                    <p className="text-[#6D5B57] leading-[2.2] text-2xl italic font-medium opacity-90 first-letter:text-8xl first-letter:font-serif first-letter:text-[#C5A059] first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] mb-12">
                                        {room.description || "Designed for ultimate relaxation, this sanctuary offers a masterfully curated layout, premium linens, and floor-to-ceiling windows that capture the magic of the island landscape. Experience a stay where silence is the only soundtrack."}
                                    </p>
                                    <p className="text-[#8D6E63] text-lg leading-relaxed italic border-l-2 border-[#E8E2D6] pl-10 font-medium">
                                        "Every stone and every textile within this sanctuary has been chosen to resonate with the heritage of the southern coast. Here, time slows down to match the rhythm of the tides."
                                    </p>
                                </div>

                                <div className="space-y-12 pt-12 border-t border-[#E8E2D6]">
                                    <h4 className="text-[10px] font-black text-[#C5A059] tracking-[0.6em] uppercase flex items-center gap-6">
                                        <History className="w-5 h-5" /> Sanctuary Decrees & Amenities
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {room.amenities?.map((amenity, i) => (
                                            <div key={i} className="p-8 bg-[#FAF9F6] border border-[#E8E2D6] flex items-center gap-6 group hover:border-[#C5A059] transition-all duration-700">
                                                <div className="w-3 h-3 bg-[#C5A059] rounded-full group-hover:scale-125 transition-transform"></div>
                                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#2C1D1A] italic">{amenity}</span>
                                            </div>
                                        ))}
                                        {/* Standard Amenities if none from backend */}
                                        {(!room.amenities || room.amenities.length === 0) && ['Imperial Linen', 'Horizon Terrace', 'Noble Spirits Archive', 'Library Access', 'Full Concierge'].map((item, i) => (
                                            <div key={i} className="p-8 bg-[#FAF9F6] border border-[#E8E2D6] flex items-center gap-6 group hover:border-[#C5A059] transition-all duration-700">
                                                <div className="w-3 h-3 bg-[#C5A059] rounded-full group-hover:scale-125 transition-transform"></div>
                                                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#2C1D1A] italic">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Noble Sidebar: Reservation Portal */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#2C1D1A] p-16 shadow-[0_40px_100px_rgba(0,0,0,0.4)] sticky top-48 border border-[#C5A059]/30 relative overflow-hidden group">
                            {/* Decorative Textures */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10 pointer-events-none"></div>
                            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-[100px]"></div>
                            
                            <div className="relative z-10">
                                <div className="flex flex-col items-center text-center mb-16 space-y-6">
                                    <div className="w-24 h-24 bg-[#C5A059] rounded-full flex items-center justify-center text-[#2C1D1A] shadow-[0_0_40px_rgba(197,160,89,0.3)] mb-4">
                                        <Calendar className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-serif font-black text-white tracking-widest italic leading-none">Summon Royal <br/> Stay</h2>
                                        <p className="text-[9px] text-[#C5A059] font-bold tracking-[0.6em] uppercase mt-6 border-b border-[#C5A059]/30 pb-4 inline-block">The Sovereign Registry</p>
                                    </div>
                                </div>

                                <form onSubmit={handleBookingSubmit} className="space-y-12">
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] ml-2 block">Arrival at Heritage</label>
                                            <div className="relative">
                                                <History className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059] opacity-50" />
                                                <input 
                                                    type="date" 
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    value={bookingData.checkIn}
                                                    onChange={(e) => handleDateChange('checkIn', e.target.value)}
                                                    className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] transition-all outline-none font-bold text-[13px] tracking-[0.3em] uppercase appearance-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] ml-2 block">Departure from Estate</label>
                                            <div className="relative">
                                                <Anchor className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059] opacity-50" />
                                                <input 
                                                    type="date" 
                                                    required
                                                    min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                                                    value={bookingData.checkOut}
                                                    onChange={(e) => handleDateChange('checkOut', e.target.value)}
                                                    className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] transition-all outline-none font-bold text-[13px] tracking-[0.3em] uppercase appearance-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        type="button"
                                        onClick={checkAvailability}
                                        disabled={!bookingData.checkIn || !bookingData.checkOut || availabilityStatus === 'checking'}
                                        className="w-full py-7 bg-transparent border-2 border-[#C5A059] text-[#C5A059] font-black text-[11px] tracking-[0.5em] uppercase hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all duration-700 disabled:opacity-30 relative overflow-hidden group/cons"
                                    >
                                        <span className="relative z-10">{availabilityStatus === 'checking' ? 'Consulting Protocols...' : 'Inscribe in Registry'}</span>
                                        <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover/cons:translate-y-0 transition-transform duration-700"></div>
                                    </button>

                                    {availabilityStatus === 'available' && (
                                        <div className="space-y-12 animate-in fade-in slide-in-from-top-12 duration-1000">
                                            <div className="flex items-center gap-6 justify-center">
                                                <div className="h-px bg-[#C5A059]/30 flex-1"></div>
                                                <div className="text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase flex items-center gap-4">
                                                    <ShieldCheck className="w-4 h-4" /> Vacant
                                                </div>
                                                <div className="h-px bg-[#C5A059]/30 flex-1"></div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="relative group">
                                                    <MapPin className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                                                    <input 
                                                        type="text" 
                                                        placeholder="Distinguished Address" 
                                                        required
                                                        value={bookingData.guestAddress}
                                                        onChange={(e) => setBookingData({...bookingData, guestAddress: e.target.value})}
                                                        className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] outline-none text-[11px] tracking-[0.3em] uppercase font-bold"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <Phone className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                                                    <input 
                                                        type="tel" 
                                                        placeholder="Noble Communication" 
                                                        required
                                                        value={bookingData.guestPhone}
                                                        onChange={(e) => setBookingData({...bookingData, guestPhone: e.target.value})}
                                                        className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] outline-none text-[11px] tracking-[0.3em] uppercase font-bold"
                                                    />
                                                </div>
                                                <div className="relative group">
                                                    <FileText className="absolute left-8 top-8 w-4 h-4 text-[#C5A059]" />
                                                    <textarea 
                                                        placeholder="Special Imperial Requests" 
                                                        rows="4"
                                                        value={bookingData.notes}
                                                        onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                                                        className="w-full pl-16 pr-8 py-8 bg-white/5 border border-white/10 text-white focus:border-[#C5A059] outline-none text-[11px] tracking-[0.3em] uppercase font-bold resize-none"
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="p-10 bg-white/5 border border-[#C5A059]/30 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-[#C5A059]/20"></div>
                                                <div className="space-y-6 relative z-10">
                                                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-[#C5A059] tracking-[0.6em] opacity-60">
                                                        <span>Noble Tribute</span>
                                                        <span>LKR {totalPrice.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-[10px] font-black text-white/40 uppercase tracking-[0.6em]">
                                                        <span>Imperial Levies</span>
                                                        <span className="text-emerald-400">Decreed</span>
                                                    </div>
                                                    <div className="h-px bg-white/10 my-8"></div>
                                                    <div className="flex justify-between items-end">
                                                        <span className="font-serif italic text-white text-xl font-black">Final Sum</span>
                                                        <span className="text-4xl font-serif font-black text-[#C5A059] animate-pulse">LKR {totalPrice.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <button 
                                                type="submit" 
                                                disabled={bookingStatus === 'submitting'}
                                                className="w-full bg-[#C5A059] text-[#2C1D1A] py-8 font-black text-[12px] uppercase tracking-[0.6em] hover:bg-white transition-all duration-700 shadow-[0_20px_60px_#000] flex items-center justify-center gap-6"
                                            >
                                                {bookingStatus === 'submitting' ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                                    <>
                                                        Seal Registry <CreditCard className="w-6 h-6" />
                                                    </>
                                                )}
                                            </button>
                                            
                                            {bookingStatus === 'success' && (
                                                <div className="text-center py-6 bg-emerald-500/10 border border-emerald-500/30">
                                                     <p className="text-emerald-400 font-black text-[10px] tracking-[0.5em] uppercase animate-pulse">
                                                        Registry Recorded. Prepare for arrival.
                                                     </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {availabilityStatus === 'unavailable' && (
                                        <div className="p-10 bg-rose-500/10 border border-rose-500/40 text-rose-400 text-[10px] font-black tracking-[0.3em] uppercase flex items-center gap-6 animate-in shake duration-500">
                                            <AlertCircle className="w-12 h-12 shrink-0" />
                                            The sanctuary is presently occupied during selected times.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RoomDetails;
