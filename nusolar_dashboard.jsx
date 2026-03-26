import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Cell } from "recharts";

const colors = {
  bg: "#0a0f1a",
  card: "#111827",
  cardBorder: "#1e293b",
  accent: "#3b82f6",
  accentLight: "#60a5fa",
  green: "#22c55e",
  yellow: "#eab308",
  red: "#ef4444",
  orange: "#f97316",
  purple: "#a855f7",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
};

const costData = [
  { name: "AHD Backup Kit", cost: 50, quality: 4, latency: 9, fps: 4, feasibility: 10, total: 95, color: "#f97316" },
  { name: "ELP OV4689", cost: 120, quality: 7, latency: 7, fps: 9, feasibility: 9, total: 120, color: "#3b82f6" },
  { name: "Arducam B0497", cost: 130, quality: 9, latency: 7, fps: 8, feasibility: 8, total: 130, color: "#22c55e" },
  { name: "GoPro Hero 13", cost: 480, quality: 9, latency: 7, fps: 9, feasibility: 6, total: 480, color: "#a855f7" },
  { name: "Insta360 X5", cost: 550, quality: 10, latency: 3, fps: 4, feasibility: 3, total: 550, color: "#ef4444" },
];

const radarData = [
  { metric: "Image Quality", "ELP OV4689": 7, "Arducam B0497": 9, "AHD Kit": 4, "GoPro Hero 13": 9, "Insta360 X5": 10 },
  { metric: "Frame Rate", "ELP OV4689": 9, "Arducam B0497": 8, "AHD Kit": 4, "GoPro Hero 13": 9, "Insta360 X5": 4 },
  { metric: "Low Latency", "ELP OV4689": 7, "Arducam B0497": 7, "AHD Kit": 9, "GoPro Hero 13": 7, "Insta360 X5": 3 },
  { metric: "Low Cost", "ELP OV4689": 8, "Arducam B0497": 7, "AHD Kit": 10, "GoPro Hero 13": 3, "Insta360 X5": 2 },
  { metric: "FOV", "ELP OV4689": 8, "Arducam B0497": 8, "AHD Kit": 9, "GoPro Hero 13": 9, "Insta360 X5": 10 },
  { metric: "3-Week Feasibility", "ELP OV4689": 9, "Arducam B0497": 8, "AHD Kit": 10, "GoPro Hero 13": 6, "Insta360 X5": 3 },
  { metric: "Pi Compatible", "ELP OV4689": 9, "Arducam B0497": 9, "AHD Kit": 2, "GoPro Hero 13": 5, "Insta360 X5": 4 },
  { metric: "EMI Resilience", "ELP OV4689": 7, "Arducam B0497": 7, "AHD Kit": 5, "GoPro Hero 13": 8, "Insta360 X5": 7 },
];

const sponsorshipData = [
  { company: "Insta360", product: "X5 + consultation", value: "$550", status: "Draft Ready", method: "Web form + Think Bold Fund" },
  { company: "ELP (Lizzy Liu)", product: "ELP-USBFHD08S-LC1100", value: "$70", status: "Draft Ready", method: "sales@elpcctv.com" },
  { company: "ELP (Sales)", product: "ELP-USBFHD08S-LC1100", value: "$70", status: "Draft Ready", method: "ailipu_sales5@elpcctv.com" },
  { company: "Arducam", product: "B0497 (IMX678 USB3)", value: "$70-80", status: "Draft Ready", method: "support@arducam.com" },
  { company: "Waveshare", product: "7\" HDMI LCD (H) w/ case", value: "$50-55", status: "Draft Ready", method: "sales@waveshare.com" },
  { company: "GoPro", product: "Hero 13 + Media Mod", value: "$480", status: "Draft Ready", method: "gopro.com/connect" },
];

const timeline = [
  { week: "Week 1", title: "Research & Outreach", status: "IN PROGRESS", items: [
    { task: "Set up Notion documentation", done: true },
    { task: "Research camera options (4 approaches identified)", done: true },
    { task: "Draft all sponsorship emails (6 emails, 5 companies)", done: true },
    { task: "Confirm Pi model (Pi 4B)", done: true },
    { task: "Confirm display is my scope", done: true },
    { task: "Send sponsorship emails", done: false },
    { task: "Message Ethan for past emails", done: false },
    { task: "Find out old camera setup details", done: false },
    { task: "Look at back of car mounting", done: false },
  ]},
  { week: "Week 2", title: "Options → Shannon", status: "UPCOMING", items: [
    { task: "Present options analysis to Shannon", done: false },
    { task: "Get Shannon's decision on final option", done: false },
    { task: "Order selected parts", done: false },
    { task: "Begin bench testing if parts arrive", done: false },
  ]},
  { week: "Week 3", title: "Build & Test", status: "UPCOMING", items: [
    { task: "Vehicle integration + mounting", done: false },
    { task: "15m arrow test (scrutineering sim)", done: false },
    { task: "Vibration + EMI testing", done: false },
    { task: "Final documentation + handoff notes", done: false },
  ]},
];

const StatusBadge = ({ status }) => {
  const s = status === "IN PROGRESS" ? { bg: "#1e3a5f", color: "#60a5fa" }
    : status === "UPCOMING" ? { bg: "#1a1a2e", color: "#64748b" }
    : { bg: "#14532d", color: "#22c55e" };
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, padding: "3px 8px", borderRadius: 4, backgroundColor: s.bg, color: s.color }}>{status}</span>;
};

const Section = ({ title, subtitle, children }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ marginBottom: 12 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: colors.text, margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 12, color: colors.textDim, margin: "4px 0 0 0" }}>{subtitle}</p>}
    </div>
    {children}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ backgroundColor: colors.card, border: `1px solid ${colors.cardBorder}`, borderRadius: 8, padding: 16, ...style }}>
    {children}
  </div>
);

const ComparisonTable = () => {
  const options = [
    { name: "AHD Backup Kit", arch: "Camera → AHD wire → Monitor", camera: "Generic AHD 1080p", display: "Included 7\" monitor", piNeeded: "No", cost: "$40-80", fps: "25-30", fov: "120-170°", latency: "<50ms", quality: "OK", mirrorFlip: "Built-in", verdict: "BASELINE" },
    { name: "ELP OV4689 + Pi", arch: "USB cam → Pi 4B → HDMI display", camera: "ELP-USBFHD08S-LC1100", display: "Separate (Waveshare)", piNeeded: "Yes", cost: "$95-120", fps: "60 @ 1080p", fov: "100° (D) / ~85° (H)", latency: "55-65ms", quality: "Good", mirrorFlip: "Software (Pi)", verdict: "STRONG" },
    { name: "Arducam B0497 + Pi", arch: "USB3 cam → Pi 4B → HDMI display", camera: "B0497 IMX678 STARVIS 2", display: "Separate (Waveshare)", piNeeded: "Yes", cost: "$120-150", fps: "60+ @ 1080p (verify)", fov: "100° (D) / ~85° (H)", latency: "50-65ms", quality: "Excellent", mirrorFlip: "Software (Pi)", verdict: "STRONG" },
    { name: "GoPro Hero 13 + Monitor", arch: "GoPro HDMI → display (or Pi)", camera: "Hero 13 Black + Media Mod", display: "Separate", piNeeded: "Optional", cost: "$480+", fps: "60 @ 1080p", fov: "~120° Wide", latency: "33-50ms (stab. OFF)", quality: "Excellent", mirrorFlip: "Setting/Software", verdict: "GOOD IF SPONSORED" },
    { name: "Insta360 X5", arch: "360 cam → Pi (crop/unwarp) → display", camera: "Insta360 X5", display: "Separate", piNeeded: "Yes", cost: "$550+", fps: "30 (webcam mode)", fov: "360°", latency: "100-200+ms", quality: "Overkill", mirrorFlip: "Complex software", verdict: "CONTENT ONLY" },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr>
            {["Option", "Architecture", "FPS", "FOV", "Latency", "Quality", "Cost", "Verdict"].map(h => (
              <th key={h} style={{ padding: "8px 6px", textAlign: "left", color: colors.textDim, fontWeight: 600, borderBottom: `1px solid ${colors.cardBorder}`, fontSize: 10, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {options.map((o, i) => {
            const vColor = o.verdict === "STRONG" ? colors.green : o.verdict === "BASELINE" ? colors.yellow : o.verdict.includes("SPONSORED") ? colors.purple : o.verdict === "CONTENT ONLY" ? colors.red : colors.textMuted;
            return (
              <tr key={i} style={{ borderBottom: `1px solid ${colors.cardBorder}22` }}>
                <td style={{ padding: "8px 6px", color: colors.text, fontWeight: 600, fontSize: 11 }}>{o.name}</td>
                <td style={{ padding: "8px 6px", color: colors.textMuted, fontSize: 10 }}>{o.arch}</td>
                <td style={{ padding: "8px 6px", color: colors.text }}>{o.fps}</td>
                <td style={{ padding: "8px 6px", color: colors.text }}>{o.fov}</td>
                <td style={{ padding: "8px 6px", color: colors.text }}>{o.latency}</td>
                <td style={{ padding: "8px 6px", color: colors.text }}>{o.quality}</td>
                <td style={{ padding: "8px 6px", color: colors.text }}>{o.cost}</td>
                <td style={{ padding: "8px 6px" }}><span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.8, padding: "2px 6px", borderRadius: 3, backgroundColor: `${vColor}22`, color: vColor }}>{o.verdict}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "options", label: "Camera Options" },
    { id: "cost", label: "Cost/Benefit" },
    { id: "timeline", label: "Timeline" },
    { id: "sponsorship", label: "Sponsorship" },
    { id: "unknowns", label: "Open Items" },
  ];

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: "100vh", color: colors.text, fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", padding: "24px 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ marginBottom: 24, borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: colors.green, boxShadow: `0 0 8px ${colors.green}66` }} />
          <span style={{ fontSize: 10, color: colors.textDim, letterSpacing: 2, textTransform: "uppercase" }}>Week 1 — In Progress</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 4px 0", color: colors.text }}>NUSolar Rear Vision System</h1>
        <p style={{ fontSize: 12, color: colors.textMuted, margin: 0 }}>Real-time rear-vision camera + display for ASC 2026 · Section 9.7.E compliance · Led by Spencer Kogoma</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: "6px 14px", fontSize: 11, fontWeight: activeTab === t.id ? 600 : 400, fontFamily: "inherit",
            backgroundColor: activeTab === t.id ? colors.accent + "22" : "transparent",
            color: activeTab === t.id ? colors.accentLight : colors.textDim,
            border: `1px solid ${activeTab === t.id ? colors.accent + "44" : "transparent"}`,
            borderRadius: 6, cursor: "pointer", transition: "all 0.15s"
          }}>{t.label}</button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <Section title="Project Summary">
            <Card>
              <p style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.7, margin: 0 }}>
                Design and build a real-time rear-vision camera and display system for the NUSolar car that passes ASC 2026 Section 9.7.E scrutineering. Must provide always-on, mirror-image, low-latency rear view. Driver tested on identifying arrow direction at 15m.
              </p>
            </Card>
          </Section>

          <Section title="Regulation Requirements (9.7.E)">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
              {[
                { label: "Rear Visibility", value: "15m behind, 30° off-center" },
                { label: "Image Type", value: "Reflex (mirror-like)" },
                { label: "Operation", value: "Always-on, no driver input" },
                { label: "Arrow Test", value: "200mm stroke, 1m² board, 15m" },
                { label: "Mounting", value: "Fixed, vibration-proof" },
                { label: "Screen Position", value: "Visible from driver seat" },
              ].map((r, i) => (
                <Card key={i} style={{ padding: 12 }}>
                  <div style={{ fontSize: 9, color: colors.textDim, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: colors.text, fontWeight: 500 }}>{r.value}</div>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="Derived Technical Requirements">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
              {[
                { label: "Min. FOV", value: "≥60° horizontal", met: true },
                { label: "Frame Rate", value: "60 fps target", met: true },
                { label: "Latency", value: "<100ms glass-to-glass", met: true },
                { label: "Resolution", value: "≥720p (1080p preferred)", met: true },
                { label: "Power", value: "12V bus or 5V USB", met: true },
                { label: "Cable Run", value: "~3m to rear", met: true },
                { label: "Pi Model", value: "Raspberry Pi 4B", met: true },
                { label: "Environment", value: "High EMI near motors", met: null },
                { label: "Display", value: "My scope (7\" HDMI)", met: true },
              ].map((r, i) => (
                <Card key={i} style={{ padding: 10, borderLeft: `3px solid ${r.met === true ? colors.green : r.met === false ? colors.red : colors.yellow}` }}>
                  <div style={{ fontSize: 9, color: colors.textDim, textTransform: "uppercase", letterSpacing: 0.8 }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: colors.text, fontWeight: 500, marginTop: 2 }}>{r.value}</div>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="System Architecture — Open Decision">
            <Card>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: "0 0 8px 0" }}>Pi is available but not required. Four viable approaches identified:</p>
              {[
                { name: "Pi-Mediated (USB)", desc: "USB camera → Pi 4B → HDMI display. Most flexible, software mirror flip.", color: colors.accent },
                { name: "Pi-Mediated (CSI)", desc: "CSI camera → Pi 4B → HDMI display. Lowest Pi latency, but 3m cable too long for ribbon.", color: colors.yellow },
                { name: "Direct Analog (AHD)", desc: "AHD camera → wire → dedicated monitor. Simplest, lowest latency, no Pi.", color: colors.orange },
                { name: "Action Camera HDMI", desc: "GoPro/Insta360 → HDMI direct or via Pi → display. Best quality, highest cost.", color: colors.purple },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${colors.cardBorder}` : "none" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: a.color, marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: colors.textDim }}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </Card>
          </Section>

          <Section title="FPGA Considered & Ruled Out">
            <Card style={{ borderLeft: `3px solid ${colors.yellow}` }}>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: 0, lineHeight: 1.6 }}>
                Considered using an FPGA for lowest-possible latency ({'<'}10ms). Shannon said "design complexity is significantly higher — I'll let you figure out if the benefits for latency + quality are better." 
                After analysis: Mach XO3L lacks resources for video. A capable FPGA board would cost $100-250+ and require weeks of HDL development beyond current skill level. Pi path achieves 50-80ms latency which is sufficient for rear-view at highway speeds. 
                <strong style={{ color: colors.text }}> Decision: Pi for now, FPGA as documented future upgrade path.</strong>
              </p>
            </Card>
          </Section>
        </div>
      )}

      {/* Camera Options Tab */}
      {activeTab === "options" && (
        <div>
          <Section title="Full Options Comparison" subtitle="All options verified against ASC 2026 9.7.E requirements and car constraints">
            <Card>
              <ComparisonTable />
            </Card>
          </Section>

          <Section title="Performance Radar" subtitle="Higher is better for each metric (1-10 scale)">
            <Card>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke={colors.cardBorder} />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: colors.textDim, fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: colors.textDim, fontSize: 9 }} />
                  <Radar name="ELP OV4689" dataKey="ELP OV4689" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Arducam B0497" dataKey="Arducam B0497" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="AHD Kit" dataKey="AHD Kit" stroke="#f97316" fill="#f97316" fillOpacity={0.1} strokeWidth={1.5} />
                  <Radar name="GoPro Hero 13" dataKey="GoPro Hero 13" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} strokeWidth={1.5} />
                  <Legend wrapperStyle={{ fontSize: 10, color: colors.textDim }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </Section>

          <Section title="Key Findings">
            <div style={{ display: "grid", gap: 8 }}>
              <Card style={{ borderLeft: `3px solid ${colors.green}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: colors.green, marginBottom: 4 }}>ELP & Arducam are the strongest options</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>Both meet all regs, work with Pi 4B, achievable in 3 weeks. Arducam has better sensor (STARVIS 2) but slightly more expensive. ELP is proven and cheaper.</div>
              </Card>
              <Card style={{ borderLeft: `3px solid ${colors.yellow}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: colors.yellow, marginBottom: 4 }}>AHD kit is the safe fallback</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>Cheapest, lowest latency, purpose-built for vehicles. But limited quality improvement over what the team has used before.</div>
              </Card>
              <Card style={{ borderLeft: `3px solid ${colors.purple}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: colors.purple, marginBottom: 4 }}>GoPro is viable if sponsored</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>Hero 13 HDMI output checks out (1080p60, 2-3 frame delay with stabilization off). But needs Media Mod ($80 extra) and too expensive without sponsorship.</div>
              </Card>
              <Card style={{ borderLeft: `3px solid ${colors.red}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: colors.red, marginBottom: 4 }}>Insta360 X5 is not viable for rear-view</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>Webcam mode = 30fps with stitching latency. HDMI requires manual menu navigation (violates always-on reg). Pursue for content creation only.</div>
              </Card>
            </div>
          </Section>
        </div>
      )}

      {/* Cost/Benefit Tab */}
      {activeTab === "cost" && (
        <div>
          <Section title="Cost Comparison" subtitle="Total system cost including display (if separate)">
            <Card>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={costData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fill: colors.textDim, fontSize: 10 }} tickFormatter={v => `$${v}`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: colors.textMuted, fontSize: 11 }} width={110} />
                  <Tooltip formatter={(v) => [`$${v}`, "Total Cost"]} contentStyle={{ backgroundColor: colors.card, border: `1px solid ${colors.cardBorder}`, borderRadius: 6, fontSize: 11 }} />
                  <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                    {costData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Section>

          <Section title="Value Score" subtitle="Performance per dollar (higher = better value)">
            <Card>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { name: "AHD Backup Kit", score: 7.2, cost: "$40-80", note: "Cheapest but least improvement over old system", color: colors.orange },
                  { name: "ELP OV4689 + Pi", score: 8.8, cost: "$95-120", note: "Best value — high performance at low cost", color: colors.accent },
                  { name: "Arducam B0497 + Pi", score: 8.4, cost: "$120-150", note: "Best sensor quality per dollar", color: colors.green },
                  { name: "GoPro Hero 13", score: 5.2, cost: "$480+", note: "Only makes sense if sponsored", color: colors.purple },
                  { name: "Insta360 X5", score: 2.1, cost: "$550+", note: "Not viable for rear-view use case", color: colors.red },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 100, fontSize: 11, fontWeight: 600, color: colors.text, flexShrink: 0 }}>{item.name}</div>
                    <div style={{ flex: 1, height: 20, backgroundColor: colors.cardBorder, borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ width: `${item.score * 10}%`, height: "100%", backgroundColor: item.color, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>{item.score}</span>
                      </div>
                    </div>
                    <div style={{ width: 60, fontSize: 10, color: colors.textDim, textAlign: "right" }}>{item.cost}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Section>

          <Section title="Bottom Line for Shannon">
            <Card style={{ border: `1px solid ${colors.accent}44`, backgroundColor: `${colors.accent}08` }}>
              <p style={{ fontSize: 13, color: colors.text, margin: 0, lineHeight: 1.7 }}>
                <strong>Primary recommendation: ELP OV4689 or Arducam B0497 + Pi 4B + Waveshare display.</strong> Both deliver 60fps, 100° FOV, regulation compliance, and total system cost under $150. ELP is the safer, cheaper bet ($95-120). Arducam has a superior sensor if the B0497 confirms 60fps at 1080p ($120-150). 
                Sponsorship responses may change the calculus — if GoPro or Insta360 come through, those become viable upgrades. But the primary plan should not depend on sponsorship.
              </p>
            </Card>
          </Section>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === "timeline" && (
        <div>
          <Section title="3-Week Project Timeline">
            <div style={{ display: "grid", gap: 12 }}>
              {timeline.map((w, wi) => (
                <Card key={wi}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{w.week}: </span>
                      <span style={{ fontSize: 14, fontWeight: 400, color: colors.textMuted }}>{w.title}</span>
                    </div>
                    <StatusBadge status={w.status} />
                  </div>
                  <div style={{ display: "grid", gap: 4 }}>
                    {w.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                        <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${item.done ? colors.green : colors.textDim}`, backgroundColor: item.done ? colors.green + "22" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {item.done && <span style={{ fontSize: 9, color: colors.green }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 11, color: item.done ? colors.textMuted : colors.text, textDecoration: item.done ? "line-through" : "none" }}>{item.task}</span>
                      </div>
                    ))}
                  </div>
                  {wi === 0 && (
                    <div style={{ marginTop: 8, padding: "6px 10px", backgroundColor: colors.accent + "11", borderRadius: 4, fontSize: 10, color: colors.accentLight }}>
                      Progress: {w.items.filter(i => i.done).length}/{w.items.length} tasks complete ({Math.round(w.items.filter(i => i.done).length / w.items.length * 100)}%)
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </Section>

          <Section title="Key Milestones">
            <Card>
              {[
                { date: "End of Week 1", milestone: "Sponsorship emails sent. Options documented.", status: "→ TOMORROW" },
                { date: "Start of Week 2", milestone: "Options analysis presented to Shannon with recommendation.", status: "UPCOMING" },
                { date: "Mid Week 2", milestone: "Parts ordered. Bench testing begins.", status: "UPCOMING" },
                { date: "End of Week 3", milestone: "System installed, tested, documented on car.", status: "UPCOMING" },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${colors.cardBorder}` : "none" }}>
                  <div style={{ width: 120, fontSize: 10, color: colors.textDim, fontWeight: 600, flexShrink: 0 }}>{m.date}</div>
                  <div style={{ fontSize: 11, color: colors.text, flex: 1 }}>{m.milestone}</div>
                  <span style={{ fontSize: 9, color: m.status.includes("TOMORROW") ? colors.yellow : colors.textDim, fontWeight: 600 }}>{m.status}</span>
                </div>
              ))}
            </Card>
          </Section>
        </div>
      )}

      {/* Sponsorship Tab */}
      {activeTab === "sponsorship" && (
        <div>
          <Section title="Sponsorship Outreach Tracker" subtitle="6 emails to 5 companies — ready to send tomorrow 8-10 AM Central">
            <div style={{ display: "grid", gap: 8 }}>
              {sponsorshipData.map((s, i) => (
                <Card key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{s.company}</div>
                      <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{s.product}</div>
                      <div style={{ fontSize: 10, color: colors.textDim, marginTop: 4, fontFamily: "monospace" }}>{s.method}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: colors.accentLight }}>{s.value}</div>
                      <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 3, backgroundColor: colors.yellow + "22", color: colors.yellow }}>{s.status}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Section title="Email Checklist">
            <Card>
              {[
                "Send from personal email",
                "CC solar@u.northwestern.edu on ALL emails",
                "All emails include 'sponsorship or discount' fallback language",
                "All emails specify exact product models verified against regs",
                "Insta360: also apply to Think Bold Fund (+ Dillo Day content angle)",
                "GoPro: also submit via gopro.com/sponsorship",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < 5 ? `1px solid ${colors.cardBorder}22` : "none" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors.accent, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: colors.textMuted }}>{item}</span>
                </div>
              ))}
            </Card>
          </Section>
        </div>
      )}

      {/* Open Items Tab */}
      {activeTab === "unknowns" && (
        <div>
          <Section title="Still Need To Find Out">
            <div style={{ display: "grid", gap: 8 }}>
              {[
                { item: "What the old backup camera system looked like", who: "Ask team", priority: "MED", why: "Defines what 'better' means for Shannon" },
                { item: "Past sponsorship emails from Ethan", who: "Ask Ethan", priority: "MED", why: "Tone reference (but Shannon said send as-is)" },
                { item: "Physical mounting situation at back of car", who: "Go look", priority: "HIGH", why: "Determines enclosure design, cable routing, vibration concerns" },
                { item: "Arducam B0497 actual 1080p frame rate", who: "Ask Arducam (in email)", priority: "HIGH", why: "Need to confirm 60fps @ 1080p for final recommendation" },
                { item: "GoPro Hero 13 always-on HDMI behavior", who: "Test or ask GoPro", priority: "LOW", why: "Only matters if sponsored" },
              ].map((item, i) => {
                const pColor = item.priority === "HIGH" ? colors.red : item.priority === "MED" ? colors.yellow : colors.textDim;
                return (
                  <Card key={i} style={{ borderLeft: `3px solid ${pColor}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>{item.item}</div>
                        <div style={{ fontSize: 10, color: colors.textDim, marginTop: 2 }}>{item.who} · {item.why}</div>
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, backgroundColor: `${pColor}22`, color: pColor }}>{item.priority}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Section>

          <Section title="Decisions Still Needed">
            <div style={{ display: "grid", gap: 8 }}>
              {[
                "Final camera selection (pending Shannon review of options)",
                "Whether to use Pi in the pipeline or go direct camera-to-display",
                "Display: Waveshare 7\" or something the team already has?",
                "Mount design for rear of car (need to see the car first)",
                "Whether FPGA upgrade path is worth documenting in detail",
              ].map((d, i) => (
                <Card key={i} style={{ padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: colors.yellow }}>?</span>
                    <span style={{ fontSize: 11, color: colors.textMuted }}>{d}</span>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 32, paddingTop: 12, borderTop: `1px solid ${colors.cardBorder}`, textAlign: "center" }}>
        <p style={{ fontSize: 9, color: colors.textDim, margin: 0 }}>NUSolar Rear Vision System · Project Lead: Spencer Kogoma · Last Updated: March 26, 2026 · Week 1 Checkpoint</p>
      </div>
    </div>
  );
}
