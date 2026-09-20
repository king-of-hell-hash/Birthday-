import { BirthdayConfig } from './types';

/**
 * =========================================================================
 * 🎂 ARYAN SALEEM BIRTHDAY CONFIGURATION
 * =========================================================================
 * Modify this single configuration file to customize Aryan's celebration.
 * All sections throughout the website will automatically sync with these values.
 */
export const birthdayConfig: BirthdayConfig = {
  // Primary Recipient details
  name: "Aryan Saleem",
  nickname: "Aryan",
  birthYear: 2004,

  // Set the target birthday date (YYYY-MM-DD or ISO timestamp).
  // Tip: You can adjust this to today or any future date.
  birthdayDate: "2026-09-20T00:00:00",

  tagline: "A Special Day Has Arrived...",
  heroSubtitle: "Today isn't just another day...\nIt's the day the world became a little brighter because you were born.",

  // The heartfelt personal birthday message
  birthdayMessage: `Dear Aryan,

Today is your special day, and I hope it brings you everything that makes you smile. May this new year of your life be filled with happiness, success, unforgettable memories, and people who genuinely care about you.

Keep smiling, keep dreaming, and keep being the amazing person you are.

May every new chapter bring you closer to your dreams.

Happy Birthday, Aryan Saleem! ❤️🎂`,

  // Local audio file path or external stream URL.
  // The built-in music player also includes a fallback ambient music-box chime synthesizer!
  musicFile: "/assets/birthday-song.mp3",

  // Memories & Photo Gallery
  photos: [
    {
      id: "p1",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      title: "Radiant Smile",
      caption: "That genuine smile that effortlessly lights up every single room.",
      aspectRatio: "portrait",
    },
    {
      id: "p2",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
      title: "Confidence & Style",
      caption: "Always carrying yourself with calm poise, charm, and authenticity.",
      aspectRatio: "portrait",
    },
    {
      id: "p3",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      title: "Golden Brotherhood",
      caption: "Unmatched bonds, endless banter, and memories that will last a lifetime.",
      aspectRatio: "landscape",
    },
    {
      id: "p4",
      url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80",
      title: "Unforgettable Nights",
      caption: "Celebrating big milestones under the twinkling city skyline.",
      aspectRatio: "landscape",
    },
    {
      id: "p5",
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
      title: "Chasing Horizons",
      caption: "Big dreams, bold moves, and never settling for anything ordinary.",
      aspectRatio: "landscape",
    },
    {
      id: "p6",
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
      title: "Pure Joy",
      caption: "May your upcoming year be packed with this kind of unadulterated happiness.",
      aspectRatio: "portrait",
    }
  ],

  // 6 Animated Qualities / "Reasons You're Special"
  reasons: [
    {
      id: "r1",
      icon: "HeartHandshake",
      title: "Your Kindness",
      description: "You have a natural warmth that makes everyone around you feel valued, respected, and heard without trying.",
    },
    {
      id: "r2",
      icon: "Sparkles",
      title: "Your Smile",
      description: "An infectious, uplifting energy that turns ordinary moments into unforgettable memories.",
    },
    {
      id: "r3",
      icon: "Compass",
      title: "Your Confidence",
      description: "A calm, grounded self-assurance that inspires trust and leads with quiet strength.",
    },
    {
      id: "r4",
      icon: "Users",
      title: "Your Friendship",
      description: "Loyal through thick and thin, always ready to back your people with sincerity and loyalty.",
    },
    {
      id: "r5",
      icon: "Flame",
      title: "Your Unforgettable Personality",
      description: "A rare mix of humor, sharp wit, ambition, and deep emotional intelligence.",
    },
    {
      id: "r6",
      icon: "Camera",
      title: "The Memories You Create",
      description: "Wherever you go, laughter follows, turning every gathering into an adventure worth remembering.",
    },
  ],

  // Timeline / Journey Chapters
  timelineChapters: [
    {
      number: 1,
      title: "Chapter 1 — Memories",
      subtitle: "The Foundations of Gold",
      description: "Beautiful moments from the past that shaped the character, resilience, and heart of who you are today.",
      quote: "Cherish the moments that started the journey.",
      accent: "from-amber-400/20 to-yellow-600/10",
    },
    {
      number: 2,
      title: "Chapter 2 — Growth",
      subtitle: "Wisdom & Grit",
      description: "Everything learned along the way. Navigating challenges with elegance, gaining strength with each passing season.",
      quote: "Strength isn't given; it is earned quietly.",
      accent: "from-yellow-400/20 to-amber-700/10",
    },
    {
      number: 3,
      title: "Chapter 3 — Dreams",
      subtitle: "The Rising Ambition",
      description: "Goals and ambitions for the future. The bold vision taking shape as you step toward greatness.",
      quote: "Dream without limits; execute with relentless focus.",
      accent: "from-amber-300/20 to-yellow-500/10",
    },
    {
      number: 4,
      title: "Chapter 4 — The Future",
      subtitle: "Unwritten Greatness",
      description: "A brand new year full of endless possibilities, boundless triumphs, and triumphs waiting to be claimed.",
      quote: "The best chapters of your life are still ahead.",
      accent: "from-yellow-500/25 to-amber-400/15",
    },
  ],

  // Surprise Details
  surpriseMessage: "Happy Birthday, Aryan! 🎉❤️",
  surpriseSubtitle: "Here is to another spectacular year of crushing goals, creating stories, and shining bright.",

  // Finale Quote & Signoff
  finalWishesQuote: "May your smile never fade,\nyour dreams never stop,\nand your best days always be ahead of you.",
  finalSignoff: "With lots of love & best wishes ❤️",
};
