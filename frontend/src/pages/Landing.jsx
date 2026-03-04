import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    ChevronRight, Star, MapPin, Phone, Mail, 
    ArrowRight, Check, HelpCircle, ChevronDown,
    Waves, Palmtree, Coffee, ShieldCheck
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import resortHeritage1 from '../assets/resort_heritage_1_1771077225729.jpg';
import resortHeritage2 from '../assets/resort_heritage_2_1771077185789.jpg';
import resortExteriorElite from '../assets/resort_exterior_elite_1771077046898.jpg';
import resortLuxuryPool from '../assets/resort_luxury_pool_2_1771077252585.jpg';

const Landing = () => {
    const navigate = useNavigate();
    const [recentRooms, setRecentRooms] = useState([]);
    const [openFaq, setOpenFaq] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/rooms');
                // Get the last 6 rooms (assuming chronological order by DB)
                const rooms = response.data.slice(-6).reverse();
                setRecentRooms(rooms);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const faqs = [
        {
            q: "What are the check-in and check-out times?",
            a: "Standard check-in is at 2:00 PM and check-out is at 12:00 PM. Early check-in or late check-out can be requested subject to availability."
        },
        {
            q: "Is breakfast included in the room rate?",
            a: "Most of our luxury suites include a complimentary buffet breakfast. Please check your specific room details during booking."
        },
        {
            q: "Do you offer airport transportation?",
            a: "Yes, we provide private luxury airport transfers. You can coordinate this with our concierge after confirming your reservation."
        },
        {
            q: "What is your cancellation policy?",
            a: "Cancellations made 48 hours prior to arrival are free of charge. Late cancellations may incur a one-night stay fee."
        }
    ];

    return (
        <div className="relative min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
            <Header />
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 container mx-auto px-6 z-10">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-50 to-transparent -z-10 opacity-60 pointer-events-none"></div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-in slide-in-from-left-8 duration-700 fade-in-20">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/50 text-cyan-800 text-sm font-black tracking-widest uppercase border border-cyan-100">
                           <Waves className="w-4 h-4" /> 5-Star Coastal Sanctuary
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                            Beyond <br/>
                            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Paradise</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-xl leading-relaxed">
                            Experience world-class luxury where the sky meets the sea. Unforgettable moments crafted for the discerning traveler.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button 
                                onClick={() => navigate('/rooms')}
                                className="group relative px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black overflow-hidden shadow-2xl shadow-cyan-900/20 transition-all hover:shadow-cyan-500/30 hover:-translate-y-1 active:scale-95"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Book Your Sanctuary
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                </span>
                            </button>
                            <button 
                                onClick={() => navigate('/about')}
                                className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-[2rem] font-black hover:border-cyan-500 hover:text-cyan-600 transition-all active:scale-95 shadow-sm"
                            >
                                Our Story
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-6 pt-12">
                             <div className="flex -space-x-4">
                                 {[1,2,3,4].map(i => (
                                     <div key={i} className={`w-12 h-12 rounded-2xl border-4 border-white shadow-sm overflow-hidden bg-slate-200`}>
                                         <img src={`https://i.pravatar.cc/150?u=${i}`} alt="guest" />
                                     </div>
                                 ))}
                                 <div className="w-12 h-12 rounded-2xl border-4 border-white bg-slate-900 text-white flex items-center justify-center text-xs font-black">+2k</div>
                             </div>
                             <div>
                                <div className="flex text-amber-500 mb-1">
                                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Guest Choice</p>
                             </div>
                        </div>
                    </div>
                    
                    <div className="relative h-[600px] hidden lg:block perspective-1000 group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-[4rem] rotate-6 scale-105 blur-3xl opacity-50 group-hover:rotate-12 transition-all duration-1000"></div>
                        <img 
                            src={resortExteriorElite} 
                            alt="Luxury Pool" 
                            className="relative w-full h-full object-cover rounded-[3.5rem] shadow-2xl border-[12px] border-white transform group-hover:-translate-y-4 transition-transform duration-700"
                        />
                        
                        {/* Status Card */}
                        <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-cyan-900/10 border border-slate-50 max-w-xs animate-in slide-in-from-bottom-8 duration-1000 delay-300">
                            <div className="bg-cyan-50 w-12 h-12 rounded-2xl flex items-center justify-center text-cyan-600 mb-4">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-black text-slate-900 mb-2">Safe & Elite</h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">Certified luxury standards with 24/7 private concierge services.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-100/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">
                                <img src={resortHeritage1} alt="Resort 1" className="rounded-[2rem] shadow-xl translate-y-8" />
                                <img src={resortHeritage2} alt="Resort 2" className="rounded-[2rem] shadow-xl -translate-y-8" />
                            </div>
                            
                        </div>
                        <div className="space-y-8 order-1 lg:order-2">
                            <h4 className="text-cyan-600 font-black uppercase tracking-[0.3em] text-sm">Our Heritage</h4>
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">Where Coastal Dreams Meet Modern Luxury</h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Founded in 1998, Ocean View Resort has been the cornerstone of luxury in the region. We combine the raw beauty of the coastline with sophisticated architecture to create an environment of pure serenity.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                        <Palmtree className="text-cyan-500 w-5 h-5" />
                                    </div>
                                    <h5 className="font-black text-slate-900">Pristine Location</h5>
                                    <p className="text-sm text-slate-400 font-medium">Over 500m of private beach access.</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                        <Coffee className="text-cyan-500 w-5 h-5" />
                                    </div>
                                    <h5 className="font-black text-slate-900">Elite Dining</h5>
                                    <p className="text-sm text-slate-400 font-medium">3 Michelin star trained chefs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Rooms Section */}
            <section className="py-32 container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="space-y-4">
                         <h4 className="text-cyan-600 font-black uppercase tracking-[0.3em] text-xs">Exquisite Stays</h4>
                         <h2 className="text-4xl md:text-5xl font-black text-slate-900 capitalize">Most Recent Sanctuaries</h2>
                    </div>
                    <button 
                        onClick={() => navigate('/rooms')}
                        className="group flex items-center gap-3 text-slate-900 font-black hover:text-cyan-600 transition-colors"
                    >
                        View All Collections <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1,2,3].map(i => (
                            <div key={i} className="h-96 bg-slate-100 animate-pulse rounded-[2.5rem]"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {recentRooms.map((room) => (
                            <div key={room.id} className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden hover:shadow-2xl hover:shadow-cyan-900/10 transition-all duration-500">
                                <div className="h-72 overflow-hidden relative">
                                    <img 
                                        src={room.image1 || `https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000`} 
                                        alt={room.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    />
                                    <div className="absolute top-6 right-6">
                                        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/20">
                                            <p className="text-sm font-black text-slate-900">LKR {room.rate?.toLocaleString()}<span className="text-[10px] text-slate-400 uppercase tracking-tighter">/Night</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex text-amber-500">
                                            <Star className="w-3 h-3 fill-current" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Premium Collection</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2 truncate">{room.name}</h3>
                                    <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-6 leading-relaxed">
                                        {room.description || "A masterfully designed space offering unparalleled comfort and breathtaking views."}
                                    </p>
                                    <Link 
                                        to={`/room/${room.id}`}
                                        className="w-full py-4 bg-slate-50 group-hover:bg-slate-900 group-hover:text-white text-slate-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all"
                                    >
                                        Explore Details <ChevronRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Contact Navigation Section */}
            <section className="py-20 relative px-6 overflow-hidden">
                <div className="container mx-auto">
                    <div className="relative bg-slate-900 rounded-[3.5rem] p-12 md:p-24 overflow-hidden group">
                        <div 
                            className="absolute inset-0 opacity-20 group-hover:scale-105 transition-transform duration-[20s] bg-cover bg-center"
                            style={{ backgroundImage: `url(${resortLuxuryPool})` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
                        
                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Excellence Awaits Your Inquiry</h2>
                                <p className="text-slate-400 text-lg font-medium max-w-md">Our dedicated team of luxury consultants is ready to tailor your perfect escape. Reach out for bespoke arrangements.</p>
                                <div className="flex flex-wrap gap-6 pt-4">
                                    <button 
                                        onClick={() => navigate('/contact')}
                                        className="px-10 py-5 bg-cyan-600 text-white rounded-[2rem] font-black hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-600/30 active:scale-95"
                                    >
                                        Speak to Concierge
                                    </button>
                                    <div className="flex items-center gap-4 text-white">
                                        <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Instant Support</p>
                                            <p className="font-black">+94 112 345 678</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden lg:flex justify-end">
                                <div className="w-64 h-64 border-[20px] border-white/5 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 container mx-auto px-6 max-w-5xl">
                <div className="text-center space-y-4 mb-20">
                     <h4 className="text-cyan-600 font-black uppercase tracking-[0.3em] text-xs">Curated Knowledge</h4>
                     <h2 className="text-4xl md:text-5xl font-black text-slate-900">Frequently Asked</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`border transition-all duration-300 rounded-[2rem] cursor-pointer overflow-hidden ${
                                openFaq === index ? 'border-cyan-200 bg-cyan-50/30' : 'border-slate-100 hover:border-slate-200 bg-white'
                            }`}
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        >
                            <div className="p-8 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <HelpCircle className={`w-6 h-6 transition-colors ${openFaq === index ? 'text-cyan-600' : 'text-slate-300'}`} />
                                    <h4 className="text-lg font-black text-slate-900">{faq.q}</h4>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                            </div>
                            <div className={`px-20 overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-10 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Landing;
