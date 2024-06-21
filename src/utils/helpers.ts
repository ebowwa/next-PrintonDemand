// src/utils/helpers.ts
import type { Tables } from '../../types_db';

type Price = Tables<'prices'>;

export const getURL = (path: string = '') => {
  let base = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
  base = base.trim().replace(/\/+$/, ''); // Ensure no trailing slash
  const formattedPath = path.replace(/^\/+/, ''); // Remove leading slash from path

  // Protocol correction for non-localhost environments
  if (!base.startsWith('http://') && !base.startsWith('https://')) {
    base = `https://${base}`;
  }

  return formattedPath ? `${base}/${formattedPath}` : base;
};

export const postData = async ({
  url,
  data,
}: {
  url: string;
  data?: { price: Price };
}) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin', // Consider the appropriate credentials policy
    body: JSON.stringify(data),
  });

  return res.json();
};

export const toDateTime = (secs: number) => {
  const t = new Date(0); // The zero here is the epoch reference
  t.setSeconds(secs);
  return t;
};

export const calculateTrialEndUnixTimestamp = (trialPeriodDays: number | null | undefined) => {
  if (trialPeriodDays === null || trialPeriodDays === undefined || trialPeriodDays < 2) {
    return undefined; // No valid trial period provided
  }

  const currentDate = new Date();
  const trialEnd = new Date(currentDate.getTime() + (trialPeriodDays + 1) * 24 * 60 * 60 * 1000);
  return Math.floor(trialEnd.getTime() / 1000); // Convert to Unix timestamp
};

const toastKeyMap: { [key: string]: string[] } = {
  status: ['status', 'status_description'],
  error: ['error', 'error_description'],
};

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType];
  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

export const getStatusRedirect = (
  path: string,
  statusName: string,
  statusDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) => getToastRedirect(path, 'status', statusName, statusDescription, disableButton, arbitraryParams);

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
) => getToastRedirect(path, 'error', errorName, errorDescription, disableButton, arbitraryParams);
