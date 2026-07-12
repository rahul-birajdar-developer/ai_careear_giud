import { Navigate } from "react-router-dom";
import { Auth } from "./AuthContext";

const ProtectedRoutes = ({ children }) => {
    const { user, loading } = Auth();
    console.log("Protected Auth:", Auth());
    // 👇 Add these logs here
    console.log("Loading:", loading);
    console.log("Loading:", loading);
    console.log("User:", user);
    console.log("Current URL:", window.location.pathname);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!user) {
        return <Navigate to="/signup" replace />;
    }

    return children;
};

export default ProtectedRoutes;