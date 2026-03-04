import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Loader2, ArrowLeft, Send } from 'lucide-react';
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
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6 pt-24 md:pt-32">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Forgot Password</h2>
            <p className="text-slate-500 mt-2">Enter your email to receive a password reset link</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-start gap-2 border border-red-100 animate-in fade-in transition-all">
              ⚠️ <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-lg text-sm flex items-start gap-2 border border-emerald-100 animate-in fade-in transition-all">
              ✅ <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Reset Link <Send className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            <Link to="/login" className="text-cyan-600 font-semibold hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
