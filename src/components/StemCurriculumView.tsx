import React, { useState } from 'react';
import { StemCurriculum } from '../types';
import { STEM_CURRICULA } from '../data/initialData';
import { BookOpen, Sparkles, CheckCircle2, Clock, Cpu, Award } from 'lucide-react';

export const StemCurriculumView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');

  const filteredCurricula = STEM_CURRICULA.filter((curr) => {
    if (selectedGrade === 'ALL') return true;
    return curr.gradeLevel.includes(selectedGrade) || curr.gradeLevel === 'All Grades';
  });

  return (
    <section id="curriculum-section" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-teal-500/20 text-teal-300 text-xs px-3 py-1 rounded-full font-bold border border-teal-500/30">
            Interactive Pedagogy
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Pre-Loaded Offline STEM Curricula
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Curated hands-on lesson plans aligned with West African (WAEC/NECO/NERDC) and international STEM guidelines for offline execution.
          </p>
        </div>

        {/* Grade Level Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 max-w-3xl mx-auto text-xs">
          {[
            { id: 'ALL', label: 'All Grade Levels' },
            { id: 'Nursery & Early Years', label: 'Nursery / Early Years' },
            { id: 'Primary School', label: 'Primary School (1-6)' },
            { id: 'Junior Secondary', label: 'Junior Secondary (JSS 1-3)' },
            { id: 'Senior Secondary', label: 'Senior Secondary (SSS 1-3)' },
          ].map((grade) => (
            <button
              key={grade.id}
              onClick={() => setSelectedGrade(grade.id)}
              className={`px-3.5 py-2 rounded-xl font-bold transition cursor-pointer ${
                selectedGrade === grade.id
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {grade.label}
            </button>
          ))}
        </div>

        {/* Curriculum Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCurricula.map((curr) => (
            <div
              key={curr.id}
              className="bg-slate-900 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-teal-500/10 text-teal-300 rounded border border-teal-500/20">
                    {curr.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono">
                    {curr.gradeLevel}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">
                  {curr.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {curr.description}
                </p>
              </div>

              <div className="space-y-3 border-t border-slate-800 pt-3 text-xs">
                <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    {curr.duration}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    {curr.modulesCount} Modules
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px]">
                  <span className="text-slate-400 block font-medium">Onboard AI Tool / Sensor:</span>
                  <strong className="text-teal-300 font-mono block mt-0.5">{curr.aiToolInvolved}</strong>
                </div>

                <div className="flex items-start gap-1.5 text-[11px] text-slate-300">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Outcome:</strong> {curr.learningOutcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
