import { useState, useRef, useCallback } from "react";
import styles from "../CSS/resumeAnalyze.module.css"
import api from "../api/axios.js"

/* ── PALETTE (from screenshot) ──────────────────────────── */
const C = {
    bg: "#0D1117",
    surface: "#161B26",
    card: "#1C2333",
    cardAlt: "#1A2030",
    border: "rgba(255,255,255,0.08)",
    borderHi: "rgba(255,255,255,0.14)",
    text: "#E6EDF3",
    sub: "#8B949E",
    muted: "#484F58",
    purple: "#8B5CF6",
    purpleD: "#6D28D9",
    blue: "#3B82F6",
    cyan: "#06B6D4",
    green: "#10B981",
    amber: "#F59E0B",
    orange: "#F97316",
    red: "#EF4444",
    pink: "#EC4899",
};

/* ── SCORE RING ─────────────────────────────────────────── */
function ScoreRing({
    score = 0,
    size = 120,
    stroke = 10,
}) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    const progress = Math.min(Math.max(score, 0), 100);

    const offset = circumference - (progress / 100) * circumference;

    const scoreColor =
        progress >= 80
            ? C.green
            : progress >= 60
                ? C.amber
                : C.red;

    return (
        <div
            style={{
                position: "relative",
                width: size,
                height: size,
            }}
        >
            <svg
                width={size}
                height={size}
                style={{ transform: "rotate(-90deg)" }}
            >
                {/* Background */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={stroke}
                />

                {/* Progress */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={scoreColor}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        transition: "stroke-dashoffset 1s ease",
                        filter: `drop-shadow(0 0 8px ${scoreColor})`,
                    }}
                />
            </svg>

            {/* Score */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontSize: 32,
                        fontWeight: 800,
                        color: scoreColor,
                    }}
                >
                    {progress}
                </h2>

                <span
                    style={{
                        fontSize: 12,
                        color: C.sub,
                    }}
                >
                    ATS Score
                </span>
            </div>
        </div>
    );
}

/* ── BAR ────────────────────────────────────────────────── */
function Bar({ pct, color }) {
    return (
        <div className={styles.progressBar}>
            <div
                className={styles.progressFill}
                style={{
                    width: `${pct}%`,
                    background: color,
                }}
            />
        </div>
    );
}

/* ── TAG ─────────────────────────────────────────────────── */
function Tag({ label, color = "rgba(99,102,241,0.15)", text = "#818CF8", border = "rgba(99,102,241,0.3)" }) {
    return (
        <span
            className={styles.tag}
            style={{
                background: color,
                border: `1px solid ${border}`,
                color: text,
            }}
        >
            {label}
        </span>
    );
}

/* ── STAT PILL ───────────────────────────────────────────── */
function StatPill({ icon, label, value, color }) {
    return (
        <div className={styles.statPill}>
            <span
                className={styles.statIcon}
                style={{ color }}
            >
                {icon}
            </span>

            <div>
                <div className={styles.statValue}>
                    {value}
                </div>

                <div className={styles.statLabel}>
                    {label}
                </div>
            </div>
        </div>
    );
}

/* ── SECTION CARD ────────────────────────────────────────── */
function SCard({ title, icon, iconColor, children, style = {} }) {
    return (
        <div
            className={styles.sCard}
            style={style}
        >
            <div className={styles.sCardHeader}>
                <span
                    className={styles.sCardIcon}
                    style={{ color: iconColor }}
                >
                    {icon}
                </span>

                <span className={styles.sCardTitle}>
                    {title}
                </span>
            </div>

            {children}
        </div>
    );
}

/* ── METRIC CARD ─────────────────────────────────────────── */
function MetricCard({ label, value, status, statusColor, barColor, barPct }) {
    return (
        <div className={styles.metricCard}>
            <div className={styles.metricLabel}>
                {label}
            </div>

            <div className={styles.metricValue}>
                {value}
            </div>

            <div
                className={styles.metricStatus}
                style={{ color: statusColor }}
            >
                {status}
            </div>

            <Bar pct={barPct} color={barColor} />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function ResumeAnalyze() {
    const [file, setFile] = useState(null);
    const [role, setRole] = useState("Frontend Developer");
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [previewPage, setPreviewPage] = useState(1);
    const [showNext, setShowNext] = useState(false);
    const fileRef = useRef();

    const ROLES = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Machine Learning Engineer", "DevOps Engineer", "UI/UX Designer", "Product Manager", "Android Developer", "iOS Developer", "Cloud Engineer"];

    /* ── file pick ── */
    const handleFile = (file) => {
        if (!file) return;

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please upload a PDF or Word document.");
            return;
        }

        setFile(file);
        setAnalysis(null);
        setShowNext(false);
    };

    const onDrop = useCallback((e) => {
        e.preventDefault(); setDragging(false);
        handleFile(e.dataTransfer.files[0]);
    }, []);

    /* ── analyze ── */
    const analyze = async () => {
        if (!file) {
            alert("Please upload a resume first.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("resumeFile", file);
            formData.append("role", role);
            console.log(role, " ", file)

            const response = await api.post("/resume/upload", formData);

            console.log(response.data);

            setAnalysis(response.dataresumeData
            );

            setShowNext(true);

        } catch (error) {
            console.error("Failed to analyze resume:", error);
        } finally {
            setLoading(false);
        }
    };

    const metricColor = (c) => c === "red" ? C.red : c === "green" ? C.green : c === "amber" ? C.amber : C.blue;
    const atsColor = (s) => s >= 70 ? C.green : s >= 50 ? C.amber : C.red;

    /* ── RESUME PREVIEW MOCK ── */
    const ResPreview = () => (
        <div style={{ background: "#fff", color: "#111", fontFamily: "Georgia, serif", padding: 16, fontSize: 7.5, lineHeight: 1.5, borderRadius: 4, height: "100%", overflow: "hidden" }}>
            <div style={{ textAlign: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: 8, marginBottom: 8 }}>
                <div style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 800, color: "#1a202c" }}>RAHUL BIRAJDAR</div>
                <div style={{ color: C.purple, fontSize: 8, fontWeight: 600 }}>{role}</div>
                <div style={{ fontSize: 6.5, color: "#4a5568", marginTop: 3 }}>rahulbirajdar@gmail.com • +91 1234567890 • Solapur, Maharashtra</div>
                <div style={{ fontSize: 6.5, color: "#4a5568" }}>linkedin.com/in/rahul-birajdar • github.com/rahul-birajdar</div>
            </div>
            <div style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3, color: "#2d3748" }}>SUMMARY</div>
            <div style={{ fontSize: 6.5, color: "#4a5568", marginBottom: 8 }}>Passionate B.Sc. student skilled in HTML, CSS, JavaScript, React.js. Eager to build user-friendly web apps and contribute to frontend development.</div>
            <div style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3, color: "#2d3748" }}>SKILLS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, marginBottom: 8 }}>
                {["HTML", "JavaScript", "React.js", "Web Development", "User Interface Design", "Problem-solving", "Multilingual English", "Key libraries: React"].map(s => (
                    <div key={s} style={{ fontSize: 6.5, color: "#4a5568" }}>• {s}</div>
                ))}
            </div>
            <div style={{ fontSize: 7.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3, color: "#2d3748" }}>PROJECTS</div>
            <div style={{ fontSize: 6.5, color: "#4a5568", marginBottom: 2 }}><strong>1. Personal Portfolio Website</strong></div>
            <div style={{ fontSize: 6.5, color: "#718096" }}>Built a responsive portfolio using HTML, CSS, and JavaScript...</div>
        </div>
    );

    /* ─────────────────────────────────────────────────────── */
    return (
        <>
            <div className={styles.resumeAnalyzer}>

                {/* ══ LEFT SIDEBAR ══ */}
                <div className={styles.leftPanel}>
                    {/* Step 1 — Upload */}
                    <div className={styles.uploadSection}>
                        <div className={styles.uploadHeader}>
                            <div className={styles.stepCircle}>1</div>
                            <span className={styles.stepTitle}>Upload Resume</span>
                        </div>

                        <div
                            className={`${styles.uploadDropzone} ${dragging ? styles.dragging : ""
                                }`}
                            onClick={() => fileRef.current?.click()}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragging(true);
                            }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={onDrop}
                        >
                            <div className={styles.uploadIcon}>☁️</div>

                            <div className={styles.uploadTitle}>
                                Drag & drop your resume here
                            </div>

                            <div className={styles.uploadSubtitle}>
                                Supports PDF, DOCX, TXT (Max 5MB)
                            </div>

                            <button className={styles.browseBtn}>
                                Browse File
                            </button>

                            <input
                                ref={fileRef}
                                type="file"
                                accept=".pdf,.doc,.docx,.txt"
                                className={styles.fileInput}
                                onChange={(e) => handleFile(e.target.files[0])}
                            />
                        </div>

                        {file && (
                            <div className={styles.fileChip}>
                                <span className={styles.fileIcon}>📄</span>

                                <div className={styles.fileInfo}>
                                    <div className={styles.fileName}>
                                        {file.name}
                                    </div>

                                    <div className={styles.fileSize}>
                                        {(file.size / 1024).toFixed(0)} KB
                                    </div>
                                </div>

                                <span className={styles.fileSuccess}>✅</span>
                            </div>
                        )}
                    </div>

                    {/* Step 2 — Role */}
                    <div className={styles.roleSection}>
                        <div className={styles.roleHeader}>
                            <div className={styles.stepCircle}>2</div>
                            <span className={styles.stepTitle}>Target Job Role</span>
                        </div>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className={styles.roleSelect}
                        >
                            {ROLES.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={analyze}
                            disabled={loading}
                            className={`${styles.analyzeBtn} ${loading ? styles.loadingBtn : ""
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className={styles.loader}></div>
                                    Analyzing...
                                </>
                            ) : (
                                <>✨ Analyze Resume</>
                            )}
                        </button>

                        <p className={styles.analyzeInfo}>
                            Our AI will analyze your resume and provide insights
                        </p>
                    </div>

                    {/* Step 3 — Preview */}
                    <div className={styles.previewSection}>
                        <div className={styles.previewHeader}>
                            <div className={styles.previewTitle}>
                                <span className={styles.previewIcon}>📋</span>
                                <span className={styles.previewText}>Resume Preview</span>
                            </div>

                            <div className={styles.previewActions}>
                                <span className={styles.pageCount}>
                                    {previewPage} / 2
                                </span>

                                <button
                                    className={styles.iconBtn}
                                    onClick={() =>
                                        setPreviewPage((p) => Math.max(1, p - 1))
                                    }
                                >
                                    −
                                </button>

                                <button
                                    className={styles.iconBtn}
                                    onClick={() =>
                                        setPreviewPage((p) => Math.min(2, p + 1))
                                    }
                                >
                                    +
                                </button>

                                <button className={styles.iconBtn}>
                                    ⤢
                                </button>
                            </div>
                        </div>

                        <div className={styles.previewContainer}>
                            {file ? (
                                <ResPreview />
                            ) : (
                                <div className={styles.previewPlaceholder}>
                                    <span className={styles.placeholderIcon}>📄</span>
                                    <span className={styles.placeholderText}>
                                        Upload a resume to preview
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ══ MAIN PANEL ══ */}
                <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>

                    {!analysis && !loading && (
                        <div className={styles.emptyState}>
                            <div className={styles.robotIcon}>🤖</div>

                            <h2 className={styles.emptyTitle}>
                                AI Resume Analyzer
                            </h2>

                            <p className={styles.emptyDescription}>
                                Upload your resume, select your target role, and get a detailed
                                AI-powered ATS analysis with actionable improvements.
                            </p>

                            <div className={styles.featureGrid}>
                                {[
                                    ["📊", "ATS Score"],
                                    ["🔍", "Keyword Gap"],
                                    ["💡", "Suggestions"],
                                    ["✅", "Strengths"],
                                    ["⚠️", "Weaknesses"],
                                    ["🚀", "Action Plan"],
                                ].map(([icon, label]) => (
                                    <div key={label} className={styles.featureCard}>
                                        <span>{icon}</span>
                                        <span className={styles.featureLabel}>{label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className={styles.loadingContainer}>
                            <div className={styles.loadingSpinner}></div>

                            <div className={styles.loadingTitle}>
                                Analyzing your resume...
                            </div>

                            <div className={styles.loadingSubtitle}>
                                AI is reviewing every section for ATS compatibility
                            </div>

                            <div className={styles.loadingSteps}>
                                {[
                                    "Parsing resume",
                                    "Checking keywords",
                                    "Scoring sections",
                                    "Generating report",
                                ].map((step, index) => (
                                    <div
                                        key={step}
                                        className={styles.loadingChip}
                                        style={{ animationDelay: `${index * 0.3}s` }}
                                    >
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {analysis && (
                        <div style={{ padding: "20px 22px 32px" }}>

                            {/* ── HEADER ── */}
                            <div className={`${styles.analysisHeader} fadeUp`}>
                                <div>
                                    <div className={styles.analysisTitle}>
                                        <span className={styles.analysisIcon}>✨</span>
                                        <h1 className={styles.analysisHeading}>
                                            AI Analysis Results
                                        </h1>
                                    </div>

                                    <p className={styles.analysisSubHeading}>
                                        Detailed analysis of your resume
                                    </p>
                                </div>

                                <div className={styles.analysisActions}>
                                    <button className={styles.actionBtn}>
                                        ⬇️ Download Report
                                    </button>

                                    <button className={styles.actionBtn}>
                                        🔗 Share Report
                                    </button>
                                </div>
                            </div>

                            {/* ── ROW 1: ATS + 4 METRICS ── */}
                            <div className={`${styles.resultRow} fadeUp`}>

                                {/* ATS Score */}
                                <div className={styles.atsCard}>

                                    <div>
                                        <div className={styles.atsTitle}>ATS Score</div>

                                        <div className={styles.scoreWrapper}>
                                            <ScoreRing
                                                score={analysis.atsScore}
                                                size={110}
                                                stroke={9}
                                            />

                                            <div className={styles.scoreContent}>
                                                <div
                                                    className={styles.scoreValue}
                                                    style={{ color: atsColor(analysis.atsScore) }}
                                                >
                                                    {analysis.atsScore}
                                                </div>

                                                <div className={styles.scoreOutOf}>
                                                    /100
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div
                                            className={styles.atsLabel}
                                            style={{ color: atsColor(analysis.atsScore) }}
                                        >
                                            {analysis.atsLabel}
                                        </div>

                                        <div className={styles.atsMessage}>
                                            {analysis.atsMessage}
                                        </div>

                                        <button className={styles.detailsBtn}>
                                            View Details →
                                        </button>
                                    </div>

                                </div>

                                {/* Metric Cards */}

                                <div className={styles.metricCards}>

                                    <MetricCard
                                        label="Keyword Match"
                                        value={`${analysis.keywordMatch.pct}%`}
                                        status={analysis.keywordMatch.label}
                                        statusColor={metricColor(analysis.keywordMatch.color)}
                                        barColor={metricColor(analysis.keywordMatch.color)}
                                        barPct={analysis.keywordMatch.pct}
                                    />

                                    <MetricCard
                                        label="Formatting"
                                        value={`${analysis.formatting.pct}%`}
                                        status={analysis.formatting.label}
                                        statusColor={metricColor(analysis.formatting.color)}
                                        barColor={metricColor(analysis.formatting.color)}
                                        barPct={analysis.formatting.pct}
                                    />

                                    <MetricCard
                                        label="Content Quality"
                                        value={`${analysis.contentQuality.pct}%`}
                                        status={analysis.contentQuality.label}
                                        statusColor={metricColor(analysis.contentQuality.color)}
                                        barColor={metricColor(analysis.contentQuality.color)}
                                        barPct={analysis.contentQuality.pct}
                                    />

                                    <MetricCard
                                        label="Skills Match"
                                        value={`${analysis.skillsMatch.pct}%`}
                                        status={analysis.skillsMatch.label}
                                        statusColor={metricColor(analysis.skillsMatch.color)}
                                        barColor={metricColor(analysis.skillsMatch.color)}
                                        barPct={analysis.skillsMatch.pct}
                                    />

                                </div>

                            </div>

                            {/* ── ROW 2: STAT PILLS ── */}
                            <div className={`${styles.statsRow} fadeUp2`}>
                                <StatPill
                                    icon="📄"
                                    label="Pages"
                                    value={analysis.pages}
                                    color="var(--blue)"
                                />

                                <StatPill
                                    icon="Tᴛ"
                                    label="Word Count"
                                    value={analysis.wordCount}
                                    color="var(--cyan)"
                                />

                                <StatPill
                                    icon="🕐"
                                    label="Reading Time"
                                    value={analysis.readingTime}
                                    color="var(--amber)"
                                />

                                <StatPill
                                    icon="💻"
                                    label="Skills Found"
                                    value={analysis.skillsFound}
                                    color="var(--green)"
                                />

                                <StatPill
                                    icon="⚠️"
                                    label="Missing Skills"
                                    value={analysis.missingSkillsCount}
                                    color="var(--orange)"
                                />

                                <StatPill
                                    icon="🔍"
                                    label="Keywords"
                                    value={`${analysis.keywordsPct}%`}
                                    color="var(--pink)"
                                />
                            </div>

                            {/* ── ROW 3: STRENGTHS + MISSING ── */}
                            <div className={`${styles.skillGrid} fadeUp2`}>
                                <SCard
                                    title="Strengths"
                                    icon="✅"
                                    iconColor="var(--green)"
                                >
                                    <div className={styles.tagContainer}>
                                        {analysis.strengths.map((skill) => (
                                            <Tag
                                                key={skill}
                                                label={skill}
                                                color="rgba(16,185,129,0.1)"
                                                text="#34D399"
                                                border="rgba(16,185,129,0.25)"
                                            />
                                        ))}
                                    </div>
                                </SCard>

                                <SCard
                                    title="Missing Skills"
                                    icon="⚡"
                                    iconColor="var(--amber)"
                                >
                                    <div className={styles.tagContainer}>
                                        {analysis.missingSkills.map((skill) => (
                                            <Tag
                                                key={skill}
                                                label={skill}
                                                color="rgba(245,158,11,0.08)"
                                                text="#FCD34D"
                                                border="rgba(245,158,11,0.25)"
                                            />
                                        ))}
                                    </div>
                                </SCard>
                            </div>

                            {/* ── ROW 4: WEAKNESSES + SUGGESTIONS ── */}
                            <div className={`${styles.infoGrid} fadeUp3`}>
                                <SCard
                                    title="Weaknesses"
                                    icon="⚠️"
                                    iconColor="var(--red)"
                                >
                                    {analysis.weaknesses.map((item, index) => (
                                        <div key={index} className={styles.listItem}>
                                            <div className={styles.bullet}></div>

                                            <span className={styles.listText}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </SCard>

                                <SCard
                                    title="Suggestions"
                                    icon="💡"
                                    iconColor="var(--blue)"
                                >
                                    {analysis.suggestions.map((item, index) => (
                                        <div key={index} className={styles.suggestionItem}>
                                            <div className={styles.suggestionNumber}>
                                                {index + 1}
                                            </div>

                                            <span className={styles.listText}>
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </SCard>
                            </div>

                            {/* ── ROW 5: RECOMMENDED ACTIONS ── */}
                            <div className={`${styles.actionSection} fadeUp3`}>
                                <div className={styles.actionHeader}>
                                    <span className={styles.actionHeaderIcon}>⭐</span>
                                    <span className={styles.actionHeaderTitle}>
                                        Recommended Actions
                                    </span>
                                </div>

                                <div className={styles.actionList}>
                                    {analysis.actions.map((action, index) => (
                                        <div key={index} className={styles.actionItem}>

                                            <div className={styles.actionCard}>
                                                <div className={styles.actionCardHeader}>

                                                    <div className={styles.actionIcon}>
                                                        {["📋", "✏️", "➕", "🔍"][index]}
                                                    </div>

                                                    <span className={styles.actionTitle}>
                                                        {action.step}. {action.title}
                                                    </span>

                                                </div>

                                                <div className={styles.actionDescription}>
                                                    {action.desc}
                                                </div>
                                            </div>

                                            {index < analysis.actions.length - 1 && (
                                                <div className={styles.arrow}>→</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── NEXT STEP FLOAT ── */}
                {showNext && (
                    <div className={styles.nextStepCard}>
                        <button
                            className={styles.closeBtn}
                            onClick={() => setShowNext(false)}
                        >
                            ✕
                        </button>

                        <div className={styles.nextStepHeader}>
                            <span className={styles.nextStepIcon}>🚀</span>
                            <span className={styles.nextStepTitle}>Next Step</span>
                        </div>

                        <p className={styles.nextStepText}>
                            Improve your resume with our AI Resume Builder
                        </p>

                        <button className={styles.nextStepButton}>
                            Improve Now →
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}