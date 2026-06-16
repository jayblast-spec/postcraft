export type IntelligenceInput = { input?: string };
const product = {
  "repo": "PostCraft",
  "suite": "Creator / Founder Tools",
  "domain": "Distribution intelligence",
  "accent": "from-pink-300 via-rose-300 to-orange-300",
  "hero": "Turn founder lessons into posts people remember and share.",
  "sub": "PostCraft is a point-of-view engine for founders and creators who want proof-backed content, platform-native angles, and a publishing system that compounds over time.",
  "input": "Lesson: we stopped mass-deploying weak templates and rebuilt ExposureWatch as the flagship standard",
  "cta": "Craft distribution pack",
  "score": "Post strength",
  "modules": [
    [
      "Raw lesson capture",
      "Extract the sharp truth from messy build notes."
    ],
    [
      "Narrative spine",
      "Create a beginning, tension, insight, and useful takeaway."
    ],
    [
      "Platform variants",
      "Shape LinkedIn, X, newsletter, and short-form versions."
    ],
    [
      "Proof archive",
      "Attach receipts, screenshots, URLs, and before/after evidence."
    ]
  ],
  "rows": [
    [
      "LinkedIn thesis",
      "Authority",
      "High",
      "Explain the lesson with strategic weight and credibility."
    ],
    [
      "X thread",
      "Reach",
      "Medium",
      "Break the lesson into concise, repeatable points."
    ],
    [
      "Newsletter note",
      "Retention",
      "Medium",
      "Turn the build into an audience relationship asset."
    ],
    [
      "Launch CTA",
      "Conversion",
      "High",
      "Invite users or contributors into a concrete next step."
    ]
  ],
  "missions": [
    [
      "Voice memory",
      "Learn the founder’s style without generic AI tone."
    ],
    [
      "Proof attachment system",
      "Add screenshots, commits, URLs, and metrics to posts."
    ],
    [
      "Content calendar",
      "Turn lessons into a weekly publishing rhythm."
    ],
    [
      "Analytics feedback loop",
      "Use performance to improve future angles."
    ]
  ]
} as const;
function scoreFor(subject: string) { let score = 57 + Math.min(30, Math.floor(subject.length / 6)); if (/risk|urgent|investor|client|payment|contract|meeting|decision|launch|proof|delay/i.test(subject)) score += 7; return Math.min(98, score); }
function band(score: number) { return score >= 86 ? 'strong' : score >= 72 ? 'ready' : score >= 60 ? 'needs review' : 'starter'; }
export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.input;
  const score = scoreFor(subject);
  return {
    product: product.repo,
    brand: 'ArkNet Digital',
    suite: product.suite,
    domain: product.domain,
    subject,
    score,
    status: band(score),
    executive_summary: product.sub,
    intelligence_map: product.modules.map(([label, value]) => ({ label, value, status: score >= 72 ? 'priority' : 'review' })),
    action_queue: product.rows.slice(0, 3).map(([item, owner, priority, note]) => ({ action: item + ' - ' + owner, priority, impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
    generated_at: new Date().toISOString()
  };
}
