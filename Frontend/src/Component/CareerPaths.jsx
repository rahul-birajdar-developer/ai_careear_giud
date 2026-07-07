import { useNavigate } from "react-router-dom";

function CareerPaths() {
    const navigate = useNavigate();
    return (
        <>
            <section id="career-paths">
                <div className="section-title">Explore Career Paths</div>
                <p className="section-sub">Discover the most in-demand, high-growth careers of 2026 with real salary data and
                    AI-powered entry roadmaps.</p>
                <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto" }}>
                    <div className="chat-input-row">
                        <div className="chat-input-wrap" >
                            <input className="chat-input"  id="chatInput" placeholder="e.g. Frontend Developer"></input>
                        </div>
                        <button className="send-btn" style={{ backgroundColor: "#007bff", color: "#fff", padding: "10px 80px" }} id="sendBtn" >Search</button>
                    </div>
                </div>
                <div className="paths-grid">
                    <div className="path-card reveal" >
                        <span className="path-icon">🤖</span>
                        <div className="path-title">AI / ML Engineer</div>
                        <div className="path-salary">₹18L–₹45L · $120K–$220K</div>
                        <div className="path-tags">
                            <span className="path-tag">Python</span><span className="path-tag">TensorFlow</span><span
                                className="path-tag">LLMs</span>
                        </div>
                        <div className="path-demand"><span>Demand:</span>
                            <div className="demand-bar">
                                <div className="demand-fill" style={{ width: "95%" }}></div>
                            </div><span>95%</span>
                        </div>
                        <button className="path-explore" onClick={() => navigate("/career/AI-ML-Engineer")}>Explore This Path →</button>
                    </div>
                    <div className="path-card reveal reveal-delay-1" >
                        <span className="path-icon">📱</span>
                        <div className="path-title">Product Manager</div>
                        <div className="path-salary">₹15L–₹40L · $100K–$180K</div>
                        <div className="path-tags">
                            <span className="path-tag">Strategy</span><span className="path-tag">Analytics</span><span
                                className="path-tag">UX</span>
                        </div>
                        <div className="path-demand"><span>Demand:</span>
                            <div className="demand-bar">
                                <div className="demand-fill" style={{ width: "88%" }}></div>
                            </div><span>88%</span>
                        </div>
                        <button className="path-explore" onClick={() => navigate("/career/Product-Manager")}  >Explore This Path →</button>
                    </div>
                    <div className="path-card reveal reveal-delay-2" >
                        <span className="path-icon">📊</span>
                        <div className="path-title">Data Scientist</div>
                        <div className="path-salary">₹12L–₹35L · $95K–$175K</div>
                        <div className="path-tags">
                            <span className="path-tag">Python</span><span className="path-tag">SQL</span><span
                                className="path-tag">ML</span>
                        </div>
                        <div className="path-demand"><span>Demand:</span>
                            <div className="demand-bar">
                                <div className="demand-fill" style={{ width: "90%" }}></div>
                            </div><span>90%</span>
                        </div>
                        <button className="path-explore" onClick={() => navigate("/career/Data-Scientist")}>Explore This Path →</button>
                    </div>
                    <div className="path-card reveal reveal-delay-3" >
                        <span className="path-icon">☁️</span>
                        <div className="path-title">Cloud Architect</div>
                        <div className="path-salary">₹20L–₹55L · $130K–$230K</div>
                        <div className="path-tags">
                            <span className="path-tag">AWS</span><span className="path-tag">GCP</span><span
                                className="path-tag">DevOps</span>
                        </div>
                        <div className="path-demand"><span>Demand:</span>
                            <div className="demand-bar">
                                <div className="demand-fill" style={{ width: "92%" }}></div>
                            </div><span>92%</span>
                        </div>
                        <button className="path-explore" onClick={() => navigate("/career/Cloud-Architect")}>Explore This Path →</button>
                    </div>
                    <div className="path-card reveal" >
                        <span className="path-icon">🎨</span>
                        <div className="path-title">UX / UI Designer</div>
                        <div className="path-salary">₹8L–₹28L · $70K–$140K</div>
                        <div className="path-tags">
                            <span className="path-tag">Figma</span><span className="path-tag">Research</span><span
                                className="path-tag">Prototyping</span>
                        </div>
                        <div className="path-demand"><span>Demand:</span>
                            <div className="demand-bar">
                                <div className="demand-fill" style={{ width: "80%" }}></div>
                            </div><span>80%</span>
                        </div>
                        <button className="path-explore" onClick={() => navigate("/career/UX-UI-Designer")}>Explore This Path →</button>
                    </div>
                    <div className="path-card reveal reveal-delay-1" >
                        <span className="path-icon">🔐</span>
                        <div className="path-title">Cybersecurity Analyst</div>
                        <div className="path-salary">₹10L–₹32L · $85K–$160K</div>
                        <div className="path-tags">
                            <span className="path-tag">Security</span><span className="path-tag">Networking</span><span
                                className="path-tag">SIEM</span>
                        </div>
                        <div className="path-demand"><span>Demand:</span>
                            <div className="demand-bar">
                                <div className="demand-fill" style={{ width: "94%" }}></div>
                            </div><span>94%</span>
                        </div>
                        <button className="path-explore" onClick={() => navigate("/career/Cybersecurity-Analyst")}>Explore This Path →</button>
                    </div>
                    <div className="path-card reveal reveal-delay-2" >
                        <span className="path-icon">⚙️</span>
                        <div className="path-title">DevOps Engineer</div>
                        <div className="path-salary">₹14L–₹40L · $100K–$190K</div>
                        <div className="path-tags">
                            <span className="path-tag">Docker</span><span className="path-tag">K8s</span><span
                                className="path-tag">CI/CD</span>
                        </div>
                        <div className="path-demand"><span>Demand:</span>
                            <div className="demand-bar">
                                <div className="demand-fill" style={{ width: "89%" }}></div>
                            </div><span>89%</span>
                        </div>
                        <button className="path-explore" onClick={() => navigate("/career/DevOps-Engineer")}>Explore This Path →</button>
                    </div>
                    <div className="path-card reveal reveal-delay-3" >
                        <span className="path-icon">💻</span>
                        <div className="path-title">Full Stack Developer</div>
                        <div className="path-salary">₹10L–₹30L · $80K–$160K</div>
                        <div className="path-tags">
                            <span className="path-tag">React</span><span className="path-tag">Node</span><span
                                className="path-tag">PostgreSQL</span>
                        </div>
                        <div className="path-demand"><span>Demand:</span>
                            <div className="demand-bar">
                                <div className="demand-fill" style={{ width: "85%" }}></div>
                            </div><span>85%</span>
                        </div>
                        <button className="path-explore" onClick={() => navigate("/career/Full-Stack-Developer")}>Explore This Path →</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CareerPaths;