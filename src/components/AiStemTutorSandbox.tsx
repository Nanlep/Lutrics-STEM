import React, { useState } from 'react';
import { Bot, Sparkles, Send, RefreshCw, Cpu, BookOpen, Code2, AlertCircle } from 'lucide-react';

export const AiStemTutorSandbox: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'CONCEPT_EXPLAINER' | 'LESSON_PLAN' | 'KIDS_CODE'>('CONCEPT_EXPLAINER');
  const [gradeLevel, setGradeLevel] = useState<'Nursery' | 'Primary (1-6)' | 'JSS (1-3)' | 'SSS (1-3)'>('JSS (1-3)');
  const [loading, setLoading] = useState(false);
  const [responseHtml, setResponseHtml] = useState<string | null>(null);

  const samplePrompts = {
    CONCEPT_EXPLAINER: [
      'Explain how solar panels convert sunlight into electricity using water analogy.',
      'How do satellites work in space for weather forecasting in West Africa?',
      'What is an open-source AI Large Language Model?'
    ],
    LESSON_PLAN: [
      '45-minute hands-on lab on building a solar rover using local recycled materials.',
      'Interactive 3D geometry lesson projecting shapes onto the classroom wall.',
      'Junior Secondary (JSS 2) lesson plan introducing variables and loops in Python.'
    ],
    KIDS_CODE: [
      'Write a Python game where a robot guesses a secret number between 1 and 100.',
      'Block code logic to control a mini DC motor using a moisture sensor.',
      'Python script to simulate planetary orbits around the sun.'
    ]
  };

  const handleGenerate = async (queryText?: string) => {
    const textToSubmit = queryText || prompt;
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setResponseHtml(null);

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSubmit,
          mode,
          gradeLevel,
        }),
      });

      const data = await res.json();
      if (data.success && data.htmlContent) {
        setResponseHtml(data.htmlContent);
      } else {
        setResponseHtml(`<div class="p-4 bg-rose-950 text-rose-200 text-xs rounded-xl">Error: ${data.message || 'Unable to generate output.'}</div>`);
      }
    } catch (err: any) {
      setResponseHtml(`<div class="p-4 bg-rose-950 text-rose-200 text-xs rounded-xl">Network Error: ${err.message}</div>`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-sandbox-section" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-teal-500/20 text-teal-300 text-xs px-3 py-1 rounded-full font-bold border border-teal-500/30">
            Interactive On-Device Simulation
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Lutrics AI STEM Tutor Sandbox
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Test the onboard neural AI assistant embedded inside every Lutrics Stem Box hardware unit. Generates instant localized lesson plans and coding scripts.
          </p>
        </div>

        {/* Sandbox Console Container */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          
          {/* Mode & Target Grade Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-800 pb-4">
            
            {/* Mode Tabs */}
            <div className="md:col-span-8 flex flex-wrap gap-2 text-xs">
              {[
                { id: 'CONCEPT_EXPLAINER', label: 'Concept Explainer', icon: Bot },
                { id: 'LESSON_PLAN', label: 'Lesson Plan Generator', icon: BookOpen },
                { id: 'KIDS_CODE', label: 'Robotics & Python Code', icon: Code2 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = mode === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setMode(tab.id as any)}
                    className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Target Grade Selector */}
            <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-1.5 flex-wrap text-xs">
              <span className="text-slate-400 font-medium mr-1">Target Grade:</span>
              {(['Nursery', 'Primary (1-6)', 'JSS (1-3)', 'SSS (1-3)'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGradeLevel(g)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition cursor-pointer ${
                    gradeLevel === g
                      ? 'bg-teal-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

          </div>

          {/* Prompt Presets */}
          <div className="space-y-2">
            <span className="text-[11px] text-slate-400 font-medium">Sample Prompts for Classroom Testing:</span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts[mode].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(sample);
                    handleGenerate(sample);
                  }}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-teal-300 border border-slate-800 rounded-xl text-xs text-left transition cursor-pointer"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleGenerate();
              }}
              placeholder={`Ask Lutrics Stem Box AI (${mode.replace('_', ' ')})...`}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />

            <button
              onClick={() => handleGenerate()}
              disabled={loading || !prompt.trim()}
              className="px-6 py-3 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:from-teal-300 hover:to-emerald-300 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <>
                  <Send className="w-4 h-4 fill-slate-950" />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>

          {/* Response Output Box */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 min-h-[180px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3 text-slate-400 text-xs">
                <RefreshCw className="w-6 h-6 text-teal-400 animate-spin" />
                <p>Querying Lutrics Stem Box Neural AI Model [Offline Engine]...</p>
              </div>
            ) : responseHtml ? (
              <div
                className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200"
                dangerouslySetInnerHTML={{ __html: responseHtml }}
              />
            ) : (
              <div className="text-center py-10 space-y-2 text-slate-500 text-xs">
                <Bot className="w-8 h-8 text-slate-700 mx-auto" />
                <p>Type a prompt above or select a preset sample to test the AI Tutor engine output.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
