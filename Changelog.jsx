const { useState: useStateC, useEffect: useEffectC } = React;

const RELEASES = [
  {
    id: "v510",
    version: "v5.1.0",
    meta: "Current stable tag",
    badge: "Latest",
    title: "Model lineup refresh and premium gating",
    summary:
      "The current stable release refreshes the model catalog, moves top-end models behind Team+ plans, improves compression behavior, and closes several confirm-flow and typing issues.",
    tags: ["Models", "Team+", "Compression", "Fixes"],
    items: [
      "Updated the supported model lineup to include DeepSeek V3.2, MiniMax M2.7, Claude 4.6, Kimi K2.5, GLM-5, GPT-5.4, and GPT-5.3 Codex tiers.",
      "Reserved the highest-end models for Team, Agency, and Enterprise plans.",
      "Added a Value ICU class for mid-tier models to improve Pro-plan credit efficiency.",
      "Replaced ICU-based context compression with token-based compression up to a 258K ceiling.",
      "Added an AI compaction cooldown so repeated summarization calls do not keep burning credits.",
      "Fixed multi-card confirm settlement, silent auto-continue behavior, type safety around comment_ids and block attrs, and custom-model visibility for non-BYOK plans."
    ]
  },
  {
    id: "v505",
    version: "v5.0.5",
    meta: "Patch release",
    title: "Compliance cleanup and packaging fixes",
    summary:
      "This patch aligns shipped metadata, clarifies the serviceware story in plugin copy, hardens automation nonce handling, and cleans up release packaging.",
    tags: ["Compliance", "Security", "Packaging"],
    items: [
      "Aligned the main plugin version with the readme stable tag.",
      "Clarified serviceware and external-service requirements in the plugin description and readme.",
      "Sanitized automation nonces before verification.",
      "Slimmed the readme and moved detailed release notes into changelog.txt.",
      "Updated the checkout image reference to an existing bundled asset."
    ]
  },
  {
    id: "v500",
    version: "v5.0.0",
    meta: "Major billing release",
    title: "Credits, packs, and the Token Bank architecture",
    summary:
      "Version 5.0.0 restructures the commercial layer around credits, top-up packs, provider routing, and safer budget settlement while expanding tiers and WooCommerce coverage.",
    tags: ["Credits", "Token Bank", "Billing", "WooCommerce"],
    items: [
      "Replaced raw token counting with an ICU-based credit system for more predictable cross-model billing.",
      "Added one-time credit packs for Pro plans and above.",
      "Introduced the AI proxy architecture where the Token Bank manages provider calls, routing, and billing.",
      "Added a reservation pipeline with estimate, reserve, settle, and reconcile stages to prevent overspend.",
      "Added a cost ledger and execution tracking with per-request credit accounting.",
      "Introduced a task-aware model policy for provider and model selection.",
      "Made Freemius webhook processing for credit packs idempotent.",
      "Added the Team tier with 15M credits, 15 automations, and 5 sites.",
      "Expanded WooCommerce coverage with analytics, webhooks, alerts, and broader product tooling.",
      "Improved workflow handling for content editing, SEO work, and WooCommerce operations.",
      "Restructured plan tiers and replaced token terminology with credits across the product."
    ]
  },
  {
    id: "v412",
    version: "v4.1.2",
    meta: "Multisite safety patch",
    title: "Tracked-site uninstall and legacy network-active protections",
    summary:
      "This patch closes multisite lifecycle gaps by cleaning every tracked site, hard-disabling legacy network-active installs, and backing the behavior with dedicated tests.",
    tags: ["Multisite", "Uninstall", "Safety", "Tests"],
    items: [
      "Multisite uninstall now removes data from every site where PressArk was activated individually.",
      "Legacy network-activated installs are hard-disabled at runtime with recovery guidance until they are reactivated per site.",
      "Version markers and multisite uninstall wording now match shipped behavior.",
      "Added multisite lifecycle coverage for activation blocking, legacy network-active detection, and tracked-site uninstall scope."
    ]
  },
  {
    id: "v411",
    version: "v4.1.1",
    meta: "Multisite activation rule",
    title: "Per-site activation becomes mandatory",
    summary:
      "PressArk now blocks network-wide activation outright and documents the per-site requirement more clearly for multisite operators.",
    tags: ["Multisite", "Safety", "Docs"],
    items: [
      "Blocked network-wide activation with a clear error message.",
      "Added multisite FAQ guidance explaining that PressArk must be activated per site."
    ]
  },
  {
    id: "v410",
    version: "v4.1.0",
    meta: "Privacy and retention fixes",
    title: "Uninstall scope, exports, and retention registration",
    summary:
      "This release tightens privacy exports, fixes retention timing, and makes uninstall behavior more accurate for multisite and automation data.",
    tags: ["Privacy", "Retention", "Settings", "Multisite"],
    items: [
      "Multisite uninstall now wipes every site only when PressArk was network-activated; site-level uninstall stays scoped to the current site.",
      "Privacy exports now include full log old and new values plus full run and task payloads without truncation.",
      "Runs and tasks retention now use terminal timestamps with legacy fallbacks for older rows.",
      "Runs, tasks, and archived automations retention settings are now fully registered and rendered in Settings.",
      "Added privacy lifecycle coverage for uninstall scope logic and export completeness."
    ]
  },
  {
    id: "v400",
    version: "v4.0.0",
    meta: "Automation release",
    title: "Scheduled prompts, Telegram notifications, and automation admin",
    summary:
      "Version 4.0.0 adds the automation domain in earnest, including persistence, admin tooling, unattended policies, and Telegram notifications.",
    tags: ["Automations", "Telegram", "Admin", "Dispatch"],
    items: [
      "Introduced the Scheduled Prompts automation domain with dedicated persistence and run and task lineage.",
      "Added Telegram notifications for automation success, failure, and policy-block events.",
      "Added automation admin screens for creation, listing, editing, manual dispatch, and notification settings.",
      "Automation tasks now use schedule-owned idempotency keys so separate schedules do not collapse together.",
      "One-shot automations now archive only after successful settlement.",
      "Unattended confirm runs now fail correctly on policy-blocked writes.",
      "Privacy export and erase now include automation run records and Telegram metadata.",
      "Automation dispatch now prefers Action Scheduler with WP-Cron fallback."
    ]
  },
  {
    id: "v300",
    version: "v3.0.0",
    meta: "Architecture release",
    title: "Unified orchestration pipeline",
    summary:
      "The 3.0 release consolidates sync and async behavior behind shared pipeline, router, and model-policy layers without breaking existing contracts.",
    tags: ["Pipeline", "Router", "Model policy", "Refactor"],
    items: [
      "Unified sync and async execution paths behind a single settlement, tracking, and response pipeline.",
      "Added PressArk_Pipeline so finalize() replaces duplicated settle, track, release, and reconcile blocks.",
      "Added PressArk_Router for centralized async, workflow, agent, and legacy routing.",
      "Added PressArk_Model_Policy for policy-driven provider and model selection.",
      "Reduced process_chat() from roughly 230 lines to about 60 lines.",
      "Replaced task queue finalize_result() logic with the shared pipeline.",
      "Moved AI connector model resolution and native-tool support checks behind Model Policy.",
      "Preserved response shapes, tool names, and API contracts."
    ]
  },
  {
    id: "v280",
    version: "v2.8.0",
    meta: "Entitlements release",
    title: "Sampling-based tier access",
    summary:
      "This release introduces entitlements as a first-class layer, giving free users sampled tool access while keeping Pro+ plans unrestricted.",
    tags: ["Entitlements", "Tiers", "Usage tracking"],
    items: [
      "Added a sampling-based tier system where free users get 6 non-read tool calls per week and Pro+ users remain unlimited.",
      "Introduced PressArk_Entitlements for centralized tier gating and per-group usage tracking.",
      "Added a Plan Capabilities section on Settings for free-user group usage visibility.",
      "Added a dashboard widget showing the current plan tier label.",
      "Included plan_info payloads in chat responses for frontend updates.",
      "Enforced group usage in the action engine and surfaced entitlement_denied handling in chat.",
      "Kept Deep mode exclusive to Pro+ while making the rest of the tool surface available through sampling."
    ]
  },
  {
    id: "v270",
    version: "v2.7.0",
    meta: "Handler split",
    title: "Action engine decomposition into domain handlers",
    summary:
      "PressArk breaks the monolithic action engine into domain-specific handlers, dramatically reducing engine size while keeping tool contracts stable.",
    tags: ["Handlers", "WooCommerce", "Refactor"],
    items: [
      "Split the monolithic action engine into 7 domain handler classes plus a shared base.",
      "Added PressArk_Handler_Base with shared helpers for capability checks, checkpointing, SEO keys, and success or error responses.",
      "Added a dedicated WooCommerce handler covering products, orders, customers, coupons, shipping, taxes, payments, emails, analytics, webhooks, alerts, and more.",
      "Integrated content, system, and Elementor handlers with lazy-loaded delegation from the engine.",
      "Reduced the engine from about 8,350 lines to about 840 lines.",
      "Preserved tool names, classifications, and response contracts."
    ]
  },
  {
    id: "v260",
    version: "v2.6.0",
    meta: "Insights and retention",
    title: "Retention controls and operational reporting",
    summary:
      "Version 2.6.0 introduces configurable cleanup windows, an insights dashboard, and safer GDPR handling around ledger and task data.",
    tags: ["Insights", "Retention", "GDPR"],
    items: [
      "Added configurable auto-cleanup for action logs, chat history, and cost telemetry.",
      "Added an Insights admin sub-page for provider cost, model cost, cache hit rate, route usage, agent rounds, failure reasons, and daily volume.",
      "Added 7, 30, and 90 day selectors to the Insights page.",
      "Added retention settings to Settings with a 7-day minimum floor.",
      "Added a daily pressark_retention_cleanup cron job with batched deletion.",
      "Fixed the GDPR eraser so it removes cost_ledger and tasks rows for the user.",
      "Protected in-flight reservations during cleanup and used updated_at to preserve active chats."
    ]
  },
  {
    id: "v250",
    version: "v2.5.0",
    meta: "Async infrastructure",
    title: "Dedicated task storage and queue backends",
    summary:
      "This release replaces wp_options task storage with a dedicated tasks table and adds safer queue behavior around locking, retries, cleanup, and deactivation.",
    tags: ["Async", "Queue", "Tasks"],
    items: [
      "Added a dedicated pressark_tasks database table instead of wp_options-based task storage.",
      "Added pluggable queue backends with Action Scheduler as primary and WP-Cron as fallback.",
      "Added atomic claim locking to prevent double-processing.",
      "Added exponential backoff retries at 30, 60, and 120 seconds for up to two retries.",
      "Added cleanup for delivered results after 24 hours and stale running tasks after 60 minutes.",
      "Preserved loaded_groups and checkpoint data through async round-trips.",
      "Fixed deactivation so all async cron events are cleared.",
      "Introduced the task store and queue backend classes that support the new pipeline."
    ]
  },
  {
    id: "v240",
    version: "v2.4.0",
    meta: "Context discipline",
    title: "Tiered reads, checkpoints, and compaction",
    summary:
      "Version 2.4.0 reduces context waste by adding tiered reads, structured checkpoints, and history compaction across multi-turn sessions.",
    tags: ["Context", "Compression", "Checkpoints"],
    items: [
      "Added tiered content reads with light, structured, and full modes.",
      "Promoted the content index so search_knowledge is available in core plus content tool groups.",
      "Added structured conversation checkpoints for goals, entities, facts, pending work, constraints, and outcomes.",
      "Replaced backward history scans with checkpoint headers plus the last 6 messages.",
      "Added large tool-result compaction before re-injecting results into the agent loop.",
      "Kept workflows on explicit full read mode to preserve behavior.",
      "Reduced input-credit use by about 40 to 60 percent on typical multi-turn conversations."
    ]
  },
  {
    id: "v231",
    version: "v2.3.1",
    meta: "Tool discovery release",
    title: "AI-driven discovery replaces keyword matching",
    summary:
      "The tool-loading layer shifts away from keyword classification toward discovery and load meta-tools with conversation-scoped state.",
    tags: ["Tool discovery", "Loaded state", "Observability"],
    items: [
      "Replaced runtime keyword-based intent classification with AI-driven tool discovery.",
      "Added discover_tools for local text search across all tools without an AI call.",
      "Added load_tools so the agent can load tool groups or individual tools on demand.",
      "Persisted loaded-tool state across turns through frontend and backend round-trips.",
      "Added a feature-flagged fallback that sends the full toolset after repeated zero-result discovers.",
      "Added tool_loading metadata to every response.",
      "Deprecated match_groups() in the main resolve path while keeping legacy load_tool_group compatibility."
    ]
  },
  {
    id: "v230",
    version: "v2.3.0",
    meta: "Workflow engine",
    title: "Deterministic workflows for common tasks",
    summary:
      "Version 2.3.0 adds the first workflow engine with deterministic phases for content editing, SEO fixes, and WooCommerce operations.",
    tags: ["Workflows", "SEO", "WooCommerce"],
    items: [
      "Introduced Workflow Engine v1 with deterministic multi-phase execution.",
      "Added a content edit workflow with discover, plan, preview, apply, and verify phases.",
      "Added an SEO fix workflow for optimized titles and descriptions.",
      "Added a WooCommerce operations workflow for product, order, and coupon changes.",
      "Cut credit use by about 40 to 60 percent versus the general agent on equivalent tasks.",
      "Added a workflow runner with a state machine, scoped AI calls, and serializable state.",
      "Kept preview and confirm mandatory before mutations and required post-apply verification."
    ]
  },
  {
    id: "v220",
    version: "v2.2.0",
    meta: "Tool catalog",
    title: "Capability flags and filtered loading",
    summary:
      "This release lays the groundwork for smarter tool loading with a centralized catalog, capability metadata, caching, and group-based delivery.",
    tags: ["Tool catalog", "Performance", "Caching"],
    items: [
      "Added a tool catalog with centralized read, preview, and confirm capability flags plus group metadata.",
      "Reduced native schema overhead by about 75 percent through filtered tool loading.",
      "Added keyword-based tool group matching so only relevant tools are sent to the model.",
      "Added the load_tool_group meta-tool for cases where keyword matching misses.",
      "Added Anthropic tool-definition caching via cache_control.",
      "Added a supports_tool_search() stub for future native tool search."
    ]
  },
  {
    id: "v210",
    version: "v2.1.0",
    meta: "Reservation pipeline",
    title: "Credit reservation, throttling, and ledger tracking",
    summary:
      "Version 2.1.0 moves billing away from fire-and-forget deductions and adds throttling plus ledger telemetry across sync and async requests.",
    tags: ["Reservation", "Ledger", "Throttling"],
    items: [
      "Replaced fire-and-forget deductions with an estimate, reserve, settle, and reconcile credit pipeline.",
      "Added per-user and per-IP throttling with tier-based burst, hourly, and concurrent limits.",
      "Added a cost ledger table for estimated versus actual credits, provider, model, and cache metrics.",
      "Kept BYOK subject to rate and concurrency limits while bypassing only the credit budget.",
      "Added reservation IDs to background tasks so they settle on completion."
    ]
  },
  {
    id: "v201",
    version: "v2.0.1",
    meta: "Compliance and encryption",
    title: "Privacy tooling and bundled-key protection",
    summary:
      "The first patch after the 2.0 rewrite hardens bundled credentials, adds WordPress privacy tooling, and fixes uninstall and disclosure accuracy.",
    tags: ["Privacy", "Encryption", "Uninstall"],
    items: [
      "Encrypted the bundled API key at rest to match BYOK handling.",
      "Added suggested WordPress privacy-policy text plus exporter and eraser support.",
      "Updated uninstall to remove plugin tables, options, transients, user meta, and scheduled tasks.",
      "Corrected external-service disclosure in settings, readme, and privacy copy.",
      "Aligned readme stable tag and plan descriptions with shipped behavior."
    ]
  },
  {
    id: "v200",
    version: "v2.0.0",
    meta: "Major rewrite",
    title: "Credits, BYOK, diagnostics, and previews",
    summary:
      "Version 2.0.0 is the product rewrite that introduces the core commercial, operational, and preview systems the plugin still builds on.",
    tags: ["Rewrite", "BYOK", "Diagnostics", "Previews"],
    items: [
      "Introduced credit-based billing and multi-tier plans.",
      "Added BYOK support.",
      "Added the content index with full-text search.",
      "Added a site profile for tone and style matching.",
      "Added an async task queue for background processing.",
      "Added diagnostics tools for page speed, email delivery, crawlability, and hook introspection.",
      "Added agentic multi-step AI workflows.",
      "Added the preview system for reviewing changes before applying them."
    ]
  },
  {
    id: "v100",
    version: "v1.0.0",
    meta: "Initial release",
    title: "PressArk ships for the first time",
    summary:
      "The first release establishes the plugin's baseline before the larger billing, workflow, and automation layers arrive later.",
    tags: ["Initial release"],
    items: [
      "Initial release."
    ]
  }
];

const THEMES = [
  {
    title: "Billing and credits",
    body:
      "The release log repeatedly returns to billing discipline: reservation accounting in 2.1.0, filtered cost control in the 2.x line, the major credit-platform reset in 5.0.0, and model-value tuning in 5.1.0."
  },
  {
    title: "Operations and safety",
    body:
      "Automations, privacy exports, uninstall scope, retention, and multisite handling became a major thread from 4.0.0 through the 4.1.x safety patches."
  },
  {
    title: "Architecture and tooling",
    body:
      "The 2.x and 3.x releases steadily reshape the internals with catalogs, workflows, discovery, queueing, domain handlers, and the unified pipeline."
  }
];

const chunkReleaseItems = (items) => {
  const titles = ["Highlights", "Details", "Notes"];
  const columnCount = Math.min(3, Math.max(1, Math.ceil(items.length / 3)));
  const chunkSize = Math.ceil(items.length / columnCount);

  return Array.from({ length: columnCount }, (_, index) => ({
    title: titles[index] || `Part ${index + 1}`,
    items: items.slice(index * chunkSize, (index + 1) * chunkSize)
  })).filter((column) => column.items.length > 0);
};

const useViewportWidth = () => {
  const [width, setWidth] = useStateC(window.innerWidth);

  useEffectC(() => {
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

const Hero = ({ isTablet, isMobile }) => {
  const latest = RELEASES[0];
  const stats = [
    { value: String(RELEASES.length), label: "documented releases", note: "from v1.0.0 through the current stable tag" },
    { value: latest.version, label: "current stable tag", note: "model lineup refresh, compression fixes, and Team+ premium gating" },
    { value: "100M", label: "top enterprise plan", note: "current monthly credit ceiling after the 5.0.0 billing restructure" }
  ];

  return (
    <section style={{ padding: isMobile ? "18px 16px 40px" : "22px 24px 52px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isTablet ? "1fr" : "minmax(0, 6.5fr) minmax(340px, 5.5fr)",
          gap: isTablet ? 18 : 28,
          alignItems: "stretch"
        }}
      >
        <div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
            <Chip variant="pill">Release history</Chip>
            <Chip variant="pill">Engineering notes</Chip>
            <Chip variant="pill">Public milestones</Chip>
          </div>
          <Kicker>Release history</Kicker>
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
            Changelog that matches the shipped plugin history.
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 18, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 26px", maxWidth: 640 }}>
            This page now follows the versions documented in the PressArk plugin package, from the initial release through the current stable tag and the major billing, automation, privacy, and architecture milestones in between.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
            <Btn variant="primary" icon="history" href={`#${latest.id}`}>Read latest release</Btn>
            <Btn variant="ghost" icon="article" href="docs.html">View docs</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 12, maxWidth: 760 }}>
            {stats.map((stat) => (
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
              <Kicker tone="light">Latest build</Kicker>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)", fontSize: 11, fontWeight: 700 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ea8ff" }} />
                {latest.version}
              </span>
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.05, margin: "0 0 10px" }}>{latest.title}</h2>
            <p style={{ fontSize: 14, color: "#c9d4e4", lineHeight: 1.65, margin: "0 0 16px" }}>{latest.summary}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              {latest.tags.map((tag) => (
                <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", fontSize: 12 }}>
                  {tag}
                </span>
              ))}
            </div>
            <BulletList items={latest.items.slice(0, 3)} light />
          </div>
        </div>
      </div>
    </section>
  );
};

const ThemeBand = ({ isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 28px" : "0 24px 34px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 18 }}>
        <Kicker>Release themes</Kicker>
        <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-.03em", margin: "12px 0 0", color: "var(--color-ink)", lineHeight: 1.1 }}>
          Three threads that define the release arc so far.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        {THEMES.map((theme) => (
          <SurfaceCard key={theme.title} style={{ padding: 22 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 10px", color: "var(--color-ink)" }}>{theme.title}</h3>
            <p style={{ fontSize: 14, color: "var(--color-ink-muted)", lineHeight: 1.6, margin: 0 }}>{theme.body}</p>
          </SurfaceCard>
        ))}
      </div>
    </div>
  </section>
);

const ArchiveRail = ({ isTablet }) => (
  <div style={isTablet ? {} : { position: "sticky", top: 96 }}>
    <SurfaceCard style={{ padding: 18 }}>
      <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 12 }}>
        Release archive
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {RELEASES.map((release, index) => (
          <a
            key={release.id}
            href={`#${release.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 12,
              background: index === 0 ? "var(--color-surface-container-low)" : "transparent",
              border: index === 0 ? "1px solid var(--border-soft)" : "1px solid transparent",
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: index === 0 ? "var(--color-primary)" : "rgba(112,131,166,.28)", flexShrink: 0 }} />
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-ink)" }}>{release.version}</span>
              <span style={{ fontSize: 12, color: "var(--color-outline)" }}>{release.meta}</span>
            </span>
          </a>
        ))}
      </div>
    </SurfaceCard>
  </div>
);

const ReleaseCard = ({ release, isMobile }) => {
  const columns = chunkReleaseItems(release.items);

  return (
    <div id={release.id} style={{ position: "relative", scrollMarginTop: 108 }}>
      <div style={{ position: "absolute", left: isMobile ? 14 : -34, top: 30, width: 12, height: 12, borderRadius: "50%", background: release.badge ? "var(--color-primary)" : "var(--color-surface-container-high)", border: "3px solid #ffffff", boxShadow: "0 0 0 1px rgba(112,131,166,.18)" }} />
      <SurfaceCard style={{ padding: isMobile ? 20 : 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: release.badge ? "var(--color-primary)" : "var(--color-ink)" }}>{release.version}</span>
          <span style={{ fontSize: 12, color: "var(--color-outline)" }}>{release.meta}</span>
          {release.badge && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", background: "rgba(0,88,190,.08)", border: "1px solid rgba(0,88,190,.12)", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--color-primary)" }}>
              {release.badge}
            </span>
          )}
        </div>
        <h2 style={{ fontSize: isMobile ? 28 : 34, fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1.06, margin: "0 0 10px", color: "var(--color-ink)", textWrap: "balance" }}>
          {release.title}
        </h2>
        <p style={{ fontSize: 15, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 16px" }}>{release.summary}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
          {release.tags.map((tag) => (
            <Chip key={tag} variant="pill">{tag}</Chip>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${columns.length}, minmax(0, 1fr))`, gap: 14 }}>
          {columns.map((column) => (
            <SoftCard key={column.title} style={{ padding: 16 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--color-outline)", textTransform: "uppercase", letterSpacing: ".14em", marginBottom: 10 }}>{column.title}</div>
              <BulletList items={column.items} />
            </SoftCard>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
};

const TimelineSection = ({ isTablet, isMobile }) => (
  <section style={{ padding: isMobile ? "0 16px 24px" : "0 24px 30px" }}>
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isTablet ? "1fr" : "260px minmax(0, 1fr)",
        gap: isTablet ? 18 : 34,
        alignItems: "start"
      }}
    >
      <ArchiveRail isTablet={isTablet} />
      <div style={{ position: "relative", paddingLeft: isMobile ? 26 : 8 }}>
        <div style={{ position: "absolute", left: isMobile ? 19 : -1, top: 0, bottom: 0, width: 1, background: "rgba(112,131,166,.18)" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {RELEASES.map((release) => (
            <ReleaseCard key={release.id} release={release} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

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
            Changelog is the history layer. Docs and pricing explain the current product.
          </h2>
          <p style={{ fontSize: 15, color: "var(--color-ink-muted)", lineHeight: 1.65, margin: "0 0 24px", maxWidth: 560 }}>
            Use this page when you want the actual shipped release history. Use docs when you need operating guidance. Use pricing when you need the current plan and credit story.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Btn variant="primary" icon="article" href="docs.html">Open docs</Btn>
            <Btn variant="ghost" icon="credit_score" href="pricing.html">See pricing</Btn>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Current stable", value: "v5.1.0" },
            { label: "Credit platform reset", value: "v5.0.0" },
            { label: "Automation domain", value: "v4.0.0" }
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

const ChangelogApp = () => {
  const width = useViewportWidth();
  const isTablet = width < 1040;
  const isMobile = width < 720;

  return (
    <>
      <Nav current="Changelog" />
      <Hero isTablet={isTablet} isMobile={isMobile} />
      <ThemeBand isMobile={isMobile} />
      <TimelineSection isTablet={isTablet} isMobile={isMobile} />
      <CtaStrip isTablet={isTablet} isMobile={isMobile} />
      <Footer />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<ChangelogApp />);
