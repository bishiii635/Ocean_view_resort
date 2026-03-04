import { Github, Twitter, Instagram, Facebook, Palmtree, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]"></div>
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <Palmtree className="text-cyan-500 w-8 h-8" />
            <span className="text-2xl font-bold text-white tracking-tight">
              Ocean<span className="text-cyan-600">View</span>
            </span>
          </Link>
          <p className="leading-relaxed text-slate-500">
            Expertly crafted luxury experiences on the southern coast of Sri Lanka. Discover the perfect fusion of nature and modern elegance.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:bg-cyan-600 hover:text-white transition-all duration-300">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-lg font-black text-white uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-4 font-medium">
            <li><Link to="/" className="hover:text-cyan-500 transition-colors">Home Page</Link></li>
            <li><Link to="/rooms" className="hover:text-cyan-500 transition-colors">Our Rooms</Link></li>
            <li><Link to="/about" className="hover:text-cyan-500 transition-colors">About Resort</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-500 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-black text-white uppercase tracking-widest">Support</h4>
          <ul className="space-y-4 font-medium">
            <li><Link to="/help" className="hover:text-cyan-500 transition-colors">Help Center</Link></li>
            <li><Link to="/help" className="hover:text-cyan-500 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/help" className="hover:text-cyan-500 transition-colors">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-500 transition-colors">Technical Support</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-black text-white uppercase tracking-widest">Store Info</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-cyan-500 shrink-0" />
              <span className="text-sm leading-relaxed">123 Coastal Road, Galle,<br/>Sri Lanka</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-cyan-500 shrink-0" />
              <span className="text-sm">+94 11 234 5678</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-500 shrink-0" />
              <span className="text-sm font-medium">hello@oceanview.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 border-t border-slate-800 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-40">
        <div>&copy; {new Date().getFullYear()} Ocean View Resort. All rights reserved.</div>
        <div>Created by Advanced Agentic Coding Team</div>
      </div>
    </footer>
  );
};

export default Footer;
