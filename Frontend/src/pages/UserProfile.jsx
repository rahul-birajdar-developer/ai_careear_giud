import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   ICONS  (inline SVG components)
───────────────────────────────────────── */
const Icon = ({ children, w = 16, h = 16, stroke = "currentColor", sw = 2, fill = "none", ...rest }) => (
    <svg viewBox="0 0 24 24" width={w} height={h} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} {...rest}>
        {children}
    </svg>
);

const Icons = {
    Home: () => <Icon><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon>,
    Monitor: () => <Icon><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></Icon>,
    Grid: () => <Icon w={16} h={16}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></Icon>,
    Search: () => <Icon><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></Icon>,
    User: () => <Icon><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>,
    FileText: () => <Icon><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></Icon>,
    Activity: () => <Icon><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></Icon>,
    Map: () => <Icon><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></Icon>,
    Mic: () => <Icon><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></Icon>,
    BarChart: () => <Icon><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></Icon>,
    Bookmark: () => <Icon><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></Icon>,
    Settings: () => <Icon><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></Icon>,
    HelpCircle: () => <Icon><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></Icon>,
    Mail: () => <Icon><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></Icon>,
    MapPin: () => <Icon><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></Icon>,
    Calendar: () => <Icon><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon>,
    Briefcase: () => <Icon><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /></Icon>,
    Star: () => <Icon><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Icon>,
    TrendingUp: () => <Icon><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></Icon>,
    ChevronRight: () => <Icon w={14} h={14} sw={2.5}><polyline points="9 18 15 12 9 6" /></Icon>,
    Lock: () => <Icon><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></Icon>,
    Bell: () => <Icon><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></Icon>,
    Download: () => <Icon><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></Icon>,
    LogOut: () => <Icon><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></Icon>,
    Clock: () => <Icon><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Icon>,
    Edit: () => <Icon w={12} h={12} sw={2.5}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></Icon>,
    Award: () => <Icon><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></Icon>,
    Sun: () => <Icon><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></Icon>,
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const USER = {
    name: "Rahul Birajadar",
    role: "Aspiring Software Engineer",
    email: "rahul.birajadar@gmail.com",
    phone: "+91 98765 43210",
    location: "Solapur, Maharashtra, India",
    goal: "Software Engineer",
    bio: "Passionate about building products and solving real-world problems using technology.",
    member: "July 2026",
    plan: "Free Plan",
    lastLogin: "Today, 10:32 AM",
    avatar: `https://ui-avatars.com/api/?name=Rahul+Birajadar&background=1a4a7a&color=00d4ff&size=88&bold=true&font-size=0.42`,
};

const STATS = [
    { label: "Resume Score", value: "85%", sub: "↑ Good Progress", subColor: "#34d399", icon: "FileText", color: "blue" },
    { label: "AI Sessions", value: "12", sub: "This Month", subColor: "#64748b", icon: "Activity", color: "purple" },
    { label: "Roadmaps", value: "3", sub: "Generated", subColor: "#64748b", icon: "Map", color: "green" },
    { label: "Interview Practice", value: "5", sub: "Sessions Completed", subColor: "#64748b", icon: "Award", color: "amber" },
];

const PROGRESS = [
    { label: "Resume", pct: 80, color: "#00d4ff", bg: "linear-gradient(90deg,#00d4ff,#0095b3)" },
    { label: "Skills", pct: 70, color: "#a855f7", bg: "linear-gradient(90deg,#7c3aed,#a855f7)" },
    { label: "Interview", pct: 50, color: "#60a5fa", bg: "linear-gradient(90deg,#3b82f6,#60a5fa)" },
    { label: "Projects", pct: 65, color: "#34d399", bg: "linear-gradient(90deg,#10b981,#34d399)" },
];

const ACTIVITIES = [
    { icon: "📄", color: "blue", title: "Resume Analyzed", desc: "Your resume was analyzed and score generated", time: "2 days ago" },
    { icon: "🗺️", color: "purple", title: "Career Roadmap Generated", desc: "Full Stack Developer roadmap generated", time: "5 days ago" },
    { icon: "🎤", color: "teal", title: "Interview Practice Completed", desc: "Frontend Developer mock interview completed", time: "1 week ago" },
];

const SIDEBAR_ITEMS = [
    { icon: "User", label: "Profile" },
    { icon: "Grid", label: "Dashboard" },
    { icon: "FileText", label: "My Resumes" },
    { icon: "Map", label: "Roadmaps" },
    { icon: "Mic", label: "Interview Coach" },
    { icon: "BarChart", label: "Skill Gap" },
    { icon: "Bookmark", label: "Saved Jobs" },
    { icon: "Settings", label: "Settings" },
    { icon: "HelpCircle", label: "Help & Support" },
];


const STAT_ICON_COLORS = {
    blue: { bg: "rgba(59,130,246,.15)", border: "rgba(59,130,246,.2)", stroke: "#3b82f6" },
    purple: { bg: "rgba(124,58,237,.15)", border: "rgba(124,58,237,.2)", stroke: "#a855f7" },
    green: { bg: "rgba(16,185,129,.15)", border: "rgba(16,185,129,.2)", stroke: "#10b981" },
    amber: { bg: "rgba(245,158,11,.15)", border: "rgba(245,158,11,.2)", stroke: "#f59e0b" },
};

const ACTIVITY_COLORS = {
    blue: { bg: "rgba(59,130,246,.15)", border: "rgba(59,130,246,.15)" },
    purple: { bg: "rgba(124,58,237,.15)", border: "rgba(124,58,237,.15)" },
    teal: { bg: "rgba(20,184,166,.15)", border: "rgba(20,184,166,.15)" },
};

/* ─────────────────────────────────────────
   GLOBAL CSS  (injected once)
───────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; }
  body {
    font-family: 'Inter', sans-serif;
    background: #0b0f1a;
    color: #e2e8f0;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #0f1520; }
  ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
  * { scrollbar-width: thin; scrollbar-color: #1e3a5f #0f1520; }
 
  .prog-bar-animated { transition: width 0.9s cubic-bezier(.4,0,.2,1); }
  .sidebar-item-hover:hover { background: rgba(255,255,255,.05) !important; color: #e2e8f0 !important; }
  .nav-link-hover:hover { background: rgba(255,255,255,.05) !important; color: #e2e8f0 !important; }
  .settings-row-hover:hover { opacity: 0.72; }
  .upgrade-btn-hover:hover { opacity: 0.85; }
  .view-detail-hover:hover { background: rgba(255,255,255,.08) !important; color: #e2e8f0 !important; }
  .edit-btn-hover:hover { background: rgba(0,212,255,.16) !important; }
  .user-chip-hover:hover { background: rgba(255,255,255,.08) !important; }
  .nav-icon-hover:hover { background: rgba(255,255,255,.1) !important; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  .fade-up { animation: fadeUp 0.35s ease both; }
  .fade-up-2 { animation: fadeUp 0.35s ease 0.07s both; }
  .fade-up-3 { animation: fadeUp 0.35s ease 0.14s both; }
`;

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */

function Sidebar({ activeItem, setActiveItem }) {
    return (
        <aside style={{
            background: "#0f1520", borderRight: "1px solid rgba(255,255,255,.07)",
            display: "flex", flexDirection: "column", overflowY: "auto", overflowX: "hidden",
            width: 220, flexShrink: 0,
        }}>
            <div style={{ padding: "12px 10px", flex: 1 }}>
                {SIDEBAR_ITEMS.map(({ icon, label }) => {
                    const Ic = Icons[icon];
                    const isActive = activeItem === label;
                    return (
                        <button key={label} className="sidebar-item-hover"
                            onClick={() => setActiveItem(label)}
                            style={{
                                display: "flex", alignItems: "center", gap: 11,
                                padding: "10px 12px", borderRadius: 9, border: "none", cursor: "pointer",
                                fontSize: 13.5, fontWeight: isActive ? 600 : 500,
                                color: isActive ? "#00d4ff" : "#94a3b8",
                                background: isActive ? "rgba(0,212,255,.08)" : "transparent",
                                outline: isActive ? "1px solid rgba(0,212,255,.15)" : "1px solid transparent",
                                width: "100%", textAlign: "left",
                                marginBottom: 2, transition: "all .15s",
                            }}>
                            <span style={{ opacity: isActive ? 1 : 0.7, display: "flex", color: isActive ? "#00d4ff" : "inherit" }}>
                                <Ic />
                            </span>
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Upgrade box */}
            <div style={{
                margin: 10, borderRadius: 12,
                background: "linear-gradient(145deg,#0e1f3d,#0a1628)",
                border: "1px solid rgba(0,212,255,.2)",
                padding: "18px 16px", textAlign: "center",
            }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>💎</div>
                <div style={{ color: "#00d4ff", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Upgrade to Pro</div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.55, marginBottom: 14 }}>
                    Unlock advanced AI insights, premium tools and personalized support.
                </div>
                <button className="upgrade-btn-hover" style={{
                    display: "block", width: "100%", padding: "8px 0",
                    borderRadius: 7, fontSize: 12.5, fontWeight: 700,
                    color: "#0b1220", cursor: "pointer",
                    background: "linear-gradient(90deg,#00d4ff,#0095cc)",
                    border: "none", transition: "opacity .15s",
                }}>Upgrade Now</button>
            </div>
        </aside>
    );
}

function ProfileHeader() {
    return (
        <div className="fade-up" style={{
            background: "#131d2e", border: "1px solid rgba(255,255,255,.07)",
            borderRadius: 12, padding: "20px 24px",
            display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "start",
        }}>
            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{
                    width: 88, height: 88, borderRadius: "50%",
                    border: "3px solid #00d4ff", overflow: "hidden",
                    background: "linear-gradient(135deg,#1a4a7a,#0a2240)",
                }}>
                    <img src={USER.avatar} alt={USER.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{
                    position: "absolute", bottom: 2, right: 2,
                    width: 24, height: 24, borderRadius: "50%",
                    background: "#00d4ff", border: "2px solid #131d2e",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, cursor: "pointer",
                }}>📷</div>
            </div>

            {/* Info */}
            <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{USER.name}</span>
                    <span style={{
                        padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600,
                        background: "rgba(59,130,246,.15)", border: "1px solid rgba(59,130,246,.35)", color: "#60a5fa",
                    }}>Free Plan</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {[
                        { Icon: Icons.Briefcase, text: USER.role },
                        { Icon: Icons.Mail, text: USER.email },
                        { Icon: Icons.MapPin, text: USER.location },
                        { Icon: Icons.Calendar, text: `Member since ${USER.member}` },
                    ].map(({ Icon: Ic, text }) => (
                        <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#94a3b8" }}>
                            <span style={{ color: "#64748b", display: "flex" }}><Ic /></span>
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Insight */}
            <div style={{
                background: "linear-gradient(145deg,#0d1f3c,#091428)",
                border: "1px solid rgba(0,212,255,.22)",
                borderRadius: 10, padding: "16px 18px",
                minWidth: 280, maxWidth: 320,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "#00d4ff", marginBottom: 10 }}>
                    <Icons.Star />
                    AI Career Insight
                </div>
                <p style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.65, marginBottom: 12 }}>
                    You are progressing well! Focus on building strong backend skills and system design to become industry ready.
                </p>
                <div style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    background: "rgba(245,158,11,.12)", border: "1px solid rgba(245,158,11,.3)",
                    borderRadius: 6, padding: "4px 10px",
                    fontSize: 11.5, fontWeight: 600, color: "#f59e0b", marginBottom: 6,
                }}>🔥 Recommended Next Step</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Build 2 full-stack projects</div>
            </div>
        </div>
    );
}

function StatsRow() {
    return (
        <div className="fade-up-2" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {STATS.map(({ label, value, sub, subColor, icon, color }) => {
                const Ic = Icons[icon];
                const c = STAT_ICON_COLORS[color];
                return (
                    <div key={label} style={{
                        background: "#131d2e", border: "1px solid rgba(255,255,255,.07)",
                        borderRadius: 12, padding: "18px 20px",
                        display: "flex", alignItems: "center", gap: 14,
                    }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                            background: c.bg, border: `1px solid ${c.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke={c.stroke} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                {icon === "FileText" && <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>}
                                {icon === "Activity" && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />}
                                {icon === "Map" && <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></>}
                                {icon === "Award" && <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></>}
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 2, fontWeight: 500 }}>{label}</div>
                            <div style={{ fontSize: 26, fontWeight: 800, color: label === "Resume Score" ? "#00d4ff" : "#fff", lineHeight: 1 }}>{value}</div>
                            <div style={{ fontSize: 11.5, color: subColor, marginTop: 3 }}>{sub}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function Card({ children, style = {} }) {
    return (
        <div style={{ background: "#111827", border: "1px solid rgba(255,255,255,.07)", borderRadius: 12, ...style }}>
            {children}
        </div>
    );
}

function SectionTitle({ icon: Ic, children }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#e2e8f0" }}>
            <span style={{ color: "#00d4ff", display: "flex" }}><Ic /></span>
            {children}
        </div>
    );
}

function PersonalInfo() {
    const rows = [
        ["Full Name", USER.name],
        ["Email Address", USER.email],
        ["Phone Number", USER.phone],
        ["Career Goal", USER.goal],
        ["Location", USER.location],
        ["Bio", USER.bio],
    ];
    return (
        <Card style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <SectionTitle icon={Icons.User}>Personal Information</SectionTitle>
                <button className="edit-btn-hover" style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 7, border: "none", cursor: "pointer",
                    fontSize: 12, fontWeight: 600, color: "#00d4ff",
                    background: "rgba(0,212,255,.08)",
                    outline: "1px solid rgba(0,212,255,.18)", transition: "all .15s",
                }}>
                    <Icons.Edit /> Edit Profile
                </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {rows.map(([label, value]) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 8, alignItems: "start" }}>
                        <span style={{ fontSize: 12.5, color: "#64748b", fontWeight: 500, paddingTop: 1 }}>{label}</span>
                        <span style={{ fontSize: 13, color: label === "Bio" ? "#94a3b8" : "#e2e8f0" }}>{value}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function CareerProgress() {
    const [animated, setAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); }
        }, { threshold: 0.2 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <Card style={{ padding: "18px 20px" }} ref={ref}>
            <div style={{ marginBottom: 14 }}>
                <SectionTitle icon={Icons.TrendingUp}>Career Progress</SectionTitle>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {PROGRESS.map(({ label, pct, bg }) => (
                    <div key={label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                            <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{label}</span>
                            <span style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600 }}>{pct}%</span>
                        </div>
                        <div style={{ height: 6, background: "rgba(255,255,255,.07)", borderRadius: 99, overflow: "hidden" }}>
                            <div className="prog-bar-animated" style={{
                                height: "100%", borderRadius: 99,
                                background: bg,
                                width: animated ? `${pct}%` : "0%",
                            }} />
                        </div>
                    </div>
                ))}
            </div>
            <button className="view-detail-hover" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                width: "100%", marginTop: 14, padding: "9px",
                borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#94a3b8",
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
                cursor: "pointer", transition: "all .15s",
            }}>
                View Detailed Progress <Icons.ChevronRight />
            </button>
        </Card>
    );
}

function RecentActivity() {
    return (
        <Card style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <SectionTitle icon={Icons.Clock}>Recent Activity</SectionTitle>
                <button style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: 12.5, fontWeight: 600, color: "#00d4ff",
                    background: "none", border: "none", cursor: "pointer",
                }}>
                    View All <Icons.ChevronRight />
                </button>
            </div>
            <div>
                {ACTIVITIES.map(({ icon, color, title, desc, time }, i) => {
                    const c = ACTIVITY_COLORS[color];
                    return (
                        <div key={i} style={{
                            display: "flex", alignItems: "center", gap: 14,
                            padding: "13px 0",
                            borderBottom: i < ACTIVITIES.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
                        }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 17, background: c.bg, border: `1px solid ${c.border}`,
                            }}>{icon}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#e2e8f0", marginBottom: 2 }}>{title}</div>
                                <div style={{ fontSize: 12, color: "#64748b" }}>{desc}</div>
                            </div>
                            <div style={{ fontSize: 12, color: "#64748b", whiteSpace: "nowrap", flexShrink: 0 }}>{time}</div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}

function AccountCard() {
    return (
        <Card style={{ padding: "18px 20px" }}>
            <div style={{ marginBottom: 10 }}>
                <SectionTitle icon={Icons.Settings}>Account</SectionTitle>
            </div>
            <div>
                {[
                    { Icon: Icons.Lock, label: "Plan", value: "Free Plan", valueStyle: { color: "#60a5fa" } },
                    { Icon: Icons.Calendar, label: "Member Since", value: "Jul 2026", valueStyle: {} },
                    { Icon: Icons.Clock, label: "Last Login", value: "Today, 10:32 AM", valueStyle: {} },
                ].map(({ Icon: Ic, label, value, valueStyle }) => (
                    <div key={label} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,.05)",
                        fontSize: 12.5,
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#94a3b8" }}>
                            <span style={{ color: "#64748b", display: "flex" }}><Ic /></span>
                            {label}
                        </div>
                        <span style={{ fontWeight: 500, fontSize: 12.5, color: "#e2e8f0", ...valueStyle }}>{value}</span>
                    </div>
                ))}

                {/* Profile completion bar */}
                <div style={{ padding: "10px 0 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#94a3b8" }}>
                            <span style={{ color: "#64748b", display: "flex" }}><Icons.Activity /></span>
                            Profile Completion
                        </div>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#00d4ff" }}>82%</span>
                    </div>
                    <div style={{ height: 5, background: "rgba(255,255,255,.07)", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: "82%", borderRadius: 99, background: "linear-gradient(90deg,#00d4ff,#0095b3)" }} />
                    </div>
                </div>
            </div>
        </Card>
    );
}

function AccountSettings() {
    const items = [
        { Icon: Icons.Lock, label: "Change Password" },
        { Icon: Icons.Bell, label: "Notification Preferences" },
        { Icon: Icons.Download, label: "Download My Data" },
    ];
    return (
        <Card style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 10 }}>
                <span style={{ color: "#00d4ff", display: "flex" }}><Icons.Settings /></span>
                Account Settings
            </div>
            <div>
                {items.map(({ Icon: Ic, label }) => (
                    <button key={label} className="settings-row-hover" style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 0", width: "100%", background: "none", border: "none",
                        borderBottom: "1px solid rgba(255,255,255,.05)", cursor: "pointer",
                        transition: "opacity .15s",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#94a3b8" }}>
                            <span style={{ color: "#64748b", display: "flex" }}><Ic /></span>
                            {label}
                        </div>
                        <span style={{ fontSize: 16, color: "#64748b" }}>›</span>
                    </button>
                ))}
            </div>
            <button className="settings-row-hover" style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 0", fontSize: 13, fontWeight: 600, color: "#ef4444",
                background: "none", border: "none", cursor: "pointer", marginTop: 4,
                transition: "opacity .15s",
            }}>
                <Icons.LogOut /> Logout
            </button>
        </Card>
    );
}

/* ─────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────── */
export default function ProfilePage() {
    const [activeItem, setActiveItem] = useState("Profile");

    return (
        <>
            <style>{GLOBAL_CSS}</style>

            {/* App shell */}
            <div style={{ display: "grid", height: "100dvh", overflow: "hidden", padding: "20px", marginTop: "50px" }}>

                <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", overflow: "hidden" }}>
                    <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

                    {/* Main scrollable area */}
                    <div style={{ overflowY: "auto", background: "#0b0f1a" }}>
                        <div style={{ padding: "20px 20px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
                            <ProfileHeader />
                            <StatsRow />

                            {/* Bottom 3-col grid */}
                            <div className="fade-up-3" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr .8fr", gap: 14 }}>

                                {/* Col 1: Personal Info */}
                                <PersonalInfo />

                                {/* Col 2: Career Progress + Recent Activity */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                    <CareerProgress />
                                    <RecentActivity />
                                </div>

                                {/* Col 3: Account + Settings */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                    <AccountCard />
                                    <AccountSettings />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}