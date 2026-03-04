import { useState, useEffect } from 'react';
import axios from 'axios';
import { BedDouble, Users, Palmtree, ArrowRight, Star, Wind, Wifi, Coffee, Loader2, Search, Crown, Gem, Compass, Sparkles, Waves, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Theme Image
    const heroBg = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000"; // Luxury Hotel Exterior

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [roomsRes, catsRes] = await Promise.all([
                axios.get('http://localhost:8080/api/rooms'),
                axios.get('http://localhost:8080/api/room-types')
            ]);
            setRooms(roomsRes.data);
            setCategories(catsRes.data);
        } catch (err) {
            console.error('Error fetching rooms', err);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryName = (id) => categories.find(c => c.id === id)?.name || 'Heritage';

    const filteredRooms = selectedCategory === 'All' 
        ? rooms 
        : rooms.filter(room => getCategoryName(room.roomTypeId) === selectedCategory);

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans">
            <Header />
            
            {/* Cinematic Hero Section */}
            <section className="relative pt-64 pb-52 overflow-hidden bg-[#2C1D1A]">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroBg} 
                        className="w-full h-full object-cover opacity-20 scale-105"
                        alt="Colonial Heritage"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2C1D1A]/90 via-[#2C1D1A]/60 to-[#2C1D1A]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="flex justify-center mb-10">
                        <div className="inline-flex items-center gap-6 px-10 py-3 bg-white/5 border border-[#C5A059]/30 backdrop-blur-sm">
                            <Crown className="w-5 h-5 text-[#C5A059]" />
                            <span className="text-[#C5A059] font-bold text-[11px] uppercase tracking-[0.6em]">The Imperial Anthology</span>
                        </div>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-serif font-black text-white mb-10 tracking-tighter leading-none italic animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        Noble <br/> <span className="text-[#C5A059]">Sanctuaries</span>
                    </h1>
                    <p className="text-2xl text-[#E3C184] max-w-2xl mx-auto font-medium italic opacity-80 border-t border-[#C5A059]/20 pt-10">
                        "Explore our masterfully curated chambers, each offering a distinct heritage and unparalleled vista of the southern horizon."
                    </p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                    <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C5A059]"></div>
                    <Compass className="w-6 h-6 text-[#C5A059] animate-spin-slow" />
                </div>
            </section>

            {/* Selection & Filters */}
            <div className="bg-white border-b border-[#E8E2D6] py-16 sticky top-24 z-40 shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                        <div className="flex items-center gap-6">
                            <Sparkles className="text-[#C5A059] w-6 h-6" />
                            <h2 className="text-xl font-serif font-black text-[#2C1D1A] uppercase tracking-widest italic">Inventory Registry</h2>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                            {['All', ...categories.map(c => c.name)].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-10 py-4 text-[10px] font-bold tracking-[0.4em] uppercase transition-all duration-700 border-2 ${
                                        selectedCategory === cat 
                                        ? 'bg-[#2C1D1A] text-white border-[#2C1D1A] shadow-xl' 
                                        : 'bg-transparent text-[#8D6E63] border-[#E8E2D6] hover:border-[#2C1D1A] hover:text-[#2C1D1A]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Room Grid */}
            <main className="container mx-auto px-6 py-40">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="w-16 h-16 text-[#C5A059] animate-spin mb-8" />
                        <p className="text-[#C5A059] font-bold tracking-[0.5em] uppercase text-[10px] animate-pulse">Consulting the Grand Registry...</p>
                    </div>
                ) : filteredRooms.length === 0 ? (
                    <div className="text-center py-40 bg-white border border-[#E8E2D6] shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FAF9F6] border-b border-l border-[#E8E2D6] rounded-full"></div>
                        <div className="w-24 h-24 bg-[#FAF9F6] border border-[#E8E2D6] flex items-center justify-center mx-auto mb-10 shadow-inner">
                            <Compass className="w-10 h-10 text-[#C5A059]" />
                        </div>
                        <h3 className="text-4xl font-serif font-black text-[#2C1D1A] mb-4 tracking-tighter">Inventory Vacant</h3>
                        <p className="text-[#8D6E63] font-medium italic text-lg">Adjust your category preference to discover other noble chambers.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                        {filteredRooms.map((room) => (
                            <div key={room.id} className="group bg-white border border-[#E8E2D6] hover:border-[#C5A059] transition-all duration-1000 hover:shadow-[0_40px_100px_-20px_rgba(44,29,26,0.15)] relative overflow-hidden">
                                {/* Image Archive */}
                                <div className="relative h-[550px] overflow-hidden">
                                    <img 
                                        src={room.image1 || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                                        alt={room.name} 
                                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                    />
                                    
                                    {/* Status Badge */}
                                    <div className="absolute top-10 left-10">
                                        <div className="bg-[#2C1D1A]/90 backdrop-blur-md text-[#C5A059] px-6 py-2 text-[8px] font-black tracking-[0.5em] uppercase border border-[#C5A059]/30">
                                            {getCategoryName(room.roomTypeId)} Suite
                                        </div>
                                    </div>

                                    {/* Availability Dot */}
                                    <div className="absolute top-10 right-10">
                                        {room.status === 'AVAILABLE' ? (
                                            <div className="w-4 h-4 bg-[#C5A059] rounded-full shadow-[0_0_20px_#C5A059]"></div>
                                        ) : (
                                            <div className="px-5 py-1.5 bg-[#C5A059] text-[#2C1D1A] text-[8px] font-black tracking-[0.2em] uppercase">Reserved</div>
                                        )}
                                    </div>

                                    {/* Price Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2C1D1A] to-transparent p-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-[#C5A059] text-[9px] font-black tracking-[0.4em] uppercase">
                                                <Gem className="w-3 h-3" />
                                                Heritage Valuation
                                            </div>
                                            <p className="text-4xl font-serif font-black text-white italic">LKR {room.rate?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Scroll */}
                                <div className="p-14 space-y-10 relative">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-4xl font-serif font-black text-[#2C1D1A] mb-4 group-hover:text-[#C5A059] transition-colors duration-700 leading-tight italic">{room.name}</h3>
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-3 h-3 text-[#C5A059]" />
                                                <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-widest italic">Primary Ocean Wing</p>
                                            </div>
                                        </div>
                                        <Crown className="w-6 h-6 text-[#C5A059] opacity-20 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>

                                    <p className="text-[#6D5B57] text-lg leading-[2] line-clamp-3 italic font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                        {room.description || "A masterfully curated sanctuary offering colonial grandeur paired with the soul of the southern coast. Every detail has been meticulously preserved for the distinguished traveler."}
                                    </p>

                                    <div className="flex items-center justify-between pt-10 border-t border-[#E8E2D6]">
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-black text-[#8D6E63] uppercase tracking-[0.4em] block">Nightly Fee</span>
                                            <span className="text-2xl font-serif font-black text-[#2C1D1A] italic">LKR {room.rate?.toLocaleString()}</span>
                                        </div>
                                        <Link 
                                            to={`/room/${room.id}`} 
                                            className="px-10 py-5 bg-[#2C1D1A] text-white font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 shadow-xl flex items-center gap-4 group/btn"
                                        >
                                            Inspect <Sparkles className="w-3 h-3 group-hover/btn:rotate-12 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* Decorative Border */}
                                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#C5A059]/20 translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-1000"></div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Noble CTA */}
            <section className="py-40 bg-white border-t border-[#E8E2D6] relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-6xl md:text-8xl font-serif font-black text-[#2C1D1A] mb-12 italic tracking-tighter">Bespoke <br/> <span className="text-[#C5A059]">Arrangements</span></h2>
                    <p className="text-[#6D5B57] text-2xl font-medium max-w-3xl mx-auto italic mb-16 opacity-80">
                        "Should you require a customized sanctuary or multiple registrations, our Grand Concierge is at your absolute disposal."
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-6 px-16 py-8 bg-[#2C1D1A] text-white font-bold text-[11px] tracking-[0.5em] uppercase hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 shadow-2xl">
                        Consult Concierge <Waves className="w-5 h-5" />
                    </Link>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30 pointer-events-none"></div>
            </section>

            <Footer />
        </div>
    );
};

export default Rooms;
