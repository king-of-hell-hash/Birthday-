/**
 * Web Audio API Acoustic Birthday Chime Synthesizer
 * Provides an elegant, soothing acoustic music-box / harp melody fallback
 * when an external MP3 file is not yet available, ensuring zero broken audio states.
 */

// Note frequencies in Hz
const NOTE_FREQS: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  Bb4: 466.16,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.00,
  Bb5: 932.33,
  REST: 0,
};

// "Happy Birthday to you" melodic sheet
// [Note, Duration in beats, beat-gap]
const MELODY: Array<[string, number]> = [
  ['C4', 0.75], ['C4', 0.25], ['D4', 1.0], ['C4', 1.0], ['F4', 1.0], ['E4', 2.0],
  ['C4', 0.75], ['C4', 0.25], ['D4', 1.0], ['C4', 1.0], ['G4', 1.0], ['F4', 2.0],
  ['C4', 0.75], ['C4', 0.25], ['C5', 1.0], ['A4', 1.0], ['F4', 1.0], ['E4', 1.0], ['D4', 1.5],
  ['Bb4', 0.75], ['Bb4', 0.25], ['A4', 1.0], ['F4', 1.0], ['G4', 1.0], ['F4', 2.5],
  ['REST', 1.5],
];

export class BirthdayMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isLooping = true;
  private timer: number | null = null;
  private volumeNode: GainNode | null = null;
  private volumeLevel = 0.65;
  private isMuted = false;
  private currentStep = 0;
  private onStateChangeListeners: Array<(isPlaying: boolean) => void> = [];

  constructor() {
    // AudioContext lazily initialized upon first user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.isMuted ? 0 : this.volumeLevel, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (isPlaying: boolean) => void) {
    this.onStateChangeListeners.push(cb);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.onStateChangeListeners.forEach(cb => cb(this.isPlaying));
  }

  public playNote(freq: number, durationSec: number, timeOffset = 0) {
    if (!this.ctx || !this.volumeNode || freq <= 0) return;

    const t = this.ctx.currentTime + timeOffset;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Harmonics for a delicate music box / chime acoustic bell
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, t);

    // Envelope: quick attack, sparkling sustain, gentle decay
    noteGain.gain.setValueAtTime(0.001, t);
    noteGain.gain.exponentialRampToValueAtTime(0.4, t + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.12, t + durationSec * 0.5);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, t + durationSec * 1.4);

    osc.connect(noteGain);
    noteGain.connect(this.volumeNode);

    osc.start(t);
    osc.stop(t + durationSec * 1.5);
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.notify();
    this.stepSequence();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer !== null) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    this.currentStep = 0;
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  private stepSequence() {
    if (!this.isPlaying || !this.ctx) return;

    const item = MELODY[this.currentStep];
    const note = item[0];
    const beats = item[1];
    const beatDurationMs = 520; // gentle, majestic tempo
    const durationMs = beats * beatDurationMs;

    const freq = NOTE_FREQS[note] || 0;
    if (freq > 0) {
      this.playNote(freq, (durationMs / 1000) * 0.95);
      // Secondary subtle shimmer an octave higher
      this.playNote(freq * 2, (durationMs / 1000) * 0.5, 0.015);
    }

    this.timer = window.setTimeout(() => {
      if (!this.isPlaying) return;
      this.currentStep++;
      if (this.currentStep >= MELODY.length) {
        if (this.isLooping) {
          this.currentStep = 0;
          this.stepSequence();
        } else {
          this.stop();
        }
      } else {
        this.stepSequence();
      }
    }, durationMs);
  }

  public setVolume(vol: number) {
    this.volumeLevel = Math.max(0, Math.min(1, vol));
    if (this.volumeNode && this.ctx && !this.isMuted) {
      this.volumeNode.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.isMuted ? 0 : this.volumeLevel, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volumeLevel;
  }
}

// Global singleton instance for app-wide music playback
export const globalMusicEngine = new BirthdayMusicEngine();
