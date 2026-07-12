import { useState } from "react";
import api from "../api/axios";

function SkillGapAnalyzer() {

    const [targetRole, setTargetRole] = useState("");
    const [experience, setExperience] = useState("");
    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState([]);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter" && skillInput.trim()) {
            e.preventDefault();

            if (!skills.includes(skillInput.trim())) {
                setSkills([...skills, skillInput.trim()]);
            }

            setSkillInput("");
        }
    };

    const typeText = async (text) => {
        setResult("");

        for (let i = 0; i < text.length; i++) {
            setResult(prev => prev + text[i]);

            await new Promise(resolve =>
                setTimeout(resolve, 15)
            );
        }
    };

    const removeSkill = (skill) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    const analyzeSkillGap = async () => {
        setLoading(true);

        try {

            const response = await api.post("/skill-gap/analyze", {
                targetRole, skills, experience
            });

            const shortResponse =
                response.split(" ").slice(0, 120).join(" ");
            console.log(response)

            await typeText(shortResponse);

            setResult(response.data.data)
        } catch (error) {
            console.error(error);
            setResult("Failed to analyze skills.");
        }

        setLoading(false);
    };

    return (
        <>
            <section id="skill-gap">
                <div className="section-title">Skill Gap Analyzer</div>
                <p className="section-sub">Enter your current skills and your target role — AI will identify exactly what you need
                    to learn and in what order.</p>

                <div className="skill-layout">
                    <div className="skill-form">
                        <div className="pf-group">
                            <div className="pf-label">Target Role</div>
                            <select className="pf-select" id="targetRole" value={targetRole}
                                onChange={(e) => setTargetRole(e.target.value)}>
                                <option value="">Select Target Role</option>
                                <option>AI / ML Engineer</option>
                                <option>Product Manager</option>
                                <option>Data Scientist</option>
                                <option>Cloud Architect</option>
                                <option>Cybersecurity Analyst</option>
                                <option>DevOps Engineer</option>
                                <option>Full Stack Developer</option>
                                <option>UX / UI Designer</option>
                            </select>
                        </div>
                        <div className="pf-group" style={{ marginTop: "12px" }}>
                            <div className="pf-label">Your Current Skills <span style={{ color: "#5a6a8a", fontSize: "0.65rem" }}>(type
                                & press Enter)</span></div>
                            <div className="skill-tags-input">
                                {skills.map((skill) => (
                                    <span key={skill} className="skill-chip">
                                        {skill}
                                        <span
                                            className="skill-chip-x"
                                            onClick={() => removeSkill(skill)}
                                        >
                                            ×
                                        </span>
                                    </span>
                                ))}

                                <input
                                    className="skill-chip-input"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={handleSkillKeyDown}
                                    placeholder="Add skill..."
                                />
                            </div>
                        </div>
                        <div className="pf-group" style={{ marginTop: "12px" }}>
                            <div className="pf-label">Experience Level</div>
                            <select className="pf-select" id="expLevel" value={experience}
                                onChange={(e) => setExperience(e.target.value)}>
                                <option value="">Select Experience Level</option>
                                <option>Beginner (0–1 yr)</option>
                                <option >Intermediate (1–3 yrs)</option>
                                <option>Advanced (3–5 yrs)</option>
                                <option>Expert (5+ yrs)</option>
                            </select>
                        </div>
                        <button
                            className="analyze-btn"
                            onClick={analyzeSkillGap}
                            style={{ marginTop: "20px" }}
                        >
                            {loading
                                ? "Analyzing..."
                                : "🎯 Analyze Skill Gap"}
                        </button>
                    </div>

                    <div className="skill-results">
                        {result ? (
                            <div
                                style={{
                                    whiteSpace: "pre-wrap",
                                    lineHeight: "1.8"
                                }}
                            >
                                <h2>{result.matchScore}% Match</h2>

                                <h3>Strengths</h3>

                                <ul>
                                    {result.strengths.map((item) => (
                                        <li>{item}</li>
                                    ))}
                                </ul>

                                <h3>Missing Skills</h3>

                                <ul>
                                    {result.missingSkills.map((item) => (
                                        <li>{item}</li>
                                    ))}
                                </ul>

                                <h3>Learning Path</h3>

                                <ul>
                                    {result.learningPath.map((item) => (
                                        <li>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="result-placeholder">
                                <div className="result-placeholder-icon">🎯</div>
                                <strong>
                                    Skill gap analysis will appear here
                                </strong>
                                <p>
                                    Add your skills and select a target role
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default SkillGapAnalyzer;