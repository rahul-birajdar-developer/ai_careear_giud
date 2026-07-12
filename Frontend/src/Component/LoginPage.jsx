import { useState } from "react";
import "../login.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { Auth } from "../context/AuthContext.jsx";

function LoginPage() {
    const { setUser } = Auth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [conformPassowrd, setConformPassword] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        profileImage: null,
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        //console.log(form.name, form.email, form.password, conformPassowrd)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.name) {
            alert("Enter the name !!")
            return;
        }
        if (!form.email) {
            alert("Emater the email !!")
            return;
        }
        if (!emailRegex.test(form.email)) {
            alert("Please enter a valid email address !!");
            return;
        }
        if (!form.password) {
            alert("Enter the password !!")
            return;
        }
        if (!form.profileImage) {
            alert("Upload the image !!")
            return;
        }
        if (form.password != conformPassowrd) {
            alert("password don't match the secound password !!")
            return;
        }

        const data = new FormData();
        data.append("name", form.name);
        data.append("email", form.email);
        data.append("password", form.password);
        data.append("profileImage", form.profileImage);
        //console.log(form.profileImage)
        try {
            const response = await api.post(
                "/users/register",
                data
            );
            console.log(response.data);
            setIsLogin(true)
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/users/login", {
                email: form.email,
                password: form.password,
            });
            // console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.accessToken
            );
            setUser(response.data.data); // or response.data.user depending on your API

            alert("Login successful!");
            console.log("Before navigate");
            navigate("/dashboard");
            console.log("After navigate");
        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.message || "Login failed"
            );
        }
    };

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
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        )}
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                        {!isLogin && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={conformPassowrd}
                                onChange={(e) => setConformPassword(e.target.value)}
                                required
                            />
                        )}
                        {!isLogin && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setForm({ ...form, profileImage: e.target.files[0] })
                                }
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
                            onClick={isLogin ? handleLogin : handleRegister}
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