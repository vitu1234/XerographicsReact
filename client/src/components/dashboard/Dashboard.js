import react from "react";
import {useNavigate} from "react-router-dom";
import Login from "../Login/Login";
import TopBar from "../incl/TopBar";


function Dashboard() {
    const navigate = useNavigate()
    // if (sessionStorage.getItem("jwt_token") === null) {
    //     navigate('/login')
    // }
    return (

        <div>


            <div className="header bg-primary pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item"><a href="/"><i className="fas fa-home"></i></a>
                                        </li>
                                        <li className="breadcrumb-item">Dashboard</li>

                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-2"></div>
                            <div className="col-lg-2 col-5 text-right">

                                <div className="col-md-2"></div>
                                <div className="">
                                    <select className="form-control" name="selected_year" id="selected_year">

                                        <option defaultValue value="2000">2000 records</option>

                                        <option value="2001">2001 records</option>

                                        <option value="2002">2002 records</option>


                                        <option value='2021'>2021 records</option>
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
                                                <span className="h2 font-weight-bold mb-0">0</span>
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
                                                <span className="h2 font-weight-bold mb-0">6</span>
                                            </div>
                                            <div className="col-auto">
                                                <div
                                                    className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                    <i className="ni ni-chart-pie-35"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 mb-0 text-sm">

                                            <span className="text-nowrap">Since day 1</span>
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
                                                <span className="h2 font-weight-bold mb-0">3</span>
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
                                                className="fa fa-arrow-down"></i> 0</span>
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
                                                <span className="h2 font-weight-bold mb-0">3</span>
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

        </div>
    );

}

export default Dashboard;