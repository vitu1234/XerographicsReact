import { Link } from "react-router-dom";
function SideBar() {
    return (

        // < !--Sidenav -- >
        <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
            <div className="scrollbar-inner">
                {/* <!-- Brand --> */}
                <div className="sidenav-header  align-items-center">
                    <a className="navbar-brand" href="#">
                        <img src="http://xerographics.test/assets/img/brand/logo.png" className="navbar-brand-img" alt="Logo" />
                    </a>
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
                                <a className="nav-link " href="/sales">
                                    <i className="ni ni-support-16 text-orange"></i>
                                    <span className="nav-link-text">Sales</span>
                                </a>
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
                                            <a className="nav-link" href="/reports/user">
                                                <i className="ni ni ni-single-02 text-orange"></i>
                                                <span className="nav-link-text">User Sales</span>
                                            </a>
                                        </li>



                                        <li className="">
                                            <a className="nav-link" href="/reports/branch">
                                                <i className="ni ni-pin-3 text-success"></i>
                                                <span className="nav-link-text">Branch Sales</span>
                                            </a>
                                        </li>

                                        <li className="">
                                            <a className="nav-link" href="/reports/category">
                                                <i className="ni ni-box-2 text-primary"></i>
                                                <span className="nav-link-text">Category Sales</span>
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " href="/profile">
                                    <i className="ni ni-single-02 text-yellow"></i>
                                    <span className="nav-link-text">My Profile</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="/settings">
                                    <i className="ni ni-settings-gear-65 text-default"></i>
                                    <span className="nav-link-text">Settings</span>
                                </a>
                            </li>


                            <li className="nav-item">
                                <a href="http://xerographics.test/logout"
                                    className="nav-link" >
                                    <i className="ni ni-button-power text-info"></i>
                                    <span className="nav-link-text">Logout</span>
                                </a>

                                <form id="logout-form" action="http://xerographics.test/logout" method="POST" className="d-none">
                                    <input type="hidden" name="_token" value="tLvHNwZu1JJ7RJjN2bU0JR2zpANLT1G6kdspDj1Q" />        </form>
                            </li>

                        </ul>



                    </div>
                </div>
            </div>
        </nav>

    );
}

export default SideBar;
