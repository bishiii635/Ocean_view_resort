import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, Loader2, ArrowRight, Crown, ShieldAlert } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      login(response.data);
      
      let targetPath = '/profile';
      if (response.data.role === 'ADMIN') targetPath = '/admin/dashboard';
      else if (response.data.role === 'STAFF') targetPath = '/staff/dashboard';
      
      navigate(targetPath);
    } catch (err) {
      setError(err.response?.data?.error || 'Registry identification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between font-sans">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6 pt-48 pb-20">
        <div className="bg-white border border-[#E8E2D6] shadow-2xl w-full max-w-md p-12 relative animate-in fade-in zoom-in-95 duration-700">
           <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-[#C5A059]/20 translate-x-3 -translate-y-3"></div>
           
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#5D4037] text-[#C5A059] flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-serif font-black text-[#2C1D1A] tracking-tight">Identity Verifier</h2>
            <p className="text-[#8D6E63] font-bold text-[9px] uppercase tracking-[0.4em] mt-3 italic">Consulting the Royal Registry</p>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-[0.1em] flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0" /> 
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Communication Channel</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                  placeholder="noble@heritage.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Private Cipher</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 border-[#E8E2D6] text-[#5D4037] focus:ring-[#C5A059]" />
                <span className="text-[#8D6E63] group-hover:text-[#5D4037]">Remember Identity</span>
              </label>
              <Link to="/forgot-password" class="text-[#C5A059] hover:text-[#5D4037] transition-colors">Recover Cipher</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2C1D1A] text-white py-6 font-bold text-[11px] uppercase tracking-[0.4em] hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 flex items-center justify-center gap-4 group disabled:opacity-50 shadow-2xl"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Identify <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-12 text-center text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em]">
            Newly Arrived?{' '}
            <Link to="/register" className="text-[#C5A059] hover:text-[#2C1D1A] transition-colors border-b border-[#C5A059]/30 pb-1">
              Obtain Noble Rank
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
