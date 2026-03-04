import { 
    HelpCircle, Book, MessageSquare, Shield, CreditCard, 
    LifeBuoy, Search, ChevronRight, UserPlus, Bed, 
    CheckCircle2, Clock, MapPin, Zap, Crown, Compass, Anchor, Sparkles
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import resortExterior from '../assets/resort_exterior_elite_1771077046898.jpg';

const Help = () => {
  const guideSections = [
    {
        title: "Noble Registry",
        icon: UserPlus,
        color: "text-[#C5A059]",
        bg: "bg-[#5D4037]",
        steps: [
            "Inscribe your identity using a valid electronic missive.",
            "Verify your noble status to unlock the complete sanctuary collection.",
            "Maintain your private details within our secure heritage archives.",
            "Securely update your encryption cipher if misplaced."
        ]
    },
    {
        title: "The Sanctuary Search",
        icon: Bed,
        color: "text-[#C5A059]",
        bg: "bg-[#5D4037]",
        steps: [
            "Traverse our curated collections within the 'Sanctuaries' wing.",
            "Distinguish by collection type to find your ideal tropical estate.",
            "Observe detailed chronicles, noble amenities, and grand galleries.",
            "Verify availability for your requested era of stay."
        ]
    },
    {
        title: "Imperial Reservation",
        icon: Zap,
        color: "text-[#C5A059]",
        bg: "bg-[#5D4037]",
        steps: [
            "Designate your sanctuary and invoke the 'Reserve Stay' decree.",
            "Review stay particulars and any bespoke requirements.",
            "Confirm your intent to dispatch for royal resort approval.",
            "Receive immediate heraldry when our committee accepts."
        ]
    },
    {
        title: "Archive Management",
        icon: Clock,
        color: "text-[#C5A059]",
        bg: "bg-[#5D4037]",
        steps: [
            "Observe all historical and forthcoming stays in your private log.",
            "Trace the progression of pending reservation decrees.",
            "Access your digital financial statements once approved.",
            "Consult the concierge for any stay amendments."
        ]
    }
  ];

  const faqs = [
    { 
        q: "How does one secure a sanctuary?", 
        a: "Navigate to our 'Sanctuaries' collection, choose your preferred estate, and click 'Reserve Stay'. Noble identification is required to finalize." 
    },
    { 
        q: "What is the decree on cancellations?", 
        a: "Full treasury refunds are available for decrees rescinded 48 hours prior to arrival. Late amendments may incur a royal fee." 
    },
    { 
        q: "Check-in and Check-out eras?", 
        a: "Check-in commences at 2:00 PM (14:00), and departure is requested before 11:00 AM. Consult for early/late arrangements." 
    },
    { 
        q: "Do you provide royal transportation?", 
        a: "Indeed, we dispatch luxury carriages for airport transfers. Consult our concierge 24 hours in advance to schedule." 
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-40 overflow-hidden bg-[#2C1D1A]">
        <div className="absolute inset-0 z-0">
          <img 
            src={resortExterior} 
            className="w-full h-full object-cover opacity-10 scale-110 grayscale"
            alt="Estate background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2C1D1A]/80 via-[#2C1D1A]/50 to-[#2C1D1A]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 font-bold text-[10px] uppercase tracking-[0.5em] mb-10 translate-y-0 group hover:-translate-y-1 transition-transform cursor-default">
            <Crown className="w-5 h-5" />
            Imperial Support Concierge
          </div>
          <h1 className="text-6xl md:text-9xl font-serif font-black text-white mb-10 tracking-tighter leading-[0.9] italic">
            How May We <br/> Be Of <span className="text-[#C5A059]">Service?</span>
          </h1>
        </div>
      </section>

      {/* Quick Guide Grid */}
      <section className="py-32 container mx-auto px-6">
        <div className="text-center mb-24 space-y-6">
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.5em] text-xs">Royal Protocols</h4>
            <h2 className="text-5xl md:text-7xl font-serif font-black text-[#2C1D1A]">Platform Chronicles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {guideSections.map((section, idx) => (
            <div key={idx} className="group bg-white p-16 border border-[#E8E2D6] shadow-xl hover:border-[#C5A059] transition-all duration-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-bl-[5rem] translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
                    <div className="p-6 bg-[#2C1D1A] text-[#C5A059] shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <section.icon className="w-10 h-10" />
                    </div>
                    <div className="space-y-10 flex-1 text-center md:text-left">
                        <h3 className="text-3xl font-serif font-bold text-[#2C1D1A] tracking-wide">{section.title}</h3>
                        <ul className="space-y-6">
                            {section.steps.map((step, sIdx) => (
                                <li key={sIdx} className="flex flex-col md:flex-row gap-6 text-[#6D5B57] font-medium leading-relaxed group/item items-center md:items-start">
                                    <div className="min-w-[40px] h-[40px] border border-[#C5A059] text-[12px] font-black text-[#C5A059] flex items-center justify-center font-serif bg-[#FAF9F6]">
                                        0{sIdx + 1}
                                    </div>
                                    <span className="group-hover/item:text-[#2C1D1A] transition-colors italic text-lg">{step}</span>
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
      <section className="py-40 bg-[#FAF9F6] border-y border-[#E8E2D6]">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="flex flex-col items-center text-center mb-24 space-y-6">
                <div className="w-20 h-20 bg-[#2C1D1A] text-[#C5A059] flex items-center justify-center shadow-2xl mb-8">
                    <HelpCircle className="w-10 h-10" />
                </div>
                <h2 className="text-5xl md:text-6xl font-serif font-black text-[#2C1D1A]">Frequent Consultations</h2>
                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] text-[10px]">Universal inquiries answered by the resort senate.</p>
            </div>

            <div className="space-y-6">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-white border border-[#E8E2D6] overflow-hidden hover:border-[#C5A059] transition-all duration-500 group">
                        <details className="w-full">
                            <summary className="w-full px-12 py-10 text-left flex justify-between items-center cursor-pointer list-none">
                                <span className="text-2xl font-serif font-bold text-[#2C1D1A] group-hover:text-[#5D4037] transition-colors tracking-wide">{faq.q}</span>
                                <div className="w-12 h-12 border border-[#E8E2D6] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-[#2C1D1A] transition-all duration-500">
                                    <ChevronRight className="w-6 h-6 rotate-90" />
                                </div>
                            </summary>
                            <div className="px-12 pb-10 text-[#6D5B57] text-xl leading-relaxed italic font-medium">
                                <div className="pt-8 border-t border-[#FAF9F6]">
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
      <section className="py-48 container mx-auto px-6">
        <div className="relative bg-[#2C1D1A] p-20 md:p-32 text-center text-white overflow-hidden group">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C5A059]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-16">
                <div className="space-y-8">
                    <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter italic">Still Enquiring?</h2>
                    <p className="text-[#E3C184] text-xl font-medium leading-relaxed italic max-w-2xl mx-auto">
                        Our master of ceremonies and private stewards are available 24/7. Let us ensure your experience is absolute perfection.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
                    <a href="/contact" className="group px-16 py-7 bg-[#C5A059] text-[#2C1D1A] font-bold text-[10px] tracking-[0.5em] uppercase hover:bg-white transition-all duration-700 shadow-2xl flex items-center justify-center gap-4">
                        Consult Concierge <Compass className="w-6 h-6 group-hover:rotate-45 transition-transform duration-700" />
                    </a>
                    <a href="tel:+94112345678" className="px-16 py-7 bg-transparent border-2 border-white/20 text-white font-bold text-[10px] tracking-[0.5em] uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-700 flex items-center justify-center gap-4">
                        Royal Hotline <Sparkles className="w-6 h-6" />
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
