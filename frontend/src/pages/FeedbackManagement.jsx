import { useState, useEffect } from 'react';
import axios from 'axios';
import { Check, X, MessageSquare, Star, Loader2, AlertCircle } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

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
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <div className="flex-1 mr-64 p-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-slate-900 mb-2">Feedback Management</h1>
                    <p className="text-slate-500 font-medium text-lg">Review and moderate guest experiences.</p>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mb-4" />
                        <p className="text-slate-500 font-bold">Loading feedbacks...</p>
                    </div>
                ) : feedbacks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {feedbacks.map((f) => (
                            <div key={f.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600 font-black text-xl">
                                            {f.userName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800 text-lg">{f.userName}</h4>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{new Date(f.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="flex gap-1 ml-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < f.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-600 font-medium italic text-lg leading-relaxed">"{f.comment}"</p>
                                </div>

                                <div className="flex items-center gap-4 min-w-[200px]">
                                    {f.status === 'PENDING' ? (
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={() => handleStatusUpdate(f.id, 'APPROVED')}
                                                disabled={actionLoading === f.id}
                                                className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 py-3 rounded-xl font-black text-sm hover:bg-emerald-600 hover:text-white transition-all"
                                            >
                                                <Check className="w-4 h-4" /> Approve
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(f.id, 'REJECTED')}
                                                disabled={actionLoading === f.id}
                                                className="flex-1 flex items-center justify-center gap-2 bg-rose-50 text-rose-600 border border-rose-100 py-3 rounded-xl font-black text-sm hover:bg-rose-600 hover:text-white transition-all"
                                            >
                                                <X className="w-4 h-4" /> Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full">
                                            <span className={`block text-center py-3 rounded-xl font-black text-sm uppercase tracking-widest ${
                                                f.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                            }`}>
                                                {f.status}
                                            </span>
                                            <button
                                                onClick={() => handleStatusUpdate(f.id, 'PENDING')}
                                                className="w-full mt-2 text-xs text-slate-400 font-bold underline hover:text-cyan-600 transition-colors"
                                            >
                                                Reset to Pending
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-20 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
                        <MessageSquare className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-slate-800 mb-2">No Feedbacks</h3>
                        <p className="text-slate-400 font-medium">Guest experiences will appear here after they submit them.</p>
                    </div>
                )}
            </div>
            <AdminSidebar />
        </div>
    );
};

export default FeedbackManagement;
