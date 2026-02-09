
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const GeminiAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a premium pastry consultant for 'The Patisserie Lane'. 
        Suggest 3 creative cake ideas (eggless) based on this user event: "${prompt}". 
        Be professional, artistic, and mention specific flavors like Rasmalai, Belgian Chocolate, or Zesty Lemon. 
        Format as short bullet points.`,
        config: {
          systemInstruction: "You are the head chef at a luxury boutique bakery specializing in eggless cakes.",
          temperature: 0.7,
        },
      });

      setResponse(result.text || "I couldn't generate a suggestion right now. Please try again!");
    } catch (error) {
      console.error("AI Error:", error);
      setResponse("Our AI chef is currently whisking something up. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-royal-blue rounded-3xl p-8 md:p-12 text-cream shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-dusty-rose/10 rounded-full -mr-32 -mt-32"></div>
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Smart Cake Consultation</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Unsure what to order? Our AI-powered digital consultant is trained on premium pastry arts to help you design the perfect centerpiece.
          </p>
          <div className="space-y-4">
            <textarea
              className="w-full bg-slate-800 border-none rounded-xl p-4 text-cream placeholder-slate-500 focus:ring-2 focus:ring-dusty-rose outline-none"
              rows={3}
              placeholder="E.g. I need a cake for my sister's graduation. She loves pastel colors and fusion flavors."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleRecommend}
              disabled={loading || !prompt}
              className={`w-full bg-dusty-rose text-slate-900 font-bold py-3 rounded-xl transition-all ${loading ? 'opacity-50' : 'hover:scale-[1.02]'}`}
            >
              {loading ? 'Consulting Chef...' : 'Get Creative Suggestions'}
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-2xl p-6 min-h-[250px] flex flex-col justify-center border border-slate-700">
          {response ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-dusty-rose font-bold text-xs uppercase tracking-widest mb-4">Chef's Recommendations:</p>
              <div className="text-sm space-y-3 whitespace-pre-line leading-relaxed italic text-slate-200">
                {response}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 italic">
              <p>Type your event details to receive personalized artisanal suggestions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;
