import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Users, Search, UserPlus, Edit2, Trash2, Mail, Shield, X, Check, Loader2, AlertCircle, Crown, Gem, Sparkles
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const UserManagement = () => {
    const { user: currentUser, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'GUEST'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!authLoading && (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.role !== 'STAFF'))) {
            navigate('/login');
        }
    }, [currentUser, authLoading, navigate]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching users', err);
            setLoading(false);
        }
    };

    const handleOpenModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                name: user.name,
                email: user.email,
                password: '', 
                role: user.role
            });
        } else {
            setEditingUser(null);
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'GUEST'
            });
        }
        setIsModalOpen(true);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editingUser) {
                await axios.put(`http://localhost:8080/api/users/${editingUser.id}`, formData);
                setSuccess('Heritage Record Updated');
            } else {
                await axios.post('http://localhost:8080/api/users', formData);
                setSuccess('New Identity Registered');
            }
            fetchUsers();
            setIsModalOpen(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registry update failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you certain you wish to expunge this identity from the archives?')) {
            try {
                await axios.delete(`http://localhost:8080/api/users/${id}`);
                setSuccess('Identity Expunged');
                fetchUsers();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to expunge record');
            }
        }
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             u.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (currentUser?.role === 'STAFF') {
            return matchesSearch && u.role === 'GUEST';
        }
        return matchesSearch;
    });

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <main className="pt-40 pb-20 px-6 container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="p-5 bg-[#2C1D1A] text-[#C5A059] shadow-2xl">
                            <Users className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2C1D1A] italic">
                                {currentUser?.role === 'STAFF' ? 'Guest Directory' : 'Imperial Registers'}
                            </h1>
                            <p className="text-[#8D6E63] text-[10px] font-bold uppercase tracking-[0.4em]">Official records of the resort citizens</p>
                        </div>
                    </div>
                    
                    {currentUser?.role === 'ADMIN' && (
                        <button 
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-4 bg-[#5D4037] text-white px-10 py-5 font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl group"
                        >
                            <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Enroll New Citizen
                        </button>
                    )}
                </div>

                {success && (
                    <div className="mb-10 p-6 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                        <Check className="w-5 h-5" />
                        <span>{success}</span>
                    </div>
                )}

                <div className="bg-white border border-[#E8E2D6] shadow-2xl overflow-hidden group">
                    <div className="p-10 border-b border-[#FAF9F6] bg-[#FAF9F6]/50 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="relative flex-1 max-w-xl">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                            <input 
                                type="text" 
                                placeholder="Search archives by name or missive..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-8 py-4 bg-white border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                            />
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.2em]">
                            <Sparkles className="w-4 h-4 text-[#C5A059] opacity-50" />
                            <span>Observing {filteredUsers.length} {currentUser?.role === 'STAFF' ? 'Noble Guests' : 'Registered Identities'}</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#2C1D1A] text-[#C5A059]">
                                <tr>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Imperial Citizen</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Noble Rank</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Digital Missive</th>
                                    {currentUser?.role === 'ADMIN' && <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-right">Decrees</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E2D6]">
                                {loading ? (
                                    <tr>
                                        <td colSpan={currentUser?.role === 'ADMIN' ? '4' : '3'} className="px-10 py-32 text-center">
                                            <Loader2 className="w-16 h-16 animate-spin text-[#C5A059] mx-auto mb-6" />
                                            <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] italic animate-pulse">Consulting the Grand Registry...</p>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={currentUser?.role === 'ADMIN' ? '4' : '3'} className="px-10 py-32 text-center">
                                            <div className="bg-[#FAF9F6] w-24 h-24 flex items-center justify-center mx-auto mb-8 border border-[#E8E2D6]">
                                                <Search className="w-10 h-10 text-[#E8E2D6]" />
                                            </div>
                                            <p className="text-[#8D6E63] font-serif italic text-xl">No identities found in current archive view.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((u) => (
                                        <tr key={u.id} className="hover:bg-[#FAF9F6] transition-all duration-500 group">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-[#5D4037] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center font-serif font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">
                                                        {u.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-serif font-bold text-[#2C1D1A] text-xl tracking-tight italic opacity-90">{u.name}</p>
                                                        <p className="text-[9px] text-[#8D6E63] font-bold uppercase tracking-[0.2em] mt-1">ID: HS-{u.id.substring(0, 4)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] border flex items-center w-fit gap-2 ${
                                                    u.role === 'ADMIN' ? 'bg-[#2C1D1A] text-[#C5A059] border-[#C5A059]/30' : 
                                                    u.role === 'STAFF' ? 'bg-[#5D4037]/5 text-[#5D4037] border-[#5D4037]/20' : 
                                                    'bg-white text-[#8D6E63] border-[#E8E2D6]'
                                                }`}>
                                                    <Shield className="w-3 h-3" />
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-3 text-[#2C1D1A] font-medium italic text-lg opacity-80">
                                                    <Mail className="w-4 h-4 text-[#C5A059]" />
                                                    {u.email}
                                                </div>
                                            </td>
                                            {currentUser?.role === 'ADMIN' && (
                                                <td className="px-10 py-8 text-right">
                                                    <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                                        <button 
                                                            onClick={() => handleOpenModal(u)}
                                                            className="p-3 text-[#C5A059] border border-[#C5A059]/20 hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all duration-500"
                                                            title="Edit Archive"
                                                        >
                                                            <Edit2 className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(u.id)}
                                                            disabled={u.id === currentUser?.id}
                                                            className={`p-3 transition-all duration-500 border ${
                                                                u.id === currentUser?.id 
                                                                ? 'text-[#E8E2D6] border-[#E8E2D6] cursor-not-allowed' 
                                                                : 'text-rose-400 border-rose-100 hover:bg-rose-500 hover:text-white hover:border-rose-500'
                                                            }`}
                                                            title="Expunge Record"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer />

            {/* User Modal - Restrict to ADMIN */}
            {isModalOpen && currentUser?.role === 'ADMIN' && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#2C1D1A]/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white border border-[#E8E2D6] w-full max-w-xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-[#C5A059]/20 translate-x-3 -translate-y-3"></div>
                        
                        <div className="p-10 border-b border-[#FAF9F6] flex justify-between items-center bg-[#FAF9F6]/50">
                             <div className="flex items-center gap-4">
                                <Crown className="w-6 h-6 text-[#C5A059]" />
                                <h2 className="text-3xl font-serif font-black text-[#2C1D1A] italic">{editingUser ? 'Edit Archive' : 'Enroll Identity'}</h2>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 text-[#8D6E63] hover:text-[#2C1D1A] transition-all">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-12 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Noble Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                                        placeholder="Enter full name..."
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Digital Missive</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                                        placeholder="noble@estate.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">
                                        {editingUser ? 'Update Cipher (Optional)' : 'Secret Cipher'}
                                    </label>
                                    <input 
                                        type="password" 
                                        required={!editingUser}
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Heritage Rank</label>
                                    <select 
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-bold text-[11px] uppercase tracking-[0.2em] h-[58px]"
                                    >
                                        <option value="GUEST">Noble Guest</option>
                                        <option value="STAFF">Resort Steward</option>
                                        <option value="ADMIN">Imperial Admin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-6 pt-6">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-10 py-5 font-bold text-[10px] tracking-[0.3em] text-[#8D6E63] border border-[#E8E2D6] hover:bg-[#FAF9F6] transition-all uppercase"
                                >
                                    Rescind
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 px-10 py-5 font-bold text-[10px] tracking-[0.3em] text-white bg-[#5D4037] hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl uppercase"
                                >
                                    {editingUser ? 'Seal Changes' : 'Confirm Enrollment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
