const TOOLS = [
  { name: "BriefOS", url: "https://briefos-silk.vercel.app", desc: "AI intelligence briefs" },
  { name: "InvoiceKit", url: "https://invoicekit.vercel.app", desc: "Invoice generator" },
  { name: "Exposure Watch", url: "https://exposure-watch.vercel.app", desc: "Breach checker" },
  { name: "PortGuard", url: "https://portguard-six.vercel.app", desc: "Port scanner" },
  { name: "SafeLink", url: "https://safelink-wheat.vercel.app", desc: "Link safety" },
];

export default function Footer({ current = "PostCraft" }: { current?: string }) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted">More free tools by ArkNet Digital</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOOLS.filter((t) => t.name !== current).map((t) => (
            <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-0.5 rounded-xl border border-border bg-surface-2 px-4 py-3 transition-colors hover:border-accent/40">
              <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{t.name}</span>
              <span className="text-xs text-muted">{t.desc}</span>
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted/60">Built by ArkNet Digital · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
