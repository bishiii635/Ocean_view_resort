import { Palmtree, Users, ShieldCheck, Heart, Map, Clock, Star, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import resortHeritage1 from '../assets/resort_heritage_1_1771077225729.jpg';
import resortHeritage2 from '../assets/resort_heritage_2_1771077185789.jpg';
import resortExteriorElite from '../assets/resort_exterior_elite_1771077046898.jpg';
import resortLuxuryPool from '../assets/resort_luxury_pool_2_1771077252585.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={resortExteriorElite} 
            className="w-full h-full object-cover opacity-120"
            alt="Beach background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-slate-50"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-full text-sm font-black uppercase tracking-widest mb-8 border border-cyan-100 shadow-sm">
              <Star className="w-4 h-4 fill-cyan-600" />
              Our Story
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Where Elegance <br/> Meets the <span className="text-cyan-600">Ocean</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed">
              Founded in 1998, Ocean View Resort has been a sanctuary for travelers seeking the perfect harmony between modern luxury and natural beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border-[12px] border-white">
                <img src={resortHeritage1} alt="Resort aerial" className="w-full aspect-[4/5] object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-500 rounded-[3rem] -z-10 shadow-2xl shadow-cyan-200 animate-pulse"></div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Crafting Unforgettable Memories Since 1998</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Located along the pristine southern coast of Sri Lanka, our resort captures the essence of tropical living. We believe that hospitality isn't just about providing a room; it's about creating an atmosphere where every moment feels special.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">To provide world-class luxury while preserving the authentic charm and warmth of Sri Lankan hospitality.</p>
                </div>

                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                    <Map className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">To become the global benchmark for sustainable luxury resort living in the Asian continent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Stats */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Years of Legacy', value: '25+', icon: Clock },
              { label: 'Happy Guests', value: '50K+', icon: Users },
              { label: 'Award Wins', value: '18', icon: Star },
              { label: 'Safest Destination', value: '100%', icon: ShieldCheck }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h4 className="text-4xl font-black text-slate-900 mb-2">{stat.value}</h4>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black">Values That Define Us</h2>
            <p className="text-slate-400 text-lg">We are committed to excellence in every detail, from our architecture to our service.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Sustainability', desc: 'We minimize our carbon footprint through eco-friendly energy and zero-waste initiatives.' },
              { title: 'Excellence', desc: 'No detail is too small. From thread count to food prep, we strive for perfection.' },
              { title: 'Integrity', desc: 'Honesty and transparency govern every relationship, from staff to honored guests.' }
            ].map((val, i) => (
              <div key={i} className="space-y-4 p-8 rounded-[2rem] border border-white/10 hover:border-cyan-500/50 transition-all group">
                <div className="text-cyan-500 font-black text-6xl opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                <h3 className="text-2xl font-bold">{val.title}</h3>
                <p className="text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-cyan-200">
            <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to Experience Paradise?</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="/rooms" className="bg-white text-cyan-600 px-10 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-lg">
                View All Rooms <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/contact" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg border border-slate-800">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
