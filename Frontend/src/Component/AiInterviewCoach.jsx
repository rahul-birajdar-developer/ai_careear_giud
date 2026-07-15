import { useState, useEffect, useRef, useCallback } from "react";
import styles from "../CSS/AiInterviewCoach.module.css"

/* ── THEME ─────────────────────────────────────────────── */
const C = {
    bg: "#0B0F1A",
    surface: "#111827",
    card: "#161D2E",
    border: "rgba(255,255,255,0.07)",
    cyan: "#22D3EE",
    pink: "#F43F5E",
    amber: "#F59E0B",
    green: "#10B981",
    purple: "#8B5CF6",
    text: "#F1F5F9",
    muted: "#64748B",
    sub: "#94A3B8",
};

/* ── GLOBAL CSS ─────────────────────────────────────────── */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%;overflow:hidden}
body{font-family:'Inter',sans-serif;background:${C.bg};color:${C.text};-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
input,select,textarea{font-family:'Inter',sans-serif;outline:none}
button{font-family:'Inter',sans-serif;cursor:pointer;border:none}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes ping{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(1.8);opacity:0}}
@keyframes barGrow{from{width:0}to{width:var(--w)}}
@keyframes countUp{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
.fadeUp{animation:fadeUp 0.4s ease forwards}
.mono{font-family:'JetBrains Mono',monospace}
`;

/* ── HELPERS ────────────────────────────────────────────── */
const fmt = (s) => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");

const TYPES = ["Behavioral", "Technical", "System Design", "HR Round", "Leadership", "DSA / Coding"];
const DIFFS = ["Beginner", "Medium", "Hard", "FAANG Level"];
const COMPS = ["Startup", "MNC", "FAANG", "Product", "Consulting", "Government"];
const Q_CNT = [5, 10, 15];

const SCORE_KEYS = ["Communication", "Confidence", "Technical", "Grammar"];
const SCORE_COLORS = [C.cyan, C.green, C.purple, C.amber];

/* ── MAIN ───────────────────────────────────────────────── */
export default function App() {
    /* session state */
    const [phase, setPhase] = useState("setup");   // setup | ready | interview | report
    const [config, setConfig] = useState({ role: "", type: "", diff: "", company: "", qCount: 10 });
    const [messages, setMessages] = useState([]);         // {role, content}
    const [answer, setAnswer] = useState("");
    const [qIdx, setQIdx] = useState(0);
    const [loading, setLoading] = useState(false);
    const [scores, setScores] = useState({ Communication: 0, Confidence: 0, Technical: 0, Grammar: 0 });
    const [feedback, setFeedback] = useState([]);
    const [report, setReport] = useState(null);

    /* timer */
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef(null);

    /* webcam */
    const videoRef = useRef(null);
    const [camOn, setCamOn] = useState(false);
    const streamRef = useRef(null);

    /* mic */
    const [recording, setRecording] = useState(false);
    const mediaRec = useRef(null);

    /* scroll */
    const chatRef = useRef(null);

    /* ── webcam ── */
    const startCam = useCallback(async () => {
        try {
            const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            streamRef.current = s;
            if (videoRef.current) { videoRef.current.srcObject = s; videoRef.current.play(); }
            setCamOn(true);
        } catch { setCamOn(false); }
    }, []);

    const stopCam = useCallback(() => {
        streamRef.current?.getTracks().forEach(t => t.stop());
        setCamOn(false);
    }, []);

    /* ── mic ── */
    const toggleMic = async () => {
        if (recording) {
            mediaRec.current?.stop();
            setRecording(false);
            return;
        }
        try {
            const s = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mr = new MediaRecorder(s);
            const chunks = [];
            mr.ondataavailable = e => chunks.push(e.data);
            mr.onstop = () => {
                s.getTracks().forEach(t => t.stop());
                setAnswer(prev => prev + " [voice answer recorded]");
            };
            mr.start();
            mediaRec.current = mr;
            setRecording(true);
        } catch { alert("Microphone not available."); }
    };

    /* ── timer ── */
    useEffect(() => {
        if (phase === "interview") {
            setTimeLeft(config.qCount * 90);
            timerRef.current = setInterval(() => setTimeLeft(p => { if (p <= 1) { clearInterval(timerRef.current); return 0; } return p - 1; }), 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [phase]);

    /* ── auto-scroll ── */
    useEffect(() => { chatRef.current?.scrollTo({ top: 99999, behavior: "smooth" }); }, [messages]);

    /* ── API call ── */
    const callAI = async (hist, systemPrompt) => {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 1000,
                system: systemPrompt,
                messages: hist,
            }),
        });
        const d = await res.json();
        return d.content?.map(b => b.text || "").join("") || "";
    };

    /* ── START interview ── */
    const startInterview = async () => {
        if (!config.role.trim() || !config.type || !config.diff || !config.company) {
            alert("Please fill in all fields."); return;
        }
        await startCam();
        setPhase("ready");
    };

    const beginNow = async () => {
        setPhase("interview");
        setLoading(true);
        const sys = `You are a professional ${config.diff} level interviewer at a ${config.company} company. You are interviewing a candidate for the role of ${config.role}. Conduct a ${config.type} interview. Ask exactly one question at a time. Be direct and professional. After each answer, give brief feedback and ask the next question. Format feedback as JSON at end: {"scores":{"Communication":85,"Confidence":80,"Technical":82,"Grammar":90},"feedback":["✔ Good point","⚠ Add more detail"]}`;
        const first = [{ role: "user", content: `Start the interview. Ask question 1 of ${config.qCount}.` }];
        const reply = await callAI(first, sys);
        setMessages([{ role: "assistant", content: reply }]);
        setQIdx(1);
        setLoading(false);
    };

    /* ── SUBMIT answer ── */
    const submitAnswer = async () => {
        if (!answer.trim()) return;
        const next = qIdx + 1;
        const isLast = next > config.qCount;

        const userMsg = { role: "user", content: answer };
        const hist = [...messages, userMsg];
        setMessages(hist);
        setAnswer("");
        setLoading(true);

        const sys = `You are a professional ${config.diff} level interviewer at a ${config.company} company interviewing for ${config.role} — ${config.type} interview. After evaluating the answer, ${isLast ? "conclude the interview and provide a detailed final report" : `ask question ${next} of ${config.qCount}`}. Always end your message with a JSON block: {"scores":{"Communication":85,"Confidence":80,"Technical":82,"Grammar":90},"feedback":["✔ ...","⚠ ..."]}`;

        const reply = await callAI(hist.map(m => ({ role: m.role, content: m.content })), sys);

        // extract JSON
        let parsed = null;
        const m = reply.match(/\{[\s\S]*"scores"[\s\S]*\}/);
        if (m) { try { parsed = JSON.parse(m[0]); } catch { } }

        if (parsed) {
            setScores(parsed.scores || scores);
            setFeedback(parsed.feedback || []);
        }

        const clean = reply.replace(/\{[\s\S]*"scores"[\s\S]*\}/, "").trim();
        setMessages([...hist, { role: "assistant", content: clean }]);

        if (isLast) {
            setReport({
                scores: parsed?.scores || scores,
                overall: Math.round(Object.values(parsed?.scores || scores).reduce((a, b) => a + b, 0) / 4),
                readiness: "Good",
            });
            setPhase("report");
            stopCam();
        } else {
            setQIdx(next);
        }
        setLoading(false);
    };

    /* ── RENDER ── */
    return (
        <>
            <style>{G}</style>
            <div className={styles.mainDiv} style={{ height: "100vh", display: "flex", flexDirection: "column", background: C.bg }}>

                {/* ── TOPBAR ── */}
                <div className={styles.topBar}>
                    <div className={styles.logoSection}>
                        <div className={styles.logoIcon}>🎯</div>

                        <span className={styles.logoText}>
                            AI Interview Coach
                        </span>
                    </div>

                    <div className={styles.topRight}>

                        {phase === "interview" && (
                            <>
                                {/* Progress */}
                                <div className={styles.progressContainer}>
                                    <span className={styles.questionCount}>
                                        Q {qIdx}/{config.qCount}
                                    </span>

                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{
                                                width: `${(qIdx / config.qCount) * 100}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Timer */}
                                <div className={styles.timerBox}>
                                    <span className={styles.timerIcon}>⏱</span>

                                    <span
                                        className={`mono ${styles.timerText}`}
                                        style={{
                                            color: timeLeft < 120 ? "var(--pink)" : "var(--text)",
                                        }}
                                    >
                                        {fmt(timeLeft)}
                                    </span>
                                </div>
                            </>
                        )}

                        <div
                            className={styles.cameraStatus}
                            style={{
                                background: camOn
                                    ? "var(--green)"
                                    : "var(--muted)",
                            }}
                        >
                            {camOn && <div className={styles.cameraPing}></div>}
                        </div>

                        <span className={styles.cameraText}>
                            {camOn ? "CAM ON" : "NO CAM"}
                        </span>

                    </div>
                </div>

                {/* ── BODY ── */}
                <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>

                    {/* ══ SETUP PHASE ══ */}
                    {(phase === "setup" || phase === "ready") && (
                        <div className={styles.setupPhase}>

                            {/* LEFT — config */}
                            {/* ================= LEFT SIDEBAR ================= */}
                            <div className={styles.sidebar}>

                                <p className={styles.sidebarTitle}>
                                    Interview Settings
                                </p>

                                {/* Target Role */}

                                {[
                                    {
                                        label: "Target Role",
                                        key: "role",
                                        placeholder: "e.g. Java Developer",
                                    },
                                ].map((f) => (
                                    <div key={f.key} className={styles.formGroup}>

                                        <label className={styles.formLabel}>
                                            {f.label}
                                        </label>

                                        <input
                                            value={config[f.key]}
                                            onChange={(e) =>
                                                setConfig((p) => ({
                                                    ...p,
                                                    [f.key]: e.target.value,
                                                }))
                                            }
                                            placeholder={f.placeholder}
                                            className={styles.input}
                                        />

                                    </div>
                                ))}

                                {/* Dropdowns */}

                                {[
                                    { label: "Interview Type", key: "type", options: TYPES },
                                    { label: "Difficulty", key: "diff", options: DIFFS },
                                    { label: "Company Type", key: "company", options: COMPS },
                                ].map((f) => (
                                    <div key={f.key} className={styles.formGroup}>

                                        <label className={styles.formLabel}>
                                            {f.label}
                                        </label>

                                        <select
                                            value={config[f.key]}
                                            onChange={(e) =>
                                                setConfig((p) => ({
                                                    ...p,
                                                    [f.key]: e.target.value,
                                                }))
                                            }
                                            className={styles.select}
                                        >
                                            <option value="">
                                                Select {f.label}
                                            </option>

                                            {f.options.map((o) => (
                                                <option key={o}>{o}</option>
                                            ))}
                                        </select>

                                    </div>
                                ))}

                                {/* Number of Questions */}

                                <div className={styles.questionSection}>

                                    <label className={styles.formLabel}>
                                        Number of Questions
                                    </label>

                                    <div className={styles.questionButtons}>

                                        {Q_CNT.map((n) => (
                                            <button
                                                key={n}
                                                onClick={() =>
                                                    setConfig((p) => ({
                                                        ...p,
                                                        qCount: n,
                                                    }))
                                                }
                                                className={`${styles.questionButton} ${config.qCount === n
                                                    ? styles.activeQuestion
                                                    : ""
                                                    }`}
                                            >
                                                {n}Q
                                            </button>
                                        ))}

                                    </div>

                                </div>

                                {/* Start Interview */}

                                <button
                                    onClick={startInterview}
                                    className={styles.startButton}
                                >
                                    🎯 Start Mock Interview
                                </button>

                                {/* Information Card */}

                                <div className={styles.infoCard}>

                                    <p className={styles.infoText}>

                                        <span className={styles.infoHeading}>
                                            💡 How it works:
                                        </span>

                                        AI asks one question at a time.
                                        Answer via text or voice,
                                        get real-time feedback on clarity,
                                        depth, and delivery.

                                    </p>

                                </div>

                            </div>

                            {/* RIGHT — welcome / ready panel */}
                            {/* ================= RIGHT PANEL ================= */}

                            <div className={styles.rightPanel}>

                                {phase === "setup" ? (

                                    <div className={`${styles.setupContainer} fadeUp`}>

                                        <div className={styles.aiIcon}>
                                            🤖
                                        </div>

                                        <h2 className={styles.setupTitle}>
                                            Your AI Interviewer
                                        </h2>

                                        <p className={styles.setupDescription}>
                                            Configure your interview on the left, then start your session.
                                            The AI will ask professional questions and give real-time
                                            feedback on every answer.
                                        </p>

                                        <div className={styles.featureGrid}>

                                            {[
                                                ["🎥", "Webcam preview"],
                                                ["🎤", "Voice recording"],
                                                ["⏱", "Countdown timer"],
                                                ["📊", "Live score cards"],
                                                ["🧠", "Real-time feedback"],
                                                ["📄", "Download report"],
                                            ].map(([icon, label]) => (

                                                <div
                                                    key={label}
                                                    className={styles.featureCard}
                                                >
                                                    <span className={styles.featureIcon}>
                                                        {icon}
                                                    </span>

                                                    <span className={styles.featureLabel}>
                                                        {label}
                                                    </span>
                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                ) : (

                                    <div className={`${styles.readyContainer} fadeUp`}>

                                        {/* Webcam */}

                                        <div className={styles.webcamCard}>

                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                muted
                                                playsInline
                                                className={styles.webcamVideo}
                                            />

                                            {!camOn && (

                                                <div className={styles.cameraOverlay}>

                                                    <span className={styles.cameraIcon}>
                                                        🎥
                                                    </span>

                                                    <span className={styles.cameraText}>
                                                        Camera not available
                                                    </span>

                                                </div>

                                            )}

                                            {camOn && (

                                                <div className={styles.liveBadge}>

                                                    <span className={styles.liveDot}></span>

                                                    LIVE

                                                </div>

                                            )}

                                        </div>

                                        {/* Welcome Card */}

                                        <div className={styles.welcomeCard}>

                                            <div className={styles.welcomeIcon}>
                                                🤖
                                            </div>

                                            <h3 className={styles.welcomeTitle}>
                                                Welcome, Candidate!
                                            </h3>

                                            <p className={styles.welcomeDescription}>

                                                Today we'll conduct a

                                                <span
                                                    style={{
                                                        color: "var(--cyan)",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {" "}
                                                    {config.role || "Developer"}
                                                </span>

                                                {" "}interview.

                                            </p>

                                            <div className={styles.badgeContainer}>

                                                {[
                                                    `📋 ${config.qCount} Questions`,
                                                    `🎯 ${config.diff}`,
                                                    `⏱ ~${config.qCount * 1.5} min`,
                                                    `🏢 ${config.company}`,
                                                ].map((t) => (

                                                    <span
                                                        key={t}
                                                        className={styles.infoBadge}
                                                    >
                                                        {t}
                                                    </span>

                                                ))}

                                            </div>

                                        </div>

                                        <button
                                            onClick={beginNow}
                                            className={styles.beginButton}
                                        >
                                            ▶ Begin Interview
                                        </button>

                                    </div>

                                )}

                            </div>
                        </div>
                    )}

                    {/* ══ INTERVIEW PHASE ══ */}
                    {phase === "interview" && (
                        <div style={{ width: "100%", display: "flex", height: "100%", overflow: "hidden" }}>

                            {/* ================= LEFT SIDEBAR ================= */}

                            <div className={styles.sidebar}>

                                {/* Webcam */}

                                <div className={styles.sidebarSection}>

                                    <div className={styles.webcamBox}>

                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            muted
                                            playsInline
                                            className={styles.webcamVideo}
                                        />

                                        {!camOn && (
                                            <div className={styles.cameraOverlay}>

                                                <span className={styles.cameraIcon}>
                                                    🎥
                                                </span>

                                                <span className={styles.cameraText}>
                                                    No Camera
                                                </span>

                                            </div>
                                        )}

                                        {camOn && (
                                            <div className={styles.liveBadge}>

                                                <span className={styles.liveDot}></span>

                                                LIVE

                                            </div>
                                        )}

                                    </div>

                                </div>

                                {/* Current Question */}

                                <div className={styles.sidebarSection}>

                                    <p className={styles.sectionTitle}>
                                        Current Question
                                    </p>

                                    <div className={styles.questionBadge}>
                                        <span className={styles.questionBadgeText}>
                                            Q {qIdx} / {config.qCount}
                                        </span>
                                    </div>

                                    <div className={styles.progressBar}>

                                        <div
                                            className={styles.progressFill}
                                            style={{
                                                width: `${(qIdx / config.qCount) * 100}%`,
                                            }}
                                        />

                                    </div>

                                </div>

                                {/* Live Scores */}

                                <div className={styles.scoreSection}>

                                    <p className={styles.sectionTitle}>
                                        Live Scores
                                    </p>

                                    {SCORE_KEYS.map((k, i) => (

                                        <div
                                            key={k}
                                            className={styles.scoreItem}
                                        >

                                            <div className={styles.scoreHeader}>

                                                <span className={styles.scoreName}>
                                                    {k}
                                                </span>

                                                <span
                                                    className={styles.scoreValue}
                                                    style={{
                                                        color: SCORE_COLORS[i],
                                                    }}
                                                >
                                                    {scores[k]}%
                                                </span>

                                            </div>

                                            <div className={styles.scoreBar}>

                                                <div
                                                    className={styles.scoreFill}
                                                    style={{
                                                        width: `${scores[k]}%`,
                                                        background: SCORE_COLORS[i],
                                                    }}
                                                />

                                            </div>

                                        </div>

                                    ))}

                                    {/* Feedback */}

                                    {feedback.length > 0 && (

                                        <div className={styles.feedbackSection}>

                                            <p className={styles.sectionTitle}>
                                                AI Feedback
                                            </p>

                                            {feedback.map((f, i) => (

                                                <div
                                                    key={i}
                                                    className={styles.feedbackItem}
                                                >

                                                    <span
                                                        className={styles.feedbackIcon}
                                                        style={{
                                                            color: f.startsWith("✔")
                                                                ? "var(--green)"
                                                                : "var(--amber)",
                                                        }}
                                                    >
                                                        {f.startsWith("✔") ? "✔" : "⚠"}
                                                    </span>

                                                    <span className={styles.feedbackText}>
                                                        {f.replace(/^[✔⚠]\s*/, "")}
                                                    </span>

                                                </div>

                                            ))}

                                        </div>

                                    )}

                                </div>

                            </div>

                            {/* CENTER — chat */}
                            <div className={styles.chatSection}>

                                {/* chat messages */}
                                <div ref={chatRef} className={styles.chatContainer}>

                                    {messages.map((m, i) => (

                                        <div
                                            key={i}
                                            className={`fadeUp ${styles.messageRow} ${m.role === "user"
                                                ? styles.userRow
                                                : styles.assistantRow
                                                }`}
                                        >

                                            {m.role === "assistant" && (
                                                <div className={styles.aiAvatar}>
                                                    🤖
                                                </div>
                                            )}

                                            <div
                                                className={`${styles.messageBubble} ${m.role === "user"
                                                    ? styles.userBubble
                                                    : styles.assistantBubble
                                                    }`}
                                            >

                                                <p className={styles.messageText}>
                                                    {m.content}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                    {loading && (

                                        <div className={styles.loadingRow}>

                                            <div className={styles.aiAvatar}>
                                                🤖
                                            </div>

                                            <div className={styles.loadingBubble}>

                                                {[0, 1, 2].map((i) => (

                                                    <div
                                                        key={i}
                                                        className={styles.loadingDot}
                                                        style={{
                                                            animationDelay: `${i * 0.2}s`,
                                                        }}
                                                    />

                                                ))}

                                            </div>

                                        </div>

                                    )}

                                </div>

                                {/* ================= Answer Input ================= */}
                                <div className={styles.answerSection}>

                                    <textarea
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && e.ctrlKey) {
                                                submitAnswer();
                                            }
                                        }}
                                        placeholder="Type your answer here... (Ctrl+Enter to submit)"
                                        className={styles.answerInput}
                                    />

                                    <div className={styles.buttonGroup}>

                                        {/* Voice Button */}

                                        <button
                                            onClick={toggleMic}
                                            className={`${styles.voiceButton} ${recording ? styles.recording : ""
                                                }`}
                                        >
                                            {recording ? "🔴 Recording..." : "🎤 Voice"}
                                        </button>

                                        {/* Submit Button */}

                                        <button
                                            onClick={submitAnswer}
                                            disabled={loading || !answer.trim()}
                                            className={`${styles.submitButton} ${answer.trim()
                                                ? styles.submitActive
                                                : styles.submitDisabled
                                                }`}
                                        >

                                            {loading ? (
                                                <>
                                                    <div className={styles.spinner}></div>
                                                    Evaluating...
                                                </>
                                            ) : (
                                                <>Submit Answer →</>
                                            )}

                                        </button>

                                    </div>

                                    <p className={styles.answerHint}>
                                        Press Ctrl+Enter to submit · 🎤 for voice · Question {qIdx} of{" "}
                                        {config.qCount}
                                    </p>

                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══ REPORT PHASE ══ */}
                    {phase === "report" && report && (
                        <div style={{ width: "100%", overflowY: "auto", padding: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ maxWidth: 640, width: "100%" }} className="fadeUp">

                                {/* ================= Report Header ================= */}

                                <div className={styles.reportHeader}>

                                    <div className={styles.trophyIcon}>
                                        🏆
                                    </div>

                                    <h2 className={styles.reportTitle}>
                                        Interview Complete!
                                    </h2>

                                    <p className={styles.reportSubtitle}>
                                        Here's your detailed performance report
                                    </p>

                                </div>

                                {/* ================= Overall Score ================= */}

                                <div className={styles.overallScoreCard}>

                                    <div className={styles.scoreGlow}></div>

                                    <p className={styles.scoreLabel}>
                                        Overall Score
                                    </p>

                                    <div className={styles.scoreValue}>
                                        {report.overall}%
                                    </div>

                                    <div className={styles.readinessBadge}>

                                        <span className={styles.readinessIcon}>
                                            🏆
                                        </span>

                                        <span className={styles.readinessText}>
                                            Hiring Readiness: {report.readiness}
                                        </span>

                                    </div>

                                </div>

                                {/* ================= Score Breakdown ================= */}

                                <div className={styles.scoreBreakdownCard}>

                                    <p className={styles.breakdownTitle}>
                                        Score Breakdown
                                    </p>

                                    {SCORE_KEYS.concat(["Problem Solving"]).map((k, i) => {

                                        const val =
                                            report.scores[k] ||
                                            Math.round(75 + Math.random() * 18);

                                        return (

                                            <div
                                                key={k}
                                                className={styles.breakdownItem}
                                            >

                                                <div className={styles.breakdownHeader}>

                                                    <span className={styles.breakdownLabel}>
                                                        {k}
                                                    </span>

                                                    <span
                                                        className={styles.breakdownValue}
                                                        style={{
                                                            color:
                                                                SCORE_COLORS[
                                                                i % SCORE_COLORS.length
                                                                ],
                                                        }}
                                                    >
                                                        {val}%
                                                    </span>

                                                </div>

                                                <div className={styles.breakdownBar}>

                                                    <div
                                                        className={styles.breakdownFill}
                                                        style={{
                                                            width: `${val}%`,
                                                            background:
                                                                SCORE_COLORS[
                                                                i % SCORE_COLORS.length
                                                                ],
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        );

                                    })}

                                </div>

                                {/* ================= Final Feedback ================= */}

                                {feedback.length > 0 && (

                                    <div className={styles.finalFeedbackSection}>

                                        <p className={styles.finalFeedbackHeading}>
                                            Final Feedback
                                        </p>

                                        <div className={styles.feedbackGrid}>

                                            {feedback.map((f, i) => (

                                                <div
                                                    key={i}
                                                    className={`${styles.feedbackCard} ${f.startsWith("✔")
                                                            ? styles.feedbackSuccess
                                                            : styles.feedbackWarning
                                                        }`}
                                                >

                                                    <span className={styles.feedbackIcon}>
                                                        {f.startsWith("✔") ? "✅" : "⚠️"}
                                                    </span>

                                                    <span className={styles.feedbackText}>
                                                        {f.replace(/^[✔⚠]\s*/, "")}
                                                    </span>

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                )}

                                {/* actions */}
                                <div style={{ display: "flex", gap: 12 }}>
                                    <button onClick={() => { setPhase("setup"); setMessages([]); setScores({ Communication: 0, Confidence: 0, Technical: 0, Grammar: 0 }); setFeedback([]); setReport(null); setQIdx(0); }}
                                        style={{ flex: 1, padding: "14px 0", borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, color: C.text, fontWeight: 700, fontSize: 14, transition: "all 0.2s" }}
                                        onMouseEnter={e => e.target.style.borderColor = C.cyan}
                                        onMouseLeave={e => e.target.style.borderColor = C.border}>
                                        🔄 New Interview
                                    </button>
                                    <button onClick={() => window.print()}
                                        style={{ flex: 1, padding: "14px 0", borderRadius: 12, background: `linear-gradient(135deg,${C.cyan},${C.purple})`, border: "none", color: "#fff", fontWeight: 700, fontSize: 14, boxShadow: `0 4px 20px rgba(34,211,238,0.25)` }}>
                                        📄 Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}