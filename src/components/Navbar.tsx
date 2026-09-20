import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Gift, MessageSquareHeart, Image, Cake, Flame, Trophy, Heart } from 'lucide-react';
import { MusicPlayer } from './MusicPlayer';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  musicFile: string;
  recipientName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ musicFile, recipientName }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'countdown', label: 'Countdown', icon: Flame },
    { id: 'message', label: 'Message', icon: MessageSquareHeart },
    { id: 'memories', label: 'Memories', icon: Image },
    { id: 'reasons', label: 'Special Qualities', icon: Trophy },
    { id: 'surprise', label: 'Surprise', icon: Gift },
    { id: 'wishes', label: 'Wishes', icon: Cake },
    { id: 'timeline', label: 'Journey', icon: Sparkles },
    { id: 'finale', label: 'Finale', icon: Heart },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Check which section is in view
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Floating Glass Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-2.5 bg-[#07080b]/85 backdrop-blur-xl border-b border-amber-500/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo / Monogram */}
          <button
            id="nav-logo-btn"
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 font-bold font-cinzel text-base shadow-md group-hover:shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xs font-bold tracking-wider text-slate-100 group-hover:text-amber-300 transition-colors">
                ARYAN SALEEM
              </span>
              <span className="text-[9px] tracking-widest text-amber-400/75 uppercase font-medium">
                Celebration
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1 backdrop-blur-md">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-amber-400/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: PWA & Music & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <PWAInstallButton />
            <MusicPlayer musicFile={musicFile} recipientName={recipientName} />

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-amber-300 hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0c0e15]/95 backdrop-blur-2xl border-b border-amber-500/20 p-4 shadow-2xl animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    id={`mobile-nav-${link.id}`}
                    onClick={() => scrollTo(link.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Quick Bar for Fast Thumb Access */}
      <div className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm rounded-full bg-[#0d0f17]/90 border border-amber-500/30 backdrop-blur-xl px-4 py-2 flex items-center justify-around shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        <button
          onClick={() => scrollTo('hero')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${activeSection === 'hero' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => scrollTo('message')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${activeSection === 'message' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          <MessageSquareHeart className="w-4 h-4" />
          <span>Letter</span>
        </button>
        <button
          onClick={() => scrollTo('surprise')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${activeSection === 'surprise' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          <Gift className="w-4 h-4" />
          <span>Gift</span>
        </button>
        <button
          onClick={() => scrollTo('wishes')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${activeSection === 'wishes' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          <Cake className="w-4 h-4" />
          <span>Wish</span>
        </button>
        <button
          onClick={() => scrollTo('finale')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${activeSection === 'finale' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          <Heart className="w-4 h-4" />
          <span>Finale</span>
        </button>
      </div>
    </>
  );
};
