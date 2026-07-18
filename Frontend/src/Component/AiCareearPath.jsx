import { useState, useEffect, useRef } from "react";
import styles from "../CSS/AiCarrearPath.module.css"
import { STARS } from "../utils/generateStar";

/* ── PALETTE ─────────────────────────────────────────────── */

/* ── DATA ────────────────────────────────────────────────── */
const CAREERS = [
    {
        id: 1, title: "AI / ML Engineer",
        inr: "₹18L – ₹45L", usd: "$120K – $220K",
        tags: ["Python", "TensorFlow", "LLMs"],
        demand: 95,
        icon: "🤖",
        iconBg: "linear-gradient(135deg,#6366F1,#8B5CF6)",
        tagColor: "rgba(99,102,241,0.15)", tagText: "#A78BFA", tagBorder: "rgba(99,102,241,0.3)",
        demandColor: "#22D3EE",
        saved: false,
    },
    {
        id: 2, title: "Product Manager",
        inr: "₹15L – ₹40L", usd: "$100K – $180K",
        tags: ["Strategy", "Analytics", "UX"],
        demand: 88,
        icon: "🗂️",
        iconBg: "linear-gradient(135deg,#7C3AED,#4F46E5)",
        tagColor: "rgba(124,58,237,0.12)", tagText: "#C4B5FD", tagBorder: "rgba(124,58,237,0.3)",
        demandColor: "#10B981",
        saved: false,
    },
    {
        id: 3, title: "Data Scientist",
        inr: "₹12L – ₹35L", usd: "$95K – $175K",
        tags: ["Python", "SQL", "ML"],
        demand: 90,
        icon: "📊",
        iconBg: "linear-gradient(135deg,#0891B2,#0284C7)",
        tagColor: "rgba(8,145,178,0.12)", tagText: "#67E8F9", tagBorder: "rgba(8,145,178,0.3)",
        demandColor: "#22D3EE",
        saved: false,
    },
    {
        id: 4, title: "Cloud Architect",
        inr: "₹20L – ₹55L", usd: "$130K – $230K",
        tags: ["AWS", "GCP", "DevOps"],
        demand: 92,
        icon: "☁️",
        iconBg: "linear-gradient(135deg,#1D4ED8,#2563EB)",
        tagColor: "rgba(29,78,216,0.12)", tagText: "#93C5FD", tagBorder: "rgba(29,78,216,0.3)",
        demandColor: "#A78BFA",
        saved: false,
    },
    {
        id: 5, title: "UX / UI Designer",
        inr: "₹8L – ₹28L", usd: "$70K – $140K",
        tags: ["Figma", "Research", "Prototyping"],
        demand: 80,
        icon: "🎨",
        iconBg: "linear-gradient(135deg,#DB2777,#E11D48)",
        tagColor: "rgba(219,39,119,0.12)", tagText: "#F9A8D4", tagBorder: "rgba(219,39,119,0.3)",
        demandColor: "#F59E0B",
        saved: false,
    },
    {
        id: 6, title: "Cybersecurity Analyst",
        inr: "₹10L – ₹32L", usd: "$85K – $160K",
        tags: ["Security", "Networking", "SIEM"],
        demand: 94,
        icon: "🔐",
        iconBg: "linear-gradient(135deg,#B45309,#D97706)",
        tagColor: "rgba(180,83,9,0.12)", tagText: "#FCD34D", tagBorder: "rgba(180,83,9,0.3)",
        demandColor: "#22D3EE",
        saved: false,
    },
    {
        id: 7, title: "DevOps Engineer",
        inr: "₹14L – ₹40L", usd: "$100K – $190K",
        tags: ["Docker", "K8s", "CI/CD"],
        demand: 89,
        icon: "⚙️",
        iconBg: "linear-gradient(135deg,#047857,#059669)",
        tagColor: "rgba(4,120,87,0.12)", tagText: "#6EE7B7", tagBorder: "rgba(4,120,87,0.3)",
        demandColor: "#10B981",
        saved: false,
    },
    {
        id: 8, title: "Full Stack Developer",
        inr: "₹10L – ₹30L", usd: "$80K – $160K",
        tags: ["React", "Node", "PostgreSQL"],
        demand: 85,
        icon: "💻",
        iconBg: "linear-gradient(135deg,#0369A1,#0284C7)",
        tagColor: "rgba(3,105,161,0.12)", tagText: "#7DD3FC", tagBorder: "rgba(3,105,161,0.3)",
        demandColor: "#A78BFA",
        saved: false,
    },
];

const FILTERS = ["All", "Engineering", "Design", "Data", "Management", "Security", "Cloud"];

/* ── STAR SVG ────────────────────────────────────────────── */
const Star = ({
    x,
    y,
    size = 3,
    opacity,
    duration,
    delay,
}) => (
    <div
        className={styles.star}
        style={{
            "--x": `${x}%`,
            "--y": `${y}%`,
            "--size": `${size}px`,
            "--opacity": opacity,
            "--duration": `${duration}s`,
            "--delay": `${delay}s`,
        }}
    />
);

/* ── DEMAND BAR ──────────────────────────────────────────── */
function DemandBar({ pct, color }) {
    return (
        <div className={styles.demandBar}>

            <span className={styles.label}>
                Demand:
            </span>

            <div className={styles.progressTrack}>

                <div
                    className={styles.progressFill}
                    style={{
                        "--progress": `${pct}%`,
                        "--progress-color": color,
                    }}
                />

            </div>

            <span
                className={styles.percentage}
                style={{ color }}
            >
                {pct}%
            </span>

        </div>
    );
}

/* ── CAREER CARD ─────────────────────────────────────────── */
function CareerCard({ career, onSave }) {
    const [saved, setSaved] = useState(career.saved);
    return (
        <div className={`${styles.careerCard} ${styles.cardAnimate}`}>

            {/* Bookmark */}

            <button
                className={`${styles.bookmarkButton} ${saved ? styles.saved : ""}`}
                onClick={() => {
                    setSaved((prev) => !prev);
                    onSave?.(career.id);
                }}
            >
                🔖
            </button>

            {/* Header */}

            <div className={styles.cardHeader}>

                <div
                    className={styles.iconWrapper}
                    style={{ background: career.iconBg }}
                >
                    {career.icon}
                </div>

                <div className={styles.cardTitleSection}>

                    <h3 className={styles.cardTitle}>
                        {career.title}
                    </h3>

                    <div className={styles.salaryRow}>

                        <span className={styles.salaryIndia}>
                            {career.inr}
                        </span>

                        <span className={styles.salaryDivider}>
                            •
                        </span>

                        <span className={styles.salaryGlobal}>
                            {career.usd}
                        </span>

                    </div>

                </div>

            </div>

            {/* Tags */}

            <div className={styles.tagContainer}>
                {career.tags.map((tag) => (
                    <span
                        key={tag}
                        className={styles.tag}
                        style={{
                            background: career.tagColor,
                            color: career.tagText,
                            borderColor: career.tagBorder,
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Demand */}

            <DemandBar
                pct={career.demand}
                color={career.demandColor}
            />

            {/* Button */}

            <button className={styles.exploreButton}>
                Explore This Path
                <span className={styles.arrow}>
                    →
                </span>
            </button>

        </div>
    );
}

/* ── HERO ILLUSTRATION ───────────────────────────────────── */
function HeroIllus() {
    return (
        <div className={styles.heroIllustration}>

            {/* Stars */}
            {STARS.map((star, index) => (
                <Star key={index} {...star} />
            ))}

            {/* Road */}
            <svg
                viewBox="0 0 340 200"
                className={styles.roadSvg}
            >
                <path
                    d="M170 190 Q120 150 100 110 Q80 70 130 50 Q170 35 200 20"
                    className={styles.roadGlow}
                />

                <path
                    d="M170 190 Q120 150 100 110 Q80 70 130 50 Q170 35 200 20"
                    className={styles.roadPath}
                />

                <path
                    d="M170 190 Q120 150 100 110 Q80 70 130 50 Q170 35 200 20"
                    className={styles.roadOuterGlow}
                />
            </svg>

            {/* Floating Icons */}
            {[
                {
                    icon: "⭐",
                    top: "15%",
                    left: "15%",
                    duration: "2.5s",
                    delay: "0s"
                },
                {
                    icon: "🏆",
                    top: "38%",
                    left: "20%",
                    duration: "2.9s",
                    delay: ".6s",
                    large: true
                },
                {
                    icon: "📊",
                    top: "10%",
                    right: "20%",
                    duration: "3.3s",
                    delay: "1.1s"
                },
                {
                    icon: "🎯",
                    top: "52%",
                    right: "12%",
                    duration: "3.7s",
                    delay: ".4s"
                }
            ].map((item, index) => (
                <div
                    key={index}
                    className={`${styles.floatCard} ${item.large ? styles.largeCard : ""}`}
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        "--duration": item.duration,
                        "--delay": item.delay
                    }}
                >
                    {item.icon}
                </div>
            ))}

            {/* Goal Flag */}

            <div className={styles.goalFlag}>
                🚩
            </div>

        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════ */
export default function AiCareearPath() {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState("All");
    const [careers, setCareers] = useState(CAREERS);
    const [filtered, setFiltered] = useState(CAREERS);
    const [searching, setSearching] = useState(false);
    const inputRef = useRef();

    /* filter logic */
    useEffect(() => {
        const searchQuery = query.toLowerCase().trim();

        const filterMap = {
            Engineering: [
                "AI / ML Engineer",
                "DevOps Engineer",
                "Full Stack Developer",
                "Cloud Architect",
            ],
            Design: ["UX / UI Designer"],
            Data: ["Data Scientist", "AI / ML Engineer"],
            Management: ["Product Manager"],
            Security: ["Cybersecurity Analyst"],
            Cloud: ["Cloud Architect", "DevOps Engineer"],
        };

        let filteredCareers = [...careers];

        // Category Filter
        if (active !== "All") {
            filteredCareers = filteredCareers.filter((career) =>
                filterMap[active]?.includes(career.title)
            );
        }

        // Search Filter
        if (searchQuery) {
            filteredCareers = filteredCareers.filter(
                (career) =>
                    career.title.toLowerCase().includes(searchQuery) ||
                    career.tags.some((tag) =>
                        tag.toLowerCase().includes(searchQuery)
                    )
            );
        }

        setFiltered(filteredCareers);

    }, [query, active, careers]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearching(true);
        setTimeout(() => setSearching(false), 600);
    };

    return (
        <>
            <div className={styles.pageContainer}>

                {/* ── HERO ── */}
                <div className={styles.heroSection}>

                    {/* Left Content */}
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Explore Career Paths
                        </h1>

                        <p className={styles.heroDescription}>
                            Discover the most in-demand, high-growth careers of 2026
                            <br />
                            with real salary data and AI-powered entry roadmaps.
                        </p>

                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className={styles.searchForm}
                        >
                            <div className={styles.searchWrapper}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={styles.searchIcon}
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35" />
                                </svg>

                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search careers, roles or skills (e.g. Frontend Developer, Data Scientist...)"
                                    className={styles.searchInput}
                                />

                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        className={styles.clearButton}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={styles.searchButton}
                            >
                                {searching ? (
                                    <>
                                        <div className={styles.loader}></div>
                                        Searching
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="M21 21l-4.35-4.35" />
                                        </svg>
                                        Search
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Hero Illustration */}
                    <div className={styles.heroImage}>
                        <HeroIllus />
                    </div>

                </div>

                {/* ── FILTER CHIPS ── */}
                <div className={styles.filterSection}>
                    <div className={styles.filterContainer}>
                        <div className={styles.filterChips}>
                            {FILTERS.map((f) => {
                                const isActive = active === f;
                                return (
                                    <button
                                        key={f}
                                        onClick={() => setActive(f)}
                                        className={`${styles.filterChip} ${isActive ? styles.activeFilter : ""}`}
                                    >
                                        {f}
                                    </button>
                                );
                            })}
                        </div>
                        <div className={styles.filterInfo}>
                            <span>
                                {filtered.length} career{filtered.length !== 1 ? "s" : ""} found
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── GRID ── */}
                <div className={styles.careerSection}>
                    {filtered.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>🔍</div>

                            <h3 className={styles.emptyTitle}>
                                No careers match "{query}"
                            </h3>

                            <p className={styles.emptyDescription}>
                                Try a different skill or role name.
                            </p>

                            <button
                                onClick={() => {
                                    setQuery("");
                                    setActive("All");
                                }}
                                className={styles.clearSearchButton}
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : (
                        <div
                            className={styles.cardsGrid}
                            key={active + query}
                        >
                            {filtered.map((career) => (
                                <CareerCard
                                    key={career.id}
                                    career={career}
                                    onSave={(id) =>
                                        setCareers((prev) =>
                                            prev.map((item) =>
                                                item.id === id
                                                    ? {
                                                        ...item,
                                                        saved: !item.saved,
                                                    }
                                                    : item
                                            )
                                        )
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ── FOOTER NOTE ── */}
                <div className={styles.infoSection}>
                    <div className={styles.infoContainer}>
                        <svg
                            className={styles.infoIcon}
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>

                        <span className={styles.infoText}>
                            Salary ranges are estimates for India (INR) and Global (USD)
                            based on 2026 projections.
                        </span>

                    </div>
                </div>
            </div>
        </>
    );
}

/* spin keyframe for search button */
const extraStyle = document.createElement("style");
extraStyle.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
document.head?.appendChild(extraStyle);