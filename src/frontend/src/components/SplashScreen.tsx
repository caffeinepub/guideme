import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useState } from "react";

const SPLASH_KEY = "guideme_splash_shown";

export default function SplashScreen() {
  // If already shown this session, render nothing immediately
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SPLASH_KEY) !== "1";
  });

  const [phase, setPhase] = useState<"in" | "bar" | "exit">("in");

  useEffect(() => {
    if (!visible) return;

    // Mark as shown for this session
    sessionStorage.setItem(SPLASH_KEY, "1");

    // Phase: bar fill starts at 1200ms
    const t1 = setTimeout(() => setPhase("bar"), 1200);
    // Phase: exit slide at 2500ms
    const t2 = setTimeout(() => setPhase("exit"), 2500);
    // Fully unmount after exit animation completes (600ms)
    const t3 = setTimeout(() => setVisible(false), 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible]);

  if (!visible) return null;

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.07,
        duration: 0.4,
        ease: "easeOut" as const,
      },
    }),
  };

  const guideLetters = "GUIDE".split("");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ y: 0 }}
          animate={{ y: phase === "exit" ? "-100%" : 0 }}
          transition={
            phase === "exit"
              ? { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
              : { duration: 0 }
          }
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "oklch(0.08 0.01 240)" }}
          aria-hidden="true"
        >
          {/* Scan-line grid overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 4px)",
            }}
          />

          {/* Ambient glow blobs */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{ background: "oklch(0.78 0.2 195 / 0.08)" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: "oklch(0.82 0.22 145 / 0.06)" }}
          />

          {/* Logo text */}
          <div className="relative flex items-end gap-0 select-none mb-6">
            {/* GUIDE — letter-by-letter stagger */}
            {guideLetters.map((letter, i) => (
              <motion.span
                // biome-ignore lint/suspicious/noArrayIndexKey: order is stable for splash letters
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="font-display font-extrabold text-6xl sm:text-7xl text-white leading-none"
                style={{
                  textShadow:
                    "0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.08)",
                }}
              >
                {letter}
              </motion.span>
            ))}

            {/* ME — neon cyan */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
              className="font-display font-extrabold text-6xl sm:text-7xl leading-none"
              style={{
                color: "oklch(0.78 0.2 195)",
                textShadow:
                  "0 0 30px oklch(0.78 0.2 195 / 0.6), 0 0 60px oklch(0.78 0.2 195 / 0.3)",
              }}
            >
              ME
            </motion.span>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="font-mono text-sm tracking-widest uppercase mb-8"
            style={{ color: "oklch(0.6 0.05 240)" }}
          >
            Your Smartest Bestie
          </motion.p>

          {/* Loading bar */}
          <div className="flex flex-col items-center gap-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "in" ? 0 : 0.5 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "oklch(0.5 0.04 240)" }}
            >
              Loading...
            </motion.p>

            <div
              className="w-48 h-0.5 rounded-full overflow-hidden"
              style={{ background: "oklch(0.15 0.02 240)" }}
            >
              <motion.div
                className="h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: phase !== "in" ? "100%" : "0%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  background: "oklch(0.78 0.2 195)",
                  boxShadow: "0 0 8px oklch(0.78 0.2 195 / 0.8)",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
