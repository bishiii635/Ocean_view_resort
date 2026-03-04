import AdminSidebar from '../components/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    CalendarDays, 
    Users, 
    BedDouble, 
    Eraser,
    Loader2,
    Info,
    CheckCircle2
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
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <div className="flex-1 mr-64 text-right">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <BedDouble className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Staff Dashboard</h1>
                    </div>
                </header>

                <main className="p-8 space-y-8">
                    {/* Staff Hero */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-2">Welcome back, {user?.name}!</h2>
                            <p className="text-blue-10 opacity-90 font-medium">Ocean View Resort Staff Portal • Daily Operations Dashboard</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-20 text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                            <p className="text-slate-500 font-bold">Synchronizing system data...</p>
                        </div>
                    ) : (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: 'Total Reservations', value: stats?.totalReservations || 0, icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50'},
                                    { label: 'Total Guests', value: stats?.totalGuests || 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
                                    { label: 'Available Rooms', value: stats?.totalRooms || 0, icon: BedDouble, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                    { label: 'Staff Capacity', value: stats?.staffCapacity || 'High', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                                <stat.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                                <h4 className="text-2xl font-black text-slate-800">{stat.value}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Housekeeping Action Card */}
                            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group text-left">
                                <div className="w-24 h-24 rounded-3xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <Eraser className="w-12 h-12 text-amber-600" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-black text-slate-800 mb-2 text-left">Housekeeping & Maintenance</h3>
                                    <p className="text-slate-500 font-medium max-w-xl text-left">
                                        Maintain resort standards by updating room hygiene status. View all dirty rooms and mark them as clean for the next guest arrival.
                                    </p>
                                </div>
                                <button 
                                    onClick={() => navigate('/staff/room-cleaning')}
                                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                                >
                                    Manage Rooms
                                </button>
                            </div>

                            {/* Info Section */}
                            <div className="bg-blue-50 rounded-[2.5rem] p-8 border border-blue-100 flex items-start gap-6 text-left">
                                <div className="p-4 bg-white rounded-2xl shadow-sm">
                                    <Info className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-800 mb-2">Staff Notice</h4>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        Your access is limited to operational modules including the Guest Directory and Room Cleaning management. If you need assistance with financial records or room category modifications, please contact the lead Administrator.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
            <AdminSidebar />
        </div>
    );
};

export default StaffDashboard;
