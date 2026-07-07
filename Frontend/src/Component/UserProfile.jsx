

function UserProfile() {
    return (
        <section className="profile-dashboard">

            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h1>👋 Welcome Back, Rahul Birajdar</h1>
                    <p>Aspiring AI Engineer</p>
                </div>

                <div className="streak-card">
                    🔥 12 Day Streak
                </div>
            </div>

            {/* Profile & Goal */}
            <div className="top-grid">

                <div className="dashboard-card">
                    <h2>👤 Profile</h2>

                    <div className="info-item">
                        <span>📚 Education</span>
                        <strong>B.Sc ECS</strong>
                    </div>

                    <div className="info-item">
                        <span>💼 Experience</span>
                        <strong>Fresher</strong>
                    </div>

                    <div className="info-item">
                        <span>📍 Location</span>
                        <strong>Pune, India</strong>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h2>🎯 Career Goal</h2>

                    <h3>AI / ML Engineer</h3>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: "72%" }}
                        ></div>
                    </div>

                    <p>72% Complete</p>

                    <div className="next-skill">
                        Next Skill: PyTorch
                    </div>
                </div>

            </div>

            {/* Stats */}
            <div className="stats-grid">

                <div className="stat-card">
                    <h2>82</h2>
                    <span>ATS Score</span>
                </div>

                <div className="stat-card">
                    <h2>65</h2>
                    <span>Skill Gap</span>
                </div>

                <div className="stat-card">
                    <h2>5</h2>
                    <span>Roadmaps</span>
                </div>

                <div className="stat-card">
                    <h2>12</h2>
                    <span>Interviews</span>
                </div>

                <div className="stat-card">
                    <h2>8</h2>
                    <span>Cover Letters</span>
                </div>

            </div>

            {/* AI Recommendations */}
            <div className="dashboard-card ai-card">
                <h2>🤖 AI Recommendations</h2>

                <ul>
                    <li>Learn PyTorch this week</li>
                    <li>Build an AI Chatbot Project</li>
                    <li>Practice Machine Learning Interviews</li>
                </ul>

                <button className="dashboard-btn">
                    Generate New Advice
                </button>
            </div>

            {/* Skills */}
            <div className="dashboard-card">
                <h2>🛠 Skills</h2>

                <div className="skills-container">
                    <span>React</span>
                    <span>JavaScript</span>
                    <span>Python</span>
                    <span>C++</span>
                    <span>Node.js</span>
                    <span>MongoDB</span>
                    <span>Git</span>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bottom-grid">

                <div className="dashboard-card">
                    <h2>🏆 Achievements</h2>

                    <div className="achievement">
                        Resume Master
                    </div>

                    <div className="achievement">
                        Roadmap Explorer
                    </div>

                    <div className="achievement">
                        Interview Champion
                    </div>

                    <div className="achievement">
                        Skill Builder
                    </div>
                </div>

                <div className="dashboard-card">
                    <h2>📅 Recent Activity</h2>

                    <div className="activity">
                        ✓ Resume analyzed
                    </div>

                    <div className="activity">
                        ✓ Roadmap generated
                    </div>

                    <div className="activity">
                        ✓ Skill gap analyzed
                    </div>

                    <div className="activity">
                        ✓ Cover letter created
                    </div>
                </div>

            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
                <h2>⚡ Quick Actions</h2>

                <div className="actions-grid">

                    <button>📄 Resume Analyzer</button>

                    <button>🎯 Skill Gap</button>

                    <button>📚 Roadmap</button>

                    <button>🎤 Interview Coach</button>

                    <button>🤖 AI Advisor</button>

                    <button>💼 Job Market</button>

                </div>
            </div>

            {/* Settings */}
            <div className="dashboard-card">
                <h2>⚙️ Account Settings</h2>

                <div className="settings-grid">

                    <button>Edit Profile</button>

                    <button>Change Password</button>

                    <button>Notifications</button>

                    <button className="logout-btn">
                        Logout
                    </button>

                </div>
            </div>

        </section>
    );
}

export default UserProfile;