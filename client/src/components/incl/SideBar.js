import {Link} from "react-router-dom";
import React from "react";

function SideBar() {
    const user_type = sessionStorage.getItem('app_type')
    //shop assistant
    if (user_type === '303') {
        return (
            // < !--Sidenav -- >
            <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white"
                 id="sidenav-main">
                <div className="scrollbar-inner">
                    <div className='support mt-3'>
                        <div className="call-support show-mobile">
                            <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin"
                                 data-target="#sidenav-main">
                                <div className="sidenav-toggler-inner">
                                    <i className="text-primary">&#10006;</i>

                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <!-- Brand --> */}
                    <div className="sidenav-header  align-items-center">
                        <Link className="navbar-brand" to={'/'}>
                            <img src="http://xerographics.test/assets/img/brand/logo.png" className="navbar-brand-img"
                                 alt="Logo"/>
                        </Link>

                    </div>
                    <div className="navbar-inner">
                        {/* <!-- Collapse --> */}
                        <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                            {/* <!-- Nav items --> */}
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" to={'/'}>
                                        <i className="ni ni-tv-2 text-primary"></i>
                                        <span className="nav-link-text">Dashboard</span>
                                    </Link>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link " to={'/pos'}>
                                        <i className="ni ni-single-02 text-orange"></i>
                                        <span className="nav-link-text">POS</span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link " href={"/profile"}>
                                        <i className="ni ni-single-02 text-yellow"></i>
                                        <span className="nav-link-text">My Profile</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href={"/settings"}>
                                        <i className="ni ni-settings-gear-65 text-default"></i>
                                        <span className="nav-link-text">Settings</span>
                                    </a>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link " to={"/logout"}>
                                        <i className="ni ni-button-power text-info"></i>
                                        <span className="nav-link-text">Logout</span>
                                    </Link>
                                </li>


                            </ul>


                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    //manager
    if (user_type === '202') {
        return (

            // < !--Sidenav -- >
            <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white"
                 id="sidenav-main">
                <div className="scrollbar-inner">
                    <div className='support mt-3'>
                        <div className="call-support show-mobile">
                            <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin"
                                 data-target="#sidenav-main">
                                <div className="sidenav-toggler-inner">
                                    <i className="text-primary">&#10006;</i>

                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <!-- Brand --> */}
                    <div className="sidenav-header  align-items-center">
                        <Link className="navbar-brand" to={'/'}>
                            <img src="http://xerographics.test/assets/img/brand/logo.png" className="navbar-brand-img"
                                 alt="Logo"/>
                        </Link>

                    </div>
                    <div className="navbar-inner">
                        {/* <!-- Collapse --> */}
                        <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                            {/* <!-- Nav items --> */}
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link active" to={'/'}>
                                        <i className="ni ni-tv-2 text-primary"></i>
                                        <span className="nav-link-text">Dashboard</span>
                                    </Link>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link " to={'/users'}>
                                        <i className="ni ni-single-02 text-orange"></i>
                                        <span className="nav-link-text">Users</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to={"/units"}>
                                        <i className="ni ni-bullet-list-67 text-primary"></i>
                                        <span className="nav-link-text">Units</span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link " to={"/categories"}>
                                        <i className="ni ni-box-2 text-primary"></i>
                                        <span className="nav-link-text">Categories</span>
                                    </Link>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link " to={"/products"}>
                                        <i className="ni ni-bag-17 text-primary"></i>
                                        <span className="nav-link-text">Products</span>
                                    </Link>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link " to={'/pos'}>
                                        <i className="ni ni-single-02 text-orange"></i>
                                        <span className="nav-link-text">POS</span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <a data-toggle="collapse" data-target="#collapseList" className="nav-link "
                                       href="#">
                                        <i className="ni ni-books text-primary"></i>
                                        <span className="nav-link-text">Reports</span>
                                    </a>
                                    <div id="collapseList" className="sidebar-submenu collapse">
                                        <ul className="">

                                            <li className="">
                                                <Link className="nav-link" to={"/reports/user"}>
                                                    <i className="ni ni ni-single-02 text-orange"></i>
                                                    <span className="nav-link-text">User Sales</span>
                                                </Link>
                                            </li>


                                            <li className="">
                                                <Link className="nav-link" to={"/reports/branch"}>
                                                    <i className="ni ni-pin-3 text-success"></i>
                                                    <span className="nav-link-text">Branch Sales</span>
                                                </Link>
                                            </li>

                                            <li className="">
                                                <Link className="nav-link" to={"/reports/category"}>
                                                    <i className="ni ni-box-2 text-primary"></i>
                                                    <span className="nav-link-text">Category Sales</span>
                                                </Link>
                                            </li>

                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link " href={"/profile"}>
                                        <i className="ni ni-single-02 text-yellow"></i>
                                        <span className="nav-link-text">My Profile</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " href={"/settings"}>
                                        <i className="ni ni-settings-gear-65 text-default"></i>
                                        <span className="nav-link-text">Settings</span>
                                    </a>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link " to={"/logout"}>
                                        <i className="ni ni-button-power text-info"></i>
                                        <span className="nav-link-text">Logout</span>
                                    </Link>
                                </li>


                            </ul>


                        </div>
                    </div>
                </div>
            </nav>

        );
    }

    return (

        // < !--Sidenav -- >
        <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white"
             id="sidenav-main">
            <div className="scrollbar-inner">
                <div className='support mt-3'>
                    <div className="call-support show-mobile">
                        <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin"
                             data-target="#sidenav-main">
                            <div className="sidenav-toggler-inner">
                                <i className="text-primary">&#10006;</i>

                            </div>
                        </div>
                    </div>
                </div>


                {/* <!-- Brand --> */}
                <div className="sidenav-header  align-items-center">
                    <Link className="navbar-brand" to={'/'}>
                        <img src="http://xerographics.test/assets/img/brand/logo.png" className="navbar-brand-img"
                             alt="Logo"/>
                    </Link>

                </div>
                <div className="navbar-inner">
                    {/* <!-- Collapse --> */}
                    <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                        {/* <!-- Nav items --> */}
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to={'/'}>
                                    <i className="ni ni-tv-2 text-primary"></i>
                                    <span className="nav-link-text">Dashboard</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className="nav-link " to={'/users'}>
                                    <i className="ni ni-single-02 text-orange"></i>
                                    <span className="nav-link-text">Users</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to={"/units"}>
                                    <i className="ni ni-bullet-list-67 text-primary"></i>
                                    <span className="nav-link-text">Units</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link " to={"/categories"}>
                                    <i className="ni ni-box-2 text-primary"></i>
                                    <span className="nav-link-text">Categories</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className="nav-link " to={"/products"}>
                                    <i className="ni ni-bag-17 text-primary"></i>
                                    <span className="nav-link-text">Products</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className="nav-link " to={"/branches"}>
                                    <i className="ni ni-pin-3 text-primary"></i>
                                    <span className="nav-link-text">Branches</span>
                                </Link>
                            </li>


                            <li className="nav-item">
                                <Link className="nav-link " to={'/pos'}>
                                    <i className="ni ni-single-02 text-orange"></i>
                                    <span className="nav-link-text">POS</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <a data-toggle="collapse" data-target="#collapseList" className="nav-link " href="#">
                                    <i className="ni ni-books text-primary"></i>
                                    <span className="nav-link-text">Reports</span>
                                </a>
                                <div id="collapseList" className="sidebar-submenu collapse">
                                    <ul className="">

                                        <li className="">
                                            <Link className="nav-link" to={"/reports/user"}>
                                                <i className="ni ni ni-single-02 text-orange"></i>
                                                <span className="nav-link-text">User Sales</span>
                                            </Link>
                                        </li>


                                        <li className="">
                                            <Link className="nav-link" to={"/reports/branch"}>
                                                <i className="ni ni-pin-3 text-success"></i>
                                                <span className="nav-link-text">Branch Sales</span>
                                            </Link>
                                        </li>

                                        <li className="">
                                            <Link className="nav-link" to={"/reports/category"}>
                                                <i className="ni ni-box-2 text-primary"></i>
                                                <span className="nav-link-text">Category Sales</span>
                                            </Link>
                                        </li>

                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " href={"/profile"}>
                                    <i className="ni ni-single-02 text-yellow"></i>
                                    <span className="nav-link-text">My Profile</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href={"/settings"}>
                                    <i className="ni ni-settings-gear-65 text-default"></i>
                                    <span className="nav-link-text">Settings</span>
                                </a>
                            </li>


                            <li className="nav-item">
                                <Link className="nav-link " to={"/logout"}>
                                    <i className="ni ni-button-power text-info"></i>
                                    <span className="nav-link-text">Logout</span>
                                </Link>
                            </li>

                        </ul>


                    </div>
                </div>
            </div>
        </nav>

    );
}

export default SideBar;
