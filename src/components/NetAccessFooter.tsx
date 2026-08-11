import React from 'react';
import { Cpu, Heart, Globe, Mail, Phone, PlusCircle, Sparkles } from 'lucide-react';

interface NetAccessFooterProps {
  onOpenRegisterModal: () => void;
  onOpenDonorModal: () => void;
  setActiveSection: (sec: string) => void;
}

export const NetAccessFooter: React.FC<NetAccessFooterProps> = ({
  onOpenRegisterModal,
  onOpenDonorModal,
  setActiveSection,
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-slate-950 font-black">
                <Cpu className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-black tracking-tight text-white font-display">
                LUTRICS<span className="text-teal-400">.</span>STEM CLUB
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Lutrics Stem Club is a digital education initiative powered by NetAccess Foundation. We deploy solar-capable Stem Box laser projectors with embedded offline AI language models to transform schools across West Africa and underserved regions.
            </p>

            <div className="flex items-center gap-4 text-slate-300 font-mono text-[11px]">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                NetAccess Foundation
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                stem@lutrics.org
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Platform Links</p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('HARDWARE')}
                  className="hover:text-teal-300 transition cursor-pointer"
                >
                  Stem Box Specs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('PORTAL')}
                  className="hover:text-teal-300 transition cursor-pointer"
                >
                  Schools Directory Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('CURRICULUM')}
                  className="hover:text-teal-300 transition cursor-pointer"
                >
                  Interactive Curriculum
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('AI_SANDBOX')}
                  className="hover:text-teal-300 transition cursor-pointer"
                >
                  AI STEM Tutor Sandbox
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('DONORS')}
                  className="hover:text-teal-300 transition cursor-pointer flex items-center gap-1 text-teal-400 font-semibold"
                >
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400/30" />
                  Donors & Sponsors Wall
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('FAQ')}
                  className="hover:text-teal-300 transition cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Adoption & Sponsorship Callout */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <p className="font-bold text-white text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Enroll or Sponsor a School
            </p>
            <p className="text-[11px] text-slate-400">
              Apply for hardware grants or sponsor a rural school with off-grid AI hardware and solar units.
            </p>
            <div className="space-y-2">
              <button
                onClick={onOpenRegisterModal}
                className="w-full py-2 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl hover:from-teal-300 hover:to-emerald-300 transition cursor-pointer"
              >
                Register School Now
              </button>
              <button
                onClick={onOpenDonorModal}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-700/60 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
                Sponsor a School / Donate
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Lutrics STEM Club & NetAccess Foundation. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for STEM Classrooms.
          </p>
        </div>

      </div>
    </footer>
  );
};
