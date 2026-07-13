import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    // Stores the logged-in user.
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Runs only once when the app starts.
    useEffect(() => {
        //console.log("AuthContext Mounted");

        const getCurrentUser = async () => {
            // console.log("Calling /users/me");

            try {
                const response = await api.get("/users/me");

                // console.log("SUCCESS");
                // console.log(response);

                setUser(response.data.data);
            } catch (error) {
                console.log("FAILED");
                console.log(error);

                setUser(null);
            } finally {
                console.log("FINALLY");
                setLoading(false);
            }
        };

        getCurrentUser();
    }, []);

    return (
        // This shares the user with every component.
        <AuthContext.Provider
            value={{
                user,
                loading,
                setUser,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const Auth = () => useContext(AuthContext);