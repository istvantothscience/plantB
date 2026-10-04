export type ScreenId =
  | 'home'
  | 'station-a'
  | 'station-b'
  | 'station-c'
  | 'station-d'
  | 'connection'
  | 'results';

export interface LifeCycleStage {
  id: string;
  order: number; // 1 to 7
  title: string;
  shortLabel: string;
  description: string;
}

export type HabitatType = 'Hot & Dry' | 'Cold & Wet' | 'Hot & Wet (Wetlands)' | 'Cold & Dry';

export interface AdaptationOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface HabitatCardData {
  id: 'giraffe' | 'polar_bear' | 'aloe' | 'heron';
  name: string;
  category: 'Animal' | 'Plant';
  clueDescription: string;
  correctHabitat: HabitatType;
  habitatChoices: HabitatType[];
  habitatExplanation: string;
  adaptationChoices: AdaptationOption[];
}

export type DispersalMethod = 'wind' | 'water' | 'animal';

export interface SeedItemData {
  id: 'dandelion' | 'sycamore' | 'burr' | 'coconut' | 'berry';
  name: string;
  structureHint: string;
  correctMethod: DispersalMethod;
  explanation: string;
}

export interface PredatorPreyScenario {
  id: 'spider_fly' | 'cheetah_zebra' | 'moth_bird' | 'hedgehog_fox';
  title: string;
  sceneDescription: string;
  shapeA: {
    id: 'A';
    name: string;
    role: 'predator' | 'prey';
  };
  shapeB: {
    id: 'B';
    name: string;
    role: 'predator' | 'prey';
  };
  predatorAdaptationQuestion: string;
  predatorAdaptationOptions: string[];
  correctPredatorAdaptation: string;
  preyAdaptationQuestion: string;
  preyAdaptationOptions: string[];
  correctPreyAdaptation: string;
  summaryExplanation: string;
}

export const LIFE_CYCLE_STAGES: LifeCycleStage[] = [
  {
    id: 'seed',
    order: 1,
    title: '1. Dormant Seed',
    shortLabel: 'Seed',
    description: 'A tough coat protects the tiny baby plant and its stored food inside the soil.'
  },
  {
    id: 'sprout_root',
    order: 2,
    title: '2. Germination (Root)',
    shortLabel: 'Sprouting Root',
    description: 'With water and warmth, the seed coat splits and a small root grows downward.'
  },
  {
    id: 'seedling',
    order: 3,
    title: '3. Young Seedling',
    shortLabel: 'Seedling',
    description: 'A green shoot pushes up toward sunlight and opens its first small leaves.'
  },
  {
    id: 'leafy_plant',
    order: 4,
    title: '4. Adult Leafy Plant',
    shortLabel: 'Leafy Plant',
    description: 'Broad green leaves make food using sunlight, water, and air so the plant grows strong.'
  },
  {
    id: 'flower',
    order: 5,
    title: '5. Blooming Flower',
    shortLabel: 'Flower',
    description: 'Bright petals and sweet scent open up to attract visiting insects.'
  },
  {
    id: 'pollination',
    order: 6,
    title: '6. Pollination',
    shortLabel: 'Flower & Bee',
    description: 'A visiting bee brushes against stamens and carries golden pollen to the stigma.'
  },
  {
    id: 'seed_pod',
    order: 7,
    title: '7. Seed Pod Formation',
    shortLabel: 'Seed Pod',
    description: 'After fertilisation, petals fade and a pod forms with new seeds ready to disperse.'
  }
];

export const HABITAT_CARDS: HabitatCardData[] = [
  {
    id: 'giraffe',
    name: 'Savanna Giraffe',
    category: 'Animal',
    clueDescription: 'Lives on sunny grasslands where rain is scarce for months and tall thorny acacia trees hold the freshest green leaves.',
    correctHabitat: 'Hot & Dry',
    habitatChoices: ['Hot & Dry', 'Cold & Wet', 'Hot & Wet (Wetlands)', 'Cold & Dry'],
    habitatExplanation: 'The African savanna is hot and dry for much of the year, with scattered tall trees.',
    adaptationChoices: [
      {
        id: 'giraffe_neck',
        text: 'Long neck and tough 45 cm tongue to reach high acacia leaves above other grazers',
        isCorrect: true,
        explanation: 'Spot on! Its long neck and leathery tongue let it feed on high thorny branches no other animal can reach.'
      },
      {
        id: 'giraffe_blubber',
        text: 'Thick layer of blubber under the skin to trap body heat in freezing water',
        isCorrect: false,
        explanation: 'Thick blubber would cause overheating in a hot savanna! Try looking at how it reaches food.'
      },
      {
        id: 'giraffe_webbed',
        text: 'Webbed feet for paddling swiftly across deep muddy ponds',
        isCorrect: false,
        explanation: 'Giraffes walk on firm dry ground with hard hooves, not webbed feet.'
      }
    ]
  },
  {
    id: 'polar_bear',
    name: 'Arctic Polar Bear',
    category: 'Animal',
    clueDescription: 'Roams across floating sea ice and swims through freezing ocean water to hunt seals.',
    correctHabitat: 'Cold & Wet',
    habitatChoices: ['Hot & Dry', 'Cold & Wet', 'Hot & Wet (Wetlands)', 'Cold & Dry'],
    habitatExplanation: 'The Arctic sea ice and icy ocean waters form an extreme cold and wet marine habitat.',
    adaptationChoices: [
      {
        id: 'bear_ears',
        text: 'Giant thin ears to release extra body heat into the breeze',
        isCorrect: false,
        explanation: 'Polar bears actually have very small, round ears so they lose as little body heat as possible!'
      },
      {
        id: 'bear_fur_blubber',
        text: 'Thick hollow fur, black heat-absorbing skin, and a deep layer of insulating blubber',
        isCorrect: true,
        explanation: 'Correct! Two layers of fur plus up to 10 cm of blubber keep the bear warm even while swimming in icy seas.'
      },
      {
        id: 'bear_roots',
        text: 'Long taproots that store rainwater underground',
        isCorrect: false,
        explanation: 'Taproots belong to desert plants, not Arctic mammals!'
      }
    ]
  },
  {
    id: 'aloe',
    name: 'Desert Aloe Plant',
    category: 'Plant',
    clueDescription: 'Grows in rocky, sun-baked ground where rainfall happens only a few times a year.',
    correctHabitat: 'Hot & Dry',
    habitatChoices: ['Hot & Dry', 'Cold & Wet', 'Hot & Wet (Wetlands)', 'Cold & Dry'],
    habitatExplanation: 'Aloe plants thrive in hot and dry desert regions where water evaporates quickly.',
    adaptationChoices: [
      {
        id: 'aloe_succulent',
        text: 'Thick, fleshy leaves with a waxy waterproof coating that store water gel inside',
        isCorrect: true,
        explanation: 'Great science thinking! The fleshy leaves store water for dry months, and the waxy cuticle stops evaporation.'
      },
      {
        id: 'aloe_thin',
        text: 'Huge paper-thin leaves with thousands of open pores to release water vapour fast',
        isCorrect: false,
        explanation: 'Large thin leaves would dry out and wilt within hours under hot desert sun.'
      },
      {
        id: 'aloe_float',
        text: 'Hollow air-filled stems designed to float on top of deep rivers',
        isCorrect: false,
        explanation: 'Aloe grows anchored in dry rocky soil, not floating on rivers.'
      }
    ]
  },
  {
    id: 'heron',
    name: 'Grey Wetland Heron',
    category: 'Animal',
    clueDescription: 'Stands motionless in shallow marshes, reed beds, and warm riverbanks watching for fish and frogs.',
    correctHabitat: 'Hot & Wet (Wetlands)',
    habitatChoices: ['Hot & Dry', 'Cold & Wet', 'Hot & Wet (Wetlands)', 'Cold & Dry'],
    habitatExplanation: 'Marshes and reed beds are wetland habitats with shallow water and rich plant life.',
    adaptationChoices: [
      {
        id: 'heron_legs_beak',
        text: 'Long stilt-like legs with wide toes for soft mud and a sharp dagger beak to catch slippery fish',
        isCorrect: true,
        explanation: 'Exactly right! Long legs keep its feathers dry above water while wide toes stop it sinking into marsh mud.'
      },
      {
        id: 'heron_spines',
        text: 'Sharp defensive quills covering its back to roll into a spiky ball',
        isCorrect: false,
        explanation: 'Herons rely on flight and tall wading legs rather than spines.'
      },
      {
        id: 'heron_hooves',
        text: 'Heavy flat hooves for galloping across dry grassland plains',
        isCorrect: false,
        explanation: 'Hooves would sink straight into soft wetland mud! Spread-out toes work much better.'
      }
    ]
  }
];

export const SEED_ITEMS: SeedItemData[] = [
  {
    id: 'dandelion',
    name: 'Dandelion Puff Seed',
    structureHint: 'Very light seed attached to a fluffy white parachute of fine hairs.',
    correctMethod: 'wind',
    explanation: 'Wind dispersal! The feathery pappus acts like a tiny parachute, catching gentle breezes to float far away.'
  },
  {
    id: 'sycamore',
    name: 'Sycamore "Helicopter" Seed',
    structureHint: 'Has a flat, stiff wing on one side that makes it spin as it falls from tall branches.',
    correctMethod: 'wind',
    explanation: 'Wind dispersal! Spinning like a helicopter blade slows its fall so the wind can blow it further from the parent tree.'
  },
  {
    id: 'burr',
    name: 'Spiky Burdock Burr',
    structureHint: 'Covered in hundreds of tiny curved hooks all around the outside of the seed case.',
    correctMethod: 'animal',
    explanation: 'Animal dispersal! The tiny hooks grip onto mammal fur or walkers’ socks and get carried to new places before dropping off.'
  },
  {
    id: 'coconut',
    name: 'Sprouting Coconut',
    structureHint: 'Large seed inside a thick, fibrous, air-filled husk with a waterproof outer shell.',
    correctMethod: 'water',
    explanation: 'Water dispersal! Trapped air pockets inside the fibrous husk let the coconut float across ocean currents to distant beaches.'
  },
  {
    id: 'berry',
    name: 'Sweet Woodland Blackberry',
    structureHint: 'Bright, juicy fruit flesh surrounding tiny, hard-coated seeds inside.',
    correctMethod: 'animal',
    explanation: 'Animal dispersal! Birds and mammals eat the sweet berry, and the tough inner seeds pass unharmed through their digestive system.'
  }
];

export const PREDATOR_PREY_SCENARIOS: PredatorPreyScenario[] = [
  {
    id: 'spider_fly',
    title: 'Scenario 1: The Silk Trap',
    sceneDescription: 'In a quiet corner of the garden hedge, an orb-weaver spider waits at the edge of its silk web as a hoverfly buzzes past.',
    shapeA: {
      id: 'A',
      name: 'Garden Spider',
      role: 'predator'
    },
    shapeB: {
      id: 'B',
      name: 'Winged Fly',
      role: 'prey'
    },
    predatorAdaptationQuestion: 'Which adaptation helps the Garden Spider (Predator) catch its meal?',
    predatorAdaptationOptions: [
      'Spinning a sticky, nearly invisible silk web trap & feeling vibrations',
      'Growing thick white fur for snow camouflage',
      'Calling out with loud group alarm calls'
    ],
    correctPredatorAdaptation: 'Spinning a sticky, nearly invisible silk web trap & feeling vibrations',
    preyAdaptationQuestion: 'Which adaptation helps the Winged Fly (Prey) escape danger?',
    preyAdaptationOptions: [
      'Large compound eyes for 360° vision & rapid wing reflexes',
      'Heavy armour shell and sharp quills',
      'Long roots for absorbing water'
    ],
    correctPreyAdaptation: 'Large compound eyes for 360° vision & rapid wing reflexes',
    summaryExplanation: 'The spider relies on stealth and sticky silk vibrations, while the fly uses wide-angle compound eyes and fast flight reflexes to dodge webs.'
  },
  {
    id: 'cheetah_zebra',
    title: 'Scenario 2: The Grassland Chase',
    sceneDescription: 'Across the open plain, a sleek spotted cat sprints toward a herd of striped zebras.',
    shapeA: {
      id: 'A',
      name: 'Cheetah',
      role: 'predator'
    },
    shapeB: {
      id: 'B',
      name: 'Plains Zebra',
      role: 'prey'
    },
    predatorAdaptationQuestion: 'Which adaptation makes the Cheetah (Predator) a successful hunter?',
    predatorAdaptationOptions: [
      'Extreme sprinting speed, flexible spine, and forward-facing eyes',
      'Sharp defensive spikes across its back',
      'Floating on water currents'
    ],
    correctPredatorAdaptation: 'Extreme sprinting speed, flexible spine, and forward-facing eyes',
    preyAdaptationQuestion: 'Which adaptation helps the Plains Zebra (Prey) survive against hunters?',
    preyAdaptationOptions: [
      'Striped dazzle camouflage in a herd, stamina, and group alarm calls',
      'Spinning a sticky silk web between trees',
      'Injecting venom through hollow fangs'
    ],
    correctPreyAdaptation: 'Striped dazzle camouflage in a herd, stamina, and group alarm calls',
    summaryExplanation: 'Cheetahs use bursts of top speed and binocular vision to target prey, while zebras stay in herds where moving stripes confuse predators.'
  },
  {
    id: 'moth_bird',
    title: 'Scenario 3: Hidden in Plain Sight',
    sceneDescription: 'A hungry songbird hops along an oak branch searching for insects, right next to a resting peppered moth.',
    shapeA: {
      id: 'A',
      name: 'Peppered Moth',
      role: 'prey'
    },
    shapeB: {
      id: 'B',
      name: 'Searching Songbird',
      role: 'predator'
    },
    predatorAdaptationQuestion: 'Which adaptation helps the Songbird (Predator) find insects on trees?',
    predatorAdaptationOptions: [
      'Keen colour vision and a pointed tweezers-like beak',
      'Loud roar and heavy hooves',
      'Waxy leaves that store rainwater'
    ],
    correctPredatorAdaptation: 'Keen colour vision and a pointed tweezers-like beak',
    preyAdaptationQuestion: 'Which adaptation protects the Peppered Moth (Prey) during the day?',
    preyAdaptationOptions: [
      'Camouflage wing patterns that match the speckled tree bark',
      'Chasing the bird with strong jaws and claws',
      'Diving into freezing ocean water'
    ],
    correctPreyAdaptation: 'Camouflage wing patterns that match the speckled tree bark',
    summaryExplanation: 'Notice how the moth’s speckled wings blend into the bark pattern! Camouflage hides prey from sharp-eyed predators.'
  },
  {
    id: 'hedgehog_fox',
    title: 'Scenario 4: The Prickly Defence',
    sceneDescription: 'At dusk in the garden, a red fox approaches a European hedgehog foraging in the fallen leaves.',
    shapeA: {
      id: 'A',
      name: 'European Hedgehog',
      role: 'prey'
    },
    shapeB: {
      id: 'B',
      name: 'Red Fox',
      role: 'predator'
    },
    predatorAdaptationQuestion: 'Which adaptation helps the Red Fox (Predator) hunt at dusk?',
    predatorAdaptationOptions: [
      'Sensitive directional ears, night vision, and sharp canine teeth',
      'Hollow bones for hovering like a hummingbird',
      'Photosynthesis in green leaves'
    ],
    correctPredatorAdaptation: 'Sensitive directional ears, night vision, and sharp canine teeth',
    preyAdaptationQuestion: 'Which adaptation protects the Hedgehog (Prey) when cornered?',
    preyAdaptationOptions: [
      'Curling into a tight ball of thousands of sharp, stiff spikes',
      'Outrunning the fox at 100 km/h across open plains',
      'Changing skin colour like a chameleon'
    ],
    correctPreyAdaptation: 'Curling into a tight ball of thousands of sharp, stiff spikes',
    summaryExplanation: 'Even though the hedgehog cannot outrun a fox, curling into a tight sphere of sharp keratin spines makes it too prickly to bite!'
  }
];
