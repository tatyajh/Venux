/**
 * VENUX - Plan Limits & Feature Constants
 */

export const MEMBERSHIP_TIERS = {
  FREE: 'free',
  PRO: 'pro',
  PREMIUM: 'premium',
};

export const PLAN_LIMITS = {
  free: {
    nearbyChats: 50,
    albums: 2,
    mediaPerAlbum: 5,
    videosPerAlbum: 1,
    blockLimit24h: 5,
    publicChatMinutes24h: 60,
    advancedFilters: false,
    voiceNotes: false,
    ephemeralMedia: false,
    appearOffline: false,
    seesAds: true,
  },
  pro: {
    nearbyChats: 300,
    albums: 4,
    mediaPerAlbum: 10,
    videosPerAlbum: 10,
    blockLimit24h: Infinity,
    publicChatMinutes24h: null,
    advancedFilters: true,
    voiceNotes: true,
    ephemeralMedia: false,
    appearOffline: true,
    seesAds: false,
  },
  premium: {
    nearbyChats: Infinity,
    albums: 6,
    mediaPerAlbum: 10,
    videosPerAlbum: 10,
    blockLimit24h: Infinity,
    publicChatMinutes24h: null,
    advancedFilters: true,
    voiceNotes: true,
    ephemeralMedia: true,
    appearOffline: true,
    seesAds: false,
  },
};

export const FEATURES = {
  VIDEO_MAX_DURATION_SECONDS: 15,
  ALBUM_NAME_MAX_LENGTH: 24,
  PROFILE_NAME_MAX_LENGTH: 14,
  PROFILE_BIO_MAX_LENGTH: 183,
  PUBLIC_CHAT_CAPACITY: 100,
  OTP_TIMEOUT_SECONDS: 60,
  MAX_DISTANCE_KM: 100,
};

export const CHAT_ROOMS = {
  COUPLES: 'couples',
  SINGLES_WOMEN: 'singles_women',
  MIXED: 'mixed',
};

export const PROFILE_TYPES = {
  MUJER: 'mujer',
  HOMBRE: 'hombre',
  PAREJA: 'pareja',
};
