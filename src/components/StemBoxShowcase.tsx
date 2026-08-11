import React from 'react';
import { StemBoxUnit } from '../types';
import { Cpu, BatteryCharging, Wifi, WifiOff, Sparkles, CheckCircle2, ShieldCheck, Zap, Server, Activity, MonitorPlay } from 'lucide-react';

interface StemBoxShowcaseProps {
  units: StemBoxUnit[];
  onOpenRegisterModal: () => void;
}

export const StemBoxShowcase: React.FC<StemBoxShowcaseProps> = ({
  units,
  onOpenRegisterModal,
}) => {
  return (
    <section id="hardware-section" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-teal-500/20 text-teal-300 text-xs px-3 py-1 rounded-full font-bold border border-teal-500/30">
            Hardware Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Lutrics Stem Box Supercomputer Specifications
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            All-in-one hardware unit engineered specifically for off-grid classrooms, high-humidity environments, and offline artificial intelligence workloads.
          </p>
        </div>

        {/* Hardware Visual Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: 4K UST Laser Projector */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 space-y-4 transition">
            <div className="w-12 h-12 bg-teal-500/20 border border-teal-500/40 rounded-xl flex items-center justify-center text-teal-400">
              <MonitorPlay className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">4K UST Laser Projector</h3>
              <p className="text-xs text-slate-400 mt-1">
                Ultra-short-throw 3,500 lumens laser engine projects a sharp 120-inch interactive display from just 15 cm distance from any classroom wall.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 font-mono border-t border-slate-800 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>3,500 ANSI Lumens Brightness</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Dust-proof sealed laser optics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>IR Touch Interactive Wall Sensor</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Neural NPU & Offline AI Engine */}
          <div className="bg-slate-900/80 border border-teal-500/40 rounded-2xl p-6 space-y-4 shadow-xl shadow-teal-500/5">
            <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center justify-center text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Neural NPU & Local LLMs</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                  100% Offline
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                32 TOPS Neural Processing Unit pre-loaded with Lutrics Llama-3-8B Kids Edition, Gemma 2B, and 3D Physics Simulation engines.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 font-mono border-t border-slate-800 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Llama-3-8B & Gemma 2B Models</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>1TB High-Speed NVMe Storage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>30 Local Wi-Fi Student Terminals</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Solar Battery & Rugged Chassis */}
          <div className="bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 space-y-4 transition">
            <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/40 rounded-xl flex items-center justify-center text-cyan-400">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Solar Battery & Power</h3>
              <p className="text-xs text-slate-400 mt-1">
                Integrated 480Wh LiFePO4 battery pack providing up to 8 hours of continuous teaching, with direct solar panel MPPT inputs.
              </p>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 font-mono border-t border-slate-800 pt-3">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>480Wh LiFePO4 Safe Battery</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct Photovoltaic MPPT Input</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Heavy-Duty Shockproof Casing</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Live Hardware Telemetry Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                Active Deployed Stem Box Hardware Units
              </h3>
              <p className="text-xs text-slate-400">
                Real-time ping telemetry and offline operation status across registered West African schools.
              </p>
            </div>
            <button
              onClick={onOpenRegisterModal}
              className="px-4 py-2 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/40 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              Request Unit for Your School &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-teal-400 font-bold">{unit.serialNo}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                      unit.status === 'ONLINE'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : unit.status === 'OFFLINE_STANDALONE'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {unit.status === 'ONLINE' ? (
                      <Wifi className="w-3 h-3" />
                    ) : (
                      <WifiOff className="w-3 h-3" />
                    )}
                    {unit.status}
                  </span>
                </div>

                <p className="font-bold text-white truncate">{unit.schoolName}</p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                  <div>
                    <span>Battery / Solar:</span>
                    <strong className="text-emerald-400 block font-mono">{unit.batteryLevel}% (Solar Active)</strong>
                  </div>
                  <div>
                    <span>Students Served:</span>
                    <strong className="text-white block font-mono">{unit.studentsReached}</strong>
                  </div>
                </div>

                <div className="pt-1 text-[10px] text-slate-400 font-mono truncate">
                  AI: <span className="text-slate-300">{unit.activeLlmModel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
