
import { GoogleGenAI, Type } from "@google/genai";
import { SpecialistInfo, SearchResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SPECIALIST_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    specialist: {
      type: Type.OBJECT,
      properties: {
        specialistName: { type: Type.STRING },
        category: { type: Type.STRING },
        description: { type: Type.STRING },
        commonConditions: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        whenToSeeThem: { type: Type.STRING },
        urgencyWarning: { type: Type.STRING }
      },
      required: ["specialistName", "category", "description", "commonConditions", "whenToSeeThem"]
    },
    explanation: { type: Type.STRING }
  },
  required: ["specialist", "explanation"]
};

export const analyzeSymptoms = async (input: string): Promise<SearchResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following symptoms or medical inquiry and identify the most appropriate medical specialist. Provide a detailed explanation of why they are the right fit. Symptoms/Inquiry: "${input}"`,
    config: {
      systemInstruction: "You are an expert medical directory assistant. Your goal is to help users find the correct medical specialist based on their description of health issues. Provide professional, accurate (but non-diagnostic) information. Always include an urgency warning if symptoms sound life-threatening (e.g., chest pain, difficulty breathing).",
      responseMimeType: "application/json",
      responseSchema: SPECIALIST_SCHEMA
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text);
};
