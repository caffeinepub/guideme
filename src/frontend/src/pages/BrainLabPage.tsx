import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Gamepad2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { completeQuest, getTodayDateString } from "../utils/progressStore";

interface LabSection {
  emoji: string;
  title: string;
  description: string;
  cta?: { label: string; to?: string; href?: string };
  comingSoon?: boolean;
  iconColor: string;
  borderColor: string;
  hoverBorder: string;
  hoverGlow: string;
}

const labSections: LabSection[] = [
  {
    emoji: "🧠",
    title: "Brain Lab",
    description:
      "Your personal brain training HQ! Sharpen your mind with puzzles, logic challenges, and skill-building activities. The more you train, the sharper you get.",
    iconColor: "text-primary",
    borderColor: "border-primary/20",
    hoverBorder: "hover:border-primary/60",
    hoverGlow: "hover:shadow-neon-cyan",
    cta: { label: "Explore Games", to: "/games" },
  },
  {
    emoji: "🚀",
    title: "Daily Challenge",
    description:
      "A brand-new brain challenge every day — complete it and feel unstoppable! Daily challenges are short, fast, and designed to push your thinking further.",
    iconColor: "text-[oklch(0.78_0.18_60)]",
    borderColor: "border-[oklch(0.78_0.18_60/0.2)]",
    hoverBorder: "hover:border-[oklch(0.78_0.18_60/0.6)]",
    hoverGlow: "hover:shadow-[0_0_16px_oklch(0.78_0.18_60/0.25)]",
    cta: { label: "Today's Challenge", to: "/games" },
  },
  {
    emoji: "🏆",
    title: "Rank Up",
    description:
      "Play games, complete challenges, and climb the ranks. From Puzzle Apprentice to Mastermind — every game takes you one step closer to the top.",
    iconColor: "text-accent",
    borderColor: "border-accent/20",
    hoverBorder: "hover:border-accent/60",
    hoverGlow: "hover:shadow-neon-green",
    cta: { label: "Start Ranking", to: "/games" },
  },
  {
    emoji: "🔬",
    title: "Skill Builder",
    description:
      "Target specific skills — maths fluency, vocabulary, logic, or creativity. Each skill track has curated games and resources to help you level up step by step.",
    iconColor: "text-[oklch(0.72_0.2_310)]",
    borderColor: "border-[oklch(0.72_0.2_310/0.2)]",
    hoverBorder: "hover:border-[oklch(0.72_0.2_310/0.6)]",
    hoverGlow: "hover:shadow-[0_0_16px_oklch(0.72_0.2_310/0.25)]",
    cta: { label: "Browse Resources", to: "/resources" },
  },
  {
    emoji: "🤖",
    title: "Neural Assistant",
    description:
      "An AI-powered study buddy coming to GuideMe! It'll help with homework, answer questions, and guide your learning journey. Stay tuned — big things incoming!",
    iconColor: "text-muted-foreground",
    borderColor: "border-border",
    hoverBorder: "",
    hoverGlow: "",
    comingSoon: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function BrainLabPage() {
  useEffect(() => {
    // Mark brain lab quest activity as visited today
    const today = getTodayDateString();
    localStorage.setItem(`guideme_quest_visited_brainlab_${today}`, "1");

    // Legacy: auto-complete no longer needed here since QuestsPage now gates claim
    const isNew = completeQuest("daily_visit_brainlab", false);
    if (isNew) {
      toast("🧠 Brain Lab visited! Head to Quests to claim your reward.", {
        icon: "⚔️",
        duration: 4000,
      });
    }
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg pt-12 pb-14 px-4">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.78 0.2 195)" }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.82 0.22 145)" }}
        />
        <div className="container max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-5 uppercase tracking-widest">
              <Zap className="w-3 h-3" />
              <span>Brain training hub</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight mb-3">
              Welcome to Brain Lab ⚡
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Train your brain every day and unlock your full potential. Explore
              challenges, build skills, and rank up — the more you play, the
              sharper you get.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections grid */}
      <section className="py-10 px-4 bg-background">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {labSections.map((section) => (
              <motion.div key={section.title} variants={cardVariants}>
                <Card
                  className={`h-full border shadow-card transition-all duration-200 ${section.borderColor} ${
                    section.comingSoon
                      ? "opacity-60"
                      : `${section.hoverBorder} ${section.hoverGlow} hover:-translate-y-1`
                  }`}
                >
                  <CardContent className="p-5 flex flex-col gap-4">
                    {/* Icon + title row */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-secondary/60 border border-border flex items-center justify-center text-2xl flex-shrink-0">
                        {section.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="font-display font-bold text-lg text-foreground">
                            {section.title}
                          </h2>
                          {section.comingSoon && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0 rounded-sm font-mono border-border text-muted-foreground"
                            >
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-xs leading-relaxed flex-1">
                      {section.description}
                    </p>

                    {/* CTA */}
                    {section.cta &&
                      !section.comingSoon &&
                      (section.cta.to ? (
                        <Link to={section.cta.to as "/"}>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`gap-1.5 rounded-md font-mono font-bold text-xs border-border hover:border-primary/40 hover:bg-secondary/60 ${section.iconColor}`}
                          >
                            {section.cta.label}
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      ) : (
                        <a
                          href={section.cta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className={`gap-1.5 rounded-md font-mono font-bold text-xs border-border hover:border-primary/40 hover:bg-secondary/60 ${section.iconColor}`}
                          >
                            {section.cta.label}
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </a>
                      ))}
                    {section.comingSoon && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="gap-1.5 rounded-md font-mono font-bold text-xs cursor-not-allowed opacity-50"
                      >
                        🤖 Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA to games */}
      <section className="py-10 px-4 bg-secondary/20">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border-l-4 border-l-primary border border-border rounded-lg p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between"
          >
            <div>
              <div className="text-3xl mb-3">🏆</div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-2">
                Ready to start training?
              </h2>
              <p className="text-muted-foreground text-xs font-mono max-w-md">
                Jump into the games section and begin your brain-training
                journey. Every game you play sharpens your edge.
              </p>
            </div>
            <Link to="/games" className="flex-shrink-0">
              <Button
                size="lg"
                className="rounded-md font-mono font-bold text-xs px-6 gap-2 bg-primary text-primary-foreground shadow-neon-cyan hover:bg-primary/90 hover:shadow-[0_0_24px_oklch(0.78_0.2_195/0.7)] transition-all duration-200"
              >
                <Gamepad2 className="w-4 h-4" />
                Go to Games →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
