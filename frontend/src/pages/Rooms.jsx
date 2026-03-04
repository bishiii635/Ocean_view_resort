import { useState, useEffect } from 'react';
import axios from 'axios';
import { BedDouble, Users, Palmtree, ArrowRight, Star, Wind, Wifi, Coffee, Loader2, Search } from 'lucide-react';
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

    const getCategoryName = (id) => categories.find(c => c.id === id)?.name || 'Standard';

    const filteredRooms = selectedCategory === 'All' 
        ? rooms 
        : rooms.filter(room => getCategoryName(room.roomTypeId) === selectedCategory);

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            
            {/* Header / Filter Section */}
            <div className="pt-32 pb-16 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Our Luxury <span className="text-cyan-600">Sanctuaries</span></h1>
                            <p className="text-lg text-slate-500 max-w-xl">From panoramic ocean views to tropical garden retreats, find the perfect space for your dream vacation.</p>
                        </div>
                        
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-3">
                            {['All', ...categories.map(c => c.name)].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                                        selectedCategory === cat 
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' 
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-900 hover:text-slate-900'
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
            <main className="container mx-auto px-6 py-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold animate-pulse">Designing your stay...</p>
                    </div>
                ) : filteredRooms.length === 0 ? (
                    <div className="text-center py-40">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">No Rooms Found</h3>
                        <p className="text-slate-500">Try adjusting your filters to find your perfect match.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredRooms.map((room) => (
                            <div key={room.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500">
                                {/* Image Box */}
                                <div className="relative h-72 overflow-hidden">
                                    <img 
                                        src={room.image1 || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                                        alt={room.name} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                                            {getCategoryName(room.roomTypeId)}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        {room.status === 'AVAILABLE' ? (
                                            <span className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                                        ) : (
                                            <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-full">BOOKED</span>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <div className="text-white">
                                            <p className="text-sm font-medium mb-1">Starts from</p>
                                            <p className="text-2xl font-black">LKR {room.rate?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Box */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-black text-slate-900 leading-tight flex-1">{room.name}</h3>
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <Star className="w-4 h-4 fill-amber-500" />
                                            <span className="text-sm font-bold text-slate-700">5.0</span>
                                        </div>
                                    </div>

                               

                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 italic">
                                        {room.description || "Indulge in the ultimate coastal luxury. This room offers premium comfort, modern elegant decor, and a serene atmosphere for a perfect island getaway."}
                                    </p>

                                    <div className="mt-auto pt-4 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pricing</span>
                                            <span className="text-lg font-black text-slate-900">LKR {room.rate?.toLocaleString()}<span className="text-sm text-slate-400 font-medium">/night</span></span>
                                        </div>
                                        <Link to={`/room/${room.id}`} className="group/btn flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-cyan-600 transition-all shadow-lg shadow-slate-200">
                                            View Room
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
