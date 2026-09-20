import React, { useState, useEffect } from 'react';
import { birthdayConfig } from './birthdayConfig';
import { BackgroundStars } from './components/BackgroundStars';
import { FloatingBalloons } from './components/FloatingBalloons';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { PersonalMessageSection } from './components/PersonalMessageSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { ReasonsSection } from './components/ReasonsSection';
import { SurpriseSection } from './components/SurpriseSection';
import { BirthdayCakeSection } from './components/BirthdayCakeSection';
import { TimelineSection } from './components/TimelineSection';
import { FinaleSection } from './components/FinaleSection';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [balloonsActive, setBalloonsActive] = useState(false);

  // Set document title dynamically based on config
  useEffect(() => {
    document.title = `Happy Birthday, ${birthdayConfig.name}! 🎂`;
  }, []);

  const handleEnterCelebration = () => {
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
      countdownElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerBalloons = () => {
    setBalloonsActive(true);
    // Keep active for a while or allow repeat
    setTimeout(() => {
      // Allow balloons to float
    }, 12000);
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#07080B] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Loading Screen Animation */}
      {isLoading && (
        <LoadingScreen
          name={birthdayConfig.nickname}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* 2. Deep Midnight Background Stars & Golden Shimmer */}
      <BackgroundStars />

      {/* 3. Floating Animated Balloons */}
      <FloatingBalloons
        active={balloonsActive}
        count={16}
        onPop={() => {}}
      />

      {/* 4. Minimal Floating Navigation & Music Player */}
      <Navbar
        musicFile={birthdayConfig.musicFile}
        recipientName={birthdayConfig.nickname}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-4">
        {/* Section 1: Welcome / Hero Screen */}
        <HeroSection
          name={birthdayConfig.name}
          tagline={birthdayConfig.tagline}
          subtitle={birthdayConfig.heroSubtitle}
          onEnter={handleEnterCelebration}
        />

        {/* Section 2: Birthday Countdown */}
        <CountdownSection
          birthdayDate={birthdayConfig.birthdayDate}
          name={birthdayConfig.nickname}
        />

        {/* Section 3: Personal Birthday Message */}
        <PersonalMessageSection
          name={birthdayConfig.name}
          message={birthdayConfig.birthdayMessage}
        />

        {/* Section 4: Memories / Photo Gallery */}
        <PhotoGallerySection
          photos={birthdayConfig.photos}
          recipientName={birthdayConfig.nickname}
        />

        {/* Section 5: "Reasons You're Special" Section */}
        <ReasonsSection
          reasons={birthdayConfig.reasons}
          name={birthdayConfig.nickname}
        />

        {/* Section 6: Interactive Birthday Surprise */}
        <SurpriseSection
          name={birthdayConfig.nickname}
          surpriseMessage={birthdayConfig.surpriseMessage}
          surpriseSubtitle={birthdayConfig.surpriseSubtitle}
          onOpenSurprise={handleTriggerBalloons}
        />

        {/* Section 8: Birthday Wishes & Interactive Birthday Cake */}
        <BirthdayCakeSection name={birthdayConfig.nickname} />

        {/* Section 9: Timeline / Journey Section */}
        <TimelineSection
          chapters={birthdayConfig.timelineChapters}
          name={birthdayConfig.nickname}
        />

        {/* Section 10: Final Birthday Section (Finale) */}
        <FinaleSection
          name={birthdayConfig.name}
          quote={birthdayConfig.finalWishesQuote}
          signoff={birthdayConfig.finalSignoff}
          onRestart={handleRestart}
          onTriggerBalloons={handleTriggerBalloons}
        />
      </main>

      {/* PWA Offline indicator if user goes offline */}
      <OfflineIndicator />
    </div>
  );
}
