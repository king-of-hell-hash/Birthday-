import confetti from 'canvas-confetti';

/**
 * Luxury Gold & Champagne Confetti Blast
 */
export function fireTastefulConfetti() {
  const goldPalette = ['#D4AF37', '#F3E5AB', '#AA7C11', '#FFFFFF', '#F59E0B', '#FDE68A'];

  // Left cannon
  confetti({
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0.1, y: 0.7 },
    colors: goldPalette,
    ticks: 240,
    gravity: 0.85,
    scalar: 1.1,
  });

  // Right cannon
  confetti({
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 0.9, y: 0.7 },
    colors: goldPalette,
    ticks: 240,
    gravity: 0.85,
    scalar: 1.1,
  });

  // Center star burst
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: goldPalette,
      shapes: ['circle'],
      ticks: 200,
      gravity: 0.9,
    });
  }, 250);
}

/**
 * Grand Finale Fireworks Show
 */
export function triggerFireworksShow(durationMs = 4000) {
  const animationEnd = Date.now() + durationMs;
  const colors = ['#D4AF37', '#FFD700', '#FFFFFF', '#F59E0B', '#FBBF24'];

  const interval: number = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 25 * (timeLeft / durationMs);

    // Random explosions across top half
    confetti({
      particleCount,
      startVelocity: 30,
      spread: 360,
      ticks: 120,
      origin: {
        x: Math.random() * 0.8 + 0.1,
        y: Math.random() * 0.4 + 0.1,
      },
      colors,
      gravity: 0.7,
      scalar: 1.0,
      disableForReducedMotion: true,
    });
  }, 350);

  return () => clearInterval(interval);
}
