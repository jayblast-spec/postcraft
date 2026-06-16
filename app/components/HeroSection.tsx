"use client";

import { motion } from "framer-motion";

const EXAMPLES = ["thought leader", "data-driven analyst", "contrarian thinker", "compelling storyteller"];

export default function HeroSection({ onTryClick }: { onTryClick: () => void }) {
  return (
    <section className="fire-bg dot-grid relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-warm-pink/5 blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-2"
        >
          <span>✍</span> AI-Powered Post Generator
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Write posts that
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            actually get read
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          Enter a topic, pick your tone, choose your platform. Get a scroll-stopping post for
          LinkedIn or X — crafted like a{" "}
          <span className="text-accent-2 font-medium">{EXAMPLES[0]}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            onClick={onTryClick}
            className="rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 active:scale-95 transition-all"
          >
            Craft your post →
          </button>
          <span className="text-xs text-muted">4 tones · LinkedIn + X · Free forever</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {["Thought Leader", "Storyteller", "Data-Driven", "Contrarian"].map((t) => (
            <span key={t} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
      >
        <span className="text-xs">Start crafting</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="h-4 w-px bg-muted/50"
        />
      </motion.div>
    </section>
  );
}
