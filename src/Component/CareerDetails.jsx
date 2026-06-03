import { useParams } from "react-router-dom";

function CareerDetails() {
    const { careerName } = useParams();

    const careers = {
        "AI-ML-Engineer": {
            title: "AI / ML Engineer",
            icon: "🤖",
            salary: "₹18L–₹45L · $120K–$220K",
            demand: "95%",
            overview:
                "AI/ML Engineers design and build intelligent systems using machine learning, deep learning, and generative AI technologies.",
            skills: [
                "Python",
                "Machine Learning",
                "TensorFlow",
                "PyTorch",
                "Deep Learning",
                "LLMs",
                "LangChain",
                "RAG"
            ],
            roadmap: [
                "Learn Python & Math Fundamentals",
                "Master Machine Learning",
                "Learn Deep Learning",
                "Build AI Projects",
                "Learn LLMs & Generative AI",
                "Prepare for Interviews"
            ],
            projects: [
                "Resume Analyzer",
                "AI Chatbot",
                "Image Classifier",
                "Recommendation System"
            ],
            companies: [
                "Google",
                "OpenAI",
                "Microsoft",
                "Meta",
                "Amazon"
            ]
        },
        "Product-Manager": {
            title: "Product Manager",
            icon: "📱",
            salary: "₹15L–₹35L · $100K–$180K",
            demand: "88%",
            overview:
                "Product Managers define and execute the strategy for digital products, working closely with engineering, design, and business teams.",
            skills: [
                "Product Strategy",
                "User Research",
                "Agile Methodologies",
                "Data Analysis",
                "Stakeholder Management"
            ],
            roadmap: [
                "Learn Product Management Fundamentals",
                "Master User Research Techniques",
                "Understand Agile & Scrum",
                "Develop Data Analysis Skills",
                "Build Stakeholder Communication Abilities"
            ],
            projects: [
                "Product Roadmap Planning",
                "User Persona Development",
                "Feature Prioritization Exercise"
            ],
            companies: [
                "Google",
                "Apple",
                "Microsoft",
                "Meta",
                "Amazon"
            ]
        }
    };

    const career = careers[careerName];

    if (!career) {
        return <h2>Career Not Found</h2>;
    }

    return (
        <section className="career-details">
            <div className="career-hero">
                <span className="career-icon">{career.icon}</span>
                <h1>{career.title}</h1>
                <p>{career.overview}</p>

                <div className="career-stats">
                    <div>
                        <h3>Salary</h3>
                        <p>{career.salary}</p>
                    </div>

                    <div>
                        <h3>Demand</h3>
                        <p>{career.demand}</p>
                    </div>
                </div>
            </div>

            <div className="career-section">
                <h2>Required Skills</h2>

                <div className="skills-grid">
                    {career.skills.map((skill, index) => (
                        <span key={index} className="skill-chip">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="career-section">
                <h2>Learning Roadmap</h2>

                {career.roadmap.map((step, index) => (
                    <div key={index} className="roadmap-step">
                        <span>{index + 1}</span>
                        <p>{step}</p>
                    </div>
                ))}
            </div>

            <div className="career-section">
                <h2>Recommended Projects</h2>

                <ul>
                    {career.projects.map((project, index) => (
                        <li key={index}>{project}</li>
                    ))}
                </ul>
            </div>

            <div className="career-section">
                <h2>Top Companies Hiring</h2>

                <div className="companies">
                    {career.companies.map((company, index) => (
                        <span key={index} className="company-chip">
                            {company}
                        </span>
                    ))}
                </div>
            </div>

            <div className="career-actions">
                <button className="career-btn">
                    📚 Generate AI Roadmap
                </button>

                <button className="career-btn">
                    🎯 Analyze Skill Gap
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