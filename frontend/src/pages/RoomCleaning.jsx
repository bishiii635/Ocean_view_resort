import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Eraser, Search, CheckCircle2, Timer, AlertCircle, Loader2, BedDouble, Info, Check, Crown, Anchor, Sparkles
} from 'lucide-react';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

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
            setRooms(response.data);
        } catch (err) {
            console.error('Error fetching rooms', err);
            setError('Estate archival synchronization failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkClean = async (roomId) => {
        try {
            const room = rooms.find(r => r.id === roomId);
            if (!room) return;

            const updatedRoom = { ...room, status: 'AVAILABLE' };
            await axios.put(`http://localhost:8080/api/rooms/${roomId}`, updatedRoom);
            
            setSuccess(`Sanctuary ${room.name} restored to imperial standards.`);
            fetchRooms();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to update sanctuary status.');
            setTimeout(() => setError(''), 3000);
        }
    };

    const filteredRooms = rooms.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        (r.status === 'MAINTENANCE' || r.status === 'MAINTANANCE')
    );

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <main className="pt-40 pb-20 px-6 container mx-auto">
                {/* Hero Banner */}
                <div className="bg-[#2C1D1A] border border-[#C5A059]/20 p-16 text-white shadow-2xl relative overflow-hidden mb-16 group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
                     <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-[#C5A059]/20 -translate-x-3 -translate-y-3"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-6 uppercase tracking-[0.5em] text-[#C5A059] text-[10px] font-bold">
                                <Eraser className="w-5 h-5" /> Sanctuary Restoration Ledger
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-black italic tracking-tight">Housekeeping <span className="text-[#C5A059]">Services</span></h2>
                            <p className="text-[#E8E2D6] text-xl font-medium italic opacity-80 leading-relaxed max-w-2xl">
                                Oversee and maintain the imperial hygiene standards of our noble sanctuaries. Ensure every quarter is prepared for distinguished occupancy.
                            </p>
                        </div>
                        <div className="hidden lg:block">
                            <Anchor className="w-32 h-32 text-[#C5A059] opacity-20 rotate-12" />
                        </div>
                    </div>
                </div>

                {success && (
                    <div className="mb-10 p-6 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>{success}</span>
                    </div>
                )}

                {error && (
                    <div className="mb-10 p-6 bg-rose-50 border border-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 animate-shake">
                        <AlertCircle className="w-5 h-5 text-rose-600" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="bg-white border border-[#E8E2D6] shadow-2xl overflow-hidden group">
                    <div className="p-10 border-b border-[#FAF9F6] bg-[#FAF9F6]/50 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="relative flex-1 max-w-xl">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                            <input 
                                type="text" 
                                placeholder="Search archives for dirty sanctuaries..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-8 py-4 bg-white border border-[#E8E2D6] text-[#2C1D1A] focus:border-[#C5A059] outline-none transition-all font-medium italic"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="px-6 py-2 bg-[#2C1D1A] text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.3em] border border-[#C5A059]/30 shadow-xl">
                                {filteredRooms.length} Sanctuaries Requiring Restoration
                            </span>
                        </div>
                    </div>

                    <div className="p-12">
                        {loading ? (
                            <div className="py-32 text-center">
                                <Loader2 className="w-16 h-16 animate-spin text-[#C5A059] mx-auto mb-6" />
                                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] italic animate-pulse">Scanning Sanctuary Status...</p>
                            </div>
                        ) : filteredRooms.length === 0 ? (
                            <div className="py-32 text-center bg-[#FAF9F6] border-2 border-dashed border-[#E8E2D6] group">
                                <div className="w-24 h-24 bg-white border border-[#E8E2D6] flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:rotate-12 transition-transform duration-500">
                                    <Check className="w-12 h-12 text-[#C5A059]" />
                                </div>
                                <h3 className="text-3xl font-serif font-black text-[#2C1D1A] mb-4 italic">Imperial Order Restored!</h3>
                                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.2em] text-[10px]">All sanctuaries currently adhere to our grand heritage standards.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {filteredRooms.map((room) => (
                                    <div key={room.id} className="group bg-white border border-[#E8E2D6] shadow-2xl hover:border-[#C5A059] transition-all duration-500 overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-[#FAF9F6] border-b border-l border-[#E8E2D6] group-hover:border-[#C5A059]/30 transition-colors z-20"></div>
                                        <div className="relative h-64 bg-[#FAF9F6] overflow-hidden">
                                            {room.image1 ? (
                                                <img src={room.image1} alt={room.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#E8E2D6]">
                                                    <BedDouble className="w-24 h-24 opacity-20" />
                                                </div>
                                            )}
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-2 bg-[#5D4037] text-white text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl border border-[#C5A059]/30 italic">
                                                    Restoration Phase
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-10 space-y-6">
                                            <div>
                                                <h3 className="text-2xl font-serif font-black text-[#2C1D1A] mb-2 italic tracking-tight">{room.name}</h3>
                                                <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-[0.2em]">Legacy Status: {room.status}</p>
                                            </div>
                                            
                                            <button 
                                                onClick={() => handleMarkClean(room.id)}
                                                className="w-full py-5 bg-[#2C1D1A] text-[#C5A059] font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-[#5D4037] hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-4 group/btn"
                                            >
                                                <Check className="w-5 h-5" />
                                                Mark as Restored
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Guidance */}
                <div className="mt-20 bg-[#FAF9F6] border-2 border-[#E8E2D6] border-dashed p-12 flex items-start gap-10 group">
                    <div className="p-5 bg-white border border-[#E8E2D6] shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                        <Info className="w-8 h-8 text-[#C5A059]" />
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-2xl font-serif font-black text-[#2C1D1A] italic tracking-tight">Steward Protocols</h4>
                        <p className="text-[#8D6E63] font-medium text-lg italic leading-relaxed max-w-4xl">
                            Sanctuaries appear here when marked as 'RESTORATION' by management or departing nobles. 
                            After fulfilling deep heritage restoration and hygiene protocols, validate their status to update them to 'AVAILABLE' for the next distinguished guest.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RoomCleaning;
