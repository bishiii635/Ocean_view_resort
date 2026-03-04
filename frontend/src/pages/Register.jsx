import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Loader2, CheckCircle, AlertCircle, Crown, ShieldAlert } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Auth context
    const { login } = useAuth();
    const navigate = useNavigate();
    
    // State
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Cipher sequences do not match');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
             setError('Cipher must be at least 8 characters long');
             setLoading(false);
             return;
        }
        
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', { name, email, password });
            setSuccess(true);
            setTimeout(() => {
                login(response.data);
                navigate('/profile');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.error || 'Registry enrollment failed. Please try again.');
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
                        <h2 className="text-4xl font-serif font-black text-[#2C1D1A] tracking-tight">Noble Registry</h2>
                        <p className="text-[#8D6E63] font-bold text-[9px] uppercase tracking-[0.4em] mt-3 italic">Establish Your Royal Identity</p>
                    </div>

                    {success ? (
                        <div className="flex flex-col items-center justify-center py-16 animate-in fade-in transition-all">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mb-8">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-emerald-800">Enrollment Successful!</h3>
                            <p className="text-[#8D6E63] font-bold text-[9px] uppercase tracking-[0.2em] mt-3">Welcome to the inner circle.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="mb-8 p-6 bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-[0.1em] flex items-center gap-3">
                                    <ShieldAlert className="w-5 h-5 shrink-0" /> 
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Distinguished Name</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                                        placeholder="Full Name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Electronic Mail</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                                        placeholder="noble@heritage.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Private Cipher</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Confirm Cipher</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full pl-14 pr-6 py-4 bg-[#FAF9F6] border transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A] ${
                                            confirmPassword && password !== confirmPassword 
                                            ? 'border-rose-300 focus:border-rose-500' 
                                            : 'border-[#E8E2D6] focus:border-[#C5A059]'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#2C1D1A] text-white py-6 font-bold text-[11px] uppercase tracking-[0.4em] hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 flex items-center justify-center gap-4 group disabled:opacity-50 shadow-2xl mt-4"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enroll In Registry'}
                            </button>
                        </form>
                    )}

                    <div className="mt-12 text-center text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em]">
                        Already Inscribed?{' '}
                        <Link to="/login" className="text-[#C5A059] hover:text-[#2C1D1A] transition-colors border-b border-[#C5A059]/30 pb-1">
                            Identify Instead
                        </Link>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Register;
