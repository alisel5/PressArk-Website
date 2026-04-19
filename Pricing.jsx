const { useState, useMemo, useEffect } = React;

const useViewportWidth = () => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
};

const TIERS = [
  { id: "free", name: "Free", price: 0, blurb: "For writers kicking the tires.", credits: "100K", sites: "1 site", autos: "None", concurrent: "1", model: "DeepSeek V3", cta: "Start free" },
  { id: "pro", name: "Pro", price: 19, blurb: "The default for solo operators.", credits: "5M", sites: "1 site", autos: "5", concurrent: "2", model: "Claude Sonnet 4", cta: "Go Pro", featured: true },
  { id: "team", name: "Team", price: 49, blurb: "Small studios and a few client sites.", credits: "15M", sites: "5 sites", autos: "15", concurrent: "3", model: "Claude Sonnet 4", cta: "Start Team" },
  { id: "agency", name: "Agency", price: 99, blurb: "Fleet management at scale.", credits: "40M", sites: "25 sites", autos: "50", concurrent: "5", model: "Claude Sonnet 4", cta: "Go Agency" },
  { id: "ent", name: "Enterprise", price: 199, blurb: "Unlimited ops, SLA, and SSO.", credits: "100M", sites: "Unlimited", autos: "Unlimited", concurrent: "10", model: "Claude Sonnet 4", cta: "Contact sales" }
];

const MATRIX = [
  {
    title: "Credits and scale",
    rows: [
      ["Monthly credits", "100K", "5M", "15M", "40M", "100M"],
      ["Sites", "1", "1", "5", "25", "Unlimited"],
      ["Automations", "None", "5", "15", "50", "Unlimited"],
      ["Concurrent requests", "1", "2", "3", "5", "10"]
    ]
  },
  {
    title: "AI providers",
    rows: [
      ["Default model", "DeepSeek V3", "Claude Sonnet 4", "Claude Sonnet 4", "Claude Sonnet 4", "Claude Sonnet 4"],
      ["Bring your own key", "Yes", "Yes", "Yes", "Yes", "Yes"],
      ["Provider fallback chains", "No", "Yes", "Yes", "Yes", "Yes"],
      ["Custom local endpoints", "No", "No", "Yes", "Yes", "Yes"]
    ]
  },
  {
    title: "Workflow tools",
    rows: [
      ["Content tool catalog", "Yes", "Yes", "Yes", "Yes", "Yes"],
      ["SEO agent", "Basic", "Full", "Full", "Full", "Full"],
      ["WooCommerce tools", "No", "Yes", "Yes", "Yes", "Yes"],
      ["Fleet dashboard", "No", "No", "Yes", "Yes", "Yes"],
      ["White-label reports", "No", "No", "No", "Yes", "Yes"]
    ]
  },
  {
    title: "Security and support",
    rows: [
      ["Approval boundary", "Yes", "Yes", "Yes", "Yes", "Yes"],
      ["Full audit log", "7 days", "30 days", "90 days", "1 year", "Unlimited"],
      ["SSO / SAML", "No", "No", "No", "No", "Yes"],
      ["SLA", "No", "Community", "Email", "Priority", "Dedicated"]
    ]
  }
];

const PACKS = [
  ["800K", "$5", "$6.25 / M"],
  ["2.6M", "$15", "$5.77 / M", true],
  ["6M", "$30", "$5.00 / M"]
];

const FAQ_ITEMS = [
  ["What is a credit, really?", "Credits are the billing units for managed usage. Heavier prompts, more tools, and longer reasoning runs use more credits than light editorial tasks."],
  ["Do credits roll over?", "Monthly plan credits do not roll over. Top-up packs never expire and are consumed only after the monthly allocation is exhausted."],
  ["Can I change plans at any time?", "Yes. Upgrades can happen immediately, while downgrade timing follows the commercial billing cycle."],
  ["What happens in BYOK mode?", "Requests route directly to the provider you configured. Managed credits stay on the PressArk billing path, while provider-side limits and policies still apply."],
  ["Where should I ask plan-specific questions?", "Use the contact page or hello@pressark.com when the answer depends on licensing state, billing setup, or a larger commercial conversation."]
];

const PriceHero = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "10px 16px 56px" : "20px 24px 56px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.3fr 1fr", gap: isMobile ? 24 : 64, alignItems: "end" }}>
      <div>
        <Kicker>Pricing</Kicker>
        <h1 style={{ fontSize: isMobile ? 42 : isTablet ? 56 : 68, fontWeight: 800, letterSpacing: "-.038em", lineHeight: .97, margin: "16px 0 20px", textWrap: "balance" }}>
          Credits, not seats.
          <br />
          Pay for what
          <br />
          you <span style={{ fontStyle: "italic" }}>run</span>.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "#424754", lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
          Every plan includes the WordPress AI copilot for content, SEO, WooCommerce, and site operations. The difference is credit volume and scale. BYOK is available on any tier.
        </p>
      </div>
      <div style={{ padding: isMobile ? 18 : 20, border: "1px solid rgba(112,131,166,.18)", borderRadius: 14, background: "#fff", boxShadow: "0 22px 52px -42px rgba(15,39,72,.28)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <Icon name="key" size={18} style={{ color: "#171c1f" }} />
          <span style={{ fontSize: 13, fontWeight: 700 }}>BYOK - bring your own key</span>
        </div>
        <p style={{ fontSize: 13, color: "#424754", lineHeight: 1.6, margin: "0 0 14px" }}>
          Plug in your OpenRouter, OpenAI, Anthropic, DeepSeek, or Google Gemini key. BYOK sends requests directly to that provider while managed credits stay on the PressArk billing path.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["OpenRouter", "OpenAI", "Anthropic", "DeepSeek", "Google Gemini"].map((provider) => (
            <span key={provider} className="mono" style={{ fontSize: 10, padding: "4px 8px", background: "#fafbfc", border: "1px solid rgba(112,131,166,.14)", borderRadius: 4, color: "#424754", fontWeight: 600 }}>{provider}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const TierCards = ({ isTablet, isMobile, activeId, onHover }) => (
  <section style={{ padding: isMobile ? "0 16px 32px" : "0 24px 32px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(5, minmax(0, 1fr))", gap: 14 }}>
      {TIERS.map((tier) => {
        const featured = tier.featured;
        return (
          <div
            key={tier.id}
            onMouseEnter={() => onHover(tier.id)}
            style={{
              background: featured ? "#171c1f" : "#fff",
              color: featured ? "#fff" : "#171c1f",
              border: featured ? "1px solid #171c1f" : "1px solid rgba(112,131,166,.18)",
              borderRadius: 14,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: featured ? "0 26px 60px -30px rgba(23,28,31,.45)" : "0 10px 26px -22px rgba(15,39,72,.22)",
              transform: activeId === tier.id && !featured ? "translateY(-2px)" : "none",
              transition: "transform .2s"
            }}
          >
            {featured && <span style={{ position: "absolute", top: -10, left: 16, padding: "4px 10px", background: "#0058be", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", borderRadius: 4 }}>Most popular</span>}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: featured ? "#8fa5c6" : "#727785", marginBottom: 4 }}>{tier.name}</div>
              <div style={{ fontSize: 12, color: featured ? "#c9d4e4" : "#727785", lineHeight: 1.4 }}>{tier.blurb}</div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 18 }}>
              <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.03em" }}>${tier.price}</span>
              <span style={{ fontSize: 13, color: featured ? "#c9d4e4" : "#727785" }}>/mo</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20, flex: 1 }}>
              {[
                `${tier.credits} credits`,
                tier.sites,
                tier.autos === "None" || tier.autos === "Unlimited" ? tier.autos : `${tier.autos} automations`,
                `${tier.concurrent} concurrent`,
                tier.model
              ].map((line) => (
                <div key={line} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <Icon name="check" size={14} style={{ color: featured ? "#6ea8ff" : "#727785" }} />
                  <span>{line}</span>
                </div>
              ))}
            </div>
            <button style={{ padding: "10px 14px", borderRadius: 8, fontWeight: 700, fontSize: 13, border: featured ? "none" : "1px solid rgba(112,131,166,.2)", background: featured ? "#fff" : "#f4f6f8", color: "#171c1f", fontFamily: "inherit" }}>
              {tier.cta}
            </button>
          </div>
        );
      })}
    </div>
  </section>
);

const CreditCalculator = ({ isTablet, isMobile }) => {
  const [posts, setPosts] = useState(50);
  const [seo, setSeo] = useState(200);
  const [bulk, setBulk] = useState(2);

  const creditsUsed = useMemo(() => posts * 40000 + seo * 8000 + bulk * 300000, [posts, seo, bulk]);
  const fit = useMemo(() => {
    const limits = { Free: 100000, Pro: 5000000, Team: 15000000, Agency: 40000000, Enterprise: 100000000 };
    return Object.keys(limits).find((name) => creditsUsed <= limits[name]) || "Enterprise+";
  }, [creditsUsed]);
  const fmt = (value) => value >= 1e6 ? `${(value / 1e6).toFixed(1).replace(/\.0$/, "")}M` : value >= 1e3 ? `${Math.round(value / 1e3)}K` : `${value}`;

  return (
    <section style={{ padding: isMobile ? "56px 16px" : "56px 24px", background: "#fafbfc", borderTop: "1px solid rgba(112,131,166,.12)", borderBottom: "1px solid rgba(112,131,166,.12)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1.2fr", gap: isMobile ? 24 : 48, alignItems: "center" }}>
        <div>
          <Kicker>Credit estimator</Kicker>
          <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0", lineHeight: 1.08 }}>How much do I actually need?</h2>
          <p style={{ fontSize: 15, color: "#424754", lineHeight: 1.6, margin: 0 }}>
            A rough model based on real usage. Blog drafting and metadata are cheap; bulk inventory sweeps and long agent loops are where credits add up.
          </p>
        </div>
        <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.18)", borderRadius: 14, padding: isMobile ? 20 : 24, boxShadow: "0 22px 52px -42px rgba(15,39,72,.28)" }}>
          {[
            ["Blog posts / month", posts, setPosts, 0, 500, 10, "40K credits each"],
            ["SEO tune-ups", seo, setSeo, 0, 2000, 20, "8K credits each"],
            ["Bulk / Woo batches", bulk, setBulk, 0, 100, 1, "300K credits each"]
          ].map(([label, value, setValue, min, max, step, cost]) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#171c1f" }}>{label}</span>
                <span className="mono" style={{ fontSize: 12, color: "#727785" }}>{value} / {cost}</span>
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} style={{ width: "100%", accentColor: "#171c1f" }} />
            </div>
          ))}
          <div style={{ marginTop: 20, padding: 16, background: "#fafbfc", border: "1px solid rgba(112,131,166,.14)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#727785", marginBottom: 4 }}>Your estimate</div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em" }}>{fmt(creditsUsed)} credits</div>
            </div>
            <div style={{ textAlign: isMobile ? "left" : "right" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#727785", marginBottom: 4 }}>Best fit</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#0058be" }}>{fit}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureMatrix = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "72px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 32, display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <Kicker>Full comparison</Kicker>
          <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", lineHeight: 1.08 }}>Every feature, every plan.</h2>
        </div>
        <span className="mono" style={{ fontSize: 11, color: "#727785" }}>4 sections / 17 rows</span>
      </div>
      <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.18)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table style={{ width: "100%", minWidth: 860, borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#fafbfc", borderBottom: "1px solid rgba(112,131,166,.14)" }}>
                <th style={{ padding: "16px 20px", textAlign: "left", width: 260 }} />
                {TIERS.map((tier) => (
                  <th key={tier.name} style={{ padding: "16px 12px", fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: tier.name === "Pro" ? "#0058be" : "#171c1f", textAlign: "center" }}>{tier.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((section) => (
                <React.Fragment key={section.title}>
                  <tr style={{ background: "#fafbfc" }}>
                    <td colSpan={6} style={{ padding: "10px 20px", fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#727785", borderTop: "1px solid rgba(112,131,166,.14)", borderBottom: "1px solid rgba(112,131,166,.14)" }}>{section.title}</td>
                  </tr>
                  {section.rows.map((row, index) => (
                    <tr key={row[0]} style={{ borderBottom: index < section.rows.length - 1 ? "1px solid rgba(112,131,166,.08)" : "none" }}>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "#424754", fontWeight: 500 }}>{row[0]}</td>
                      {row.slice(1).map((value, valueIndex) => (
                        <td key={`${row[0]}-${valueIndex}`} style={{ padding: "14px 12px", textAlign: "center", fontSize: 13, color: "#171c1f", background: valueIndex === 1 ? "rgba(0,88,190,.025)" : "transparent" }}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);

const PacksAndByok = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 72px" : "0 24px 72px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.1fr 1fr", gap: 24 }}>
      <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.18)", borderRadius: 14, padding: isMobile ? 20 : 28 }}>
        <Kicker>Top-up packs</Kicker>
        <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", margin: "12px 0 10px", lineHeight: 1.15 }}>Run out? Buy a pack.</h3>
        <p style={{ fontSize: 14, color: "#424754", lineHeight: 1.55, margin: "0 0 20px" }}>
          Packs never expire. They are consumed only after your monthly allocation runs out.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 10 }}>
          {PACKS.map(([credits, price, rate, featured]) => (
            <div key={credits} style={{ padding: 16, border: featured ? "1px solid #171c1f" : "1px solid rgba(112,131,166,.18)", borderRadius: 10, background: featured ? "#fafbfc" : "#fff", position: "relative" }}>
              {featured && <span style={{ position: "absolute", top: -9, right: 10, padding: "2px 8px", fontSize: 9, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", background: "#171c1f", color: "#fff", borderRadius: 4 }}>Best</span>}
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em" }}>{credits}</div>
              <div style={{ fontSize: 13, color: "#727785", marginBottom: 10 }}>{price} one-time</div>
              <div className="mono" style={{ fontSize: 10, color: "#727785" }}>{rate}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg,#1d3557,#0a1526)", color: "#fff", borderRadius: 14, padding: isMobile ? 20 : 28, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(33,112,228,.35), transparent 70%)", filter: "blur(24px)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 10px", background: "rgba(255,255,255,.1)", borderRadius: 4, marginBottom: 16 }}>
            <Icon name="key" size={14} style={{ color: "#6ea8ff" }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#c9d4e4" }}>BYOK policy</span>
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 12px", lineHeight: 1.15 }}>Bring your key. We take zero overhead.</h3>
          <p style={{ fontSize: 14, color: "#c9d4e4", lineHeight: 1.6, margin: "0 0 20px" }}>
            When you connect your own provider key, tokens bill directly to your account. PressArk credits are only spent on the internal agent loop and approval workflow.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Keys are encrypted at rest with Sodium authenticated encryption.",
              "A Freemius license is still required for plugin access.",
              "Provider limits and retention rules still apply in BYOK mode."
            ].map((line) => (
              <div key={line} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <Icon name="check" size={14} style={{ color: "#6ea8ff" }} />
                <span style={{ fontSize: 13, color: "#c9d4e4" }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FaqItem = ({ q, a, open, onToggle }) => (
  <div style={{ borderBottom: "1px solid rgba(112,131,166,.14)" }}>
    <button onClick={onToggle} style={{ width: "100%", padding: "20px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", color: "#171c1f" }}>
      <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-.01em" }}>{q}</span>
      <Icon name={open ? "remove" : "add"} size={20} style={{ color: "#727785", flexShrink: 0 }} />
    </button>
    {open && <div style={{ padding: "0 4px 20px", fontSize: 14, color: "#424754", lineHeight: 1.65, maxWidth: 780 }}>{a}</div>}
  </div>
);

const Faq = ({ isMobile }) => {
  const [open, setOpen] = useState(0);

  return (
    <section style={{ padding: isMobile ? "56px 16px" : "72px 24px", background: "#fafbfc", borderTop: "1px solid rgba(112,131,166,.12)", borderBottom: "1px solid rgba(112,131,166,.12)" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <Kicker>FAQ</Kicker>
          <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", lineHeight: 1.08 }}>Still have questions?</h2>
        </div>
        <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.18)", borderRadius: 14, padding: isMobile ? "4px 18px" : "4px 28px" }}>
          {FAQ_ITEMS.map(([q, a], index) => (
            <FaqItem key={q} q={q} a={a} open={open === index} onToggle={() => setOpen(open === index ? -1 : index)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PriceCta = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px 64px" : "72px 24px 80px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", background: "#171c1f", color: "#fff", borderRadius: 20, padding: isMobile ? 24 : 56, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(circle at 20% 50%, black 10%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at 20% 50%, black 10%, transparent 70%)" }} />
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.4fr 1fr", gap: isMobile ? 24 : 56, alignItems: "center" }}>
        <div>
          <Kicker tone="light">Ready when you are</Kicker>
          <h2 style={{ fontSize: isMobile ? 32 : 44, fontWeight: 800, letterSpacing: "-.035em", margin: "14px 0 16px", lineHeight: 1.05, textWrap: "balance" }}>Install free. Upgrade when you outgrow it.</h2>
          <p style={{ fontSize: 16, color: "#c9d4e4", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 520 }}>
            Free tier available. GPL-licensed, self-hosted, and auditable. Works with WordPress 6.x and PHP 8.0+.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://pressark.com/pressark.zip" target="_blank" rel="noreferrer noopener" style={{ padding: "13px 24px", background: "#fff", color: "#171c1f", borderRadius: 10, fontWeight: 700, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", flex: isMobile ? "1 1 100%" : "0 0 auto" }}>
              <Icon name="download" size={18} /> Download plugin
            </a>
            <a href="contact.html" style={{ padding: "13px 24px", background: "rgba(255,255,255,.08)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", borderRadius: 10, fontWeight: 700, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", flex: isMobile ? "1 1 100%" : "0 0 auto" }}>
              <Icon name="chat" size={18} /> Talk to sales
            </a>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            ["Free tier", "100K credits and 1 site"],
            ["Top-up packs", "800K, 2.6M, or 6M extra credits"],
            ["BYOK on any plan", "Direct-provider routing available"]
          ].map(([title, body]) => (
            <div key={title} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10 }}>
              <Icon name="verified" fill size={18} style={{ color: "#6ea8ff" }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{title}</div>
                <div style={{ fontSize: 12, color: "#8fa5c6" }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PricingApp = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;
  const [active, setActive] = useState("pro");

  return (
    <>
      <Nav current="Pricing" />
      <PriceHero isTablet={isTablet} isMobile={isMobile} />
      <TierCards isTablet={isTablet} isMobile={isMobile} activeId={active} onHover={setActive} />
      <CreditCalculator isTablet={isTablet} isMobile={isMobile} />
      <FeatureMatrix isMobile={isMobile} />
      <PacksAndByok isTablet={isTablet} isMobile={isMobile} />
      <Faq isMobile={isMobile} />
      <PriceCta isTablet={isTablet} isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<PricingApp />);
