import React from 'react';
import { DispersalMethod, HabitatCardData, PredatorPreyScenario } from '../types';

export const LeafPointIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <path
      d="M26 6C15 6 7 12 7 23C18 23 26 17 26 6Z"
      fill="#3B7A2A"
      stroke="#255219"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 26C10 21 16 15 23 10"
      stroke="#FAF7EF"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const BonusStarIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <path
      d="M16 4L19.5 11.2L27.5 12.3L21.7 17.9L23.1 25.8L16 22.1L8.9 25.8L10.3 17.9L4.5 12.3L12.5 11.2L16 4Z"
      fill="#E8A33D"
      stroke="#B87714"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const LadybirdMascotSvg: React.FC<{
  mood?: 'happy' | 'encouraging' | 'celebrating';
  className?: string;
}> = ({ mood = 'happy', className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
    {/* Friendly Leaf Perch */}
    <path
      d="M10 62C22 48 52 44 72 56C56 70 26 72 10 62Z"
      fill="#6BAE52"
      stroke="#3B7A2A"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M14 61C32 56 50 55 68 56" stroke="#3B7A2A" strokeWidth="2" strokeLinecap="round" />

    {/* Antennae */}
    <path d="M49 28C53 21 58 20 61 22" stroke="#1F2D1C" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M44 25C46 18 50 15 54 16" stroke="#1F2D1C" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="61" cy="22" r="2.5" fill="#E8A33D" />
    <circle cx="54" cy="16" r="2.5" fill="#E8A33D" />

    {/* Head */}
    <circle cx="46" cy="35" r="9" fill="#1F2D1C" />
    <circle cx="49" cy="33" r="2.2" fill="#FFFFFF" />

    {/* Red-Amber Shell */}
    <path
      d="M20 44C20 30 31 22 43 26C48 28 48 49 42 51C30 53 20 51 20 44Z"
      fill="#D9534F"
      stroke="#1F2D1C"
      strokeWidth="2.5"
    />
    {/* Dots */}
    <circle cx="30" cy="34" r="3" fill="#1F2D1C" />
    <circle cx="38" cy="39" r="3.2" fill="#1F2D1C" />
    <circle cx="28" cy="44" r="2.6" fill="#1F2D1C" />

    {/* Celebrating Sparkles */}
    {mood === 'celebrating' && (
      <g>
        <circle cx="22" cy="18" r="3" fill="#E8A33D" />
        <circle cx="65" cy="36" r="2.5" fill="#E8A33D" />
        <circle cx="15" cy="32" r="2" fill="#5B9BD5" />
      </g>
    )}
  </svg>
);

export const GardenVineFrameSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-14' }) => (
  <svg viewBox="0 0 800 64" fill="none" className={className} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    {/* Flowing vine */}
    <path
      d="M20 36C140 12 260 54 400 32C540 10 660 52 780 28"
      stroke="#3B7A2A"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Leaves along the vine */}
    <path d="M95 25C85 10 105 6 115 20C105 26 98 27 95 25Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2" />
    <path d="M210 38C200 52 222 58 230 42C220 38 214 37 210 38Z" fill="#3B7A2A" />
    <path d="M330 38C322 22 344 18 350 34C342 38 335 39 330 38Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2" />
    <path d="M475 24C468 39 490 44 496 28C486 24 480 23 475 24Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2" />
    <path d="M600 36C592 20 614 15 620 31C611 36 605 37 600 36Z" fill="#3B7A2A" />
    <path d="M710 36C702 50 724 55 730 39C721 36 715 35 710 36Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2" />
    {/* Small amber flowers */}
    <circle cx="155" cy="28" r="6" fill="#E8A33D" />
    <circle cx="155" cy="28" r="2.5" fill="#FAF7EF" />
    <circle cx="400" cy="32" r="8" fill="#E8A33D" stroke="#B87714" strokeWidth="2" />
    <circle cx="400" cy="32" r="3" fill="#FAF7EF" />
    <circle cx="655" cy="34" r="6" fill="#5B9BD5" />
    <circle cx="655" cy="34" r="2.5" fill="#FAF7EF" />
  </svg>
);

export const StationHeaderIcon: React.FC<{ station: 'A' | 'B' | 'C' | 'D'; className?: string }> = ({
  station,
  className = 'w-16 h-16'
}) => {
  switch (station) {
    case 'A':
      // Looping circular arrow with leaf
      return (
        <svg viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
          <circle cx="36" cy="36" r="32" fill="#EEF6EB" />
          <path
            d="M36 14C48.15 14 58 23.85 58 36C58 48.15 48.15 58 36 58C25.5 58 16.7 50.6 14.5 40.8"
            stroke="#3B7A2A"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Arrow head at top */}
          <path
            d="M28 19L37 13L33 24"
            stroke="#3B7A2A"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Sprout in center */}
          <path
            d="M36 45V29"
            stroke="#3B7A2A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M36 35C36 27 46 25 47 32C47 38 39 38 36 35Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="2.2"
          />
          <path
            d="M36 38C36 31 26 29 25 35C25 40 33 40 36 38Z"
            fill="#E8A33D"
            stroke="#B87714"
            strokeWidth="2.2"
          />
        </svg>
      );
    case 'B':
      // Magnifying glass over a leaf
      return (
        <svg viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
          <circle cx="36" cy="36" r="32" fill="#EBF3FA" />
          {/* Leaf behind */}
          <path
            d="M20 48C20 28 36 18 52 20C50 36 40 48 20 48Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M22 46L44 26" stroke="#FAF7EF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Magnifying glass */}
          <circle
            cx="34"
            cy="34"
            r="14"
            fill="#FAF7EF"
            fillOpacity="0.55"
            stroke="#5B9BD5"
            strokeWidth="4.5"
          />
          <path
            d="M44 44L56 56"
            stroke="#E8A33D"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'C':
      // Dandelion seed
      return (
        <svg viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
          <circle cx="36" cy="36" r="32" fill="#FDF5E6" />
          {/* Fluffy parachute lines */}
          <path d="M36 36L22 20" stroke="#5B9BD5" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 36L30 16" stroke="#5B9BD5" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 36L39 16" stroke="#5B9BD5" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 36L48 20" stroke="#5B9BD5" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 36L53 28" stroke="#5B9BD5" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 36L18 28" stroke="#5B9BD5" strokeWidth="2.5" strokeLinecap="round" />
          {/* Fluffy puffs */}
          <circle cx="22" cy="20" r="4" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="30" cy="16" r="4.5" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="39" cy="16" r="4.5" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="48" cy="20" r="4" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="53" cy="28" r="3.5" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="18" cy="28" r="3.5" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          {/* Stem & seed at base */}
          <path d="M36 36L32 52" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="31" cy="55" rx="3.5" ry="5.5" transform="rotate(14 31 55)" fill="#E8A33D" stroke="#8C6239" strokeWidth="2.2" />
        </svg>
      );
    case 'D':
      // Paw print
      return (
        <svg viewBox="0 0 72 72" fill="none" className={className} aria-hidden="true">
          <circle cx="36" cy="36" r="32" fill="#EEF6EB" />
          {/* Main pad */}
          <path
            d="M24 44C24 37 30 33 36 33C42 33 48 37 48 44C48 49 44 52 39 51C37 50.5 35 50.5 33 51C28 52 24 49 24 44Z"
            fill="#3B7A2A"
          />
          {/* Toe pads */}
          <ellipse cx="22" cy="29" rx="4.5" ry="6" transform="rotate(-20 22 29)" fill="#E8A33D" />
          <ellipse cx="31" cy="23" rx="4.5" ry="6.5" transform="rotate(-6 31 23)" fill="#3B7A2A" />
          <ellipse cx="41" cy="23" rx="4.5" ry="6.5" transform="rotate(6 41 23)" fill="#3B7A2A" />
          <ellipse cx="50" cy="29" rx="4.5" ry="6" transform="rotate(20 50 29)" fill="#E8A33D" />
        </svg>
      );
  }
};

export const LifeCycleStageSvg: React.FC<{ stageId: string; className?: string }> = ({
  stageId,
  className = 'w-14 h-14'
}) => {
  switch (stageId) {
    case 'seed':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          {/* Soil line */}
          <path d="M8 44Q32 40 56 44" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
          <rect x="8" y="44" width="48" height="12" rx="4" fill="#D4A359" fillOpacity="0.35" />
          {/* Bean seed */}
          <path
            d="M22 36C20 27 29 21 38 24C45 26 46 35 41 40C35 45 24 43 22 36Z"
            fill="#E8A33D"
            stroke="#8C6239"
            strokeWidth="3"
          />
          <path d="M30 28C33 27 36 29 37 32" stroke="#FAF7EF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case 'sprout_root':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          {/* Soil line */}
          <path d="M8 32Q32 29 56 32" stroke="#8C6239" strokeWidth="2.5" strokeLinecap="round" />
          {/* Seed body */}
          <ellipse cx="32" cy="32" rx="10" ry="7" fill="#E8A33D" stroke="#8C6239" strokeWidth="2.8" />
          {/* Emerging white/green radicle root pushing down */}
          <path
            d="M35 36C37 42 34 49 29 55"
            stroke="#6BAE52"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path d="M34 46L41 50" stroke="#6BAE52" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 50L25 52" stroke="#6BAE52" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'seedling':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          {/* Soil */}
          <path d="M10 46H54" stroke="#8C6239" strokeWidth="3.5" strokeLinecap="round" />
          {/* Small root below */}
          <path d="M32 46V56M32 51L26 55M32 52L38 56" stroke="#8C6239" strokeWidth="2.2" strokeLinecap="round" />
          {/* Stem */}
          <path d="M32 46V24" stroke="#3B7A2A" strokeWidth="4" strokeLinecap="round" />
          {/* Two baby leaves */}
          <path
            d="M32 28C32 18 46 16 47 25C47 32 36 32 32 28Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="2.5"
          />
          <path
            d="M32 30C32 20 18 18 17 27C17 34 28 34 32 30Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="2.5"
          />
        </svg>
      );
    case 'leafy_plant':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path d="M10 52H54" stroke="#8C6239" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 52V14" stroke="#3B7A2A" strokeWidth="4" strokeLinecap="round" />
          {/* Lower leaves */}
          <path d="M32 42C32 32 48 30 50 38C50 45 36 45 32 42Z" fill="#3B7A2A" />
          <path d="M32 42C32 32 16 30 14 38C14 45 28 45 32 42Z" fill="#3B7A2A" />
          {/* Upper leaves */}
          <path d="M32 27C32 17 47 15 48 23C48 30 36 30 32 27Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2" />
          <path d="M32 27C32 17 17 15 16 23C16 30 28 30 32 27Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2" />
          {/* Top crown leaf */}
          <path d="M32 16C27 8 37 8 32 16Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2.5" />
        </svg>
      );
    case 'flower':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          <path d="M32 56V32" stroke="#3B7A2A" strokeWidth="4" strokeLinecap="round" />
          <path d="M32 46C32 39 43 38 44 43C44 48 35 48 32 46Z" fill="#6BAE52" />
          <path d="M32 48C32 41 21 40 20 45C20 50 29 50 32 48Z" fill="#6BAE52" />
          {/* Petals */}
          <circle cx="32" cy="14" r="7" fill="#E8A33D" />
          <circle cx="43" cy="21" r="7" fill="#E8A33D" />
          <circle cx="39" cy="33" r="7" fill="#E8A33D" />
          <circle cx="25" cy="33" r="7" fill="#E8A33D" />
          <circle cx="21" cy="21" r="7" fill="#E8A33D" />
          {/* Flower center */}
          <circle cx="32" cy="24" r="7" fill="#8C6239" stroke="#FAF7EF" strokeWidth="2" />
        </svg>
      );
    case 'pollination':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          {/* Flower on left/bottom */}
          <path d="M26 56V36" stroke="#3B7A2A" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="26" cy="24" r="5.5" fill="#E8A33D" />
          <circle cx="35" cy="30" r="5.5" fill="#E8A33D" />
          <circle cx="32" cy="39" r="5.5" fill="#E8A33D" />
          <circle cx="20" cy="39" r="5.5" fill="#E8A33D" />
          <circle cx="17" cy="30" r="5.5" fill="#E8A33D" />
          <circle cx="26" cy="32" r="5.5" fill="#8C6239" />
          {/* Friendly Bee & Pollen Dots */}
          <ellipse cx="47" cy="18" rx="8" ry="5.5" fill="#E8A33D" stroke="#1F2D1C" strokeWidth="2.2" />
          <path d="M45 13V23M49 13V23" stroke="#1F2D1C" strokeWidth="2.2" />
          {/* Wings */}
          <ellipse cx="46" cy="11" rx="4" ry="3" fill="#5B9BD5" fillOpacity="0.6" />
          {/* Golden pollen dots */}
          <circle cx="36" cy="21" r="2.2" fill="#E8A33D" />
          <circle cx="31" cy="25" r="2.2" fill="#E8A33D" />
          <circle cx="40" cy="25" r="2" fill="#E8A33D" />
        </svg>
      );
    case 'seed_pod':
    default:
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
          {/* Stem */}
          <path d="M18 16C24 16 28 20 30 25" stroke="#3B7A2A" strokeWidth="3.5" strokeLinecap="round" />
          {/* Pea/Bean Pod */}
          <path
            d="M18 24C28 16 48 24 50 42C36 48 18 40 18 24Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Seeds glowing inside the open slit */}
          <circle cx="28" cy="31" r="4" fill="#E8A33D" stroke="#8C6239" strokeWidth="1.8" />
          <circle cx="36" cy="35" r="4" fill="#E8A33D" stroke="#8C6239" strokeWidth="1.8" />
          <circle cx="43" cy="38" r="3.5" fill="#E8A33D" stroke="#8C6239" strokeWidth="1.8" />
        </svg>
      );
  }
};

export const HabitatSceneSvg: React.FC<{ cardId: HabitatCardData['id']; className?: string }> = ({
  cardId,
  className = 'w-full h-56'
}) => {
  switch (cardId) {
    case 'giraffe':
      return (
        <svg viewBox="0 0 480 220" fill="none" className={className} role="img" aria-label="Savanna habitat with giraffe">
          {/* Warm Savanna Sky */}
          <rect width="480" height="220" rx="16" fill="#FDF6E4" />
          {/* Warm Golden Sun */}
          <circle cx="90" cy="62" r="30" fill="#E8A33D" fillOpacity="0.85" />
          <circle cx="90" cy="62" r="40" fill="#E8A33D" fillOpacity="0.2" />
          {/* Soft Savanna Dunes */}
          <path d="M0 165Q130 135 280 165T480 155V220H0V165Z" fill="#EED5A5" />
          <path d="M0 185Q180 165 350 185T480 180V220H0V185Z" fill="#DFB876" />
          {/* Flat-topped Acacia Tree on right */}
          <path d="M375 182L380 105M380 125L350 102M380 120L412 100" stroke="#8C6239" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="380" cy="96" rx="58" ry="16" fill="#3B7A2A" />
          <ellipse cx="350" cy="104" rx="32" ry="11" fill="#6BAE52" />
          {/* Friendly Flat Giraffe Illustration */}
          {/* Legs */}
          <path d="M215 145V195M230 145V192M262 145V195M274 145V192" stroke="#E8A33D" strokeWidth="6" strokeLinecap="round" />
          {/* Body */}
          <rect x="208" y="118" width="72" height="34" rx="16" fill="#E8A33D" stroke="#8C6239" strokeWidth="2.5" />
          {/* Long Neck reaching toward tree */}
          <path d="M262 126L300 52L315 56L278 134Z" fill="#E8A33D" stroke="#8C6239" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Giraffe Head & Ossicones */}
          <path d="M298 46V36M306 48V38" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="312" cy="52" rx="16" ry="9" fill="#E8A33D" stroke="#8C6239" strokeWidth="2.5" />
          <circle cx="315" cy="50" r="2.2" fill="#1F2D1C" />
          {/* Long tongue reaching leaf */}
          <path d="M328 53Q338 55 342 49" stroke="#D9534F" strokeWidth="3" strokeLinecap="round" />
          {/* Brown Spots */}
          <circle cx="226" cy="132" r="5" fill="#8C6239" />
          <circle cx="246" cy="128" r="6" fill="#8C6239" />
          <circle cx="258" cy="140" r="4.5" fill="#8C6239" />
          <circle cx="282" cy="105" r="4.5" fill="#8C6239" />
          <circle cx="292" cy="84" r="4" fill="#8C6239" />
          <circle cx="300" cy="66" r="3.5" fill="#8C6239" />
        </svg>
      );

    case 'polar_bear':
      return (
        <svg viewBox="0 0 480 220" fill="none" className={className} role="img" aria-label="Cold and wet Arctic sea ice with polar bear">
          {/* Arctic Sky */}
          <rect width="480" height="220" rx="16" fill="#E6F2FA" />
          {/* Distant Icebergs */}
          <path d="M40 145L85 75L135 145H40Z" fill="#FFFFFF" />
          <path d="M85 75L135 145H95L85 75Z" fill="#CBE3F5" />
          <path d="M350 145L395 88L445 145H350Z" fill="#FFFFFF" />
          {/* Cold Arctic Sea */}
          <rect x="0" y="145" width="480" height="75" rx="8" fill="#5B9BD5" />
          {/* Water waves */}
          <path d="M30 175Q55 167 80 175T130 175" stroke="#FAF7EF" strokeWidth="3" strokeLinecap="round" />
          <path d="M340 190Q365 182 390 190T440 190" stroke="#FAF7EF" strokeWidth="3" strokeLinecap="round" />
          {/* Floating Ice Floe */}
          <ellipse cx="240" cy="162" rx="115" ry="22" fill="#FFFFFF" stroke="#B6D7F0" strokeWidth="3" />
          {/* Friendly Polar Bear */}
          <rect x="175" y="128" width="16" height="32" rx="8" fill="#FAF7EF" stroke="#5B9BD5" strokeWidth="2.5" />
          <rect x="202" y="130" width="16" height="30" rx="8" fill="#FAF7EF" stroke="#5B9BD5" strokeWidth="2.5" />
          <rect x="248" y="128" width="16" height="32" rx="8" fill="#FAF7EF" stroke="#5B9BD5" strokeWidth="2.5" />
          <rect x="272" y="130" width="16" height="30" rx="8" fill="#FAF7EF" stroke="#5B9BD5" strokeWidth="2.5" />
          {/* Rounded thick body */}
          <rect x="170" y="86" width="118" height="56" rx="28" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2.8" />
          {/* Small round ears */}
          <circle cx="276" cy="84" r="7" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2.5" />
          {/* Head */}
          <rect x="268" y="82" width="46" height="36" rx="18" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2.8" />
          <circle cx="298" cy="95" r="2.8" fill="#1F2D1C" />
          <circle cx="311" cy="100" r="4.5" fill="#1F2D1C" />
          {/* Tail */}
          <circle cx="168" cy="102" r="8" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2.5" />
        </svg>
      );

    case 'aloe':
      return (
        <svg viewBox="0 0 480 220" fill="none" className={className} role="img" aria-label="Hot and dry desert with succulent aloe plant">
          {/* Desert Sky */}
          <rect width="480" height="220" rx="16" fill="#FDF6E4" />
          {/* Hot Sun */}
          <circle cx="390" cy="58" r="28" fill="#E8A33D" />
          <circle cx="390" cy="58" r="38" fill="#E8A33D" fillOpacity="0.22" />
          {/* Desert Dunes */}
          <path d="M0 158Q140 125 290 162T480 148V220H0V158Z" fill="#EED5A5" />
          <path d="M0 180Q200 155 370 182T480 175V220H0V180Z" fill="#D9B172" />
          {/* Succulent Aloe Plant Rosette */}
          {/* Back leaves */}
          <path d="M240 175C220 130 195 95 182 68C210 85 232 120 245 175Z" fill="#3B7A2A" />
          <path d="M240 175C260 130 285 95 298 68C270 85 248 120 235 175Z" fill="#3B7A2A" />
          {/* Center upright fleshy leaf */}
          <path
            d="M226 178C224 125 232 78 240 52C248 78 256 125 254 178Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="3"
          />
          {/* Left & Right fleshy leaves */}
          <path
            d="M234 178C200 148 168 125 148 110C182 114 214 136 240 175Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="3"
          />
          <path
            d="M246 178C280 148 312 125 332 110C298 114 266 136 240 175Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="3"
          />
          {/* Waxy shine highlights on succulent leaves */}
          <path d="M240 75V125" stroke="#FAF7EF" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" />
          <path d="M175 124L210 148" stroke="#FAF7EF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M305 124L270 148" stroke="#FAF7EF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'heron':
    default:
      return (
        <svg viewBox="0 0 480 220" fill="none" className={className} role="img" aria-label="Wetland marsh with reeds and wading heron">
          {/* Soft Wetland Sky */}
          <rect width="480" height="220" rx="16" fill="#EBF5F0" />
          {/* Calm Marsh Water */}
          <rect x="0" y="150" width="480" height="70" rx="8" fill="#5B9BD5" fillOpacity="0.35" />
          {/* Water ripples */}
          <ellipse cx="240" cy="186" rx="58" ry="8" stroke="#5B9BD5" strokeWidth="2.5" />
          <ellipse cx="240" cy="186" rx="32" ry="4" stroke="#5B9BD5" strokeWidth="2" />
          <path d="M70 172H130M350 176H415" stroke="#5B9BD5" strokeWidth="2.5" strokeLinecap="round" />
          {/* Wetland Reeds / Bullrushes Left & Right */}
          <path d="M85 190V75M105 190V90" stroke="#3B7A2A" strokeWidth="4" strokeLinecap="round" />
          <rect x="80" y="88" width="10" height="28" rx="5" fill="#8C6239" />
          <path d="M85 150C68 130 62 110 60 95" stroke="#6BAE52" strokeWidth="4" strokeLinecap="round" />
          <path d="M385 190V78M405 190V95" stroke="#3B7A2A" strokeWidth="4" strokeLinecap="round" />
          <rect x="380" y="92" width="10" height="28" rx="5" fill="#8C6239" />
          {/* Friendly Heron */}
          {/* Long Wading Legs */}
          <path d="M232 132V186M248 132V186" stroke="#E8A33D" strokeWidth="4" strokeLinecap="round" />
          <path d="M224 186H240M240 186H258" stroke="#E8A33D" strokeWidth="3.5" strokeLinecap="round" />
          {/* Body */}
          <path
            d="M195 122C195 100 225 92 258 102C266 118 252 136 225 136C205 136 195 130 195 122Z"
            fill="#5B9BD5"
            stroke="#2B5B84"
            strokeWidth="2.8"
          />
          {/* S-curved neck */}
          <path
            d="M250 105C262 85 245 64 256 48"
            stroke="#FAF7EF"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M250 105C262 85 245 64 256 48"
            stroke="#2B5B84"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Head & Dagger Beak */}
          <circle cx="258" cy="46" r="9" fill="#FAF7EF" stroke="#2B5B84" strokeWidth="2.5" />
          <path d="M266 43L298 48L266 51Z" fill="#E8A33D" stroke="#B87714" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="261" cy="45" r="2" fill="#1F2D1C" />
        </svg>
      );
  }
};

export const SeedItemSvg: React.FC<{ seedId: string; className?: string }> = ({
  seedId,
  className = 'w-36 h-36'
}) => {
  switch (seedId) {
    case 'dandelion':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Fluffy round dandelion seed puff">
          <circle cx="60" cy="60" r="52" fill="#EBF3FA" />
          {/* Radial parachute filaments */}
          <g stroke="#5B9BD5" strokeWidth="2.2" strokeLinecap="round">
            <line x1="60" y1="62" x2="34" y2="32" />
            <line x1="60" y1="62" x2="46" y2="24" />
            <line x1="60" y1="62" x2="60" y2="22" />
            <line x1="60" y1="62" x2="74" y2="24" />
            <line x1="60" y1="62" x2="86" y2="32" />
            <line x1="60" y1="62" x2="92" y2="46" />
            <line x1="60" y1="62" x2="28" y2="46" />
          </g>
          {/* Fluffy white cloud puffs */}
          <circle cx="34" cy="32" r="7" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="46" cy="24" r="7.5" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="60" cy="22" r="8" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="74" cy="24" r="7.5" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="86" cy="32" r="7" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="92" cy="46" r="6.5" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          <circle cx="28" cy="46" r="6.5" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
          {/* Stalk and seed body */}
          <line x1="60" y1="62" x2="55" y2="88" stroke="#8C6239" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="54" cy="93" rx="5.5" ry="9" transform="rotate(10 54 93)" fill="#E8A33D" stroke="#8C6239" strokeWidth="2.5" />
        </svg>
      );

    case 'sycamore':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Winged spinning sycamore helicopter seed">
          <circle cx="60" cy="60" r="52" fill="#EEF6EB" />
          {/* Spinning motion lines */}
          <path d="M24 38C42 24 78 24 96 38" stroke="#5B9BD5" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" />
          {/* Left Wing */}
          <path
            d="M56 64C38 46 16 42 16 56C16 70 38 74 56 68Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="3"
          />
          {/* Right Wing */}
          <path
            d="M64 64C82 46 104 42 104 56C104 70 82 74 64 68Z"
            fill="#6BAE52"
            stroke="#3B7A2A"
            strokeWidth="3"
          />
          {/* Wing veins */}
          <path d="M52 65L26 56M68 65L94 56" stroke="#FAF7EF" strokeWidth="2" strokeLinecap="round" />
          {/* Central double seed nutlet */}
          <circle cx="55" cy="67" r="7" fill="#E8A33D" stroke="#8C6239" strokeWidth="2.5" />
          <circle cx="65" cy="67" r="7" fill="#E8A33D" stroke="#8C6239" strokeWidth="2.5" />
          <path d="M60 64V85" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'burr':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Round spiky burr seed with tiny hooks">
          <circle cx="60" cy="60" r="52" fill="#FDF5E6" />
          {/* Hooked spikes radiating around */}
          <g stroke="#8C6239" strokeWidth="3" strokeLinecap="round">
            <path d="M60 28V16C60 13 65 13 65 16" />
            <path d="M60 92V104C60 107 55 107 55 104" />
            <path d="M28 60H16C13 60 13 55 16 55" />
            <path d="M92 60H104C107 60 107 65 104 65" />
            <path d="M37 37L27 27C25 25 28 21 31 24" />
            <path d="M83 37L93 27C95 25 92 21 89 24" />
            <path d="M37 83L27 93C25 95 28 99 31 96" />
            <path d="M83 83L93 93C95 95 92 99 89 96" />
          </g>
          {/* Burr Core */}
          <circle cx="60" cy="60" r="26" fill="#E8A33D" stroke="#8C6239" strokeWidth="3.5" />
          <circle cx="52" cy="53" r="3" fill="#8C6239" />
          <circle cx="68" cy="53" r="3" fill="#8C6239" />
          <circle cx="60" cy="66" r="3" fill="#8C6239" />
          <circle cx="49" cy="65" r="2.5" fill="#8C6239" />
          <circle cx="71" cy="65" r="2.5" fill="#8C6239" />
        </svg>
      );

    case 'coconut':
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Brown coconut with green leaf sprout floating on water">
          <circle cx="60" cy="60" r="52" fill="#EBF3FA" />
          {/* Sprout at top */}
          <path d="M60 44V20" stroke="#3B7A2A" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 28C60 16 78 14 80 24C80 32 66 32 60 28Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2.5" />
          <path d="M60 32C60 20 42 18 40 28C40 36 54 36 60 32Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2.5" />
          {/* Coconut Husk */}
          <ellipse cx="60" cy="66" rx="28" ry="22" fill="#8C6239" stroke="#5A3C20" strokeWidth="3" />
          <path d="M42 62C52 57 68 57 78 62" stroke="#D4A359" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M45 72C55 68 65 68 75 72" stroke="#D4A359" strokeWidth="2.5" strokeLinecap="round" />
          {/* Water waves underneath */}
          <path
            d="M20 84Q35 76 50 84T80 84T100 84"
            stroke="#5B9BD5"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M28 94Q45 88 62 94T94 94"
            stroke="#5B9BD5"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'berry':
    default:
      return (
        <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Juicy woodland berry with seeds inside">
          <circle cx="60" cy="60" r="52" fill="#FDF5E6" />
          {/* Green leafy calyx at top */}
          <path d="M60 34V18" stroke="#3B7A2A" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 34C48 24 36 28 42 38C48 42 56 38 60 34Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2.5" />
          <path d="M60 34C72 24 84 28 78 38C72 42 64 38 60 34Z" fill="#6BAE52" stroke="#3B7A2A" strokeWidth="2.5" />
          {/* Berry drupelets */}
          <circle cx="50" cy="52" r="11" fill="#D9534F" stroke="#8C2D29" strokeWidth="2.5" />
          <circle cx="70" cy="52" r="11" fill="#D9534F" stroke="#8C2D29" strokeWidth="2.5" />
          <circle cx="44" cy="68" r="11" fill="#D9534F" stroke="#8C2D29" strokeWidth="2.5" />
          <circle cx="76" cy="68" r="11" fill="#D9534F" stroke="#8C2D29" strokeWidth="2.5" />
          <circle cx="60" cy="62" r="12" fill="#E8A33D" stroke="#B87714" strokeWidth="2.5" />
          <circle cx="52" cy="82" r="11" fill="#D9534F" stroke="#8C2D29" strokeWidth="2.5" />
          <circle cx="68" cy="82" r="11" fill="#D9534F" stroke="#8C2D29" strokeWidth="2.5" />
          {/* Shine dots */}
          <circle cx="57" cy="59" r="3" fill="#FAF7EF" />
          <circle cx="47" cy="49" r="2.5" fill="#FAF7EF" />
          <circle cx="67" cy="49" r="2.5" fill="#FAF7EF" />
        </svg>
      );
  }
};

export const DispersalBadgeSvg: React.FC<{
  method: DispersalMethod;
  active: boolean;
  className?: string;
}> = ({ method, active, className = 'w-12 h-12' }) => {
  const bg = active ? '#3B7A2A' : '#FAF7EF';
  const stroke = active ? '#FAF7EF' : '#5B9BD5';
  const accent = active ? '#E8A33D' : '#3B7A2A';

  if (method === 'wind') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <circle cx="24" cy="24" r="21" fill={bg} stroke={active ? '#3B7A2A' : '#D5CFC0'} strokeWidth="2.5" />
        <path
          d="M12 20H30C33 20 35 18 35 15.5C35 13 33 11 30.5 11C28.5 11 27 12.5 27 14.5"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M10 26H34C37 26 39 28 39 30.5C39 33 37 35 34.5 35C32 35 30.5 33.5 30.5 31.5"
          stroke={accent}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M14 32H24" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (method === 'water') {
    return (
      <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
        <circle cx="24" cy="24" r="21" fill={bg} stroke={active ? '#3B7A2A' : '#D5CFC0'} strokeWidth="2.5" />
        <path
          d="M24 11C24 11 14 23 14 29.5C14 35 18.5 39 24 39C29.5 39 34 35 34 29.5C34 23 24 11 24 11Z"
          fill={active ? '#5B9BD5' : '#E6F2FA'}
          stroke={stroke}
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <path d="M20 31C20 33.5 21.5 35 24 35" stroke="#FAF7EF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill={bg} stroke={active ? '#3B7A2A' : '#D5CFC0'} strokeWidth="2.5" />
      <path
        d="M17 30C17 26 20 23.5 24 23.5C28 23.5 31 26 31 30C31 33 28.5 35 25.5 34.5C24.5 34.2 23.5 34.2 22.5 34.5C19.5 35 17 33 17 30Z"
        fill={accent}
      />
      <circle cx="15.5" cy="20.5" r="3" fill={stroke} />
      <circle cx="21" cy="17" r="3" fill={stroke} />
      <circle cx="27" cy="17" r="3" fill={stroke} />
      <circle cx="32.5" cy="20.5" r="3" fill={stroke} />
    </svg>
  );
};

export const PredatorPreySceneSvg: React.FC<{
  scenarioId: PredatorPreyScenario['id'];
  selectedPredator: 'A' | 'B' | null;
  onSelectShape?: (shape: 'A' | 'B') => void;
  className?: string;
}> = ({ scenarioId, selectedPredator, onSelectShape, className = 'w-full h-60' }) => {
  const badgeColor = (shape: 'A' | 'B') => {
    if (!selectedPredator) return '#5B9BD5';
    return selectedPredator === shape ? '#E8A33D' : '#3B7A2A';
  };

  switch (scenarioId) {
    case 'spider_fly':
      return (
        <svg viewBox="0 0 500 220" fill="none" className={className} role="img" aria-label="Spider web with spider shape A and winged insect shape B">
          <rect width="500" height="220" rx="16" fill="#EEF6EB" />
          {/* Silk Web Geometry */}
          <g stroke="#3B7A2A" strokeOpacity="0.35" strokeWidth="2">
            <line x1="150" y1="20" x2="150" y2="200" />
            <line x1="60" y1="110" x2="240" y2="110" />
            <line x1="86" y1="46" x2="214" y2="174" />
            <line x1="214" y1="46" x2="86" y2="174" />
            <circle cx="150" cy="110" r="28" />
            <circle cx="150" cy="110" r="56" />
            <circle cx="150" cy="110" r="82" />
          </g>

          {/* Shape A: Garden Spider Silhouette */}
          <g
            onClick={() => onSelectShape && onSelectShape('A')}
            className="cursor-pointer"
          >
            <circle cx="150" cy="110" r="14" fill="#1F2D1C" />
            <circle cx="150" cy="93" r="8" fill="#1F2D1C" />
            {/* 8 legs */}
            <path
              d="M142 98L118 82M140 106L112 104M140 114L114 126M142 120L122 142"
              stroke="#1F2D1C"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M158 98L182 82M160 106L188 104M160 114L186 126M158 120L178 142"
              stroke="#1F2D1C"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Label A */}
            <circle cx="150" cy="162" r="16" fill={badgeColor('A')} />
            <text x="150" y="168" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              A
            </text>
          </g>

          {/* Flight path */}
          <path d="M410 95Q335 65 280 95" stroke="#E8A33D" strokeWidth="2.5" strokeDasharray="6 6" strokeLinecap="round" />

          {/* Shape B: Winged Fly Silhouette */}
          <g
            onClick={() => onSelectShape && onSelectShape('B')}
            className="cursor-pointer"
          >
            <ellipse cx="355" cy="82" rx="12" ry="7" transform="rotate(-25 355 82)" fill="#5B9BD5" fillOpacity="0.65" />
            <ellipse cx="368" cy="84" rx="12" ry="7" transform="rotate(25 368 84)" fill="#5B9BD5" fillOpacity="0.65" />
            <ellipse cx="360" cy="96" rx="14" ry="8" fill="#3B7A2A" />
            <circle cx="346" cy="95" r="6" fill="#E8A33D" />
            {/* Label B */}
            <circle cx="360" cy="148" r="16" fill={badgeColor('B')} />
            <text x="360" y="154" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              B
            </text>
          </g>
        </svg>
      );

    case 'cheetah_zebra':
      return (
        <svg viewBox="0 0 500 220" fill="none" className={className} role="img" aria-label="Running cat silhouette A chasing striped zebra shape B">
          <rect width="500" height="220" rx="16" fill="#FDF6E4" />
          {/* Grassland horizon */}
          <path d="M0 165Q250 150 500 165V220H0V165Z" fill="#EED5A5" />

          {/* Shape A: Running Cat-like Silhouette (Cheetah) */}
          <g
            onClick={() => onSelectShape && onSelectShape('A')}
            className="cursor-pointer"
          >
            {/* Sleek stretched body */}
            <path
              d="M95 128C120 116 162 116 188 124C194 134 172 140 135 138C110 138 95 134 95 128Z"
              fill="#E8A33D"
              stroke="#8C6239"
              strokeWidth="2.5"
            />
            {/* Outstretched legs */}
            <path d="M104 134L72 156M116 136L92 160M176 132L210 152M184 128L220 142" stroke="#8C6239" strokeWidth="5" strokeLinecap="round" />
            {/* Long balance tail */}
            <path d="M96 126C72 122 56 112 46 98" stroke="#8C6239" strokeWidth="4.5" strokeLinecap="round" />
            {/* Head */}
            <circle cx="196" cy="116" r="11" fill="#E8A33D" stroke="#8C6239" strokeWidth="2.5" />
            {/* Spots */}
            <circle cx="130" cy="126" r="3" fill="#8C6239" />
            <circle cx="148" cy="124" r="3.5" fill="#8C6239" />
            <circle cx="165" cy="127" r="3" fill="#8C6239" />
            {/* Badge A */}
            <circle cx="145" cy="184" r="16" fill={badgeColor('A')} />
            <text x="145" y="190" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              A
            </text>
          </g>

          {/* Shape B: Striped Equid Shape (Zebra) */}
          <g
            onClick={() => onSelectShape && onSelectShape('B')}
            className="cursor-pointer"
          >
            {/* Legs */}
            <path d="M325 132L308 162M342 134L332 164M388 134L405 162M402 130L422 156" stroke="#1F2D1C" strokeWidth="5.5" strokeLinecap="round" />
            {/* Body */}
            <rect x="315" y="96" width="92" height="42" rx="20" fill="#FFFFFF" stroke="#1F2D1C" strokeWidth="2.8" />
            {/* Neck & Head */}
            <path d="M388 104L412 68L432 76L404 114Z" fill="#FFFFFF" stroke="#1F2D1C" strokeWidth="2.8" strokeLinejoin="round" />
            {/* High-contrast stripes */}
            <path d="M335 97V136M352 97V137M369 97V137M385 98V134M398 90L414 98M405 78L420 86" stroke="#1F2D1C" strokeWidth="4" strokeLinecap="round" />
            {/* Badge B */}
            <circle cx="365" cy="184" r="16" fill={badgeColor('B')} />
            <text x="365" y="190" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              B
            </text>
          </g>
        </svg>
      );

    case 'moth_bird':
      return (
        <svg viewBox="0 0 500 220" fill="none" className={className} role="img" aria-label="Camouflaged moth shape A on tree bark next to bird shape B">
          <rect width="500" height="220" rx="16" fill="#EBF3FA" />
          {/* Wide Textured Tree Trunk on Left/Center */}
          <rect x="45" y="16" width="220" height="188" rx="14" fill="#C8B69E" stroke="#8C6239" strokeWidth="3" />
          {/* Bark texture lines & speckles */}
          <g stroke="#8C6239" strokeWidth="2.2" strokeLinecap="round" opacity="0.65">
            <path d="M75 35V95M115 28V110M195 32V90M230 45V130M85 125V185M165 130V190" />
            <circle cx="95" cy="62" r="2.5" fill="#8C6239" />
            <circle cx="210" cy="112" r="3" fill="#8C6239" />
            <circle cx="135" cy="155" r="2.5" fill="#8C6239" />
          </g>

          {/* Shape A: Camouflaged Peppered Moth matching the bark texture! */}
          <g
            onClick={() => onSelectShape && onSelectShape('A')}
            className="cursor-pointer"
          >
            <path
              d="M155 68L115 112L155 104L195 112L155 68Z"
              fill="#C2AF96"
              stroke="#7A5633"
              strokeWidth="2.2"
              strokeDasharray="4 2"
              strokeLinejoin="round"
            />
            {/* Speckled bark-matching dots on moth wings */}
            <circle cx="142" cy="94" r="2.5" fill="#7A5633" />
            <circle cx="168" cy="94" r="2.5" fill="#7A5633" />
            <circle cx="155" cy="84" r="2" fill="#7A5633" />
            <circle cx="132" cy="102" r="2" fill="#FAF7EF" />
            <circle cx="178" cy="102" r="2" fill="#FAF7EF" />
            {/* Badge A */}
            <circle cx="155" cy="144" r="16" fill={badgeColor('A')} />
            <text x="155" y="150" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              A
            </text>
          </g>

          {/* Branch extending right */}
          <path d="M265 135H455" stroke="#8C6239" strokeWidth="12" strokeLinecap="round" />

          {/* Shape B: Searching Songbird Silhouette */}
          <g
            onClick={() => onSelectShape && onSelectShape('B')}
            className="cursor-pointer"
          >
            <path d="M365 115L358 135M380 115L385 135" stroke="#1F2D1C" strokeWidth="3.5" strokeLinecap="round" />
            <path
              d="M340 96C340 78 368 74 392 88C406 96 422 108 432 112C402 118 355 118 340 96Z"
              fill="#5B9BD5"
              stroke="#2B5B84"
              strokeWidth="2.5"
            />
            <circle cx="344" cy="78" r="14" fill="#5B9BD5" stroke="#2B5B84" strokeWidth="2.5" />
            {/* Pointed beak aimed toward bark */}
            <path d="M330 75L310 80L330 84Z" fill="#E8A33D" />
            <circle cx="340" cy="76" r="2.5" fill="#1F2D1C" />
            {/* Badge B */}
            <circle cx="375" cy="168" r="16" fill={badgeColor('B')} />
            <text x="375" y="174" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              B
            </text>
          </g>
        </svg>
      );

    case 'hedgehog_fox':
    default:
      return (
        <svg viewBox="0 0 500 220" fill="none" className={className} role="img" aria-label="Spiky round hedgehog shape A and stalking fox shape B">
          <rect width="500" height="220" rx="16" fill="#EEF6EB" />
          <path d="M0 165Q250 152 500 165V220H0V165Z" fill="#DCEBD7" />

          {/* Shape A: Round Spiky Hedgehog Silhouette */}
          <g
            onClick={() => onSelectShape && onSelectShape('A')}
            className="cursor-pointer"
          >
            {/* Radiating defensive spikes */}
            <g stroke="#8C6239" strokeWidth="3.5" strokeLinecap="round">
              <line x1="145" y1="125" x2="102" y2="108" />
              <line x1="145" y1="125" x2="108" y2="92" />
              <line x1="145" y1="125" x2="124" y2="80" />
              <line x1="145" y1="125" x2="145" y2="75" />
              <line x1="145" y1="125" x2="166" y2="80" />
              <line x1="145" y1="125" x2="182" y2="92" />
              <line x1="145" y1="125" x2="188" y2="108" />
            </g>
            {/* Round body */}
            <path
              d="M108 142C108 112 126 94 148 94C172 94 188 114 188 142H108Z"
              fill="#8C6239"
            />
            {/* Snout peeking slightly */}
            <path d="M182 128L202 136L184 142Z" fill="#D4A359" />
            <circle cx="202" cy="136" r="3.5" fill="#1F2D1C" />
            <circle cx="188" cy="132" r="2.2" fill="#1F2D1C" />
            {/* Badge A */}
            <circle cx="148" cy="182" r="16" fill={badgeColor('A')} />
            <text x="148" y="188" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              A
            </text>
          </g>

          {/* Shape B: Red Fox Silhouette */}
          <g
            onClick={() => onSelectShape && onSelectShape('B')}
            className="cursor-pointer"
          >
            {/* Legs */}
            <path d="M325 130L312 162M340 132L335 162M395 132L390 162M408 130L412 162" stroke="#1F2D1C" strokeWidth="5" strokeLinecap="round" />
            {/* Bushy Tail */}
            <path
              d="M405 112C435 102 462 115 466 132C445 142 420 136 405 124Z"
              fill="#D9534F"
            />
            <path d="M452 120C460 124 464 128 466 132C458 135 450 135 445 132Z" fill="#FAF7EF" />
            {/* Body */}
            <rect x="315" y="102" width="96" height="36" rx="18" fill="#D9534F" />
            {/* Head & Ears */}
            <path d="M315 92L308 72L324 84Z" fill="#D9534F" />
            <path d="M328 90L326 70L338 84Z" fill="#D9534F" />
            <path d="M332 98L288 108L318 118Z" fill="#D9534F" />
            <circle cx="288" cy="108" r="3.5" fill="#1F2D1C" />
            <circle cx="312" cy="100" r="2.5" fill="#1F2D1C" />
            {/* Badge B */}
            <circle cx="365" cy="182" r="16" fill={badgeColor('B')} />
            <text x="365" y="188" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold">
              B
            </text>
          </g>
        </svg>
      );
  }
};

export const CelebrationGardenSvg: React.FC<{ totalScore: number; className?: string }> = ({
  totalScore,
  className = 'w-full h-64'
}) => {
  return (
    <svg viewBox="0 0 600 240" fill="none" className={className} role="img" aria-label="Blooming celebratory garden scene">
      <rect width="600" height="240" rx="20" fill="#EEF6EB" />
      {/* Sun */}
      <circle cx="510" cy="58" r="32" fill="#E8A33D" />
      <circle cx="510" cy="58" r="44" fill="#E8A33D" fillOpacity="0.2" />

      {/* Rolling Garden Hills */}
      <path d="M0 185Q180 155 360 185T600 175V240H0V185Z" fill="#6BAE52" fillOpacity="0.45" />
      <path d="M0 202Q260 182 600 202V240H0V202Z" fill="#3B7A2A" />

      {/* Flower 1 (Station A) */}
      <g opacity={totalScore >= 5 ? 1 : 0.45}>
        <path d="M130 205V115" stroke="#3B7A2A" strokeWidth="5" strokeLinecap="round" />
        <path d="M130 165C130 148 152 146 154 158C154 168 136 168 130 165Z" fill="#6BAE52" />
        <path d="M130 172C130 155 108 153 106 165C106 175 124 175 130 172Z" fill="#6BAE52" />
        <circle cx="130" cy="95" r="12" fill="#E8A33D" />
        <circle cx="146" cy="108" r="12" fill="#E8A33D" />
        <circle cx="140" cy="126" r="12" fill="#E8A33D" />
        <circle cx="120" cy="126" r="12" fill="#E8A33D" />
        <circle cx="114" cy="108" r="12" fill="#E8A33D" />
        <circle cx="130" cy="112" r="11" fill="#8C6239" />
      </g>

      {/* Center Tall Sunflower (Station B & C) */}
      <g opacity={totalScore >= 10 ? 1 : 0.45}>
        <path d="M300 205V82" stroke="#3B7A2A" strokeWidth="6.5" strokeLinecap="round" />
        <path d="M300 155C300 132 332 130 335 146C335 160 308 160 300 155Z" fill="#3B7A2A" />
        <path d="M300 165C300 142 268 140 265 156C265 170 292 170 300 165Z" fill="#6BAE52" />
        <circle cx="300" cy="56" r="14" fill="#E8A33D" />
        <circle cx="322" cy="68" r="14" fill="#E8A33D" />
        <circle cx="322" cy="92" r="14" fill="#E8A33D" />
        <circle cx="300" cy="104" r="14" fill="#E8A33D" />
        <circle cx="278" cy="92" r="14" fill="#E8A33D" />
        <circle cx="278" cy="68" r="14" fill="#E8A33D" />
        <circle cx="300" cy="80" r="16" fill="#8C6239" stroke="#FAF7EF" strokeWidth="2.5" />
      </g>

      {/* Bluebell / Sky Blossom (Station D) */}
      <g opacity={totalScore >= 15 ? 1 : 0.45}>
        <path d="M445 205V118" stroke="#3B7A2A" strokeWidth="5" strokeLinecap="round" />
        <path d="M445 168C445 152 467 150 469 162C469 172 451 172 445 168Z" fill="#6BAE52" />
        <circle cx="445" cy="98" r="11" fill="#5B9BD5" />
        <circle cx="460" cy="110" r="11" fill="#5B9BD5" />
        <circle cx="454" cy="128" r="11" fill="#5B9BD5" />
        <circle cx="436" cy="128" r="11" fill="#5B9BD5" />
        <circle cx="430" cy="110" r="11" fill="#5B9BD5" />
        <circle cx="445" cy="114" r="9" fill="#E8A33D" />
      </g>

      {/* Pollinating Bee & Floating Dandelion Seeds */}
      <g>
        <ellipse cx="215" cy="74" rx="10" ry="7" fill="#E8A33D" stroke="#1F2D1C" strokeWidth="2.2" />
        <path d="M212 67V81M218 67V81" stroke="#1F2D1C" strokeWidth="2.2" />
        <ellipse cx="215" cy="65" rx="5" ry="3.5" fill="#5B9BD5" fillOpacity="0.6" />
        <circle cx="378" cy="62" r="5" fill="#FFFFFF" stroke="#5B9BD5" strokeWidth="2" />
        <path d="M378 67L374 78" stroke="#8C6239" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
};
