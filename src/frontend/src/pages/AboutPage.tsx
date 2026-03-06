import { Page } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTrackPageVisit } from "@/hooks/useTracking";
import { Link } from "@tanstack/react-router";
import {
  BookOpenText,
  Calculator,
  FlaskConical,
  Gamepad2,
  Globe,
  Heart,
  Lightbulb,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const capabilities = [
  {
    icon: Calculator,
    title: "Advanced Mathematics",
    description:
      "From basic arithmetic to algebra, geometry, and trigonometry. Explore maths through step-by-step resources and brain-training number games.",
    iconColor: "text-[oklch(0.75_0.2_255)]",
    iconBg:
      "bg-[oklch(0.75_0.2_255/0.1)] border border-[oklch(0.75_0.2_255/0.2)]",
  },
  {
    icon: FlaskConical,
    title: "Science",
    description:
      "Physics, chemistry, biology, and earth science. Understand how the world works with clear explanations and interactive simulations.",
    iconColor: "text-accent",
    iconBg: "bg-accent/10 border border-accent/20",
  },
  {
    icon: BookOpenText,
    title: "English & Literacy",
    description:
      "Grammar, punctuation, essay writing, reading comprehension, and vocabulary. Build real confidence with words.",
    iconColor: "text-[oklch(0.78_0.18_60)]",
    iconBg:
      "bg-[oklch(0.78_0.18_60/0.1)] border border-[oklch(0.78_0.18_60/0.2)]",
  },
  {
    icon: Globe,
    title: "General Knowledge",
    description:
      "History, geography, current events, culture, and fascinating facts about the world. Curious minds always welcome. 🌍",
    iconColor: "text-[oklch(0.72_0.2_310)]",
    iconBg:
      "bg-[oklch(0.72_0.2_310/0.1)] border border-[oklch(0.72_0.2_310/0.2)]",
  },
  {
    icon: Heart,
    title: "Wellbeing Resources",
    description:
      "Feeling stressed or overwhelmed? GuideMe links you to kind, age-appropriate support and mindfulness resources.",
    iconColor: "text-[oklch(0.72_0.2_340)]",
    iconBg:
      "bg-[oklch(0.72_0.2_340/0.1)] border border-[oklch(0.72_0.2_340/0.2)]",
  },
  {
    icon: Gamepad2,
    title: "Fun Interactive Games",
    description:
      "Educational games covering maths puzzles, word challenges, trivia, logic, and creative coding. Brain gains disguised as fun. 🎮",
    iconColor: "text-primary",
    iconBg: "bg-primary/10 border border-primary/20",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Safe for kids",
    description:
      "All resources and games are age-appropriate and carefully selected for young learners.",
    iconColor: "text-primary",
  },
  {
    icon: Users,
    title: "Inclusive",
    description:
      "Every child deserves great support — regardless of background or ability.",
    iconColor: "text-accent",
  },
  {
    icon: Star,
    title: "Encouraging",
    description:
      "GuideMe celebrates progress and builds confidence, not pressure.",
    iconColor: "text-[oklch(0.78_0.18_60)]",
  },
  {
    icon: Lightbulb,
    title: "Curiosity-driven",
    description:
      "We spark curiosity through games, resources, and content that makes learning exciting.",
    iconColor: "text-[oklch(0.72_0.2_310)]",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function AboutPage() {
  useTrackPageVisit(Page.about);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden grid-bg pt-12 pb-14 px-4">
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.78 0.2 195)" }}
        />
        <div className="container max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold mb-5 uppercase tracking-widest">
              <Zap className="w-3 h-3" />
              <span>Your bestie. Explained.</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-3 text-balance">
              About GuideMe ⚡
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              GuideMe is a learning platform built for young people aged 8–16.
              Not a tutor, not a teacher — your bestie. Always here, always
              ready, always got your back.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="py-10 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border-l-4 border-l-primary border border-border rounded-lg p-7 sm:p-9 mb-12"
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-primary" />
              <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">
                Our Mission
              </h2>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed max-w-2xl">
              To make high-quality educational support and fun learning
              accessible to every child — not just those with access to private
              tutors or expensive tools. GuideMe is free, always on, and
              genuinely invested in your growth. 🚀
            </p>
          </motion.div>

          {/* Who it's for */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-5">
              Who's GuideMe for?
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  emoji: "🎒",
                  age: "Ages 8–11",
                  desc: "Primary school learners who want fun, simple explanations of big ideas — plus games to make learning exciting.",
                },
                {
                  emoji: "📚",
                  age: "Ages 11–14",
                  desc: "Middle school students tackling harder topics, building study habits, and enjoying brain-challenging puzzles.",
                },
                {
                  emoji: "🎓",
                  age: "Ages 14–16",
                  desc: "Older teens prepping for exams, essays, and navigating life challenges with trusted resources.",
                },
              ].map((group) => (
                <Card
                  key={group.age}
                  className="border border-border bg-card shadow-card rounded-lg hover:border-primary/30 hover:shadow-neon-cyan/20 transition-all duration-200"
                >
                  <CardContent className="p-5 text-center">
                    <div className="text-3xl mb-2">{group.emoji}</div>
                    <h3 className="font-display font-semibold text-foreground text-sm mb-2 font-mono">
                      {group.age}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {group.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Capabilities */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-1">
                Why GuideMe hits different
              </h2>
              <p className="text-muted-foreground text-xs font-mono">
                Subjects, resources, and brain games — all in one place.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-3"
            >
              {capabilities.map((cap) => (
                <motion.div key={cap.title} variants={itemVariants}>
                  <Card className="border border-border bg-card shadow-card rounded-lg h-full hover:border-border/60 transition-all duration-200">
                    <CardContent className="p-4 flex gap-3">
                      <div
                        className={`w-9 h-9 rounded-md ${cap.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        <cap.icon className={`w-4 h-4 ${cap.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground text-xs mb-1">
                          {cap.title}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {cap.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Values */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-1">
                What we stand for
              </h2>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {values.map((val) => (
                <motion.div key={val.title} variants={itemVariants}>
                  <Card className="border border-border bg-card shadow-card rounded-lg h-full text-center hover:border-border/60 transition-all duration-200">
                    <CardContent className="p-4 flex flex-col items-center gap-2">
                      <div className="w-9 h-9 rounded-md bg-secondary/60 border border-border flex items-center justify-center">
                        <val.icon className={`w-4 h-4 ${val.iconColor}`} />
                      </div>
                      <h3 className="font-display font-semibold text-foreground text-xs">
                        {val.title}
                      </h3>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        {val.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-lg p-8 sm:p-10 border-l-4 border-l-accent"
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-2">
              Ready to get started? 🚀
            </h2>
            <p className="text-muted-foreground text-xs font-mono mb-6 max-w-md">
              Play games, explore resources, discover new things — no sign-up
              needed!
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/games">
                <Button
                  size="sm"
                  className="rounded-md font-mono font-bold text-xs gap-2 bg-primary text-primary-foreground shadow-neon-cyan hover:bg-primary/90 transition-all duration-200"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  Play Games →
                </Button>
              </Link>
              <Link to="/resources">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-md font-mono font-bold text-xs gap-2 border-border hover:border-primary/40 hover:bg-secondary/60 transition-all duration-200"
                >
                  <BookOpenText className="w-3.5 h-3.5" />
                  Browse Resources
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
