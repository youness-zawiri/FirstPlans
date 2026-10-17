import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Camera,
  Sun,
  Moon,
  Sunset,
  CloudFog,
  Layers,
  Ruler,
  RotateCw,
  MapPin,
} from 'lucide-react';
import { CameraViewPreset, Language, TimeOfDay } from '../types.ts';
import { CAMERA_PRESETS } from '../data/hassanTowerData.ts';

interface ControlDockProps {
  language: Language;
  selectedCameraPreset: string;
  onSelectCameraPreset: (preset: CameraViewPreset) => void;
  timeOfDay: TimeOfDay;
  onSelectTimeOfDay: (tod: TimeOfDay) => void;
  isCutawayActive: boolean;
  onToggleCutaway: () => void;
  areDimensionsActive: boolean;
  onToggleDimensions: () => void;
  areHotspotsActive: boolean;
  onToggleHotspots: () => void;
  isAutoRotate: boolean;
  onToggleAutoRotate: () => void;
}

export const ControlDock: React.FC<ControlDockProps> = ({
  language,
  selectedCameraPreset,
  onSelectCameraPreset,
  timeOfDay,
  onSelectTimeOfDay,
  isCutawayActive,
  onToggleCutaway,
  areDimensionsActive,
  onToggleDimensions,
  areHotspotsActive,
  onToggleHotspots,
  isAutoRotate,
  onToggleAutoRotate,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'time' | 'tools'>('camera');

  const t = {
    ar: {
      toggleHide: 'إخفاء لوحة التحكم',
      toggleShow: 'إظهار لوحة التحكم',
      tabCamera: 'زوايا الرؤية',
      tabTime: 'الوقت والإضاءة',
      tabTools: 'الأدوات المعمارية',
      cutaway: 'المنحدر الداخلي (كشف الهيكل)',
      dimensions: 'أبعاد الصومعة الهندسية',
      hotspots: 'المعالم التفاعلية',
      rotate: 'دوران سينمائي',
      timePresets: {
        golden_hour: 'غروب الرباط',
        daylight: 'شمس ساطعة',
        night: 'إضاءة ليلية',
        dawn: 'ضباب الفجر',
      },
    },
    fr: {
      toggleHide: 'Masquer les contrôles',
      toggleShow: 'Afficher les contrôles',
      tabCamera: 'Points de Vue',
      tabTime: 'Atmosphère',
      tabTools: 'Outils',
      cutaway: 'Rampe interne (Écorché)',
      dimensions: 'Cotes et Dimensions',
      hotspots: 'Points d’Intérêt',
      rotate: 'Rotation Auto',
      timePresets: {
        golden_hour: 'Coucher de Soleil',
        daylight: 'Plein Jour',
        night: 'Nocturne',
        dawn: 'Aube Océane',
      },
    },
    en: {
      toggleHide: 'Hide Controls',
      toggleShow: 'Show Controls',
      tabCamera: 'Camera Views',
      tabTime: 'Atmosphere',
      tabTools: 'Tools',
      cutaway: 'Internal Ramp (Cutaway)',
      dimensions: '3D Dimensions',
      hotspots: 'Hotspots',
      rotate: 'Auto Rotate',
      timePresets: {
        golden_hour: 'Golden Sunset',
        daylight: 'Bright Day',
        night: 'Night Illumination',
        dawn: 'Atlantic Dawn',
      },
    },
  }[language];

  return (
    <div
      className="fixed z-30 transition-transform duration-300 ease-out"
      style={{
        bottom: '20px',
        left: '50%',
        transform: `translateX(-50%) ${isCollapsed ? 'translateY(calc(100% + 25px))' : 'translateY(0)'}`,
        maxWidth: 'min(940px, 94vw)',
        width: '100%',
      }}
    >
      {/* Collapse / Expand Tab attached to top edge */}
      <div className="flex justify-center -mb-px">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-t-xl bg-stone-900 border-t border-x border-stone-800 text-stone-300 hover:text-amber-400 text-xs font-semibold shadow-lg transition-colors cursor-pointer"
        >
          {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          <span>{isCollapsed ? t.toggleShow : t.toggleHide}</span>
        </button>
      </div>

      {/* Main Unified Dock Surface (Solid/rgba without backdrop-filter) */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-3 md:p-4 shadow-2xl">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('camera')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'camera'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.tabCamera}</span>
            </button>

            <button
              onClick={() => setActiveTab('time')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'time'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{t.tabTime}</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'tools'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.tabTools}</span>
            </button>
          </div>

          {/* Quick status counters */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] text-stone-400">
            <span className="font-mono text-amber-400">44m</span>
            <span>•</span>
            <span className="font-mono text-sky-400">348 {language === 'ar' ? 'عمود' : 'cols'}</span>
          </div>
        </div>

        {/* Tab 1: Camera Presets */}
        {activeTab === 'camera' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {CAMERA_PRESETS.map((preset) => {
              const isSelected = selectedCameraPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectCameraPreset(preset)}
                  className={`p-2 rounded-xl text-start transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/60 text-amber-200 shadow-inner'
                      : 'bg-stone-800/60 border-stone-700/50 text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold truncate">
                    {preset.name[language]}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: Time of Day & Atmosphere */}
        {activeTab === 'time' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(
              [
                { id: 'golden_hour', icon: Sunset, label: t.timePresets.golden_hour },
                { id: 'daylight', icon: Sun, label: t.timePresets.daylight },
                { id: 'night', icon: Moon, label: t.timePresets.night },
                { id: 'dawn', icon: CloudFog, label: t.timePresets.dawn },
              ] as const
            ).map((item) => {
              const Icon = item.icon;
              const isSelected = timeOfDay === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTimeOfDay(item.id)}
                  className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                      : 'bg-stone-800/60 border-stone-700/50 text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 3: Architectural Tools */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Cutaway / Internal Ramp */}
            <button
              onClick={onToggleCutaway}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isCutawayActive
                  ? 'bg-amber-600/30 border-amber-500 text-amber-200 shadow-md'
                  : 'bg-stone-800/60 border-stone-700/50 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>{t.cutaway}</span>
            </button>

            {/* 3D Dimensions */}
            <button
              onClick={onToggleDimensions}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                areDimensionsActive
                  ? 'bg-sky-600/30 border-sky-400 text-sky-200 shadow-md'
                  : 'bg-stone-800/60 border-stone-700/50 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <Ruler className="w-4 h-4 text-sky-400" />
              <span>{t.dimensions}</span>
            </button>

            {/* Hotspots Toggle */}
            <button
              onClick={onToggleHotspots}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                areHotspotsActive
                  ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200 shadow-md'
                  : 'bg-stone-800/60 border-stone-700/50 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{t.hotspots}</span>
            </button>

            {/* Auto Rotate Toggle */}
            <button
              onClick={onToggleAutoRotate}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isAutoRotate
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                  : 'bg-stone-800/60 border-stone-700/50 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <RotateCw className="w-4 h-4 text-amber-400" />
              <span>{t.rotate}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
