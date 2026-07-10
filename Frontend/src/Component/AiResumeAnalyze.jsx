import { useState, useRef } from 'react';
import ReactMarkdown from "react-markdown";
import * as pdfjsLib from "pdfjs-dist";
import api from '../api/axios';

// Set the worker path for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

function AiResumeAnalyze() {
    // Stores the extracted resume text.
    const [resumeText, setResumeText] = useState("");
    // Stores Gemini's response.
    const [analysis, setAnalysis] = useState("");
    // Controls loading state.
    const [loading, setLoading] = useState(false);
    // Stores the uploaded file.
    const [file, setFile] = useState(null);

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

        setLoading(true);

        try {

            const formData = new FormData();

            formData.append("resumeFile", file);

            const response = await api.post(
                "/resume/upload",
                formData
            );

            console.log(response.data);

            setAnalysis(response.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };
    return (
        <>
            <section id="resume-analyzer">
                <div className="section-title">AI Resume Analyzer</div>
                <p className="section-sub">Paste your resume or upload a file to get an instant AI-powered review with an ATS score
                    and actionable improvements.</p>

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
                                console.log("Button clicked");
                                console.log(fileInputRef.current);
                                fileInputRef.current?.click();
                            }}>Browse File</button>
                            <input type="file" id="resumeFile" onChange={handleFileChange} accept=".pdf,.docx,.txt" style={{ display: "none" }} ref={fileInputRef} />
                        </div>
                        <div className="analyzer-paste">
                            <label>Or paste your resume text:</label>
                            <textarea id="resumeText"
                                value={resumeText}
                                onChange={(e) => setResumeText(e.target.value)}
                                placeholder="Paste your full resume content here...&#10;&#10;Include: Work experience, education, skills, projects..."></textarea>
                            <button className="analyze-btn" id="analyzeBtn" onClick={analyzeResume}>{loading ? "Analyzing..." : "✨ Analyze with AI"}</button>
                        </div>
                    </div>

                    <div className="analyzer-results">
                        {loading ? (
                            <p>Analyzing Resume...</p>
                        ) : analysis ? (
                            <ReactMarkdown>
                                {analysis}
                            </ReactMarkdown>
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