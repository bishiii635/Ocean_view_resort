import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import { 
    HelpCircle, Eraser, Users, Info, Zap, CheckCircle, Search, Crown, Sparkles, Anchor, Compass
} from 'lucide-react';

const StaffHelp = () => {
    const helpSections = [
        {
            title: "Sanctuary Restoration (Cleaning)",
            icon: Eraser,
            steps: [
                "Navigate to the 'Sanctuary Restoration' section from the superior header.",
                "Rooms marked as 'RESTORATION' are currently considered in need of care.",
                "Perform standard hygiene procedures following imperial resort protocols.",
                "Click 'Mark as Restored' to update status to 'AVAILABLE' instantly.",
                "This change enables the front-desk to assign incoming nobles."
            ]
        },
        {
            title: "Imperial Guest Registry",
            icon: Users,
            steps: [
                "Access the 'Citizens' tab to observe the Noble Guest Directory.",
                "Use the search archives to find guests by Name or Digital Missive.",
                "Stewards can view guest identities and contact details for operational assistance.",
                "Modifying or expunging guest profiles is restricted to Imperial Admins.",
                "Report any archival discrepancies to the Lead Steward or Manager."
            ]
        },
        {
            title: "Stewardship Overview",
            icon: Zap,
            steps: [
                "The Portal provides real-time counts of active decrees and visiting nobles.",
                "Observe the 'Sanctuary Availability' count to understand estate occupancy.",
                "Use the Quick Restoration banner to jump straight to housekeeping duties.",
                "Portal integrity status is monitored in the lower stewardship sections."
            ]
        }
    ];

    return (
        <div className="bg-[#FAF9F6] min-h-screen font-sans">
            <AdminHeader />

            <main className="pt-40 pb-20 px-6 container mx-auto">
                {/* Hero Section */}
                <div className="bg-[#2C1D1A] border border-[#C5A059]/20 p-16 text-white shadow-2xl relative overflow-hidden mb-20 group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 border-l border-b border-[#C5A059]/20 -translate-x-3 translate-y-3"></div>
                    
                    <div className="relative z-10 max-w-3xl">
                        <div className="flex items-center gap-6 mb-8 uppercase tracking-[0.5em] text-[#C5A059] text-[10px] font-bold">
                            <Sparkles className="w-5 h-5" /> Official Steward Guidance Archives
                        </div>
                        <h2 className="text-5xl md:text-6xl font-serif font-black mb-6 italic tracking-tight">
                            Stewardship <span className="text-[#C5A059]">Support</span> <CheckCircle className="w-10 h-10 text-[#C5A059] inline-block ml-4 animate-pulse" />
                        </h2>
                        <p className="text-[#E8E2D6] text-xl leading-relaxed italic font-medium opacity-80">
                            Welcome to the Ocean View internal staff guide. This chronicle outlines the protocols for sanctuary restoration and guest registry navigation.
                        </p>
                    </div>
                </div>

                {/* Help Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {helpSections.map((section, idx) => (
                        <div key={idx} className="bg-white p-12 border border-[#E8E2D6] shadow-2xl hover:border-[#C5A059] transition-all duration-500 group relative">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[#FAF9F6] border-b border-l border-[#E8E2D6] group-hover:border-[#C5A059]/30 transition-colors"></div>
                            
                            <div className="flex items-center gap-6 mb-10">
                                <div className="p-5 bg-[#FAF9F6] border border-[#E8E2D6] text-[#C5A059] group-hover:bg-[#2C1D1A] group-hover:text-white transition-all duration-500 shadow-inner">
                                    <section.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-serif font-black text-[#2C1D1A] italic tracking-tight leading-tight">{section.title}</h3>
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

                {/* Protocol Banner */}
                <div className="mt-20 bg-[#FAF9F6] border-2 border-[#E8E2D6] border-dashed p-10 flex flex-col md:flex-row items-center gap-10 group">
                    <div className="w-20 h-20 bg-white border border-[#E8E2D6] flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-500">
                        <Info className="w-10 h-10 text-[#C5A059]" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-2xl font-serif font-black text-[#2C1D1A] mb-2 italic">Official Internal Protocol</h4>
                        <p className="text-[#8D6E63] font-bold text-[10px] uppercase tracking-[0.3em]">All staff actions are logged within the Imperial Portal. Ensure accuracy in all sanctuary restoration reports.</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default StaffHelp;
