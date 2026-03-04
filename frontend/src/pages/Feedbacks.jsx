import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Star, Send, MessageCircle, Quote } from 'lucide-react';
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
                setMessage({ type: 'success', text: 'Thank you! Your feedback has been submitted and is pending approval.' });
                setComment('');
                setRating(5);
            } else {
                setMessage({ type: 'error', text: 'Failed to submit feedback. Please try again.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            
            {/* Hero Section */}
            <div className="pt-32 pb-16 bg-gradient-to-br from-cyan-600 to-blue-700 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Guest Experiences</h1>
                    <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
                        Hear what our guests have to say about their stay at Ocean View Resort.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Feedback Form Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-32">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-cyan-100 rounded-lg">
                                    <MessageCircle className="text-cyan-600 w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">Share Your Experience</h2>
                            </div>

                            {user ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`w-8 h-8 ${
                                                            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Your Experience</label>
                                        <textarea
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                            rows="4"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Tell us about your stay..."
                                        />
                                    </div>

                                    {message.text && (
                                        <div className={`p-4 rounded-xl text-sm ${
                                            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                        }`}>
                                            {message.text}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full btn-gradient py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 disabled:opacity-50"
                                    >
                                        {submitting ? 'Submitting...' : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Submit Feedback
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-slate-600 mb-6 font-medium">Please sign in to share your experience with us.</p>
                                    <a href="/login" className="inline-block btn-gradient px-8 py-3 rounded-xl font-bold shadow-lg shadow-cyan-500/30">
                                        Sign In Now
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Feedbacks List Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
                            </div>
                        ) : feedbacks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {feedbacks.map((f) => (
                                    <div key={f.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative">
                                        <Quote className="absolute top-4 right-4 text-cyan-50 w-12 h-12 -z-0" />
                                        <div className="relative z-10">
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < f.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-slate-700 mb-6 italic leading-relaxed">"{f.comment}"</p>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600 font-bold">
                                                    {f.userName.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-800">{f.userName}</h4>
                                                    <p className="text-xs text-slate-500">{new Date(f.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-12 rounded-2xl text-center border-2 border-dashed border-slate-200">
                                <MessageCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-800 mb-2">No feedbacks yet</h3>
                                <p className="text-slate-500 font-medium">Be the first one to share your experience!</p>
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
