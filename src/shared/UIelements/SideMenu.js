import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import './styles/Sidemenu.css';

export default function SideMenu(props) {
    const sideDrawer = (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountonEnter
            unmountOnExit
        >
            <aside className="side-drawer" onClick={props.closeMenu}>{props.children}</aside>
        </CSSTransition>
    );

    return ReactDOM.createPortal(sideDrawer, document.getElementById('sidemenu'));
}