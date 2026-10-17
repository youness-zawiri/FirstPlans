export type Language = 'ar' | 'fr' | 'en';

export type TimeOfDay = 'golden_hour' | 'daylight' | 'night' | 'dawn';

export interface CameraViewPreset {
  id: string;
  name: { ar: string; fr: string; en: string };
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
}

export interface ArchitecturalDimension {
  id: string;
  label: { ar: string; fr: string; en: string };
  value: string;
  detail: { ar: string; fr: string; en: string };
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

export interface Hotspot {
  id: string;
  title: { ar: string; fr: string; en: string };
  subtitle: { ar: string; fr: string; en: string };
  description: { ar: string; fr: string; en: string };
  architecturalDetails: { ar: string; fr: string; en: string }[];
  position: [number, number, number];
  category: 'tower' | 'columns' | 'history' | 'mausoleum' | 'fountain';
}

export interface HistoricalChapter {
  id: string;
  title: { ar: string; fr: string; en: string };
  period: string;
  summary: { ar: string; fr: string; en: string };
  content: { ar: string[]; fr: string[]; en: string[] };
  keyFacts: { label: { ar: string; fr: string; en: string }; value: string }[];
}
