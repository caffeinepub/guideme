import { Page, T } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrackGameClick, useTrackPageVisit } from "@/hooks/useTracking";
import {
  Calculator,
  ChevronDown,
  ExternalLink,
  Gamepad2,
  Lightbulb,
  Palette,
  PenLine,
  Puzzle,
  Trophy,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { completeQuest, getTodayDateString } from "../utils/progressStore";

// TODO: Update this daily — swap out the featured game for a fresh challenge!
const DAILY_BRAIN_TEST = {
  title: "Logic Games",
  description:
    "Test your brain with strategy puzzles — Tower of Hanoi, chess challenges, and spatial reasoning. Can you beat them all?",
  url: "https://www.coolmathgames.com/0-logic-games",
  emoji: "🧠",
};

type Category = "all" | "math" | "word" | "puzzle" | "trivia" | "creative";

interface Game {
  id: string;
  title: string;
  description: string;
  category: Exclude<Category, "all">;
  ageRange: string;
  url: string;
  emoji: string;
}

const games: Game[] = [
  // Math
  {
    id: "1",
    title: "Number Munchers",
    description:
      "Munch your way through numbers, multiples, and factors in this classic arcade-style maths game.",
    category: "math",
    ageRange: "Ages 8–12",
    url: "https://www.mathplayground.com/number_munchers.html",
    emoji: "🔢",
  },
  {
    id: "2",
    title: "Math Lines",
    description:
      "Shoot number balls to make pairs that add up to 10. Fast-paced addition practice that's genuinely fun.",
    category: "math",
    ageRange: "Ages 8–11",
    url: "https://www.mathplayground.com/math_lines.html",
    emoji: "➕",
  },
  {
    id: "3",
    title: "Prodigy Math",
    description:
      "An epic RPG adventure game where every battle is won by answering maths questions. Covers the full curriculum.",
    category: "math",
    ageRange: "Ages 8–14",
    url: "https://www.prodigygame.com",
    emoji: "⚔️",
  },
  {
    id: "4",
    title: "Cool Math Games",
    description:
      "Hundreds of brain-training maths games including strategy, logic, number puzzles, and more.",
    category: "math",
    ageRange: "Ages 8–16",
    url: "https://www.coolmathgames.com",
    emoji: "🧮",
  },
  {
    id: "5",
    title: "Math Man",
    description:
      "A Pac-Man style maths game where you chomp ghosts by solving equations. Great for mental arithmetic.",
    category: "math",
    ageRange: "Ages 8–12",
    url: "https://www.mathplayground.com/mathman.html",
    emoji: "👾",
  },
  {
    id: "20",
    title: "Math Playground",
    description:
      "Dozens of free maths games and logic puzzles for kids — fractions, multiplication, geometry, and more.",
    category: "math",
    ageRange: "Ages 8–14",
    url: "https://www.mathplayground.com",
    emoji: "🎲",
  },
  {
    id: "21",
    title: "Arcademics – Multiplication",
    description:
      "Race against other players in real-time multiplication and division challenges. Competitive and addictive.",
    category: "math",
    ageRange: "Ages 8–13",
    url: "https://www.arcademics.com/games/grand-prix",
    emoji: "🏎️",
  },
  {
    id: "22",
    title: "Fraction Games",
    description:
      "Visual and interactive games to master fractions — comparing, adding, and simplifying made simple and fun.",
    category: "math",
    ageRange: "Ages 9–13",
    url: "https://www.mathplayground.com/Fraction_models.html",
    emoji: "🍕",
  },
  {
    id: "23",
    title: "Hooda Math",
    description:
      "Free maths games covering algebra, geometry, and logic puzzles. Simple to play, tricky to master.",
    category: "math",
    ageRange: "Ages 8–16",
    url: "https://www.hoodamath.com",
    emoji: "📐",
  },
  {
    id: "24",
    title: "IXL Maths Practice",
    description:
      "Curriculum-based maths practice with instant feedback. Covers every year group from primary to secondary.",
    category: "math",
    ageRange: "Ages 8–16",
    url: "https://www.ixl.com/math",
    emoji: "✏️",
  },
  // Word
  {
    id: "6",
    title: "Word Scramble",
    description:
      "Unscramble jumbled letters to form correct words. Builds spelling skills while keeping you on your toes.",
    category: "word",
    ageRange: "Ages 8–13",
    url: "https://www.abcya.com/games/word_scramble",
    emoji: "🔤",
  },
  {
    id: "7",
    title: "Spelling City",
    description:
      "Play spelling and vocabulary games built around real school word lists. Great for exam prep.",
    category: "word",
    ageRange: "Ages 8–16",
    url: "https://www.spellingcity.com",
    emoji: "🐝",
  },
  {
    id: "8",
    title: "Vocabulary.com",
    description:
      "Adaptive vocabulary quizzes that get harder as you improve. Build a strong word bank for essays and exams.",
    category: "word",
    ageRange: "Ages 10–16",
    url: "https://www.vocabulary.com/play",
    emoji: "📖",
  },
  {
    id: "9",
    title: "Word Search",
    description:
      "Find hidden words in a grid of letters. Hundreds of themed puzzles covering science, history, animals, and more.",
    category: "word",
    ageRange: "Ages 8–14",
    url: "https://www.abcya.com/games/word_search",
    emoji: "🔍",
  },
  {
    id: "25",
    title: "Wordle (NYT)",
    description:
      "Guess the 5-letter word in 6 tries. The viral word game that the whole world plays every day — great for vocabulary.",
    category: "word",
    ageRange: "Ages 10–16",
    url: "https://www.nytimes.com/games/wordle/index.html",
    emoji: "🟩",
  },
  {
    id: "26",
    title: "Crossword Puzzles for Kids",
    description:
      "Fun themed crosswords designed for kids. Boosts vocabulary, spelling, and general knowledge at the same time.",
    category: "word",
    ageRange: "Ages 8–14",
    url: "https://www.abcya.com/games/crossword",
    emoji: "📰",
  },
  {
    id: "27",
    title: "Boggle Online",
    description:
      "Find as many words as possible in a grid of letters before time runs out. Classic, fast, and addictive.",
    category: "word",
    ageRange: "Ages 9–16",
    url: "https://www.wordgames.com/boggle.html",
    emoji: "🔡",
  },
  {
    id: "28",
    title: "Typing Club",
    description:
      "Learn to type properly with fun exercises and lessons. A vital skill that gets faster the more you practise.",
    category: "word",
    ageRange: "Ages 8–16",
    url: "https://www.typingclub.com",
    emoji: "⌨️",
  },
  // Puzzle
  {
    id: "10",
    title: "Rush Hour Traffic",
    description:
      "Slide cars and trucks to free the red car from the traffic jam. A brilliant logic puzzle for sharp thinkers.",
    category: "puzzle",
    ageRange: "Ages 8–16",
    url: "https://www.mathplayground.com/traffic_mania.html",
    emoji: "🚗",
  },
  {
    id: "11",
    title: "Sudoku for Kids",
    description:
      "Kid-friendly Sudoku puzzles with adjustable difficulty. Builds number logic and pattern recognition.",
    category: "puzzle",
    ageRange: "Ages 9–16",
    url: "https://www.kidssudoku.com",
    emoji: "🔲",
  },
  {
    id: "12",
    title: "Jigsaw Planet",
    description:
      "Thousands of free online jigsaw puzzles from nature to art to famous landmarks. Relaxing and satisfying.",
    category: "puzzle",
    ageRange: "Ages 8–16",
    url: "https://www.jigsawplanet.com",
    emoji: "🧩",
  },
  {
    id: "13",
    title: "Logic Games",
    description:
      "A curated collection of the best logic and strategy games — Tower of Hanoi, chess puzzles, and spatial challenges.",
    category: "puzzle",
    ageRange: "Ages 10–16",
    url: "https://www.coolmathgames.com/0-logic-games",
    emoji: "🧠",
  },
  {
    id: "29",
    title: "Lightbot",
    description:
      "Program a robot to light up tiles by giving it instructions. A brilliant intro to coding logic through puzzles.",
    category: "puzzle",
    ageRange: "Ages 8–14",
    url: "https://lightbot.com/flash.html",
    emoji: "🤖",
  },
  {
    id: "30",
    title: "2048",
    description:
      "Slide numbered tiles on a 4x4 grid to combine them and reach 2048. Simple rules, deep strategy.",
    category: "puzzle",
    ageRange: "Ages 10–16",
    url: "https://play2048.co",
    emoji: "🔢",
  },
  {
    id: "31",
    title: "Bloxorz",
    description:
      "Roll a rectangular block across a suspended grid without falling off. Spatial thinking at its finest.",
    category: "puzzle",
    ageRange: "Ages 10–16",
    url: "https://www.coolmathgames.com/0-bloxorz",
    emoji: "📦",
  },
  {
    id: "32",
    title: "Chess Kids",
    description:
      "Learn chess from scratch and play against beginners or the computer. Builds strategy, patience, and foresight.",
    category: "puzzle",
    ageRange: "Ages 8–16",
    url: "https://www.chesskid.com",
    emoji: "♟️",
  },
  // Trivia
  {
    id: "14",
    title: "FunTrivia Kids",
    description:
      "Thousands of kid-friendly trivia quizzes covering animals, history, science, sports, and pop culture.",
    category: "trivia",
    ageRange: "Ages 8–14",
    url: "https://www.funtrivia.com/trivia-for-kids.html",
    emoji: "❓",
  },
  {
    id: "15",
    title: "Kahoot!",
    description:
      "Play live quiz challenges or practise solo with millions of quizzes on every school subject imaginable.",
    category: "trivia",
    ageRange: "Ages 8–16",
    url: "https://kahoot.com/schools-u/",
    emoji: "🎯",
  },
  {
    id: "16",
    title: "National Geographic Kids Quiz",
    description:
      "Test your knowledge of wildlife, geography, science, and world wonders with Nat Geo's expertly crafted quizzes.",
    category: "trivia",
    ageRange: "Ages 8–14",
    url: "https://kids.nationalgeographic.com/games/quizzes",
    emoji: "🌍",
  },
  {
    id: "33",
    title: "Sporcle Kids",
    description:
      "Thousands of timed trivia quizzes across every topic imaginable — geography, science, history, movies, and more.",
    category: "trivia",
    ageRange: "Ages 10–16",
    url: "https://www.sporcle.com/games/tags/kids",
    emoji: "⏱️",
  },
  {
    id: "34",
    title: "BBC Bitesize Quiz",
    description:
      "Curriculum-aligned quiz questions from BBC Bitesize. Test what you know across all school subjects.",
    category: "trivia",
    ageRange: "Ages 8–16",
    url: "https://www.bbc.co.uk/bitesize/quiz",
    emoji: "📺",
  },
  {
    id: "35",
    title: "Seterra Geography",
    description:
      "Learn world geography through interactive map quizzes — countries, capitals, flags, and landmarks.",
    category: "trivia",
    ageRange: "Ages 9–16",
    url: "https://www.seterra.com",
    emoji: "🗺️",
  },
  {
    id: "36",
    title: "Quizlet Live",
    description:
      "Study flashcard sets or play Quizlet Live with classmates. Perfect for learning vocabulary and facts fast.",
    category: "trivia",
    ageRange: "Ages 10–16",
    url: "https://quizlet.com/features/learn",
    emoji: "🃏",
  },
  // Creative
  {
    id: "17",
    title: "Scratch",
    description:
      "Create your own games, animations, and stories with drag-and-drop coding. The world's largest kids coding community.",
    category: "creative",
    ageRange: "Ages 8–16",
    url: "https://scratch.mit.edu",
    emoji: "🐱",
  },
  {
    id: "18",
    title: "Tynker",
    description:
      "Learn to code through fun puzzles and game-building projects. Progress from blocks to real Python and JavaScript.",
    category: "creative",
    ageRange: "Ages 8–16",
    url: "https://www.tynker.com",
    emoji: "💻",
  },
  {
    id: "19",
    title: "Google AutoDraw",
    description:
      "Draw anything and watch Google's machine learning guess what you're creating. A fun and magical drawing tool.",
    category: "creative",
    ageRange: "Ages 8–16",
    url: "https://www.autodraw.com",
    emoji: "🎨",
  },
  {
    id: "37",
    title: "Make a Flappy Bird",
    description:
      "Use Snap! or MIT App Inventor to build your own Flappy Bird clone from scratch. Real coding, real results.",
    category: "creative",
    ageRange: "Ages 10–16",
    url: "https://snap.berkeley.edu",
    emoji: "🐦",
  },
  {
    id: "38",
    title: "Pixel Art Maker",
    description:
      "Design pixel art characters, logos, and scenes in your browser. Download your creations when done.",
    category: "creative",
    ageRange: "Ages 8–16",
    url: "https://www.pixilart.com/draw",
    emoji: "🟦",
  },
  {
    id: "39",
    title: "Code.org Games",
    description:
      "Learn coding fundamentals through fun game-building activities featuring Minecraft, Star Wars, and Frozen themes.",
    category: "creative",
    ageRange: "Ages 8–16",
    url: "https://code.org/student/middle-high",
    emoji: "🌐",
  },
  {
    id: "40",
    title: "GarageBand Online (Soundtrap)",
    description:
      "Make music online with virtual instruments, loops, and effects. No musical experience needed — just experiment.",
    category: "creative",
    ageRange: "Ages 10–16",
    url: "https://www.soundtrap.com/edu",
    emoji: "🎵",
  },
];

type TabConfig = {
  value: Category;
  label: string;
  icon: React.ElementType;
  badgeColor: string;
  badgeBg: string;
  tabActive: string;
  iconColor: string;
};

const tabConfig: TabConfig[] = [
  {
    value: "all",
    label: "All Games",
    icon: Gamepad2,
    badgeColor: "text-foreground",
    badgeBg: "bg-secondary",
    tabActive: "bg-primary text-primary-foreground shadow-neon-cyan",
    iconColor: "text-foreground",
  },
  {
    value: "math",
    label: "Math",
    icon: Calculator,
    badgeColor: "text-[oklch(0.75_0.2_255)]",
    badgeBg: "bg-[oklch(0.75_0.2_255/0.12)]",
    tabActive:
      "bg-[oklch(0.75_0.2_255/0.2)] text-[oklch(0.75_0.2_255)] border-[oklch(0.75_0.2_255/0.5)]",
    iconColor: "text-[oklch(0.75_0.2_255)]",
  },
  {
    value: "word",
    label: "Word",
    icon: PenLine,
    badgeColor: "text-accent",
    badgeBg: "bg-accent/10",
    tabActive: "bg-accent/20 text-accent border-accent/50",
    iconColor: "text-accent",
  },
  {
    value: "puzzle",
    label: "Puzzle",
    icon: Puzzle,
    badgeColor: "text-[oklch(0.72_0.2_310)]",
    badgeBg: "bg-[oklch(0.72_0.2_310/0.12)]",
    tabActive:
      "bg-[oklch(0.72_0.2_310/0.2)] text-[oklch(0.72_0.2_310)] border-[oklch(0.72_0.2_310/0.5)]",
    iconColor: "text-[oklch(0.72_0.2_310)]",
  },
  {
    value: "trivia",
    label: "Trivia",
    icon: Trophy,
    badgeColor: "text-[oklch(0.78_0.18_60)]",
    badgeBg: "bg-[oklch(0.78_0.18_60/0.12)]",
    tabActive:
      "bg-[oklch(0.78_0.18_60/0.2)] text-[oklch(0.78_0.18_60)] border-[oklch(0.78_0.18_60/0.5)]",
    iconColor: "text-[oklch(0.78_0.18_60)]",
  },
  {
    value: "creative",
    label: "Creative",
    icon: Palette,
    badgeColor: "text-[oklch(0.72_0.2_340)]",
    badgeBg: "bg-[oklch(0.72_0.2_340/0.12)]",
    tabActive:
      "bg-[oklch(0.72_0.2_340/0.2)] text-[oklch(0.72_0.2_340)] border-[oklch(0.72_0.2_340/0.5)]",
    iconColor: "text-[oklch(0.72_0.2_340)]",
  },
];

function getCategoryConfig(category: Exclude<Category, "all">) {
  return tabConfig.find((t) => t.value === category)!;
}

function mapCategoryToT(category: Exclude<Category, "all">): T {
  switch (category) {
    case "math":
      return T.arcade;
    case "word":
      return T.arcade;
    case "puzzle":
      return T.puzzles;
    case "trivia":
      return T.strategy;
    case "creative":
      return T.strategy;
  }
}

function CategoryBadge({ category }: { category: Exclude<Category, "all"> }) {
  const config = getCategoryConfig(category);
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-mono font-semibold ${config.badgeBg} ${config.badgeColor}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

function GameCard({
  game,
  onPlay,
}: {
  game: Game;
  onPlay: (gameId: string, title: string, category: T) => void;
}) {
  function handlePlayClick() {
    onPlay(game.id, game.title, mapCategoryToT(game.category));
    // Auto-complete the daily play game quest
    const isNew = completeQuest("daily_play_game", false);
    if (isNew) {
      toast("🎮 Quest progress! Head to Quests to claim your reward!", {
        icon: "⚔️",
        duration: 4000,
      });
    }
  }

  return (
    <motion.div variants={cardVariants} layout>
      <Card className="h-full border border-border bg-card shadow-card hover:shadow-card-hover hover:border-primary/30 hover:shadow-neon-cyan/20 transition-all duration-200 hover:-translate-y-1 flex flex-col group">
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-start gap-3">
            <div className="text-2xl leading-none mt-0.5 flex-shrink-0">
              {game.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="font-display font-semibold text-sm text-foreground leading-snug mb-1.5">
                {game.title}
              </CardTitle>
              <div className="flex flex-wrap gap-1.5">
                <CategoryBadge category={game.category} />
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 h-5 text-muted-foreground border-border font-mono"
                >
                  {game.ageRange}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 pb-4">
          <p className="text-muted-foreground text-xs leading-relaxed flex-1">
            {game.description}
          </p>
          <a
            href={game.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto"
            onClick={handlePlayClick}
          >
            <Button
              size="sm"
              className="w-full rounded-md font-mono font-bold text-xs gap-2 bg-primary text-primary-foreground hover:shadow-neon-cyan hover:bg-primary/90 transition-all duration-150"
            >
              <ExternalLink className="w-3 h-3" />
              Play Now →
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [brainFactRevealed, setBrainFactRevealed] = useState(false);
  useTrackPageVisit(Page.games);
  const trackGameClick = useTrackGameClick();

  // Mark games quest activity as visited today
  useEffect(() => {
    const today = getTodayDateString();
    localStorage.setItem(`guideme_quest_visited_games_${today}`, "1");
  }, []);

  const filtered =
    activeCategory === "all"
      ? games
      : games.filter((g) => g.category === activeCategory);

  return (
    <div>
      {/* PHASE 2 — Daily Brain Test Banner */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card border-b border-border border-l-4 border-l-primary px-4 py-0"
      >
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="text-3xl flex-shrink-0">
                {DAILY_BRAIN_TEST.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                    🔬 Today's Brain Test
                  </span>
                </div>
                <h2 className="font-display font-bold text-base text-foreground leading-tight">
                  {DAILY_BRAIN_TEST.title}
                </h2>
                <p className="text-muted-foreground text-xs mt-0.5 font-mono">
                  Can you solve this in under 2 minutes?
                </p>
              </div>
            </div>
            <a
              href={DAILY_BRAIN_TEST.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button
                size="sm"
                className="rounded-md font-mono font-bold text-xs gap-1.5 bg-primary text-primary-foreground hover:shadow-neon-cyan hover:bg-primary/90 transition-all px-5"
              >
                <Zap className="w-3 h-3" />
                Try It Now →
              </Button>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Hero banner */}
      <section className="relative overflow-hidden grid-bg pt-10 pb-12 px-4">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.78 0.2 195)" }}
        />
        <div className="container max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-5 uppercase tracking-widest">
              <Gamepad2 className="w-3 h-3" />
              <span>{games.length} games loaded</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight mb-3">
              Pick your vibe 🎮
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Math, words, puzzles, trivia, creative coding — your bestie's
              gaming catalogue has it all.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-7"
            role="tablist"
            aria-label="Filter by game category"
          >
            {tabConfig.map((tab) => {
              const isSelected = activeCategory === tab.value;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(tab.value)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono font-semibold border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isSelected
                      ? `${tab.tabActive}`
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-secondary/60"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${isSelected ? "" : tab.iconColor}`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>

          {/* Results count */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground font-mono mb-5"
          >
            Showing{" "}
            <strong className="text-foreground">{filtered.length}</strong> game
            {filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "all"
              ? ` in ${tabConfig.find((t) => t.value === activeCategory)?.label}`
              : ""}
          </motion.p>

          {/* Games grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {filtered.map((game) => (
                <GameCard key={game.id} game={game} onPlay={trackGameClick} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-base font-display font-semibold">
                No games found
              </p>
              <p className="text-xs mt-1 font-mono">
                Try a different category.
              </p>
            </div>
          )}

          {/* PHASE 3 — Rank Titles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14"
          >
            <div className="mb-6">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-1">
                🏅 Your Brain Ranks
              </h2>
              <p className="text-muted-foreground text-xs font-mono">
                Play games and earn your rank — honor-based, you know what
                you've achieved.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Rank 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <Card className="border border-[oklch(0.78_0.18_60/0.4)] bg-card rounded-lg shadow-card text-center hover:border-[oklch(0.78_0.18_60/0.7)] hover:shadow-[0_0_16px_oklch(0.78_0.18_60/0.2)] transition-all duration-200">
                  <CardContent className="p-5">
                    <div className="text-4xl mb-2">🧩</div>
                    <h3 className="font-display font-bold text-base text-foreground mb-1">
                      Puzzle Apprentice
                    </h3>
                    <p className="text-muted-foreground text-xs mb-3">
                      Complete 3 games to earn this rank
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[oklch(0.78_0.18_60/0.12)] text-[oklch(0.78_0.18_60)] text-xs font-mono font-bold">
                      🎮 3 games
                    </span>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rank 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.12 }}
              >
                <Card className="border border-primary/30 bg-card rounded-lg shadow-card text-center hover:border-primary/60 hover:shadow-neon-cyan transition-all duration-200">
                  <CardContent className="p-5">
                    <div className="text-4xl mb-2">🧠</div>
                    <h3 className="font-display font-bold text-base text-foreground mb-1">
                      Logic Explorer
                    </h3>
                    <p className="text-muted-foreground text-xs mb-3">
                      Complete 5 games to earn this rank
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-primary/10 text-primary text-xs font-mono font-bold">
                      🎮 5 games
                    </span>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rank 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.19 }}
              >
                <Card className="border border-accent/30 bg-card rounded-lg shadow-card text-center relative overflow-hidden hover:border-accent/60 hover:shadow-neon-green transition-all duration-200">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, oklch(0.82 0.22 145), transparent 70%)",
                    }}
                  />
                  <CardContent className="p-5 relative">
                    <div className="text-4xl mb-2">👑</div>
                    <h3 className="font-display font-bold text-base text-foreground mb-1">
                      Mastermind
                    </h3>
                    <p className="text-muted-foreground text-xs mb-3">
                      Complete 10 games to reach the top!
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-accent/10 text-accent text-xs font-mono font-bold">
                      🎮 10 games
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PHASE 4 — Hidden Brain Fact */}
      <section className="py-8 px-4 bg-secondary/20">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <button
              type="button"
              onClick={() => setBrainFactRevealed((prev) => !prev)}
              className="w-full flex items-center justify-between gap-4 bg-card border border-accent/25 hover:border-accent/50 rounded-lg px-5 py-4 text-left transition-all duration-200 shadow-card hover:shadow-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              aria-expanded={brainFactRevealed}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl transition-all duration-300">
                  {brainFactRevealed ? "🔓" : "🔒"}
                </span>
                <div>
                  <p className="font-mono font-bold text-foreground text-sm">
                    Hidden Brain Fact
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5 font-mono">
                    {brainFactRevealed
                      ? "Fact revealed! 🎉"
                      : "Click to reveal something wild..."}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: brainFactRevealed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4 text-accent group-hover:text-accent transition-colors" />
              </motion.div>
            </button>

            <AnimatePresence>
              {brainFactRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 bg-card border border-accent/20 rounded-lg px-5 py-4 shadow-card">
                    <p className="text-foreground text-sm leading-relaxed font-medium">
                      Your brain generates about{" "}
                      <span className="text-accent font-bold font-mono">
                        70,000 thoughts
                      </span>{" "}
                      per day — that's one thought every 1.2 seconds! 🧠
                    </p>
                    <p className="text-muted-foreground text-xs mt-2 font-mono">
                      By the time you've read this, your brain has already had
                      several new thoughts. Pretty wild, right?
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
