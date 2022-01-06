import { Link } from "react-router-dom";
function TopBar() {
    return (
        <nav className="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    {/* <!-- Navbar links --> */}
                    <ul className="navbar-nav align-items-center  ml-md-auto ">
                        <li className="nav-item d-xl-none">
                            {/* <!-- Sidenav toggler --> */}
                            <div className="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin" data-target="#sidenav-main">
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                    <i className="sidenav-toggler-line"></i>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item d-sm-none">
                            <a className="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
                                <i className="ni ni-zoom-split-in"></i>
                            </a>
                        </li>

                    </ul>
                    <ul className="navbar-nav align-items-center  ml-auto ml-md-0 ">
                        <li className="nav-item dropdown">
                            <a className="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div className="media align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                        <img alt="Image placeholder" src="/storage/product_images/noimage.jpg" />
                                    </span>
                                    <div className="media-body  ml-2  d-none d-lg-block">
                                        <span className="mb-0 text-sm  font-weight-bold">Vitu</span>
                                    </div>
                                </div>
                            </a>
                            <div className="dropdown-menu  dropdown-menu-right ">
                                <div className="dropdown-header noti-title">
                                    <h6 className="text-overflow m-0">Welcome!</h6>
                                </div>
                                <a href="/profile" className="dropdown-item">
                                    <i className="ni ni-single-02"></i>
                                    <span>My profile</span>
                                </a>
                                <a href="/settings" className="dropdown-item">
                                    <i className="ni ni-settings-gear-65"></i>
                                    <span>Settings</span>
                                </a>


                                <div className="dropdown-divider"></div>
                                <a href="http://xerographics.test/logout" className="dropdown-item">
                                    <i className="ni ni-user-run"></i>
                                    <span>Logout</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default TopBar;