
import React from 'react';

const TrustStrip: React.FC = () => {
  const trustItems = [
    { label: 'FSSAI Registered', icon: '✅' },
    { label: 'Lavonne Alumna', icon: '🎓' },
    { label: '250+ Happy Customers', icon: '💖' },
    { label: 'Featured at ITC SBC', icon: '🏢' }
  ];

  return (
    <div className="bg-white border-y border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-around items-center gap-8">
          {trustItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center space-y-2">
              <span className="text-3xl">{item.icon}</span>
              <span className="text-xs uppercase tracking-widest font-bold royal-blue opacity-80 text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
