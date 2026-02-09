
import React from 'react';
import { Link } from 'react-router-dom';
import { getActiveProducts, getSiteText } from '../constants';
import TrustStrip from '../components/TrustStrip';
import InspirationAnalyzer from '../components/InspirationAnalyzer';
import { MediaRenderer } from '../components/AssetManager';

const Home: React.FC = () => {
  const products = getActiveProducts();
  const featured = products.slice(0, 3);
  
  const defaultHero = "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1920&auto=format&fit=crop";
  const defaultReels = [
    "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400",
    "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400",
    "https://images.unsplash.com/photo-1557308535-44a140ba452c?w=400",
    "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400"
  ];

  const showStall = getSiteText('stalls_active') === "YES";

  return (
    <div className="space-y-16 pb-16">
      {/* Dynamic Promotion Banner */}
      <div className="bg-[#FFE5E5] py-4 px-4 text-center border-b border-dusty-rose/20">
        <p className="text-royal-blue text-sm font-semibold tracking-wide">
          💝 Valentine's Special: Limited Edition Duo Bento Boxes are here! <Link to="/menu" className="underline font-bold ml-1">Explore Studio &rarr;</Link>
        </p>
      </div>

      {/* Stall Announcement Banner */}
      {showStall && (
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="bg-royal-blue text-cream p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2 block">Live Pop-up Stall</span>
              <h3 className="text-2xl font-bold serif italic">{getSiteText('stalls_location')}</h3>
              <p className="text-sm opacity-80 mt-1">{getSiteText('stalls_date')}</p>
            </div>
            <Link to="/process" className="relative z-10 bg-cream text-royal-blue px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
              {getSiteText('stalls_cta')}
            </Link>
          </div>
        </div>
      )}

      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MediaRenderer assetKey="brand_hero" src={defaultHero} className="w-full h-full object-cover brightness-[0.5] contrast-[1.1]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-cream">
          <div className="max-w-3xl">
            <span className="bg-dusty-rose text-royal-blue px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 inline-block shadow-lg">
              {getSiteText('home_hero_tagline')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1] serif tracking-tighter">
              {getSiteText('home_hero_title').split(getSiteText('home_hero_italic'))[0]}
              <span className="italic text-dusty-rose font-medium">{getSiteText('home_hero_italic')}</span>
              {getSiteText('home_hero_title').split(getSiteText('home_hero_italic'))[1]}
            </h1>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/menu" className="bg-royal-blue text-cream px-12 py-5 rounded-full font-black text-center hover:bg-slate-800 transition-all text-xs uppercase tracking-widest shadow-2xl">Explore Menu</Link>
              <Link to="/order" className="border-2 border-cream/30 text-cream px-12 py-5 rounded-full font-black text-center hover:bg-cream hover:text-royal-blue transition-all text-xs uppercase tracking-widest backdrop-blur-sm">Custom Booking</Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-royal-blue font-black uppercase text-[10px] tracking-[0.3em] mb-4 block">The Signature Lane</span>
            <h2 className="text-5xl md:text-6xl font-bold royal-blue serif tracking-tight">Handcrafted with <br />Unrivaled Detail.</h2>
          </div>
          <Link to="/menu" className="bg-slate-50 royal-blue px-8 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest border border-slate-100 hover:bg-royal-blue hover:text-cream transition-all">View All Products →</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featured.map((product) => (
            <div key={product.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-50 flex flex-col">
              <div className="relative h-96 overflow-hidden shrink-0">
                <MediaRenderer assetKey={`prod_${product.id.replace(/-/g, '_')}`} src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-8 left-8">
                   <span className="bg-cream/90 backdrop-blur px-5 py-2 rounded-full text-[9px] font-black royal-blue uppercase tracking-[0.2em] border border-white/50">{product.category}</span>
                </div>
              </div>
              <div className="p-12 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 royal-blue serif">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-10 line-clamp-2 leading-relaxed font-light">{product.description}</p>
                <div className="flex justify-between items-center pt-8 border-t border-slate-50 mt-auto">
                  <span className="text-2xl font-black royal-blue">₹{product.price}</span>
                  <Link to="/order" className="bg-royal-blue text-cream px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all">Select</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-royal-blue font-black uppercase text-[10px] tracking-[0.4em] mb-6 block">Viral Studio Reels</span>
          <h2 className="text-4xl md:text-5xl font-bold royal-blue serif mb-16">Inside the Lane.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {defaultReels.map((url, i) => (
               <div key={i} className="aspect-[9/16] bg-slate-50 rounded-[2rem] overflow-hidden group relative shadow-inner">
                  <MediaRenderer assetKey={`reel_${i+1}`} src={url} className="w-full h-full" alt={`Reel ${i+1}`} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 pointer-events-none">
                     <span className="bg-cream/90 text-royal-blue px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">View Post</span>
                  </div>
               </div>
             ))}
          </div>
          <div className="mt-16">
            <a href="https://www.instagram.com/thepatisserielane?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest royal-blue hover:opacity-60 transition-opacity">
              Follow for daily behind-the-scenes 📸
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto relative z-10">
           <InspirationAnalyzer />
        </div>
      </section>
    </div>
  );
};

export default Home;
