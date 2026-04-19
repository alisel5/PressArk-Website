const { useState: useStateFaq, useEffect: useEffectFaq } = React;

const FAQ_GROUPS = [
  {
    id: "basics",
    label: "Product basics",
    icon: "info",
    summary: "What PressArk is, where it runs, and how to install it.",
    intro:
      "These are the questions that help someone orient quickly: what the product is, where it lives, and what the first install path looks like.",
    questions: [
      {
        id: "what-is",
        question: "What is PressArk?",
        answer:
          "PressArk is a specialized AI copilot integrated directly into your WordPress admin. It helps run WordPress websites and WooCommerce stores with content automation, SEO workflows, store operations, and technical troubleshooting inside wp-admin."
      },
      {
        id: "plugin-or-web-app",
        question: "Is this a WordPress plugin or web app?",
        answer:
          "It is a native WordPress plugin. The primary interface lives inside your WordPress sidebar for day-to-day operational access, while licensing and account management sit outside that operator surface."
      },
      {
        id: "install-plugin",
        question: "How do I install the plugin?",
        answer:
          "Download the ZIP from your account dashboard or GitHub, then upload it from Plugins > Add New > Upload Plugin in WordPress. After activation, enter your license details or configure BYOK during onboarding."
      }
    ]
  },
  {
    id: "billing",
    label: "Credits and billing",
    icon: "payments",
    summary: "How credits behave, whether they roll over, and what plan changes mean.",
    intro:
      "This section keeps the commercial answers in one place so operators can quickly understand credits, rollovers, and plan changes without jumping between pricing and support pages.",
    questions: [
      {
        id: "what-are-credits",
        question: "What are credits?",
        answer:
          "Credits represent the compute budget used for AI requests. Different tasks consume different amounts depending on token length, model choice, and workflow complexity."
      },
      {
        id: "roll-over",
        question: "Do credits roll over?",
        answer:
          "Monthly plan credits do not roll over. Extra credit packs are only used after the monthly allocation is exhausted and do not follow the same monthly reset behavior."
      },
      {
        id: "upgrade-downgrade",
        question: "Can I upgrade or downgrade anytime?",
        answer:
          "Yes. Plans are billed monthly and can be adjusted as needed. Upgrades are handled immediately, while downgrade timing follows the commercial billing cycle."
      }
    ]
  },
  {
    id: "byok",
    label: "Technical and BYOK",
    icon: "vpn_key",
    summary: "Direct-provider routing, supported models, and the data path.",
    intro:
      "The technical questions are mostly about BYOK: which providers are supported, where requests go, and how that differs from managed routing.",
    questions: [
      {
        id: "what-is-byok",
        question: "What is BYOK?",
        answer:
          "BYOK means Bring Your Own Key. It lets you connect your own provider credentials so requests go through your selected AI provider rather than relying on PressArk-managed request budgets."
      },
      {
        id: "supported-models",
        question: "Which AI models are supported?",
        answer:
          "PressArk supports GPT-4o, Claude Sonnet 4, DeepSeek V3, Gemini-family models, and models available through OpenRouter. Model selection is configurable per request."
      },
      {
        id: "third-parties",
        question: "Is my data sent to third parties?",
        answer:
          "When using BYOK, prompts go directly to your chosen provider. When using managed credits, requests use PressArk-managed routing. Privacy and security pages explain the current retention and routing boundaries in more detail."
      }
    ]
  }
];

const SUPPORT_NOTES = [
  "Use docs when you need installation, configuration, billing model, or troubleshooting detail.",
  "Use contact when the answer depends on your specific environment, provider setup, or account state.",
  "Use security and privacy when the question is really about routing, retention, or key handling."
];

const QUICK_PATHS = [
  {
    title: "Getting started",
    body: "What PressArk is, where it runs, and how to get the plugin into wp-admin.",
    href: "#basics",
    icon: "rocket_launch"
  },
  {
    title: "Credits and plans",
    body: "How credits behave, what rolls over, and what to expect from plan changes.",
    href: "#billing",
    icon: "account_balance_wallet"
  },
  {
    title: "BYOK and providers",
    body: "Direct routing, supported model families, and where requests actually go.",
    href: "#byok",
    icon: "vpn_key"
  }
];

const useViewportWidth = () => {
  const [width, setWidth] = useStateFaq(window.innerWidth);

  useEffectFaq(() => {
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

const QuestionItem = ({ item, open, onToggle }) => (
  <div
    style={{
      background: open ? "var(--color-surface-container-low)" : "var(--color-surface-container-lowest)",
      border: "1px solid var(--border-soft)",
      borderRadius: 14,
      overflow: "hidden"
    }}
  >
    <button
      type="button"
      onClick={onToggle}
      style={{
        width: "100%",
        padding: "18px 18px 16px",
        background: "transparent",
        border: "none",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        textAlign: "left",
        cursor: "pointer",
        fontFamily: "inherit"
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-.015em", color: "var(--color-ink)", lineHeight: 1.4 }}>
        {item.question}
      </span>
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: 10,
          background: "var(--color-surface-container-lowest)",
          border: "1px solid var(--border-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}
      >
        <Icon name={open ? "remove" : "add"} size={18} style={{ color: "var(--color-ink)" }} />
      </span>
    </button>
    {open && (
      <div style={{ padding: "0 18px 18px" }}>
        <div style={{ height: 1, background: "rgba(112, 131, 166, .14)", marginBottom: 14 }} />
        <div style={{ fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.7 }}>{item.answer}</div>
      </div>
    )}
  </div>
);

const Hero = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "18px 16px 42px" : "22px 24px 56px" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 6.8fr) minmax(340px, 5.2fr)",
        gap: isTablet ? 18 : 28,
        alignItems: "stretch"
      }}
    >
      <div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          <Chip variant="pill">Knowledge base</Chip>
          <Chip variant="pill">Billing answers</Chip>
          <Chip variant="pill">BYOK details</Chip>
        </div>
        <Kicker>FAQ</Kicker>
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
          Fast answers to the operator questions that come up most.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 26px", maxWidth: 660 }}>
          Start here for the fast answers on the WordPress AI copilot: what PressArk is, how credits behave, what BYOK changes, and when to move into docs or support.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <Btn variant="primary" icon="help" href="#basics">Start with basics</Btn>
          <Btn variant="ghost" icon="mail" href="contact.html">Contact support</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 12, maxWidth: 760 }}>
          {[
            { value: "3", label: "topic groups", note: "product basics, credits and billing, plus technical BYOK questions" },
            { value: "9", label: "core questions", note: "the most common product, billing, and BYOK questions in one place" },
            { value: "5", label: "provider paths", note: "OpenRouter, OpenAI, Anthropic, DeepSeek, and Google Gemini are supported" }
          ].map((stat) => (
            <SoftCard key={stat.label} style={{ padding: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", color: "var(--color-ink)" }}>{stat.value}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 6 }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: "var(--color-ink-muted)", lineHeight: 1.5 }}>{stat.note}</div>
            </SoftCard>
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
          <Kicker tone="light">Use this with</Kicker>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.05, margin: "14px 0 10px" }}>
            FAQ is the fast layer. Docs and support carry the deeper answers.
          </h2>
          <p style={{ fontSize: 14, color: "#c9d4e4", lineHeight: 1.65, margin: "0 0 18px" }}>
            The page is best for quick orientation. When the answer depends on installation state, provider routing, retention, or a specific environment, the right next step is usually another page or a support lane.
          </p>
          <BulletList items={SUPPORT_NOTES} light />
        </div>
      </div>
    </div>
  </section>
);

const TopicBand = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 26px" : "0 24px 34px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <Kicker>Quick paths</Kicker>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", lineHeight: 1.1, color: "var(--color-ink)" }}>
          Choose the question lane that matches what you need.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {QUICK_PATHS.map((path) => (
          <a key={path.title} href={path.href} style={{ textDecoration: "none", color: "inherit" }}>
            <SurfaceCard style={{ padding: 22, height: "100%" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--color-surface-container-low)", border: "1px solid var(--border-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <Icon name={path.icon} size={20} style={{ color: "var(--color-ink)" }} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 10px", color: "var(--color-ink)" }}>{path.title}</h3>
              <p style={{ fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.6, margin: 0 }}>{path.body}</p>
            </SurfaceCard>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const FaqRail = ({ isTablet }) => (
  <div style={isTablet ? {} : { position: "sticky", top: 96 }}>
    <SurfaceCard style={{ padding: 18, marginBottom: 16 }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
        On this page
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {FAQ_GROUPS.map((group) => (
          <a
            key={group.id}
            href={`#${group.id}`}
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
            <Icon name={group.icon} size={16} style={{ color: "var(--color-primary)", marginTop: 1, flexShrink: 0 }} />
            <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)" }}>{group.label}</span>
              <span style={{ fontSize: 12, color: "var(--color-outline)", lineHeight: 1.45 }}>{group.summary}</span>
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
      <Kicker tone="light">Need more?</Kicker>
      <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 10px", lineHeight: 1.15 }}>
        FAQ answers the common path, not every edge case.
      </h3>
      <BulletList
        light
        items={[
          "Docs is the better reference for installation, configuration, and troubleshooting depth.",
          "Contact is the better route when the answer depends on your stack or account.",
          "Security and privacy pages explain routing, retention, and key-handling boundaries."
        ]}
      />
    </div>
  </div>
);

const FaqSection = ({ group, pad, openMap, toggleQuestion }) => (
  <SectionShell
    id={group.id}
    kicker={group.label}
    title={group.label}
    body={group.intro}
    pad={pad}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {group.questions.map((item) => {
        const key = `${group.id}-${item.id}`;
        return <QuestionItem key={key} item={item} open={!!openMap[key]} onToggle={() => toggleQuestion(key)} />;
      })}
    </div>
  </SectionShell>
);

const FaqCta = ({ isTablet, isMobile }) => (
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
            Still not enough context? Move from fast answers into the deeper references.
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 560 }}>
            FAQ helps with orientation. Docs explains how the product works today. Contact handles edge cases and environment-specific issues. Security clarifies routing and key-handling boundaries.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="primary" icon="article" href="docs.html">Open docs</Btn>
            <Btn variant="ghost" icon="mail" href="contact.html">Contact support</Btn>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Docs", value: "Installation, configuration, BYOK, troubleshooting" },
            { label: "Contact", value: "Support, billing, partnerships, bug reports" },
            { label: "Security", value: "Routing, diagnostics, encryption, hardening history" }
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

const FAQApp = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;
  const pad = isMobile ? 20 : 28;
  const [openMap, setOpenMap] = useStateFaq({ "basics-what-is": true, "billing-what-are-credits": true, "byok-what-is-byok": true });

  const toggleQuestion = (key) => {
    setOpenMap((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <>
      <Nav />
      <Hero isTablet={isTablet} isMobile={isMobile} />
      <TopicBand isMobile={isMobile} />

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
          <FaqRail isTablet={isTablet} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {FAQ_GROUPS.map((group) => (
              <FaqSection key={group.id} group={group} pad={pad} openMap={openMap} toggleQuestion={toggleQuestion} />
            ))}
          </div>
        </div>
      </section>

      <FaqCta isTablet={isTablet} isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<FAQApp />);
