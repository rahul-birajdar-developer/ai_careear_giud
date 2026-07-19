import { useState } from "react";
import { askGemini } from "../Services/gemini";

function SalaryIntelligence() {
    const [salaryData, setSalaryData] = useState({
        role: "",
        experience: "",
        location: "",
        companySize: "",
        estimated: "",
        range: "",
        entry: "₹0L",
        mid: "₹0L",
        senior: "₹0L",
        tips: []
    });
    const [loading, setLoading] = useState(false);

    const fetchSalary = async () => {
        setLoading(true);

        try {
            const prompt = `
You are a salary intelligence expert.

Role: ${salaryData.role}
Experience: ${salaryData.experience}
Location: ${salaryData.location}
Company Size: ${salaryData.companySize}

Return ONLY valid JSON.

Format:

{
  "estimated":"₹15L",
  "range":"₹12L - ₹20L per year",
  "entry":"₹10L",
  "mid":"₹18L",
  "senior":"₹30L",
  "tips":[
    "Tip 1",
    "Tip 2",
    "Tip 3"
  ]
}

No markdown.
No explanation.
`;

            const response = await askGemini(prompt);

            const cleaned = response
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const data = JSON.parse(cleaned);

            setSalaryData(prev => ({
                ...prev,
                estimated: data.estimated,
                range: data.range,
                entry: data.entry,
                mid: data.mid,
                senior: data.senior,
                tips: data.tips
            }));

        } catch (error) {
            console.error(error);
            alert("Failed to fetch salary insights");
        } finally {
            setLoading(false);
        }
    };

    const getSalaryNumber = (salary) => {
        if (!salary) return 0;
        return parseFloat(
            salary.replace(/[₹L,\s]/g, "")
        ) || 0;
    };

    const entrySalary = getSalaryNumber(salaryData.entry);
    const midSalary = getSalaryNumber(salaryData.mid);
    const seniorSalary = getSalaryNumber(salaryData.senior);

    const maxSalary = Math.max(
        entrySalary,
        midSalary,
        seniorSalary,
        1
    );

    return (
        <section id="salary">

            <div className="section-title">
                Salary Intelligence
            </div>

            <p className="section-sub">
                Get real-time AI-powered salary benchmarks,
                negotiation strategies, and market insights
                for your role and location.
            </p>

            <div className="salary-layout">
                {/* FORM */}
                <div className="salary-form">

                    <div className="pf-group">
                        <div className="pf-label">
                            Job Title
                        </div>

                        <input
                            className="pf-input"
                            value={salaryData.role}
                            onChange={(e) =>
                                setSalaryData({
                                    ...salaryData,
                                    role: e.target.value,
                                })
                            }
                            placeholder="e.g. Data Scientist"
                        />
                    </div>

                    <div className="pf-group">
                        <div className="pf-label">
                            Experience
                        </div>

                        <select
                            className="pf-select"
                            value={salaryData.experience}
                            onChange={(e) =>
                                setSalaryData({
                                    ...salaryData,
                                    experience: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Experience</option>
                            <option>0–1 years</option>
                            <option>2–4 years</option>
                            <option>5–7 years</option>
                            <option>8–12 years</option>
                            <option>12+ years</option>
                        </select>
                    </div>

                    <div className="pf-group">
                        <div className="pf-label">
                            Location
                        </div>

                        <select
                            className="pf-select"
                            value={salaryData.location}
                            onChange={(e) =>
                                setSalaryData({
                                    ...salaryData,
                                    location: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Location</option>
                            <option>Bangalore, India</option>
                            <option>Mumbai, India</option>
                            <option>Delhi NCR, India</option>
                            <option>Pune, India</option>
                            <option>San Francisco, USA</option>
                            <option>New York, USA</option>
                            <option>London, UK</option>
                            <option>Berlin, Germany</option>
                        </select>
                    </div>

                    <div className="pf-group">
                        <div className="pf-label">
                            Company Size
                        </div>

                        <select
                            className="pf-select"
                            value={salaryData.companySize}
                            onChange={(e) =>
                                setSalaryData({
                                    ...salaryData,
                                    companySize: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Company Size</option>
                            <option>Startup (1–50)</option>
                            <option>Mid-size (50–500)</option>
                            <option>Large (500–5000)</option>
                            <option>Enterprise (5000+)</option>
                        </select>
                    </div>

                    <button
                        className="analyze-btn"
                        style={{ marginTop: "8px" }}
                        onClick={fetchSalary}
                        disabled={loading}
                    >
                        {loading
                            ? "Loading..."
                            : "💰 Get Salary Insights"}
                    </button>
                </div>

                {/* RESULTS */}
                <div className="salary-results">

                    <div className="salary-card">

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "4px",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "0.76rem",
                                    fontWeight: "700",
                                    letterSpacing: "1px",
                                    textTransform: "uppercase",
                                }}
                            >
                                Estimated Salary
                            </div>

                            <div
                                style={{
                                    fontSize: "0.73rem",
                                }}
                            >
                                {salaryData.role} ·{" "}
                                {salaryData.location} ·{" "}
                                {salaryData.experience}
                            </div>
                        </div>

                        <div className="salary-big">
                            {salaryData.estimated}
                        </div>

                        <div className="salary-range">
                            Range: {salaryData.range}
                        </div>

                        <div className="salary-bars">

                            <div className="sb-row">
                                <span className="sb-label">
                                    Entry
                                </span>

                                <div className="sb-track">
                                    <div
                                        className="sb-fill"
                                        style={{
                                            width: `${(entrySalary / maxSalary) * 100}%`,
                                            background: "#5a6a8a"
                                        }}
                                    />
                                </div>

                                <span className="sb-val">
                                    {salaryData.entry}
                                </span>
                            </div>

                            <div className="sb-row">
                                <span className="sb-label">
                                    Mid
                                </span>

                                <div className="sb-track">
                                    <div
                                        className="sb-fill"
                                        style={{
                                            width: `${(midSalary / maxSalary) * 100}%`,
                                            background: "#f59e0b"
                                        }}
                                    />
                                </div>

                                <span className="sb-val">
                                    {salaryData.mid}
                                </span>
                            </div>

                            <div className="sb-row">
                                <span className="sb-label">
                                    Senior
                                </span>

                                <div className="sb-track">
                                    <div
                                        className="sb-fill"
                                        style={{
                                            width: `${(seniorSalary / maxSalary) * 100}%`,
                                            background: "#34d399"
                                        }}
                                    />
                                </div>

                                <span className="sb-val">
                                    {salaryData.senior}
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="salary-card">

                        <div
                            style={{
                                fontSize: "0.78rem",
                                fontWeight: "700",
                                letterSpacing: "1px",
                                textTransform: "uppercase",
                                marginBottom: "10px",
                            }}
                        >
                            AI Negotiation Tips
                        </div>

                        {/* <div
                            style={{
                                fontSize: "0.78rem",
                                lineHeight: "1.75",
                                fontWeight: "700",
                                color: "#5a6a8a",
                                letterSpacing: "1px",
                                marginBottom: "10px"
                            }}
                        >
                            💡 <strong style={{ color: "#f59e0b" }}>You're at mid-market.</strong>
                            Ask for 15–25% more than the initial offer.

                            <br />
                            <br />

                            🎯 Highlight impact:
                            quantify achievements with metrics.

                            <br />
                            <br />

                            🏆 Negotiate bonuses, ESOPs,
                            remote work flexibility, and benefits.

                            <br />
                            <br />

                            ⏰ Best time to negotiate:
                            after receiving an offer.
                        </div> */}
                        <div
                            style={{
                                fontSize: "0.78rem",
                                lineHeight: "1.75"
                            }}
                        >
                            {salaryData.tips?.map((tip, index) => (
                                <div key={index}>
                                    💡 {tip}
                                    <br /><br />
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default SalaryIntelligence;