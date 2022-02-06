import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../api/api";
import Alert from "../alerts/alert";


function AddUser() {
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
    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user_branch, setUserBranch] = useState("");
    const [user_Role, setUserRole] = useState("");


    const add = (e) => {
        e.preventDefault()
        if (user_Role === "" || user_branch === "" || firstName === "" || lastName === "" || email === "" || password === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory')
            setAlertType('error')
        } else {
            const state = {
                fname: firstName,
                lname: lastName,
                email: email,
                ubranch: user_branch,
                urole: user_Role,
                password: password
            }
            AddUserHandler(state)
            setfirstName("") // clear form fields 
            setLastName("") // clear form fields 
            setEmail("") // clear form fields 
            setUserBranch("") // clear form fields 
            setUserRole("") // clear form fields 
            setPassword("") // clear form fields 


            // navigate('/users');

        }
    }

    const AddUserHandler = (state) => {
        console.log(state)

        api.post('/saveUser'
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

    // retrieve branches
    const retrieveBranches = () => {
        api.get('/fetchAllBranches'

        )
            .then(function (response) {
                // console.log(response.data)
                if (response.data.error == false) {

                    // console.log(response.data.users)
                    setBranches(response.data.branches)
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
        retrieveBranches();
    }, [])

    const renderBranchList = branches.map((branch) => {
        return (
            <option key={branch.id} value={branch.id} >{branch.branch_name}</option>
        );
    })

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
                                            <li className="breadcrumb-item active" aria-current="page">Add User</li>
                                        </ol>
                                    </nav>
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
                                    <form onSubmit={add}>
                                        <div className="row">
                                            <div className=" col-md-6">
                                                <div className="form-group">
                                                    <label >User role <span className='text-danger'>*</span></label>
                                                    <select value={user_Role} onChange={(e) => setUserRole(e.target.value)} className="form-control" name="urole" id="urole" required>
                                                        <option disabled value=''>-select-</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="manager">Manager</option>
                                                        <option value="shop_user">Assistant</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className=" col-md-6">
                                                <div className="form-group">
                                                    <label >Branch <span className='text-danger'>*</span></label>
                                                    <select value={user_branch} onChange={(e) => setUserBranch(e.target.value)} className="form-control" name="ubranch" id="ubranch" required>
                                                        <option value='' disabled>-select-</option>
                                                        {renderBranchList}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Firstname <span className='text-danger'>*</span></label>
                                                    <input value={firstName} onChange={(e) => setfirstName(e.target.value)} type="text" className="form-control" name="fname" id="fname" placeholder="Ex: John" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Lastname <span className='text-danger'>*</span></label>
                                                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" name="lname" id="lname" placeholder="Ex: Doe" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Email address <span className='text-danger'>*</span></label>
                                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" name="email" id="email" placeholder="Ex: email@example.com" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label >Password <span className='text-danger'>*</span></label>
                                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" name="password" id="password" placeholder="Password" required />
                                                </div>
                                            </div>

                                        </div>


                                        <div className="modal-footer">
                                            <button type="submit" id="btn_add" className="btn btn-primary">Save</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default AddUser;