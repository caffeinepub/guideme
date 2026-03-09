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
    ],
    rule: "If signs are the same, add absolute values and keep the sign. If signs are different, subtract smaller from bigger and take the bigger sign.",
    explanation:
      "Integers are whole numbers that can be positive or negative. Adding them is easy once you know the sign rules!",
    examples: [
      "7 + 5 = 12 ✅",
      "7 + (-3) = 4 ✅",
      "-8 + (-2) = -10 ✅",
      "-7 + 4 = -3 (subtract 4 from 7, keep the minus sign)",
    ],
    tips: [
      "Visualize a number line for easier understanding!",
      "Think of positive as moving right, negative as moving left",
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
    ],
    rule: "Make denominators the same, then add numerators.",
    explanation:
      "Fractions show parts of a whole. For example, 1/2 is one half. You can add, subtract, multiply, and divide fractions!",
    examples: [
      "1/4 + 2/4 = 3/4 ✅",
      "2/3 + 1/6 = 4/6 + 1/6 = 5/6 ✅ (convert to common denominator first)",
    ],
    tips: [
      "Always simplify fractions if possible!",
      "Find the Lowest Common Multiple (LCM) for the denominator",
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
          "Fractions show parts of a whole. For example, 1/2 is one half. You can add, subtract, multiply, and divide fractions. 🍕 Want a practice problem?",
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
    ],
    rule: "Line up decimal points, then add or subtract as usual.",
    explanation:
      "Decimals are just another way to show parts of a whole, like 3.5 means 3 and a half!",
    examples: [
      "3.5 + 2.75 = 6.25 ✅",
      "7.2 - 3.85: write as 7.20 - 3.85 = 3.35 ✅",
    ],
    tips: [
      "Always double-check your decimal alignment!",
      "Add zeros to make numbers the same length",
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
    ],
    rule: "Isolate the variable by doing the same operation on both sides.",
    explanation:
      "Algebra uses letters like x to represent unknown numbers. To find x, you balance both sides of the equation!",
    examples: [
      "3x + 5 = 20 → 3x = 15 → x = 5 ✅",
      "x - 7 = 10 → add 7 to both sides → x = 17 ✅",
    ],
    tips: [
      "Always check your answer by plugging it back!",
      "Step-by-step solving is the key! 🔑",
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
    ],
    rule: "Percentage means 'out of 100'. To find a percentage of a number, multiply by the percentage divided by 100.",
    explanation:
      "Percentages are used everywhere — sales, test scores, tips! They show how much out of 100.",
    examples: [
      "50% of 80 = 80 × 0.5 = 40 ✅",
      "20% of 150 = 150 × 0.2 = 30 ✅",
      "75 out of 100 = 75%",
    ],
    tips: [
      "To convert % to decimal, divide by 100",
      "50% = half, 25% = quarter, 10% = one tenth",
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
    ],
    rule: "a² + b² = c² where c is the hypotenuse (longest side) of a right-angled triangle.",
    explanation:
      "Pythagoras theorem helps you find the missing side of a right-angled triangle!",
    examples: [
      "3² + 4² = 9 + 16 = 25 → c = √25 = 5 ✅",
      "If a=5, b=12: 25+144=169 → c=√169=13 ✅",
    ],
    tips: [
      "Only works for right-angled triangles!",
      "The hypotenuse is always opposite the right angle",
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
    ],
    explanation:
      "All living things are made of cells — they are the basic unit of life! 🧬 Think of the cell as a tiny factory, each part doing a special job!",
    examples: [
      "A plant cell has: cell wall, chloroplasts, nucleus, vacuole",
      "An animal cell has: nucleus, mitochondria, cell membrane",
      "The nucleus controls the cell's activities — like a control center 🏛️",
    ],
    tips: [
      "Think of the cell as a tiny factory!",
      "Plant cells have a cell wall AND cell membrane; animal cells only have membrane",
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
    ],
    explanation:
      "The circulatory system moves blood around the body ❤️. The heart pumps blood — arteries carry it away, veins bring it back!",
    examples: [
      "Heart pumps → arteries carry oxygenated blood → veins return deoxygenated blood",
      "Oxygenated blood (bright red) goes to the body through arteries",
      "Deoxygenated blood (dark red) returns to heart through veins",
    ],
    tips: [
      "Arteries = Away from heart",
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
    ],
    explanation:
      "Photosynthesis is how plants make their own food! 🌞 They use sunlight + water + CO2 to make glucose and oxygen.",
    examples: [
      "Sunlight + Water + CO2 → Glucose + Oxygen",
      "Happens in chloroplasts (the green parts of leaves)",
      "The green colour comes from chlorophyll which absorbs sunlight",
    ],
    tips: [
      "Plants make food, animals eat food — remember the difference!",
      "Happens in chloroplasts 🟢",
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
    ],
    explanation:
      "Force can make objects move, stop, or change direction 🏎️. Newton's laws help us predict motion!",
    examples: [
      "Pushing a ball causes it to roll (applied force)",
      "Friction slows a sliding book on a table",
      "Newton's 1st Law: objects stay at rest unless a force acts on them",
    ],
    tips: [
      "Force = mass × acceleration (F=ma)",
      "Friction resists motion — less friction = faster movement",
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
    ],
    explanation:
      "Matter can exist as solid, liquid, or gas 🧊💧💨. Temperature changes can change the state!",
    examples: [
      "Ice (solid) → Water (liquid) when heated",
      "Water (liquid) → Steam (gas) when boiled at 100°C",
      "Steam (gas) → Water (liquid) when cooled = condensation",
    ],
    tips: [
      "Temperature changes state!",
      "Solid = particles tightly packed, Gas = particles spread out freely",
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
    ],
    explanation:
      "The Sun is at the center of our solar system, and all planets orbit around it ☀️🪐",
    examples: [
      "Order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune",
      "Earth orbits the Sun in 365 days",
      "Day and night: Earth rotates on its axis → Sun lights one side at a time 🌞🌜",
    ],
    tips: [
      "Remember the order: My Very Educated Mother Just Served Us Noodles!",
      "The Sun is a star, not a planet",
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
    ],
    explanation:
      "Water evaporates 🌡️ → condenses into clouds ☁️ → precipitates as rain 🌧️ → collects in rivers/seas 🌊 — and repeats!",
    examples: [
      "Sun heats water → evaporation",
      "Water vapour rises and cools → condensation into clouds",
      "Clouds get heavy → precipitation (rain, snow, hail)",
    ],
    tips: [
      "Remember: Evaporation → Condensation → Precipitation → Collection 🔄",
      "The water cycle never stops — it's continuous!",
    ],
    videoUrl: "https://www.youtube.com/watch?v=al-do-HGuIk",
    gameSuggestion: {
      name: "Water Cycle Quest",
      link: "https://www.bbc.co.uk/bitesize/guides/ztssv4j/revision/1",
      xp: 10,
    },
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
    ],
    explanation:
      "Gravity is the force that pulls objects toward each other 🌍. It keeps us on the ground and keeps planets in orbit!",
    examples: [
      "Drop a ball — gravity pulls it down",
      "Moon orbits Earth because Earth's gravity pulls it",
      "Planets orbit the Sun because of the Sun's massive gravity",
    ],
    tips: [
      "Isaac Newton discovered the laws of gravity! 🧑‍🔬",
      "Weight = mass × gravity (W = mg)",
    ],
    videoUrl: "https://www.youtube.com/watch?v=MTY1Kje0yLg",
    tutorResponses: [
      {
        question: "What is gravity?",
        answer:
          "Gravity is the force that pulls objects toward each other 🌍. It keeps us on the ground! Drop a ball and see it fall! ⚡",
      },
    ],
  },

  {
    id: "chemical-reactions",
    subject: "science",
    concept: "Chemical Reactions",
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
    ],
    explanation:
      "A chemical reaction happens when substances combine to make something new 🔥. Look for changes like color, temperature, or gas!",
    examples: [
      "Baking soda + vinegar → fizzing reaction 🎉",
      "Iron + oxygen → rust",
      "Burning wood → ash + smoke + heat",
    ],
    tips: [
      "Mixture = physically combined (can separate) 🥗",
      "Compound = chemically bonded (cannot easily separate) ⚗️",
      "Look for bubbles, color change, or heat as signs of a reaction",
    ],
    videoUrl: "https://www.youtube.com/watch?v=F7T8y0o8HRw",
    gameSuggestion: {
      name: "Reaction Builder",
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
    ],
    explanation:
      "Nouns name a person, place, thing, or idea 🧍🏠📚. Verbs show actions or states of being ⚡!",
    examples: [
      "Nouns: cat, school, happiness, London",
      "Verbs: run, jump, is, are, think, feel",
      "The DOG RUNS → dog = noun, runs = verb",
    ],
    tips: [
      'Ask "Who or what?" to spot nouns',
      'Ask "What is happening?" to spot verbs',
    ],
    gameSuggestion: {
      name: "Parts of Speech Adventure",
      link: "https://www.bbc.co.uk/bitesize/topics/zwwp8mn",
      xp: 10,
    },
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
    ],
    explanation:
      "A simple sentence has one subject (who) and one predicate (what they do) 📝. Compound sentences join two simple sentences with a conjunction!",
    examples: [
      "Simple: The dog runs.",
      "Compound: I like pizza, and I like ice cream. 🍕🍦",
      "Subject: who/what is doing the action; Predicate: the action",
    ],
    tips: [
      "Conjunctions join sentences: and, but, or, because",
      "Every sentence needs a subject and a verb!",
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
    concept: "Synonyms and Antonyms",
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
    ],
    explanation:
      "Synonyms are words with similar meanings ✨. Antonyms are words with opposite meanings. Homophones sound the same but mean different things!",
    examples: [
      "Synonyms: happy → joyful, glad",
      "Antonyms: hot ↔ cold, fast ↔ slow",
      "Homophones: two, too, to (all sound like 'too')",
    ],
    tips: [
      "Learning synonyms improves your writing!",
      "Use antonyms to make sentences more expressive 💡",
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
    ],
    explanation:
      "Figures of speech make writing more vivid and interesting! They paint pictures with words 🌟",
    examples: [
      "Simile: Her smile is like sunshine (uses 'like' or 'as')",
      "Metaphor: Time is a thief (direct comparison, no 'like')",
      "Personification: The wind whispered through the trees 🐦",
      "Hyperbole: I am so hungry I could eat a horse! ⚡",
    ],
    tips: [
      "Simile = uses 'like' or 'as'; Metaphor = direct comparison",
      "Personification gives human qualities to non-human things",
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
    ],
    explanation:
      "Reading comprehension means understanding what you read 📖. Look for the main idea, supporting details, and hidden meanings!",
    examples: [
      "Main idea: what the text is mostly about (often in the first/last sentence)",
      "Inference: using clues to understand what isn't stated directly",
      "A story about a brave girl saving her village → main idea: courage",
    ],
    tips: [
      "Look for repeated themes or key points to find the main idea",
      "If a character shivers outside → infer it is cold 🔍",
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
    ],
    explanation:
      "Verb tenses tell us WHEN an action happens — past, present, or future 🕰️",
    examples: [
      "Present simple: I walk to school every day (habits/facts)",
      "Past simple: She visited the museum yesterday (completed action)",
      "Future simple: I will study tonight (things that will happen)",
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
    ],
    explanation:
      "A paragraph has a topic sentence, supporting sentences, and a concluding sentence 🖊️. Essays follow introduction → body → conclusion!",
    examples: [
      "Topic sentence: Dogs are great pets.",
      "Supporting: They are loyal, playful, and friendly.",
      "Conclusion: Dogs make wonderful companions.",
    ],
    tips: [
      "Always plan before writing!",
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
    ],
    explanation:
      "There are 7 continents on Earth: Asia, Africa, North America, South America, Antarctica, Europe, Australia 🌎",
    examples: [
      "Longest river: Nile River 🌊 (or Amazon, depending on measurement)",
      "Tallest mountain: Mount Everest at 8,848 meters 🏔️",
      "Largest continent: Asia; Smallest: Australia/Oceania",
      "Largest population country: China 🇨🇳",
    ],
    tips: [
      "Asia is the largest, Australia is the smallest continent 🏔️",
      "There are 5 oceans: Pacific, Atlantic, Indian, Southern, Arctic",
    ],
    videoUrl: "https://www.youtube.com/watch?v=GqlmDAj1vT4",
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
    ],
    explanation:
      "Ancient civilizations built the foundations of modern society through writing, mathematics, and architecture! 🏺",
    examples: [
      "Ancient Egypt: Pharaohs, pyramids, hieroglyphics, Nile River",
      "Mesopotamia: First writing system (cuneiform), between Tigris & Euphrates",
      "George Washington: First President of the United States 🇺🇸",
      "India's independence: 15 August 1947 🇮🇳",
    ],
    tips: [
      "Ancient civilizations contributed writing, math, and architecture",
      "The Great Wall of China is over 21,000 km long 🏯",
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
    ],
    explanation:
      "These amazing people changed the world with their discoveries! 🧠",
    examples: [
      "Albert Einstein: developed the theory of relativity 🧠",
      "Isaac Newton: discovered laws of gravity and motion 🍎",
      "Marie Curie: discovered radioactivity ⚛️",
      "Alexander Graham Bell: invented the telephone ☎️",
      "Thomas Edison: invented the practical light bulb 💡 in 1879",
      "Valentina Tereshkova: first woman in space 👩‍🚀",
    ],
    tips: [
      "Marie Curie was the first woman to win a Nobel Prize!",
      "Newton's apple story explains how he thought about gravity",
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
    ],
    explanation: "Here are some amazing facts about our world! 🌍",
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
    ],
    explanation:
      "Emotions are feelings like happiness 😊, sadness 😢, anger 😡, fear 😨, and surprise 😲. Naming your emotion helps you understand and manage it!",
    examples: [
      "If you feel anxious: take deep breaths 🫁, talk to someone you trust, write your feelings down 📝",
      "If you feel angry: count to 10, walk away, then talk about it calmly",
      "Feeling emotions is normal — it's healthy to experience both positive and negative emotions",
    ],
    tips: [
      "Naming your emotion helps you respond calmly",
      "Talking to someone you trust always helps 🤝",
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
    ],
    explanation:
      "Mindfulness means paying attention to the present moment without judgment 🧘. Combined with good study habits, you can ace anything!",
    examples: [
      "Deep breathing: breathe in 4 seconds, hold 2, exhale 6. Repeat 5 times 🌬️",
      "Pomodoro technique: 25-50 min focused study → 5-10 min break ⏱️",
      "Goal setting: 'I will complete 5 math questions in 20 minutes' 🎯",
    ],
    tips: [
      "Avoid multitasking — focus on one task at a time!",
      "Adequate sleep (8-10 hours for teens) helps memory, mood, and energy 🛌",
      "Exercise releases endorphins 💪 which improve mood and reduce stress",
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
    ],
    explanation:
      "A growth mindset means believing your skills can improve with practice 🌱. You can always get better!",
    examples: [
      "Instead of 'I can't do this' say 'I can't do this YET'",
      "Positive self-talk: 'I can try my best' instead of 'I'm not good at this'",
      "Celebrate small achievements to stay motivated 🎉",
    ],
    tips: [
      "Mistakes are proof you're trying!",
      "Celebrate small wins to stay motivated 🌟",
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
