const { useState: useStateT, useEffect: useEffectT } = React;

const CONTACT_CHANNELS = [
  {
    title: "General",
    icon: "mail",
    value: "hello@pressark.com",
    href: "mailto:hello@pressark.com",
    body: "Product questions, partnerships, enterprise conversations, and anything that does not belong in support triage."
  },
  {
    title: "Support",
    icon: "support_agent",
    value: "support@pressark.com",
    href: "mailto:support@pressark.com",
    body: "Technical help, plugin behavior, billing issues, provider edge cases, and debugging requests."
  },
  {
    title: "GitHub",
    icon: "code",
    value: "github.com/alisel5/pressark",
    href: "https://github.com/alisel5/pressark",
    body: "Source visibility, issue context, release inspection, and public project history."
  }
];

const ROUTES = [
  {
    title: "Technical support",
    email: "support@pressark.com",
    points: [
      "Best for plugin bugs, provider failures, automation issues, and environment-specific behavior.",
      "Include WordPress version, PHP version, active plugins, and what the assistant was trying to do."
    ]
  },
  {
    title: "Enterprise and partnerships",
    email: "hello@pressark.com",
    points: [
      "Use this for procurement, larger deployments, reseller discussions, and integrations.",
      "Helpful context: number of sites, team size, billing mode, and any compliance needs."
    ]
  },
  {
    title: "Product and roadmap",
    email: "hello@pressark.com",
    points: [
      "Use this for feature requests, strategic feedback, and questions about direction.",
      "Linking the workflow or operator job you are trying to improve makes feedback much more actionable."
    ]
  }
];

const EXPECTATIONS = [
  "State whether you are using managed credits or BYOK.",
  "Mention your WordPress, PHP, and WooCommerce/Elementor versions if relevant.",
  "Describe the exact prompt or action that triggered the issue.",
  "For support requests, include screenshots or the before/after behavior when possible."
];

const FAQ = [
  {
    question: "Where should billing questions go?",
    answer: "Send billing, licensing, and upgrade questions to hello@pressark.com unless it is clearly a technical failure inside the plugin."
  },
  {
    question: "Where should bug reports go?",
    answer: "Use support@pressark.com and include environment details, the failing workflow, and whether the issue happens in managed mode, BYOK, or both."
  },
  {
    question: "Can I use this page without a backend form service?",
    answer: "Yes. The form composes a mailto message on the client side so the static preview still opens a prefilled message in your email client."
  }
];

const useViewportWidth = () => {
  const [width, setWidth] = useStateT(window.innerWidth);

  useEffectT(() => {
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

const Field = ({ label, children }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--color-outline)" }}>{label}</span>
    {children}
  </label>
);

const inputStyle = {
  width: "100%",
  border: "1px solid var(--border-soft)",
  borderRadius: 12,
  background: "var(--color-surface-container-lowest)",
  color: "var(--color-ink)",
  fontSize: 14,
  fontFamily: "inherit",
  padding: "13px 14px",
  outline: "none",
  boxSizing: "border-box"
};

const Hero = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "18px 16px 40px" : "22px 24px 52px" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 6.7fr) minmax(340px, 5.3fr)",
        gap: isTablet ? 18 : 28,
        alignItems: "stretch"
      }}
    >
      <div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          <Chip variant="pill">Get in touch</Chip>
          <Chip variant="pill">Support routing</Chip>
          <Chip variant="pill">Static mailto form</Chip>
        </div>
        <Kicker>Contact</Kicker>
        <h1
          style={{
            fontSize: isMobile ? 42 : isTablet ? 56 : 70,
            fontWeight: 800,
            letterSpacing: "-.038em",
            lineHeight: .98,
            margin: "16px 0 18px",
            color: "var(--color-ink)",
            textWrap: "balance"
          }}
        >
          Contact the team without losing the technical context.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 26px", maxWidth: 640 }}>
          Use this page to route product questions, support requests, partnerships, and account-specific conversations to the right inbox with the right context.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <Btn variant="primary" icon="mail" href="#message">Write a message</Btn>
          <Btn variant="ghost" icon="support_agent" href="mailto:support@pressark.com">Email support</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 12, maxWidth: 760 }}>
          {[
            { value: "2", label: "core inboxes", note: "general and support stay separate so requests reach the right lane faster" },
            { value: "3", label: "routing paths", note: "technical, enterprise, and product conversations each get a better route" },
            { value: "1", label: "static-friendly form", note: "the composer opens a prefilled email instead of pretending there is a backend" }
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
          <Kicker tone="light">Before you write</Kicker>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.05, margin: "14px 0 10px" }}>
            The fastest replies come from complete environment details.
          </h2>
          <p style={{ fontSize: 14, color: "#c9d4e4", lineHeight: 1.65, margin: "0 0 18px" }}>
            PressArk sits inside real WordPress stacks, so support requests are easier to action when the message already contains version, provider, and workflow context.
          </p>
          <BulletList items={EXPECTATIONS} light />
        </div>
      </div>
    </div>
  </section>
);

const ChannelGrid = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 28px" : "0 24px 34px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 18 }}>
        <Kicker>Direct channels</Kicker>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", color: "var(--color-ink)", lineHeight: 1.1 }}>
          Pick the route that matches the request.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {CONTACT_CHANNELS.map((channel) => (
          <a key={channel.title} href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined} style={{ textDecoration: "none", color: "inherit" }}>
            <SurfaceCard style={{ padding: 22, height: "100%" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--color-surface-container-low)", border: "1px solid var(--border-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <Icon name={channel.icon} size={20} style={{ color: "var(--color-ink)" }} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 6px", color: "var(--color-ink)" }}>{channel.title}</h3>
              <div className="mono" style={{ fontSize: 12, color: "var(--color-primary)", marginBottom: 10 }}>{channel.value}</div>
              <p style={{ fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.6, margin: 0 }}>{channel.body}</p>
            </SurfaceCard>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const RoutingSection = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 28px" : "0 24px 34px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.05fr .95fr", gap: 18 }}>
      <SurfaceCard style={{ padding: isMobile ? 20 : 24 }}>
        <div style={{ marginBottom: 16 }}>
          <Kicker>Routing guide</Kicker>
          <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", color: "var(--color-ink)", lineHeight: 1.1 }}>
            Three common contact paths.
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {ROUTES.map((route) => (
            <SoftCard key={route.title} style={{ padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-.02em", margin: 0, color: "var(--color-ink)" }}>{route.title}</h3>
                <a href={`mailto:${route.email}`} style={{ fontSize: 12, color: "var(--color-primary)", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}>{route.email}</a>
              </div>
              <BulletList items={route.points} />
            </SoftCard>
          ))}
        </div>
      </SurfaceCard>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            background: "linear-gradient(135deg, var(--color-navy-700), var(--color-navy-900))",
            color: "#ffffff",
            borderRadius: 16,
            padding: 22,
            boxShadow: "var(--shadow-editorial)"
          }}
        >
          <Kicker tone="light">Support checklist</Kicker>
          <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.1, margin: "14px 0 10px" }}>What to include in the first message.</h3>
          <BulletList items={EXPECTATIONS} light />
        </div>

        <SurfaceCard style={{ padding: 20 }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 10 }}>
            Quick answers
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQ.map((item) => (
              <div key={item.question} style={{ paddingBottom: 12, borderBottom: "1px solid rgba(112,131,166,.14)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-ink)", marginBottom: 5 }}>{item.question}</div>
                <div style={{ fontSize: 13, color: "var(--color-ink-muted)", lineHeight: 1.6 }}>{item.answer}</div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>
    </div>
  </section>
);

const MessageSection = ({ isTablet, isMobile }) => {
  const [form, setForm] = useStateT({
    name: "",
    email: "",
    topic: "General Inquiry",
    message: ""
  });

  const submitMessage = (event) => {
    event.preventDefault();

    const recipient = form.topic === "Technical Support" || form.topic === "Bug Report" ? "support@pressark.com" : "hello@pressark.com";
    const subject = `[${form.topic}] ${form.name || "New contact"}${form.email ? ` - ${form.email}` : ""}`;
    const body = [
      `Name: ${form.name || "-"}`,
      `Email: ${form.email || "-"}`,
      `Topic: ${form.topic}`,
      "",
      form.message || ""
    ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const setField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  return (
    <section id="message" style={{ padding: isMobile ? "0 16px 28px" : "0 24px 34px", scrollMarginTop: 108 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.1fr .9fr", gap: 18 }}>
        <SurfaceCard style={{ padding: isMobile ? 20 : 26 }}>
          <div style={{ marginBottom: 18 }}>
            <Kicker>Send a message</Kicker>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 8px", color: "var(--color-ink)", lineHeight: 1.08 }}>
              Compose the email in-page, then open it in your client.
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: 0 }}>
              This keeps the page static-friendly while still making the form meaningful in preview and production builds that do not have a backend form handler.
            </p>
          </div>

          <form onSubmit={submitMessage} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 14 }}>
              <Field label="Name">
                <input value={form.name} onChange={setField("name")} placeholder="Your name" style={inputStyle} />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={setField("email")} placeholder="you@example.com" style={inputStyle} />
              </Field>
            </div>
            <Field label="Topic">
              <select value={form.topic} onChange={setField("topic")} style={inputStyle}>
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Enterprise Sales</option>
                <option>Partnership</option>
                <option>Bug Report</option>
              </select>
            </Field>
            <Field label="Message">
              <textarea value={form.message} onChange={setField("message")} rows={7} placeholder="Tell us what you are trying to do, what happened, and what environment details matter." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} />
            </Field>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <button
                type="submit"
                style={{
                  padding: "13px 18px",
                  background: "var(--color-ink)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  boxShadow: "0 18px 40px -24px rgba(23,28,31,.45)"
                }}
              >
                <Icon name="send" size={18} />
                Open email draft
              </button>
              <span style={{ fontSize: 12, color: "var(--color-outline)" }}>
                Routes to <span className="mono">{form.topic === "Technical Support" || form.topic === "Bug Report" ? "support@pressark.com" : "hello@pressark.com"}</span>
              </span>
            </div>
          </form>
        </SurfaceCard>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <SoftCard style={{ padding: 20 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 10 }}>
              Recommended details
            </div>
            <BulletList items={EXPECTATIONS} />
          </SoftCard>

          <SurfaceCard style={{ padding: 20 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 10 }}>
              Direct links
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CONTACT_CHANNELS.map((channel) => (
                <a key={channel.title} href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} rel={channel.href.startsWith("http") ? "noreferrer noopener" : undefined} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "var(--color-surface-container-low)", border: "1px solid var(--border-soft)", color: "inherit", textDecoration: "none" }}>
                  <Icon name={channel.icon} size={18} style={{ color: "var(--color-primary)" }} />
                  <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)" }}>{channel.title}</span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--color-outline)" }}>{channel.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </div>
    </section>
  );
};

const CtaStrip = ({ isTablet, isMobile }) => (
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
          backgroundImage: "linear-gradient(rgba(23,28,31,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(23,28,31,.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at 75% 28%, black 10%, transparent 74%)",
          WebkitMaskImage: "radial-gradient(circle at 75% 28%, black 10%, transparent 74%)"
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
          <Kicker>Continue browsing</Kicker>
          <h2 style={{ fontSize: isMobile ? 32 : 40, fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.06, margin: "14px 0 12px", color: "var(--color-ink)", textWrap: "balance" }}>
            Need more context before you write? Docs and changelog are the fastest references.
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 560 }}>
            Docs explains how PressArk works today. Changelog explains how it got here. Contact is where you take the conversation when the page itself is not enough.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="primary" icon="article" href="docs.html">Open docs</Btn>
            <Btn variant="ghost" icon="history" href="changelog.html">Read changelog</Btn>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "General", value: "hello@pressark.com" },
            { label: "Support", value: "support@pressark.com" },
            { label: "Code", value: "github.com/alisel5/pressark" }
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

const ContactApp = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;

  return (
    <>
      <Nav />
      <Hero isTablet={isTablet} isMobile={isMobile} />
      <ChannelGrid isMobile={isMobile} />
      <RoutingSection isTablet={isTablet} isMobile={isMobile} />
      <MessageSection isTablet={isTablet} isMobile={isMobile} />
      <CtaStrip isTablet={isTablet} isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<ContactApp />);
