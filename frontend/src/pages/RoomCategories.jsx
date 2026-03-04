import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Palmtree, 
    Search, 
    Plus, 
    Edit2, 
    Trash2, 
    Image as ImageIcon,
    Type,
    FileText,
    X,
    Check,
    Loader2,
    AlertCircle
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const RoomCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/room-types');
            setCategories(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching categories', err);
            setLoading(false);
        }
    };

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: ''
            });
        }
        setIsModalOpen(true);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (editingCategory) {
                await axios.put(`http://localhost:8080/api/room-types/${editingCategory.id}`, formData);
                setSuccess('Category updated successfully');
            } else {
                await axios.post('http://localhost:8080/api/room-types', formData);
                setSuccess('Category created successfully');
            }
            fetchCategories();
            setIsModalOpen(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save category');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`http://localhost:8080/api/room-types/${id}`);
                setSuccess('Category deleted successfully');
                fetchCategories();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to delete category');
            }
        }
    };

    const filteredCategories = categories.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <div className="flex-1 mr-64">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <Palmtree className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Room Categories</h1>
                    </div>
                    
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                    >
                        <Plus className="w-5 h-5" />
                        New Category
                    </button>
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
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search categories..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                <span>Showing {filteredCategories.length} categories</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                      
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category Name</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center">
                                                <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mx-auto mb-4" />
                                                <p className="text-slate-500 animate-pulse">Loading categories...</p>
                                            </td>
                                        </tr>
                                    ) : filteredCategories.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center">
                                                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                                    <Search className="w-8 h-8" />
                                                </div>
                                                <p className="text-slate-500">No categories found.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredCategories.map((c) => (
                                            <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                                         
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                                            {c.name.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-slate-800">{c.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => handleOpenModal(c)}
                                                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(c.id)}
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800">{editingCategory ? 'Edit Category' : 'New Category'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-start gap-2 border border-red-100">
                                    <AlertCircle className="w-5 h-5 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                        <Type className="w-4 h-4" /> Category Name
                                    </label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                                        placeholder="e.g. Deluxe Ocean Suite"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                                >
                                    {editingCategory ? 'Save Changes' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomCategories;
