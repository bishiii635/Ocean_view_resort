import { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, AlertCircle, CheckCircle2, Loader2, Crown, Sparkles, Compass, Anchor } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await axios.post('http://localhost:8080/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Error sending message', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-48 pb-32 bg-[#2C1D1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551882547-ff43c636a224?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-10 bg-cover bg-center grayscale"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 text-[#C5A059] font-bold text-[10px] tracking-[0.5em] uppercase mb-8">
                <Crown className="w-5 h-5" /> The Royal Concierge
            </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black mb-10 italic tracking-tighter">Summon Assistance</h1>
          <p className="text-xl text-[#E3C184] max-w-2xl mx-auto leading-relaxed italic font-medium">
            Our master of ceremonies and private consultants are at your absolute disposal. Let us curate your journey to the finest detail.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-24 relative z-20 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-10">
            <div className="bg-white p-12 border border-[#E8E2D6] shadow-xl hover:border-[#C5A059] transition-all duration-500 group">
              <div className="w-16 h-16 bg-[#5D4037] text-[#C5A059] flex items-center justify-center mb-10 group-hover:rotate-[360deg] transition-transform duration-700">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2C1D1A] mb-4">Letter Of Inquiry</h3>
              <p className="text-[#8D6E63] font-bold text-[10px] tracking-[0.2em] uppercase mb-6">Dispatch an electronic missive</p>
              <a href="mailto:concierge@oceanview.com" className="text-[#5D4037] font-serif font-black text-xl hover:text-[#C5A059] transition-colors leading-none block border-b-2 border-[#E8E2D6] pb-2 w-fit">concierge@oceanview.com</a>
            </div>

            <div className="bg-white p-12 border border-[#E8E2D6] shadow-xl hover:border-[#C5A059] transition-all duration-500 group">
              <div className="w-16 h-16 bg-[#5D4037] text-[#C5A059] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2C1D1A] mb-4">Direct Communication</h3>
              <p className="text-[#8D6E63] font-bold text-[10px] tracking-[0.2em] uppercase mb-6">Available 24/7 Royal Support</p>
              <a href="tel:+94112345678" className="text-[#5D4037] font-serif font-black text-xl hover:text-[#C5A059] transition-colors leading-none block border-b-2 border-[#E8E2D6] pb-2 w-fit">+94 11 234 5678</a>
            </div>

            <div className="bg-white p-12 border border-[#E8E2D6] shadow-xl hover:border-[#C5A059] transition-all duration-500 group">
              <div className="w-16 h-16 bg-[#5D4037] text-[#C5A059] flex items-center justify-center mb-10">
                <Anchor className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2C1D1A] mb-4">The Estate Location</h3>
              <p className="text-[#8D6E63] font-bold text-[10px] tracking-[0.2em] uppercase mb-6">Visit our southern sanctuary</p>
              <p className="text-[#2C1D1A] font-serif font-black text-xl leading-relaxed">No. 123, Ancient Ivory Path, <br/> Galle, Southern Province, Sri Lanka</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-16 md:p-24 border border-[#E8E2D6] shadow-2xl h-full relative group">
              <div className="absolute top-0 right-0 w-40 h-40 border-r-2 border-t-2 border-[#C5A059]/30 translate-x-4 -translate-y-4"></div>
              
              <div className="flex items-center gap-6 mb-16">
                <div className="p-4 bg-[#2C1D1A] text-[#C5A059]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-serif font-bold text-[#2C1D1A] tracking-tight">Dispatch Your Requests</h2>
                  <p className="text-[#8D6E63] font-bold text-[10px] tracking-[0.3em] uppercase mt-2 italic">A response will be prepared with royal efficiency.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Distinguished Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-8 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                      placeholder="e.g. Lord John Doe"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Communication Channel</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-8 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                      placeholder="address@heritage.com"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">The Essence of Inquiry</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-8 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none font-bold text-sm tracking-widest text-[#2C1D1A]"
                    placeholder="Sanctuary Reservation Missive"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-[0.3em] ml-1">Your Detailed Requests</label>
                  <textarea 
                    required
                    rows="6"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-8 py-5 bg-[#FAF9F6] border border-[#E8E2D6] focus:border-[#C5A059] transition-all outline-none resize-none font-medium text-lg italic tracking-wide text-[#5D4037] leading-relaxed"
                    placeholder="Elaborate upon your requirements here..."
                  ></textarea>
                </div>

                <div className="pt-8">
                    <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-[#2C1D1A] text-white py-6 font-bold text-[11px] uppercase tracking-[0.5em] hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group"
                    >
                    {status === 'loading' ? (
                        <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#C5A059]" />
                        Dispatching Missive...
                        </>
                    ) : status === 'success' ? (
                        <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        Inquiry Recorded!
                        </>
                    ) : (
                        <>
                        Dispatch missive
                        <Send className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                        </>
                    )}
                    </button>
                </div>
                
                {status === 'success' && (
                  <p className="text-center text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] animate-pulse">
                    The concierge has received your request. Safe travels.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-center text-rose-600 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                    <AlertCircle className="w-4 h-4" />
                    Dispatch interrupted. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
