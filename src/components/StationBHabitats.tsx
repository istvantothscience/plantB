import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Award, Sparkles } from 'lucide-react';
import { HABITAT_CARDS, HabitatType } from '../types';
import { HabitatSceneSvg, BonusStarIcon } from './Illustrations';

interface StationBHabitatsProps {
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

interface CardProgress {
  selectedHabitat: HabitatType | null;
  habitatCorrect: boolean;
  selectedAdaptationId: string | null;
  adaptationCorrect: boolean;
}

export const StationBHabitats: React.FC<StationBHabitatsProps> = ({
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
  const [progress, setProgress] = useState<Record<string, CardProgress>>(() => {
    const initial: Record<string, CardProgress> = {};
    HABITAT_CARDS.forEach((card) => {
      const correctAdapt = card.adaptationChoices.find((a) => a.isCorrect)!;
      initial[card.id] = isCompleted
        ? {
            selectedHabitat: card.correctHabitat,
            habitatCorrect: true,
            selectedAdaptationId: correctAdapt.id,
            adaptationCorrect: true
          }
        : {
            selectedHabitat: null,
            habitatCorrect: false,
            selectedAdaptationId: null,
            adaptationCorrect: false
          };
    });
    return initial;
  });

  const currentCard = HABITAT_CARDS[currentIndex];
  const cardState = progress[currentCard.id];

  const handleSelectHabitat = (habitat: HabitatType) => {
    const isRight = habitat === currentCard.correctHabitat;
    const nextState: CardProgress = {
      ...cardState,
      selectedHabitat: habitat,
      habitatCorrect: isRight
    };
    const nextProgress = { ...progress, [currentCard.id]: nextState };
    setProgress(nextProgress);

    if (isRight) {
      onMascotSay(`Great job! Now pick the adaptation that helps the ${currentCard.name} survive there.`, 'happy');
    } else {
      onMascotSay('Look closely at the clues in the picture and description—try another habitat!', 'encouraging');
    }
  };

  const handleSelectAdaptation = (adaptationId: string) => {
    const choice = currentCard.adaptationChoices.find((c) => c.id === adaptationId);
    if (!choice) return;

    const nextState: CardProgress = {
      ...cardState,
      selectedAdaptationId: adaptationId,
      adaptationCorrect: choice.isCorrect
    };
    const nextProgress = { ...progress, [currentCard.id]: nextState };
    setProgress(nextProgress);

    const allDone = HABITAT_CARDS.every(
      (c) => nextProgress[c.id].habitatCorrect && nextProgress[c.id].adaptationCorrect
    );

    if (choice.isCorrect) {
      if (allDone) {
        onMascotSay('Superb detective work! You solved all 4 Habitat Detective files!', 'celebrating');
        if (!isCompleted) {
          onComplete();
        }
      } else {
        onMascotSay('Spot on! That adaptation matches its environment.', 'happy');
      }
    } else {
      onMascotSay('Hmm, would that feature help in this climate? Read the feedback and try again!', 'encouraging');
    }
  };

  const completedCardsCount = HABITAT_CARDS.filter(
    (c) => progress[c.id].habitatCorrect && progress[c.id].adaptationCorrect
  ).length;
  const allCardsDone = completedCardsCount === HABITAT_CARDS.length;
  const selectedAdaptationObj = currentCard.adaptationChoices.find(
    (c) => c.id === cardState.selectedAdaptationId
  );

  return (
    <div className="animate-screen-transition max-w-[1200px] mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9] mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#3B7A2A] mb-1">
            <span>Station B</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Habitat Detectives</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="tabular-nums">Card {currentIndex + 1} of {HABITAT_CARDS.length} ({completedCardsCount}/{HABITAT_CARDS.length} Solved)</span>
          </div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#1F2D1C] leading-tight">
            Match the Habitat &amp; Survival Adaptation
          </h1>
          <p className="text-[18px] text-[#4A5846] mt-1">
            Inspect each living thing, identify its habitat, and choose the adaptation that helps it survive.
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

      {/* Interactive Card Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {HABITAT_CARDS.map((card, idx) => {
          const isSolved = progress[card.id].habitatCorrect && progress[card.id].adaptationCorrect;
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`min-h-[48px] px-4 py-2 rounded-xl font-bold text-[18px] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'bg-[#3B7A2A] text-white shadow-sm'
                  : isSolved
                  ? 'bg-[#EEF6EB] text-[#3B7A2A] border border-[#3B7A2A]/40 hover:bg-[#E1F0DC]'
                  : 'bg-white text-[#4A5846] border border-[#E5DEC9] hover:border-[#3B7A2A]'
              }`}
            >
              <span className="tabular-nums">{idx + 1}.</span>
              <span>{card.name}</span>
              {isSolved && <CheckCircle2 className="w-5 h-5 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main Two-Zone Card View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Visual Habitat Scene + Creature Card (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9]">
          <div className="rounded-2xl overflow-hidden border border-[#E5DEC9] mb-5">
            <HabitatSceneSvg cardId={currentCard.id} className="w-full h-60" />
          </div>

          <div className="text-sm font-semibold text-[#3B7A2A] mb-1">
            <span>{currentCard.category} File</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Clue Observation</span>
          </div>
          <h2 className="text-[28px] font-bold text-[#1F2D1C] mb-2">
            {currentCard.name}
          </h2>
          <p className="text-[19px] text-[#1F2D1C] leading-relaxed">
            {currentCard.clueDescription}
          </p>

          {/* Prev / Next Card Navigation */}
          <div className="mt-6 pt-5 border-t border-[#E5DEC9] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="min-h-[48px] px-4 py-2.5 rounded-xl border-2 border-[#D5CFC0] text-[#1F2D1C] font-bold disabled:opacity-40 hover:bg-[#FAF7EF] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer disabled:cursor-default"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous Card</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.min(HABITAT_CARDS.length - 1, prev + 1))}
              disabled={currentIndex === HABITAT_CARDS.length - 1}
              className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#5B9BD5] text-white font-bold disabled:opacity-40 hover:bg-[#4A89C2] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer disabled:cursor-default"
            >
              <span>Next Card</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Zone: Step 1 (Habitat Choice) & Step 2 (Adaptation Choice) (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-[20px] p-6 shadow-sm border border-[#E5DEC9] space-y-6">
          {/* Step 1: Pick Habitat */}
          <div>
            <h3 className="text-[22px] font-bold text-[#1F2D1C] mb-3">
              Step 1: Which habitat matches the {currentCard.name}?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentCard.habitatChoices.map((hab) => {
                const isSelected = cardState.selectedHabitat === hab;
                const isRight = isSelected && cardState.habitatCorrect;
                const isWrong = isSelected && !cardState.habitatCorrect;

                return (
                  <button
                    key={hab}
                    type="button"
                    onClick={() => handleSelectHabitat(hab)}
                    className={`min-h-[54px] px-4 py-3 rounded-xl border-2 font-bold text-[18px] text-left flex items-center justify-between gap-2 transition-all duration-150 cursor-pointer ${
                      isRight
                        ? 'bg-[#EEF6EB] border-[#3B7A2A] text-[#1F2D1C]'
                        : isWrong
                        ? 'bg-[#FDF5E6] border-[#E8A33D] text-[#1F2D1C]'
                        : 'bg-[#FAF7EF] border-[#E5DEC9] hover:border-[#3B7A2A] active:scale-[0.98] text-[#1F2D1C]'
                    }`}
                  >
                    <span className="truncate">{hab}</span>
                    {isRight && <CheckCircle2 className="w-5 h-5 text-[#3B7A2A] shrink-0" />}
                    {isWrong && <AlertCircle className="w-5 h-5 text-[#B87714] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {cardState.selectedHabitat && (
              <div
                className={`mt-3 p-3.5 rounded-xl text-[18px] font-medium flex items-start gap-2.5 ${
                  cardState.habitatCorrect
                    ? 'bg-[#EEF6EB] text-[#1F2D1C] border border-[#3B7A2A]/40'
                    : 'bg-[#FDF5E6] text-[#1F2D1C] border border-[#E8A33D]'
                }`}
              >
                {cardState.habitatCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-[#3B7A2A] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-[#B87714] shrink-0 mt-0.5" />
                )}
                <span>
                  {cardState.habitatCorrect
                    ? currentCard.habitatExplanation
                    : 'Not quite! Check the illustration clues and try another climate option.'}
                </span>
              </div>
            )}
          </div>

          {/* Step 2: Pick Adaptation (Revealed/Active once habitat is right) */}
          <div className={`pt-4 border-t border-[#E5DEC9] ${!cardState.habitatCorrect ? 'opacity-55 pointer-events-none' : ''}`}>
            <h3 className="text-[22px] font-bold text-[#1F2D1C] mb-3">
              Step 2: Which adaptation helps it survive in this habitat?
            </h3>
            <div className="space-y-3">
              {currentCard.adaptationChoices.map((opt) => {
                const isSelected = cardState.selectedAdaptationId === opt.id;
                const isRight = isSelected && opt.isCorrect;
                const isWrong = isSelected && !opt.isCorrect;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectAdaptation(opt.id)}
                    className={`w-full min-h-[60px] p-4 rounded-xl border-2 text-left font-semibold text-[18px] flex items-start justify-between gap-3 transition-all duration-150 cursor-pointer ${
                      isRight
                        ? 'bg-[#EEF6EB] border-[#3B7A2A] text-[#1F2D1C]'
                        : isWrong
                        ? 'bg-[#FDF5E6] border-[#E8A33D] text-[#1F2D1C]'
                        : 'bg-[#FAF7EF] border-[#E5DEC9] hover:border-[#3B7A2A] active:scale-[0.99] text-[#1F2D1C]'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {isRight && <CheckCircle2 className="w-6 h-6 text-[#3B7A2A] shrink-0 mt-0.5" />}
                    {isWrong && <AlertCircle className="w-6 h-6 text-[#B87714] shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {selectedAdaptationObj && (
              <div
                className={`mt-3 p-4 rounded-xl text-[18px] font-medium flex items-start gap-2.5 ${
                  selectedAdaptationObj.isCorrect
                    ? 'bg-[#EEF6EB] text-[#1F2D1C] border border-[#3B7A2A]'
                    : 'bg-[#FDF5E6] text-[#1F2D1C] border border-[#E8A33D]'
                }`}
              >
                {selectedAdaptationObj.isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-[#3B7A2A] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-[#B87714] shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p>{selectedAdaptationObj.explanation}</p>
                  {selectedAdaptationObj.isCorrect && currentIndex < HABITAT_CARDS.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="mt-3 min-h-[48px] px-5 py-2 rounded-xl bg-[#3B7A2A] text-white font-bold hover:bg-[#2F6320] transition-all duration-150 inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      <span>Inspect Next Card</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {allCardsDone && (
            <div className="p-5 rounded-2xl bg-[#EEF6EB] border-2 border-[#3B7A2A] animate-score-pop">
              <div className="flex items-center gap-2 text-[#3B7A2A] font-bold text-xl mb-1">
                <Sparkles className="w-6 h-6 text-[#E8A33D]" />
                <span>All 4 Habitat Cards Solved! (+5 Points)</span>
              </div>
              <p className="text-[18px] text-[#1F2D1C] mb-4">
                Every plant and animal has evolved special adaptations suited to the temperature and water supply of its habitat.
              </p>
              <button
                type="button"
                onClick={onNavigateNext}
                className="w-full min-h-[52px] px-5 py-3 rounded-xl bg-[#3B7A2A] text-white font-bold text-[18px] hover:bg-[#2F6320] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Continue to Station C: Seed Inspectors</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Optional Bonus Task Section (Up to 2 Bonus Points, Teacher-Reviewed) */}
      <div className="mt-6 bg-white rounded-[20px] p-6 shadow-sm border-2 border-[#E8A33D]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <BonusStarIcon className="w-8 h-8 shrink-0" />
            <div>
              <h2 className="text-[24px] font-bold text-[#1F2D1C]">
                Bonus Challenge: Imaginary Creature &amp; Habitat (Up to +2 Bonus Points)
              </h2>
              <p className="text-[18px] text-[#4A5846]">
                Optional: Describe your own imaginary creature, its habitat, and 3 adaptations that help it survive.
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
                    onMascotSay(`Awesome creativity! +${pts} Bonus Point${pts > 1 ? 's' : ''} awarded!`, 'celebrating');
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
          placeholder="Example: The Frost-Hopper lives in a cold & windy mountain habitat. 1) Thick silver fur traps heat. 2) Wide Grippy paws walk on ice. 3) Pocket pouches keep seeds warm..."
          className="w-full p-4 rounded-xl bg-[#FAF7EF] border-2 border-[#D5CFC0] focus:border-[#E8A33D] focus:outline-none text-[18px] text-[#1F2D1C]"
        />
      </div>
    </div>
  );
};
