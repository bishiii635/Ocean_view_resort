import { 
    HelpCircle, Book, MessageSquare, Shield, CreditCard, 
    LifeBuoy, Search, ChevronRight, UserPlus, Bed, 
    CheckCircle2, Clock, MapPin, Zap, Crown, Compass, Anchor, Sparkles, ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);
  
  // Luxury Vintage Unsplash Images
  const heroBg = "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=2000"; // Luxury Lobby
  const ctaBg = "https://images.unsplash.com/photo-1544124499-58d62681995a?auto=format&fit=crop&q=80&w=2000"; // Colonial Balcony

  const guideSections = [
    {
        title: "Noble Registry",
        icon: UserPlus,
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
      <section className="relative pt-64 pb-52 overflow-hidden bg-[#2C1D1A]">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            className="w-full h-full object-cover opacity-10 scale-125 grayscale animate-pulse-slow"
            alt="Estate heritage"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2C1D1A]/90 via-[#2C1D1A]/70 to-[#2C1D1A]"></div>
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-48 left-20 w-32 h-32 border-l border-t border-[#C5A059]/30"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 border-r border-b border-[#C5A059]/30"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-6 px-10 py-3 bg-[#C5A059]/5 border border-[#C5A059]/30 backdrop-blur-sm">
                <Crown className="w-5 h-5 text-[#C5A059]" />
                <span className="text-[#C5A059] font-bold text-[11px] uppercase tracking-[0.6em]">Imperial Support Archives</span>
                <Crown className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>
          <h1 className="text-7xl md:text-9xl font-serif font-black text-white mb-10 tracking-tighter leading-none italic animate-in fade-in slide-in-from-bottom-10 duration-1000">
            Consult <br/> The <span className="text-[#C5A059]">Registry</span>
          </h1>
          <p className="text-[#E3C184] text-xl md:text-2xl italic font-medium max-w-2xl mx-auto leading-relaxed opacity-80 border-t border-[#C5A059]/20 pt-10">
            Your essential chronicles for navigating the grandeur of Ocean View Resort.
          </p>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-40 container mx-auto px-6 bg-white border-y border-[#E8E2D6]">
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
            <div className="p-5 bg-[#2C1D1A] text-[#C5A059] shadow-2xl rotate-45 mb-8 border border-[#C5A059]/30">
                <Book className="w-10 h-10 -rotate-45" />
            </div>
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.5em] text-[10px]">Stewardship Protocols</h4>
            <h2 className="text-6xl md:text-7xl font-serif font-black text-[#2C1D1A]">Platform Chronicles</h2>
            <div className="w-24 h-px bg-[#C5A059] mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {guideSections.map((section, idx) => (
            <div key={idx} className="group relative p-16 border border-[#E8E2D6] bg-[#FAF9F6]/30 hover:bg-white hover:shadow-2xl transition-all duration-700 hover:border-[#C5A059] overflow-hidden">
                {/* Decorative Pattern Background */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A059]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
                    <div className="flex-1 space-y-12">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-[#2C1D1A] text-[#C5A059] shadow-xl group-hover:rotate-12 transition-transform duration-500">
                                <section.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-serif font-black text-[#2C1D1A] italic tracking-tight">{section.title}</h3>
                        </div>
                        
                        <ul className="space-y-8">
                            {section.steps.map((step, sIdx) => (
                                <li key={sIdx} className="flex gap-6 group/item">
                                    <div className="mt-1.5 flex flex-col items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
                                        <div className="w-px h-full bg-[#C5A059]/20 group-hover/item:bg-[#C5A059]/60 transition-all"></div>
                                    </div>
                                    <p className="text-lg text-[#6D5B57] font-medium italic group-hover/item:text-[#2C1D1A] transition-colors leading-relaxed">
                                        {step}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-48 bg-[#FAF9F6] relative">
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <div className="text-center mb-32">
                 <h4 className="text-[#8D6E63] font-bold uppercase tracking-[0.5em] text-[10px] mb-4">The Repository</h4>
                 <h2 className="text-6xl md:text-7xl font-serif font-black text-[#2C1D1A] italic tracking-tight">Frequent Consultations</h2>
            </div>

            <div className="space-y-8">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`transition-all duration-700 bg-white border-2 hover:border-[#C5A059] shadow-sm ${
                            openFaq === index ? 'border-[#C5A059] shadow-2xl' : 'border-[#E8E2D6]'
                        }`}
                    >
                        <div 
                            className="p-12 flex items-center justify-between cursor-pointer group"
                            onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        >
                            <div className="flex items-center gap-10">
                                <div className={`w-14 h-14 border border-[#E8E2D6] flex items-center justify-center font-serif text-2xl font-black transition-all duration-500 ${
                                    openFaq === index ? 'bg-[#2C1D1A] text-[#C5A059] border-[#C5A059]' : 'text-[#8D6E63] group-hover:text-[#2C1D1A]'
                                }`}>
                                    0{index + 1}
                                </div>
                                <h4 className="text-2xl font-serif font-bold text-[#2C1D1A] tracking-wide">{faq.q}</h4>
                            </div>
                            <ChevronDown className={`w-6 h-6 text-[#8D6E63] transition-transform duration-700 ${openFaq === index ? 'rotate-180 text-[#C5A059]' : 'group-hover:text-[#C5A059]'}`} />
                        </div>
                        <div className={`overflow-hidden transition-all duration-700 bg-[#FAF9F6]/50 ${openFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-24 pb-16 pt-8 relative">
                                <div className="absolute left-16 top-8 bottom-16 w-1 bg-[#C5A059]/20"></div>
                                <p className="text-[#6D5B57] font-medium leading-[2.2] text-xl italic pl-8">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        {/* Artistic Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E8E2D6]/10 -skew-x-12 -z-0"></div>
      </section>

      {/* Concierge CTA */}
      <section className="py-52 container mx-auto px-6">
        <div className="relative border-[10px] border-[#2C1D1A] p-4 group">
            <div className="relative bg-[#2C1D1A] p-24 md:p-40 text-center text-white overflow-hidden border border-[#C5A059]/30">
                <div className="absolute inset-0 opacity-10 grayscale group-hover:scale-110 transition-transform duration-[20s] bg-cover bg-center" style={{ backgroundImage: `url(${ctaBg})` }}></div>
                
                <div className="relative z-10 max-w-4xl mx-auto space-y-16">
                    <div className="space-y-10">
                        <Compass className="w-16 h-16 text-[#C5A059] mx-auto animate-spin-slow" />
                        <h2 className="text-6xl md:text-9xl font-serif font-black tracking-tighter italic leading-none">Seek More?</h2>
                        <p className="text-[#E3C184] text-2xl font-medium leading-relaxed italic max-w-3xl mx-auto opacity-80 pt-10 border-t border-white/10">
                            Our stewards of heritage are prepared to assist with any bespoke requirement. Dispatch your inquiry or summon us directly.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
                        <a href="/contact" className="group px-20 py-8 bg-[#C5A059] text-[#2C1D1A] font-bold text-[11px] uppercase tracking-[0.5em] hover:bg-white transition-all duration-700 shadow-2xl flex items-center justify-center gap-6">
                            Dispatch Inquiry <MessageSquare className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </a>
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#C5A059]">Direct Noble Line</span>
                            <span className="text-3xl font-serif font-black text-white italic">+94 11 234 5678</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Help;
