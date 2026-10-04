import React from 'react';
import { ArrowRight, RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';
import {
  CelebrationGardenSvg,
  LeafPointIcon,
  BonusStarIcon,
  GardenVineFrameSvg
} from './Illustrations';

interface BigConnectionProps {
  reflections: {
    q1: string;
    q2: string;
    q3: string;
  };
  onChangeReflection: (key: 'q1' | 'q2' | 'q3', value: string) => void;
  onNavigateHome: () => void;
  onNavigateResults: () => void;
}

export const BigConnectionScreen: React.FC<BigConnectionProps> = ({
  reflections,
  onChangeReflection,
  onNavigateHome,
  onNavigateResults
}) => {
  return (
    <div className="animate-screen-transition max-w-[1000px] mx-auto">
      <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-[#E5DEC9] mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <div className="text-sm font-semibold text-[#3B7A2A] mb-1">
              <span>Synthesis Stage</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Cambridge Primary Science Stage 5/6</span>
            </div>
            <h1 className="text-[30px] md:text-[34px] font-bold text-[#1F2D1C] leading-tight">
              The Big Connection
            </h1>
            <p className="text-[18px] text-[#4A5846] mt-1">
              Think about how all four stations connect together. Write short answers to discuss with your class or teacher!
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

        <GardenVineFrameSvg className="w-full h-12 my-2" />

        <div className="space-y-6 mt-4">
          <div>
            <label htmlFor="reflect-q1" className="block text-[21px] font-bold text-[#1F2D1C] mb-2">
              1. How do habitat adaptations (Station B) help a flowering plant survive long enough to complete its life cycle (Station A)?
            </label>
            <textarea
              id="reflect-q1"
              rows={3}
              value={reflections.q1}
              onChange={(e) => onChangeReflection('q1', e.target.value)}
              placeholder="Write your idea here (for example: how storing water helps a desert plant grow flowers and seeds)..."
              className="w-full p-4 rounded-xl bg-[#FAF7EF] border-2 border-[#D5CFC0] focus:border-[#3B7A2A] focus:outline-none text-[18px] text-[#1F2D1C]"
            />
          </div>

          <div>
            <label htmlFor="reflect-q2" className="block text-[21px] font-bold text-[#1F2D1C] mb-2">
              2. Why is seed dispersal (Station C) so important for the next generation of seedlings?
            </label>
            <textarea
              id="reflect-q2"
              rows={3}
              value={reflections.q2}
              onChange={(e) => onChangeReflection('q2', e.target.value)}
              placeholder="Write your idea here (think about sunlight, water, and space around the parent plant)..."
              className="w-full p-4 rounded-xl bg-[#FAF7EF] border-2 border-[#D5CFC0] focus:border-[#3B7A2A] focus:outline-none text-[18px] text-[#1F2D1C]"
            />
          </div>

          <div>
            <label htmlFor="reflect-q3" className="block text-[21px] font-bold text-[#1F2D1C] mb-2">
              3. How do animals help plants in the garden even while predators and prey (Station D) are hunting and hiding?
            </label>
            <textarea
              id="reflect-q3"
              rows={3}
              value={reflections.q3}
              onChange={(e) => onChangeReflection('q3', e.target.value)}
              placeholder="Write your idea here (think about pollination by insects and seed dispersal on fur or in fruit)..."
              className="w-full p-4 rounded-xl bg-[#FAF7EF] border-2 border-[#D5CFC0] focus:border-[#3B7A2A] focus:outline-none text-[18px] text-[#1F2D1C]"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E5DEC9] flex flex-col sm:flex-row items-center justify-end gap-4">
          <button
            type="button"
            onClick={onNavigateResults}
            className="w-full sm:w-auto min-h-[54px] px-7 py-3 rounded-xl bg-[#3B7A2A] text-white font-bold text-[20px] hover:bg-[#2F6320] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer shadow-sm"
          >
            <span>See Final Garden Results</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface FinalResultsProps {
  stationCompleted: {
    A: boolean;
    B: boolean;
    C: boolean;
    D: boolean;
  };
  mandatoryPoints: number;
  bonusPointsB: number;
  bonusPointsC: number;
  bonusTextB: string;
  bonusTextC: string;
  reflections: {
    q1: string;
    q2: string;
    q3: string;
  };
  onNavigateHome: () => void;
  onNavigateConnection: () => void;
  onResetAll: () => void;
}

export const FinalResultsScreen: React.FC<FinalResultsProps> = ({
  stationCompleted,
  mandatoryPoints,
  bonusPointsB,
  bonusPointsC,
  bonusTextB,
  bonusTextC,
  reflections,
  onNavigateHome,
  onNavigateConnection,
  onResetAll
}) => {
  const totalBonus = bonusPointsB + bonusPointsC;

  return (
    <div className="animate-screen-transition max-w-[1050px] mx-auto">
      <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-[#E5DEC9]">
        {/* Celebratory Blooming Garden Illustration */}
        <div className="rounded-2xl overflow-hidden border border-[#E5DEC9] mb-6">
          <CelebrationGardenSvg totalScore={mandatoryPoints} className="w-full h-64" />
        </div>

        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-[#3B7A2A] font-bold text-lg mb-1">
            <Sparkles className="w-5 h-5 text-[#E8A33D]" />
            <span>Garden Explorer Certificate</span>
          </div>
          <h1 className="text-[32px] md:text-[38px] font-bold text-[#1F2D1C] leading-tight">
            {mandatoryPoints === 20
              ? 'Congratulations, Master Garden Scientists!'
              : 'Great Exploring in the Science Garden!'}
          </h1>
          <p className="text-[19px] text-[#4A5846] mt-2">
            {mandatoryPoints === 20
              ? 'Your garden is in full bloom! You completed all four science stations and mastered plant life cycles, habitats, seed dispersal, and predator-prey adaptations.'
              : 'Look how much your garden has grown! You can revisit the map anytime to finish any remaining stations.'}
          </p>
        </div>

        {/* Score Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="p-6 rounded-2xl bg-[#EEF6EB] border-2 border-[#3B7A2A] flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-[#3B7A2A]">
                Station Points Earned
              </div>
              <div className="text-[36px] font-bold font-display text-[#1F2D1C] tabular-nums leading-none mt-1">
                {mandatoryPoints} / 20
              </div>
              <div className="text-sm font-semibold text-[#4A5846] mt-2">
                5 points per completed station (A–D)
              </div>
            </div>
            <LeafPointIcon className="w-16 h-16 shrink-0" />
          </div>

          <div className="p-6 rounded-2xl bg-[#FDF5E6] border-2 border-[#E8A33D] flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-[#B87714]">
                Bonus Points Earned
              </div>
              <div className="text-[36px] font-bold font-display text-[#1F2D1C] tabular-nums leading-none mt-1">
                +{totalBonus} / 4
              </div>
              <div className="text-sm font-semibold text-[#4A5846] mt-2">
                Imaginary Creature (+{bonusPointsB}) · Dream Seed (+{bonusPointsC})
              </div>
            </div>
            <BonusStarIcon className="w-16 h-16 shrink-0" />
          </div>
        </div>

        {/* Station Breakdown Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { id: 'A', name: 'Life Cycle Wheel', done: stationCompleted.A },
            { id: 'B', name: 'Habitat Detectives', done: stationCompleted.B },
            { id: 'C', name: 'Seed Inspectors', done: stationCompleted.C },
            { id: 'D', name: 'Predator & Prey', done: stationCompleted.D }
          ].map((st) => (
            <div
              key={st.id}
              className={`p-4 rounded-xl border flex items-center justify-between ${
                st.done
                  ? 'bg-[#FAF7EF] border-[#3B7A2A]'
                  : 'bg-[#FAF7EF] border-[#E5DEC9] opacity-75'
              }`}
            >
              <div>
                <div className="text-sm font-bold text-[#3B7A2A]">Station {st.id}</div>
                <div className="font-bold text-[18px] text-[#1F2D1C]">{st.name}</div>
              </div>
              <div className="font-bold tabular-nums text-[#3B7A2A] flex items-center gap-1">
                {st.done ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>5/5</span>
                  </>
                ) : (
                  <span className="text-[#687564]">0/5</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bonus & Reflection Notes Showcase (for classroom whiteboard review) */}
        {(bonusTextB.trim() || bonusTextC.trim() || reflections.q1.trim() || reflections.q2.trim() || reflections.q3.trim()) && (
          <div className="p-6 rounded-2xl bg-[#FAF7EF] border border-[#E5DEC9] mb-8 space-y-4">
            <h2 className="text-[24px] font-bold text-[#1F2D1C]">
              Your Field Notes &amp; Bonus Designs
            </h2>

            {bonusTextB.trim() && (
              <div>
                <div className="text-sm font-bold text-[#B87714]">
                  Station B Bonus — Imaginary Creature &amp; Habitat (+{bonusPointsB} pts):
                </div>
                <p className="text-[18px] text-[#1F2D1C] mt-0.5">{bonusTextB}</p>
              </div>
            )}

            {bonusTextC.trim() && (
              <div>
                <div className="text-sm font-bold text-[#B87714]">
                  Station C Bonus — Dream Seed Design (+{bonusPointsC} pts):
                </div>
                <p className="text-[18px] text-[#1F2D1C] mt-0.5">{bonusTextC}</p>
              </div>
            )}

            {(reflections.q1.trim() || reflections.q2.trim() || reflections.q3.trim()) && (
              <div className="pt-3 border-t border-[#E5DEC9] space-y-2">
                <div className="text-sm font-bold text-[#3B7A2A]">
                  The Big Connection Reflections:
                </div>
                {reflections.q1.trim() && (
                  <p className="text-[17px] text-[#1F2D1C]">
                    <strong>1. Adaptations &amp; Life Cycle:</strong> {reflections.q1}
                  </p>
                )}
                {reflections.q2.trim() && (
                  <p className="text-[17px] text-[#1F2D1C]">
                    <strong>2. Why Seeds Travel:</strong> {reflections.q2}
                  </p>
                )}
                {reflections.q3.trim() && (
                  <p className="text-[17px] text-[#1F2D1C]">
                    <strong>3. Animals &amp; Plants Together:</strong> {reflections.q3}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E5DEC9]">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onNavigateHome}
              className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#5B9BD5] text-white font-bold text-[18px] hover:bg-[#4A89C2] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
            >
              Back to Home Map
            </button>
            <button
              type="button"
              onClick={onNavigateConnection}
              className="min-h-[48px] px-5 py-2.5 rounded-xl border-2 border-[#3B7A2A] text-[#3B7A2A] font-bold text-[18px] hover:bg-[#EEF6EB] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
            >
              Edit Reflection Notes
            </button>
          </div>

          <button
            type="button"
            onClick={onResetAll}
            className="min-h-[48px] px-5 py-2.5 rounded-xl border-2 border-[#D5CFC0] text-[#4A5846] font-bold text-[18px] hover:bg-[#FAF7EF] active:scale-[0.98] transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Start Fresh for Next Group</span>
          </button>
        </div>
      </div>
    </div>
  );
};
