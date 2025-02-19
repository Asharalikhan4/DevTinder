import { FC } from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

const Layout: FC = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Layout;