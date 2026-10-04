import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { LIFE_CYCLE_STAGES, LifeCycleStage } from '../types';
import { LifeCycleStageSvg } from './Illustrations';

interface StationALifeCycleProps {
  isCompleted: boolean;
  onComplete: () => void;
  onNavigateHome: () => void;
  onNavigateNext: () => void;
  onMascotSay: (text: string, mood?: 'happy' | 'encouraging' | 'celebrating') => void;
}

// Initial scrambled order so students actively sequence the 7 icons
const SCRAMBLED_IDS = [
  'flower',
  'seed',
  'seed_pod',
  'seedling',
  'pollination',
  'sprout_root',
  'leafy_plant'
];

export const StationALifeCycle: React.FC<StationALifeCycleProps> = ({
  isCompleted,
  onComplete,
  onNavigateHome,
  onNavigateNext,
  onMascotSay
}) => {
  // slots[0..6] holds the placed stageId or null
  const [slots, setSlots] = useState<(string | null)[]>(() =>
    isCompleted ? LIFE_CYCLE_STAGES.map((s) => s.id) : Array(7).fill(null)
  );
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [draggedStageId, setDraggedStageId] = useState<string | null>(null);
  const [lastInspectedStage, setLastInspectedStage] = useState<LifeCycleStage>(LIFE_CYCLE_STAGES[0]);

  const placedIds = new Set(slots.filter(Boolean) as string[]);

  const checkAllCorrect = (nextSlots: (string | null)[]) => {
    return nextSlots.every((stageId, idx) => stageId === LIFE_CYCLE_STAGES[idx].id);
  };

  const placeStageInSlot = (stageId: string, slotIdx: number) => {
    const stageObj = LIFE_CYCLE_STAGES.find((s) => s.id === stageId);
    if (stageObj) {
      setLastInspectedStage(stageObj);
    }

    const nextSlots = [...slots];
    // If stageId was already in another slot, clear that old slot
    const existingIdx = nextSlots.indexOf(stageId);
    if (existingIdx !== -1) {
      nextSlots[existingIdx] = null;
    }

    nextSlots[slotIdx] = stageId;
    setSlots(nextSlots);
    setSelectedStageId(null);

    const expectedStage = LIFE_CYCLE_STAGES[slotIdx];
    if (stageId === expectedStage.id) {
      if (checkAllCorrect(nextSlots)) {
        onMascotSay('Brilliant! Every stage of the plant life cycle is in the right order!', 'celebrating');
        if (!isCompleted) {
          onComplete();
        }
      } else {
        onMascotSay(`Spot on! "${expectedStage.shortLabel}" belongs in Stage ${slotIdx + 1}.`, 'happy');
        // Move active slot pointer to next empty or incorrect slot
        const nextEmpty = nextSlots.findIndex((id, i) => id !== LIFE_CYCLE_STAGES[i].id);
        if (nextEmpty !== -1) {
          setActiveSlotIndex(nextEmpty);
        }
      }
    } else {
      onMascotSay('Not quite that slot! Tap the slot to remove it or drag another icon over it.', 'encouraging');
    }
  };

  const handleTrayIconClick = (stageId: string) => {
    const stageObj = LIFE_CYCLE_STAGES.find((s) => s.id === stageId);
    if (stageObj) setLastInspectedStage(stageObj);

    if (selectedStageId === stageId) {
      // Second tap places it directly into the currently targeted slot for quick whiteboard/tablet use
      placeStageInSlot(stageId, activeSlotIndex);
    } else {
      setSelectedStageId(stageId);
      onMascotSay(`Selected "${stageObj?.shortLabel}". Now tap a numbered circle slot on the wheel!`, 'happy');
    }
  };

  const handleSlotClick = (slotIdx: number) => {
    setActiveSlotIndex(slotIdx);
    const currentStageId = slots[slotIdx];

    if (selectedStageId) {
      placeStageInSlot(selectedStageId, slotIdx);
      return;
    }

    if (currentStageId) {
      const expectedId = LIFE_CYCLE_STAGES[slotIdx].id;
      const stageObj = LIFE_CYCLE_STAGES.find((s) => s.id === currentStageId);
      if (stageObj) setLastInspectedStage(stageObj);

      // If incorrect, tapping removes it so the student can retry easily
      if (currentStageId !== expectedId) {
        const nextSlots = [...slots];
        nextSlots[slotIdx] = null;
        setSlots(nextSlots);
        onMascotSay('Cleared that slot! Pick the next stage from the tray.', 'happy');
      }
    }
  };

  const handleResetWheel = () => {
    setSlots(Array(7).fill(null));
    setSelectedStageId(null);
    setActiveSlotIndex(0);
    onMascotSay('Wheel reset! Start with Stage 1 at the top of the circle.', 'happy');
  };

  // Compute coordinates around a circle of radius 170 in a 460x460 coordinate box
  const centerX = 230;
  const centerY = 230;
  const radius = 162;

  const slotPositions = LIFE_CYCLE_STAGES.map((_, idx) => {
    const angleDeg = -90 + (idx * 360) / 7;
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad),
      angleDeg
    };
  });

  const allCorrect = checkAllCorrect(slots);
  const correctCount = slots.filter((id, idx) => id === LIFE_CYCLE_STAGES[idx].id).length;

  return (
    <div className="animate-screen-transition max-w-[1200px] mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9] mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#3B7A2A] mb-1">
            <span>Station A</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Flowering Plant Life Cycle</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="tabular-nums">{correctCount} of 7 Stages Placed</span>
          </div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#1F2D1C] leading-tight">
            Complete the Life Cycle Wheel
          </h1>
          <p className="text-[18px] text-[#4A5846] mt-1">
            Drag each life-cycle card onto the matching numbered circle slot (or tap a card, then tap a slot).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetWheel}
            className="min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-[#D5CFC0] text-[#1F2D1C] font-semibold hover:bg-[#FAF7EF] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 text-[#3B7A2A]" />
            <span>Reset Wheel</span>
          </button>
          <button
            type="button"
            onClick={onNavigateHome}
            className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#5B9BD5] text-white font-semibold hover:bg-[#4A89C2] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
          >
            Back to Map
          </button>
        </div>
      </div>

      {/* Main Two-Zone Educational Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Circular Life Cycle Diagram (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9] flex flex-col items-center">
          <div className="relative w-full max-w-[460px] aspect-square select-none">
            {/* SVG Background Ring + Curved Directional Arrows between the 7 slots */}
            <svg
              viewBox="0 0 460 460"
              fill="none"
              className="w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="cycle-arrow"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3B7A2A" />
                </marker>
              </defs>

              {/* Soft outer botanical track */}
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                stroke="#EEF6EB"
                strokeWidth="26"
              />

              {/* 7 Clockwise Curved Arrow Arcs connecting each slot */}
              {slotPositions.map((_, idx) => {
                const nextIdx = (idx + 1) % 7;
                const startAngle = (-90 + (idx * 360) / 7 + 19) * (Math.PI / 180);
                const endAngle = (-90 + (nextIdx * 360) / 7 - 21) * (Math.PI / 180);
                const x1 = centerX + radius * Math.cos(startAngle);
                const y1 = centerY + radius * Math.sin(startAngle);
                const x2 = centerX + radius * Math.cos(endAngle);
                const y2 = centerY + radius * Math.sin(endAngle);

                return (
                  <path
                    key={`arc-${idx}`}
                    d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
                    stroke="#3B7A2A"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    markerEnd="url(#cycle-arrow)"
                  />
                );
              })}

              {/* Center Hub Emblem */}
              <circle
                cx={centerX}
                cy={centerY}
                r="66"
                fill={allCorrect ? '#EEF6EB' : '#FAF7EF'}
                stroke={allCorrect ? '#3B7A2A' : '#D5CFC0'}
                strokeWidth="3"
              />
            </svg>

            {/* Center Hub Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-16">
              <span className="text-sm font-bold text-[#3B7A2A] tracking-wide">
                {allCorrect ? 'CYCLE COMPLETE' : 'LIFE CYCLE'}
              </span>
              <span className="text-xl font-bold font-display text-[#1F2D1C] tabular-nums">
                {correctCount} / 7
              </span>
            </div>

            {/* 7 Interactive Circular Slots Positioned Around the Wheel */}
            {LIFE_CYCLE_STAGES.map((expectedStage, idx) => {
              const pos = slotPositions[idx];
              const placedId = slots[idx];
              const placedStage = LIFE_CYCLE_STAGES.find((s) => s.id === placedId);
              const isCorrect = placedId === expectedStage.id;
              const isWrong = placedId !== null && !isCorrect;
              const isTarget = activeSlotIndex === idx && !isCorrect;

              // Convert 460x460 coords to percentage positioning
              const leftPct = (pos.x / 460) * 100;
              const topPct = (pos.y / 460) * 100;

              return (
                <button
                  key={expectedStage.id}
                  type="button"
                  onClick={() => handleSlotClick(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedStageId) {
                      placeStageInSlot(draggedStageId, idx);
                      setDraggedStageId(null);
                    }
                  }}
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`
                  }}
                  aria-label={`Stage ${idx + 1} slot. ${
                    placedStage
                      ? `Currently holds ${placedStage.shortLabel}. ${isCorrect ? 'Correct.' : 'Incorrect, tap to remove.'}`
                      : 'Empty slot.'
                  }`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-[92px] h-[92px] sm:w-[104px] sm:h-[104px] rounded-full flex flex-col items-center justify-center p-1.5 transition-all duration-150 cursor-pointer focus-visible:outline-3 focus-visible:outline-[#5B9BD5] ${
                    isCorrect
                      ? 'bg-[#EEF6EB] border-3 border-[#3B7A2A] shadow-[0_0_20px_rgba(59,122,42,0.28)]'
                      : isWrong
                      ? 'bg-[#FDF5E6] border-3 border-[#E8A33D] shadow-sm'
                      : isTarget
                      ? 'bg-white border-3 border-dashed border-[#5B9BD5] shadow-md scale-[1.03]'
                      : 'bg-[#FAF7EF] border-2 border-dashed border-[#C5BeB0] hover:border-[#3B7A2A]'
                  }`}
                >
                  {/* Step Number Indicator */}
                  <span
                    className={`text-xs font-bold tabular-nums leading-none px-1.5 py-0.5 rounded ${
                      isCorrect
                        ? 'text-[#3B7A2A]'
                        : isWrong
                        ? 'text-[#B87714]'
                        : 'text-[#5A6657]'
                    }`}
                  >
                    #{idx + 1}
                  </span>

                  {placedStage ? (
                    <>
                      <LifeCycleStageSvg stageId={placedStage.id} className="w-11 h-11 sm:w-12 sm:h-12" />
                      <span className="text-[12px] font-bold text-[#1F2D1C] leading-tight truncate max-w-[84px]">
                        {placedStage.shortLabel}
                      </span>
                      {isCorrect && (
                        <span className="text-[11px] font-bold text-[#3B7A2A] leading-none">
                          ✓ Correct
                        </span>
                      )}
                      {isWrong && (
                        <span className="text-[11px] font-bold text-[#B87714] leading-none">
                          Tap to retry
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-[#687564] mt-1">
                      Stage {idx + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Stage Inspector Callout Bar */}
          <div className="w-full mt-4 pt-4 border-t border-[#E5DEC9] flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF7EF] flex items-center justify-center shrink-0">
              <LifeCycleStageSvg stageId={lastInspectedStage.id} className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1F2D1C]">
                {lastInspectedStage.title}
              </h2>
              <p className="text-[17px] text-[#4A5846]">
                {lastInspectedStage.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Zone: Scrambled Icon Tray & Completion Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9]">
          <h2 className="text-[24px] font-bold text-[#1F2D1C] mb-1">
            Life Cycle Icon Tray
          </h2>
          <p className="text-[18px] text-[#4A5846] mb-4">
            Tap an icon below, then tap its matching slot on the wheel (or drag and drop it).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SCRAMBLED_IDS.map((stageId) => {
              const stage = LIFE_CYCLE_STAGES.find((s) => s.id === stageId)!;
              const isCorrectlyPlaced = slots[stage.order - 1] === stage.id;
              const isSelected = selectedStageId === stage.id;
              const isPlacedWrong = placedIds.has(stage.id) && !isCorrectlyPlaced;

              return (
                <button
                  key={stage.id}
                  type="button"
                  draggable={!isCorrectlyPlaced}
                  onDragStart={() => {
                    setDraggedStageId(stage.id);
                    setSelectedStageId(stage.id);
                  }}
                  onClick={() => !isCorrectlyPlaced && handleTrayIconClick(stage.id)}
                  disabled={isCorrectlyPlaced}
                  className={`min-h-[82px] p-3 rounded-2xl border-2 text-left flex items-center gap-3 transition-all duration-150 ${
                    isCorrectlyPlaced
                      ? 'bg-[#EEF6EB] border-[#3B7A2A]/40 opacity-65 cursor-default'
                      : isSelected
                      ? 'bg-[#EBF3FA] border-[#5B9BD5] scale-[1.02] shadow-md cursor-pointer'
                      : isPlacedWrong
                      ? 'bg-[#FDF5E6] border-[#E8A33D] cursor-pointer'
                      : 'bg-[#FAF7EF] border-[#E5DEC9] hover:border-[#3B7A2A] active:scale-[0.98] cursor-pointer'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <LifeCycleStageSvg stageId={stage.id} className="w-12 h-12" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[18px] text-[#1F2D1C] leading-snug">
                      {stage.shortLabel}
                    </div>
                    <div className="text-sm font-semibold text-[#3B7A2A]">
                      {isCorrectlyPlaced ? (
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Placed (#{stage.order})
                        </span>
                      ) : isSelected ? (
                        <span className="text-[#2B5B84]">Now tap a wheel slot</span>
                      ) : (
                        <span>Tap or drag</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Completion Confirmation Banner */}
          {allCorrect && (
            <div className="mt-6 p-5 rounded-2xl bg-[#EEF6EB] border-2 border-[#3B7A2A] animate-score-pop">
              <div className="flex items-center gap-2 text-[#3B7A2A] font-bold text-xl mb-1">
                <Sparkles className="w-6 h-6 text-[#E8A33D]" />
                <span>Station A Complete! (+5 Points)</span>
              </div>
              <p className="text-[18px] text-[#1F2D1C] mb-4">
                The plant life cycle repeats in an endless loop as new seeds from the seed pod grow into the next generation.
              </p>
              <button
                type="button"
                onClick={onNavigateNext}
                className="w-full min-h-[52px] px-5 py-3 rounded-xl bg-[#3B7A2A] text-white font-bold text-[18px] hover:bg-[#2F6320] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Continue to Station B: Habitat Detectives</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
