import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
             setError('Password must be at least 8 characters long');
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
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
            <Header />
            
            <main className="flex-1 flex items-center justify-center p-6 pt-24 md:pt-32">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-slate-100 animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-12 -translate-y-12"></div>
                    
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h2>
                        <p className="text-slate-500 mt-2">Join us for a luxury experience</p>
                    </div>

                    {success ? (
                        <div className="flex flex-col items-center justify-center py-12 animate-in fade-in transition-all">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-green-700">Registration Successful!</h3>
                            <p className="text-slate-500 mt-2">Redirecting to profile...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-start gap-2 border border-red-100 animate-in fade-in">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" /> 
                                    <span>{error}</span>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

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

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 ml-1">Must be at least 8 characters long</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none ${
                                            confirmPassword && password !== confirmPassword 
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                                            : 'border-slate-200 focus:border-cyan-500'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1 ml-1">Passwords do not match</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                            </button>
                        </form>
                    )}

                    <div className="mt-8 text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-cyan-600 font-semibold hover:underline decoration-2 underline-offset-2">
                            Sign in instead
                        </Link>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Register;
