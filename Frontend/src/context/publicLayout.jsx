import { Outlet } from "react-router-dom";
import AppNavBar from "../Component/AppNavbar";
import Footer from "../Component/Footer";

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