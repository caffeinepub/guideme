import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Calculator,
  ExternalLink,
  FlaskConical,
  Globe,
  Heart,
  Lightbulb,
  RefreshCw,
  Search,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  BADGES,
  addXP,
  completeQuest,
  getTodayDateString,
  recordActivity,
} from "../utils/progressStore";

// ─── Types ────────────────────────────────────────────────────────────────────

type Subject =
  | "math"
  | "science"
  | "english"
  | "generalKnowledge"
  | "wellbeing";

// Wikipedia API response types
interface WikiSearchResult {
  title: string;
  snippet: string;
  pageid: number;
}

interface WikiSearchResponse {
  query: {
    search: WikiSearchResult[];
  };
}

interface WikiSummaryResponse {
  title: string;
  extract: string;
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
}

interface WikiResult {
  title: string;
  extract: string;
  articleUrl: string;
  related: { title: string; snippet: string; url: string }[];
  searchQuery: string;
}

// ─── Subject config ───────────────────────────────────────────────────────────

const SUBJECTS: {
  id: Subject;
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  resourcePath: string;
  placeholder: string;
  tagline: string;
}[] = [
  {
    id: "math",
    label: "Mathematics",
    icon: Calculator,
    color: "text-[oklch(0.75_0.2_255)]",
    bg: "bg-[oklch(0.75_0.2_255/0.1)]",
    border: "border-[oklch(0.75_0.2_255/0.4)]",
    resourcePath: "/resources",
    placeholder:
      "e.g. how do I solve equations with two unknowns? or what is Pythagoras theorem?",
    tagline: "Numbers, equations & more",
  },
  {
    id: "science",
    label: "Science",
    icon: FlaskConical,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/40",
    resourcePath: "/resources",
    placeholder:
      "e.g. how does photosynthesis work? or what are Newton's laws?",
    tagline: "Biology, physics, chemistry",
  },
  {
    id: "english",
    label: "English",
    icon: BookOpenText,
    color: "text-[oklch(0.78_0.18_60)]",
    bg: "bg-[oklch(0.78_0.18_60/0.1)]",
    border: "border-[oklch(0.78_0.18_60/0.4)]",
    resourcePath: "/resources",
    placeholder:
      "e.g. when do I use its vs it's? or how do I structure an essay?",
    tagline: "Grammar, writing & literature",
  },
  {
    id: "generalKnowledge",
    label: "General Knowledge",
    icon: Globe,
    color: "text-[oklch(0.72_0.2_310)]",
    bg: "bg-[oklch(0.72_0.2_310/0.1)]",
    border: "border-[oklch(0.72_0.2_310/0.4)]",
    resourcePath: "/resources",
    placeholder:
      "e.g. what caused World War 2? or how many continents are there?",
    tagline: "History, geography & culture",
  },
  {
    id: "wellbeing",
    label: "Wellbeing",
    icon: Heart,
    color: "text-[oklch(0.72_0.2_340)]",
    bg: "bg-[oklch(0.72_0.2_340/0.1)]",
    border: "border-[oklch(0.72_0.2_340/0.4)]",
    resourcePath: "/resources",
    placeholder: "e.g. how do I deal with exam stress? or what is anxiety?",
    tagline: "Mental health & study tips",
  },
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

// Subject → context keyword mapping for smarter search queries
const SUBJECT_CONTEXT: Record<Subject, string> = {
  math: "mathematics",
  science: "science",
  english: "english language",
  generalKnowledge: "",
  wellbeing: "mental health",
};

// Filler words to strip before building search query
const FILLER_WORDS = new Set([
  "how",
  "why",
  "what",
  "when",
  "where",
  "who",
  "which",
  "do",
  "does",
  "did",
  "i",
  "is",
  "are",
  "was",
  "were",
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "about",
  "don't",
  "dont",
  "get",
  "understand",
  "explain",
  "tell",
  "me",
  "us",
  "my",
  "can",
  "could",
  "would",
  "should",
  "will",
  "be",
  "have",
  "has",
  "had",
  "its",
  "it",
  "this",
  "that",
  "these",
  "those",
  "so",
  "if",
  "not",
  "no",
  "yes",
  "just",
  "really",
  "very",
  "much",
  "more",
  "most",
  "some",
  "any",
  "all",
  "both",
  "each",
  "few",
  "many",
  "same",
  "than",
  "too",
  "also",
  "like",
  "work",
  "works",
]);

// ─── Wikipedia API ────────────────────────────────────────────────────────────

function buildSearchQuery(subject: Subject, problem: string): string {
  const words = problem
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !FILLER_WORDS.has(w));

  const keyTerms = words.slice(0, 5).join(" ");
  const context = SUBJECT_CONTEXT[subject];
  return context
    ? `${keyTerms} ${context}`.trim()
    : keyTerms.trim() || problem.trim();
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

function truncateExtract(extract: string, maxChars = 400): string {
  if (extract.length <= maxChars) return extract;
  const truncated = extract.slice(0, maxChars);
  const lastDot = truncated.lastIndexOf(".");
  return lastDot > 0 ? truncated.slice(0, lastDot + 1) : `${truncated}…`;
}

// ─── Kid-friendly text transformer ───────────────────────────────────────────

const SUBJECT_EMOJI_INTRO: Record<Subject, string> = {
  math: "🔢 Here's the deal! ",
  science: "🔬 Cool science fact! ",
  english: "✏️ Let's break it down! ",
  generalKnowledge: "🌍 Fun fact! ",
  wellbeing: "💙 Good to know! ",
};

const SUBJECT_EMOJIS: Record<Subject, string[]> = {
  math: ["✨", "💡", "🧮", "📐"],
  science: ["🧪", "🌱", "⚡", "🔭"],
  english: ["📖", "💬", "✍️", "🌟"],
  generalKnowledge: ["🌍", "📜", "🗺️", "💡"],
  wellbeing: ["💙", "🌈", "✨", "🤝"],
};

const WORD_REPLACEMENTS: [string | RegExp, string][] = [
  [/\btherefore\b/gi, "so"],
  [/\bfurthermore\b/gi, "also"],
  [/\bhowever\b/gi, "but"],
  [/\bapproximately\b/gi, "about"],
  [/\butilise\b/gi, "use"],
  [/\butilize\b/gi, "use"],
  [/\bdemonstrate\b/gi, "show"],
  [/\bobtain\b/gi, "get"],
  [/\bsubsequently\b/gi, "then"],
  [/\bconsequently\b/gi, "so"],
  [/\bsufficient\b/gi, "enough"],
  [/\bindicate\b/gi, "mean"],
  [/\breferred to as\b/gi, "called"],
  [/\bis defined as\b/gi, "means"],
];

function makeKidFriendly(extract: string, subject: Subject): string {
  // 1. Split into sentences and take up to 5
  const sentences = extract
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);
  const limited = sentences.slice(0, 5).join(". ").trim();

  // 2. Replace hard words with simpler ones
  let text = limited;
  for (const [pattern, replacement] of WORD_REPLACEMENTS) {
    text = text.replace(pattern, replacement);
  }

  // 3. Add subject emoji intro
  const intro = SUBJECT_EMOJI_INTRO[subject];
  text = intro + text;

  // 4. Sprinkle 2-3 emojis throughout
  const emojis = SUBJECT_EMOJIS[subject];
  const pick = (i: number) => emojis[i % emojis.length];

  // Insert one emoji after ~25% of text and one after ~60%
  const quarter = Math.floor(text.length * 0.25);
  const middle = Math.floor(text.length * 0.6);

  // Find nearest sentence boundary
  const insertAfterSpace = (str: string, pos: number): number => {
    // Find the next space after pos
    const idx = str.indexOf(" ", pos);
    return idx > -1 ? idx : pos;
  };

  const pos1 = insertAfterSpace(text, quarter);
  const pos2 = insertAfterSpace(text, middle);

  if (text.length > 200) {
    text = `${text.slice(0, pos1)} ${pick(1)} ${text.slice(pos1 + 1)}`;
    // Recalculate pos2 after insertion
    const adjustedPos2 = pos2 + 3; // account for " 🧮 " addition
    text = `${text.slice(0, adjustedPos2)} ${pick(2)} ${text.slice(adjustedPos2 + 1)}`;
  }

  // 5. Add encouraging sign-off
  if (!text.endsWith(".")) {
    text += ".";
  }
  text += " You're doing amazing, keep it up! 🌟";

  return text;
}

async function searchWikipedia(
  subject: Subject,
  problem: string,
): Promise<WikiResult> {
  const query = buildSearchQuery(subject, problem);

  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=3`;

  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) throw new Error("Wikipedia search failed");

  const searchData: WikiSearchResponse = await searchRes.json();
  const results = searchData.query?.search ?? [];

  if (results.length === 0) {
    throw new Error("NO_RESULTS");
  }

  const topResult = results[0];
  const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topResult.title)}`;

  const summaryRes = await fetch(summaryUrl);
  if (!summaryRes.ok) throw new Error("Wikipedia summary failed");

  const summary: WikiSummaryResponse = await summaryRes.json();

  const articleUrl =
    summary.content_urls?.desktop?.page ??
    `https://en.wikipedia.org/wiki/${encodeURIComponent(topResult.title)}`;

  const related = results.slice(1).map((r) => ({
    title: r.title,
    snippet: stripHtml(r.snippet),
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(r.title)}`,
  }));

  return {
    title: summary.title,
    extract: truncateExtract(summary.extract ?? ""),
    articleUrl,
    related,
    searchQuery: query,
  };
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-2">
      {steps.map((stepNum) => (
        <div key={stepNum} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-300 ${
              stepNum < current
                ? "bg-primary/30 text-primary border border-primary/40"
                : stepNum === current
                  ? "bg-primary text-primary-foreground shadow-neon-cyan"
                  : "bg-secondary border border-border text-muted-foreground"
            }`}
          >
            {stepNum < current ? "✓" : stepNum}
          </div>
          {stepNum < total && (
            <div
              className={`h-px w-6 transition-all duration-300 ${stepNum < current ? "bg-primary/50" : "bg-border"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Searching indicator ──────────────────────────────────────────────────────

function SearchingIndicator({ query }: { query: string }) {
  return (
    <motion.div
      data-ocid="subject_helper.loading_state"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-start gap-5 py-10"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
        >
          <Search className="w-5 h-5 text-primary" />
        </motion.div>
        <div>
          <p className="font-mono font-bold text-sm text-primary">
            Searching for answers...
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-0.5 truncate max-w-xs">
            Searching: <span className="text-primary/70">{query || "…"}</span>
          </p>
        </div>
      </div>
      <div className="space-y-3 w-full max-w-md">
        {(
          [
            { w: 80, delay: 0 },
            { w: 60, delay: 0.2 },
            { w: 70, delay: 0.4 },
          ] as const
        ).map(({ w, delay }) => (
          <motion.div
            key={w}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{
              duration: 1.4,
              repeat: Number.POSITIVE_INFINITY,
              delay,
              ease: "easeInOut",
            }}
            className="h-3 rounded-full bg-primary/15 border border-primary/10"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────

function SearchError({
  noResults,
  onTryAgain,
}: {
  noResults: boolean;
  onTryAgain: () => void;
}) {
  return (
    <motion.div
      data-ocid="subject_helper.error_state"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-10 flex flex-col items-start gap-5"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
          <WifiOff className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <p className="font-mono font-bold text-sm text-destructive">
            {noResults ? "Nothing found" : "Search failed"}
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-0.5">
            {noResults
              ? "Try rephrasing — be more specific"
              : "Connection issue, please try again"}
          </p>
        </div>
      </div>

      <Card className="border border-destructive/20 bg-card max-w-md">
        <CardContent className="p-5">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {noResults
              ? 'Nothing found for that. Try rephrasing your question — be more specific, like "photosynthesis" instead of "how plants work".'
              : "There was a problem connecting. Check your internet connection and try again."}
          </p>
        </CardContent>
      </Card>

      <Button
        data-ocid="subject_helper.try_again_button"
        onClick={onTryAgain}
        variant="outline"
        size="sm"
        className="rounded-md font-mono font-bold text-xs gap-2 border-border hover:border-primary/40 hover:bg-secondary/60 transition-all duration-150"
      >
        <RefreshCw className="w-3 h-3" />
        Try again
      </Button>
    </motion.div>
  );
}

// ─── YouTube links ────────────────────────────────────────────────────────────

const YOUTUBE_LINKS: Record<
  Subject,
  { title: string; channel: string; url: string }[]
> = {
  math: [
    {
      title: "Maths explained simply",
      channel: "Khan Academy",
      url: "https://www.youtube.com/@khanacademy",
    },
    {
      title: "Beautiful maths",
      channel: "3Blue1Brown",
      url: "https://www.youtube.com/@3blue1brown",
    },
    {
      title: "Fun number stuff",
      channel: "Numberphile",
      url: "https://www.youtube.com/@numberphile",
    },
  ],
  science: [
    {
      title: "Science made fun",
      channel: "Kurzgesagt",
      url: "https://www.youtube.com/@kurzgesagt",
    },
    {
      title: "Science experiments",
      channel: "Mark Rober",
      url: "https://www.youtube.com/@MarkRober",
    },
    {
      title: "Physics & chemistry",
      channel: "SciShow",
      url: "https://www.youtube.com/@scishow",
    },
  ],
  english: [
    {
      title: "Grammar & writing tips",
      channel: "English with Lucy",
      url: "https://www.youtube.com/@EnglishwithLucy",
    },
    {
      title: "Literature breakdowns",
      channel: "SparkNotes",
      url: "https://www.youtube.com/@sparknotes",
    },
    {
      title: "Vocabulary building",
      channel: "TED-Ed English",
      url: "https://www.youtube.com/@TED-Ed",
    },
  ],
  generalKnowledge: [
    {
      title: "History & facts",
      channel: "TED-Ed",
      url: "https://www.youtube.com/@TED-Ed",
    },
    {
      title: "World geography",
      channel: "Geography Now",
      url: "https://www.youtube.com/@GeographyNow",
    },
    {
      title: "Amazing world facts",
      channel: "Wendover Productions",
      url: "https://www.youtube.com/@Wendover",
    },
  ],
  wellbeing: [
    {
      title: "Mental health for teens",
      channel: "Psych2Go",
      url: "https://www.youtube.com/@Psych2Go",
    },
    {
      title: "Mindfulness & calm",
      channel: "Headspace",
      url: "https://www.youtube.com/@Headspace",
    },
    {
      title: "Study tips & motivation",
      channel: "Mike and Matty",
      url: "https://www.youtube.com/@mikeandmatty",
    },
  ],
};

// ─── Wiki result card ─────────────────────────────────────────────────────────

function WikiResultCard({
  result,
  userQuestion,
  subjectConfig,
}: {
  result: WikiResult;
  userQuestion: string;
  subjectConfig: (typeof SUBJECTS)[0];
}) {
  const Icon = subjectConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Topic badge */}
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm ${subjectConfig.bg} ${subjectConfig.border} border text-xs font-mono font-bold ${subjectConfig.color}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {result.title}
      </div>

      {/* User's question echo */}
      <div className="bg-secondary/30 border border-border rounded-md px-4 py-3">
        <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
          You asked:
        </p>
        <p className="text-sm text-foreground/80 italic leading-relaxed">
          "{userQuestion}"
        </p>
      </div>

      {/* Main answer */}
      <Card className="border border-border bg-card shadow-card">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <h3 className="font-mono font-bold text-xs text-primary uppercase tracking-widest">
              {result.title}
            </h3>
          </div>
          <p className="text-foreground text-sm leading-relaxed">
            {result.extract}
          </p>

          {/* Read full article link */}
          <a
            data-ocid="subject_helper.full_article_link"
            href={result.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordActivity()}
            className={`inline-flex items-center gap-1.5 mt-4 text-xs font-mono font-bold ${subjectConfig.color} hover:underline transition-all`}
          >
            Read full article →
            <ExternalLink className="w-3 h-3" />
          </a>
        </CardContent>
      </Card>

      {/* Related results */}
      {result.related.length > 0 && (
        <div className="space-y-2">
          <p className="font-mono font-bold text-xs text-muted-foreground uppercase tracking-widest px-1">
            Related results
          </p>
          {result.related.map((rel, idx) => (
            <a
              key={rel.title}
              data-ocid={`subject_helper.related_result.${idx + 1}`}
              href={rel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="border border-border bg-card/60 hover:bg-card hover:border-primary/30 transition-all duration-150 cursor-pointer shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-mono font-bold text-xs mb-1 ${subjectConfig.color}`}
                      >
                        {rel.title}
                      </p>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                        {rel.snippet}
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}

      {/* YouTube links */}
      <div
        data-ocid="subject_helper.youtube_links.section"
        className="space-y-2"
      >
        <p className="font-mono font-bold text-xs text-muted-foreground uppercase tracking-widest px-1">
          🎬 Watch &amp; Learn
        </p>
        <div className="space-y-2">
          {YOUTUBE_LINKS[subjectConfig.id].map((video, idx) => (
            <a
              key={video.url}
              data-ocid={`subject_helper.youtube_link.${idx + 1}`}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-md border border-border bg-card/60 hover:border-red-500/40 hover:bg-card transition-all duration-150 group"
            >
              {/* YouTube play icon */}
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 flex items-center justify-center"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 10 10"
                  className="w-3 h-3 fill-white ml-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <polygon points="2,1 9,5 2,9" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono font-bold text-foreground leading-tight truncate">
                  {video.title}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5 truncate">
                  {video.channel}
                </p>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-red-500/70 flex-shrink-0 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Resources link */}
      <div className="flex flex-wrap gap-3 pt-1">
        <Link to={subjectConfig.resourcePath as "/"}>
          <Button
            data-ocid="subject_helper.see_resources_button"
            size="sm"
            className="rounded-md font-mono font-bold text-xs gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all duration-200"
          >
            See Resources →
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SubjectHelperPage() {
  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [customClass, setCustomClass] = useState("");
  const [problem, setProblem] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<WikiResult | null>(null);
  const [error, setError] = useState<"no_results" | "network" | null>(null);

  // Mark subject helper quest activity as visited today
  useEffect(() => {
    const today = getTodayDateString();
    localStorage.setItem(`guideme_quest_visited_subjecthelper_${today}`, "1");
  }, []);

  const subjectConfig = SUBJECTS.find((s) => s.id === selectedSubject) ?? null;

  function handleSubjectSelect(id: Subject) {
    setSelectedSubject(id);
    setStep(2);
  }

  function handleClassSubmit() {
    if (selectedClass || customClass.trim()) setStep(3);
  }

  async function handleProblemSubmit() {
    if (!selectedSubject || !problem.trim()) return;

    const query = buildSearchQuery(selectedSubject, problem);
    setSearchQuery(query);
    setIsSearching(true);
    setResult(null);
    setError(null);
    setStep(4);

    // Ensure minimum 800ms loading display
    const [wikiResult] = await Promise.allSettled([
      searchWikipedia(selectedSubject, problem),
      new Promise<void>((resolve) => setTimeout(resolve, 800)),
    ]);

    setIsSearching(false);

    if (wikiResult.status === "fulfilled") {
      const raw = wikiResult.value;
      // Transform to kid-friendly language
      const kidFriendlyExtract = makeKidFriendly(raw.extract, selectedSubject);
      const transformedResult = { ...raw, extract: kidFriendlyExtract };
      setResult(transformedResult);

      // Award XP for math, science, english
      if (
        selectedSubject === "math" ||
        selectedSubject === "science" ||
        selectedSubject === "english"
      ) {
        const { newLevel, prevLevel, newBadges } = addXP(selectedSubject, 5);
        recordActivity();
        if (newLevel > prevLevel) {
          toast.success(
            `🎉 Level Up! You're now Level ${newLevel}! Keep it up, you're crushing it!`,
            { duration: 4000 },
          );
        }
        for (const badge of newBadges) {
          const found = BADGES.find((b) => b.label === badge);
          if (found) {
            toast(`🏅 New Badge: ${found.label}! ${found.desc}`, {
              icon: "🏅",
              duration: 4000,
            });
          }
        }
      } else {
        // Still record activity for non-XP subjects
        recordActivity();
      }

      // Quest completion: daily_answer_question
      const questDone = completeQuest("daily_answer_question", false);
      if (questDone) {
        toast("📖 Quest progress! Head to Quests to claim your reward!", {
          icon: "⚔️",
          duration: 4000,
        });
      }
    } else {
      const err = wikiResult.reason as Error;
      setError(err.message === "NO_RESULTS" ? "no_results" : "network");
    }
  }

  function handleStartOver() {
    setStep(1);
    setSelectedSubject(null);
    setSelectedClass("");
    setCustomClass("");
    setProblem("");
    setResult(null);
    setError(null);
    setIsSearching(false);
    setSearchQuery("");
  }

  function handleTryAgain() {
    setStep(3);
    setProblem("");
    setResult(null);
    setError(null);
    setIsSearching(false);
    setSearchQuery("");
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg pt-10 pb-12 px-4">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.78 0.2 195)" }}
        />
        <div className="container max-w-3xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-5 uppercase tracking-widest">
              <Search className="w-3 h-3" />
              <span>Subject Helper</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight mb-3">
              Stuck on something? 🧠
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              Ask your bestie anything — get the real answer, not a canned
              response. Type your question and get actual knowledge instantly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stepper content */}
      <div className="py-10 px-4">
        <div className="container max-w-3xl mx-auto">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-8">
            <StepIndicator current={step} total={4} />
            {step > 1 && (
              <button
                type="button"
                data-ocid="subject_helper.start_over_button"
                onClick={handleStartOver}
                className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" /> Start over
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* ── Step 1: Choose subject ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-display font-bold text-xl text-foreground mb-6">
                  Which subject do you need help with?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SUBJECTS.map((subject) => {
                    const Icon = subject.icon;
                    return (
                      <button
                        type="button"
                        key={subject.id}
                        data-ocid={`subject_helper.${subject.id}.button`}
                        onClick={() => handleSubjectSelect(subject.id)}
                        className={`group p-5 rounded-lg border ${subject.border} ${subject.bg} text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                      >
                        <div
                          className={`w-9 h-9 rounded-md bg-card border ${subject.border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
                        >
                          <Icon className={`w-4 h-4 ${subject.color}`} />
                        </div>
                        <p
                          className={`font-display font-bold text-sm ${subject.color}`}
                        >
                          {subject.label}
                        </p>
                        <p className="text-muted-foreground text-xs font-mono mt-1">
                          {subject.tagline}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Choose class ── */}
            {step === 2 && subjectConfig && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-lg"
              >
                <div
                  className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-sm ${subjectConfig.bg} ${subjectConfig.border} border text-xs font-mono font-bold ${subjectConfig.color} mb-5`}
                >
                  <subjectConfig.icon className="w-3 h-3" />
                  {subjectConfig.label}
                </div>
                <h2 className="font-display font-bold text-xl text-foreground mb-2">
                  What year or class are you in?
                </h2>
                <p className="text-muted-foreground text-sm mb-6 font-mono">
                  This helps tailor the answer to your level.
                </p>

                <div className="space-y-2 mb-4">
                  {CLASS_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      data-ocid="subject_helper.class_select.button"
                      onClick={() => setSelectedClass(opt)}
                      className={`w-full text-left px-4 py-3 rounded-md border text-sm font-mono transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        selectedClass === opt
                          ? `${subjectConfig.bg} ${subjectConfig.border} ${subjectConfig.color} font-bold`
                          : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-secondary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground font-mono">
                    or type your own
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <Input
                  data-ocid="subject_helper.class_input"
                  placeholder="e.g. Grade 9, Form 3, Class 10..."
                  value={customClass}
                  onChange={(e) => {
                    setCustomClass(e.target.value);
                    setSelectedClass("");
                  }}
                  className="font-mono text-sm bg-card border-border mb-6 focus-visible:border-primary/60 focus-visible:ring-primary/20"
                />

                <Button
                  data-ocid="subject_helper.class_next_button"
                  onClick={handleClassSubmit}
                  disabled={!selectedClass && !customClass.trim()}
                  className="rounded-md font-mono font-bold text-sm gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all duration-200 disabled:opacity-40"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}

            {/* ── Step 3: Describe problem ── */}
            {step === 3 && subjectConfig && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-lg"
              >
                <div
                  className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-sm ${subjectConfig.bg} ${subjectConfig.border} border text-xs font-mono font-bold ${subjectConfig.color} mb-5`}
                >
                  <subjectConfig.icon className="w-3 h-3" />
                  {subjectConfig.label} · {selectedClass || customClass}
                </div>
                <h2 className="font-display font-bold text-xl text-foreground mb-2">
                  What are you struggling with?
                </h2>
                <p className="text-muted-foreground text-sm mb-6 font-mono">
                  Describe it in your own words — we'll search live for the real
                  answer. Be specific!
                </p>

                <Textarea
                  data-ocid="subject_helper.problem_input"
                  placeholder={subjectConfig.placeholder}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      (e.ctrlKey || e.metaKey) &&
                      problem.trim()
                    ) {
                      void handleProblemSubmit();
                    }
                  }}
                  className="font-mono text-sm bg-card border-border mb-4 min-h-[120px] focus-visible:border-primary/60 focus-visible:ring-primary/20 resize-none"
                />

                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-6">
                  <Search className="w-3 h-3" />
                  Results are searched live. Ctrl+Enter to submit.
                </div>

                <Button
                  data-ocid="subject_helper.solve_button"
                  onClick={() => void handleProblemSubmit()}
                  disabled={!problem.trim()}
                  className="rounded-md font-mono font-bold text-sm gap-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-neon-cyan transition-all duration-200 disabled:opacity-40"
                >
                  <Search className="w-4 h-4" />
                  Search →
                </Button>
              </motion.div>
            )}

            {/* ── Step 4: Searching + Result ── */}
            {step === 4 && subjectConfig && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-muted-foreground text-xs font-mono mb-1">
                      {subjectConfig.label} · {selectedClass || customClass}
                    </p>
                    <h2 className="font-display font-bold text-xl text-foreground">
                      {isSearching
                        ? "Searching..."
                        : error
                          ? "Couldn't find that"
                          : "Here's what we found 🤝"}
                    </h2>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isSearching ? (
                    <SearchingIndicator key="searching" query={searchQuery} />
                  ) : error ? (
                    <SearchError
                      key="error"
                      noResults={error === "no_results"}
                      onTryAgain={handleTryAgain}
                    />
                  ) : result ? (
                    <WikiResultCard
                      key="result"
                      result={result}
                      userQuestion={problem}
                      subjectConfig={subjectConfig}
                    />
                  ) : null}
                </AnimatePresence>

                {/* Try again / start over — only show once result is loaded */}
                {!isSearching && result && (
                  <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
                    <Button
                      data-ocid="subject_helper.try_again_button"
                      onClick={handleTryAgain}
                      variant="outline"
                      size="sm"
                      className="rounded-md font-mono font-bold text-xs gap-2 border-border hover:border-primary/40 hover:bg-secondary/60 transition-all duration-150"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Ask another question
                    </Button>
                    <button
                      type="button"
                      data-ocid="subject_helper.start_over_button"
                      onClick={handleStartOver}
                      className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Start over
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
