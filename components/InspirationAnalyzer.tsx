
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const InspirationAnalyzer: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCake = async () => {
    if (!image) return;
    setLoading(true);
    setAnalysis('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { text: "Act as Adwita, a premium eggless pastry chef from Lavonne Academy. Analyze this cake inspiration photo. Suggest how 'The Patisserie Lane' can recreate this as a 100% eggless version. Mention flavor recommendations (like Rasmalai or Belgian Chocolate) and aesthetic details. Be encouraging and professional." }
          ]
        }
      });

      setAnalysis(response.text || "Chef Adwita is currently busy in the kitchen. Please try again!");
    } catch (error) {
      console.error(error);
      setAnalysis("Something went wrong. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2 space-y-6">
          <span className="bg-royal-blue text-cream px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Digital Innovation</span>
          <h2 className="text-4xl font-bold royal-blue">Cake Inspiration Analyzer</h2>
          <p className="text-slate-600 leading-relaxed">
            Saw a cake on Pinterest or Instagram? Upload the screenshot here. Our AI, trained on Adwita's artisanal style, will help you translate that vision into a custom, eggless order.
          </p>
          
          <div className="flex flex-col space-y-4">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-royal-blue/30 rounded-2xl p-10 hover:bg-royal-blue/5 transition-all text-slate-400 font-medium"
            >
              {image ? "Change Photo" : "Upload Your Inspiration Photo"}
            </button>
            
            {image && (
              <button 
                onClick={analyzeCake}
                disabled={loading}
                className="bg-royal-blue text-cream py-4 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {loading ? "Chef is analyzing..." : "Consult Chef Adwita"}
              </button>
            )}
          </div>
        </div>

        <div className="md:w-1/2 w-full">
          {image ? (
            <div className="relative group">
              <img src={image} className="w-full h-80 object-cover rounded-3xl shadow-inner border-4 border-white" alt="Input" />
              {analysis && (
                <div className="mt-6 bg-cream p-6 rounded-2xl border-l-4 border-dusty-rose animate-in fade-in slide-in-from-right-4 duration-500">
                  <p className="text-xs font-bold royal-blue uppercase mb-3">Artisanal Consultation:</p>
                  <p className="text-sm text-slate-700 italic leading-relaxed whitespace-pre-line">
                    {analysis}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-80 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 italic">
              Results will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspirationAnalyzer;
