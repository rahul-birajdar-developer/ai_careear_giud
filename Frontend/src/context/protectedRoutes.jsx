import { Navigate } from "react-router-dom";
import { Auth } from "./AuthContext";

const ProtectedRoutes = ({ children }) => {
    const { user, loading } = Auth();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoutes;