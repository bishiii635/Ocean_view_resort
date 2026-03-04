import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Users, 
    Search, 
    UserPlus, 
    Edit2, 
    Trash2, 
    Mail, 
    Shield, 
    X,
    Check,
    Loader2,
    AlertCircle
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
                setSuccess('User updated successfully');
            } else {
                await axios.post('http://localhost:8080/api/users', formData);
                setSuccess('User created successfully');
            }
            fetchUsers();
            setIsModalOpen(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save user');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:8080/api/users/${id}`);
                setSuccess('User deleted successfully');
                fetchUsers();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to delete user');
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
        <div className="flex bg-slate-50 min-h-screen">
            <div className="flex-1 mr-64">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
                            <Users className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            {currentUser?.role === 'STAFF' ? 'Guest Directory' : 'User Management'}
                        </h1>
                    </div>
                    
                    {currentUser?.role === 'ADMIN' && (
                        <button 
                            onClick={() => handleOpenModal()}
                            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                        >
                            <UserPlus className="w-5 h-5" />
                            Add New User
                        </button>
                    )}
                </header>

                <main className="p-8">
                    {success && (
                        <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-xl flex items-center gap-3 border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                            <Check className="w-5 h-5" />
                            <span className="font-medium">{success}</span>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative flex-1 max-md">
                                <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search by name or email..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                <span>Showing {filteredUsers.length} {currentUser?.role === 'STAFF' ? 'guests' : 'users'}</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                                        {currentUser?.role === 'ADMIN' && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={currentUser?.role === 'ADMIN' ? '4' : '3'} className="px-6 py-12 text-center">
                                                <Loader2 className="w-10 h-10 animate-spin text-cyan-600 mx-auto mb-4" />
                                                <p className="text-slate-500 animate-pulse">Loading data...</p>
                                            </td>
                                        </tr>
                                    ) : filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={currentUser?.role === 'ADMIN' ? '4' : '3'} className="px-6 py-12 text-center">
                                                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                                    <Search className="w-8 h-8" />
                                                </div>
                                                <p className="text-slate-500">No matching entries found.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((u) => (
                                            <tr key={u.id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 flex items-center justify-center font-bold">
                                                            {u.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800">{u.name}</p>
                                                            <p className="text-xs text-slate-400">ID: {u.id.substring(0, 8)}...</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                                                        u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 
                                                        u.role === 'STAFF' ? 'bg-blue-100 text-blue-700' : 
                                                        'bg-slate-100 text-slate-700'
                                                    }`}>
                                                        <Shield className="w-3 h-3" />
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                        <Mail className="w-4 h-4 text-slate-400" />
                                                        {u.email}
                                                    </div>
                                                </td>
                                                {currentUser?.role === 'ADMIN' && (
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => handleOpenModal(u)}
                                                                className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all"
                                                            >
                                                                <Edit2 className="w-5 h-5" />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDelete(u.id)}
                                                                disabled={u.id === currentUser?.id}
                                                                className={`p-2 rounded-lg transition-all ${
                                                                    u.id === currentUser?.id 
                                                                    ? 'text-slate-200 cursor-not-allowed' 
                                                                    : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                                                                }`}
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
            </div>

            <AdminSidebar />

            {/* User Modal - Restrict to ADMIN */}
            {isModalOpen && currentUser?.role === 'ADMIN' && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800">{editingUser ? 'Edit User' : 'Add New User'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
                                </label>
                                <input 
                                    type="password" 
                                    required={!editingUser}
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">User Role</label>
                                <select 
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none bg-white font-medium"
                                >
                                    <option value="GUEST">Guest</option>
                                    <option value="STAFF">Staff</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-cyan-600 hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-200"
                                >
                                    {editingUser ? 'Save Changes' : 'Create User'}
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
