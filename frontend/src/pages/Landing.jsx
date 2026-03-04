import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    ChevronRight, Star, MapPin, Phone, Mail, 
    ArrowRight, Check, HelpCircle, ChevronDown,
    Waves, Palmtree, Coffee, ShieldCheck, Crown, Gem, Anchor, Compass
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
    const [feedbacks, setFeedbacks] = useState([]);
    const [openFaq, setOpenFaq] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const [roomsRes, feedbacksRes] = await Promise.all([
                    axios.get('http://localhost:8080/api/rooms'),
                    axios.get('http://localhost:8080/api/feedbacks/approved')
                ]);
                setRecentRooms(roomsRes.data.slice(-6).reverse());
                setFeedbacks(feedbacksRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const faqs = [
        {
            q: "How do I secure my royal suite?",
            a: "Reservations can be made through our digital concierge. A royal welcome awaits upon your arrival."
        },
        {
            q: "Are the culinary experiences included?",
            a: "Our signature breakfast heritage is included with all elite sanctuaries. Private dining can be arranged as well."
        },
        {
            q: "Do you arrange private transport?",
            a: "Yes, we provide luxury fleet services from the international ports. Simply coordinate with your concierge."
        },
        {
            q: "What is the policy for journey alterations?",
            a: "We understand plans may change. Alterations made 72 hours prior to arrival are handled with royal grace."
        }
    ];

    return (
        <div className="relative min-h-screen bg-[#FAF9F6] text-[#2C1D1A] overflow-x-hidden font-sans">
            <Header />
            
            {/* Hero Section - The Grand Entrance */}
            <section className="relative pt-48 pb-36 container mx-auto px-6 z-10">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E8E2D6]/30 -z-10 blur-3xl pointer-events-none"></div>
                
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10 animate-in slide-in-from-left-8 duration-1000">
                        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-none bg-[#5D4037] text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase border border-[#C5A059]/30">
                           <Crown className="w-4 h-4" /> Established Heritage 1998
                        </div>
                        <h1 className="text-6xl md:text-9xl font-serif font-black tracking-tight text-[#2C1D1A] leading-[0.85]">
                            Timeless <br/>
                            <span className="italic text-[#C5A059]">Opulence</span>
                        </h1>
                        <p className="text-xl text-[#6D5B57] font-medium max-w-xl leading-relaxed italic">
                            "Where the whispers of the ocean meet the grandeur of colonial luxury. A sanctuary crafted for those who seek the extraordinary."
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 pt-6 font-bold tracking-[0.2em] uppercase text-xs">
                            <button 
                                onClick={() => navigate('/rooms')}
                                className="px-12 py-6 bg-[#5D4037] text-white rounded-none hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl shadow-black/20 flex items-center gap-4 group"
                            >
                                Enter The Sanctuaries
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                            </button>
                            <button 
                                onClick={() => navigate('/about')}
                                className="px-12 py-6 bg-transparent text-[#5D4037] border-2 border-[#5D4037] rounded-none hover:bg-[#5D4037] hover:text-white transition-all duration-500"
                            >
                                Our Heritage
                            </button>
                        </div>
                        
                        <div className="flex items-center gap-8 pt-12 border-t border-[#E8E2D6] w-fit">
                             <div className="flex -space-x-3">
                                 {[1,2,3,4].map(i => (
                                     <div key={i} className={`w-14 h-14 rounded-full border-4 border-[#FAF9F6] shadow-md overflow-hidden bg-slate-200 grayscale hover:grayscale-0 transition-all duration-500`}>
                                         <img src={`https://i.pravatar.cc/150?u=vintage${i}`} alt="noble guest" />
                                     </div>
                                 ))}
                             </div>
                             <div>
                                <div className="flex text-[#C5A059] mb-1">
                                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                </div>
                                <p className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.3em]">Noble Guest Circle</p>
                             </div>
                        </div>
                    </div>
                    
                    <div className="relative h-[700px] hidden lg:block group">
                        <div className="absolute inset-0 border-2 border-[#C5A059] translate-x-8 translate-y-8 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-700"></div>
                        <div className="relative w-full h-full overflow-hidden shadow-2xl flex items-center justify-center">
                            <img 
                                src={resortExteriorElite} 
                                alt="The Grand Estate" 
                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-[#2C1D1A]/20 transition-opacity group-hover:opacity-0"></div>
                        </div>
                        
                        {/* Elite Badge */}
                        <div className="absolute -bottom-10 -left-10 bg-[#5D4037] p-10 rounded-none shadow-2xl border border-[#C5A059]/30 max-w-xs transition-transform group-hover:-translate-y-4">
                            <Gem className="text-[#C5A059] w-8 h-8 mb-6" />
                            <h4 className="text-xl font-serif font-bold text-white mb-3 tracking-wide">Elite Distinction</h4>
                            <p className="text-xs text-[#E3C184] font-medium leading-relaxed tracking-wider uppercase">Voted the premier coastal heritage resort for two decades.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Heritage Section - Our Story */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E8E2D6]"></div>
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="pt-20">
                                    <img src={resortHeritage1} alt="Colonial Hall" className="shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border-8 border-white" />
                                </div>
                                <div>
                                    <img src={resortHeritage2} alt="Vista View" className="shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 border-8 border-white" />
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#C5A059]/5 blur-3xl"></div>
                        </div>
                        <div className="space-y-10 order-1 lg:order-2">
                            <div className="w-16 h-[2px] bg-[#C5A059]"></div>
                            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-xs">Our Royal Legacy</h4>
                            <h2 className="text-5xl md:text-7xl font-serif font-black text-[#2C1D1A] leading-tight">Crafting Memories Since 1998</h2>
                            <p className="text-lg text-[#6D5B57] font-medium leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:text-[#C5A059] first-letter:mr-2">
                                For over a quarter century, Ocean View Resort has stood as a beacon of luxury. Our architecture breathes history, and our service reflects the grace of a bygone era. Every room, every corridor, every stone tells a story of elegance.
                            </p>
                            <div className="grid grid-cols-2 gap-12 pt-6">
                                <div className="space-y-4 group">
                                    <Anchor className="text-[#C5A059] w-6 h-6 transition-transform group-hover:-rotate-12" />
                                    <h5 className="font-serif font-bold text-xl text-[#2C1D1A]">Noble Location</h5>
                                    <p className="text-xs text-[#8D6E63] font-bold uppercase tracking-widest leading-loose">Deep harbor views and private ivory sands.</p>
                                </div>
                                <div className="space-y-4 group">
                                    <Compass className="text-[#C5A059] w-6 h-6 transition-transform group-hover:rotate-12" />
                                    <h5 className="font-serif font-bold text-xl text-[#2C1D1A]">Master Culinarians</h5>
                                    <p className="text-xs text-[#8D6E63] font-bold uppercase tracking-widest leading-loose">Authentic recipes passed through noble hands.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sanctuaries Section - Rooms */}
            <section className="py-40 container mx-auto px-6 bg-[#FAF9F6]">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24 border-b border-[#E8E2D6] pb-12">
                    <div className="space-y-6">
                         <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-xs">The Collection</h4>
                         <h2 className="text-5xl md:text-6xl font-serif font-black text-[#2C1D1A]">Select Your Sanctuary</h2>
                    </div>
                    <button 
                        onClick={() => navigate('/rooms')}
                        className="group flex items-center gap-4 text-[#5D4037] font-bold text-xs uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors mb-1"
                    >
                        View Full Estate <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[1,2,3].map(i => (
                            <div key={i} className="h-[500px] bg-[#E8E2D6]/20 animate-pulse border border-[#E8E2D6]"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {recentRooms.map((room) => (
                            <div key={room.id} className="group relative bg-white border border-[#E8E2D6] overflow-hidden hover:border-[#C5A059] transition-all duration-700 hover:shadow-2xl">
                                <div className="h-[400px] overflow-hidden relative">
                                    <img 
                                        src={room.image1 || `https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000`} 
                                        alt={room.name}
                                        className="w-full h-full object-cover group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" 
                                    />
                                    <div className="absolute top-0 right-0 bg-[#5D4037] text-[#C5A059] px-6 py-3 font-bold text-xs tracking-widest uppercase">
                                        LKR {room.rate?.toLocaleString()} <span className="text-[8px] opacity-60">/ Evening</span>
                                    </div>
                                </div>
                                <div className="p-10 text-center">
                                    <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.4em] mb-4 block">Royal Collection</span>
                                    <h3 className="text-3xl font-serif font-bold text-[#2C1D1A] mb-4">{room.name}</h3>
                                    <p className="text-[#6D5B57] text-sm font-medium line-clamp-2 mb-8 leading-relaxed italic">
                                        {room.description || "A curated space where luxury resides in every detail, offering views that transcend the ordinary."}
                                    </p>
                                    <Link 
                                        to={`/room/${room.id}`}
                                        className="inline-block px-10 py-5 bg-[#5D4037] text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#2C1D1A] transition-all duration-500 w-full"
                                    >
                                        Inspect Sanctuary
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Testimonials Section - Experiences */}
            <section className="py-40 bg-[#2C1D1A] overflow-hidden relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 border border-[#C5A059]/10 rounded-full"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 border border-[#C5A059]/10 rounded-full"></div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="space-y-6 mb-24">
                        <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.5em] text-xs">Royal Testaments</h4>
                        <h2 className="text-5xl md:text-7xl font-serif font-black text-white italic">Voices of Excellence</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {feedbacks.length > 0 ? (
                            feedbacks.slice(0, 3).map((f) => (
                                <div key={f.id} className="bg-white/[0.03] border border-white/10 p-12 relative group hover:bg-white/[0.07] transition-all duration-700">
                                    <Star className="absolute top-10 right-10 w-12 h-12 text-white/5" />
                                    <div className="flex justify-center gap-1 mb-10">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < f.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-white/10'}`} />
                                        ))}
                                    </div>
                                    <p className="text-lg text-white font-medium italic mb-12 leading-relaxed opacity-90">
                                        "{f.comment}"
                                    </p>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-[#5D4037] text-[#C5A059] rounded-none border border-[#C5A059]/20 flex items-center justify-center font-bold text-2xl">
                                            {f.userName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-serif font-bold text-white text-xl tracking-wide">{f.userName}</h4>
                                            <p className="text-[8px] text-[#C5A059] font-bold uppercase tracking-[0.3em] mt-2 border-t border-[#C5A059]/30 pt-2 text-center">Distinguished Guest</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-24 bg-white/[0.02] border border-white/5">
                                <p className="text-white/40 text-lg font-medium italic tracking-widest uppercase">The library of experiences is awaiting your entry.</p>
                                <Link to="/feedbacks" className="inline-block mt-10 text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors">Record Your Story</Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Concierge Navigation Section - Contact */}
            <section className="py-40 relative px-6 bg-white overflow-hidden">
                <div className="container mx-auto">
                    <div className="relative border-4 border-[#C5A059]/20 p-2 lg:p-4">
                        <div className="relative bg-[#FAF9F6] p-16 md:p-32 overflow-hidden group border border-[#C5A059]/40">
                            <div 
                                className="absolute inset-0 opacity-5 grayscale group-hover:scale-105 transition-transform duration-[30s] bg-cover bg-center"
                                style={{ backgroundImage: `url(${resortLuxuryPool})` }}
                            ></div>
                            
                            <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                                <h2 className="text-5xl md:text-8xl font-serif font-black text-[#2C1D1A] leading-tight max-w-4xl italic">Your Royal Escapade Awaits Your Call</h2>
                                <p className="text-[#6D5B57] text-xl font-medium max-w-2xl leading-relaxed">Our master of ceremonies and private consultants are at your disposal. Let us curate your journey to the finest detail.</p>
                                
                                <div className="flex flex-col md:flex-row gap-8 items-center pt-8">
                                    <button 
                                        onClick={() => navigate('/contact')}
                                        className="px-16 py-7 bg-[#5D4037] text-white font-bold text-xs uppercase tracking-[0.4em] hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl"
                                    >
                                        Summon Concierge
                                    </button>
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-[0.3em] mb-1">Direct Line</p>
                                            <p className="text-xl font-serif font-bold text-[#2C1D1A]">Noble-94 112 345 678</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Section - FAQ */}
            <section className="py-40 bg-[#FAF9F6] border-t border-[#E8E2D6]">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center space-y-6 mb-24">
                         <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.5em] text-xs">Royal Protocols</h4>
                         <h2 className="text-5xl md:text-6xl font-serif font-black text-[#2C1D1A]">Curated Knowledge</h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index} 
                                className={`border-b transition-all duration-500 bg-white shadow-sm ${
                                    openFaq === index ? 'border-[#C5A059]' : 'border-[#E8E2D6]'
                                }`}
                            >
                                <div 
                                    className="p-10 flex items-center justify-between cursor-pointer group"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <div className="flex items-center gap-6">
                                        <HelpCircle className={`w-5 h-5 transition-colors ${openFaq === index ? 'text-[#C5A059]' : 'text-[#8D6E63] group-hover:text-[#C5A059]'}`} />
                                        <h4 className="text-xl font-serif font-bold text-[#2C1D1A] tracking-wide">{faq.q}</h4>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-[#8D6E63] transition-transform duration-500 ${openFaq === index ? 'rotate-180 text-[#C5A059]' : ''}`} />
                                </div>
                                <div className={`overflow-hidden transition-all duration-700 bg-[#FAF9F6]/50 ${openFaq === index ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-24 pb-12">
                                        <p className="text-[#6D5B57] font-medium leading-[2] text-lg italic border-l-2 border-[#C5A059] pl-8">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Landing;
