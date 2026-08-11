export type SchoolType = 'PUBLIC' | 'PRIVATE';

export interface SchoolRegistration {
  id: string;
  registrationNo: string;
  name: string;
  schoolType: SchoolType;
  schoolCategory?: string;
  moeRegistrationNo?: string;
  country: string;
  stateProvince: string;
  lgaDistrict?: string;
  city: string;
  schoolAddress?: string;
  contactPerson: string;
  contactRole?: string;
  contactEmail: string;
  contactPhone: string;
  secondaryContact?: string;
  adminName?: string;
  adminRole?: string;
  adminEmail?: string;
  adminPhone?: string;
  stemCoordinatorName?: string;
  stemCoordinatorTitle?: string;
  stemCoordinatorEmail?: string;
  stemCoordinatorPhone?: string;
  studentCount: number;
  targetGrades: string[];
  internetType: 'Starlink / Satellite' | 'Fiber Broadband' | 'Cellular 4G/5G' | 'Intermittent / Limited';
  requestedUnits: number;
  grantRequested: boolean;
  notes?: string;
  status: 'PENDING_REVIEW' | 'VERIFIED_APPROVED' | 'DISPATCHED' | 'ACTIVE_INSTALLED';
  createdAt: string;
}

export interface StemBoxUnit {
  id: string;
  serialNo: string;
  schoolId: string;
  schoolName: string;
  status: 'ONLINE' | 'OFFLINE_STANDALONE' | 'DEPLOYING' | 'MAINTENANCE';
  batteryLevel: number; // percentage
  solarCharging: boolean;
  activeLlmModel: string;
  installedModules: number;
  studentsReached: number;
  lastPing: string;
}

export interface StemCurriculum {
  id: string;
  title: string;
  category: 'Artificial Intelligence & Robotics' | 'Interactive Physics & Astronomy' | 'Open-Source AI Code Lab' | 'Green Tech & Renewable Energy' | 'Cybernetics & Electronics';
  gradeLevel: 'Nursery & Early Years' | 'Primary School (Primary 1-6)' | 'Junior Secondary (JSS 1-3)' | 'Senior Secondary (SSS 1-3)' | 'All Grades';
  duration: string;
  modulesCount: number;
  aiToolInvolved: string;
  description: string;
  learningOutcome: string;
}

export interface DonorPledge {
  id: string;
  donorType: 'INDIVIDUAL' | 'CORPORATE_CSR' | 'FOUNDATION' | 'ALUMNI_ASSOCIATION' | 'INTERNATIONAL_PARTNER';
  donorName: string; // Individual name or Company name
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  sponsorshipTier: 'ADOPT_A_SCHOOL' | 'SOLAR_POWER_PACK' | 'AI_CONTENT_HUB' | 'CUSTOM_FOUNDATION_GRANT';
  amountPledged: number; // USD
  pledgeType: 'ONE_TIME' | 'MONTHLY_RECURRING' | 'ANNUAL_GRANT';
  targetSchoolPreference?: string;
  message?: string;
  isAnonymous: boolean;
  status: 'PLEDGED' | 'VERIFIED' | 'DISPATCHED_TO_SCHOOL';
  createdAt: string;
}
