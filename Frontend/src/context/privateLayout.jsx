import { Outlet, useLocation } from "react-router-dom";
import AppNavBar from "../Component/AppNavbar";
import Footer from "../Component/Footer";

const PrivateLayout = () => {
    const location = useLocation();

    return (
        <>
            <AppNavBar />

            <Outlet />

            {location.pathname !== "/interview" && <Footer />}
        </>
    );
};

export default PrivateLayout;