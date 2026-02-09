
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MediaRenderer } from './AssetManager';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'The Process', path: '/process' },
    { name: 'About', path: '/about' },
    { name: 'Strategy 🚀', path: '/strategy' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-slate-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-4 group">
              <div className="w-14 h-14 bg-royal-blue rounded-full flex items-center justify-center p-0.5 shadow-lg group-hover:scale-105 transition-transform overflow-hidden border-2 border-white">
                {/* Fix: Using MediaRenderer to handle logo assets correctly, avoiding manual state/Blob management and type errors */}
                <MediaRenderer 
                  assetKey="brand_logo" 
                  src="https://picsum.photos/seed/patisserielane/100/100" 
                  alt="Logo" 
                  className="rounded-full w-full h-full transition-opacity duration-300" 
                  showControls={false}
                />
              </div>
              <div className="flex flex-col">
                <span className="serif text-xl font-black royal-blue uppercase tracking-tighter leading-none">
                  The Patisserie Lane
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 royal-blue text-center mt-1">
                  Bengaluru Studio
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] font-black uppercase tracking-widest transition-all relative py-2 ${
                  location.pathname === link.path ? 'royal-blue' : 'text-slate-400 hover:text-royal-blue'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/order"
              className="bg-royal-blue text-cream px-10 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
            >
              Order Now
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 royal-blue">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-cream border-t border-slate-100 py-6 px-6 space-y-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block text-xs font-black uppercase tracking-widest text-slate-500">
              {link.name}
            </Link>
          ))}
          <Link
            to="/order"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-royal-blue text-cream py-4 rounded-xl text-[11px] font-black uppercase tracking-widest"
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
