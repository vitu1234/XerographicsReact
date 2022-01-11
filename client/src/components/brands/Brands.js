import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import React from "react";
import BrandListRow from "./BrandListRow";
import api from "../../api/api";
import Alert from "../alerts/alert";
import Dialogs from "../alerts/dialog";

import LinearProgressLoad from "../alerts/LinearProgress";

function Brands() {
    //user state
    const [brands, setBrands] = useState([])
    const [del_id, setId] = useState(-1)

    //alert state
    const [open, setOpen] = useState(false);
    //dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(false);


    //dialog open
    const handleClickOpen = (id) => {
        setDialogOpen(true);
        setDialogTitle('Delete')
        setDialogMessage('Are you sure to delete brand? Related data will be lost')
        setId(id)
    };


    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");



    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogTitle('')
        setDialogMessage('')
    };


    // retrieve branches
    const retrieveBrands = () => {
        setLoadingProgress(true)

        api.get('/fetchAllBrands'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                setLoadingProgress(false)

                // console.log(response.data)
                if (response.data.error === false) {

                    // console.log(response.data.users)
                    setBrands(response.data.brands)
                    // return response.data.users;

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

                setAlertType('error')
                setAlertMessage("Error 500: Internal server error")
                setOpen(true)
            });
    }

    //delete category
    const dialogAction = () => {
        setOpen(false)
        setId(-1)
        if (del_id > 0) {
            setLoadingProgress(true)

            console.log("ID: " + del_id);
            api.delete('/deleteBrand/' + del_id + ''
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then(function (response) {
                    setLoadingProgress(false)

                    // console.log(response.data)
                    if (response.data.error === false) {

                        const brandsCopy = brands.filter((brand) => {
                            return brand.id !== del_id
                        })
                        handleDialogClose();
                        setBrands(brandsCopy)
                        setAlertType('success')
                        setAlertMessage('Brand deleted successfully')
                        setOpen(true)


                    } else {
                        console.log(response.data.message)
                        // return [];
                        setAlertType('error')
                        setAlertMessage(response.data.message)
                        setOpen(true)
                    }

                })
                .catch(function (myJson) {
                    setLoadingProgress(false)

                    console.log(myJson);
                    setAlertType('error')
                    setAlertMessage("Error 500: Internal server error")
                    setOpen(true)
                });
        } else {

        }

    }

    useEffect(() => {
        retrieveBrands();
    }, [])

    const renderBrandList = brands.map((brand) => {
        return (
            <BrandListRow key={brand.id} brand={brand} getDeleteBrandId={handleClickOpen} ></BrandListRow>
        );
    })

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
        <div className="">
            <div className="header bg-primary pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item"><Link to={"/"}><i className="fas fa-home"></i></Link></li>
                                        <li className="breadcrumb-item " aria-current="page"><Link to={"/products"}>Products</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Brands</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">

                                <Link to={'/products/product_brands/AddProductBrand'} >
                                    <button type="button" className="btn btn-sm btn-neutral my-1">New Brand</button>
                                </Link>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt--6">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            {loading()}
                            <div className="table-responsive mt-4" id="">
                                <table className="table table-hover mt-3 " id="users_tbl" >
                                    <thead className="thead">
                                        <tr>
                                            <th >Brand Name</th>

                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {renderBrandList}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Dialogs dialogOpen={dialogOpen} dialogAction={dialogAction} dialogTitle={dialogTitle} dialogMessage={dialogMessage} handleDialogClose={handleDialogClose} />
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default Brands;
