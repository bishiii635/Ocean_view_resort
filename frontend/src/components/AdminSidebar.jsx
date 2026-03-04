import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, BedDouble, Users, FileText, Palmtree, LogOut, HelpCircle, Eraser } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const menuItems = user?.role === 'STAFF' 
    ? [
        { path: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/staff/guests', label: 'Guests', icon: Users },
        { path: '/staff/room-cleaning', label: 'Room Cleaning', icon: Eraser },
        { path: '/staff/help', label: 'Help', icon: HelpCircle },
    ]
    : [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/reservations', label: 'Reservations', icon: CalendarDays },
        { path: '/admin/rooms', label: 'Rooms', icon: BedDouble },
        { path: '/admin/room-categories', label: 'Room Categories', icon: Palmtree },
        { path: '/admin/users', label: 'Users', icon: Users },
        { path: '/admin/help', label: 'Help', icon: HelpCircle },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="w-64 bg-white h-screen fixed right-0 top-0 border-l border-slate-200 shadow-xl flex flex-col z-50 print:hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-end gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    {user?.role === 'STAFF' ? 'Staff Portal' : 'Admin Portal'}
                </span>
                <Palmtree className="text-cyan-600 w-6 h-6" />
            </div>
            
            <nav className="flex-1 p-4 space-y-2 flex flex-col">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <Link 
                            key={item.path} 
                            to={item.path} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group justify-end ${
                                isActive 
                                ? 'bg-cyan-50 text-cyan-700 font-semibold shadow-sm' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                        >
                            <span>{item.label}</span>
                            <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-600' : 'text-slate-400 group-hover:text-cyan-500'}`} />
                        </Link>
                    );
                })}
                
                <div className="mt-auto"></div>
                
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group justify-end text-red-500 hover:bg-red-50 hover:text-red-700 w-full"
                >
                    <span className="font-medium">Logout</span>
                    <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-700" />
                </button>
            </nav>

            <div className="p-4 m-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl text-white text-right">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">System Status</div>
                <div className="flex items-center justify-end gap-2 text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Online
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
