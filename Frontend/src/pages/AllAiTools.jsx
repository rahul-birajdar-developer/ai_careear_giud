import { useState } from "react";
import styles from "../CSS/AllAiTools.module.css"
import { Link } from "react-router-dom";

/* ─── PALETTE ────────────────────────────────────────────── */
const C = {
    bg: "#080D1A",
    surface: "#0E1426",
    card: "#111827",
    cardHov: "#141f35",
    border: "rgba(255,255,255,0.07)",
    borderHi: "rgba(255,255,255,0.13)",
    text: "#EEF2FF",
    sub: "#8892AA",
    muted: "#4B5570",
    indigo: "#6366F1",
    indigoL: "#818CF8",
    cyan: "#22D3EE",
    purple: "#8B5CF6",
    teal: "#14B8A6",
    green: "#10B981",
    amber: "#F59E0B",
    orange: "#F97316",
    pink: "#EC4899",
    blue: "#3B82F6",
    rose: "#F43F5E",
};

/* ─── TOOL DATA ──────────────────────────────────────────── */
const TOOLS = [
    {
        icon: "📄", iconBg: "linear-gradient(135deg,#14B8A6,#0891B2)",
        title: "AI Resume Analyzer",
        desc: "Get an ATS score, keyword insights and actionable feedback.",
        cta: "Analyze Resume", ctaColor: C.cyan,
        route: "/resume"
    },
    {
        icon: "🎯", iconBg: "linear-gradient(135deg,#6366F1,#8B5CF6)",
        title: "Career Path Explorer",
        desc: "Discover 50+ career paths with salary, growth & required skills.",
        cta: "Explore Paths", ctaColor: C.indigoL,
        route: "/careerpaths"
    },
    {
        icon: "🎯", iconBg: "linear-gradient(135deg,#EC4899,#F43F5E)",
        title: "Skill Gap Analyzer",
        desc: "Compare your skills with job descriptions and find gaps.",
        cta: "Find Skill Gaps", ctaColor: C.pink,
        route: "/skillgapanalyze"
    },
    {
        icon: "📝", iconBg: "linear-gradient(135deg,#F59E0B,#F97316)",
        title: "AI Cover Letter Writer",
        desc: "Generate personalized cover letters that get you noticed.",
        cta: "Write Cover Letter", ctaColor: C.amber,
        route: "/coverletter"
    },
    // {
    //     icon: "💬", iconBg: "linear-gradient(135deg,#6366F1,#3B82F6)",
    //     title: "AI Interview Coach",
    //     desc: "Practice with AI-generated questions and get smart feedback.",
    //     cta: "Start Practice", ctaColor: C.indigoL,
    // },
    {
        icon: "🅐", iconBg: "linear-gradient(135deg,#10B981,#14B8A6)",
        title: "AI Mock Interview",
        desc: "Simulate real interviews and get AI feedback & suggestions.",
        cta: "Start Mock Interview", ctaColor: C.green,
        route: "/interview"
    },
    {
        icon: "🔀", iconBg: "linear-gradient(135deg,#22D3EE,#6366F1)",
        title: "AI Learning Roadmap",
        desc: "Get a personalized roadmap with resources, timelines & milestones.",
        cta: "Build Roadmap", ctaColor: C.cyan,
        route: "/roadmap"
    },
    {
        icon: "🎓", iconBg: "linear-gradient(135deg,#8B5CF6,#6366F1)",
        title: "AI Learning Planner",
        desc: "Plan your study schedule and stay consistent with AI.",
        cta: "Create Study Plan", ctaColor: C.purple,
    },
    {
        icon: "💡", iconBg: "linear-gradient(135deg,#F59E0B,#EF4444)",
        title: "AI Skill Recommender",
        desc: "Discover skills to learn based on your goals and market demand.",
        cta: "Discover Skills", ctaColor: C.amber,
    },
    {
        icon: "📊", iconBg: "linear-gradient(135deg,#14B8A6,#10B981)",
        title: "AI Salary Predictor",
        desc: "Predict your future salary based on your role, skills & location.",
        cta: "Predict Salary", ctaColor: C.teal,
        route: "/salary"
    },
    {
        icon: "💼", iconBg: "linear-gradient(135deg,#EC4899,#8B5CF6)",
        title: "Job Match Finder",
        desc: "Find jobs that match your profile and career preferences.",
        cta: "Find Jobs", ctaColor: C.pink,
        route: "/careerpaths"
    },
    {
        icon: "✉️", iconBg: "linear-gradient(135deg,#3B82F6,#6366F1)",
        title: "AI Email Writer",
        desc: "Write professional emails for job applications & follow-ups.",
        cta: "Write Email", ctaColor: C.blue,
    },
    {
        icon: "⭐", iconBg: "linear-gradient(135deg,#8B5CF6,#EC4899)",
        title: "AI Personal Brand Builder",
        desc: "Build your personal brand and online presence with AI.",
        cta: "Build Brand", ctaColor: C.purple,
    },
    {
        icon: "🔗", iconBg: "linear-gradient(135deg,#F97316,#F59E0B)",
        title: "AI Networking Assistant",
        desc: "Get personalized networking tips and connection suggestions.",
        cta: "Get Connected", ctaColor: C.orange,
    },
    {
        icon: "💡", iconBg: "linear-gradient(135deg,#10B981,#22D3EE)",
        title: "AI Project Ideas",
        desc: "Get project ideas based on your skills and career goals.",
        cta: "Explore Ideas", ctaColor: C.green,
    },
    {
        icon: "🏆", iconBg: "linear-gradient(135deg,#8B5CF6,#6366F1)",
        title: "Goal Tracker",
        desc: "Track your career goals and achieve them step by step.",
        cta: "Track Goals", ctaColor: C.indigoL,
    },
];

/* ─── ICON RENDERER ──────────────────────────────────────── */
function ToolIcon({ icon, bg }) {
    const icons = {
        "📄": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>,
        "🎯": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
        "📝": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
        "💬": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
        "🅐": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M4 20V4l8 4 8-4v16l-8-4-8 4z" /></svg>,
        "🔀": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" /></svg>,
        "🎓": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
        "💡": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M9 21h6M12 3a6 6 0 016 6c0 3-2 5-3 6H9c-1-1-3-3-3-6a6 6 0 016-6z" /></svg>,
        "📊": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>,
        "💼": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4M8 12v1M16 12v1" /></svg>,
        "✉️": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>,
        "⭐": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
        "🔗": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>,
        "🏆": <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round"><path d="M8 21h8M12 17v4M7 4H4v5a5 5 0 005 5h6a5 5 0 005-5V4h-3" /><path d="M7 4h10" /></svg>,
    };
    const svgEl = icons[icon] || icons["💡"];
    return (
        <div style={{ width: 46, height: 46, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 10, boxShadow: "0 4px 14px rgba(0,0,0,0.35)" }}>
            {svgEl}
        </div>
    );
}

/* ─── TOOL CARD ──────────────────────────────────────────── */
function ToolCard({ tool, delay = 0 }) {
    return (
        <div
            className={styles.toolCard}
            style={{ animationDelay: `${delay}s` }}
        >

            <div className={styles.toolHeader}>

                <ToolIcon
                    icon={tool.icon}
                    bg={tool.iconBg}
                />

                <div className={styles.toolContent}>

                    <h3 className={styles.toolTitle}>
                        {tool.title}
                    </h3>

                    <p className={styles.toolDescription}>
                        {tool.desc}
                    </p>

                </div>

            </div>

            <div className={styles.toolFooter}>

                <span
                    className={styles.ctaLink}
                    style={{ color: tool.ctaColor }}
                >
                    {tool.cta} →
                </span>

            </div>

        </div>
    );
}

/* ─── STAR ────────────────────────────────────────────────── */
const StarDot = ({ top, left, size, delay }) => (
    <div
        className={styles.starDot}
        style={{
            top,
            left,
            width: size,
            height: size,
            animationDuration: `${2 + delay}s`,
            animationDelay: `${delay}s`,
        }}
    />
);

/* ─── HERO ILLUSTRATION ──────────────────────────────────── */
function HeroIllus() {
    const stars = [
        { top: "8%", left: "5%", size: 2.5, delay: 0.3 }, { top: "20%", left: "60%", size: 2, delay: 1.1 },
        { top: "35%", left: "88%", size: 3, delay: 0.7 }, { top: "60%", left: "12%", size: 2, delay: 1.8 },
        { top: "75%", left: "75%", size: 2.5, delay: 0.5 }, { top: "50%", left: "40%", size: 1.5, delay: 2.1 },
        { top: "15%", left: "35%", size: 2, delay: 1.4 }, { top: "85%", left: "50%", size: 2, delay: 0.9 },
    ];
    const floatItems = [
        { icon: "📊", bg: `linear-gradient(135deg,${C.green},${C.teal})`, top: "10%", left: "12%", delay: 0 },
        { icon: "💼", bg: `linear-gradient(135deg,${C.amber},${C.orange})`, top: "42%", left: "4%", delay: 0.5 },
        { icon: "💬", bg: `linear-gradient(135deg,${C.purple},${C.pink})`, top: "8%", right: "10%", delay: 0.8 },
        { icon: "👤", bg: `linear-gradient(135deg,${C.blue},${C.indigo})`, top: "50%", right: "4%", delay: 0.3 },
    ];
    return (
        <div className={styles.heroIllustration}>

            {stars.map((star, index) => (
                <StarDot key={index} {...star} />
            ))}

            {/* Brain Orb */}

            <div className={styles.brainOrb}>

                <svg
                    width="70"
                    height="70"
                    viewBox="0 0 100 100"
                    fill="none"
                >
                    <ellipse
                        cx="35"
                        cy="50"
                        rx="22"
                        ry="28"
                        className={styles.brainLeft}
                    />

                    <ellipse
                        cx="65"
                        cy="50"
                        rx="22"
                        ry="28"
                        className={styles.brainRight}
                    />

                    <line
                        x1="43"
                        y1="30"
                        x2="57"
                        y2="30"
                        className={styles.brainLine}
                    />

                    <line
                        x1="43"
                        y1="50"
                        x2="57"
                        y2="50"
                        className={styles.brainLine}
                    />

                    <line
                        x1="43"
                        y1="70"
                        x2="57"
                        y2="70"
                        className={styles.brainLine}
                    />

                    <circle cx="35" cy="40" r="3" className={styles.dotPurple} />
                    <circle cx="35" cy="60" r="3" className={styles.dotCyan} />
                    <circle cx="65" cy="40" r="3" className={styles.dotCyan} />
                    <circle cx="65" cy="60" r="3" className={styles.dotPurple} />

                    {[
                        [25, 35],
                        [45, 25],
                        [55, 75],
                        [75, 65],
                        [30, 70],
                        [70, 30]
                    ].map(([x, y], i) => (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="2"
                            className={i % 2 === 0 ? styles.dotPurpleLight : styles.dotCyanLight}
                        />
                    ))}

                </svg>

            </div>

            {/* Floating Cards */}

            {floatItems.map((item, index) => (
                <div
                    key={index}
                    className={styles.floatingChip}
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        background: item.bg,
                        animationDuration: `${2.5 + index * 0.4}s`,
                        animationDelay: `${item.delay}s`
                    }}
                >
                    {item.icon}
                </div>
            ))}

        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function AllAiTools() {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const FILTERS = ["All", "Resume", "Interview", "Learning", "Career", "Writing"];
    const FILTER_MAP = {
        Resume: ["AI Resume Analyzer", "AI Cover Letter Writer", "Skill Gap Analyzer"],
        Interview: ["AI Interview Coach", "AI Mock Interview"],
        Learning: ["AI Learning Roadmap", "AI Learning Planner", "AI Skill Recommender", "AI Project Ideas"],
        Career: ["Career Path Explorer", "AI Salary Predictor", "Job Match Finder", "Goal Tracker", "AI Personal Brand Builder", "AI Networking Assistant"],
        Writing: ["AI Cover Letter Writer", "AI Email Writer"],
    };

    const filtered = TOOLS.filter(t => {
        const matchesSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = activeFilter === "All" || FILTER_MAP[activeFilter]?.includes(t.title);
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <div className={styles.pageContainer}>

                {/* ── HERO SECTION ── */}
                <div className={styles.heroSection}>

                    {/* Left */}

                    <div className={styles.heroContent}>

                        <h1 className={styles.heroTitle}>
                            AI Tools
                        </h1>

                        <p className={styles.heroDescription}>
                            Powerful AI tools to help you build, improve and accelerate your career.
                        </p>

                        <button
                            type="button"
                            className={styles.toolsBadge}
                        >
                            <span className={styles.badgeIcon}>✦</span>

                            {TOOLS.length}+ AI Tools
                        </button>

                    </div>

                    {/* Right */}

                    <div className={styles.heroIllustration}>
                        <HeroIllus />
                    </div>

                </div>

                {/* ── SEARCH + FILTERS ── */}
                <div className={styles.pageContent}>

                    {/* Search Bar */}

                    <div className={styles.searchContainer}>

                        <svg
                            className={styles.searchIcon}
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                        </svg>

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search AI tools..."
                            className={styles.searchInput}
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className={styles.clearButton}
                            >
                                ✕
                            </button>
                        )}

                    </div>

                    {/* Filter Chips */}

                    <div className={styles.filterSection}>

                        <div className={styles.filterChips}>

                            {FILTERS.map((filter) => {

                                const isActive = activeFilter === filter;

                                return (
                                    <button
                                        key={filter}
                                        type="button"
                                        onClick={() => setActiveFilter(filter)}
                                        className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ""
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                );

                            })}

                        </div>

                        <span className={styles.toolCount}>
                            {filtered.length} tool{filtered.length !== 1 ? "s" : ""}
                        </span>

                    </div>

                </div>

                {/* ── TOOLS GRID ── */}
                <div className={styles.toolsSection}>

                    {filtered.length === 0 ? (

                        <div className={styles.emptyState}>

                            <div className={styles.emptyIcon}>
                                🔍
                            </div>

                            <h3 className={styles.emptyTitle}>
                                No tools found
                            </h3>

                            <p className={styles.emptyDescription}>
                                Try a different search term or clear the filter.
                            </p>

                            <button
                                type="button"
                                className={styles.showAllButton}
                                onClick={() => {
                                    setSearch("");
                                    setActiveFilter("All");
                                }}
                            >
                                Show All Tools
                            </button>

                        </div>

                    ) : (

                        <div
                            className={styles.toolsGrid}
                            key={activeFilter + search}
                        >
                            {filtered.map((tool, index) => {

                                const card = (
                                    <ToolCard
                                        tool={tool}
                                        delay={Math.min(index * 0.045, 0.5)}
                                    />
                                );

                                return tool.route ? (
                                    <Link
                                        key={tool.title}
                                        to={tool.route}
                                        className={styles.toolLink}
                                    >
                                        {card}
                                    </Link>
                                ) : (
                                    <div
                                        key={tool.title}
                                        className={styles.toolLink}
                                        onClick={() => alert("🚀 This feature will be available soon!")}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {card}
                                    </div>
                                );

                            })}
                        </div>

                    )}

                </div>

                {/* ── UPGRADE BANNER ── */}
                <div className={styles.upgradeSection}>

                    <div className={styles.upgradeCard}>

                        <div className={styles.upgradeContent}>

                            <div className={styles.upgradeIcon}>
                                👑
                            </div>

                            <div className={styles.upgradeInfo}>

                                <h3 className={styles.upgradeTitle}>
                                    Unlock Premium AI Tools
                                </h3>

                                <p className={styles.upgradeDescription}>
                                    Get access to advanced AI tools, unlimited usage, personalized career insights, AI interview coaching, and exclusive premium features.
                                </p>

                            </div>

                        </div>

                        <button
                            type="button"
                            className={styles.upgradeButton}
                        >
                            <span className={styles.upgradeButtonIcon}>
                                ✦
                            </span>

                            Upgrade to Premium
                            <span>→</span>
                        </button>

                    </div>

                </div>

            </div>
        </>
    );
}