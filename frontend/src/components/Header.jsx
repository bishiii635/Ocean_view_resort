import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, LogOut, Menu, X, Crown } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-xl py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`p-2 rounded-full border border-[#C5A059] transition-transform duration-500 group-hover:rotate-[360deg] ${scrolled ? 'bg-[#5D4037]' : 'bg-white/10 backdrop-blur-sm'}`}>
            <Crown className={`${scrolled ? 'text-[#C5A059]' : 'text-[#C5A059]'} w-6 h-6`} />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-2xl font-black tracking-[0.15em] uppercase ${scrolled ? 'text-[#2C1D1A]' : 'text-[#2C1D1A]'} transition-colors font-serif`}>
              Ocean<span className="text-[#C5A059]">View</span>
            </span>
            <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#8D6E63]">Resort & Spa</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { name: 'Heritage', path: '/' },
            { name: 'Sanctuaries', path: '/rooms' },
            { name: 'Our Story', path: '/about' },
            { name: 'Concierge', path: '/contact' },
            { name: 'Experiences', path: '/feedbacks' },
            { name: 'Support', path: '/help' }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="text-[#5D4037] hover:text-[#C5A059] text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.2em] font-bold">
          {user ? (
            <div className="flex items-center gap-6">
              <Link to={user.role === 'ADMIN' || user.role === 'STAFF' ? '/admin/dashboard' : '/profile'} 
                className="flex items-center gap-2 text-[#5D4037] hover:text-[#C5A059] transition-colors border-b border-transparent hover:border-[#C5A059] pb-1">
                <User className="w-4 h-4 text-[#C5A059]" />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-[#8D6E63] hover:text-red-700 transition-colors"
                title="Depart"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="flex items-center gap-2 text-[#5D4037] hover:text-[#C5A059] transition-colors pb-1">
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
              <Link to="/register" className="bg-[#5D4037] text-white px-8 py-3 rounded-none hover:bg-[#2C1D1A] transition-all duration-500 shadow-lg shadow-black/10">
                Reserve Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#5D4037] hover:text-[#C5A059] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#E8E2D6] shadow-2xl py-10 flex flex-col items-center gap-6 animate-in slide-in-from-top-2">
          {[
            { name: 'Heritage', path: '/' },
            { name: 'Sanctuaries', path: '/rooms' },
            { name: 'Our Story', path: '/about' },
            { name: 'Concierge', path: '/contact' },
            { name: 'Experiences', path: '/feedbacks' },
            { name: 'Support', path: '/help' }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="text-xs font-bold text-[#5D4037] hover:text-[#C5A059] uppercase tracking-[0.2em]" 
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="w-1/2 h-px bg-[#E8E2D6] my-4"></div>
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-[#5D4037] font-bold text-xs uppercase tracking-[0.1em]" onClick={() => setIsOpen(false)}>
                <User className="w-4 h-4 text-[#C5A059]" />
                {user.name}
              </Link>
              <button onClick={() => {handleLogout(); setIsOpen(false)}} className="text-red-700 font-bold text-xs uppercase tracking-[0.1em] flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Depart
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2 text-[#5D4037] font-bold text-xs uppercase tracking-[0.1em]" onClick={() => setIsOpen(false)}>
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
              <Link to="/register" className="bg-[#5D4037] text-white px-10 py-4 w-3/4 text-center font-bold text-xs uppercase tracking-[0.2em]" onClick={() => setIsOpen(false)}>
                Reserve Now
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
