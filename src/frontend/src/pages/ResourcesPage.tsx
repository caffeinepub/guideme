import { Page } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrackPageVisit } from "@/hooks/useTracking";
import {
  AlertCircle,
  BookOpenText,
  Calculator,
  ExternalLink,
  FlaskConical,
  Globe,
  Grid3X3,
  Heart,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { type Resource, useAllResources } from "../hooks/useQueries";
import { T__2 } from "../hooks/useQueries";

type FilterTab = "all" | T__2;

const tabConfig: {
  value: FilterTab;
  label: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  borderActive: string;
}[] = [
  {
    value: "all",
    label: "All",
    icon: Grid3X3,
    color: "text-foreground",
    bg: "bg-secondary",
    borderActive: "border-primary/50",
  },
  {
    value: T__2.math,
    label: "Mathematics",
    icon: Calculator,
    color: "text-[oklch(0.75_0.2_255)]",
    bg: "bg-[oklch(0.75_0.2_255/0.1)]",
    borderActive: "border-[oklch(0.75_0.2_255/0.5)]",
  },
  {
    value: T__2.science,
    label: "Science",
    icon: FlaskConical,
    color: "text-accent",
    bg: "bg-accent/10",
    borderActive: "border-accent/50",
  },
  {
    value: T__2.english,
    label: "English",
    icon: BookOpenText,
    color: "text-[oklch(0.78_0.18_60)]",
    bg: "bg-[oklch(0.78_0.18_60/0.1)]",
    borderActive: "border-[oklch(0.78_0.18_60/0.5)]",
  },
  {
    value: T__2.generalKnowledge,
    label: "General Knowledge",
    icon: Globe,
    color: "text-[oklch(0.72_0.2_310)]",
    bg: "bg-[oklch(0.72_0.2_310/0.1)]",
    borderActive: "border-[oklch(0.72_0.2_310/0.5)]",
  },
  {
    value: T__2.wellbeing,
    label: "Wellbeing",
    icon: Heart,
    color: "text-[oklch(0.72_0.2_340)]",
    bg: "bg-[oklch(0.72_0.2_340/0.1)]",
    borderActive: "border-[oklch(0.72_0.2_340/0.5)]",
  },
];

const FALLBACK_RESOURCES: Resource[] = [
  // Math (8 resources)
  {
    id: "1",
    title: "Khan Academy – Mathematics",
    description:
      "Free video lessons and practice exercises covering everything from basic arithmetic to calculus. Perfect for all ages.",
    subject: T__2.math,
    url: "https://www.khanacademy.org/math",
  },
  {
    id: "2",
    title: "Mathway – Problem Solver",
    description:
      "Step-by-step maths problem solver for algebra, geometry, trigonometry and more. Great for checking your homework.",
    subject: T__2.math,
    url: "https://www.mathway.com",
  },
  {
    id: "3",
    title: "Cool Math Games",
    description:
      "Fun maths games and puzzles to make learning numbers enjoyable. Covers logic, strategy, and arithmetic skills.",
    subject: T__2.math,
    url: "https://www.coolmathgames.com",
  },
  {
    id: "16",
    title: "BBC Bitesize – Maths",
    description:
      "Curriculum-aligned maths revision with interactive exercises and videos. Covers Key Stages 1 through 4.",
    subject: T__2.math,
    url: "https://www.bbc.co.uk/bitesize/subjects/z826n39",
  },
  {
    id: "17",
    title: "Corbettmaths",
    description:
      "Hundreds of free maths videos, worksheets, and 5-a-day revision cards. Brilliant for GCSE preparation.",
    subject: T__2.math,
    url: "https://corbettmaths.com",
  },
  {
    id: "18",
    title: "Desmos Graphing Calculator",
    description:
      "A free, powerful online graphing tool. Plot equations, explore functions, and visualise maths in real time.",
    subject: T__2.math,
    url: "https://www.desmos.com/calculator",
  },
  {
    id: "19",
    title: "Wolfram Alpha",
    description:
      "Type any maths problem and get instant step-by-step solutions. Great for algebra, calculus, and statistics.",
    subject: T__2.math,
    url: "https://www.wolframalpha.com",
  },
  {
    id: "20",
    title: "IXL Maths",
    description:
      "Thousands of maths skills organised by year group. Get instant feedback and see exactly where to improve.",
    subject: T__2.math,
    url: "https://www.ixl.com/math",
  },
  // Science (8 resources)
  {
    id: "4",
    title: "National Geographic Kids – Science",
    description:
      "Fascinating science articles, videos, and facts about animals, space, nature and the world around us.",
    subject: T__2.science,
    url: "https://kids.nationalgeographic.com/science",
  },
  {
    id: "5",
    title: "BBC Bitesize – Science",
    description:
      "Curriculum-aligned science revision guides, videos, and quizzes for students. Covers physics, chemistry, and biology.",
    subject: T__2.science,
    url: "https://www.bbc.co.uk/bitesize/subjects/zng4d2p",
  },
  {
    id: "6",
    title: "PhET Interactive Simulations",
    description:
      "Free, fun science simulations from the University of Colorado. Explore physics, chemistry, biology and earth science.",
    subject: T__2.science,
    url: "https://phet.colorado.edu",
  },
  {
    id: "21",
    title: "NASA Space Place",
    description:
      "Explore space, planets, satellites, and missions through articles, videos, and activities from NASA.",
    subject: T__2.science,
    url: "https://spaceplace.nasa.gov",
  },
  {
    id: "22",
    title: "Science Kids",
    description:
      "Hundreds of fun science facts, experiments, quizzes, and videos covering every branch of science.",
    subject: T__2.science,
    url: "https://www.sciencekids.co.nz",
  },
  {
    id: "23",
    title: "Britannica Kids – Science",
    description:
      "Encyclopaedia Britannica's trusted kid-friendly science articles. Well-written, age-appropriate, and reliable.",
    subject: T__2.science,
    url: "https://kids.britannica.com/students/browse/Science",
  },
  {
    id: "24",
    title: "Biology Corner",
    description:
      "Free biology resources, worksheets, and notes for students from middle school to AS level.",
    subject: T__2.science,
    url: "https://www.biologycorner.com",
  },
  {
    id: "25",
    title: "The Naked Scientists",
    description:
      "Science news, podcasts, and explainers in plain language. Perfect for curious minds who want to dig deeper.",
    subject: T__2.science,
    url: "https://www.thenakedscientists.com",
  },
  // English (7 resources)
  {
    id: "7",
    title: "Oxford Owl – English",
    description:
      "Reading and writing resources for children aged 3–11, with free ebooks, activities, and parent guides.",
    subject: T__2.english,
    url: "https://www.oxfordowl.co.uk",
  },
  {
    id: "8",
    title: "Grammarly Blog – Writing Tips",
    description:
      "Clear, friendly writing guides covering grammar, punctuation, essays, and how to express ideas clearly.",
    subject: T__2.english,
    url: "https://www.grammarly.com/blog/",
  },
  {
    id: "9",
    title: "British Council – Learn English Kids",
    description:
      "Games, stories, songs, and activities to help children practise their English skills in an engaging way.",
    subject: T__2.english,
    url: "https://learnenglishkids.britishcouncil.org",
  },
  {
    id: "26",
    title: "No Sweat Shakespeare",
    description:
      "Every Shakespeare play translated into plain modern English. Perfect for understanding set texts at school.",
    subject: T__2.english,
    url: "https://nosweatshakespeare.com",
  },
  {
    id: "27",
    title: "Poetry Foundation",
    description:
      "A huge archive of poems for all ages and moods. Browse by theme, author, or form to find the perfect poem.",
    subject: T__2.english,
    url: "https://www.poetryfoundation.org",
  },
  {
    id: "28",
    title: "Vocabulary.com",
    description:
      "Learn new words through short definitions and smart adaptive quizzes. Builds vocabulary fast and effectively.",
    subject: T__2.english,
    url: "https://www.vocabulary.com",
  },
  {
    id: "29",
    title: "ReadWorks",
    description:
      "Free reading comprehension passages and questions aligned to the school curriculum for all year groups.",
    subject: T__2.english,
    url: "https://www.readworks.org",
  },
  // General Knowledge (7 resources)
  {
    id: "10",
    title: "National Geographic Kids",
    description:
      "Explore amazing facts about animals, geography, history, and science in a kid-friendly format.",
    subject: T__2.generalKnowledge,
    url: "https://kids.nationalgeographic.com",
  },
  {
    id: "11",
    title: "DKfindout! Encyclopedia",
    description:
      "An online encyclopedia packed with fascinating facts on hundreds of topics — from ancient history to space exploration.",
    subject: T__2.generalKnowledge,
    url: "https://www.dkfindout.com/uk/",
  },
  {
    id: "12",
    title: "TIME for Kids",
    description:
      "Age-appropriate news and current events to help kids understand the world. Covers science, sports, arts, and more.",
    subject: T__2.generalKnowledge,
    url: "https://www.timeforkids.com",
  },
  {
    id: "30",
    title: "Britannica Kids",
    description:
      "Safe, reliable encyclopaedia content written for students. Covers history, geography, science, arts, and people.",
    subject: T__2.generalKnowledge,
    url: "https://kids.britannica.com",
  },
  {
    id: "31",
    title: "Newsround – BBC",
    description:
      "Daily news stories made simple and relevant for children. Stay up to date with what's happening in the world.",
    subject: T__2.generalKnowledge,
    url: "https://www.bbc.co.uk/newsround",
  },
  {
    id: "32",
    title: "Fact Monster",
    description:
      "A kid-safe homework helper and almanac with facts on history, science, geography, sports, and entertainment.",
    subject: T__2.generalKnowledge,
    url: "https://www.factmonster.com",
  },
  {
    id: "33",
    title: "World Factbook – CIA",
    description:
      "Detailed facts about every country in the world — geography, people, government, economy, and more.",
    subject: T__2.generalKnowledge,
    url: "https://www.cia.gov/the-world-factbook/",
  },
  // Wellbeing (8 resources)
  {
    id: "13",
    title: "Childline – Feelings & Emotions",
    description:
      "Safe, supportive information about managing emotions, mental health, stress, and difficult situations for young people.",
    subject: T__2.wellbeing,
    url: "https://www.childline.org.uk/feelings-behaviours-mental-health/",
  },
  {
    id: "14",
    title: "Headspace for Kids",
    description:
      "Guided meditations and mindfulness exercises specially designed for children and teenagers. Great for stress relief.",
    subject: T__2.wellbeing,
    url: "https://www.headspace.com/meditation/kids",
  },
  {
    id: "15",
    title: "Young Minds – Mental Health",
    description:
      "Resources and support for young people's mental health. Covers anxiety, depression, and how to ask for help.",
    subject: T__2.wellbeing,
    url: "https://www.youngminds.org.uk",
  },
  {
    id: "34",
    title: "Mind – For Young People",
    description:
      "Honest mental health guidance from the UK's leading mental health charity. Covers stress, anxiety, and self-care.",
    subject: T__2.wellbeing,
    url: "https://www.mind.org.uk/for-young-people/",
  },
  {
    id: "35",
    title: "Kooth – Online Wellbeing",
    description:
      "Free, anonymous online counselling and emotional support for young people aged 10–25. Chat with a counsellor any time.",
    subject: T__2.wellbeing,
    url: "https://www.kooth.com",
  },
  {
    id: "36w",
    title: "Smiling Mind – Mindfulness App",
    description:
      "Free mindfulness and meditation programs developed by psychologists, designed specifically for young people.",
    subject: T__2.wellbeing,
    url: "https://www.smilingmind.com.au",
  },
  {
    id: "37w",
    title: "The Mix – Under 25s Support",
    description:
      "Free information and support on topics like mental health, relationships, money, and housing for young people.",
    subject: T__2.wellbeing,
    url: "https://www.themix.org.uk",
  },
  {
    id: "38w",
    title: "Place2Be – Wellbeing in Schools",
    description:
      "Tips and resources for managing school stress, friendships, and building emotional resilience.",
    subject: T__2.wellbeing,
    url: "https://www.place2be.org.uk/our-work/children-and-young-people/",
  },
  // Extra Math resources
  {
    id: "39m",
    title: "Mathletics",
    description:
      "Curriculum-aligned maths activities and challenges for students. Earn points, compete globally, and track progress.",
    subject: T__2.math,
    url: "https://www.mathletics.com",
  },
  {
    id: "40m",
    title: "GeoGebra",
    description:
      "Free interactive maths tools for graphing, geometry, algebra, and statistics. Used by students worldwide.",
    subject: T__2.math,
    url: "https://www.geogebra.org",
  },
  // Extra Science resources
  {
    id: "41s",
    title: "Cosmos4Kids",
    description:
      "Simple and clear introductions to astronomy — planets, stars, galaxies, and the universe explained for students.",
    subject: T__2.science,
    url: "http://www.cosmos4kids.com",
  },
  {
    id: "42s",
    title: "Chemistry Explained",
    description:
      "Easy-to-read chemistry articles covering elements, reactions, and the periodic table — great for homework research.",
    subject: T__2.science,
    url: "https://www.chemistryexplained.com",
  },
  // Extra English resources
  {
    id: "43e",
    title: "Purdue OWL Writing Lab",
    description:
      "Trusted writing and grammar guides from Purdue University. Perfect for essays, citations, and sentence structure.",
    subject: T__2.english,
    url: "https://owl.purdue.edu/owl/general_writing/index.html",
  },
  {
    id: "44e",
    title: "CommonLit",
    description:
      "Free fiction and non-fiction reading passages with comprehension questions and literary analysis support.",
    subject: T__2.english,
    url: "https://www.commonlit.org",
  },
  // Extra General Knowledge resources
  {
    id: "45g",
    title: "Kiddle – Safe Search",
    description:
      "A safe visual search engine for kids powered by Google SafeSearch. Great for research without adult content.",
    subject: T__2.generalKnowledge,
    url: "https://www.kiddle.co",
  },
  {
    id: "46g",
    title: "Simple English Wikipedia",
    description:
      "Wikipedia written in plain, easy-to-understand English. Perfect for researching topics without confusing jargon.",
    subject: T__2.generalKnowledge,
    url: "https://simple.wikipedia.org",
  },
  {
    id: "47g",
    title: "Ducksters – History & Science",
    description:
      "Kid-friendly articles covering world history, biographies, science, geography, and more. Great for quick facts.",
    subject: T__2.generalKnowledge,
    url: "https://www.ducksters.com",
  },
];

function subjectLabel(subject: T__2): string {
  const found = tabConfig.find((t) => t.value === subject);
  return found?.label ?? subject;
}

function SubjectBadge({ subject }: { subject: T__2 }) {
  const config = tabConfig.find((t) => t.value === subject);
  if (!config || config.value === "all") return null;
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm text-[10px] font-mono font-semibold ${config.bg} ${config.color}`}
    >
      <config.icon className="w-2.5 h-2.5" />
      {config.label}
    </span>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="h-full border border-border bg-card shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-200 hover:-translate-y-1 flex flex-col group">
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="font-display font-semibold text-sm text-foreground leading-snug">
              {resource.title}
            </CardTitle>
            <SubjectBadge subject={resource.subject} />
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 pb-4">
          <p className="text-muted-foreground text-xs leading-relaxed flex-1">
            {resource.description}
          </p>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-md font-mono font-bold text-xs gap-2 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-neon-cyan transition-all duration-150"
            >
              <ExternalLink className="w-3 h-3" />
              Open Resource →
            </Button>
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ResourceSkeleton() {
  return (
    <Card className="h-48 border-border rounded-lg bg-card">
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4 bg-secondary" />
        <Skeleton className="h-3 w-1/3 bg-secondary" />
        <Skeleton className="h-14 w-full bg-secondary" />
        <Skeleton className="h-7 w-full bg-secondary" />
      </CardContent>
    </Card>
  );
}

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const { data: resources, isLoading, isError } = useAllResources();
  useTrackPageVisit(Page.resources);

  const displayResources =
    resources && resources.length > 0 ? resources : FALLBACK_RESOURCES;

  const filtered =
    activeFilter === "all"
      ? displayResources
      : displayResources.filter((r) => r.subject === activeFilter);

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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-5 uppercase tracking-widest">
              <Zap className="w-3 h-3" />
              <span>{FALLBACK_RESOURCES.length}+ resources curated</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-tight mb-3">
              Level up your knowledge 📚
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Handpicked, trusted resources to supercharge your learning. No
              fluff — just the good stuff.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Error state */}
          {isError && (
            <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-4 py-3 mb-5 font-mono">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                Couldn't load resources from the server — showing our curated
                list instead.
              </span>
            </div>
          )}

          {/* Filter tabs */}
          <div
            className="flex flex-wrap gap-2 mb-7"
            role="tablist"
            aria-label="Filter by subject"
          >
            {tabConfig.map((tab) => {
              const isSelected = activeFilter === tab.value;
              return (
                <button
                  type="button"
                  key={tab.value}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono font-semibold border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-neon-cyan"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-secondary/60"
                  }`}
                >
                  <tab.icon
                    className={`w-3.5 h-3.5 ${isSelected ? "" : tab.color}`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          {!isLoading && (
            <p className="text-xs text-muted-foreground font-mono mb-5">
              Showing{" "}
              <strong className="text-foreground">{filtered.length}</strong>{" "}
              resource
              {filtered.length !== 1 ? "s" : ""}
              {activeFilter !== "all"
                ? ` for ${subjectLabel(activeFilter as T__2)}`
                : ""}
            </p>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
                <ResourceSkeleton key={sk} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="text-base font-display font-semibold">
                No resources found
              </p>
              <p className="text-xs mt-1 font-mono">
                Try a different subject filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
