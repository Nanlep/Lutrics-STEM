import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_DONORS } from '../../src/data/initialData.js';
import type { DonorPledge } from '../../src/types.js';

declare global {
  var donorsStore: DonorPledge[] | undefined;
}

function getDonorsStore(): DonorPledge[] {
  if (!global.donorsStore) {
    global.donorsStore = [...INITIAL_DONORS];
  }
  return global.donorsStore;
}

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
    if (!data.donorName || !data.email || !data.amountPledged) {
      return res.status(400).json({
        success: false,
        message: 'Missing required donor details (Donor/Organization Name, Email, or Pledge Amount).',
      });
    }

    const newPledge: DonorPledge = {
      id: `pledge-${Date.now()}`,
      donorType: data.donorType || 'INDIVIDUAL',
      donorName: data.isAnonymous ? 'Anonymous STEM Patron' : data.donorName,
      contactPerson: data.contactPerson || data.donorName,
      email: data.email,
      phone: data.phone || '',
      country: data.country || 'Global Patron',
      sponsorshipTier: data.sponsorshipTier || 'ADOPT_A_SCHOOL',
      amountPledged: Number(data.amountPledged) || 1200,
      pledgeType: data.pledgeType || 'ONE_TIME',
      targetSchoolPreference: data.targetSchoolPreference || 'Highest Priority Rural School',
      message: data.message || '',
      isAnonymous: Boolean(data.isAnonymous),
      status: 'PLEDGED',
      createdAt: new Date().toISOString(),
    };

    getDonorsStore().unshift(newPledge);

    return res.json({
      success: true,
      message: 'Thank you for your generous pledge! Our Foundation Grants Secretariat will reach out with payment instructions and tax receipt details.',
      pledge: newPledge,
    });
  } catch (err: any) {
    console.error('Pledge error:', err);
    return res.status(500).json({ success: false, message: 'Failed to process donor pledge.' });
  }
}
