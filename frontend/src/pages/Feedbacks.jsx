import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, Send, MessageCircle, Quote, Crown, Gem, Sparkles, Loader2, Anchor, Compass } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Feedbacks = () => {
    const { user } = useAuth();
    const [feedbacks, setFeedbacks] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Premium Unsplash Images for Luxury Vintage Theme
    const heroBg = "https://images.unsplash.com/photo-1544274411-a7af60931eb1?auto=format&fit=crop&q=80&w=2000"; // Vintage writing book/desk
    const formDecoration = "https://images.unsplash.com/photo-1512418490979-92798ccc1380?auto=format&fit=crop&q=80&w=1000"; // Vintage keys/decor

    useEffect(() => {
        fetchApprovedFeedbacks();
    }, []);

    const fetchApprovedFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/feedbacks/approved');
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        setSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:8080/api/feedbacks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    userName: user.name,
                    comment,
                    rating,
                }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Eternal gratitude. Your testament has been recorded and awaits imperial review.' });
                setComment('');
                setRating(5);
            } else {
                setMessage({ type: 'error', text: 'The registry failed to record your decree. Please attempt again.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'A technical discrepancy has occurred within the archives.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] font-sans">
            <Header />
            
            {/* Hero Section - The Archive of Memories */}
            <div className="pt-64 pb-52 bg-[#2C1D1A] text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroBg} 
                        className="w-full h-full object-cover opacity-10 scale-125 grayscale rotate-3"
                        alt="Heritage Desk"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2C1D1A]/90 via-[#2C1D1A]/60 to-[#2C1D1A]"></div>
                </div>
                
                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="flex justify-center mb-10">
                        <div className="inline-flex items-center gap-6 px-10 py-3 bg-white/5 border border-[#C5A059]/30 backdrop-blur-sm">
                            <Compass className="w-5 h-5 text-[#C5A059] animate-spin-slow" />
                            <span className="text-[#C5A059] font-bold text-[11px] uppercase tracking-[0.6em]">Imperial Testaments</span>
                            <Compass className="w-5 h-5 text-[#C5A059] animate-spin-slow" />
                        </div>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-serif font-black mb-8 italic tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        Noble <span className="text-[#C5A059]">Experiences</span>
                    </h1>
                    <p className="text-2xl text-[#E3C184] max-w-2xl mx-auto font-medium italic opacity-80 border-t border-[#C5A059]/20 pt-10">
                        "Your words are the ink that writes the heritage of our grand estate."
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-6 py-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    
                    {/* Feedback Form Section - Write your Legacy */}
                    <div className="lg:col-span-4 lg:order-2">
                        <div className="bg-white border-2 border-[#E8E2D6] p-16 sticky top-48 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-[#C5A059]/30 -translate-x-2 -translate-y-2"></div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-[#C5A059]/30 translate-x-2 translate-y-2"></div>
                             <div className="absolute top-0 right-0 opacity-5 -translate-y-1/4 translate-x-1/4">
                                <img src={formDecoration} alt="decor" className="w-64 grayscale" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-6 mb-16 border-b border-[#FAF9F6] pb-10">
                                    <div className="p-5 bg-[#2C1D1A] text-[#C5A059] shadow-xl group-hover:rotate-12 transition-transform duration-500">
                                        <Sparkles className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-serif font-black text-[#2C1D1A] italic leading-tight">Inscribe Your <span className="text-[#C5A059]">Legacy</span></h2>
                                        <p className="text-[10px] text-[#8D6E63] font-bold tracking-[0.4em] uppercase mt-2">Noble Record</p>
                                    </div>
                                </div>

                                {user ? (
                                    <form onSubmit={handleSubmit} className="space-y-12">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-end mb-2">
                                                <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.5em] ml-1">Imperial Rating</label>
                                                <span className="text-xs font-serif font-bold italic text-[#8D6E63]">{rating}/5 Stars</span>
                                            </div>
                                            <div className="flex justify-between px-4">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="focus:outline-none transition-all hover:scale-125 transform"
                                                    >
                                                        <Star
                                                            className={`w-10 h-10 ${
                                                                star <= rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#E8E2D6]'
                                                            }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <label className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.5em] ml-1">Your Detailed Chronicle</label>
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                required
                                                rows="6"
                                                className="w-full px-8 py-6 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all resize-none font-medium text-lg italic leading-[1.8]"
                                                placeholder="Elaborate upon your stay..."
                                            />
                                        </div>

                                        {message.text && (
                                            <div className={`p-8 border-2 text-[11px] font-bold tracking-[0.2em] uppercase leading-relaxed animate-in fade-in slide-in-from-top-4 ${
                                                message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-rose-50 text-rose-800 border-rose-100'
                                            }`}>
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                                    {message.text}
                                                </div>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-[#2C1D1A] text-white py-8 font-bold text-[11px] tracking-[0.5em] uppercase hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 shadow-2xl flex items-center justify-center gap-6 group/btn"
                                        >
                                            {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                                <>
                                                    Seal Testament
                                                    <Send className="w-5 h-5 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="text-center py-16 space-y-10">
                                        <div className="w-24 h-24 bg-[#FAF9F6] border border-[#E8E2D6] flex items-center justify-center mx-auto shadow-inner rounded-full">
                                            <Crown className="w-10 h-10 text-[#C5A059] opacity-30" />
                                        </div>
                                        <p className="text-xl text-[#6D5B57] font-medium italic leading-relaxed">Please sign into your sanctuary account to record your noble experience in our chronicles.</p>
                                        <a href="/login" className="inline-block bg-[#2C1D1A] text-white px-12 py-6 font-bold text-[10px] tracking-[0.5em] uppercase hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-500 shadow-2xl">
                                            Identity Verification
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Feedbacks List Section - The Chronicle Archives */}
                    <div className="lg:col-span-8 lg:order-1 space-y-20">
                        <div className="flex items-center gap-10 mb-20">
                            <h2 className="text-5xl md:text-6xl font-serif font-black text-[#2C1D1A] italic tracking-tight">Voices of <span className="text-[#C5A059]">Distinction</span></h2>
                            <div className="h-px bg-[#E8E2D6] flex-1"></div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col justify-center items-center py-48 gap-8">
                                <Loader2 className="animate-spin h-20 w-20 text-[#C5A059] opacity-30" />
                                <p className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.5em] animate-pulse">Consulting the Grand Chronicles...</p>
                            </div>
                        ) : feedbacks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {feedbacks.map((f, idx) => (
                                    <div key={f.id} className="bg-white p-16 border border-[#E8E2D6] hover:border-[#C5A059] transition-all duration-700 shadow-xl hover:shadow-2xl relative group h-full flex flex-col">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#FAF9F6] border-b border-l border-[#E8E2D6] group-hover:border-[#C5A059]/30 transition-colors"></div>
                                        <Quote className="absolute top-12 left-10 text-[#C5A059]/10 w-24 h-24 pointer-events-none group-hover:scale-110 transition-transform" />
                                        
                                        <div className="relative z-10 flex-1 flex flex-col">
                                            <div className="flex gap-1.5 mb-10">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3.5 h-3.5 ${i < f.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#E8E2D6]'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-[#2C1D1A] text-xl mb-12 italic leading-[2] font-medium flex-1">"{f.comment}"</p>
                                            
                                            <div className="flex items-center gap-6 pt-10 border-t border-[#FAF9F6]">
                                                <div className="w-16 h-16 bg-[#2C1D1A] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center font-serif font-black text-2xl shadow-xl group-hover:rotate-6 transition-transform">
                                                    {f.userName.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-serif font-black text-[#2C1D1A] text-2xl tracking-tight leading-none mb-2">{f.userName}</h4>
                                                    <p className="text-[8px] text-[#C5A059] font-black uppercase tracking-[0.4em]">Noble Guest Circle</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#FAF9F6] p-32 text-center border-4 border-dashed border-[#E8E2D6] group">
                                <Anchor className="w-24 h-24 text-[#E8E2D6] mx-auto mb-10 group-hover:rotate-12 transition-transform duration-700" />
                                <h3 className="text-4xl font-serif font-black text-[#2C1D1A] mb-6 italic">The Ledger Awaits...</h3>
                                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] text-[12px]">Be the sovereign voice to initialize our modern chronicles.</p>
                            </div>
                        )}
                    </div>

                </div>
            </main>

            {/* Support CTA - Journey Beyond */}
            <section className="py-52 container mx-auto px-6 border-t border-[#E8E2D6]">
                <div className="text-center max-w-4xl mx-auto space-y-16">
                     <h2 className="text-6xl md:text-8xl font-serif font-black text-[#2C1D1A] italic tracking-tighter leading-none">Curated <span className="text-[#C5A059]">Assistance</span></h2>
                     <p className="text-2xl text-[#6D5B57] font-medium leading-[2] italic">Whether you wish to amend your chronicle or seek the finest delicacies of our coast, our stewards are at your absolute disposal.</p>
                     <div className="flex justify-center">
                        <a href="/contact" className="px-16 py-8 bg-[#2C1D1A] text-white font-bold text-[11px] uppercase tracking-[0.5em] hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-500 shadow-2xl border border-transparent">
                            Summon Private Concierge
                        </a>
                     </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Feedbacks;
