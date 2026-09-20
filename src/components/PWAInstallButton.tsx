import React, { useState } from 'react';
import { Download, Share, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        id="pwa-install-btn"
        onClick={install}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 px-3.5 py-1.5 text-xs font-semibold text-slate-950 shadow-md hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 hover:shadow-amber-500/25 active:scale-95"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-install-ios-btn"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200 hover:bg-amber-500/20 transition-all active:scale-95"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>Save to Home Screen</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-[#0e1017] border border-amber-500/30 p-6 shadow-2xl relative text-left">
              <button
                id="close-ios-guide"
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Share className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white font-cinzel">Install on iPhone / iPad</h3>
                  <p className="text-xs text-amber-300/80">Aryan's Birthday Celebration</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-[10px]">1</span>
                  <p>Tap the <strong className="text-white">Share</strong> button (box with an arrow) in Safari's bottom toolbar.</p>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-[10px]">2</span>
                  <p>Scroll down in the share sheet and tap <strong className="text-white">Add to Home Screen</strong>.</p>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-[10px]">3</span>
                  <p>Tap <strong className="text-amber-400">Add</strong> in the top-right corner to launch fullscreen anytime!</p>
                </div>
              </div>

              <button
                id="ios-guide-dismiss"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 py-2.5 text-xs font-semibold text-slate-950 hover:from-amber-400 hover:to-yellow-500 transition-all"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
