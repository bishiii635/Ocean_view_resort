import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Eraser, 
    Search, 
    CheckCircle2, 
    Timer, 
    AlertCircle, 
    Loader2, 
    BedDouble,
    Info,
    Check
} from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';

const RoomCleaning = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/rooms');
            // Filter only rooms that are NOT available (or specifically MAINTENANCE/dirty)
            // But per requirement, we display rooms with status = MAINTENANCE as "Dirty"
            setRooms(response.data);
        } catch (err) {
            console.error('Error fetching rooms', err);
            setError('Failed to fetch room status.');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkClean = async (roomId) => {
        try {
            // Find the room to get its current data
            const room = rooms.find(r => r.id === roomId);
            if (!room) return;

            const updatedRoom = { ...room, status: 'AVAILABLE' };
            await axios.put(`http://localhost:8080/api/rooms/${roomId}`, updatedRoom);
            
            setSuccess(`Room ${room.name} marked as clean and available.`);
            fetchRooms();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to update room status.');
            setTimeout(() => setError(''), 3000);
        }
    };

    const filteredRooms = rooms.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (r.status === 'MAINTENANCE' || r.status === 'MAINTANANCE')
    );

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <div className="flex-1 mr-64">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                            <Eraser className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Room Cleaning Schedule</h1>
                    </div>
                </header>

                <main className="p-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-[2rem] p-10 text-white shadow-xl shadow-amber-900/20 mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
                        <h2 className="text-3xl font-black mb-2">Housekeeping Services</h2>
                        <p className="text-amber-50 opacity-90 font-medium">Manage and monitor room hygiene standards.</p>
                    </div>

                    {success && (
                        <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center gap-3 border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-bold">{success}</span>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-2xl flex items-center gap-3 border border-rose-100 animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-bold">{error}</span>
                        </div>
                    )}

                    <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search dirty rooms..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-6 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-xs font-black uppercase tracking-wider border border-amber-100">
                                    {filteredRooms.length} Dirty Rooms
                                </span>
                            </div>
                        </div>

                        <div className="p-8">
                            {loading ? (
                                <div className="py-20 text-center">
                                    <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
                                    <p className="text-slate-500 font-bold">Checking room status...</p>
                                </div>
                            ) : filteredRooms.length === 0 ? (
                                <div className="py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                        <Check className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800 mb-2">All Rooms Are Clean!</h3>
                                    <p className="text-slate-500 font-medium">No rooms currently require maintenance or cleaning.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredRooms.map((room) => (
                                        <div key={room.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                            <div className="relative h-48 bg-slate-100">
                                                {room.image1 ? (
                                                    <img src={room.image1} alt={room.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <BedDouble className="w-12 h-12 text-slate-300" />
                                                    </div>
                                                )}
                                                <div className="absolute top-4 right-4 capitalize">
                                                    <span className="px-3 py-1 bg-amber-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/40">
                                                        Dirty
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-black text-slate-800 mb-1">{room.name}</h3>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-6">Last Status: {room.status}</p>
                                                
                                                <div className="flex flex-col gap-3">
                                                    <button 
                                                        onClick={() => handleMarkClean(room.id)}
                                                        className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-2"
                                                    >
                                                        <Check className="w-5 h-5" />
                                                        Mark as Cleaned
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Guidance */}
                    <div className="mt-12 bg-white rounded-[2.5rem] p-8 border border-slate-200 flex items-start gap-6">
                        <div className="p-4 bg-blue-50 rounded-2xl">
                            <Info className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-slate-800 mb-2">Staff Instructions</h4>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Rooms appear here when flagged as 'MAINTENANCE' by management or checkout systems. 
                                After performing deep cleaning and hygiene checks, click "Mark as Cleaned" to instantly update the room's status to 'AVAILABLE' for the next guest.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            <AdminSidebar />
        </div>
    );
};

export default RoomCleaning;
