import { useState } from "react";
import { askGemini } from "../Services/gemini";
import { Loader } from 'lucide-react';

function AiLearningRoadMap() {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [roadmap, setRoadmap] = useState([]);
    const [completedPhases, setCompletedPhases] = useState([]);

    const togglePhase = (index) => {
        setCompletedPhases(prev => {
            if (prev.includes(index)) {
                return prev.filter(item => item !== index);
            }

            return [...prev, index];
        });
    };

    const displayRoadmapStepByStep = async (roadmapData) => {
        setRoadmap([]);
        setLoading(true);

        for (let i = 0; i < roadmapData.length; i++) {
            setRoadmap(prev => [...prev, roadmapData[i]]);

            await new Promise(resolve =>
                setTimeout(resolve, 1000)
            );
        }
    };

    const generateRoadmap = async () => {
        if (!role.trim()) {
            alert("Please enter a role");
            return;
        }

        setLoading(true);

        try {
            const prompt = `
        

Generate a learning roadmap for becoming a ${role}.

Return ONLY valid JSON.

Format:

[
{
"phase":"Phase 1",
"duration":"Month 1-2",
"title":"Python Fundamentals",
"skills":["Python","NumPy"],
"resources":"Python Crash Course",
"dot":"#22d3ee"
}
]

Return JSON only.
No markdown.
No explanations.
`;

            const response = await askGemini(prompt);

            const cleaned = response
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const parsedRoadmap = JSON.parse(cleaned);
            await displayRoadmapStepByStep(parsedRoadmap);
            setLoading(false);
            setRoadmap(parsedRoadmap);
        } catch (error) {
            console.error("Roadmap Error:", error);
            alert("Failed to generate roadmap");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="roadmap">
            <div className="section-title">
                AI Learning Roadmap
            </div>

            <div className="roadmap-container">
                <div className="roadmap-header">

                    <input
                        className="pf-input"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. AI Engineer"
                    />

                    <button
                        className="roadmap-generate"
                        onClick={generateRoadmap}
                        disabled={loading}
                    >
                        {loading
                            ? "Generating..."
                            : "✨ Generate with AI"}
                    </button>

                </div>
            </div>

            <div className="roadmap-timeline">

                {loading && (
                    <div className="roadmap-loading" style={{ padding: "60px", textAlign: "center", color: "#666" }}>
                        Generating Roadmap...<Loader className="loading-spinner" size={24} />
                    </div>
                )}

                {!loading && roadmap.length === 0 && (
                    <div className="roadmap-empty" style={{ padding: "60px", textAlign: "center", color: "#666" }}>
                        No roadmap generated yet.
                    </div>
                )}

                {roadmap.map((item, index) => (
                    <div
                        key={index}
                        className="roadmap-step"
                        style={{
                            opacity: completedPhases.includes(index) ? 0.6 : 1,
                            transition: "0.3s"
                        }}
                    >
                        <div
                            className="roadmap-dot"
                            style={{
                                background: item.dot || "#22d3ee"
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "10px",
                                color: "#555"
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={completedPhases.includes(index)}
                                onChange={() => togglePhase(index)}
                            />

                            <span>
                                Mark Complete
                            </span>
                        </div>

                        {completedPhases.includes(index) && (
                            <div
                                style={{
                                    color: "green",
                                    fontWeight: "bold",
                                    marginBottom: "10px"
                                }}
                            >
                                ✅ Completed
                            </div>
                        )}

                        <div
                            className="roadmap-step-title"
                            style={{
                                textDecoration: completedPhases.includes(index)
                                    ? "line-through"
                                    : "none"
                            }}
                        >
                            {item.title}
                        </div>

                        <div className="roadmap-duration">
                            {item.duration}
                        </div>

                        <div className="roadmap-skills-row">
                            {item.skills?.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="roadmap-skill"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                        <div className="roadmap-resources">
                            📚 <strong>Resources:</strong> {item.resources}
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );

}

export default AiLearningRoadMap;
