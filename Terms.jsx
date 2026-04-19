const { useState: useStateTerms, useEffect: useEffectTerms } = React;

const TERMS_SECTIONS = [
  { id: "service", label: "Service", icon: "widgets", summary: "AI-assisted WordPress operations and content tooling." },
  { id: "license-billing", label: "License and billing", icon: "credit_score", summary: "Freemius licensing, paid plans, and top-up terms." },
  { id: "acceptable-use", label: "Acceptable use", icon: "rule", summary: "Prompt responsibility, generated output, and compliance." },
  { id: "availability-liability", label: "Availability and liability", icon: "verified", summary: "Service continuity, disclaimers, and liability boundary." },
  { id: "support-contact", label: "Support and contact", icon: "mail", summary: "Where commercial and technical questions should go." }
];

const SERVICE_CARDS = [
  {
    title: "Service scope",
    icon: "dashboard_customize",
    items: [
      "PressArk provides AI-assisted WordPress operations and content tooling.",
      "The product is built to help operators work inside the WordPress admin rather than moving the job into a separate SaaS control panel."
    ]
  },
  {
    title: "Operator workflow",
    icon: "account_tree",
    items: [
      "Using PressArk means working through prompts, generated output, tool actions, and staged approvals inside the plugin.",
      "The product assists with execution, but the operator still decides what should be applied to the site."
    ]
  },
  {
    title: "Agreement",
    icon: "gavel",
    items: [
      "By using PressArk, you agree to these terms.",
      "These terms describe the operating boundary for access, billing, use, support, and liability."
    ]
  }
];

const LICENSE_ITEMS = [
  "A valid Freemius license is required for plugin access and updates.",
  "Plan entitlements follow the license and subscription state attached to the selected plan.",
  "Licensing and commercial plan management are handled through Freemius rather than a separate custom billing surface."
];

const BILLING_ITEMS = [
  "Paid plans and top-ups are billed through Freemius according to the selected plan.",
  "If a team changes plans, billing behavior follows the current commercial selection rather than an informal email agreement.",
  "Commercial questions, billing clarification, and account routing should go through the official PressArk contact lanes."
];

const ACCEPTABLE_USE_GROUPS = [
  {
    title: "Prompt responsibility",
    items: [
      "You are responsible for the prompts you submit through the product.",
      "You are also responsible for reviewing the work the assistant stages or generates before you apply it."
    ]
  },
  {
    title: "Output responsibility",
    items: [
      "You are responsible for generated output, including how it is used on your site or in your workflows.",
      "This includes content quality, factual review, and whether the output is appropriate for the environment where it is published."
    ]
  },
  {
    title: "Compliance",
    items: [
      "You are responsible for compliance with applicable laws.",
      "You are also responsible for following the relevant platform and provider policies connected to your WordPress stack and AI setup."
    ]
  }
];

const RISK_POINTS = [
  "PressArk aims for stable service, but uninterrupted availability is not guaranteed.",
  "Service quality can still depend on hosting conditions, provider routing, site configuration, and other third-party dependencies.",
  "To the maximum extent permitted by law, PressArk is provided on an 'as is' basis."
];

const CONTACT_LANES = [
  {
    title: "General, billing, and commercial questions",
    email: "hello@pressark.com",
    body: "Use this inbox for plan questions, licensing, enterprise conversations, or terms-related clarification."
  },
  {
    title: "Technical support",
    email: "support@pressark.com",
    body: "Use this inbox when the question is tied to plugin behavior, updates, provider failures, or a specific operational issue."
  }
];

const useViewportWidth = () => {
  const [width, setWidth] = useStateTerms(window.innerWidth);

  useEffectTerms(() => {
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
          <Chip variant="pill">Freemius licensing</Chip>
          <Chip variant="pill">AI-assisted ops</Chip>
          <Chip variant="pill">As-is service</Chip>
        </div>
        <Kicker>Terms of service</Kicker>
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
          The commercial and usage boundary for PressArk.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 26px", maxWidth: 660 }}>
          This page covers what the service includes, how licensing and billing work, what responsibility stays with the operator, and where service availability and liability are intentionally limited.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <Btn variant="primary" icon="credit_score" href="#license-billing">Review license and billing</Btn>
          <Btn variant="ghost" icon="rule" href="#acceptable-use">See acceptable use</Btn>
        </div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center", color: "var(--color-ink-muted)" }}>
          {[
            "Valid Freemius license required for access and updates",
            "Paid plans and top-ups billed through Freemius",
            "Operator remains responsible for prompts and output"
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
            <Kicker tone="light">Core terms</Kicker>
            <span className="mono" style={{ fontSize: 11, color: "#8fa5c6" }}>commercial + usage</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10, marginBottom: 16 }}>
            {[
              { value: "1", label: "license lane" },
              { value: "3", label: "use duties" },
              { value: "2", label: "support inboxes" }
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
              "PressArk provides AI-assisted WordPress operations and content tooling.",
              "Availability is a goal, not an uninterrupted service guarantee.",
              "To the maximum extent permitted by law, the product is provided on an 'as is' basis."
            ]}
          />
        </div>
      </div>
    </div>
  </section>
);

const TermsBand = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 26px" : "0 24px 34px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <Kicker>Terms map</Kicker>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", lineHeight: 1.1, color: "var(--color-ink)" }}>
          Three ideas that organize the page.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {[
          {
            title: "Commercial access",
            body: "The terms anchor access and updates to the Freemius licensing path rather than an informal support relationship."
          },
          {
            title: "Operator responsibility",
            body: "Prompts, generated output, and compliance remain the operator’s responsibility even when the product helps with execution."
          },
          {
            title: "Clear boundary on risk",
            body: "The service aims for stability, but availability is not guaranteed and liability remains limited to the maximum extent permitted by law."
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

const TermsRail = ({ isTablet }) => (
  <div style={isTablet ? {} : { position: "sticky", top: 96 }}>
    <SurfaceCard style={{ padding: 18, marginBottom: 16 }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
        On this page
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {TERMS_SECTIONS.map((section) => (
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
      <Kicker tone="light">Operator note</Kicker>
      <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 10px", lineHeight: 1.15 }}>
        Assistance does not remove operator responsibility.
      </h3>
      <BulletList
        light
        items={[
          "You remain responsible for prompts and generated output.",
          "Compliance duties still sit with the team using the product.",
          "Support can help investigate behavior, but it does not replace review of site changes."
        ]}
      />
    </div>
  </div>
);

const ServiceSection = ({ isMobile, pad }) => (
  <SectionShell
    id="service"
    kicker="01 - Service"
    title="PressArk is an AI-assisted WordPress operations product."
    body="The service term is intentionally simple: PressArk provides AI-assisted WordPress operations and content tooling. The page should frame the product as an operator-facing tool inside WordPress rather than a vague AI layer with no defined workflow."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
      {SERVICE_CARDS.map((card) => (
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

const LicenseSection = ({ isTablet, pad }) => (
  <SectionShell
    id="license-billing"
    kicker="02 - License and billing"
    title="Commercial access flows through Freemius."
    body="The original terms tie plugin access, updates, plans, and top-ups to the Freemius licensing path. This section keeps that boundary explicit so teams understand how commercial access is administered."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : ".95fr 1.05fr", gap: 16 }}>
      <SoftCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          License requirements
        </div>
        <BulletList items={LICENSE_ITEMS} />
      </SoftCard>

      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          Billing terms
        </div>
        <BulletList items={BILLING_ITEMS} />
      </SurfaceCard>
    </div>
  </SectionShell>
);

const AcceptableUseSection = ({ isMobile, pad }) => (
  <SectionShell
    id="acceptable-use"
    kicker="03 - Acceptable use"
    title="Using the product means owning the decisions around prompts, output, and compliance."
    body="The terms do not hand responsibility over to the product. They draw a clear line: PressArk helps execute work, but the user remains responsible for what is requested, what is produced, and whether that use complies with the relevant rules."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
      {ACCEPTABLE_USE_GROUPS.map((group) => (
        <SurfaceCard key={group.title} style={{ padding: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 12px", color: "var(--color-ink)" }}>{group.title}</h3>
          <BulletList items={group.items} />
        </SurfaceCard>
      ))}
    </div>
  </SectionShell>
);

const AvailabilitySection = ({ isTablet, isMobile, pad }) => (
  <SectionShell
    id="availability-liability"
    kicker="04 - Availability and liability"
    title="Stability is a goal, not a warranty."
    body="The terms need a clear reliability and risk boundary. PressArk aims for stable service, but the product does not promise uninterrupted availability, and it is provided on an 'as is' basis to the maximum extent permitted by law."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : ".95fr 1.05fr", gap: 16 }}>
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-navy-700), var(--color-navy-900))",
          color: "#ffffff",
          borderRadius: 16,
          padding: isMobile ? 20 : 24,
          boxShadow: "var(--shadow-editorial)"
        }}
      >
        <Kicker tone="light">Risk boundary</Kicker>
        <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.1, margin: "14px 0 10px" }}>
          Availability matters, but uninterrupted service is not guaranteed.
        </h3>
        <BulletList light items={RISK_POINTS} />
      </div>

      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          Practical reading
        </div>
        <BulletList
          items={[
            "Service continuity can still depend on third-party systems such as hosting, provider infrastructure, and the broader WordPress stack.",
            "Support can investigate incidents and failures, but the terms do not convert that support effort into a guarantee of uninterrupted uptime.",
            "Teams using the product for important workflows should keep normal operational review and change-control practices in place."
          ]}
        />
      </SurfaceCard>
    </div>
  </SectionShell>
);

const SupportSection = ({ isTablet, pad }) => (
  <SectionShell
    id="support-contact"
    kicker="05 - Support and contact"
    title="Questions should route to the right inbox."
    body="Use the general lane for billing and commercial questions, and the support lane when the issue depends on plugin behavior or a technical environment."
    pad={pad}
  >
    <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.02fr .98fr", gap: 16 }}>
      <SurfaceCard style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
          Support summary
        </div>
        <BulletList
          items={[
            "General terms, billing, and commercial questions should go to hello@pressark.com.",
            "Technical support and plugin behavior questions should go to support@pressark.com.",
            "Using the correct lane helps the team resolve either commercial or technical issues faster."
          ]}
        />
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

const TermsCta = ({ isTablet, isMobile }) => (
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
            Terms defines the boundary. Privacy and contact handle the next layer of detail.
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 560 }}>
            Use this page when the question is about license, billing, acceptable use, or service risk. Use privacy for data handling and contact when the answer depends on your account or technical environment.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="primary" icon="policy" href="privacy.html">Privacy page</Btn>
            <Btn variant="ghost" icon="mail" href="contact.html">Contact page</Btn>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "License path", value: "Freemius" },
            { label: "Billing path", value: "Plans and top-ups billed through Freemius" },
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

const TermsApp = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;
  const pad = isMobile ? 20 : 28;

  return (
    <>
      <Nav />
      <Hero isTablet={isTablet} isMobile={isMobile} />
      <TermsBand isMobile={isMobile} />

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
          <TermsRail isTablet={isTablet} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <ServiceSection isMobile={isMobile} pad={pad} />
            <LicenseSection isTablet={isTablet} pad={pad} />
            <AcceptableUseSection isMobile={isMobile} pad={pad} />
            <AvailabilitySection isTablet={isTablet} isMobile={isMobile} pad={pad} />
            <SupportSection isTablet={isTablet} pad={pad} />
          </div>
        </div>
      </section>

      <TermsCta isTablet={isTablet} isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<TermsApp />);
