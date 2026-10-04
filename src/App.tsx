import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ScreenId } from './types';
import {
  LeafPointIcon,
  BonusStarIcon,
  LadybirdMascotSvg,
  GardenVineFrameSvg,
  StationHeaderIcon
} from './components/Illustrations';
import { StationALifeCycle } from './components/StationALifeCycle';
import { StationBHabitats } from './components/StationBHabitats';
import { StationCSeeds } from './components/StationCSeeds';
import { StationDPredatorPrey } from './components/StationDPredatorPrey';
import { BigConnectionScreen, FinalResultsScreen } from './components/BigConnectionAndResults';

const STATION_CARDS = [
  {
    id: 'A' as const,
    screen: 'station-a' as ScreenId,
    title: 'Station A: Life Cycle Wheel',
    description: 'Place the 7 stages of a flowering plant into the circular life cycle in the right order.',
    pointsLabel: '5 Points'
  },
  {
    id: 'B' as const,
    screen: 'station-b' as ScreenId,
    title: 'Station B: Habitat Detectives',
    description: 'Match plants and animals to their habitats and discover which adaptations help them survive.',
    pointsLabel: '5 Points · +2 Bonus'
  },
  {
    id: 'C' as const,
    screen: 'station-c' as ScreenId,
    title: 'Station C: Seed Inspectors',
    description: 'Inspect seeds with parachutes, wings, hooks, and husks to see how they travel by wind, water, or animal.',
    pointsLabel: '5 Points · +2 Bonus'
  },
  {
    id: 'D' as const,
    screen: 'station-d' as ScreenId,
    title: 'Station D: Predator & Prey Files',
    description: 'Identify predators and prey in four nature scenarios and match their hunting or defence adaptations.',
    pointsLabel: '5 Points'
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [stationCompleted, setStationCompleted] = useState<{
    A: boolean;
    B: boolean;
    C: boolean;
    D: boolean;
  }>({
    A: false,
    B: false,
    C: false,
    D: false
  });

  // Bonus tasks state (in-memory only)
  const [bonusTextB, setBonusTextB] = useState<string>('');
  const [bonusPointsB, setBonusPointsB] = useState<number>(0);
  const [bonusTextC, setBonusTextC] = useState<string>('');
  const [bonusPointsC, setBonusPointsC] = useState<number>(0);

  // Reflection questions state (in-memory only)
  const [reflections, setReflections] = useState({
    q1: '',
    q2: '',
    q3: ''
  });

  // Mascot encouragement state
  const [mascotMessage, setMascotMessage] = useState<string>(
    'Welcome, Garden Explorers! Pick any station card to begin your science investigation.'
  );
  const [mascotMood, setMascotMood] = useState<'happy' | 'encouraging' | 'celebrating'>('happy');

  // Score animation trigger
  const [scoreBounce, setScoreBounce] = useState<boolean>(false);

  const mandatoryPoints =
    (stationCompleted.A ? 5 : 0) +
    (stationCompleted.B ? 5 : 0) +
    (stationCompleted.C ? 5 : 0) +
    (stationCompleted.D ? 5 : 0);

  const totalBonusPoints = bonusPointsB + bonusPointsC;
  const allFourCompleted =
    stationCompleted.A && stationCompleted.B && stationCompleted.C && stationCompleted.D;

  useEffect(() => {
    if (mandatoryPoints > 0 || totalBonusPoints > 0) {
      setScoreBounce(true);
      const timer = setTimeout(() => setScoreBounce(false), 320);
      return () => clearTimeout(timer);
    }
  }, [mandatoryPoints, totalBonusPoints]);

  const handleMascotSay = (
    text: string,
    mood: 'happy' | 'encouraging' | 'celebrating' = 'happy'
  ) => {
    setMascotMessage(text);
    setMascotMood(mood);
  };

  const handleCompleteStation = (station: 'A' | 'B' | 'C' | 'D') => {
    setStationCompleted((prev) => ({
      ...prev,
      [station]: true
    }));
  };

  const handleResetAll = () => {
    setStationCompleted({ A: false, B: false, C: false, D: false });
    setBonusTextB('');
    setBonusPointsB(0);
    setBonusTextC('');
    setBonusPointsC(0);
    setReflections({ q1: '', q2: '', q3: '' });
    setCurrentScreen('home');
    handleMascotSay('Fresh notebook ready! Choose a station to start exploring.', 'happy');
  };

  const navigateTo = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7EF] text-[#1F2D1C]">
      {/* Fixed Top Navigation & Points Bar (3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E5DEC9] px-4 sm:px-8 py-3">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Single Text Element Brand Title */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="text-[22px] sm:text-[25px] font-bold font-display text-[#3B7A2A] tracking-tight whitespace-nowrap truncate cursor-pointer text-left"
          >
            Garden Explorer: Life Cycle &amp; Survival
          </button>

          {/* Zone 2: Clean Typography Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[17px] font-bold text-[#4A5846]">
            {[
              { id: 'home' as ScreenId, label: 'Home Map' },
              { id: 'station-a' as ScreenId, label: 'Station A' },
              { id: 'station-b' as ScreenId, label: 'Station B' },
              { id: 'station-c' as ScreenId, label: 'Station C' },
              { id: 'station-d' as ScreenId, label: 'Station D' },
              { id: 'connection' as ScreenId, label: 'Big Connection' },
              { id: 'results' as ScreenId, label: 'Results' }
            ].map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`py-1 whitespace-nowrap transition-colors duration-150 cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-[#3B7A2A] border-[#3B7A2A]'
                      : 'border-transparent hover:text-[#1F2D1C] hover:border-[#D5CFC0]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Fixed Points Counter (Mandatory / 20 & Bonus / 4) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('results')}
              title="View Garden Score Summary"
              className={`min-h-[44px] px-4 py-1.5 rounded-xl bg-[#FAF7EF] border-2 border-[#3B7A2A] flex items-center gap-3 transition-transform duration-150 cursor-pointer whitespace-nowrap ${
                scoreBounce ? 'animate-score-pop' : ''
              }`}
            >
              <span className="inline-flex items-center gap-1.5 font-bold text-[18px] text-[#1F2D1C] tabular-nums">
                <LeafPointIcon className="w-5 h-5" />
                <span>{mandatoryPoints} / 20</span>
              </span>
              <span className="text-[#C5BEB0]" aria-hidden="true">|</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[18px] text-[#B87714] tabular-nums">
                <BonusStarIcon className="w-5 h-5" />
                <span>+{totalBonusPoints} / 4</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-8 py-6 md:py-8">
        {currentScreen === 'home' && (
          <div className="animate-screen-transition max-w-[1200px] mx-auto">
            {/* Hero Garden Vine Framing & Welcome */}
            <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-sm border border-[#E5DEC9] mb-8 text-center">
              <GardenVineFrameSvg className="w-full h-14 mb-2" />
              <div className="text-sm font-semibold text-[#3B7A2A] mb-1">
                <span>Cambridge Primary Science</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>Stage 5 &amp; 6 Interactive Field Guide</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {Object.values(stationCompleted).filter(Boolean).length} of 4 Stations Completed
                </span>
              </div>
              <h1 className="text-[32px] md:text-[40px] font-bold text-[#1F2D1C] leading-tight max-w-2xl mx-auto">
                Explore How Plants &amp; Animals Grow, Travel, and Survive
              </h1>
              <p className="text-[19px] text-[#4A5846] max-w-2xl mx-auto mt-2">
                Visit all four garden stations to earn up to 20 points (plus 4 bonus points), then connect your discoveries!
              </p>
            </div>

            {/* Four Station Cards Grid (2x2 on Desktop/Tablet) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {STATION_CARDS.map((card) => {
                const isDone = stationCompleted[card.id];
                return (
                  <div
                    key={card.id}
                    className={`bg-white rounded-[20px] p-6 md:p-7 shadow-sm border-2 transition-all duration-150 flex flex-col justify-between ${
                      isDone ? 'border-[#3B7A2A]' : 'border-[#E5DEC9]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <StationHeaderIcon station={card.id} className="w-18 h-18 shrink-0" />
                        <div className="text-sm font-bold text-[#4A5846] text-right">
                          <span>Station {card.id}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span className="text-[#3B7A2A] tabular-nums">{card.pointsLabel}</span>
                          {isDone && (
                            <div className="text-[#3B7A2A] inline-flex items-center gap-1 ml-2">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Completed</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <h2 className="text-[26px] md:text-[28px] font-bold text-[#1F2D1C] leading-snug mb-2">
                        {card.title}
                      </h2>
                      <p className="text-[18px] text-[#4A5846] mb-6">
                        {card.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigateTo(card.screen)}
                      className={`w-full min-h-[52px] px-6 py-3 rounded-xl font-bold text-[19px] transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                        isDone
                          ? 'bg-[#EEF6EB] text-[#3B7A2A] hover:bg-[#E0F0DA] border-2 border-[#3B7A2A]'
                          : 'bg-[#3B7A2A] text-white hover:bg-[#2F6320] active:scale-[0.99] shadow-sm'
                      }`}
                    >
                      <span>{isDone ? 'Review Station' : 'Open station'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom Summary / Big Connection Card */}
            <div
              className={`rounded-[20px] p-6 md:p-7 border-2 flex flex-col md:flex-row items-center justify-between gap-6 ${
                allFourCompleted
                  ? 'bg-[#EEF6EB] border-[#3B7A2A] shadow-sm'
                  : 'bg-white border-[#E5DEC9]'
              }`}
            >
              <div>
                <div className="text-sm font-bold text-[#3B7A2A] mb-1 flex items-center gap-1.5">
                  {allFourCompleted && <Sparkles className="w-4 h-4 text-[#E8A33D]" />}
                  <span>
                    {allFourCompleted
                      ? 'All 4 Stations Completed! Ready for the Final Step'
                      : 'Final Step After Visiting Stations A–D'}
                  </span>
                </div>
                <h2 className="text-[26px] font-bold text-[#1F2D1C]">
                  The Big Connection &amp; Final Garden Results
                </h2>
                <p className="text-[18px] text-[#4A5846] mt-1">
                  Answer 3 short reflection questions and see your celebratory blooming garden score!
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => navigateTo('connection')}
                  className="flex-1 md:flex-initial min-h-[52px] px-6 py-3 rounded-xl bg-[#3B7A2A] text-white font-bold text-[18px] hover:bg-[#2F6320] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Open The Big Connection</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('results')}
                  className="flex-1 md:flex-initial min-h-[52px] px-5 py-3 rounded-xl bg-[#5B9BD5] text-white font-bold text-[18px] hover:bg-[#4A89C2] active:scale-[0.98] transition-all duration-150 whitespace-nowrap cursor-pointer"
                >
                  View Results
                </button>
              </div>
            </div>
          </div>
        )}

        {currentScreen === 'station-a' && (
          <StationALifeCycle
            isCompleted={stationCompleted.A}
            onComplete={() => handleCompleteStation('A')}
            onNavigateHome={() => navigateTo('home')}
            onNavigateNext={() => navigateTo('station-b')}
            onMascotSay={handleMascotSay}
          />
        )}

        {currentScreen === 'station-b' && (
          <StationBHabitats
            isCompleted={stationCompleted.B}
            onComplete={() => handleCompleteStation('B')}
            bonusText={bonusTextB}
            onChangeBonusText={setBonusTextB}
            bonusPointsAwarded={bonusPointsB}
            onAwardBonusPoints={setBonusPointsB}
            onNavigateHome={() => navigateTo('home')}
            onNavigateNext={() => navigateTo('station-c')}
            onMascotSay={handleMascotSay}
          />
        )}

        {currentScreen === 'station-c' && (
          <StationCSeeds
            isCompleted={stationCompleted.C}
            onComplete={() => handleCompleteStation('C')}
            bonusText={bonusTextC}
            onChangeBonusText={setBonusTextC}
            bonusPointsAwarded={bonusPointsC}
            onAwardBonusPoints={setBonusPointsC}
            onNavigateHome={() => navigateTo('home')}
            onNavigateNext={() => navigateTo('station-d')}
            onMascotSay={handleMascotSay}
          />
        )}

        {currentScreen === 'station-d' && (
          <StationDPredatorPrey
            isCompleted={stationCompleted.D}
            onComplete={() => handleCompleteStation('D')}
            onNavigateHome={() => navigateTo('home')}
            onNavigateConnection={() => navigateTo('connection')}
            onMascotSay={handleMascotSay}
          />
        )}

        {currentScreen === 'connection' && (
          <BigConnectionScreen
            reflections={reflections}
            onChangeReflection={(key, val) =>
              setReflections((prev) => ({ ...prev, [key]: val }))
            }
            onNavigateHome={() => navigateTo('home')}
            onNavigateResults={() => navigateTo('results')}
          />
        )}

        {currentScreen === 'results' && (
          <FinalResultsScreen
            stationCompleted={stationCompleted}
            mandatoryPoints={mandatoryPoints}
            bonusPointsB={bonusPointsB}
            bonusPointsC={bonusPointsC}
            bonusTextB={bonusTextB}
            bonusTextC={bonusTextC}
            reflections={reflections}
            onNavigateHome={() => navigateTo('home')}
            onNavigateConnection={() => navigateTo('connection')}
            onResetAll={handleResetAll}
          />
        )}
      </main>

      {/* Friendly Ladybird Mascot Encouragement Bar */}
      <footer className="max-w-[1200px] w-full mx-auto px-4 sm:px-8 pb-6 pt-2">
        <div className="bg-white rounded-[20px] px-5 py-3.5 shadow-sm border border-[#E5DEC9] flex items-center gap-4">
          <div className="animate-mascot-float shrink-0">
            <LadybirdMascotSvg mood={mascotMood} className="w-14 h-14" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#3B7A2A] tracking-wide">
              Garden Guide · Field Encouragement
            </div>
            <p className="text-[18px] font-semibold text-[#1F2D1C]">
              {mascotMessage}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
