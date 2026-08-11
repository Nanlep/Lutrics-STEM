import React, { useState } from 'react';
import {
  Heart,
  X,
  CheckCircle2,
  Building2,
  User,
  Globe,
  DollarSign,
  Sun,
  Cpu,
  Gift,
  ShieldCheck,
  Send,
  Sparkles,
  Award,
  CreditCard,
  FileText
} from 'lucide-react';
import { DonorPledge, SchoolRegistration } from '../types';

interface DonorSponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolsList: SchoolRegistration[];
  onPledgeSuccess?: (newPledge: DonorPledge) => void;
}

export const DonorSponsorshipModal: React.FC<DonorSponsorshipModalProps> = ({
  isOpen,
  onClose,
  schoolsList,
  onPledgeSuccess,
}) => {
  const [donorType, setDonorType] = useState<DonorPledge['donorType']>('INDIVIDUAL');
  const [donorName, setDonorName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [sponsorshipTier, setSponsorshipTier] = useState<DonorPledge['sponsorshipTier']>('ADOPT_A_SCHOOL');
  const [customAmount, setCustomAmount] = useState('2500');
  const [pledgeType, setPledgeType] = useState<DonorPledge['pledgeType']>('ONE_TIME');
  const [targetSchoolPreference, setTargetSchoolPreference] = useState('Highest Priority Rural School');
  const [paymentPreference, setPaymentPreference] = useState<'BANK_WIRE' | 'CREDIT_CARD' | 'CORPORATE_INVOICE' | 'CRYPTO'>('BANK_WIRE');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedPledge, setSubmittedPledge] = useState<DonorPledge | null>(null);

  if (!isOpen) return null;

  // Determine effective USD amount
  const getTierAmount = (): number => {
    switch (sponsorshipTier) {
      case 'ADOPT_A_SCHOOL':
        return 1200;
      case 'SOLAR_POWER_PACK':
        return 350;
      case 'AI_CONTENT_HUB':
        return 500;
      case 'CUSTOM_FOUNDATION_GRANT':
        return Math.max(100, Number(customAmount) || 100);
      default:
        return 1200;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() && !isAnonymous) {
      setError('Please provide your Name or Organization Name, or select Anonymous Donation.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address for pledge confirmation and tax receipt.');
      return;
    }

    setLoading(true);
    setError(null);

    const amountPledged = getTierAmount();

    try {
      const response = await fetch('/api/donations/pledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorType,
          donorName: isAnonymous ? 'Anonymous STEM Patron' : donorName,
          contactPerson: contactPerson || donorName,
          email,
          phone,
          country,
          sponsorshipTier,
          amountPledged,
          pledgeType,
          targetSchoolPreference,
          paymentPreference,
          message,
          isAnonymous,
        }),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Failed to submit pledge');
      }

      const pledge: DonorPledge = resData.pledge;
      setSubmittedPledge(pledge);
      if (onPledgeSuccess) {
        onPledgeSuccess(pledge);
      }
    } catch (err: any) {
      console.error('Pledge submission error:', err);
      setError(err.message || 'Error processing sponsorship pledge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedPledge(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-teal-800/80 rounded-2xl shadow-2xl overflow-hidden my-8 animate-fadeIn text-slate-100">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 px-6 py-5 border-b border-teal-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
              <Heart className="w-5 h-5 fill-teal-400/20 text-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Sponsor & Donate to STEM Education <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-teal-300/90">
                NetAccess Foundation • Adopt a rural West African school with off-grid AI hardware & solar kits
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {submittedPledge ? (
            /* SUCCESS CONFIRMATION RECEIPT */
            <div className="p-6 bg-teal-950/40 border border-teal-500/50 rounded-2xl text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-teal-900/60 border border-teal-600/60 rounded-full text-[11px] font-mono text-teal-300 uppercase tracking-wider mb-2">
                  Pledge ID: {submittedPledge.id}
                </span>
                <h3 className="text-xl font-extrabold text-white">Thank You for Supporting STEM Learners!</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
                  Your pledge of <strong className="text-emerald-400">${submittedPledge.amountPledged.toLocaleString()} USD</strong> will directly deploy offline AI hardware and solar energy to students.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-2.5 max-w-xl mx-auto">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Sponsorship Tier:</span>
                  <span className="font-semibold text-teal-300">
                    {submittedPledge.sponsorshipTier === 'ADOPT_A_SCHOOL' && 'Adopt-a-School Full Hardware Kit ($1,200)'}
                    {submittedPledge.sponsorshipTier === 'SOLAR_POWER_PACK' && 'Solar Photovoltaic & Battery Pack ($350)'}
                    {submittedPledge.sponsorshipTier === 'AI_CONTENT_HUB' && 'Offline AI Content Hub License ($500)'}
                    {submittedPledge.sponsorshipTier === 'CUSTOM_FOUNDATION_GRANT' && `Custom Foundation Grant ($${submittedPledge.amountPledged})`}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Beneficiary Preference:</span>
                  <span className="font-semibold text-slate-200">{submittedPledge.targetSchoolPreference}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Donor Name:</span>
                  <span className="font-semibold text-white">{submittedPledge.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Confirmation Email Sent To:</span>
                  <span className="font-mono text-teal-300">{submittedPledge.email}</span>
                </div>
              </div>

              <div className="bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl text-left text-[11px] text-amber-200/90 flex items-start gap-2.5 max-w-xl mx-auto">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Tax-Deductible & Verified Receipt:</strong> Our Foundation Grants Officer will follow up at <em>{submittedPledge.email}</em> within 24 hours with wire transfer invoice instructions, official tax deductibility certificates, and hardware tracking logs.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl shadow-lg transition-colors"
                >
                  Close & Return to Portal
                </button>
              </div>
            </div>
          ) : (
            /* PLEDGE FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-200 rounded-xl text-xs flex items-center justify-between">
                  <span>{error}</span>
                  <button type="button" onClick={() => setError(null)} className="text-rose-400 underline ml-2">
                    Dismiss
                  </button>
                </div>
              )}

              {/* TIER SELECTION CARDS */}
              <div>
                <label className="block text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-teal-400" /> Select Sponsorship Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Tier 1 */}
                  <div
                    onClick={() => setSponsorshipTier('ADOPT_A_SCHOOL')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      sponsorshipTier === 'ADOPT_A_SCHOOL'
                        ? 'bg-teal-950/80 border-teal-400 ring-2 ring-teal-500/30'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-900/50 px-2 py-0.5 rounded">
                        Most Popular
                      </span>
                      <strong className="text-sm text-emerald-400 font-mono">$1,200</strong>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">Adopt-a-School Unit</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      1x Lutrics Stem Box hardware, 4K laser projector, and 30x offline student terminals.
                    </p>
                  </div>

                  {/* Tier 2 */}
                  <div
                    onClick={() => setSponsorshipTier('SOLAR_POWER_PACK')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      sponsorshipTier === 'SOLAR_POWER_PACK'
                        ? 'bg-teal-950/80 border-teal-400 ring-2 ring-teal-500/30'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <strong className="text-sm text-emerald-400 font-mono">$350</strong>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">Solar Power Pack</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      High-efficiency solar PV panel + Lithium battery unit for 100% off-grid schools.
                    </p>
                  </div>

                  {/* Tier 3 */}
                  <div
                    onClick={() => setSponsorshipTier('AI_CONTENT_HUB')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      sponsorshipTier === 'AI_CONTENT_HUB'
                        ? 'bg-teal-950/80 border-teal-400 ring-2 ring-teal-500/30'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <Cpu className="w-4 h-4 text-teal-400" />
                      <strong className="text-sm text-emerald-400 font-mono">$500</strong>
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">Offline AI Hub License</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Pre-loads local open-source AI models & 3D STEM labs for an entire school hub.
                    </p>
                  </div>
                </div>

                {/* Custom Grant Option */}
                <div
                  onClick={() => setSponsorshipTier('CUSTOM_FOUNDATION_GRANT')}
                  className={`mt-3 p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    sponsorshipTier === 'CUSTOM_FOUNDATION_GRANT'
                      ? 'bg-teal-950/80 border-teal-400 ring-2 ring-teal-500/30'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Custom CSR / Foundation Grant</h4>
                      <p className="text-[11px] text-slate-400">Specify custom multi-school grant or CSR allocation</p>
                    </div>
                  </div>
                  {sponsorshipTier === 'CUSTOM_FOUNDATION_GRANT' ? (
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-teal-300">$</span>
                      <input
                        type="number"
                        min="100"
                        step="100"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-24 bg-slate-900 border border-teal-500 rounded px-2 py-1 text-xs text-emerald-300 font-mono focus:outline-none"
                      />
                      <span className="text-xs text-slate-400 font-mono">USD</span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-teal-400">Custom Amount &rarr;</span>
                  )}
                </div>
              </div>

              {/* DONOR CATEGORY & PLEDGE TYPE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Donor / Partner Entity Type
                  </label>
                  <select
                    value={donorType}
                    onChange={(e) => setDonorType(e.target.value as DonorPledge['donorType'])}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="INDIVIDUAL">Individual Philanthropist / Alumni</option>
                    <option value="CORPORATE_CSR">Corporate CSR Initiative / Company</option>
                    <option value="FOUNDATION">Foundation / Non-Profit Trust</option>
                    <option value="ALUMNI_ASSOCIATION">School Alumni Association</option>
                    <option value="INTERNATIONAL_PARTNER">International Development Agency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Pledge Commitment Schedule
                  </label>
                  <select
                    value={pledgeType}
                    onChange={(e) => setPledgeType(e.target.value as DonorPledge['pledgeType'])}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="ONE_TIME">One-Time Direct Donation</option>
                    <option value="MONTHLY_RECURRING">Monthly Recurring STEM Sponsorship</option>
                    <option value="ANNUAL_GRANT">Annual CSR Foundation Grant</option>
                  </select>
                </div>
              </div>

              {/* DONOR CONTACT INFORMATION */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wide flex items-center gap-1.5">
                  <User className="w-4 h-4 text-teal-400" /> Donor / Sponsor Contact Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Donor / Organization Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required={!isAnonymous}
                      disabled={isAnonymous}
                      value={isAnonymous ? 'Anonymous Donor' : donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="e.g. Chevron CSR Fund or Dr. Clement Ogundipe"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-teal-500 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Contact Person & Designation
                    </label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Adewale Tinubu (Head of CSR)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. donor@foundation.org"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 803 000 1122"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Country / Residence
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other">Other Global Location</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isAnonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                  />
                  <label htmlFor="isAnonymous" className="text-xs text-slate-300 cursor-pointer">
                    Keep my donor name anonymous on the public donor recognition board
                  </label>
                </div>
              </div>

              {/* TARGET BENEFICIARY SCHOOL SELECTION */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-teal-400" /> Preferred Beneficiary School
                </label>
                <select
                  value={targetSchoolPreference}
                  onChange={(e) => setTargetSchoolPreference(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Highest Priority Rural School">Highest Priority Off-Grid Rural Public School (Recommended)</option>
                  {schoolsList.map((sch) => (
                    <option key={sch.id} value={`${sch.name} (${sch.stateProvince}, ${sch.country})`}>
                      {sch.name} — {sch.stateProvince}, {sch.country} ({sch.status.replace('_', ' ')})
                    </option>
                  ))}
                  <option value="Any Public Government School in Nigeria">Any Public Government School in Nigeria</option>
                  <option value="Any Public School in Ghana">Any Public School in Ghana</option>
                  <option value="Any Public School in Kenya">Any Public School in Kenya</option>
                </select>
              </div>

              {/* PAYMENT / INVOICE PREFERENCE & MESSAGE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-teal-400" /> Payment & Receipt Preference
                  </label>
                  <select
                    value={paymentPreference}
                    onChange={(e) => setPaymentPreference(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="BANK_WIRE">Official Bank Wire / Swift Transfer (Tax Invoice)</option>
                    <option value="CREDIT_CARD">Online Credit/Debit Card (Instant Processing)</option>
                    <option value="CORPORATE_INVOICE">Corporate CSR Purchase Order / Invoice</option>
                    <option value="CRYPTO">Cryptocurrency / USDT Stablecoin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Hardware Plaque Dedication / Note
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. In loving memory of Prof. Adeleke"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Official NetAccess Foundation 501(c)(3) & NGO Partner</span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-teal-900/40 flex items-center gap-2 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating Pledge...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit ${getTierAmount().toLocaleString()} Pledge
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
