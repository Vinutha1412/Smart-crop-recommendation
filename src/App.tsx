import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  FlaskConical, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Search, 
  Loader2, 
  Leaf,
  Info,
  ArrowRight,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { InputGroup } from './components/InputGroup';
import { CropCard } from './components/CropCard';
import { SoilData, RecommendationResponse } from './types';
import { getCropRecommendations } from './services/gemini';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [formData, setFormData] = useState<SoilData>({
    nitrogen: 40,
    phosphorus: 40,
    potassium: 40,
    ph: 6.5,
    temperature: 25,
    humidity: 60,
    rainfall: 100,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await getCropRecommendations(formData);
      setRecommendation(result);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRecommendation(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-accent-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Farm landscape" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-accent-900/40 to-accent-900/80" />
        
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-400/30 text-accent-300 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sprout size={14} />
            AI-Powered Agriculture
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            AgroSuggest
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent-100/80 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Optimize your harvest with data-driven crop recommendations tailored to your soil and climate.
          </motion.p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-brand-200 sticky top-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-accent-100 flex items-center justify-center text-accent-600">
                  <FlaskConical size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand-900">Soil Analysis</h2>
                  <p className="text-xs text-brand-400 font-medium">Enter your field parameters</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-300 border-b border-brand-100 pb-2">Nutrients (mg/kg)</h3>
                  <InputGroup 
                    label="Nitrogen (N)" 
                    name="nitrogen" 
                    value={formData.nitrogen} 
                    onChange={handleInputChange} 
                    icon={Leaf} 
                    unit="mg/kg" 
                  />
                  <InputGroup 
                    label="Phosphorus (P)" 
                    name="phosphorus" 
                    value={formData.phosphorus} 
                    onChange={handleInputChange} 
                    icon={FlaskConical} 
                    unit="mg/kg" 
                  />
                  <InputGroup 
                    label="Potassium (K)" 
                    name="potassium" 
                    value={formData.potassium} 
                    onChange={handleInputChange} 
                    icon={TrendingUp} 
                    unit="mg/kg" 
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-300 border-b border-brand-100 pb-2">Environment</h3>
                  <InputGroup 
                    label="Soil pH" 
                    name="ph" 
                    value={formData.ph} 
                    onChange={handleInputChange} 
                    icon={Info} 
                    unit="pH" 
                    min={0} 
                    max={14} 
                    step={0.1} 
                  />
                  <InputGroup 
                    label="Temperature" 
                    name="temperature" 
                    value={formData.temperature} 
                    onChange={handleInputChange} 
                    icon={Thermometer} 
                    unit="°C" 
                    min={-10} 
                    max={60} 
                  />
                  <InputGroup 
                    label="Humidity" 
                    name="humidity" 
                    value={formData.humidity} 
                    onChange={handleInputChange} 
                    icon={Droplets} 
                    unit="%" 
                    min={0} 
                    max={100} 
                  />
                  <InputGroup 
                    label="Rainfall" 
                    name="rainfall" 
                    value={formData.rainfall} 
                    onChange={handleInputChange} 
                    icon={CloudRain} 
                    unit="mm" 
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent-600 hover:bg-accent-700 disabled:bg-accent-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-accent-500/20 transition-all flex items-center justify-center gap-2 mt-8 group"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Get Recommendations
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-8" id="results">
            <AnimatePresence mode="wait">
              {!recommendation && !loading ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white/40 border-2 border-dashed border-brand-200 rounded-[40px]"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center text-brand-300 mb-6">
                    <Search size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-800 mb-2">Ready to Analyze</h3>
                  <p className="text-brand-500 max-w-md">
                    Fill in your soil and environmental data on the left to receive personalized crop recommendations.
                  </p>
                </motion.div>
              ) : loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-accent-100 border-t-accent-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-accent-500">
                      <Sprout size={32} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-800 mt-8 mb-2">Analyzing Data...</h3>
                  <p className="text-brand-500">Our AI agronomist is calculating the best options for your land.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-brand-900">Recommended Crops</h2>
                      <p className="text-brand-500">Based on your specific field conditions</p>
                    </div>
                    <button 
                      onClick={resetForm}
                      className="p-3 rounded-2xl bg-white border border-brand-200 text-brand-500 hover:text-accent-600 hover:border-accent-200 transition-all shadow-sm"
                      title="Reset Analysis"
                    >
                      <RefreshCw size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendation.recommendations.map((crop, index) => (
                      <CropCard key={crop.cropName} crop={crop} index={index} />
                    ))}
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-accent-50 border border-accent-100 rounded-3xl p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-accent-500 flex items-center justify-center text-white shrink-0">
                        <Info size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-accent-900 mb-2">Agronomist's Advice</h3>
                        <p className="text-accent-800/80 leading-relaxed italic">
                          "{recommendation.generalAdvice}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-brand-200 pt-12 text-center">
        <div className="flex items-center justify-center gap-2 text-brand-300 font-bold uppercase tracking-widest text-[10px] mb-4">
          <Leaf size={12} />
          AgroSuggest v1.0
        </div>
        <p className="text-brand-400 text-xs">
          Powered by Gemini AI • Helping farmers grow smarter
        </p>
      </footer>
    </div>
  );
}
