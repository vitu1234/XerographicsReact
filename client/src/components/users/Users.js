import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import React from "react";
import UserListRow from "./UserListRow";
import api from "../../api/api";

import Alert from "../alerts/alert";
import Dialogs from "../alerts/dialog";
import LinearProgressLoad from "../alerts/LinearProgress";


function Users() {
    const navigate = useNavigate()

    //user state
    const [users, setUsers] = useState([])
    const [del_id, setId] = useState(-1)

    //alert state
    const [open, setOpen] = useState(false);
    //dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(false);


    //dialog open
    const handleClickOpen = (id) => {
        setDialogOpen(true);
        setDialogTitle('Delete')
        setDialogMessage('Are you sure to delete user?')
        setId(id)
    };


    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");


    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogTitle('')
        setDialogMessage('')
    };


    // retrieve users
    const retrieveUsers = () => {
        setLoadingProgress(true)
        api.get('/fetchAllUsers'
        )
            .then(function (response) {
                setLoadingProgress(false)
                // console.log(response.data)
                if (response.data.error === false) {

                    // console.log(response.data.users)
                    setUsers(response.data.users)
                    // return response.data.users;

                } else {
                    // console.log(response.data.message)
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                }

            })
            .catch(function (error) {
                setLoadingProgress(false)
                if (error.response.status === 401) {
                    //place your reentry code
                    sessionStorage.removeItem('status')
                    sessionStorage.removeItem('jwt_token')
                    setAlertType('error')
                    setAlertMessage("Error 401: Unauthorized user")
                    setOpen(true)
                    navigate('/login')
                } else {
                    window.sessionStorage.setItem('status', false)
                    setAlertType('error')
                    setAlertMessage("Error 500: Internal server error")
                    setOpen(true)
                }
            });
    }

    //delete contact
    const dialogAction = () => {
        setOpen(false)
        setId(-1)
        if (del_id > 0) {
            // console.log("ID: " + id);
            api.delete('/deleteUser/' + del_id + ''
            )
                .then(function (response) {
                    // console.log(response.data)
                    if (response.data.error === false) {

                        const usersCopy = users.filter((user) => {
                            return user.id !== del_id
                        })
                        handleDialogClose();
                        setUsers(usersCopy)
                        setAlertType('success')
                        setAlertMessage('User deleted successfully')
                        setOpen(true)


                    } else {
                        console.log(response.data.message)
                        // return [];
                        setAlertType('error')
                        setAlertMessage(response.data.message)
                        setOpen(true)
                    }

                })
                .catch(function (myJson) {
                    console.log(myJson);
                    setAlertType('error')
                    setAlertMessage("Error 500: Internal server error")
                    setOpen(true)
                });
        } else {

        }

    }

    useEffect(() => {
        retrieveUsers();
    }, [])

    const renderUserList = users.map((user) => {
        return (
            <UserListRow key={user.id} user={user} getDeleteUserId={handleClickOpen}></UserListRow>
        );
    })

    const loading = () => {
        if (loadingProgress) {
            return (
                <div className="mb-3">
                    <LinearProgressLoad/>
                </div>
            )
        }
    }
    return (
        <div className="">
            <div className="header bg-primary pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item"><Link
                                            to={'/'}><i className="fas fa-home"></i></Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Users</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">
                                <Link to={'/customers'} type="button"
                                      className="btn btn-sm btn-neutral">Customers</Link>

                                <Link to={'addUser'}>
                                    <button type="button" className="btn btn-sm btn-neutral my-1">New User</button>
                                </Link>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt--6">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            {loading()}
                            <div className="table-responsive mt-4" id="">
                                <table className="table table-hover mt-3 " id="users_tbl">
                                    <thead className="thead">
                                    <tr>
                                        <th>Fullname</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="">
                                    {renderUserList}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Dialogs dialogOpen={dialogOpen} dialogAction={dialogAction} dialogTitle={dialogTitle}
                     dialogMessage={dialogMessage} handleDialogClose={handleDialogClose}/>
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType}
                   handleAlertClose={handleAlertClose}/>
        </div>
    );
}

export default Users;
