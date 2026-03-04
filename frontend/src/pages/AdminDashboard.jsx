import AdminSidebar from '../components/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Bell, 
    Search, 
    CalendarDays, 
    TrendingUp, 
    Users, 
    DollarSign, 
    BedDouble, 
    UserCheck,
    Loader2,
    Eraser
} from 'lucide-react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const AdminDashboard = () => {
    const { user, loading: authLoading, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [recentReservations, setRecentReservations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Protect Route
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
            // Sort by check-in date or ID for "recent"
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
        <div className="flex bg-slate-50 min-h-screen font-sans">
            {/* Main Content Area */}
            <div className="flex-1 mr-64"> 
                {/* Dashboard Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">
                  
                    
              
                        
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                <p className="text-xs text-slate-500 font-medium bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full inline-block">{user.role}</p>
                            </div>
                            <div 
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-cyan-500/30 cursor-pointer hover:scale-105 transition-transform"
                                onClick={logout}
                                title="Logout"
                            >
                                {user.name.charAt(0)}
                            </div>
                        </div>
                   
                </header>

                <main className="p-8 space-y-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-[2rem] p-10 text-white shadow-xl shadow-cyan-900/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>
                        <div className="relative z-10">
                            <h1 className="text-4xl font-black mb-3">Resort Overview</h1>
                            <p className="text-cyan-100 text-lg font-medium opacity-90">Live performance metrics and operational insights.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mb-4" />
                            <p className="text-slate-500 font-bold animate-pulse">Synchronizing Data...</p>
                        </div>
                    ) : (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: 'Total Reservations', value: stats?.totalReservations || 0, icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50'},
                                    { label: 'Total Revenue', value: `LKR ${stats?.totalRevenue?.toLocaleString() || 0}`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                    { label: 'Total Guests', value: stats?.totalGuests || 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
                                    { label: 'Total Rooms', value: stats?.totalRooms || 0, icon: BedDouble, color: 'text-amber-600', bg: 'bg-amber-50' },
                                   
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex justify-between items-start mb-5">
                                            <div className={`p-4 rounded-2xl ${stat.bg} shadow-inner`}>
                                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                                            </div>
                                            <span className="text-[10px] font-black px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider">
                                                {stat.trend}
                                            </span>
                                        </div>
                                        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-[0.15em]">{stat.label}</h3>
                                        <p className="text-3xl font-black text-slate-800 mt-2">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Revenue Chart Section */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-800">Revenue Analysis</h3>
                                        <p className="text-slate-400 font-medium">Daily income timeline from generated invoices</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold border border-emerald-100">Live Updates</span>
                                    </div>
                                </div>
                                <div className="h-[400px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={stats?.revenueTimeline || []}>
                                            <defs>
                                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis 
                                                dataKey="date" 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                                                dy={10}
                                            />
                                            <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                                                tickFormatter={(value) => `LKR ${value}`}
                                            />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    borderRadius: '20px', 
                                                    border: 'none', 
                                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                                    padding: '15px'
                                                }}
                                                itemStyle={{ fontWeight: 800, color: '#0ea5e9' }}
                                                labelStyle={{ fontWeight: 600, color: '#64748b', marginBottom: '5px' }}
                                            />
                                            <Area 
                                                type="monotone" 
                                                dataKey="amount" 
                                                stroke="#0ea5e9" 
                                                strokeWidth={4}
                                                fillOpacity={1} 
                                                fill="url(#colorAmount)" 
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {user?.role === 'ADMIN' ? (
                                <div className="grid lg:grid-cols-3 gap-8">
                                    {/* Recent Reservations */}
                                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="text-2xl font-black text-slate-800">Recent Arrivals</h3>
                                            <button 
                                                onClick={() => navigate('/admin/reservations')}
                                                className="text-sm font-bold text-cyan-600 hover:text-cyan-700 bg-cyan-50 px-4 py-2 rounded-xl transition-all"
                                            >
                                                View Schedule
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            {recentReservations.length > 0 ? (
                                                recentReservations.map((res) => {
                                                    const guestUser = allUsers.find(u => u.id === res.guestId);
                                                    return (
                                                        <div key={res.id} className="flex items-center justify-between p-5 hover:bg-slate-50 rounded-3xl transition-all border border-transparent hover:border-slate-100 group">
                                                            <div className="flex items-center gap-5">
                                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-slate-600 shadow-sm group-hover:scale-110 transition-transform">
                                                                    {guestUser?.name.charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <p className="font-black text-slate-800 text-lg">{guestUser?.name || 'Unknown Guest'}</p>
                                                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                                                        Stay: {new Date(res.checkIn).toLocaleDateString()} - {new Date(res.checkOut).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${
                                                                    res.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                                    res.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                                                }`}>
                                                                    {res.status}
                                                                </span>
                                                                <p className="text-sm font-bold text-slate-800 mt-2">LKR {res.totalCost?.toLocaleString()}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                                    <CalendarDays className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                                    <p className="text-slate-400 font-bold italic">No recent reservations recorded</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8">
                                        <h3 className="text-2xl font-black text-slate-800 mb-8">Operations</h3>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Manage Reservations', path: '/admin/reservations', color: 'bg-blue-600 shadow-blue-100', icon: CalendarDays },
                                                { label: 'Inventory Control', path: '/admin/rooms', color: 'bg-slate-900 shadow-slate-200', icon: BedDouble },
                                                { label: 'Users Directory', path: '/admin/users', color: 'bg-purple-600 shadow-purple-100', icon: Users },
                                                { label: 'Room Categories', path: '/admin/room-categories', color: 'bg-emerald-600 shadow-emerald-100', icon: TrendingUp },
                                            ].map((action, i) => (
                                                <button 
                                                    key={i}
                                                    onClick={() => navigate(action.path)}
                                                    className={`w-full py-4 px-6 rounded-2xl text-white font-black text-sm transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-between ${action.color}`}
                                                >
                                                    {action.label}
                                                    <action.icon className="w-5 h-5 opacity-50" />
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent"></div>
                                            <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-2 relative z-10">Quick Tip</p>
                                            <p className="text-xs font-medium text-slate-300 relative z-10 group-hover:text-white transition-colors">
                                                Total revenue is calculated automatically based on approved reservation invoices.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group">
                                    <div className="w-24 h-24 rounded-3xl bg-cyan-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <Eraser className="w-12 h-12 text-cyan-600" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl font-black text-slate-800 mb-2">Housekeeping Portal</h3>
                                        <p className="text-slate-500 font-medium max-w-xl">
                                            You are logged in with Staff privileges. Please ensure all maintenance rooms are cleaned and updated in the Room Cleaning section to maintain resort standards.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/staff/room-cleaning')}
                                        className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                                    >
                                        Go to Cleaning Schedule
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {/* Sidebar Component */}
            <AdminSidebar />
        </div>
    );
};

export default AdminDashboard;
