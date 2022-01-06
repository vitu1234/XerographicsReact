import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import React from "react";
import ProductListRow from "./ProductListRow";
import api from "../../api/api";
import Alert from "../alerts/alert";
import Dialogs from "../alerts/dialog";
import LinearProgressLoad from "../alerts/LinearProgress";


function Products() {
    //user state
    const [products, setProducts] = useState([])
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
        setDialogMessage('Are you sure to delete product?')
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


    // retrieve products
    const retrieveProducts = () => {
        setLoadingProgress(true)

        api.get('/fetchAllProducts'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                // console.log(response.data)
                setLoadingProgress(false)

                if (response.data.error === false) {

                    // console.log(response.data.users)
                    setProducts(response.data.products)

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

    //delete product
    const dialogAction = () => {
        setOpen(false)
        setId(-1)
        if (del_id > 0) {
            setLoadingProgress(true)

            // console.log("ID: " + id);
            api.delete('/deleteProduct/' + del_id + ''
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then(function (response) {
                    // console.log(response.data)
                    setLoadingProgress(false)

                    if (response.data.error === false) {

                        const productsCopy = products.filter((product) => {
                            return product.id !== del_id
                        })
                        handleDialogClose();
                        setProducts(productsCopy)
                        setAlertType('success')
                        setAlertMessage('Product deleted successfully')
                        setOpen(true)


                    } else {
                        // console.log(response.data.message)
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
        console.log(api)
        retrieveProducts();
    }, [])

    const renderProductList = products.map((product) => {
        return (
            <ProductListRow key={`d${product.id}`} product={product} getDeleteProductId={handleClickOpen} ></ProductListRow>
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
                                        <li className="breadcrumb-item active" aria-current="page">Products</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">
                                <Link to={'/products/product_brands'} type="button" className="btn btn-sm btn-neutral">Product Brands</Link>

                                <Link to={'addProduct'} >
                                    <button type="button" className="btn btn-sm btn-neutral my-1">New Product</button>
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
                                            <th >Name</th>
                                            <th >Branch</th>
                                            <th >Category</th>
                                            <th >Unit</th>
                                            <th >Price</th>
                                            <th >Qty</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {renderProductList}
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

export default Products;
