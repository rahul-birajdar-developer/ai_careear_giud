function Footer() {
    return (
        <>
            <footer>

                <div className="footer-grid">

                    <div className="footer-brand">

                        <div
                            className="nav-logo"
                            style={{
                                fontSize: "1.2rem"
                            }}
                        >
                            <div
                                className="nav-logo-icon"
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    fontSize: "0.85rem"
                                }}
                            >
                                🧭
                            </div>

                            Career
                            <span
                                style={{
                                    color: "var(--cyan)"
                                }}
                            >
                                Mind
                            </span>{" "}
                            AI
                        </div>

                        <p>
                            AI-powered career guidance for the modern professional.
                            Built with Claude AI to help you make smarter career decisions.
                        </p>

                    </div>

                    <div className="footer-col">

                        <h5>Tools</h5>

                        <ul>
                            <li>
                                <a href="#ai-guide">
                                    AI Career Guide
                                </a>
                            </li>

                            <li>
                                <a href="#resume-analyzer">
                                    Resume Analyzer
                                </a>
                            </li>

                            <li>
                                <a href="#skill-gap">
                                    Skill Gap Analyzer
                                </a>
                            </li>

                            <li>
                                <a href="#interview-prep">
                                    Interview Coach
                                </a>
                            </li>

                            <li>
                                <a href="#cover-letter">
                                    Cover Letter Writer
                                </a>
                            </li>

                            <li>
                                <a href="#salary">
                                    Salary Insights
                                </a>
                            </li>
                        </ul>

                    </div>

                    <div className="footer-col">

                        <h5>Careers</h5>

                        <ul>
                            <li>
                                <a href="#">
                                    AI &amp; Machine Learning
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Product Management
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Data Science
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Software Engineering
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Cybersecurity
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    UX Design
                                </a>
                            </li>
                        </ul>

                    </div>

                    <div className="footer-col">

                        <h5>Company</h5>

                        <ul>
                            <li>
                                <a href="#">
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Blog
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Careers
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Privacy Policy
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>

                    </div>

                </div>

                <div className="footer-bottom">

                    <p>
                        © 2026 CareerMind AI. All rights reserved.
                        Powered by CareerMind AI
                    </p>

                    <div className="footer-social">

                        <a
                            className="fsoc"
                            href="#"
                        >
                            𝕏
                        </a>

                        <a
                            className="fsoc"
                            href="#"
                        >
                            in
                        </a>

                        <a
                            className="fsoc"
                            href="#"
                        >
                            ▶
                        </a>

                        <a
                            className="fsoc"
                            href="#"
                        >
                            ◉
                        </a>

                    </div>

                </div>

            </footer>
        </>
    )
}

export default Footer;