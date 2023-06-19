import React, { useContext } from "react";
import { NavLink } from "react-router-dom";


import "./styles/Navlinks.css";
import { AuthContext } from "../context/authContext";
import Button from "../formElements/Button";

export default function Navlinks() {
    const auth = useContext(AuthContext);
    return (
        <ul className="nav-links">
            <li><NavLink to="/newUser">I'm New Here!</NavLink></li>
            <li>
                <NavLink to="/citizens">CITIZENS</NavLink>
            </li>
            <li>
                {auth.isLoggedIn && <NavLink to={`/${auth.loginID}/cases`}>MY CASES</NavLink>}
            </li>
            <li>
                {auth.isLoggedIn && <NavLink to="/cases/new">NEW CASE</NavLink>}
            </li>
            <li>
                {!auth.isLoggedIn && <NavLink to="/">AUTHENTICATE</NavLink>}
            </li>
            <li>
                {auth.isLoggedIn && <Button onClick={auth.logout} >LOGOUT</Button>}
            </li>
        </ul>
    );
}