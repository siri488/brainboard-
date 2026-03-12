"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

/* ─────────────────────────────────────────────
   PALETTE (strict 4-color)
   --white:  #FAF8F3
   --beige:  #D9C9AE  (light) / #B8996E (mid)
   --brown:  #5C3D1E  (dark)  / #3A1F0D (deepest)
   --black:  #0F0A06
───────────────────────────────────────────── */

/* ── Animation helpers ── */
const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.11, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function useReveal(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin } as any);
  return { ref, inView };
}

/* ── Magnetic cursor ── */
function useMagnetic(strength = 0.35) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, []);

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, []);

  return { sx, sy, onMove, onLeave };
}

/* ── Noise overlay ── */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E";

/* ════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF8F3]/88 backdrop-blur-2xl border-b border-[#D9C9AE]/40 shadow-[0_2px_32px_rgba(58,31,13,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-10 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#5C3D1E] to-[#3A1F0D] shadow-lg group-hover:shadow-[#5C3D1E]/40 transition-shadow duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="2.5"
                  y="2.5"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  opacity="0.95"
                />
                <rect
                  x="10.5"
                  y="2.5"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  opacity="0.55"
                />
                <rect
                  x="2.5"
                  y="10.5"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  opacity="0.55"
                />
                <rect
                  x="10.5"
                  y="10.5"
                  width="5"
                  height="5"
                  rx="1.2"
                  fill="white"
                  opacity="0.95"
                />
              </svg>
            </div>
          </div>
          <span
            className="text-xl font-black tracking-tight text-[#0F0A06]"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Brain<span className="text-[#5C3D1E]">Board</span>
          </span>
        </motion.a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Dashboard", "Insights", "Pricing"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="relative text-sm font-medium text-[#5C3D1E]/70 hover:text-[#3A1F0D] transition-colors group"
            >
              {l}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#B8996E] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm font-semibold text-[#5C3D1E]/80 hover:text-[#3A1F0D] px-4 py-2 transition-colors">
            Log in
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="text-sm font-bold bg-[#3A1F0D] text-[#FAF8F3] px-6 py-2.5 rounded-xl shadow-[0_4px_20px_rgba(58,31,13,0.3)] hover:shadow-[0_8px_30px_rgba(58,31,13,0.4)] hover:bg-[#5C3D1E] transition-all duration-300"
          >
            Get started →
          </motion.button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-0.5 w-6 bg-[#3A1F0D] rounded-full origin-center"
              animate={
                open
                  ? i === 0
                    ? { rotate: 45, y: 8 }
                    : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="md:hidden overflow-hidden bg-[#FAF8F3] border-b border-[#D9C9AE]/40"
          >
            <div className="px-6 py-5 space-y-4">
              {["Features", "Dashboard", "Insights", "Pricing"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="block text-[#3A1F0D] font-semibold text-base"
                >
                  {l}
                </a>
              ))}
              <button className="w-full bg-[#3A1F0D] text-[#FAF8F3] font-bold py-3 rounded-xl mt-2">
                Get started free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ════════════════════════════════════════════
   HERO  — split layout: left text + right image
════════════════════════════════════════════ */
function Hero() {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 80]);
  const textY = useTransform(scrollY, [0, 600], [0, -40]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Animated counter
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let n = 0;
      const id = setInterval(() => {
        n += 834;
        if (n >= 50000) {
          setCount(50000);
          clearInterval(id);
        } else setCount(n);
      }, 16);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAF8F3] flex items-center">
      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 opacity-[0.032] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "180px" }}
      />

      {/* ── Background geometry ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large warm circle */}
        <motion.div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(184,153,110,0.18) 0%, rgba(217,201,174,0.08) 60%, transparent 80%)",
          }}
          animate={{ scale: [1, 1.04, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bottom left blob */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(92,61,30,0.08) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Decorative grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#5C3D1E"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating dots */}
        {[
          { cx: "12%", cy: "25%", r: 3, d: 0 },
          { cx: "88%", cy: "72%", r: 4, d: 1.5 },
          { cx: "6%", cy: "70%", r: 2, d: 3 },
          { cx: "92%", cy: "20%", r: 3, d: 2 },
          { cx: "50%", cy: "90%", r: 2.5, d: 0.8 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#B8996E]"
            style={{
              left: dot.cx,
              top: dot.cy,
              width: dot.r * 2,
              height: dot.r * 2,
            }}
            animate={{ y: [0, -16, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{
              duration: 5 + dot.d,
              repeat: Infinity,
              delay: dot.d,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 xl:px-10 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center min-h-[80vh]">
          {/* ─── LEFT: Text ─── */}
          <motion.div
            style={{ y: textY }}
            className="flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2 bg-[#3A1F0D]/6 border border-[#B8996E]/30 rounded-full px-4 py-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#5C3D1E]"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#5C3D1E]">
                  Now with AI Study Coach
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.h1
                variants={fadeUp}
                className="font-black leading-[0.88] tracking-[-0.03em] text-[#0F0A06] mb-2"
                style={{
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontSize: "clamp(3.2rem, 6.5vw, 5.5rem)",
                }}
              >
                Your second
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="relative mb-2 inline-block"
              >
                <h1
                  className="font-black leading-[0.88] tracking-[-0.03em] text-[#0F0A06]"
                  style={{
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontSize: "clamp(3.2rem, 6.5vw, 5.5rem)",
                  }}
                >
                  brain is{" "}
                  <span className="relative inline-block text-[#5C3D1E]">
                    here.
                    {/* Underline draw */}
                    <motion.svg
                      viewBox="0 0 200 12"
                      className="absolute -bottom-2 left-0 w-full"
                      style={{ overflow: "visible" }}
                    >
                      <motion.path
                        d="M 2 8 Q 100 2 198 8"
                        stroke="#B8996E"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.1, delay: 1.0, ease }}
                      />
                    </motion.svg>
                  </span>
                </h1>
              </motion.div>

              {/* Sub */}
              <motion.p
                variants={fadeUp}
                custom={3}
                className="mt-8 text-[#5C3D1E]/65 leading-relaxed max-w-md"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
              >
                BrainBoard organises your notes, deadlines and AI-powered study
                summaries into one calm, beautiful workspace — built for
                students who refuse to settle.
              </motion.p>

              {/* CTA row */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="flex flex-wrap items-center gap-4 mt-10"
              >
                <MagneticButton className="flex items-center gap-2.5 bg-[#3A1F0D] text-[#FAF8F3] font-bold px-8 py-4 rounded-2xl text-base shadow-[0_8px_32px_rgba(58,31,13,0.35)] hover:shadow-[0_16px_48px_rgba(58,31,13,0.45)] hover:bg-[#5C3D1E] transition-all duration-300">
                  <span>Start for free</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </MagneticButton>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2.5 text-[#3A1F0D] font-semibold px-6 py-4 rounded-2xl border-2 border-[#D9C9AE] hover:border-[#B8996E] bg-white/50 backdrop-blur-sm transition-all duration-300 text-base"
                >
                  <PlayIcon />
                  Watch 2-min demo
                </motion.button>
              </motion.div>

              {/* Social proof strip */}
              <motion.div
                variants={fadeUp}
                custom={5}
                className="flex flex-wrap items-center gap-6 mt-10"
              >
                {/* Avatars */}
                <div className="flex -space-x-2.5">
                  {["#5C3D1E", "#B8996E", "#3A1F0D", "#D9C9AE", "#0F0A06"].map(
                    (bg, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.2 + i * 0.07, duration: 0.4 }}
                        className="w-8 h-8 rounded-full border-2 border-[#FAF8F3] flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: bg }}
                      >
                        {["AS", "MT", "PK", "LR", "EN"][i]}
                      </motion.div>
                    ),
                  )}
                </div>
                <div>
                  <div className="text-sm font-black text-[#0F0A06]">
                    {count.toLocaleString()}+ students
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {"★★★★★".split("").map((s, i) => (
                      <span key={i} className="text-[#B8996E] text-xs">
                        {s}
                      </span>
                    ))}
                    <span className="text-xs text-[#5C3D1E]/60 ml-1">
                      4.9 / 5
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Hero Image ─── */}
          <motion.div
            style={{ y: imgY }}
            className="relative flex items-center justify-center"
          >
            {/* Glow halo */}
            <motion.div
              className="absolute inset-0 rounded-[3rem]"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(184,153,110,0.28) 0%, rgba(217,201,174,0.12) 50%, transparent 75%)",
              }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
              className="relative z-10 w-full max-w-[520px]"
            >
              {/* Decorative ring */}
              <motion.div
                className="absolute -inset-4 rounded-[2.5rem] border-2 border-[#D9C9AE]/50"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main photo frame */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(58,31,13,0.30),_0_0_0_1px_rgba(184,153,110,0.2)]">
                {/* Actual image — student studying, warm tones */}
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85&auto=format&fit=crop"
                  alt="Students collaborating and studying with BrainBoard"
                  className="w-full h-[500px] object-cover object-center"
                  style={{
                    filter: "sepia(12%) saturate(110%) brightness(0.97)",
                  }}
                />

                {/* Gradient overlay — bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A1F0D]/60 via-transparent to-transparent" />

                {/* Top-left overlay badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.7, ease }}
                  className="absolute top-5 left-5 flex items-center gap-2.5 bg-[#FAF8F3]/92 backdrop-blur-md border border-[#D9C9AE]/60 rounded-2xl px-4 py-3 shadow-lg"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#5C3D1E] to-[#3A1F0D] flex items-center justify-center text-sm">
                    🧠
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#0F0A06]">
                      AI Summary ready
                    </div>
                    <div className="text-[10px] text-[#5C3D1E]/70">
                      Chapter 7 — Physics
                    </div>
                  </div>
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>

                {/* Bottom streak card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.7, ease }}
                  className="absolute bottom-5 left-5 right-5 bg-[#FAF8F3]/90 backdrop-blur-md border border-[#D9C9AE]/50 rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-[#0F0A06]">
                      Today's focus
                    </span>
                    <span className="text-xs text-[#5C3D1E]/60">
                      Wed · Mar 11
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {[
                      { label: "Studied", val: "3.5h", icon: "📚" },
                      { label: "Tasks", val: "7/9", icon: "✅" },
                      { label: "Streak", val: "14🔥", icon: "" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex-1 text-center bg-[#D9C9AE]/30 rounded-xl py-2 px-1"
                      >
                        <div className="text-sm font-black text-[#3A1F0D]">
                          {s.val}
                        </div>
                        <div className="text-[9px] text-[#5C3D1E]/60 font-semibold mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Floating note card — top right */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.9, duration: 0.8, ease }}
                className="absolute -top-6 -right-6 bg-[#3A1F0D] rounded-2xl p-4 shadow-2xl w-48"
                style={{ rotate: 3 }}
              >
                <div className="text-[10px] text-[#D9C9AE]/60 font-bold uppercase tracking-wider mb-1.5">
                  Quick note
                </div>
                <div className="text-xs text-[#FAF8F3] font-medium leading-relaxed">
                  "Newton's 3rd law — every action has an equal &amp; opposite
                  reaction"
                </div>
                <div className="mt-2 flex gap-1">
                  {["Physics", "Exam"].map((t) => (
                    <span
                      key={t}
                      className="text-[9px] bg-[#5C3D1E] text-[#D9C9AE] px-2 py-0.5 rounded-full font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Floating score badge — bottom right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 2.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                }}
                className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#FAF8F3] rounded-full shadow-2xl border-4 border-[#D9C9AE]/40 flex flex-col items-center justify-center"
              >
                <div className="text-xl font-black text-[#5C3D1E]">97</div>
                <div className="text-[9px] text-[#B8996E] font-bold">Focus</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#FAF8F3] to-transparent pointer-events-none" />
    </section>
  );
}

/* Magnetic button wrapper */
function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { sx, sy, onMove, onLeave } = useMagnetic(0.25);
  return (
    <motion.button
      style={{ x: sx, y: sy }}
      onMouseMove={onMove as any}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function PlayIcon() {
  return (
    <div className="w-7 h-7 rounded-full bg-[#D9C9AE]/40 flex items-center justify-center">
      <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
        <path d="M1 1.5L9 6L1 10.5V1.5Z" fill="#3A1F0D" />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════
   MARQUEE  — scrolling features
════════════════════════════════════════════ */
function Marquee() {
  const items = [
    "📝 Smart Notes",
    "🗓️ Deadline Tracker",
    "🤖 AI Summaries",
    "📊 Study Analytics",
    "⚡ Focus Mode",
    "🔗 Collaboration",
    "🃏 Flashcards",
    "📈 Grade Insights",
    "🔔 Smart Reminders",
    "🌙 Dark Mode",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden bg-[#3A1F0D] py-4 border-y border-[#5C3D1E]">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D9C9AE] flex-shrink-0"
          >
            {item}
            <span className="text-[#B8996E]/40 mx-2">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════
   FEATURES
════════════════════════════════════════════ */
const features = [
  {
    icon: "📝",
    title: "Smart Note-Taking",
    desc: "Rich text, backlinks, code blocks, and auto-tagging. Your ideas finally connect the way your brain does.",
    accent: "#B8996E",
    bg: "from-[#D9C9AE]/20 to-transparent",
  },
  {
    icon: "🗓️",
    title: "Deadline Tracking",
    desc: "Calendar sync, smart reminders, and priority scheduling. Never miss a submission again.",
    accent: "#5C3D1E",
    bg: "from-[#5C3D1E]/8 to-transparent",
  },
  {
    icon: "🤖",
    title: "AI Study Summaries",
    desc: "Upload lecture slides or paste notes — get instant, accurate summaries and quiz questions.",
    accent: "#3A1F0D",
    bg: "from-[#D9C9AE]/25 to-transparent",
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    desc: "Beautiful charts of your study sessions, streaks, and topic mastery over time.",
    accent: "#B8996E",
    bg: "from-[#B8996E]/12 to-transparent",
  },
  {
    icon: "⚡",
    title: "Deep Focus Mode",
    desc: "Pomodoro timer, ambient sounds, and zero distractions for your hardest study sessions.",
    accent: "#5C3D1E",
    bg: "from-[#5C3D1E]/10 to-transparent",
  },
  {
    icon: "🔗",
    title: "Study Groups",
    desc: "Real-time collaborative notes, shared boards, and group deadline tracking.",
    accent: "#3A1F0D",
    bg: "from-[#D9C9AE]/15 to-transparent",
  },
];

function Features() {
  const { ref, inView } = useReveal();

  return (
    <section
      id="features"
      className="py-32 bg-[#FAF8F3] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,_rgba(184,153,110,0.07)_0%,_transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-[0.2em] text-[#B8996E] mb-5"
          >
            Everything you need
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-black text-[#0F0A06] leading-[0.92] tracking-tight mb-6"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
            }}
          >
            Built for the modern
            <br />
            <span className="text-[#5C3D1E]">student brain.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-[#5C3D1E]/65 text-lg max-w-xl mx-auto leading-relaxed"
          >
            From scattered notes to sharp focus — every feature is designed
            around how students actually think and work.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ f, i }: { f: (typeof features)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group relative bg-gradient-to-br ${f.bg} border border-[#D9C9AE]/50 rounded-3xl p-8 overflow-hidden cursor-pointer`}
    >
      {/* Animated background blob on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${f.accent}12, transparent 70%)`,
        }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.4 }}
      />

      {/* Glass shimmer on hover */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-3xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {/* Icon with animated ring */}
        <div className="relative w-14 h-14 mb-6">
          <motion.div
            className="absolute inset-0 rounded-2xl border-2"
            style={{ borderColor: f.accent + "40" }}
            animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.4 }}
          />
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: `${f.accent}18` }}
          >
            {f.icon}
          </div>
        </div>

        <h3
          className="font-black text-[#0F0A06] text-xl mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {f.title}
        </h3>
        <p className="text-sm text-[#5C3D1E]/65 leading-relaxed">{f.desc}</p>

        <motion.div
          className="mt-6 flex items-center gap-1.5 text-xs font-bold"
          style={{ color: f.accent }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          Explore feature
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7h8M8 3.5L11.5 7 8 10.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   DASHBOARD PREVIEW
════════════════════════════════════════════ */
function DashboardPreview() {
  const { ref, inView } = useReveal();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="dashboard"
      className="py-32 bg-[#0F0A06] relative overflow-hidden"
    >
      {/* Top/bottom dividers */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#5C3D1E]/60 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#5C3D1E]/60 to-transparent" />

      {/* BG noise */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "160px" }}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,_rgba(92,61,30,0.25)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center"
        >
          {/* Left text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-black uppercase tracking-[0.2em] text-[#B8996E] mb-5"
            >
              Command center
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-black text-white leading-[0.9] tracking-tight mb-6"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              }}
            >
              One view.
              <br />
              <span className="text-[#B8996E]">Zero chaos.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-[#D9C9AE]/55 text-lg leading-relaxed mb-10"
            >
              BrainBoard's dashboard gives you an instant read on your day —
              deadlines, notes, AI nudges, and focus data, all in one breath.
            </motion.p>

            <div className="space-y-4">
              {[
                {
                  icon: "⚡",
                  text: "Kanban + list task views, always in sync",
                },
                {
                  icon: "🔗",
                  text: "Bi-directional note linking that thinks for you",
                },
                {
                  icon: "📈",
                  text: "Smart deadline forecasting across all subjects",
                },
                {
                  icon: "🌅",
                  text: "Morning digest of exactly what matters today",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  variants={fadeUp}
                  custom={i + 3}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#5C3D1E]/30 border border-[#5C3D1E]/50 flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-sm text-[#D9C9AE]/75 font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              variants={fadeUp}
              custom={8}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-10 inline-flex items-center gap-2.5 bg-[#5C3D1E] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#B8996E] hover:text-[#0F0A06] transition-all duration-300 shadow-[0_8px_32px_rgba(92,61,30,0.4)]"
            >
              See the full dashboard →
            </motion.button>
          </motion.div>

          {/* Right — live mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-gradient-to-br from-[#5C3D1E]/20 via-[#B8996E]/5 to-transparent rounded-[3rem] blur-3xl" />
            <div className="relative rounded-3xl overflow-hidden border border-[#3A1F0D]/60 shadow-[0_40px_120px_rgba(0,0,0,0.6)] bg-[#FAF8F3]">
              {/* Tab bar */}
              <div className="flex items-center gap-1.5 p-4 bg-[#FAF8F3] border-b border-[#D9C9AE]/60">
                <div className="flex gap-1.5 mr-3">
                  {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                    <div
                      key={c}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                {["Notes", "Tasks", "Analytics"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeTab === i
                        ? "bg-[#3A1F0D] text-[#FAF8F3]"
                        : "text-[#5C3D1E]/60 hover:bg-[#D9C9AE]/40"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 space-y-3 bg-[#FAF8F3]"
                  >
                    {[
                      {
                        title: "Organic Chemistry — Chapter 8",
                        tag: "Science",
                        t: "Today",
                        icon: "🧪",
                      },
                      {
                        title: "The French Revolution",
                        tag: "History",
                        t: "Yesterday",
                        icon: "📜",
                      },
                      {
                        title: "Linear Algebra — Matrix ops",
                        tag: "Math",
                        t: "Mon",
                        icon: "📐",
                      },
                      {
                        title: "Essay outline — Climate Policy",
                        tag: "English",
                        t: "Sun",
                        icon: "✍️",
                      },
                    ].map((n) => (
                      <motion.div
                        key={n.title}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#D9C9AE]/60 hover:border-[#B8996E]/60 hover:shadow-sm transition-all cursor-pointer"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#D9C9AE]/40 flex items-center justify-center text-base flex-shrink-0">
                          {n.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-[#0F0A06] truncate">
                            {n.title}
                          </div>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[10px] bg-[#D9C9AE]/50 text-[#5C3D1E] px-2 py-0.5 rounded-full font-semibold">
                              {n.tag}
                            </span>
                            <span className="text-[10px] text-[#B8996E]/70">
                              {n.t}
                            </span>
                          </div>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B8996E] flex-shrink-0" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div
                    key="tasks"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 space-y-2.5 bg-[#FAF8F3]"
                  >
                    {[
                      { text: "Submit Bio Lab Report", p: "High", done: false },
                      { text: "Calc Problem Set 9", p: "High", done: true },
                      { text: "Read Chapter 12", p: "Med", done: false },
                      {
                        text: "Flashcard review — Vocab",
                        p: "Low",
                        done: false,
                      },
                      { text: "Group project check-in", p: "Med", done: true },
                    ].map((task) => (
                      <motion.div
                        key={task.text}
                        whileHover={{ x: 3 }}
                        className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#D9C9AE]/50 cursor-pointer hover:shadow-sm transition-all"
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${task.done ? "bg-[#3A1F0D] border-[#3A1F0D]" : "border-[#D9C9AE]"}`}
                        >
                          {task.done && (
                            <svg viewBox="0 0 10 10" className="w-3 h-3">
                              <path
                                d="M2 5l2.5 2.5 3.5-4"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                fill="none"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-xs flex-1 font-medium ${task.done ? "line-through text-[#B8996E]/50" : "text-[#0F0A06]"}`}
                        >
                          {task.text}
                        </span>
                        <span
                          className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${task.p === "High" ? "bg-[#3A1F0D]/10 text-[#3A1F0D]" : task.p === "Med" ? "bg-[#B8996E]/15 text-[#5C3D1E]" : "bg-[#D9C9AE]/50 text-[#B8996E]"}`}
                        >
                          {task.p}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 bg-[#FAF8F3] space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { l: "Hours this week", v: "18.5h" },
                        { l: "Tasks completed", v: "34" },
                        { l: "Study streak", v: "14 days 🔥" },
                      ].map((s) => (
                        <div
                          key={s.l}
                          className="bg-white border border-[#D9C9AE]/50 rounded-2xl p-3 text-center"
                        >
                          <div className="text-base font-black text-[#3A1F0D]">
                            {s.v}
                          </div>
                          <div className="text-[9px] text-[#5C3D1E]/60 font-medium mt-1">
                            {s.l}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-[#D9C9AE]/50">
                      <div className="text-xs font-bold text-[#3A1F0D] mb-4">
                        Subject mastery
                      </div>
                      {[
                        { s: "Calculus", p: 88 },
                        { s: "Chemistry", p: 55 },
                        { s: "Literature", p: 92 },
                        { s: "History", p: 73 },
                      ].map((item) => (
                        <div key={item.s} className="mb-3">
                          <div className="flex justify-between text-[11px] mb-1.5">
                            <span className="font-semibold text-[#5C3D1E]">
                              {item.s}
                            </span>
                            <span className="font-black text-[#3A1F0D]">
                              {item.p}%
                            </span>
                          </div>
                          <div className="h-2 bg-[#D9C9AE]/40 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-[#5C3D1E] to-[#B8996E]"
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${item.p}%` } : {}}
                              transition={{ duration: 1.3, delay: 0.2, ease }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   AI INSIGHTS
════════════════════════════════════════════ */
function AIInsights() {
  const { ref, inView } = useReveal();
  const [shown, setShown] = useState(0);
  const started = useRef(false);

  const aiText =
    "Based on your last 4 sessions, you're strongest in calculus but need work on organic chemistry nomenclature. I recommend 20 focused minutes on IUPAC naming before Friday's exam. Want me to generate a quiz?";

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      let i = 0;
      const id = setInterval(() => {
        i++;
        setShown(i);
        if (i >= aiText.length) clearInterval(id);
      }, 24);
    }
  }, [inView]);

  return (
    <section
      id="insights"
      className="py-32 bg-[#FAF8F3] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_60%,_rgba(184,153,110,0.1)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* LEFT — AI card stack */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease }}
            ref={ref}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-[#D9C9AE]/20 to-transparent rounded-3xl blur-2xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              {/* AI bubble */}
              <div className="bg-white rounded-3xl p-7 border border-[#D9C9AE]/60 shadow-[0_8px_40px_rgba(58,31,13,0.08)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5C3D1E] to-[#3A1F0D] flex items-center justify-center shadow-lg">
                    <span className="text-base">🤖</span>
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#0F0A06]">
                      BrainBoard AI
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                        animate={{ scale: [1, 1.6, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-[10px] text-emerald-600 font-bold">
                        Analyzing your patterns
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-[#3A1F0D] leading-relaxed min-h-[70px]">
                  {aiText.slice(0, shown)}
                  {shown < aiText.length && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="inline-block w-0.5 h-4 bg-[#B8996E] ml-0.5 align-middle rounded-full"
                    />
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {["Generate quiz", "Schedule session", "Show weak spots"].map(
                    (a) => (
                      <motion.button
                        key={a}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        className="text-[11px] font-bold bg-[#FAF8F3] border border-[#D9C9AE] text-[#3A1F0D] px-4 py-2 rounded-xl hover:bg-[#D9C9AE]/40 hover:border-[#B8996E] transition-all"
                      >
                        {a}
                      </motion.button>
                    ),
                  )}
                </div>
              </div>

              {/* Mastery chart */}
              <div className="bg-white rounded-3xl p-6 border border-[#D9C9AE]/60 shadow-[0_4px_24px_rgba(58,31,13,0.06)]">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-black text-[#0F0A06]">
                    Subject mastery
                  </span>
                  <span className="text-[11px] text-[#B8996E] font-bold">
                    This week
                  </span>
                </div>
                {[
                  { s: "Calculus", p: 87 },
                  { s: "Chemistry", p: 54 },
                  { s: "History", p: 73 },
                  { s: "Literature", p: 91 },
                ].map((item, i) => (
                  <div key={item.s} className="mb-4 last:mb-0">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-[#5C3D1E]">
                        {item.s}
                      </span>
                      <span className="font-black text-[#3A1F0D]">
                        {item.p}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-[#D9C9AE]/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, #3A1F0D, #B8996E)`,
                        }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${item.p}%` } : {}}
                        transition={{
                          duration: 1.2,
                          delay: 0.3 + i * 0.1,
                          ease,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-black uppercase tracking-[0.2em] text-[#B8996E] mb-5"
            >
              AI-powered coaching
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-black text-[#0F0A06] leading-[0.9] tracking-tight mb-6"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              }}
            >
              Your personal
              <br />
              <span className="text-[#5C3D1E]">AI study coach.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-[#5C3D1E]/65 text-lg leading-relaxed mb-10"
            >
              BrainBoard AI doesn't just summarise — it learns your patterns,
              finds your gaps, and proactively steers your sessions for maximum
              retention and minimum stress.
            </motion.p>

            {[
              {
                icon: "🧠",
                t: "Adaptive summaries",
                d: "Paste any content — your AI condenses it to what matters.",
              },
              {
                icon: "📈",
                t: "Performance insights",
                d: "Know exactly where 30 mins will move your grade the most.",
              },
              {
                icon: "💬",
                t: "Always-on Q&A",
                d: "Ask anything, get quizzes, explanations, and study plans instantly.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.t}
                variants={fadeUp}
                custom={i + 3}
                className="flex gap-5 mb-7"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D9C9AE]/40 border border-[#D9C9AE]/60 flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-black text-[#0F0A06] text-sm mb-1">
                    {item.t}
                  </div>
                  <div className="text-sm text-[#5C3D1E]/60 leading-relaxed">
                    {item.d}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.button
              variants={fadeUp}
              custom={7}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="mt-2 inline-flex items-center gap-2.5 bg-[#3A1F0D] text-[#FAF8F3] font-bold px-8 py-4 rounded-2xl shadow-[0_8px_32px_rgba(58,31,13,0.3)] hover:shadow-[0_16px_48px_rgba(58,31,13,0.4)] hover:bg-[#5C3D1E] transition-all duration-300"
            >
              Try AI insights free →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   TESTIMONIALS
════════════════════════════════════════════ */
const testimonials = [
  {
    name: "Priya Sharma",
    role: "Pre-med · Stanford",
    q: "BrainBoard changed how I study. Grades up, stress down. Nothing else compares.",
    av: "PS",
  },
  {
    name: "Marcus T.",
    role: "CS Major · MIT",
    q: "The AI summaries for lecture notes are insanely good. Saves me 3 hours a week.",
    av: "MT",
  },
  {
    name: "Layla K.",
    role: "Law · Oxford",
    q: "Tried Notion, Obsidian, Roam. BrainBoard just *thinks* like I do.",
    av: "LK",
  },
  {
    name: "Ethan R.",
    role: "High School · Senior",
    q: "Got into my dream school. BrainBoard kept me on track the entire year.",
    av: "ER",
  },
];

function Testimonials() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-28 bg-[#0F0A06] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#5C3D1E]/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(58,31,13,0.5)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-black uppercase tracking-[0.2em] text-[#B8996E] mb-4"
          >
            Student love
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-black text-white"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
            }}
          >
            50,000+ students.
            <br />
            One favourite app.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="bg-[#FAF8F3]/5 border border-[#5C3D1E]/40 rounded-3xl p-6 backdrop-blur-sm hover:border-[#B8996E]/50 transition-colors"
            >
              <div className="flex gap-0.5 mb-5">
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} className="text-[#B8996E] text-sm">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#D9C9AE]/80 leading-relaxed italic mb-5">
                "{t.q}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5C3D1E] to-[#B8996E] flex items-center justify-center text-white text-[11px] font-black flex-shrink-0">
                  {t.av}
                </div>
                <div>
                  <div className="text-xs font-black text-[#FAF8F3]">
                    {t.name}
                  </div>
                  <div className="text-[10px] text-[#B8996E]/70">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   FINAL CTA
════════════════════════════════════════════ */
function FinalCTA() {
  const { ref, inView } = useReveal();

  return (
    <section className="py-36 bg-[#FAF8F3] relative overflow-hidden">
      {/* Background large text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black text-[#D9C9AE]/15 whitespace-nowrap"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(8rem, 22vw, 20rem)",
            lineHeight: 1,
          }}
        >
          STUDY
        </span>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,_rgba(217,201,174,0.15)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-3xl mx-auto px-6 text-center relative z-10"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-black uppercase tracking-[0.2em] text-[#B8996E] mb-6"
        >
          Ready to start?
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="font-black text-[#0F0A06] leading-[0.88] tracking-tight mb-6"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
          }}
        >
          Study smarter.
          <br />
          <span className="text-[#5C3D1E]">Achieve more.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-lg text-[#5C3D1E]/60 mb-12 leading-relaxed"
        >
          Free forever for students. No credit card. Setup in 90 seconds.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton className="text-base font-black bg-[#3A1F0D] text-[#FAF8F3] px-12 py-5 rounded-2xl shadow-[0_16px_60px_rgba(58,31,13,0.35)] hover:shadow-[0_24px_80px_rgba(58,31,13,0.45)] hover:bg-[#5C3D1E] transition-all duration-300">
            Create free account →
          </MagneticButton>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="text-base font-bold text-[#5C3D1E] px-8 py-5 rounded-2xl border-2 border-[#D9C9AE] hover:border-[#B8996E] transition-all"
          >
            View pricing
          </motion.button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="flex flex-wrap items-center justify-center gap-8 mt-14"
        >
          {[
            { icon: "✓", text: "Free student tier forever" },
            { icon: "✓", text: "Works on web, iOS & Android" },
            { icon: "✓", text: "4.9★ rated on App Store" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-2 text-sm text-[#5C3D1E]/60"
            >
              <span className="text-[#B8996E] font-black">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#0F0A06] border-t border-[#1a0f06] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5C3D1E] to-[#3A1F0D] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <rect
                    x="2.5"
                    y="2.5"
                    width="5"
                    height="5"
                    rx="1.2"
                    fill="white"
                    opacity="0.95"
                  />
                  <rect
                    x="10.5"
                    y="2.5"
                    width="5"
                    height="5"
                    rx="1.2"
                    fill="white"
                    opacity="0.5"
                  />
                  <rect
                    x="2.5"
                    y="10.5"
                    width="5"
                    height="5"
                    rx="1.2"
                    fill="white"
                    opacity="0.5"
                  />
                  <rect
                    x="10.5"
                    y="10.5"
                    width="5"
                    height="5"
                    rx="1.2"
                    fill="white"
                    opacity="0.95"
                  />
                </svg>
              </div>
              <span
                className="font-black text-white text-xl"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Brain<span className="text-[#B8996E]">Board</span>
              </span>
            </div>
            <p className="text-sm text-[#5C3D1E]/55 leading-relaxed max-w-xs mb-6">
              The productivity workspace built for students who want to do more
              with every hour.
            </p>
            <div className="flex gap-3">
              {["𝕏", "ig", "in", "dc"].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="w-9 h-9 rounded-xl border border-[#3A1F0D] flex items-center justify-center text-[#5C3D1E] hover:text-[#D9C9AE] hover:border-[#5C3D1E] transition-colors text-xs font-bold"
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Product",
              links: [
                "Features",
                "Dashboard",
                "AI Insights",
                "Integrations",
                "Changelog",
              ],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Press", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Cookies", "Security"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[11px] font-black uppercase tracking-[0.18em] text-[#5C3D1E] mb-5">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#5C3D1E]/45 hover:text-[#B8996E] transition-colors font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1a0f06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3A1F0D]/50">
            © 2025 BrainBoard, Inc. All rights reserved.
          </p>
          <p className="text-xs text-[#3A1F0D]/30">
            Made with ♥ for students everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════
   ROOT
════════════════════════════════════════════ */
export default function BrainBoardLanding() {
  return (
    <main
      style={{
        fontFamily:
          "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
      }}
    >
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <DashboardPreview />
      <AIInsights />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
