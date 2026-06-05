import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { askGemini } from "../Services/gemini";

function CareerDetails() {
    const [aiReport, setAiReport] = useState("");
    const [loading, setLoading] = useState(false);
    const { careerName } = useParams();

    const displayWordByWord = (text) => {
        setAiReport("");

        const words = text.split(" ");
        let index = 0;

        const interval = setInterval(() => {
            if (index < words.length) {
                setAiReport(prev => prev + words[index] + " ");
                index++;
            } else {
                clearInterval(interval);
            }
        }, 30);
    };

    const generateAIReport = async () => {
        if (!careerName) return;
        setLoading(true);

        const prompt = `
You are an expert career advisor.

Analyze the career: ${careerName}.

Rules:
- Keep the entire response under 500 words.
- Use long bullet points.
- Maximum 5 points per section.
- No long explanations.

Provide:
## overview
## Future Scope
## Salary Growth
## Top Skills
## Certifications
## Interview Tips
## Learning Resource
`;

        try {
            const response = await askGemini(prompt);
            await displayWordByWord(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadReport = async () => {
            if (!careerName) return;
            await generateAIReport();
        };

        loadReport();
    }, [careerName]);



    if (!careerName) {
        return <h2>Career Not Found</h2>;
    }

    return (
        <section className="career-details">
            <div className="career-section">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}
                >
                    <h2>🤖 AI Career Insights</h2>
                </div>

                {loading ? (
                    <p>Generating AI Insights...</p>
                ) : aiReport ? (
                    <ReactMarkdown>
                        {aiReport}
                    </ReactMarkdown>
                ) : (
                    <p>
                        Click "Generate Report" to get AI-powered
                        insights, certifications, interview tips,
                        salary growth, and future opportunities.
                    </p>
                )}
            </div>


            <div className="career-actions">
                <button
                    className="career-btn"
                    onClick={generateAIReport}
                >
                    🤖 Generate AI Career Report
                </button>
                <button className="career-btn">
                    📚 Generate AI Roadmap
                </button>


                <button className="career-btn">
                    🎤 Interview Preparation
                </button>

                <button className="career-btn">
                    📄 Build Resume
                </button>
            </div>
        </section>
    );
}

export default CareerDetails;