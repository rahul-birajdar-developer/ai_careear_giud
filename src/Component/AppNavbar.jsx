import { Link } from "react-router-dom";

function AppNavBar() {
    return (
        <>
            <nav>
                <Link to="/home">
                    <div className="nav-logo">
                        <div className="nav-logo-icon">🧭</div>
                        Career<span>Mind</span> AI
                    </div>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/guide">AI Guide</Link></li>
                    <li><Link to="/tools">Tools</Link></li>
                    <li><Link to="/careerpaths">Explore Careers</Link></li>
                    <li><Link to="/profile">
                        Profile
                    </Link></li>
                </ul>
                <div className="nav-cta">
                    <button className="btn-ghost"
                    >Sign In</button>
                    <button className="btn-nav"
                    >Get Started
                        Free</button>
                </div>
            </nav>
        </>
    )
}

export default AppNavBar;