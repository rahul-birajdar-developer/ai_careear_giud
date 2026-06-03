import { useState } from "react";
import { askGemini } from "../Services/gemini";

function AiInterViewCoach() {
    const [role, setRole] = useState("");
    const [interviewType, setInterviewType] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [companyType, setCompanyType] = useState("");

    const [messages, setMessages] = useState([]);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [questionNo, setQuestionNo] = useState(0);

    const startInterview = async () => {
        setLoading(true);

        try {
            const prompt = `
You are an expert interviewer.

Role: ${role}
Interview Type: ${interviewType}
Difficulty: ${difficulty}
Company Type: ${companyType}

Rules:
- Maximum 8 words
- Beginner-friendly
- No coding task
- No examples
- No explanations
- Return only the question

Example outputs:
What is the CSS Box Model?
What is Flexbox?
What is React?
Explain JavaScript closures..
`;

            const question = await askGemini(prompt);

            setMessages([
                {
                    sender: "ai",
                    text: question
                }
            ]);

            setQuestionNo(1);
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    const submitAnswer = async () => {
        if (!answer.trim()) return;

        const userAnswer = answer;

        const currentQuestion =
            messages[messages.length - 1]?.text;

        setMessages(prev => [
            ...prev,
            {
                sender: "user",
                text: userAnswer
            }
        ]);

        setAnswer("");
        setLoading(true);

        try {

            // STEP 1: Evaluate answer

            const feedbackPrompt = `
You are an interview coach.

Question:
${currentQuestion}

Candidate Answer:
${userAnswer}

Provide:

⭐ Score: X/10

✅ Strengths:
- point 1
- point 2

⚠️ Improvements:
- point 1
- point 2

Keep response under 80 words.
`;

            const feedback =
                await askGemini(feedbackPrompt);

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: feedback
                }
            ]);

            // STEP 2: Generate next question

            const nextQuestionPrompt = `
Generate ONE interview question.

Role: ${role}
Interview Type: ${interviewType}
Difficulty: ${difficulty}

Rules:
- Maximum 15 words
- Short and direct
- No explanation
- No scenario

Return only the question.
`;

            const nextQuestion =
                await askGemini(nextQuestionPrompt);

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: `🎤 Question ${questionNo + 1}: ${nextQuestion}`
                }
            ]);

            setQuestionNo(prev => prev + 1);

        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <>
            <section id="interview-prep">

                <div className="section-title">
                    AI Interview Coach
                </div>

                <p className="section-sub">
                    Practice with real interview questions, get instant AI feedback on your answers, and
                    build confidence before the big day.
                </p>

                <div className="interview-layout">
                    <div className="interview-settings">

                        <div className="pf-group">
                            <div className="pf-label">
                                Target Role
                            </div>

                            <input
                                className="pf-input"
                                id="intRole"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="e.g. Data Scientist"
                            />
                        </div>

                        <div className="pf-group">
                            <div className="pf-label">
                                Interview Type
                            </div>

                            <select title="select"
                                className="pf-select"
                                value={interviewType}
                                onChange={(e) => setInterviewType(e.target.value)}
                                id="intType"
                            >
                                <option value="">Select Interview Type</option>
                                <option>Technical</option>
                                <option>Behavioral (STAR)</option>
                                <option>System Design</option>
                                <option>Case Study</option>
                                <option>HR / Culture Fit</option>
                            </select>
                        </div>

                        <div className="pf-group">
                            <div className="pf-label">
                                Difficulty
                            </div>

                            <select
                                className="pf-select"
                                id="intDiff"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option value="">Select Difficulty</option>
                                <option>Entry Level</option>
                                <option>Mid Level</option>
                                <option>Senior Level</option>
                                <option>Staff / Principal</option>
                            </select>
                        </div>

                        <div className="pf-group">
                            <div className="pf-label">
                                Company Type
                            </div>

                            <select
                                className="pf-select"
                                id="intCompany"
                                value={companyType}
                                onChange={(e) => setCompanyType(e.target.value)}
                            >
                                <option value="">Select Company Type</option>
                                <option>FAANG / Big Tech</option>
                                <option>Product Startup</option>
                                <option>Consulting</option>
                                <option>MNC</option>
                                <option>Any</option>
                            </select>
                        </div>

                        <button
                            className="analyze-btn"
                            id="intStartBtn"
                            onClick={startInterview}
                            style={{
                                marginTop: "8px",
                                background:
                                    "linear-gradient(135deg,var(--rose),#e11d48)"
                            }}
                        >
                            {loading ? "Starting..." : "🎤 Start Mock Interview"}
                        </button>

                        <div
                            style={{
                                marginTop: "14px",
                                padding: "14px",
                                background: "var(--navy3)",
                                borderRadius: "10px",
                                fontSize: "0.78rem",
                                color: "var(--text3)",
                                lineHeight: "1.6"
                            }}
                        >
                            💡{" "}
                            <strong style={{ color: "var(--text2)" }}>
                                How it works:
                            </strong>{" "}
                            AI will ask you questions one at a
                            time. Answer in the text box and get instant feedback on
                            clarity, depth, and delivery.
                        </div>

                    </div>

                    <div className="interview-panel">

                        <div className="int-header">

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                }}
                            >
                                <div
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "9px",
                                        background: "var(--rose-dim)",
                                        border:
                                            "1px solid rgba(251,113,133,0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1rem"
                                    }}
                                >
                                    🎤
                                </div>

                                <div>
                                    <div
                                        style={{
                                            fontWeight: "700",
                                            fontSize: "0.9rem"
                                        }}
                                    >
                                        Interview Coach
                                    </div>

                                    <div
                                        style={{
                                            fontSize: "0.73rem",
                                            color: "var(--text3)"
                                        }}
                                        id="intStatus"
                                    >
                                        {questionNo === 0
                                            ? "Configure settings & start session"
                                            : "Interview in progress"}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    fontFamily:
                                        "'JetBrains Mono', monospace",
                                    fontSize: "0.8rem",
                                    color: "var(--text3)"
                                }}
                                id="intCounter"
                            >
                                Q {questionNo}
                            </div>

                        </div>

                        <div className="int-messages">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent:
                                            msg.sender === "ai"
                                                ? "flex-start"
                                                : "flex-end",
                                        marginBottom: "12px"
                                    }}
                                >
                                    <div
                                        style={{
                                            maxWidth: "75%",
                                            padding: "12px",
                                            borderRadius: "12px",
                                            background:
                                                msg.sender === "ai"
                                                    ? "#1e293b"
                                                    : "#3a4556",
                                            color: "#fff"
                                        }}
                                    >
                                        <strong>
                                            {msg.sender === "ai"
                                                ? "🎤 Interviewer"
                                                : "👤 You"}
                                        </strong>

                                        <div style={{ marginTop: "6px" }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="int-input-area">

                            <div className="int-input-row">

                                <input
                                    className="int-input"
                                    id="intInput"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Type your answer here..."
                                />

                                <button
                                    className="int-send"
                                    id="intSendBtn"
                                    onClick={submitAnswer}
                                    disabled={loading}
                                >
                                    ➤
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default AiInterViewCoach;