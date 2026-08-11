import React, { useState, useEffect } from 'react';
import { SchoolRegistration, StemBoxUnit, DonorPledge } from './types';
import { INITIAL_SCHOOLS, INITIAL_STEM_UNITS } from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { StemBoxShowcase } from './components/StemBoxShowcase';
import { SchoolManagementPortal } from './components/SchoolManagementPortal';
import { StemCurriculumView } from './components/StemCurriculumView';
import { AiStemTutorSandbox } from './components/AiStemTutorSandbox';
import { DonorImpactWall } from './components/DonorImpactWall';
import { DonorSponsorshipModal } from './components/DonorSponsorshipModal';
import { FaqSection } from './components/FaqSection';
import { NetAccessFooter } from './components/NetAccessFooter';
import { SchoolRegistrationForm } from './components/SchoolRegistrationForm';

export function App() {
  const [schools, setSchools] = useState<SchoolRegistration[]>(INITIAL_SCHOOLS);
  const [stemUnits, setStemUnits] = useState<StemBoxUnit[]>(INITIAL_STEM_UNITS);
  const [activeSection, setActiveSection] = useState<string>('HERO');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isDonorModalOpen, setIsDonorModalOpen] = useState<boolean>(false);

  // Fetch initial schools & hardware units from server
  useEffect(() => {
    fetch('/api/schools')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.schools && data.schools.length > 0) {
          setSchools(data.schools);
        }
      })
      .catch((err) => console.log('Using initial client schools store', err));

    fetch('/api/stem-boxes')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.units && data.units.length > 0) {
          setStemUnits(data.units);
        }
      })
      .catch((err) => console.log('Using initial client units store', err));
  }, []);

  const handleRegistrationSuccess = (newSchool: SchoolRegistration) => {
    setSchools((prev) => [newSchool, ...prev]);
    // Optionally fetch updated units
    fetch('/api/stem-boxes')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.units) {
          setStemUnits(data.units);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSectionClick = (sec: string) => {
    setActiveSection(sec);
    if (sec === 'HARDWARE') {
      document.getElementById('hardware-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'PORTAL') {
      document.getElementById('portal-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'CURRICULUM') {
      document.getElementById('curriculum-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'AI_SANDBOX') {
      document.getElementById('ai-sandbox-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'DONORS') {
      document.getElementById('donor-wall')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'FAQ') {
      document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sec === 'HERO') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={handleSectionClick}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        onOpenDonorModal={() => setIsDonorModalOpen(true)}
        schoolCount={schools.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroBanner
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
          onOpenDonorModal={() => setIsDonorModalOpen(true)}
          onExploreHardware={() => handleSectionClick('HARDWARE')}
          schoolCount={schools.length}
        />

        <StemBoxShowcase
          units={stemUnits}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />

        <SchoolManagementPortal
          schools={schools}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />

        <StemCurriculumView />

        <AiStemTutorSandbox />

        <DonorImpactWall
          onOpenDonorModal={() => setIsDonorModalOpen(true)}
          schoolsList={schools}
        />

        <FaqSection />
      </main>

      {/* Footer */}
      <NetAccessFooter
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        onOpenDonorModal={() => setIsDonorModalOpen(true)}
        setActiveSection={handleSectionClick}
      />

      {/* Registration Modal Overlay */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl my-8">
            <SchoolRegistrationForm
              onSuccess={(sch) => {
                handleRegistrationSuccess(sch);
              }}
              onClose={() => setIsRegisterModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Donor & Sponsorship Modal Overlay */}
      <DonorSponsorshipModal
        isOpen={isDonorModalOpen}
        onClose={() => setIsDonorModalOpen(false)}
        schoolsList={schools}
        onPledgeSuccess={() => {
          // Re-trigger scroll to donor wall after closing or updating
        }}
      />

    </div>
  );
}

export default App;
