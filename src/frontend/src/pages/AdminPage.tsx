import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Mail, Terminal, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const REGISTERED_EMAILS_KEY = "guideme_registered_emails";

function loadRegisteredEmails(): string[] {
  try {
    const raw = localStorage.getItem(REGISTERED_EMAILS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

// ─── Admin Event type ─────────────────────────────────────────────────────────

export interface AdminEvent {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinsReward: number;
  gemsReward: number;
  triggeredAt: number;
  isActive: boolean;
}

const ACTIVE_EVENT_KEY = "guideme_active_event";
const EVENT_HISTORY_KEY = "guideme_event_history";
const ADMIN_PASSWORD = "9721";

function loadActiveEvent(): AdminEvent | null {
  try {
    const raw = localStorage.getItem(ACTIVE_EVENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminEvent;
  } catch {
    return null;
  }
}

function loadEventHistory(): AdminEvent[] {
  try {
    const raw = localStorage.getItem(EVENT_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AdminEvent[];
  } catch {
    return [];
  }
}

function saveActiveEvent(event: AdminEvent | null): void {
  try {
    if (event) {
      localStorage.setItem(ACTIVE_EVENT_KEY, JSON.stringify(event));
    } else {
      localStorage.removeItem(ACTIVE_EVENT_KEY);
    }
  } catch {
    // silently fail
  }
}

function addToHistory(event: AdminEvent): void {
  try {
    const history = loadEventHistory();
    // Remove if already exists
    const filtered = history.filter((e) => e.id !== event.id);
    filtered.unshift(event);
    // Keep last 20 events
    localStorage.setItem(
      EVENT_HISTORY_KEY,
      JSON.stringify(filtered.slice(0, 20)),
    );
  } catch {
    // silently fail
  }
}

function formatTimeAgo(ms: number): string {
  const elapsed = Date.now() - ms;
  const minutes = Math.floor(elapsed / 60000);
  const hours = Math.floor(elapsed / 3600000);
  const days = Math.floor(elapsed / 86400000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "Just now";
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setPw("");
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <Terminal className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-mono font-extrabold text-2xl text-foreground mb-1">
            ADMIN ACCESS
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            Authorised personnel only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label
              htmlFor="admin-pw"
              className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2 block"
            >
              Password
            </Label>
            <Input
              id="admin-pw"
              data-ocid="admin.password.input"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter admin password..."
              className={`font-mono text-sm bg-card border-border focus-visible:border-primary/60 ${
                error ? "border-destructive/60" : ""
              }`}
              autoComplete="off"
            />
            {error && (
              <p className="text-xs font-mono text-destructive mt-1">
                ✗ Incorrect password. Access denied.
              </p>
            )}
          </div>
          <Button
            data-ocid="admin.login.submit_button"
            type="submit"
            className="w-full font-mono font-bold text-sm bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan"
          >
            <Terminal className="w-4 h-4 mr-2" />
            Authenticate →
          </Button>
        </form>

        <p className="text-center text-xs font-mono text-muted-foreground mt-6 opacity-40">
          GuideMe Admin Panel v1.0
        </p>
      </motion.div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

function AdminDashboard() {
  const [activeEvent, setActiveEvent] = useState<AdminEvent | null>(
    loadActiveEvent,
  );
  const [history, setHistory] = useState<AdminEvent[]>(loadEventHistory);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xp, setXp] = useState(50);
  const [coins, setCoins] = useState(100);
  const [gems, setGems] = useState(50);
  const [registeredEmails, setRegisteredEmails] = useState<string[]>(() =>
    loadRegisteredEmails(),
  );
  const [showEmails, setShowEmails] = useState(false);

  useEffect(() => {
    // Refresh every 5s to sync across tabs
    const interval = setInterval(() => {
      setActiveEvent(loadActiveEvent());
      setHistory(loadEventHistory());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function handleTriggerEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Event needs a title!");
      return;
    }

    const event: AdminEvent = {
      id: `evt_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      xpReward: Math.max(0, xp),
      coinsReward: Math.max(0, coins),
      gemsReward: Math.max(0, gems),
      triggeredAt: Date.now(),
      isActive: true,
    };

    // End any existing event and save to history
    if (activeEvent) {
      const ended = { ...activeEvent, isActive: false };
      addToHistory(ended);
    }

    saveActiveEvent(event);
    addToHistory(event);
    setActiveEvent(event);
    setHistory(loadEventHistory());

    // Refresh registered emails and show the notification panel
    const emails = loadRegisteredEmails();
    setRegisteredEmails(emails);
    setShowEmails(true);

    // Reset form
    setTitle("");
    setDescription("");
    setXp(50);
    setCoins(100);
    setGems(50);

    toast.success(`🎉 Event "${event.title}" is now LIVE!`);
  }

  function handleEndEvent() {
    if (!activeEvent) return;
    const ended = { ...activeEvent, isActive: false };
    addToHistory(ended);
    saveActiveEvent(null);
    setActiveEvent(null);
    setHistory(loadEventHistory());
    toast("Event ended. Rewards can no longer be claimed.", { icon: "🔴" });
  }

  return (
    <div className="py-10 px-4">
      <div className="container max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <Terminal className="w-5 h-5 text-primary" />
            <h1 className="font-mono font-extrabold text-2xl text-foreground">
              ADMIN DASHBOARD
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-accent/10 border border-accent/30 text-accent text-xs font-mono font-bold">
              LIVE
            </span>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            GuideMe Admin Panel — Trigger events, manage rewards, monitor
            activity.
          </p>
        </motion.div>

        {/* ─── Active Event ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Card
            data-ocid="admin.active_event.card"
            className={`border ${
              activeEvent?.isActive
                ? "border-accent/50 bg-accent/5 shadow-neon-green"
                : "border-border bg-card"
            }`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm text-foreground flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                Active Event
                {activeEvent?.isActive && (
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-accent">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    LIVE
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeEvent?.isActive ? (
                <>
                  <div>
                    <p className="font-mono font-bold text-base text-foreground">
                      {activeEvent.title}
                    </p>
                    {activeEvent.description && (
                      <p className="font-mono text-xs text-muted-foreground mt-0.5">
                        {activeEvent.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[11px] font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-sm">
                      ⚡ {activeEvent.xpReward} XP
                    </span>
                    <span className="text-[11px] font-mono bg-[oklch(0.78_0.18_60/0.1)] text-[oklch(0.78_0.18_60)] border border-[oklch(0.78_0.18_60/0.3)] px-2 py-0.5 rounded-sm">
                      🪙 {activeEvent.coinsReward} Coins
                    </span>
                    <span className="text-[11px] font-mono bg-[oklch(0.72_0.2_310/0.1)] text-[oklch(0.72_0.2_310)] border border-[oklch(0.72_0.2_310/0.3)] px-2 py-0.5 rounded-sm">
                      💎 {activeEvent.gemsReward} Gems
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground bg-secondary/40 border border-border px-2 py-0.5 rounded-sm ml-auto">
                      {formatTimeAgo(activeEvent.triggeredAt)}
                    </span>
                  </div>
                  <Button
                    data-ocid="admin.end_event.delete_button"
                    size="sm"
                    variant="outline"
                    onClick={handleEndEvent}
                    className="font-mono font-bold text-xs border-destructive/40 text-destructive hover:bg-destructive/10 transition-all"
                  >
                    🔴 End Event
                  </Button>
                </>
              ) : (
                <p className="font-mono text-sm text-muted-foreground">
                  No active event. Trigger one below.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Trigger New Event ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card
            data-ocid="admin.trigger_event.card"
            className="border border-border bg-card"
          >
            <CardHeader className="pb-3">
              <CardTitle className="font-mono text-sm text-foreground flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                Trigger New Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTriggerEvent} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">
                      Event Title *
                    </Label>
                    <Input
                      data-ocid="admin.event_title.input"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Weekend Bonus Blast!"
                      className="font-mono text-sm bg-secondary/20 border-border focus-visible:border-primary/60"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">
                      Description
                    </Label>
                    <Textarea
                      data-ocid="admin.event_description.textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Everyone gets double rewards this weekend!"
                      className="font-mono text-sm bg-secondary/20 border-border focus-visible:border-primary/60 min-h-[80px] resize-none"
                    />
                  </div>

                  <div>
                    <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">
                      ⚡ XP Reward
                    </Label>
                    <Input
                      data-ocid="admin.event_xp.input"
                      type="number"
                      min={0}
                      value={xp}
                      onChange={(e) => setXp(Number(e.target.value))}
                      className="font-mono text-sm bg-secondary/20 border-border focus-visible:border-primary/60"
                    />
                  </div>

                  <div>
                    <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">
                      🪙 Coins Reward
                    </Label>
                    <Input
                      data-ocid="admin.event_coins.input"
                      type="number"
                      min={0}
                      value={coins}
                      onChange={(e) => setCoins(Number(e.target.value))}
                      className="font-mono text-sm bg-secondary/20 border-border focus-visible:border-primary/60"
                    />
                  </div>

                  <div>
                    <Label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1.5 block">
                      💎 Gems Reward
                    </Label>
                    <Input
                      data-ocid="admin.event_gems.input"
                      type="number"
                      min={0}
                      value={gems}
                      onChange={(e) => setGems(Number(e.target.value))}
                      className="font-mono text-sm bg-secondary/20 border-border focus-visible:border-primary/60"
                    />
                  </div>
                </div>

                <Button
                  data-ocid="admin.trigger_event.primary_button"
                  type="submit"
                  className="font-mono font-bold text-sm gap-2 bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-neon-green transition-all"
                >
                  <Zap className="w-4 h-4" />
                  Trigger Event! 🎉
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Student Emails to Notify ─── */}
        {showEmails && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
          >
            <Card
              data-ocid="admin.email_list.panel"
              className="border border-primary/30 bg-card"
            >
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />📬 Student Emails to
                  Notify
                  <Badge className="ml-auto text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 px-2 py-0">
                    {registeredEmails.length} registered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  Since email is handled by your own service, copy these emails
                  and send your event notification manually.
                </p>

                {registeredEmails.length === 0 ? (
                  <p className="font-mono text-sm text-muted-foreground py-2">
                    No students have signed up yet.
                  </p>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
                      {registeredEmails.map((email) => (
                        <span
                          key={email}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/60 border border-border text-xs font-mono text-foreground"
                        >
                          <Mail className="w-3 h-3 text-primary opacity-70" />
                          {email}
                        </span>
                      ))}
                    </div>
                    <Button
                      data-ocid="admin.copy_emails.button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const csv = registeredEmails.join(", ");
                        void navigator.clipboard
                          .writeText(csv)
                          .then(() => {
                            toast.success(
                              `📋 Copied ${registeredEmails.length} email${registeredEmails.length !== 1 ? "s" : ""} to clipboard!`,
                            );
                          })
                          .catch(() => {
                            toast.error("Could not copy to clipboard.");
                          });
                      }}
                      className="font-mono font-bold text-xs gap-2 border-primary/30 text-primary hover:bg-primary/10 transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy All Emails
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* ─── Event History ─── */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Card
              data-ocid="admin.event_history.card"
              className="border border-border bg-card"
            >
              <CardHeader className="pb-3">
                <CardTitle className="font-mono text-sm text-foreground">
                  Event History ({history.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {history.map((event, idx) => (
                    <div
                      key={event.id}
                      data-ocid={`admin.history_event.item.${idx + 1}`}
                      className={`flex items-center justify-between p-3 rounded-md border text-xs font-mono ${
                        event.isActive
                          ? "border-accent/30 bg-accent/5 text-foreground"
                          : "border-border bg-secondary/20 text-muted-foreground"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-bold truncate ${event.isActive ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {event.isActive ? "🟢" : "⚫"} {event.title}
                        </p>
                        <p className="text-[10px] opacity-60 mt-0.5">
                          ⚡{event.xpReward} XP · 🪙{event.coinsReward} · 💎
                          {event.gemsReward}
                        </p>
                      </div>
                      <span className="ml-3 text-[10px] opacity-50 whitespace-nowrap">
                        {formatTimeAgo(event.triggeredAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div>
      {/* Header bar */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono font-bold text-sm text-primary tracking-widest">
              GUIDEME ADMIN
            </span>
            {unlocked && (
              <span className="ml-auto text-[10px] font-mono text-accent bg-accent/10 border border-accent/30 px-2 py-0.5 rounded-sm">
                AUTHENTICATED
              </span>
            )}
          </div>
        </div>
      </div>

      {unlocked ? (
        <AdminDashboard />
      ) : (
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      )}
    </div>
  );
}
