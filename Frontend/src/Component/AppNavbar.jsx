import { Link } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function AppNavBar() {

    const [activeNav, setActiveNav] = useState("Dashboard");

    const Icon = ({ children, w = 16, h = 16, stroke = "currentColor", sw = 2, fill = "none", ...rest }) => (
        <svg viewBox="0 0 24 24" width={w} height={h} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} {...rest}>
            {children}
        </svg>
    );

    const NAV_LINKS = [
        { icon: "Home", label: "Home", path: "/" },
        { icon: "Monitor", label: "AI Guide", path: "/guide", },
        { icon: "Grid", label: "Tools", path: "/tools", },
        { icon: "Search", label: "Explore Careers", path: "/careerpaths" },
        { icon: "Grid", label: "Dashboard", path: "/profile" },
    ];

    const Icons = {
        Home: () => <Icon><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon>,
        Monitor: () => <Icon><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></Icon>,
        Grid: () => <Icon w={16} h={16}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></Icon>,
        Search: () => <Icon><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></Icon>,
        User: () => <Icon><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>,
        FileText: () => <Icon><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></Icon>,
        Activity: () => <Icon><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></Icon>,
        Map: () => <Icon><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></Icon>,
        Mic: () => <Icon><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></Icon>,
        BarChart: () => <Icon><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></Icon>,
        Bookmark: () => <Icon><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></Icon>,
        Settings: () => <Icon><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></Icon>,
        HelpCircle: () => <Icon><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></Icon>,
        Mail: () => <Icon><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></Icon>,
        MapPin: () => <Icon><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></Icon>,
        Calendar: () => <Icon><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon>,
        Briefcase: () => <Icon><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /></Icon>,
        Star: () => <Icon><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Icon>,
        TrendingUp: () => <Icon><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></Icon>,
        ChevronRight: () => <Icon w={14} h={14} sw={2.5}><polyline points="9 18 15 12 9 6" /></Icon>,
        Lock: () => <Icon><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></Icon>,
        Bell: () => <Icon><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></Icon>,
        Download: () => <Icon><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></Icon>,
        LogOut: () => <Icon><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></Icon>,
        Clock: () => <Icon><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Icon>,
        Edit: () => <Icon w={12} h={12} sw={2.5}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></Icon>,
        Award: () => <Icon><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></Icon>,
        Sun: () => <Icon><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /></Icon>,
    };

    return (
        <>
            <nav style={{
                background: "#0f1520", borderBottom: "1px solid rgba(255,255,255,.07)",
                display: "flex", alignItems: "center", padding: "0 50px",
                height: "65px", position: "relative", zIndex: 100, flexShrink: 0,
                gap: "15rem"
            }}>
                {/* Brand */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 40, flexShrink: 0 }}>
                    <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        background: "linear-gradient(135deg,#1a4a7a,#0e2d4f)",
                        border: "1px solid rgba(0,212,255,.3)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                    }}>🧠</div>
                    <span style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>
                        Career <span style={{ color: "#00d4ff" }}>Mind</span> <span style={{ color: "#00d4ff", fontWeight: 800 }}>AI</span>
                    </span>
                </div>

                {/* Nav links */}
                <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                    {NAV_LINKS.map(({ icon, label, path }) => {
                        const Ic = Icons[icon];
                        const isActive = activeNav === label;
                        return (
                            <NavLink key={label} to={path}>
                                <button key={label} className="nav-link-hover"
                                    onClick={() => setActiveNav(label)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 7,
                                        padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                                        fontSize: 13.5, fontWeight: 500, background: "transparent",
                                        color: isActive ? "#00d4ff" : "#94a3b8",
                                        transition: "all .15s", whiteSpace: "nowrap",
                                    }}>
                                    <span style={{ opacity: 0.7, display: "flex" }}><Ic /></span>
                                    {label}
                                </button>
                            </NavLink>
                        );
                    })}
                </div>
                <Link to="/signup"><button className="btn-nav">Sign Up</button></Link>
            </nav>
        </>
    )
}

export default AppNavBar;