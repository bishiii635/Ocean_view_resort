import { useState, useEffect } from 'react';
import axios from 'axios';
import { BedDouble, Users, Palmtree, ArrowRight, Star, Wind, Wifi, Coffee, Loader2, Search, Crown, Gem, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

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
        <div className="min-h-screen bg-[#FAF9F6]">
            <Header />
            
            {/* Header / Filter Section */}
            <div className="pt-48 pb-20 bg-white border-b border-[#E8E2D6] relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FAF9F6] rounded-full"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 text-[#C5A059] font-bold text-[10px] tracking-[0.4em] uppercase">
                                <Crown className="w-4 h-4" /> Reserved Sanctuaries
                            </div>
                            <h1 className="text-6xl md:text-8xl font-serif font-black text-[#2C1D1A] tracking-tighter">The Imperial <span className="italic text-[#C5A059]">Collection</span></h1>
                            <p className="text-xl text-[#6D5B57] max-w-2xl font-medium leading-relaxed italic">Explore our masterfully curated chambers, each offering a distinct heritage and unparalleled vista of the ivory coast.</p>
                        </div>
                        
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-4">
                            {['All', ...categories.map(c => c.name)].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-10 py-4 rounded-none text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-500 border ${
                                        selectedCategory === cat 
                                        ? 'bg-[#5D4037] text-white border-[#5D4037] shadow-2xl' 
                                        : 'bg-transparent text-[#8D6E63] border-[#E8E2D6] hover:border-[#5D4037] hover:text-[#5D4037]'
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
            <main className="container mx-auto px-6 py-32">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="w-12 h-12 text-[#C5A059] animate-spin mb-6" />
                        <p className="text-[#8D6E63] font-bold tracking-[0.3em] uppercase text-xs animate-pulse">Consulting the Estate Records...</p>
                    </div>
                ) : filteredRooms.length === 0 ? (
                    <div className="text-center py-40 bg-white border border-[#E8E2D6]">
                        <div className="w-24 h-24 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#E8E2D6]">
                            <Compass className="w-10 h-10 text-[#C5A059]" />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-[#2C1D1A] mb-4 tracking-wide">No Sanctuaries Available</h3>
                        <p className="text-[#8D6E63] font-medium italic">Adjust your category preference to discover our other legacy chambers.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {filteredRooms.map((room) => (
                            <div key={room.id} className="group bg-white border border-[#E8E2D6] overflow-hidden hover:border-[#C5A059] transition-all duration-700 hover:shadow-2xl">
                                {/* Image Box */}
                                <div className="relative h-[450px] overflow-hidden">
                                    <img 
                                        src={room.image1 || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                                        alt={room.name} 
                                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                    />
                                    <div className="absolute top-0 left-0 bg-[#5D4037] text-white px-6 py-3 text-[9px] font-bold tracking-[0.3em] uppercase">
                                        {getCategoryName(room.roomTypeId)}
                                    </div>
                                    <div className="absolute top-10 right-10">
                                        {room.status === 'AVAILABLE' ? (
                                            <div className="w-4 h-4 bg-[#C5A059] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.8)]"></div>
                                        ) : (
                                            <span className="px-4 py-1.5 bg-[#C5A059] text-[#2C1D1A] text-[9px] font-bold tracking-[0.2em] uppercase">Reserved</span>
                                        )}
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2C1D1A]/80 to-transparent p-10 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                                        <div className="text-[#C5A059] font-bold uppercase tracking-[0.2em] text-[10px] mb-2 font-serif">Valuation</div>
                                        <p className="text-3xl font-serif font-black text-white">LKR {room.rate?.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Content Box */}
                                <div className="p-12">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-3xl font-serif font-bold text-[#2C1D1A] group-hover:text-[#C5A059] transition-colors duration-500">{room.name}</h3>
                                        <div className="flex items-center gap-2 text-[#C5A059]">
                                            <Gem className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <p className="text-[#6D5B57] text-sm leading-relaxed mb-10 line-clamp-3 italic font-medium">
                                        {room.description || "A legacy sanctuary offering the finest colonial architecture paired with modern elegance. Experience the pinnacle of island living."}
                                    </p>

                                    <div className="flex items-center justify-between pt-8 border-t border-[#E8E2D6]">
                                        <div>
                                            <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] block mb-1">Evening Rate</span>
                                            <span className="text-xl font-serif font-bold text-[#2C1D1A]">LKR {room.rate?.toLocaleString()}</span>
                                        </div>
                                        <Link to={`/room/${room.id}`} className="px-8 py-4 bg-[#5D4037] text-white font-bold text-[9px] tracking-[0.3em] uppercase hover:bg-[#2C1D1A] transition-all duration-500 flex items-center gap-3">
                                            Enter Sanctuary
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Rooms;
