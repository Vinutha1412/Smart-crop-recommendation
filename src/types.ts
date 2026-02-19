export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  temperature: number;
  humidity: number;
  rainfall: number;
}

export interface CropRecommendation {
  cropName: string;
  confidence: number;
  description: string;
  growingTips: string[];
  optimalConditions: {
    soil: string;
    climate: string;
  };
  marketValue: "Low" | "Medium" | "High";
  imageUrl: string;
}

export interface RecommendationResponse {
  recommendations: CropRecommendation[];
  generalAdvice: string;
}
