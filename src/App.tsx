/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { CameraViewPreset, Hotspot, Language, TimeOfDay } from './types.ts';
import { SceneManager } from './scene/SceneManager.ts';
import { MoroccanSoundscape } from './utils/audioSynthesizer.ts';
import { NavigationHeader } from './components/NavigationHeader.tsx';
import { ControlDock } from './components/ControlDock.tsx';
import { HotspotOverlay } from './components/HotspotOverlay.tsx';
import { ArchitecturalGuideModal } from './components/ArchitecturalGuideModal.tsx';
import { CAMERA_PRESETS, HOTSPOTS } from './data/hassanTowerData.ts';

export default function App() {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);
  const soundscapeRef = useRef<MoroccanSoundscape | null>(null);

  // App UI State
  const [language, setLanguage] = useState<Language>('ar');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);

  // 3D Scene Controls State
  const [selectedCameraPreset, setSelectedCameraPreset] = useState<string>('overview');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('golden_hour');
  const [isCutawayActive, setIsCutawayActive] = useState(false);
  const [areDimensionsActive, setAreDimensionsActive] = useState(false);
  const [areHotspotsActive, setAreHotspotsActive] = useState(true);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  // Screen Projected Hotspots
  const [screenHotspots, setScreenHotspots] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([]);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string | null>(null);

  // Initialize Three.js scene once on mount
  useEffect(() => {
    if (!canvasMountRef.current) return;

    soundscapeRef.current = new MoroccanSoundscape();

    const sceneManager = new SceneManager({
      container: canvasMountRef.current,
      onHotspotsUpdate: (positions) => {
        setScreenHotspots(positions);
      },
    });

    sceneManagerRef.current = sceneManager;

    // Register hotspot world positions for 2D screen tracking
    sceneManager.setHotspotWorldPositions(
      HOTSPOTS.map((h) => ({ id: h.id, pos: h.position }))
    );

    // Keyboard shortcuts for enhanced desktop UX
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'm' || e.key === 'M') {
        if (soundscapeRef.current) {
          const playing = soundscapeRef.current.toggle();
          setIsAudioPlaying(playing);
        }
      } else if (e.key === 'g' || e.key === 'G') {
        setIsGuideOpen((prev) => !prev);
      } else if (e.key === 'r' || e.key === 'R') {
        setIsAutoRotate((prev) => {
          const next = !prev;
          sceneManager.setAutoRotate(next);
          return next;
        });
      } else if (e.key === 'Escape') {
        setSelectedHotspotId(null);
        setIsGuideOpen(false);
        setIsCinemaMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (soundscapeRef.current) {
        soundscapeRef.current.stop();
      }
      sceneManager.destroy();
    };
  }, []);

  // Update HTML document direction and language
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Handle camera view preset selection
  const handleSelectCameraPreset = (preset: CameraViewPreset) => {
    setSelectedCameraPreset(preset.id);
    if (sceneManagerRef.current) {
      sceneManagerRef.current.flyToPreset(preset.position, preset.target, preset.fov);
    }
  };

  // Handle time of day atmospheric shift
  const handleSelectTimeOfDay = (tod: TimeOfDay) => {
    setTimeOfDay(tod);
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setTimeOfDay(tod);
    }
  };

  // Toggle internal equestrian ramp inspection mode
  const handleToggleCutaway = () => {
    const nextState = !isCutawayActive;
    setIsCutawayActive(nextState);
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setCutaway(nextState);
      if (nextState) {
        // Fly to close-up to inspect the ramp
        sceneManagerRef.current.flyToPreset([-12, 22, 16], [0, 20, 0], 48);
      }
    }
  };

  // Toggle 3D architectural dimension lines
  const handleToggleDimensions = () => {
    const nextState = !areDimensionsActive;
    setAreDimensionsActive(nextState);
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setDimensionsVisible(nextState);
    }
  };

  // Toggle hotspots visibility
  const handleToggleHotspots = () => {
    setAreHotspotsActive(!areHotspotsActive);
    if (areHotspotsActive) {
      setSelectedHotspotId(null);
    }
  };

  // Toggle auto-rotation
  const handleToggleAutoRotate = () => {
    const next = !isAutoRotate;
    setIsAutoRotate(next);
    if (sceneManagerRef.current) {
      sceneManagerRef.current.setAutoRotate(next);
    }
  };

  // Toggle procedural audio
  const handleToggleAudio = () => {
    if (soundscapeRef.current) {
      const playing = soundscapeRef.current.toggle();
      setIsAudioPlaying(playing);
    }
  };

  // Focus on a specific 3D hotspot landmark
  const handleFocusHotspot = (hotspot: Hotspot) => {
    if (sceneManagerRef.current) {
      const [hx, hy, hz] = hotspot.position;
      const camPos: [number, number, number] = [hx - 12, hy + 8, hz + 14];
      sceneManagerRef.current.flyToPreset(camPos, [hx, hy, hz], 45);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-stone-950 font-['Tajawal',sans-serif]">
      {/* 3D WebGL Canvas Container: isolated from React re-renders */}
      <div
        ref={canvasMountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Navigation Header & Badge */}
      <NavigationHeader
        language={language}
        onLanguageChange={setLanguage}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        onOpenGuide={() => setIsGuideOpen(true)}
        onToggleCinemaMode={() => setIsCinemaMode(!isCinemaMode)}
        isCinemaMode={isCinemaMode}
      />

      {/* Interactive 3D Hotspot Pins & Card */}
      {!isCinemaMode && (
        <HotspotOverlay
          language={language}
          screenPositions={screenHotspots}
          selectedHotspotId={selectedHotspotId}
          onSelectHotspot={setSelectedHotspotId}
          onFocusHotspot={handleFocusHotspot}
          visible={areHotspotsActive}
        />
      )}

      {/* Unified Bottom Control Dock (Consolidated controls, zero side occlusion) */}
      {!isCinemaMode && (
        <ControlDock
          language={language}
          selectedCameraPreset={selectedCameraPreset}
          onSelectCameraPreset={handleSelectCameraPreset}
          timeOfDay={timeOfDay}
          onSelectTimeOfDay={handleSelectTimeOfDay}
          isCutawayActive={isCutawayActive}
          onToggleCutaway={handleToggleCutaway}
          areDimensionsActive={areDimensionsActive}
          onToggleDimensions={handleToggleDimensions}
          areHotspotsActive={areHotspotsActive}
          onToggleHotspots={handleToggleHotspots}
          isAutoRotate={isAutoRotate}
          onToggleAutoRotate={handleToggleAutoRotate}
        />
      )}

      {/* Full Architectural & Historical Guide Modal */}
      <ArchitecturalGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        language={language}
      />
    </div>
  );
}
