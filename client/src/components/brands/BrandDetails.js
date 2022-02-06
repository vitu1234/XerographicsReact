import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../api/api";
import Alert from "../alerts/alert";
import LinearProgressLoad from "../alerts/LinearProgress";


function BrandDetails(props) {
    const location = useLocation()
    const brand = location.state.brand;
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


    const [brand_name, setBrandName] = useState(brand.brand_name);

    const updateBrand = (e) => {
        // console.log("sjsjs")
        e.preventDefault()
        if (brand_name === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory except address')
            setAlertType('error')
        } else {
            setLoadingProgress(true)

            const state = {
                ebrand_id: brand.id,
                ebrand_name: brand_name

            }
            AddBrandHandler(state)
            setBrandName(brand_name) // clear form fields 

        }
    }

    const AddBrandHandler = (state) => {
        console.log(state)

        api.put('/updateBrand'
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
                    setTimeout(() => { navigate('/products/product_brands'); }, 1000)

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
                                            <li className="breadcrumb-item active" aria-current="page"><Link to={'products/product_brands'}>Brands</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Edit Brand Details</li>
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
                                <form onSubmit={updateBrand}>


                                    <div className="row">


                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label >Brand Name</label>
                                                <input value={brand_name} onChange={(e) => setBrandName(e.target.value)} type="text" className="form-control" placeholder="Ex: Brand Name" required />
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

export default BrandDetails;