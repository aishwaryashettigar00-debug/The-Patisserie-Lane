
import React from 'react';
import { Link } from 'react-router-dom';
import { getActiveProducts } from '../constants';
import { Category } from '../types';
import { MediaRenderer } from '../components/AssetManager';

const Menu: React.FC = () => {
  const products = getActiveProducts();
  const categories = [Category.BENTO_STUDIO, Category.QUICK_PICKS, Category.CELEBRATION, Category.SEASONAL];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-24">
        <span className="text-royal-blue font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">The Studio Collection</span>
        <h1 className="text-6xl font-bold royal-blue mb-6 serif italic">The Full Palette.</h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-light text-lg">
          Explore our signature range of eggless delights. Every item is handcrafted to order in our Sarjapur studio.
        </p>
      </div>

      {categories.map((cat) => {
        const catProducts = products.filter(p => p.category === cat);
        if (catProducts.length === 0) return null;

        return (
          <section key={cat} className="mb-24">
            <div className="flex items-center space-x-6 mb-12">
              <h2 className="text-3xl font-bold royal-blue shrink-0 serif">{cat}</h2>
              <div className="h-px bg-slate-100 w-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {catProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-slate-50 overflow-hidden flex flex-col">
                  <div className="h-80 overflow-hidden relative">
                    <MediaRenderer 
                      assetKey={`prod_${product.id.replace(/-/g, '_')}`} 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                      <p className="text-cream text-[10px] font-black uppercase tracking-widest">{product.preparationTime}</p>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold royal-blue serif leading-tight">{product.name}</h3>
                      <span className="text-xl font-black royal-blue shrink-0 ml-4">₹{product.price}</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-10 leading-relaxed font-light flex-grow">
                      {product.description}
                    </p>
                    <Link
                      to="/order"
                      className="block w-full text-center bg-royal-blue text-cream py-5 rounded-[1.5rem] font-black hover:bg-slate-800 transition-all uppercase text-[10px] tracking-widest shadow-xl active:scale-95"
                    >
                      Book This Item
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Menu;
