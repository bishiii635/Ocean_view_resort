import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    BedDouble, 
    Search, 
    Plus, 
    Edit2, 
    Trash2, 
    Eye,
    Image as ImageIcon,
    Tag,
    List,
    DollarSign,
    Users,
    X,
    Check,
    Loader2,
    AlertCircle,
    Upload,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

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
            setError('Failed to connect to the server.');
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
        
        // Validation
        if (!formData.name || !formData.roomTypeId || !formData.rate || !formData.capacity) {
            setError('Please fill in all required fields.');
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
                setSuccess('Room updated successfully');
            } else {
                await axios.post('http://localhost:8080/api/rooms', payload);
                setSuccess('Room created successfully');
            }
            fetchData();
            setIsModalOpen(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save room details.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                await axios.delete(`http://localhost:8080/api/rooms/${id}`);
                setSuccess('Room deleted successfully');
                fetchData();
                setTimeout(() => setSuccess(''), 3000);
            } catch (err) {
                setError('Failed to delete room');
            }
        }
    };

    const filteredRooms = rooms.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCategoryName = (id) => {
        return categories.find(c => c.id === id)?.name || 'Unknown Category';
    };

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <div className="flex-1 mr-64">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <BedDouble className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Room Management</h1>
                    </div>
                    
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Room
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
                                    placeholder="Search by room name..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                <span>Total Rooms: {filteredRooms.length}</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Room</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rate</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
                                                <p className="text-slate-500">Working on it...</p>
                                            </td>
                                        </tr>
                                    ) : filteredRooms.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                                No rooms found. Add some to get started!
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredRooms.map((room) => (
                                            <tr key={room.id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                                                            {room.image1 ? (
                                                                <img src={room.image1} alt={room.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <ImageIcon className="w-full h-full p-2 text-slate-300" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800">{room.name}</p>
                                                            <p className="text-xs text-slate-400 capitalize">Capacity: {room.capacity} Persons</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                                                        {getCategoryName(room.roomTypeId)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-slate-700">
                                                    Rs. {room.rate}/night
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                        room.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' :
                                                        room.status === 'MAINTENANCE' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                        {room.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => handleViewRoom(room)}
                                                            className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-all"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleOpenModal(room)}
                                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                        >
                                                            <Edit2 className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(room.id)}
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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

            {/* Room Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800">{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-start gap-2 border border-red-100">
                                    <AlertCircle className="w-5 h-5 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Side: Basic Info */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Room Name / Number</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                            placeholder="Room 101 - Ocean Suite"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                                            <select 
                                                required
                                                value={formData.roomTypeId}
                                                onChange={(e) => setFormData({...formData, roomTypeId: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-white"
                                            >
                                                <option value="" disabled>Select Category</option>
                                                {categories.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                                            <select 
                                                value={formData.status}
                                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-white"
                                            >
                                                <option value="AVAILABLE">Available</option>
                                                <option value="MAINTENANCE">Maintenance</option>
                                                <option value="BOOKED">Booked</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Nightly Rate (LKR)</label>
                                            <input 
                                                type="number" 
                                                required
                                                value={formData.rate}
                                                onChange={(e) => setFormData({...formData, rate: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                                placeholder="5000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Capacity</label>
                                            <input 
                                                type="number" 
                                                required
                                                value={formData.capacity}
                                                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                                                placeholder="2"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                        <textarea 
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none min-h-[120px] resize-none"
                                            placeholder="Tell us about the room views, features..."
                                        />
                                    </div>
                                </div>

                                {/* Right Side: Images & Amenities */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4 text-blue-500" /> Room Images (Max 3)
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[1, 2, 3].map(idx => (
                                                <div key={idx} className="relative aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden hover:border-blue-400 transition-colors group cursor-pointer">
                                                    {formData[`image${idx}`] ? (
                                                        <>
                                                            <img src={formData[`image${idx}`]} className="w-full h-full object-cover" />
                                                            <button 
                                                                type="button"
                                                                onClick={(e) => { e.stopPropagation(); setFormData({...formData, [`image${idx}`]: ''})}}
                                                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                                            <Upload className="w-6 h-6 text-slate-300 mb-1" />
                                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Image {idx}</span>
                                                            <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, idx)} />
                                                        </label>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                            <List className="w-4 h-4 text-blue-500" /> Amenities
                                        </label>
                                        <div className="flex gap-2 mb-3">
                                            <input 
                                                type="text" 
                                                value={newAmenity}
                                                onChange={(e) => setNewAmenity(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                                                className="flex-1 px-4 py-2 text-sm rounded-xl border border-slate-200 focus:border-blue-500 outline-none"
                                                placeholder="e.g. Free Wi-Fi, Balcony..."
                                            />
                                            <button 
                                                type="button"
                                                onClick={addAmenity}
                                                className="bg-blue-100 text-blue-600 p-2 rounded-xl hover:bg-blue-200 transition-colors"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto pr-2">
                                            {formData.amenities.map(a => (
                                                <span key={a} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-slate-200">
                                                    {a}
                                                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeAmenity(a)} />
                                                </span>
                                            ))}
                                            {formData.amenities.length === 0 && (
                                                <p className="text-xs text-slate-400 italic">No amenities added yet.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-8 mt-4 border-t border-slate-100">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                                >
                                    {editingRoom ? 'Save Changes' : 'Create Room'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* View Details Modal */}
            {isViewModalOpen && viewingRoom && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
                                    <Eye className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Room Details - {viewingRoom.name}</h2>
                            </div>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Details Side */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Core Information</h3>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <p className="text-xs text-slate-500 mb-1">Nightly Rate</p>
                                                <p className="text-xl font-bold text-slate-800">Rs. {viewingRoom.rate}</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <p className="text-xs text-slate-500 mb-1">Capacity</p>
                                                <p className="text-xl font-bold text-slate-800">{viewingRoom.capacity} Persons</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <p className="text-xs text-slate-500 mb-1">Category</p>
                                                <p className="text-lg font-bold text-slate-800">{getCategoryName(viewingRoom.roomTypeId)}</p>
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <p className="text-xs text-slate-500 mb-1">Status</p>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold inline-block mt-1 ${
                                                    viewingRoom.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' :
                                                    viewingRoom.status === 'MAINTENANCE' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {viewingRoom.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Amenities</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {viewingRoom.amenities?.map(a => (
                                                <span key={a} className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 shadow-sm flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                                    {a}
                                                </span>
                                            ))}
                                            {(!viewingRoom.amenities || viewingRoom.amenities.length === 0) && (
                                                <p className="text-slate-400 italic text-sm">No amenities listed.</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Description</h3>
                                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                                            {viewingRoom.description || 'No description provided for this room.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Media Side */}
                                <div className="space-y-6">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Room Gallery</h3>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(idx => (
                                            viewingRoom[`image${idx}`] && (
                                                <div key={idx} className="rounded-2xl overflow-hidden border border-slate-100 shadow-md group relative">
                                                    <img src={viewingRoom[`image${idx}`]} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                </div>
                                            )
                                        ))}
                                        {!viewingRoom.image1 && !viewingRoom.image2 && !viewingRoom.image3 && (
                                            <div className="bg-slate-50 rounded-2xl h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 text-slate-400">
                                                <ImageIcon className="w-12 h-12 mb-2 opacity-20" />
                                                <p className="font-medium">No media uploaded</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100">
                            <button 
                                onClick={() => setIsViewModalOpen(false)}
                                className="w-full py-4 rounded-2xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomManagement;
