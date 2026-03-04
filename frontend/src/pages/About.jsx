import { Palmtree, Users, ShieldCheck, Heart, Map, Clock, Star, ArrowRight, Crown, Gem, Anchor, Compass, Sparkles, MapPin, History, Waves } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  // Luxury Vintage Unsplash Images
  const heroImg = "https://images.unsplash.com/photo-1560200353-ce0a76b1d438?auto=format&fit=crop&q=80&w=2000"; // Grand colonial architecture
  const historyImg1 = "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1000"; // Luxury Estate Interior
  const historyImg2 = "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1000"; // Golden Coastal Vista
  const ctaInnerImg = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2000"; // Luxury pool sunset

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans">
      <Header />
      
      {/* Hero Section - The Grand Chronicle */}
      <section className="relative pt-64 pb-52 overflow-hidden bg-[#2C1D1A]">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            className="w-full h-full object-cover opacity-10 scale-110 grayscale"
            alt="Colonial Heritage"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2C1D1A]/90 via-[#2C1D1A]/60 to-[#2C1D1A]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-6 px-10 py-3 bg-white/5 border border-[#C5A059]/30 backdrop-blur-sm">
                <Crown className="w-5 h-5 text-[#C5A059]" />
                <span className="text-[#C5A059] font-bold text-[11px] uppercase tracking-[0.6em]">The Imperial Chronicle</span>
                <Crown className="w-5 h-5 text-[#C5A059]" />
            </div>
          </div>
          <h1 className="text-7xl md:text-9xl font-serif font-black text-white mb-10 tracking-tighter leading-none italic animate-in fade-in slide-in-from-bottom-10 duration-1000">
            Heritage of <br/> <span className="text-[#C5A059]">Splendor</span>
          </h1>
          <p className="text-2xl text-[#E3C184] max-w-2xl mx-auto font-medium italic opacity-80 border-t border-[#C5A059]/20 pt-10">
            "A sanctuary where the essence of the golden era meets the heart of the ivory coast."
          </p>
        </div>

        {/* Decorative Compass Lines */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
            <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C5A059]"></div>
            <Compass className="w-6 h-6 text-[#C5A059] animate-spin-slow" />
        </div>
      </section>

      {/* The Restoration Story */}
      <section className="py-48 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative group lg:order-2">
              <div className="grid grid-cols-2 gap-8">
                <div className="mt-20">
                     <div className="overflow-hidden shadow-2xl border-4 border-[#FAF9F6] group-hover:border-[#C5A059]/30 transition-all duration-700">
                        <img src={historyImg1} alt="Estate interior" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />
                    </div>
                </div>
                <div>
                     <div className="overflow-hidden shadow-2xl border-4 border-[#FAF9F6] group-hover:border-[#C5A059]/30 transition-all duration-700">
                        <img src={historyImg2} alt="Coastal Vista" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:rotate-3" />
                    </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 border-l border-b border-[#C5A059]/30 -z-0"></div>
            </div>

            <div className="space-y-16 lg:order-1">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <History className="text-[#C5A059] w-6 h-6" />
                    <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.5em] text-[10px]">The Sacred Path</h4>
                </div>
                <h2 className="text-5xl md:text-8xl font-serif font-black text-[#2C1D1A] leading-tight italic tracking-tighter">Imperial <br/> Legacy</h2>
                <div className="w-32 h-1 bg-[#C5A059]"></div>
                <p className="text-2xl text-[#6D5B57] leading-relaxed italic font-medium first-letter:text-7xl first-letter:font-serif first-letter:text-[#C5A059] first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]">
                  Ocean View Resort was founded upon the hallowed grounds of a 19th-century colonial estate. In 1998, we undertook a grand restoration to preserve this architectural masterpiece, ensuring that every noble visitor experiences the authentic grace of a bygone tropical era.
                </p>
                <p className="text-lg text-[#8D6E63] leading-relaxed italic border-l-2 border-[#E8E2D6] pl-10">
                  Our stewards have meticulously preserved the original ivory-colored stone and the grand mahogany archives, blending ancient majesty with the comforts of modern sovereignty.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                   <div className="space-y-6 group">
                        <Waves className="w-10 h-10 text-[#C5A059] group-hover:-translate-y-2 transition-transform" />
                        <h5 className="text-2xl font-serif font-black text-[#2C1D1A]">Coastal Sovereignty</h5>
                        <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-[0.3em] leading-loose">Deep harbor vistas and private ivory sands, curated for the elite few.</p>
                   </div>
                   <div className="space-y-6 group">
                        <Anchor className="w-10 h-10 text-[#C5A059] group-hover:rotate-12 transition-transform" />
                        <h5 className="text-2xl font-serif font-black text-[#2C1D1A]">Noble Craftsmanship</h5>
                        <p className="text-[10px] text-[#8D6E63] font-bold uppercase tracking-[0.3em] leading-loose">Authentic recipes and handmade details passed through noble hands.</p>
                   </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Statistics - The Numbers of Merit */}
      <section className="py-40 bg-[#FAF9F6] border-y border-[#E8E2D6]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-20">
            {[
              { label: 'Era of Distinction', value: '28+', icon: Clock },
              { label: 'Sovereign Guests', value: '62K+', icon: Users },
              { label: 'Imperial Awards', value: '24', icon: Star },
              { label: 'Integrity Status', value: '100%', icon: ShieldCheck }
            ].map((stat, i) => (
              <div key={i} className="text-center group p-12 hover:bg-white transition-all duration-700 border-x border-transparent hover:border-[#E8E2D6] hover:shadow-2xl">
                <div className="w-14 h-14 mx-auto text-[#C5A059] mb-10 group-hover:scale-125 transition-all duration-700">
                  <stat.icon className="w-full h-full" />
                </div>
                <h4 className="text-6xl font-serif font-black text-[#2C1D1A] mb-4 italic">{stat.value}</h4>
                <p className="text-[#8D6E63] font-bold uppercase tracking-[0.4em] text-[10px] border-t border-[#FAF9F6] pt-4">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars of Excellence - Values */}
      <section className="py-52 bg-[#2C1D1A] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
        <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[120px]"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto mb-32 space-y-10">
            <div className="flex justify-center mb-10">
                <Sparkles className="w-8 h-8 text-[#C5A059] animate-pulse" />
            </div>
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.6em] text-[11px]">The Imperial compact</h4>
            <h2 className="text-6xl md:text-9xl font-serif font-black italic tracking-tighter leading-none">Pillars of <br/> Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: 'Conscious Legacy', desc: 'Preserving our ivory coast through ancestral sustainability and zero-waste decrees across the entire estate.' },
              { title: 'Peerless Mastery', desc: 'No detail is too small for our stewardship. From the thread-count of the linen to the notes of the spices.' },
              { title: 'Sovereign Trust', desc: 'Absolute transparency and honor govern our house, ensuring every noble is treated as true royalty.' }
            ].map((val, i) => (
              <div key={i} className="space-y-10 p-16 border border-white/5 hover:border-[#C5A059]/40 transition-all duration-700 bg-white/[0.01] group relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <div className="text-[#C5A059] font-serif font-black text-9xl opacity-5 group-hover:opacity-20 transition-all duration-700 absolute top-4 right-8">0{i+1}</div>
                <h3 className="text-3xl font-serif font-black tracking-wide italic relative z-10">{val.title}</h3>
                <p className="text-[#E8E2D6] leading-[2] font-medium italic text-xl relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Journey */}
      <section className="py-64 relative px-6 bg-white overflow-hidden">
         <div className="container mx-auto">
             <div className="relative border-[12px] border-[#2C1D1A] p-2 group shadow-2xl">
                <div className="relative bg-[#FAF9F6] p-24 md:p-48 text-center overflow-hidden border border-[#C5A059]/30">
                    <div 
                        className="absolute inset-0 opacity-10 grayscale group-hover:scale-105 transition-transform duration-[40s] bg-cover bg-center"
                        style={{ backgroundImage: `url(${ctaInnerImg})` }}
                    ></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-6xl md:text-9xl font-serif font-black mb-16 text-[#2C1D1A] italic tracking-tighter leading-none">Enter The Heritage</h2>
                        <p className="text-[#6D5B57] text-2xl font-medium max-w-3xl mx-auto italic mb-16 opacity-80 border-y border-[#E8E2D6] py-10">
                            "A stay at Ocean View is not merely a visit; it is a permanent entry into our grand imperial archives."
                        </p>
                        <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
                            <a href="/rooms" className="px-20 py-8 bg-[#2C1D1A] text-white font-bold text-[11px] tracking-[0.5em] uppercase hover:bg-[#5D4037] hover:text-[#C5A059] transition-all duration-700 shadow-2xl flex items-center gap-4">
                                Inspect Sanctuaries <Gem className="w-5 h-5" />
                            </a>
                            <a href="/contact" className="px-20 py-8 bg-transparent border-2 border-[#2C1D1A] text-[#2C1D1A] font-bold text-[11px] tracking-[0.5em] uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-700 flex items-center gap-4">
                                Summons Concierge <MapPin className="w-5 h-5" />
                            </a>
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

export default About;
