import React from 'react';
import { Cpu, School, Sparkles, CheckCircle2, ShieldCheck, Zap, Globe, ArrowRight, Heart } from 'lucide-react';

interface HeroBannerProps {
  onOpenRegisterModal: () => void;
  onOpenDonorModal: () => void;
  onExploreHardware: () => void;
  schoolCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenRegisterModal,
  onOpenDonorModal,
  onExploreHardware,
  schoolCount,
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-10 pb-16 border-b border-slate-800">
      {/* Background glow graphics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-teal-500/10 via-emerald-500/15 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-teal-500/30 px-3.5 py-1.5 rounded-full shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-teal-300">
              NetAccess Foundation STEM Adoption Initiative
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-300 font-medium">Off-Grid Classrooms</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-display">
            Bringing <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">Offline AI Supercomputers</span> & 4K Laser Projection to Schools
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            Lutrics Stem Box combines an on-device open-source neural AI engine (Llama & Gemma), high-lumens ultra-short-throw laser projector, and solar battery unit. Designed for West African and global schools without internet dependencies.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenRegisterModal}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <School className="w-5 h-5 stroke-[2.5]" />
              <span>Register Your School (3-Page Form)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>

            <button
              onClick={onOpenDonorModal}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-600/60 font-bold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Heart className="w-4.5 h-4.5 text-rose-400 fill-rose-400/30" />
              <span>Sponsor a School / CSR Grant</span>
            </button>

            <button
              onClick={onExploreHardware}
              className="w-full sm:w-auto px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-teal-400" />
              <span>Inspect Specs</span>
            </button>
          </div>

          {/* Feature Highlights Grid */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
              <Zap className="w-5 h-5 text-teal-400 mb-1" />
              <p className="text-xs font-bold text-white">100% Offline AI</p>
              <p className="text-[11px] text-slate-400">Onboard neural NPU runs Llama & Gemma models locally.</p>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
              <Globe className="w-5 h-5 text-emerald-400 mb-1" />
              <p className="text-xs font-bold text-white">4K Laser UST</p>
              <p className="text-[11px] text-slate-400">Projects 120-inch interactive display onto any wall.</p>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mb-1" />
              <p className="text-xs font-bold text-white">Solar Powered</p>
              <p className="text-[11px] text-slate-400">Integrated battery & photovoltaic charge controller.</p>
            </div>

            <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
              <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
              <p className="text-xs font-bold text-white">NetAccess Grants</p>
              <p className="text-[11px] text-slate-400">Full and partial hardware sponsorship for schools.</p>
            </div>
          </div>

          {/* Trust Metrics */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span><strong className="text-white font-mono">{schoolCount + 24}</strong> Schools Onboarded</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-white font-mono">1,420+</strong> Stem Box Units Deployed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span><strong className="text-white font-mono">180,000+</strong> Students Reached</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
