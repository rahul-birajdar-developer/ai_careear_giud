import { useState, useRef } from 'react';
import * as pdfjsLib from "pdfjs-dist";
import api from '../api/axios';

// Set the worker path for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

function AiResumeAnalyze() {
    // Stores the extracted resume text.
    // const [resumeText, setResumeText] = useState("");
    // Stores Gemini's response.
    const [analysis, setAnalysis] = useState("");
    // Controls loading state.
    const [loading, setLoading] = useState(false);
    // Stores the uploaded file.
    const [file, setFile] = useState(null);
    // job title
    const [jobTitle, setJobTitle] = useState("");

    const fileInputRef = useRef(null);

    // Runs when user selects a file.
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);
    };

    // Runs when user drags
    const handleDrop = async (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) return;
        setFile(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const analyzeResume = async () => {

        if (!file) {
            alert("Please upload a resume.");
            return;
        }

        if (!jobTitle.trim()) {
            alert("Please enter a target job role.");
            return;
        }

        setLoading(true);

        try {

            const formData = new FormData();

            formData.append("resumeFile", file);
            formData.append("jobTitle", jobTitle);

            const response = await api.post(
                "/resume/upload",
                formData
            );

            // console.log(response.data.data);
            // console.log(JSON.stringify(analysis, null, 2));

            setAnalysis(response.data.data);

        } catch (error) {

            console.log(error.response?.status);
            console.log(error.response?.data);
            console.log(error);

        } finally {

            setLoading(false);

        }

    };
    return (
        <>
            <section id="resume-analyzer">
                <div className="section-title">AI Resume Analyzer</div>
                <div className="analyzer-layout">
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div className="analyzer-drop" onDrop={handleDrop}
                            onDragOver={handleDragOver} id="dropZone">
                            {file && (
                                <p>
                                    Selected File: <strong>{file.name}</strong>
                                </p>
                            )}
                            <div className="drop-icon">📄</div>
                            <div className="drop-title">Drop your resume here</div>
                            <div className="drop-sub">Supports PDF, DOCX, TXT files</div>
                            <button className="drop-browse" type="button" onDrop={analyzeResume} onClick={() => {
                                // console.log("Button clicked");
                                // console.log(fileInputRef.current);
                                fileInputRef.current?.click();
                            }}>Browse File</button>
                            <input type="file" id="resumeFile" onChange={handleFileChange} accept=".pdf,.docx,.txt" style={{ display: "none" }} ref={fileInputRef} />
                        </div>
                        {/* <div className="analyzer-paste">
                            <label>Or paste your resume text:</label>
                            <textarea id="resumeText"
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                                placeholder="Paste your full resume content here...&#10;&#10;Include: Work experience, education, skills, projects..."></textarea>
                            <button className="analyze-btn" id="analyzeBtn" onClick={analyzeResume}>{loading ? "Analyzing..." : "✨ Analyze with AI"}</button>
                        </div> */}
                        <div className="job-role-container">
                            <label>Target Job Role</label>

                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="Example: Frontend Developer, Data Analyst, Java Developer"
                                className="job-role-input"
                            />
                        </div>
                        <button className="analyze-btn" id="analyzeBtn" onClick={analyzeResume}>{loading ? "Analyzing..." : "✨ Analyze with AI"}</button>
                    </div>


                    <div className="analyzer-results">
                        {loading ? (
                            <p>Analyzing Resume...</p>
                        ) : analysis ? (
                            <div className="analysis-result">

                                {/* Score Card */}
                                <div className="score-card">
                                    <div className="score-circle">
                                        <span className="score-num">{analysis.resumeData.score}</span>
                                    </div>

                                    <div className="score-info">
                                        <h2>ATS Score</h2>
                                        <p>
                                            {analysis.resumeData.score >= 80
                                                ? "Excellent Resume"
                                                : analysis.resumeData.score >= 60
                                                    ? "Good Resume"
                                                    : "Needs Improvement"}
                                        </p>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="analysis-card">
                                    <h3>📝 Summary</h3>
                                    <p>{analysis.resumeData.summary}</p>
                                </div>

                                {/* Career Fit */}
                                <div className="analysis-card">
                                    <h3>🎯 Career Fit</h3>
                                    <p>{analysis.resumeData.careerFit}</p>
                                </div>

                                {/* Strengths */}
                                <div className="analysis-card">
                                    <h3>✅ Strengths</h3>

                                    <ul>
                                        {analysis.resumeData.strengths?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Skills */}
                                <div className="analysis-card">
                                    <h3>💻 Skills</h3>

                                    <div className="skills-grid">
                                        {analysis.resumeData.skills?.map((skill, index) => (
                                            <span className="skill-chip" key={index}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="analysis-card warning">
                                    <h3>🚀 Missing Skills</h3>

                                    <div className="skills-grid">
                                        {analysis.resumeData.missingSkills?.map((item, index) => (
                                            <span key={index} className="missing-chip">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Weaknesses */}
                                <div className="analysis-card danger">
                                    <h3>⚠️ Weaknesses</h3>

                                    <ul>
                                        {analysis.resumeData.weaknesses?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Suggestions */}
                                <div className="analysis-card success">
                                    <h3>💡 Suggestions</h3>

                                    <ul>
                                        {analysis.resumeData.suggestions?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        ) : (
                            <div className="result-placeholder">
                                <div className="result-placeholder-icon">📊</div>
                                <strong>Your AI analysis will appear here</strong>
                                <p>Paste your resume and click Analyze to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AiResumeAnalyze;