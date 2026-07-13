import { Navigate } from "react-router-dom";
import { Auth } from "./AuthContext";

const ProtectedRoutes = ({ children }) => {
    const { user, loading } = Auth();
    const auth = Auth();

    console.log("Auth object:", auth);

    if (!auth) {
        return <h2>Auth Context Missing</h2>;
    }

    console.log(user, loading);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!user) {
        return <Navigate to="/signup" replace />;
    }

    return children;
};

export default ProtectedRoutes;