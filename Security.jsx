const { useState: useStateSec, useEffect: useEffectSec } = React;

const SECURITY_SECTIONS = [
  { id: "model", label: "Security model", icon: "security", summary: "Plugin-native surface, tool coverage, and operational boundaries." },
  { id: "credentials-routing", label: "Credentials and routing", icon: "vpn_key", summary: "Sodium-encrypted keys, BYOK, and managed routing." },
  { id: "diagnostics", label: "Diagnostics coverage", icon: "troubleshoot", summary: "Vulnerability scans plus performance, crawl, email, query, and cache diagnostics." },
  { id: "hardening", label: "Hardening history", icon: "history", summary: "Security-relevant release changes already documented in the changelog." },
  { id: "support", label: "Support and reporting", icon: "mail", summary: "Where technical and general questions should go." }
];

const MODEL_CARDS = [
  {
    title: "Native WordPress surface",
    icon: "dashboard",
    items: [
      "PressArk is a native WordPress plugin whose primary interface lives inside wp-admin.",
      "The tool itself runs in the WordPress admin, while license management remains separate from the day-to-day operator surface."
    ]
  },
  {
    title: "Security-aware tooling",
    icon: "admin_panel_settings",
    items: [
      "The documented tool surface includes vulnerability scans plus broader diagnostics for performance, crawl, email, query, and cache behavior.",
      "Security work is part of the same operator workflow as content, SEO, store ops, and site maintenance."
    ]
  },
  {
    title: "Operational use cases",
    icon: "build_circle",
    items: [
      "PressArk positioning already includes security reviews and security-patch style maintenance as part of broader site operations.",
      "The product is meant to help teams inspect, explain, and act on operational issues from natural language inside the admin."
    ]
  }
];

const ROUTING_MODES = [
  {
    title: "BYOK mode",
    tone: "light",
    items: [
      "BYOK means Bring Your Own Key.",
      "Requests go directly to your selected AI provider instead of routing through PressArk servers.",
      "Supported providers include OpenRouter, OpenAI, Anthropic, DeepSeek, and Google Gemini."
    ]
  },
  {
    title: "Managed mode",
    tone: "dark",
    items: [
      "Managed requests use PressArk-managed routing for credits.",
      "This is the path that connects to the product's plan and credit accounting model.",
      "The operator workflow stays the same even though the request path differs from BYOK."
    ]
  }
];

const CREDENTIAL_ITEMS = [
  "API keys are encrypted at rest using Sodium authenticated encryption.",
  "Freemius licensing is still required for plugin access even when a site runs in BYOK mode.",
  "BYOK removes PressArk credit budget constraints, but provider limits and rate limits still apply."
];

const DIAGNOSTIC_GROUPS = [
  {
    title: "Security and diagnostics",
    items: [
      "Vulnerability scans are part of the documented tool surface.",
      "Diagnostics coverage includes performance, crawl, email, query, and cache behavior."
    ]
  },
  {
    title: "Operational checks",
    items: [
      "Troubleshooting guidance already covers missing chat UI, API key validity, credit state, automation failures, and multisite activation limits.",
      "Retention, encryption, and WordPress privacy tooling are treated as part of the operational support story."
    ]
  },
  {
    title: "Maintenance workflows",
    items: [
      "Security work is grouped with broader site operations rather than isolated as a separate external service.",
      "The product messaging includes natural-language security reviews and patch-oriented maintenance as part of multi-site management."
    ]
  }
];

const HARDENING_MILESTONES = [
  {
    version: "v4.1.1",
    date: "February 2026",
    title: "Security hardening in core request and key handling paths",
    items: [
      "Security hardening moved request handling toward wp_safe_remote_* patterns to address SSRF exposure.",
      "Key storage completed the OpenSSL to Sodium encryption migration.",
      "This release also landed alongside broader WooCommerce HPOS and Elementor stability work."
    ]
  },
  {
    version: "v4.0.0",
    date: "December 2025",
    title: "Initial public release established the BYOK security boundary",
    items: [
      "The initial public release already included BYOK support as a core product capability.",
      "That release set the baseline for direct-provider routing and credit-based managed usage."
    ]
  }
];

const SUPPORT_LANES = [
  {
    title: "Technical and security questions",
    email: "support@pressark.com",
    body: "Use this lane for plugin behavior, provider routing issues, failed actions, diagnostics questions, or other environment-specific problems."
  },
  {
    title: "General, privacy, and commercial questions",
    email: "hello@pressark.com",
    body: "Use this lane for licensing, billing, privacy context, and broader product or partnership conversations."
  }
];

const useViewportWidth = () => {
  const [width, setWidth] = useStateSec(window.innerWidth);

  useEffectSec(() => {
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
          <Chip variant="pill">Sodium-encrypted keys</Chip>
          <Chip variant="pill">BYOK direct routing</Chip>
          <Chip variant="pill">Vulnerability scans</Chip>
        </div>
        <Kicker>Security overview</Kicker>
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
          The security story gathered into one place.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 26px", maxWidth: 660 }}>
          This page covers the security-relevant facts that matter in production: key protection, BYOK routing, diagnostics coverage, and the hardening work already shipped in recent releases.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <Btn variant="primary" icon="vpn_key" href="#credentials-routing">Review key and routing model</Btn>
          <Btn variant="ghost" icon="history" href="#hardening">See hardening history</Btn>
        </div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", color: "var(--color-ink-muted)" }}>
          {[
            "API keys encrypted at rest with Sodium authenticated encryption",
            "BYOK requests go directly to the selected provider",
            "Security and diagnostics tools cover scans plus site health checks"
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
            <Kicker tone="light">Security baseline</Kicker>
            <span className="mono" style={{ fontSize: 11, color: "#8fa5c6" }}>documented product facts</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10, marginBottom: 16 }}>
            {[
              { value: "1", label: "encryption path" },
              { value: "2", label: "routing modes" },
              { value: "5", label: "diagnostic lanes" }
            ].map((stat) => (
              <div key={stat.label} style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)" }}>
                <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.03em", marginBottom: 4 }}>{stat.value}</div>
                <div className="mono" style={{ fontSize: 10, color: "#8fa5c6", textTransform: "uppercase", letterSpacing: ".12em" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <BulletList
            light
            items={[
              "Vulnerability scans are part of the documented tool surface.",
              "Performance, crawl, email, query, and cache diagnostics sit alongside security checks.",
              "The changelog already records the SSRF hardening and OpenSSL to Sodium migration work."
            ]}
          />
        </div>
      </div>
    </div>
  </section>
);

const SecurityBand = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 26px" : "0 24px 34px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <Kicker>Security map</Kicker>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", lineHeight: 1.1, color: "var(--color-ink)" }}>
          Three ideas that define the current page.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {[
          {
            title: "Key handling is concrete",
            body: "The product documentation names the encryption approach for stored API keys instead of hiding behind generic security language."
          },
          {
            title: "Routing depends on billing mode",
            body: "BYOK and managed credits change where requests travel, so the security boundary has to describe both paths clearly."
          },
          {
            title: "Security is part of operations",
            body: "Scans, diagnostics, patch-oriented workflows, and troubleshooting all sit inside the broader WordPress operator surface."
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

const SecurityRail = ({ isTablet }) => (
  <div style={isTablet ? {} : { position: "sticky", top: 96 }}>
    <SurfaceCard style={{ padding: 18, marginBottom: 16 }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
        On this page
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {SECURITY_SECTIONS.map((section) => (
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
      <Kicker tone="light">Security note</Kicker>
      <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 10px", lineHeight: 1.15 }}>
        Security sits inside the same operator workflow as the rest of the product.
      </h3>
      <BulletList
        light
        items={[
          "The same routing and approval boundaries apply whether the work is content, store ops, or diagnostics.",
          "BYOK changes where requests travel, not the operator review model around them.",
          "Questions still route through the same support lanes already published elsewhere."
        ]}
      />
    </div>
  </div>
);

const ModelSection = ({ isMobile, pad }) => (
  <SectionShell
    id="model"
    kicker="01 - Security model"
    title="Security sits inside the same WordPress-native operator workflow."
    body="PressArk is not framed as a separate security SaaS. The documented product model puts security, diagnostics, and patch-oriented maintenance inside the same wp-admin experience used for content, SEO, WooCommerce, and broader site operations."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
      {MODEL_CARDS.map((card) => (
        <SurfaceCard key={card.title} style={{ padding: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "var(--color-surface-container-low)", border: "1px solid var(--border-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <Icon name={card.icon} size={18} style={{ color: "var(--color-ink)" }} />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 12px", color: "var(--color-ink)" }}>{card.title}</h3>
          <BulletList items={card.items} />
        </SurfaceCard>
      ))}
    </div>
  </SectionShell>
);

const CredentialSection = ({ isTablet, isMobile, pad }) => (
  <SectionShell
    id="credentials-routing"
    kicker="02 - Credentials and routing"
    title="Stored keys and request routing both have explicit boundaries."
    body="The security story is clearest when it separates key storage from request routing. Old PressArk copy already makes both visible: API keys are encrypted at rest with Sodium authenticated encryption, and request paths change depending on whether the site runs in BYOK or managed mode."
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
        <Kicker tone="light">Credential baseline</Kicker>
        <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.1, margin: "14px 0 10px" }}>
          API keys are encrypted at rest using Sodium authenticated encryption.
        </h3>
        <BulletList light items={CREDENTIAL_ITEMS} />
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
          Routing mode changes where requests travel, not whether teams still need to review the provider, environment, and operational boundaries around the work they run inside WordPress.
        </div>
      </div>
    </SoftCard>
  </SectionShell>
);

const DiagnosticsSection = ({ isMobile, pad }) => (
  <SectionShell
    id="diagnostics"
    kicker="03 - Diagnostics coverage"
    title="Security checks are part of a broader diagnostics surface."
    body="Security does not live in a tiny niche here. Vulnerability scans sit alongside performance, crawl, email, query, and cache diagnostics, which matches how real WordPress operators investigate risk in production."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
      {DIAGNOSTIC_GROUPS.map((group) => (
        <SurfaceCard key={group.title} style={{ padding: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 12px", color: "var(--color-ink)" }}>{group.title}</h3>
          <BulletList items={group.items} />
        </SurfaceCard>
      ))}
    </div>
  </SectionShell>
);

const HardeningSection = ({ isMobile, pad }) => (
  <SectionShell
    id="hardening"
    kicker="04 - Hardening history"
    title="The release history already records the major security-relevant shifts."
    body="Security posture is not just a policy statement. It also shows up in shipped technical changes. The existing changelog already captures the most explicit security hardening work in the public release history."
    pad={pad}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {HARDENING_MILESTONES.map((milestone) => (
        <SurfaceCard key={milestone.version} style={{ padding: isMobile ? 20 : 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--color-primary)" }}>{milestone.version}</span>
            <span style={{ fontSize: 12, color: "var(--color-outline)" }}>{milestone.date}</span>
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 12px", color: "var(--color-ink)", lineHeight: 1.1 }}>{milestone.title}</h3>
          <BulletList items={milestone.items} />
        </SurfaceCard>
      ))}
    </div>
  </SectionShell>
);

const SupportSection = ({ isTablet, pad }) => (
  <SectionShell
    id="support"
    kicker="05 - Support and reporting"
    title="Questions should still route through the published support lanes."
    body="The current site copy already uses two contact lanes. This page keeps that same model so security and diagnostics questions do not get separated from the rest of the operator support flow."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.02fr .98fr", gap: 16 }}>
      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          Support summary
        </div>
        <BulletList
          items={[
            "Use support@pressark.com for plugin behavior, diagnostics, security questions, and environment-specific technical issues.",
            "Use hello@pressark.com for privacy, billing, licensing, and broader product conversations.",
            "Troubleshooting guidance already points operators toward key validity, provider status, retention, and per-site activation limits when problems appear."
          ]}
        />
      </SurfaceCard>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {SUPPORT_LANES.map((lane) => (
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

const SecurityCta = ({ isTablet, isMobile }) => (
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
            Security is the operations layer. Privacy and docs explain the adjacent boundaries.
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 560 }}>
            Use this page for encryption, routing, diagnostics, and hardening context. Use privacy for data handling and docs for installation, configuration, and troubleshooting detail.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="primary" icon="policy" href="privacy.html">Privacy page</Btn>
            <Btn variant="ghost" icon="article" href="docs.html">Docs page</Btn>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Encryption", value: "Sodium authenticated encryption" },
            { label: "Direct routing", value: "BYOK requests go to the selected provider" },
            { label: "Diagnostics", value: "Security, performance, crawl, email, query, cache" }
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

const SecurityApp = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;
  const pad = isMobile ? 20 : 28;

  return (
    <>
      <Nav />
      <Hero isTablet={isTablet} isMobile={isMobile} />
      <SecurityBand isMobile={isMobile} />

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
          <SecurityRail isTablet={isTablet} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <ModelSection isMobile={isMobile} pad={pad} />
            <CredentialSection isTablet={isTablet} isMobile={isMobile} pad={pad} />
            <DiagnosticsSection isMobile={isMobile} pad={pad} />
            <HardeningSection isMobile={isMobile} pad={pad} />
            <SupportSection isTablet={isTablet} pad={pad} />
          </div>
        </div>
      </section>

      <SecurityCta isTablet={isTablet} isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<SecurityApp />);
