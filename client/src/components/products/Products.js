import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import React from "react";
import TableProducts from "./TableProducts";
import api from "../../api/api";
import Alert from "../alerts/alert";
import Dialogs from "../alerts/dialog";
import LinearProgressLoad from "../alerts/LinearProgress";
import Search from "../incl/Search";

function Products() {
    const navigate = useNavigate()
    //user state
    const [products, setProducts] = useState([])
    const [search_results, setSearchResults] = useState([])
    const [message, setMessage] = useState('')
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

    //search products
    const handleSearch = (searchText) => {
        console.log(searchText)
        if (searchText !== "") {
            // const productsCopy = products.filter((product) => {
            //     return Object.values(product)
            //         .join(" ")
            //         .toLowerCase()
            //         .includes(searchTerm.toLowerCase());
            // });

            const productsCopy = products.filter(
                product => {
                    return (
                        product
                            .product_name
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                        product
                            .product_code
                            .toLowerCase()
                            .includes(searchText.toLowerCase())

                    );
                }
            );

            if (productsCopy.length === 0) {
                setMessage("No products found matching your search!")
            }
            setSearchResults(productsCopy);
        } else {
            setSearchResults(products);
        }

        // setSearchResults(searchText);
    }

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
        retrieveProducts();
    }, [])

    const loading = () => {
        if (loadingProgress) {
            return (
                <div className="mb-3">
                    <LinearProgressLoad/>
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
                                        <li className="breadcrumb-item"><Link to={"/"}><i
                                            className="fas fa-home"></i></Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Products</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">
                                <Link to={'/products/product_brands'} type="button"
                                      className="btn btn-sm btn-neutral">Product
                                    Brands</Link>

                                <Link to={'addProduct'}>
                                    <button type="button" className="btn btn-sm btn-neutral my-1">New Product
                                    </button>
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
                            <div className='col-md-12'>
                                <div className='row mt-3'>
                                    <div className='col-md-8'></div>
                                    <div className='col-md-4'>
                                        {/*<input type='search' className='form-control '*/}
                                        {/*       placeholder='Search for a product'/>*/}
                                        <Search getSearchValue={handleSearch}/>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive mt-4" id="">
                                {/*<table className="table align-items-center table-flush table-hover mt-1" id="units_tbl">*/}
                                {/*    <thead className="thead-light">*/}
                                {/*    <tr>*/}
                                {/*        <th>Name</th>*/}
                                {/*        <th>Branch</th>*/}
                                {/*        <th>Category</th>*/}
                                {/*        <th>Unit</th>*/}
                                {/*        <th>Price</th>*/}
                                {/*        <th>Qty</th>*/}
                                {/*        <th>Action</th>*/}
                                {/*    </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody className="">*/}
                                {/*    {renderProductList}*/}
                                {/*    </tbody>*/}
                                {/*</table>*/}
                            </div>
                            {
                                (search_results.length > 0)
                                    ?
                                    <TableProducts products={search_results} getDeleteProductId={handleClickOpen}/>
                                    :
                                    <div>
                                        <p className='mb-3 text-danger text-center'>{message}</p>
                                        <TableProducts products={products} getDeleteProductId={handleClickOpen}/>
                                    </div>

                            }

                        </div>
                    </div>
                </div>
            </div>

            <Dialogs dialogOpen={dialogOpen} dialogAction={dialogAction} dialogTitle={dialogTitle}
                     dialogMessage={dialogMessage} handleDialogClose={handleDialogClose}/>
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType}
                   handleAlertClose={handleAlertClose}/>
        </div>
    );
}

export default Products;
