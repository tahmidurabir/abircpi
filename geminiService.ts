import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTerminalResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are an AI personality living inside an interactive portfolio terminal. 
      The user is interacting with you. Be witty, concise, and helpful. 
      If they ask about projects, skills, or experience, use the context of a world-class engineer.`,
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text || "Command processed, but I have no words.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The terminal encountered a glitch in the Matrix. (API Error)";
  }
};