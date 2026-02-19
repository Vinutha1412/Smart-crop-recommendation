import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, RecommendationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getCropRecommendations(data: SoilData): Promise<RecommendationResponse> {
  const prompt = `
    As an expert agronomist, recommend the best crops to plant based on the following soil and environmental data:
    - Nitrogen (N): ${data.nitrogen} mg/kg
    - Phosphorus (P): ${data.phosphorus} mg/kg
    - Potassium (K): ${data.potassium} mg/kg
    - pH Level: ${data.ph}
    - Temperature: ${data.temperature}°C
    - Humidity: ${data.humidity}%
    - Rainfall: ${data.rainfall} mm

    Provide a list of the top 3 recommended crops. For each crop, include:
    1. Crop Name
    2. Confidence score (0-1)
    3. Brief description
    4. 3-4 specific growing tips
    5. Optimal soil and climate conditions
    6. Market value (Low, Medium, High)
    7. A generic search term for a high-quality image of this crop.

    Also provide a general piece of advice for the farmer based on these specific conditions.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                cropName: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                description: { type: Type.STRING },
                growingTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                optimalConditions: {
                  type: Type.OBJECT,
                  properties: {
                    soil: { type: Type.STRING },
                    climate: { type: Type.STRING }
                  },
                  required: ["soil", "climate"]
                },
                marketValue: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
                imageUrl: { type: Type.STRING, description: "A keyword for the crop image" }
              },
              required: ["cropName", "confidence", "description", "growingTips", "optimalConditions", "marketValue", "imageUrl"]
            }
          },
          generalAdvice: { type: Type.STRING }
        },
        required: ["recommendations", "generalAdvice"]
      }
    }
  });

  const result = JSON.parse(response.text || "{}");
  
  // Enhance imageUrl with a real placeholder URL
  if (result.recommendations) {
    result.recommendations = result.recommendations.map((crop: any) => ({
      ...crop,
      imageUrl: `https://picsum.photos/seed/${crop.cropName.toLowerCase().replace(/\s+/g, '-')}/800/600`
    }));
  }

  return result as RecommendationResponse;
}
