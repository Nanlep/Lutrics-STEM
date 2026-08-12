/**
 * Google Sheets Logger — fire-and-forget submission forwarding
 *
 * Sends school registrations and donor pledges to the Google Sheets
 * Apps Script endpoint. Failures are logged but never block the API
 * response to keep the user experience fast.
 */

const SHEETS_URL = process.env.GOOGLE_SHEETS_URL || '';

export type SheetSubmissionType = 'school_registration' | 'donor_pledge';

export async function logToGoogleSheets(
  type: SheetSubmissionType,
  payload: Record<string, unknown>,
): Promise<void> {
  if (!SHEETS_URL) {
    console.warn('[Sheets Logger] GOOGLE_SHEETS_URL not configured — skipping Google Sheets logging.');
    return;
  }

  try {
    const response = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, payload }),
    });

    if (!response.ok) {
      console.error(`[Sheets Logger] HTTP ${response.status}: ${await response.text()}`);
    } else {
      const result = await response.json();
      console.log(`[Sheets Logger] ${type} logged:`, result.message);
    }
  } catch (err) {
    // Never let a Sheets error break the main API flow
    console.error('[Sheets Logger] Failed to log to Google Sheets:', err);
  }
}
