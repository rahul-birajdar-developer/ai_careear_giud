import { useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../api/axios";
import {
    Loader
} from "lucide-react";

function AiCoverLetterWriter() {
    const [userName, setUserName] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [exp, setExp] = useState("")
    const [des, setDes] = useState("")
    const [tone, setTone] = useState("Professional");
    const [words, setWords] = useState("Standard (350 words)");
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(true)

    const typeMessage = async (text) => {
        if (typeof text !== "string") {
            console.error("Expected string, got:", text);
            return;
        }

        let currentText = "";

        setLoading(false)
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

            await new Promise(resolve => setTimeout(resolve, 30));
        }
        setShowButton(true)
    };

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await api.post("/coverLetter/analyze", {
                name: userName,
                jobTitle,
                companyName,
                skills: exp,
                desc: des,
                tone,
                length: words,
            });
            // console.log(response);
            // console.log(response.data)
            await typeMessage(response.data.data.coverLetter);
        }
        catch (error) {
            console.error(error);
            setLoading(false);
            setMessages([
                {
                    role: "ai",
                    content: "Something went wrong. Please try again."
                }
            ]);
        }
    };

    const copyCoverLetter = () => {
        navigator.clipboard.writeText(
            messages.map(m => m.content).join("\n")
        );
    };

    return (
        <>
            <section id="cover-letter">

                <div className="section-title">
                    AI Cover Letter Writer
                </div>

                <p className="section-sub">
                    Generate a compelling, personalized cover letter tailored to any job description in
                    seconds.
                </p>

                <div className="cover-layout">

                    <div className="cover-form">

                        <div className="pf-group">
                            <div className="pf-label">
                                Your Name
                            </div>

                            <input
                                className="pf-input"
                                id="clName"
                                value={userName}
                                placeholder="e.g. Priya Sharma"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="pf-group">
                            <div className="pf-label">
                                Target Job Title
                            </div>

                            <input
                                className="pf-input"
                                id="clJob"
                                value={jobTitle}
                                placeholder="e.g. Senior Product Manager"
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                        </div>

                        <div className="pf-group">
                            <div className="pf-label">
                                Company Name
                            </div>

                            <input
                                className="pf-input"
                                id="clCompany"
                                value={companyName}
                                placeholder="e.g. Google"
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>

                        <div className="pf-group">
                            <div className="pf-label">
                                Your Key Skills & Experience
                            </div>

                            <textarea
                                className="pf-textarea"
                                id="clSkills"
                                value={exp}
                                placeholder="e.g. 5 years in product management, led teams of 8, launched 3 mobile apps, expertise in Agile, data analytics..."
                                onChange={(e) => setExp(e.target.value)}
                                style={{ minHeight: "90px" }}
                            ></textarea>
                        </div>

                        <div className="pf-group">
                            <div className="pf-label">
                                Job Description (paste key parts)
                            </div>

                            <textarea
                                className="pf-textarea"
                                id="clJD"
                                value={des}
                                placeholder="Paste the job description here to tailor the letter..."
                                onChange={(e) => setDes(e.target.value)}
                                style={{ minHeight: "90px" }}
                            ></textarea>
                        </div>

                        <div className="pf-row">

                            <div className="pf-group">
                                <div className="pf-label">
                                    Tone
                                </div>

                                <select
                                    className="pf-select"
                                    id="clTone"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                >
                                    <option>Professional</option>
                                    <option>Enthusiastic</option>
                                    <option>Confident</option>
                                    <option>Creative</option>
                                </select>
                            </div>

                            <div className="pf-group">
                                <div className="pf-label">
                                    Length
                                </div>

                                <select
                                    className="pf-select"
                                    id="clLength"
                                    value={words}
                                    onChange={(e) => setWords(e.target.value)}
                                    defaultValue="Standard (350 words)"
                                >
                                    <option>Concise (200 words)</option>
                                    <option>Standard (350 words)</option>
                                    <option>Detailed (500 words)</option>
                                </select>
                            </div>

                        </div>
                        <button
                            className="analyze-btn"
                            id="coverBtn"
                            onClick={handleGenerate}
                            style={{
                                marginTop: "8px",
                                background:
                                    "linear-gradient(135deg,var(--violet),#7c3aed)"
                            }}
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "✉️ Generate Cover Letter"}
                        </button>

                    </div>

                    <div className="cover-output">
                        {messages.length === 0 && (
                            <div
                                id="coverPlaceholder"
                                className="cover-placeholder"
                            >
                                <div className="cover-placeholder-icon">
                                    ✉️
                                </div>

                                <strong>
                                    Your cover letter will appear here
                                </strong>

                                <p
                                    style={{
                                        fontSize: "0.82rem"
                                    }}
                                >
                                    Fill in your details and click Generate to create a personalized cover
                                    letter
                                </p>
                            </div>
                        )}

                        <div
                            id="coverContent"
                            style={{
                                display: messages.length ? "block" : "none",
                                flex: 1,
                                flexDirection: "column"
                            }}
                        >
                            <div
                                className="cover-text"
                                id="coverText"
                            >
                                {loading ? (
                                    <div style={{ textAlign: "center" }}>
                                        <Loader className="animate-spin" />
                                        <p>Generating Cover Letter...</p>
                                    </div>
                                ) : (
                                    messages.map((msg, index) => (
                                        <ReactMarkdown key={index}>
                                            {msg.content}
                                        </ReactMarkdown>
                                    ))
                                )}
                            </div>

                            {!showButton && <div className="cover-footer">
                                <button
                                    className="cover-action cover-copy"
                                    onClick={copyCoverLetter}
                                >
                                    📋 Copy
                                </button>
                                <button
                                    className="cover-action cover-regen"
                                    id="regenBtn"
                                    onClick={handleGenerate}
                                >
                                    🔄 Regenerate
                                </button>
                            </div>}

                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

export default AiCoverLetterWriter;