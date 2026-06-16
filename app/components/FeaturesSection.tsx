"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  { icon: "🔭", title: "4 distinct voices", desc: "Thought leader, storyteller, data-driven, contrarian. Each sounds completely different — not just different words." },
  { icon: "⚡", title: "Platform-optimized", desc: "LinkedIn gets long-form authority. X gets punchy, high-impact brevity. Same idea, right format, every time." },
  { icon: "🎯", title: "Hooks that stop the scroll", desc: "Every post leads with a hook engineered to interrupt the feed. No more boring first lines." },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-24">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Your shortcut to a <span className="text-accent">stronger voice</span></h2>
        <p className="mt-3 text-sm text-muted">Stop staring at a blank screen. Start shipping ideas.</p>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-3">
        {FEATURES.map((f, i) => {
          const fRef = useRef(null);
          const fInView = useInView(fRef, { once: true, margin: "-60px" });
          return (
            <motion.div key={f.title} ref={fRef} initial={{ opacity: 0, y: 40 }} animate={fInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.12 }} className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 hover:border-accent/40 transition-colors">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-xl">{f.icon}</span>
              <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
