import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import { 
    HelpCircle, Calendar, Bed, Users, FileText, Zap, AlertCircle, CheckCircle, Info, Printer, Trash2, Crown, Compass, Anchor, Sparkles
} from 'lucide-react';

const AdminHelp = () => {
    const helpSections = [
        {
            title: "Imperial Decrees (Reservations)",
            icon: Calendar,
            steps: [
                "Observe all guest bookings in the 'Imperial Decrees' tab.",
                "Approve/Reject pending requests using the administrative action seals.",
                "Click the eye icon to see full decree details and noble guest notes.",
                "Statements (Invoices) are automatically generated upon imperial approval.",
                "Use the trash icon to expunge cancelled or incorrect records from the archives."
            ]
        },
        {
            title: "Sanctuary Archives (Rooms)",
            icon: Bed,
            steps: [
                "Commission new sanctuaries or suites in the 'Estate Sanctuaries' section.",
                "Set presence status (Active/Restoration) to control guest registration.",
                "Organize classifications using 'Sanctuary Ranks' (e.g., Deluxe, Suite).",
                "Ensure prosperity/LKR and capacity are recorded accurately in the ledgers."
            ]
        },
        {
            title: "Citizen Registers (Users)",
            icon: Users,
            steps: [
                "Manage both Noble Guest identities and Resort Steward portal access.",
                "Imperial Admins can enroll/expunge Steward accounts for the resort team.",
                "View citizen history and digital missive details in the 'Imperial Registers' tab."
            ]
        },
        {
            title: "Statements & Chronicles",
            icon: Printer,
            steps: [
                "Access financial statements from the 'Decrees' table using the scroll icon.",
                "The 'Produce Hard Copy' button provides a clean, imperial-standard PDF view.",
                "Ensure prosperity status is updated to 'PAID' after local impact collection."
            ]
        }
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <main className="pt-40 pb-20 px-6 container mx-auto">
                {/* Hero Section */}
                <div className="bg-[#2C1D1A] border border-[#C5A059]/20 p-16 text-white shadow-2xl relative overflow-hidden mb-20 group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl -translate-y-24 translate-x-24 group-hover:bg-[#C5A059]/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 border-l border-b border-[#C5A059]/20 -translate-x-4 translate-y-4"></div>
                    
                    <div className="relative z-10 max-w-3xl">
                        <div className="flex items-center gap-6 mb-8 uppercase tracking-[0.5em] text-[#C5A059] text-[10px] font-bold">
                            <Crown className="w-5 h-5" /> Official Administrative Documentation
                        </div>
                        <h2 className="text-5xl md:text-6xl font-serif font-black mb-6 italic tracking-tight">
                            Command Your <span className="text-[#C5A059]">Estate</span> <Zap className="w-10 h-10 text-[#C5A059] inline-block ml-4 animate-pulse" />
                        </h2>
                        <p className="text-[#E8E2D6] text-xl leading-relaxed italic font-medium opacity-80">
                            Welcome to the Ocean View Imperial management guide. Within these archives, you shall find the necessary protocols for estate operations and noble administrative duties.
                        </p>
                    </div>
                </div>

                {/* Help Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {helpSections.map((section, idx) => (
                        <div key={idx} className="bg-white p-12 border border-[#E8E2D6] shadow-2xl hover:border-[#C5A059] transition-all duration-500 group relative">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#FAF9F6] border-b border-l border-[#E8E2D6] group-hover:border-[#C5A059]/30 transition-colors"></div>
                            
                            <div className="flex items-center gap-6 mb-10">
                                <div className="p-5 bg-[#FAF9F6] border border-[#E8E2D6] text-[#C5A059] group-hover:bg-[#2C1D1A] group-hover:text-white transition-all duration-500 shadow-inner">
                                    <section.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-serif font-black text-[#2C1D1A] italic tracking-tight">{section.title}</h3>
                            </div>
                            <ul className="space-y-6">
                                {section.steps.map((step, sIdx) => (
                                    <li key={sIdx} className="flex gap-4 text-[#2C1D1A]/70 font-medium italic text-lg leading-relaxed group/item">
                                        <Sparkles className="mt-1.5 w-4 h-4 text-[#C5A059] opacity-30 group-hover/item:opacity-100 transition-opacity" />
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* System Health Banner */}
                <div className="mt-20 bg-[#FAF9F6] border-2 border-[#E8E2D6] border-dashed p-12 flex flex-col lg:flex-row items-center gap-10 group">
                    <div className="w-20 h-20 bg-white border border-[#E8E2D6] flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
                        <Info className="w-10 h-10 text-[#C5A059]" />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                        <h4 className="text-2xl font-serif font-black text-[#2C1D1A] mb-2 italic">Registry Integrity & System Vitality</h4>
                        <p className="text-[#8D6E63] font-bold text-[10px] uppercase tracking-[0.3em]">All transitions are committed to the Imperial Data Vault instantly. Verify every citizen's missive before validation.</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="px-8 py-4 bg-[#2C1D1A] text-[#C5A059] border border-[#C5A059]/30 text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl">
                            Imperial Status: Synchronized
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminHelp;
