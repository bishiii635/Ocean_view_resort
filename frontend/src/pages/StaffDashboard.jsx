import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    CalendarDays, Users, BedDouble, Eraser, Loader2, Info, CheckCircle2, Crown, Sparkles, Anchor, Compass
} from 'lucide-react';

const StaffDashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'STAFF')) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dashboard/stats');
                setStats(response.data);
            } catch (err) {
                console.error('Error fetching stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (authLoading) return null;

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <main className="pt-40 pb-20 px-6 container mx-auto">
                {/* Staff Hero */}
                <div className="bg-[#2C1D1A] border border-[#C5A059]/20 p-16 text-white shadow-2xl relative overflow-hidden mb-16 group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
                    <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-[#C5A059]/20 -translate-x-3 -translate-y-3"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-6 mb-8 uppercase tracking-[0.5em] text-[#C5A059] text-[10px] font-bold">
                            <Sparkles className="w-5 h-5" /> Official Resort Steward Portal
                        </div>
                        <h2 className="text-5xl md:text-6xl font-serif font-black mb-4 italic tracking-tight">
                            Salutations, <span className="text-[#C5A059]">{user?.name}</span>
                        </h2>
                        <p className="text-[#E8E2D6] text-xl font-medium italic opacity-80 leading-relaxed max-w-2xl">
                            The Ocean View Resort awaits your noble stewardship. Observe the daily pulse of our grand estate through this operational ledger.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="py-32 text-center bg-white border border-[#E8E2D6] shadow-2xl">
                        <Loader2 className="w-16 h-16 animate-spin text-[#C5A059] mx-auto mb-6" />
                        <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] italic animate-pulse">Consulting the Steward's Annals...</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {[
                                { label: 'Imperial Decrees', value: stats?.totalReservations || 0, icon: CalendarDays, color: 'text-[#C5A059]', bg: 'bg-[#FAF9F6]'},
                                { label: 'Distinguished Guests', value: stats?.totalGuests || 0, icon: Users, color: 'text-[#C5A059]', bg: 'bg-[#FAF9F6]' },
                                { label: 'Sanctuary Availability', value: stats?.totalRooms || 0, icon: BedDouble, color: 'text-[#C5A059]', bg: 'bg-[#FAF9F6]' },
                                { label: 'Steward Capacity', value: stats?.staffCapacity || 'Peak', icon: CheckCircle2, color: 'text-[#C5A059]', bg: 'bg-[#FAF9F6]' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-10 border border-[#E8E2D6] shadow-2xl hover:border-[#C5A059] transition-all duration-500 group relative">
                                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#FAF9F6] border-b border-l border-[#E8E2D6] group-hover:border-[#C5A059]/30 transition-colors"></div>
                                    <div className="flex flex-col items-center text-center gap-6">
                                        <div className={`p-5 bg-[#FAF9F6] border border-[#E8E2D6] ${stat.color} group-hover:bg-[#2C1D1A] group-hover:text-white transition-all duration-500 shadow-inner`}>
                                            <stat.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-[#8D6E63] uppercase tracking-[0.3em] mb-3 leading-none">{stat.label}</p>
                                            <h4 className="text-4xl font-serif font-black text-[#2C1D1A] italic tracking-tight">{stat.value}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Housekeeping Action Card */}
                        <div className="bg-white p-16 border border-[#E8E2D6] shadow-2xl flex flex-col md:flex-row items-center gap-16 group relative overflow-hidden">
                             <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A059] opacity-30 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-32 h-32 bg-[#FAF9F6] border border-[#E8E2D6] flex items-center justify-center group-hover:rotate-12 transition-transform duration-700 shadow-inner">
                                <Eraser className="w-16 h-16 text-[#C5A059]" />
                            </div>
                            <div className="flex-1 text-center md:text-left space-y-4">
                                <h3 className="text-3xl font-serif font-black text-[#2C1D1A] italic tracking-tight">Estate Restoration & Stewardship</h3>
                                <p className="text-[#8D6E63] font-medium text-lg italic leading-relaxed max-w-2xl">
                                    Preserve our heritage standards by overseeing sanctuary hygiene. Observe all quarters requiring restoration and validate their completion for arriving nobles.
                                </p>
                            </div>
                            <button 
                                onClick={() => navigate('/staff/room-cleaning')}
                                className="px-12 py-6 bg-[#5D4037] text-white font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl flex items-center gap-4 group/btn"
                            >
                                <Anchor className="w-5 h-5 group-hover/btn:rotate-45 transition-transform" /> Oversee Sanctuaries
                            </button>
                        </div>

                        {/* Info Section */}
                        <div className="bg-[#FAF9F6] border-2 border-[#E8E2D6] border-dashed p-12 flex items-start gap-10 group">
                            <div className="p-5 bg-white border border-[#E8E2D6] shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                                <Info className="w-8 h-8 text-[#C5A059]" />
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-2xl font-serif font-black text-[#2C1D1A] italic tracking-tight">Steward Protocol Notice</h4>
                                <p className="text-[#8D6E63] font-medium text-lg italic leading-relaxed max-w-4xl">
                                    Your authority remains focused on operational modules, including the Imperial Registered Guest Directory and Sanctuary Restoration management. For matters concerning sovereign financial records or sanctuary classification modifications, please consult the High Administrator.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default StaffDashboard;
