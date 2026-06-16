export const maxDuration = 30;

export type Tone = "thought-leader" | "storyteller" | "data-driven" | "contrarian";
export type Platform = "linkedin" | "x";

export type PostOutput = {
  post: string;
  hook: string;
  hashtags: string[];
  characterCount: number;
};

const DEMOS: Record<Tone, Record<Platform, PostOutput>> = {
  "thought-leader": {
    linkedin: {
      hook: "The uncomfortable truth about AI that nobody wants to say out loud:",
      post: `The uncomfortable truth about AI that nobody wants to say out loud:

Most companies aren't failing at AI because of the technology.

They're failing because they're automating broken processes.

Here's what I've learned after watching hundreds of AI implementations:

→ AI amplifies what already exists — good processes get better, broken ones break faster.
→ The ROI isn't in the tool. It's in the workflow redesign that comes before it.
→ The teams winning with AI aren't the most technical. They're the most intentional.

The question isn't "how do we implement AI?"

It's "what decisions do we actually want humans making vs. machines?"

That's a leadership question. Not a tech question.

What's your answer?`,
      hashtags: ["#AI", "#Leadership", "#FutureOfWork", "#Strategy"],
      characterCount: 520,
    },
    x: {
      hook: "Most companies are failing at AI — and it's not the tech's fault.",
      post: `Most companies are failing at AI — and it's not the tech's fault.

They're automating broken processes and wondering why the results are broken too.

The teams winning? They redesign the workflow BEFORE they touch the tool.

AI amplifies what's already there. Fix the foundation first.`,
      hashtags: ["#AI", "#Strategy"],
      characterCount: 280,
    },
  },
  storyteller: {
    linkedin: {
      hook: "Three years ago I couldn't get a single investor to take my call.",
      post: `Three years ago I couldn't get a single investor to take my call.

Last month, three reached out to me.

What changed?

Not my pitch deck. Not my network. Not my credentials.

It was a post I wrote at midnight after a failed meeting — honest, a little angry, and completely unfiltered.

I talked about what nobody talks about: how many times you have to rebuild before something sticks.

It got shared 400 times. My inbox lit up.

The irony? I'd been trying to craft the "perfect" professional voice for years.

Turns out, my actual voice was the thing that opened every door.

Don't wait until you're successful to be real.
The realness is what gets you there.`,
      hashtags: ["#Entrepreneurship", "#Authenticity", "#Startups", "#Founder"],
      characterCount: 620,
    },
    x: {
      hook: "I wrote a post at midnight after a failed meeting. 400 shares. 3 investors in my inbox.",
      post: `I wrote a post at midnight after a failed meeting.
400 shares. 3 investors in my inbox.

I'd spent years crafting the "perfect" professional voice.

Turns out my actual voice was the thing that opened every door.

Don't wait until you're successful to be real. The realness is what gets you there.`,
      hashtags: ["#Founder", "#Startups"],
      characterCount: 280,
    },
  },
  "data-driven": {
    linkedin: {
      hook: "I analyzed 200 AI tool launches in 2024. Here's what the data actually shows:",
      post: `I analyzed 200 AI tool launches in 2024. Here's what the data actually shows:

📊 87% of AI tools fail to retain users past week 3
📊 Tools with a focused single use-case see 4x better retention
📊 The top 10% of tools shared one thing: extreme clarity on who they're NOT for
📊 Pricing above $29/mo required enterprise sales, not self-serve — no exceptions

The pattern is clear:

Narrow tools win. Broad platforms die.

The founders who kept it simple, kept it cheap, and kept saying "no" to features — they're the ones still building in year 2.

Data doesn't lie. The AI graveyard is full of tools that tried to do everything.

What's the most focused AI tool you've found actually useful?`,
      hashtags: ["#AI", "#SaaS", "#ProductStrategy", "#Data"],
      characterCount: 640,
    },
    x: {
      hook: "Analyzed 200 AI tool launches. One pattern separated the winners from the graveyard:",
      post: `Analyzed 200 AI tool launches.

87% failed to retain users past week 3.

The 13% that survived? Extreme clarity on who they were NOT for.

Narrow tools win. Broad platforms die.

The AI graveyard is full of tools that tried to do everything.`,
      hashtags: ["#AI", "#SaaS", "#ProductStrategy"],
      characterCount: 280,
    },
  },
  contrarian: {
    linkedin: {
      hook: "Hot take: \"Building in public\" is hurting more founders than it's helping.",
      post: `Hot take: "Building in public" is hurting more founders than it's helping.

I know, I know. The content playbook says to share everything.

But here's what nobody mentions:

→ You optimize for likes instead of learning.
→ You perform progress instead of making it.
→ Your competitors see your playbook in real time.
→ You build an audience before you build a business.

The founders I know who've built quietly and shipped properly? They're eating the ones who documented every "day 47 of building."

There's a difference between transparency and theater.

The best founders I've studied share the lessons, not the process.

Am I wrong? Tell me.`,
      hashtags: ["#StartupAdvice", "#BuildingInPublic", "#Entrepreneurship", "#Contrarian"],
      characterCount: 580,
    },
    x: {
      hook: "\"Building in public\" is hurting more founders than it's helping. Unpopular opinion:",
      post: `"Building in public" is hurting more founders than it's helping.

You optimize for likes instead of learning.
You perform progress instead of making it.
Your competitors see your playbook in real time.

The best founders share the lessons. Not the process.

Am I wrong?`,
      hashtags: ["#Startups", "#BuildingInPublic"],
      characterCount: 280,
    },
  },
};

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  "thought-leader": "You write like a confident, experienced executive who challenges conventional wisdom. Structured, authoritative, ends with a question or call to reflect. Uses arrow bullets (→) for lists.",
  storyteller: "You write personal, narrative-driven posts that build emotional connection. First-person story with a clear arc: struggle → insight → lesson. No bullet points — flowing paragraphs.",
  "data-driven": "You lead with a specific data point or statistic, then build insights from evidence. Uses emoji bullet points for data (📊). Credible, specific, evidence-based.",
  contrarian: "You challenge popular beliefs in the target space. Opens with a 'hot take' or 'unpopular opinion'. Provocative but grounded. Ends with 'Am I wrong?' or a challenge to the reader.",
};

const CHAR_LIMITS: Record<Platform, number> = { linkedin: 700, x: 280 };

export async function POST(request: Request) {
  let topic: string | undefined;
  let tone: Tone = "thought-leader";
  let platform: Platform = "linkedin";

  try {
    const body = await request.json();
    topic = typeof body?.topic === "string" ? body.topic.trim() : undefined;
    if (["thought-leader","storyteller","data-driven","contrarian"].includes(body?.tone)) tone = body.tone;
    if (["linkedin","x"].includes(body?.platform)) platform = body.platform;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!topic) return Response.json({ error: "Enter a topic or idea." }, { status: 400 });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    await new Promise((r) => setTimeout(r, 1500));
    return Response.json({ demo: true, ...DEMOS[tone][platform] });
  }

  const charLimit = CHAR_LIMITS[platform];
  const platformNote = platform === "x" ? `Under ${charLimit} characters total. No hashtags in body — add at end only.` : `Up to ${charLimit} characters. Hashtags at the end.`;

  const system = `You are a world-class social media copywriter. ${TONE_INSTRUCTIONS[tone]}

Write a single ${platform === "linkedin" ? "LinkedIn" : "X (Twitter)"} post about the topic given. ${platformNote}

Return ONLY valid JSON with these exact fields:
- hook: string (the opening line, max 100 chars, designed to stop the scroll)
- post: string (the full post text including the hook)
- hashtags: string[] (3–5 relevant hashtags with #)
- characterCount: number (approximate character count of the post)

No markdown fences. No explanation. Just the JSON.`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Topic: ${topic}` },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!res.ok) return Response.json({ error: "AI unavailable. Try again shortly." }, { status: 502 });

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";
    let result: PostOutput;
    try {
      result = JSON.parse(raw) as PostOutput;
    } catch {
      return Response.json({ error: "AI returned an unexpected response." }, { status: 500 });
    }
    return Response.json({ demo: false, ...result });
  } catch {
    return Response.json({ error: "Something went wrong. Try again shortly." }, { status: 502 });
  }
}
