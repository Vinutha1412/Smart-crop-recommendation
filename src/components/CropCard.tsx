import React from 'react';
import { motion } from 'motion/react';
import { CropRecommendation } from '../types';
import { CheckCircle2, Sprout, Thermometer, Droplets, CloudRain, TrendingUp } from 'lucide-react';

interface CropCardProps {
  crop: CropRecommendation;
  index: number;
}

export const CropCard: React.FC<CropCardProps> = ({ crop, index }) => {
  const marketColor = {
    Low: 'bg-slate-100 text-slate-700',
    Medium: 'bg-blue-100 text-blue-700',
    High: 'bg-emerald-100 text-emerald-700',
  }[crop.marketValue];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-brand-200 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={crop.imageUrl}
          alt={crop.cropName}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tight ${marketColor}`}>
            {crop.marketValue} Market Value
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h3 className="text-2xl font-bold text-white">{crop.cropName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1.5 w-24 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-400" 
                style={{ width: `${crop.confidence * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium text-white/90">
              {Math.round(crop.confidence * 100)}% Match
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-brand-600 text-sm leading-relaxed mb-6">
          {crop.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-brand-50 p-3 rounded-2xl border border-brand-100">
            <span className="text-[10px] font-bold uppercase text-brand-400 block mb-1">Soil Type</span>
            <span className="text-xs font-semibold text-brand-800">{crop.optimalConditions.soil}</span>
          </div>
          <div className="bg-brand-50 p-3 rounded-2xl border border-brand-100">
            <span className="text-[10px] font-bold uppercase text-brand-400 block mb-1">Climate</span>
            <span className="text-xs font-semibold text-brand-800">{crop.optimalConditions.climate}</span>
          </div>
        </div>

        <div className="space-y-3 mt-auto">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-400 flex items-center gap-2">
            <Sprout size={14} className="text-accent-500" />
            Growing Tips
          </h4>
          <ul className="space-y-2">
            {crop.growingTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-brand-700">
                <CheckCircle2 size={14} className="text-accent-500 mt-0.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
