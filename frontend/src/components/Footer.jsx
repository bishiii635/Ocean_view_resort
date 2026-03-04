import { Github, Twitter, Instagram, Facebook, Crown, Mail, Phone, MapPin, Anchor, Gem, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2C1D1A] text-[#8D6E63] py-32 relative overflow-hidden mt-20 border-t border-[#C5A059]/20">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[120px]"></div>
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 relative z-10">
        <div className="space-y-10">
          <Link to="/" className="flex items-center gap-4 group">
             <div className="p-2 border border-[#C5A059] rounded-full group-hover:bg-[#C5A059] group-hover:text-[#2C1D1A] transition-all duration-500">
                <Crown className="text-[#C5A059] group-hover:text-[#2C1D1A] w-8 h-8" />
             </div>
            <span className="text-3xl font-serif font-black text-white tracking-widest uppercase">
              Ocean<span className="text-[#C5A059]">View</span>
            </span>
          </Link>
          <p className="leading-relaxed text-sm font-medium italic opacity-80 border-l-2 border-[#C5A059] pl-6">
            Preserving the golden era of tropical nobility. Each stay is a testament to our enduring heritage of coastal luxury.
          </p>
          <div className="flex gap-6">
            {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-[#2C1D1A] transition-all duration-700">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="space-y-10">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.5em] border-b border-[#C5A059]/30 pb-4 w-fit">The Estate</h4>
          <ul className="space-y-6 text-sm font-bold uppercase tracking-[0.2em]">
            <li><Link to="/" className="hover:text-[#C5A059] transition-colors flex items-center gap-3 group"><div className="w-0 group-hover:w-2 h-px bg-[#C5A059] transition-all"></div> Heritage Page</Link></li>
            <li><Link to="/rooms" className="hover:text-[#C5A059] transition-colors flex items-center gap-3 group"><div className="w-0 group-hover:w-2 h-px bg-[#C5A059] transition-all"></div> The Sanctuaries</Link></li>
            <li><Link to="/about" className="hover:text-[#C5A059] transition-colors flex items-center gap-3 group"><div className="w-0 group-hover:w-2 h-px bg-[#C5A059] transition-all"></div> Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-[#C5A059] transition-colors flex items-center gap-3 group"><div className="w-0 group-hover:w-2 h-px bg-[#C5A059] transition-all"></div> Concierge</Link></li>
          </ul>
        </div>

        <div className="space-y-10">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.5em] border-b border-[#C5A059]/30 pb-4 w-fit">Support</h4>
          <ul className="space-y-6 text-sm font-bold uppercase tracking-[0.2em]">
            <li><Link to="/help" className="hover:text-[#C5A059] transition-colors flex items-center gap-3 group"><div className="w-0 group-hover:w-2 h-px bg-[#C5A059] transition-all"></div> Support Center</Link></li>
            <li><Link to="/help" className="hover:text-[#C5A059] transition-colors flex items-center gap-3 group"><div className="w-0 group-hover:w-2 h-px bg-[#C5A059] transition-all"></div> Privacy Decrees</Link></li>
            <li><Link to="/help" className="hover:text-[#C5A059] transition-colors flex items-center gap-3 group"><div className="w-0 group-hover:w-2 h-px bg-[#C5A059] transition-all"></div> Terms of Stay</Link></li>
            <li><Link to="/contact" className="hover:text-[#C5A059] transition-colors flex items-center gap-3 group"><div className="w-0 group-hover:w-2 h-px bg-[#C5A059] transition-all"></div> Technical Aid</Link></li>
          </ul>
        </div>

        <div className="space-y-10">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-[0.5em] border-b border-[#C5A059]/30 pb-4 w-fit">Registry Info</h4>
          <ul className="space-y-8">
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#C5A059] shrink-0" />
              <span className="text-sm font-medium italic tracking-wide">123, Ancient Ivory Path, Galle,<br/>Southern Province, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
              <span className="text-sm font-black font-serif">+94 11 234 5678</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
              <span className="text-sm font-black italic tracking-widest border-b border-[#C5A059]/50">royal@oceanview.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 border-t border-white/5 mt-32 pt-16 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-bold uppercase tracking-[0.4em]">
        <div className="flex items-center gap-4">
            <MagnetIcon className="w-4 h-4 text-[#C5A059]" />
            &copy; {new Date().getFullYear()} Ocean View Resort & Spa. Inherited Rights Reserved.
        </div>
        <div className="opacity-40 italic">Masterfully crafted by the Advanced Agentic Team</div>
      </div>
    </footer>
  );
};

const MagnetIcon = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
        <path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    </svg>
)

export default Footer;
