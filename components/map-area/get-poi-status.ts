import type { OperatingHours } from './types';

// ---------------------------------------------------------------------------
// Status types
// ---------------------------------------------------------------------------

export type POIStatusKey = 'Open' | 'Closed' | 'Closing Soon' | 'Open 24/7';

export type POIStatus = {
  status: POIStatusKey;
  /** Human-readable message, e.g. "Closes at 10:00 PM" */
  message: string;
  /** Hex color value sourced from globals.css design tokens */
  color: string;
};

// ---------------------------------------------------------------------------
// Design-token colors (from styles/globals.css)
// ---------------------------------------------------------------------------
const COLORS: Record<POIStatusKey, string> = {
  'Open 24/7': '#1AA34D',    // --success-500
  'Open':       '#22C55E',   // --success-400
  'Closing Soon': '#DCA900', // --warning-300
  'Closed':     '#FF6B6B',   // --error-400
};

// ---------------------------------------------------------------------------
// Time helpers
// ---------------------------------------------------------------------------

/** Parse "HH:mm" → total minutes from midnight */
function parseMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** Format "HH:mm" → "h:mm AM/PM" */
function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h < 12 ? 'AM' : 'PM';
  const displayHour = h % 12 === 0 ? 12 : h % 12;
  const displayMin = m.toString().padStart(2, '0');
  return `${displayHour}:${displayMin} ${period}`;
}

// ---------------------------------------------------------------------------
// Main function
// ---------------------------------------------------------------------------

/**
 * Returns the current open/closed status for a POI given its OperatingHours
 * records. Uses the local device time (assumed same locale as the POI).
 *
 * "Closing Soon" fires when the POI closes within the next 30 minutes.
 */
export function getPOIStatus(hours: OperatingHours[]): POIStatus {
  if (!hours || hours.length === 0) {
    return {
      status: 'Closed',
      message: 'No hours available',
      color: COLORS['Closed'],
    };
  }

  // Get current local day and time in minutes
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sun, 6 = Sat
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todayRecord = hours.find(h => h.dayOfWeek === dayOfWeek);

  if (!todayRecord) {
    return {
      status: 'Closed',
      message: 'Closed today',
      color: COLORS['Closed'],
    };
  }

  // is24Hours overrides everything
  if (todayRecord.is24Hours) {
    return {
      status: 'Open 24/7',
      message: 'Open 24 hours',
      color: COLORS['Open 24/7'],
    };
  }

  // Explicitly closed day
  if (todayRecord.isClosed) {
    return {
      status: 'Closed',
      message: 'Closed today',
      color: COLORS['Closed'],
    };
  }

  // Both times required for a comparison
  if (!todayRecord.openTime || !todayRecord.closeTime) {
    return {
      status: 'Closed',
      message: 'Hours not set',
      color: COLORS['Closed'],
    };
  }

  const openMinutes  = parseMinutes(todayRecord.openTime);
  const closeMinutes = parseMinutes(todayRecord.closeTime);

  // Before opening
  if (currentMinutes < openMinutes) {
    return {
      status: 'Closed',
      message: `Opens at ${formatTime(todayRecord.openTime)}`,
      color: COLORS['Closed'],
    };
  }

  // After closing
  if (currentMinutes >= closeMinutes) {
    return {
      status: 'Closed',
      message: `Closed at ${formatTime(todayRecord.closeTime)}`,
      color: COLORS['Closed'],
    };
  }

  // Within 30 minutes of closing
  const CLOSING_SOON_THRESHOLD = 30;
  if (closeMinutes - currentMinutes <= CLOSING_SOON_THRESHOLD) {
    return {
      status: 'Closing Soon',
      message: `Closes at ${formatTime(todayRecord.closeTime)}`,
      color: COLORS['Closing Soon'],
    };
  }

  // Open
  return {
    status: 'Open',
    message: `Closes at ${formatTime(todayRecord.closeTime)}`,
    color: COLORS['Open'],
  };
}

// ---------------------------------------------------------------------------
// Day label helper (for rendering the full schedule)
// ---------------------------------------------------------------------------

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getDayLabel(dayOfWeek: number): string {
  return DAY_LABELS[dayOfWeek] ?? `Day ${dayOfWeek}`;
}

/** Format an OperatingHours record into a human-readable schedule string */
export function formatSchedule(record: OperatingHours): string {
  if (record.is24Hours) return 'Open 24 hours';
  if (record.isClosed) return 'Closed';
  if (!record.openTime || !record.closeTime) return 'Hours not set';
  return `${formatTime(record.openTime)} – ${formatTime(record.closeTime)}`;
}
