import React, {useEffect, useState} from 'react';
import Alert from "../alerts/alert";
import LinearProgressLoad from "../alerts/LinearProgress";
import api from "../../api/api";
import {useCookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";
import TopBar from "../incl/TopBar";
import Dashboard from "../dashboard/Dashboard";


function Login(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [loadingProgress, setLoadingProgress] = useState(false);


    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };

    const loginUser = (e) => {
        // console.log("sjsjs")
        e.preventDefault()
        if (email === "" || password === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory!')
            setAlertType('error')
        } else {
            setLoadingProgress(true)
            const state = {
                email: email,
                password: password
            }
            LoginHandler(state)
            setEmail('') // clear form fields
            setPassword('') // clear form fields

        }
    }
    const LoginHandler = (state) => {

        api.post('api/auth/login'
            , state, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                }
            }
        )
            .then(function (response) {
                setLoadingProgress(false)
                console.log(response.data)
                if (response.data.error === false) {

                    // console.log(response.data.users)
                    // return response.data.users;
                    setAlertType('success')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                    sessionStorage.setItem("jwt_token", response.data.access_token);
                    sessionStorage.setItem("status", true);
                    navigate('/')


                } else {
                    // console.log(response.data.message)
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)

                }

            })
            .catch(function (error) {
                sessionStorage.setItem("status", false);
                if (error.response.status === 401) {
                    setLoadingProgress(false)
                    setAlertType('error')
                    setAlertMessage("Error 401: wrong username or password")
                    setOpen(true)


                } else {
                    setLoadingProgress(false)
                    setAlertType('error')
                    setAlertMessage("Error 500: Internal server error")
                    setOpen(true)
                    sessionStorage.setItem("status", false);
                }
            });
    }
    const loading = () => {
        if (loadingProgress) {
            return (
                <div className="mb-3">
                    <LinearProgressLoad/>
                </div>
            )
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("jwt_token") !== null) {
            //check if it exists
            navigate('/')
            return (
                <Dashboard/>
            )
        }
    }, [])


    return (
        <div>
            <div className="">
                <div className="header bg-gradient-success py-6 py-lg-7 pt-lg-8">
                    <div className="container">
                        <div className="header-body text-center mb-5">
                            <div className="row justify-content-center">
                                <div className="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 className="text-white">Welcome!</h1>
                                    <p className="text-lead text-white">Login here to access your account</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container mt--8 pb-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-7">
                            <div className="card bg-secondary border-0 mb-0">
                                {loading()}
                                <div className="card-body px-lg-5 py-lg-5">

                                    <form onSubmit={loginUser}>

                                        <div className="form-group mb-3">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i
                                                        className="ni ni-email-83"></i></span>
                                                </div>
                                                <input value={email} onChange={(e) => setEmail(e.target.value)}
                                                       className="form-control "
                                                       placeholder="Email"
                                                       name="email" type="email" required autoComplete="email"
                                                />

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group input-group-merge input-group-alternative">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i
                                                        className="ni ni-lock-circle-open"></i></span>
                                                </div>
                                                <input value={password} onChange={(e) => setPassword(e.target.value)}
                                                       type="password"
                                                       className="form-control"
                                                       placeholder="Password" type="password" required
                                                       autoComplete="current-password"/>


                                            </div>
                                        </div>
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input className="custom-control-input" id=" customCheckLogin"
                                                   type="checkbox"/>
                                            <label className="custom-control-label" htmlFor=" customCheckLogin">
                                                <span className="text-muted">Remember me</span>
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary my-2">Sign in</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6">
                                    <a className="" href="#">
                                        <small>Forgot Your Password?</small>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType}
                   handleAlertClose={handleAlertClose}/>

        </div>
    );
}

export default Login;