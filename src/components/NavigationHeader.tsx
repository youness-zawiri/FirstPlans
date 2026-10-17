import React from 'react';
import { Volume2, VolumeX, BookOpen, Maximize2, Compass } from 'lucide-react';
import { Language } from '../types.ts';

interface NavigationHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onOpenGuide: () => void;
  onToggleCinemaMode: () => void;
  isCinemaMode: boolean;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  language,
  onLanguageChange,
  isAudioPlaying,
  onToggleAudio,
  onOpenGuide,
  onToggleCinemaMode,
  isCinemaMode,
}) => {
  const titles = {
    ar: {
      title: 'صومعة حسان التاريخية',
      location: 'الرباط، المغرب • 1195 م (591 هـ)',
      badge: 'التراث العالمي لليونسكو',
      guideBtn: 'الدليل المعماري والتاريخي',
      audioOn: 'الصوت التراثي مشغل',
      audioOff: 'كتم الصوت',
      cinema: 'وضع الشاشة الكاملة',
    },
    fr: {
      title: 'Tour Hassan Historique',
      location: 'Rabat, Maroc • 1195 (591 H)',
      badge: 'Patrimoine Mondial UNESCO',
      guideBtn: 'Guide Historique & Architectural',
      audioOn: 'Ambiance sonore activée',
      audioOff: 'Activer le son',
      cinema: 'Plein écran',
    },
    en: {
      title: 'Historic Hassan Tower',
      location: 'Rabat, Morocco • 1195 CE (591 AH)',
      badge: 'UNESCO World Heritage',
      guideBtn: 'Architectural & Historical Guide',
      audioOn: 'Soundscape Active',
      audioOff: 'Mute Audio',
      cinema: 'Cinema Mode',
    },
  }[language];

  if (isCinemaMode) {
    return (
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={onToggleCinemaMode}
          className="px-3.5 py-2 bg-stone-900/90 border border-stone-700/70 text-amber-400 hover:text-amber-300 rounded-lg text-xs font-medium shadow-xl flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'إنهاء وضع السينما' : language === 'fr' ? 'Quitter plein écran' : 'Exit Cinema'}</span>
        </button>
      </div>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-30 pointer-events-none p-3 md:p-5 flex items-start justify-between">
      {/* Title & Heritage Badge */}
      <div className="pointer-events-auto bg-stone-900/90 border border-stone-800/80 rounded-xl p-3 md:p-4 shadow-2xl max-w-sm md:max-w-md">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-amber-100 tracking-wide font-['Amiri',serif]">
              {titles.title}
            </h1>
            <p className="text-[11px] md:text-xs text-stone-400 flex items-center gap-1.5">
              <span>{titles.location}</span>
              <span className="text-stone-600">•</span>
              <span className="text-amber-400/90 font-medium">{titles.badge}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Action Tools: Guide, Audio, Language, Cinema */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Full Guide Button */}
        <button
          onClick={onOpenGuide}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">{titles.guideBtn}</span>
          <span className="sm:hidden">{language === 'ar' ? 'الدليل' : 'Guide'}</span>
        </button>

        {/* Procedural Audio Soundscape Toggle */}
        <button
          onClick={onToggleAudio}
          title={isAudioPlaying ? titles.audioOn : titles.audioOff}
          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
            isAudioPlaying
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-stone-900/90 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Language Switcher */}
        <div className="flex items-center bg-stone-900/90 border border-stone-800 rounded-xl p-1">
          {(['ar', 'fr', 'en'] as Language[]).map((lng) => (
            <button
              key={lng}
              onClick={() => onLanguageChange(lng)}
              className={`px-2 py-1 text-xs rounded-lg uppercase font-bold transition-colors cursor-pointer ${
                language === lng
                  ? 'bg-stone-800 text-amber-400'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {lng}
            </button>
          ))}
        </div>

        {/* Cinema Mode Toggle */}
        <button
          onClick={onToggleCinemaMode}
          title={titles.cinema}
          className="p-2.5 bg-stone-900/90 border border-stone-800 text-stone-400 hover:text-stone-200 rounded-xl transition-all cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
