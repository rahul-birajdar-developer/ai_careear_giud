import { Outlet } from "react-router-dom";
import AppNavBar from "../pages/AppNavbar";
import Footer from "../pages/Footer";

const PublicLayout = () => {
    return (
        <>
            <AppNavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default PublicLayout;