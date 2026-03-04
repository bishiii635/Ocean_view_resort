import AdminHeader from '../components/AdminHeader';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Bell, Search, CalendarDays, TrendingUp, Users, DollarSign, BedDouble, 
    UserCheck, Loader2, Eraser, Crown, Gem, Sparkles, Anchor, MapPin, Compass
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import Footer from '../components/Footer';

const AdminDashboard = () => {
    const { user, loading: authLoading, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [recentReservations, setRecentReservations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user) navigate('/login');
            else if (user.role === 'STAFF') navigate('/staff/dashboard');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [statsRes, reservationsRes, usersRes] = await Promise.all([
                axios.get('http://localhost:8080/api/dashboard/stats'),
                axios.get('http://localhost:8080/api/reservations'),
                axios.get('http://localhost:8080/api/users')
            ]);
            setStats(statsRes.data);
            const sortedReservations = reservationsRes.data
                .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                .slice(0, 5);
            setRecentReservations(sortedReservations);
            setAllUsers(usersRes.data);
        } catch (error) {
            console.error("Error fetching dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || !user) return null;

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <main className="pt-40 pb-20 px-6 container mx-auto space-y-16">
                {/* Imperial Welcome Banner */}
                <div className="bg-[#2C1D1A] border border-[#C5A059]/20 p-16 text-white relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 text-[#C5A059] font-bold text-[9px] tracking-[0.5em] uppercase border border-[#C5A059]/30 px-6 py-2">
                                <Crown className="w-4 h-4" /> Imperial Senate Registry
                            </div>
                            <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter italic leading-none">The Estate <span className="text-[#C5A059]">Overview</span></h1>
                            <p className="text-[#E3C184] text-lg font-medium italic opacity-80 max-w-xl">
                                Real-time chronicle of the resort's operational legacy and financial prosperity.
                            </p>
                        </div>
                        <div className="hidden lg:block w-px h-32 bg-white/10 mx-10"></div>
                        <div className="flex gap-10 items-center">
                            <div className="text-center">
                                <p className="text-[#C5A059] text-3xl font-serif font-black mb-1">{allUsers.length}</p>
                                <p className="text-[9px] text-white/60 font-bold uppercase tracking-[0.2em]">Enrolled Citizens</p>
                            </div>
                            <div className="text-center">
                                <p className="text-[#C5A059] text-3xl font-serif font-black mb-1">{stats?.totalRooms || 0}</p>
                                <p className="text-[9px] text-white/60 font-bold uppercase tracking-[0.2em]">Managed Estates</p>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <Loader2 className="w-16 h-16 text-[#C5A059] animate-spin mb-6" />
                        <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] italic animate-pulse">Syncing Royal Archives...</p>
                    </div>
                ) : (
                    <>
                        {/* Imperial Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            {[
                                { label: 'Imperial Decrees', value: stats?.totalReservations || 0, icon: CalendarDays, color: 'text-[#C5A059]', bg: 'bg-[#5D4037]' },
                                { label: 'Treasury Worth', value: `LKR ${stats?.totalRevenue?.toLocaleString() || 0}`, icon: DollarSign, color: 'text-[#C5A059]', bg: 'bg-[#5D4037]' },
                                { label: 'Noble Guests', value: stats?.totalGuests || 0, icon: Users, color: 'text-[#C5A059]', bg: 'bg-[#5D4037]' },
                                { label: 'Sanctuary Inventory', value: stats?.totalRooms || 0, icon: BedDouble, color: 'text-[#C5A059]', bg: 'bg-[#5D4037]' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-10 border border-[#E8E2D6] shadow-xl group hover:border-[#C5A059] transition-all duration-700 relative overflow-hidden">
                                     <div className="absolute top-0 right-0 w-2 h-0 bg-[#C5A059] group-hover:h-full transition-all duration-700"></div>
                                    <div className="flex items-start justify-between mb-8">
                                        <div className={`p-4 ${stat.bg} ${stat.color} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                            <stat.icon className="w-8 h-8" />
                                        </div>
                                        <Sparkles className="w-4 h-4 text-[#C5A059] opacity-20" />
                                    </div>
                                    <h3 className="text-[#8D6E63] text-[9px] font-bold uppercase tracking-[0.3em] font-sans">{stat.label}</h3>
                                    <p className="text-3xl font-serif font-black text-[#2C1D1A] mt-3 tracking-tighter italic">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Revenue Prosperity Chart */}
                        <div className="bg-white p-12 border border-[#E8E2D6] shadow-2xl relative overflow-hidden group">
                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-30"></div>
                            <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-[#FAF9F6] pb-10 gap-6 text-center md:text-left">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-serif font-black text-[#2C1D1A]">Prosperity Chronicle</h3>
                                    <p className="text-[#8D6E63] font-medium italic text-lg leading-relaxed">Daily treasury growth observed from approved sanctuarial decrees.</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="px-8 py-3 bg-[#FAF9F6] text-[#C5A059] border border-[#C5A059]/20 text-[10px] font-black uppercase tracking-[0.2em] italic">Senate Verified</span>
                                </div>
                            </div>
                            <div className="h-[500px] w-full mt-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats?.revenueTimeline || []}>
                                        <defs>
                                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#C5A059" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#C5A059" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E2D6" opacity={0.5} />
                                        <XAxis 
                                            dataKey="date" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: '#8D6E63', fontSize: 11, fontWeight: 700, fontFamily: 'serif'}}
                                            dy={20}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{fill: '#8D6E63', fontSize: 11, fontWeight: 700}}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#2C1D1A',
                                                borderRadius: '0px', 
                                                border: '1px solid #C5A059', 
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                                padding: '20px'
                                            }}
                                            itemStyle={{ fontWeight: 900, color: '#C5A059', fontFamily: 'serif', fontSize: '18px' }}
                                            labelStyle={{ fontWeight: 700, color: '#E3C184', marginBottom: '8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px' }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="amount" 
                                            stroke="#C5A059" 
                                            strokeWidth={5}
                                            fillOpacity={1} 
                                            fill="url(#colorAmount)" 
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {user?.role === 'ADMIN' ? (
                            <div className="grid lg:grid-cols-3 gap-16">
                                {/* Recent Decrees */}
                                <div className="lg:col-span-2 bg-white border border-[#E8E2D6] shadow-2xl p-12">
                                    <div className="flex justify-between items-center mb-12 border-b border-[#FAF9F6] pb-8">
                                        <h3 className="text-4xl font-serif font-black text-[#2C1D1A] italic">Imperial Registries</h3>
                                        <button 
                                            onClick={() => navigate('/admin/reservations')}
                                            className="text-[10px] font-bold text-[#C5A059] hover:text-[#2C1D1A] border border-[#C5A059]/30 px-8 py-3 transition-all duration-500 uppercase tracking-[0.2em] italic"
                                        >
                                            Consult Schedule
                                        </button>
                                    </div>
                                    <div className="space-y-8">
                                        {recentReservations.length > 0 ? (
                                            recentReservations.map((res) => {
                                                const guestUser = allUsers.find(u => u.id === res.guestId);
                                                return (
                                                    <div key={res.id} className="flex items-center justify-between p-8 bg-[#FAF9F6] border border-[#E8E2D6] hover:border-[#C5A059] transition-all duration-700 group relative">
                                                        <div className="absolute top-0 right-0 w-2 h-0 bg-[#C5A059] group-hover:h-full transition-all duration-700"></div>
                                                        <div className="flex items-center gap-10">
                                                            <div className="w-20 h-20 bg-[#2C1D1A] text-[#C5A059] flex items-center justify-center font-serif font-black text-3xl shadow-xl group-hover:rotate-12 transition-transform duration-500">
                                                                {guestUser?.name.charAt(0)}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <p className="font-serif font-black text-[#2C1D1A] text-2xl tracking-tight italic opacity-90">{guestUser?.name || 'Unknown Noble'}</p>
                                                                <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-[0.3em] font-sans flex items-center gap-2">
                                                                    <Gem className="w-3 h-3 text-[#C5A059]" />
                                                                    ERA: {new Date(res.checkIn).toLocaleDateString()} &mdash; {new Date(res.checkOut).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right space-y-3">
                                                            <span className={`px-6 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] border ${
                                                                res.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                                                res.status === 'PENDING' ? 'bg-[#5D4037]/5 text-[#5D4037] border-[#5D4037]/20' : 'bg-rose-50 text-rose-700 border-rose-100'
                                                            }`}>
                                                                {res.status}
                                                            </span>
                                                            <p className="text-xl font-serif font-black text-[#5D4037] italic">LKR {res.totalCost?.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className="text-center py-24 bg-[#FAF9F6] border-2 border-dashed border-[#E8E2D6]">
                                                <Compass className="w-16 h-16 text-[#E8E2D6] mx-auto mb-6" />
                                                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] font-serif italic">The Chronicles Are Currently Vacant</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Senate Operations */}
                                <div className="bg-[#2C1D1A] shadow-2xl p-12 text-white relative group border border-[#C5A059]/10">
                                     <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-[#C5A059]/20 translate-x-3 -translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                                    <h3 className="text-3xl font-serif font-bold text-white mb-12 italic tracking-wide">Registry Management</h3>
                                    <div className="space-y-6">
                                        {[
                                            { label: 'Noble Reservations', path: '/admin/reservations', icon: CalendarDays },
                                            { label: 'Sanctuary Inventory', path: '/admin/rooms', icon: BedDouble },
                                            { label: 'Imperial Registry', path: '/admin/users', icon: Users },
                                            { label: 'Heritage Classifications', path: '/admin/room-categories', icon: TrendingUp },
                                        ].map((action, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => navigate(action.path)}
                                                className="w-full py-6 px-10 border border-white/5 bg-white/5 text-[#E3C184] font-bold text-[10px] uppercase tracking-[0.4em] transition-all duration-500 hover:bg-[#C5A059] hover:text-[#2C1D1A] group flex items-center justify-between"
                                            >
                                                {action.label}
                                                <action.icon className="w-4 h-4 opacity-50 transition-transform group-hover:rotate-12" />
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-16 p-10 bg-[#5D4037]/30 border border-[#C5A059]/10 relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059]/10 to-transparent"></div>
                                        <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.4em] mb-4 relative z-10 flex items-center gap-2">
                                            <Sparkles className="w-3.5 h-3.5" /> Imperial Counsel
                                        </p>
                                        <p className="text-lg font-medium text-[#FAF9F6] relative z-10 italic leading-relaxed group-hover:text-white transition-colors">
                                            All treasury stats are auto-calculated from verified sanctuarial decrees. Consistency is absolute.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-16 border border-[#E8E2D6] shadow-2xl flex flex-col lg:flex-row items-center gap-16 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FAF9F6] border-b border-l border-[#E8E2D6] -translate-y-32 translate-x-32 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-1000"></div>
                                <div className="w-32 h-32 bg-[#2C1D1A] text-[#C5A059] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                                    <Eraser className="w-16 h-16" />
                                </div>
                                <div className="flex-1 text-center lg:text-left space-y-6">
                                    <h3 className="text-4xl font-serif font-black text-[#2C1D1A]">Steward Portal</h3>
                                    <p className="text-[#8D6E63] font-medium text-xl italic max-w-2xl leading-relaxed">
                                        As a dedicated resort steward, your decree is to ensure every sanctuary maintain its imperial standards of cleanliness and luxury.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => navigate('/staff/room-cleaning')}
                                    className="px-16 py-7 bg-[#2C1D1A] text-white font-bold text-[10px] uppercase tracking-[0.5em] hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 shadow-2xl relative z-10"
                                >
                                    Sanctuary Maintenance
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
