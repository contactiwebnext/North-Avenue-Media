import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Editorial Knowledge Base Context for North Avenue Media
const SYSTEM_INSTRUCTION = `You are the AI Editorial Intelligence Concierge for "North Avenue Media" — the premier global media house and voice driving beauty's next era in media, global events, industry insights, and innovation.

Brand Positioning & Values:
- Core Mission: "The voice driving beauty’s next era in media, global events, industry insights, and innovation."
- Pillars: Luxury Beauty & Fashion Media, Global Events (Paris, Milan, New York, Tokyo, Seoul, Dubai, London), Industry Insights & Market Intelligence, Future Innovation (Biotech, Neuro-Cosmetics, Spatial Beauty, AI Formulations), Thought Leadership & Culture.
- Tone: Sophisticated, visionary, culturally intelligent, concise, articulate, and luxurious.
- Contact Details:
  - Phone: +1 202-876-8594
  - Email: thenorthavenuemedia@gmail.com
  - Inquiries: Partnerships, Media Accreditation, Events, Advertising, Editorial Pitches, and General Inquiries.
- Key Global Summits: Paris Beauty Tech Summit, Milan Luxury Fragrance Conclave, New York Fashion & Beauty Intelligence Week, Seoul K-Beauty Future Lab, Tokyo Bio-Aesthetics Expo, Dubai Global Luxe Conclave.

When assisting visitors:
1. Provide thoughtful, authoritative answers about beauty macro-trends, global luxury market forecasts, editorial stories, event schedules, and submission guidelines.
2. If asked how to contact North Avenue Media, provide the email (thenorthavenuemedia@gmail.com) and phone (+1 202-876-8594).
3. Offer relevant follow-up questions or suggestions regarding beauty media, brand partnerships, or intelligence reports.
4. Keep answers elegant, concise, and structured with clean markdown.`;

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), platform: "North Avenue Media" });
});

// Chat Endpoint with Gemini Integration
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback graceful response when API key is not yet set in environment
      return res.json({
        reply: `Thank you for consulting **North Avenue Media Intelligence**.\n\nRegarding *"${message.slice(0, 80)}"*: North Avenue Media leads global discourse across biotech formulations, luxury consumer dynamics, and fashion-beauty convergence.\n\nFor direct editorial pitches, executive market intelligence briefings, or partnership inquiries, contact our bureau at **thenorthavenuemedia@gmail.com** or call **+1 202-876-8594**.`,
        grounded: false,
      });
    }

    // Format conversation history for context
    const conversationPrompt = history.length > 0
      ? `Previous conversation:\n${history.map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n')}\n\nCurrent User Question: ${message}`
      : message;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: conversationPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Thank you for contacting North Avenue Media. Please reach out to thenorthavenuemedia@gmail.com for specialized inquiries.";

    res.json({ reply, success: true });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Unable to process request with AI intelligence",
      details: error?.message || "Internal server error",
      fallbackReply: "Our intelligence bureau is currently updating real-time market models. Please reach out directly to thenorthavenuemedia@gmail.com or call +1 202-876-8594.",
    });
  }
});

// Newsletter & Contact Inquiries Mock/Persistence API
app.post("/api/inquire", (req, res) => {
  const { name, email, category, message, company } = req.body;
  console.log(`[Inquiry Received] ${category} from ${name} (${email}, ${company}): ${message}`);
  res.json({
    success: true,
    message: "Thank you. Your inquiry has been routed to the respective North Avenue Media department. An editor or partnership director will respond within 24 hours.",
    referenceId: `NAM-${Date.now().toString(36).toUpperCase()}`
  });
});

app.post("/api/subscribe", (req, res) => {
  const { email, frequency = "daily" } = req.body;
  console.log(`[Subscription Received] ${email} (${frequency})`);
  res.json({
    success: true,
    message: "Welcome to The North Avenue Dispatch. Your weekly executive briefing has been confirmed.",
    email
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`North Avenue Media server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
