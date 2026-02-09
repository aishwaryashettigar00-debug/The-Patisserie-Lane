
import React from 'react';
import { getSiteText } from '../constants';
import { MediaRenderer } from '../components/AssetManager';

const Process: React.FC = () => {
  const steps = [
    { title: getSiteText('step_1_title'), desc: getSiteText('step_1_desc'), icon: '💬' },
    { title: getSiteText('step_2_title'), desc: getSiteText('step_2_desc'), icon: '✅' },
    { title: getSiteText('step_3_title'), desc: getSiteText('step_3_desc'), icon: '🥣' },
    { title: getSiteText('step_4_title'), desc: getSiteText('step_4_desc'), icon: '🎂' }
  ];

  const faqs = [
    { q: getSiteText('faq_1_q'), a: getSiteText('faq_1_a') },
    { q: getSiteText('faq_2_q'), a: getSiteText('faq_2_a') },
    { q: getSiteText('faq_3_q'), a: getSiteText('faq_3_a') },
    { q: getSiteText('faq_4_q'), a: getSiteText('faq_4_a') }
  ];

  const defaultPromoImg = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800";

  return (
    <div className="pb-20">
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-24">
          <span className="text-royal-blue font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">Our Methodology</span>
          <h1 className="text-6xl font-bold royal-blue mb-8 serif italic">From Vision to Vanilla.</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            We've streamlined our studio workflow to ensure every order receives the artisanal attention it deserves.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-32">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              <div className="w-24 h-24 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-4xl shadow-sm group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold royal-blue mb-4 serif">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[75%] w-1/2 h-px bg-slate-100"></div>
              )}
            </div>
          ))}
        </div>

        <section className="mb-32">
          <div className="bg-slate-50 rounded-[4rem] p-12 md:p-20 border border-slate-100">
            <h2 className="text-4xl font-bold royal-blue mb-16 serif text-center">Studio FAQ</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-lg font-bold royal-blue serif">{faq.q}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-royal-blue rounded-[4rem] p-12 md:p-24 text-cream grid md:grid-cols-2 gap-20 items-center overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div>
            <span className="text-dusty-rose font-black uppercase text-[10px] tracking-[0.4em] mb-6 block">Our Commitment</span>
            <h2 className="text-5xl font-bold mb-10 serif leading-[1.1]">Why Direct <br />Ordering Matters.</h2>
            <div className="space-y-10">
               <div className="flex space-x-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 text-xl">💎</div>
                 <div>
                   <p className="font-bold text-xl mb-2 serif">Zero Platform Markups</p>
                   <p className="text-slate-400 text-sm font-light">By ordering direct, you save 25% that aggregators charge. We reinvest this into better ingredients.</p>
                 </div>
               </div>
               <div className="flex space-x-6">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 text-xl">🧁</div>
                 <div>
                   <p className="font-bold text-xl mb-2 serif">True Customization</p>
                   <p className="text-slate-400 text-sm font-light">Aggregators force static menus. Here, every cake is a conversation between you and the chef.</p>
                 </div>
               </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-2">
              <MediaRenderer 
                assetKey="asset_process_promo" 
                src={defaultPromoImg} 
                className="w-full h-full object-cover" 
                alt="Promo" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
