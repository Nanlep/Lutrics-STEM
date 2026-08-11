import React, { useState } from 'react';
import { SchoolRegistration } from '../types';
import { School, Building2, Search, Filter, MapPin, Mail, Phone, Cpu, ShieldCheck, Sparkles, PlusCircle, CheckCircle2, Clock, Truck } from 'lucide-react';

interface SchoolManagementPortalProps {
  schools: SchoolRegistration[];
  onOpenRegisterModal: () => void;
}

export const SchoolManagementPortal: React.FC<SchoolManagementPortalProps> = ({
  schools,
  onOpenRegisterModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'PUBLIC' | 'PRIVATE'>('ALL');
  const [selectedCountry, setSelectedCountry] = useState<string>('ALL');
  const [selectedSchool, setSelectedSchool] = useState<SchoolRegistration | null>(schools[0] || null);

  const filteredSchools = schools.filter((sch) => {
    const matchesType = filterType === 'ALL' || sch.schoolType === filterType;
    const matchesCountry = selectedCountry === 'ALL' || sch.country === selectedCountry;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      sch.name.toLowerCase().includes(query) ||
      sch.registrationNo.toLowerCase().includes(query) ||
      sch.city.toLowerCase().includes(query) ||
      sch.stateProvince.toLowerCase().includes(query) ||
      (sch.lgaDistrict && sch.lgaDistrict.toLowerCase().includes(query)) ||
      sch.contactPerson.toLowerCase().includes(query);

    return matchesType && matchesCountry && matchesQuery;
  });

  const totalPublic = schools.filter((s) => s.schoolType === 'PUBLIC').length;
  const totalPrivate = schools.filter((s) => s.schoolType === 'PRIVATE').length;
  const totalUnits = schools.reduce((acc, s) => acc + s.requestedUnits, 0);

  return (
    <section id="portal-section" className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Metrics */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <span className="bg-teal-500/20 text-teal-300 text-xs px-3 py-1 rounded-full font-bold border border-teal-500/30">
              National Adoption Portal
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Registered Schools Directory
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Track school enrollment, Ministry MOE credentials, geographical LGA coverage, and Lutrics Stem Box hardware dispatch allocations.
            </p>
          </div>

          {/* Aggregate Metrics Pills */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl text-xs">
              <span className="text-slate-400 block">Total Enrolled</span>
              <span className="text-xl font-extrabold text-white font-mono">{schools.length} Schools</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl text-xs">
              <span className="text-slate-400 block">Public / Grants</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono">{totalPublic} Public</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl text-xs">
              <span className="text-slate-400 block">Private / Direct</span>
              <span className="text-xl font-extrabold text-teal-400 font-mono">{totalPrivate} Private</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl text-xs">
              <span className="text-slate-400 block">Boxes Requested</span>
              <span className="text-xl font-extrabold text-cyan-400 font-mono">{totalUnits} Units</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search school name, reg no, LGA, state, city..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Type Filters & Country Filter */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['ALL', 'PUBLIC', 'PRIVATE'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    filterType === t
                      ? 'bg-teal-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t === 'ALL' ? 'All Types' : t === 'PUBLIC' ? 'Public Schools' : 'Private Schools'}
                </button>
              ))}
            </div>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
            >
              <option value="ALL">All Countries</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
            </select>

            <button
              onClick={onOpenRegisterModal}
              className="px-4 py-2 bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-xs rounded-xl hover:from-teal-300 hover:to-emerald-300 transition flex items-center gap-1.5 ml-auto cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 fill-slate-950 stroke-teal-400" />
              <span>Register New School</span>
            </button>
          </div>
        </div>

        {/* Directory Layout: List on Left, Detailed Inspector Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Schools List Panel */}
          <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredSchools.length === 0 ? (
              <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                No registered schools found matching criteria.
              </div>
            ) : (
              filteredSchools.map((sch) => {
                const isSelected = selectedSchool?.id === sch.id;
                return (
                  <div
                    key={sch.id}
                    onClick={() => setSelectedSchool(sch)}
                    className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-teal-950 to-slate-900 border-teal-500 text-white shadow-xl'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-teal-400">
                        {sch.registrationNo}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sch.schoolType === 'PUBLIC'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        }`}
                      >
                        {sch.schoolType}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-snug">{sch.name}</h4>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="truncate">
                        {sch.city}{sch.lgaDistrict ? `, ${sch.lgaDistrict}` : ''}, {sch.stateProvince}, {sch.country}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px]">
                      <span className="text-slate-400">
                        Units: <strong className="text-white">{sch.requestedUnits} Stem Boxes</strong>
                      </span>
                      <span className="text-cyan-400 font-medium">
                        {sch.grantRequested ? 'NetAccess Grant Applied' : 'Direct Institutional'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Detailed Inspector Panel */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white space-y-6 sticky top-20">
            {selectedSchool ? (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Header */}
                <div className="border-b border-slate-800 pb-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20">
                      Tracking Reg No: {selectedSchool.registrationNo}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                        selectedSchool.status === 'ACTIVE_INSTALLED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : selectedSchool.status === 'VERIFIED_APPROVED'
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                          : selectedSchool.status === 'DISPATCHED'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {selectedSchool.status === 'ACTIVE_INSTALLED' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {selectedSchool.status === 'DISPATCHED' && <Truck className="w-3.5 h-3.5" />}
                      {selectedSchool.status === 'PENDING_REVIEW' && <Clock className="w-3.5 h-3.5" />}
                      {selectedSchool.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white">{selectedSchool.name}</h3>

                  <p className="text-xs text-slate-300 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-400" />
                    <span>
                      {selectedSchool.schoolCategory || selectedSchool.schoolType} • Registered {new Date(selectedSchool.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* Page 1 School Profile & Ministry Information Summary */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <School className="w-4 h-4" /> Page 1 Profile & Ministry MOE Identification
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Ministry MOE Reg Code:</span>
                      <strong className="text-white font-mono">
                        {selectedSchool.moeRegistrationNo || 'Not Provided (In Review)'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Institutional Category:</span>
                      <strong className="text-white">{selectedSchool.schoolCategory || selectedSchool.schoolType}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">LGA / District Council:</span>
                      <strong className="text-white">{selectedSchool.lgaDistrict || selectedSchool.city}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">State & Country:</span>
                      <strong className="text-white">{selectedSchool.stateProvince}, {selectedSchool.country}</strong>
                    </div>
                    {selectedSchool.schoolAddress && (
                      <div className="sm:col-span-2 border-t border-slate-900 pt-2">
                        <span className="text-slate-400 block">Campus Physical Address:</span>
                        <strong className="text-slate-200">{selectedSchool.schoolAddress}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Page 2 Administrator & STEM Coordinator Contacts */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-4 h-4" /> Page 2 Administrator & STEM Coordinator Contacts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Administrator Box */}
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-teal-400 block tracking-wider">
                        Institutional Administrator
                      </span>
                      <strong className="text-white block text-sm">{selectedSchool.adminName || selectedSchool.contactPerson}</strong>
                      <span className="text-slate-400 block text-[11px]">{selectedSchool.adminRole || selectedSchool.contactRole || 'Principal / Administrator'}</span>
                      <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
                        <div><span className="text-slate-500">Email:</span> <span className="text-teal-300 font-mono">{selectedSchool.adminEmail || selectedSchool.contactEmail}</span></div>
                        <div><span className="text-slate-500">Phone:</span> <span className="text-white font-mono">{selectedSchool.adminPhone || selectedSchool.contactPhone || 'N/A'}</span></div>
                      </div>
                    </div>

                    {/* STEM Coordinator Box */}
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                        Designated STEM / ICT Coordinator
                      </span>
                      <strong className="text-white block text-sm">{selectedSchool.stemCoordinatorName || selectedSchool.secondaryContact || 'To be assigned'}</strong>
                      <span className="text-slate-400 block text-[11px]">{selectedSchool.stemCoordinatorTitle || 'Head of STEM & Science'}</span>
                      <div className="pt-1.5 border-t border-slate-800 space-y-1 text-[11px]">
                        <div><span className="text-slate-500">Email:</span> <span className="text-emerald-300 font-mono">{selectedSchool.stemCoordinatorEmail || 'N/A'}</span></div>
                        <div><span className="text-slate-500">Phone:</span> <span className="text-white font-mono">{selectedSchool.stemCoordinatorPhone || selectedSchool.secondaryContact || 'N/A'}</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page 3 Capacity & Hardware Requirements */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Page 3 Stem Box Allocation & Grant Status
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Student Population:</span>
                      <strong className="text-white font-mono">{selectedSchool.studentCount} Students</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Requested Units:</span>
                      <strong className="text-emerald-400 font-mono">{selectedSchool.requestedUnits} Stem Boxes</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Internet / Power:</span>
                      <strong className="text-white">{selectedSchool.internetType}</strong>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-400 block text-xs mb-1">Target Grade Levels:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSchool.targetGrades.map((g) => (
                        <span key={g} className="px-2.5 py-1 bg-slate-900 text-teal-300 text-[11px] rounded font-bold border border-slate-800">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedSchool.notes && (
                    <div className="pt-2 border-t border-slate-900 text-xs">
                      <span className="text-slate-400 block">Facility Notes:</span>
                      <p className="text-slate-300 italic">{selectedSchool.notes}</p>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                Select a school from the directory list to inspect full details.
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
