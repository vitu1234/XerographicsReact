import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../api/api";
import Alert from "../alerts/alert";
import LinearProgressLoad from "../alerts/LinearProgress";


function AddBranch(props) {
    // console.log(user)

    const navigate = useNavigate();


    //alert state
    const [open, setOpen] = useState(false);
    //dialog state

    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [loadingProgress, setLoadingProgress] = useState(false);


    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };


    const [branch_name, setBranchName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');


    const addBranch = (e) => {
        // console.log("sjsjs")
        e.preventDefault()
        if (branch_name === "" || phone === "" || email === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory except address')
            setAlertType('error')
        } else {
            setLoadingProgress(true)
            const state = {
                branch_name: branch_name,
                branch_phone: phone,
                branch_email: email,
                branch_address: address
            }
            AddBranchHandler(state)
            setBranchName('') // clear form fields 
            setPhone('') // clear form fields 
            setEmail('') // clear form fields 
            setAddress('') // clear form fields 

        }
    }

    const AddBranchHandler = (state) => {
        console.log(state)

        api.post('/saveBranch'
            , state, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        }
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
                setAlertType('error')
                setAlertMessage("Error 500: Internal server error")
                setOpen(true)
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
                                            <li className="breadcrumb-item active" aria-current="page">Add Branch</li>
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
                                <form onSubmit={addBranch}>


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

export default AddBranch;