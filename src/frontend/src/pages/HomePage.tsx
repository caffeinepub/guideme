import { Page } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTrackPageVisit } from "@/hooks/useTracking";
import { Link } from "@tanstack/react-router";
import {
  BookOpenText,
  Calculator,
  ExternalLink,
  FlaskConical,
  Gamepad2,
  Globe,
  Heart,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const subjectCards = [
  {
    icon: Calculator,
    label: "Mathematics",
    description: "Algebra, geometry, calculus & more",
    iconColor: "text-[oklch(0.75_0.2_255)]",
    borderHover: "hover:border-[oklch(0.75_0.2_255/0.6)]",
    glowColor: "hover:shadow-[0_0_16px_oklch(0.75_0.2_255/0.25)]",
    to: "/subject-helper" as const,
  },
  {
    icon: FlaskConical,
    label: "Science",
    description: "Physics, chemistry, biology & beyond",
    iconColor: "text-accent",
    borderHover: "hover:border-accent/60",
    glowColor: "hover:shadow-neon-green",
    to: "/subject-helper" as const,
  },
  {
    icon: BookOpenText,
    label: "English",
    description: "Grammar, writing, literature & comprehension",
    iconColor: "text-[oklch(0.78_0.18_60)]",
    borderHover: "hover:border-[oklch(0.78_0.18_60/0.6)]",
    glowColor: "hover:shadow-[0_0_16px_oklch(0.78_0.18_60/0.25)]",
    to: "/subject-helper" as const,
  },
  {
    icon: Globe,
    label: "General Knowledge",
    description: "History, geography, culture & current events",
    iconColor: "text-[oklch(0.72_0.2_310)]",
    borderHover: "hover:border-[oklch(0.72_0.2_310/0.6)]",
    glowColor: "hover:shadow-[0_0_16px_oklch(0.72_0.2_310/0.25)]",
    to: "/subject-helper" as const,
  },
  {
    icon: Heart,
    label: "Wellbeing",
    description: "Emotional support, mindfulness & resilience",
    iconColor: "text-[oklch(0.72_0.2_340)]",
    borderHover: "hover:border-[oklch(0.72_0.2_340/0.6)]",
    glowColor: "hover:shadow-[0_0_16px_oklch(0.72_0.2_340/0.25)]",
    to: "/subject-helper" as const,
  },
];

const featuredGames = [
  {
    emoji: "⚔️",
    title: "Prodigy Math",
    description:
      "Epic RPG where every battle is won by answering maths questions.",
    category: "Math",
    url: "https://www.prodigygame.com",
    categoryColor: "text-[oklch(0.75_0.2_255)]",
    categoryBg: "bg-[oklch(0.75_0.2_255/0.12)]",
  },
  {
    emoji: "🎯",
    title: "Kahoot!",
    description:
      "Play live quizzes on every school subject — solo or with friends.",
    category: "Trivia",
    url: "https://kahoot.com/schools-u/",
    categoryColor: "text-[oklch(0.78_0.18_60)]",
    categoryBg: "bg-[oklch(0.78_0.18_60/0.12)]",
  },
  {
    emoji: "🐱",
    title: "Scratch",
    description: "Create your own games, animations, and stories with coding.",
    category: "Creative",
    url: "https://scratch.mit.edu",
    categoryColor: "text-[oklch(0.72_0.2_340)]",
    categoryBg: "bg-[oklch(0.72_0.2_340/0.12)]",
  },
  {
    emoji: "🧠",
    title: "Logic Games",
    description:
      "Tower of Hanoi, chess puzzles, and spatial reasoning challenges.",
    category: "Puzzle",
    url: "https://www.coolmathgames.com/0-logic-games",
    categoryColor: "text-[oklch(0.72_0.2_310)]",
    categoryBg: "bg-[oklch(0.72_0.2_310/0.12)]",
  },
  {
    emoji: "🟩",
    title: "Wordle",
    description:
      "Guess the 5-letter word in 6 tries. The viral daily word game.",
    category: "Word",
    url: "https://www.nytimes.com/games/wordle/index.html",
    categoryColor: "text-accent",
    categoryBg: "bg-accent/10",
  },
  {
    emoji: "🌍",
    title: "Nat Geo Kids Quiz",
    description:
      "Test your knowledge of wildlife, geography, and world wonders.",
    category: "Trivia",
    url: "https://kids.nationalgeographic.com/games/quizzes",
    categoryColor: "text-[oklch(0.78_0.18_60)]",
    categoryBg: "bg-[oklch(0.78_0.18_60/0.12)]",
  },
];

const features = [
  {
    icon: Lightbulb,
    title: "Homework? Handled.",
    description:
      "Your bestie breaks it down step by step. No judgment, just answers.",
    iconColor: "text-primary",
    iconBg: "bg-primary/10 border border-primary/20",
  },
  {
    icon: Heart,
    title: "Stressed? Same. Let's talk.",
    description: "GuideMe gets it. Vent, reset, and get back to winning. 💪",
    iconColor: "text-[oklch(0.72_0.2_340)]",
    iconBg:
      "bg-[oklch(0.72_0.2_340/0.1)] border border-[oklch(0.72_0.2_340/0.2)]",
  },
  {
    icon: ShieldCheck,
    title: "Zero BS, always.",
    description:
      "Clean, safe, age-appropriate. Your parents will approve. (Probably.)",
    iconColor: "text-accent",
    iconBg: "bg-accent/10 border border-accent/20",
  },
  {
    icon: Gamepad2,
    title: "Brain gains, but make it fun.",
    description:
      "Math puzzles, word games, trivia battles. Learning disguised as fun. 🎮",
    iconColor: "text-[oklch(0.78_0.18_60)]",
    iconBg:
      "bg-[oklch(0.78_0.18_60/0.1)] border border-[oklch(0.78_0.18_60/0.2)]",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function HomePage() {
  useTrackPageVisit(Page.home);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg pt-20 pb-24 px-4">
        {/* Neon radial glow — top right */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-[80px] pointer-events-none"
          style={{ background: "oklch(0.78 0.2 195)" }}
        />
        {/* Secondary glow — bottom left */}
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10 blur-[60px] pointer-events-none"
          style={{ background: "oklch(0.82 0.22 145)" }}
        />

        <div className="container max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/40 text-primary text-xs font-mono font-bold mb-6 tracking-widest uppercase"
            >
              <Zap className="w-3 h-3 animate-pulse-neon" />
              <span>[ BESTIE MODE: ON ]</span>
            </motion.div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight mb-5 text-balance">
              Your Smartest Bestie{" "}
              <span className="neon-glow text-primary">Just Levelled Up</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Drop the boring textbooks. GuideMe's got you — from algebra to
              exam stress, your bestie handles it all. 🤝
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/games">
                <Button
                  size="lg"
                  className="rounded-md font-bold text-sm px-6 gap-2 bg-primary text-primary-foreground shadow-neon-cyan hover:shadow-[0_0_24px_oklch(0.78_0.2_195/0.8)] hover:bg-primary/90 transition-all duration-200"
                >
                  <Gamepad2 className="w-4 h-4" />
                  Start Playing →
                </Button>
              </Link>
              <Link to="/resources">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-md font-bold text-sm px-6 border-border bg-transparent hover:bg-secondary/60 hover:border-primary/40 transition-all duration-200"
                >
                  Explore Resources
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            {[
              { label: "subjects covered", value: "5+" },
              { label: "games to play", value: "40+" },
              { label: "resources curated", value: "50+" },
              { label: "always free", value: "100%" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="font-mono font-bold text-xl text-primary">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Subject cards */}
      <section className="py-16 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              What can your bestie help with?
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              From algebra to wellbeing — your bestie covers everything. 📚
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {subjectCards.map((subject) => (
              <motion.div key={subject.label} variants={itemVariants}>
                <Link to={subject.to} className="block group h-full">
                  <Card
                    className={`h-full border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-1 ${subject.borderHover} ${subject.glowColor} cursor-pointer`}
                  >
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="w-10 h-10 rounded-md bg-secondary/60 border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <subject.icon
                          className={`w-5 h-5 ${subject.iconColor}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                          {subject.label}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {subject.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex flex-col sm:flex-row sm:items-end gap-4 justify-between"
          >
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
                🎮 Games to play right now
              </h2>
              <p className="text-muted-foreground text-base max-w-xl">
                40+ games across maths, words, puzzles, trivia, and creative
                coding.
              </p>
            </div>
            <Link to="/games" className="flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="rounded-md font-mono font-bold text-xs px-4 gap-2 border-border hover:border-primary/40 hover:bg-secondary/60 transition-all"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                See all 40+ games →
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {featuredGames.map((game) => (
              <motion.div key={game.title} variants={itemVariants}>
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <Card className="h-full border border-border bg-card shadow-card hover:border-primary/40 hover:shadow-neon-cyan/20 hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                    <CardContent className="p-5 flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl leading-none mt-0.5 flex-shrink-0">
                          {game.emoji}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-foreground text-sm mb-1 leading-snug">
                            {game.title}
                          </h3>
                          <Badge
                            className={`text-[10px] px-1.5 py-0 h-5 font-mono font-semibold rounded-sm border-0 ${game.categoryBg} ${game.categoryColor}`}
                          >
                            {game.category}
                          </Badge>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {game.description}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Why GuideMe hits different ⚡
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              Not just a study tool — your actual ride-or-die for school stuff.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full border border-border bg-card shadow-card hover:shadow-card-hover hover:border-border/60 transition-all duration-200">
                  <CardContent className="p-5 flex flex-col gap-4">
                    <div
                      className={`w-10 h-10 rounded-md ${feature.iconBg} flex items-center justify-center`}
                    >
                      <feature.icon
                        className={`w-5 h-5 ${feature.iconColor}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground text-sm mb-2 leading-snug">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ask Your Bestie CTA */}
      <section className="py-16 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden bg-card border-l-4 border-l-primary border border-border rounded-lg p-8 sm:p-12"
          >
            {/* Subtle glow */}
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
              style={{ background: "oklch(0.78 0.2 195)" }}
            />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                    Ask Your Bestie 🤝
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Need help or just wanna chat about school stuff? Your bestie
                  is always here. No appointment needed.
                </p>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf8GlWYC7TlkAicB4BuNBNfxMnqdDzdZUvknI3y4ghw42AoYA/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <Button
                  size="lg"
                  className="rounded-md font-bold text-sm px-6 gap-2 bg-primary text-primary-foreground shadow-neon-cyan hover:shadow-[0_0_24px_oklch(0.78_0.2_195/0.7)] hover:bg-primary/90 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Send a Message →
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
