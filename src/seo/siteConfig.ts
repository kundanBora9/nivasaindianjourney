export const SITE_URL = 'https://nivasaindiajourney.com';
export const SITE_NAME = 'Nivasa India Journey';
export const SITE_PHONE = '+918126716179';
export const SITE_EMAIL = 'contact@nivasaindiajourney.com';
export const DEFAULT_OG_IMAGE = '/og-default.jpg';
export const LOGO_PATH = '/assets/aistudio/image_d6df1cf1.png';

export const absUrl = (pathOrUrl: string): string => {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
};
