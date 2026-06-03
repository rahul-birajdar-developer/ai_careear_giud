import { useState } from "react";
import "../login.css";

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            <div className="auth-container">

                <div className="auth-left">
                    <div className="auth-badge">
                        🚀 CareerMind AI
                    </div>

                    <h1>
                        Build Your Dream
                        <span> Career with AI</span>
                    </h1>

                    <p>
                        Get personalized career guidance,
                        resume analysis, interview coaching,
                        salary insights, and AI-powered roadmaps.
                    </p>

                    <div className="auth-features">
                        <div>✓ AI Career Guide</div>
                        <div>✓ Resume Analyzer</div>
                        <div>✓ Interview Coach</div>
                        <div>✓ Salary Intelligence</div>
                    </div>
                </div>

                <div className="auth-card">

                    <div className="auth-tabs">
                        <button
                            className={!isLogin ? "active" : ""}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                        <button
                            className={isLogin ? "active" : ""}
                            onClick={() => setIsLogin(true)}
                        >
                            Sign In
                        </button>
                    </div>

                    <form className="auth-form">

                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Full Name"
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Email Address"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                        />

                        {!isLogin && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                            />
                        )}

                        {isLogin && (
                            <div className="forgot-password">
                                Forgot Password?
                            </div>
                        )}

                        <button
                            type="submit"
                            className="auth-btn"
                        >
                            {isLogin
                                ? "Sign In"
                                : "Create Account"}
                        </button>

                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button className="google-btn">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                        />
                        Continue with Google
                    </button>

                </div>

            </div>
        </div>
    );
}

export default LoginPage;