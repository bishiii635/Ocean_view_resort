import { Palmtree, Users, ShieldCheck, Heart, Map, Clock, Star, ArrowRight, Crown, Gem, Anchor, Compass } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import resortHeritage1 from '../assets/resort_heritage_1_1771077225729.jpg';
import resortHeritage2 from '../assets/resort_heritage_2_1771077185789.jpg';
import resortExteriorElite from '../assets/resort_exterior_elite_1771077046898.jpg';
import resortLuxuryPool from '../assets/resort_luxury_pool_2_1771077252585.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={resortExteriorElite} 
            className="w-full h-full object-cover grayscale-[30%]"
            alt="Colonial background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-[#FAF9F6]/80 to-[#FAF9F6]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#5D4037] text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.4em] mb-10 border border-[#C5A059]/20 shadow-xl">
              <Crown className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-6xl md:text-9xl font-serif font-black text-[#2C1D1A] mb-10 leading-[0.9] tracking-tighter">
              Legacy Of <br/> Ancient <span className="italic text-[#C5A059]">Splendor</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#6D5B57] max-w-3xl leading-relaxed italic font-medium">
              Since 1998, Ocean View Resort has stood as a bastion of luxury, curating experiences that blend colonial grandeur with the soul of the southern coast.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-40 bg-white border-y border-[#E8E2D6]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="overflow-hidden shadow-2xl relative z-10 border-[20px] border-[#FAF9F6]">
                <img src={resortHeritage1} alt="Resort heritage" className="w-full aspect-[4/5] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-[#C5A059]/10 -z-10 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#C5A059]/30 w-full h-full -z-0 translate-x-6 translate-y-6"></div>
            </div>

            <div className="space-y-16">
              <div className="space-y-8">
                <div className="w-20 h-px bg-[#C5A059]"></div>
                <h2 className="text-5xl md:text-7xl font-serif font-black text-[#2C1D1A] leading-tight">Authentic Grace Since The 20th Century</h2>
                <p className="text-xl text-[#6D5B57] leading-relaxed italic font-medium">
                  Constructed upon the hallowed grounds of a colonial estate, our sanctuary captures the very spirit of tropical nobility. Each stone was laid with the intent to honor the past while defining the future of leisure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-10 bg-[#FAF9F6] border border-[#E8E2D6] shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="w-14 h-14 bg-[#2C1D1A] text-[#C5A059] flex items-center justify-center mb-8">
                    <Anchor className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#2C1D1A] mb-4">Our Compact</h3>
                  <p className="text-[#8D6E63] text-sm leading-relaxed font-bold uppercase tracking-widest">To uphold the highest standards of colonial excellence while nurturing the local heritage of our island home.</p>
                </div>

                <div className="p-10 bg-[#FAF9F6] border border-[#E8E2D6] shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="w-14 h-14 bg-[#2C1D1A] text-[#C5A059] flex items-center justify-center mb-8">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#2C1D1A] mb-4">Our Horizon</h3>
                  <p className="text-[#8D6E63] text-sm leading-relaxed font-bold uppercase tracking-widest">To be recognized globally as the paramount defender of traditional luxury and coastal sustainability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Stats */}
      <section className="py-32 bg-[#FAF9F6]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Era of Legacy', value: '25+', icon: Clock },
              { label: 'Noble Guests', value: '50K+', icon: Users },
              { label: 'Royal Awards', value: '18', icon: Star },
              { label: 'Distinction Status', value: '100%', icon: ShieldCheck }
            ].map((stat, i) => (
              <div key={i} className="text-center group border-r border-[#E8E2D6] last:border-0">
                <div className="w-12 h-12 mx-auto text-[#C5A059] mb-8 group-hover:scale-125 transition-transform duration-500">
                  <stat.icon className="w-full h-full" />
                </div>
                <h4 className="text-5xl font-serif font-black text-[#2C1D1A] mb-3">{stat.value}</h4>
                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.3em] text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-40 bg-[#2C1D1A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C5A059]/5 rounded-full blur-[150px]"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto mb-32 space-y-8">
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.5em] text-xs">Royal Principles</h4>
            <h2 className="text-5xl md:text-8xl font-serif font-black italic">The Pillars Of Excellence</h2>
            <p className="text-[#E3C184] text-xl font-medium italic">Universal values that guide every decree and every service.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: 'Conscious Legacy', desc: 'Preserving our natural ivory coast through ancestral sustainability and zero-waste decrees.' },
              { title: 'Mastery', desc: 'No detail is too small for our attention. From the weave of the linen to the notes of the spice.' },
              { title: 'Noble Trust', desc: 'Honor and transparency govern our house, ensuring every guest is treated as absolute royalty.' }
            ].map((val, i) => (
              <div key={i} className="space-y-8 p-12 border border-white/10 hover:border-[#C5A059]/50 transition-all duration-700 bg-white/[0.02] group">
                <div className="text-[#C5A059] font-serif font-black text-8xl opacity-10 group-hover:opacity-40 transition-all duration-700 group-hover:-translate-y-4">0{i+1}</div>
                <h3 className="text-3xl font-serif font-bold tracking-wide">{val.title}</h3>
                <p className="text-white/60 leading-relaxed font-medium italic text-lg">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 relative px-6">
         <div className="container mx-auto">
             <div className="bg-[#FAF9F6] border-2 border-[#C5A059] p-16 md:p-32 text-center relative group overflow-hidden">
                <div className="absolute inset-0 bg-[#5D4037] scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom"></div>
                <div className="relative z-10">
                    <h2 className="text-5xl md:text-8xl font-serif font-black mb-12 text-[#2C1D1A] group-hover:text-white transition-colors duration-700">Experience The Legacy</h2>
                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                        <a href="/rooms" className="px-16 py-7 bg-[#2C1D1A] text-white font-bold text-[10px] tracking-[0.4em] uppercase border border-transparent group-hover:bg-[#C5A059] group-hover:text-[#2C1D1A] transition-all duration-700">
                            Enter Sanctuaries
                        </a>
                        <a href="/contact" className="px-16 py-7 bg-transparent border-2 border-[#2C1D1A] text-[#2C1D1A] font-bold text-[10px] tracking-[0.4em] uppercase group-hover:border-white group-hover:text-white transition-all duration-700">
                            Consult Concierge
                        </a>
                    </div>
                </div>
             </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
