import React from 'react';
import { MapPin, X, ArrowUpRight, Compass } from 'lucide-react';
import { Hotspot, Language } from '../types.ts';
import { HOTSPOTS } from '../data/hassanTowerData.ts';

interface HotspotOverlayProps {
  language: Language;
  screenPositions: { id: string; x: number; y: number; visible: boolean }[];
  selectedHotspotId: string | null;
  onSelectHotspot: (id: string | null) => void;
  onFocusHotspot: (hotspot: Hotspot) => void;
  visible: boolean;
}

export const HotspotOverlay: React.FC<HotspotOverlayProps> = ({
  language,
  screenPositions,
  selectedHotspotId,
  onSelectHotspot,
  onFocusHotspot,
  visible,
}) => {
  if (!visible) return null;

  const selectedHotspot = HOTSPOTS.find((h) => h.id === selectedHotspotId);

  const t = {
    ar: {
      zoom: 'التركيز على هذا المعلم',
      close: 'إغلاق',
      details: 'الخصائص المعمارية',
    },
    fr: {
      zoom: 'Cadrer sur ce lieu',
      close: 'Fermer',
      details: 'Caractéristiques architecturales',
    },
    en: {
      zoom: 'Focus on Landmark',
      close: 'Close',
      details: 'Architectural Details',
    },
  }[language];

  return (
    <>
      {/* 3D-projected Pin Markers */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {screenPositions.map((item) => {
          if (!item.visible) return null;
          const hotspot = HOTSPOTS.find((h) => h.id === item.id);
          if (!hotspot) return null;
          const isSelected = selectedHotspotId === item.id;

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                left: `${item.x}px`,
                top: `${item.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="pointer-events-auto"
            >
              <button
                onClick={() => onSelectHotspot(isSelected ? null : item.id)}
                className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border shadow-xl transition-transform active:scale-90 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-300 scale-110 font-bold'
                    : 'bg-stone-900/90 border-amber-500/50 text-amber-300 hover:bg-stone-800 hover:scale-105'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="text-[11px] font-semibold max-w-[120px] truncate">
                  {hotspot.title[language]}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Hotspot Detail Card (Bottom or Corner) */}
      {selectedHotspot && (
        <div className="fixed top-20 right-4 z-40 max-w-sm w-[calc(100vw-32px)] bg-stone-900/95 border border-stone-700/80 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-start justify-between gap-3 border-b border-stone-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-100 font-['Amiri',serif]">
                  {selectedHotspot.title[language]}
                </h3>
                <p className="text-[11px] text-amber-400/90 font-medium">
                  {selectedHotspot.subtitle[language]}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectHotspot(null)}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed mb-3">
            {selectedHotspot.description[language]}
          </p>

          <div className="bg-stone-950/60 rounded-xl p-2.5 mb-3 border border-stone-800">
            <h4 className="text-[10px] uppercase font-bold text-stone-400 mb-1.5 tracking-wider">
              {t.details}
            </h4>
            <ul className="space-y-1">
              {selectedHotspot.architecturalDetails.map((detail, idx) => (
                <li key={idx} className="text-[11px] text-stone-300 flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{detail[language]}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onFocusHotspot(selectedHotspot)}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <span>{t.zoom}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
};
