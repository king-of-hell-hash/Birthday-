export interface PhotoItem {
  id: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  caption: string;
  date?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface ReasonItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ChapterItem {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  accent: string;
}

export interface GuestWish {
  id: string;
  author: string;
  message: string;
  timestamp: string;
  avatarSeed?: string;
}

export interface BirthdayConfig {
  name: string;
  nickname: string;
  birthYear?: number;
  birthdayDate: string; // "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss"
  tagline: string;
  heroSubtitle: string;
  birthdayMessage: string;
  musicFile: string;
  photos: PhotoItem[];
  reasons: ReasonItem[];
  timelineChapters: ChapterItem[];
  surpriseMessage: string;
  surpriseSubtitle: string;
  finalWishesQuote: string;
  finalSignoff: string;
}
