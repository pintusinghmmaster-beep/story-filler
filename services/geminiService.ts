import { GoogleGenAI, Type } from "@google/genai";
import type { Scenario } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const scenarioSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "A short, catchy title for the scenario.",
      },
      description: {
        type: Type.STRING,
        description: "A detailed paragraph describing the scenario, including potential conflicts and stakes.",
      },
    },
    required: ["title", "description"],
  },
};

export const generateScenarios = async (
  genre: string,
  characters: string,
  premise: string
): Promise<Scenario[]> => {
  const prompt = `
    You are an expert creative writing assistant. Your task is to brainstorm compelling and original story scenarios for a writer.
    Based on the details provided below, generate 5 unique scenario ideas. Each idea should be distinct and offer a clear starting point for a story.

    **Genre:** ${genre || 'Any'}
    **Characters:** ${characters || 'Not specified'}
    **Core Premise/Keywords:** ${premise}

    Generate a diverse set of ideas that explore different angles of the premise. Think about potential twists, conflicts, and character motivations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: scenarioSchema,
        temperature: 0.8,
        topP: 0.95,
      },
    });
    
    const jsonText = response.text.trim();
    const scenarios: Scenario[] = JSON.parse(jsonText);
    return scenarios;

  } catch (error) {
    console.error("Error generating scenarios:", error);
    throw new Error("Failed to generate ideas from the AI. Please check your inputs and try again.");
  }
};
