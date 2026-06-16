export type IntelligenceInput = { input?: string };

const product = {
  "repo": "PostCraft",
  "suite": "Creator / Founder Tools",
  "category": "Content engine",
  "audience": "founders, creators, agencies, and build-in-public operators",
  "promise": "turn raw ideas into platform-native posts with a point of view",
  "inputLabel": "Idea, lesson, or product update",
  "placeholder": "We fixed our Forge quality gate so failures now become reusable lessons",
  "primary": "Craft post",
  "gradient": "from-pink-300 via-rose-300 to-orange-300",
  "modules": [
    "Hook generator",
    "Narrative spine",
    "Platform variants",
    "Proof receipts",
    "Publishing calendar"
  ],
  "outputs": [
    "LinkedIn post",
    "X thread outline",
    "CTA options",
    "Repurpose plan"
  ],
  "next": [
    "voice memory",
    "content calendar",
    "analytics feedback loop",
    "auto repurposing studio"
  ]
} as const;

function score(text: string) {
  const length = text.trim().length;
  const diversity = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean)).size;
  return Math.min(97, 48 + Math.floor(length / 7) + Math.min(28, diversity));
}

export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.placeholder;
  const confidence = score(subject);
  const urgency = confidence > 82 ? 'high' : confidence > 66 ? 'medium' : 'starter';
  return {
    product: product.repo,
    category: product.category,
    subject,
    confidence,
    urgency,
    executive_summary: product.promise,
    immediate_outputs: product.outputs.map((output, index) => ({
      title: output,
      detail: output + ' for: ' + subject,
      priority: index === 0 ? 'primary' : index === 1 ? 'supporting' : 'next'
    })),
    automation_plan: product.modules.map((module, index) => ({
      stage: index + 1,
      module,
      value: 'Automate ' + module.toLowerCase() + ' so ' + product.audience + ' can move faster with less manual work.'
    })),
    future_addons: product.next.map((addon, index) => ({
      name: addon,
      horizon: index < 2 ? 'v2' : 'v3',
      contributor_lane: index % 2 === 0 ? 'integration' : 'product intelligence'
    })),
    contributor_brief: 'Improve ' + product.repo + ' by making ' + product.category.toLowerCase() + ' easier for ' + product.audience + '.',
    generated_at: new Date().toISOString()
  };
}
