import { useState, useRef } from "react";
import styles from "../CSS/learningRoadMap.module.css"
import api from "../api/axios.js"

/* ─── PALETTE ───────────────────────────────────────────── */
const C = {
    bg: "#0C0F1E",
    sidebar: "#0F1220",
    surface: "#131729",
    card: "#161C2E",
    cardB: "#1A2138",
    border: "rgba(255,255,255,0.07)",
    borderHi: "rgba(255,255,255,0.13)",
    text: "#E8EEFF",
    sub: "#7B84A3",
    muted: "#424B68",
    indigo: "#6366F1",
    indigoL: "#818CF8",
    cyan: "#22D3EE",
    purple: "#8B5CF6",
    green: "#10B981",
    amber: "#F59E0B",
    orange: "#F97316",
    pink: "#EC4899",
    red: "#EF4444",
    teal: "#14B8A6",
};

/* ─── DATA ──────────────────────────────────────────────── */
const GOALS = ["Full Stack Developer", "Frontend Developer", "Backend Developer", "Data Scientist", "AI / ML Engineer", "DevOps Engineer", "Cybersecurity Analyst", "Cloud Architect", "Mobile Developer", "UI/UX Designer", "Product Manager"];
const EXPERIENCES = ["Beginner", "Intermediate", "Advanced", "Expert"];
const HOURS = ["5-7 hours", "10-15 hours", "15-20 hours", "20-30 hours", "Full-time"];
const DURATIONS = ["3-4 Months", "6-9 Months", "9-12 Months", "12-18 Months"];
const FOCUS_OPTS = ["Web Development", "JavaScript", "Database", "DevOps", "Mobile", "AI/ML", "Security", "Cloud", "UI/UX", "System Design"];

const STAGE_ICONS = ["💻", "⚡", "🗄️", "🗃️", "🚀", "🌐"];
const STAGE_COLORS = [C.indigo, C.cyan, C.green, C.amber, C.purple, C.orange];

const TABS = [
    { id: "roadmap", label: "Roadmap", icon: "🗺️" },
    { id: "resources", label: "Resources", icon: "📚" },
    { id: "projects", label: "Projects", icon: "💡" },
    { id: "milestones", label: "Milestones", icon: "🏁" },
];

/* ─── HELPERS ───────────────────────────────────────────── */
const Sel = ({ value, onChange, options, placeholder }) => (
    <div className={styles.selWrap}>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${styles.select} ${!value ? styles.placeholder : ""}`}
        >
            {placeholder && (
                <option value="">
                    {placeholder}
                </option>
            )}

            {options.map((o) => (
                <option key={o} value={o}>
                    {o}
                </option>
            ))}
        </select>

        <svg
            className={styles.arrow}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
        >
            <path d="M6 9l6 6 6-6" />
        </svg>
    </div>
);

const Tag = ({
    label,
    color = "rgba(99,102,241,0.15)",
    text = "var(--indigo-light)",
    border = "rgba(99,102,241,0.25)"
}) => {
    return (
        <span
            className={styles.tag}
            style={{
                "--tag-bg": color,
                "--tag-color": text,
                "--tag-border": border,
            }}
        >
            {label}
        </span>
    );
};

const Chip = ({ label, bg, color }) => (
    <span
        className={styles.chip}
        style={{
            "--chip-bg": bg,
            "--chip-color": color,
            "--chip-border": `${color}30`,
        }}
    >
        {label}
    </span>
);

const InfoCard = ({ icon, label, value, color }) => (
    <div
        className={styles.statCard}
        style={{
            "--icon-bg": `${color}18`,
            "--value-color": color,
        }}
    >
        <div className={styles.statCardIcon}>
            {icon}
        </div>

        <div className={styles.statCardContent}>
            <div className={styles.statCardLabel}>
                {label}
            </div>

            <div className={styles.statCardValue}>
                {value}
            </div>
        </div>
    </div>
);

/* ─── STAGE ROW ─────────────────────────────────────────── */
function StageRow({ stage, idx, color, icon, expanded, onToggle }) {
    const pct = stage.progress / stage.total * 100;
    return (
        <div
            className={`${styles.stageRow} ${styles.fadeIn}`}
            style={{
                "--animation-delay": `${idx * 0.07}s`,
            }}
        >

            {/* main row */}
            <div
                className={styles.stageHeader}
                onClick={onToggle}
            >

                {/* Step Bubble */}
                <div
                    className={styles.stepBubble}
                    style={{
                        "--step-gradient": `linear-gradient(135deg, ${color}CC, ${color}66)`,
                        "--step-border": `${color}55`,
                    }}
                >
                    {idx + 1}
                </div>

                {/* Stage Icon */}
                <div
                    className={styles.stageIcon}
                    style={{
                        "--icon-bg": `${color}18`,
                    }}
                >
                    {icon}
                </div>

                {/* Title & Tags */}
                <div className={styles.stageContent}>

                    <div className={styles.stageTitleRow}>

                        <span className={styles.stageTitle}>
                            {stage.title}
                        </span>

                        <Chip
                            label={stage.duration}
                            bg={`${color}18`}
                            color={color}
                        />

                    </div>

                    <p className={styles.stageDescription}>
                        {stage.desc}
                    </p>

                    <div className={styles.stageTags}>
                        {stage.tags.map((t) => (
                            <Tag
                                key={t}
                                label={t}
                                color={`${color}12`}
                                text={color}
                                border={`${color}28`}
                            />
                        ))}
                    </div>

                </div>

                {/* progress + stats */}
                <div className={styles.progressSection}>

                    <div className={styles.progressHeader}>
                        <span className={styles.progressLabel}>
                            Progress
                        </span>

                        <span className={styles.progressCount}>
                            {stage.progress} / {stage.total}
                        </span>
                    </div>

                    <div className={styles.progressBar}>

                        <div
                            className={styles.progressFill}
                            style={{
                                "--progress-width": `${pct}%`,
                                "--progress-gradient": `linear-gradient(90deg, ${color}, ${color}AA)`,
                            }}
                        />

                    </div>

                    <div className={styles.stats}>

                        <div className={styles.statItem}>

                            <span className={styles.statIcon}>📚</span>

                            <div>

                                <div className={styles.statLabel}>
                                    Resources
                                </div>

                                <div className={styles.statValue}>
                                    {stage.resources}
                                </div>

                            </div>

                        </div>

                        <div className={styles.statItem}>

                            <span className={styles.statIcon}>💡</span>

                            <div>

                                <div className={styles.statLabel}>
                                    Projects
                                </div>

                                <div className={styles.statValue}>
                                    {stage.projects}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* chevron */}
                <div
                    className={`${styles.expandIcon} ${expanded ? styles.expanded : ""
                        }`}
                >
                    ▼
                </div>
            </div>

            {/* expanded detail */}
            {expanded && (
                <div className={styles.subtopicsSection}>
                    <div className={styles.subtopicsGrid}>
                        {stage.subtopics?.map((s, i) => (
                            <div
                                key={i}
                                className={styles.subtopicCard}
                                style={{ "--dot-color": color }}
                            >
                                <div className={styles.subtopicDot} />
                                <span className={styles.subtopicText}>
                                    {s}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function LearningRoadMap() {
    const [goal, setGoal] = useState("Full Stack Developer");
    const [exp, setExp] = useState("Beginner");
    const [hours, setHours] = useState("10-15 hours");
    const [duration, setDuration] = useState("6-9 Months");
    const [focus, setFocus] = useState(["Web Development", "JavaScript"]);
    const [loading, setLoading] = useState(false);
    const [roadmap, setRoadmap] = useState(null);
    const [activeTab, setActiveTab] = useState("roadmap");
    const [expanded, setExpanded] = useState({});
    const rightRef = useRef();

    const toggleFocus = (f) => setFocus(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);
    const toggleExpand = (i) => setExpanded(p => ({ ...p, [i]: !p[i] }));

    /* ── GENERATE ── */
    const generate = async () => {
        setLoading(true);
        // setRoadmap(null);
        setExpanded({});
        try {
            const res = api.post("/learning/roadmap", { goal, exp, hours, duration, focus });
            // const d = await res.json();
            // const raw = d.content?.map(b => b.text || "").join("") || "";
            // const clean = raw.replace(/```json|```/g, "").trim();
            setRoadmap(res.data);
        } catch (error) {
            console.log("Something Wrong : ", error)
            // fallback
            // setRoadmap({
            //     goal, experience: exp,
            //     estimatedTime: "6 - 9 Months", weeklyCommitment: "10 - 15 hours",
            //     totalTopics: 78, totalResources: 45, totalProjects: 12,
            //     stages: [
            //         { title: "Foundation - Web Basics", duration: "2-3 Weeks", desc: "Learn the fundamental building blocks of web development.", tags: ["HTML", "CSS", "JavaScript Basics", "Responsive Design", "Git & GitHub"], progress: 0, total: 12, resources: 8, projects: 1, subtopics: ["HTML5 Semantics", "CSS Flexbox", "CSS Grid", "Box Model", "JS Variables", "DOM Basics", "Git Basics", "GitHub Repo", "Media Queries", "Forms", "DevTools", "VS Code"] },
            //         { title: "Frontend Development", duration: "4-6 Weeks", desc: "Dive deep into JavaScript and modern frontend frameworks.", tags: ["JavaScript (ES6+)", "DOM Manipulation", "React.js", "State Management", "API Calls"], progress: 0, total: 18, resources: 12, projects: 2, subtopics: ["Arrow Functions", "Promises", "Async/Await", "Fetch API", "React Hooks", "useState", "useEffect", "Props", "React Router", "Context API", "Redux Basics", "Component Design", "Error Boundaries", "Lazy Loading", "Performance", "CSS Modules", "Styled Components", "Testing Basics"] },
            //         { title: "Backend Development", duration: "6-8 Weeks", desc: "Build server-side applications and RESTful APIs.", tags: ["Node.js", "Express.js", "REST APIs", "Authentication", "JWT"], progress: 0, total: 16, resources: 10, projects: 2, subtopics: ["Node Basics", "Express Setup", "Routing", "Middleware", "REST Conventions", "GET POST PUT DELETE", "JWT Tokens", "bcrypt Hashing", "Sessions", "Cookies", "Error Handling", "Logging", "API Rate Limiting", "Testing APIs", "Deployment", "Environment Variables"] },
            //         { title: "Database & Storage", duration: "3-4 Weeks", desc: "Learn databases and how to work with data efficiently.", tags: ["MongoDB", "SQL Basics", "Mongoose", "Data Modeling", "CRUD Operations"], progress: 0, total: 10, resources: 6, projects: 1, subtopics: ["SQL vs NoSQL", "MongoDB Atlas", "Mongoose Schema", "CRUD Operations", "Aggregation", "Indexes", "Relations", "PostgreSQL Basics", "Joins", "ORM Prisma", "Migrations", "Backups", "Redis Intro", "Connection Pooling"] },
            //         { title: "DevOps & Deployment", duration: "3-4 Weeks", desc: "Deploy your applications and learn DevOps best practices.", tags: ["Git Advanced", "CI/CD Basics", "Docker", "Cloud Deployment", "Nginx"], progress: 0, total: 8, resources: 5, projects: 1, subtopics: ["Docker Containers", "Docker Compose", "GitHub Actions", "Vercel Deploy", "AWS EC2 Basics", "Nginx Config", "SSL Certificates", "Environment Config", "PM2", "Logs", "Monitoring", "Health Checks"] },
            //         { title: "Advanced & Real World", duration: "2-3 Weeks", desc: "Advanced concepts and building real-world applications.", tags: ["Performance", "Security", "Testing", "Best Practices", "System Design"], progress: 0, total: 14, resources: 4, projects: 3, subtopics: ["Web Vitals", "Lighthouse", "Code Splitting", "Tree Shaking", "OWASP Top 10", "XSS Prevention", "CSRF", "Rate Limiting", "Unit Testing", "Integration Testing", "E2E Cypress", "System Design Basics", "Scalability", "Portfolio Building"] },
            //     ],
            //     finalGoal: `Build a complete portfolio and land your dream job as a ${goal}!`,
            //     proTip: "Consistency is key! Follow the roadmap step by step and build real projects to master your skills.",
            // });
        } finally {
            setLoading(false);
            setTimeout(() => rightRef.current?.scrollTo({ top: 0, behavior: "smooth" }), 100);
        }
    };

    const totalPct = roadmap ? Math.round(roadmap.stages.reduce((a, s) => a + s.progress, 0) / roadmap.stages.reduce((a, s) => a + s.total, 0) * 100) || 0 : 0;

    /* ─── RESOURCES TAB ─── */
    const ResourcesTab = () => (
        <div className={`${styles.resourcesSection} fadeIn`}>
            {roadmap?.stages?.map((stage, stageIndex) => (
                <div key={stageIndex} className={styles.stageGroup}>
                    <h4
                        className={styles.stageTitle}
                        style={{ "--stage-color": STAGE_COLORS[stageIndex % 6] }}
                    >
                        {stage.title}
                    </h4>

                    {Array.from({ length: Math.min(3, stage.resources) }).map((_, resourceIndex) => (
                        <div
                            key={resourceIndex}
                            className={styles.resourceCard}
                        >
                            <span className={styles.resourceIcon}>
                                {"📹📄📖"[resourceIndex]}
                            </span>

                            <div className={styles.resourceContent}>
                                <h5 className={styles.resourceTitle}>
                                    {["Video Course", "Documentation", "Tutorial Article"][resourceIndex]} — {stage.title}
                                </h5>

                                <p className={styles.resourceMeta}>
                                    Free · {["YouTube", "Official Docs", "Dev.to"][resourceIndex]}
                                </p>
                            </div>

                            <button
                                className={styles.openBtn}
                                style={{
                                    "--stage-color": STAGE_COLORS[stageIndex % 6]
                                }}
                            >
                                Open →
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    /* ─── PROJECTS TAB ─── */
    const ProjectsTab = () => (
        <div className={`${styles.projectsGrid} fadeIn`}>
            {roadmap?.stages
                ?.flatMap((stage, stageIndex) =>
                    Array.from({ length: stage.projects }).map((_, projectIndex) => ({
                        stage,
                        stageIndex,
                        projectIndex,
                    }))
                )
                .map(({ stage, stageIndex, projectIndex }, cardIndex) => (
                    <div
                        key={cardIndex}
                        className={styles.projectCard}
                    >
                        <div className={styles.projectHeader}>
                            <div
                                className={styles.projectIcon}
                                style={{ "--stage-color": STAGE_COLORS[stageIndex % 6] }}
                            >
                                {STAGE_ICONS[stageIndex % 6]}
                            </div>

                            <Chip
                                label={`Stage ${stageIndex + 1}`}
                                bg={`${STAGE_COLORS[stageIndex % 6]}18`}
                                color={STAGE_COLORS[stageIndex % 6]}
                            />
                        </div>

                        <h4 className={styles.projectTitle}>
                            {
                                [
                                    "Portfolio Website",
                                    "Todo App",
                                    "REST API",
                                    "Chat App",
                                    "Dashboard",
                                    "Admin Panel",
                                    "E-commerce",
                                    "Blog Platform",
                                    "Weather App",
                                    "Quiz App",
                                    "Social App",
                                    "Real-time Board",
                                ][cardIndex % 12]
                            }
                        </h4>

                        <p className={styles.projectDescription}>
                            Build a{" "}
                            {["beginner", "intermediate", "advanced"][projectIndex % 3]}{" "}
                            project using {stage.tags[0]} and{" "}
                            {stage.tags[1] || stage.tags[0]}.
                        </p>

                        <div className={styles.tagContainer}>
                            {stage.tags.slice(0, 3).map((tag) => (
                                <Tag
                                    key={tag}
                                    label={tag}
                                    color={`${STAGE_COLORS[stageIndex % 6]}12`}
                                    text={STAGE_COLORS[stageIndex % 6]}
                                    border={`${STAGE_COLORS[stageIndex % 6]}28`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );

    /* ─── MILESTONES TAB ─── */
    const MilestonesTab = () => (
        <div className={`${styles.timelineSection} fadeIn`}>
            {roadmap?.stages?.map((stage, index) => (
                <div
                    key={index}
                    className={styles.timelineItem}
                >
                    {/* Timeline */}

                    <div className={styles.timelineLeft}>
                        <div
                            className={styles.timelineIcon}
                            style={{ "--stage-color": STAGE_COLORS[index % 6] }}
                        >
                            🏁
                        </div>

                        {index < roadmap.stages.length - 1 && (
                            <div
                                className={styles.timelineLine}
                                style={{
                                    "--start-color": STAGE_COLORS[index % 6],
                                    "--end-color": STAGE_COLORS[(index + 1) % 6],
                                }}
                            />
                        )}
                    </div>

                    {/* Content */}

                    <div className={styles.timelineContent}>
                        <div className={styles.timelineHeader}>
                            <h4 className={styles.timelineTitle}>
                                {stage.title}
                            </h4>

                            <Chip
                                label={stage.duration}
                                bg={`${STAGE_COLORS[index % 6]}18`}
                                color={STAGE_COLORS[index % 6]}
                            />
                        </div>

                        <p className={styles.timelineDescription}>
                            {stage.desc}
                        </p>

                        <div
                            className={styles.timelineFooter}
                            style={{ "--stage-color": STAGE_COLORS[index % 6] }}
                        >
                            ✓ Complete {stage.total} topics · Build {stage.projects} project
                            {stage.projects > 1 ? "s" : ""}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    /* ─── RENDER ────────────────────────────────────────────── */
    return (
        <>
            <div className={styles.roadmapLayout}>

                {/* ══ LEFT SIDEBAR ══ */}
                <div className={styles.sidebar}>

                    {/* header */}
                    <div className={styles.sidebarHeader}>
                        <div className={styles.headerTop}>
                            <span className={styles.headerTitle}>
                                Generate Your Roadmap
                            </span>

                            <button
                                className={styles.closeButton}
                                type="button"
                            >
                                ✕
                            </button>
                        </div>

                        <p className={styles.headerDescription}>
                            Tell us your goal and we'll create a personalized roadmap for you.
                        </p>
                    </div>

                    {/* form */}
                    <div className={styles.sidebarForm}>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                What is your career goal?
                            </label>

                            <Sel
                                value={goal}
                                onChange={setGoal}
                                options={GOALS}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                Your experience level
                            </label>

                            <Sel
                                value={exp}
                                onChange={setExp}
                                options={EXPERIENCES}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                Time you can invest weekly
                            </label>

                            <Sel
                                value={hours}
                                onChange={setHours}
                                options={HOURS}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                Roadmap duration
                            </label>

                            <Sel
                                value={duration}
                                onChange={setDuration}
                                options={DURATIONS}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                What do you want to focus on?
                            </label>

                            <div className={styles.focusContainer}>
                                {FOCUS_OPTS.map((item) => {
                                    const active = focus.includes(item);

                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => toggleFocus(item)}
                                            className={`${styles.focusChip} ${active ? styles.focusChipActive : ""
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            onClick={generate}
                            disabled={loading}
                            className={`${styles.generateButton} ${loading ? styles.generateButtonLoading : ""
                                }`}
                        >
                            {loading ? (
                                <>
                                    <span className={styles.loader}></span>
                                    Generating...
                                </>
                            ) : (
                                <>✨ Generate Roadmap</>
                            )}
                        </button>

                    </div>

                    {/* overview + pro tip */}
                    {roadmap && (
                        <div className={styles.roadmapOverview}>

                            <h4 className={styles.overviewTitle}>
                                Roadmap Overview
                            </h4>

                            <div className={styles.overviewContent}>

                                {/* Progress Ring */}

                                <div className={styles.progressRingWrapper}>

                                    <svg
                                        width="56"
                                        height="56"
                                        className={styles.progressRing}
                                    >
                                        <circle
                                            cx="28"
                                            cy="28"
                                            r="22"
                                            className={styles.progressTrack}
                                        />

                                        <circle
                                            cx="28"
                                            cy="28"
                                            r="22"
                                            className={styles.progressValue}
                                            strokeDasharray={138.2}
                                            strokeDashoffset={138.2 * (1 - totalPct / 100)}
                                        />

                                        <defs>
                                            <linearGradient
                                                id="roadmapGradient"
                                                x1="0%"
                                                y1="0%"
                                                x2="100%"
                                                y2="0%"
                                            >
                                                <stop offset="0%" stopColor="var(--indigo)" />
                                                <stop offset="100%" stopColor="var(--purple)" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    <div className={styles.progressText}>
                                        {totalPct}%
                                    </div>

                                </div>

                                {/* Statistics */}

                                <div className={styles.overviewStats}>

                                    <div className={styles.statItem}>
                                        <strong>0 / {roadmap.totalTopics}</strong>
                                        <span>Topics</span>
                                    </div>

                                    <div className={styles.statItem}>
                                        <strong>0 / {roadmap.totalResources}</strong>
                                        <span>Resources</span>
                                    </div>

                                    <div className={styles.statItem}>
                                        <strong>0 / {roadmap.totalProjects}</strong>
                                        <span>Projects</span>
                                    </div>

                                </div>

                            </div>

                            {/* Pro Tip */}

                            <div className={styles.proTipCard}>

                                <h5 className={styles.proTipTitle}>
                                    💡 Pro Tip
                                </h5>

                                <p className={styles.proTipText}>
                                    {roadmap.proTip}
                                </p>

                            </div>

                        </div>
                    )}
                </div>

                {/* ══ RIGHT PANEL ══ */}
                <div
                    ref={rightRef}
                    className={styles.rightPanel}
                >
                    {/* topbar */}
                    <div className={styles.pageHeader}>
                        <div className={styles.headerContent}>
                            <div className={styles.headerTitleWrapper}>
                                <span className={styles.headerIcon}>✨</span>

                                <h1 className={styles.headerTitle}>
                                    AI Roadmap Generator
                                </h1>
                            </div>

                            <p className={styles.headerSubtitle}>
                                Personalized step-by-step roadmap to achieve your career goals
                            </p>
                        </div>

                        <div className={styles.headerActions}>
                            <button
                                type="button"
                                className={styles.exportButton}
                            >
                                <span>⬇️</span>
                                Export Roadmap
                            </button>

                            <button
                                type="button"
                                className={styles.shareButton}
                            >
                                <span>🔗</span>
                                Share Roadmap
                                <span>▾</span>
                            </button>
                        </div>
                    </div>

                    {/* empty state */}
                    {!roadmap && !loading && (
                        <div className={styles.emptyState}>

                            <div className={styles.emptyIcon}>
                                🗺️
                            </div>

                            <h2 className={styles.emptyTitle}>
                                Your Personalized Roadmap Awaits
                            </h2>

                            <p className={styles.emptyDescription}>
                                Choose your career goal and preferences on the left, then click
                                <strong> Generate Roadmap </strong>
                                to create your step-by-step learning path.
                            </p>

                            <button
                                type="button"
                                onClick={generate}
                                className={styles.generateRoadmapButton}
                            >
                                ✨ Generate My Roadmap
                            </button>

                        </div>
                    )}

                    {/* loading state */}
                    {loading && (
                        <div className={styles.loadingContainer}>

                            <div className={styles.loadingSpinner}></div>

                            <h3 className={styles.loadingTitle}>
                                Building your roadmap...
                            </h3>

                            <p className={styles.loadingSubtitle}>
                                AI is crafting a personalized path for <strong>{goal}</strong>
                            </p>

                            <div className={styles.loadingSteps}>
                                {[
                                    "Analyzing Goal",
                                    "Mapping Skills",
                                    "Creating Stages",
                                    "Finalizing",
                                ].map((step, index) => (
                                    <div
                                        key={step}
                                        className={styles.loadingStep}
                                        style={{
                                            animationDelay: `${index * 0.25}s`,
                                        }}
                                    >
                                        {step}
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}

                    {/* roadmap content */}
                    {roadmap && !loading && (
                        <div className={styles.roadmapContent}>
                            {/* info cards row */}
                            <div className={styles.infoCards}>

                                <InfoCard
                                    icon="🎯"
                                    label="Career Goal"
                                    value={roadmap.goal}
                                    color="var(--indigo)"
                                />

                                <InfoCard
                                    icon="📊"
                                    label="Experience Level"
                                    value={roadmap.experience}
                                    color="var(--cyan)"
                                />

                                <InfoCard
                                    icon="⏱️"
                                    label="Estimated Time"
                                    value={roadmap.estimatedTime}
                                    color="var(--amber)"
                                />

                                <InfoCard
                                    icon="📅"
                                    label="Weekly Commitment"
                                    value={roadmap.weeklyCommitment}
                                    color="var(--purple)"
                                />

                            </div>

                            {/* tabs */}
                            <div className={styles.tabsContainer}>
                                {TABS.map((tab) => {
                                    const isActive = activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`${styles.tabButton} ${isActive ? styles.activeTab : ""
                                                }`}
                                        >
                                            <span className={styles.tabIcon}>
                                                {tab.icon}
                                            </span>

                                            <span className={styles.tabLabel}>
                                                {tab.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* tab content */}
                            {activeTab === "roadmap" && (
                                <div className={`${styles.roadmapTab} fade-in`}>

                                    {roadmap.stages?.map((stage, index) => (
                                        <StageRow
                                            key={index}
                                            stage={stage}
                                            idx={index}
                                            color={STAGE_COLORS[index % STAGE_COLORS.length]}
                                            icon={STAGE_ICONS[index % STAGE_ICONS.length]}
                                            expanded={!!expanded[index]}
                                            onToggle={() => toggleExpand(index)}
                                        />
                                    ))}

                                    {/* Final Goal */}

                                    <div className={styles.finalGoalCard}>

                                        <div className={styles.finalGoalContent}>

                                            <div className={styles.finalGoalIcon}>
                                                🏆
                                            </div>

                                            <div className={styles.finalGoalInfo}>
                                                <h3 className={styles.finalGoalTitle}>
                                                    Final Goal
                                                </h3>

                                                <p className={styles.finalGoalDescription}>
                                                    {roadmap.finalGoal}
                                                </p>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            className={styles.careerGuideButton}
                                        >
                                            View Career Guide
                                            <span>→</span>
                                        </button>

                                    </div>

                                </div>
                            )}

                            {activeTab === "resources" && <ResourcesTab />}
                            {activeTab === "projects" && <ProjectsTab />}
                            {activeTab === "milestones" && <MilestonesTab />}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}