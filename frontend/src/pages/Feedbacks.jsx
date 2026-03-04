import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, Send, MessageCircle, Quote, Crown, Gem, Sparkles, Loader2 } from 'lucide-react';
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
                setMessage({ type: 'success', text: 'Thank you! Your testament has been recorded and is pending royal approval.' });
                setComment('');
                setRating(5);
            } else {
                setMessage({ type: 'error', text: 'Failed to record testament. Please try again.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6]">
            <Header />
            
            {/* Hero Section */}
            <div className="pt-48 pb-24 bg-[#2C1D1A] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 border border-[#C5A059] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 border border-[#C5A059] rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 text-[#C5A059] font-bold text-[10px] tracking-[0.5em] uppercase mb-6">
                        <Crown className="w-4 h-4" /> Guest Testaments
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif font-black mb-6 italic tracking-tighter">Noble <span className="text-[#C5A059]">Experiences</span></h1>
                    <p className="text-xl text-[#E3C184] max-w-2xl mx-auto font-medium italic">
                        Chronicle of the grand stays and cherished memories at Ocean View Resort.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    
                    {/* Feedback Form Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-[#E8E2D6] p-12 sticky top-48 shadow-xl">
                            <div className="flex items-center gap-4 mb-10 border-b border-[#E8E2D6] pb-8">
                                <div className="p-4 bg-[#5D4037] text-[#C5A059]">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-[#2C1D1A]">Share Your Story</h2>
                                    <p className="text-[10px] text-[#C5A059] font-bold tracking-[0.3em] uppercase mt-1">Record Experience</p>
                                </div>
                            </div>

                            {user ? (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Sanctuary Rating</label>
                                        <div className="flex gap-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`w-8 h-8 ${
                                                            star <= rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#E8E2D6]'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Your Chronicle</label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                            rows="5"
                                            className="w-full px-6 py-5 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all resize-none font-medium text-sm italic leading-relaxed"
                                            placeholder="Write your story of leisure..."
                                        />
                                    </div>

                                    {message.text && (
                                        <div className={`p-6 text-[10px] font-bold tracking-[0.1em] uppercase ${
                                            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                                        }`}>
                                            {message.text}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-[#5D4037] text-white py-5 font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50"
                                    >
                                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                            <>
                                                Submit Testament
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-[#6D5B57] mb-8 font-medium italic">Please sign in to your sanctuary account to share your noble experience with us.</p>
                                    <a href="/login" className="inline-block bg-[#5D4037] text-white px-10 py-5 font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-[#2C1D1A] transition-all duration-500 shadow-xl">
                                        Identify Yourself
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Feedbacks List Section */}
                    <div className="lg:col-span-2 space-y-12">
                        {loading ? (
                            <div className="flex justify-center items-center py-40">
                                <Loader2 className="animate-spin h-12 w-12 text-[#C5A059]" />
                            </div>
                        ) : feedbacks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {feedbacks.map((f) => (
                                    <div key={f.id} className="bg-white p-12 border border-[#E8E2D6] hover:border-[#C5A059] transition-all duration-700 shadow-sm hover:shadow-2xl relative group">
                                        <Quote className="absolute top-8 right-8 text-[#C5A059]/10 w-16 h-16 transition-transform group-hover:scale-110" />
                                        <div className="relative z-10">
                                            <div className="flex gap-2 mb-8">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-3 h-3 ${i < f.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#E8E2D6]'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-[#6D5B57] text-lg mb-10 italic leading-relaxed font-medium">"{f.comment}"</p>
                                            <div className="flex items-center gap-5 pt-8 border-t border-[#E8E2D6]">
                                                <div className="w-14 h-14 bg-[#5D4037] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center font-serif font-black text-xl shadow-lg">
                                                    {f.userName.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-serif font-bold text-[#2C1D1A] text-xl tracking-wide">{f.userName}</h4>
                                                    <p className="text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.4em] mt-1">Distinguished Guest</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-24 text-center border border-[#E8E2D6]">
                                <MessageCircle className="w-20 h-20 text-[#E8E2D6] mx-auto mb-8" />
                                <h3 className="text-3xl font-serif font-bold text-[#2C1D1A] mb-4">The Chronicle is Empty</h3>
                                <p className="text-[#8D6E63] font-medium italic">Be the primary guest to record your testament of luxury!</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Feedbacks;
