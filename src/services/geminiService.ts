import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

// VITE USES import.meta.env FOR ENV VARS
const apiKey = import.meta.env.VITE_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const initializeChat = async () => {
  if (!ai) {
    console.warn("Gemini API Key is missing. AI Chat will not function.");
    return null;
  }

  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Attempt lazy initialization
    const session = await initializeChat();
    if (!session) {
      return "CONNECTION ERROR: API KEY MISSING. OFFLINE MODE ACTIVE.";
    }
  }

  try {
    if (!chatSession) throw new Error("Chat session not initialized");
    
    const response = await chatSession.sendMessage({ message });
    return response.text || "DATA CORRUPTION DETECTED. PLEASE RETRY.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "SYSTEM OVERLOAD. REBOOTING NEURAL PATHWAYS... TRY AGAIN.";
  }
};