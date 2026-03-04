import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, Crown, LayoutDashboard, CalendarDays, BedDouble, Users, Palmtree, MessageSquare, HelpCircle, Eraser } from 'lucide-react';

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = user?.role === 'STAFF' 
    ? [
        { path: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/staff/guests', label: 'Guests', icon: Users },
        { path: '/staff/room-cleaning', label: 'Cleaning', icon: Eraser },
        { path: '/staff/help', label: 'Assistance', icon: HelpCircle },
    ]
    : [
        { path: '/admin/dashboard', label: 'Imperial Overview', icon: LayoutDashboard },
        { path: '/admin/reservations', label: 'Reservations', icon: CalendarDays },
        { path: '/admin/rooms', label: 'Sanctuaries', icon: BedDouble },
        { path: '/admin/room-categories', label: 'Heritage Tiers', icon: Palmtree },
        { path: '/admin/users', label: 'Registers', icon: Users },
        { path: '/admin/feedbacks', label: 'Testaments', icon: MessageSquare },
        { path: '/admin/help', label: 'Senate Aid', icon: HelpCircle },
    ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-white shadow-2xl py-3 border-[#C5A059]/20' : 'bg-[#2C1D1A] py-6 border-white/5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`p-2 border border-[#C5A059] transition-all duration-500 ${scrolled ? 'bg-[#2C1D1A]' : 'bg-white/5'}`}>
            <Crown className="text-[#C5A059] w-6 h-6" />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-xl font-serif font-black tracking-widest uppercase ${scrolled ? 'text-[#2C1D1A]' : 'text-white'}`}>
              Admin<span className="text-[#C5A059]">Registry</span>
            </span>
            <span className={`text-[8px] tracking-[0.4em] uppercase font-bold ${scrolled ? 'text-[#8D6E63]' : 'text-[#E3C184]'}`}>Ocean View Estate</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group px-3 py-2 ${
                  isActive 
                  ? 'text-[#C5A059] border-b-2 border-[#C5A059]' 
                  : scrolled ? 'text-[#5D4037] hover:text-[#C5A059]' : 'text-[#E3C184] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 opacity-70" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User & Actions */}
        <div className="hidden xl:flex items-center gap-8">
            <div className="flex flex-col items-end">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${scrolled ? 'text-[#2C1D1A]' : 'text-white'}`}>{user?.name}</span>
                <span className="text-[8px] font-black text-[#C5A059] uppercase tracking-widest bg-[#C5A059]/10 px-2 py-0.5 mt-1 border border-[#C5A059]/20">{user?.role} Portal</span>
            </div>
            <button 
                onClick={handleLogout}
                className={`p-3 border transition-all duration-500 ${scrolled ? 'border-[#E8E2D6] text-[#8D6E63] hover:bg-[#2C1D1A] hover:text-white' : 'border-white/10 text-[#E3C184] hover:bg-white hover:text-[#2C1D1A]'}`}
                title="Depart Registry"
            >
                <LogOut className="w-4 h-4" />
            </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="xl:hidden text-[#C5A059]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-[#2C1D1A] border-b border-[#C5A059]/20 shadow-2xl py-12 flex flex-col items-center gap-4 animate-in slide-in-from-top-4">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`text-xs font-bold uppercase tracking-[0.3em] py-4 w-full text-center ${location.pathname === item.path ? 'text-[#C5A059] bg-white/5' : 'text-[#E3C184]'}`} 
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="w-1/3 h-px bg-white/10 my-6"></div>
          <button onClick={handleLogout} className="text-rose-500 font-bold text-xs uppercase tracking-[0.3em] flex items-center gap-3">
            <LogOut className="w-4 h-4" /> Depart Registry
          </button>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
