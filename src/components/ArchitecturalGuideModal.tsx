import React, { useState } from 'react';
import { X, BookOpen, Ruler, Landmark, Sparkles, Building2, Calendar, Award } from 'lucide-react';
import { Language } from '../types.ts';
import { ARCHITECTURAL_DIMENSIONS, HISTORICAL_CHAPTERS } from '../data/hassanTowerData.ts';

interface ArchitecturalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ArchitecturalGuideModal: React.FC<ArchitecturalGuideModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<string>('genesis_mansur');

  if (!isOpen) return null;

  const t = {
    ar: {
      modalTitle: 'صومعة حسان بالرباط: الدليل المعماري والتاريخي الشامل',
      subtitle: 'دراسة توثيقية مفصلة لتاريخ البناء، الأبعاد الهندسية، والعمارة الموحدية الأندلسية',
      keyMetrics: 'المؤشرات الهندسية الرئيسية',
      tabGenesis: 'تاريخ البناء (1195م)',
      tabDimensions: 'الأبعاد والإنشاء',
      tabStyle: 'الأسلوب المعماري والشبيكة',
      tabHeritage: 'الثالوث الموحدي واليونسكو',
      keyFacts: 'حقائق وأرقام بارزة',
      close: 'إغلاق الدليل',
    },
    fr: {
      modalTitle: 'Tour Hassan de Rabat: Monographie Architecturale et Historique',
      subtitle: 'Étude documentaire détaillée sur la genèse, la métrologie et le style almohade',
      keyMetrics: 'Métriques Architecturales Majeures',
      tabGenesis: 'Genèse et Fondation (1195)',
      tabDimensions: 'Métrologie et Structure',
      tabStyle: 'Style Almohade & Sebka',
      tabHeritage: 'Triade Almohade & UNESCO',
      keyFacts: 'Faits et Repères Clés',
      close: 'Fermer le guide',
    },
    en: {
      modalTitle: 'Hassan Tower Rabat: Complete Architectural & Historical Monograph',
      subtitle: 'Comprehensive study of construction chronology, engineering dimensions, and Almohad heritage',
      keyMetrics: 'Core Engineering Metrics',
      tabGenesis: 'Foundation (1195 CE)',
      tabDimensions: 'Dimensions & Structure',
      tabStyle: 'Almohad Architecture & Sebka',
      tabHeritage: 'Almohad Triad & UNESCO',
      keyFacts: 'Key Historical Facts',
      close: 'Close Guide',
    },
  }[language];

  const currentChapter = HISTORICAL_CHAPTERS.find((c) => c.id === activeTab) || HISTORICAL_CHAPTERS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950/70 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-amber-100 font-['Amiri',serif]">
                {t.modalTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                {t.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 sm:p-4 bg-stone-950/40 border-b border-stone-800">
          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-2.5 text-center">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">
              {language === 'ar' ? 'الارتفاع المنجز' : language === 'fr' ? 'Hauteur réelle' : 'Preserved Height'}
            </div>
            <div className="text-lg sm:text-xl font-black text-amber-400 font-mono">44 m</div>
            <div className="text-[10px] text-stone-500">{language === 'ar' ? 'من 80م المستهدفة' : 'sur 80m projetés'}</div>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-2.5 text-center">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">
              {language === 'ar' ? 'القاعدة المربعة' : language === 'fr' ? 'Base carrée' : 'Square Base'}
            </div>
            <div className="text-lg sm:text-xl font-black text-sky-400 font-mono">16.2 m</div>
            <div className="text-[10px] text-stone-500">{language === 'ar' ? 'نسبة تناغم 1:5' : 'ratio classique 1:5'}</div>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-2.5 text-center">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">
              {language === 'ar' ? 'أعمدة الصلاة' : language === 'fr' ? 'Colonnes' : 'Column Grid'}
            </div>
            <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">348</div>
            <div className="text-[10px] text-stone-500">{language === 'ar' ? 'في 21 بلاطة' : 'en 21 nefs'}</div>
          </div>

          <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-2.5 text-center">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">
              {language === 'ar' ? 'مساحة المجمع' : language === 'fr' ? 'Superficie' : 'Total Area'}
            </div>
            <div className="text-lg sm:text-xl font-black text-purple-400 font-mono">25,437 m²</div>
            <div className="text-[10px] text-stone-500">{language === 'ar' ? '183 × 139 متراً' : '183 × 139 m'}</div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-stone-900/90 border border-stone-800 rounded-xl p-2.5 text-center">
            <div className="text-[10px] text-stone-400 uppercase font-semibold">
              {language === 'ar' ? 'الطاقة الاستيعابية' : language === 'fr' ? 'Capacité' : 'Capacity'}
            </div>
            <div className="text-lg sm:text-xl font-black text-rose-400 font-mono">20,000+</div>
            <div className="text-[10px] text-stone-500">{language === 'ar' ? 'مصلٍ في آن واحد' : 'fidèles simultanés'}</div>
          </div>
        </div>

        {/* Chapter Tabs Navigation */}
        <div className="flex border-b border-stone-800 bg-stone-950/60 overflow-x-auto p-1.5 gap-1.5 scrollbar-thin">
          {HISTORICAL_CHAPTERS.map((ch) => {
            const isSelected = activeTab === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveTab(ch.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-inner'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                {ch.title[language].split(':')[0]}
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Chapter Header */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentChapter.period}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-amber-100 font-['Amiri',serif] mb-2">
              {currentChapter.title[language]}
            </h3>
            <p className="text-sm font-medium text-amber-200/90 bg-amber-500/10 border-l-2 border-r-2 border-amber-500/50 p-3 rounded-lg">
              {currentChapter.summary[language]}
            </p>
          </div>

          {/* Key Facts Grid */}
          <div className="bg-stone-950/50 border border-stone-800 rounded-xl p-4">
            <h4 className="text-xs uppercase font-bold text-stone-400 mb-3 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.keyFacts}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {currentChapter.keyFacts.map((fact, idx) => (
                <div key={idx} className="bg-stone-900 border border-stone-800/90 rounded-lg p-2.5">
                  <div className="text-[11px] text-stone-400 font-medium">
                    {fact.label[language]}
                  </div>
                  <div className="text-xs font-bold text-amber-300 mt-0.5">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Narrative Paragraphs */}
          <div className="space-y-3.5 text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
            {currentChapter.content[language].map((paragraph, pIdx) => (
              <p key={pIdx} className="bg-stone-900/40 p-3 rounded-xl border border-stone-800/50">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Architectural Dimensions Deep-Dive if on dimensions tab */}
          {activeTab === 'architectural_dimensions' && (
            <div className="mt-6 border-t border-stone-800 pt-6">
              <h4 className="text-base font-bold text-amber-200 mb-4 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-sky-400" />
                <span>{language === 'ar' ? 'التفصيل الهندسي المعماري الدقيق' : 'Detailed Metrology Analysis'}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ARCHITECTURAL_DIMENSIONS.map((dim) => (
                  <div key={dim.id} className="bg-stone-950/70 border border-stone-800 rounded-xl p-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center font-mono font-bold text-xs" style={{ color: dim.color }}>
                      {dim.value}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-200">
                        {dim.label[language]}
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">
                        {dim.detail[language]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between">
          <div className="text-xs text-stone-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>{language === 'ar' ? 'موقع اليونسكو للتراث الإنساني العالمي • رقم 1401' : 'UNESCO World Heritage Site No. 1401'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
