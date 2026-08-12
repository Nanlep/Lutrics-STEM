import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSchoolsStore, getStemUnitsStore } from '../_store.js';
import type { SchoolRegistration, StemBoxUnit } from '../../src/types.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const data = req.body;

    if (!data.name || !data.contactEmail || !data.stateProvince) {
      return res.status(400).json({
        success: false,
        message: 'Missing required school information (School Name, State/Region, or Contact Email).',
      });
    }

    const countryCode = data.country === 'Ghana' ? 'GHA' : data.country === 'Kenya' ? 'KEN' : 'NGA';
    const randNum = Math.floor(100 + Math.random() * 900);
    const registrationNo = `LUT-2026-${countryCode}-${randNum}`;

    const newSchool: SchoolRegistration = {
      id: `sch-${Date.now()}`,
      registrationNo,
      name: data.name,
      schoolType: data.schoolType || 'PUBLIC',
      schoolCategory: data.schoolCategory || (data.schoolType === 'PUBLIC' ? 'Public / Government School' : 'Private Mission / Faith-Based'),
      moeRegistrationNo: data.moeRegistrationNo || '',
      country: data.country || 'Nigeria',
      stateProvince: data.stateProvince || '',
      lgaDistrict: data.lgaDistrict || '',
      city: data.city || '',
      schoolAddress: data.schoolAddress || '',
      contactPerson: data.contactPerson || data.adminName || 'School Representative',
      contactRole: data.contactRole || data.adminRole || 'School Principal',
      contactEmail: data.contactEmail || data.adminEmail || '',
      contactPhone: data.contactPhone || data.adminPhone || '',
      secondaryContact: data.secondaryContact || (data.stemCoordinatorName ? `${data.stemCoordinatorName} (${data.stemCoordinatorTitle || 'STEM Lead'}) - ${data.stemCoordinatorPhone || ''}` : ''),
      adminName: data.adminName || data.contactPerson || '',
      adminRole: data.adminRole || data.contactRole || 'School Principal / Headmaster',
      adminEmail: data.adminEmail || data.contactEmail || '',
      adminPhone: data.adminPhone || data.contactPhone || '',
      stemCoordinatorName: data.stemCoordinatorName || '',
      stemCoordinatorTitle: data.stemCoordinatorTitle || 'Head of STEM & Robotics',
      stemCoordinatorEmail: data.stemCoordinatorEmail || '',
      stemCoordinatorPhone: data.stemCoordinatorPhone || '',
      studentCount: Number(data.studentCount) || 500,
      targetGrades: data.targetGrades || ['Junior Secondary (JSS 1-3)'],
      internetType: data.internetType || 'Starlink / Satellite',
      requestedUnits: Number(data.requestedUnits) || 3,
      grantRequested: Boolean(data.grantRequested),
      notes: data.notes || '',
      status: 'PENDING_REVIEW',
      createdAt: new Date().toISOString(),
    };

    getSchoolsStore().unshift(newSchool);

    // Provision a simulated pending hardware box dispatch
    const newBox: StemBoxUnit = {
      id: `box-${Date.now()}`,
      serialNo: `LUT-SBX-${Math.floor(1000 + Math.random() * 9000)}`,
      schoolId: newSchool.id,
      schoolName: newSchool.name,
      status: 'DEPLOYING',
      batteryLevel: 100,
      solarCharging: true,
      activeLlmModel: 'Lutrics Llama-3-8B Kids Edition (Pre-Loading)',
      installedModules: 12,
      studentsReached: 0,
      lastPing: 'Pending Dispatch & Delivery',
    };
    getStemUnitsStore().unshift(newBox);

    return res.json({
      success: true,
      message: 'School registration submitted successfully!',
      school: newSchool,
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process school registration.' });
  }
}
