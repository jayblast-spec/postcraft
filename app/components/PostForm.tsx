"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Tone, Platform, PostOutput } from "../api/post/route";

type State = "idle" | "loading" | "error" | (PostOutput & { demo: boolean });

const TONES: { id: Tone; label: string; icon: string; desc: string }[] = [
  { id: "thought-leader", label: "Thought Leader", icon: "🔭", desc: "Challenge conventional wisdom" },
  { id: "storyteller", label: "Storyteller", icon: "📖", desc: "Build emotional connection" },
  { id: "data-driven", label: "Data-Driven", icon: "📊", desc: "Lead with evidence" },
  { id: "contrarian", label: "Contrarian", icon: "⚡", desc: "Challenge the status quo" },
];

const PLATFORMS: { id: Platform; label: string; color: string }[] = [
  { id: "linkedin", label: "LinkedIn", color: "text-[#0077b5]" },
  { id: "x", label: "X (Twitter)", color: "text-foreground" },
];

export default function PostForm() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("thought-leader");
  const [platform, setPlatform] = useState<Platform>("linkedin");
  const [state, setState] = useState<State>("idle");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!topic.trim() || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), tone, platform }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setState("error"); return; }
      setState(data as PostOutput & { demo: boolean });
    } catch {
      setState("error");
    }
  }

  async function copyPost() {
    if (typeof state !== "object") return;
    await navigator.clipboard.writeText(state.post + "\n\n" + state.hashtags.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isResult = typeof state === "object";

  return (
    <section id="craft" className="mx-auto w-full max-w-2xl px-4 pb-32">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Topic */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">What do you want to post about?</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Why most AI implementations fail, building in public, leadership lessons…"
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        {/* Platform */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Platform</label>
          <div className="flex gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatform(p.id)}
                className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all ${
                  platform === p.id
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tone */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Tone</label>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t.id)}
                className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                  tone === t.id
                    ? "border-accent bg-accent-soft"
                    : "border-border bg-surface hover:border-accent/40"
                }`}
              >
                <span className="text-lg leading-none">{t.icon}</span>
                <div>
                  <p className={`text-sm font-semibold ${tone === t.id ? "text-accent" : "text-foreground"}`}>
                    {t.label}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={state === "loading" || !topic.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-white transition-all disabled:opacity-50 hover:opacity-90 active:scale-[0.99]"
        >
          {state === "loading" ? (
            <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Crafting your post…</>
          ) : "Craft post →"}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {state === "error" && (
          <motion.div
            key="err"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
          >
            Something went wrong. Try again shortly.
          </motion.div>
        )}

        {isResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 flex flex-col gap-4"
          >
            {state.demo && (
              <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent-soft px-3 py-2 text-xs text-accent-2">
                <span>✍</span> Demo mode — add GROQ_API_KEY to generate real posts
              </div>
            )}

            {/* Hook highlight */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-accent/40 bg-accent-soft p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Hook line</p>
              <p className="text-sm font-semibold text-foreground leading-relaxed">{state.hook}</p>
            </motion.div>

            {/* Full post */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-2xl border border-border bg-surface p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
                {platform === "linkedin" ? "LinkedIn post" : "X post"} · ~{state.characterCount} chars
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground leading-relaxed font-sans">
                {state.post}
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                {state.hashtags.map((h) => (
                  <span key={h} className="text-xs text-accent font-medium">{h}</span>
                ))}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={copyPost}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              {copied ? "✓ Copied to clipboard" : "Copy post + hashtags"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
