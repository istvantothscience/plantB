import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { PREDATOR_PREY_SCENARIOS } from '../types';
import { PredatorPreySceneSvg } from './Illustrations';

interface StationDPredatorPreyProps {
  isCompleted: boolean;
  onComplete: () => void;
  onNavigateHome: () => void;
  onNavigateConnection: () => void;
  onMascotSay: (text: string, mood?: 'happy' | 'encouraging' | 'celebrating') => void;
}

interface ScenarioState {
  selectedPredatorShape: 'A' | 'B' | null;
  rolesCorrect: boolean;
  selectedPredatorAdapt: string | null;
  predatorAdaptCorrect: boolean;
  selectedPreyAdapt: string | null;
  preyAdaptCorrect: boolean;
}

export const StationDPredatorPrey: React.FC<StationDPredatorPreyProps> = ({
  isCompleted,
  onComplete,
  onNavigateHome,
  onNavigateConnection,
  onMascotSay
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progress, setProgress] = useState<Record<string, ScenarioState>>(() => {
    const init: Record<string, ScenarioState> = {};
    PREDATOR_PREY_SCENARIOS.forEach((sc) => {
      const predShape = sc.shapeA.role === 'predator' ? 'A' : 'B';
      init[sc.id] = isCompleted
        ? {
            selectedPredatorShape: predShape,
            rolesCorrect: true,
            selectedPredatorAdapt: sc.correctPredatorAdaptation,
            predatorAdaptCorrect: true,
            selectedPreyAdapt: sc.correctPreyAdaptation,
            preyAdaptCorrect: true
          }
        : {
            selectedPredatorShape: null,
            rolesCorrect: false,
            selectedPredatorAdapt: null,
            predatorAdaptCorrect: false,
            selectedPreyAdapt: null,
            preyAdaptCorrect: false
          };
    });
    return init;
  });

  const currentScenario = PREDATOR_PREY_SCENARIOS[currentIndex];
  const state = progress[currentScenario.id];

  const checkAllScenariosComplete = (nextProgress: Record<string, ScenarioState>) => {
    return PREDATOR_PREY_SCENARIOS.every(
      (s) =>
        nextProgress[s.id].rolesCorrect &&
        nextProgress[s.id].predatorAdaptCorrect &&
        nextProgress[s.id].preyAdaptCorrect
    );
  };

  const handleSelectPredatorShape = (shape: 'A' | 'B') => {
    const correctPredatorShape = currentScenario.shapeA.role === 'predator' ? 'A' : 'B';
    const isRight = shape === correctPredatorShape;

    const nextState: ScenarioState = {
      ...state,
      selectedPredatorShape: shape,
      rolesCorrect: isRight
    };
    const nextProgress = { ...progress, [currentScenario.id]: nextState };
    setProgress(nextProgress);

    if (isRight) {
      const predName = shape === 'A' ? currentScenario.shapeA.name : currentScenario.shapeB.name;
      const preyName = shape === 'A' ? currentScenario.shapeB.name : currentScenario.shapeA.name;
      onMascotSay(
        `Correct! ${predName} is the Predator and ${preyName} is the Prey. Now match their adaptations!`,
        'happy'
      );
    } else {
      onMascotSay('Remember: a Predator hunts other animals for food, and Prey tries to escape!', 'encouraging');
    }
  };

  const handleSelectPredatorAdaptation = (option: string) => {
    const isRight = option === currentScenario.correctPredatorAdaptation;
    const nextState: ScenarioState = {
      ...state,
      selectedPredatorAdapt: option,
      predatorAdaptCorrect: isRight
    };
    const nextProgress = { ...progress, [currentScenario.id]: nextState };
    setProgress(nextProgress);

    if (isRight) {
      if (checkAllScenariosComplete(nextProgress)) {
        onMascotSay('Incredible! You solved every Predator & Prey file!', 'celebrating');
        if (!isCompleted) onComplete();
      } else {
        onMascotSay('Spot on! That predator adaptation helps it detect or catch food.', 'happy');
      }
    } else {
      onMascotSay('Not quite! Think about how this hunter catches its meal.', 'encouraging');
    }
  };

  const handleSelectPreyAdaptation = (option: string) => {
    const isRight = option === currentScenario.correctPreyAdaptation;
    const nextState: ScenarioState = {
      ...state,
      selectedPreyAdapt: option,
      preyAdaptCorrect: isRight
    };
    const nextProgress = { ...progress, [currentScenario.id]: nextState };
    setProgress(nextProgress);

    if (isRight) {
      if (checkAllScenariosComplete(nextProgress)) {
        onMascotSay('Incredible! You solved every Predator & Prey file!', 'celebrating');
        if (!isCompleted) onComplete();
      } else {
        onMascotSay('Great thinking! That defence helps the prey stay safe.', 'happy');
      }
    } else {
      onMascotSay('Try again! How does this prey animal hide, escape, or protect itself?', 'encouraging');
    }
  };

  const solvedScenariosCount = PREDATOR_PREY_SCENARIOS.filter(
    (s) =>
      progress[s.id].rolesCorrect &&
      progress[s.id].predatorAdaptCorrect &&
      progress[s.id].preyAdaptCorrect
  ).length;
  const allSolved = solvedScenariosCount === PREDATOR_PREY_SCENARIOS.length;
  const currentScenarioSolved =
    state.rolesCorrect && state.predatorAdaptCorrect && state.preyAdaptCorrect;

  return (
    <div className="animate-screen-transition max-w-[1200px] mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9] mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#3B7A2A] mb-1">
            <span>Station D</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Predator &amp; Prey Files</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="tabular-nums">File {currentIndex + 1} of {PREDATOR_PREY_SCENARIOS.length} ({solvedScenariosCount}/{PREDATOR_PREY_SCENARIOS.length} Solved)</span>
          </div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#1F2D1C] leading-tight">
            Identify Predator, Prey &amp; Adaptations
          </h1>
          <p className="text-[18px] text-[#4A5846] mt-1">
            First spot who is the Predator and who is the Prey, then choose each animal’s key survival adaptation.
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

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {PREDATOR_PREY_SCENARIOS.map((sc, idx) => {
          const solved =
            progress[sc.id].rolesCorrect &&
            progress[sc.id].predatorAdaptCorrect &&
            progress[sc.id].preyAdaptCorrect;
          const active = idx === currentIndex;
          return (
            <button
              key={sc.id}
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
              <span>{sc.title}</span>
              {solved && <CheckCircle2 className="w-5 h-5 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main Two-Zone View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Silhouette Scene + Role Choice (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9]">
          <div className="rounded-2xl overflow-hidden border border-[#E5DEC9] mb-4">
            <PredatorPreySceneSvg
              scenarioId={currentScenario.id}
              selectedPredator={state.selectedPredatorShape}
              onSelectShape={handleSelectPredatorShape}
              className="w-full h-60"
            />
          </div>

          <h2 className="text-[26px] font-bold text-[#1F2D1C] mb-1">
            {currentScenario.title}
          </h2>
          <p className="text-[18px] text-[#4A5846] mb-5">
            {currentScenario.sceneDescription}
          </p>

          {/* Step 1: Identify Predator vs Prey */}
          <div className="p-4 rounded-2xl bg-[#FAF7EF] border border-[#E5DEC9]">
            <h3 className="text-[20px] font-bold text-[#1F2D1C] mb-3">
              Step 1: Tap which animal is the Predator (the hunter):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(['A', 'B'] as const).map((shapeKey) => {
                const shapeObj = shapeKey === 'A' ? currentScenario.shapeA : currentScenario.shapeB;
                const otherObj = shapeKey === 'A' ? currentScenario.shapeB : currentScenario.shapeA;
                const isSelected = state.selectedPredatorShape === shapeKey;
                const isRight = isSelected && state.rolesCorrect;
                const isWrong = isSelected && !state.rolesCorrect;

                return (
                  <button
                    key={shapeKey}
                    type="button"
                    onClick={() => handleSelectPredatorShape(shapeKey)}
                    className={`min-h-[64px] p-3.5 rounded-xl border-2 text-left transition-all duration-150 cursor-pointer ${
                      isRight
                        ? 'bg-[#EEF6EB] border-[#3B7A2A]'
                        : isWrong
                        ? 'bg-[#FDF5E6] border-[#E8A33D]'
                        : 'bg-white border-[#D5CFC0] hover:border-[#3B7A2A] active:scale-[0.98]'
                    }`}
                  >
                    <div className="font-bold text-[18px] text-[#1F2D1C] flex items-center justify-between">
                      <span>Shape {shapeKey}: {shapeObj.name}</span>
                      {isRight && <CheckCircle2 className="w-5 h-5 text-[#3B7A2A]" />}
                      {isWrong && <AlertCircle className="w-5 h-5 text-[#B87714]" />}
                    </div>
                    <div className="text-sm font-semibold text-[#4A5846] mt-0.5">
                      (Making {otherObj.name} the Prey)
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="mt-6 pt-5 border-t border-[#E5DEC9] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentIndex((p) => Math.max(0, p - 1))}
              disabled={currentIndex === 0}
              className="min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-[#D5CFC0] text-[#1F2D1C] font-bold disabled:opacity-40 hover:bg-[#FAF7EF] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer disabled:cursor-default"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous File</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((p) => Math.min(PREDATOR_PREY_SCENARIOS.length - 1, p + 1))}
              disabled={currentIndex === PREDATOR_PREY_SCENARIOS.length - 1}
              className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#5B9BD5] text-white font-bold disabled:opacity-40 hover:bg-[#4A89C2] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer disabled:cursor-default"
            >
              <span>Next File</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Zone: Step 2 & Step 3 Adaptation Questions (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9] space-y-6">
          {/* Step 2: Predator Adaptation */}
          <div className={!state.rolesCorrect ? 'opacity-50 pointer-events-none' : ''}>
            <h3 className="text-[21px] font-bold text-[#1F2D1C] mb-3">
              Step 2: {currentScenario.predatorAdaptationQuestion}
            </h3>
            <div className="space-y-2.5">
              {currentScenario.predatorAdaptationOptions.map((opt) => {
                const isSelected = state.selectedPredatorAdapt === opt;
                const isRight = isSelected && state.predatorAdaptCorrect;
                const isWrong = isSelected && !state.predatorAdaptCorrect;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectPredatorAdaptation(opt)}
                    className={`w-full min-h-[54px] px-4 py-3 rounded-xl border-2 text-left font-semibold text-[18px] flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                      isRight
                        ? 'bg-[#EEF6EB] border-[#3B7A2A] text-[#1F2D1C]'
                        : isWrong
                        ? 'bg-[#FDF5E6] border-[#E8A33D] text-[#1F2D1C]'
                        : 'bg-[#FAF7EF] border-[#E5DEC9] hover:border-[#3B7A2A] active:scale-[0.99]'
                    }`}
                  >
                    <span>{opt}</span>
                    {isRight && <CheckCircle2 className="w-6 h-6 text-[#3B7A2A] shrink-0" />}
                    {isWrong && <AlertCircle className="w-6 h-6 text-[#B87714] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Prey Adaptation */}
          <div className={`pt-4 border-t border-[#E5DEC9] ${!state.rolesCorrect ? 'opacity-50 pointer-events-none' : ''}`}>
            <h3 className="text-[21px] font-bold text-[#1F2D1C] mb-3">
              Step 3: {currentScenario.preyAdaptationQuestion}
            </h3>
            <div className="space-y-2.5">
              {currentScenario.preyAdaptationOptions.map((opt) => {
                const isSelected = state.selectedPreyAdapt === opt;
                const isRight = isSelected && state.preyAdaptCorrect;
                const isWrong = isSelected && !state.preyAdaptCorrect;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectPreyAdaptation(opt)}
                    className={`w-full min-h-[54px] px-4 py-3 rounded-xl border-2 text-left font-semibold text-[18px] flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                      isRight
                        ? 'bg-[#EEF6EB] border-[#3B7A2A] text-[#1F2D1C]'
                        : isWrong
                        ? 'bg-[#FDF5E6] border-[#E8A33D] text-[#1F2D1C]'
                        : 'bg-[#FAF7EF] border-[#E5DEC9] hover:border-[#3B7A2A] active:scale-[0.99]'
                    }`}
                  >
                    <span>{opt}</span>
                    {isRight && <CheckCircle2 className="w-6 h-6 text-[#3B7A2A] shrink-0" />}
                    {isWrong && <AlertCircle className="w-6 h-6 text-[#B87714] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scenario Summary Explanation */}
          {currentScenarioSolved && (
            <div className="p-4 rounded-2xl bg-[#EEF6EB] border border-[#3B7A2A] text-[18px] text-[#1F2D1C]">
              <p className="font-semibold text-[#3B7A2A] mb-1">✓ File Complete!</p>
              <p>{currentScenario.summaryExplanation}</p>
              {currentIndex < PREDATOR_PREY_SCENARIOS.length - 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((p) => p + 1)}
                  className="mt-3 min-h-[48px] px-5 py-2 rounded-xl bg-[#3B7A2A] text-white font-bold hover:bg-[#2F6320] transition-all duration-150 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Open Next Scenario</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* All 4 Scenarios Completed Banner */}
          {allSolved && (
            <div className="p-5 rounded-2xl bg-[#EEF6EB] border-2 border-[#3B7A2A] animate-score-pop">
              <div className="flex items-center gap-2 text-[#3B7A2A] font-bold text-xl mb-1">
                <Sparkles className="w-6 h-6 text-[#E8A33D]" />
                <span>Station D Complete! (+5 Points)</span>
              </div>
              <p className="text-[18px] text-[#1F2D1C] mb-4">
                Predators and prey evolve adaptations side by side to hunt effectively and avoid being eaten.
              </p>
              <button
                type="button"
                onClick={onNavigateConnection}
                className="w-full min-h-[52px] px-5 py-3 rounded-xl bg-[#3B7A2A] text-white font-bold text-[18px] hover:bg-[#2F6320] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Open &ldquo;The Big Connection&rdquo; Summary</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
