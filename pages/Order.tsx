
import React, { useState } from 'react';
import { getActiveProducts, getSiteText } from '../constants';

const Order: React.FC = () => {
  const products = getActiveProducts();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    occasion: '',
    product: products[0]?.name || '',
    flavor: '',
    message: '',
    delivery: 'Pickup'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const waMessage = `Hi Adwita! New digital order:\n👤 Name: ${formData.name}\n🍰 Product: ${formData.product}\n📅 Date: ${formData.date}\n✨ Occasion: ${formData.occasion}\n🥣 Flavor: ${formData.flavor}\n💌 Message: ${formData.message}\n\nI am ready to pay the 10% advance to confirm!`;
    window.open(`https://wa.me/917829231868?text=${encodeURIComponent(waMessage)}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-xl">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold royal-blue mb-4 serif">Order Draft Ready</h1>
        <p className="text-slate-500 mb-10 text-lg font-light">
          Your order details are ready. Click below to chat with Adwita on WhatsApp and finalize your delivery.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-royal-blue text-cream px-10 py-4 rounded-xl font-bold shadow-lg uppercase text-xs tracking-widest"
        >
          Modify Order
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
      <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-slate-50 grid md:grid-cols-5">
        <div className="md:col-span-2 bg-royal-blue p-12 lg:p-16 text-cream flex flex-col justify-between relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mb-32"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-8 serif italic">{getSiteText('order_promo_title')}</h2>
            <p className="text-slate-300 mb-12 leading-relaxed text-lg font-light">
              {getSiteText('order_promo_desc')}
            </p>
            <div className="space-y-10">
              <div className="flex items-center space-x-6">
                <span className="text-3xl">🎓</span>
                <p className="text-sm font-bold tracking-tight">Lavonne Academy Alumna</p>
              </div>
              <div className="flex items-center space-x-6">
                <span className="text-3xl">🌿</span>
                <p className="text-sm font-bold tracking-tight">100% Pure Eggless Kitchen</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 p-12 lg:p-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-60">Full Name</label>
                <input required type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-blue transition-all shadow-inner" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-60">WhatsApp No.</label>
                <input required type="tel" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-blue transition-all shadow-inner" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-60">Preferred Date</label>
                <input required type="date" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-blue transition-all shadow-inner" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-60">Occasion</label>
                <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-blue transition-all shadow-inner" value={formData.occasion} onChange={e => setFormData({...formData, occasion: e.target.value})}>
                  <option value="">Select Event</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Valentine's">Valentine's Special</option>
                  <option value="Just Because">Just Because ✨</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-60">The Selection</label>
              <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-blue transition-all shadow-inner font-bold" value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})}>
                {products.map(p => (
                  <option key={p.id} value={p.name}>{p.name} (Starts ₹{p.price})</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-60">Special Instructions / Flavors</label>
              <textarea className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-royal-blue transition-all shadow-inner" rows={4} placeholder="Tell us about flavors, colors, or custom text..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
            </div>

            <button type="submit" className="w-full bg-royal-blue text-cream py-6 rounded-2xl font-black shadow-2xl hover:bg-slate-800 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs">
              Review and Finalize via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
