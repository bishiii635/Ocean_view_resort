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
            <section className="relative pt-52 pb-40 overflow-hidden bg-[#2C1D1A]">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroBg} 
                        className="w-full h-full object-cover opacity-20 scale-105"
                        alt="Colonial Heritage"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2C1D1A]/90 via-[#2C1D1A]/60 to-[#2C1D1A]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-6 px-10 py-3 bg-white/5 border border-[#C5A059]/30 backdrop-blur-sm">
                            <Crown className="w-5 h-5 text-[#C5A059]" />
                            <span className="text-[#C5A059] font-bold text-[11px] uppercase tracking-[0.6em]">The Imperial Anthology</span>
                        </div>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-black text-white mb-8 tracking-tighter leading-none italic animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        Noble <br/> <span className="text-[#C5A059]">Sanctuaries</span>
                    </h1>
                    <p className="text-xl text-[#E3C184] max-w-2xl mx-auto font-medium italic opacity-80 border-t border-[#C5A059]/20 pt-8">
                        "Explore our masterfully curated chambers, each offering a distinct heritage and unparalleled vista of the southern horizon."
                    </p>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                    <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#C5A059]"></div>
                    <Compass className="w-6 h-6 text-[#C5A059] animate-spin-slow" />
                </div>
            </section>

            {/* Main Content Area with Side Registry */}
            <main className="container mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-12 gap-16">
                    
                    {/* Side Registry (Categories) */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-40 space-y-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-[#C5A059]">
                                    <Sparkles className="w-5 h-5" />
                                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] italic">Archive Index</h2>
                                </div>
                                <div className="h-px bg-[#E8E2D6]"></div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {['All', ...categories.map(c => c.name)].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`group flex items-center justify-between px-8 py-5 text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 border-l-[3px] text-left ${
                                            selectedCategory === cat 
                                            ? 'bg-[#2C1D1A] text-white border-[#C5A059] shadow-xl translate-x-3' 
                                            : 'bg-white text-[#8D6E63] border-transparent hover:bg-[#FAF9F6] hover:text-[#2C1D1A] hover:border-[#E8E2D6] hover:translate-x-2'
                                        }`}
                                    >
                                        <span>{cat}</span>
                                        <ArrowRight className={`w-3 h-3 transition-transform duration-500 ${selectedCategory === cat ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-40 group-hover:translate-x-0'}`} />
                                    </button>
                                ))}
                            </div>

                            <div className="p-10 bg-[#2C1D1A] text-center space-y-6 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
                                <h4 className="text-white font-serif italic text-lg relative z-10">Noble Support</h4>
                                <p className="text-[#C5A059] text-[9px] font-bold tracking-widest uppercase opacity-70 relative z-10">For Bespoke Requests</p>
                                <Link to="/contact" className="inline-block w-full py-4 border border-[#C5A059]/30 text-[#C5A059] text-[9px] font-bold uppercase tracking-widest hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all relative z-10">
                                    Consult Concierge
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Room Grid - Main Gallery */}
                    <div className="lg:col-span-9">
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
                                <p className="text-[#8D6E63] font-medium italic text-lg">Adjust your selection from the Archive Index.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {filteredRooms.map((room) => (
                                    <div key={room.id} className="group bg-white border border-[#E8E2D6] hover:border-[#C5A059] transition-all duration-1000 hover:shadow-[0_40px_100px_-20px_rgba(44,29,26,0.15)] relative overflow-hidden">
                                        {/* Image Archive */}
                                        <div className="relative h-[480px] overflow-hidden">
                                            <img 
                                                src={room.image1 || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                                                alt={room.name} 
                                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out"
                                            />
                                            
                                            {/* Status Badge */}
                                            <div className="absolute top-8 left-8">
                                                <div className="bg-[#2C1D1A]/90 backdrop-blur-md text-[#C5A059] px-5 py-2 text-[8px] font-black tracking-[0.4em] uppercase border border-[#C5A059]/30">
                                                    {getCategoryName(room.roomTypeId)}
                                                </div>
                                            </div>

                                            {/* Price Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2C1D1A] to-transparent p-10 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                                                <div className="space-y-4">
                                                    <p className="text-3xl font-serif font-black text-white italic">LKR {room.rate?.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Scroll */}
                                        <div className="p-10 space-y-8 relative">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-3xl font-serif font-black text-[#2C1D1A] mb-2 group-hover:text-[#C5A059] transition-colors duration-700 leading-tight italic">{room.name}</h3>
                                                    <div className="flex items-center gap-3">
                                                        <MapPin className="w-3 h-3 text-[#C5A059]" />
                                                        <p className="text-[9px] text-[#8D6E63] font-bold uppercase tracking-widest italic">Imperial Wing</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[9px] font-black text-[#C5A059] uppercase tracking-[0.4em] block mb-1">Twilight Fee</span>
                                                    <span className="text-xl font-serif font-black text-[#2C1D1A] italic">LKR {room.rate?.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            <p className="text-[#6D5B57] text-base leading-[1.8] line-clamp-2 italic font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                                {room.description || "A masterfully curated sanctuary offering colonial grandeur paired with the soul of the southern coast."}
                                            </p>

                                            <Link 
                                                to={`/room/${room.id}`} 
                                                className="w-full py-5 bg-[#2C1D1A] text-white font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 shadow-xl flex items-center justify-center gap-4 group/btn"
                                            >
                                                Inspect Sanctuary <Sparkles className="w-3 h-3 group-hover/btn:rotate-12 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
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
