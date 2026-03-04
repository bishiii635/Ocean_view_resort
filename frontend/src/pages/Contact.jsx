import { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551882547-ff43c636a224?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-20 bg-cover bg-center"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">Get in Touch</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about our resort or need assistance with your booking? Our team is here to help you experience paradise.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
              <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Email Us</h3>
              <p className="text-slate-500 mb-4">Drop us a line anytime</p>
              <a href="mailto:hello@oceanview.com" className="text-cyan-600 font-bold hover:underline text-lg">hello@oceanview.com</a>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Call Us</h3>
              <p className="text-slate-500 mb-4">Mon-Sun, 24/7 Support</p>
              <a href="tel:+94112345678" className="text-emerald-600 font-bold hover:underline text-lg">+94 11 234 5678</a>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:scale-[1.02] transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Location</h3>
              <p className="text-slate-500 mb-4">Visit our paradise</p>
              <p className="text-slate-800 font-bold">123 Coastal Road, Galle, Sri Lanka</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 h-full">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg">
                  <MessageCircle className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800">Send a Message</h2>
                  <p className="text-slate-400 font-medium">We usually respond within 2 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none"
                    placeholder="Booking Inquiry"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">How can we help?</label>
                  <textarea 
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-slate-900 text-white py-5 rounded-3xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-70 group"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                      Sending Message...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
                
                {status === 'success' && (
                  <p className="text-center text-emerald-600 font-bold animate-in fade-in duration-500">
                    Thank you! We've received your message and will get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-center text-rose-600 font-bold animate-in fade-in duration-500 flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Something went wrong. Please try again.
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
