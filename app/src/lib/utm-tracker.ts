export interface UTMData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;

  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;

  landing_page: string;
  referrer: string | null;

  first_visit: string;
  last_visit: string;
}

const UTM_STORAGE_KEY = "shalimar_utm_data";

const UTM_PARAMETERS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
] as const;

type UTMParameter = (typeof UTM_PARAMETERS)[number];

function getStoredUTMData(): UTMData | null {
  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);

    return stored ? (JSON.parse(stored) as UTMData) : null;
  } catch {
    return null;
  }
}

/**
 * Capture UTM parameters when a visitor opens the website.
 * Call this once when the application initializes.
 */
export function captureUTMData(): UTMData | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);

  const campaignData: Partial<Record<UTMParameter, string>> = {};

  UTM_PARAMETERS.forEach((key) => {
    const value = params.get(key)?.trim();

    if (value) {
      campaignData[key] = value;
    }
  });

  const existing = getStoredUTMData();
  const hasCampaignData = Object.keys(campaignData).length > 0;

  const now = new Date().toISOString();

  // No existing attribution and no campaign parameters.
  if (!existing && !hasCampaignData) {
    const initialData: UTMData = {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      gclid: null,
      fbclid: null,
      msclkid: null,
      landing_page: window.location.href,
      referrer: document.referrer || null,
      first_visit: now,
      last_visit: now,
    };

    localStorage.setItem(
      UTM_STORAGE_KEY,
      JSON.stringify(initialData)
    );

    return initialData;
  }

  // Update attribution only when campaign parameters are present.
  if (hasCampaignData) {
    const updatedData: UTMData = {
      ...existing,
      ...campaignData,
      landing_page: existing?.landing_page || window.location.href,
      referrer: existing?.referrer ?? document.referrer ?? null,
      first_visit: existing?.first_visit || now,
      last_visit: now,
    };

    localStorage.setItem(
      UTM_STORAGE_KEY,
      JSON.stringify(updatedData)
    );

    return updatedData;
  }

  // Existing attribution: preserve it across internal navigation.
  if (existing) {
    return existing;
  }

  return null;
}

/**
 * Retrieve the stored attribution data.
 */
export function getUTMData(): UTMData | null {
  if (typeof window === "undefined") return null;

  return getStoredUTMData();
}

/**
 * Clear stored attribution data.
 */
export function clearUTMData(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(UTM_STORAGE_KEY);
}