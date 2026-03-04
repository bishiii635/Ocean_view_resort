import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    BedDouble, Search, Plus, Edit2, Trash2, Eye, Image as ImageIcon, Tag, List, DollarSign, Users, X, Check, Loader2, AlertCircle, Upload, ChevronLeft, ChevronRight, Crown, Gem, Sparkles, Anchor, MapPin, Compass
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [viewingRoom, setViewingRoom] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        roomTypeId: '',
        status: 'AVAILABLE',
        description: '',
        amenities: [],
        rate: '',
        capacity: '',
        image1: '',
        image2: '',
        image3: ''
    });
    const [newAmenity, setNewAmenity] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [roomsRes, categoriesRes] = await Promise.all([
                axios.get('http://localhost:8080/api/rooms'),
                axios.get('http://localhost:8080/api/room-types')
            ]);
            setRooms(roomsRes.data);
            setCategories(categoriesRes.data);
        } catch (err) {
            console.error('Error fetching data', err);
            setError('Estate archival synchronization failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (room = null) => {
        if (room) {
            setEditingRoom(room);
            setFormData({
                name: room.name || '',
                roomTypeId: room.roomTypeId || '',
                status: room.status || 'AVAILABLE',
                description: room.description || '',
                amenities: room.amenities || [],
                rate: room.rate || '',
                capacity: room.capacity || '',
                image1: room.image1 || '',
                image2: room.image2 || '',
                image3: room.image3 || ''
            });
        } else {
            setEditingRoom(null);
            setFormData({
                name: '',
                roomTypeId: categories.length > 0 ? categories[0].id : '',
                status: 'AVAILABLE',
                description: '',
                amenities: [],
                rate: '',
                capacity: '',
                image1: '',
                image2: '',
                image3: ''
            });
        }
        setIsModalOpen(true);
        setError('');
    };

    const handleViewRoom = (room) => {
        setViewingRoom(room);
        setIsViewModalOpen(true);
    };

    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    [`image${index}`]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const addAmenity = () => {
        if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, newAmenity.trim()]
            }));
            setNewAmenity('');
        }
    };

    const removeAmenity = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.filter(a => a !== amenity)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!formData.name || !formData.roomTypeId || !formData.rate || !formData.capacity) {
            setError('Please document all required architectural details.');
            return;
        }

        try {
            const payload = {
                ...formData,
                rate: parseFloat(formData.rate),
                capacity: parseInt(formData.capacity)
            };

            if (editingRoom) {
                await axios.put(`http://localhost:8080/api/rooms/${editingRoom.id}`, payload);
                setSuccess('Sanctuary blueprint updated.');
            } else {
                await axios.post('http://localhost:8080/api/rooms', payload);
                setSuccess('New sanctuary commissioned.');
            }
            fetchData();
            setIsModalOpen(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Architectural record preservation failed.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you certain you wish to decommission this sanctuary?')) {
            try {
                await axios.delete(`http://localhost:8080/api/rooms/${id}`);
                setSuccess('Sanctuary decommissioned.');
                fetchData();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to decommission room.');
            }
        }
    };

    const filteredRooms = rooms.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryName = (id) => {
        return categories.find(c => c.id === id)?.name || 'Unknown Rank';
    };

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <main className="pt-40 pb-20 px-6 container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="p-5 bg-[#2C1D1A] text-[#C5A059] shadow-2xl">
                            <BedDouble className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#2C1D1A] italic tracking-tight">Estate Sanctuaries</h1>
                            <p className="text-[#8D6E63] text-[10px] font-bold uppercase tracking-[0.4em]">Inventory of noble living quarters</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-4 bg-[#5D4037] text-white px-10 py-5 font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-[#2C1D1A] transition-all duration-500 shadow-2xl group"
                    >
                        <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />
                        Commission New Sanctuary
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
                                placeholder="Search archives for sanctuary names..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-8 py-4 bg-white border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                            />
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.2em]">
                            <Sparkles className="w-4 h-4 text-[#C5A059] opacity-50" />
                            <span>Observing {filteredRooms.length} Registered Sanctuaries</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#2C1D1A] text-[#C5A059]">
                                <tr>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Sanctuary</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Estate Rank</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Era Rate</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em]">Presence</th>
                                    <th className="px-10 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-right">Decrees</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E2D6]">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-10 py-32 text-center">
                                            <Loader2 className="w-16 h-16 animate-spin text-[#C5A059] mx-auto mb-6" />
                                            <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] italic animate-pulse">Consulting Estate blue-prints...</p>
                                        </td>
                                    </tr>
                                ) : filteredRooms.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-10 py-32 text-center text-[#8D6E63]">
                                            <div className="bg-[#FAF9F6] w-24 h-24 flex items-center justify-center mx-auto mb-8 border border-[#E8E2D6]">
                                                <Anchor className="w-10 h-10 text-[#E8E2D6]" />
                                            </div>
                                            <p className="text-xl font-serif italic text-xl">No sanctuaries discovered in current archives.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredRooms.map((room) => (
                                        <tr key={room.id} className="hover:bg-[#FAF9F6] transition-all duration-500 group">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-[#2C1D1A] border border-[#C5A059]/20 overflow-hidden shadow-lg group-hover:rotate-6 transition-transform">
                                                        {room.image1 ? (
                                                            <img src={room.image1} alt={room.name} className="w-full h-full object-cover opacity-80" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-[#C5A059]">
                                                                <ImageIcon className="w-8 h-8 opacity-40" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-serif font-bold text-[#2C1D1A] text-xl italic opacity-90">{room.name}</p>
                                                        <p className="text-[9px] text-[#C5A059] font-bold uppercase tracking-[0.2em] mt-1">Capacity: {room.capacity} Distinguished Persons</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className="text-[9px] font-bold text-[#2C1D1A] uppercase tracking-[0.2em] border border-[#C5A059]/30 px-3 py-1.5 shadow-sm bg-white italic">
                                                    {getCategoryName(room.roomTypeId)}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 font-serif font-bold text-[#5D4037] text-lg italic tracking-tight">
                                                LKR {room.rate.toLocaleString()} <span className="text-[10px] text-[#8D6E63] font-sans uppercase">/ Era night</span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] border shadow-sm ${
                                                    room.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    room.status === 'MAINTENANCE' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                                    'bg-[#FAF9F6] text-[#C5A059] border-[#C5A059]/30'
                                                }`}>
                                                    {room.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                                    <button 
                                                        onClick={() => handleViewRoom(room)}
                                                        className="p-3 text-[#C5A059] border border-[#C5A059]/20 hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all duration-500"
                                                        title="Observe Details"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleOpenModal(room)}
                                                        className="p-3 text-[#5D4037] border border-[#5D4037]/20 hover:bg-[#5D4037] hover:text-white transition-all duration-500"
                                                        title="Modify Blueprint"
                                                    >
                                                        <Edit2 className="w-5 h-5" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(room.id)}
                                                        className="p-3 text-rose-400 border border-rose-100 hover:bg-rose-500 hover:text-white transition-all duration-500"
                                                        title="Decommission"
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

            {/* Room Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#2C1D1A]/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white border border-[#E8E2D6] w-full max-w-5xl max-h-[90vh] shadow-2xl relative animate-in fade-in zoom-in-95 duration-500 overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#C5A059]/20 translate-x-4 -translate-y-4"></div>
                        
                        <div className="p-10 border-b border-[#FAF9F6] flex justify-between items-center bg-[#FAF9F6]/50">
                            <div className="flex items-center gap-6">
                                <Crown className="w-8 h-8 text-[#C5A059]" />
                                <h2 className="text-3xl font-serif font-black text-[#2C1D1A] italic">{editingRoom ? 'Modify Blueprint' : 'Commission Sanctuary'}</h2>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 text-[#8D6E63] hover:text-[#2C1D1A] transition-all">
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-12 space-y-12 scrollbar-hide">
                            {error && (
                                <div className="p-6 bg-rose-50 border border-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 animate-shake">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                {/* Left Side: Basic Info */}
                                <div className="space-y-10">
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Sanctuary Designation</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                                            placeholder="e.g. Imperial Ocean Suite 402"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Legacy Rank</label>
                                            <select 
                                                required
                                                value={formData.roomTypeId}
                                                onChange={(e) => setFormData({...formData, roomTypeId: e.target.value})}
                                                className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-bold text-[10px] uppercase tracking-[0.2em] bg-white h-[58px]"
                                            >
                                                <option value="" disabled>Select Rank</option>
                                                {categories.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Registry Presence</label>
                                            <select 
                                                value={formData.status}
                                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                                className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-bold text-[10px] uppercase tracking-[0.2em] bg-white h-[58px]"
                                            >
                                                <option value="AVAILABLE">Imperial Presence (Available)</option>
                                                <option value="MAINTENANCE">Restoration Phase (Maintenance)</option>
                                                <option value="BOOKED">Noble Occupied (Booked)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Prosperity Rate (LKR)</label>
                                            <input 
                                                type="number" 
                                                required
                                                value={formData.rate}
                                                onChange={(e) => setFormData({...formData, rate: e.target.value})}
                                                className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                                                placeholder="0.00"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Imperial Capacity</label>
                                            <input 
                                                type="number" 
                                                required
                                                value={formData.capacity}
                                                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                                                className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                                                placeholder="2"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Noble Narrative</label>
                                        <textarea 
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            className="w-full px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic min-h-[160px] resize-none leading-relaxed"
                                            placeholder="Chronicle the unique features and vistas of this sanctuary..."
                                        />
                                    </div>
                                </div>

                                {/* Right Side: Images & Amenities */}
                                <div className="space-y-12">
                                    <div className="space-y-6">
                                        <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] flex items-center gap-3">
                                            <ImageIcon className="w-5 h-5 text-[#C5A059]" /> Visual Chronicles (Max 3)
                                        </label>
                                        <div className="grid grid-cols-3 gap-6">
                                            {[1, 2, 3].map(idx => (
                                                <div key={idx} className="relative aspect-square bg-[#FAF9F6] border-2 border-dashed border-[#E8E2D6] overflow-hidden hover:border-[#C5A059] transition-all group cursor-pointer shadow-inner">
                                                    {formData[`image${idx}`] ? (
                                                        <>
                                                            <img src={formData[`image${idx}`]} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" alt="Preview" />
                                                            <button 
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); setFormData({...formData, [`image${idx}`]: ''})}}
                                                                className="absolute top-2 right-2 p-2 bg-[#2C1D1A] text-[#C5A059] shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                                            <Upload className="w-8 h-8 text-[#E8E2D6] mb-3 group-hover:scale-110 transition-transform" />
                                                            <span className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-[0.2em]">Era {idx}</span>
                                                            <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, idx)} />
                                                        </label>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <label className="block text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] flex items-center gap-3">
                                            <List className="w-5 h-5 text-[#C5A059]" /> Noble Amenities
                                        </label>
                                        <div className="flex gap-4">
                                            <input 
                                                type="text" 
                                                value={newAmenity}
                                                onChange={(e) => setNewAmenity(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                                                className="flex-1 px-6 py-4 bg-[#FAF9F6] border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                                                placeholder="e.g. Imperial Silk Linens..."
                                            />
                                            <button 
                                                type="button"
                                                onClick={addAmenity}
                                                className="bg-[#2C1D1A] text-[#C5A059] p-4 shadow-xl hover:bg-[#5D4037] transition-all"
                                            >
                                                <Plus className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-3 max-h-[220px] overflow-y-auto pr-4 scrollbar-hide">
                                            {formData.amenities.map(a => (
                                                <span key={a} className="bg-white text-[#2C1D1A] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] flex items-center gap-4 border border-[#E8E2D6] shadow-sm italic">
                                                    {a}
                                                    <X className="w-3.5 h-3.5 cursor-pointer text-[#C5A059] hover:text-rose-500 transition-colors" onClick={() => removeAmenity(a)} />
                                                </span>
                                            ))}
                                            {formData.amenities.length === 0 && (
                                                <p className="text-xs text-[#8D6E63] italic opacity-60">No distinct protocols or amenities added yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6 pt-10 border-t border-[#FAF9F6]">
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
                                    {editingRoom ? 'Seal Blueprint Changes' : 'Confirm Sanctuary Commission'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Details Modal */}
            {isViewModalOpen && viewingRoom && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#2C1D1A]/90 backdrop-blur-md" onClick={() => setIsViewModalOpen(false)}></div>
                    <div className="bg-white border border-[#E8E2D6] w-full max-w-6xl max-h-[95vh] shadow-2xl relative animate-in fade-in zoom-in-95 duration-700 overflow-hidden flex flex-col">
                         <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-[#C5A059]/10 -translate-x-8 -translate-y-8"></div>
                        
                        <div className="p-12 border-b border-[#FAF9F6] flex justify-between items-center bg-[#FAF9F6]/50 relative z-10">
                            <div className="flex items-center gap-8">
                                <div className="p-5 bg-[#2C1D1A] text-[#C5A059] shadow-2xl">
                                    <Compass className="w-10 h-10" />
                                </div>
                                <div>
                                    <h2 className="text-4xl font-serif font-black text-[#2C1D1A] italic tracking-tight">{viewingRoom.name}</h2>
                                    <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.5em] mt-2">Imperial Sanctuary Observation</p>
                                </div>
                            </div>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-4 text-[#8D6E63] hover:text-[#2C1D1A] transition-all">
                                <X className="w-10 h-10" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-16 scrollbar-hide">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                                {/* Details Side */}
                                <div className="space-y-16">
                                    <div>
                                        <h3 className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
                                            <span className="w-12 h-px bg-[#C5A059]/30"></span> Core Particulars
                                        </h3>
                                        <div className="grid grid-cols-2 gap-10">
                                            <div className="bg-[#FAF9F6] p-10 border border-[#E8E2D6] shadow-sm relative group overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A059]/20 group-hover:bg-[#C5A059] transition-colors"></div>
                                                <p className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.2em] mb-4">Nightly Prosperity</p>
                                                <p className="text-3xl font-serif font-black text-[#2C1D1A] italic">LKR {viewingRoom.rate.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-[#FAF9F6] p-10 border border-[#E8E2D6] shadow-sm relative group overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A059]/20 group-hover:bg-[#C5A059] transition-colors"></div>
                                                <p className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.2em] mb-4">Imperial Capacity</p>
                                                <p className="text-3xl font-serif font-black text-[#2C1D1A] italic">{viewingRoom.capacity} Nobles</p>
                                            </div>
                                            <div className="bg-[#FAF9F6] p-10 border border-[#E8E2D6] shadow-sm relative group overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A059]/20 group-hover:bg-[#C5A059] transition-colors"></div>
                                                <p className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.2em] mb-4">Estate Rank</p>
                                                <p className="text-2xl font-serif font-black text-[#2C1D1A] italic opacity-80">{getCategoryName(viewingRoom.roomTypeId)}</p>
                                            </div>
                                            <div className="bg-[#FAF9F6] p-10 border border-[#E8E2D6] shadow-sm relative group overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#C5A059]/20 group-hover:bg-[#C5A059] transition-colors"></div>
                                                <p className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.2em] mb-4">Current Protocol</p>
                                                <span className={`px-6 py-2 border text-[10px] font-black uppercase tracking-[0.3em] inline-block shadow-sm italic mt-2 ${
                                                    viewingRoom.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    viewingRoom.status === 'MAINTENANCE' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                                    'bg-white text-[#C5A059] border-[#C5A059]/30'
                                                }`}>
                                                    {viewingRoom.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
                                            <span className="w-12 h-px bg-[#C5A059]/30"></span> Distinguished Amenities
                                        </h3>
                                        <div className="flex flex-wrap gap-4">
                                            {viewingRoom.amenities?.map(a => (
                                                <span key={a} className="bg-white border border-[#E8E2D6] px-8 py-4 text-[11px] font-bold text-[#2C1D1A] shadow-sm flex items-center gap-4 italic group hover:border-[#C5A059] transition-all">
                                                    <Gem className="w-5 h-5 text-[#C5A059] opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    {a}
                                                </span>
                                            ))}
                                            {(!viewingRoom.amenities || viewingRoom.amenities.length === 0) && (
                                                <p className="text-[#8D6E63] italic text-lg opacity-60">No distinct protocols or amenities chronicled for this sanctuary.</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
                                            <span className="w-12 h-px bg-[#C5A059]/30"></span> Architectural Narrative
                                        </h3>
                                        <div className="bg-[#FAF9F6] p-12 border border-[#E8E2D6] text-[#2C1D1A] text-xl font-medium italic leading-[2] shadow-inner relative">
                                            <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-[#C5A059] opacity-20" />
                                            {viewingRoom.description || 'This sanctuary remains un-chronicled in the current era records.'}
                                        </div>
                                    </div>
                                </div>

                                {/* Media Side */}
                                <div className="space-y-12">
                                     <h3 className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
                                        <span className="w-12 h-px bg-[#C5A059]/30"></span> Visual Chronicles
                                    </h3>
                                    <div className="space-y-8">
                                        {[1, 2, 3].map(idx => (
                                            viewingRoom[`image${idx}`] && (
                                                <div key={idx} className="border border-[#E8E2D6] p-4 bg-white shadow-2xl relative group overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#C5A059]/20 to-transparent"></div>
                                                    <img src={viewingRoom[`image${idx}`]} className="w-full h-[400px] object-cover opacity-90 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="Gallery" />
                                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </div>
                                            )
                                        ))}
                                        {!viewingRoom.image1 && !viewingRoom.image2 && !viewingRoom.image3 && (
                                            <div className="bg-[#FAF9F6] h-[600px] flex flex-col items-center justify-center border-4 border-dashed border-[#E8E2D6] text-[#8D6E63]">
                                                <ImageIcon className="w-24 h-24 mb-6 opacity-10" />
                                                <p className="font-serif italic text-2xl opacity-40">No visual chronicles preserved...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 bg-[#FAF9F6] border-t border-[#E8E2D6]">
                            <button 
                                onClick={() => setIsViewModalOpen(false)}
                                className="w-full py-6 font-bold text-white bg-[#2C1D1A] hover:bg-[#5D4037] transition-all duration-500 shadow-2xl text-[10px] uppercase tracking-[0.5em] flex items-center justify-center gap-6"
                            >
                                <Anchor className="w-5 h-5 text-[#C5A059]" /> Terminate Observation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomManagement;
