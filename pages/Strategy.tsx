
import React, { useState, useEffect } from 'react';
import { ImageUploader, getStorageEstimate, removeAsset } from '../components/AssetManager';
import { DEFAULT_PRODUCTS, getActiveProducts, DEFAULT_SITE_TEXT } from '../constants';
import { Product, Category } from '../types';

const Strategy: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(getActiveProducts());
  const [storageInfo, setStorageInfo] = useState<{usage: number, quota: number, percent: number} | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  useEffect(() => {
    refreshStorage();
  }, []);

  const refreshStorage = () => {
    getStorageEstimate().then(info => setStorageInfo(info));
  };

  const updateProduct = (id: string, field: keyof Product, value: any) => {
    const updated = products.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProducts(updated);
    localStorage.setItem('custom_products', JSON.stringify(updated));
  };

  const addNewProduct = () => {
    const newId = `custom-${Date.now()}`;
    const newProd: Product = {
      id: newId,
      name: 'New Product Name',
      price: 0,
      category: Category.QUICK_PICKS,
      description: 'Describe your new creation here...',
      image: '',
      features: [],
      preparationTime: '24h'
    };
    const updated = [...products, newProd];
    setProducts(updated);
    localStorage.setItem('custom_products', JSON.stringify(updated));
  };

  const removeProduct = (id: string) => {
    if (window.confirm("Delete this product?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('custom_products', JSON.stringify(updated));
    }
  };

  const updateText = (key: string, value: string) => {
    localStorage.setItem(`text_${key}`, value);
  };

  const exportConfig = () => {
    const config: any = {
      products: getActiveProducts(),
      text: {}
    };
    Object.keys(DEFAULT_SITE_TEXT).forEach(key => {
      const val = localStorage.getItem(`text_${key}`);
      if (val) config.text[key] = val;
    });

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Patisserie_Lane_Blueprint.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const config = JSON.parse(event.target?.result as string);
          if (config.products) localStorage.setItem('custom_products', JSON.stringify(config.products));
          if (config.text) {
            Object.entries(config.text).forEach(([key, val]) => {
              localStorage.setItem(`text_${key}`, val as string);
            });
          }
          alert("Success! Your Studio has been updated with the imported blueprint.");
          window.location.reload();
        } catch (err) {
          alert("This file doesn't look like a Patisserie Blueprint.");
        }
      };
      reader.readAsText(file);
    }
  };

  const resetEverything = () => {
    if (window.confirm("This will reset all text and products to factory defaults. Your videos will stay in memory. Continue?")) {
      Object.keys(DEFAULT_SITE_TEXT).forEach(k => localStorage.removeItem(`text_${k}`));
      localStorage.removeItem('custom_products');
      window.location.reload();
    }
  };

  const textKeys = Object.keys(DEFAULT_SITE_TEXT) as Array<keyof typeof DEFAULT_SITE_TEXT>;

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* SYNC & SHARE HUB */}
        <section className="mb-20 bg-royal-blue rounded-[3rem] p-10 md:p-16 text-cream relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="bg-dusty-rose text-royal-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
                Studio Sharing Center
              </span>
              <h1 className="text-5xl font-bold serif italic mb-6 leading-tight">Why others can't see <br />your changes yet.</h1>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-lg">
                Your edits are currently stored in your browser's <strong>"Private Studio Memory"</strong>. 
                The URL itself is public, but your content stays on this device until you share the <strong>Blueprint File</strong>.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={exportConfig}
                  className="bg-cream text-royal-blue px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3"
                >
                  <span className="text-lg">📥</span> Download Blueprint
                </button>
                <label className="bg-white/10 border border-white/20 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all cursor-pointer flex items-center gap-3">
                  <span className="text-lg">📤</span> Upload Blueprint
                  <input type="file" accept=".json" className="hidden" onChange={importConfig} />
                </label>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10">
              <h3 className="text-lg font-bold serif italic mb-6">Studio Status</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-xs opacity-60 uppercase tracking-widest">Storage Mode</span>
                  <span className="text-xs font-bold text-green-400">● Local Browser Sync</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-xs opacity-60 uppercase tracking-widest">Memory Health</span>
                  <span className="text-xs font-bold">{storageInfo ? `${storageInfo.percent}% Used` : 'Calculating...'}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest opacity-40">
                    <span>Available Quota</span>
                    <span>{storageInfo ? `${storageInfo.quota} MB` : '--'}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${storageInfo && storageInfo.percent > 80 ? 'bg-red-400' : 'bg-cream'}`} 
                      style={{ width: `${storageInfo?.percent || 0}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-[10px] leading-relaxed opacity-50 italic">
                  Note: High video usage (Reels) uses memory. If health drops below 10%, delete old Reels to make space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Global Brand Assets */}
        <section className="mb-24">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-3xl font-bold royal-blue serif shrink-0 italic">1. Master Branding</h2>
            <div className="h-px bg-slate-200 w-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            <ImageUploader label="App Logo" assetKey="brand_logo" current="https://picsum.photos/seed/logo/100/100" />
            <ImageUploader label="Main Banner" assetKey="brand_hero" current="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400" />
            <ImageUploader label="Profile Pic" assetKey="brand_about" current="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400" />
            <ImageUploader label="Process Image" assetKey="asset_process_promo" current="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" />
          </div>
        </section>

        {/* 2. Stall Management */}
        <section className="mb-24 bg-[#FFF0F0] p-12 rounded-[3.5rem] border border-dusty-rose/20">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-3xl font-bold royal-blue serif shrink-0 italic">2. Live Stall Tracker</h2>
            <div className="h-px bg-dusty-rose/20 w-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             <div className="space-y-2">
                <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-50">Stall Visibility</label>
                <select className="w-full bg-white border-none rounded-xl px-5 py-4 text-xs font-bold royal-blue shadow-sm" defaultValue={localStorage.getItem('text_stalls_active') || 'YES'} onChange={(e) => updateText('stalls_active', e.target.value)}>
                   <option value="YES">Show on Website</option>
                   <option value="NO">Hide from Website</option>
                </select>
             </div>
             <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-50">Event Location & Title</label>
                <input type="text" className="w-full bg-white border-none rounded-xl px-5 py-4 text-xs font-bold royal-blue shadow-sm" defaultValue={localStorage.getItem('text_stalls_location') || DEFAULT_SITE_TEXT.stalls_location} onBlur={(e) => updateText('stalls_location', e.target.value)} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-50">Date / Time</label>
                <input type="text" className="w-full bg-white border-none rounded-xl px-5 py-4 text-xs font-bold royal-blue shadow-sm" defaultValue={localStorage.getItem('text_stalls_date') || DEFAULT_SITE_TEXT.stalls_date} onBlur={(e) => updateText('stalls_date', e.target.value)} />
             </div>
          </div>
        </section>

        {/* 3. Viral Reels (4 Slots) */}
        <section className="mb-24">
          <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-3xl font-bold royal-blue serif shrink-0 italic">3. Trending Video Feed</h2>
            <div className="h-px bg-slate-200 w-full"></div>
          </div>
          <p className="text-sm text-slate-500 mb-8 font-light italic">Videos are stored in high-quality. Each video reduces your 'Memory Health' slightly.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ImageUploader 
                key={i} 
                label={`Reel ${i}`} 
                assetKey={`reel_${i}`} 
                current={`https://picsum.photos/seed/reel${i}/400/700`} 
              />
            ))}
          </div>
        </section>

        {/* 4. Catalog */}
        <section className="mb-24 bg-white p-12 rounded-[4rem] border border-slate-100 shadow-xl">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold royal-blue serif italic">4. Studio Menu</h2>
            <button onClick={addNewProduct} className="bg-royal-blue text-cream px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all">+ Add Item</button>
          </div>
          <div className="space-y-6">
            {products.map((product) => (
              <div key={product.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 items-start group relative">
                <button onClick={() => removeProduct(product.id)} className="absolute top-6 right-8 text-[9px] font-black text-red-300 hover:text-red-500 uppercase tracking-widest">Delete</button>
                <div className="lg:col-span-2">
                   <ImageUploader label="Photo" assetKey={`prod_${product.id.replace(/-/g,'_')}`} current={product.image} />
                </div>
                <div className="lg:col-span-10 grid md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black royal-blue uppercase tracking-widest opacity-40">Item Name</label>
                    <input className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold royal-blue" value={product.name} onChange={(e) => updateProduct(product.id, 'name', e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black royal-blue uppercase tracking-widest opacity-40">Price (₹)</label>
                    <input type="number" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold royal-blue" value={product.price} onChange={(e) => updateProduct(product.id, 'price', parseInt(e.target.value))} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black royal-blue uppercase tracking-widest opacity-40">Category</label>
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold royal-blue" value={product.category} onChange={(e) => updateProduct(product.id, 'category', e.target.value)}>
                      {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-3 space-y-1">
                    <label className="text-[9px] font-black royal-blue uppercase tracking-widest opacity-40">Description</label>
                    <textarea className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm text-slate-600" rows={2} value={product.description} onChange={(e) => updateProduct(product.id, 'description', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Website Text */}
        <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold royal-blue serif italic">5. Storytelling & Text</h2>
            <button onClick={resetEverything} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Reset All Text</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {textKeys.map((key) => (
              <div key={key} className="space-y-2">
                <label className="text-[10px] font-black royal-blue uppercase tracking-widest opacity-40">{key.replace(/_/g, ' ')}</label>
                {(key.includes('content') || key.includes('desc') || key.includes('rev') || key.includes('a')) ? (
                  <textarea className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-xs text-slate-600 shadow-inner" rows={3} defaultValue={localStorage.getItem(`text_${key}`) || (DEFAULT_SITE_TEXT as any)[key]} onBlur={(e) => updateText(key, e.target.value)} />
                ) : (
                  <input className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-xs font-bold royal-blue shadow-inner" defaultValue={localStorage.getItem(`text_${key}`) || (DEFAULT_SITE_TEXT as any)[key]} onBlur={(e) => updateText(key, e.target.value)} />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Strategy;
