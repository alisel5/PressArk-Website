const { useState, useEffect } = React;

const useViewportWidth = () => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
};

const CATEGORIES = [
  {
    id: "content",
    label: "Content",
    count: 31,
    tools: [
      ["create_post", "Draft new posts from briefs or outlines."],
      ["update_post_batch", "Bulk edit post content, status, or structure."],
      ["rewrite_tone", "Shift voice or formality of existing copy."],
      ["generate_excerpt", "Produce archive summaries and metadata."],
      ["taxonomy_restructure", "Re-tag and re-categorize at scale."],
      ["diff_preview", "Preview staged changes before commit."]
    ]
  },
  {
    id: "seo",
    label: "SEO",
    count: 22,
    tools: [
      ["seo_scan_site", "Full-site audit of meta, titles, and structure."],
      ["update_meta_batch", "Fix missing descriptions across posts."],
      ["serp_watch", "Track ranking changes on monitored queries."],
      ["fix_internal_links", "Repair broken links and anchor text."],
      ["alt_text_gaps", "Find and generate missing image alt text."],
      ["schema_validate", "Audit JSON-LD and suggest repairs."]
    ]
  },
  {
    id: "woo",
    label: "WooCommerce",
    count: 28,
    tools: [
      ["woo_list_products", "Query the catalog with filters and attributes."],
      ["update_product_descriptions", "Rewrite product copy at scale."],
      ["bulk_price_update", "Apply price changes by rule."],
      ["stock_sync", "Audit inventory against the source of truth."],
      ["orders_summary", "Query orders in plain English."],
      ["taxonomy_split", "Reorganize categories, brands, and attributes."]
    ]
  },
  {
    id: "security",
    label: "Security",
    count: 18,
    tools: [
      ["security_audit", "Scan core, themes, and plugins for vulnerabilities."],
      ["harden_config", "Apply secure headers and configuration defaults."],
      ["user_role_audit", "Flag over-privileged accounts."],
      ["login_pattern_check", "Surface suspicious login patterns."],
      ["plugin_reputation", "Cross-reference advisories and trust signals."]
    ]
  },
  {
    id: "ops",
    label: "Site Ops",
    count: 17,
    tools: [
      ["media_cleanup", "Identify orphaned uploads."],
      ["db_optimize", "Run safe optimizations with preview."],
      ["cache_policy_set", "Apply sane caching defaults."],
      ["backup_snapshot", "Trigger a safety snapshot before big jobs."],
      ["health_report", "Turn site-health data into operator guidance."]
    ]
  }
];

const PROVIDERS = [
  ["Anthropic", "Claude Sonnet 4", "Strong reasoning for operator-heavy workflows."],
  ["OpenAI", "GPT-4o", "Wide coverage for editorial and assistant tasks."],
  ["Google Gemini", "Gemini family", "Long-context work and broad model choice."],
  ["DeepSeek", "DeepSeek V3", "Lower-cost routing for lighter jobs."],
  ["OpenRouter", "Multi-model access", "One provider path for a broader model catalog."]
];

const DOC_LINKS = [
  ["Installation", "Server requirements, activation, and first launch.", "download_for_offline", "docs.html#installation"],
  ["Configuration", "Onboarding, indexing, and retention tuning.", "settings_input_component", "docs.html#configuration"],
  ["BYOK", "Provider setup, routing, and security boundaries.", "vpn_key", "docs.html#byok"],
  ["Pricing and credits", "Plans, top-ups, and lifecycle accounting.", "account_balance_wallet", "docs.html#pricing-credits"],
  ["Automations", "Cadence settings, policy controls, and hooks.", "auto_mode", "docs.html#automations"],
  ["Troubleshooting", "Common fixes and support paths.", "build", "docs.html#troubleshooting"]
];

const ToolRow = ({ name, result, running, light }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
      {running ? <span className="spinner-s" /> : <Icon name="check" size={14} style={{ color: "#0058be" }} />}
      <span className="mono" style={{ fontSize: 12, color: light ? "#ffffff" : "#171c1f", overflowWrap: "anywhere" }}>{name}</span>
      {result && <span style={{ fontSize: 11, color: light ? "#8fa5c6" : "#727785" }}>/ {result}</span>}
    </div>
    <div style={{ height: 3, background: light ? "rgba(255,255,255,.14)" : "#eef1f5", borderRadius: 999, marginLeft: 22 }}>
      <div style={{ width: running ? "62%" : "100%", height: "100%", background: "linear-gradient(90deg,#2170e4,#0058be)", borderRadius: 999 }} />
    </div>
  </div>
);

const HeroAside = ({ isMobile }) => (
  <div style={{ background: "linear-gradient(135deg,#1d3557,#0a1526)", color: "#fff", borderRadius: 16, padding: isMobile ? 20 : 22, boxShadow: "0 34px 84px -54px rgba(11,29,56,.62)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 14 }}>
      <Kicker tone="light">Staged run</Kicker>
      <span style={{ fontSize: 11, color: "#8fa5c6" }}>pending review</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
      <ToolRow name="seo_scan_site" result="12 issues found" light />
      <ToolRow name="update_meta_batch" result="draft prepared" light />
      <ToolRow name="publish_changes" running light />
    </div>
    <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }}>
      <div style={{ fontSize: 13, color: "#c9d4e4", lineHeight: 1.55, marginBottom: 12 }}>
        12 metadata fixes are staged and waiting at the approval boundary.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ padding: "10px 12px", borderRadius: 10, background: "#0058be", color: "#fff", fontSize: 12, fontWeight: 700, textAlign: "center" }}>Keep Changes</div>
        <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,.1)", color: "#c9d4e4", fontSize: 12, fontWeight: 700, textAlign: "center" }}>Discard</div>
      </div>
    </div>
  </div>
);

const Hero = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "10px 16px 56px" : "22px 24px 72px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 7fr) minmax(320px, 5fr)", gap: isMobile ? 28 : 44, alignItems: "start" }}>
      <div style={{ maxWidth: 760 }}>
        <Kicker>Features | Capabilities overview</Kicker>
        <h1 style={{ fontSize: isMobile ? 40 : isTablet ? 52 : 64, fontWeight: 800, letterSpacing: "-.038em", lineHeight: 1.02, margin: "16px 0 22px", textWrap: "balance" }}>
          Copilot features for <span style={{ background: "linear-gradient(180deg, transparent 62%, rgba(0,88,190,.22) 62%)", padding: "0 4px" }}>WordPress and WooCommerce</span>.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 19, color: "#424754", lineHeight: 1.6, margin: "0 0 30px", maxWidth: 640 }}>
          PressArk is the WordPress AI copilot for websites and WooCommerce stores that need agentic workflows, tool traces, and human-in-the-loop approvals inside wp-admin.
        </p>
        <div style={{ display: "flex", gap: isMobile ? 14 : 28, flexWrap: "wrap", alignItems: "center" }}>
          {[
            ["116+", "Tools"],
            ["5", "AI Providers"],
            ["1", "Approval model"]
          ].map(([value, label], index) => (
            <React.Fragment key={label}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: isMobile ? 24 : 28, fontWeight: 800, color: "#171c1f", letterSpacing: "-.02em" }}>{value}</span>
                <span className="mono" style={{ fontSize: 11, color: "#727785", textTransform: "uppercase", letterSpacing: ".1em" }}>{label}</span>
              </span>
              {!isMobile && index < 2 && <span style={{ width: 1, height: 26, background: "rgba(112,131,166,.3)" }} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <HeroAside isMobile={isMobile} />
    </div>
  </section>
);

const CapabilityMatrix = ({ isTablet, isMobile }) => {
  const [active, setActive] = useState("content");
  const current = CATEGORIES.find((item) => item.id === active);

  return (
    <section style={{ padding: isMobile ? "56px 16px" : "72px 24px", background: "#fafbfc", borderTop: "1px solid rgba(112,131,166,.12)", borderBottom: "1px solid rgba(112,131,166,.12)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? 32 : 40, display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap" }}>
          <div>
            <Kicker>01 | Tool surface</Kicker>
            <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 10px", lineHeight: 1.1 }}>116+ tools, organized the way WordPress is.</h2>
            <p style={{ fontSize: 16, color: "#424754", maxWidth: 620, margin: 0, lineHeight: 1.6 }}>Pick a domain to see the toolkit. Each tool is approval-gated, with no silent writes.</p>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "#727785", textTransform: "uppercase", letterSpacing: ".12em" }}>/ {CATEGORIES.reduce((sum, item) => sum + item.count, 0)} total</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "260px 1fr", background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, overflow: "hidden", boxShadow: "0 22px 52px -42px rgba(15,39,72,.28)" }}>
          <div style={{ borderRight: isTablet ? "none" : "1px solid rgba(112,131,166,.14)", borderBottom: isTablet ? "1px solid rgba(112,131,166,.14)" : "none", padding: isTablet ? 12 : "12px 0", background: "#fbfcfd", display: isTablet ? "grid" : "block", gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(auto-fit, minmax(140px, 1fr))", gap: isTablet ? 8 : 0 }}>
            {CATEGORIES.map((item) => {
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: isTablet ? "14px 16px" : "14px 20px",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    border: isTablet ? (selected ? "1px solid rgba(0,88,190,.22)" : "1px solid rgba(112,131,166,.14)") : "none",
                    borderLeft: !isTablet && selected ? "2px solid #0058be" : !isTablet ? "2px solid transparent" : undefined,
                    borderRadius: isTablet ? 10 : 0,
                    background: selected ? "#fff" : "transparent",
                    color: selected ? "#171c1f" : "#424754",
                    fontSize: 14,
                    fontWeight: selected ? 700 : 500,
                    textAlign: "left"
                  }}
                >
                  <span>{item.label}</span>
                  <span className="mono" style={{ fontSize: 11, color: "#727785" }}>{item.count}</span>
                </button>
              );
            })}
          </div>

          <div style={{ padding: isMobile ? "20px 16px" : "24px 28px 28px" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "baseline", flexWrap: "wrap", marginBottom: 4 }}>
              <h3 style={{ fontSize: isMobile ? 20 : 22, fontWeight: 800, letterSpacing: "-.02em", margin: 0 }}>{current.label}</h3>
              <span className="mono" style={{ fontSize: 11, color: "#727785", textTransform: "uppercase", letterSpacing: ".1em" }}>{current.count} tools / sample of {current.tools.length}</span>
            </div>
            <div style={{ height: 1, background: "rgba(112,131,166,.14)", margin: "18px 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: isMobile ? 14 : "14px 32px" }}>
              {current.tools.map(([name, desc]) => (
                <div key={name} style={{ display: "flex", gap: 14, paddingBottom: 14, borderBottom: "1px dashed rgba(112,131,166,.16)" }}>
                  <Icon name="bolt" size={16} style={{ color: "#0058be", marginTop: 2, flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div className="mono" style={{ fontSize: 13, color: "#171c1f", fontWeight: 600, marginBottom: 2, overflowWrap: "anywhere" }}>{name}</div>
                    <div style={{ fontSize: 13, color: "#424754", lineHeight: 1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InterfaceSection = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "88px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "5fr 7fr", gap: isMobile ? 28 : 56, alignItems: "center" }}>
      <div>
        <Kicker>02 | Interface layer</Kicker>
        <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 16px", lineHeight: 1.1 }}>Chat-based WP management.</h2>
        <p style={{ fontSize: 16, color: "#424754", lineHeight: 1.65, margin: "0 0 28px", maxWidth: 500 }}>
          Drive the admin through a natural-language command center. Bulk updates, metadata edits, and site settings happen without bouncing through a dozen menus.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            ["Context-aware execution", "The agent reads the current page, selected posts, and active filters."],
            ["Bulk taxonomy and metadata", "Categories, tags, custom fields, and SEO can change across thousands of entries."],
            ["Approval-before-write", "Every mutation is previewed and held until you confirm."]
          ].map(([title, body]) => (
            <div key={title} style={{ display: "flex", gap: 14, paddingBottom: 14, borderBottom: "1px solid rgba(112,131,166,.14)" }}>
              <Icon name="check_circle" fill size={18} style={{ color: "#0058be", marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#171c1f", marginBottom: 3 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#424754", lineHeight: 1.5 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: isMobile ? "6% -2% -2% 4%" : "8% -4% -4% 6%", background: "rgba(15,39,72,.06)", filter: "blur(58px)", borderRadius: 40, zIndex: 0 }} />
        <div style={{ position: "relative", background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 16, boxShadow: "0 42px 100px -58px rgba(11,29,56,.55)", overflow: "hidden" }}>
          <div style={{ padding: isMobile ? "12px 14px" : "14px 18px", borderBottom: "1px solid rgba(112,131,166,.14)", display: "flex", alignItems: "center", gap: 10 }}>
            <img src="../../assets/white_app_logo.png" alt="" style={{ height: 22 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>PressArk in wp-admin</div>
              <div style={{ fontSize: 11, color: "#727785" }}>Claude Sonnet 4 / 14,200 credits</div>
            </div>
            {!isMobile && <span style={{ marginLeft: "auto", fontSize: 11, color: "#16a34a" }}>Ready</span>}
          </div>
          <div style={{ padding: isMobile ? 16 : 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ alignSelf: "flex-end", maxWidth: isMobile ? "100%" : "78%", background: "#0058be", color: "#fff", padding: "10px 14px", borderRadius: "14px 14px 2px 14px", fontSize: 13 }}>
              Trim all product descriptions to under 160 characters.
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <img src="../../assets/white_app_logo.png" alt="" style={{ height: 22, marginTop: 2 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                <ToolRow name="woo_list_products" result="247 found" />
                <ToolRow name="trim_descriptions" result="47 exceed limit" />
                <ToolRow name="update_product" running />
                <div style={{ fontSize: 13, color: "#424754", lineHeight: 1.55 }}>
                  Found <strong style={{ color: "#171c1f" }}>47 products</strong> exceeding the target length. Trimmed drafts are staged and ready for review.
                </div>
              </div>
            </div>
            <div style={{ marginLeft: isMobile ? 0 : 32, display: "flex", flexDirection: "column", gap: 8, background: "#fafbfc", border: "1px solid rgba(112,131,166,.16)", padding: 12, borderRadius: 10 }}>
              <button style={{ padding: "10px 14px", background: "#0058be", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: "inherit" }}>Keep Changes</button>
              <button style={{ padding: "10px 14px", background: "#f0f4f8", color: "#424754", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>Discard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const WorkflowSection = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "88px 24px", background: "#fafbfc", borderTop: "1px solid rgba(112,131,166,.12)", borderBottom: "1px solid rgba(112,131,166,.12)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 44, maxWidth: 620 }}>
        <Kicker>03 | Workflow architecture</Kicker>
        <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 10px", lineHeight: 1.1 }}>Autonomous, but controlled.</h2>
        <p style={{ fontSize: 16, color: "#424754", lineHeight: 1.6, margin: 0 }}>The agent can plan, research, and draft, but it never writes without a clear approval boundary.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        <div style={{ background: "linear-gradient(135deg,#1d3557,#0a1526)", color: "#fff", borderRadius: 14, padding: isMobile ? 22 : 28, boxShadow: "0 30px 80px -46px rgba(15,39,72,.5)" }}>
          <Kicker tone="light">Approval boundary</Kicker>
          <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 12px" }}>Guided writes with staged diffs.</h3>
          <p style={{ fontSize: 14, color: "#c9d4e4", lineHeight: 1.65, margin: "0 0 20px" }}>
            PressArk never writes directly to live. Every generation lands in a staging state where operators review content, SEO metadata, and structural changes before commit.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Diff preview", "Per-field edit", "Rollback", "Audit log"].map((item) => (
              <span key={item} style={{ padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", fontSize: 12 }}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, padding: isMobile ? 22 : 28, boxShadow: "0 22px 52px -42px rgba(15,39,72,.32)" }}>
          <Icon name="auto_awesome" fill size={22} style={{ color: "#0058be" }} />
          <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 10px" }}>Agentic workflows</h3>
          <p style={{ fontSize: 14, color: "#424754", lineHeight: 1.6, margin: "0 0 18px" }}>
            Multi-step agents can scan the site, identify stale content, prepare revisions, and pause with a review package instead of writing invisibly.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 10 }}>
            {[
              ["plan", "Break the task into scoped subtasks."],
              ["scan", "Inventory the relevant content and data."],
              ["draft", "Prepare updates in staging."],
              ["review", "Hold for approval before commit."]
            ].map(([step, body], index) => (
              <div key={step} style={{ padding: 14, background: "#fafbfc", border: "1px solid rgba(112,131,166,.12)", borderRadius: 10 }}>
                <div className="mono" style={{ fontSize: 10, color: "#727785", marginBottom: 6 }}>0{index + 1}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#171c1f", marginBottom: 4 }}>{step}</div>
                <div style={{ fontSize: 12, color: "#424754", lineHeight: 1.5 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, padding: isMobile ? 22 : 28, boxShadow: "0 22px 52px -42px rgba(15,39,72,.32)" }}>
          <Icon name="troubleshoot" size={22} style={{ color: "#171c1f" }} />
          <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 10px" }}>Deep SEO and security analysis</h3>
          <p style={{ fontSize: 14, color: "#424754", lineHeight: 1.6, margin: "0 0 18px" }}>
            Continuous monitoring keeps technical suggestions grounded in real site state, not generic advice.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 10 }}>
            {[
              ["Meta", "98%"],
              ["Alt", "87%"],
              ["Links", "100%"]
            ].map(([label, value]) => (
              <div key={label} style={{ padding: "12px 14px", background: "#fafbfc", border: "1px solid rgba(112,131,166,.12)", borderRadius: 10 }}>
                <div className="mono" style={{ fontSize: 10, color: "#727785", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#171c1f", letterSpacing: "-.02em" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, padding: isMobile ? 22 : 28, boxShadow: "0 22px 52px -42px rgba(15,39,72,.32)" }}>
          <Icon name="webhook" size={22} style={{ color: "#171c1f" }} />
          <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", margin: "14px 0 10px" }}>Engineered automations</h3>
          <p style={{ fontSize: 14, color: "#424754", lineHeight: 1.6, margin: "0 0 18px" }}>
            Connect feeds, APIs, or repeatable jobs to trigger WordPress actions with the same policy controls and approval moments.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontSize: 12, color: "#424754" }}>
            <span className="mono" style={{ padding: "4px 8px", background: "#f4f6f8", borderRadius: 4, color: "#171c1f" }}>rss.feed</span>
            <Icon name="arrow_forward" size={14} style={{ color: "#727785" }} />
            <span className="mono" style={{ padding: "4px 8px", background: "#f4f6f8", borderRadius: 4, color: "#171c1f" }}>agent.summarize</span>
            <Icon name="arrow_forward" size={14} style={{ color: "#727785" }} />
            <span className="mono" style={{ padding: "4px 8px", background: "#e8efff", borderRadius: 4, color: "#0058be" }}>post.create</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const OpsSection = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "88px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "6fr 5fr", gap: isMobile ? 28 : 56, alignItems: "center" }}>
      <div>
        <Kicker>04 | Ops intelligence</Kicker>
        <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 16px", lineHeight: 1.1 }}>WooCommerce at scale.</h2>
        <p style={{ fontSize: 16, color: "#424754", lineHeight: 1.65, margin: "0 0 28px", maxWidth: 540 }}>
          Manage large catalogs with AI-assisted product updates, inventory sweeps, and pricing operations from natural language inside the admin.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))", gap: 24 }}>
          {[
            ["Product management", "Read and update stock levels, pricing, categories, and attributes across the catalog."],
            ["Bulk content", "Generate hundreds of descriptions with unique structures and tighter length control."],
            ["Pricing ops", "Run percentage or flat pricing updates by tag, category, or attribute."],
            ["Order intelligence", "Use plain English to report on orders, refunds, and customer segments."]
          ].map(([title, body]) => (
            <div key={title}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#171c1f", margin: "0 0 6px" }}>{title}</h4>
              <p style={{ fontSize: 13, color: "#424754", lineHeight: 1.6, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, padding: isMobile ? 20 : 28, boxShadow: "0 30px 70px -48px rgba(15,39,72,.34)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
          <Kicker>Usage monitor</Kicker>
          <span className="mono" style={{ fontSize: 10, color: "#16a34a", textTransform: "uppercase", letterSpacing: ".1em" }}>Healthy</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", margin: "14px 0 6px" }}>
          <span style={{ fontSize: isMobile ? 34 : 42, fontWeight: 800, letterSpacing: "-.03em", color: "#171c1f" }}>14,200</span>
          <span className="mono" style={{ fontSize: 14, color: "#727785" }}>/ 20,000 credits</span>
        </div>
        <div style={{ height: 6, background: "#eef1f5", borderRadius: 999, overflow: "hidden", marginBottom: 22 }}>
          <div style={{ height: "100%", width: "71%", background: "linear-gradient(90deg,#2170e4,#0058be)", borderRadius: 999 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            ["Post Generations", "29%", "4,120"],
            ["SEO Metadata Fixes", "20%", "2,880"],
            ["SEO Audits", "51%", "7,200"]
          ].map(([label, pct, value], index) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: index === 0 ? "1px solid rgba(112,131,166,.14)" : "none", borderBottom: "1px solid rgba(112,131,166,.14)" }}>
              <span style={{ fontSize: 13, color: "#424754", flex: 1 }}>{label}</span>
              <span className="mono" style={{ fontSize: 11, color: "#727785", width: 46, textAlign: "right", flexShrink: 0 }}>{pct}</span>
              <span className="mono" style={{ fontSize: 13, color: "#171c1f", fontWeight: 700, width: 70, textAlign: "right", flexShrink: 0 }}>{value}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, fontSize: 12, color: "#727785" }}>Cycle resets on <span className="mono" style={{ color: "#171c1f" }}>May 01, 2026</span></div>
      </div>
    </div>
  </section>
);

const ProvidersSection = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "88px 24px", background: "#fafbfc", borderTop: "1px solid rgba(112,131,166,.12)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "5fr 7fr", gap: isMobile ? 28 : 56, alignItems: "start" }}>
      <div>
        <Kicker>05 | BYOK</Kicker>
        <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 16px", lineHeight: 1.1 }}>Five providers. Zero token markup.</h2>
        <p style={{ fontSize: 16, color: "#424754", lineHeight: 1.65, margin: "0 0 24px" }}>
          Bring your own API key and pay the provider directly. The workflow stays the same; only the routing path changes.
        </p>
        <div style={{ padding: 18, background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 12 }}>
          <div className="mono" style={{ fontSize: 10, color: "#727785", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 8 }}>Routing policy</div>
          <p style={{ fontSize: 13, color: "#424754", lineHeight: 1.6, margin: 0 }}>
            Choose the provider that fits the job while keeping the same approval-first workflow and audit trail inside the plugin.
          </p>
        </div>
      </div>

      {isMobile ? (
        <div style={{ display: "grid", gap: 12 }}>
          {PROVIDERS.map(([name, model, note]) => (
            <div key={name} style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 12, padding: 18, boxShadow: "0 22px 52px -42px rgba(15,39,72,.28)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#171c1f", marginBottom: 8 }}>{name}</div>
              <div className="mono" style={{ fontSize: 12, color: "#424754", marginBottom: 8 }}>{model}</div>
              <div style={{ fontSize: 12, color: "#424754", lineHeight: 1.55 }}>{note}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, overflow: "hidden", boxShadow: "0 22px 52px -42px rgba(15,39,72,.28)" }}>
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <div style={{ minWidth: 620 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1.4fr 1.8fr", padding: "14px 20px", background: "#fafbfc", borderBottom: "1px solid rgba(112,131,166,.14)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "#727785" }}>
                <span>Provider</span><span>Model family</span><span>Notes</span>
              </div>
              {PROVIDERS.map(([name, model, note], index) => (
                <div key={name} style={{ display: "grid", gridTemplateColumns: "1.3fr 1.4fr 1.8fr", padding: "16px 20px", alignItems: "center", borderBottom: index < PROVIDERS.length - 1 ? "1px solid rgba(112,131,166,.12)" : "none" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#171c1f" }}>{name}</span>
                  <span className="mono" style={{ fontSize: 12, color: "#424754" }}>{model}</span>
                  <span style={{ fontSize: 12, color: "#424754" }}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </section>
);

const DocsSection = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "80px 24px", background: "#fff", borderTop: "1px solid rgba(112,131,166,.12)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <Kicker>06 | Implementation docs</Kicker>
        <h3 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", lineHeight: 1.1 }}>Read before you install.</h3>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {DOC_LINKS.map(([title, body, icon, href]) => (
          <a key={title} href={href} style={{ display: "block", padding: isMobile ? 20 : 22, background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 12, textDecoration: "none", color: "inherit", minHeight: "100%" }}>
            <Icon name={icon} size={22} style={{ color: "#0058be", marginBottom: 12 }} />
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", color: "#171c1f" }}>{title}</h4>
            <p style={{ fontSize: 13, color: "#424754", lineHeight: 1.55, margin: 0 }}>{body}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Cta = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px 64px" : "88px 24px", background: "#fff", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isMobile ? 360 : 600, height: isMobile ? 360 : 600, background: "rgba(0,88,190,.05)", filter: "blur(120px)", borderRadius: "50%", zIndex: 0 }} />
    <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
      <h2 style={{ fontSize: isMobile ? 32 : 44, fontWeight: 800, letterSpacing: "-.035em", margin: "0 0 14px", lineHeight: 1.1, textWrap: "balance" }}>
        Install the copilot for WordPress and WooCommerce teams.
      </h2>
      <p style={{ fontSize: isMobile ? 15 : 16, color: "#424754", lineHeight: 1.6, margin: "0 auto 28px", maxWidth: 520 }}>
        Free tier available. Explore the install path, feature set, and workflow model for WordPress websites and WooCommerce stores.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Btn variant="primary" icon="download" href="https://pressark.com/pressark.zip" style={{ flex: isMobile ? "1 1 100%" : "0 0 auto" }}>Download Plugin</Btn>
        <Btn variant="ghost" icon="open_in_new" href="https://github.com/alisel5/pressark" style={{ flex: isMobile ? "1 1 100%" : "0 0 auto" }}>View on GitHub</Btn>
      </div>
    </div>
  </section>
);

const FeaturesPage = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;

  return (
    <>
      <Nav current="Features" />
      <Hero isTablet={isTablet} isMobile={isMobile} />
      <CapabilityMatrix isTablet={isTablet} isMobile={isMobile} />
      <InterfaceSection isTablet={isTablet} isMobile={isMobile} />
      <WorkflowSection isTablet={isTablet} isMobile={isMobile} />
      <OpsSection isTablet={isTablet} isMobile={isMobile} />
      <ProvidersSection isTablet={isTablet} isMobile={isMobile} />
      <DocsSection isTablet={isTablet} isMobile={isMobile} />
      <Cta isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<FeaturesPage />);
