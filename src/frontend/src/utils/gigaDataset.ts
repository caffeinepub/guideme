// ─── GIGA Dataset ─────────────────────────────────────────────────────────────
// Local knowledge base for the Subject Helper.
// Checked first before falling back to Wikipedia.

export interface GigaEntry {
  id: string;
  subject: "math" | "science" | "english" | "generalKnowledge" | "wellbeing";
  concept: string;
  keywords: string[];
  rule?: string;
  explanation: string;
  examples: string[];
  tips: string[];
  gameSuggestion?: { name: string; link: string; xp: number };
  videoUrl?: string;
  tutorResponses?: { question: string; answer: string }[];
}

// ─── Dataset ──────────────────────────────────────────────────────────────────

export const GIGA_DATASET: GigaEntry[] = [
  // ─── MATH ─────────────────────────────────────────────────────────────────

  {
    id: "adding-integers",
    subject: "math",
    concept: "Adding Integers",
    keywords: [
      "integer",
      "integers",
      "adding",
      "negative",
      "positive",
      "signs",
      "add",
      "subtract",
      "number line",
      "arithmetic",
      "whole number",
    ],
    rule: "If signs are the same, add absolute values and keep the sign. If signs are different, subtract smaller from bigger and take the bigger sign.",
    explanation:
      "Integers are whole numbers that can be positive or negative. Adding them is easy once you know the sign rules! 🔢 Think of a number line — positive numbers go right, negative numbers go left.",
    examples: [
      "7 + 5 = 12 ✅ (both positive, just add)",
      "7 + (-3) = 4 ✅ (different signs: 7-3=4, keep positive)",
      "-8 + (-2) = -10 ✅ (both negative, add and keep minus)",
      "-7 + 4 = -3 ✅ (subtract 4 from 7 → 3, keep bigger sign which is -)",
      "12 - 5 = 7 ✅ (think: how far from 5 to 12? 🧠)",
    ],
    tips: [
      "Visualize a number line for easier understanding! ➡️",
      "Think of positive as moving right, negative as moving left on the number line",
      "Same signs = add, different signs = subtract (then take the bigger number's sign)",
    ],
    gameSuggestion: {
      name: "Integer Challenge",
      link: "https://www.mathplayground.com/",
      xp: 10,
    },
    tutorResponses: [
      {
        question: "What is 3 + (-5)?",
        answer:
          "3 + (-5) = -2 ✅ Think of it as moving 5 steps left from 3 on a number line. ➡️",
      },
      {
        question: "What is 1 + 1?",
        answer: "1 + 1 = 2! Easy math, you got this! 🧮",
      },
      {
        question: "Can I play a game?",
        answer:
          "Sure! Head to the Games page for loads of fun math games! 🎮 Try Integer Challenge to practice adding positive and negative numbers fast! ⚡",
      },
    ],
  },

  {
    id: "adding-fractions",
    subject: "math",
    concept: "Adding Fractions",
    keywords: [
      "fraction",
      "fractions",
      "adding",
      "denominator",
      "numerator",
      "common",
      "simplify",
      "lcm",
      "lowest common multiple",
    ],
    rule: "Make denominators the same, then add numerators. Always simplify if possible!",
    explanation:
      "Fractions show parts of a whole. 🍕 For example, 1/2 is one half. To add fractions, you need the same denominator first — it's like making sure the pieces are the same size before counting them!",
    examples: [
      "1/4 + 2/4 = 3/4 ✅ (same denominator, just add top numbers)",
      "2/3 + 1/6 = 4/6 + 1/6 = 5/6 ✅ (convert to common denominator first)",
      "1/2 + 1/4 = 2/4 + 1/4 = 3/4 ✅",
    ],
    tips: [
      "Always simplify fractions if possible! 🍕",
      "Find the Lowest Common Multiple (LCM) for the denominator",
      "Top number = numerator, bottom number = denominator",
    ],
    gameSuggestion: {
      name: "Fraction Munchers",
      link: "https://www.coolmathgames.com/",
      xp: 10,
    },
    tutorResponses: [
      {
        question: "Explain fractions",
        answer:
          "Fractions show parts of a whole. For example, 1/2 is one half. You can add, subtract, multiply, and divide fractions. 🍕 Want a practice problem? 🎯",
      },
    ],
  },

  {
    id: "decimals",
    subject: "math",
    concept: "Adding and Subtracting Decimals",
    keywords: [
      "decimal",
      "decimals",
      "adding",
      "subtracting",
      "point",
      "align",
      "alignment",
      "decimal point",
      "place value",
    ],
    rule: "Line up decimal points, then add or subtract as usual.",
    explanation:
      "Decimals are just another way to show parts of a whole, like 3.5 means 3 and a half! 🧠 The key trick is always lining up the decimal points before calculating.",
    examples: [
      "3.5 + 2.75 = 6.25 ✅ (line up: 3.50 + 2.75)",
      "7.2 - 3.85: write as 7.20 - 3.85 = 3.35 ✅",
      "1.5 + 0.75 = 2.25 ✅",
    ],
    tips: [
      "Always double-check your decimal alignment! 🧠",
      "Add zeros to make numbers the same length",
      "Quick rounds help you add decimals fast! ⚡",
    ],
    gameSuggestion: {
      name: "Decimal Dash",
      link: "https://www.mathplayground.com/",
      xp: 10,
    },
    tutorResponses: [
      {
        question: "I don't understand decimals",
        answer:
          "No worries! Line up the decimal points and add or subtract as usual. For example, 2.5 + 3.75 = 6.25 🧠",
      },
    ],
  },

  {
    id: "algebra-equations",
    subject: "math",
    concept: "Solving Simple Equations",
    keywords: [
      "algebra",
      "equation",
      "solve",
      "variable",
      "unknown",
      "isolate",
      "both sides",
      "x",
      "linear",
      "algebraic",
    ],
    rule: "Isolate the variable by doing the same operation on both sides.",
    explanation:
      "Algebra uses letters like x to represent unknown numbers. To find x, you balance both sides of the equation like a seesaw! ⚖️",
    examples: [
      "3x + 5 = 20 → 3x = 15 → x = 5 ✅",
      "x - 7 = 10 → add 7 to both sides → x = 17 ✅",
      "2x = 12 → divide both sides by 2 → x = 6 ✅",
    ],
    tips: [
      "Always check your answer by plugging it back! 📝",
      "Step-by-step solving is the key! 🔑",
      "Whatever you do to one side, do the same to the other!",
    ],
    gameSuggestion: {
      name: "Algebra Adventure",
      link: "https://www.khanacademy.org/math/algebra",
      xp: 15,
    },
  },

  {
    id: "percentages",
    subject: "math",
    concept: "Percentages",
    keywords: [
      "percent",
      "percentage",
      "percentages",
      "%",
      "of",
      "out of",
      "100",
      "discount",
      "increase",
      "decrease",
    ],
    rule: "Percentage means 'out of 100'. To find a percentage of a number, multiply by the percentage divided by 100.",
    explanation:
      "Percentages are used everywhere — sales, test scores, tips! 💡 They show how much out of 100.",
    examples: [
      "50% of 80 = 80 × 0.5 = 40 ✅",
      "20% of 150 = 150 × 0.2 = 30 ✅",
      "75 out of 100 = 75% ✅",
      "30% off £50 = £50 × 0.7 = £35 ✅",
    ],
    tips: [
      "To convert % to decimal, divide by 100",
      "50% = half, 25% = quarter, 10% = one tenth",
      "Finding 10% first then multiplying is often the easiest method!",
    ],
  },

  {
    id: "pythagoras",
    subject: "math",
    concept: "Pythagoras Theorem",
    keywords: [
      "pythagoras",
      "pythagorean",
      "theorem",
      "hypotenuse",
      "right angle",
      "triangle",
      "a squared",
      "b squared",
      "c squared",
      "right-angled",
    ],
    rule: "a² + b² = c² where c is the hypotenuse (longest side) of a right-angled triangle.",
    explanation:
      "Pythagoras theorem helps you find the missing side of a right-angled triangle! 📐 The hypotenuse is always the longest side, opposite the right angle.",
    examples: [
      "3² + 4² = 9 + 16 = 25 → c = √25 = 5 ✅",
      "If a=5, b=12: 25 + 144 = 169 → c = √169 = 13 ✅",
      "Finding shorter side: c=10, a=6 → b² = 100-36 = 64 → b=8 ✅",
    ],
    tips: [
      "Only works for right-angled triangles! ⚠️",
      "The hypotenuse is always opposite the right angle",
      "Square the sides, add them, then square root to get the answer",
    ],
  },

  {
    id: "geometry-shapes",
    subject: "math",
    concept: "Geometry and Shapes",
    keywords: [
      "geometry",
      "shape",
      "shapes",
      "area",
      "perimeter",
      "circle",
      "square",
      "rectangle",
      "triangle",
      "volume",
      "circumference",
      "pi",
    ],
    rule: "Area = length × width (rectangle), Area = ½ × base × height (triangle), Circumference = 2πr (circle).",
    explanation:
      "Geometry is all about shapes, sizes, and measurements! 📐 Every shape has special formulas for area and perimeter.",
    examples: [
      "Rectangle area: 5 × 3 = 15 cm² ✅",
      "Triangle area: ½ × 6 × 4 = 12 cm² ✅",
      "Circle circumference: 2 × π × 5 = 31.4 cm ✅",
      "Square perimeter: 4 × 7 = 28 cm ✅",
    ],
    tips: [
      "Perimeter = distance around the outside",
      "Area = space inside the shape",
      "π (pi) ≈ 3.14159 — just use 3.14 for most problems!",
    ],
  },

  {
    id: "statistics",
    subject: "math",
    concept: "Statistics — Mean, Median, Mode",
    keywords: [
      "statistics",
      "mean",
      "median",
      "mode",
      "average",
      "range",
      "data",
      "graph",
      "chart",
    ],
    rule: "Mean = sum ÷ count. Median = middle value. Mode = most frequent value.",
    explanation:
      "Statistics helps us make sense of data! 📊 Mean, median, and mode are three different types of 'average'.",
    examples: [
      "Data: 3, 5, 7, 7, 10 → Mean = (3+5+7+7+10)÷5 = 32÷5 = 6.4 ✅",
      "Median = 7 (middle value when sorted) ✅",
      "Mode = 7 (appears most often) ✅",
      "Range = 10 - 3 = 7 ✅",
    ],
    tips: [
      "Always sort data in order before finding median!",
      "Range = highest - lowest",
      "If two numbers are in the middle for median, find their mean",
    ],
  },

  // ─── SCIENCE ──────────────────────────────────────────────────────────────

  {
    id: "cells",
    subject: "science",
    concept: "Cells — The Building Blocks of Life",
    keywords: [
      "cell",
      "cells",
      "nucleus",
      "organelle",
      "plant cell",
      "animal cell",
      "biology",
      "mitochondria",
      "chloroplast",
      "cell wall",
      "membrane",
      "living",
    ],
    explanation:
      "All living things are made of cells — they are the basic unit of life! 🧬 Think of the cell as a tiny factory, each part doing a special job! 🏭",
    examples: [
      "A plant cell has: cell wall, chloroplasts, nucleus, large vacuole",
      "An animal cell has: nucleus, mitochondria, cell membrane",
      "The nucleus controls the cell's activities — like a control center 🏛️",
      "Mitochondria make energy (ATP) — the powerhouse of the cell!",
    ],
    tips: [
      "Think of the cell as a tiny factory! 🏭",
      "Plant cells have a cell wall AND cell membrane; animal cells only have membrane",
      "Identify all cell parts to win bonus XP! 🔬",
    ],
    videoUrl: "https://www.youtube.com/watch?v=URUJD5NEXC8",
    gameSuggestion: {
      name: "Cell Explorer",
      link: "https://www.biologycorner.com/games/",
      xp: 10,
    },
  },

  {
    id: "circulatory-system",
    subject: "science",
    concept: "Circulatory System",
    keywords: [
      "circulatory",
      "heart",
      "blood",
      "arteries",
      "veins",
      "oxygen",
      "pump",
      "circulation",
      "pulse",
      "capillaries",
      "cardiac",
    ],
    explanation:
      "The circulatory system moves blood around the body ❤️. The heart pumps blood — arteries carry it away from the heart, veins bring it back!",
    examples: [
      "Heart pumps → arteries carry oxygenated blood → capillaries → veins return deoxygenated blood",
      "Oxygenated blood (bright red) goes to the body through arteries",
      "Deoxygenated blood (dark red) returns to heart through veins",
    ],
    tips: [
      "Arteries = Away from heart (A for Away!) ✅",
      "Veins = back to heart",
      "Oxygenated blood → arteries, Deoxygenated → veins 🩸",
    ],
    videoUrl: "https://www.youtube.com/watch?v=KPLJSdZbu2I",
    gameSuggestion: {
      name: "Blood Flow Challenge",
      link: "https://www.bbc.co.uk/bitesize/subjects/z4882hv",
      xp: 10,
    },
  },

  {
    id: "photosynthesis",
    subject: "science",
    concept: "Photosynthesis",
    keywords: [
      "photosynthesis",
      "plants",
      "sunlight",
      "glucose",
      "oxygen",
      "chlorophyll",
      "chloroplast",
      "carbon dioxide",
      "co2",
      "food",
      "light",
    ],
    explanation:
      "Photosynthesis is how plants make their own food! 🌞 They use sunlight + water + CO2 to make glucose (sugar) and oxygen. It all happens in chloroplasts — the green parts!",
    examples: [
      "Sunlight + Water + CO2 → Glucose + Oxygen",
      "Happens in chloroplasts (the green parts of leaves)",
      "The green colour comes from chlorophyll which absorbs sunlight",
      "Plants release oxygen as a byproduct — that's why they help us breathe!",
    ],
    tips: [
      "Plants make food, animals eat food — remember the difference!",
      "Happens in chloroplasts 🟢",
      "Glucose is used for energy and growth",
    ],
    videoUrl: "https://www.youtube.com/watch?v=sQK3Yr4Sc_k",
    tutorResponses: [
      {
        question: "Explain photosynthesis",
        answer:
          "Photosynthesis is how plants make food using sunlight 🌞 + water 💧 + CO2 → glucose 🍬 + oxygen O2. Want a fun experiment to see it in action? 🧪",
      },
    ],
  },

  {
    id: "food-chain",
    subject: "science",
    concept: "Food Chains and Ecosystems",
    keywords: [
      "food chain",
      "ecosystem",
      "producer",
      "consumer",
      "predator",
      "prey",
      "herbivore",
      "carnivore",
      "omnivore",
      "food web",
      "habitat",
    ],
    explanation:
      "A food chain shows who eats whom in nature! 🌿🐇🦊 Energy flows from plants (producers) to animals (consumers).",
    examples: [
      "Grass → Rabbit → Fox (classic food chain)",
      "Seaweed → Fish → Shark",
      "Producers: plants (make their own food via photosynthesis)",
      "Primary consumers: herbivores (eat plants)",
      "Secondary consumers: carnivores (eat herbivores)",
    ],
    tips: [
      "Arrows show energy flow: from eaten to eater",
      "Build the food chain correctly to earn bonus XP! 🏆",
      "A food web = multiple food chains connected",
    ],
    gameSuggestion: {
      name: "Eco Explorer",
      link: "https://www.bbc.co.uk/bitesize/guides/z6wwjxs/revision/1",
      xp: 10,
    },
  },

  {
    id: "force-motion",
    subject: "science",
    concept: "Force and Motion",
    keywords: [
      "force",
      "motion",
      "newton",
      "friction",
      "gravity",
      "push",
      "pull",
      "acceleration",
      "velocity",
      "speed",
      "inertia",
    ],
    explanation:
      "Force can make objects move, stop, or change direction 🏎️. Newton's 3 laws explain almost all motion we see every day!",
    examples: [
      "Pushing a ball causes it to roll (applied force)",
      "Friction slows a sliding book on a table",
      "Newton's 1st Law: objects stay at rest unless a force acts on them (inertia)",
      "Newton's 2nd Law: F = ma (force = mass × acceleration)",
      "Newton's 3rd Law: every action has an equal and opposite reaction",
    ],
    tips: [
      "Force = mass × acceleration (F = ma)",
      "Friction resists motion — less friction = faster movement",
      "Use less friction to go faster! ⚡",
    ],
    videoUrl: "https://www.youtube.com/watch?v=kKKM8Y-u7ds",
    gameSuggestion: {
      name: "Force and Motion Race",
      link: "https://www.physicsclassroom.com/",
      xp: 10,
    },
    tutorResponses: [
      {
        question: "What is friction?",
        answer:
          "Friction is a force that resists motion between two surfaces ✋. Like when you slide a book on a table — it slows down because of friction!",
      },
      {
        question: "What is the difference between force and motion?",
        answer:
          "Force is a push or pull 🏋️. Motion is the movement of an object 🚗. Force can change motion according to Newton's laws.",
      },
    ],
  },

  {
    id: "states-of-matter",
    subject: "science",
    concept: "States of Matter",
    keywords: [
      "states",
      "matter",
      "solid",
      "liquid",
      "gas",
      "evaporation",
      "condensation",
      "melting",
      "freezing",
      "boiling",
      "sublimation",
    ],
    explanation:
      "Matter can exist as solid, liquid, or gas 🧊💧💨. Temperature changes can change the state! Particles are arranged differently in each state.",
    examples: [
      "Ice (solid) → Water (liquid) when heated = melting",
      "Water (liquid) → Steam (gas) when boiled at 100°C = evaporation",
      "Steam (gas) → Water (liquid) when cooled = condensation",
      "Solid: particles tightly packed; Gas: particles spread out freely",
    ],
    tips: [
      "Temperature changes state! 🌡️",
      "Solid = particles tightly packed, Gas = particles spread out freely",
      "Match solids, liquids, and gases correctly to score! 🎯",
    ],
    videoUrl: "https://www.youtube.com/watch?v=V1eF4e6kYx0",
    gameSuggestion: {
      name: "Matter Mixer",
      link: "https://phet.colorado.edu/",
      xp: 10,
    },
    tutorResponses: [
      {
        question: "What is evaporation?",
        answer:
          "Evaporation is when a liquid turns into gas at the surface 💨. For example, water in a pan heats up and becomes steam! Want a mini experiment? 🧪",
      },
      {
        question: "Explain evaporation",
        answer:
          "Evaporation is when a liquid turns into gas at the surface 💨. For example, water in a pan heats up and becomes steam.",
      },
    ],
  },

  {
    id: "solar-system",
    subject: "science",
    concept: "The Solar System",
    keywords: [
      "solar system",
      "planet",
      "planets",
      "sun",
      "orbit",
      "mercury",
      "venus",
      "earth",
      "mars",
      "jupiter",
      "saturn",
      "uranus",
      "neptune",
      "day",
      "night",
      "rotate",
    ],
    explanation:
      "The Sun is at the center of our solar system, and all planets orbit around it ☀️🪐. Day and night happen because Earth rotates on its axis!",
    examples: [
      "Order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune",
      "Earth orbits the Sun in 365 days",
      "Day and night: Earth rotates on its axis → Sun lights one side at a time 🌞🌜",
      "The Moon orbits Earth because of gravity",
    ],
    tips: [
      "Remember the order: My Very Educated Mother Just Served Us Noodles! 🌌",
      "The Sun is a star, not a planet",
      "Identify planets in the right order to score! 🏆",
    ],
    videoUrl: "https://www.youtube.com/watch?v=libKVRa01L8",
    gameSuggestion: {
      name: "Planet Explorer",
      link: "https://solarsystem.nasa.gov/",
      xp: 10,
    },
  },

  {
    id: "water-cycle",
    subject: "science",
    concept: "The Water Cycle",
    keywords: [
      "water cycle",
      "evaporation",
      "condensation",
      "precipitation",
      "rain",
      "cloud",
      "collection",
      "cycle",
      "transpiration",
      "runoff",
    ],
    explanation:
      "Water evaporates 🌡️ → condenses into clouds ☁️ → precipitates as rain 🌧️ → collects in rivers/seas 🌊 — and repeats forever! The water cycle is continuous.",
    examples: [
      "Sun heats water → evaporation",
      "Water vapour rises and cools → condensation into clouds",
      "Clouds get heavy → precipitation (rain, snow, hail)",
      "Water flows back to rivers and sea → collection",
    ],
    tips: [
      "Remember: Evaporation → Condensation → Precipitation → Collection 🔄",
      "The water cycle never stops — it's continuous!",
      "Complete the cycle steps correctly to earn XP! 💦",
    ],
    videoUrl: "https://www.youtube.com/watch?v=al-do-HGuIk",
    gameSuggestion: {
      name: "Water Cycle Quest",
      link: "https://www.bbc.co.uk/bitesize/guides/ztssv4j/revision/1",
      xp: 10,
    },
    tutorResponses: [
      {
        question: "What causes rain?",
        answer:
          "Water vapour condenses into clouds ☁️ → clouds get heavy → falls as rain 🌧️ Back to rivers and then evaporates again!",
      },
    ],
  },

  {
    id: "gravity",
    subject: "science",
    concept: "Gravity",
    keywords: [
      "gravity",
      "gravitational",
      "pull",
      "newton",
      "apple",
      "weight",
      "mass",
      "orbit",
      "fall",
      "gravitational force",
    ],
    explanation:
      "Gravity is the force that pulls objects toward each other 🌍. It keeps us on the ground, keeps the Moon orbiting Earth, and keeps planets orbiting the Sun!",
    examples: [
      "Drop a ball — gravity pulls it down",
      "Moon orbits Earth because Earth's gravity pulls it",
      "Planets orbit the Sun because of the Sun's massive gravity",
      "Why do planets orbit the Sun? ☀️ Gravity pulls them toward the Sun → circular orbits",
    ],
    tips: [
      "Isaac Newton discovered the laws of gravity! 🧑‍🔬",
      "Weight = mass × gravity (W = mg)",
      "Place planets at correct distances to keep them orbiting! 🪐",
    ],
    videoUrl: "https://www.youtube.com/watch?v=MTY1Kje0yLg",
    gameSuggestion: {
      name: "Orbit Master",
      link: "https://solarsystem.nasa.gov/",
      xp: 10,
    },
    tutorResponses: [
      {
        question: "What is gravity?",
        answer:
          "Gravity is the force that pulls objects toward each other 🌍. It keeps us on the ground! Drop a ball and see it fall! ⚡",
      },
      {
        question: "I don't understand gravity",
        answer:
          "Gravity is the invisible force pulling everything toward Earth 🌍. Drop a ball and see it fall! That's gravity in action! ⚡",
      },
    ],
  },

  {
    id: "chemical-reactions",
    subject: "science",
    concept: "Chemical Reactions and Elements",
    keywords: [
      "chemical reaction",
      "reaction",
      "compound",
      "mixture",
      "baking soda",
      "vinegar",
      "element",
      "chemistry",
      "combine",
      "periodic table",
      "atom",
    ],
    explanation:
      "A chemical reaction happens when substances combine to make something new 🔥. Look for changes like color, temperature, or gas as signs of a reaction!",
    examples: [
      "Baking soda + vinegar → fizzing reaction 🎉",
      "Iron + oxygen → rust",
      "Burning wood → ash + smoke + heat",
      "Mixture = physically combined (can separate) 🥗 — like a salad!",
      "Compound = chemically bonded (cannot easily separate) ⚗️ — like water (H₂O)",
    ],
    tips: [
      "Mixture = substances physically combined, can be separated ✅",
      "Compound = chemically combined substances, cannot easily separate ✅",
      "Look for bubbles, color change, or heat as signs of a reaction",
    ],
    videoUrl: "https://www.youtube.com/watch?v=F7T8y0o8HRw",
    gameSuggestion: {
      name: "Reaction Builder",
      link: "https://phet.colorado.edu/",
      xp: 10,
    },
    tutorResponses: [
      {
        question: "I don't understand chemical reactions",
        answer:
          "No worries! A chemical reaction is when substances combine or break apart to make something new. 🔥 For example, baking soda + vinegar → fizz! 🎉",
      },
    ],
  },

  {
    id: "light-sound",
    subject: "science",
    concept: "Light and Sound",
    keywords: [
      "light",
      "sound",
      "reflection",
      "refraction",
      "vibration",
      "wave",
      "mirror",
      "lens",
      "shadow",
      "transparent",
      "opaque",
      "wavelength",
    ],
    explanation:
      "Light travels in straight lines and can reflect (bounce off) or refract (bend) 💡. Sound is a vibration that travels through air, water, or solids 🌊",
    examples: [
      "A straw looks bent in water → refraction (light bends when entering water)",
      "Mirror shows your reflection → reflection (light bounces back)",
      "Hitting a drum → vibrations → sound waves → your ears hear it",
      "Sound cannot travel in a vacuum (space is silent! 🚀)",
    ],
    tips: [
      "Light travels at 300,000 km/s — the fastest thing in the universe!",
      "Sound travels slower than light (that's why you see lightning before hearing thunder)",
      "Use mirrors to guide light or sound to the target! 🎯",
    ],
    videoUrl: "https://www.youtube.com/watch?v=V8XbA8r2kqQ",
    gameSuggestion: {
      name: "Light and Sound Lab",
      link: "https://phet.colorado.edu/",
      xp: 10,
    },
  },

  // ─── ENGLISH ──────────────────────────────────────────────────────────────

  {
    id: "nouns-verbs",
    subject: "english",
    concept: "Nouns and Verbs",
    keywords: [
      "noun",
      "nouns",
      "verb",
      "verbs",
      "parts of speech",
      "person",
      "place",
      "thing",
      "idea",
      "action",
      "pronoun",
      "adjective",
    ],
    explanation:
      "Nouns name a person, place, thing, or idea 🧍🏠📚. Verbs show actions or states of being ⚡! Pronouns (he, she, it, they) replace nouns.",
    examples: [
      "Nouns: cat, school, happiness, London",
      "Verbs: run, jump, is, are, think, feel",
      "The DOG RUNS → dog = noun, runs = verb",
      "Pronouns: 'Mary went home because SHE was tired' → she = pronoun replacing Mary",
    ],
    tips: [
      'Ask "Who or what?" to spot nouns ❓',
      'Ask "What is happening?" to spot verbs 🏃',
      "Pronouns replace nouns to avoid repetition",
    ],
    gameSuggestion: {
      name: "Parts of Speech Adventure",
      link: "https://www.bbc.co.uk/bitesize/topics/zwwp8mn",
      xp: 10,
    },
    videoUrl: "https://www.youtube.com/watch?v=J9nD2Xx8QW4",
    tutorResponses: [
      {
        question: "What is a verb?",
        answer:
          "A verb is a word that shows an action or state of being ⚡. For example: run, jump, is, are. Try spotting verbs in your favourite story!",
      },
      {
        question: "What is a noun?",
        answer:
          "A noun names a person, place, thing or idea 🧍. For example: cat, school, happiness. Ask yourself 'Who or what?' to find nouns!",
      },
      {
        question: "What is a pronoun?",
        answer:
          "A pronoun replaces a noun. For example: he, she, it, they 👤. Can you spot the pronouns in: 'John went to school because he wanted to learn'?",
      },
    ],
  },

  {
    id: "sentence-structure",
    subject: "english",
    concept: "Sentence Structure",
    keywords: [
      "sentence",
      "simple sentence",
      "compound sentence",
      "subject",
      "predicate",
      "conjunction",
      "clause",
      "structure",
      "complex",
      "grammar",
    ],
    explanation:
      "A simple sentence has one subject (who) and one predicate (what they do) 📝. Compound sentences join two simple sentences with a conjunction (and, but, or)!",
    examples: [
      "Simple: The dog runs.",
      "Compound: I like pizza, and I like ice cream. 🍕🍦",
      "Complex: I stayed home because it was raining.",
      "Subject = who/what is doing the action; Predicate = the action",
    ],
    tips: [
      "Conjunctions join sentences: and, but, or, because",
      "Every sentence needs a subject and a verb!",
      "Build correct sentences to level up fast! ⚡",
    ],
    gameSuggestion: {
      name: "Sentence Builder",
      link: "https://www.bbc.co.uk/bitesize/topics/zwwp8mn",
      xp: 10,
    },
  },

  {
    id: "synonyms-antonyms",
    subject: "english",
    concept: "Synonyms, Antonyms and Homophones",
    keywords: [
      "synonym",
      "synonyms",
      "antonym",
      "antonyms",
      "homophone",
      "homophones",
      "opposite",
      "similar",
      "meaning",
      "vocabulary",
      "words",
      "preposition",
    ],
    explanation:
      "Synonyms are words with similar meanings ✨. Antonyms are words with opposite meanings. Homophones sound the same but mean different things!",
    examples: [
      "Synonyms: happy → joyful, glad",
      "Antonyms: hot ↔ cold, fast ↔ slow",
      "Homophones: two, too, to (all sound like 'too') 🎤",
      "Prepositions show relationships: in, on, under, before, after 📍",
    ],
    tips: [
      "Learning synonyms improves your writing! ✨",
      "Use antonyms to make sentences more expressive 💡",
      "Homophones: pronunciation same, meaning different!",
    ],
    gameSuggestion: {
      name: "Word Match",
      link: "https://www.vocabulary.com/",
      xp: 10,
    },
  },

  {
    id: "figures-of-speech",
    subject: "english",
    concept: "Figures of Speech",
    keywords: [
      "simile",
      "metaphor",
      "personification",
      "hyperbole",
      "alliteration",
      "figure of speech",
      "imagery",
      "comparison",
      "like",
      "as",
      "onomatopoeia",
    ],
    explanation:
      "Figures of speech make writing more vivid and interesting! They paint pictures with words 🌟. Writers use them to create emotion and imagery.",
    examples: [
      "Simile: Her smile is like sunshine (uses 'like' or 'as') 🌟",
      "Metaphor: Time is a thief (direct comparison, no 'like') ✨",
      "Personification: The wind whispered through the trees 🐦",
      "Hyperbole: I am so hungry I could eat a horse! ⚡",
      "Alliteration: Peter Piper picked a peck of pickled peppers",
    ],
    tips: [
      "Simile = uses 'like' or 'as'; Metaphor = direct comparison",
      "Personification gives human qualities to non-human things",
      "Hyperbole is deliberate exaggeration for effect",
    ],
  },

  {
    id: "reading-comprehension",
    subject: "english",
    concept: "Reading Comprehension",
    keywords: [
      "main idea",
      "comprehension",
      "inference",
      "theme",
      "supporting details",
      "paragraph",
      "passage",
      "reading",
      "understand",
      "character",
      "plot",
      "moral",
    ],
    explanation:
      "Reading comprehension means understanding what you read 📖. Look for the main idea, supporting details, and hidden meanings (inferences)!",
    examples: [
      "Main idea: what the text is mostly about (often in the first/last sentence)",
      "Inference: using clues to understand what isn't stated directly 🔍",
      "A story about a brave girl saving her village → main idea: courage",
      "Character: who is in the story; Plot: what happens; Theme: the message",
      "The Lion and the Mouse → Moral: Small acts can make a big difference 🌟",
    ],
    tips: [
      "Look for repeated themes or key points to find the main idea",
      "If a character shivers outside → infer it is cold 🔍",
      "Theme = central message or lesson of the story",
    ],
    gameSuggestion: {
      name: "Reading Quest",
      link: "https://readtheory.org/",
      xp: 10,
    },
    tutorResponses: [
      {
        question: "How do I find the main idea?",
        answer:
          "Look for the sentence that tells the overall point. Usually repeated ideas or the first/last sentence can give a hint! 📖",
      },
      {
        question: "How do I identify the main idea of a paragraph?",
        answer:
          "Look for the sentence that tells the overall point of the paragraph. Usually, repeated ideas or the first/last sentences help. 🧠",
      },
    ],
  },

  {
    id: "grammar-tenses",
    subject: "english",
    concept: "Grammar — Verb Tenses",
    keywords: [
      "tense",
      "tenses",
      "present",
      "past",
      "future",
      "simple",
      "continuous",
      "perfect",
      "grammar",
      "verb form",
      "irregular",
    ],
    explanation:
      "Verb tenses tell us WHEN an action happens — past, present, or future 🕰️. Each tense has its own rule!",
    examples: [
      "Present simple: I walk to school every day (habits/facts)",
      "Past simple: She visited the museum yesterday (completed action)",
      "Future simple: I will study tonight (things that will happen 🔮)",
      "Regular past: walk → walked, jump → jumped",
      "Irregular past: go → went, see → saw, be → was/were",
    ],
    tips: [
      "Look for 'always', 'every day' for present simple",
      "Regular past verbs add -ed; irregular ones must be memorized!",
      "Look for 'will' or 'shall' for future simple",
    ],
    videoUrl: "https://www.youtube.com/watch?v=Jy0N90lZgJ4",
  },

  {
    id: "essay-writing",
    subject: "english",
    concept: "Essay and Paragraph Writing",
    keywords: [
      "essay",
      "paragraph",
      "writing",
      "topic sentence",
      "introduction",
      "conclusion",
      "body",
      "structure",
      "story",
      "narrative",
      "creative",
      "descriptive",
    ],
    explanation:
      "A paragraph has a topic sentence, supporting sentences, and a concluding sentence 🖊️. Essays follow introduction → body → conclusion. Always plan before writing!",
    examples: [
      "Topic sentence: Dogs are great pets.",
      "Supporting: They are loyal, playful, and friendly.",
      "Conclusion: Dogs make wonderful companions.",
      "Story structure: Beginning (characters/setting) → Problem ⚡ → Resolution 🎉",
    ],
    tips: [
      "Always plan before writing! 📝",
      "Stories need: beginning, middle, end, plus characters, setting, conflict, and resolution ✨",
      "Use descriptive words and emotions to engage readers",
    ],
    gameSuggestion: {
      name: "Story Builder",
      link: "https://www.storybird.com/",
      xp: 15,
    },
    tutorResponses: [
      {
        question: "Can you help me write a story?",
        answer:
          "Sure! Start with characters and setting 🏡, then a problem ⚡, and finally the resolution 🎉. Want me to give an example?",
      },
      {
        question: "How do I structure an essay?",
        answer:
          "An essay has 3 parts: Introduction (say what you'll argue), Body (your main points with evidence), and Conclusion (summarise your argument). 🖊️ Always plan before you write!",
      },
    ],
  },

  {
    id: "literature-stories",
    subject: "english",
    concept: "Literature — Stories, Characters and Themes",
    keywords: [
      "literature",
      "story",
      "character",
      "plot",
      "theme",
      "moral",
      "setting",
      "conflict",
      "resolution",
      "climax",
      "protagonist",
      "antagonist",
      "shakespeare",
    ],
    explanation:
      "Literature is studying stories and what they mean 📚. Every good story has characters, a plot, setting, and a theme (big message).",
    examples: [
      "Character: person/animal in the story (protagonist = main character)",
      "Plot: sequence of events → Beginning → Conflict → Climax → Resolution",
      "Cinderella → Main character: kind and brave; Moral: goodness is rewarded",
      "Romeo and Juliet (Shakespeare) → Theme: love and conflict",
    ],
    tips: [
      "Protagonist = main character (the hero!)",
      "Antagonist = the villain or opposing force",
      "Climax = the most exciting moment of the story",
    ],
  },

  // ─── GENERAL KNOWLEDGE ────────────────────────────────────────────────────

  {
    id: "continents-geography",
    subject: "generalKnowledge",
    concept: "Continents and World Geography",
    keywords: [
      "continent",
      "continents",
      "geography",
      "world",
      "countries",
      "capital",
      "river",
      "nile",
      "amazon",
      "mountain",
      "everest",
      "ocean",
      "japan",
      "tokyo",
    ],
    explanation:
      "There are 7 continents on Earth: Asia, Africa, North America, South America, Antarctica, Europe, Australia 🌎. Exploring geography helps you understand our amazing world!",
    examples: [
      "Longest river: Nile River 🌊 (over 6,600 km)",
      "Tallest mountain: Mount Everest at 8,848 meters 🏔️",
      "Largest continent: Asia; Smallest: Australia/Oceania",
      "Largest population country: China 🇨🇳",
      "Capital of Japan: Tokyo 🇯🇵",
    ],
    tips: [
      "Asia is the largest, Australia is the smallest continent 🏔️",
      "There are 5 oceans: Pacific, Atlantic, Indian, Southern, Arctic",
      "The Pacific Ocean is the largest ocean!",
    ],
    videoUrl: "https://www.youtube.com/watch?v=GqlmDAj1vT4",
    tutorResponses: [
      {
        question: "Tell me about the oceans",
        answer:
          "There are 5 oceans 🌊: Pacific, Atlantic, Indian, Southern, and Arctic. The Pacific is the largest — it covers more area than all land combined!",
      },
      {
        question: "What is the largest desert in the world?",
        answer:
          "The Sahara Desert is the largest hot desert 🌵, but if you count all deserts including cold ones, Antarctica is the largest! ❄️",
      },
    ],
  },

  {
    id: "ancient-civilizations",
    subject: "generalKnowledge",
    concept: "Ancient Civilizations and History",
    keywords: [
      "ancient",
      "civilization",
      "egypt",
      "mesopotamia",
      "rome",
      "greek",
      "history",
      "empire",
      "dynasty",
      "pharaoh",
      "pyramid",
      "great wall",
      "china",
      "india",
      "independence",
    ],
    explanation:
      "Ancient civilizations built the foundations of modern society through writing, mathematics, and architecture! 🏺 They were incredibly advanced for their time.",
    examples: [
      "Ancient Egypt: Pharaohs, pyramids, hieroglyphics, Nile River",
      "Mesopotamia: First writing system (cuneiform), between Tigris & Euphrates",
      "George Washington: First President of the United States 🇺🇸",
      "India's independence: 15 August 1947 🇮🇳",
      "Great Wall of China: over 21,000 km long 🏯",
    ],
    tips: [
      "Ancient civilizations contributed writing, math, and architecture",
      "The Great Wall of China is over 21,000 km long 🏯",
      "Many modern systems (law, democracy, math) come from ancient civilizations",
    ],
    videoUrl: "https://www.youtube.com/watch?v=smN1xb-m1po",
  },

  {
    id: "famous-scientists",
    subject: "generalKnowledge",
    concept: "Famous Scientists and Inventors",
    keywords: [
      "einstein",
      "newton",
      "curie",
      "inventor",
      "discovery",
      "scientist",
      "telephone",
      "bell",
      "light bulb",
      "edison",
      "gravity",
      "relativity",
      "space",
      "tereshkova",
    ],
    explanation:
      "These amazing people changed the world with their discoveries! 🧠 Their curiosity and hard work transformed science forever.",
    examples: [
      "Albert Einstein: theory of relativity (E=mc²) 🧠",
      "Isaac Newton: laws of gravity and motion 🍎",
      "Marie Curie: discovered radioactivity ⚛️ (first woman to win Nobel Prize!)",
      "Alexander Graham Bell: invented the telephone ☎️",
      "Thomas Edison: practical light bulb 💡 in 1879",
      "Valentina Tereshkova: first woman in space 👩‍🚀",
    ],
    tips: [
      "Marie Curie was the first woman to win a Nobel Prize!",
      "Newton's apple story explains how he thought about gravity",
    ],
    tutorResponses: [
      {
        question: "Who invented the light bulb?",
        answer:
          "Thomas Edison is credited with inventing the practical light bulb 💡 in 1879.",
      },
      {
        question: "Who was the first woman in space?",
        answer:
          "Valentina Tereshkova 👩‍🚀! She was a Soviet cosmonaut who flew into space in 1963. An absolute legend!",
      },
    ],
  },

  {
    id: "world-facts",
    subject: "generalKnowledge",
    concept: "Amazing World Facts",
    keywords: [
      "fact",
      "facts",
      "earth",
      "planet",
      "honey",
      "space",
      "ocean",
      "cheetah",
      "fast",
      "largest",
      "smallest",
      "tallest",
      "deepest",
      "animal",
      "heart",
    ],
    explanation:
      "Our world is full of incredible facts! 🌍 From animals to space to science — there's always something amazing to discover.",
    examples: [
      "Earth revolves around the Sun once every 365 days 🌞",
      "The Great Barrier Reef is the largest coral reef system in the world 🐠",
      "The cheetah can run up to 120 km/h — fastest land animal 🐆",
      "Honey never spoils — edible honey was found in ancient Egyptian tombs 🍯",
      "The human heart beats around 100,000 times a day ❤️",
      "Water boils at 100°C and freezes at 0°C 💧",
    ],
    tips: [
      "The Sahara is the largest hot desert 🌵, but Antarctica is the largest desert overall!",
      "Mercury is the planet closest to the Sun ☀️",
    ],
    tutorResponses: [
      {
        question: "Which is the fastest land animal?",
        answer:
          "The cheetah 🐆, which can run up to 120 km/h! It can accelerate from 0 to 100 km/h in just 3 seconds!",
      },
    ],
  },

  {
    id: "science-facts-gk",
    subject: "generalKnowledge",
    concept: "Key Science Facts and Discoveries",
    keywords: [
      "boil",
      "freeze",
      "temperature",
      "speed of light",
      "dna",
      "atom",
      "molecule",
      "discovery",
      "experiment",
      "periodic table",
      "element",
    ],
    explanation:
      "Science is full of amazing discoveries that explain our world! 🔬 From atoms to DNA to the speed of light — science uncovers the truth.",
    examples: [
      "Water boils at 100°C and freezes at 0°C 💧",
      "The human heart beats about 100,000 times a day ❤️",
      "The closest planet to the Sun: Mercury ☀️",
      "Who discovered gravity: Isaac Newton 🍎",
      "Speed of light: 300,000 km per second (nothing travels faster!)",
    ],
    tips: [
      "Temperature is measured in Celsius (°C) or Fahrenheit (°F)",
      "Atoms are the tiny building blocks of everything around us!",
    ],
  },

  // ─── WELLBEING ────────────────────────────────────────────────────────────

  {
    id: "managing-emotions",
    subject: "wellbeing",
    concept: "Understanding and Managing Emotions",
    keywords: [
      "emotion",
      "emotions",
      "feelings",
      "anxious",
      "anxiety",
      "stress",
      "angry",
      "sad",
      "happy",
      "fear",
      "worry",
      "mental health",
      "lonely",
      "scared",
    ],
    explanation:
      "Emotions are feelings like happiness 😊, sadness 😢, anger 😡, fear 😨, and surprise 😲. Naming your emotion helps you understand and manage it! It is completely normal to feel all kinds of emotions.",
    examples: [
      "If you feel anxious: take deep breaths 🫁, talk to someone you trust, write your feelings down 📝",
      "If you feel angry: count to 10, walk away, then talk about it calmly",
      "Feeling both positive and negative emotions is totally healthy and normal",
    ],
    tips: [
      "Naming your emotion helps you respond calmly 💛",
      "Talking to someone you trust always helps 🤝",
      "Writing feelings down can be a great way to process them",
    ],
    videoUrl: "https://www.youtube.com/watch?v=Kqpu3tuvX_M",
    tutorResponses: [
      {
        question: "I feel stressed about exams",
        answer:
          "That's totally normal! Try deep breathing 🌬️, short breaks 🕒, and remind yourself you're doing your best. Want a quick relaxation exercise? 🧘",
      },
      {
        question: "I feel sad and lonely",
        answer:
          "It's okay to feel sad 💛. Talk to someone you trust, write your feelings down, or do something you enjoy. You're not alone!",
      },
      {
        question: "What can you do if you feel anxious?",
        answer:
          "Take deep breaths 🫁, talk to someone you trust, or write your feelings down 📝. Remember: feeling anxious is completely normal and it will pass!",
      },
    ],
  },

  {
    id: "mindfulness-study",
    subject: "wellbeing",
    concept: "Mindfulness and Study Habits",
    keywords: [
      "mindfulness",
      "study",
      "focus",
      "pomodoro",
      "breathing",
      "meditation",
      "relax",
      "calm",
      "technique",
      "tips",
      "productive",
      "procrastinate",
      "distraction",
      "concentration",
    ],
    explanation:
      "Mindfulness means paying attention to the present moment without judgment 🧘. Combined with good study habits like the Pomodoro technique, you can ace anything!",
    examples: [
      "Deep breathing: breathe in 4 seconds, hold 2, exhale 6. Repeat 5 times 🌬️",
      "Pomodoro technique: 25-50 min focused study → 5-10 min break ⏱️",
      "Goal setting: 'I will complete 5 math questions in 20 minutes' 🎯",
      "Exercise releases endorphins 💪 — even a short walk helps your brain!",
    ],
    tips: [
      "Avoid multitasking — focus on one task at a time!",
      "Adequate sleep (8-10 hours for teens) helps memory, mood, and energy 🛌",
      "Try guided meditation apps or listen to calming music 🎵",
    ],
    tutorResponses: [
      {
        question: "How do I improve focus while studying?",
        answer:
          "Try Pomodoro sessions ⏱️ (25-50 min study, 5-10 min break), eliminate distractions, and write a checklist 📝",
      },
    ],
  },

  {
    id: "growth-mindset",
    subject: "wellbeing",
    concept: "Growth Mindset and Motivation",
    keywords: [
      "growth mindset",
      "motivation",
      "confidence",
      "positive",
      "believe",
      "practice",
      "improve",
      "mindset",
      "attitude",
      "self-talk",
      "perseverance",
      "resilience",
      "effort",
    ],
    explanation:
      "A growth mindset means believing your skills can improve with practice 🌱. You can ALWAYS get better with effort! Mistakes are proof you're trying and learning.",
    examples: [
      "Instead of 'I can't do this' say 'I can't do this YET' 🌱",
      "Positive self-talk: 'I can try my best' instead of 'I'm not good at this' 💛",
      "Celebrate small achievements to stay motivated 🎉",
      "Every mistake = a lesson learned, not a failure!",
    ],
    tips: [
      "Mistakes are proof you're trying! 🌟",
      "Celebrate small wins to stay motivated",
      "Your brain literally grows stronger the more you learn!",
    ],
  },

  {
    id: "self-care",
    subject: "wellbeing",
    concept: "Self-Care and Healthy Lifestyle",
    keywords: [
      "self-care",
      "sleep",
      "healthy",
      "exercise",
      "food",
      "nutrition",
      "diet",
      "rest",
      "balance",
      "wellbeing",
      "health",
      "energy",
      "lifestyle",
    ],
    explanation:
      "Taking care of your body and mind is essential for learning and happiness! 💪 Sleep, healthy food, and exercise all help your brain work better.",
    examples: [
      "Sleep: 8-10 hours for teens helps memory, mood, and energy 🛌",
      "Healthy eating: fruits 🍎, vegetables 🥦, proteins 🥩, and water 💧",
      "Physical activity: walk, stretch, dance, or play a sport 🏀",
      "Avoid screens 30 mins before sleep for better rest 🌙",
    ],
    tips: [
      "Avoid screens 30 mins before sleep 🌙",
      "Exercise releases endorphins which improve mood and reduce stress 💪",
      "Balanced meals give you energy and focus for studying!",
    ],
  },
];

// ─── findLocalAnswer ──────────────────────────────────────────────────────────

/**
 * Searches the GIGA_DATASET for the best matching entry.
 * Checks subject-specific entries first, then falls back to all entries.
 * Returns the best match if score >= 2, otherwise null.
 */
export function findLocalAnswer(
  subject: string,
  query: string,
): GigaEntry | null {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/);

  let bestMatch: GigaEntry | null = null;
  let bestScore = 0;

  // First pass: exact subject match
  const subjectEntries = GIGA_DATASET.filter((e) => e.subject === subject);

  for (const entry of subjectEntries) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lowerQuery.includes(kw.toLowerCase())) score += 2;
    }
    // Bonus: concept name words match
    const conceptWords = entry.concept.toLowerCase().split(/\s+/);
    for (const cw of conceptWords) {
      if (cw.length > 3 && queryWords.includes(cw)) score += 1;
    }
    // Extra bonus: tutor question match
    if (entry.tutorResponses) {
      for (const tr of entry.tutorResponses) {
        const trLower = tr.question.toLowerCase();
        if (lowerQuery.includes(trLower.slice(0, 15))) score += 3;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Minimum threshold of 2 keyword hits
  if (bestScore >= 2) return bestMatch;

  // Second pass: search all entries (for cross-subject questions)
  for (const entry of GIGA_DATASET) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lowerQuery.includes(kw.toLowerCase())) score += 2;
    }
    const conceptWords = entry.concept.toLowerCase().split(/\s+/);
    for (const cw of conceptWords) {
      if (cw.length > 3 && queryWords.includes(cw)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore >= 4 ? bestMatch : null;
}
