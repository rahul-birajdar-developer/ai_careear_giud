import { Link } from "react-router-dom";
function HomePage() {
    return (
        <>
            <section className="hero">
                <div className="hero-orb1"></div>
                <div className="hero-orb2"></div>
                <div className="hero-grid-lines"></div>
                <div className="hero-content">
                    <div className="hero-eyebrow">Trusted by Students & Professionals</div>
                    <h1>
                        <span className="line1">Your Personal </span>
                        <span className="line2">AI Career Coach</span>
                    </h1>
                    <p className="hero-sub">Get personalized career advice, resume analysis, interview coaching, skill roadmaps, and
                        salary insights — all powered by advanced AI that understands your unique journey.</p>
                    <div className="hero-actions">
                        <Link to="guide">
                            <button className="btn-hero btn-hero-primary"
                            >
                                🚀 Start Free
                            </button>
                        </Link>
                        <Link to="/tools">
                            <button className="btn-hero btn-hero-secondary"
                            >
                                Explore Features
                            </button>
                        </Link>
                    </div>
                    {/* <div className="hero-pills">
                        <Link to="/resumeanalyze">
                            <div className="hero-pill" style={{ cursor: "pointer" }}><span>📄</span> Resume Analysis</div>
                        </Link>
                        <Link to="/roadmap">
                            <div className="hero-pill" style={{ cursor: "pointer" }}><span>🗺️</span> Career Roadmaps</div>
                        </Link>
                        <Link to="/interview">
                            <div className="hero-pill" style={{ cursor: "pointer" }}><span>🎤</span> Interview Prep</div>
                        </Link>
                        <Link to="/salary">
                            <div className="hero-pill" style={{ cursor: "pointer" }}><span>💰</span> Salary Insights</div>
                        </Link>
                        <Link to="/coverletter">
                            <div className="hero-pill" style={{ cursor: "pointer" }}><span>✉️</span> Cover Letters</div>
                        </Link>
                        <Link to="/skillgapanalyze">
                            <div className="hero-pill" style={{ cursor: "pointer" }}><span>🔍</span> Skill Gap Analysis</div>
                        </Link>
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default HomePage;