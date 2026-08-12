import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_DONORS } from '../src/data/initialData.js';
import type { DonorPledge } from '../src/types.js';

declare global {
  var donorsStore: DonorPledge[] | undefined;
}

function getDonorsStore(): DonorPledge[] {
  if (!global.donorsStore) {
    global.donorsStore = [...INITIAL_DONORS];
  }
  return global.donorsStore;
}

export { getDonorsStore };

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const store = getDonorsStore();
    const totalRaised = store.reduce((acc, curr) => acc + (curr.amountPledged || 0), 0);
    const totalDonors = store.length;
    return res.json({
      success: true,
      stats: {
        totalRaisedUsd: totalRaised,
        totalDonorsCount: totalDonors,
        schoolsFundedCount: Math.floor(totalRaised / 1200) + 4,
        studentsImpacted: (Math.floor(totalRaised / 1200) + 4) * 650,
      },
      donors: store,
    });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
