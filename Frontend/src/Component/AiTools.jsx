import { Link } from "react-router-dom";

function AiTools() {

    return (
        <>
            <section id="tools">
                <div className="section-title">Everything you need to level up</div>
                <p className="section-sub">A complete suite of AI tools built specifically for ambitious professionals at every
                    stage of their career.</p>

                <div className="tools-grid">
                    <Link to="/resumeanalyze">
                        <div className="tool-card reveal"
                        >
                            <div className="tool-icon" style={{ background: "rgba(34,211,238,0.1)" }}>📄</div>
                            <h3>Resume Analyzer</h3>
                            <p>Get a detailed AI score, keyword analysis, ATS compatibility check, and actionable improvements for
                                your resume.</p>
                            <div className="tool-cta">Analyze Resume →</div>
                        </div>
                    </Link>
                    <Link to="/careerpaths">
                        <div className="tool-card reveal reveal-delay-1"
                        >
                            <div className="tool-icon" style={{ background: "rgba(245,158,11,0.1)" }}>🗺️</div>
                            <h3>Career Path Explorer</h3>
                            <p>Discover 50+ career paths with salary data, growth rates, required skills, and AI-curated entry
                                strategies.</p>
                            <div className="tool-cta">Explore Paths →</div>
                        </div>
                    </Link>
                    <Link to="/skillgapanalyze">
                        <div className="tool-card reveal reveal-delay-2"
                        >
                            <div className="tool-icon" style={{ background: "rgba(167,139,250,0.1)" }} >🎯</div>
                            <h3>Skill Gap Analyzer</h3>
                            <p>Compare your current skills to your dream job requirements and get a prioritized learning plan.</p>
                            <div className="tool-cta">Find Skill Gaps →</div>
                        </div>
                    </Link>
                    <Link to="/interview">
                        <div className="tool-card reveal"
                        >
                            <div className="tool-icon" style={{ background: "rgba(251,113,133,0.1)" }} >🎤</div>
                            <h3>Interview Coach</h3>
                            <p>Practice with AI-generated questions tailored to your role, get instant feedback on your answers.</p>
                            <div className="tool-cta">Start Practice →</div>
                        </div>
                    </Link>
                    <Link to="/roasmap">
                        <div className="tool-card reveal reveal-delay-1"
                        >
                            <div className="tool-icon" style={{ background: "rgba(52,211,153,0.1)" }} >🛤️</div>
                            <h3>Learning Roadmap</h3>
                            <p>Get a week-by-week personalized roadmap with resources, milestones, and timelines for your target
                                role.</p>
                            <div className="tool-cta">Build Roadmap →</div>
                        </div>
                    </Link>
                    <Link to="/coverletter">
                        <div className="tool-card reveal reveal-delay-2"
                        >
                            <div className="tool-icon" style={{ background: "rgba(34,211,238,0.1)" }}>✉️</div>
                            <h3>Cover Letter Writer</h3>
                            <p>Generate compelling, personalized cover letters that match job descriptions and highlight your
                                strengths.</p>
                            <div className="tool-cta">Write Letter →</div>
                        </div>
                    </Link>
                </div>
            </section>
        </>
    )
}

export default AiTools;