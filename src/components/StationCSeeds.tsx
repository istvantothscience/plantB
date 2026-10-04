import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Award, Sparkles } from 'lucide-react';
import { SEED_ITEMS, DispersalMethod } from '../types';
import { SeedItemSvg, DispersalBadgeSvg, BonusStarIcon } from './Illustrations';

interface StationCSeedsProps {
  isCompleted: boolean;
  onComplete: () => void;
  bonusText: string;
  onChangeBonusText: (text: string) => void;
  bonusPointsAwarded: number;
  onAwardBonusPoints: (points: number) => void;
  onNavigateHome: () => void;
  onNavigateNext: () => void;
  onMascotSay: (text: string, mood?: 'happy' | 'encouraging' | 'celebrating') => void;
}

const DISPERSAL_METHODS: { id: DispersalMethod; label: string; subtitle: string }[] = [
  { id: 'wind', label: 'Wind Dispersal', subtitle: 'Floats or spins on the breeze' },
  { id: 'water', label: 'Water Dispersal', subtitle: 'Floats on rivers or ocean currents' },
  { id: 'animal', label: 'Animal Dispersal', subtitle: 'Hooks onto fur or is eaten in fruit' }
];

export const StationCSeeds: React.FC<StationCSeedsProps> = ({
  isCompleted,
  onComplete,
  bonusText,
  onChangeBonusText,
  bonusPointsAwarded,
  onAwardBonusPoints,
  onNavigateHome,
  onNavigateNext,
  onMascotSay
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedMethods, setSelectedMethods] = useState<Record<string, DispersalMethod | null>>(() => {
    const init: Record<string, DispersalMethod | null> = {};
    SEED_ITEMS.forEach((item) => {
      init[item.id] = isCompleted ? item.correctMethod : null;
    });
    return init;
  });

  const currentSeed = SEED_ITEMS[currentIndex];
  const chosenMethod = selectedMethods[currentSeed.id];
  const isCurrentCorrect = chosenMethod === currentSeed.correctMethod;

  const handleChooseMethod = (method: DispersalMethod) => {
    const nextMap = { ...selectedMethods, [currentSeed.id]: method };
    setSelectedMethods(nextMap);

    const isRight = method === currentSeed.correctMethod;
    const allSolved = SEED_ITEMS.every((s) => nextMap[s.id] === s.correctMethod);

    if (isRight) {
      if (allSolved) {
        onMascotSay('Fantastic! You classified every single seed dispersal method!', 'celebrating');
        if (!isCompleted) {
          onComplete();
        }
      } else {
        onMascotSay(`Spot on! The ${currentSeed.name} is dispersed by ${method}.`, 'happy');
      }
    } else {
      onMascotSay('Look closely at the shape of the seed—does it have wings, hooks, or a floating husk?', 'encouraging');
    }
  };

  const solvedCount = SEED_ITEMS.filter((s) => selectedMethods[s.id] === s.correctMethod).length;
  const allSolved = solvedCount === SEED_ITEMS.length;

  return (
    <div className="animate-screen-transition max-w-[1200px] mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9] mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#3B7A2A] mb-1">
            <span>Station C</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Seed Inspectors</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="tabular-nums">Seed {currentIndex + 1} of {SEED_ITEMS.length} ({solvedCount}/{SEED_ITEMS.length} Classified)</span>
          </div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#1F2D1C] leading-tight">
            How Does Each Seed Travel?
          </h1>
          <p className="text-[18px] text-[#4A5846] mt-1">
            Examine the seed’s shape and tap Wind, Water, or Animal to light up its dispersal badge.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateHome}
          className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#5B9BD5] text-white font-semibold hover:bg-[#4A89C2] active:scale-[0.98] transition-all duration-150 whitespace-nowrap self-start md:self-center cursor-pointer"
        >
          Back to Map
        </button>
      </div>

      {/* Seed Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {SEED_ITEMS.map((seed, idx) => {
          const solved = selectedMethods[seed.id] === seed.correctMethod;
          const active = idx === currentIndex;
          return (
            <button
              key={seed.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`min-h-[48px] px-4 py-2 rounded-xl font-bold text-[18px] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#3B7A2A] text-white shadow-sm'
                  : solved
                  ? 'bg-[#EEF6EB] text-[#3B7A2A] border border-[#3B7A2A]/40 hover:bg-[#E1F0DC]'
                  : 'bg-white text-[#4A5846] border border-[#E5DEC9] hover:border-[#3B7A2A]'
              }`}
            >
              <span className="tabular-nums">{idx + 1}.</span>
              <span>{seed.name}</span>
              {solved && <CheckCircle2 className="w-5 h-5 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main Seed Inspector Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Seed Illustration + Dispersal Badges (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9] flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-6 my-2 flex-wrap">
            {/* Large Seed Character SVG */}
            <div className="p-4 rounded-3xl bg-[#FAF7EF] border border-[#E5DEC9]">
              <SeedItemSvg seedId={currentSeed.id} className="w-40 h-40" />
            </div>

            {/* 3 Dispersal Badges that light up when matched */}
            <div className="flex flex-row sm:flex-col gap-3">
              {DISPERSAL_METHODS.map((m) => {
                const isLit = isCurrentCorrect && currentSeed.correctMethod === m.id;
                return (
                  <div
                    key={m.id}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl border-2 transition-all duration-200 ${
                      isLit
                        ? 'bg-[#EEF6EB] border-[#3B7A2A] scale-105 shadow-sm'
                        : 'bg-[#FAF7EF] border-[#E5DEC9] opacity-75'
                    }`}
                  >
                    <DispersalBadgeSvg method={m.id} active={isLit} className="w-11 h-11 shrink-0" />
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-bold text-[#1F2D1C] leading-tight">
                        {m.id === 'wind' ? 'Wind' : m.id === 'water' ? 'Water' : 'Animal'}
                      </div>
                      <div className="text-xs font-semibold text-[#3B7A2A]">
                        {isLit ? '★ Matched!' : 'Badge'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <h2 className="text-[28px] font-bold text-[#1F2D1C] mt-3">
            {currentSeed.name}
          </h2>
          <p className="text-[19px] text-[#4A5846] max-w-lg mt-1">
            {currentSeed.structureHint}
          </p>

          {/* Prev / Next Seed Buttons */}
          <div className="w-full mt-6 pt-5 border-t border-[#E5DEC9] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              disabled={currentIndex === 0}
              className="min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-[#D5CFC0] text-[#1F2D1C] font-bold disabled:opacity-40 hover:bg-[#FAF7EF] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer disabled:cursor-default"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous Seed</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((p) => Math.min(SEED_ITEMS.length - 1, p + 1))}
              disabled={currentIndex === SEED_ITEMS.length - 1}
              className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#5B9BD5] text-white font-bold disabled:opacity-40 hover:bg-[#4A89C2] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer disabled:cursor-default"
            >
              <span>Next Seed</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Zone: Classification Buttons + Immediate Feedback (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9]">
          <h3 className="text-[24px] font-bold text-[#1F2D1C] mb-2">
            Pick the Dispersal Method
          </h3>
          <p className="text-[18px] text-[#4A5846] mb-4">
            Tap the method that matches how the <strong>{currentSeed.name}</strong> spreads away from its parent plant:
          </p>

          <div className="space-y-3">
            {DISPERSAL_METHODS.map((method) => {
              const isSelected = chosenMethod === method.id;
              const isRight = isSelected && method.id === currentSeed.correctMethod;
              const isWrong = isSelected && method.id !== currentSeed.correctMethod;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => handleChooseMethod(method.id)}
                  className={`w-full min-h-[72px] p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-4 transition-all duration-150 cursor-pointer ${
                    isRight
                      ? 'bg-[#EEF6EB] border-[#3B7A2A] shadow-sm'
                      : isWrong
                      ? 'bg-[#FDF5E6] border-[#E8A33D]'
                      : 'bg-[#FAF7EF] border-[#E5DEC9] hover:border-[#3B7A2A] active:scale-[0.99]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <DispersalBadgeSvg method={method.id} active={isRight} className="w-12 h-12 shrink-0" />
                    <div>
                      <div className="text-[20px] font-bold text-[#1F2D1C]">
                        {method.label}
                      </div>
                      <div className="text-[16px] text-[#4A5846]">
                        {method.subtitle}
                      </div>
                    </div>
                  </div>
                  {isRight && <CheckCircle2 className="w-7 h-7 text-[#3B7A2A] shrink-0" />}
                  {isWrong && <AlertCircle className="w-7 h-7 text-[#B87714] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Immediate One-Line Explanation */}
          {chosenMethod && (
            <div
              className={`mt-5 p-4 rounded-2xl border-2 text-[18px] font-medium flex items-start gap-3 ${
                isCurrentCorrect
                  ? 'bg-[#EEF6EB] border-[#3B7A2A] text-[#1F2D1C]'
                  : 'bg-[#FDF5E6] border-[#E8A33D] text-[#1F2D1C]'
              }`}
            >
              {isCurrentCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-[#3B7A2A] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-[#B87714] shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p>
                  {isCurrentCorrect
                    ? currentSeed.explanation
                    : `Not ${chosenMethod} dispersal! Check the clue: "${currentSeed.structureHint}" and try again.`}
                </p>
                {isCurrentCorrect && currentIndex < SEED_ITEMS.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((p) => p + 1)}
                    className="mt-3 min-h-[48px] px-5 py-2 rounded-xl bg-[#3B7A2A] text-white font-bold hover:bg-[#2F6320] transition-all duration-150 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Inspect Next Seed</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {allSolved && (
            <div className="mt-6 p-5 rounded-2xl bg-[#EEF6EB] border-2 border-[#3B7A2A] animate-score-pop">
              <div className="flex items-center gap-2 text-[#3B7A2A] font-bold text-xl mb-1">
                <Sparkles className="w-6 h-6 text-[#E8A33D]" />
                <span>All 5 Seeds Classified! (+5 Points)</span>
              </div>
              <p className="text-[18px] text-[#1F2D1C] mb-4">
                Spreading seeds far from the parent plant reduces competition for light, water, and space!
              </p>
              <button
                type="button"
                onClick={onNavigateNext}
                className="w-full min-h-[52px] px-5 py-3 rounded-xl bg-[#3B7A2A] text-white font-bold text-[18px] hover:bg-[#2F6320] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Continue to Station D: Predator &amp; Prey Files</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Optional Dream Seed Bonus Task (Up to 2 Bonus Points, Teacher-Reviewed) */}
      <div className="mt-6 bg-white rounded-[20px] p-6 shadow-sm border-2 border-[#E8A33D]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <BonusStarIcon className="w-8 h-8 shrink-0" />
            <div>
              <h2 className="text-[24px] font-bold text-[#1F2D1C]">
                Bonus Challenge: Design Your &ldquo;Dream Seed&rdquo; (Up to +2 Bonus Points)
              </h2>
              <p className="text-[18px] text-[#4A5846]">
                Optional: Describe (or sketch on paper and explain here) your own super-seed and how its shape helps it travel.
              </p>
            </div>
          </div>

          {/* Teacher Manual Bonus Review Buttons */}
          <div className="flex items-center gap-2 bg-[#FAF7EF] p-2 rounded-xl border border-[#E5DEC9] shrink-0">
            <span className="text-sm font-bold text-[#4A5846] px-2 flex items-center gap-1 whitespace-nowrap">
              <Award className="w-4 h-4 text-[#E8A33D]" />
              Teacher Review:
            </span>
            {[0, 1, 2].map((pts) => (
              <button
                key={pts}
                type="button"
                onClick={() => {
                  onAwardBonusPoints(pts);
                  if (pts > 0) {
                    onMascotSay(`Brilliant Dream Seed design! +${pts} Bonus Point${pts > 1 ? 's' : ''} awarded!`, 'celebrating');
                  }
                }}
                className={`min-h-[42px] px-3.5 py-1.5 rounded-lg font-bold text-base tabular-nums transition-all duration-150 whitespace-nowrap cursor-pointer ${
                  bonusPointsAwarded === pts
                    ? 'bg-[#E8A33D] text-[#1F2D1C] shadow-sm'
                    : 'bg-white text-[#4A5846] hover:bg-[#FDF5E6]'
                }`}
              >
                +{pts} pt{pts !== 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={bonusText}
          onChange={(e) => onChangeBonusText(e.target.value)}
          rows={3}
          placeholder="Example: My Hydro-Glider seed has two wide paper wings to glide from cliff trees, plus a corky air-pocket coat so it floats when it lands in a river..."
          className="w-full p-4 rounded-xl bg-[#FAF7EF] border-2 border-[#D5CFC0] focus:border-[#E8A33D] focus:outline-none text-[18px] text-[#1F2D1C]"
        />
      </div>
    </div>
  );
};
