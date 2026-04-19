// Atoms (Icon, Kicker, Chip, Btn) + Nav + Footer come from Shared.jsx
// which is loaded earlier in index.html and exports them to window.

const { useState, useEffect } = React;

const useViewportWidth = () => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

// ---------- HERO ----------
const Hero = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "8px 16px 56px" : "20px 24px 80px", position: "relative" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "4.6fr 7.4fr", gap: isMobile ? 28 : 40, alignItems: "center" }}>
      <div>
        <h1 style={{ fontSize: isMobile ? 38 : isTablet ? 50 : 64, fontWeight: 800, letterSpacing: "-.038em", lineHeight: 1, color: "#171c1f", margin: "0 0 18px", textWrap: "balance" }}>
          Your AI copilot
          <br/>
          for <span style={{ background: "linear-gradient(180deg, transparent 62%, rgba(0,88,190,.22) 62%)", padding: "0 4px" }}>WordPress</span>
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 18, color: "#424754", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 500 }}>
          Manage content, SEO, products, security, and WooCommerce operations from plain English inside wp-admin.
        </p>
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <Btn variant="primary" icon="download" href="https://pressark.com/pressark.zip" style={{ flex: isMobile ? "1 1 100%" : "0 0 auto" }}>Download Plugin</Btn>
          <Btn variant="ghost" icon="open_in_new" href="https://github.com/alisel5/pressark" style={{ flex: isMobile ? "1 1 100%" : "0 0 auto" }}>View on GitHub</Btn>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 12, color: "#424754", flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="verified" fill size={16} style={{ color: "#16a34a" }}/>GPL licensed</span>
          {!isMobile && <span style={{ width: 1, height: 10, background: "rgba(194,198,214,.6)" }}/>}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="verified" fill size={16} style={{ color: "#16a34a" }}/>WordPress 6.x</span>
          {!isMobile && <span style={{ width: 1, height: 10, background: "rgba(194,198,214,.6)" }}/>}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Icon name="verified" fill size={16} style={{ color: "#16a34a" }}/>PHP 8.0+</span>
        </div>
      </div>
      <HeroMock isTablet={isTablet} isMobile={isMobile}/>
    </div>
  </section>
);

const HeroMock = ({ isTablet, isMobile }) => (
  <div style={{ position: "relative" }}>
    <div style={{ position: "absolute", inset: "8% -4% -4% 8%", background: "rgba(15,39,72,.06)", filter: "blur(60px)", borderRadius: 40, zIndex: 0 }}/>
    <div className="hero-mock-shell" style={{ position: "relative", background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 18, boxShadow: "0 42px 100px -58px rgba(11,29,56,.62)", overflow: "hidden" }}>
      <div style={{ height: 30, background: "#1e1e1e", color: "#c3c4c7", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", fontSize: 11 }}>
        <span>Site Admin</span>
        <span>Howdy, Admin</span>
      </div>
      <div style={{ display: "flex", height: isMobile ? 320 : isTablet ? 372 : 424 }}>
        <div style={{ width: isMobile ? 58 : 150, background: "#32373c", padding: "8px 0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          {[{ icon: "dashboard", label: "Dashboard" }, { icon: "article", label: "Posts" }, { icon: "image", label: "Media" }, { icon: "description", label: "Pages" }, { icon: "shopping_bag", label: "Woo" }, { icon: "extension", label: "Plugins" }].map((item) => (
            <div className="hero-mock-nav-item" key={item.icon} style={{ display: "flex", alignItems: "center", gap: 8, padding: isMobile ? "8px 0" : "6px 14px", color: "#c3c4c7", opacity: .6, fontSize: 12, justifyContent: isMobile ? "center" : "flex-start" }}>
              <Icon name={item.icon} size={14}/>
              {!isMobile && <span>{item.label}</span>}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: isMobile ? "10px 0" : "8px 14px", color: "#fff", background: "#171c1f", fontSize: 12, fontWeight: 600, justifyContent: isMobile ? "center" : "flex-start" }}>
            <img src="../../assets/white_app_logo.png" alt="" style={{ height: 16 }}/>
            {!isMobile && "PressArk"}
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", minWidth: 0 }}>
          <div style={{ padding: isMobile ? "12px" : "12px 16px", borderBottom: "1px solid #e2e4e7", display: "flex", alignItems: "center", gap: 10 }}>
            <img src="../../assets/white_app_logo.png" alt="" style={{ height: 22 }}/>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>PressArk Copilot</div>
              <div style={{ fontSize: 10, color: "#787c82" }}>Claude Sonnet 4 · 14,200 credits</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a" }}/>
              {!isMobile && <span style={{ fontSize: 10, color: "#787c82" }}>Ready</span>}
            </div>
          </div>
          <div style={{ flex: 1, padding: isMobile ? 12 : 16, overflow: "hidden", display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="hero-mock-bubble" style={{ alignSelf: "flex-end", background: "#0058be", color: "#fff", padding: "8px 12px", borderRadius: "14px 14px 2px 14px", fontSize: 12, maxWidth: isMobile ? "88%" : "70%" }}>Scan my SEO and tell me what to fix first</div>
            <div style={{ display: "flex", gap: 8 }}>
              <img src="../../assets/white_app_logo.png" alt="" style={{ height: 20, marginTop: 2 }}/>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                <ToolRow name="seo_scan_site" done pct={100}/>
                <ToolRow name="get_posts_missing_meta" done pct={100} result="12 found"/>
                <ToolRow name="update_meta_batch" running pct={62}/>
              </div>
            </div>
            <div className="hero-mock-action-card" style={{ background: "#fff", border: "1px solid rgba(112,131,166,.2)", borderRadius: 10, padding: 8, display: "flex", flexDirection: "column", gap: 6, marginLeft: isMobile ? 0 : 28 }}>
              <div style={{ fontSize: 11, color: "#424754", padding: "4px 6px 6px", borderBottom: "1px solid rgba(112,131,166,.12)" }}>Apply meta description fixes to <b style={{ color: "#171c1f" }}>12 posts</b>?</div>
              <button className="hero-mock-btn hero-mock-btn-primary" type="button" style={{ padding: "8px 12px", background: "#0058be", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}><Icon name="check" size={14}/>Keep changes</button>
              <button className="hero-mock-btn hero-mock-btn-secondary" type="button" style={{ padding: "8px 12px", background: "#f0f4f8", color: "#424754", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}><Icon name="close" size={14}/>Discard</button>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(112,131,166,.18)", padding: 10, background: "#fff" }}>
            <div className="hero-mock-input-shell" style={{ display: "flex", alignItems: "center", background: "#f4f6f8", border: "1px solid rgba(112,131,166,.24)", borderRadius: 999, padding: "3px 3px 3px 14px" }}>
              <input placeholder="Ask PressArk anything..." style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 12, padding: "7px 0", minWidth: 0 }}/>
              <button className="hero-mock-send-btn" type="button" style={{ width: 28, height: 28, borderRadius: "50%", background: "#0058be", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ToolRow = ({ name, running, pct, result }) => (
  <div className="hero-mock-tool-row" style={{ display: "flex", flexDirection: "column", gap: 3 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
      {running ? <span className="spinner-s"/> : <Icon name="check" size={14} style={{ color: "#0058be" }}/>}
      <span style={{ fontSize: 11, color: "#171c1f", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>{name}</span>
      {result && <span style={{ fontSize: 10, color: "#727785", flexShrink: 0 }}>· {result}</span>}
    </div>
    <div style={{ height: 3, background: "#eef1f5", borderRadius: 99, marginLeft: 22 }}>
      <div className={"hero-mock-progress-fill" + (running ? " is-running" : "")} style={{ height: "100%", width: pct + "%", background: "linear-gradient(90deg,#2170e4,#0058be)", borderRadius: 99 }}/>
    </div>
  </div>
);

const HomeMotionStyles = () => (
  <style>{`
    .hero-mock-shell{
      transition: transform .28s var(--ease), box-shadow .28s var(--ease), border-color .28s var(--ease);
      will-change: transform;
    }
    .hero-mock-shell:hover{
      transform: translateY(-3px);
      box-shadow: 0 54px 120px -62px rgba(11,29,56,.72);
      border-color: rgba(0,88,190,.22);
    }
    .hero-mock-nav-item{
      transition: background .18s var(--ease), color .18s var(--ease), opacity .18s var(--ease), transform .18s var(--ease);
    }
    .hero-mock-nav-item:hover{
      background: rgba(255,255,255,.055);
      color: #ffffff;
      opacity: .9;
      transform: translateX(2px);
    }
    .hero-mock-bubble{
      box-shadow: 0 14px 28px -20px rgba(0,88,190,.68);
      transition: transform .22s var(--ease), box-shadow .22s var(--ease);
    }
    .hero-mock-bubble:hover{
      transform: translateY(-1px);
      box-shadow: 0 20px 36px -24px rgba(0,88,190,.72);
    }
    .hero-mock-tool-row{
      transition: transform .18s var(--ease);
    }
    .hero-mock-tool-row:hover{
      transform: translateX(2px);
    }
    .hero-mock-progress-fill{
      position: relative;
      overflow: hidden;
    }
    .hero-mock-progress-fill.is-running::after{
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
      animation: heroMockShimmer 1.35s linear infinite;
    }
    .hero-mock-action-card{
      transition: border-color .2s var(--ease), box-shadow .2s var(--ease), transform .2s var(--ease);
    }
    .hero-mock-action-card:hover{
      border-color: rgba(0,88,190,.22);
      box-shadow: 0 18px 34px -28px rgba(15,39,72,.34);
      transform: translateY(-1px);
    }
    .hero-mock-btn{
      transition: transform .18s var(--ease), background .18s var(--ease), color .18s var(--ease), box-shadow .18s var(--ease);
    }
    .hero-mock-btn:hover{
      transform: translateY(-1px);
    }
    .hero-mock-btn:active{
      transform: translateY(0);
    }
    .hero-mock-btn-primary{
      box-shadow: 0 12px 22px -18px rgba(0,88,190,.72);
    }
    .hero-mock-btn-primary:hover{
      background: #004da6 !important;
      box-shadow: 0 16px 28px -18px rgba(0,88,190,.82);
    }
    .hero-mock-btn-secondary:hover{
      background: #e8eef5 !important;
      color: #171c1f !important;
    }
    .hero-mock-input-shell{
      transition: border-color .2s var(--ease), box-shadow .2s var(--ease), background .2s var(--ease);
    }
    .hero-mock-input-shell:hover{
      background: #f8fafc;
      border-color: rgba(112,131,166,.34) !important;
    }
    .hero-mock-input-shell:focus-within{
      background: #ffffff;
      border-color: rgba(0,88,190,.38) !important;
      box-shadow: 0 0 0 4px rgba(0,88,190,.1);
    }
    .hero-mock-send-btn{
      transition: transform .18s var(--ease), background .18s var(--ease), box-shadow .18s var(--ease);
      box-shadow: 0 10px 18px -14px rgba(0,88,190,.8);
    }
    .hero-mock-send-btn:hover{
      background: #004da6 !important;
      transform: translateY(-1px) scale(1.04);
      box-shadow: 0 14px 24px -14px rgba(0,88,190,.88);
    }
    .hero-mock-send-btn:active{
      transform: scale(.98);
    }
    @keyframes heroMockShimmer{
      from{ transform: translateX(-100%); }
      to{ transform: translateX(180%); }
    }
    @media (prefers-reduced-motion: reduce){
      .hero-mock-shell,
      .hero-mock-nav-item,
      .hero-mock-bubble,
      .hero-mock-tool-row,
      .hero-mock-action-card,
      .hero-mock-btn,
      .hero-mock-input-shell,
      .hero-mock-send-btn{
        transition: none !important;
      }
      .hero-mock-progress-fill.is-running::after{
        animation: none !important;
      }
    }
  `}</style>
);

// ---------- TRUST STRIP ----------
const TrustStrip = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "20px 16px" : "24px", borderTop: "1px solid rgba(112,131,166,.12)", borderBottom: "1px solid rgba(112,131,166,.12)", background: "#ffffff" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
      <span style={{ fontSize: 12, color: "#424754", fontWeight: 600 }}>Built for WordPress teams and WooCommerce operators</span>
      {["116+ Tools", "5 AI Providers", "WooCommerce Ready", "Elementor Support", "Enterprise Grade"].map((label) => (
        <Chip key={label} variant="pill">{label}</Chip>
      ))}
    </div>
  </section>
);

// ---------- HOW IT WORKS ----------
const HowItWorks = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "80px 24px", position: "relative" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: isMobile ? 36 : 56 }}>
        <Kicker>The Workflow</Kicker>
        <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", color: "#171c1f", margin: "12px 0 0", lineHeight: 1.1 }}>Precision in three steps.</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(3, minmax(0, 1fr))", gap: isMobile ? 28 : 40 }}>
        {[
          { n: "01", t: "Install the plugin", b: "Download the ZIP and upload it to your WordPress dashboard. No external accounts and no SaaS dependency." },
          { n: "02", t: "Ask in plain English", b: "Open the PressArk panel and type your request. It understands posts, SEO metadata, taxonomies, products, and WooCommerce workflows." },
          { n: "03", t: "Review and apply", b: "The agent drafts changes, shows its tool trace, explains the work, and waits for approval before committing anything." }
        ].map((step) => (
          <div key={step.n} style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -12, left: -4, fontSize: isMobile ? 56 : 72, fontWeight: 900, color: "rgba(194,198,214,.25)", lineHeight: 1, letterSpacing: "-.04em" }}>{step.n}</div>
            <div style={{ position: "relative", paddingTop: 32 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: "#171c1f" }}>{step.t}</h3>
              <p style={{ fontSize: 15, color: "#424754", lineHeight: 1.65, margin: 0 }}>{step.b}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ---------- BENTO FEATURES ----------
const FeaturesBento = ({ isTablet, isMobile }) => {
  const gridColumns = isMobile ? "1fr" : isTablet ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))";
  const tileStyle = { background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, padding: isMobile ? 20 : 22, boxShadow: "0 22px 52px -42px rgba(15,39,72,.36)" };

  return (
    <section style={{ padding: isMobile ? "56px 16px" : "80px 24px", background: "#fafbfc", borderTop: "1px solid rgba(112,131,166,.12)", borderBottom: "1px solid rgba(112,131,166,.12)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 48 }}>
          <Kicker>Capabilities</Kicker>
          <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 12px" }}>Architected for professionals.</h2>
          <p style={{ fontSize: 16, color: "#424754", maxWidth: 680, margin: "0 auto", lineHeight: 1.6 }}>Beyond simple chat: a WordPress copilot that helps run content, SEO, WooCommerce, and operations from inside wp-admin.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: gridColumns, gridAutoRows: "minmax(180px, auto)", gap: 16 }}>
          <div style={{ ...tileStyle, gridColumn: isMobile ? "span 1" : "span 2", gridRow: isMobile ? "span 1" : "span 2", padding: isMobile ? 22 : 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <Chip>Coverage</Chip>
              <div style={{ fontSize: isMobile ? 68 : 90, fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1, marginTop: 20 }}><span style={{ color: "#171c1f" }}>116</span><span style={{ color: "#c2c6d6" }}>+</span></div>
              <div style={{ fontSize: 15, color: "#424754", marginTop: 8 }}>tools across content, SEO, WooCommerce, security, and operations.</div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 20, borderTop: "1px solid rgba(112,131,166,.12)" }}>
              {["Posts", "Media", "SEO", "Woo", "Users", "Security", "Elementor"].map((tag) => <Chip key={tag} variant="hairline">{tag}</Chip>)}
            </div>
          </div>

          <div style={{ gridColumn: isMobile ? "span 1" : "span 2", background: "linear-gradient(135deg,#1d3557,#0a1526)", color: "#fff", borderRadius: 14, padding: isMobile ? 22 : 28, position: "relative", overflow: "hidden", boxShadow: "0 30px 80px -46px rgba(15,39,72,.5)" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(33,112,228,.5), transparent 70%)", filter: "blur(20px)" }}/>
            <div style={{ position: "relative" }}>
              <Kicker tone="light">Bring your own key</Kicker>
              <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", margin: "12px 0 10px" }}>Five providers. Zero token markup.</h3>
              <p style={{ fontSize: 14, color: "#c9d4e4", lineHeight: 1.6, margin: "0 0 16px" }}>Plug in your own API key and pay providers directly.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[{ n: "OpenAI", c: "#10a37f" }, { n: "Anthropic", c: "#d97757" }, { n: "Google Gemini", c: "#4285f4" }, { n: "DeepSeek", c: "#6b6bff" }, { n: "OpenRouter", c: "#fa5e21" }].map((provider) => (
                  <span key={provider.n} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", fontSize: 12, borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", fontWeight: 600 }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: provider.c }}/>{provider.n}</span>
                ))}
              </div>
            </div>
          </div>

          {[
            { icon: "monitoring", t: "SEO scans", b: "Missing meta, broken links, and alt-text gaps fixed in one approved batch." },
            { icon: "security", t: "Security audits", b: "Scans for WordPress, theme, and plugin misconfig with guided hardening." },
            { icon: "shopping_cart", t: "WooCommerce ops", b: "Edit products, prices, stock, taxes, and orders from plain English." },
            { icon: "history", t: "Audit log", b: "Every change made by the agent is versioned and rollback-ready." }
          ].map((feature) => (
            <div key={feature.t} style={tileStyle}>
              <Icon name={feature.icon} size={22} style={{ color: "#171c1f", marginBottom: 12 }}/>
              <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px" }}>{feature.t}</h4>
              <p style={{ fontSize: 13, color: "#424754", lineHeight: 1.55, margin: 0 }}>{feature.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- PLAN BRIDGE ----------
const PlanBridge = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "80px 24px", background: "#fafbfc", borderTop: "1px solid rgba(112,131,166,.12)", borderBottom: "1px solid rgba(112,131,166,.12)" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.1fr .9fr", gap: isMobile ? 24 : 36, alignItems: "center" }}>
      <div>
        <Kicker>Plan fit</Kicker>
        <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 14px", lineHeight: 1.08 }}>
          Pick the tier from the source-of-truth pricing page.
        </h2>
        <p style={{ fontSize: 15, color: "#424754", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 620 }}>
          The homepage explains the product. The dedicated pricing page carries the current tier table, top-up packs, feature matrix, and BYOK billing model so plan details only live in one place.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Btn variant="primary" icon="credit_score" href="pricing.html">See current pricing</Btn>
          <Btn variant="ghost" icon="article" href="docs.html#pricing-credits">Read billing docs</Btn>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        {[
          { label: "5 tiers", note: "Free through Enterprise on the pricing page" },
          { label: "Top-up packs", note: "Credit packs stay documented on pricing and docs" },
          { label: "BYOK policy", note: "Managed credits and direct-provider routing explained in one place" }
        ].map((item) => (
          <div key={item.label} style={{ background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 14, padding: 18, boxShadow: "0 22px 52px -42px rgba(15,39,72,.24)" }}>
            <div className="mono" style={{ fontSize: 10, color: "#727785", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: 8 }}>{item.label}</div>
            <div style={{ fontSize: 13, color: "#424754", lineHeight: 1.55 }}>{item.note}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ---------- FAQ ----------
const HomeFaq = ({ isMobile }) => {
  const [open, setOpen] = useState(0);
  const items = [
    { q: "What exactly are credits?", a: "Credits represent the usage consumed when PressArk runs tools or generates output. Higher-complexity jobs use more credits than quick content tasks." },
    { q: "Can I upgrade or downgrade anytime?", a: "Yes. Plan changes are managed from the billing area, and any pricing change takes effect on the next renewal cycle." },
    { q: "Does PressArk work with my theme or WooCommerce setup?", a: "Yes. PressArk runs inside wp-admin and works through standard WordPress APIs, so it stays theme-agnostic and adapts to WooCommerce when the plugin is active." },
    { q: "What data leaves my site?", a: "With BYOK, requests go directly to your selected provider. In managed mode, PressArk routes requests through its secured gateway and keeps credentials encrypted in WordPress." }
  ];

  return (
    <section style={{ padding: isMobile ? "56px 16px" : "80px 24px", background: "#ffffff", borderTop: "1px solid rgba(112,131,166,.12)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <Kicker>Questions</Kicker>
          <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0" }}>Frequently asked.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item, index) => (
            <div key={item.q} style={{ background: "#fff", border: "1px solid rgba(112,131,166,.2)", borderRadius: 10, overflow: "hidden" }}>
              <button onClick={() => setOpen(open === index ? -1 : index)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: isMobile ? "16px" : "16px 20px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <span className="mono" style={{ fontSize: 11, color: open === index ? "#171c1f" : "#727785", width: 24, flexShrink: 0 }}>{String(index + 1).padStart(2, "0")}</span>
                  <h4 style={{ margin: 0, fontWeight: 700, fontSize: 15, color: "#171c1f", textAlign: "left" }}>{item.q}</h4>
                </div>
                <Icon name="expand_more" size={20} style={{ color: open === index ? "#171c1f" : "#727785", transform: open === index ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}/>
              </button>
              {open === index && <div style={{ padding: isMobile ? "14px 16px 18px" : "14px 20px 18px 56px", borderTop: "1px solid rgba(112,131,166,.1)" }}><p style={{ margin: 0, fontSize: 13, color: "#424754", lineHeight: 1.65 }}>{item.a}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer comes from Shared.jsx

// ---------- REVIEW & APPLY ----------
const ReviewSection = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "56px 16px" : "80px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 64, alignItems: "center" }}>
      <div>
        <Kicker>Human in the loop</Kicker>
        <h2 style={{ fontSize: isMobile ? 30 : 36, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 16px", lineHeight: 1.1 }}>Nothing ships without your approval.</h2>
        <p style={{ fontSize: 16, color: "#424754", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 460 }}>
          Every destructive action, including content edits, plugin changes, and WooCommerce updates, is staged, previewed, and held until you review it.
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { i: "preview", t: "Preview before commit", b: "Diff-style previews for every file, post, and setting change." },
            { i: "history", t: "One-click rollback", b: "Every approved batch is versioned and reversible." },
            { i: "verified_user", t: "Audit log", b: "Who asked, what ran, and when, stored with your site." }
          ].map((item) => (
            <li key={item.t} style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f4f6f8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid rgba(112,131,166,.18)" }}>
                <Icon name={item.i} size={18} style={{ color: "#171c1f" }}/>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#171c1f", marginBottom: 2 }}>{item.t}</div>
                <div style={{ fontSize: 13, color: "#424754", lineHeight: 1.5 }}>{item.b}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: isMobile ? "-3%" : "-6% -4%", background: "#fafbfc", borderRadius: 24, zIndex: 0 }}/>
        <div style={{ position: "relative", background: "#fff", border: "1px solid rgba(112,131,166,.16)", borderRadius: 16, padding: isMobile ? 16 : 20, boxShadow: "0 30px 70px -48px rgba(15,39,72,.34)", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(112,131,166,.12)" }}>
            <img src="../../assets/white_app_logo.png" alt="" style={{ height: 20 }}/>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Pending review</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#727785", fontFamily: "'JetBrains Mono',monospace" }}>3 actions</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
            {[
              { i: "edit_note", t: "Update meta descriptions", c: "12 posts" },
              { i: "image", t: "Add alt text", c: "48 images" },
              { i: "link", t: "Fix broken internal links", c: "5 links" }
            ].map((row) => (
              <div key={row.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "#fafbfc", border: "1px solid rgba(112,131,166,.14)", borderRadius: 8 }}>
                <Icon name={row.i} size={18} style={{ color: "#171c1f" }}/>
                <span style={{ fontSize: 13, color: "#171c1f", fontWeight: 500 }}>{row.t}</span>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#727785", fontFamily: "'JetBrains Mono',monospace", flexShrink: 0 }}>{row.c}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button style={{ padding: "12px 18px", background: "#0058be", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit", boxShadow: "0 10px 24px -14px rgba(0,88,190,.6)" }}><Icon name="check" size={18}/>Keep Changes</button>
            <button style={{ padding: "12px 18px", background: "#f0f4f8", color: "#424754", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}><Icon name="close" size={18}/>Discard</button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------- APP ----------
const App = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;

  return (
    <>
      <HomeMotionStyles/>
      <Nav current="Home"/>
      <Hero isTablet={isTablet} isMobile={isMobile}/>
      <TrustStrip isMobile={isMobile}/>
      <HowItWorks isTablet={isTablet} isMobile={isMobile}/>
      <FeaturesBento isTablet={isTablet} isMobile={isMobile}/>
      <ReviewSection isTablet={isTablet} isMobile={isMobile}/>
      <PlanBridge isTablet={isTablet} isMobile={isMobile}/>
      <HomeFaq isMobile={isMobile}/>
      <Footer/>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
