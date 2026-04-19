const { useState: useStateP, useEffect: useEffectP } = React;

const PRIVACY_SECTIONS = [
  { id: "collection", label: "What we process", icon: "database", summary: "Indexed site content, prompts, logs, and billing metadata." },
  { id: "retention", label: "Retention", icon: "schedule", summary: "Default windows and the configurable 7 to 365 day range." },
  { id: "security-routing", label: "Security and routing", icon: "shield_lock", summary: "Sodium-encrypted keys, BYOK routing, and managed credits." },
  { id: "rights-contact", label: "Rights and contact", icon: "verified_user", summary: "WordPress privacy tools and the right inbox for questions." }
];

const PROCESS_AREAS = [
  {
    title: "Indexed site content",
    icon: "language",
    items: [
      "PressArk processes the site content selected for indexing so the assistant can search, reason about, and act inside the WordPress admin.",
      "The index scope is tied to the operator choices made during setup rather than crawling unrelated external properties."
    ]
  },
  {
    title: "Prompts and action history",
    icon: "chat",
    items: [
      "The product processes AI prompts and responses, action logs, and chat history that are required to operate the assistant experience.",
      "These records support auditability, troubleshooting, and staged approval flows inside the plugin."
    ]
  },
  {
    title: "Billing and licensing metadata",
    icon: "credit_score",
    items: [
      "PressArk keeps the billing metadata needed for service operation and plan enforcement.",
      "Licensing and subscription handling are managed through Freemius rather than a custom licensing surface."
    ]
  }
];

const RETENTION_WINDOWS = [
  { label: "Action logs", window: "90 days", detail: "Operational traces and tool activity default to a shorter audit window." },
  { label: "Chat history", window: "180 days", detail: "Conversation records stay available longer so teams can revisit prior workflows." },
  { label: "Cost ledger", window: "365 days", detail: "Credit and billing records keep the longest default window for reconciliation." }
];

const ROUTING_MODES = [
  {
    title: "BYOK mode",
    tone: "light",
    items: [
      "Requests are sent directly to your configured AI provider.",
      "Provider-side policies, limits, and retention rules still apply once the request leaves PressArk.",
      "This mode is the clearest fit when you want direct provider control instead of managed credits."
    ]
  },
  {
    title: "Managed mode",
    tone: "dark",
    items: [
      "Requests use PressArk-managed routing so usage can be metered against credits.",
      "This is the mode that ties directly into PressArk plan volume and top-up accounting.",
      "The operating model stays the same inside the plugin even though the billing path changes."
    ]
  }
];

const RIGHTS_ITEMS = [
  "PressArk supports WordPress Privacy Export workflows where applicable.",
  "PressArk supports WordPress Privacy Erase workflows where applicable.",
  "Questions about privacy, billing, or support can be routed through hello@pressark.com or support@pressark.com depending on the issue."
];

const CONTACT_LANES = [
  {
    title: "General and privacy questions",
    email: "hello@pressark.com",
    body: "Use this inbox for privacy questions, licensing context, billing clarification, and partnership or enterprise conversations."
  },
  {
    title: "Technical support",
    email: "support@pressark.com",
    body: "Use this inbox when the question is tied to plugin behavior, provider routing, failed actions, or environment-specific debugging."
  }
];

const useViewportWidth = () => {
  const [width, setWidth] = useStateP(window.innerWidth);

  useEffectP(() => {
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

const BulletList = ({ items, light }) => (
  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
    {items.map((item) => (
      <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Icon name="check" size={15} style={{ color: light ? "#9fc0ff" : "var(--color-primary)", marginTop: 2, flexShrink: 0 }} />
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

const Hero = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "18px 16px 42px" : "22px 24px 56px" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 6.9fr) minmax(340px, 5.1fr)",
        gap: isTablet ? 18 : 28,
        alignItems: "stretch"
      }}
    >
      <div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          <Chip variant="pill">WordPress plugin</Chip>
          <Chip variant="pill">BYOK-aware</Chip>
          <Chip variant="pill">Export and erase compatible</Chip>
        </div>
        <Kicker>Privacy policy</Kicker>
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
          Clear privacy boundaries for a WordPress-native AI copilot.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 26px", maxWidth: 660 }}>
          This page explains what the plugin processes, how long operational records stay around by default, how BYOK changes request routing, and where privacy rights map into WordPress-native tools.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <Btn variant="primary" icon="schedule" href="#retention">See retention defaults</Btn>
          <Btn variant="ghost" icon="mail" href="mailto:hello@pressark.com">Ask a privacy question</Btn>
        </div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", color: "var(--color-ink-muted)" }}>
          {[
            "API keys encrypted at rest with Sodium authenticated encryption",
            "Retention configurable from 7 to 365 days",
            "Managed credits or direct BYOK provider routing"
          ].map((item) => (
            <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13 }}>
              <Icon name="verified" fill size={16} style={{ color: "var(--color-success)" }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "linear-gradient(135deg, var(--color-navy-700), var(--color-navy-900))",
          color: "#ffffff",
          borderRadius: 18,
          padding: isMobile ? 20 : 26,
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
            background: "radial-gradient(circle, rgba(33,112,228,.38), transparent 70%)",
            filter: "blur(22px)"
          }}
        />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
            <Kicker tone="light">Default windows</Kicker>
            <span className="mono" style={{ fontSize: 11, color: "#8fa5c6" }}>7 to 365 day controls</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10, marginBottom: 16 }}>
            {RETENTION_WINDOWS.map((row) => (
              <div key={row.label} style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)" }}>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 4 }}>{row.window}</div>
                <div className="mono" style={{ fontSize: 10, color: "#8fa5c6", textTransform: "uppercase", letterSpacing: ".12em" }}>{row.label}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 14, color: "#c9d4e4", lineHeight: 1.65, margin: "0 0 16px" }}>
            Action logs default to 90 days, chat history to 180 days, and the cost ledger to 365 days. Retention can be configured between 7 and 365 days depending on the record class.
          </p>

          <BulletList
            light
            items={[
              "Licensing and subscriptions are handled through Freemius.",
              "BYOK sends model requests directly to the configured provider.",
              "Managed mode keeps PressArk in the routing path for credit accounting."
            ]}
          />
        </div>
      </div>
    </div>
  </section>
);

const PolicyBand = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 26px" : "0 24px 34px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <Kicker>Policy map</Kicker>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", lineHeight: 1.1, color: "var(--color-ink)" }}>
          Three ideas that define the privacy model.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {[
          {
            title: "Operational data only",
            body: "The policy is centered on the data PressArk needs to operate the assistant inside WordPress: indexed content, prompts, responses, logs, and billing metadata."
          },
          {
            title: "Explicit retention windows",
            body: "Defaults are concrete rather than vague, and operators can tune the retention range from 7 to 365 days instead of accepting one fixed schedule."
          },
          {
            title: "Routing depends on billing mode",
            body: "BYOK and managed credits behave differently at the provider boundary, so the page makes that distinction visible instead of burying it."
          }
        ].map((card) => (
          <SurfaceCard key={card.title} style={{ padding: 22 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 10px", color: "var(--color-ink)" }}>{card.title}</h3>
            <p style={{ fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.6, margin: 0 }}>{card.body}</p>
          </SurfaceCard>
        ))}
      </div>
    </div>
  </section>
);

const PrivacyRail = ({ isTablet }) => (
  <div style={isTablet ? {} : { position: "sticky", top: 96 }}>
    <SurfaceCard style={{ padding: 18, marginBottom: 16 }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
        On this page
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PRIVACY_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "8px 10px",
              borderRadius: 10,
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
      <Kicker tone="light">Policy boundary</Kicker>
      <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 10px", lineHeight: 1.15 }}>
        Billing mode changes routing, not the operator workflow.
      </h3>
      <BulletList
        light
        items={[
          "BYOK routes requests directly to your chosen provider.",
          "Managed mode keeps PressArk in the path for credit metering.",
          "Both modes still inherit the same in-plugin approval and audit surfaces."
        ]}
      />
    </div>
  </div>
);

const CollectionSection = ({ isMobile, pad }) => (
  <SectionShell
    id="collection"
    kicker="01 - What we process"
    title="PressArk processes the data it needs to operate the assistant."
    body="The privacy model is operational rather than abstract. PressArk is a WordPress AI copilot plugin, so the records it handles map closely to the admin workflows the assistant needs in order to search, reason, act, and explain what it did."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
      {PROCESS_AREAS.map((area) => (
        <SurfaceCard key={area.title} style={{ padding: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--color-surface-container-low)", border: "1px solid var(--border-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <Icon name={area.icon} size={18} style={{ color: "var(--color-ink)" }} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 12px", color: "var(--color-ink)" }}>{area.title}</h3>
          <BulletList items={area.items} />
        </SurfaceCard>
      ))}
    </div>
  </SectionShell>
);

const RetentionSection = ({ isTablet, isMobile, pad }) => (
  <SectionShell
    id="retention"
    kicker="02 - Retention"
    title="Default windows are concrete, and operators can change them."
    body="PressArk keeps different record classes for different lengths of time. The policy does not flatten all data into one retention bucket. Instead it uses defaults that match the job each record serves, while still allowing configuration between 7 and 365 days."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 12, marginBottom: 16 }}>
      {RETENTION_WINDOWS.map((row) => (
        <div key={row.label} style={{ padding: 18, borderRadius: 14, background: "var(--color-surface-container-low)", border: "1px solid var(--border-soft)" }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 8 }}>{row.label}</div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 6, color: "var(--color-ink)" }}>{row.window}</div>
          <div style={{ fontSize: 13, color: "var(--color-ink-muted)", lineHeight: 1.6 }}>{row.detail}</div>
        </div>
      ))}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : ".95fr 1.05fr", gap: 16 }}>
      <SoftCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          Configurable range
        </div>
        <BulletList
          items={[
            "Retention can be configured from 7 to 365 days.",
            "Shorter windows are useful for tighter operational cleanup.",
            "Longer windows are useful when audit, billing, or workflow history matters more."
          ]}
        />
      </SoftCard>

      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          Why the windows differ
        </div>
        <BulletList
          items={[
            "Action logs are shorter because they support operational traceability rather than long-term accounting.",
            "Chat history stays longer because teams often need the prior conversation context for follow-up tasks.",
            "The cost ledger keeps the longest default window because billing and reconciliation need the most durable record."
          ]}
        />
      </SurfaceCard>
    </div>
  </SectionShell>
);

const SecuritySection = ({ isTablet, isMobile, pad }) => (
  <SectionShell
    id="security-routing"
    kicker="03 - Security and routing"
    title="Key handling and provider routing are explicit."
    body="The page should say clearly how sensitive credentials are protected and what happens when requests leave the plugin. PressArk uses Sodium authenticated encryption for API keys at rest, and the request path depends on whether the site is running in BYOK mode or on managed credits."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : ".95fr 1.05fr", gap: 16, marginBottom: 16 }}>
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-navy-700), var(--color-navy-900))",
          color: "#ffffff",
          borderRadius: 16,
          padding: isMobile ? 20 : 24,
          boxShadow: "var(--shadow-editorial)"
        }}
      >
        <Kicker tone="light">Security baseline</Kicker>
        <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.1, margin: "14px 0 10px" }}>
          API keys are encrypted at rest with Sodium authenticated encryption.
        </h3>
        <p style={{ fontSize: 14, color: "#c9d4e4", lineHeight: 1.65, margin: "0 0 16px" }}>
          The policy keeps the security statement concrete. Instead of generic claims, it names the encryption approach used for stored provider credentials.
        </p>
        <BulletList
          light
          items={[
            "Encrypted credentials reduce the chance of plain-text key exposure at rest.",
            "The statement applies directly to the configured API keys used by the plugin.",
            "This is part of the operational trust model, not a decorative security badge."
          ]}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 12 }}>
        {ROUTING_MODES.map((mode) => (
          <div
            key={mode.title}
            style={{
              padding: 18,
              borderRadius: 16,
              background: mode.tone === "dark" ? "var(--color-ink)" : "var(--color-surface-container-low)",
              color: mode.tone === "dark" ? "#ffffff" : "var(--color-ink)",
              border: mode.tone === "dark" ? "1px solid var(--color-ink)" : "1px solid var(--border-soft)"
            }}
          >
            <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 10, color: mode.tone === "dark" ? "#8fa5c6" : "var(--color-outline)" }}>
              {mode.title}
            </div>
            <BulletList items={mode.items} light={mode.tone === "dark"} />
          </div>
        ))}
      </div>
    </div>

    <SoftCard style={{ padding: 18 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Icon name="info" size={18} style={{ color: "var(--color-primary)", marginTop: 1 }} />
        <div style={{ fontSize: 13, color: "var(--color-ink-muted)", lineHeight: 1.6 }}>
          The important distinction is that BYOK changes where the AI request is sent, while managed mode changes how routing and credits are accounted for. The rest of the operator-facing workflow inside PressArk remains consistent.
        </div>
      </div>
    </SoftCard>
  </SectionShell>
);

const RightsSection = ({ isTablet, pad }) => (
  <SectionShell
    id="rights-contact"
    kicker="04 - Rights and contact"
    title="Privacy rights stay anchored in WordPress and the right support lane."
    body="PressArk supports the WordPress Privacy Export and Erase workflows where applicable, which keeps privacy rights close to the system that already owns the site data. When a question falls outside the plugin UI, the page should route it clearly to the correct inbox."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.02fr .98fr", gap: 16 }}>
      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          WordPress privacy support
        </div>
        <BulletList items={RIGHTS_ITEMS} />
      </SurfaceCard>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {CONTACT_LANES.map((lane) => (
          <SoftCard key={lane.email} style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-.02em", margin: 0, color: "var(--color-ink)" }}>{lane.title}</h3>
              <a href={`mailto:${lane.email}`} style={{ fontSize: 12, color: "var(--color-primary)", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}>{lane.email}</a>
            </div>
            <p style={{ fontSize: 13, color: "var(--color-ink-muted)", lineHeight: 1.6, margin: 0 }}>{lane.body}</p>
          </SoftCard>
        ))}
      </div>
    </div>
  </SectionShell>
);

const PrivacyCta = ({ isTablet, isMobile }) => (
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
          maskImage: "radial-gradient(circle at 78% 28%, black 10%, transparent 74%)",
          WebkitMaskImage: "radial-gradient(circle at 78% 28%, black 10%, transparent 74%)"
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
          <Kicker>Next references</Kicker>
          <h2 style={{ fontSize: isMobile ? 32 : 40, fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.06, margin: "14px 0 12px", color: "var(--color-ink)", textWrap: "balance" }}>
            Privacy explains the boundary. Docs and contact explain the rest of the operator journey.
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 560 }}>
            Use this page for policy and data handling. Use docs when you need installation or configuration detail. Use contact when the answer depends on your environment or account context.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="primary" icon="article" href="docs.html">Open docs</Btn>
            <Btn variant="ghost" icon="mail" href="contact.html">Contact page</Btn>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Policy scope", value: "Indexed content, prompts, logs, billing metadata" },
            { label: "Retention range", value: "7 to 365 days" },
            { label: "Support lanes", value: "hello@pressark.com and support@pressark.com" }
          ].map((row) => (
            <SoftCard key={row.label} style={{ padding: 14 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", marginBottom: 4 }}>{row.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)" }}>{row.value}</div>
            </SoftCard>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const PrivacyApp = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;
  const pad = isMobile ? 20 : 28;

  return (
    <>
      <Nav />
      <Hero isTablet={isTablet} isMobile={isMobile} />
      <PolicyBand isMobile={isMobile} />

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
          <PrivacyRail isTablet={isTablet} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <CollectionSection isMobile={isMobile} pad={pad} />
            <RetentionSection isTablet={isTablet} isMobile={isMobile} pad={pad} />
            <SecuritySection isTablet={isTablet} isMobile={isMobile} pad={pad} />
            <RightsSection isTablet={isTablet} pad={pad} />
          </div>
        </div>
      </section>

      <PrivacyCta isTablet={isTablet} isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<PrivacyApp />);
