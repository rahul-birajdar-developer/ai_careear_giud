import { useState, useRef } from 'react';
import { askGemini } from '../Services/gemini';
import ReactMarkdown from "react-markdown";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

// Set the worker path for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

function AiResumeAnalyze() {
    const [resumeText, setResumeText] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        setFile(selectedFile);

        if (selectedFile.type === "text/plain") {
            await readTxtFile(selectedFile);
        }
        else if (
            selectedFile.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            await readDocx(selectedFile);
        }
        else if (
            selectedFile.type === "application/pdf"
        ) {
            await readPdf(selectedFile);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();

        const droppedFile = e.dataTransfer.files[0];

        if (!droppedFile) return;

        setFile(droppedFile);

        if (droppedFile.type === "text/plain") {
            await readTxtFile(droppedFile);
        }
        else if (
            droppedFile.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            await readDocx(droppedFile);
        }
        else if (droppedFile.type === "application/pdf") {
            await readPdf(droppedFile);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const analyzeResume = async () => {
        if (!resumeText.trim()) return;

        setLoading(true);

        const prompt = `
You are an expert ATS Resume Analyzer.

Analyze this resume and provide:

# ATS Score
Give score out of 100.

# Strengths
List strong points.

# Weaknesses
List missing areas.

# Skills Detected
List technical and soft skills.

# Improvement Suggestions
Provide actionable recommendations.

Resume:
${resumeText}
`;

        try {
            const response = await askGemini(prompt);
            setAnalysis(response);
        }
        catch (error) {
            console.error(error);
            setAnalysis("Failed to analyze resume.");
        }
        finally {
            setLoading(false);
        }
    };

    const readTxtFile = async (file) => {
        const text = await file.text();
        setResumeText(text);
    };

    const readDocx = async (file) => {
        const arrayBuffer = await file.arrayBuffer();

        const result = await mammoth.extractRawText({
            arrayBuffer
        });

        setResumeText(result.value);
    };

    const readPdf = async (file) => {
        const arrayBuffer = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((s) => s.str).join(' ');
        }

        setResumeText(text);
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
                            <button className="drop-browse" htmlFor="resumeFile" type="button" onClick={() => fileInputRef.current.click()}>Browse File</button>
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