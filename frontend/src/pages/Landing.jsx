import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    ChevronRight, Star, MapPin, Phone, Mail, 
    ArrowRight, Check, HelpCircle, ChevronDown,
    Waves, Palmtree, Coffee, ShieldCheck, Crown, Gem, Anchor, Compass,
    Play, Moon, Sun, ArrowDown
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Landing = () => {
    const navigate = useNavigate();
    const [recentRooms, setRecentRooms] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [openFaq, setOpenFaq] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000",
            subtitle: "Imperial Heritage Since 1998",
            title: "Timeless",
            accentTitle: "Opulence",
            desc: "Wander through the whispers of history where the colonial grandeur meets the rhythm of the tides."
        },
        {
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000",
            subtitle: "Sovereign Sanctuary",
            title: "Noble",
            accentTitle: "Comfort",
            desc: "A collection of sanctuaries crafted for the elite, offering a level of grace that transcends eras."
        },
        {
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2000",
            subtitle: "Infinite Horizons",
            title: "Celestial",
            accentTitle: "Vistas",
            desc: "Where the sapphire ocean embraces the ivory shore, creating a symphony of pure maritime elegance."
        }
    ];

    const heritageDestinations = [
        {
            title: "The Dutch Citadel",
            location: "Galle Fort",
            time: "15 Minutes Carriage",
            image: "https://images.unsplash.com/photo-1582234033100-84a12368146a?auto=format&fit=crop&q=80&w=1000",
            desc: "An architectural masterpiece inscribed in history, guarding the southern secrets of Sri Lanka."
        },
        {
            title: "Azure Archipelago",
            location: "Private Bay",
            time: "Immediate Access",
            image: "https://images.unsplash.com/photo-1581456100780-ec6f69e6b3fa?auto=format&fit=crop&q=80&w=1000",
            desc: "Pristine coral gardens and ivory sands, a private refuge reclaimed from the ocean's sovereign grace."
        }
    ];

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

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 7000);
        return () => clearInterval(timer);
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
            
            {/* Hero Section - The Panoramic Carousel */}
            <section className="relative h-[100vh] w-full overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        {/* Background Image with Zooming Effect */}
                        <div className={`absolute inset-0 transform transition-transform duration-[10000ms] ${
                            currentSlide === index ? 'scale-110' : 'scale-100'
                        }`}>
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#2C1D1A]/80 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-[#2C1D1A]/40"></div>
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-20 h-full flex items-center container mx-auto px-6">
                            <div className="max-w-4xl space-y-8">
                                <div className="overflow-hidden">
                                     <div className={`flex items-center gap-4 text-[#C5A059] font-bold tracking-[0.6em] uppercase text-xs transition-all duration-1000 delay-300 ${
                                         currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                     }`}>
                                        <div className="w-12 h-[1px] bg-[#C5A059]"></div>
                                        {slide.subtitle}
                                     </div>
                                </div>

                                <h1 className={`text-7xl md:text-[11rem] font-serif font-black text-white leading-[0.85] tracking-tighter transition-all duration-1000 delay-500 ${
                                    currentSlide === index ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
                                }`}>
                                    {slide.title} <br/>
                                    <span className="italic text-[#C5A059]">{slide.accentTitle}</span>
                                </h1>

                                <p className={`text-xl text-white/80 font-medium max-w-xl leading-relaxed italic transition-all duration-1000 delay-700 ${
                                    currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
                                    "{slide.desc}"
                                </p>

                                <div className={`flex gap-6 pt-10 transition-all duration-1000 delay-[900ms] ${
                                    currentSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
                                    <button 
                                        onClick={() => navigate('/rooms')}
                                        className="group px-12 py-6 bg-[#C5A059] text-[#2C1D1A] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 shadow-2xl flex items-center gap-6"
                                    >
                                        Inspect Estate <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Carousel Indicators - Regal Style */}
                <div className="absolute bottom-16 right-16 z-30 flex items-center gap-8">
                     <div className="flex gap-4">
                        {heroSlides.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-1 transition-all duration-700 ${
                                    currentSlide === i ? 'w-24 bg-[#C5A059]' : 'w-12 bg-white/20 hover:bg-white/40'
                                }`}
                            />
                        ))}
                     </div>
                     <div className="text-white font-serif italic text-2xl font-black">
                        0{currentSlide + 1} <span className="text-sm opacity-40 not-italic font-sans">/ 03</span>
                     </div>
                </div>

                {/* Scroll Prompt */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 animate-bounce opacity-40">
                     <p className="text-[9px] text-white font-black uppercase tracking-[0.5em]">Explore Heritage</p>
                     <ArrowDown className="w-5 h-5 text-[#C5A059]" />
                </div>
            </section>

            {/* The Imperial Philosophy Section */}
            <section className="py-40 bg-white relative">
                 <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FAF9F6] hidden lg:block"></div>
                 <div className="container mx-auto px-6 relative z-10">
                     <div className="grid lg:grid-cols-2 gap-24 items-center">
                         <div className="space-y-12">
                             <div className="flex items-center gap-6">
                                  <div className="p-4 bg-[#2C1D1A] border border-[#C5A059]">
                                      <Crown className="text-[#C5A059] w-8 h-8" />
                                  </div>
                                  <h4 className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-[10px]">The Sovereignty of Taste</h4>
                             </div>
                             <h2 className="text-5xl md:text-8xl font-serif font-black text-[#2C1D1A] leading-tight leading-[0.9]">
                                 A Legacy <br/> 
                                 Inscribed In <br/>
                                 <span className="italic text-[#C5A059]">Service</span>
                             </h2>
                             <p className="text-xl text-[#6D5B57] font-medium leading-relaxed italic border-l-4 border-[#C5A059]/20 pl-10 max-w-xl">
                                 "Since 1998, we have curated not just stays, but historical chronicles. Our stones were laid in an era of grace, and our spirit remains anchored in that noble standard."
                             </p>
                             <div className="grid grid-cols-2 gap-10">
                                  <div className="space-y-4">
                                      <h5 className="font-serif font-black text-2xl italic tracking-tighter">Imperial Cuisine</h5>
                                      <p className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.3em]">Signature Regency Dining</p>
                                  </div>
                                  <div className="space-y-4">
                                      <h5 className="font-serif font-black text-2xl italic tracking-tighter">Noble Well-being</h5>
                                      <p className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.3em]">Royal Spa & Wellness</p>
                                  </div>
                             </div>
                         </div>
                         <div className="relative group">
                              <div className="aspect-[4/5] overflow-hidden shadow-[0_100px_200px_-50px_rgba(44,29,26,0.3)]">
                                  <img 
                                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1500" 
                                    alt="Imperial Suite" 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s]"
                                  />
                              </div>
                              <div className="absolute -bottom-12 -left-12 bg-[#2C1D1A] p-12 shadow-2xl border border-[#C5A059]/30 max-w-xs animate-in slide-in-from-left duration-1000 delay-500">
                                   <p className="text-white text-3xl font-serif italic mb-4 font-black">"Remarkable"</p>
                                   <p className="text-[9px] text-[#C5A059] font-black uppercase tracking-[0.4em] leading-relaxed">The Archive of Elite Travelers, 2024</p>
                              </div>
                         </div>
                     </div>
                 </div>
            </section>

         

            {/* Sanctuaries Collection - The Live Registry */}
            <section className="py-40 bg-[#2C1D1A] relative overflow-hidden">
                {/* Background Texture elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/linen.png')]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center space-y-8 mb-24">
                        <h4 className="text-[#C5A059] font-black uppercase tracking-[0.6em] text-[10px]">The Collection</h4>
                        <h2 className="text-5xl md:text-8xl font-serif font-black text-white leading-none">Select Your Sanctuary</h2>
                        <div className="w-24 h-[1px] bg-[#C5A059] mx-auto opacity-40"></div>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                            {[1,2,3].map(i => (
                                <div key={i} className="h-[600px] bg-white/5 animate-pulse border border-white/10"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                            {recentRooms.map((room) => (
                                <div key={room.id} className="group relative bg-[#FAF9F6]/[0.02] border border-white/10 overflow-hidden hover:border-[#C5A059]/50 transition-all duration-1000 shadow-2xl">
                                    <div className="h-[450px] overflow-hidden relative">
                                        <img 
                                            src={room.image1 || `https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000`} 
                                            alt={room.name}
                                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
                                        />
                                        <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-[#2C1D1A] to-transparent">
                                            <div className="text-[#C5A059] font-black text-xl italic tracking-tighter mb-2">
                                                LKR {room.rate?.toLocaleString()} <span className="text-[9px] uppercase tracking-widest opacity-60 not-italic">/ Night</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-10 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-[#C5A059] uppercase tracking-[0.4em] px-4 py-1 border border-[#C5A059]/20 rounded-full">Imperial Tier</span>
                                            <div className="flex text-[#C5A059]">
                                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                            </div>
                                        </div>
                                        <h3 className="text-4xl font-serif font-black text-white tracking-tighter leading-tight italic">{room.name}</h3>
                                        <p className="text-white/60 text-base italic line-clamp-2 leading-relaxed h-12">
                                            {room.description || "A curated space where luxury resides in every delicate detail."}
                                        </p>
                                        <Link 
                                            to={`/room/${room.id}`}
                                            className="block w-full py-6 bg-white text-[#2C1D1A] font-black text-[10px] uppercase tracking-[0.4em] text-center hover:bg-[#C5A059] transition-all duration-500 shadow-xl"
                                        >
                                            Enter Sanctuary
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials - Voice of Sovereignty */}
            <section className="py-40 bg-[#FAF9F6] border-y border-[#E8E2D6]">
                <div className="container mx-auto px-6">
                    <div className="text-center space-y-8 mb-24">
                        <h4 className="text-[#C5A059] font-black uppercase tracking-[0.5em] text-[10px]">Guest Testaments</h4>
                        <h2 className="text-5xl md:text-7xl font-serif font-black text-[#2C1D1A] italic tracking-tight">The Library of Experiences</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {feedbacks.slice(0, 3).map((f) => (
                            <div key={f.id} className="bg-white border border-[#E8E2D6] p-12 relative group hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                                    <Crown className="w-16 h-16 text-[#2C1D1A]" />
                                </div>
                                <div className="flex gap-1 mb-8">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < f.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#E8E2D6]'}`} />
                                    ))}
                                </div>
                                <p className="text-xl text-[#2C1D1A] italic mb-12 leading-relaxed opacity-90">
                                    "{f.comment}"
                                </p>
                                <div className="flex items-center gap-6 pt-10 border-t border-[#E8E2D6]/50">
                                    <div className="w-14 h-14 bg-[#5D4037] text-[#C5A059] flex items-center justify-center font-bold text-xl shadow-lg">
                                        {f.userName.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-black text-[#2C1D1A] text-lg tracking-tight uppercase italic">{f.userName}</h4>
                                        <p className="text-[8px] text-[#C5A059] font-black uppercase tracking-[0.4em] mt-1">Noble Patron</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Concierge - The Grand Finale */}
            <section className="relative py-60 overflow-hidden">
                <div className="absolute inset-0 bg-[#2C1D1A]">
                    <img 
                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2000" 
                        alt="Final View" 
                        className="w-full h-full object-cover opacity-30 grayscale saturate-0 animate-pulse duration-[10s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-16">
                         <div className="inline-block p-6 border-2 border-[#C5A059] animate-bounce">
                             <Anchor className="text-[#C5A059] w-12 h-12" />
                         </div>
                         <h2 className="text-6xl md:text-[9rem] font-serif font-black text-[#2C1D1A] leading-[0.8] tracking-tighter italic">
                             Begin Your <br/> Chronicle
                         </h2>
                         <p className="text-2xl text-[#2C1D1A] font-medium italic opacity-80 leading-relaxed max-w-2xl mx-auto">
                            "A sanctuary is not a place, but a moment reclamation. We invite you to be part of our enduring history."
                         </p>
                         <div className="flex flex-col md:flex-row justify-center gap-10 pt-10">
                             <button 
                                onClick={() => navigate('/register')}
                                className="px-16 py-8 bg-[#2C1D1A] text-white font-black text-[11px] uppercase tracking-[0.5em] hover:bg-[#C5A059] transition-all duration-500 shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
                             >
                                Register Heritage Profile
                             </button>
                             <button 
                                onClick={() => navigate('/contact')}
                                className="px-16 py-8 bg-transparent border-2 border-[#2C1D1A] text-[#2C1D1A] font-black text-[11px] uppercase tracking-[0.5em] hover:bg-[#2C1D1A] hover:text-white transition-all duration-500"
                             >
                                Summon Concierge
                             </button>
                         </div>
                    </div>
                </div>
            </section>


            <Footer />
        </div>
    );
};

export default Landing;
