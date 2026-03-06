import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ─── Confetti Context ─────────────────────────────────────────────────────────

interface ConfettiContextType {
  triggerConfetti: (message?: string) => void;
}

const ConfettiContext = createContext<ConfettiContextType>({
  triggerConfetti: () => {},
});

export function useConfetti() {
  return useContext(ConfettiContext);
}

// ─── Confetti particles config ────────────────────────────────────────────────

const EMOJIS = [
  "🎉",
  "⭐",
  "🌟",
  "✨",
  "🎊",
  "🏆",
  "💎",
  "🪙",
  "🔥",
  "💫",
  "🎯",
  "🚀",
];

const COLORS = [
  "oklch(0.78 0.2 195)", // neon cyan
  "oklch(0.82 0.22 145)", // electric green
  "oklch(0.78 0.18 60)", // gold
  "oklch(0.72 0.2 310)", // purple
  "oklch(0.72 0.2 340)", // pink
  "oklch(0.75 0.2 255)", // blue
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  type: "emoji" | "square";
  emoji?: string;
  color?: string;
  opacity: number;
}

// ─── Confetti Overlay ─────────────────────────────────────────────────────────

function ConfettiOverlayInner({
  show,
  message,
  onHide,
}: {
  show: boolean;
  message: string;
  onHide: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    startTimeRef.current = performance.now();

    // Generate particles
    const count = 40;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    particlesRef.current = Array.from({ length: count }, (_, i) => {
      const isEmoji = i % 3 === 0;
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 6 + Math.random() * 10;
      return {
        id: i,
        x: cx + (Math.random() - 0.5) * 80,
        y: cy + (Math.random() - 0.5) * 80,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        scale: 0.8 + Math.random() * 0.8,
        type: isEmoji ? "emoji" : "square",
        emoji: isEmoji
          ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
          : undefined,
        color: !isEmoji
          ? COLORS[Math.floor(Math.random() * COLORS.length)]
          : undefined,
        opacity: 1,
      };
    });

    const DURATION = 2500;

    function animate(now: number) {
      if (!ctx || !canvas) return;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.rotationSpeed;
        // Fade out in last 40%
        p.opacity = progress > 0.6 ? 1 - (progress - 0.6) / 0.4 : 1;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === "emoji" && p.emoji) {
          ctx.font = `${Math.round(28 * p.scale)}px serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.emoji, 0, 0);
        } else if (p.color) {
          const size = Math.round(12 * p.scale);
          ctx.fillStyle = p.color;
          ctx.fillRect(-size / 2, -size / 2, size, size);
        }

        ctx.restore();
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onHide();
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
      aria-live="polite"
      aria-atomic="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {message && (
        <div className="relative z-10 px-6 py-4 rounded-xl bg-card/90 backdrop-blur-md border border-primary/40 shadow-neon-cyan text-center animate-fade-in max-w-sm mx-4">
          <p className="font-display font-extrabold text-lg text-primary neon-glow">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Confetti Provider ────────────────────────────────────────────────────────

export function ConfettiProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerConfetti = useCallback((msg = "") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMessage(msg);
    setShow(true);
    // Auto-hide handled by animation completion, but also set a safety timeout
    timeoutRef.current = setTimeout(() => setShow(false), 3000);
  }, []);

  const handleHide = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <ConfettiContext.Provider value={{ triggerConfetti }}>
      {children}
      <ConfettiOverlayInner show={show} message={message} onHide={handleHide} />
    </ConfettiContext.Provider>
  );
}
