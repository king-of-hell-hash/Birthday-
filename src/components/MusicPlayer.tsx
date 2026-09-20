import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { globalMusicEngine } from '../utils/audioSynth';

interface MusicPlayerProps {
  musicFile: string;
  recipientName: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicFile,
  recipientName,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [audioSource, setAudioSource] = useState<'file' | 'synth'>('synth');
  const [fileProgress, setFileProgress] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Subscribe to synth engine updates
  useEffect(() => {
    const unsub = globalMusicEngine.subscribe(playing => {
      if (audioSource === 'synth') {
        setIsPlaying(playing);
      }
    });
    return unsub;
  }, [audioSource]);

  // Attempt to load file on mount, fallback to synth if not reachable
  useEffect(() => {
    const audio = new Audio();
    audio.src = musicFile;
    audio.preload = 'auto';

    audio.addEventListener('canplaythrough', () => {
      setAudioSource('file');
      audioRef.current = audio;
    });

    audio.addEventListener('error', () => {
      // Graceful fallback to acoustic synth music box
      setAudioSource('synth');
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        setFileProgress((audio.currentTime / audio.duration) * 100);
      }
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setFileProgress(0);
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [musicFile]);

  const togglePlay = () => {
    if (audioSource === 'file' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If browser blocks or file failed, switch to synth
            setAudioSource('synth');
            globalMusicEngine.start();
            setIsPlaying(true);
          });
      }
    } else {
      const active = globalMusicEngine.toggle();
      setIsPlaying(active);
    }
  };

  const toggleMute = () => {
    if (audioSource === 'file' && audioRef.current) {
      const nextMuted = !isMuted;
      audioRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    } else {
      const nextMuted = globalMusicEngine.toggleMute();
      setIsMuted(nextMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioSource === 'file' && audioRef.current) {
      audioRef.current.volume = val;
    } else {
      globalMusicEngine.setVolume(val);
    }
    if (val === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };

  return (
    <div className="relative group">
      {/* Mini Floating Music Capsule */}
      <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0d0f17]/90 border border-amber-500/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        {/* Animated Music Indicator */}
        <button
          id="music-play-toggle"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
              : 'bg-white/10 text-amber-300 hover:bg-white/20'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Track / Audio Status */}
        <div
          className="flex flex-col cursor-pointer select-none"
          onClick={() => setShowTooltip(prev => !prev)}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-200 tracking-wide font-cinzel">
              {isPlaying ? 'Birthday Melody' : 'Play Music'}
            </span>
            {isPlaying && (
              <span className="flex items-end gap-[2px] h-3 w-3">
                <span className="w-[2px] h-full bg-amber-400 animate-pulse" />
                <span className="w-[2px] h-2 bg-amber-300 animate-pulse delay-75" />
                <span className="w-[2px] h-2.5 bg-yellow-400 animate-pulse delay-150" />
              </span>
            )}
          </div>
          <span className="text-[9px] text-amber-400/80 uppercase tracking-widest font-mono">
            {audioSource === 'synth' ? 'Music Box Chime' : 'Audio Track'}
          </span>
        </div>

        {/* Volume & Mute */}
        <div className="flex items-center gap-1.5 pl-1 border-l border-white/10">
          <button
            id="music-mute-toggle"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            className="p-1 text-slate-400 hover:text-amber-300 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400/80" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Volume slider (desktop & hover) */}
          <input
            id="music-volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="hidden sm:block w-14 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>
      </div>

      {/* Info Tooltip on click */}
      {showTooltip && (
        <div className="absolute right-0 top-full mt-2 w-64 p-3 rounded-xl bg-[#0f111a] border border-amber-500/30 text-[11px] text-slate-300 shadow-2xl z-50 animate-fade-in">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Audio Configuration</span>
          </div>
          <p className="text-slate-400 mb-2">
            Currently playing: <strong className="text-slate-200">{audioSource === 'synth' ? 'Harmonic Music-Box Synthesizer' : musicFile}</strong>.
          </p>
          <p className="text-[10px] text-slate-500">
            To replace with custom audio, place an MP3 at <code className="text-amber-300">{musicFile}</code> in the project or edit <code className="text-amber-300">src/birthdayConfig.ts</code>.
          </p>
        </div>
      )}
    </div>
  );
};
