import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "@tanstack/react-router";
import { Mail, Menu, X, Zap } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { getTodayDateString, loadProgress } from "../utils/progressStore";
import EventBanner from "./EventBanner";

// ─── Email Sign-Up Modal ──────────────────────────────────────────────────────

const STUDENT_EMAIL_KEY = "guideme_student_email";
const REGISTERED_EMAILS_KEY = "guideme_registered_emails";
const DISMISS_PREFIX = "guideme_signup_dismissed_";

function getSignupDismissedKey(): string {
  // Key includes today's date so dismissal lasts until checked again
  return `${DISMISS_PREFIX}${getTodayDateString()}`;
}

function isSignupDismissedRecently(): boolean {
  // Check last 7 days for a dismiss key
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const key = `${DISMISS_PREFIX}${y}-${m}-${day}`;
    if (localStorage.getItem(key) === "1") return true;
  }
  return false;
}

function registerEmail(email: string): void {
  localStorage.setItem(STUDENT_EMAIL_KEY, email);
  try {
    const raw = localStorage.getItem(REGISTERED_EMAILS_KEY);
    const existing: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    if (!existing.includes(email)) {
      existing.push(email);
      localStorage.setItem(REGISTERED_EMAILS_KEY, JSON.stringify(existing));
    }
  } catch {
    localStorage.setItem(REGISTERED_EMAILS_KEY, JSON.stringify([email]));
  }
}

function EmailSignUpModal() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Don't show on /admin
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    // Already signed up
    if (localStorage.getItem(STUDENT_EMAIL_KEY)) return;
    // Dismissed recently
    if (isSignupDismissedRecently()) return;

    const timer = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(timer);
  }, [isAdmin]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Please enter your email address.");
      return;
    }
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Hmm, that doesn't look like a valid email. Try again!");
      return;
    }
    registerEmail(trimmed);
    setOpen(false);
    toast.success(
      "You're in! 🎉 We'll let you know when something awesome is happening.",
      {
        duration: 5000,
      },
    );
  }

  function handleDismiss() {
    localStorage.setItem(getSignupDismissedKey(), "1");
    setOpen(false);
  }

  if (isAdmin) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleDismiss();
      }}
    >
      <DialogContent
        data-ocid="signup.dialog"
        className="bg-card border-primary/40 shadow-neon-cyan max-w-sm"
        style={{
          boxShadow:
            "0 0 32px oklch(0.78 0.2 195 / 0.25), 0 4px 24px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        <DialogHeader className="text-center items-center pb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="font-display font-extrabold text-xl text-foreground leading-tight">
            Stay in the loop! 📬
          </DialogTitle>
        </DialogHeader>

        <p className="text-center text-sm font-mono text-muted-foreground leading-relaxed px-2 pb-2">
          Drop your email and we'll let you know when something{" "}
          <span className="text-primary font-bold">awesome</span> is happening —
          like live events with free gems! 💎
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div>
            <Input
              ref={inputRef}
              data-ocid="signup.email.input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={`font-mono text-sm bg-secondary/30 border-border focus-visible:border-primary/60 focus-visible:ring-primary/20 ${emailError ? "border-destructive/60" : ""}`}
              autoComplete="email"
            />
            {emailError && (
              <p className="text-xs font-mono text-destructive mt-1.5">
                {emailError}
              </p>
            )}
          </div>

          <Button
            data-ocid="signup.submit.primary_button"
            type="submit"
            className="w-full font-mono font-bold text-sm gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all"
          >
            <Mail className="w-4 h-4" />
            Sign Me Up! 🚀
          </Button>

          <button
            type="button"
            data-ocid="signup.dismiss.secondary_button"
            onClick={handleDismiss}
            className="w-full text-center text-xs font-mono text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            Maybe Later
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "🧠 Brain Lab", to: "/brain-lab" as const },
  { label: "📖 Learn", to: "/subject-helper" as const },
  { label: "🚀 My Progress", to: "/progress" as const },
  { label: "⚔️ Quests", to: "/quests" as const },
  { label: "🛒 Shop", to: "/shop" as const },
  { label: "Games", to: "/games" as const },
  { label: "Resources", to: "/resources" as const },
  { label: "About", to: "/about" as const },
  { label: "Analytics", to: "/analytics" as const },
];

interface LayoutProps {
  children: ReactNode;
}

function CurrencyDisplay() {
  const [state, setState] = useState(loadProgress);

  // Refresh on focus / every 3s to stay in sync
  useEffect(() => {
    function refresh() {
      setState(loadProgress());
    }
    window.addEventListener("focus", refresh);
    const interval = setInterval(refresh, 3000);
    return () => {
      window.removeEventListener("focus", refresh);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="hidden md:flex items-center gap-2 px-2">
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[oklch(0.78_0.18_60/0.1)] border border-[oklch(0.78_0.18_60/0.25)] text-[11px] font-mono font-bold text-[oklch(0.78_0.18_60)]">
        🪙 {state.coins}
      </span>
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[oklch(0.72_0.2_310/0.1)] border border-[oklch(0.72_0.2_310/0.25)] text-[11px] font-mono font-bold text-[oklch(0.72_0.2_310)]">
        💎 {state.gems}
      </span>
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Email sign-up modal (first-time visitors) */}
      <EmailSignUpModal />

      {/* Admin Event Banner */}
      <EventBanner />

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="GuideMe Home"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:shadow-neon-cyan transition-all duration-200">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-lg text-foreground tracking-tight">
                GuideMe
              </span>
              <span className="font-mono text-[10px] text-primary/60 font-medium tracking-widest uppercase">
                v2.0
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.${link.to.replace("/", "") || "home"}.link`}
                className={`px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium transition-all duration-150 ${
                  isActive(link.to)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Currency display */}
            <CurrencyDisplay />

            <Link to="/games" className="ml-1">
              <Button
                size="sm"
                className="rounded-md font-mono font-bold text-xs gap-1.5 bg-primary text-primary-foreground hover:shadow-neon-cyan hover:bg-primary/90 transition-all duration-200"
              >
                Play Now →
              </Button>
            </Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf8GlWYC7TlkAicB4BuNBNfxMnqdDzdZUvknI3y4ghw42AoYA/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-150"
            >
              📝 Feedback
            </a>
          </nav>

          {/* Mobile: currency + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-bold text-[oklch(0.78_0.18_60)]">
              🪙
            </span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-bold text-[oklch(0.72_0.2_310)]">
              💎
            </span>
            <button
              type="button"
              className="p-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav
            className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1 animate-fade-in"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-mono font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/games" onClick={() => setMobileOpen(false)}>
              <Button
                size="sm"
                className="mt-2 w-full rounded-md font-mono font-bold text-xs gap-1.5 bg-primary text-primary-foreground hover:shadow-neon-cyan transition-all duration-200"
              >
                Play Now →
              </Button>
            </Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf8GlWYC7TlkAicB4BuNBNfxMnqdDzdZUvknI3y4ghw42AoYA/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-1 px-3 py-2.5 rounded-md text-sm font-mono font-medium bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all text-center"
            >
              📝 Share Feedback
            </a>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-auto">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Zap className="w-3 h-3 text-primary" />
              </div>
              <span className="font-display font-bold text-sm text-foreground">
                GuideMe
              </span>
            </div>
            <p className="text-xs font-mono text-muted-foreground text-center">
              Built for curious minds. Powered by YOU.
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.hostname : "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Built with ♥ using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
