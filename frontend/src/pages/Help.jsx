import { 
    HelpCircle, Book, MessageSquare, Shield, CreditCard, 
    LifeBuoy, Search, ChevronRight, UserPlus, Bed, 
    CheckCircle2, Clock, MapPin, Zap
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import resortExterior from '../assets/resort_exterior_elite_1771077046898.jpg';

const Help = () => {
  const guideSections = [
    {
        title: "Account & Profile",
        icon: UserPlus,
        color: "text-blue-600",
        bg: "bg-blue-50",
        steps: [
            "Create an account using your email and a secure password.",
            "Verify your identity to unlock premium booking features.",
            "Manage your personal details and contact info in 'My Profile'.",
            "Securely update your password if you ever forget it."
        ]
    },
    {
        title: "Find Your Sanctuary",
        icon: Bed,
        color: "text-cyan-600",
        bg: "bg-cyan-50",
        steps: [
            "Browse our curated collections on the 'Rooms' page.",
            "Filter by category to find the style that suits you.",
            "View detailed descriptions, amenities, and high-res galleries.",
            "Check availability and rates for your specific dates."
        ]
    },
    {
        title: "Easy Booking",
        icon: Zap,
        color: "text-orange-600",
        bg: "bg-orange-50",
        steps: [
            "Select your preferred room and click 'Book Stay'.",
            "Review your stay details and any special requirements.",
            "Confirm your reservation to send it for resort approval.",
            "Receive instant confirmation when our team accepts."
        ]
    },
    {
        title: "Manage Reservations",
        icon: Clock,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        steps: [
            "View all past and upcoming stays in your dashboard.",
            "Track the status of pending reservation requests.",
            "Access your digital invoices once bookings are approved.",
            "Contact support directly for any booking modifications."
        ]
    }
  ];

  const faqs = [
    { 
        q: "How do I make a reservation?", 
        a: "Navigate to our 'Rooms' page, choose your preferred room, and click 'Book Stay'. You'll need to sign in to complete the process." 
    },
    { 
        q: "What is your cancellation policy?", 
        a: "Full refunds are available for cancellations made 48 hours before check-in. Late cancellations may incur a fee." 
    },
    { 
        q: "Check-in and Check-out times?", 
        a: "Check-in is at 2:00 PM, and check-out is before 11:00 AM. Inquire for early/late options." 
    },
    { 
        q: "Do you offer airport transportation?", 
        a: "Yes, we provide luxury airport transfers. Contact our concierge 24 hours in advance to schedule." 
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src={resortExterior} 
            className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
            alt="Beach background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-cyan-500/20 backdrop-blur-md">
            <LifeBuoy className="w-4 h-4" />
            Guest Support Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            How can we <br/> <span className="text-cyan-500">help you today?</span>
          </h1>
          
         
        </div>
      </section>

      {/* Quick Guide Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
            <h4 className="text-cyan-600 font-black uppercase tracking-[0.3em] text-xs">Easy Steps</h4>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">Platform Guide</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {guideSections.map((section, idx) => (
            <div key={idx} className="group bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-cyan-900/5 transition-all duration-500 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${section.bg} rounded-bl-[5rem] opacity-20 -mr-10 -mt-10 group-hover:scale-110 transition-transform`}></div>
                
                <div className="flex items-start gap-6 relative z-10">
                    <div className={`p-5 rounded-2xl ${section.bg} ${section.color} shadow-lg shadow-current/10`}>
                        <section.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-6 flex-1">
                        <h3 className="text-2xl font-black text-slate-900">{section.title}</h3>
                        <ul className="space-y-4">
                            {section.steps.map((step, sIdx) => (
                                <li key={sIdx} className="flex gap-4 text-slate-500 font-medium leading-relaxed group/item">
                                    <div className={`mt-1.5 min-w-[20px] h-[20px] rounded-full ${section.bg} ${section.color} flex items-center justify-center text-[10px] font-black`}>
                                        {sIdx + 1}
                                    </div>
                                    <span className="group-hover/item:text-slate-900 transition-colors">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center text-cyan-500">
                    <HelpCircle className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-black text-slate-900">Common Questions</h2>
                <p className="text-slate-500 font-medium">Everything you need to know about your stay at Ocean View.</p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:border-cyan-200 transition-all group">
                        <details className="w-full">
                            <summary className="w-full px-10 py-8 text-left flex justify-between items-center cursor-pointer list-none">
                                <span className="text-xl font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">{faq.q}</span>
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all">
                                    <ChevronRight className="w-6 h-6 rotate-90" />
                                </div>
                            </summary>
                            <div className="px-10 pb-8 text-slate-500 text-lg leading-relaxed font-medium">
                                <div className="pt-4 border-t border-slate-50">
                                    {faq.a}
                                </div>
                            </div>
                        </details>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-32 container mx-auto px-6">
        <div className="relative bg-slate-950 rounded-[4rem] p-12 md:p-24 text-center text-white overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight">Still unsure?</h2>
                    <p className="text-slate-400 text-lg font-medium leading-relaxed">
                        Our dedicated concierge team is available 24/7 to ensure your experience is nothing short of perfect. Reach out for tailor-made support.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a href="/contact" className="group px-12 py-5 bg-cyan-600 text-white rounded-[2rem] font-black hover:bg-cyan-500 transition-all shadow-2xl shadow-cyan-900/40 flex items-center justify-center gap-3">
                        Reach Out Now <MessageSquare className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="tel:+94112345678" className="px-12 py-5 bg-white/5 text-white rounded-[2rem] font-black border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                        Call Concierge <CheckCircle2 className="w-6 h-6 text-cyan-400" />
                    </a>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Help;
