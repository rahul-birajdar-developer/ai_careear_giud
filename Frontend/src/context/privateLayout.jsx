import { Outlet, useLocation } from "react-router-dom";
import AppNavBar from "../Component/AppNavbar";
import Footer from "../Component/Footer";

const PrivateLayout = () => {
    const location = useLocation();

    return (
        <>
            <AppNavBar />

            <Outlet />

            {!["/interview", "/careerpaths", "/roadmap"].includes(location.pathname) && (
                <Footer />
            )}
            {/* {location.pathname !== "/roadmap" && <Footer />} */}
        </>
    );
};

export default PrivateLayout;