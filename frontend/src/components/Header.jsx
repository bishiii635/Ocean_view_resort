import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, LogOut, Menu, X, Palmtree } from 'lucide-react';

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-header py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Palmtree className="text-cyan-500 w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
          <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-slate-800' : 'text-slate-800 lg:text-slate-900'} transition-colors`}>
            Ocean<span className="text-cyan-600">View</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'Rooms', path: '/rooms' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' },
            { name: 'Help', path: '/help' }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="text-slate-600 hover:text-cyan-600 font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to={user.role === 'ADMIN' || user.role === 'STAFF' ? '/admin/dashboard' : '/profile'} 
                className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 font-medium transition-colors">
                <User className="w-5 h-5" />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 font-medium transition-colors px-3 py-2">
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
              <Link to="/register" className="btn-gradient px-5 py-2 shadow-lg shadow-cyan-500/20">
                Book Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-700 hover:text-cyan-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xl py-4 flex flex-col items-center gap-4 animate-in slide-in-from-top-2">
          {[
            { name: 'Home', path: '/' },
            { name: 'Rooms', path: '/rooms' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' },
            { name: 'Help', path: '/help' }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className="text-lg font-medium text-slate-600 hover:text-cyan-600" 
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="w-full h-px bg-slate-100 my-2"></div>
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-slate-600 font-medium" onClick={() => setIsOpen(false)}>
                <User className="w-5 h-5" />
                {user.name}
              </Link>
              <button onClick={() => {handleLogout(); setIsOpen(false)}} className="text-red-500 font-medium flex items-center gap-2">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-2 text-slate-600 font-medium" onClick={() => setIsOpen(false)}>
                <LogIn className="w-5 h-5" /> Sign In
              </Link>
              <Link to="/register" className="btn-gradient px-8 py-2 w-3/4 text-center" onClick={() => setIsOpen(false)}>
                Book Now
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
