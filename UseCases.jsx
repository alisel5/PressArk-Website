const { useEffect: useEffectU, useState: useStateU } = React;

const useViewportWidth = () => {
  const [width, setWidth] = useStateU(() => window.innerWidth);

  useEffectU(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
};

const PERSONAS = [
  {
    id: "p01",
    n: "01",
    tag: "Bloggers and solo owners",
    icon: "edit_note",
    title: "Write. Let PressArk handle the rest.",
    body: "Focus on the page that makes you money: the writing. PressArk fills in meta descriptions, alt text, internal links, and social cards in one batch you review and approve.",
    layout: "split",
    leftTitle: "The friction",
    rightTitle: "PressArk advantage",
    leftItems: [
      "Hand-writing meta descriptions for every post.",
      "Hunting down missing alt text across large media libraries.",
      "Rebuilding navigation menus one link at a time.",
      "Copy-pasting social tags from old templates."
    ],
    rightItems: [
      "AI-drafted metadata previewed before publish.",
      "One command can add missing alt text everywhere.",
      "Menus can be restructured from a plain-English brief.",
      "Social cards are generated from the post itself."
    ],
    note: "Best fit often starts on Free, then moves to Pro as volume and workflow complexity grow."
  },
  {
    id: "p02",
    n: "02",
    tag: "Agencies and freelancers",
    icon: "workspaces",
    title: "Scale retainers, not headcount.",
    body: "Run the same batch of actions across a fleet of client sites from one control surface. Security patches, SEO fixes, and plugin updates all keep per-site approval trails.",
    layout: "fleet",
    fleet: [
      ["northstar-media.com", "done", "4 plugins updated / 2 SEO fixes"],
      ["bluefin-bakery.co", "done", "Alt text added to 32 images"],
      ["clayworks.shop", "running", "Updating WooCommerce product meta"],
      ["paperclip-studio.design", "done", "Broken links fixed (7)"],
      ["kinetic-legal.com", "pending", "Awaiting approval / 3 actions"]
    ],
    cards: [
      ["Client onboarding", "Clean admin in one command", "Remove bloat, hide default widgets, and normalize admin setup in one reversible batch."],
      ["Fleet maintenance", "Bulk patches across installs", "Run the latest security patch batch across multiple WordPress sites with per-site approval gates."],
      ["White-label reporting", "Client-ready summaries", "Generate monthly maintenance reports with uptime, patches, and content updates in a client-facing format."]
    ]
  },
  {
    id: "p03",
    n: "03",
    tag: "WooCommerce powerhouses",
    icon: "shopping_cart",
    title: "Surgical control over thousands of SKUs.",
    body: "Inventory logic, bulk pricing updates, and customer segmentation all run through natural language with full preview before the write hits your store.",
    layout: "dark",
    bullets: [
      "Works with WooCommerce 8.x and above.",
      "Respects tax zones and variable products.",
      "Order and customer data stays on your server."
    ],
    prompts: [
      ["Inventory flash sale", "Find all products with fewer than five units in stock. Mark them on sale at 15% off for 48 hours and warn me if the total discount exceeds $2,000.", "127 products / $1,842 total discount / pending approval"],
      ["Winback campaign", "List customers who have not purchased in 90 days. Draft a comeback email with a 10% coupon and segment by lifetime value.", "418 customers / 3 segments / draft ready"],
      ["Tax zone sweep", "Audit all physical products for missing shipping classes and HS codes. Flag them for review, but do not auto-write.", "38 products flagged / 0 writes / report attached"]
    ]
  },
  {
    id: "p04",
    n: "04",
    tag: "Marketing teams",
    icon: "campaign",
    title: "Ship landing pages without engineering tickets.",
    body: "Marketers get a natural-language handle on page variants, SEO tags, tracking pixels, and A/B duplicates without routing through the dev backlog.",
    layout: "card",
    badge: "Growth focused",
    prompt: "Create 10 duplicate variants of the Black Friday landing page, each with a different city in the H1 and the matching local phone number in the CTA.",
    meta: "Pages created: 10 / drafts pending approval / publish after review"
  },
  {
    id: "p05",
    n: "05",
    tag: "Technical operators",
    icon: "terminal",
    title: "The Swiss Army knife for admins.",
    body: "Database cleanup, search-and-replace across serialized data, scheduled maintenance windows, and health checks cover the work that used to mean SSH and dread.",
    layout: "card",
    badge: "Precision tools",
    badgeColor: "#0058be",
    prompt: "Optimize all database tables, clear the object cache, replace every http:// with https:// in post content and options, then verify core file integrity.",
    meta: "DB tables: 42 optimized / cache cleared / URLs rewritten: 2,117"
  }
];

const PersonaHead = ({ item, dark, isMobile }) => (
  <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 32, flexDirection: isMobile ? "column" : "row" }}>
    <div style={{ width: 56, height: 56, borderRadius: 14, background: dark ? "rgba(255,255,255,.08)" : "#f4f6f8", border: dark ? "1px solid rgba(255,255,255,.15)" : "1px solid rgba(112,131,166,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={item.icon} size={26} style={{ color: dark ? "#fff" : "#171c1f" }} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: dark ? "#8fa5c6" : "#727785" }}>{item.n}</span>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: dark ? "#8fa5c6" : "#727785" }}>{item.tag}</span>
      </div>
      <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "0 0 10px", lineHeight: 1.05, color: dark ? "#fff" : "#171c1f", textWrap: "balance" }}>{item.title}</h2>
      <p style={{ fontSize: 16, color: dark ? "#c9d4e4" : "#424754", lineHeight: 1.6, margin: 0, maxWidth: 720 }}>{item.body}</p>
    </div>
  </div>
);

const Hero = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "10px 16px 56px" : "20px 24px 72px", position: "relative" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.4fr 1fr", gap: isMobile ? 24 : 64, alignItems: "end" }}>
      <div>
        <Kicker>Solutions and impact</Kicker>
        <h1 style={{ fontSize: isMobile ? 42 : isTablet ? 58 : 72, fontWeight: 800, letterSpacing: "-.038em", lineHeight: .95, margin: "16px 0 20px", color: "#171c1f", textWrap: "balance" }}>
          Copilot workflows
          <br />
          for <span style={{ fontStyle: "italic" }}>WordPress teams</span>
          <br />
          and Woo stores.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "#424754", lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
          Five distinct workflow patterns. One plugin. PressArk works as a copilot for WordPress websites and WooCommerce stores, whether you run one publication or a fleet of client installs.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", border: "1px solid rgba(112,131,166,.18)", borderRadius: 12, overflow: "hidden", background: "#fff", boxShadow: "0 22px 52px -42px rgba(15,39,72,.28)" }}>
        {[
          ["Solo publishers", "Content", "Draft, optimize, and stage post updates from one assistant surface."],
          ["Agencies", "Fleet", "Run approvals and maintenance across multiple client installs."],
          ["Woo stores", "Catalog", "Manage inventory, pricing, and store operations with staged writes."]
        ].map(([label, value, body], index) => (
          <div key={label} style={{ padding: 20, borderTop: index ? "1px solid rgba(112,131,166,.14)" : "none", display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#727785" }}>{label}</div>
            <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "baseline", flexDirection: isMobile ? "column" : "row", gap: 12 }}>
              <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-.03em", color: "#171c1f" }}>{value}</span>
              <span style={{ fontSize: 12, color: "#424754", lineHeight: 1.5 }}>{body}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PersonaRail = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 32px" : "0 24px 48px", position: isTablet ? "static" : "sticky", top: isTablet ? undefined : 90, zIndex: 20 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "repeat(5, minmax(160px, 1fr))" : "repeat(5, 1fr)", minWidth: isTablet ? 840 : undefined, border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, background: "#fff", overflow: "hidden", boxShadow: "0 12px 32px -24px rgba(15,39,72,.22)" }}>
        {PERSONAS.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} style={{ display: "flex", flexDirection: "column", gap: 4, padding: "14px 18px", textDecoration: "none", color: "#171c1f", borderLeft: index ? "1px solid rgba(112,131,166,.12)" : "none" }}>
            <span className="mono" style={{ fontSize: 10, color: "#727785" }}>{item.n}</span>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-.01em" }}>{item.title.split(".")[0]}</span>
            <span style={{ fontSize: 11, color: "#727785", textTransform: "uppercase", letterSpacing: ".12em", fontWeight: 600 }}>{item.tag.split(" ")[0]}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const SplitPersona = ({ item, isTablet, isMobile }) => (
  <section id={item.id} style={{ padding: isMobile ? "32px 16px" : "48px 24px", scrollMarginTop: 180 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <PersonaHead item={item} isMobile={isMobile} />
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
        <div style={{ padding: isMobile ? 22 : 32, borderRight: isTablet ? "none" : "1px solid rgba(112,131,166,.14)", borderBottom: isTablet ? "1px solid rgba(112,131,166,.14)" : "none" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#dc2626", marginBottom: 16 }}>{item.leftTitle}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {item.leftItems.map((line) => (
              <div key={line} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 18, height: 18, borderRadius: 4, background: "#fef2f2", border: "1px solid rgba(220,38,38,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Icon name="close" size={12} style={{ color: "#dc2626" }} />
                </span>
                <span style={{ fontSize: 14, color: "#424754", lineHeight: 1.55 }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: isMobile ? 22 : 32 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#16a34a", marginBottom: 16 }}>{item.rightTitle}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {item.rightItems.map((line) => (
              <div key={line} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ width: 18, height: 18, borderRadius: 4, background: "#f0fdf4", border: "1px solid rgba(22,163,74,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Icon name="check" size={12} style={{ color: "#16a34a" }} />
                </span>
                <span style={{ fontSize: 14, color: "#171c1f", lineHeight: 1.55, fontWeight: 500 }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, display: "flex", alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", gap: 14, padding: "14px 20px", background: "#fafbfc", border: "1px solid rgba(112,131,166,.14)", borderRadius: 10 }}>
        <Icon name="auto_awesome" size={18} style={{ color: "#171c1f" }} />
        <span style={{ fontSize: 13, color: "#424754", flex: 1 }}>{item.note}</span>
        <a href="pricing.html" style={{ fontSize: 13, fontWeight: 700, color: "#171c1f", textDecoration: "none" }}>See pricing</a>
      </div>
    </div>
  </section>
);

const FleetPersona = ({ item, isTablet, isMobile }) => (
  <section id={item.id} style={{ padding: isMobile ? "32px 16px" : "48px 24px", background: "#fafbfc", borderTop: "1px solid rgba(112,131,166,.12)", borderBottom: "1px solid rgba(112,131,166,.12)", scrollMarginTop: 180 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <PersonaHead item={item} isMobile={isMobile} />
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.1fr 1fr", gap: 28 }}>
        <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.18)", borderRadius: 14, padding: 20, boxShadow: "0 22px 52px -42px rgba(15,39,72,.28)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(112,131,166,.12)", flexWrap: "wrap" }}>
            <Icon name="dashboard" size={18} style={{ color: "#171c1f" }} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Fleet dashboard</span>
            <span className="mono" style={{ marginLeft: "auto", fontSize: 11, color: "#727785" }}>8 sites / batch running</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {item.fleet.map(([name, state, meta]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "#fafbfc", border: "1px solid rgba(112,131,166,.12)", borderRadius: 8, flexWrap: isMobile ? "wrap" : "nowrap" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: state === "done" ? "#16a34a" : state === "running" ? "#0058be" : "#d97706" }} />
                <span className="mono" style={{ fontSize: 12, color: "#171c1f", fontWeight: 500, overflowWrap: "anywhere" }}>{name}</span>
                <span style={{ fontSize: 12, color: "#727785", marginLeft: isMobile ? 20 : "auto" }}>{meta}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {item.cards.map(([kicker, title, body]) => (
            <div key={title} style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#727785", marginBottom: 4 }}>{kicker}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#171c1f", marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: "#424754", lineHeight: 1.55 }}>{body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const DarkPersona = ({ item, isTablet, isMobile }) => (
  <section id={item.id} style={{ padding: isMobile ? "40px 16px" : "64px 24px", scrollMarginTop: 180 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ background: "linear-gradient(135deg,#1d3557,#0a1526)", color: "#fff", borderRadius: 20, padding: isMobile ? 24 : 48, position: "relative", overflow: "hidden", boxShadow: "0 50px 120px -60px rgba(11,29,56,.7)" }}>
        <div style={{ position: "absolute", top: -80, right: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(33,112,228,.35), transparent 70%)", filter: "blur(30px)" }} />
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1.2fr", gap: isMobile ? 24 : 56, alignItems: "start" }}>
          <div>
            <PersonaHead item={item} dark isMobile={isMobile} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {item.bullets.map((line) => (
                <div key={line} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Icon name="check" size={16} style={{ color: "#6ea8ff" }} />
                  <span style={{ fontSize: 13, color: "#c9d4e4" }}>{line}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {item.prompts.map(([title, prompt, result]) => (
              <div key={title} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#8fa5c6", marginBottom: 10 }}>{title}</div>
                <div style={{ fontSize: 14, color: "#fff", lineHeight: 1.5, fontStyle: "italic", paddingLeft: 12, borderLeft: "2px solid rgba(110,168,255,.5)", marginBottom: 12 }}>
                  "{prompt}"
                </div>
                <div style={{ fontSize: 11, color: "#8fa5c6", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="check_circle" size={14} style={{ color: "#6ea8ff" }} />
                  {result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CardPersonaPair = ({ items, isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "32px 16px" : "48px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 24 }}>
      {items.map((item) => (
        <div key={item.id} id={item.id} style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 16, padding: isMobile ? 24 : 32, display: "flex", flexDirection: "column", gap: 20, scrollMarginTop: 180, boxShadow: "0 26px 60px -46px rgba(15,39,72,.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f4f6f8", border: "1px solid rgba(112,131,166,.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={item.icon} size={22} style={{ color: "#171c1f" }} />
            </div>
            <span style={{ padding: "5px 11px", background: item.badgeColor || "#171c1f", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", borderRadius: 4 }}>{item.badge}</span>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <span className="mono" style={{ fontSize: 11, color: "#727785" }}>{item.n}</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#727785" }}>{item.tag}</span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 10px", lineHeight: 1.15, color: "#171c1f", textWrap: "balance" }}>{item.title}</h3>
            <p style={{ fontSize: 14, color: "#424754", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
          </div>
          <div style={{ background: "#fafbfc", border: "1px solid rgba(112,131,166,.14)", borderRadius: 10, padding: 16, fontSize: 13, color: "#171c1f", lineHeight: 1.6, fontStyle: "italic" }}>
            "{item.prompt}"
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 14, borderTop: "1px solid rgba(112,131,166,.12)", flexWrap: "wrap" }}>
            <Icon name="check_circle" size={16} style={{ color: "#16a34a" }} />
            <span className="mono" style={{ fontSize: 11, color: "#424754" }}>{item.meta}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const ComparisonTable = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "72px 24px", background: "#fafbfc", borderTop: "1px solid rgba(112,131,166,.12)", borderBottom: "1px solid rgba(112,131,166,.12)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <Kicker>At a glance</Kicker>
        <h2 style={{ fontSize: isMobile ? 30 : 32, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", lineHeight: 1.1 }}>How the five patterns compare.</h2>
      </div>
      <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", minWidth: 920, borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#fafbfc" }}>
                <th style={{ padding: "14px 18px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#727785", borderBottom: "1px solid rgba(112,131,166,.14)", width: 180 }} />
                {["Bloggers", "Agencies", "WooCommerce", "Marketing", "Technical"].map((col) => (
                  <th key={col} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#171c1f", borderBottom: "1px solid rgba(112,131,166,.14)" }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Typical session", "1 post, 1 site", "Fleet sweep across sites", "Bulk SKU operation", "Variant generation", "Maintenance batch"],
                ["Scale profile", "Light editorial", "Multi-site", "Catalog-heavy", "Campaign-heavy", "Maintenance-heavy"],
                ["Plan path", "Free or Pro", "Team or Agency", "Pro or Team", "Pro", "Pro, Team, or Enterprise"],
                ["Approval model", "Per action", "Per site and per action", "Per batch with preview", "Draft-first", "Staged and dry-run"]
              ].map((row, index) => (
                <tr key={row[0]} style={{ borderBottom: index < 3 ? "1px solid rgba(112,131,166,.1)" : "none" }}>
                  <td style={{ padding: "14px 18px", fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#727785" }}>{row[0]}</td>
                  {row.slice(1).map((value) => (
                    <td key={`${row[0]}-${value}`} style={{ padding: "14px 18px", color: "#171c1f", fontSize: 13 }}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);

const Cta = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px 64px" : "72px 24px 80px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", background: "#fff", border: "1px solid rgba(112,131,166,.18)", borderRadius: 20, padding: isMobile ? 24 : 56, position: "relative", overflow: "hidden", boxShadow: "0 30px 80px -54px rgba(15,39,72,.3)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(23,28,31,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(23,28,31,.03) 1px,transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(circle at 80% 30%, black 10%, transparent 75%)", WebkitMaskImage: "radial-gradient(circle at 80% 30%, black 10%, transparent 75%)" }} />
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.4fr 1fr", gap: isMobile ? 24 : 56, alignItems: "center" }}>
        <div>
          <Kicker>Your workflow, automated</Kicker>
          <h2 style={{ fontSize: isMobile ? 32 : 40, fontWeight: 800, letterSpacing: "-.035em", margin: "14px 0 16px", lineHeight: 1.05, color: "#171c1f", textWrap: "balance" }}>
            Pick your pattern.
            <br />
            Install in under a minute.
          </h2>
          <p style={{ fontSize: 16, color: "#424754", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 520 }}>
            Free tier available. No SaaS lock-in. Works with WordPress 6.x and PHP 8.0+.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="primary" icon="download" href="https://pressark.com/pressark.zip" style={{ flex: isMobile ? "1 1 100%" : "0 0 auto" }}>Download Plugin</Btn>
            <Btn variant="ghost" icon="chat" href="contact.html" style={{ flex: isMobile ? "1 1 100%" : "0 0 auto" }}>Talk to sales</Btn>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            ["Start free", "100K credits, no card"],
            ["Bring your own key", "Pay providers directly"],
            ["GPL-licensed", "Self-host, fork, audit"]
          ].map(([title, body]) => (
            <div key={title} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "#fafbfc", border: "1px solid rgba(112,131,166,.14)", borderRadius: 10 }}>
              <Icon name="verified" fill size={18} style={{ color: "#16a34a" }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#171c1f" }}>{title}</div>
                <div style={{ fontSize: 12, color: "#727785" }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const UseCasesApp = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;

  return (
    <>
      <Nav current="Use Cases" />
      <Hero isTablet={isTablet} isMobile={isMobile} />
      <PersonaRail isTablet={isTablet} isMobile={isMobile} />
      <SplitPersona item={PERSONAS[0]} isTablet={isTablet} isMobile={isMobile} />
      <FleetPersona item={PERSONAS[1]} isTablet={isTablet} isMobile={isMobile} />
      <DarkPersona item={PERSONAS[2]} isTablet={isTablet} isMobile={isMobile} />
      <CardPersonaPair items={PERSONAS.slice(3)} isTablet={isTablet} isMobile={isMobile} />
      <ComparisonTable isMobile={isMobile} />
      <Cta isTablet={isTablet} isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<UseCasesApp />);
