import React, {useEffect, useState} from 'react';
import Alert from "../alerts/alert";
import LinearProgressLoad from "../alerts/LinearProgress";
import api from "../../api/api";
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import TopBar from "../incl/TopBar";
import Dashboard from "../dashboard/Dashboard";

function Logout(props) {
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("status");
    sessionStorage.removeItem("app_type");
    sessionStorage.removeItem("branch");

    useEffect(() => {

        window.location = "/login";
    }, [])
    return (
        <div></div>
    );
}

export default Logout;