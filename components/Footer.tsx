
import React from 'react';
import { Link } from 'react-router-dom';
import { getSiteText } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="serif text-2xl font-bold royal-blue">The Patisserie Lane</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Premium artisanal eggless desserts. Handcrafted with warmth, served with love in Bengaluru.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/thepatisserielane?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center royal-blue hover:bg-royal-blue hover:text-white transition-all">📸</a>
              <a href="https://youtube.com/@thepatisserielane?si=V3lqmH1hfxKj_T6V" target="_blank" rel="noreferrer" className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center royal-blue hover:bg-royal-blue hover:text-white transition-all">🎥</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold royal-blue mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/menu" className="hover:royal-blue transition-colors">Full Menu</Link></li>
              <li><Link to="/process" className="hover:royal-blue transition-colors">Ordering Process</Link></li>
              <li><Link to="/about" className="hover:royal-blue transition-colors">Meet the Maker</Link></li>
              <li><Link to="/order" className="hover:royal-blue transition-colors">Special Requests</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold royal-blue mb-6">Contact</h4>
            <ul className="space-y-4 text-xs text-slate-500 leading-relaxed font-medium">
              <li className="flex items-start space-x-2">
                 <span>📍</span>
                 <span>{getSiteText('contact_address')}</span>
              </li>
              <li className="flex items-center space-x-2">
                 <span>📞</span>
                 <span>{getSiteText('contact_phone')}</span>
              </li>
              <li className="flex items-center space-x-2">
                 <span>💌</span>
                 <span>{getSiteText('contact_email')}</span>
              </li>
              <li className="flex items-center space-x-2">
                 <span>⏰</span>
                 <span>{getSiteText('contact_hours')}</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="bg-cream p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold royal-blue mb-4 text-sm">Direct Order Advantage</h4>
              <p className="text-xs text-slate-500 mb-6 font-light">
                Loved the taste? Order your next customized cake here and skip the aggregator commissions.
              </p>
              <Link
                to="/order"
                className="block w-full text-center bg-royal-blue text-cream py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md"
              >
                Place Request
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-50 text-center text-[10px] text-slate-400 uppercase tracking-widest font-black">
          &copy; {new Date().getFullYear()} The Patisserie Lane. FSSAI Registered Studio.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
