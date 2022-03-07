import React from 'react';
import Link from "@mui/material/Link";
import BaseUrl from "../../api/baseUrl";

function Settings(props) {

    const img_url = props.img_url
    const username = props.username

    const changeHandler = (e) => {
        console.log(e.target.value)
    }

    const deleteAccountHandler = (e) => {
        e.preventDefault()
    }

    const profileInfoHanndler = (e) => {
        e.preventDefault()
    }

    const changePasswordHandler = (e) => {
        e.preventDefault()
    }

    const notificationsHandler = (e) => {
        e.preventDefault()
    }
    const appSettingsHandler = (e) => {
        e.preventDefault()
    }


    return (
        <div className='mt-3'>
            <div className="container">


                <div className="row gutters-sm">
                    <div className="col-md-4 d-none d-md-block">
                        <div className="card">
                            <div className="card-body">
                                <nav className="nav flex-column nav-pills nav-gap-y-1">

                                    <a href="#profile" data-toggle="tab"
                                       className="nav-item nav-link has-icon nav-link-faded active">
                                        <svg width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="feather feather-user mr-2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        Profile Information
                                    </a>
                                    <a href="#account" data-toggle="tab"
                                       className="nav-item nav-link  nav-link-faded">
                                        <svg width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="feather feather-settings mr-2">
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <path
                                                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                        </svg>
                                        Account Settings
                                    </a>
                                    <a href="#security" data-toggle="tab"
                                       className="nav-item nav-link has-icon nav-link-faded">
                                        <svg width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="feather feather-shield mr-2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        </svg>
                                        Security
                                    </a>
                                    <a href="#notification" data-toggle="tab"
                                       className="nav-item nav-link has-icon nav-link-faded">
                                        <svg width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="feather feather-bell mr-2">
                                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                        </svg>
                                        Notification
                                    </a>
                                    <a href="#billing" data-toggle="tab"
                                       className="nav-item nav-link has-icon nav-link-faded">
                                        <svg width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="feather feather-credit-card mr-2">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                            <line x1="1" y1="10" x2="23" y2="10"></line>
                                        </svg>
                                        App Settings
                                    </a>

                                    <a href="#database" data-toggle="tab"
                                       className="nav-item nav-link has-icon nav-link-faded">
                                        <svg width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="feather feather-credit-card mr-2">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                            <line x1="1" y1="10" x2="23" y2="10"></line>
                                        </svg>
                                        Database
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header border-bottom mb-3 d-flex d-md-none">
                                <ul className="nav nav-tabs card-header-tabs nav-gap-x-1" role="tablist">
                                    <li className="nav-item">
                                        <a href="#profile" data-toggle="tab" className="nav-link has-icon active">
                                            <svg width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 className="feather feather-user">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#account" data-toggle="tab" className="nav-link has-icon">
                                            <svg width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 className="feather feather-settings">
                                                <circle cx="12" cy="12" r="3"></circle>
                                                <path
                                                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#security" data-toggle="tab" className="nav-link has-icon">
                                            <svg width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 className="feather feather-shield">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#notification" data-toggle="tab" className="nav-link has-icon">
                                            <svg width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 className="feather feather-bell">
                                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#billing" data-toggle="tab" className="nav-link has-icon">
                                            <svg width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 className="feather feather-credit-card">
                                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                                <line x1="1" y1="10" x2="23" y2="10"></line>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body tab-content">
                                <div className="tab-pane active" id="profile">
                                    <h6>YOUR PROFILE INFORMATION</h6>
                                    <hr/>

                                    <img height={200} width={200} alt="Image placeholder"
                                         src={`${BaseUrl}/storage/product_images/${img_url}`}/>
                                    <br/>
                                    <br/>
                                    <form onSubmit={profileInfoHanndler}>
                                        <div className="form-group">
                                            <label htmlFor="fullName">Profile Picture</label>
                                            <input type="file" className="form-control"
                                                   aria-describedby="fullNameHelp"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="fullName">Email</label>
                                            <input type="email" disabled className="form-control"
                                                   aria-describedby="fullNameHelp"
                                                   placeholder="Enter an email"
                                                   value="user@mail.com" required/>
                                        </div>

                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <label htmlFor="fullName">First name <i style={{color: 'red'}}>*</i></label>
                                                    <input type="text" className="form-control"
                                                           aria-describedby="fullNameHelp"
                                                           placeholder="Enter your first name"
                                                           required/>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <label htmlFor="fullName">Surname <i
                                                        style={{color: 'red'}}>*</i></label>
                                                    <input type="text" className="form-control"
                                                           aria-describedby="fullNameHelp"
                                                           placeholder="Enter your surname"
                                                           required/>
                                                </div>
                                            </div>
                                            <small><i style={{color: 'red'}}>*</i> indicates mandatory field</small>
                                            <br/>
                                        </div>


                                        <button type="submit" className="btn btn-primary">Update Profile</button>
                                    </form>
                                </div>
                                <div className="tab-pane" id="account">
                                    <h6>ACCOUNT SETTINGS</h6>
                                    <hr/>
                                    <form onSubmit={deleteAccountHandler}>
                                        <div className="form-group">
                                            <label htmlFor="username">Password</label>
                                            <input type="password" className="form-control"
                                                   aria-describedby="usernameHelp" placeholder="Enter your password"
                                                   required/>
                                            <small id="usernameHelp" className="form-text text-muted">Enter your account
                                                password to verify its you.</small>
                                        </div>
                                        <hr/>
                                        <div className="form-group">
                                            <label className="d-block text-danger">Delete Account</label>
                                            <p className="text-muted font-size-sm">Once you delete your account,
                                                there is no going back. Please be certain.</p>
                                        </div>
                                        <button className="btn btn-danger" type="submit">Delete Account</button>
                                    </form>
                                </div>
                                <div className="tab-pane" id="security">
                                    <h6>SECURITY SETTINGS</h6>
                                    <hr/>
                                    <form onSubmit={changePasswordHandler}>
                                        <div className="form-group">
                                            <label className="d-block">Change Password</label>
                                            <input type="text" className="form-control"
                                                   placeholder="Enter your old password"/>
                                            <input type="text" className="form-control mt-1"
                                                   placeholder="New password"/>
                                            <input type="text" className="form-control mt-1"
                                                   placeholder="Confirm new password"/>
                                        </div>

                                        <button className="btn btn-primary"
                                                type="submit">Save Changes
                                        </button>
                                    </form>
                                    <hr/>


                                </div>
                                <div className="tab-pane" id="notification">
                                    <h6>NOTIFICATION SETTINGS</h6>
                                    <hr/>
                                    <form onSubmit={notificationsHandler}>
                                        <div className="form-group">
                                            {/*<label className="d-block mb-0">Security Alerts</label>*/}
                                            <div className="small text-muted mb-3">Receive notifications when:
                                            </div>
                                            <div className="custom-control custom-checkbox">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input"
                                                           id="exampleCheck1"/>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Stock
                                                        running out</label>
                                                </div>
                                            </div>

                                            <div className="custom-control custom-checkbox">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input"
                                                           id="exampleCheck1"/>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">User
                                                        login</label>
                                                </div>
                                            </div>

                                            <div className="custom-control custom-checkbox">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input"
                                                           id="exampleCheck1"/>
                                                    <label className="form-check-label" htmlFor="exampleCheck1">Sales
                                                        Invoice</label>
                                                </div>
                                            </div>

                                            <button className="btn btn-primary"
                                                    type="submit">Save Changes
                                            </button>

                                        </div>

                                    </form>
                                </div>
                                <div className="tab-pane" id="billing">
                                    <h6>APP SETTINGS</h6>
                                    <hr/>
                                    <form onSubmit={appSettingsHandler}>
                                        <div className="form-group">
                                            {/*<label className="d-block mb-0">Security Alerts</label>*/}
                                            {/*<div className="small text-muted mb-3">Receive notifications when:*/}
                                        </div>
                                        <div className="custom-control custom-checkbox">
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input"
                                                       id="exampleCheck1"/>
                                                <label className="form-check-label" htmlFor="exampleCheck1">
                                                    Log users activity</label>
                                            </div>
                                        </div>


                                        <button className="btn btn-primary"
                                                type="submit">Save Changes
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Settings;