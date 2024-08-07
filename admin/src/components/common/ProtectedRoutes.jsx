import { useContext } from "react";
import { Outlet } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

import Warning from "../warning/Warning";

export default function ProtectedRoutes() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        isAuthenticated
            ? <Outlet />
            : <Warning />
    );
}