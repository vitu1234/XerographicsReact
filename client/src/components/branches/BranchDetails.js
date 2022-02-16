import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../api/api";
import Alert from "../alerts/alert";
import LinearProgressLoad from "../alerts/LinearProgress";


function BranchDetails(props) {
    const location = useLocation()
    const branch = location.state.branch;
    // console.log(user)

    const navigate = useNavigate();


    //alert state
    const [open, setOpen] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(false);

    //dialog state

    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };


    const [branch_name, setBranchName] = useState(branch.branch_name);
    const [phone, setPhone] = useState(branch.phone);
    const [email, setEmail] = useState(branch.email);
    const [address, setAddress] = useState(branch.address);


    const updateBranch = (e) => {
        // console.log("sjsjs")
        e.preventDefault()
        if (branch_name === "" || phone === "" || email === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory except address')
            setAlertType('error')
        } else {
            setLoadingProgress(true)

            const state = {
                ebranch_name: branch_name,
                ebranch_phone: phone,
                ebranch_email: email,
                ebranch_id: branch.id,
                ebranch_address: address
            }
            AddBranchHandler(state)
            setBranchName(branch_name) // clear form fields 
            setPhone(phone) // clear form fields 
            setEmail(email) // clear form fields 
            setAddress(address) // clear form fields 


        }
    }

    const AddBranchHandler = (state) => {
        console.log(state)

        api.put('/updateBranch'
            , state
        )
            .then(function (response) {
                setLoadingProgress(false)

                // console.log(response.data)
                if (response.data.error == false) {

                    // console.log(response.data.users)
                    // return response.data.users;
                    setAlertType('success')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                    setTimeout(() => { navigate('/branches'); }, 1000)

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
                console.log(error);


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
    const loading = () => {
        if (loadingProgress) {
            return (
                <div className="mb-3">
                    <LinearProgressLoad />
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
                                            <li className="breadcrumb-item active" aria-current="page"><Link to={'/branches'}>Branches</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Edit Branch Details</li>
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
                                {loading()}
                                <form onSubmit={updateBranch}>


                                    <div className="row">


                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label >Branch Name <span className='text-danger'>*</span></label>
                                                <input value={branch_name} onChange={(e) => setBranchName(e.target.value)} type="text" className="form-control" placeholder="Ex: Area 4 Branch" required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Branch Phone <span className='text-danger'>*</span></label>
                                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="form-control" placeholder="Ex: +265882992942" required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Branch Email <span className='text-danger'>*</span></label>
                                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Ex: email@example.com" required />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label >Branch Address</label>
                                                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Ex: PO Box 232, Lilongwe, Malawi"  ></textarea>
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
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default BranchDetails;