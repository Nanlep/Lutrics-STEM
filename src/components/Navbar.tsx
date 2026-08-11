import React from 'react';
import { Cpu, School, BookOpen, Bot, HelpCircle, PlusCircle, Sparkles, Heart } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onOpenRegisterModal: () => void;
  onOpenDonorModal: () => void;
  schoolCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  onOpenRegisterModal,
  onOpenDonorModal,
  schoolCount,
}) => {
  const navItems = [
    { id: 'HARDWARE', label: 'Stem Box Specs', icon: Cpu },
    { id: 'PORTAL', label: `Schools Portal (${schoolCount})`, icon: School },
    { id: 'CURRICULUM', label: 'STEM Curriculum', icon: BookOpen },
    { id: 'AI_SANDBOX', label: 'AI Tutor Engine', icon: Bot },
    { id: 'DONORS', label: 'Donors & Sponsors', icon: Heart },
    { id: 'FAQ', label: 'FAQs', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top NetAccess Announcement Bar */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 px-4 py-1.5 text-center text-[11px] text-teal-200 border-b border-teal-800/40 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-bold bg-teal-500/20 px-2 py-0.5 rounded text-teal-300 border border-teal-500/30">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          2026/2027 Academic Year
        </span>
        <span className="hidden sm:inline">
          NetAccess Foundation Subsidized Hardware Grants are now open for Public & Private Schools in West Africa.
        </span>
        <button
          onClick={onOpenRegisterModal}
          className="underline font-extrabold hover:text-white cursor-pointer ml-1"
        >
          Apply Now &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActiveSection('HERO')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-emerald-500 to-cyan-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-teal-500/20 group-hover:scale-105 transition">
            <Cpu className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white font-display">
                LUTRICS<span className="text-teal-400">.</span>STEM
              </span>
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 bg-slate-800 text-teal-300 rounded font-bold border border-slate-700">
                CLUB
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide">
              Powered by NetAccess Foundation
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDonorModal}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-teal-300 hover:text-white border border-teal-800/80 hover:border-teal-600 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
            <span className="hidden sm:inline">Sponsor / Donate</span>
            <span className="sm:hidden">Donate</span>
          </button>

          <button
            onClick={onOpenRegisterModal}
            className="px-4 py-2 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/20 transition flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 fill-slate-950 stroke-teal-400" />
            <span>Register School</span>
          </button>
        </div>
      </div>
    </header>
  );
};
