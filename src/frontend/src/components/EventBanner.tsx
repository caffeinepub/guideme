import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { AdminEvent } from "../pages/AdminPage";
import {
  addCoins,
  addGems,
  claimEvent,
  loadProgress,
} from "../utils/progressStore";
import { useConfetti } from "./Confetti";

const ACTIVE_EVENT_KEY = "guideme_active_event";

function loadActiveEvent(): AdminEvent | null {
  try {
    const raw = localStorage.getItem(ACTIVE_EVENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminEvent;
  } catch {
    return null;
  }
}

export default function EventBanner() {
  const { triggerConfetti } = useConfetti();
  const [event, setEvent] = useState<AdminEvent | null>(null);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    function check() {
      const evt = loadActiveEvent();
      if (!evt || !evt.isActive) {
        setEvent(null);
        return;
      }
      const state = loadProgress();
      if (state.claimedEventIds.includes(evt.id)) {
        setEvent(null);
        return;
      }
      setEvent(evt);
    }

    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  function handleClaim() {
    if (!event) return;
    const isNew = claimEvent(event.id);
    if (!isNew) {
      setClaimed(true);
      setEvent(null);
      return;
    }

    // Grant rewards
    if (event.coinsReward > 0) addCoins(event.coinsReward);
    if (event.gemsReward > 0) addGems(event.gemsReward);

    // Grant XP directly
    if (event.xpReward > 0) {
      const state = loadProgress();
      state.totalXP += event.xpReward;
      state.level = Math.floor(state.totalXP / 100) + 1;
      import("../utils/progressStore").then(({ saveProgress }) => {
        saveProgress(state);
      });
    }

    const parts: string[] = [];
    if (event.xpReward > 0) parts.push(`⚡ +${event.xpReward} XP`);
    if (event.coinsReward > 0) parts.push(`🪙 +${event.coinsReward} coins`);
    if (event.gemsReward > 0) parts.push(`💎 +${event.gemsReward} gems`);

    triggerConfetti(`🎉 ${parts.join(" · ")} claimed!`);
    toast.success(`🎉 Event rewards claimed! ${parts.join(", ")}`);

    setClaimed(true);
    setEvent(null);
  }

  return (
    <AnimatePresence>
      {event && !claimed && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          data-ocid="event_banner.panel"
          className="w-full bg-gradient-to-r from-accent/20 via-primary/15 to-accent/20 border-b border-accent/40 px-4 py-2.5 relative overflow-hidden"
        >
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, oklch(0.82 0.22 145), transparent 70%)",
            }}
          />

          <div className="container max-w-6xl mx-auto flex items-center justify-between gap-3 relative">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="text-lg flex-shrink-0"
              >
                🎉
              </motion.span>
              <div className="min-w-0">
                <p className="font-mono font-bold text-xs text-foreground truncate">
                  <span className="text-accent">{event.title}</span> is{" "}
                  <span className="text-primary">LIVE!</span>{" "}
                  <span className="text-muted-foreground hidden sm:inline">
                    ⚡{event.xpReward} XP · 🪙{event.coinsReward} · 💎
                    {event.gemsReward}
                  </span>
                </p>
                {event.description && (
                  <p className="font-mono text-[10px] text-muted-foreground truncate hidden sm:block">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              data-ocid="event_banner.claim.primary_button"
              onClick={handleClaim}
              className="flex-shrink-0 px-3 py-1.5 rounded-md bg-accent text-accent-foreground font-mono font-bold text-xs hover:bg-accent/90 hover:shadow-neon-green transition-all duration-150 whitespace-nowrap"
            >
              Claim Now! →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
