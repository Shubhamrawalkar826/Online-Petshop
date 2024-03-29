import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { UserContext } from "../App";


export const Logout = () => {

    const { state1, dispatch } = useContext(UserContext);
    const logout = () => {
        dispatch({ type: "USER", payload: false });
        sessionStorage.removeItem("customer");
        sessionStorage.removeItem("admin");
        sessionStorage.removeItem("role");
    }


    return (
        <>

            <Nav.Link as={Link} onClick={logout} className="text-light mx-1 text-decoration-none " to="/">Logout</Nav.Link>

        </>
    )
}