import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "@tanstack/react-router";
import { ExternalLink, Sword, Trophy, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useConfetti } from "../components/Confetti";
import {
  addXP,
  getTodayDateString,
  getWeekString,
  isQuestCompleted,
  loadProgress,
  recordActivity,
  completeQuest as storeCompleteQuest,
} from "../utils/progressStore";

// ─── Activity tracking helpers ────────────────────────────────────────────────

function hasVisitedToday(activityKey: string): boolean {
  const today = getTodayDateString();
  return (
    localStorage.getItem(`guideme_quest_visited_${activityKey}_${today}`) ===
    "1"
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuestDef {
  id: string;
  title: string;
  description: string;
  isWeekly: boolean;
  xpReward: number;
  externalUrl?: string;
  progressKey?: string;
  progressTarget?: number;
}

// ─── Quest Definitions ────────────────────────────────────────────────────────

const DAILY_QUESTS: QuestDef[] = [
  {
    id: "daily_play_game",
    title: "Play a Game",
    description: "Head to the Games section and play any game today.",
    isWeekly: false,
    xpReward: 10,
  },
  {
    id: "daily_answer_question",
    title: "Ask a Question",
    description: "Use Subject Helper to search for an answer today.",
    isWeekly: false,
    xpReward: 10,
  },
  {
    id: "daily_visit_brainlab",
    title: "Visit Brain Lab",
    description: "Pop into the Brain Lab to check out today's challenge.",
    isWeekly: false,
    xpReward: 10,
  },
  {
    id: "daily_prodigy",
    title: "Play Prodigy Math",
    description:
      "Jump into Prodigy Math and battle your way through a challenge!",
    isWeekly: false,
    xpReward: 10,
    externalUrl: "https://www.prodigygame.com",
  },
  {
    id: "daily_number_muncher",
    title: "Win at Number Munchers",
    description: "Play Number Munchers and munch your way to victory!",
    isWeekly: false,
    xpReward: 10,
    externalUrl: "https://www.mathplayground.com/number_munchers.html",
  },
];

const WEEKLY_QUESTS: QuestDef[] = [
  {
    id: "weekly_5_questions",
    title: "5-Question Streak",
    description: "Answer 5 questions this week in the Subject Helper.",
    isWeekly: true,
    xpReward: 25,
  },
  {
    id: "weekly_3_games",
    title: "Triple Gamer",
    description: "Play 3 different games this week.",
    isWeekly: true,
    xpReward: 25,
  },
  {
    id: "weekly_streak",
    title: "3-Day Streak",
    description: "Keep a 3-day learning streak this week.",
    isWeekly: true,
    xpReward: 25,
  },
  {
    id: "weekly_brain_lab",
    title: "Brain Lab Master",
    description: "Complete all Brain Lab activities this week.",
    isWeekly: true,
    xpReward: 25,
  },
];

// ─── Activity quest config ────────────────────────────────────────────────────

const ACTIVITY_QUEST_CONFIG: Record<
  string,
  { activityKey: string; navPath: string; navLabel: string }
> = {
  daily_play_game: {
    activityKey: "games",
    navPath: "/games",
    navLabel: "Go to Games →",
  },
  daily_answer_question: {
    activityKey: "subjecthelper",
    navPath: "/subject-helper",
    navLabel: "Go to Subject Helper →",
  },
  daily_visit_brainlab: {
    activityKey: "brainlab",
    navPath: "/brain-lab",
    navLabel: "Go to Brain Lab →",
  },
};

// ─── Quest Card ───────────────────────────────────────────────────────────────

function QuestCard({
  quest,
  onClaim,
}: {
  quest: QuestDef;
  onClaim: (quest: QuestDef) => void;
}) {
  const navigate = useNavigate();
  const completed = isQuestCompleted(quest.id, quest.isWeekly);
  const [externalOpened, setExternalOpened] = useState(false);
  const [manuallyCompleted, setManuallyCompleted] = useState(false);

  // Check if the activity for this quest has been done today
  const activityConfig = ACTIVITY_QUEST_CONFIG[quest.id];
  const activityDoneToday = activityConfig
    ? hasVisitedToday(activityConfig.activityKey)
    : true; // non-activity quests are always "ready"

  // Get streak/progress for display
  const state = loadProgress();
  let progressValue = 0;
  let progressMax = 1;

  if (quest.id === "weekly_5_questions") {
    const week = getWeekString();
    const today = getTodayDateString();
    const weekQuestions = Object.keys(state.completedQuests).filter(
      (k) =>
        k.startsWith(today.slice(0, 7)) && k.includes("daily_answer_question"),
    ).length;
    const sub = state.subjectProgress.reduce(
      (sum, s) => sum + s.questionsAnswered,
      0,
    );
    progressValue = Math.min(sub, 5);
    progressMax = 5;
    void week;
    void weekQuestions;
  } else if (quest.id === "weekly_3_games") {
    const gamesPlayed = Object.keys(state.completedQuests).filter((k) =>
      k.includes("daily_play_game"),
    ).length;
    progressValue = Math.min(gamesPlayed, 3);
    progressMax = 3;
  } else if (quest.id === "weekly_streak") {
    progressValue = Math.min(state.currentStreak, 3);
    progressMax = 3;
  }

  function handleExternalClick() {
    setExternalOpened(true);
    if (quest.externalUrl) {
      window.open(quest.externalUrl, "_blank", "noopener,noreferrer");
    }
  }

  function handleMarkComplete() {
    setManuallyCompleted(true);
    onClaim(quest);
  }

  function handleGoDoIt() {
    if (activityConfig) {
      void navigate({ to: activityConfig.navPath as "/" });
    }
  }

  const showMarkComplete =
    quest.externalUrl && externalOpened && !completed && !manuallyCompleted;
  const isCompleted = completed || manuallyCompleted;

  return (
    <motion.div
      whileHover={isCompleted ? {} : { y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <Card
        data-ocid={`quests.${quest.id}.card`}
        className={`border transition-all duration-200 h-full ${
          isCompleted
            ? "border-accent/40 bg-accent/5 opacity-80"
            : "border-border bg-card hover:border-primary/30 hover:shadow-neon-cyan/20"
        }`}
      >
        <CardContent className="p-5 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-display font-bold text-sm text-foreground">
                  {quest.title}
                </h3>
                {isCompleted && (
                  <Badge className="text-[10px] font-mono bg-accent/15 text-accent border border-accent/40 px-1.5 py-0">
                    ✓ Done
                  </Badge>
                )}
                {!isCompleted && activityConfig && !activityDoneToday && (
                  <Badge className="text-[10px] font-mono bg-secondary text-muted-foreground border border-border px-1.5 py-0">
                    Not started
                  </Badge>
                )}
                {!isCompleted && activityConfig && activityDoneToday && (
                  <Badge className="text-[10px] font-mono bg-primary/10 text-primary border border-primary/30 px-1.5 py-0">
                    ✓ Activity done!
                  </Badge>
                )}
              </div>
              <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                {quest.description}
              </p>
            </div>
          </div>

          {/* Progress bar for weekly quests with sub-goals */}
          {quest.isWeekly && progressMax > 1 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-muted-foreground">
                  Progress
                </span>
                <span className="text-[10px] font-mono text-primary">
                  {progressValue}/{progressMax}
                </span>
              </div>
              <Progress
                value={(progressValue / progressMax) * 100}
                className="h-1.5 bg-secondary/60"
              />
            </div>
          )}

          {/* XP reward */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-mono text-muted-foreground">
              Reward:
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
              ⚡ {quest.xpReward} XP
            </span>
          </div>

          {/* Actions */}
          {!isCompleted && (
            <div className="flex flex-wrap gap-2 pt-1">
              {quest.externalUrl ? (
                <>
                  <Button
                    data-ocid={`quests.${quest.id}.primary_button`}
                    size="sm"
                    onClick={handleExternalClick}
                    className="rounded-md font-mono font-bold text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Start Quest →
                  </Button>
                  {showMarkComplete && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <Button
                        data-ocid={`quests.${quest.id}.confirm_button`}
                        size="sm"
                        variant="outline"
                        onClick={handleMarkComplete}
                        className="rounded-md font-mono font-bold text-xs gap-1.5 border-accent/40 text-accent hover:bg-accent/10 transition-all"
                      >
                        ✓ Mark as Complete
                      </Button>
                    </motion.div>
                  )}
                </>
              ) : activityConfig && !activityDoneToday ? (
                /* Activity not yet done — show Go Do It button */
                <Button
                  data-ocid={`quests.${quest.id}.primary_button`}
                  size="sm"
                  onClick={handleGoDoIt}
                  variant="outline"
                  className="rounded-md font-mono font-bold text-xs gap-1.5 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/70 transition-all"
                >
                  {activityConfig.navLabel}
                </Button>
              ) : (
                /* Activity done (or no activity required) — allow claim */
                <Button
                  data-ocid={`quests.${quest.id}.primary_button`}
                  size="sm"
                  onClick={() => onClaim(quest)}
                  className="rounded-md font-mono font-bold text-xs gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all"
                >
                  Claim Reward →
                </Button>
              )}
            </div>
          )}

          {isCompleted && (
            <p className="text-xs font-mono text-accent/80">
              🏅 Reward claimed! Come back{" "}
              {quest.isWeekly ? "next week" : "tomorrow"}.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function QuestsPage() {
  const { triggerConfetti } = useConfetti();
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    recordActivity();
  }, []);

  function handleClaim(quest: QuestDef) {
    const isNew = storeCompleteQuest(quest.id, quest.isWeekly);
    if (!isNew) {
      toast("This quest is already complete! ✓", { icon: "✓" });
      return;
    }

    // Grant XP directly — no modal
    addXP("math", 0); // ensure store is initialized
    const state = loadProgress();
    state.totalXP += quest.xpReward;
    state.level = Math.floor(state.totalXP / 100) + 1;
    import("../utils/progressStore").then(({ saveProgress }) => {
      saveProgress(state);
    });

    toast.success(`⚡ +${quest.xpReward} XP earned! Quest complete! 🎉`);
    triggerConfetti(`⚡ +${quest.xpReward} XP — Quest complete!`);
    forceUpdate((n) => n + 1);
  }

  const completedDaily = DAILY_QUESTS.filter((q) =>
    isQuestCompleted(q.id, false),
  ).length;
  const completedWeekly = WEEKLY_QUESTS.filter((q) =>
    isQuestCompleted(q.id, true),
  ).length;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" as const },
    },
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg pt-10 pb-12 px-4">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.78 0.2 195)" }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-10 -left-20 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.82 0.22 145)" }}
        />
        <div className="container max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-5 uppercase tracking-widest">
              <Sword className="w-3 h-3" />
              <span>Daily &amp; Weekly Quests</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight mb-3">
              ⚔️ Quests &amp; Challenges
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl font-mono">
              Complete quests to earn XP and level up. Your bestie's got rewards
              waiting — go get them!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-10 px-4">
        <div className="container max-w-5xl mx-auto space-y-12">
          {/* ─── Daily Quests ─── */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <h2 className="font-display font-bold text-xl text-foreground">
                      Daily Quests
                    </h2>
                    <span className="px-2 py-0.5 rounded-sm bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-bold">
                      Resets Tomorrow
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    {completedDaily}/{DAILY_QUESTS.length} completed today
                  </p>
                </div>
                {/* Progress bar */}
                <div className="hidden sm:flex items-center gap-2 min-w-[120px]">
                  <Progress
                    value={(completedDaily / DAILY_QUESTS.length) * 100}
                    className="h-2 bg-secondary/60 w-24"
                  />
                  <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {completedDaily}/{DAILY_QUESTS.length}
                  </span>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {DAILY_QUESTS.map((quest) => (
                  <motion.div key={quest.id} variants={cardVariants}>
                    <QuestCard quest={quest} onClaim={handleClaim} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>

          {/* ─── Weekly Quests ─── */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <Trophy className="w-4 h-4 text-accent" />
                    <h2 className="font-display font-bold text-xl text-foreground">
                      Weekly Quests
                    </h2>
                    <span className="px-2 py-0.5 rounded-sm bg-accent/10 border border-accent/20 text-xs font-mono text-accent font-bold">
                      Resets Next Week
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">
                    {completedWeekly}/{WEEKLY_QUESTS.length} completed this week
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 min-w-[120px]">
                  <Progress
                    value={(completedWeekly / WEEKLY_QUESTS.length) * 100}
                    className="h-2 bg-secondary/60 w-24"
                  />
                  <span className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {completedWeekly}/{WEEKLY_QUESTS.length}
                  </span>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {WEEKLY_QUESTS.map((quest) => (
                  <motion.div key={quest.id} variants={cardVariants}>
                    <QuestCard quest={quest} onClaim={handleClaim} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}
