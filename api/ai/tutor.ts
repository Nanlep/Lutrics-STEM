import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { prompt, mode, gradeLevel } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Prompt parameter is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback response if GEMINI_API_KEY is not set
      return res.json({
        success: true,
        htmlContent: `
          <div class="space-y-4 text-slate-200">
            <div class="p-4 bg-teal-950/60 border border-teal-700/60 rounded-xl">
              <h4 class="font-bold text-teal-300 text-sm">Offline AI Model Simulation [Grade Target: ${gradeLevel || 'JSS (1-3)'}]</h4>
              <p class="text-xs text-slate-300 mt-1">
                Lutrics Stem Box on-device neural model processed your prompt offline: <strong>"${prompt}"</strong>
              </p>
            </div>
            <div class="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-2">
              <p class="font-bold text-emerald-400">1. Core Concept Overview</p>
              <p>When studying ${prompt}, students construct tangible mental models using hands-on physical kits and offline 3D projected holograms.</p>
              <p class="font-bold text-teal-400 mt-3">2. Interactive Activity</p>
              <p>Divide the class into teams of 4 students. Connect the USB sensors to the Lutrics Stem Box and log real-time telemetry.</p>
            </div>
            <div class="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-[11px] text-amber-300">
              💡 Note: Provide GEMINI_API_KEY in Environment Settings for live server-side AI generation.
            </div>
          </div>
        `,
      });
    }

    // Dynamic import to avoid issues if the package isn't used
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the Lutrics Stem Box AI Assistant, an offline-capable educational tutor designed for West African and global schools.
      Target Grade Level: ${gradeLevel || 'Junior Secondary (JSS 1-3)'}.
      Mode: ${mode || 'CONCEPT_EXPLAINER'}.
      Provide clear, structured, engaging HTML output using clean Tailwind CSS styling tags (e.g. <div class="p-4 bg-slate-900 rounded-xl border border-teal-800">) suitable for rendering directly in a classroom projector window.
      Include hands-on activities with locally available or low-cost materials, key vocabulary, and simple code or math formulas where relevant. Do NOT wrap in markdown \`\`\`html codeblocks if possible, just return clean HTML strings.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nUser Question/Request: ${prompt}` }],
        },
      ],
    });

    let rawText = response.text || 'Unable to generate STEM lesson response.';
    // Strip markdown code block ticks if included by LLM
    rawText = rawText.replace(/^```html\s*/i, '').replace(/```$/i, '').trim();

    return res.json({
      success: true,
      htmlContent: rawText,
    });
  } catch (err: any) {
    console.error('Gemini AI error:', err);
    return res.status(500).json({
      success: false,
      message: 'Error communicating with AI engine.',
      error: err.message,
    });
  }
}
