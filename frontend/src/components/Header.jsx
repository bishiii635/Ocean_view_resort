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
    <header className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] py-5' : 'bg-transparent py-10'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo - The Heritage Crest */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className={`p-2 border transition-all duration-700 group-hover:rotate-[360deg] ${scrolled ? 'bg-[#5D4037] border-[#C5A059]' : 'bg-white/10 backdrop-blur-sm border-white/40'}`}>
            <Crown className={`${scrolled ? 'text-[#C5A059]' : 'text-white'} w-7 h-7`} />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-3xl font-black tracking-tight uppercase transition-colors duration-700 font-serif ${scrolled ? 'text-[#2C1D1A]' : 'text-white'}`}>
              Ocean<span className="text-[#C5A059]">View</span>
            </span>
            <span className={`text-[9px] tracking-[0.5em] uppercase font-black transition-colors duration-700 ${scrolled ? 'text-[#8D6E63]' : 'text-[#C5A059]'}`}>Resort & Imperial Spa</span>
          </div>
        </Link>

        {/* Desktop Navigation - Sovereign Links */}
        <nav className="hidden lg:flex items-center gap-12">
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
              className={`text-[10px] font-black tracking-[0.4em] uppercase transition-all duration-500 relative group ${scrolled ? 'text-[#5D4037] hover:text-[#C5A059]' : 'text-white/80 hover:text-white'}`}
            >
              {item.name}
              <span className={`absolute -bottom-2 left-0 h-[2px] transition-all duration-500 group-hover:w-full w-0 ${scrolled ? 'bg-[#C5A059]' : 'bg-white'}`}></span>
            </Link>
          ))}
        </nav>

        {/* Auth Buttons - Noble Access */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] tracking-[0.3em] font-black uppercase">
          {user ? (
            <div className="flex items-center gap-8">
              <Link to={user.role === 'ADMIN' || user.role === 'STAFF' ? '/admin/dashboard' : '/profile'} 
                className={`flex items-center gap-3 transition-all duration-500 border-b-2 border-transparent hover:border-[#C5A059] pb-1 ${scrolled ? 'text-[#2C1D1A]' : 'text-white'}`}>
                <User className={`w-4 h-4 ${scrolled ? 'text-[#C5A059]' : 'text-[#C5A059]'}`} />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className={`p-2 transition-colors ${scrolled ? 'text-[#8D6E63] hover:text-red-700' : 'text-white/60 hover:text-white'}`}
                title="Depart"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link to="/login" className={`flex items-center gap-3 transition-all duration-500 border-b-2 border-transparent hover:border-white pb-1 ${scrolled ? 'text-[#5D4037]' : 'text-white'}`}>
                <LogIn className="w-4 h-4 text-[#C5A059]" />
                <span>Sign In</span>
              </Link>
              <Link to="/register" className={`px-12 py-4 shadow-2xl transition-all duration-700 ${scrolled ? 'bg-[#5D4037] text-white hover:bg-[#2C1D1A]' : 'bg-white text-[#2C1D1A] hover:bg-[#C5A059] hover:text-white'}`}>
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
