import AdminSidebar from '../components/AdminSidebar';
import { 
    HelpCircle, 
    Calendar, 
    Bed, 
    Users, 
    FileText, 
    Zap, 
    AlertCircle, 
    CheckCircle, 
    Info, 
    Printer,
    Trash2
} from 'lucide-react';

const AdminHelp = () => {
    const helpSections = [
        {
            title: "Reservation Management",
            icon: Calendar,
            color: "text-blue-600",
            bg: "bg-blue-50",
            steps: [
                "View all guest bookings in the 'Reservations' tab.",
                "Approve/Reject pending requests using the action buttons.",
                "Click the eye icon to see full reservation details and guest notes.",
                "Invoices are automatically generated upon approval.",
                "Use the trash icon to remove cancelled or incorrect reservations."
            ]
        },
        {
            title: "Inventory & Rooms",
            icon: Bed,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            steps: [
                "Add new rooms or suites in the 'Rooms' management section.",
                "Set room status (Active/Maintenance) to control listing availability.",
                "Organize layouts using 'Room Categories' (e.g., Deluxe, Suite).",
                "Ensure price/LKR and capacity are accurate for each entry."
            ]
        },
        {
            title: "User Control",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
            steps: [
                "Manage both Guest accounts and Staff portal access.",
                "Admins can create/delete Staff accounts for resort team members.",
                "View guest history and contact details in the 'Users' tab."
            ]
        },
        {
            title: "Invoicing & Printing",
            icon: Printer,
            color: "text-amber-600",
            bg: "bg-amber-50",
            steps: [
                "Access invoices from the 'Reservations' table using the file icon.",
                "The 'Print Invoice' button provides a clean, sidebar-free PDF view.",
                "Ensure payment status is updated to 'PAID' after manual collection."
            ]
        }
    ];

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <div className="flex-1 mr-64">
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">Administrator Help & Docs</h1>
                    </div>
                </header>

                <main className="p-8 space-y-10">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-4xl font-black mb-4 flex items-center gap-4">
                                Master Your Resort <Zap className="w-8 h-8 text-cyan-400" />
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Welcome to the Ocean View internal management guide. Here you can find brief instructions on how to handle day-to-day operations and administrative tasks.
                            </p>
                        </div>
                    </div>

                    {/* Help Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                        <li key={sIdx} className="flex gap-3 text-slate-600 font-medium">
                                            <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-cyan-500"></div>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Support Banner */}
                    <div className="bg-cyan-50 rounded-[2rem] border border-cyan-100 p-8 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-cyan-900/5">
                            <Info className="w-8 h-8 text-cyan-600" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-lg font-black text-slate-900 mb-1">Database & System Health</h4>
                            <p className="text-slate-500 text-sm">All changes are updated live to the MongoDB database. Ensure you verify guest details before approving payments.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="px-5 py-2.5 bg-cyan-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-cyan-900/20">
                                System Status: Online
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <AdminSidebar />
        </div>
    );
};

export default AdminHelp;
