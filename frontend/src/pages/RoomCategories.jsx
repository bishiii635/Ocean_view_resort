import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Palmtree, Search, Plus, Edit2, Trash2, Image as ImageIcon, Type, FileText, X, Check, Loader2, AlertCircle, Crown, Gem, Sparkles
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

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
                setSuccess('Heritage category status updated.');
            } else {
                await axios.post('http://localhost:8080/api/room-types', formData);
                setSuccess('New sanctuary rank established.');
            }
            fetchCategories();
            setIsModalOpen(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registry modification failed.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you certain you wish to expunge this category from the imperial records?')) {
            try {
                await axios.delete(`http://localhost:8080/api/room-types/${id}`);
                setSuccess('Category expunged from records.');
                fetchCategories();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to expunge category.');
            }
        }
    };

    const filteredCategories = categories.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <main className="pt-40 pb-20 px-6 container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="p-5 bg-[#2C1D1A] text-[#C5A059] shadow-2xl">
                            <Palmtree className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2C1D1A] italic tracking-tight">Sanctuary Ranks</h1>
                            <p className="text-[#8D6E63] text-[10px] font-bold uppercase tracking-[0.4em]">Classification of noble living quarters</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-4 bg-[#5D4037] text-white px-10 py-5 font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl group"
                    >
                        <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />
                        Establish New Rank
                    </button>
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
                                placeholder="Search ranks by designation..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-8 py-4 bg-white border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                            />
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.2em]">
                            <Sparkles className="w-4 h-4 text-[#C5A059] opacity-50" />
                            <span>Observing {filteredCategories.length} Established Ranks</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#2C1D1A] text-[#C5A059]">
                                <tr>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Imperial Designation</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-right">Decrees</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E2D6]">
                                {loading ? (
                                    <tr>
                                        <td colSpan="2" className="px-10 py-32 text-center">
                                            <Loader2 className="w-16 h-16 animate-spin text-[#C5A059] mx-auto mb-6" />
                                            <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] italic animate-pulse">Syncing with Grand Archives...</p>
                                        </td>
                                    </tr>
                                ) : filteredCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan="2" className="px-10 py-32 text-center text-[#8D6E63]">
                                            <div className="bg-[#FAF9F6] w-24 h-24 flex items-center justify-center mx-auto mb-8 border border-[#E8E2D6]">
                                                <Search className="w-10 h-10 text-[#E8E2D6]" />
                                            </div>
                                            <p className="text-xl font-serif italic text-xl">No ranks found in current annals.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCategories.map((c) => (
                                        <tr key={c.id} className="hover:bg-[#FAF9F6] transition-all duration-500 group">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-[#5D4037] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center font-serif font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">
                                                        {c.name.charAt(0)}
                                                    </div>
                                                    <span className="font-serif font-bold text-[#2C1D1A] text-2xl italic tracking-tight opacity-90">{c.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                                    <button 
                                                        onClick={() => handleOpenModal(c)}
                                                        className="p-3 text-[#C5A059] border border-[#C5A059]/20 hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all duration-500"
                                                        title="Modify Designation"
                                                    >
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(c.id)}
                                                        className="p-3 text-rose-400 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all duration-500"
                                                        title="Expunge Rank"
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

            <Footer />

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#2C1D1A]/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white border border-[#E8E2D6] w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-[#C5A059]/20 translate-x-3 -translate-y-3"></div>
                        
                        <div className="p-10 border-b border-[#FAF9F6] flex justify-between items-center bg-[#FAF9F6]/50">
                             <div className="flex items-center gap-4">
                                <Crown className="w-6 h-6 text-[#C5A059]" />
                                <h2 className="text-3xl font-serif font-black text-[#2C1D1A] italic">{editingCategory ? 'Modify Designation' : 'Establish Rank'}</h2>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 text-[#8D6E63] hover:text-[#2C1D1A] transition-all">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-12 space-y-10">
                            {error && (
                                <div className="p-6 bg-rose-50 border border-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 animate-shake">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">
                                        Imperial Designation Name
                                    </label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                                        placeholder="e.g. Royal Grand Suite"
                                    />
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
                                    className="flex-1 px-10 py-5 font-bold text-[10px] tracking-[0.3em] text-white bg-[#5D4037] hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl uppercase flex items-center justify-center gap-3"
                                >
                                    {editingCategory ? 'Seal Changes' : 'Confirm Establishment'}
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
