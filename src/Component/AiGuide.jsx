import { useState } from "react";
import { askGemini } from "../Services/gemini";
import ReactMarkdown from "react-markdown";
import {
    Loader
} from "lucide-react";


function AiGuide() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([
        {
            role: "ai",
            content: "Hello! I'm CareerMind AI. How can I help you today?"
        }
    ]);

    const [role, setRole] = useState("");
    const [exp, setExp] = useState("");
    const [goal, setGoal] = useState("");

    const [loading, setLoading] = useState(false);

    const typeMessage = async (text) => {
        let currentText = "";

        setMessages(prev => [
            ...prev,
            { role: "ai", content: "" }
        ]);

        const words = text.split(" ");

        for (let i = 0; i < words.length; i++) {
            currentText += words[i] + " ";

            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: "ai",
                    content: currentText
                };
                return updated;
            });

            await new Promise(resolve => setTimeout(resolve, 50));
        }
    };

    const handleAsk = async () => {
        if (!question.trim() || loading) return;

        const userMessage = {
            role: "user",
            content: question
        };

        setMessages(prev => [...prev, userMessage]);
        setQuestion("");
        setLoading(true);

        const system = `
            You are CareerMind AI, a world-class career counselor, mentor, recruiter, interview coach, and industry expert.

            User Profile:
            - Current Role: ${role}
            - Experience: ${exp}
            - Career Goal: ${goal || "Not specified"}

            Instructions:

            1. Always provide detailed answers.
            2. Use headings and subheadings.
            3. Explain concepts step-by-step.
            4. Give practical examples.
            5. Provide a roadmap whenever relevant.
            6. Suggest skills, tools, technologies, and resources.
            7. Explain advantages and disadvantages.
            8. Mention common mistakes to avoid.
            9. Give actionable next steps.
            10. Never answer in less than 300 words unless the user asks for a short answer.

            Response Format:

            # Overview

            Brief explanation.

            # Detailed Analysis

            Detailed explanation with examples.

            # Recommended Action Plan

            Step-by-step roadmap.

            # Resources to Learn

            Books, courses, websites, and tools.

            # Final Advice

            A concise conclusion.
            `;

        try {
            const finalPrompt = `
            ${question}

            Requirements:
            - Give a detailed answer.
            - Use bullet points.
            - Explain step by step.
            - Include examples.
            - Include a learning roadmap if applicable.
            - Minimum 500 words.
            `;

            const response = await askGemini(system, finalPrompt);
            await typeMessage(response);
        } catch (error) {
            console.error(error);

            setMessages(prev => [
                ...prev,
                {
                    role: "ai",
                    content: "Something went wrong. Please try again."
                }
            ]);
        }

        setLoading(false);
    };

    const clearChat = () => {
        setMessages([
            {
                role: "ai",
                content: "Hello! I'm CareerMind AI. How can I help you today?"
            }
        ]);

        setQuestion("");
        setGoal("");
        setRole("Junior Developer");
        setExp("1–3 years");
    };


    const handleChatKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAsk(); }
    }

    return (
        <>
            <section id="ai-guide">
                <div className="section-tag">Core Feature</div>
                <div className="section-title">Your Personal AI Career Advisor</div>
                <p className="section-sub">Tell us about yourself and ask anything — career switches, upskilling, job hunting,
                    work-life questions, or industry insights.</p>

                <div className="guide-layout">
                    <div className="guide-sidebar">
                        <div className="guide-card">
                            <div className="guide-card-title"><span>👤</span> Your Profile</div>
                            <div className="pf-group">
                                <div className="pf-label">Current Role</div>
                                <input className="pf-input" id="userRole" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Junior Developer" />
                            </div>
                            <div className="pf-row">
                                <div className="pf-group">
                                    <div className="pf-label">Experience</div>
                                    <select className="pf-select" id="userExp" value={exp} onChange={(e) => setExp(e.target.value)}>
                                        <option>None</option>
                                        <option>0–1 years</option>
                                        <option >1–3 years</option>
                                        <option>3–5 years</option>
                                        <option>5–10 years</option>
                                        <option>10+ years</option>
                                    </select>
                                </div>
                                <div className="pf-group">
                                    <div className="pf-label">Industry</div>
                                    <select className="pf-select" id="userIndustry" >
                                        <option>Select Industry</option>
                                        <option>Technology</option>
                                        <option>Finance</option>
                                        <option>Healthcare</option>
                                        <option>Marketing</option>
                                        <option>Education</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pf-group">
                                <div className="pf-label">Career Goal</div>
                                <input className="pf-input" value={goal} onChange={(e) => setGoal(e.target.value)} id="userGoal" placeholder="e.g. Become a Product Manager" />
                            </div>
                        </div>

                        <div className="guide-card">
                            <div className="guide-card-title"><span>⚡</span> Quick Topics</div>
                            <div className="topic-grid">
                                <button className="topic-btn"
                                >🔀 Career
                                    Switch</button>
                                <button className="topic-btn"
                                >📚 Skills to
                                    Learn</button>
                                <button className="topic-btn" >💰
                                    Salary Negotiation</button>
                                <button className="topic-btn"
                                >🤝
                                    Networking</button>
                                <button className="topic-btn"
                                >🎤 Interview
                                    Tips</button>
                                <button className="topic-btn"
                                >🚀
                                    Top Careers</button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Chat Panel --> */}
                    <div className="chat-panel">
                        <div className="chat-header">
                            <div className="chat-header-left">
                                <div className="ai-avatar">🧭</div>
                                <div>
                                    <div className="ai-name">CareerMind AI</div>
                                    <div className="ai-status">Online — Ready to guide you</div>
                                </div>
                            </div>
                            <div className="chat-actions">
                                <button className="chat-act-btn" onClick={clearChat}>Clear</button>
                                <button className="chat-act-btn" >Export</button>
                            </div>
                        </div>

                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div key={index} className={`msg ${msg.role}`}>
                                    <div className={`msg-avatar ${msg.role}`}>
                                        {msg.role === "ai" ? "🧭" : "👤"}
                                    </div>

                                    <div>
                                        <div className="msg-bubble">
                                            <ReactMarkdown>
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {loading && (
                                <div className="msg ai">
                                    <div className="msg-avatar ai">🧭</div>
                                    <div className="msg-bubble">
                                        .....
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="chat-input-area">
                            <div className="chat-input-row">
                                <div className="chat-input-wrap">
                                    <textarea className="chat-input" onKeyDown={(e) => handleChatKey(e)} onChange={(e) => setQuestion(e.target.value)} id="chatInput" placeholder="Ask anything about your career..."
                                        rows="1"  ></textarea>
                                </div>
                                <button className="send-btn" id="sendBtn" onClick={handleAsk}>{loading ? <Loader /> : "➤"}</button>
                            </div>
                            <div className="chat-hint">Press Enter to send · Shift+Enter for new line · Powered by Claude AI</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AiGuide;