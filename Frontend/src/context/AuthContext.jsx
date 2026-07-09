import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    // Stores the logged-in user.
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Runs only once when the app starts.
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                // Calls the backend.it check the which user is logged in and return the user data 
                const response = await api.get("/users/me")
                console.log(response.data.data);
                setuser(response.data.data)
            } catch (error) {
                console.log(error);
                setuser(null)
            } finally {
                setLoading(false)
            }
        }

        getCurrentUser();
    }, [])

    return (
        // This shares the user with every component.
        <AuthContext.Provider value={{ user, setLoading, setuser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const Auth = () => useContext(AuthContext);