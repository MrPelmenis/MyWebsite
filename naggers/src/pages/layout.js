import { Outlet, Link } from "react-router-dom";

import TopBar from "../topBar/topBar.js";

const Layout = () => {
    return (
        <>
            <TopBar></TopBar>
            <Outlet />
        </>
    )
};

export default Layout;
