"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — warm editorial minimalism
   Palette: cream #F7F3EE · sand #E8DDD2 · clay #C4A882
            espresso #3B2A1A · ink #1A1007 · white #FDFCFB
───────────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1] as const;

function useFadeUp(delay = 0) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return { ref, inView, delay };
}

/* ── Noise overlay (grain texture) ── */
function Grain() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[999] h-full w-full opacity-[0.032]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.72"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

/* ── Divider line ── */
function Rule({ className = "" }: { className?: string }) {
  return <div className={`h-px bg-[#E8DDD2] ${className}`} />;
}

/* ──────────────────────────────────────────
   NAVBAR
──────────────────────────────────────────── */
function Navbar() {
  const [pinned, setPinned] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setPinned(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Product", "Features", "Pricing", "Blog"];

  return (
    <>
      <motion.header
        initial={{ y: -56 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.65, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          pinned
            ? "bg-[#FDFCFB]/92 backdrop-blur-md border-b border-[#E8DDD2]"
            : ""
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 select-none">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#3B2A1A]">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect
                  x="1.5"
                  y="1.5"
                  width="5"
                  height="5"
                  rx="0.8"
                  fill="#F7F3EE"
                  opacity="0.95"
                />
                <rect
                  x="8.5"
                  y="1.5"
                  width="5"
                  height="5"
                  rx="0.8"
                  fill="#F7F3EE"
                  opacity="0.5"
                />
                <rect
                  x="1.5"
                  y="8.5"
                  width="5"
                  height="5"
                  rx="0.8"
                  fill="#F7F3EE"
                  opacity="0.5"
                />
                <rect
                  x="8.5"
                  y="8.5"
                  width="5"
                  height="5"
                  rx="0.8"
                  fill="#F7F3EE"
                  opacity="0.95"
                />
              </svg>
            </span>
            <span
              className="text-[15px] font-semibold tracking-tight text-[#1A1007]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              BrainBoard
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-[13px] font-medium text-[#3B2A1A]/60 transition-colors hover:text-[#1A1007]"
              >
                {l}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <button className="text-[13px] font-medium text-[#3B2A1A]/70 hover:text-[#1A1007] transition-colors px-3 py-1.5">
              Log in
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-lg bg-[#3B2A1A] px-4 py-1.5 text-[13px] font-semibold text-[#F7F3EE] shadow-sm hover:bg-[#1A1007] transition-colors"
            >
              Get BrainBoard free →
            </motion.button>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="space-y-[5px]">
              <span
                className={`block h-[1.5px] w-5 bg-[#3B2A1A] transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-[#3B2A1A] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] w-5 bg-[#3B2A1A] transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 border-b border-[#E8DDD2] bg-[#FDFCFB] px-6 py-5 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="block py-2.5 text-sm font-medium text-[#3B2A1A]/70"
              >
                {l}
              </a>
            ))}
            <button className="mt-3 w-full rounded-lg bg-[#3B2A1A] py-2.5 text-sm font-semibold text-[#F7F3EE]">
              Get BrainBoard free →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ──────────────────────────────────────────
   HERO
──────────────────────────────────────────── */
function Hero() {
  const words = ["deadlines.", "notes.", "grades.", "focus.", "time."];
  const [wi, setWi] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWi((p) => (p + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FDFCFB] px-6 pt-14">
      {/* Radial warm glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,_#E8DDD2_0%,_transparent_70%)] opacity-60" />

      {/* Faint grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#3B2A1A 1px,transparent 1px),linear-gradient(90deg,#3B2A1A 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#C4A882]/50 bg-[#F7F3EE] px-4 py-1.5 text-xs font-semibold tracking-widest text-[#3B2A1A] uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C4A882] animate-pulse" />
          Student workspace · Free forever
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="mb-2 text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-[1.04] tracking-tight text-[#1A1007]"
          style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
        >
          Own your
        </motion.h1>

        {/* Rotating word */}
        <div className="mb-6 h-[clamp(2.8rem,7.5vw,5.6rem)] overflow-hidden flex items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={wi}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.42, ease }}
              className="block text-[clamp(2.8rem,7.5vw,5.6rem)] font-bold leading-[1.04] tracking-tight text-[#C4A882]"
              style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
            >
              {words[wi]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease }}
          className="mx-auto mb-10 max-w-[520px] text-[15px] leading-relaxed text-[#3B2A1A]/60"
        >
          BrainBoard brings your notes, tasks, calendar and AI study coach into
          one calm, distraction-free workspace — built the way Notion should
          have been for students.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 8px 32px rgba(59,42,26,0.22)",
            }}
            whileTap={{ scale: 0.97 }}
            className="rounded-xl bg-[#3B2A1A] px-7 py-3 text-sm font-semibold text-[#F7F3EE] shadow-md transition-colors hover:bg-[#1A1007]"
          >
            Start for free →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-xl border border-[#E8DDD2] bg-white px-6 py-3 text-sm font-medium text-[#3B2A1A]/80 shadow-sm hover:border-[#C4A882] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle
                cx="7"
                cy="7"
                r="6.25"
                stroke="#C4A882"
                strokeWidth="1.5"
              />
              <path d="M5.5 4.8l3.5 2.2-3.5 2.2V4.8z" fill="#C4A882" />
            </svg>
            Watch 90-second demo
          </motion.button>
        </motion.div>

        {/* Trust strip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-[11px] tracking-wide text-[#3B2A1A]/35 uppercase"
        >
          Trusted by 50 000+ students at Stanford · Oxford · MIT · NUS · IIT
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-5 w-3.5 rounded-full border border-[#C4A882]/50 flex items-start justify-center pt-1"
        >
          <div className="h-1.5 w-0.5 rounded-full bg-[#C4A882]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────
   PRODUCT PREVIEW (browser mockup)
──────────────────────────────────────────── */
function ProductPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section className="bg-[#F7F3EE] py-24 px-6">
      <div className="mx-auto max-w-5xl">
        {/* Label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-10 text-center"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C4A882]">
            Product preview
          </span>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[#1A1007]"
            style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
          >
            Everything in one place
          </h2>
          <p className="mt-2 text-sm text-[#3B2A1A]/55 max-w-md mx-auto">
            A workspace that feels like it was made specifically for you —
            because it adapts to how you study.
          </p>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, delay: 0.12, ease }}
          style={{ y }}
          className="relative"
        >
          {/* Soft glow */}
          <div className="absolute -inset-8 rounded-3xl bg-[#C4A882]/12 blur-3xl" />

          <div className="relative rounded-2xl overflow-hidden border border-[#E8DDD2] shadow-[0_28px_80px_-12px_rgba(59,42,26,0.18)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 bg-[#F0EAE1] border-b border-[#E8DDD2] px-4 py-2.5">
              <div className="flex gap-1.5">
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                  <div
                    key={c}
                    className="h-3 w-3 rounded-full"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="mx-auto flex-1 max-w-xs">
                <div className="rounded-md bg-[#E8DDD2]/70 px-3 py-1 text-center text-[11px] font-mono text-[#3B2A1A]/40">
                  app.brainboard.io
                </div>
              </div>
            </div>

            {/* App shell */}
            <div className="flex bg-[#FDFCFB]" style={{ minHeight: 400 }}>
              {/* Sidebar */}
              <aside className="w-52 shrink-0 border-r border-[#F0EAE1] bg-[#F7F3EE] p-4 hidden sm:block">
                {/* User */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#C4A882] to-[#3B2A1A] flex items-center justify-center text-[10px] font-bold text-white">
                    A
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-[#1A1007]">
                      Alex's Space
                    </div>
                    <div className="text-[9px] text-[#3B2A1A]/40">
                      Free plan
                    </div>
                  </div>
                </div>
                {/* Nav items */}
                <div className="space-y-0.5 text-[11px]">
                  {[
                    { icon: "⊞", label: "Dashboard", active: true },
                    { icon: "✎", label: "Notes" },
                    { icon: "✓", label: "Tasks" },
                    { icon: "◷", label: "Calendar" },
                    { icon: "◈", label: "Flashcards" },
                    { icon: "⚡", label: "AI Coach" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                        item.active
                          ? "bg-[#3B2A1A] text-[#F7F3EE]"
                          : "text-[#3B2A1A]/55 hover:bg-[#E8DDD2]/60 hover:text-[#1A1007]"
                      }`}
                    >
                      <span className="opacity-70">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>
                {/* Tags */}
                <div className="mt-6">
                  <div className="mb-2 text-[9px] font-bold uppercase tracking-widest text-[#3B2A1A]/35">
                    Subjects
                  </div>
                  {["Chemistry", "History", "Calculus", "English"].map(
                    (s, i) => (
                      <div
                        key={s}
                        className="flex items-center gap-2 py-1 cursor-pointer"
                      >
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${["bg-[#C4A882]", "bg-[#3B2A1A]", "bg-[#8B6345]", "bg-[#D4B896]"][i]}`}
                        />
                        <span className="text-[10px] text-[#3B2A1A]/55">
                          {s}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </aside>

              {/* Main */}
              <main className="flex-1 p-5 overflow-hidden">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#3B2A1A]/35 mb-1">
                      Wednesday, Mar 11
                    </div>
                    <h3
                      className="text-base font-bold text-[#1A1007]"
                      style={{ fontFamily: "Georgia,serif" }}
                    >
                      Good morning, Alex 👋
                    </h3>
                  </div>
                  <button className="rounded-lg bg-[#3B2A1A] px-3 py-1.5 text-[10px] font-semibold text-[#F7F3EE]">
                    + New page
                  </button>
                </div>

                {/* Stats */}
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {[
                    { emoji: "🔥", val: "14", label: "Day streak" },
                    { emoji: "✅", val: "6/9", label: "Tasks today" },
                    { emoji: "🎯", val: "91%", label: "Focus score" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-[#F0EAE1] bg-[#F7F3EE] p-3"
                    >
                      <div className="text-base leading-none mb-1">
                        {s.emoji}
                      </div>
                      <div className="text-sm font-bold text-[#1A1007]">
                        {s.val}
                      </div>
                      <div className="text-[9px] text-[#3B2A1A]/40 mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Task list + AI suggestion */}
                <div className="grid grid-cols-5 gap-3">
                  <div className="col-span-3 rounded-xl border border-[#F0EAE1] bg-[#F7F3EE] p-3.5">
                    <div className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-[#3B2A1A]/40">
                      Today's tasks
                    </div>
                    {[
                      { t: "Finish Calc Problem Set 9", done: true },
                      { t: "Read — The French Revolution", done: true },
                      { t: "Write essay draft (English)", done: false },
                      { t: "Review Chemistry flashcards", done: false },
                    ].map((task) => (
                      <div
                        key={task.t}
                        className="flex items-center gap-2 py-1.5 border-b border-[#E8DDD2]/50 last:border-0"
                      >
                        <div
                          className={`h-3.5 w-3.5 shrink-0 rounded-full border flex items-center justify-center ${task.done ? "border-[#3B2A1A] bg-[#3B2A1A]" : "border-[#C4A882]"}`}
                        >
                          {task.done && (
                            <svg
                              viewBox="0 0 8 8"
                              fill="none"
                              className="h-2 w-2"
                            >
                              <path
                                d="M1.5 4l2 2L6.5 2"
                                stroke="#F7F3EE"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-[10px] ${task.done ? "line-through text-[#3B2A1A]/30" : "text-[#1A1007]"}`}
                        >
                          {task.t}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* AI card */}
                  <div className="col-span-2 rounded-xl border border-[#C4A882]/30 bg-gradient-to-br from-[#F7F3EE] to-[#E8DDD2]/50 p-3.5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-xs">✦</span>
                      <span className="text-[10px] font-bold text-[#3B2A1A]">
                        AI Coach
                      </span>
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-[10px] leading-relaxed text-[#3B2A1A]/70">
                      You're ahead on Calculus (87%) but Chemistry nomenclature
                      needs work before Friday's exam.
                    </p>
                    <div className="mt-2.5 space-y-1">
                      {["Start IUPAC quiz →", "Create study plan →"].map(
                        (a) => (
                          <button
                            key={a}
                            className="block w-full rounded-lg bg-[#3B2A1A]/8 border border-[#C4A882]/25 px-2 py-1 text-left text-[9px] font-semibold text-[#3B2A1A] hover:bg-[#3B2A1A]/12 transition-colors"
                          >
                            {a}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   FEATURES
──────────────────────────────────────────── */
const features = [
  {
    num: "01",
    title: "Unified workspace",
    body: "Notes, tasks, flashcards, calendar — one home. No more hopping between five apps to remember what's due.",
    detail: "Rich text · Backlinks · Templates",
  },
  {
    num: "02",
    title: "AI study coach",
    body: "Paste your lecture notes and get crisp summaries, quiz questions, and a personalised study schedule in seconds.",
    detail: "Summaries · Quizzes · Gap detection",
  },
  {
    num: "03",
    title: "Deadline radar",
    body: "Smart calendar that pulls from your syllabi, sends nudges at exactly the right time, and forecasts crunch weeks.",
    detail: "Calendar sync · Smart alerts · Forecasting",
  },
  {
    num: "04",
    title: "Focus engine",
    body: "Pomodoro timer with ambient soundscapes, distraction blocking, and a weekly focus-score dashboard.",
    detail: "Pomodoro · Soundscapes · Analytics",
  },
  {
    num: "05",
    title: "Mastery tracker",
    body: "Visual subject-by-subject mastery bars built from your quiz results and study time — know exactly where gaps are.",
    detail: "Progress · Heatmap · Spaced repetition",
  },
  {
    num: "06",
    title: "Study groups",
    body: "Share boards, co-edit notes and collaborate in real-time. Everything versioned and recoverable.",
    detail: "Real-time · Version history · Comments",
  },
];

function Features() {
  const { ref, inView } = useFadeUp();

  return (
    <section id="features" className="bg-[#FDFCFB] py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#C4A882]">
            Features
          </span>
          <h2
            className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-[#1A1007]"
            style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
          >
            The tools that separate distracted from deliberate.
          </h2>
        </motion.div>

        {/* Feature grid — editorial numbered list style */}
        <div className="grid grid-cols-1 divide-y divide-[#F0EAE1] md:grid-cols-2 md:divide-y-0">
          {features.map((f, i) => {
            const { ref: fRef, inView: fInView } = useFadeUp(i * 0.05);
            return (
              <motion.div
                key={f.num}
                ref={fRef}
                initial={{ opacity: 0, y: 20 }}
                animate={fInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
                className={`group relative p-8 transition-colors hover:bg-[#F7F3EE] ${
                  i % 2 === 0 ? "md:border-r border-[#F0EAE1]" : ""
                } ${i < features.length - 2 ? "md:border-b border-[#F0EAE1]" : ""}`}
              >
                {/* Number */}
                <span className="mb-4 block font-mono text-[11px] font-bold tracking-widest text-[#C4A882]">
                  {f.num}
                </span>
                <h3
                  className="mb-2 text-[17px] font-bold leading-snug text-[#1A1007]"
                  style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
                >
                  {f.title}
                </h3>
                <p className="mb-4 text-[13px] leading-relaxed text-[#3B2A1A]/55">
                  {f.body}
                </p>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD2] bg-[#F7F3EE] px-3 py-1 text-[10px] font-semibold text-[#8B6345]">
                  {f.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   DASHBOARD SCREENSHOT SECTION
──────────────────────────────────────────── */
function DashboardSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#1A1007] py-28 px-6 overflow-hidden">
      {/* Top rule */}
      <div className="h-px bg-[#3B2A1A] mb-0" />

      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="mb-14 max-w-lg"
        >
          <span className="mb-3 block text-[11px] font-bold uppercase tracking-widest text-[#C4A882]">
            Dashboard
          </span>
          <h2
            className="mb-4 text-3xl font-bold leading-tight tracking-tight text-[#F7F3EE]"
            style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
          >
            A command centre that keeps you two steps ahead.
          </h2>
          <p className="text-[13px] leading-relaxed text-[#F7F3EE]/45">
            Every morning, BrainBoard compiles your day: what's due, where
            you're struggling, and how your focus trended this week.
          </p>
        </motion.div>

        {/* Three-column feature spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12"
        >
          {[
            {
              title: "Daily brief",
              desc: "A distilled view of today's priorities, built fresh each morning from your notes and calendar.",
              icon: "☀",
            },
            {
              title: "Subject mastery",
              desc: "Animated progress bars that update in real-time as you complete quizzes and study sessions.",
              icon: "◎",
            },
            {
              title: "Focus heatmap",
              desc: "GitHub-style contribution map showing your study consistency across the semester.",
              icon: "▦",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
              className="rounded-2xl border border-[#3B2A1A] bg-[#3B2A1A]/30 p-6 hover:border-[#C4A882]/40 transition-colors"
            >
              <div className="mb-3 text-2xl text-[#C4A882]">{card.icon}</div>
              <h4
                className="mb-1.5 text-[15px] font-semibold text-[#F7F3EE]"
                style={{ fontFamily: "Georgia,serif" }}
              >
                {card.title}
              </h4>
              <p className="text-[12px] leading-relaxed text-[#F7F3EE]/45">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mini dashboard screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, delay: 0.2, ease }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-[#C4A882]/8 blur-3xl" />
          <div className="relative rounded-2xl border border-[#3B2A1A] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            {/* top bar */}
            <div className="flex items-center justify-between bg-[#3B2A1A]/60 px-5 py-2.5 border-b border-[#3B2A1A]">
              <div className="flex gap-1.5">
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                  <div
                    key={c}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-[#C4A882]/40">
                BrainBoard · Dashboard
              </span>
              <div />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 bg-[#140C05]">
              {/* Left mini sidebar */}
              <div className="border-r border-[#3B2A1A]/60 p-5 hidden sm:block">
                <div className="text-[9px] uppercase tracking-widest text-[#C4A882]/40 mb-3 font-bold">
                  Workspace
                </div>
                {[
                  "Dashboard",
                  "Notes",
                  "Tasks",
                  "Calendar",
                  "AI Coach",
                  "Progress",
                ].map((item, i) => (
                  <div
                    key={item}
                    className={`flex items-center gap-2 py-1.5 px-2 rounded-lg mb-0.5 text-[10px] font-medium ${i === 0 ? "bg-[#3B2A1A] text-[#F7F3EE]" : "text-[#C4A882]/40"}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Center: focus heatmap area */}
              <div className="p-5 border-r border-[#3B2A1A]/60">
                <div className="text-[9px] uppercase tracking-widest text-[#C4A882]/40 mb-3 font-bold">
                  Study activity — last 16 weeks
                </div>
                <div
                  className="grid gap-1"
                  style={{ gridTemplateColumns: "repeat(16, 1fr)" }}
                >
                  {Array.from({ length: 112 }).map((_, j) => {
                    const intensity = (j % 4) / 4;
                    const bg =
                      intensity > 0.75
                        ? "#C4A882"
                        : intensity > 0.5
                          ? "#8B6345"
                          : intensity > 0.25
                            ? "#3B2A1A"
                            : "#1A0F07";
                    return (
                      <div
                        key={j}
                        className="aspect-square rounded-[2px]"
                        style={{ background: bg }}
                      />
                    );
                  })}
                </div>

                {/* Mastery bars */}
                <div className="mt-5">
                  <div className="text-[9px] uppercase tracking-widest text-[#C4A882]/40 mb-2 font-bold">
                    Subject mastery
                  </div>
                  {[
                    { s: "Calculus", p: 87 },
                    { s: "Chemistry", p: 54 },
                    { s: "History", p: 73 },
                    { s: "Literature", p: 91 },
                  ].map((item) => (
                    <div key={item.s} className="mb-2">
                      <div className="flex justify-between mb-0.5">
                        <span className="text-[9px] text-[#C4A882]/55">
                          {item.s}
                        </span>
                        <span className="text-[9px] font-bold text-[#C4A882]">
                          {item.p}%
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-[#3B2A1A]">
                        <motion.div
                          className="h-full rounded-full bg-[#C4A882]"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${item.p}%` } : {}}
                          transition={{
                            duration: 1.1,
                            delay: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: upcoming tasks */}
              <div className="p-5">
                <div className="text-[9px] uppercase tracking-widest text-[#C4A882]/40 mb-3 font-bold">
                  Due soon
                </div>
                {[
                  {
                    title: "Bio lab report",
                    when: "Today · 11:59 PM",
                    urgent: true,
                  },
                  {
                    title: "Calc PS #10",
                    when: "Thu · 9:00 AM",
                    urgent: false,
                  },
                  {
                    title: "History essay",
                    when: "Fri · 11:59 PM",
                    urgent: false,
                  },
                  {
                    title: "Group presentation",
                    when: "Next Mon",
                    urgent: false,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-2.5 mb-3"
                  >
                    <div
                      className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${item.urgent ? "bg-[#C4A882]" : "bg-[#3B2A1A]"}`}
                    />
                    <div>
                      <div className="text-[10px] font-semibold text-[#F7F3EE]/80">
                        {item.title}
                      </div>
                      <div className="text-[9px] text-[#C4A882]/40">
                        {item.when}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4 rounded-xl border border-[#3B2A1A] bg-[#3B2A1A]/40 p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] text-[#C4A882]">✦</span>
                    <span className="text-[9px] font-bold text-[#F7F3EE]/70">
                      AI insight
                    </span>
                  </div>
                  <p className="text-[9px] leading-relaxed text-[#C4A882]/55">
                    Chemistry is your biggest risk this week. Recommend 40 min
                    tonight on nomenclature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   SOCIAL PROOF MARQUEE
──────────────────────────────────────────── */
function Marquee() {
  const quotes = [
    {
      q: "Finally replaced Notion + Google Calendar + Anki with one app.",
      name: "Priya S., Stanford pre-med",
    },
    {
      q: "The AI summaries alone are worth it. Saves me 2+ hours a week.",
      name: "Marcus T., MIT CS",
    },
    {
      q: "My study streaks haven't broken in 6 weeks. I'm addicted.",
      name: "Layla K., Oxford Law",
    },
    {
      q: "Feels like someone built this exactly for how I think.",
      name: "James R., UCL Medicine",
    },
    {
      q: "Got into my dream programme. BrainBoard kept me on track.",
      name: "Hana L., NUS Engineering",
    },
  ];

  return (
    <section className="overflow-hidden border-y border-[#F0EAE1] bg-[#F7F3EE] py-12">
      <div className="relative flex gap-8">
        {[0, 1].map((rep) => (
          <motion.div
            key={rep}
            className="flex shrink-0 gap-8"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          >
            {quotes.map((q, i) => (
              <div
                key={`${rep}-${i}`}
                className="w-72 shrink-0 rounded-2xl border border-[#E8DDD2] bg-[#FDFCFB] p-5 shadow-sm"
              >
                <p className="mb-3 text-[13px] italic leading-relaxed text-[#3B2A1A]/70">
                  "{q.q}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#C4A882] to-[#3B2A1A] text-[9px] font-bold text-white flex items-center justify-center">
                    {q.name[0]}
                  </div>
                  <span className="text-[10px] font-semibold text-[#3B2A1A]/55">
                    {q.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   CTA
──────────────────────────────────────────── */
function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#FDFCFB] py-28 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          {/* Ornament */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3B2A1A] shadow-lg">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="7.5"
                  height="7.5"
                  rx="1.2"
                  fill="#F7F3EE"
                  opacity="0.95"
                />
                <rect
                  x="12.5"
                  y="2"
                  width="7.5"
                  height="7.5"
                  rx="1.2"
                  fill="#F7F3EE"
                  opacity="0.45"
                />
                <rect
                  x="2"
                  y="12.5"
                  width="7.5"
                  height="7.5"
                  rx="1.2"
                  fill="#F7F3EE"
                  opacity="0.45"
                />
                <rect
                  x="12.5"
                  y="12.5"
                  width="7.5"
                  height="7.5"
                  rx="1.2"
                  fill="#F7F3EE"
                  opacity="0.95"
                />
              </svg>
            </div>
          </div>

          <h2
            className="mb-4 text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight tracking-tight text-[#1A1007]"
            style={{ fontFamily: "Georgia,'Times New Roman',serif" }}
          >
            Your best semester starts today.
          </h2>
          <p className="mb-10 text-[15px] leading-relaxed text-[#3B2A1A]/55">
            Free for students, forever. No credit card. Set up in under two
            minutes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 12px 40px rgba(59,42,26,0.25)",
              }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-[#3B2A1A] px-9 py-3.5 text-[14px] font-bold text-[#F7F3EE] shadow-md hover:bg-[#1A1007] transition-colors"
            >
              Get BrainBoard free →
            </motion.button>
            <button className="rounded-xl border border-[#E8DDD2] px-7 py-3.5 text-[14px] font-medium text-[#3B2A1A]/70 hover:border-[#C4A882] transition-colors">
              See all features
            </button>
          </div>

          {/* Fine print */}
          <p className="mt-6 text-[11px] text-[#3B2A1A]/30">
            50 000+ students · 4.9 ★ App Store · No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────
   FOOTER
──────────────────────────────────────────── */
function Footer() {
  const cols = [
    {
      heading: "Product",
      links: ["Features", "Dashboard", "AI Coach", "Integrations", "Changelog"],
    },
    {
      heading: "Company",
      links: ["About", "Blog", "Careers", "Press", "Contact"],
    },
    {
      heading: "Resources",
      links: ["Help centre", "Community", "Templates", "API docs", "Status"],
    },
    { heading: "Legal", links: ["Privacy", "Terms", "Cookies", "Security"] },
  ];

  return (
    <footer className="border-t border-[#F0EAE1] bg-[#F7F3EE] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 grid grid-cols-2 gap-8 sm:grid-cols-5">
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3B2A1A]">
                <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                  <rect
                    x="1.5"
                    y="1.5"
                    width="5"
                    height="5"
                    rx="0.8"
                    fill="#F7F3EE"
                    opacity="0.95"
                  />
                  <rect
                    x="8.5"
                    y="1.5"
                    width="5"
                    height="5"
                    rx="0.8"
                    fill="#F7F3EE"
                    opacity="0.5"
                  />
                  <rect
                    x="1.5"
                    y="8.5"
                    width="5"
                    height="5"
                    rx="0.8"
                    fill="#F7F3EE"
                    opacity="0.5"
                  />
                  <rect
                    x="8.5"
                    y="8.5"
                    width="5"
                    height="5"
                    rx="0.8"
                    fill="#F7F3EE"
                    opacity="0.95"
                  />
                </svg>
              </span>
              <span
                className="text-[13px] font-semibold text-[#1A1007]"
                style={{ fontFamily: "Georgia,serif" }}
              >
                BrainBoard
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#3B2A1A]/45">
              The student workspace for organised minds and ambitious goals.
            </p>
          </div>
          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.heading}>
              <div className="mb-3 text-[9px] font-bold uppercase tracking-widest text-[#3B2A1A]/35">
                {col.heading}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[12px] text-[#3B2A1A]/50 hover:text-[#1A1007] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Rule />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#3B2A1A]/35">
          <span>© 2025 BrainBoard Inc. All rights reserved.</span>
          <span className="flex gap-4">
            {["Twitter", "Instagram", "LinkedIn", "Discord"].map((s) => (
              <a
                key={s}
                href="#"
                className="hover:text-[#3B2A1A]/70 transition-colors"
              >
                {s}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────
   ROOT
──────────────────────────────────────────── */
export default function BrainBoardPage() {
  return (
    <div
      className="min-h-screen antialiased"
      style={{
        fontFamily:
          "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
      }}
    >
      <Grain />
      <Navbar />
      <Hero />
      <ProductPreview />
      <Features />
      <DashboardSection />
      <Marquee />
      <CTA />
      <Footer />
    </div>
  );
}
