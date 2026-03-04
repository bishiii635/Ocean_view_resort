import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Loader2, ArrowLeft, Send, Crown, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Registry transmission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-between font-sans">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6 pt-48 pb-20">
        <div className="bg-white border border-[#E8E2D6] shadow-2xl w-full max-w-md p-12 relative animate-in fade-in zoom-in-95 duration-700 overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-[#C5A059]/20 translate-x-3 -translate-y-3"></div>

          <div className="text-center mb-10">
             <div className="w-16 h-16 bg-[#5D4037] text-[#C5A059] flex items-center justify-center mx-auto mb-6">
                <Crown className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-serif font-black text-[#2C1D1A] tracking-tight">Cipher Recovery</h2>
            <p className="text-[#8D6E63] font-bold text-[9px] uppercase tracking-[0.4em] mt-3 italic">Consulting the Royal Archive</p>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-[0.1em] flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0" /> 
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-8 p-6 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-[0.1em] flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0" /> 
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Registered Channel</label>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2C1D1A] text-white py-6 font-bold text-[11px] uppercase tracking-[0.4em] hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 flex items-center justify-center gap-4 group disabled:opacity-50 shadow-2xl"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Request Inscription <Send className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-12 text-center text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em]">
            <Link to="/login" className="text-[#C5A059] hover:text-[#2C1D1A] transition-colors flex items-center justify-center gap-3 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Return to Identification
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
