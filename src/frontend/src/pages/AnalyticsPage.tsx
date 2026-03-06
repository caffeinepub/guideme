import { T } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart3,
  Gamepad2,
  Globe,
  MousePointerClick,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import {
  usePageVisits,
  useTopGames,
  useTotalGameClicks,
  useTotalSiteVisits,
} from "../hooks/useQueries";

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  games: "Games",
  resources: "Resources",
  about: "About",
};

const PAGE_ICONS: Record<string, React.ElementType> = {
  home: Globe,
  games: Gamepad2,
  resources: BarChart3,
  about: TrendingUp,
};

const PAGE_COLORS: Record<string, { color: string; bar: string }> = {
  home: {
    color: "text-primary",
    bar: "bg-primary",
  },
  games: {
    color: "text-accent",
    bar: "bg-accent",
  },
  resources: {
    color: "text-[oklch(0.72_0.2_310)]",
    bar: "bg-[oklch(0.72_0.2_310)]",
  },
  about: {
    color: "text-[oklch(0.78_0.18_60)]",
    bar: "bg-[oklch(0.78_0.18_60)]",
  },
};

const CATEGORY_LABELS: Record<T, string> = {
  [T.arcade]: "Arcade",
  [T.puzzles]: "Puzzles",
  [T.strategy]: "Strategy",
};

const CATEGORY_COLORS: Record<T, { bg: string; text: string }> = {
  [T.arcade]: {
    bg: "bg-primary/10",
    text: "text-primary",
  },
  [T.puzzles]: {
    bg: "bg-[oklch(0.72_0.2_310/0.12)]",
    text: "text-[oklch(0.72_0.2_310)]",
  },
  [T.strategy]: {
    bg: "bg-[oklch(0.78_0.18_60/0.12)]",
    text: "text-[oklch(0.78_0.18_60)]",
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function StatCardSkeleton() {
  return (
    <Card className="rounded-lg border-border bg-card shadow-card">
      <CardContent className="p-5">
        <Skeleton className="h-3 w-32 mb-4 bg-secondary" />
        <Skeleton className="h-9 w-20 bg-secondary" />
      </CardContent>
    </Card>
  );
}

function PageBarSkeleton() {
  return (
    <div className="space-y-4">
      {["p1", "p2", "p3", "p4"].map((k) => (
        <div key={k} className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-md flex-shrink-0 bg-secondary" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-24 bg-secondary" />
            <Skeleton className="h-1.5 w-full bg-secondary" />
          </div>
          <Skeleton className="h-3 w-8 bg-secondary" />
        </div>
      ))}
    </div>
  );
}

const GAME_ROW_KEYS = ["gr1", "gr2", "gr3", "gr4", "gr5"];

function GameRowSkeleton() {
  return (
    <div className="space-y-0">
      {GAME_ROW_KEYS.map((k) => (
        <div
          key={k}
          className="flex items-center gap-3 py-3 px-4 border-b border-border last:border-0"
        >
          <Skeleton className="w-7 h-7 rounded-full flex-shrink-0 bg-secondary" />
          <div className="flex-1">
            <Skeleton className="h-3.5 w-40 bg-secondary" />
          </div>
          <Skeleton className="h-4 w-16 rounded-sm bg-secondary" />
          <Skeleton className="h-3.5 w-10 bg-secondary" />
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const { data: totalVisits, isLoading: visitsLoading } = useTotalSiteVisits();
  const { data: totalClicks, isLoading: clicksLoading } = useTotalGameClicks();
  const { data: pageVisits, isLoading: pageVisitsLoading } = usePageVisits();
  const { data: topGames, isLoading: topGamesLoading } = useTopGames(10n);

  const isLoading =
    visitsLoading || clicksLoading || pageVisitsLoading || topGamesLoading;

  // Build ordered page visit data
  const pageOrder = ["home", "games", "resources", "about"];
  const pageVisitMap = new Map<string, number>(
    (pageVisits ?? []).map(([page, count]) => [page, Number(count)]),
  );
  const pageData = pageOrder.map((page) => ({
    page,
    label: PAGE_LABELS[page] ?? page,
    count: pageVisitMap.get(page) ?? 0,
    Icon: PAGE_ICONS[page] ?? Globe,
    colors: PAGE_COLORS[page] ?? PAGE_COLORS.home,
  }));
  const maxPageVisits = Math.max(...pageData.map((p) => p.count), 1);

  // Baseline offsets to preserve historical counts across redeploys
  const BASELINE_VISITS = 202;
  const BASELINE_GAME_CLICKS = 47;

  const totalVisitsNum = Number(totalVisits ?? 0n) + BASELINE_VISITS;
  const totalClicksNum = Number(totalClicks ?? 0n) + BASELINE_GAME_CLICKS;
  const hasAnyData = totalVisitsNum > 0 || totalClicksNum > 0;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg pt-10 pb-12 px-4">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.78 0.2 195)" }}
        />
        <div className="container max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-5 uppercase tracking-widest">
              <BarChart3 className="w-3 h-3" />
              <span>Usage Analytics</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight mb-3">
              Activity Dashboard 📊
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Track how GuideMe is being used — page visits, game activity, and
              the most popular games across the platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="py-8 px-4">
        <div className="container max-w-6xl mx-auto space-y-8">
          {/* Empty state */}
          {!isLoading && !hasAnyData && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-14 bg-card border border-border rounded-lg"
            >
              <div className="w-12 h-12 rounded-md bg-secondary border border-border flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-muted-foreground" />
              </div>
              <h2 className="font-display font-semibold text-base text-foreground mb-2">
                No activity recorded yet
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto text-xs font-mono leading-relaxed">
                Visit some pages and play some games — your stats will appear
                here automatically.
              </p>
            </motion.div>
          )}

          {/* Top stat cards */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Summary statistics"
          >
            <h2 className="font-display font-bold text-base text-foreground mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Total site visits */}
              <motion.div variants={itemVariants}>
                {isLoading ? (
                  <StatCardSkeleton />
                ) : (
                  <Card className="rounded-lg shadow-card border border-border hover:border-primary/30 hover:shadow-neon-cyan/20 transition-all duration-200">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-medium text-muted-foreground mb-1">
                          Total Site Visits
                        </p>
                        <p className="font-display font-extrabold text-3xl text-foreground tabular-nums neon-glow">
                          {totalVisitsNum.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                          Pages loaded across GuideMe
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>

              {/* Total game clicks */}
              <motion.div variants={itemVariants}>
                {isLoading ? (
                  <StatCardSkeleton />
                ) : (
                  <Card className="rounded-lg shadow-card border border-border hover:border-accent/30 hover:shadow-neon-green/20 transition-all duration-200">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                        <MousePointerClick className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs font-mono font-medium text-muted-foreground mb-1">
                          Total Game Clicks
                        </p>
                        <p
                          className="font-display font-extrabold text-3xl text-accent tabular-nums"
                          style={{
                            textShadow: "0 0 12px oklch(0.82 0.22 145 / 0.5)",
                          }}
                        >
                          {totalClicksNum.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                          Games launched from the platform
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            </div>
          </motion.section>

          {/* Page visits breakdown */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            aria-label="Page visit breakdown"
          >
            <h2 className="font-display font-bold text-base text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Page Visits
            </h2>
            <Card className="rounded-lg shadow-card border border-border">
              <CardContent className="p-5">
                {isLoading ? (
                  <PageBarSkeleton />
                ) : (
                  <div className="space-y-4">
                    {pageData.map((item) => {
                      const pct =
                        maxPageVisits > 0
                          ? (item.count / maxPageVisits) * 100
                          : 0;
                      return (
                        <div
                          key={item.page}
                          className="flex items-center gap-3 group"
                        >
                          <div className="w-8 h-8 rounded-md bg-secondary/60 border border-border flex items-center justify-center flex-shrink-0">
                            <item.Icon
                              className={`w-3.5 h-3.5 ${item.colors.color}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-mono font-medium text-foreground">
                                {item.label}
                              </span>
                              <span className="text-xs font-mono font-bold text-foreground tabular-nums ml-3">
                                {item.count.toLocaleString()}
                              </span>
                            </div>
                            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${item.colors.bar}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{
                                  duration: 0.7,
                                  ease: "easeOut",
                                  delay: 0.2,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.section>

          {/* Most played games leaderboard */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            aria-label="Most played games leaderboard"
          >
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-display font-bold text-base text-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[oklch(0.78_0.18_60)]" />
                Most Played Games
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold">
                Top 10
              </span>
            </div>

            <Card className="rounded-lg shadow-card border border-border overflow-hidden">
              {isLoading ? (
                <CardContent className="p-0">
                  <GameRowSkeleton />
                </CardContent>
              ) : !topGames || topGames.length === 0 ? (
                <CardContent className="py-12 text-center">
                  <Gamepad2 className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-20" />
                  <p className="text-xs font-mono font-medium text-muted-foreground">
                    No games played yet
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                    Click "Play Now →" on a game to see it appear here.
                  </p>
                </CardContent>
              ) : (
                <div className="divide-y divide-border">
                  {topGames.map((game, index) => {
                    const catColors =
                      CATEGORY_COLORS[game.category] ??
                      CATEGORY_COLORS[T.arcade];
                    const catLabel =
                      CATEGORY_LABELS[game.category] ?? game.category;
                    const isTop3 = index < 3;
                    const medalColors = [
                      "text-[oklch(0.78_0.18_60)]",
                      "text-muted-foreground",
                      "text-[oklch(0.72_0.18_40)]",
                    ];

                    return (
                      <motion.div
                        key={game.gameId}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.3 + index * 0.05,
                        }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors"
                      >
                        {/* Rank */}
                        <div
                          className={`w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold tabular-nums ${
                            isTop3
                              ? `${catColors.bg} ${catColors.text}`
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {isTop3 ? (
                            <Trophy
                              className={`w-3 h-3 ${medalColors[index]}`}
                            />
                          ) : (
                            index + 1
                          )}
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate font-mono">
                            {game.title}
                          </p>
                        </div>

                        {/* Category badge */}
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-semibold flex-shrink-0 ${catColors.bg} ${catColors.text}`}
                        >
                          {catLabel}
                        </span>

                        {/* Click count */}
                        <div className="text-right flex-shrink-0 min-w-[3rem]">
                          <p className="text-xs font-mono font-bold text-foreground tabular-nums">
                            {Number(game.clickCount).toLocaleString()}
                          </p>
                          <p className="text-[10px] text-muted-foreground leading-none mt-0.5 font-mono">
                            {Number(game.clickCount) === 1 ? "play" : "plays"}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
