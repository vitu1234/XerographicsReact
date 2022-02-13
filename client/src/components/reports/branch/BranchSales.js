import * as React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {DatePickerStartEnd} from "../DatePickerStartEnd";
import api from "../../../api/api";
import {useEffect, useState} from "react";
import Alert from "../../alerts/alert";
import Dialogs from "../../alerts/dialog";
import LinearProgressLoad from "../../alerts/LinearProgress";
import ReportListRow from "../ReportListRow";
import BranchSearchList from "./BranchSearchList";


export function BranchSales() {
    const navigate = useNavigate()

    //user state
    const [branches, setBranches] = useState([])
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [startSearchDate, setStartDate] = useState("");
    const [endSearchDate, setEndDate] = useState("");
    const [searchBranchId, setBranchId] = useState("");
    const [loadingProgress, setLoadingProgress] = useState(false);
    const [branchReports, setBranchReports] = useState([]);

    //alert state
    const [open, setOpen] = useState(false);


    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };


    // retrieve users
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

    useEffect(() => {
        retrieveBranches();
    }, [])

    const loading = () => {
        if (loadingProgress) {
            return (
                <div className="mb-3">
                    <LinearProgressLoad/>
                </div>
            )
        }
    }

    const handleSearchForm = (e) => {
        e.preventDefault();
        if (searchBranchId === '') {
            setAlertMessage("Please select at least one sales branch...")
            setAlertType("error")
            setOpen(true)
            return;
        }
        if (startSearchDate === '') {
            setAlertMessage("Search start date is mandatory")
            setAlertType("error")
            setOpen(true)
            return;
        }

        if (endSearchDate === '') {
            setAlertMessage("Search end date is mandatory")
            setAlertType("error")
            setOpen(true)
            return;
        }

        const state = {
            filter_branch: searchBranchId,
            filter_user_start: startSearchDate,
            filter_user_end: endSearchDate
        }

        //search using the given parameters when submitted
        api.post('/filterBranchReports'
            , state
        )
            .then(function (response) {
                // console.log(response.data)
                if (response.data.error === false) {

                    console.log(response.data.invoices)
                    // return response.data.users;
                    setBranchReports(response.data.invoices)
                    setAlertType('success')
                    setAlertMessage(response.data.message)
                    setOpen(true)


                } else {
                    // console.log(response.data.message)
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                }

            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    navigate('/login')
                    //place your reentry code
                    console.log('Unauthorised')
                    sessionStorage.removeItem('status')
                    sessionStorage.removeItem('jwt_token')
                } else {
                    console.log('unknown error')
                    window.sessionStorage.setItem('status', false)
                }
            });

    }

    const renderReportsList = branchReports.map((report) => {
        return (
            <ReportListRow key={report.id} report={report}
            ></ReportListRow>
        );
    })

    return (
        <div>


            <div className="header bg-primary pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item"><Link
                                            to="/"><i className="fas fa-home"></i></Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page"><Link
                                            to={'/reports'}> Reports</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Branch</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">

                                {/*<Link to={'addCustomer'}>*/}
                                {/*    <button type="button" className="btn btn-sm btn-neutral my-1">New Customer</button>*/}
                                {/*</Link>*/}

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
                            <form onSubmit={handleSearchForm}>

                                <div className="row p-3 m-3">

                                    <div className="col-md-4 ">

                                        <div className="form-group">
                                            <BranchSearchList setBranchId={setBranchId} branches={branches}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 ">

                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="mx-1">

                                                    <DatePickerStartEnd setStartDate={setStartDate}/>
                                                </div>
                                                <div className="mx-1">
                                                    <DatePickerStartEnd setEndDate={setEndDate}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-1 ">

                                        <div className="form-group">
                                            <button type="submit" id="btn_find" className="btn btn-primary">Find
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </form>

                            <div className="table-responsive mt-1" id="show_reports">
                                <table className="table align-items-center table-flush table-hover mt-1" id="units_tbl">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Invoice #</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="list">

                                    {renderReportsList}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType}
                   handleAlertClose={handleAlertClose}/>
        </div>
    );
};