import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../api/api";
import Alert from "../alerts/alert";


function CustomerDetails(props) {
    const location = useLocation()
    const customer = location.state.customer;
    // console.log(user)

    const navigate = useNavigate();


    //alert state
    const [open, setOpen] = useState(false);
    //dialog state

    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };


    const [customer_name, setName] = useState(customer.customer_name);
    const [customer_phone, setPhone] = useState(customer.customer_phone);
    const [address, setAddress] = useState(customer.address);


    const updateCustomer = (e) => {
        // console.log("sjsjs")
        e.preventDefault()
        if (customer_name === "" || customer_phone === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory')
            setAlertType('error')
        } else {
            const state = {
                ecustomer_name: customer_name,
                ecustomer_phone: customer_phone,
                ecustomer_address: address,
                ecustomer_id: customer.id
            }
            AddCustomerHandler(state)
            setName(customer.customer_name) // clear form fields 
            setPhone(customer.customer_phone) // clear form fields 
            setAddress(customer.address) // clear form fields 


        }
    }

    const AddCustomerHandler = (state) => {
        console.log(state)

        api.put('/updateCustomer'
            , state, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        }
        )
            .then(function (response) {
                // console.log(response.data)
                if (response.data.error == false) {

                    // console.log(response.data.users)
                    // return response.data.users;
                    setAlertType('success')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                    setTimeout(() => { navigate('/customers'); }, 1000)

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
                                            <li className="breadcrumb-item"><a href="/"><i className="fas fa-home"></i></a></li>
                                            <li className="breadcrumb-item active" aria-current="page"><Link to={'/users'}>Users</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page"><Link to={'/customers'}>Customers</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Edit Customer Details</li>
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
                                <form onSubmit={updateCustomer}>

                                    <input type="hidden" name="ecustomer_id" id="ecustomer_id" value={customer.id} required />

                                    <div className="row">


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Customer Name <span className='text-danger'>*</span></label>
                                                <input value={customer_name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" name="efname" id="efname" placeholder="Ex: John" required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Customer Phone <span className='text-danger'>*</span></label>
                                                <input value={customer_phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" name="elname" id="elname" placeholder="Ex: +26588299292" required />
                                            </div>
                                        </div>



                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label >Address</label>
                                                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Ex: Area 25 sector 3" ></textarea>
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

export default CustomerDetails;