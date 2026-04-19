const { useState: useStateD, useEffect: useEffectD } = React;

const DOC_SECTIONS = [
  { id: "installation", label: "Installation", icon: "download", summary: "Requirements, activation, and first launch." },
  { id: "configuration", label: "Configuration", icon: "settings", summary: "Onboarding, site profile, indexing, and retention." },
  { id: "byok", label: "BYOK", icon: "vpn_key", summary: "Provider routing, encryption, and license boundaries." },
  { id: "pricing-credits", label: "Pricing + credits", icon: "credit_score", summary: "Tiers, top-ups, and lifecycle accounting." },
  { id: "automations", label: "Automations", icon: "schedule", summary: "Cadence, approvals, limits, and notifications." },
  { id: "tools-overview", label: "Tools overview", icon: "widgets", summary: "Coverage across content, SEO, Woo, and ops." },
  { id: "troubleshooting", label: "Troubleshooting", icon: "build", summary: "Common fixes, support channels, and privacy notes." }
];

const PLAN_ROWS = [
  { name: "Free", price: "$0", credits: "100K", detail: "1 site", model: "DeepSeek V3" },
  { name: "Pro", price: "$19/mo", credits: "5M", detail: "Solo operator default", model: "Claude Sonnet 4", featured: true },
  { name: "Team", price: "$49/mo", credits: "15M", detail: "5 sites", model: "Claude Sonnet 4" },
  { name: "Agency", price: "$99/mo", credits: "40M", detail: "25 sites", model: "Claude Sonnet 4" },
  { name: "Enterprise", price: "$199/mo", credits: "100M", detail: "Unlimited sites", model: "Custom support" }
];

const TOP_UPS = [
  { credits: "800K", price: "$5" },
  { credits: "2.6M", price: "$15", featured: true },
  { credits: "6M", price: "$30" }
];

const TOOL_GROUPS = [
  {
    title: "Content",
    icon: "article",
    lines: ["Read, create, edit, delete", "Bulk edit and find/replace", "Tone-matched generation and rewrite batches"]
  },
  {
    title: "SEO",
    icon: "monitoring",
    lines: ["Analyze and fix SEO issues", "Yoast, RankMath, and AIOSEO support", "Meta, OG, focus keyword, and internal link coverage"]
  },
  {
    title: "Commerce",
    icon: "shopping_cart",
    lines: ["Products, orders, customers, refunds, analytics", "Inventory, shipping, reviews, emails, webhooks", "Runs only when WooCommerce is active"]
  },
  {
    title: "Media + users",
    icon: "image",
    lines: ["Media CRUD and thumbnail regeneration", "User management, moderation, and comment replies", "Bulk maintenance on shared admin chores"]
  },
  {
    title: "Site ops",
    icon: "dashboard",
    lines: ["Settings, menus, themes, customizer, plugin management", "Diagnostics for performance, crawl, email, query, and cache", "Database cleanup, stats, optimization, and revisions"]
  },
  {
    title: "Builders + workflows",
    icon: "extension",
    lines: ["Gutenberg block CRUD, ACF, FSE templates", "Elementor widget and container editing when Elementor is active", "Deterministic workflows that reduce credit burn on repeated jobs"]
  }
];

const TROUBLESHOOT_ITEMS = [
  {
    title: "Chat panel is missing",
    lines: [
      "Confirm the plugin JavaScript loads cleanly inside wp-admin.",
      "Check for plugin conflicts and verify the user has pressark_manage_settings.",
      "Editors and above should see the full assistant surface."
    ]
  },
  {
    title: "Provider or API failures",
    lines: [
      "Verify the key is valid and not expired.",
      "Check the selected provider status page before retrying.",
      "In BYOK mode, provider rate limits still apply."
    ]
  },
  {
    title: "Credits or automation issues",
    lines: [
      "Review the cost ledger when credits look off.",
      "Switch to BYOK if you want to remove credit budget constraints.",
      "For scheduled runs, confirm WP-Cron is enabled or add Action Scheduler."
    ]
  },
  {
    title: "Multisite, privacy, and support",
    lines: [
      "Multisite support is per-site activation only.",
      "Keys are encrypted with Sodium and privacy export/erase is supported.",
      "Support channels: hello@pressark.com and support@pressark.com."
    ]
  }
];

const useViewportWidth = () => {
  const [width, setWidth] = useStateD(window.innerWidth);

  useEffectD(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const SurfaceCard = ({ children, style }) => (
  <div
    style={{
      background: "var(--color-surface-container-lowest)",
      border: "1px solid var(--border-soft)",
      borderRadius: 16,
      boxShadow: "var(--shadow-card)",
      ...style
    }}
  >
    {children}
  </div>
);

const SoftCard = ({ children, style }) => (
  <div
    style={{
      background: "var(--color-surface-container-low)",
      border: "1px solid var(--border-soft)",
      borderRadius: 14,
      ...style
    }}
  >
    {children}
  </div>
);

const ListBlock = ({ items, light }) => (
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
    {items.map((item) => (
      <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Icon
          name="check"
          size={16}
          style={{ color: light ? "#9fc0ff" : "var(--color-primary)", marginTop: 2, flexShrink: 0 }}
        />
        <span style={{ fontSize: 13, color: light ? "#c9d4e4" : "var(--color-ink-muted)", lineHeight: 1.6 }}>{item}</span>
      </li>
    ))}
  </ul>
);

const SectionShell = ({ id, kicker, title, body, children, pad }) => (
  <SurfaceCard id={id} style={{ padding: pad, scrollMarginTop: 108 }}>
    <div style={{ marginBottom: 22 }}>
      <Kicker>{kicker}</Kicker>
      <h2
        style={{
          fontSize: 32,
          fontWeight: 800,
          letterSpacing: "-.03em",
          lineHeight: 1.08,
          margin: "14px 0 10px",
          color: "var(--color-ink)",
          textWrap: "balance"
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 15, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: 0, maxWidth: 760 }}>{body}</p>
    </div>
    {children}
  </SurfaceCard>
);

const DocsHero = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "18px 16px 42px" : "22px 24px 56px" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 7fr) minmax(340px, 5fr)",
        gap: isTablet ? 18 : 28,
        alignItems: "stretch"
      }}
    >
      <div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          <Chip variant="pill">WordPress plugin</Chip>
          <Chip variant="pill">116+ tool surface</Chip>
          <Chip variant="pill">Approval-first writes</Chip>
        </div>
        <Kicker>Documentation hub</Kicker>
        <h1
          style={{
            fontSize: isMobile ? 42 : isTablet ? 54 : 68,
            fontWeight: 800,
            letterSpacing: "-.038em",
            lineHeight: 1,
            margin: "16px 0 18px",
            color: "var(--color-ink)",
            textWrap: "balance"
          }}
        >
          Install, configure, and operate the WordPress copilot with confidence.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 26px", maxWidth: 640 }}>
          Start here to install the WordPress AI copilot, configure BYOK, understand billing, and work through the parts of the tool surface that matter once you are inside wp-admin or WooCommerce.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <Btn variant="primary" icon="download" href="#installation">Start with installation</Btn>
          <Btn variant="ghost" icon="widgets" href="#tools-overview">Browse the tool surface</Btn>
        </div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", color: "var(--color-ink-muted)" }}>
          {["WordPress 6.0+", "PHP 8.0+", "Single-site and per-site multisite activation"].map((item) => (
            <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <Icon name="verified" fill size={16} style={{ color: "var(--color-success)" }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <SurfaceCard
        style={{
          padding: isMobile ? 20 : 28,
          background: "linear-gradient(180deg, #ffffff 0%, #f6fafe 100%)",
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Kicker>Fast start</Kicker>
          <span className="mono" style={{ fontSize: 11, color: "var(--color-outline)" }}>operator guide</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
          {[
            { value: "116+", label: "tools" },
            { value: "5", label: "billing tiers" },
            { value: "3", label: "approval modes" }
          ].map((stat) => (
            <SoftCard key={stat.label} style={{ padding: 14 }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", color: "var(--color-ink)" }}>{stat.value}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".12em" }}>{stat.label}</div>
            </SoftCard>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { n: "01", t: "Install and activate", b: "Upload the plugin or drop it into /wp-content/plugins/, then activate it from wp-admin." },
            { n: "02", t: "Choose your billing mode", b: "Start with managed credits or switch to BYOK during onboarding." },
            { n: "03", t: "Tune the site profile", b: "Set brand, audience, style, tone, indexing scope, and retention windows." }
          ].map((step) => (
            <div
              key={step.n}
              style={{
                display: "grid",
                gridTemplateColumns: "34px minmax(0, 1fr)",
                gap: 14,
                paddingBottom: 12,
                borderBottom: "1px solid rgba(112, 131, 166, .14)"
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "var(--color-surface-container-low)",
                  border: "1px solid var(--border-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--color-ink)"
                }}
              >
                {step.n}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)", marginBottom: 3 }}>{step.t}</div>
                <div style={{ fontSize: 13, color: "var(--color-ink-muted)", lineHeight: 1.55 }}>{step.b}</div>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  </section>
);

const DocsOverview = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 26px" : "0 24px 34px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <Kicker>Read by intent</Kicker>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", lineHeight: 1.1, color: "var(--color-ink)" }}>
          Three ways to move through the docs.
        </h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))",
          gap: 14
        }}
      >
        {[
          {
            title: "Deploy cleanly",
            body: "Start with server requirements, activation paths, and the onboarding flow that configures brand, indexing, and retention.",
            links: ["installation", "configuration"]
          },
          {
            title: "Pick the right billing model",
            body: "Compare managed credits with BYOK, then line up plan limits, top-ups, and the four-step credit lifecycle.",
            links: ["byok", "pricing-credits"]
          },
          {
            title: "Run in production",
            body: "Review automation policies, understand where approvals appear, and keep a checklist for support and failure states.",
            links: ["automations", "troubleshooting"]
          }
        ].map((card) => (
          <SurfaceCard key={card.title} style={{ padding: 22 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 10px", color: "var(--color-ink)" }}>{card.title}</h3>
            <p style={{ fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.6, margin: "0 0 14px" }}>{card.body}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {card.links.map((linkId) => {
                const target = DOC_SECTIONS.find((section) => section.id === linkId);
                return (
                  <a
                    key={linkId}
                    href={`#${linkId}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "var(--color-surface-container-low)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--color-ink)",
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none"
                    }}
                  >
                    <Icon name={target.icon} size={14} style={{ color: "var(--color-primary)" }} />
                    {target.label}
                  </a>
                );
              })}
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  </section>
);

const DocsRail = ({ isTablet }) => (
  <div style={isTablet ? {} : { position: "sticky", top: 96 }}>
    <SurfaceCard style={{ padding: 18, marginBottom: 16 }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
        On this page
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {DOC_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 10,
              background: "transparent",
              color: "var(--color-ink-muted)",
              textDecoration: "none"
            }}
          >
            <Icon name={section.icon} size={16} style={{ color: "var(--color-primary)", marginTop: 1, flexShrink: 0 }} />
            <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)" }}>{section.label}</span>
              <span style={{ fontSize: 12, color: "var(--color-outline)", lineHeight: 1.45 }}>{section.summary}</span>
            </span>
          </a>
        ))}
      </div>
    </SurfaceCard>

    <div
      style={{
        background: "linear-gradient(135deg, var(--color-navy-700), var(--color-navy-900))",
        color: "#ffffff",
        borderRadius: 16,
        padding: 18,
        boxShadow: "var(--shadow-editorial)"
      }}
    >
      <Kicker tone="light">Approval rule</Kicker>
      <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 10px", lineHeight: 1.15 }}>Writes are staged before they land.</h3>
      <p style={{ fontSize: 13, color: "#c9d4e4", lineHeight: 1.6, margin: "0 0 14px" }}>
        PressArk treats destructive actions as review moments. Keep Changes is the blue commit action. Discard stays neutral.
      </p>
      <ListBlock
        light
        items={[
          "Tool traces stay visible while the agent is running.",
          "Destructive actions pause at a human approval boundary.",
          "Audit-friendly language favors Keep Changes and Discard."
        ]}
      />
    </div>
  </div>
);

const InstallationSection = ({ isTablet, pad }) => (
  <SectionShell
    id="installation"
    kicker="01 - Installation"
    title="Get the plugin into wp-admin."
    body="The install story is intentionally simple: upload the plugin, activate it, and open the PressArk menu in the sidebar. The goal is to get operators into the assistant without adding another SaaS surface or login ritual."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 16 }}>
      <SoftCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>Requirements</div>
        <ListBlock
          items={[
            "WordPress 6.0+ and PHP 8.0+.",
            "Works on single sites and multisite, but activation is per-site only.",
            "After activation, the PressArk menu appears directly in the admin sidebar."
          ]}
        />
        <div style={{ height: 1, background: "rgba(112, 131, 166, .14)", margin: "18px 0" }} />
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 8 }}>Install paths</div>
        <ListBlock
          items={[
            "Upload the plugin through the WordPress installer.",
            "Or copy the pressark folder into /wp-content/plugins/.",
            "Activate from Plugins, then complete onboarding inside the plugin UI."
          ]}
        />
      </SoftCard>

      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>CLI activation</div>
        <pre
          style={{
            margin: "0 0 18px",
            padding: "14px 16px",
            background: "var(--color-surface-container-low)",
            border: "1px solid var(--border-soft)",
            borderRadius: 12,
            color: "var(--color-ink)",
            fontSize: 13,
            lineHeight: 1.6,
            overflowX: "auto"
          }}
        >
{`wp plugin activate pressark`}
        </pre>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 8 }}>After activation</div>
        <ListBlock
          items={[
            "Choose managed billing or BYOK during the first-run flow.",
            "Set the site profile so generation matches brand, audience, style, and tone.",
            "Launch the assistant from the sidebar and begin with safe read or draft tasks."
          ]}
        />
      </SurfaceCard>
    </div>
  </SectionShell>
);

const ConfigurationSection = ({ isTablet, isMobile, pad }) => (
  <SectionShell
    id="configuration"
    kicker="02 - Configuration"
    title="Tune the site before you hand work to the agent."
    body="The onboarding flow is where PressArk becomes specific to the site it is operating on. That means voice, indexing scope, and how much historical data the system is allowed to keep around for audit and support."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.2fr .8fr", gap: 16 }}>
      <SurfaceCard style={{ padding: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))", gap: 12 }}>
          {[
            { step: "01", title: "Billing mode", body: "Choose managed billing with PressArk credits or BYOK." },
            { step: "02", title: "Site profile", body: "Set brand, audience, style, and tone for generation context." },
            { step: "03", title: "Content indexing", body: "Select which post types become part of the searchable context." },
            { step: "04", title: "Retention", body: "Tune how long logs, chats, and cost records remain available." }
          ].map((item) => (
            <SoftCard key={item.step} style={{ padding: 16 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", letterSpacing: ".14em", marginBottom: 10 }}>{item.step}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)", marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: "var(--color-ink-muted)", lineHeight: 1.55 }}>{item.body}</div>
            </SoftCard>
          ))}
        </div>
      </SurfaceCard>

      <SoftCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>Default retention windows</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Action logs", value: "90 days" },
            { label: "Chat history", value: "180 days" },
            { label: "Cost ledger", value: "365 days" },
            { label: "Minimum supported window", value: "7 days" }
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                paddingBottom: 10,
                borderBottom: "1px solid rgba(112, 131, 166, .14)"
              }}
            >
              <span style={{ fontSize: 13, color: "var(--color-ink-muted)" }}>{row.label}</span>
              <span className="mono" style={{ fontSize: 12, color: "var(--color-ink)", fontWeight: 700 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </SoftCard>
    </div>
  </SectionShell>
);

const ByokSection = ({ isTablet, isMobile, pad }) => (
  <SectionShell
    id="byok"
    kicker="03 - BYOK"
    title="Bring your own key when you want direct provider billing."
    body="BYOK is the control mode for teams that already have provider contracts. The design-system rule here is clarity: call out provider routing, key handling, and the fact that plugin access still depends on the PressArk license."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.05fr .95fr", gap: 16 }}>
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-navy-700), var(--color-navy-900))",
          color: "#ffffff",
          borderRadius: 16,
          padding: isMobile ? 20 : 24,
          boxShadow: "var(--shadow-editorial)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(33, 112, 228, .35), transparent 70%)",
            filter: "blur(22px)"
          }}
        />
        <div style={{ position: "relative" }}>
          <Kicker tone="light">Direct provider routing</Kicker>
          <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 10px", lineHeight: 1.1 }}>
            Your content goes straight to the provider you selected.
          </h3>
          <p style={{ fontSize: 14, color: "#c9d4e4", lineHeight: 1.65, margin: "0 0 16px" }}>
            In BYOK mode, PressArk does not proxy requests through its own billing layer. You keep the provider relationship and the rate limits that come with it.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {["OpenRouter", "OpenAI", "Anthropic", "DeepSeek", "Google Gemini"].map((provider) => (
              <span
                key={provider}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 11px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.14)",
                  fontSize: 12,
                  color: "#ffffff"
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ea8ff" }} />
                {provider}
              </span>
            ))}
          </div>
          <ListBlock
            light
            items={[
              "API keys are encrypted at rest with Sodium authenticated encryption.",
              "Freemius licensing still gates plugin access even when BYOK is active.",
              "BYOK removes credit budget pressure, but provider limits still matter."
            ]}
          />
        </div>
      </div>

      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          Operating notes
        </div>
        <ListBlock
          items={[
            "Use managed billing when you want a simpler setup and unified credits.",
            "Use BYOK when procurement, data routing, or internal rate cards need to stay in your own stack.",
            "Treat provider failures separately from PressArk failures. They are different debugging paths."
          ]}
        />
        <div style={{ height: 1, background: "rgba(112, 131, 166, .14)", margin: "18px 0" }} />
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 8 }}>
          What stays true either way
        </div>
        <ListBlock
          items={[
            "The assistant still stages destructive writes for human review.",
            "Site profile, indexing, and retention rules apply the same way.",
            "Support and audit surfaces remain inside the plugin UI."
          ]}
        />
      </SurfaceCard>
    </div>
  </SectionShell>
);

const PricingSection = ({ isTablet, isMobile, pad }) => (
  <SectionShell
    id="pricing-credits"
    kicker="04 - Pricing and credits"
    title="Understand the tiers before you scale usage."
    body="The current pricing reference is credit-based. Plans change the amount of monthly credit volume and the number of sites you can cover. Top-ups fill the gap when your monthly cycle is not enough."
    pad={pad}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(5, minmax(0, 1fr))",
        gap: 12,
        marginBottom: 18
      }}
    >
      {PLAN_ROWS.map((plan) => (
        <div
          key={plan.name}
          style={{
            padding: 18,
            borderRadius: 14,
            background: plan.featured ? "var(--color-ink)" : "var(--color-surface-container-low)",
            color: plan.featured ? "#ffffff" : "var(--color-ink)",
            border: plan.featured ? "1px solid var(--color-ink)" : "1px solid var(--border-soft)"
          }}
        >
          <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", color: plan.featured ? "#8fa5c6" : "var(--color-outline)", marginBottom: 8 }}>
            {plan.name}
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 6 }}>{plan.price}</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{plan.credits} credits</div>
          <div style={{ fontSize: 12, color: plan.featured ? "#c9d4e4" : "var(--color-ink-muted)", lineHeight: 1.55 }}>{plan.detail}</div>
          <div className="mono" style={{ fontSize: 11, marginTop: 12, color: plan.featured ? "#c9d4e4" : "var(--color-outline)" }}>{plan.model}</div>
        </div>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : ".9fr 1.1fr", gap: 16 }}>
      <SoftCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          Top-up packs
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 10 }}>
          {TOP_UPS.map((pack) => (
            <div
              key={pack.credits}
              style={{
                padding: 14,
                borderRadius: 12,
                background: pack.featured ? "var(--color-surface-container-lowest)" : "rgba(255,255,255,.58)",
                border: pack.featured ? "1px solid var(--color-ink)" : "1px solid var(--border-soft)"
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", color: "var(--color-ink)" }}>{pack.credits}</div>
              <div style={{ fontSize: 13, color: "var(--color-ink-muted)" }}>{pack.price} one-time</div>
            </div>
          ))}
        </div>
      </SoftCard>

      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          Credit lifecycle
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, minmax(0, 1fr))", gap: 10 }}>
          {["Estimate", "Reserve", "Settle", "Reconcile"].map((step, index) => (
            <SoftCard key={step} style={{ padding: 14 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", marginBottom: 8 }}>{String(index + 1).padStart(2, "0")}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)" }}>{step}</div>
            </SoftCard>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--color-ink-muted)", lineHeight: 1.6, margin: "14px 0 0" }}>
          This four-step cycle is the cleanest way to explain why credits sometimes look reserved before the final cost settles on the ledger.
        </p>
      </SurfaceCard>
    </div>
  </SectionShell>
);

const AutomationsSection = ({ isTablet, isMobile, pad }) => (
  <SectionShell
    id="automations"
    kicker="05 - Automations"
    title="Scheduled prompts still inherit the approval model."
    body="Automations let operators run recurring tasks without babysitting every click, but the design language should still make policy visible. Cadence, approval mode, notifications, and limits all need explicit surfaces."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : ".95fr 1.05fr", gap: 16, marginBottom: 16 }}>
      <SoftCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>Cadence + policy</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {["Minutely", "Hourly", "Daily", "Weekly", "Monthly", "Yearly"].map((item) => (
            <Chip key={item} variant="pill">{item}</Chip>
          ))}
        </div>
        <ListBlock
          items={[
            "Editorial mode requires a human confirm before the write proceeds.",
            "Conservative mode previews changes and keeps review prominent.",
            "Permissive mode is for lower-risk, auto-approved flows."
          ]}
        />
        <div style={{ height: 1, background: "rgba(112, 131, 166, .14)", margin: "18px 0" }} />
        <ListBlock
          items={[
            "Telegram notifications can report success, failure, or policy blocks.",
            "Run Now is available for manual execution outside the schedule.",
            "All automation actions are logged and can be audited later."
          ]}
        />
      </SoftCard>

      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>Approval preview</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {[
            { tool: "seo_scan_site", status: "done", meta: "12 issues found" },
            { tool: "update_meta_batch", status: "done", meta: "draft prepared" },
            { tool: "publish_changes", status: "hold", meta: "waiting for review" }
          ].map((row) => (
            <div key={row.tool} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon
                  name={row.status === "hold" ? "schedule" : "check"}
                  size={14}
                  style={{ color: row.status === "hold" ? "var(--color-warning)" : "var(--color-primary)" }}
                />
                <span className="mono" style={{ fontSize: 12, color: "var(--color-ink)" }}>{row.tool}</span>
                <span style={{ fontSize: 11, color: "var(--color-outline)" }}>{row.meta}</span>
              </div>
              <div style={{ height: 3, borderRadius: 999, background: "var(--color-surface-container-low)" }}>
                <div
                  style={{
                    height: "100%",
                    width: row.status === "hold" ? "68%" : "100%",
                    borderRadius: 999,
                    background: "linear-gradient(90deg, var(--color-primary-container), var(--color-primary))"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: 14, borderRadius: 12, background: "var(--color-surface-container-low)", border: "1px solid var(--border-soft)" }}>
          <div style={{ fontSize: 13, color: "var(--color-ink-muted)", lineHeight: 1.55, marginBottom: 12 }}>
            Apply the staged metadata updates to 12 posts?
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button
              style={{
                padding: "11px 14px",
                background: "var(--color-primary)",
                color: "#ffffff",
                border: "none",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "inherit",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              <Icon name="check" size={16} />
              Keep Changes
            </button>
            <button
              style={{
                padding: "11px 14px",
                background: "var(--color-surface-container-lowest)",
                color: "var(--color-ink-muted)",
                border: "1px solid var(--border-soft)",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "inherit",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8
              }}
            >
              <Icon name="close" size={16} />
              Discard
            </button>
          </div>
        </div>
      </SurfaceCard>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(5, minmax(0, 1fr))", gap: 10 }}>
      {[
        { label: "Free", value: "0 automations" },
        { label: "Pro", value: "5 automations" },
        { label: "Team", value: "15 automations" },
        { label: "Agency", value: "50 automations" },
        { label: "Enterprise", value: "Unlimited" }
      ].map((item) => (
        <SoftCard key={item.label} style={{ padding: 14 }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", marginBottom: 6 }}>{item.label}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)" }}>{item.value}</div>
        </SoftCard>
      ))}
    </div>
  </SectionShell>
);

const ToolsSection = ({ isMobile, pad }) => (
  <SectionShell
    id="tools-overview"
    kicker="06 - Tools overview"
    title="The tool surface maps to real admin work."
    body="The important part of the reference is not the raw tool count. It is the way the surface covers the jobs WordPress operators actually do every day, from publishing and SEO to WooCommerce and system maintenance."
    pad={pad}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
        gap: 14,
        marginBottom: 16
      }}
    >
      {TOOL_GROUPS.map((group) => (
        <SurfaceCard key={group.title} style={{ padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "var(--color-surface-container-low)",
                border: "1px solid var(--border-soft)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}
            >
              <Icon name={group.icon} size={18} style={{ color: "var(--color-ink)" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", margin: 0, color: "var(--color-ink)" }}>{group.title}</h3>
          </div>
          <ListBlock items={group.lines} />
        </SurfaceCard>
      ))}
    </div>

    <SoftCard style={{ padding: 18 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Icon name="verified" fill size={18} style={{ color: "var(--color-success)", marginTop: 1 }} />
        <div style={{ fontSize: 13, color: "var(--color-ink-muted)", lineHeight: 1.6 }}>
          WooCommerce and Elementor tools are conditional. They show up only when the matching plugin is active, which keeps the assistant surface tight instead of pretending every site has the same stack.
        </div>
      </div>
    </SoftCard>
  </SectionShell>
);

const TroubleshootingSection = ({ isTablet, isMobile, pad }) => (
  <SectionShell
    id="troubleshooting"
    kicker="07 - Troubleshooting"
    title="Use support surfaces that match the failure."
    body="The fastest fixes come from separating UI issues, provider issues, scheduler issues, and environment issues. The reference page should make those lanes obvious so operators know where to look first."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 14, marginBottom: 16 }}>
      {TROUBLESHOOT_ITEMS.map((item) => (
        <SurfaceCard key={item.title} style={{ padding: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 12px", color: "var(--color-ink)" }}>{item.title}</h3>
          <ListBlock items={item.lines} />
        </SurfaceCard>
      ))}
    </div>

    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f4f8fc 100%)",
        border: "1px solid var(--border-soft)",
        borderRadius: 16,
        padding: isMobile ? 18 : 22,
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "1.1fr .9fr",
        gap: 18,
        alignItems: "center"
      }}
    >
      <div>
        <Kicker>Support channels</Kicker>
        <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 8px", color: "var(--color-ink)" }}>Know when to escalate outside the UI.</h3>
        <p style={{ fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.6, margin: 0 }}>
          Support is still part of the product story. Surface the official inboxes and remind operators that privacy export/erase, encrypted keys, and per-site multisite activation are all part of the operational model.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {["hello@pressark.com", "support@pressark.com"].map((email) => (
          <div
            key={email}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              background: "var(--color-surface-container-lowest)",
              border: "1px solid var(--border-soft)",
              borderRadius: 12
            }}
          >
            <Icon name="mail" size={18} style={{ color: "var(--color-primary)" }} />
            <span className="mono" style={{ fontSize: 12, color: "var(--color-ink)" }}>{email}</span>
          </div>
        ))}
      </div>
    </div>
  </SectionShell>
);

const DocsCta = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 56px" : "0 24px 80px" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        background: "#ffffff",
        border: "1px solid var(--border-soft)",
        borderRadius: 20,
        padding: isMobile ? 24 : 40,
        boxShadow: "var(--shadow-soft)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(23, 28, 31, .03) 1px, transparent 1px), linear-gradient(90deg, rgba(23, 28, 31, .03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at 80% 30%, black 10%, transparent 74%)",
          WebkitMaskImage: "radial-gradient(circle at 80% 30%, black 10%, transparent 74%)"
        }}
      />
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "1.15fr .85fr",
          gap: 24,
          alignItems: "center"
        }}
      >
        <div>
          <Kicker>Next steps</Kicker>
          <h2 style={{ fontSize: isMobile ? 32 : 40, fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.06, margin: "14px 0 12px", color: "var(--color-ink)", textWrap: "balance" }}>
            Use docs as the reference layer, then move into the other product pages.
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 560 }}>
            Installation and operations live here. Features shows the tool surface. Pricing explains credit math. Use the whole page family together when you are shaping the final site.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="primary" icon="widgets" href="features.html">View features</Btn>
            <Btn variant="ghost" icon="account_balance_wallet" href="pricing.html">Review pricing</Btn>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Docs", value: "Install, configure, troubleshoot" },
            { label: "Features", value: "Tool surface and approval loop" },
            { label: "Pricing", value: "Credit volume, packs, and plan fit" }
          ].map((row) => (
            <SoftCard key={row.label} style={{ padding: 14 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", marginBottom: 4 }}>{row.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)", marginBottom: 2 }}>{row.value}</div>
            </SoftCard>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const DocsApp = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;
  const pad = isMobile ? 20 : 28;

  return (
    <>
      <Nav current="Docs" />
      <DocsHero isTablet={isTablet} isMobile={isMobile} />
      <DocsOverview isTablet={isTablet} isMobile={isMobile} />

      <section style={{ padding: isMobile ? "0 16px 18px" : "0 24px 24px" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "260px minmax(0, 1fr)",
            gap: isTablet ? 18 : 26,
            alignItems: "start"
          }}
        >
          <DocsRail isTablet={isTablet} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <InstallationSection isTablet={isTablet} pad={pad} />
            <ConfigurationSection isTablet={isTablet} isMobile={isMobile} pad={pad} />
            <ByokSection isTablet={isTablet} isMobile={isMobile} pad={pad} />
            <PricingSection isTablet={isTablet} isMobile={isMobile} pad={pad} />
            <AutomationsSection isTablet={isTablet} isMobile={isMobile} pad={pad} />
            <ToolsSection isMobile={isMobile} pad={pad} />
            <TroubleshootingSection isTablet={isTablet} isMobile={isMobile} pad={pad} />
          </div>
        </div>
      </section>

      <DocsCta isTablet={isTablet} isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<DocsApp />);
