import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../api/api";
import Alert from "../alerts/alert";


function UserDetails(props) {
    const location = useLocation()
    const user = location.state.user;
    // console.log(user)

    const navigate = useNavigate();


    //alert state
    const [open, setOpen] = useState(false);
    //dialog state

    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");



    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };


    const [branches, setBranches] = useState([])
    const [firstName, setfirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [user_branch, setUserBranch] = useState("");
    const [user_Role, setUserRole] = useState("");
    const [userStatus, setUserStatus] = useState(user.status)

    const updateUser = (e) => {
        // console.log("sjsjs")
        e.preventDefault()
        if (user_Role === "" || user_branch === "" || firstName === "" || lastName === "" || email === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory')
            setAlertType('error')
        } else {
            const state = {
                efname: firstName,
                elname: lastName,
                eemail: email,
                eubranch: user_branch,
                eurole: user_Role,
                user_status: userStatus,
                euser_id: user.id,
                epassword: password
            }
            AddUserHandler(state)
            setfirstName(user.firstname) // clear form fields 
            setLastName(user.lastname) // clear form fields 
            setEmail(user.email) // clear form fields 
            setUserBranch("") // clear form fields 
            setUserRole(user.role) // clear form fields 
            setPassword("") // clear form fields 
            setUserStatus(user.status)
        }
    }

    const AddUserHandler = (state) => {
        console.log(state)

        api.put('/updateUser'
            , state
        )
            .then(function (response) {
                // console.log(response.data)
                if (response.data.error == false) {

                    // console.log(response.data.users)
                    // return response.data.users;
                    setAlertType('success')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                    setTimeout(() => { navigate('/users'); }, 1000)

                } else {
                    // console.log(response.data.message)
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                }

            })
            .catch(function (error) {
                console.log(error);
                setAlertType('error')
                setAlertMessage("Error 500: Internal server error")
                setOpen(true)
            });
    }

    // retrieve user data
    const retrieveData = () => {
        api.get('/editUser/' + user.id + ''

        )
            .then(function (response) {
                // console.log(response.data)
                if (response.data.error == false) {

                    // console.log(response.data)
                    setBranches(response.data.branches)
                    setUserBranch(response.data.userbranch.branch_id)
                    setUserRole(user.role)
                    // return response.data.users;

                } else {
                    // console.log("sjs")
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)

                }

            })
            .catch(function (myJson) {
                // console.log(myJson);
                setAlertType('error')
                setAlertMessage('Error 500: Internal server error')
                setOpen(true)
            });
    }



    useEffect(() => {

        retrieveData();
    }, [])

    const renderBranchList = branches.map((branch) => {
        return (
            <option key={branch.id} value={branch.id} >{branch.branch_name}</option>
        );
    })

    const StatusUser = () => {
        // console.log(userStatus)
        if (userStatus === 'Active') {
            return (
                <div className="" role="group" aria-label="Basic radio toggle button group">
                    <input onClick={(e) => setUserStatus(e.target.value)} value="Active" type="radio" className="btn-check" name="user_status" id="user_status1" autocomplete="off" defaultChecked />
                    <label className="btn btn-sm btn-outline-primary " for="user_status1">Active</label>

                    <input onClick={(e) => setUserStatus(e.target.value)} value="Inactive" type="radio" className="btn-check btn-danger" name="user_status" id="user_status2" autocomplete="off" />
                    <label className="btn btn-sm btn-danger " for="user_status2">Inactive</label>

                </div>
            )
        } else {
            return (
                <div className="" role="group" aria-label="Basic radio toggle button group">
                    <input onClick={(e) => setUserStatus(e.target.value)} value="Active" type="radio" className="btn-check" name="user_status" id="user_status1" autocomplete="off" />
                    <label className="btn btn-sm btn-outline-primary " for="user_status1">Active</label>

                    <input onClick={(e) => setUserStatus(e.target.value)} value="Inactive" type="radio" className="btn-check btn-danger" name="user_status" id="user_status2" autocomplete="off" defaultChecked />
                    <label className="btn btn-sm btn-danger " for="user_status2">Inactive</label>

                </div>
            )
        }
    }

    return (
        <div>
            <div className="">
                <div className="header bg-primary pb-6">
                    <div className="container-fluid">
                        <div className="header-body">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-7">
                                    <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                        <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                            <li className="breadcrumb-item"><Link to={"/"}><i className="fas fa-home"></i></Link></li>
                                            <li className="breadcrumb-item active" aria-current="page"><Link to={'/users'}>Users</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Edit User Details</li>
                                        </ol>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container-fluid mt--6">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="container-fluid mt-5">
                                <form onSubmit={updateUser}>

                                    <input type="hidden" name="euser_id" id="euser_id" value={user.id} required />

                                    <div className="row">
                                        <div className=" col-md-6">
                                            <div className="form-group">
                                                <label >User role <span className='text-danger'>*</span></label>
                                                <select value={user_Role} onChange={(e) => setUserRole(e.target.value)} className="form-control" name="eurole" id="eurole" required>
                                                    <option value="admin">Admin</option>
                                                    <option value="manager">Manager</option>
                                                    <option value="shop_user">Assistant</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className=" col-md-6">
                                            <div className="form-group">
                                                <label >Branch <span className='text-danger'>*</span></label>
                                                <select value={user_branch} onChange={(e) => setUserBranch(e.target.value)} className="form-control" name="eubranch" id="eubranch" required>
                                                    {renderBranchList}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Firstname <span className='text-danger'>*</span></label>
                                                <input value={firstName} onChange={(e) => setfirstName(e.target.value)} type="text" className="form-control" name="efname" id="efname" placeholder="Ex: John" required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Lastname <span className='text-danger'>*</span></label>
                                                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" name="elname" id="elname" placeholder="Ex: Doe" required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Email address <span className='text-danger'>*</span></label>
                                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" name="eemail" id="eemail" placeholder="Ex: email@example.com" required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Password <span className='text-danger'>*</span></label>
                                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" name="epassword" id="epassword" placeholder="Password" />
                                            </div>
                                        </div>

                                    </div>
                                    {StatusUser()}

                                    <div className="modal-footer">
                                        <button type="submit" id="btn_add" className="btn btn-primary">Save</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default UserDetails;