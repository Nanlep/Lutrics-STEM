import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getStemUnitsStore } from './_store.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.json({ success: true, units: getStemUnitsStore() });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
