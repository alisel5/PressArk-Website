// Shared atoms + Nav + Footer used across PressArk website pages.
// Export everything to window so other Babel scripts can use these directly.

const { useState, useEffect } = React;

const useViewportWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const Icon = ({ name, fill, size = 18, style }) => (
  <span className={"ms" + (fill ? " fill" : "")} style={{ fontSize: size, ...style }}>{name}</span>
);

const Kicker = ({ children, tone = "primary" }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    fontSize: 10, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase",
    color: tone === "light" ? "#8fa5c6" : "#171c1f"
  }}>
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: 999,
        background: tone === "light" ? "#8fa5c6" : "#0058be",
        boxShadow: tone === "light" ? "0 0 0 4px rgba(143,165,198,.14)" : "0 0 0 4px rgba(0,88,190,.12)",
        flexShrink: 0
      }}
    />
    {children}
  </span>
);

const Chip = ({ children, variant = "tinted" }) => {
  const chipStyles = {
    tinted: { background: "#f4f6f8", color: "#171c1f", border: "1px solid rgba(112,131,166,.22)", borderRadius: 2 },
    hairline: { background: "transparent", color: "#424754", border: "1px solid rgba(112,131,166,.32)", borderRadius: 999 },
    pill: { background: "#f4f6f8", color: "#424754", border: "none", borderRadius: 999, textTransform: "none", letterSpacing: 0, fontWeight: 500, fontSize: 12 }
  };
  return <span style={{
    display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px",
    fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", ...chipStyles[variant]
  }}>{children}</span>;
};

const Btn = ({ children, variant = "primary", icon, onClick, style, href }) => {
  const isExternal = href && /^https?:\/\//.test(href);
  const base = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 22px", borderRadius: 10, fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all .2s", textDecoration: "none" };
  const v = {
    primary: { background: "#171c1f", color: "#fff", boxShadow: "0 18px 40px -24px rgba(23,28,31,.5)" },
    ghost: { background: "#f4f6f8", color: "#171c1f", border: "1px solid rgba(112,131,166,.2)" },
    outline: { background: "#fff", color: "#171c1f", border: "1.5px solid rgba(112,131,166,.32)" },
    dark: { background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.2)" },
    nav: { background: "transparent", color: "#424754", padding: "7px 12px", fontSize: 13, fontWeight: 500, borderRadius: 8 }
  };
  const Tag = href ? "a" : "button";
  return <Tag href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer noopener" : undefined} onClick={onClick} style={{ ...base, ...v[variant], ...style }}>{icon && <Icon name={icon} size={18}/>} {children}</Tag>;
};

const Nav = ({ current = "" }) => {
  const width = useViewportWidth();
  const isCompact = width < 980;
  const isTight = width < 640;
  const links = [
    { label: "Home", href: "index.html" },
    { label: "Features", href: "features.html" },
    { label: "Use Cases", href: "use-cases.html" },
    { label: "Pricing", href: "pricing.html" },
    { label: "Docs", href: "docs.html" },
    { label: "Changelog", href: "changelog.html" }
  ];

  return (
    <div style={{ position: "sticky", top: isTight ? 8 : 14, zIndex: 50, padding: isTight ? "0 12px" : "0 24px", marginBottom: isCompact ? 24 : 40 }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          minHeight: isCompact ? 60 : 64,
          border: "1px solid rgba(112,131,166,.2)",
          borderRadius: isTight ? 12 : 14,
          background: "#ffffff",
          boxShadow: "0 16px 34px -30px rgba(15,39,72,.18)",
          display: "flex",
          alignItems: isCompact ? "stretch" : "center",
          justifyContent: "space-between",
          padding: isCompact ? "10px 12px" : "0 12px 0 18px",
          gap: isCompact ? 10 : 12,
          flexWrap: isCompact ? "wrap" : "nowrap"
        }}
      >
        <div style={{ display: "flex", alignItems: isCompact ? "flex-start" : "center", gap: isCompact ? 12 : 24, width: isCompact ? "100%" : "auto", flexWrap: isCompact ? "wrap" : "nowrap" }}>
          <a href="index.html" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
            <img src="../../assets/white_app_logo.png" alt="PressArk" style={{ height: 28, width: "auto" }}/>
            <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-.02em" }}>PressArk</span>
          </a>
          <div style={{ display: "flex", gap: 2, rowGap: isTight ? 6 : 2, overflowX: isCompact && !isTight ? "auto" : "visible", flexWrap: isTight ? "wrap" : "nowrap", width: isCompact ? "100%" : "auto", paddingBottom: isCompact && !isTight ? 2 : 0 }}>
            {links.map((link) => (
              <a key={link.label} href={link.href} style={{ padding: isTight ? "6px 10px" : "7px 12px", fontSize: isTight ? 12 : 13, fontWeight: current === link.label ? 700 : 500, color: current === link.label ? "#171c1f" : "#424754", background: current === link.label ? "#f4f6f8" : "transparent", borderRadius: 8, cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap" }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: isCompact ? "100%" : "auto", justifyContent: isCompact ? "flex-start" : "flex-end" }}>
          <Btn variant="primary" href="https://pressark.com/pressark.zip" style={{ padding: isTight ? "9px 14px" : "9px 16px", borderRadius: 14, fontSize: 13 }} icon="download">
            {isTight ? "Download" : "Download plugin"}
          </Btn>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const width = useViewportWidth();
  const isCompact = width < 960;
  const isMobile = width < 640;
  const columns = isMobile ? "1fr" : isCompact ? "repeat(2, minmax(0, 1fr))" : "2fr 1fr 1fr 1fr";
  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/pressark/" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61575532352454" },
    { label: "Pinterest", href: "https://es.pinterest.com/pressarkai/" },
    { label: "YouTube", href: "https://www.youtube.com/@PressArk/" },
    { label: "TikTok", href: "https://www.tiktok.com/@pressark/" },
    { label: "Bluesky", href: "https://bsky.app/profile/pressark.bsky.social/" },
    { label: "Instagram", href: "https://www.instagram.com/pressarkai/" }
  ];
  const groups = [
    { h: "Product", l: [{ label: "Features", href: "features.html" }, { label: "Pricing", href: "pricing.html" }, { label: "Use Cases", href: "use-cases.html" }, { label: "Download plugin", href: "https://pressark.com/pressark.zip" }] },
    { h: "Resources", l: [{ label: "Docs", href: "docs.html" }, { label: "Changelog", href: "changelog.html" }, { label: "FAQ", href: "faq.html" }, { label: "Security", href: "security.html" }] },
    { h: "Company", l: [{ label: "Contact", href: "contact.html" }, { label: "Privacy", href: "privacy.html" }, { label: "Terms", href: "terms.html" }, { label: "GitHub", href: "https://github.com/alisel5/pressark" }] }
  ];

  return (
    <footer style={{ background: "linear-gradient(180deg,#0a1526,#111e37)", color: "#c9d4e4", padding: isMobile ? "44px 16px 24px" : "60px 24px 28px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "38px 38px", maskImage: "radial-gradient(circle at center, black 10%, transparent 78%)", WebkitMaskImage: "radial-gradient(circle at center, black 10%, transparent 78%)" }}/>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: columns, gap: isMobile ? 24 : 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src="../../assets/app-icon-rounded-1024.png" alt="PressArk" style={{ height: 32 }}/>
              <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>PressArk</span>
            </div>
            <p style={{ fontSize: 13, color: "#8fa5c6", maxWidth: 300, lineHeight: 1.6, margin: 0 }}>The AI copilot for WordPress websites and WooCommerce stores. Built for operators who work inside wp-admin.</p>
            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#8fa5c6", marginBottom: 12 }}>Follow</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 360 }}>
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,.06)",
                      border: "1px solid rgba(255,255,255,.12)",
                      color: "#c9d4e4",
                      fontSize: 12,
                      fontWeight: 600,
                      textDecoration: "none"
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {groups.map((group) => (
            <div key={group.h}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#8fa5c6", marginBottom: 12 }}>{group.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {group.l.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} target={/^https?:\/\//.test(item.href) ? "_blank" : undefined} rel={/^https?:\/\//.test(item.href) ? "noreferrer noopener" : undefined} style={{ color: "#c9d4e4", fontSize: 13, textDecoration: "none" }}>{item.label}</a>
                    ) : (
                      <span style={{ color: "#c9d4e4", fontSize: 13 }}>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", gap: 8, fontSize: 12, color: "#8fa5c6" }}>
          <span>(c) 2026 PressArk. GPL licensed.</span>
          <span className="mono">v1.4.2 | WordPress 6.4+</span>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Icon, Kicker, Chip, Btn, Nav, Footer });
