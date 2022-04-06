import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/user"


const Layout = () => {
    const location = useLocation();
    const dispatch:any = useDispatch();
    useEffect(() => {
        if (location.search !== "")
            axios.get(`http://localhost:8000/api/callback${location.search}`).then(({ data }) => {
                localStorage.setItem('token', data.google_user.token);
                dispatch(login(data.google_user));
            })
    }, [])
    const [sidePanelRightValue, setRight] = useState<string>("-1000px");
    const [navBackColor, setNavBackColor] = useState<string>("transparent");
    const [burgerDispaly, setBurger] = useState<string>("initial");
    const [crossDisplay, setCross] = useState<string>("none");
    function sideNav():void {
        if (sidePanelRightValue == "0px") {
            setRight("-1000px");
            setNavBackColor("transparent");
            setBurger("initial");
            setCross("none");
        } else {
            setCross("initial");
            setBurger("none");
            setRight("0px");
            setNavBackColor("#1b1b26");
        }
    }
    return (
        <>
            <NavBar sideNav={sideNav} navBackColor={navBackColor} burgerDispaly={burgerDispaly} crossDisplay={crossDisplay} setNavBackColor={setNavBackColor} />
            <SideBar sidePanelRightValue={sidePanelRightValue} />
            <Outlet />
            <Footer />
        </>
    );
};
export default Layout;
