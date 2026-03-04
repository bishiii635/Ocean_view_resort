import AdminSidebar from '../components/AdminSidebar';
import { 
    HelpCircle, 
    Eraser, 
    Users, 
    Info, 
    Zap,
    CheckCircle,
    Search
} from 'lucide-react';

const StaffHelp = () => {
    const helpSections = [
        {
            title: "Room Cleaning Guide",
            icon: Eraser,
            color: "text-amber-600",
            bg: "bg-amber-50",
            steps: [
                "Navigate to the 'Room Cleaning' section from the sidebar.",
                "Rooms marked as 'MAINTENANCE' are currently considered dirty.",
                "Perform standard cleaning procedures following resort hygiene protocols.",
                "Click the 'Mark as Cleaned' button to update status to 'AVAILABLE'.",
                "This change is instant and allows front-desk to assign guests."
            ]
        },
        {
            title: "Guest Directory",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            steps: [
                "Access the 'Users' tab to see the Guest Directory.",
                "Use the search bar to find guests by their Name or Email.",
                "Staff can view guest IDs and contact details for assistance.",
                "Editing or deleting guest profiles is restricted to Administrators.",
                "Report any incorrect guest data to the site manager."
            ]
        },
        {
            title: "Dashboard Overview",
            icon: Zap,
            color: "text-purple-600",
            bg: "bg-purple-50",
            steps: [
                "The Dashboard provides real-time counts of reservations and guests.",
                "View the 'Available Rooms' count to understand resort occupancy.",
                "Use the Quick Actions banner to jump straight to cleaning tasks.",
                "System status is monitored at the bottom of the sidebar."
            ]
        }
    ];

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <div className="flex-1 mr-64">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Staff Helper Guide</h1>
                    </div>
                </header>

                <main className="p-8 space-y-10">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-4xl font-black mb-4 flex items-center gap-4 text-left">
                                Staff Portal Support <CheckCircle className="w-8 h-8 text-amber-400" />
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed text-left">
                                Welcome to the Ocean View internal staff guide. This document outlines how to manage housekeeping tasks and navigate the guest directory effectively.
                            </p>
                        </div>
                    </div>

                    {/* Help Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {helpSections.map((section, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-4 rounded-xl ${section.bg}`}>
                                        <section.icon className={`w-6 h-6 ${section.color}`} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800">{section.title}</h3>
                                </div>
                                <ul className="space-y-4">
                                    {section.steps.map((step, sIdx) => (
                                        <li key={sIdx} className="flex gap-3 text-slate-600 font-medium text-left">
                                            <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-amber-500"></div>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

     
                </main>
            </div>
            <AdminSidebar />
        </div>
    );
};

export default StaffHelp;
