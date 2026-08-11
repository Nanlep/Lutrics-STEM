import React, { useState } from 'react';
import { SchoolType, SchoolRegistration } from '../types';
import { School, Building2, User, Mail, Phone, Cpu, CheckCircle2, AlertCircle, Sparkles, ArrowRight, ArrowLeft, X } from 'lucide-react';

interface SchoolRegistrationFormProps {
  onSuccess: (newSchool: SchoolRegistration) => void;
  onClose?: () => void;
}

export const SchoolRegistrationForm: React.FC<SchoolRegistrationFormProps> = ({
  onSuccess,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [formData, setFormData] = useState({
    name: '',
    schoolType: 'PUBLIC' as SchoolType,
    schoolCategory: 'Public / Government School',
    moeRegistrationNo: '',
    country: 'Nigeria',
    stateProvince: 'Lagos',
    lgaDistrict: '',
    city: '',
    schoolAddress: '',
    // School Administrator Contact
    contactPerson: '',
    contactRole: 'School Principal / Headmaster',
    contactEmail: '',
    contactPhone: '',
    // STEM Coordinator Contact
    stemCoordinatorName: '',
    stemCoordinatorTitle: 'Head of Science & STEM',
    stemCoordinatorEmail: '',
    stemCoordinatorPhone: '',
    secondaryContact: '',
    studentCount: 500,
    targetGrades: ['Junior Secondary (JSS 1-3)'],
    internetType: 'Starlink / Satellite' as 'Starlink / Satellite' | 'Fiber Broadband' | 'Cellular 4G/5G' | 'Intermittent / Limited',
    requestedUnits: 3,
    grantRequested: true,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedSchool, setSubmittedSchool] = useState<SchoolRegistration | null>(null);

  const gradeOptions = [
    'Nursery & Early Years',
    'Primary School (Primary 1-6)',
    'Junior Secondary (JSS 1-3)',
    'Senior Secondary (SSS 1-3)',
  ];

  const categoryOptions = [
    'Public / Government School',
    'Private Mission / Faith-Based',
    'Private Commercial',
    'Community / Non-Profit / NGO',
  ];

  const internetOptions: Array<'Starlink / Satellite' | 'Fiber Broadband' | 'Cellular 4G/5G' | 'Intermittent / Limited'> = [
    'Starlink / Satellite',
    'Fiber Broadband',
    'Cellular 4G/5G',
    'Intermittent / Limited',
  ];

  const handleGradeToggle = (grade: string) => {
    setFormData((prev) => {
      const exists = prev.targetGrades.includes(grade);
      return {
        ...prev,
        targetGrades: exists
          ? prev.targetGrades.filter((g) => g !== grade)
          : [...prev.targetGrades, grade],
      };
    });
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Please provide the official School Name.');
      return false;
    }
    if (!formData.stateProvince.trim()) {
      setError('Please provide the State / Region.');
      return false;
    }
    if (!formData.city.trim()) {
      setError('Please provide the City / Town.');
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep2 = () => {
    if (!formData.contactPerson.trim()) {
      setError('Please provide the School Administrator / Principal Name.');
      return false;
    }
    if (!formData.contactEmail.trim() || !formData.contactEmail.includes('@')) {
      setError('Please provide a valid Administrator Email Address.');
      return false;
    }
    if (!formData.contactPhone.trim()) {
      setError('Please provide the Administrator Phone Number.');
      return false;
    }
    if (!formData.stemCoordinatorName.trim()) {
      setError('Please provide the STEM Coordinator / Lead Educator Name.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/schools/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      setSubmittedSchool(data.school);
      onSuccess(data.school);
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting school registration.');
    } finally {
      setLoading(false);
    }
  };

  if (submittedSchool) {
    return (
      <div className="bg-slate-900 border border-teal-500/40 rounded-2xl p-6 sm:p-8 text-white max-w-2xl mx-auto shadow-2xl relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-bold rounded-full border border-teal-500/30">
            Registration Submitted
          </span>

          <h2 className="text-2xl font-extrabold text-white">
            Welcome to Lutrics Stem Club!
          </h2>

          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Your school registration for <strong className="text-white">{submittedSchool.name}</strong> has been logged into the NetAccess Foundation adoption portal.
          </p>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Tracking Registration No:</span>
              <span className="text-teal-300 font-bold text-sm">{submittedSchool.registrationNo}</span>
            </div>
            {submittedSchool.moeRegistrationNo && (
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Ministry MOE Reg ID:</span>
                <span className="text-white font-medium">{submittedSchool.moeRegistrationNo}</span>
              </div>
            )}
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Category & Location:</span>
              <span className="text-white font-semibold">
                {submittedSchool.schoolCategory || submittedSchool.schoolType} • {submittedSchool.city}, {submittedSchool.stateProvince}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Requested Stem Boxes:</span>
              <span className="text-emerald-400 font-bold">{submittedSchool.requestedUnits} Units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Grant Status:</span>
              <span className="text-cyan-400 font-bold">
                {submittedSchool.grantRequested ? 'NetAccess Grant Application Active' : 'Direct Institutional Order'}
              </span>
            </div>
          </div>

          <div className="p-4 bg-teal-950/40 border border-teal-800/60 rounded-xl text-left text-xs text-teal-200 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-teal-300">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              What happens next?
            </p>
            <p>1. Our NetAccess STEM field coordinator will contact {submittedSchool.contactPerson} ({submittedSchool.contactEmail}).</p>
            <p>2. Site evaluation & pre-configuration of Lutrics Stem Box hardware and open-source LLM models.</p>
            <p>3. Dispatch, installation, and teacher training session setup.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                if (onClose) onClose();
              }}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm rounded-xl hover:from-teal-400 hover:to-emerald-400 transition cursor-pointer"
            >
              Access School Portal Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white max-w-3xl mx-auto shadow-2xl relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Form Title Header */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="bg-teal-500/20 text-teal-300 text-xs px-2.5 py-1 rounded-md font-semibold border border-teal-500/30">
            School Registration & Adoption Portal
          </span>
          <span className="text-xs text-slate-400">• Powered by NetAccess Foundation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Register School for Lutrics Stem Box
        </h2>
        <p className="text-slate-300 text-sm">
          Complete the 3-step registration form to enroll your school, apply for NetAccess Foundation grants, and receive Lutrics Stem Box units.
        </p>
      </div>

      {/* Step Navigation Progress Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[
          { step: 1, title: 'Page 1: School Profile', icon: School },
          { step: 2, title: 'Page 2: Contact Person', icon: User },
          { step: 3, title: 'Page 3: Stem Box & Grants', icon: Cpu },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentStep === tab.step;
          const isDone = currentStep > tab.step;
          return (
            <button
              key={tab.step}
              type="button"
              onClick={() => {
                if (tab.step === 1) setCurrentStep(1);
                if (tab.step === 2 && validateStep1()) setCurrentStep(2);
                if (tab.step === 3 && validateStep1() && validateStep2()) setCurrentStep(3);
              }}
              className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-teal-950 to-slate-900 border-teal-500 text-white shadow-lg'
                  : isDone
                  ? 'bg-slate-950 text-emerald-300 border-emerald-800/80'
                  : 'bg-slate-950/60 text-slate-500 border-slate-800'
              }`}
            >
              <div
                className={`p-2 rounded-lg text-xs font-extrabold ${
                  isActive
                    ? 'bg-teal-500 text-slate-950'
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : tab.step}
              </div>
              <div className="hidden sm:block">
                <span className="text-[11px] font-bold block">{tab.title}</span>
                <span className="text-[9px] text-slate-400 block">
                  {tab.step === 1 ? 'Location & MOE' : tab.step === 2 ? 'STEM Coordinator' : 'Hardware Scale'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-950/60 border border-rose-800 text-rose-200 text-xs rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ================= PAGE 1: SCHOOL PROFILE & MINISTRY INFO ================= */}
        {currentStep === 1 && (
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
                <School className="w-4.5 h-4.5 text-teal-400" /> Page 1 of 3: School Profile & Ministry Information
              </h3>
              <span className="text-xs text-slate-400 font-mono">Step 1 / 3</span>
            </div>

            {/* School Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Official School Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Government Science Secondary School, Keffi or St. Augustine's High School"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Ownership Type & Institutional Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  School Ownership Type <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        schoolType: 'PUBLIC',
                        schoolCategory: 'Public / Government School',
                        grantRequested: true,
                      })
                    }
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition cursor-pointer ${
                      formData.schoolType === 'PUBLIC'
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" /> Public School
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        schoolType: 'PRIVATE',
                        schoolCategory: 'Private Mission / Faith-Based',
                        grantRequested: false,
                      })
                    }
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition cursor-pointer ${
                      formData.schoolType === 'PRIVATE'
                        ? 'bg-teal-600 text-white border-teal-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <School className="w-4 h-4" /> Private School
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Institutional Category
                </label>
                <select
                  value={formData.schoolCategory}
                  onChange={(e) => setFormData({ ...formData, schoolCategory: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ministry Registration Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ministry of Education Code / Registration No. <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.moeRegistrationNo}
                onChange={(e) => setFormData({ ...formData, moeRegistrationNo: e.target.value })}
                placeholder="e.g. MOE/LGS/SEC/2019/048 or SUBEB Code"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Location: Country, State, LGA, City */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Sierra Leone">Sierra Leone</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Other / International">Other / International</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  State / Region <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.stateProvince}
                  onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                  placeholder="e.g. Lagos, Rivers, FCT Abuja"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">LGA / District</label>
                <input
                  type="text"
                  value={formData.lgaDistrict}
                  onChange={(e) => setFormData({ ...formData, lgaDistrict: e.target.value })}
                  placeholder="e.g. Ikeja LGA, Alimosho, Port Harcourt LGA"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  City / Town <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Ikeja, Lekki, Keffi"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Campus Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Physical Campus Address
              </label>
              <input
                type="text"
                value={formData.schoolAddress}
                onChange={(e) => setFormData({ ...formData, schoolAddress: e.target.value })}
                placeholder="e.g. Plot 12 Commercial Avenue, Yaba, Lagos State"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl hover:from-teal-400 hover:to-emerald-400 transition flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Continue to Page 2 (Representative Contact)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE 2: ADMINISTRATOR & STEM COORDINATOR CONTACTS ================= */}
        {currentStep === 2 && (
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4.5 h-4.5 text-teal-400" /> Page 2 of 3: School Administrator & STEM Coordinator Details
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Provide verified contact information for both institutional leadership and the designated STEM / ICT coordinator.
                </p>
              </div>
              <span className="text-xs text-slate-400 font-mono shrink-0">Step 2 / 3</span>
            </div>

            {/* SECTION 1: SCHOOL ADMINISTRATOR / PRINCIPAL */}
            <div className="bg-slate-900/90 border border-teal-900/50 p-4 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-teal-900/40 pb-2">
                <Building2 className="w-4 h-4 text-teal-400" />
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wide">
                  1. School Administrator / Principal Information
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Administrator Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Dr. Clement Ogundipe or Rev. Sister Angela"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Administrative Designation / Title <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.contactRole}
                    onChange={(e) => setFormData({ ...formData, contactRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="School Principal / Headmaster">School Principal / Headmaster</option>
                    <option value="Vice Principal / Administrator">Vice Principal / Administrator</option>
                    <option value="Proprietor / Director of Education">Proprietor / Director of Education</option>
                    <option value="Head Teacher / Campus Director">Head Teacher / Campus Director</option>
                    <option value="PTA Board Representative">PTA Board Representative</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Official Administrator Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="e.g. principal@school.edu.ng"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Administrator Phone (WhatsApp Active) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+234 803 123 4567"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: STEM COORDINATOR / LEAD EDUCATOR */}
            <div className="bg-slate-900/90 border border-emerald-900/50 p-4 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-emerald-900/40 pb-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
                  2. STEM Coordinator & Lead Educator Information
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    STEM Coordinator Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.stemCoordinatorName}
                    onChange={(e) => setFormData({ ...formData, stemCoordinatorName: e.target.value })}
                    placeholder="e.g. Engr. David Okafor or Mrs. Grace Wambui"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    STEM Role / Department Title <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.stemCoordinatorTitle}
                    onChange={(e) => setFormData({ ...formData, stemCoordinatorTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Head of Science & STEM">Head of Science & STEM</option>
                    <option value="ICT Lead / Computer Science Teacher">ICT Lead / Computer Science Teacher</option>
                    <option value="Robotics & AI Club Patron">Robotics & AI Club Patron</option>
                    <option value="Physics & Electronics Teacher">Physics & Electronics Teacher</option>
                    <option value="Mathematics & Logic Teacher">Mathematics & Logic Teacher</option>
                    <option value="Lab Tech & Hardware Manager">Lab Tech & Hardware Manager</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    STEM Coordinator Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.stemCoordinatorEmail}
                    onChange={(e) => setFormData({ ...formData, stemCoordinatorEmail: e.target.value })}
                    placeholder="e.g. stem.lead@school.edu.ng"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    STEM Coordinator Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.stemCoordinatorPhone}
                    onChange={(e) => setFormData({ ...formData, stemCoordinatorPhone: e.target.value })}
                    placeholder="+234 812 990 1122"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Additional Secondary Contact / Notes <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.secondaryContact}
                  onChange={(e) => setFormData({ ...formData, secondaryContact: e.target.value })}
                  placeholder="e.g. Lab Technician: Mr. Emmanuel (+234 802 000 1122)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Page 1</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl hover:from-teal-400 hover:to-emerald-400 transition flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Continue to Page 3 (Stem Box & Grants)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= PAGE 3: CAPACITY, STEM HARDWARE & GRANTS ================= */}
        {currentStep === 3 && (
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-5 animate-fadeIn">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4.5 h-4.5 text-teal-400" /> Page 3 of 3: Student Scale, STEM Boxes & NetAccess Grants
              </h3>
              <span className="text-xs text-slate-400 font-mono">Step 3 / 3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Total Student Population
                </label>
                <input
                  type="number"
                  min={20}
                  max={10000}
                  value={formData.studentCount}
                  onChange={(e) => setFormData({ ...formData, studentCount: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Requested Lutrics Stem Box Units
                </label>
                <select
                  value={formData.requestedUnits}
                  onChange={(e) => setFormData({ ...formData, requestedUnits: Number(e.target.value) })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} Box Unit{num > 1 ? 's' : ''} (Serves approx. {num * 120} students)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Target Grade Levels in School
              </label>
              <div className="flex flex-wrap gap-2">
                {gradeOptions.map((grade) => {
                  const selected = formData.targetGrades.includes(grade);
                  return (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => handleGradeToggle(grade)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        selected
                          ? 'bg-teal-600 text-white border-teal-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {grade}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Current Internet & Power Setup
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {internetOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData({ ...formData, internetType: opt })}
                    className={`p-2.5 rounded-xl text-xs text-left border flex items-center justify-between transition cursor-pointer ${
                      formData.internetType === opt
                        ? 'bg-teal-950/80 border-teal-500 text-teal-200 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{opt}</span>
                    {formData.internetType === opt && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Grant Application */}
            <div className="p-4 bg-gradient-to-r from-teal-950/80 via-slate-900 to-emerald-950/80 border border-teal-800/80 rounded-xl flex items-center justify-between gap-4 shadow-md">
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Apply for NetAccess Foundation Hardware Sponsorship Grant
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Provides full/partial hardware sponsorship, open-source AI model pre-loads, and free teacher certification workshops.
                </p>
              </div>
              <input
                type="checkbox"
                id="grantRequested"
                checked={formData.grantRequested}
                onChange={(e) => setFormData({ ...formData, grantRequested: e.target.checked })}
                className="w-5 h-5 rounded border-slate-700 text-teal-500 focus:ring-teal-400 cursor-pointer accent-teal-500 shrink-0"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Classroom Layout / Solar Power / Facility Notes
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Requesting solar-battery setup, dedicated computer lab available, power generator schedule..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-slate-800">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Page 2</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-xl shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Logging Registration into NetAccess Database...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    <span>Complete School Registration & Submit Request</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};
