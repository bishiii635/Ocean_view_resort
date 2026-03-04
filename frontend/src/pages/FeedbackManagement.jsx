import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, MessageSquare, Star, Loader2, AlertCircle, Crown, Quote, Sparkles } from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/feedbacks');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        setActionLoading(id);
        try {
            await axios.put(`http://localhost:8080/api/feedbacks/${id}/status?status=${status}`);
            setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, status: status } : f));
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <main className="pt-40 pb-20 px-6 container mx-auto">
                <header className="mb-20 flex flex-col md:flex-row justify-between items-center gap-8">
                     <div className="flex items-center gap-6">
                        <div className="p-5 bg-[#2C1D1A] text-[#C5A059] shadow-2xl">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2C1D1A] italic tracking-tight">Noble Testimonials</h1>
                            <p className="text-[#8D6E63] text-[10px] font-bold uppercase tracking-[0.4em]">Official records of guest experiences</p>
                        </div>
                    </div>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white border border-[#E8E2D6] shadow-2xl">
                        <Loader2 className="w-16 h-16 text-[#C5A059] animate-spin mb-6" />
                        <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] italic animate-pulse">Consulting the Grand Chronicles...</p>
                    </div>
                ) : feedbacks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8">
                        {feedbacks.map((f) => (
                            <div key={f.id} className="bg-white p-12 border border-[#E8E2D6] shadow-2xl hover:border-[#C5A059] transition-all duration-500 flex flex-col md:flex-row justify-between gap-12 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C5A059]/10 to-transparent"></div>
                                <div className="flex-1 space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-[#2C1D1A] text-[#C5A059] flex items-center justify-center font-serif font-black text-2xl shadow-xl group-hover:rotate-12 transition-transform">
                                            {f.userName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-serif font-bold text-[#2C1D1A] text-2xl italic tracking-tight opacity-90">{f.userName}</h4>
                                            <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mt-1">{new Date(f.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="flex gap-1.5 ml-6">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-5 h-5 ${i < f.rating ? 'text-[#C5A059] fill-[#C5A059]' : 'text-[#E8E2D6]'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <Quote className="absolute -top-6 -left-6 w-12 h-12 text-[#C5A059] opacity-10" />
                                        <p className="text-[#2C1D1A] font-serif font-medium italic text-2xl leading-[1.8] opacity-80">
                                            "{f.comment}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center items-center gap-6 min-w-[240px] border-l border-[#FAF9F6] pl-12 md:pl-20 border-dashed">
                                    {f.status === 'PENDING' ? (
                                        <div className="flex flex-col gap-4 w-full">
                                            <button
                                                onClick={() => handleStatusUpdate(f.id, 'APPROVED')}
                                                disabled={actionLoading === f.id}
                                                className="w-full flex items-center justify-center gap-3 bg-emerald-50 text-emerald-700 border border-emerald-100 py-4 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-600 hover:text-white transition-all duration-500 shadow-sm"
                                            >
                                                <Check className="w-4 h-4" /> Grant Approval
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(f.id, 'REJECTED')}
                                                disabled={actionLoading === f.id}
                                                className="w-full flex items-center justify-center gap-3 bg-rose-50 text-rose-700 border border-rose-100 py-4 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-rose-600 hover:text-white transition-all duration-500 shadow-sm"
                                            >
                                                <X className="w-4 h-4" /> Deny Registry
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full space-y-4">
                                            <span className={`block text-center py-4 border text-[10px] font-black uppercase tracking-[0.3em] italic shadow-sm ${
                                                f.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                            }`}>
                                                {f.status} Status
                                            </span>
                                            <button
                                                onClick={() => handleStatusUpdate(f.id, 'PENDING')}
                                                className="w-full text-[9px] text-[#8D6E63] font-bold uppercase tracking-[0.2em] hover:text-[#2C1D1A] transition-colors underline underline-offset-4"
                                            >
                                                Rescind Decree
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white py-32 border border-[#E8E2D6] shadow-2xl text-center px-10">
                        <Quote className="w-20 h-20 text-[#E8E2D6] mx-auto mb-10 opacity-30 rotate-180" />
                        <h3 className="text-3xl font-serif font-black text-[#2C1D1A] mb-4 italic">The Archives are Silent</h3>
                        <p className="text-[#8D6E63] font-bold uppercase tracking-[0.2em] text-[10px]">No noble chronicles have been submitted in this era.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default FeedbackManagement;
