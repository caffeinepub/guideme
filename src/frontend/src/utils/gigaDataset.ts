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

  // ─── KNOWLEDGE BASE ADDITIONS ─────────────────────────────────────────────

  // MATH: Number Systems
  {
    id: "number-systems",
    subject: "math",
    concept: "Number Systems",
    keywords: [
      "natural",
      "whole",
      "integer",
      "rational",
      "irrational",
      "real",
      "prime",
      "composite",
      "even",
      "odd",
      "number system",
      "numbers",
    ],
    explanation:
      "Numbers are classified into different types! 🔢 Natural numbers start from 1, whole numbers include 0, integers include negatives, rational numbers can be written as fractions, and irrational numbers cannot (like π and √2).",
    examples: [
      "Natural Numbers: 1, 2, 3, 4, 5...",
      "Whole Numbers: 0, 1, 2, 3, 4...",
      "Integers: ...-3, -2, -1, 0, 1, 2, 3...",
      "Rational: 1/2, 3/4, 5, -2 (can be written as p/q)",
      "Irrational: π = 3.14159..., √2 = 1.41421... (cannot be written as fraction)",
      "Prime: 2, 3, 5, 7, 11 (exactly 2 factors: 1 and itself)",
      "Composite: 4, 6, 8, 9, 10 (more than 2 factors)",
      "Note: 1 is neither prime nor composite! 2 is the only even prime! ⭐",
    ],
    tips: [
      "1 is neither prime nor composite — it's special! 🌟",
      "2 is the only even prime number",
      "All natural numbers are whole numbers, all whole numbers are integers",
      "Real numbers = rational + irrational numbers combined",
    ],
    tutorResponses: [
      {
        question: "What is a prime number?",
        answer:
          "A prime number has exactly 2 factors: 1 and itself! 🔢 Examples: 2, 3, 5, 7, 11, 13. Remember: 1 is NOT prime, and 2 is the only even prime! ✅",
      },
      {
        question:
          "What is the difference between rational and irrational numbers?",
        answer:
          "Rational numbers CAN be written as a fraction p/q (like 1/2, 3, -5). Irrational numbers CANNOT be written as a fraction (like π = 3.14159... and √2). Together they make up Real Numbers! 🧮",
      },
    ],
  },

  // MATH: Place Value
  {
    id: "place-value",
    subject: "math",
    concept: "Place Value",
    keywords: [
      "place value",
      "ones",
      "tens",
      "hundreds",
      "thousands",
      "digit",
      "position",
      "value",
    ],
    explanation:
      "Place value means the value of a digit depends on its POSITION in the number! 📍 Each position is 10 times the one to its right.",
    examples: [
      "In 4,567: 4 is in thousands place (4000)",
      "5 is in hundreds place (500)",
      "6 is in tens place (60)",
      "7 is in ones place (7)",
      "So 4,567 = 4000 + 500 + 60 + 7",
    ],
    tips: [
      "Read from right: ones, tens, hundreds, thousands, ten-thousands...",
      "Each place is 10× the value of the place to its right! ×10",
    ],
  },

  // MATH: Decimals
  {
    id: "decimals",
    subject: "math",
    concept: "Decimals",
    keywords: [
      "decimal",
      "decimal point",
      "tenths",
      "hundredths",
      "converting",
      "decimals",
    ],
    explanation:
      "A decimal number has a point separating the whole part from the fractional part! 🔢 e.g. 3.14, 0.5, 12.75",
    examples: [
      "Adding: Line up decimal points → 3.45 + 2.6 = 6.05",
      "Subtracting: Line up decimals → 5.8 - 2.35 = 3.45",
      "Multiplying: Multiply normally, count decimal places → 2.5 × 1.2 = 3.0",
      "Fraction to Decimal: 3/4 = 3÷4 = 0.75",
      "Decimal to Fraction: 0.75 = 75/100 = 3/4",
    ],
    tips: [
      "Always line up the decimal points before adding or subtracting! ✅",
      "When multiplying decimals, count total decimal places in both numbers",
      "To convert fraction to decimal: divide numerator by denominator",
    ],
    tutorResponses: [
      {
        question: "How do I add decimals?",
        answer:
          "Line up the decimal points and add as normal! 📏 Example: 3.45 + 2.6 → write as 3.45 + 2.60 = 6.05 ✅ Always align the decimal points first!",
      },
    ],
  },

  // MATH: Mensuration
  {
    id: "mensuration",
    subject: "math",
    concept: "Mensuration - Area, Perimeter and Volume",
    keywords: [
      "area",
      "perimeter",
      "volume",
      "surface area",
      "mensuration",
      "measurement",
      "cube",
      "cuboid",
      "cylinder",
      "square",
      "rectangle",
      "triangle",
      "circle",
      "circumference",
    ],
    explanation:
      "Mensuration is the branch of maths dealing with measurements of shapes! 📐 Perimeter is the boundary, Area is the space inside, Volume is the space inside a 3D shape.",
    examples: [
      "Perimeter of Square = 4 × side",
      "Perimeter of Rectangle = 2 × (length + breadth)",
      "Area of Square = side × side",
      "Area of Rectangle = length × breadth",
      "Area of Triangle = ½ × base × height",
      "Area of Circle = π × r²",
      "Circumference of Circle = 2 × π × r",
      "Volume of Cube = side³",
      "Volume of Cuboid = length × breadth × height",
      "Volume of Cylinder = π × r² × height",
      "Surface Area of Cube = 6 × side²",
      "Surface Area of Cuboid = 2(lb + bh + hl)",
    ],
    tips: [
      "Area is always in SQUARE units (cm², m²) 📐",
      "Volume is always in CUBIC units (cm³, m³) 📦",
      "Perimeter is in regular units (cm, m) — just the boundary!",
      "π ≈ 3.14159 or use 22/7 for calculations",
    ],
    tutorResponses: [
      {
        question:
          "What is the area of a rectangle with length 8 cm and breadth 5 cm?",
        answer:
          "Area of Rectangle = length × breadth = 8 × 5 = 40 cm² ✅ Remember: area is always in square units!",
      },
      {
        question: "What is the perimeter of a square with side 6 cm?",
        answer:
          "Perimeter of Square = 4 × side = 4 × 6 = 24 cm ✅ Perimeter is in regular units, not square units!",
      },
      {
        question: "What is the area of a triangle with base 10 and height 6?",
        answer: "Area of Triangle = ½ × base × height = ½ × 10 × 6 = 30 cm² ✅",
      },
      {
        question: "What is the circumference of a circle with radius 7?",
        answer:
          "Circumference = 2 × π × r = 2 × 22/7 × 7 = 44 cm ✅ (using π = 22/7)",
      },
    ],
  },

  // MATH: Profit, Loss and Simple Interest
  {
    id: "profit-loss-interest",
    subject: "math",
    concept: "Profit, Loss and Simple Interest",
    keywords: [
      "profit",
      "loss",
      "simple interest",
      "cost price",
      "selling price",
      "interest",
      "principal",
      "rate",
      "percentage profit",
      "percentage loss",
      "SI",
      "CP",
      "SP",
    ],
    explanation:
      "Profit and Loss are used in business! 💰 Simple Interest is earned on savings or paid on loans.",
    rule: "Profit = SP - CP | Loss = CP - SP | Profit% = (Profit/CP)×100 | SI = (P×R×T)/100",
    examples: [
      "Bought toy for ₹200, sold for ₹250 → Profit = ₹50, Profit% = (50/200)×100 = 25%",
      "Book costs ₹300, sold for ₹270 → Loss = ₹30, Loss% = (30/300)×100 = 10%",
      "Simple Interest: P=₹1000, R=5%, T=3 years → SI = (1000×5×3)/100 = ₹150",
    ],
    tips: [
      "If SP > CP → Profit! 🎉",
      "If CP > SP → Loss! 😟",
      "Always calculate % on the COST PRICE, not selling price!",
      "SI formula: SI = PRT/100 (Principal × Rate × Time ÷ 100)",
    ],
    tutorResponses: [
      {
        question: "How do I find profit percentage?",
        answer:
          "Profit% = (Profit ÷ Cost Price) × 100! 🎯 First find profit = SP - CP, then divide by CP and multiply by 100. Example: bought for ₹200, sold for ₹250 → Profit = ₹50 → Profit% = (50/200)×100 = 25% 🎉",
      },
      {
        question: "What is simple interest?",
        answer:
          "Simple Interest = (Principal × Rate × Time) ÷ 100! 💰 P = money you invest/borrow, R = interest rate per year, T = time in years. Example: ₹1000 at 5% for 3 years → SI = (1000×5×3)/100 = ₹150 ✅",
      },
    ],
  },

  // SCIENCE: Plants and Photosynthesis
  {
    id: "plants-photosynthesis",
    subject: "science",
    concept: "Plants and Photosynthesis",
    keywords: [
      "photosynthesis",
      "plant",
      "plants",
      "chlorophyll",
      "chloroplast",
      "leaves",
      "roots",
      "stem",
      "flower",
      "seed",
      "pollination",
      "germination",
      "glucose",
      "oxygen",
      "carbon dioxide",
      "producer",
    ],
    explanation:
      "Photosynthesis is how plants make their own food using sunlight! 🌱 Plants are the only living things that can make their own food — they are called producers.",
    rule: "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
    examples: [
      "Formula: Carbon Dioxide + Water + Sunlight → Glucose + Oxygen",
      "Roots: absorb water and minerals from soil",
      "Stem: supports plant, transports water and food",
      "Leaves: where photosynthesis happens (contain chlorophyll)",
      "Chlorophyll: the green pigment that absorbs sunlight",
      "Self-pollination: pollen from same flower | Cross-pollination: from different flower",
      "Germination needs: water, warmth and air (oxygen)",
      "Flowering plants (Angiosperms): rose, mango | Non-flowering (Gymnosperms): pine, fir",
    ],
    tips: [
      "Chloroplasts are where photosynthesis happens — only in plant cells! 🌿",
      "Plants absorb CO₂ and release O₂ — opposite of animals! ↔️",
      "Chlorophyll makes leaves GREEN and absorbs sunlight ☀️",
      "Fun: plants are like little chefs cooking food with sunlight as their stove! 🍳",
    ],
    tutorResponses: [
      {
        question: "What is photosynthesis?",
        answer:
          "Photosynthesis is how plants make their own food using sunlight! 🌱 They take in CO₂ + water + sunlight and produce glucose (food) + oxygen. Formula: CO₂ + H₂O + light → Glucose + O₂ 🌿 Plants are amazing — they feed themselves AND give us oxygen!",
      },
    ],
  },

  // SCIENCE: Animal Classification
  {
    id: "animal-classification",
    subject: "science",
    concept: "Animal Classification",
    keywords: [
      "vertebrate",
      "invertebrate",
      "mammal",
      "bird",
      "reptile",
      "amphibian",
      "fish",
      "insect",
      "classification",
      "animals",
      "backbone",
      "warm blooded",
      "cold blooded",
      "food chain",
      "herbivore",
      "carnivore",
      "omnivore",
    ],
    explanation:
      "Animals are classified into vertebrates (with backbone) and invertebrates (without backbone)! 🐾",
    examples: [
      "Mammals: warm-blooded, give birth, feed milk (dog, whale, human) 🐕",
      "Birds: warm-blooded, feathers, lay eggs, wings (eagle, penguin) 🦅",
      "Reptiles: cold-blooded, scales, lay eggs (snake, crocodile) 🐍",
      "Amphibians: cold-blooded, live in water AND land (frog, salamander) 🐸",
      "Fish: cold-blooded, gills, scales, live in water (salmon, shark) 🐟",
      "Insects: 6 legs, 3 body parts (butterfly, ant) 🦋",
      "Arachnids: 8 legs (spider, scorpion) 🕷️",
      "Food Chain: Grass → Grasshopper → Frog → Snake → Eagle",
      "Herbivore: eats only plants | Carnivore: eats only animals | Omnivore: eats both",
    ],
    tips: [
      "Vertebrates have a backbone, invertebrates dont! 🦴",
      "Warm-blooded: maintain own body temperature (mammals, birds)",
      "Cold-blooded: body temperature depends on surroundings (reptiles, fish, amphibians)",
      "Producer → Primary Consumer → Secondary → Tertiary → Decomposer",
    ],
    tutorResponses: [
      {
        question:
          "What is the difference between vertebrates and invertebrates?",
        answer:
          "Vertebrates have a BACKBONE (spine) — like mammals, birds, reptiles, amphibians and fish! 🦴 Invertebrates have NO backbone — like insects, spiders, crabs, snails and worms! 🐛 Over 95% of all animal species are invertebrates!",
      },
    ],
  },

  // SCIENCE: Human Body Systems
  {
    id: "human-body-systems",
    subject: "science",
    concept: "Human Body Systems",
    keywords: [
      "digestive",
      "respiratory",
      "circulatory",
      "skeletal",
      "muscular",
      "nervous",
      "heart",
      "lungs",
      "brain",
      "blood",
      "bones",
      "muscle",
      "body system",
      "human body",
      "alveoli",
      "artery",
      "vein",
      "neuron",
    ],
    explanation:
      "The human body has several organ systems that work together! 🫀 Each system has a specific role in keeping us alive and healthy.",
    examples: [
      "Digestive: Mouth → Oesophagus → Stomach → Small Intestine → Large Intestine → Rectum",
      "Respiratory: Nose → Trachea → Bronchi → Lungs (alveoli = gas exchange) 💨",
      "Circulatory: Heart pumps blood through arteries (away) and veins (towards heart) ❤️",
      "Heart has 4 chambers: Left atrium, Right atrium, Left ventricle, Right ventricle",
      "Blood: Red cells (oxygen), White cells (fight disease), Platelets (clotting), Plasma",
      "Skeletal: 206 bones in adult body 🦴",
      "Nervous: Brain + Spinal cord = Central Nervous System; Neurons carry messages",
    ],
    tips: [
      "Arteries carry blood AWAY from heart (A for Away!) 🔴",
      "Veins carry blood TOWARDS the heart 🔵",
      "Small intestine absorbs NUTRIENTS; Large intestine absorbs WATER",
      "Alveoli = tiny air sacs in lungs where gas exchange happens",
    ],
    tutorResponses: [
      {
        question: "What is the difference between arteries and veins?",
        answer:
          "Arteries carry blood AWAY from the heart (usually oxygenated, thick walls, high pressure) 🔴 Veins carry blood TOWARDS the heart (usually deoxygenated, thin walls, have valves) 🔵 Trick: Arteries = Away, both start with A! 😄",
      },
      {
        question: "How does digestion work?",
        answer:
          "Food travels: Mouth (saliva starts digestion) → Oesophagus → Stomach (acid breaks down food) → Small Intestine (absorbs nutrients) → Large Intestine (absorbs water) → Rectum → Anus! 🍽️ The whole journey takes about 24-72 hours!",
      },
    ],
  },

  // SCIENCE: Matter and Changes
  {
    id: "matter-changes",
    subject: "science",
    concept: "States of Matter and Changes",
    keywords: [
      "solid",
      "liquid",
      "gas",
      "melting",
      "freezing",
      "evaporation",
      "condensation",
      "sublimation",
      "physical change",
      "chemical change",
      "matter",
      "states",
      "element",
      "compound",
      "mixture",
      "filtration",
      "distillation",
    ],
    explanation:
      "Matter exists in 3 states: solid, liquid and gas! 🧪 Physical changes are reversible, chemical changes create new substances.",
    examples: [
      "Solid: fixed shape and volume | Liquid: fixed volume, no fixed shape | Gas: no fixed shape or volume",
      "Melting: solid → liquid | Freezing: liquid → solid | Evaporation: liquid → gas",
      "Condensation: gas → liquid | Sublimation: solid → gas directly (dry ice) ✨",
      "Physical Change: no new substance, reversible (melting ice, tearing paper) ↩️",
      "Chemical Change: new substance formed, irreversible (burning, rusting, cooking food) 🔥",
      "Elements: one type of atom (gold, oxygen) | Compounds: elements chemically combined (H₂O, NaCl)",
      "Mixtures: substances NOT chemically joined (salt water, air, soil)",
      "Separating: Filtration (sand/water), Evaporation (salt water), Distillation (liquids)",
    ],
    tips: [
      "Physical Change = REVERSIBLE (you can undo it) ↩️",
      "Chemical Change = IRREVERSIBLE, new substance formed 🚫",
      "Elements = one type of atom | Compounds = chemically joined | Mixtures = not chemically joined",
    ],
    tutorResponses: [
      {
        question:
          "What is the difference between physical and chemical change?",
        answer:
          "Physical Change: no new substance formed, usually REVERSIBLE! (melting ice, tearing paper) 🔵 Chemical Change: a NEW substance is formed, usually IRREVERSIBLE! (burning wood, rusting iron, cooking food) 🔴 Easy rule: if you can reverse it easily, it's physical! ↩️",
      },
    ],
  },

  // SCIENCE: Forces and Newton's Laws
  {
    id: "forces-newtons-laws",
    subject: "science",
    concept: "Forces, Motion and Newton's Laws",
    keywords: [
      "force",
      "motion",
      "newton",
      "gravity",
      "friction",
      "speed",
      "velocity",
      "acceleration",
      "inertia",
      "work",
      "energy",
      "kinetic",
      "potential",
      "newtons law",
      "F=ma",
    ],
    explanation:
      "A force is a push or pull! 🍎 Newton's 3 laws explain how objects move. Force is measured in Newtons (N).",
    rule: "Speed = Distance/Time | F = ma | Work = Force × Distance | KE = ½mv²",
    examples: [
      "First Law (Inertia): object stays at rest or in motion unless a force acts 🛑",
      "Second Law: F = ma (Force = Mass × Acceleration) 💪",
      "Third Law: every action has an equal and opposite reaction 🤜🤛",
      "Speed = Distance ÷ Time (m/s)",
      "Work = Force × Distance (Joules J)",
      "KE = ½ × mass × velocity² | PE = mass × g × height",
      "Types: Gravity, Friction, Magnetic, Electrostatic, Applied, Normal",
    ],
    tips: [
      "Inertia: objects resist changes to motion — why you lurch forward when a car brakes! 🚗",
      "Action-Reaction: when you push a wall, it pushes back equally! 🧱",
      "Law of Conservation of Energy: energy cannot be created or destroyed, only converted! ⚡",
      "Simple machines make work easier: lever, pulley, inclined plane, wheel & axle, screw, wedge",
    ],
    tutorResponses: [
      {
        question: "What are Newton's three laws of motion?",
        answer:
          "1st Law (Inertia): Objects stay at rest or keep moving unless a force acts on them 🛑 2nd Law: F = ma (more mass = more force needed) 💪 3rd Law: Every action has equal and opposite reaction 🤜🤛 Fun example: When you jump, you push Earth DOWN and Earth pushes you UP! 🌍",
      },
    ],
  },

  // SCIENCE: Light and Sound
  {
    id: "light-sound",
    subject: "science",
    concept: "Light and Sound",
    keywords: [
      "light",
      "sound",
      "reflection",
      "refraction",
      "mirror",
      "lens",
      "speed of light",
      "frequency",
      "pitch",
      "amplitude",
      "echo",
      "vibration",
      "spectrum",
      "rainbow",
      "VIBGYOR",
      "ultrasound",
    ],
    explanation:
      "Light travels in straight lines at 300,000 km/s! 💡 Sound is caused by vibrations and needs a medium to travel.",
    examples: [
      "Speed of light: 300,000 km/s ⚡ | Speed of sound in air: 343 m/s",
      "Reflection: light bouncing off surface (angle in = angle out)",
      "Refraction: light bending when passing between media (straw in water looks bent)",
      "VIBGYOR: Violet, Indigo, Blue, Green, Yellow, Orange, Red (rainbow colours) 🌈",
      "Concave mirror: curves inward (torches, shaving mirrors)",
      "Convex mirror: curves outward, wider view (rear-view mirrors) 🚗",
      "Convex lens: thicker in middle, converges light | Concave lens: thinner, diverges light",
      "Sound travels: fastest in solids, slower in liquids, slowest in gases",
      "Frequency (Hz) = vibrations per second | Higher frequency = higher pitch",
      "Ultrasound > 20,000 Hz | Infrasound < 20 Hz | Echo = reflection of sound",
    ],
    tips: [
      "VIBGYOR = colours of rainbow/spectrum 🌈",
      "Sound CANNOT travel in vacuum — it needs a medium! 🚫",
      "Light CAN travel in vacuum — it travels through space! ✅",
    ],
    tutorResponses: [
      {
        question: "What are the colours of the rainbow?",
        answer:
          "VIBGYOR! 🌈 Violet, Indigo, Blue, Green, Yellow, Orange, Red! White light splits into these 7 colours when it passes through a prism or raindrops. Remember: V-I-B-G-Y-O-R! 🎨",
      },
    ],
  },

  // SCIENCE: Electricity
  {
    id: "electricity",
    subject: "science",
    concept: "Electricity and Circuits",
    keywords: [
      "electricity",
      "current",
      "voltage",
      "resistance",
      "ohm",
      "circuit",
      "series",
      "parallel",
      "conductor",
      "insulator",
      "ohms law",
      "ampere",
      "volt",
    ],
    explanation:
      "Electricity is the flow of electric charge! ⚡ Ohm's Law links voltage, current and resistance.",
    rule: "V = IR (Voltage = Current × Resistance)",
    examples: [
      "Current (I): flow of charge, Amperes (A)",
      "Voltage (V): pushes current, Volts (V)",
      "Resistance (R): opposes current, Ohms (Ω)",
      "Ohm's Law: V = IR",
      "Series circuit: one path, current same everywhere (one bulb out = all out!)",
      "Parallel circuit: multiple paths, voltage same across each branch (others stay on ✅)",
      "Conductors: allow electricity (copper, silver, gold) ✅",
      "Insulators: block electricity (rubber, plastic, wood) 🛡️",
    ],
    tips: [
      "V = IR triangle: cover what you want to find! 🔺",
      "Series: current same throughout | Parallel: voltage same throughout",
      "Conductors have free electrons; insulators dont",
    ],
    tutorResponses: [
      {
        question: "What is Ohm's Law?",
        answer:
          "Ohm's Law: V = IR ⚡ Voltage = Current × Resistance! If voltage increases and resistance stays same, current increases too. Triangle trick: put finger on what you want — I = V/R, R = V/I, V = IR! 🔺",
      },
    ],
  },

  // SCIENCE: Earth and Space
  {
    id: "earth-and-space",
    subject: "science",
    concept: "Earth Structure and Solar System",
    keywords: [
      "solar system",
      "planet",
      "planets",
      "earth",
      "moon",
      "sun",
      "mercury",
      "venus",
      "mars",
      "jupiter",
      "saturn",
      "uranus",
      "neptune",
      "eclipse",
      "galaxy",
      "milky way",
      "earthquake",
      "volcano",
      "rock cycle",
      "water cycle",
      "crust",
      "mantle",
      "core",
    ],
    explanation:
      "Our solar system has 8 planets orbiting the Sun! 🪐 Earth is the only planet with life. The Earth itself has layers and is constantly changing.",
    examples: [
      "Planets in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune",
      "My Very Educated Mother Just Served Us Nachos! 🌮",
      "Jupiter: largest planet, Great Red Spot, 79 moons 🪐",
      "Saturn: famous rings of ice and rock",
      "Venus: hottest planet (thick CO₂ atmosphere)",
      "Earth layers: Crust → Mantle → Outer Core (liquid) → Inner Core (solid)",
      "Water Cycle: Evaporation → Condensation → Precipitation → Collection",
      "Rock types: Igneous (cooled magma), Sedimentary (compressed layers), Metamorphic (heat+pressure)",
      "Solar eclipse: Moon between Earth and Sun | Lunar eclipse: Earth's shadow on Moon",
    ],
    tips: [
      "My Very Educated Mother Just Served Us Nachos = planet order! 🌟",
      "Closest to Sun = Mercury | Farthest = Neptune | Hottest = Venus",
      "Milky Way is our galaxy — contains billions of stars! 🌌",
    ],
    tutorResponses: [
      {
        question: "What are the planets in order from the sun?",
        answer:
          "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune! 🪐 Remember: My Very Educated Mother Just Served Us Nachos! 🌮 8 planets total (Pluto was reclassified as a dwarf planet in 2006)!",
      },
    ],
  },

  // ENGLISH: Parts of Speech
  {
    id: "parts-of-speech",
    subject: "english",
    concept: "Parts of Speech",
    keywords: [
      "noun",
      "pronoun",
      "verb",
      "adjective",
      "adverb",
      "preposition",
      "conjunction",
      "interjection",
      "article",
      "parts of speech",
      "common noun",
      "proper noun",
      "abstract noun",
      "collective noun",
      "FANBOYS",
    ],
    explanation:
      "Every word in English belongs to a Part of Speech! 🗣️ There are 8 types: Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjection.",
    examples: [
      "Noun: name of person/place/thing/idea (teacher, London, love)",
      "Common Noun: general (city, boy, dog) | Proper Noun: specific, capitalised (Mumbai, Ravi)",
      "Abstract Noun: cannot be seen/touched (love, freedom, courage)",
      "Collective Noun: group word (flock of birds, pack of wolves, pride of lions) 🦁",
      "Pronoun: replaces noun (I, he, she, they, it, we)",
      "Verb: action or being (run, jump, is, seems, has)",
      "Adjective: describes a noun (beautiful, three, this)",
      "Adverb: describes verb/adjective/adverb (quickly, very, here) — most end in -ly",
      "Preposition: shows relationship (in, on, under, between, at)",
      "Conjunction: FANBOYS = For, And, Nor, But, Or, Yet, So",
    ],
    tips: [
      "FANBOYS = coordinating conjunctions: For And Nor But Or Yet So! 🎯",
      "Adjective answers: What kind? How many? Which one? Whose?",
      "Adverb answers: How? When? Where? How often?",
      "Fun test for nouns: if you can put a or the before it, its probably a noun!",
    ],
    tutorResponses: [
      {
        question: "What is the difference between a noun and a pronoun?",
        answer:
          "A noun is the NAME of a person, place, thing or idea (teacher, Mumbai, love) 📝 A pronoun REPLACES a noun to avoid repetition — instead of saying Ravi twice, say Ravi went and HE sat! 😄 Examples: I, you, he, she, it, we, they, me, him, her",
      },
      {
        question: "What is the difference between an adjective and an adverb?",
        answer:
          "Adjective describes a NOUN: She is a fast runner (fast describes runner) 📝 Adverb describes a VERB: She runs fast (fast describes runs) 💨 Most adverbs end in -ly (quickly, slowly). Adverbs are like the adjectives of verbs! 😄",
      },
      {
        question: "What are collective nouns?",
        answer:
          "Collective nouns name a GROUP of things! 🦁 A flock of birds, a pack of wolves, a pride of lions, a school of fish, a herd of cattle, a bunch of flowers! Learn them and impress everyone! ✨",
      },
    ],
  },

  // ENGLISH: Tenses
  {
    id: "tenses",
    subject: "english",
    concept: "English Tenses",
    keywords: [
      "tense",
      "tenses",
      "present",
      "past",
      "future",
      "simple",
      "continuous",
      "perfect",
      "has",
      "have",
      "had",
      "will",
      "was",
      "were",
      "simple present",
      "simple past",
      "future tense",
      "present continuous",
      "past perfect",
    ],
    explanation:
      "Tenses tell us WHEN an action happens! ⏰ There are 3 main tenses (Present, Past, Future) each with 4 forms (Simple, Continuous, Perfect, Perfect Continuous).",
    examples: [
      "Simple Present: She walks. (habits/facts, add s/es for he/she/it)",
      "Present Continuous: She is walking. (happening NOW, is/am/are + verb-ing)",
      "Present Perfect: She has walked. (recently completed, has/have + past participle)",
      "Simple Past: She walked. (finished action, add -ed for regular verbs)",
      "Past Continuous: She was walking. (was/were + verb-ing)",
      "Past Perfect: She had walked. (before another past action, had + past participle)",
      "Simple Future: She will walk. (will + base verb) 🔮",
      "Irregular verbs: go→went, eat→ate, run→ran, see→saw, write→wrote ⚠️",
      "HAS with he/she/it | HAVE with I/you/we/they",
    ],
    tips: [
      "If you can say right now after it → Present Continuous! ⏱️",
      "Past Perfect is the older past — it happened before the simple past",
      "Add s/es for he/she/it in Simple Present (She runs, He eats)",
      "Will is your magic word for simple future tense! 🪄",
    ],
    tutorResponses: [
      {
        question: "What is simple present tense?",
        answer:
          "Simple Present is used for habits, facts, and regular activities! 🌅 Structure: subject + base verb (add s/es for he/she/it). Examples: I wake up at 7am (habit), The sun rises in the east (fact), She plays cricket (regular activity) ✅",
      },
      {
        question: "What is the difference between has and have?",
        answer:
          "HAS is used with he, she, it (third person singular) 👦 HAVE is used with I, you, we, they 👥 Easy rule: if the subject sounds like it ends with s (he, she, it) → use HAS! He HAS a dog ✅ They HAVE a car ✅",
      },
      {
        question: "What is past perfect tense?",
        answer:
          "Past Perfect shows an action that happened BEFORE another past action! ⏰ Structure: had + past participle. She had finished her homework before dinner — homework finished first, THEN dinner! Think of it as the older past 😄",
      },
    ],
  },

  // ENGLISH: Active and Passive Voice
  {
    id: "active-passive-voice",
    subject: "english",
    concept: "Active and Passive Voice",
    keywords: [
      "active voice",
      "passive voice",
      "voice",
      "active",
      "passive",
      "past participle",
      "subject",
      "object",
      "convert voice",
      "change voice",
    ],
    explanation:
      "Active Voice: the subject DOES the action. Passive Voice: the subject RECEIVES the action! 🔄",
    rule: "Active → Passive: Object becomes subject + is/are/was/were/will be + past participle + by [agent]",
    examples: [
      "Active: The cat chased the mouse. | Passive: The mouse was chased by the cat.",
      "Active: She wrote a letter. | Passive: A letter was written by her.",
      "Active: They will build a school. | Passive: A school will be built by them.",
      "Active: The chef is cooking dinner. | Passive: Dinner is being cooked by the chef.",
      "Present → is/are + pp | Past → was/were + pp | Future → will be + pp",
    ],
    tips: [
      "Steps: 1) Object→Subject | 2) Add to be form | 3) Past participle | 4) Original subject → by agent",
      "The by agent part can be omitted if not important",
    ],
    tutorResponses: [
      {
        question: "How do I convert active to passive voice?",
        answer:
          "4 steps! 🔄 Step 1: Object becomes subject ✅ Step 2: Add correct form of to be (is/are/was/were/will be) ✅ Step 3: Use past participle of main verb ✅ Step 4: Original subject becomes by + agent ✅ Example: She wrote a letter → A letter was written by her ✅",
      },
    ],
  },

  // ENGLISH: Direct and Indirect Speech
  {
    id: "direct-indirect-speech",
    subject: "english",
    concept: "Direct and Indirect Speech",
    keywords: [
      "direct speech",
      "indirect speech",
      "reported speech",
      "quotation marks",
      "say said that",
      "tense change",
      "convert speech",
      "narration",
      "reporting verb",
    ],
    explanation:
      "Direct speech uses the EXACT words with quotation marks. Indirect speech REPORTS what was said without quotes! 💬",
    rule: "Remove quotes, add that, shift tense back, change time words and pronouns",
    examples: [
      'Direct: She said, "I am tired." | Indirect: She said that she was tired.',
      'Direct: He said, "I will come tomorrow." | Indirect: He said that he would come the next day.',
      "Tense changes: is/am/are → was/were | will → would | can → could | has/have → had",
      "Time changes: today → that day | tomorrow → the next day | yesterday → the previous day",
      "Word changes: here → there | this → that | these → those | now → then",
    ],
    tips: [
      "Remove quotation marks and add that after the reporting verb 📝",
      "Change present tense → past tense in the reported clause",
      "Pronouns change: I → he/she | we → they",
    ],
    tutorResponses: [
      {
        question: "How do I convert direct to indirect speech?",
        answer:
          "Key changes! 💬 1) Remove quotes, add that ✅ 2) Tense goes back: am/is → was, will → would, can → could ✅ 3) Pronouns: I → he/she ✅ 4) Time words: today → that day, tomorrow → the next day ✅ Example: I am happy → she said that she WAS happy ✅",
      },
    ],
  },

  // ENGLISH: Literary Devices
  {
    id: "literary-devices",
    subject: "english",
    concept: "Literary Devices and Figures of Speech",
    keywords: [
      "simile",
      "metaphor",
      "personification",
      "alliteration",
      "onomatopoeia",
      "hyperbole",
      "oxymoron",
      "irony",
      "imagery",
      "symbolism",
      "literary device",
      "figure of speech",
      "rhyme",
      "rhythm",
    ],
    explanation:
      "Literary devices make writing more vivid and interesting! ✍️ They help writers express ideas in creative ways.",
    examples: [
      "Simile: comparing using like or as → She runs LIKE the wind 💨",
      "Metaphor: comparing WITHOUT like or as → Life IS a journey 🛤️",
      "Personification: giving human qualities to non-human things → The wind WHISPERED 🍃",
      "Alliteration: same consonant sound at start → Peter Piper picked pickled peppers 🅿️",
      "Onomatopoeia: words that sound like what they mean → buzz, crash, sizzle, hiss 🔊",
      "Hyperbole: exaggeration for effect → I have told you a MILLION times! 😤",
      "Oxymoron: contradictory words together → deafening silence, bittersweet 🤔",
      "Irony: saying opposite of what you mean 😏",
    ],
    tips: [
      "Simile SAYS like or as — Metaphor does NOT! 🎯",
      "Personification gives HUMAN qualities to non-human things",
      "Alliteration = same STARTING SOUND (not just letter!)",
      "Hyperbole is an EXAGGERATION — not literally true",
    ],
    tutorResponses: [
      {
        question: "What is the difference between simile and metaphor?",
        answer:
          "Simile compares using LIKE or AS: She runs like the wind 💨 Metaphor compares WITHOUT like or as: Life is a journey 🛤️ Both compare two different things, but simile is more obvious about it! Tip: Simile = Similar (uses like/as), Metaphor = More direct! 🎯",
      },
    ],
  },

  // ENGLISH: Question Tags
  {
    id: "question-tags",
    subject: "english",
    concept: "Question Tags",
    keywords: [
      "question tag",
      "question tags",
      "tag question",
      "positive negative",
      "isnt it",
      "doesnt she",
      "havent they",
    ],
    explanation:
      "Question tags are short questions added at the END of a statement to confirm or invite agreement! ❓",
    rule: "Positive statement → Negative tag | Negative statement → Positive tag",
    examples: [
      "She is coming, ISN'T she? ✅ (positive → negative tag)",
      "They don't play cricket, DO they? ✅ (negative → positive tag)",
      "He has finished, HASN'T he? ✅",
      "You can swim, CAN'T you? ✅",
      "It wasn't raining, WAS it? ✅",
    ],
    tips: [
      "Golden Rule: Positive → Negative tag | Negative → Positive tag! 🔄",
      "Use the same auxiliary verb as in the statement",
      "The pronoun in the tag matches the subject of the statement",
    ],
    tutorResponses: [
      {
        question: "How do I form question tags?",
        answer:
          "Golden Rule: Positive statement → NEGATIVE tag | Negative statement → POSITIVE tag! 🔄 Use same auxiliary verb: She IS coming, ISN'T she? | They DON'T play, DO they? The pronoun matches the subject! It is like a little echo that flips positive/negative! 😄",
      },
    ],
  },

  // ENGLISH: Vocabulary
  {
    id: "vocabulary-prefixes-suffixes",
    subject: "english",
    concept: "Vocabulary: Prefixes, Suffixes, Synonyms, Antonyms, Homophones",
    keywords: [
      "prefix",
      "suffix",
      "synonym",
      "antonym",
      "homophone",
      "vocabulary",
      "word",
      "meaning",
      "homophones",
      "homonym",
      "there their",
      "your youre",
    ],
    explanation:
      "Knowing prefixes and suffixes helps you understand new words! 🔤 Synonyms are similar words, antonyms are opposite words, homophones sound the same but differ in meaning.",
    examples: [
      "Prefix (beginning): un- → unhappy | re- → redo | pre- → preview | mis- → mistake | dis- → disagree",
      "Suffix (end): -ful → hopeful | -less → hopeless | -ness → happiness | -ly → quickly | -tion → education",
      "Synonyms (same meaning): happy = joyful, glad, cheerful",
      "Antonyms (opposite): happy = sad, unhappy, miserable",
      "Homophones (sound same): there/their/they're | to/two/too | hear/here | write/right",
      "Homonyms (same spelling+sound, different meaning): bat (cricket bat/animal) | bank (river/financial)",
    ],
    tips: [
      "-ful means FULL OF (hopeful = full of hope) | -less means WITHOUT (hopeless = without hope)! 🎯",
      "SYNonym = SYNc (same) | ANTonym = ANTi (against)! 😄",
      "Their = belonging to them | There = a place | They're = they are",
      "Your = belonging to you | You're = you are | Its = belonging to it | It's = it is",
    ],
    tutorResponses: [
      {
        question: "What is a homophone?",
        answer:
          "Homophones are words that SOUND the same but have different meanings and spellings! ⚠️ Common ones: there/their/they're | to/two/too | hear/here | write/right | see/sea | son/sun. Very commonly confused in exams — be extra careful! 🎯",
      },
      {
        question: "What is a prefix?",
        answer:
          "A prefix is added to the BEGINNING of a word to change its meaning! 🔤 Examples: un- (unhappy, unkind) | re- (redo, rewrite) | pre- (preview) | mis- (mistake) | dis- (disagree) | im-/in- (impossible, incorrect). Learning prefixes helps you understand new words! 🧠",
      },
    ],
  },

  // SOCIAL STUDIES: Ancient Civilisations
  {
    id: "ancient-civilisations",
    subject: "generalKnowledge",
    concept: "Ancient Civilisations",
    keywords: [
      "mesopotamia",
      "egypt",
      "indus valley",
      "ancient greece",
      "ancient rome",
      "ancient china",
      "civilisation",
      "civilization",
      "harappa",
      "mohenjo daro",
      "pyramid",
      "pharaoh",
      "hieroglyphics",
      "silk road",
      "democracy",
      "athens",
    ],
    explanation:
      "Ancient civilisations were the first organised human societies! 🏛️ They developed writing, laws, architecture and trade.",
    examples: [
      "Mesopotamia (Iraq): Tigris & Euphrates rivers, Sumerians invented cuneiform writing, Hammurabi's Code 📜",
      "Ancient Egypt: Nile River, pyramids, pharaohs, hieroglyphics, Rosetta Stone, Tutankhamun, Cleopatra",
      "Indus Valley: 2500-1900 BCE, Mohenjo-daro & Harappa, advanced drainage, undecoded script 🏙️",
      "Ancient Greece: city-states (Athens, Sparta), democracy invented in Athens, Socrates, Plato, Aristotle, Olympics 🏛️",
      "Ancient Rome: Julius Caesar, roads, aqueducts, Latin language, empire fell 476 CE",
      "Ancient China: Great Wall, invented paper/printing/gunpowder/compass, Silk Road trade route 🐉",
      "Ancient India: Vedic period, Mauryan Empire (Ashoka), Gupta Empire (Aryabhata, zero)",
    ],
    tips: [
      "Democracy was invented in Ancient Athens! ✅",
      "Indus Valley had the most advanced urban planning of ancient times",
      "China invented 4 key things: paper, printing, gunpowder, compass! 🧭",
      "Aryabhata from Gupta Empire is credited with discovering zero! 🔢",
    ],
    tutorResponses: [
      {
        question: "What are the major ancient civilisations?",
        answer:
          "The major ancient civilisations: 🏛️ Mesopotamia (writing, Hammurabi's laws) | Ancient Egypt (pyramids, pharaohs, hieroglyphics) | Indus Valley (Harappa, Mohenjo-daro) | Ancient Greece (democracy, Olympics, philosophy) | Ancient Rome (roads, Latin, law) | Ancient China (Great Wall, paper, gunpowder) | Ancient India (Vedas, zero, chess)! 📜",
      },
    ],
  },

  // SOCIAL STUDIES: Indian History
  {
    id: "indian-history",
    subject: "generalKnowledge",
    concept: "Indian History",
    keywords: [
      "india",
      "indian history",
      "mughal",
      "british",
      "gandhi",
      "independence",
      "mauryan",
      "gupta",
      "ashoka",
      "akbar",
      "salt march",
      "constitution",
      "ambedkar",
      "nehru",
      "1947",
      "republic day",
      "freedom movement",
      "taj mahal",
    ],
    explanation:
      "India has a rich history spanning thousands of years! 🇮🇳 From ancient empires to independence in 1947.",
    examples: [
      "Mauryan Empire (322-185 BCE): Chandragupta Maurya, Emperor Ashoka converted to Buddhism after Kalinga War",
      "Gupta Empire (320-550 CE): Golden Age — Aryabhata (zero, pi, Earth is round), Kalidasa (poetry)",
      "Mughal Empire (1526-1857): Babur founded, Akbar greatest (religious tolerance), Shah Jahan (Taj Mahal)",
      "British Rule: East India Company 1600, Battle of Plassey 1757, 1857 First War of Independence",
      "Gandhi's movements: Non-Cooperation (1920-22), Salt March/Civil Disobedience (1930), Quit India (1942)",
      "Independence: 15 August 1947 | Nehru = 1st PM | Prasad = 1st President",
      "Constitution: adopted 26 January 1950 (Republic Day), written by B.R. Ambedkar ✅",
    ],
    tips: [
      "Aryabhata from Gupta Empire discovered ZERO! 🔢",
      "Salt March: Sabarmati Ashram to Dandi, 385 km, protest British salt tax 🧂",
      "B.R. Ambedkar = Father of Indian Constitution ✅",
      "15 Aug = Independence Day | 26 Jan = Republic Day 🇮🇳",
    ],
    tutorResponses: [
      {
        question: "What was the Salt March?",
        answer:
          "The Salt March was a pivotal moment in India's freedom struggle! 🧂 12 March to 5 April 1930 | Led by Mahatma Gandhi | Sabarmati Ashram to Dandi (385 km) | Protest against British salt tax by making salt from seawater. It inspired millions to join the Civil Disobedience Movement! Gandhi chose salt because every Indian needed it — rich or poor. Very clever! 🧠",
      },
      {
        question: "Who wrote the Indian Constitution?",
        answer:
          "The Constitution was drafted by the Constituent Assembly, chaired by Dr B.R. Ambedkar — Father of the Indian Constitution! 📜 Adopted: 26 November 1949 | Came into effect: 26 January 1950 (Republic Day) | It is the LONGEST written constitution in the world! 🇮🇳",
      },
    ],
  },

  // SOCIAL STUDIES: Indian Government
  {
    id: "indian-government",
    subject: "generalKnowledge",
    concept: "Indian Government and Constitution",
    keywords: [
      "parliament",
      "lok sabha",
      "rajya sabha",
      "constitution",
      "fundamental rights",
      "president",
      "prime minister",
      "judiciary",
      "supreme court",
      "panchayati raj",
      "election",
      "democracy",
      "government",
      "india government",
    ],
    explanation:
      "India is a democratic republic with three branches of government! 🏛️ The Constitution guarantees fundamental rights to all citizens.",
    examples: [
      "Three branches: Legislature (makes laws), Executive (implements), Judiciary (interprets)",
      "Parliament: Lok Sabha (Lower, 543 elected, 5-year term) + Rajya Sabha (Upper, 245 members)",
      "Lok Sabha = House of the People | Rajya Sabha = House of the States",
      "President = constitutional head | Prime Minister = real executive power",
      "6 Fundamental Rights: Equality, Freedom, Against Exploitation, Religion, Cultural & Educational, Constitutional Remedies",
      "Mnemonic: EFARCE!",
      "Panchayati Raj: Gram Panchayat (village) → Panchayat Samiti (block) → Zila Parishad (district)",
      "Voting age: 18+ (Universal Adult Franchise)",
    ],
    tips: [
      "Lok Sabha = PEOPLE (Lok = People) | Rajya Sabha = STATES (Rajya = State) 😄",
      "B.R. Ambedkar called Right to Constitutional Remedies the Heart and Soul of Constitution ❤️",
      "Election Commission is independent and conducts free and fair elections",
    ],
    tutorResponses: [
      {
        question: "What is the difference between Lok Sabha and Rajya Sabha?",
        answer:
          "Lok Sabha (Lower House): 543 elected members, 5-year term, directly elected by people — represents the PEOPLE (Lok = People) 🟢 Rajya Sabha (Upper House): 245 members, 6-year terms, permanent body, represents the STATES (Rajya = State) 🔵 Easy: Lok = People, Rajya = States! 😄",
      },
      {
        question: "What are the fundamental rights?",
        answer:
          "India's 6 Fundamental Rights (EFARCE): ⚖️ Right to Equality | 🗣️ Right to Freedom | 🚫 Right Against Exploitation | 🕌 Right to Freedom of Religion | 📚 Cultural and Educational Rights | ⚖️ Right to Constitutional Remedies. Ambedkar called the last one the Heart and Soul of the Constitution! ❤️",
      },
    ],
  },

  // SOCIAL STUDIES: World Geography
  {
    id: "world-geography",
    subject: "generalKnowledge",
    concept: "World Geography",
    keywords: [
      "continent",
      "ocean",
      "latitude",
      "longitude",
      "equator",
      "geography",
      "map",
      "climate",
      "biome",
      "river",
      "mountain",
      "desert",
      "nile",
      "amazon",
      "himalayas",
      "sahara",
      "pacific",
      "atlantic",
      "prime meridian",
    ],
    explanation:
      "Earth has 7 continents and 5 oceans! 🌍 Geography helps us understand our planet's features, climates and regions.",
    examples: [
      "7 Continents (largest to smallest): Asia, Africa, North America, South America, Antarctica, Europe, Australia",
      "Mnemonic: A FAT ANT EATS APPLES! 🐜",
      "5 Oceans: Pacific (largest), Atlantic, Indian, Southern, Arctic (PAISA 💰)",
      "Latitude: horizontal lines (N-S from Equator 0°) | Longitude: vertical lines (E-W from Prime Meridian 0°)",
      "Equator = 0° lat | Tropic of Cancer = 23.5°N | Tropic of Capricorn = 23.5°S",
      "Longest river: Nile (Africa) | Largest by discharge: Amazon (South America)",
      "Highest mountains: Himalayas (Mt Everest 8,849 m) | Longest range: Andes",
      "Largest hot desert: Sahara (Africa) | Largest cold desert: Gobi (Asia)",
    ],
    tips: [
      "LAT-itude = fLAT = horizontal lines | LONGitude = LONG = vertical lines! 😄",
      "A FAT ANT EATS APPLES = 7 continents in order of size! 🐜",
      "PAISA = 5 oceans: Pacific, Atlantic, Indian, Southern, Arctic! 💰",
      "Climate zones: Tropical (near Equator), Subtropical, Temperate, Polar",
    ],
    tutorResponses: [
      {
        question: "What are the 7 continents?",
        answer:
          "Asia, Africa, North America, South America, Antarctica, Europe, Australia! 🌍 Remember: A FAT ANT EATS APPLES for the order from largest to smallest! 🐜 Asia is the largest and Australia is the smallest!",
      },
      {
        question: "What is the difference between latitude and longitude?",
        answer:
          "Latitude: horizontal lines running EAST-WEST, measured North-South from Equator (0°) 📏 Longitude: vertical lines running NORTH-SOUTH, measured East-West from Prime Meridian (0°) 📏 Tip: LAT-itude = fLAT = horizontal! LONGitude = LONG lines! 😄",
      },
    ],
  },

  // SOCIAL STUDIES: Modern World History
  {
    id: "world-history-modern",
    subject: "generalKnowledge",
    concept: "Modern World History",
    keywords: [
      "world war",
      "world war 1",
      "world war 2",
      "wwi",
      "wwii",
      "renaissance",
      "industrial revolution",
      "cold war",
      "united nations",
      "holocaust",
    ],
    explanation:
      "Modern world history covers key events that shaped today's world! 🌍",
    examples: [
      "Renaissance (14th-17th century): revival of art/science, da Vinci, Michelangelo, Gutenberg printing press",
      "Industrial Revolution (18th-19th century): Britain, James Watt steam engine, mass production, urbanisation",
      "WW1 (1914-1918): Archduke Franz Ferdinand assassinated, Allied vs Central Powers, 17 million deaths, Treaty of Versailles",
      "WW2 (1939-1945): Hitler invaded Poland, Allied vs Axis, Holocaust (6 million Jews), atomic bombs, 70-85 million deaths",
      "UN formed 1945: headquartered New York, 193 members, agencies: UNESCO, UNICEF, WHO",
      "Cold War (1947-1991): USA vs USSR, Capitalism vs Communism, Berlin Wall (1961-1989)",
    ],
    tips: [
      "WW2 was the deadliest war in history — 70-85 million deaths 😔",
      "UN was formed to prevent future world wars ✅",
      "Berlin Wall fell in 1989, USSR dissolved in 1991 = end of Cold War",
    ],
    tutorResponses: [
      {
        question: "What caused World War 1?",
        answer:
          "WW1 (1914-1918) was triggered by the assassination of Archduke Franz Ferdinand! 🔫 Allied Powers vs Central Powers, trench warfare, 17 million deaths. Ended with Treaty of Versailles in 1918 which placed heavy blame on Germany ⚠️",
      },
    ],
  },

  // SOCIAL STUDIES: Economics
  {
    id: "economics-basics",
    subject: "generalKnowledge",
    concept: "Basic Economics",
    keywords: [
      "economics",
      "demand",
      "supply",
      "needs",
      "wants",
      "market",
      "economy",
      "goods",
      "services",
      "money",
      "bank",
      "RBI",
      "primary sector",
      "secondary sector",
      "tertiary sector",
      "agriculture",
      "kharif",
      "rabi",
      "green revolution",
    ],
    explanation:
      "Economics is about how people make choices with limited resources! 💰 It covers needs vs wants, supply and demand, and how money works.",
    examples: [
      "Needs: essential for survival (food, water, shelter, clothing)",
      "Wants: desired but not essential (TV, car, toys)",
      "Supply & Demand: more demand + same supply → price rises | more supply → price falls",
      "Types of economy: Traditional, Market, Command, Mixed (India = mixed economy)",
      "RBI = Reserve Bank of India = central bank 🏦",
      "Primary Sector: agriculture/mining | Secondary: manufacturing | Tertiary: services",
      "Kharif crops: monsoon (June-Sep) → rice, cotton, maize 🌾",
      "Rabi crops: winter (Oct-Mar) → wheat, mustard, peas",
      "Green Revolution (1960s): new seeds + fertilisers → increased food production in India",
    ],
    tips: [
      "Green Revolution in 1960s made India food self-sufficient! 🌾",
      "Barter system = trade goods for goods (before money existed)",
      "Mixed economy = combination of market + command = most countries today",
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
