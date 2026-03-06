// ─── Progress Store (localStorage-based, no backend) ─────────────────────────

export interface StudentProfile {
  name: string;
  class_: string;
  avatarEmoji: string;
}

export interface SubjectProgress {
  subject: "math" | "science" | "english";
  questionsAnswered: number;
  xpEarned: number;
}

export interface EquippedItems {
  background: string; // item id or ""
  pet: string;
  effect: string;
  accessory: string;
}

export interface ProgressState {
  profile: StudentProfile | null;
  totalXP: number;
  level: number;
  currentStreak: number;
  lastActivityDate: string; // "YYYY-MM-DD" or ""
  earnedBadges: string[];
  subjectProgress: SubjectProgress[];
  // ─── Reward system additions ───
  coins: number;
  gems: number;
  equippedItems: EquippedItems;
  ownedItems: string[]; // array of item ids
  completedQuests: Record<string, boolean>; // key = "YYYY-MM-DD_questId" or "YYYY-WW_questId"
  claimedEventIds: string[]; // event ids already claimed
}

// ─── Badge definitions ────────────────────────────────────────────────────────

export const BADGES = [
  { threshold: 10, label: "🌟 First Steps", desc: "Earned 10 XP" },
  { threshold: 50, label: "🔥 On Fire", desc: "Earned 50 XP" },
  { threshold: 100, label: "👑 Century Club", desc: "Earned 100 XP" },
];

// XP for 100% progress bar per subject
export const SUBJECT_XP_MAX = 200;

const STORAGE_KEY = "guideme_progress";

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getWeekString(): string {
  const now = new Date();
  const year = now.getFullYear();
  // ISO week number calculation
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor(
    (now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000),
  );
  const week = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${year}-${String(week).padStart(2, "0")}`;
}

export function computeLevel(totalXP: number): number {
  return Math.floor(totalXP / 100) + 1;
}

// ─── Default state ────────────────────────────────────────────────────────────

function defaultState(): ProgressState {
  return {
    profile: null,
    totalXP: 0,
    level: 1,
    currentStreak: 0,
    lastActivityDate: "",
    earnedBadges: [],
    subjectProgress: [
      { subject: "math", questionsAnswered: 0, xpEarned: 0 },
      { subject: "science", questionsAnswered: 0, xpEarned: 0 },
      { subject: "english", questionsAnswered: 0, xpEarned: 0 },
    ],
    coins: 0,
    gems: 0,
    equippedItems: {
      background: "",
      pet: "",
      effect: "",
      accessory: "",
    },
    ownedItems: [],
    completedQuests: {},
    claimedEventIds: [],
  };
}

// ─── Load / Save ──────────────────────────────────────────────────────────────

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    // Merge with defaults to handle missing keys from older versions
    const def = defaultState();
    return {
      profile: parsed.profile ?? def.profile,
      totalXP: parsed.totalXP ?? def.totalXP,
      level: parsed.level ?? def.level,
      currentStreak: parsed.currentStreak ?? def.currentStreak,
      lastActivityDate: parsed.lastActivityDate ?? def.lastActivityDate,
      earnedBadges: parsed.earnedBadges ?? def.earnedBadges,
      subjectProgress: parsed.subjectProgress ?? def.subjectProgress,
      coins: parsed.coins ?? def.coins,
      gems: parsed.gems ?? def.gems,
      equippedItems: parsed.equippedItems ?? def.equippedItems,
      ownedItems: parsed.ownedItems ?? def.ownedItems,
      completedQuests: parsed.completedQuests ?? def.completedQuests,
      claimedEventIds: parsed.claimedEventIds ?? def.claimedEventIds,
    };
  } catch {
    return defaultState();
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Silently fail if localStorage unavailable (e.g. private browsing)
  }
}

// ─── Add XP ───────────────────────────────────────────────────────────────────

export function addXP(
  subject: "math" | "science" | "english",
  amount: number,
): { newLevel: number; prevLevel: number; newBadges: string[] } {
  const state = loadProgress();
  const prevLevel = state.level;

  // Update subject progress
  const subjectEntry = state.subjectProgress.find((s) => s.subject === subject);
  if (subjectEntry) {
    subjectEntry.xpEarned += amount;
    subjectEntry.questionsAnswered += 1;
  }

  // Update totals
  state.totalXP += amount;
  const newLevel = computeLevel(state.totalXP);
  state.level = newLevel;

  // Check for newly earned badges
  const newBadges: string[] = [];
  for (const badge of BADGES) {
    if (
      state.totalXP >= badge.threshold &&
      !state.earnedBadges.includes(badge.label)
    ) {
      state.earnedBadges.push(badge.label);
      newBadges.push(badge.label);
    }
  }

  saveProgress(state);
  return { newLevel, prevLevel, newBadges };
}

// ─── Coins & Gems ─────────────────────────────────────────────────────────────

export function addCoins(amount: number): void {
  const state = loadProgress();
  state.coins += amount;
  saveProgress(state);
}

export function addGems(amount: number): void {
  const state = loadProgress();
  state.gems += amount;
  saveProgress(state);
}

export function spendCoins(amount: number): boolean {
  const state = loadProgress();
  if (state.coins < amount) return false;
  state.coins -= amount;
  saveProgress(state);
  return true;
}

export function spendGems(amount: number): boolean {
  const state = loadProgress();
  if (state.gems < amount) return false;
  state.gems -= amount;
  saveProgress(state);
  return true;
}

// ─── Cosmetics ────────────────────────────────────────────────────────────────

export function equipItem(
  slot: "background" | "pet" | "effect" | "accessory",
  itemId: string,
): void {
  const state = loadProgress();
  state.equippedItems[slot] = itemId;
  saveProgress(state);
}

export function addOwnedItem(itemId: string): void {
  const state = loadProgress();
  if (!state.ownedItems.includes(itemId)) {
    state.ownedItems.push(itemId);
    saveProgress(state);
  }
}

// ─── Quests ───────────────────────────────────────────────────────────────────

export function completeQuest(questId: string, isWeekly: boolean): boolean {
  const state = loadProgress();
  const prefix = isWeekly ? getWeekString() : getTodayDateString();
  const key = `${prefix}_${questId}`;
  if (state.completedQuests[key]) return false;
  state.completedQuests[key] = true;
  saveProgress(state);
  return true;
}

export function isQuestCompleted(questId: string, isWeekly: boolean): boolean {
  const state = loadProgress();
  const prefix = isWeekly ? getWeekString() : getTodayDateString();
  const key = `${prefix}_${questId}`;
  return !!state.completedQuests[key];
}

// ─── Events ───────────────────────────────────────────────────────────────────

export function claimEvent(eventId: string): boolean {
  const state = loadProgress();
  if (state.claimedEventIds.includes(eventId)) return false;
  state.claimedEventIds.push(eventId);
  saveProgress(state);
  return true;
}

// ─── Record Activity (streak) ─────────────────────────────────────────────────

export function recordActivity(): void {
  const state = loadProgress();
  const today = getTodayDateString();

  if (state.lastActivityDate === today) {
    // Already recorded today — no change
    return;
  }

  // Check if yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yy = yesterday.getFullYear();
  const ym = String(yesterday.getMonth() + 1).padStart(2, "0");
  const yd = String(yesterday.getDate()).padStart(2, "0");
  const yesterdayStr = `${yy}-${ym}-${yd}`;

  if (state.lastActivityDate === yesterdayStr) {
    state.currentStreak += 1;
  } else {
    state.currentStreak = 1;
  }

  state.lastActivityDate = today;
  saveProgress(state);
}

// ─── Weak Subject ─────────────────────────────────────────────────────────────

export function getWeakSubject(): "math" | "science" | "english" | null {
  const state = loadProgress();
  const subs = state.subjectProgress;

  // Only consider subjects with at least some activity tracked
  // We rank by xpEarned (lower = weaker), but only if there's been any XP at all
  const totalXP = subs.reduce((sum, s) => sum + s.xpEarned, 0);
  if (totalXP === 0) return null;

  let weakest = subs[0];
  for (const s of subs) {
    if (s.xpEarned < weakest.xpEarned) {
      weakest = s;
    }
  }
  return weakest.subject;
}
