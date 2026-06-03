function SocialFeedBack() {
    return (
        <>
            <section id="social-proof">
                <div className="section-tag">
                    Success Stories
                </div>

                <div className="section-title">
                    Careers transformed by AI
                </div>

                <p className="section-sub">
                    Real people who used CareerMind AI to land their dream roles and level up their careers.
                </p>

                <div className="proof-grid">

                    <div className="proof-card reveal">
                        <p className="proof-text">
                            CareerMind AI gave me a 12-week roadmap to become an ML Engineer. I followed it,
                            built the projects, and landed a role at a top startup with a 3× salary increase.
                            The resume analyzer alone was worth it.
                        </p>

                        <div className="proof-author">

                            <div
                                className="proof-avatar"
                                style={{
                                    background: "rgba(34,211,238,0.15)",
                                    color: "var(--cyan)"
                                }}
                            >
                                AK
                            </div>

                            <div>
                                <div className="proof-name">
                                    Aryan Kapoor
                                </div>

                                <div className="proof-role">
                                    ML Engineer at Sarvam AI · Ex-Analyst
                                </div>

                                <div className="proof-stars">
                                    ★★★★★
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="proof-card reveal reveal-delay-1">
                        <p className="proof-text">
                            The interview coach is insanely good. I practiced 30 questions, got feedback each
                            time, and walked into my Google interview feeling like I'd done it 100 times. Got
                            the offer.
                        </p>

                        <div className="proof-author">

                            <div
                                className="proof-avatar"
                                style={{
                                    background: "rgba(245,158,11,0.15)",
                                    color: "var(--gold)"
                                }}
                            >
                                SR
                            </div>

                            <div>
                                <div className="proof-name">
                                    Sneha Rao
                                </div>

                                <div className="proof-role">
                                    Software Engineer at Google · Bangalore
                                </div>

                                <div className="proof-stars">
                                    ★★★★★
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="proof-card reveal reveal-delay-2">
                        <p className="proof-text">
                            I was completely lost about transitioning from marketing to product management.
                            The AI guide laid out a clear plan, recommended the right courses, and helped me
                            craft a story for interviewers. 6 months later — PM at a Series B startup.
                        </p>

                        <div className="proof-author">

                            <div
                                className="proof-avatar"
                                style={{
                                    background: "rgba(167,139,250,0.15)",
                                    color: "var(--violet)"
                                }}
                            >
                                PM
                            </div>

                            <div>
                                <div className="proof-name">
                                    Pooja Malhotra
                                </div>

                                <div className="proof-role">
                                    Product Manager · Ex-Marketing Lead
                                </div>

                                <div className="proof-stars">
                                    ★★★★★
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default SocialFeedBack;