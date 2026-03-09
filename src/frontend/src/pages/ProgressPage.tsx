import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import {
  BookOpenText,
  Calculator,
  FlaskConical,
  Pencil,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BADGES,
  type ProgressState,
  SUBJECT_XP_MAX,
  type StudentProfile,
  addXP,
  getWeakSubject,
  loadProgress,
  recordActivity,
  saveProgress,
} from "../utils/progressStore";

// ─── Constants ────────────────────────────────────────────────────────────────

const AVATAR_OPTIONS = [
  "🎓",
  "📚",
  "🧠",
  "🦁",
  "🐯",
  "🐻",
  "🦊",
  "🐧",
  "🦖",
  "🦄",
  "🚀",
  "⚡",
  "🌟",
  "🎮",
  "🏆",
];

const CLASS_OPTIONS = [
  "Year 3 / Grade 3 (Age 7–8)",
  "Year 4 / Grade 4 (Age 8–9)",
  "Year 5 / Grade 5 (Age 9–10)",
  "Year 6 / Grade 6 (Age 10–11)",
  "Year 7 / Grade 7 (Age 11–12)",
  "Year 8 / Grade 8 (Age 12–13)",
  "Year 9 / Grade 9 (Age 13–14)",
  "Year 10 / Grade 10 (Age 14–15)",
  "Year 11 / Grade 11 (Age 15–16)",
];

const SUBJECT_CONFIG = [
  {
    id: "math" as const,
    label: "Mathematics",
    icon: Calculator,
    color: "text-[oklch(0.75_0.2_255)]",
    bg: "bg-[oklch(0.75_0.2_255/0.12)]",
    border: "border-[oklch(0.75_0.2_255/0.4)]",
    glow: "shadow-[0_0_12px_oklch(0.75_0.2_255/0.5)]",
    barColor: "bg-[oklch(0.75_0.2_255)]",
    emoji: "🔢",
  },
  {
    id: "science" as const,
    label: "Science",
    icon: FlaskConical,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/40",
    glow: "shadow-neon-green",
    barColor: "bg-accent",
    emoji: "🔬",
  },
  {
    id: "english" as const,
    label: "English",
    icon: BookOpenText,
    color: "text-[oklch(0.78_0.18_60)]",
    bg: "bg-[oklch(0.78_0.18_60/0.12)]",
    border: "border-[oklch(0.78_0.18_60/0.4)]",
    glow: "shadow-[0_0_12px_oklch(0.78_0.18_60/0.5)]",
    barColor: "bg-[oklch(0.78_0.18_60)]",
    emoji: "✏️",
  },
];

const LEVEL_MESSAGES: Record<number, string> = {
  2: "You're levelling up — keep that energy! 🔥",
  3: "Level 3?! You're on a roll! 🚀",
  4: "Getting smarter every day. Level 4! 🧠",
  5: "Half-way to legendary. Level 5! 🌟",
};

function getLevelMessage(level: number): string {
  return (
    LEVEL_MESSAGES[level] ?? `Level ${level}! You're absolutely crushing it! 🏆`
  );
}

// ─── AnimatedBar ──────────────────────────────────────────────────────────────

function AnimatedBar({
  percent,
  colorClass,
}: {
  percent: number;
  colorClass: string;
}) {
  return (
    <div className="relative h-3 bg-secondary/60 rounded-full overflow-hidden border border-border">
      <motion.div
        className={`absolute left-0 top-0 h-full rounded-full ${colorClass}`}
        initial={{ width: "0%" }}
        animate={{ width: `${Math.min(percent, 100)}%` }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        style={{
          boxShadow:
            percent > 0
              ? "0 0 8px currentColor, 0 0 16px currentColor"
              : "none",
        }}
      />
    </div>
  );
}

// ─── Flame animation ──────────────────────────────────────────────────────────

function FlameIcon({ active }: { active: boolean }) {
  if (!active) return <span className="text-muted-foreground">🔥</span>;
  return (
    <motion.span
      animate={{ scale: [1, 1.2, 1], rotate: [-4, 4, -4] }}
      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      className="inline-block"
    >
      🔥
    </motion.span>
  );
}

// ─── Profile Setup Modal ──────────────────────────────────────────────────────

function ProfileModal({
  open,
  onClose,
  existing,
}: {
  open: boolean;
  onClose: (saved: boolean) => void;
  existing: StudentProfile | null;
}) {
  const [name, setName] = useState(existing?.name ?? "");
  const [classVal, setClassVal] = useState(existing?.class_ ?? "");
  const [avatar, setAvatar] = useState(existing?.avatarEmoji ?? "🎓");

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setName(existing?.name ?? "");
      setClassVal(existing?.class_ ?? "");
      setAvatar(existing?.avatarEmoji ?? "🎓");
    }
  }, [open, existing]);

  function handleSave() {
    if (!name.trim() || !classVal) return;
    const state = loadProgress();
    const isFirstTime = !state.profile;
    state.profile = {
      name: name.trim(),
      class_: classVal,
      avatarEmoji: avatar,
    };
    saveProgress(state);
    if (isFirstTime) {
      recordActivity();
    }
    onClose(true);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose(false)}>
      <DialogContent
        data-ocid="progress.profile_setup.dialog"
        className="bg-card border-border max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-foreground">
            {existing ? "Edit Your Profile" : "Set Up Your Profile 🎓"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Avatar picker */}
          <div>
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3 block">
              Pick your avatar
            </Label>
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  data-ocid="progress.avatar.button"
                  onClick={() => setAvatar(emoji)}
                  className={`text-2xl h-12 w-full rounded-lg border transition-all duration-150 flex items-center justify-center ${
                    avatar === emoji
                      ? "border-primary bg-primary/10 shadow-neon-cyan"
                      : "border-border bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <Label
              htmlFor="profile-name"
              className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block"
            >
              Your name
            </Label>
            <Input
              id="profile-name"
              data-ocid="progress.name.input"
              placeholder="e.g. Alex"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-mono text-sm bg-card border-border focus-visible:border-primary/60"
            />
          </div>

          {/* Class */}
          <div>
            <Label
              htmlFor="profile-class"
              className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 block"
            >
              Your class / year group
            </Label>
            <Select value={classVal} onValueChange={setClassVal}>
              <SelectTrigger
                id="profile-class"
                data-ocid="progress.class.select"
                className="font-mono text-sm bg-card border-border focus:border-primary/60"
              >
                <SelectValue placeholder="Select your year..." />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {CLASS_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt}
                    value={opt}
                    className="font-mono text-sm"
                  >
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              data-ocid="progress.save_profile.submit_button"
              onClick={handleSave}
              disabled={!name.trim() || !classVal}
              className="flex-1 font-mono font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan disabled:opacity-40"
            >
              Save Profile 🚀
            </Button>
            <Button
              data-ocid="progress.profile_setup.cancel_button"
              variant="outline"
              onClick={() => onClose(false)}
              className="font-mono text-sm border-border hover:border-primary/40"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── XP Demo Controls (dev helper — shows in all builds for demo purposes) ───

function XPDemoPanel({
  onRefresh,
}: {
  onRefresh: () => void;
}) {
  function award(subject: "math" | "science" | "english") {
    const { newLevel, prevLevel, newBadges } = addXP(subject, 10);
    recordActivity();
    if (newLevel > prevLevel) {
      toast.success(
        `🎉 Level Up! You're now Level ${newLevel}! ${getLevelMessage(newLevel)}`,
      );
    }
    for (const badge of newBadges) {
      const found = BADGES.find((b) => b.label === badge);
      if (found) {
        toast(`🏅 New Badge: ${found.label}! ${found.desc}`, {
          icon: "🏅",
        });
      }
    }
    onRefresh();
  }

  return (
    <div className="mt-8 p-4 rounded-lg border border-dashed border-border bg-secondary/20">
      <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">
        🧪 Try it out — award yourself XP:
      </p>
      <div className="flex flex-wrap gap-2">
        {(["math", "science", "english"] as const).map((sub) => {
          const cfg = SUBJECT_CONFIG.find((s) => s.id === sub)!;
          return (
            <Button
              key={sub}
              data-ocid={`progress.demo_xp_${sub}.button`}
              size="sm"
              variant="outline"
              onClick={() => award(sub)}
              className={`font-mono text-xs border-border hover:${cfg.border} transition-all`}
            >
              {cfg.emoji} +10 {cfg.label} XP
            </Button>
          );
        })}
      </div>
      <p className="text-xs font-mono text-muted-foreground mt-2 opacity-60">
        XP is also awarded automatically when you ask questions in the Subject
        Helper 📖
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProgressPage() {
  const [progressState, setProgressState] =
    useState<ProgressState>(loadProgress);
  const [modalOpen, setModalOpen] = useState(false);

  function refresh() {
    setProgressState(loadProgress());
  }

  function handleModalClose(saved: boolean) {
    setModalOpen(false);
    if (saved) refresh();
  }

  const {
    profile,
    totalXP,
    level,
    currentStreak,
    earnedBadges,
    subjectProgress,
  } = progressState;

  const weakSubject = getWeakSubject();
  const weakConfig = weakSubject
    ? SUBJECT_CONFIG.find((s) => s.id === weakSubject)
    : null;

  const levelProgress = totalXP % 100; // XP within current level (0-99)
  const nextLevelXP = 100; // XP needed per level

  return (
    <div>
      {/* ── Hero ── */}
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
        <div className="container max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-5 uppercase tracking-widest">
              <Trophy className="w-3 h-3" />
              <span>My Progress</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight mb-3">
              My Progress 🚀
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl font-mono">
              Level up your brain, one question at a time. 🧠
            </p>

            {!profile && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <Button
                  data-ocid="progress.setup_profile.primary_button"
                  onClick={() => setModalOpen(true)}
                  className="font-mono font-bold text-sm gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all duration-200"
                >
                  <Star className="w-4 h-4" />
                  Set Up Your Profile ✨
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="py-10 px-4">
        <div className="container max-w-4xl mx-auto space-y-8">
          {/* ── Profile Card ── */}
          <AnimatePresence>
            {profile && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  data-ocid="progress.profile.card"
                  className="border border-border bg-card shadow-card overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      {/* Avatar */}
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl flex-shrink-0 border-2 border-primary/40"
                        style={{
                          boxShadow:
                            "0 0 16px oklch(0.78 0.2 195 / 0.5), 0 0 32px oklch(0.78 0.2 195 / 0.2)",
                          background: "oklch(0.13 0.02 260)",
                        }}
                      >
                        {profile.avatarEmoji}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h2 className="font-display font-extrabold text-2xl text-foreground">
                            {profile.name}
                          </h2>
                          <span className="px-2 py-0.5 rounded-sm bg-secondary border border-border text-xs font-mono text-muted-foreground">
                            {profile.class_}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          {/* Level badge */}
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30">
                            <Zap className="w-3.5 h-3.5 text-primary" />
                            <span className="font-mono font-bold text-sm text-primary neon-glow">
                              Level {level}
                            </span>
                          </div>

                          {/* Total XP */}
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-secondary border border-border">
                            <Star className="w-3.5 h-3.5 text-[oklch(0.78_0.18_60)]" />
                            <span className="font-mono font-bold text-sm text-foreground">
                              {totalXP} XP
                            </span>
                          </div>

                          {/* Streak */}
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-secondary border border-border">
                            <FlameIcon active={currentStreak >= 3} />
                            <span className="font-mono font-bold text-sm text-foreground">
                              {currentStreak} day streak
                            </span>
                          </div>
                        </div>

                        {/* Level XP bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-mono text-muted-foreground">
                              Level {level} → {level + 1}
                            </span>
                            <span className="text-xs font-mono text-primary">
                              {levelProgress}/{nextLevelXP} XP
                            </span>
                          </div>
                          <AnimatedBar
                            percent={(levelProgress / nextLevelXP) * 100}
                            colorClass="bg-primary"
                          />
                        </div>
                      </div>

                      {/* Edit button */}
                      <Button
                        data-ocid="progress.edit_profile.edit_button"
                        variant="outline"
                        size="sm"
                        onClick={() => setModalOpen(true)}
                        className="font-mono text-xs border-border hover:border-primary/40 gap-1.5 flex-shrink-0 self-start"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Subject Progress ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-xl text-foreground mb-4">
              Subject Progress 📊
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SUBJECT_CONFIG.map((cfg) => {
                const sub = subjectProgress.find((s) => s.subject === cfg.id);
                const xp = sub?.xpEarned ?? 0;
                const questions = sub?.questionsAnswered ?? 0;
                const pct = Math.min((xp / SUBJECT_XP_MAX) * 100, 100);
                const mastered = pct >= 100;
                const Icon = cfg.icon;

                return (
                  <motion.div
                    key={cfg.id}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      data-ocid={`progress.subject_${cfg.id}.card`}
                      className={`border ${mastered ? `${cfg.border} ${cfg.glow}` : "border-border"} bg-card shadow-card transition-all duration-200 h-full`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-9 h-9 rounded-md ${cfg.bg} border ${cfg.border} flex items-center justify-center`}
                            >
                              <Icon className={`w-4 h-4 ${cfg.color}`} />
                            </div>
                            <div>
                              <p
                                className={`font-display font-bold text-sm ${cfg.color}`}
                              >
                                {cfg.label}
                              </p>
                              <p className="text-xs font-mono text-muted-foreground">
                                {questions} question{questions !== 1 ? "s" : ""}{" "}
                                asked
                              </p>
                            </div>
                          </div>
                          {mastered && (
                            <Badge
                              className={`${cfg.bg} ${cfg.color} border ${cfg.border} text-[10px] font-mono`}
                            >
                              Mastered! 🎉
                            </Badge>
                          )}
                        </div>

                        {/* XP stats */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-muted-foreground">
                            XP Earned
                          </span>
                          <span
                            className={`text-sm font-mono font-bold ${cfg.color}`}
                          >
                            {xp} / {SUBJECT_XP_MAX}
                          </span>
                        </div>

                        <AnimatedBar percent={pct} colorClass={cfg.barColor} />

                        <p className="text-xs font-mono text-muted-foreground mt-2 text-right">
                          {Math.round(pct)}% complete
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Badge Shelf ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-display font-bold text-xl text-foreground mb-4">
              Your Badges 🏅
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BADGES.map((badge) => {
                const earned = earnedBadges.includes(badge.label);
                return (
                  <motion.div
                    key={badge.label}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Card
                      data-ocid={`progress.badge_${badge.threshold}.card`}
                      className={`border transition-all duration-300 ${
                        earned
                          ? "border-[oklch(0.78_0.18_60/0.6)] bg-[oklch(0.78_0.18_60/0.06)] shadow-[0_0_16px_oklch(0.78_0.18_60/0.3)]"
                          : "border-border bg-card opacity-50"
                      }`}
                    >
                      <CardContent className="p-5 text-center">
                        <div
                          className={`text-4xl mb-3 transition-all duration-300 ${earned ? "" : "grayscale opacity-40"}`}
                        >
                          {earned ? (
                            badge.label.split(" ")[0]
                          ) : (
                            <span className="text-2xl">🔒</span>
                          )}
                        </div>
                        <p
                          className={`font-display font-bold text-sm mb-1 ${earned ? "text-[oklch(0.78_0.18_60)]" : "text-muted-foreground"}`}
                        >
                          {badge.label.replace(/^\S+\s/, "")}
                        </p>
                        <p className="text-xs font-mono text-muted-foreground">
                          {earned
                            ? badge.desc
                            : `Earn ${badge.threshold} XP to unlock`}
                        </p>
                        {earned && (
                          <Badge className="mt-2 text-[10px] font-mono bg-[oklch(0.78_0.18_60/0.15)] text-[oklch(0.78_0.18_60)] border border-[oklch(0.78_0.18_60/0.4)]">
                            ✓ Earned
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Weak Subject Suggestion ── */}
          <AnimatePresence>
            {weakConfig && totalXP > 0 && (
              <motion.div
                key="weak-subject"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card
                  data-ocid="progress.weak_subject.card"
                  className={`border ${weakConfig.border} ${weakConfig.bg}`}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                          💡 Focus Area
                        </p>
                        <h3
                          className={`font-display font-bold text-lg ${weakConfig.color} mb-1`}
                        >
                          {weakConfig.emoji} {weakConfig.label}
                        </h3>
                        <p className="text-sm font-mono text-muted-foreground">
                          This is your weakest subject — time to level it up! 🎯
                        </p>
                      </div>
                      <Link to="/subject-helper">
                        <Button
                          data-ocid="progress.practice_weak_subject.primary_button"
                          size="sm"
                          className={
                            "font-mono font-bold text-xs gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all duration-200 whitespace-nowrap"
                          }
                        >
                          Practice {weakConfig.label} Now →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Daily Streak Widget ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Card
              data-ocid="progress.streak.card"
              className="border border-border bg-card shadow-card"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">
                    <FlameIcon active={currentStreak >= 3} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg text-foreground">
                      {currentStreak > 0 ? (
                        <>
                          <span className="text-primary neon-glow">
                            {currentStreak}
                          </span>{" "}
                          day streak!{" "}
                          {currentStreak >= 7
                            ? "🏆"
                            : currentStreak >= 3
                              ? "🔥"
                              : "⚡"}
                        </>
                      ) : (
                        "Start your streak today!"
                      )}
                    </p>
                    <p className="text-xs font-mono text-muted-foreground mt-1">
                      Keep your streak going! Learn something new today. 📚
                    </p>
                  </div>
                  {currentStreak === 0 && (
                    <Link to="/subject-helper" className="ml-auto">
                      <Button
                        data-ocid="progress.start_streak.secondary_button"
                        size="sm"
                        variant="outline"
                        className="font-mono text-xs border-border hover:border-primary/40 transition-all"
                      >
                        Learn Now →
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ── XP Demo Controls ── */}
          {profile && <XPDemoPanel onRefresh={refresh} />}

          {/* ── No profile CTA ── */}
          {!profile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center py-8"
              data-ocid="progress.no_profile.empty_state"
            >
              <p className="text-5xl mb-4">🎓</p>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                No profile yet!
              </h3>
              <p className="text-sm font-mono text-muted-foreground mb-6">
                Set up your profile to start tracking your progress and earning
                badges. 🏅
              </p>
              <Button
                data-ocid="progress.setup_profile_cta.primary_button"
                onClick={() => setModalOpen(true)}
                className="font-mono font-bold text-sm gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all duration-200"
              >
                <Star className="w-4 h-4" />
                Set Up Your Profile
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Profile Modal ── */}
      <ProfileModal
        open={modalOpen}
        onClose={handleModalClose}
        existing={profile}
      />
    </div>
  );
}
