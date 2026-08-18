<div align="center">

# PostCraft

### One Idea, Four Tones, Two Platforms, Ten Seconds

PostCraft turns a topic into a scroll-stopping LinkedIn or X post across four tone modes — Professional, Casual, Storytelling, and Controversial — with platform-specific formatting and a hook-first structure. No signup, no paywall, no per-post limit.

<p>
  <a href="https://postcraft-one.vercel.app"><img alt="Live Demo" src="https://img.shields.io/badge/Live-Demo-1D4ED8?style=for-the-badge&logo=vercel&logoColor=white"></a>
  <a href="https://github.com/jayblast-spec/postcraft"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Product%20Layer-007ACC?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-Design%20System-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Framer Motion" src="https://img.shields.io/badge/Framer%20Motion-Interface%20Motion-1D4ED8?style=flat-square&logo=framer&logoColor=white">
  <img alt="Groq" src="https://img.shields.io/badge/Groq-Fast%20Inference-F55036?style=flat-square">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated PostCraft headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Topic+in+%E2%86%92+Post+out+in+10s;4+tones%3A+Pro%2C+Casual%2C+Story%2C+Controversial;LinkedIn+long-form+%2B+X+punchy;Regenerate+until+it+lands">
</p>

</div>

## What It Does

PostCraft takes a topic and generates a post optimized separately for LinkedIn (long-form) and X (punchy), in one of four selectable tones — Professional, Casual, Storytelling, or Controversial — each opening with a proven hook structure designed to stop the scroll. A generated draft can be regenerated for a new variant or copied straight to the clipboard for pasting into the platform composer.

## How It Works

- `app/page.tsx` renders the landing shell with `HeroSection`, `FeaturesSection`, and the `PostForm` input component.
- `app/api/post/route.ts` sends the topic and selected tone/platform to the Groq Chat Completions API (`llama-3.3-70b-versatile`) and falls back to a pre-written demo post per tone/platform combination when no API key is set.
- Styling is Tailwind CSS with Framer Motion handling interface transitions; the app is a single Next.js App Router deployment with no database layer.

## Engineering Notes

**The real problem:** "AI post generator" tools tend to produce one generic voice regardless of what you ask for — a LinkedIn post and an X post need different structure (long-form narrative vs. punchy hook), not just a shorter character count.

**The approach:** tone and platform are separate, explicit prompt inputs rather than one blended setting, so a "storytelling" LinkedIn post and a "storytelling" X post are generated as genuinely different structures, not the same text truncated.

**One real number:** demo fallbacks are pre-written per tone-per-platform combination (`Record<Tone, Record<Platform, PostOutput>>`) — every tone/platform pair has a real worked example, not one generic placeholder shown regardless of selection.

**Not handled yet:** `app/api/intelligence` is a separate, disconnected decorative endpoint, not a real formatting pass on the generated post.

## Live

[postcraft-one.vercel.app](https://postcraft-one.vercel.app)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| AI | Groq (`llama-3.3-70b-versatile`) |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Deployment | Vercel |

<div align="center">

<img alt="Footer" src="https://capsule-render.vercel.app/api?type=rect&height=60&color=0:1D4ED8,55:0B1E3D,100:020617&text=michael%40arknet.digital&fontColor=FAFAFA&fontSize=18&fontAlign=50&animation=fadeIn">

</div>
