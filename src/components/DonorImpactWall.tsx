import React, { useState, useEffect } from 'react';
import {
  Heart,
  Award,
  Sparkles,
  Users,
  Building2,
  Globe,
  Sun,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Gift,
  ArrowRight
} from 'lucide-react';
import { DonorPledge, SchoolRegistration } from '../types';

interface DonorImpactWallProps {
  onOpenDonorModal: () => void;
  schoolsList: SchoolRegistration[];
}

export const DonorImpactWall: React.FC<DonorImpactWallProps> = ({
  onOpenDonorModal,
  schoolsList,
}) => {
  const [donors, setDonors] = useState<DonorPledge[]>([]);
  const [stats, setStats] = useState({
    totalRaisedUsd: 10700,
    totalDonorsCount: 3,
    schoolsFundedCount: 12,
    studentsImpacted: 7800,
  });
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const res = await fetch('/api/donations');
      const data = await res.json();
      if (data.success) {
        setDonors(data.donors || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error('Error fetching donations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <section id="donor-wall" className="py-12 bg-slate-900/60 border-y border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border border-teal-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-900/50 border border-teal-700/50 rounded-full text-xs font-semibold text-teal-300">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
              <span>NetAccess Foundation STEM Education Fund</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Sponsor Off-Grid Schools & Power the Future of STEM
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join philanthropists, corporate CSR initiatives, and alumni networks in providing offline AI supercomputers, solar storage, and laser projectors to underserved public schools across Africa.
            </p>
          </div>

          <div className="shrink-0 space-y-2 w-full sm:w-auto">
            <button
              onClick={onOpenDonorModal}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-teal-950/50 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <Gift className="w-4 h-4" />
              Sponsor a School / Donate Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-teal-300/80 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Tax-Deductible CSR & Foundation Grants
            </p>
          </div>
        </div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-teal-400">
              <DollarSign className="w-5 h-5" />
              <span className="text-[10px] font-mono uppercase text-slate-500">Funded</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              ${stats.totalRaisedUsd.toLocaleString()} <span className="text-xs text-slate-400 font-sans">USD</span>
            </div>
            <p className="text-[11px] text-slate-400">Total Philanthropic Grants Pledged</p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-emerald-400">
              <Building2 className="w-5 h-5" />
              <span className="text-[10px] font-mono uppercase text-slate-500">Reach</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {stats.schoolsFundedCount} <span className="text-xs text-slate-400 font-sans">Schools</span>
            </div>
            <p className="text-[11px] text-slate-400">Adopted Off-Grid Public Campuses</p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-amber-400">
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-mono uppercase text-slate-500">Impact</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {stats.studentsImpacted.toLocaleString()}+ <span className="text-xs text-slate-400 font-sans">Kids</span>
            </div>
            <p className="text-[11px] text-slate-400">Students Learning with On-Device AI</p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-cyan-400">
              <Globe className="w-5 h-5" />
              <span className="text-[10px] font-mono uppercase text-slate-500">Patrons</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono">
              {stats.totalDonorsCount} <span className="text-xs text-slate-400 font-sans">Pledges</span>
            </div>
            <p className="text-[11px] text-slate-400">Active Donors & CSR Partners</p>
          </div>
        </div>

        {/* Live Donor Wall / Recognition List */}
        <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4.5 h-4.5 text-amber-400" /> Donor & CSR Partner Recognition Wall
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Honoring organizations and individuals expanding STEM equality across West Africa.
              </p>
            </div>
            <button
              onClick={onOpenDonorModal}
              className="text-xs font-semibold text-teal-400 hover:text-teal-300 underline"
            >
              + Add Your Name / Organization
            </button>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
              Loading active STEM patrons...
            </div>
          ) : donors.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Be the first sponsor to adopt a school on our platform!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {donors.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between space-y-3 hover:border-teal-700/60 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800/60">
                        {donor.donorType.replace('_', ' ')}
                      </span>
                      <strong className="text-xs text-emerald-400 font-mono">${donor.amountPledged.toLocaleString()} USD</strong>
                    </div>
                    <h4 className="text-xs font-bold text-white pt-1">{donor.donorName}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{donor.country}</p>
                    {donor.targetSchoolPreference && (
                      <p className="text-[11px] text-slate-300 italic pt-1">
                        &quot;Target: {donor.targetSchoolPreference}&quot;
                      </p>
                    )}
                  </div>

                  {donor.message && (
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 italic">
                      &quot;{donor.message}&quot;
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> {donor.status.replace(/_/g, ' ')}
                    </span>
                    <span>{new Date(donor.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
