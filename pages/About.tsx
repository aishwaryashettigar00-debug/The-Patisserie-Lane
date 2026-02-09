
import React from 'react';
import { getSiteText } from '../constants';
import { MediaRenderer } from '../components/AssetManager';

const About: React.FC = () => {
  const defaultAboutImg = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="pb-20 space-y-24">
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-cream">
              <MediaRenderer 
                assetKey="brand_about" 
                src={defaultAboutImg} 
                alt="Adwita" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-royal-blue text-cream p-10 rounded-[2.5rem] shadow-2xl max-w-xs transform rotate-2">
              <p className="serif text-xl font-bold italic leading-relaxed">"{getSiteText('about_quote')}"</p>
              <p className="text-[10px] mt-4 opacity-60 font-black uppercase tracking-[0.2em]">Adwita Mathur</p>
            </div>
          </div>
          <div className="space-y-10 lg:pl-10">
            <h1 className="text-6xl lg:text-7xl font-bold royal-blue serif leading-[0.95] tracking-tighter">
              {getSiteText('about_title')}
            </h1>
            <p className="text-slate-600 font-light leading-relaxed text-lg">
              {getSiteText('about_content_1')}
            </p>
            <p className="text-slate-600 font-light leading-relaxed text-lg">
              {getSiteText('about_content_2')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
