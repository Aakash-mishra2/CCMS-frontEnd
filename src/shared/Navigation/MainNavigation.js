import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import Navlinks from "./Navlinks";
import SideMenu from "../UIelements/SideMenu";
import Backdrop from "../UIelements/Backdrop";

import './styles/MainNavigation.css';

export default function MainNavigation() {
    const [menu, setMenu] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 860;
    useEffect(() => {
        const handleWindowResize = () => (setWidth(window.innerWidth))
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, [])

    function openMenu() {
        setMenu(true);
    }
    const closeMenu = () => setMenu(false);

    return (
        <React.Fragment>
            {menu && <Backdrop onClick={closeMenu} />}
            <SideMenu show={menu} closeMenu={closeMenu} >
                <nav className="main-navigation__drawer-nav">
                    <Navlinks />
                </nav>
            </SideMenu>

            <MainHeader>
                <button
                    className="main-navigation__menu-btn"
                    onClick={openMenu}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <h1 className="main-navigation__title">
                    <Link to='/'>{(width > breakpoint) ? 'Court Case Management' : 'C.C.M.S.'}</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <Navlinks />
                </nav>

            </MainHeader>
        </React.Fragment>
    );
};