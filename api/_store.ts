import type { VercelRequest, VercelResponse } from '@vercel/node';
import { INITIAL_SCHOOLS, INITIAL_STEM_UNITS } from '../src/data/initialData.js';
import type { SchoolRegistration, StemBoxUnit } from '../src/types.js';

// Shared in-memory stores (reset on each cold start — expected for serverless)
// For persistence across requests within the same instance, we use global scope
declare global {
  var schoolsStore: SchoolRegistration[] | undefined;
  var stemUnitsStore: StemBoxUnit[] | undefined;
}

export function getSchoolsStore(): SchoolRegistration[] {
  if (!global.schoolsStore) {
    global.schoolsStore = [...INITIAL_SCHOOLS];
  }
  return global.schoolsStore;
}

export function getStemUnitsStore(): StemBoxUnit[] {
  if (!global.stemUnitsStore) {
    global.stemUnitsStore = [...INITIAL_STEM_UNITS];
  }
  return global.stemUnitsStore;
}
