import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { INITIAL_SCHOOLS, INITIAL_STEM_UNITS, STEM_CURRICULA, INITIAL_DONORS } from './src/data/initialData.js';
import { SchoolRegistration, StemBoxUnit, DonorPledge } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for registered schools & hardware units
  let schoolsStore: SchoolRegistration[] = [...INITIAL_SCHOOLS];
  let stemUnitsStore: StemBoxUnit[] = [...INITIAL_STEM_UNITS];
  let donorsStore: DonorPledge[] = [...INITIAL_DONORS];

  // Helper to initialize Gemini API client lazily
  function getGenAiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({ apiKey });
  }

  // REST API Endpoints

  // 1. Get all registered schools
  app.get('/api/schools', (_req, res) => {
    res.json({ success: true, schools: schoolsStore });
  });

  // 2. Register new school (Page 1 + Page 2 + Page 3 details)
  app.post('/api/schools/register', (req, res) => {
    try {
      const data = req.body;

      if (!data.name || !data.contactEmail || !data.stateProvince) {
        return res.status(400).json({
          success: false,
          message: 'Missing required school information (School Name, State/Region, or Contact Email).',
        });
      }

      const countryCode = data.country === 'Ghana' ? 'GHA' : data.country === 'Kenya' ? 'KEN' : 'NGA';
      const randNum = Math.floor(100 + Math.random() * 900);
      const registrationNo = `LUT-2026-${countryCode}-${randNum}`;

      const newSchool: SchoolRegistration = {
        id: `sch-${Date.now()}`,
        registrationNo,
        name: data.name,
        schoolType: data.schoolType || 'PUBLIC',
        schoolCategory: data.schoolCategory || (data.schoolType === 'PUBLIC' ? 'Public / Government School' : 'Private Mission / Faith-Based'),
        moeRegistrationNo: data.moeRegistrationNo || '',
        country: data.country || 'Nigeria',
        stateProvince: data.stateProvince || '',
        lgaDistrict: data.lgaDistrict || '',
        city: data.city || '',
        schoolAddress: data.schoolAddress || '',
        contactPerson: data.contactPerson || data.adminName || 'School Representative',
        contactRole: data.contactRole || data.adminRole || 'School Principal',
        contactEmail: data.contactEmail || data.adminEmail || '',
        contactPhone: data.contactPhone || data.adminPhone || '',
        secondaryContact: data.secondaryContact || (data.stemCoordinatorName ? `${data.stemCoordinatorName} (${data.stemCoordinatorTitle || 'STEM Lead'}) - ${data.stemCoordinatorPhone || ''}` : ''),
        adminName: data.adminName || data.contactPerson || '',
        adminRole: data.adminRole || data.contactRole || 'School Principal / Headmaster',
        adminEmail: data.adminEmail || data.contactEmail || '',
        adminPhone: data.adminPhone || data.contactPhone || '',
        stemCoordinatorName: data.stemCoordinatorName || '',
        stemCoordinatorTitle: data.stemCoordinatorTitle || 'Head of STEM & Robotics',
        stemCoordinatorEmail: data.stemCoordinatorEmail || '',
        stemCoordinatorPhone: data.stemCoordinatorPhone || '',
        studentCount: Number(data.studentCount) || 500,
        targetGrades: data.targetGrades || ['Junior Secondary (JSS 1-3)'],
        internetType: data.internetType || 'Starlink / Satellite',
        requestedUnits: Number(data.requestedUnits) || 3,
        grantRequested: Boolean(data.grantRequested),
        notes: data.notes || '',
        status: 'PENDING_REVIEW',
        createdAt: new Date().toISOString(),
      };

      schoolsStore.unshift(newSchool);

      // Provision a simulated pending hardware box dispatch
      const newBox: StemBoxUnit = {
        id: `box-${Date.now()}`,
        serialNo: `LUT-SBX-${Math.floor(1000 + Math.random() * 9000)}`,
        schoolId: newSchool.id,
        schoolName: newSchool.name,
        status: 'DEPLOYING',
        batteryLevel: 100,
        solarCharging: true,
        activeLlmModel: 'Lutrics Llama-3-8B Kids Edition (Pre-Loading)',
        installedModules: 12,
        studentsReached: 0,
        lastPing: 'Pending Dispatch & Delivery',
      };
      stemUnitsStore.unshift(newBox);

      return res.json({
        success: true,
        message: 'School registration submitted successfully!',
        school: newSchool,
      });
    } catch (err: any) {
      console.error('Registration error:', err);
      return res.status(500).json({ success: false, message: 'Failed to process school registration.' });
    }
  });

  // 3. Get all Stem Box hardware units
  app.get('/api/stem-boxes', (_req, res) => {
    res.json({ success: true, units: stemUnitsStore });
  });

  // 3.1 Get all donor pledges & impact summary
  app.get('/api/donations', (_req, res) => {
    const totalRaised = donorsStore.reduce((acc, curr) => acc + (curr.amountPledged || 0), 0);
    const totalDonors = donorsStore.length;
    res.json({
      success: true,
      stats: {
        totalRaisedUsd: totalRaised,
        totalDonorsCount: totalDonors,
        schoolsFundedCount: Math.floor(totalRaised / 1200) + 4,
        studentsImpacted: (Math.floor(totalRaised / 1200) + 4) * 650,
      },
      donors: donorsStore,
    });
  });

  // 3.2 Submit a new donor pledge or sponsorship
  app.post('/api/donations/pledge', (req, res) => {
    try {
      const data = req.body;
      if (!data.donorName || !data.email || !data.amountPledged) {
        return res.status(400).json({
          success: false,
          message: 'Missing required donor details (Donor/Organization Name, Email, or Pledge Amount).',
        });
      }

      const newPledge: DonorPledge = {
        id: `pledge-${Date.now()}`,
        donorType: data.donorType || 'INDIVIDUAL',
        donorName: data.isAnonymous ? 'Anonymous STEM Patron' : data.donorName,
        contactPerson: data.contactPerson || data.donorName,
        email: data.email,
        phone: data.phone || '',
        country: data.country || 'Global Patron',
        sponsorshipTier: data.sponsorshipTier || 'ADOPT_A_SCHOOL',
        amountPledged: Number(data.amountPledged) || 1200,
        pledgeType: data.pledgeType || 'ONE_TIME',
        targetSchoolPreference: data.targetSchoolPreference || 'Highest Priority Rural School',
        message: data.message || '',
        isAnonymous: Boolean(data.isAnonymous),
        status: 'PLEDGED',
        createdAt: new Date().toISOString(),
      };

      donorsStore.unshift(newPledge);

      return res.json({
        success: true,
        message: 'Thank you for your generous pledge! Our Foundation Grants Secretariat will reach out with payment instructions and tax receipt details.',
        pledge: newPledge,
      });
    } catch (err: any) {
      console.error('Pledge error:', err);
      return res.status(500).json({ success: false, message: 'Failed to process donor pledge.' });
    }
  });

  // 4. AI STEM Tutor / Sandbox Endpoint powered by Gemini API
  app.post('/api/ai/tutor', async (req, res) => {
    try {
      const { prompt, mode, gradeLevel } = req.body;

      if (!prompt) {
        return res.status(400).json({ success: false, message: 'Prompt parameter is required.' });
      }

      const ai = getGenAiClient();
      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not set yet
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
                <p className="font-bold text-emerald-400">1. Core Concept Overview</p>
                <p>When studying ${prompt}, students construct tangible mental models using hands-on physical kits and offline 3D projected holograms.</p>
                <p className="font-bold text-teal-400 mt-3">2. Interactive Activity</p>
                <p>Divide the class into teams of 4 students. Connect the USB sensors to the Lutrics Stem Box and log real-time telemetry.</p>
              </div>
              <div class="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-[11px] text-amber-300">
                💡 Note: Provide GEMINI_API_KEY in Environment Settings for live server-side AI generation.
              </div>
            </div>
          `,
        });
      }

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
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lutrics Stem Club Server listening on http://localhost:${PORT}`);
  });
}

startServer();
