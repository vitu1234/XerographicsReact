import {useNavigate} from "react-router-dom";
import Analytics from "./Analytics";
import React, {useEffect, useState} from "react";
import api from "../../api/api";
import LinearProgressLoad from "../alerts/LinearProgress";
import Dialogs from "../alerts/dialog";
import Alert from "../alerts/alert";
import ReportListRow from "../reports/ReportListRow";


function Dashboard() {

    const navigate = useNavigate()
    const [loadingProgress, setLoadingProgress] = useState(false);
    const [alertType, setAlertType] = useState("");
    let dashboard_url = '';
    //alert state
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [app_type, setAppType] = useState(sessionStorage.getItem('app_type'));
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [branch_selected, setReportBranch] = useState('');
    const all_months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");


    const [branches, setBranches] = useState([])
    const [customers, setCustomers] = useState([])
    const [product_available, setProductsAvailable] = useState([])
    const [product_unavailable, setProductsUnavailable] = useState([])
    const [salesThisMonth, setSalesThisMonth] = useState([])
    const [salesLastThirtyDays, setSalesLastThirtyDays] = useState([])
    const [recent_sales, setRecentSales] = useState([])
    const [years, setYears] = useState([])
    const [year_summary, setYearSummary] = useState([])
    const [customers_summary, setCustomerSummary] = useState([])


    // retrieve dashboard stuff
    const retrieveDashboard = () => {
        setLoadingProgress(true)
        api.get(dashboard_url
        )
            .then(function (response) {
                setLoadingProgress(false)
                if (response.data.error === false) {

                    // console.log(response.data.users)
                    setBranches(response.data.branches)
                    setCustomers(response.data.customers)
                    setProductsAvailable(response.data.products_available)
                    setProductsUnavailable(response.data.products_unavailable)
                    setProductsUnavailable(response.data.products_unavailable)
                    setRecentSales(response.data.recent_sales)
                    setSalesLastThirtyDays(response.data.salesLastThirtyDays)
                    setSalesThisMonth(response.data.salesThisMonth)
                    setYears(response.data.years)
                    setYearSummary(response.data.year_summary)
                    setCustomerSummary(response.data.customers_summary)
                    // return response.data.users;

                } else {
                    // console.log(response.data.message)
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)


                }

            })
            .catch(function (response) {
                setLoadingProgress(false)
                console.log(response)
                if (response.status === 401) {
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
                    setAlertMessage("Refresh the page to login again!")
                    setOpen(true)
                }
            });
    }

    useEffect(() => {
        setLoadingProgress(true)
        const d = new Date();
        setYear(d.getFullYear().toString());
        setMonth(d.getMonth().toString());

        if (app_type === '101') {
            dashboard_url = '/all/' + d.getFullYear().toString() + '/' + d.getMonth().toString();
            setReportBranch('all')
        } else {
            setReportBranch(sessionStorage.getItem('branch'))
            dashboard_url = '/' + sessionStorage.getItem('branch') + '/' + d.getFullYear().toString() + '/' + d.getMonth().toString();
        }
        retrieveDashboard();
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

    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };

    let countYear = 0;
    let countMonth = 0;
    const renderYearList = years.map((year) => {
            countYear++
            return (
                (year === new Date().getFullYear()) ? <option selected key={countYear} value={year}>{year}</option> :
                    <option key={countYear} value={year}>{year}</option>
            )
        }
    )

    const renderBranchList = branches.map((branch) => {
        return (
            <option key={branch.id} value={branch.id}>{branch.branch_name}</option>
        );
    })

    const getMonthFromString = (mon) => {
        return new Date(Date.parse(mon + " 1")).getMonth() + 1
    }

    const renderMonthList = all_months.map((month) => {
        countMonth++
        return (
            (getMonthFromString(month) === new Date().getMonth()) ?
                <option selected key={countMonth} value={getMonthFromString(month)}>{month}</option> :
                <option key={countMonth} value={getMonthFromString(month)}>{month}</option>
        )

    })


    const branchChange = (e) => {
        dashboard_url = '/' + e.target.value + '/' + year + '/' + month;
        setReportBranch(e.target.value)
        retrieveDashboard();
    }

    const monthChange = (e) => {
        setMonth(e.target.value);
        dashboard_url = '/' + branch_selected + '/' + year + '/' + e.target.value;
        retrieveDashboard();
    }

    const yearChange = (e) => {
        setYear(e.target.value);
        dashboard_url = '/' + branch_selected + '/' + e.target.value + '/' + month;
        console.log(dashboard_url)
        retrieveDashboard();
    }

    return (
        <div>

            <div className="header bg-primary pb-6">
                {loading()}
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7  my-1">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">

                                        <li className="breadcrumb-item"><i className="fas fa-home"></i> Dashboard</li>

                                    </ol>
                                </nav>
                            </div>


                            <div className="col-lg-2 col-md-5 text-right my-1">

                                <div className="col-md-2"></div>
                                <div className="">
                                    <select onChange={branchChange} className="form-control">
                                        <option key='all' value='all'>All Branches</option>

                                        {renderBranchList}
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-5 text-right my-1">

                                <div className="col-md-2"></div>
                                <div className="">
                                    <select onChange={monthChange} className="form-control">
                                        {renderMonthList}
                                    </select>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-5 text-right my-1">

                                <div className="col-md-2"></div>
                                <div className="">
                                    <select onChange={yearChange} className="form-control">
                                        {renderYearList}
                                    </select>
                                </div>
                            </div>

                        </div>
                        {/* <!-- Card stats --> */}
                        <div className="row">

                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    {/* <!-- Card body --> */}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0"> Sales</h5>
                                                <span
                                                    className="h2 font-weight-bold mb-0">{salesLastThirtyDays.length}</span>
                                            </div>
                                            <div className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                                    <i className="ni ni-active-40"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 mb-0 text-sm">

                                            <span className="text-nowrap">Last 30 days</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    {/* <!-- Card body --> */}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Customers</h5>
                                                <span className="h2 font-weight-bold mb-0">{customers.length}</span>
                                            </div>
                                            <div className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                    <i className="ni ni-chart-pie-35"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 mb-0 text-sm">

                                            <span className="text-nowrap">Since day 1 [all branches]</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    {/* <!-- Card body --> */}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Inventory</h5>
                                                <span
                                                    className="h2 font-weight-bold mb-0">{product_available.length}</span>
                                            </div>
                                            <div className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                                    <i className="ni ni-money-coins"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 mb-0 text-sm">
                                            <span className="text-danger mr-2"><i
                                                className="fa fa-arrow-down"></i> {product_unavailable.length}</span>
                                            <span className="text-nowrap">Out of Stock</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-stats">
                                    {/* <!-- Card body --> */}
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h5 className="card-title text-uppercase text-muted mb-0">Branches</h5>
                                                <span className="h2 font-weight-bold mb-0">{branches.length}</span>
                                            </div>
                                            <div className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                                    <i className="ni ni-chart-bar-32"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 mb-0 text-sm">

                                            <span className="text-nowrap">Now</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Analytics recent_sales={recent_sales} salesThisMonth={salesThisMonth}
                       salesLastThirtyDays={salesLastThirtyDays} year_summary={year_summary}
                       customers_summary={customers_summary}/>


            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType}
                   handleAlertClose={handleAlertClose}/>
        </div>
    );

}

export default Dashboard;