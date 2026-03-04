import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Lock, Loader2, CheckCircle2, Crown, ShieldAlert } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Cipher sequences do not match');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await axios.post('http://localhost:8080/api/auth/reset-password', { 
        token, 
        newPassword: password 
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registry token has expired or is invalid.');
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

          {success ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-10">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-serif font-black text-[#2C1D1A]">Cipher Re-established!</h2>
              <p className="text-[#8D6E63] font-bold text-[9px] uppercase tracking-[0.3em] mt-3">Registry updated. Returning to Identification...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                 <div className="w-16 h-16 bg-[#5D4037] text-[#C5A059] flex items-center justify-center mx-auto mb-6">
                    <Crown className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-serif font-black text-[#2C1D1A] tracking-tight">New Cipher Decree</h2>
                <p className="text-[#8D6E63] font-bold text-[9px] uppercase tracking-[0.4em] mt-3 italic">Establish Your New Private Sequence</p>
              </div>

              {error && (
                <div className="mb-8 p-6 bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-[0.1em] flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 shrink-0" /> 
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">New Private Cipher</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-6 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                      placeholder="••••••••"
                      minLength={8}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Confirm New Cipher</label>
                  <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full pl-14 pr-6 py-5 bg-[#FAF9F6] border transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A] ${
                        confirmPassword && password !== confirmPassword 
                        ? 'border-rose-300 focus:border-rose-500' 
                        : 'border-[#E8E2D6] focus:border-[#C5A059]'
                      }`}
                      placeholder="••••••••"
                      minLength={8}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !token}
                  className="w-full bg-[#2C1D1A] text-white py-6 font-bold text-[11px] uppercase tracking-[0.4em] hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 flex items-center justify-center gap-4 group disabled:opacity-50 shadow-2xl"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Decree New Cipher'}
                </button>
                
                {!token && (
                  <p className="text-rose-600 text-[9px] font-bold uppercase tracking-[0.2em] mt-4 text-center">Missing Registry Token. Link Integrity Failed.</p>
                )}
              </form>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResetPassword;
