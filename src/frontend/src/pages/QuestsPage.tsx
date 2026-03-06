import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "@tanstack/react-router";
import { ExternalLink, Sword, Trophy, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useConfetti } from "../components/Confetti";
import {
  addCoins,
  addGems,
  addOwnedItem,
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
  coinReward: number;
  gemReward: number;
  xpReward: number;
  externalUrl?: string;
  progressKey?: string; // if set, tracks partial completion
  progressTarget?: number;
}

interface RewardOption {
  type: "coins" | "gems" | "cosmetic";
  label: string;
  icon: string;
  value: number | string;
}

// ─── Quest Definitions ────────────────────────────────────────────────────────

const DAILY_QUESTS: QuestDef[] = [
  {
    id: "daily_play_game",
    title: "Play a Game",
    description: "Head to the Games section and play any game today.",
    isWeekly: false,
    coinReward: 50,
    gemReward: 25,
    xpReward: 10,
  },
  {
    id: "daily_answer_question",
    title: "Ask a Question",
    description: "Use Subject Helper to search for an answer today.",
    isWeekly: false,
    coinReward: 30,
    gemReward: 15,
    xpReward: 10,
  },
  {
    id: "daily_visit_brainlab",
    title: "Visit Brain Lab",
    description: "Pop into the Brain Lab to check out today's challenge.",
    isWeekly: false,
    coinReward: 20,
    gemReward: 10,
    xpReward: 10,
  },
  {
    id: "daily_prodigy",
    title: "Play Prodigy Math",
    description:
      "Jump into Prodigy Math and battle your way through a challenge!",
    isWeekly: false,
    coinReward: 60,
    gemReward: 30,
    xpReward: 10,
    externalUrl: "https://www.prodigygame.com",
  },
  {
    id: "daily_number_muncher",
    title: "Win at Number Munchers",
    description: "Play Number Munchers and munch your way to victory!",
    isWeekly: false,
    coinReward: 70,
    gemReward: 35,
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
    coinReward: 200,
    gemReward: 100,
    xpReward: 25,
  },
  {
    id: "weekly_3_games",
    title: "Triple Gamer",
    description: "Play 3 different games this week.",
    isWeekly: true,
    coinReward: 150,
    gemReward: 75,
    xpReward: 25,
  },
  {
    id: "weekly_streak",
    title: "3-Day Streak",
    description: "Keep a 3-day learning streak this week.",
    isWeekly: true,
    coinReward: 100,
    gemReward: 50,
    xpReward: 25,
  },
  {
    id: "weekly_brain_lab",
    title: "Brain Lab Master",
    description: "Complete all Brain Lab activities this week.",
    isWeekly: true,
    coinReward: 180,
    gemReward: 90,
    xpReward: 25,
  },
];

// Random cosmetics pool for quest rewards
const COSMETIC_REWARDS = [
  { id: "bg_ocean", name: "Ocean Deep BG", emoji: "🌊" },
  { id: "pet_cat", name: "Pixel Cat", emoji: "🐱" },
  { id: "effect_sparkle", name: "Sparkle Aura", emoji: "✨" },
  { id: "acc_glasses", name: "Cool Glasses", emoji: "😎" },
  { id: "bg_forest", name: "Enchanted Forest", emoji: "🌲" },
  { id: "pet_fox", name: "Clever Fox", emoji: "🦊" },
  { id: "acc_headphones", name: "Headphones", emoji: "🎧" },
];

function getRandomCosmetic() {
  return COSMETIC_REWARDS[Math.floor(Math.random() * COSMETIC_REWARDS.length)];
}

// ─── Reward Choice Modal ──────────────────────────────────────────────────────

function RewardModal({
  open,
  quest,
  onClose,
}: {
  open: boolean;
  quest: QuestDef | null;
  onClose: () => void;
}) {
  const { triggerConfetti } = useConfetti();
  const [chosen, setChosen] = useState(false);

  useEffect(() => {
    if (open) setChosen(false);
  }, [open]);

  if (!quest) return null;

  const cosmetic = getRandomCosmetic();

  const options: RewardOption[] = [
    {
      type: "coins",
      label: `${quest.coinReward} Coins`,
      icon: "🪙",
      value: quest.coinReward,
    },
    {
      type: "gems",
      label: `${quest.gemReward} Gems`,
      icon: "💎",
      value: quest.gemReward,
    },
    {
      type: "cosmetic",
      label: `${cosmetic.emoji} ${cosmetic.name}`,
      icon: "✨",
      value: cosmetic.id,
    },
  ];

  function handleChoose(opt: RewardOption) {
    if (chosen) return;
    setChosen(true);

    // Grant XP always
    addXP("math", 0); // no XP from addXP — we'll add it directly
    const state = loadProgress();
    state.totalXP += quest!.xpReward;
    state.level = Math.floor(state.totalXP / 100) + 1;
    import("../utils/progressStore").then(({ saveProgress }) => {
      saveProgress(state);
    });

    if (opt.type === "coins") {
      addCoins(opt.value as number);
      triggerConfetti(`🎉 +${opt.value as number} Coins earned!`);
      toast.success(`🪙 +${opt.value as number} coins added to your wallet!`);
    } else if (opt.type === "gems") {
      addGems(opt.value as number);
      triggerConfetti(`💎 +${opt.value as number} Gems earned!`);
      toast.success(`💎 +${opt.value as number} gems added!`);
    } else {
      addOwnedItem(opt.value as string);
      triggerConfetti(`✨ Cosmetic unlocked: ${cosmetic.name}!`);
      toast.success(
        `✨ ${cosmetic.emoji} ${cosmetic.name} added to your collection!`,
      );
    }

    toast(`⚡ +${quest!.xpReward} XP earned!`, { icon: "⚡" });
    setTimeout(onClose, 1200);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !chosen && onClose()}>
      <DialogContent
        data-ocid="quests.reward_choice.dialog"
        className="bg-card border-primary/30 max-w-sm shadow-neon-cyan"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-foreground text-center text-xl">
            🎊 Quest Complete!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <p className="text-center text-sm font-mono text-muted-foreground">
            <span className="text-foreground font-bold">{quest.title}</span>{" "}
            complete! Choose your reward:
          </p>

          <p className="text-center text-xs font-mono text-primary">
            ⚡ +{quest.xpReward} XP is automatically granted
          </p>

          <div className="space-y-2">
            {options.map((opt, i) => (
              <motion.button
                key={opt.type}
                type="button"
                data-ocid={`quests.reward_option.button.${i + 1}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoose(opt)}
                disabled={chosen}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all duration-150 text-left
                  ${opt.type === "coins" ? "border-[oklch(0.78_0.18_60/0.4)] hover:bg-[oklch(0.78_0.18_60/0.08)] hover:border-[oklch(0.78_0.18_60/0.7)]" : ""}
                  ${opt.type === "gems" ? "border-[oklch(0.72_0.2_310/0.4)] hover:bg-[oklch(0.72_0.2_310/0.08)] hover:border-[oklch(0.72_0.2_310/0.7)]" : ""}
                  ${opt.type === "cosmetic" ? "border-primary/30 hover:bg-primary/08 hover:border-primary/60" : ""}
                  bg-secondary/40 disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <span className="text-3xl">{opt.icon}</span>
                <div>
                  <p className="font-mono font-bold text-sm text-foreground">
                    {opt.label}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {opt.type === "coins" && "Spend in the Shop"}
                    {opt.type === "gems" && "Buy premium items"}
                    {opt.type === "cosmetic" && "Customize your profile"}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
    // Count how many days this week had a question answered (rough heuristic via completedQuests)
    const weekQuestions = Object.keys(state.completedQuests).filter(
      (k) =>
        k.startsWith(today.slice(0, 7)) && k.includes("daily_answer_question"),
    ).length;
    // Actually track via totalXP changes per week — simplified: show streak
    const sub = state.subjectProgress.reduce(
      (sum, s) => sum + s.questionsAnswered,
      0,
    );
    progressValue = Math.min(sub, 5);
    progressMax = 5;
    void week; // suppress unused
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

          {/* Rewards row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-mono text-muted-foreground">
              Rewards:
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[oklch(0.78_0.18_60)] bg-[oklch(0.78_0.18_60/0.1)] px-2 py-0.5 rounded-sm">
              🪙 {quest.coinReward}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[oklch(0.72_0.2_310)] bg-[oklch(0.72_0.2_310/0.1)] px-2 py-0.5 rounded-sm">
              💎 {quest.gemReward}
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
  const [activeQuest, setActiveQuest] = useState<QuestDef | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [, forceUpdate] = useState(0);
  // Coins/gems in state so they refresh immediately after reward claim
  const [coins, setCoins] = useState(() => loadProgress().coins);
  const [gems, setGems] = useState(() => loadProgress().gems);

  useEffect(() => {
    recordActivity();
  }, []);

  function handleClaim(quest: QuestDef) {
    const isNew = storeCompleteQuest(quest.id, quest.isWeekly);
    if (!isNew) {
      toast("This quest is already complete! ✓", { icon: "✓" });
      return;
    }
    setActiveQuest(quest);
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
    setActiveQuest(null);
    // Re-read fresh values from storage so balance strip updates immediately
    const fresh = loadProgress();
    setCoins(fresh.coins);
    setGems(fresh.gems);
    forceUpdate((n) => n + 1); // also refresh completed quest state
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
              Complete quests to earn coins, gems, and cosmetics. Your bestie's
              got rewards waiting — go get them!
            </p>

            {/* Balance strip */}
            <div className="flex items-center gap-4 mt-5 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[oklch(0.78_0.18_60/0.1)] border border-[oklch(0.78_0.18_60/0.3)]">
                <span className="text-base">🪙</span>
                <span className="font-mono font-bold text-sm text-[oklch(0.78_0.18_60)]">
                  {coins} Coins
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[oklch(0.72_0.2_310/0.1)] border border-[oklch(0.72_0.2_310/0.3)]">
                <span className="text-base">💎</span>
                <span className="font-mono font-bold text-sm text-[oklch(0.72_0.2_310)]">
                  {gems} Gems
                </span>
              </div>
              <Link to="/shop">
                <Button
                  data-ocid="quests.go_to_shop.secondary_button"
                  size="sm"
                  variant="outline"
                  className="font-mono font-bold text-xs border-border hover:border-primary/40 gap-1.5"
                >
                  🛒 Shop →
                </Button>
              </Link>
            </div>
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

          {/* ─── CTA strip ─── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="font-display font-bold text-base text-foreground mb-1">
                Spend your rewards 🛒
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                Use coins and gems in the Shop to unlock backgrounds, pets,
                effects, and accessories.
              </p>
            </div>
            <Link to="/shop">
              <Button
                data-ocid="quests.shop_cta.primary_button"
                className="font-mono font-bold text-xs gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all whitespace-nowrap"
              >
                Open Shop →
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Reward Choice Modal */}
      <RewardModal
        open={modalOpen}
        quest={activeQuest}
        onClose={handleModalClose}
      />
    </div>
  );
}
