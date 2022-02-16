import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import React from "react";
import BranchListRow from "./BranchListRow";
import api from "../../api/api";
import Alert from "../alerts/alert";
import Dialogs from "../alerts/dialog";
import LinearProgressLoad from "../alerts/LinearProgress";


function Branches() {
    const navigate = useNavigate();

    //user state
    const [branches, setBranches] = useState([])
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
        setDialogMessage('Are you sure to delete branch? Related data will be lost')
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



    // retrieve branches
    const retrieveBranches = () => {
        setLoadingProgress(true)
        api.get('/fetchAllBranches'
        )
            .then(function (response) {
                setLoadingProgress(false)
                // console.log(response.data)
                if (response.data.error === false) {

                    // console.log(response.data.users)
                    setBranches(response.data.branches)
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
                    navigate('/login')
                    //place your reentry code
                    console.log('Unauthorised')
                    sessionStorage.removeItem('status')
                    sessionStorage.removeItem('jwt_token')
                    setAlertType('error')
                    setAlertMessage("Error 401: Unauthorised user")
                    setOpen(true)
                } else {
                    console.log('unknown error')
                    window.sessionStorage.setItem('status', false)
                    setAlertType('error')
                    setAlertMessage("Error 500: Internal server error")
                    setOpen(true)
                }
            });
    }

    //delete category
    const dialogAction = () => {
        setOpen(false)
        setId(-1)
        if (del_id > 0) {
            setLoadingProgress(true)
            console.log("ID: " + del_id);
            api.delete('/deleteBranch/' + del_id + ''
            )
                .then(function (response) {
                    setLoadingProgress(false)
                    // console.log(response.data)
                    if (response.data.error === false) {

                        const branchesCopy = branches.filter((branch) => {
                            return branch.id !== del_id
                        })
                        handleDialogClose();
                        setBranches(branchesCopy)
                        setAlertType('success')
                        setAlertMessage('Branch deleted successfully')
                        setOpen(true)


                    } else {
                        console.log(response.data.message)
                        // return [];
                        setAlertType('error')
                        setAlertMessage(response.data.message)
                        setOpen(true)
                    }

                })
                .catch(function (error) {
                    setLoadingProgress(false)
                    if (error.response.status === 401) {
                        navigate('/login')
                        //place your reentry code
                        console.log('Unauthorised')
                        sessionStorage.removeItem('status')
                        sessionStorage.removeItem('jwt_token')
                        setAlertType('error')
                        setAlertMessage("Error 401: Unauthorised user")
                        setOpen(true)
                    } else {
                        console.log('unknown error')
                        window.sessionStorage.setItem('status', false)
                        setAlertType('error')
                        setAlertMessage("Error 500: Internal server error")
                        setOpen(true)
                    }
                });
        } else {

        }

    }

    useEffect(() => {
        retrieveBranches();
    }, [])

    const renderBranchList = branches.map((branch) => {
        return (
            <BranchListRow key={branch.id} branch={branch} getDeleteBranchId={handleClickOpen}></BranchListRow>
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
                                        <li className="breadcrumb-item"><Link to={"/"}><i
                                            className="fas fa-home"></i></Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Branches</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">

                                <Link to={'addBranch'}>
                                    <button type="button" className="btn btn-sm btn-neutral my-1">New Branch</button>
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
                                <table className="table align-items-center table-flush table-hover mt-1" id="units_tbl">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>Branch Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="">
                                    {renderBranchList}
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

export default Branches;
