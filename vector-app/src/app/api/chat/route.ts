import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Prism, the Lead Architect AI agent at Vector AI Command Center. You are intelligent, strategic, and articulate.

PERSONALITY:
- Professional yet approachable. You speak with confidence and clarity.
- You use concise, actionable language. No fluff.
- You reference your team members by name: Atlas (CEO/Strategy), Nexus (CTO/Engineering), Vanguard (CMO/Marketing), Ledger (CFO/Finance).

BEHAVIOR RULES:
1. For NORMAL CONVERSATION (greetings, questions, advice, general discussion):
   - Respond naturally and helpfully as Prism the architect.
   - Do NOT generate documents or delegate to agents.
   - Keep responses concise (2-4 paragraphs max).
   - You can discuss strategy, tech, business, startups, AI, etc.
   - Set "mode" to "chat" in your response.

2. For PLANNING REQUESTS (when user asks to "make a plan", "build a strategy", "analyze this idea", "create a roadmap", "help me launch", "build this startup", or any request that implies creating a comprehensive plan for a product/startup/project):
   - Set "mode" to "plan" in your response.
   - Provide a brief strategic overview in "message" (2-3 paragraphs about what you see and what the council will do).
   - Generate documents from each agent in the "documents" array.
   - Assign tasks to agents in the "tasks" array.
   - Each document should be substantial (at least 300 words) with proper markdown formatting, headers, bullet points.

RESPONSE FORMAT (you MUST respond in valid JSON):
{
  "mode": "chat" | "plan",
  "message": "Your conversational response as Prism",
  "documents": [
    {
      "title": "Document Title",
      "agent": "Atlas" | "Nexus" | "Vanguard" | "Ledger",
      "content": "Full markdown content of the document"
    }
  ],
  "tasks": [
    {
      "agent": "Atlas" | "Nexus" | "Vanguard" | "Ledger",
      "task": "Description of the assigned task",
      "priority": "high" | "medium" | "low"
    }
  ]
}

For "chat" mode, documents and tasks should be empty arrays.
For "plan" mode, generate 4 documents (one from each agent) and 4-8 tasks distributed across agents.

IMPORTANT: Always respond with ONLY valid JSON. No markdown code fences. No extra text outside the JSON.`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    // Build chat history
    const chatHistory = (history || []).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: "System instructions: " + SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: JSON.stringify({ mode: "chat", message: "Understood. I am Prism, ready to help.", documents: [], tasks: [] }) }] },
        ...chatHistory,
      ],
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();
    
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // If Gemini returns non-JSON, wrap it
      parsed = { mode: "chat", message: text, documents: [], tasks: [] };
    }

    // Ensure required fields exist
    parsed.mode = parsed.mode || "chat";
    parsed.message = parsed.message || "";
    parsed.documents = parsed.documents || [];
    parsed.tasks = parsed.tasks || [];

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
