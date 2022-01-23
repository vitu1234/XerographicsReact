import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import React from "react";
import api from "../../api/api";
import Alert from "../alerts/alert";
import LinearProgressLoad from "../alerts/LinearProgress";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Grid from "@material-ui/core/Grid";


import ProductsLeft from "./ProductsLeft";

import ProductsRight from "./ProductsRight";


function Pos() {
    //user state
    const [products, setProducts] = useState([])
    const [customers, setCustomers] = useState([])
    const [product_categories, setProductsCategories] = useState([])
    const [cartItems, setCartItem] = useState([])
    const [productCartId, setCartProductId] = React.useState(-1);
    const [tax_amount, setTaxAmount] = React.useState(-1);

    let products_url = 'fetchAllProducts';


    //alert state
    const [open, setOpen] = useState(false);

    const [loadingProgress, setLoadingProgress] = useState(false);
    const [value, setValue] = useState(-1);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");



    const handleChangeTab = (event, newValue) => {
        if (newValue === -1) {
            products_url = 'fetchAllProducts'
        } else {
            products_url = 'fetchAllPosProducts/' + newValue
        }

        setValue(newValue)
        retrieveProducts()
    };

    //handle click and to cart
    const handleClickAddCart = (id, qty) => {
        setCartProductId(id)
        console.log("added product: " + id + " to cart | qty" + qty)
        const productSelected = products.filter((product) => {
            return product.id === id
        })

        console.log(productSelected)

        // console.log(productSelected)
        //check if product is already added, if it does, delete and readd with new data
        if (cartItems.length > 0) {

            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].product_id === productSelected[0].id) {


                    let newQty = 0;
                    if (qty === -1) {
                        console.log((parseInt(cartItems[i].qty) + 1) + " || " + parseInt(productSelected[0].product_qty))
                        if ((parseInt(cartItems[i].qty) + 1) <= parseInt(productSelected[0].product_qty)) {
                            newQty = (parseInt(cartItems[i].qty)) + 1;
                        } else {
                            newQty = cartItems[i].qty;
                        }

                    } else {
                        newQty = qty;
                    }
                    console.log(newQty)

                    const cartCopy = cartItems.splice(i, 1)//remove item
                    setCartItem(cartCopy);

                    //readd item
                    const Item = {
                        product_id: productSelected[0].id,
                        product_name: productSelected[0].product_name,
                        qty: newQty,
                        product_code: productSelected[0].product_code,
                        product_price: productSelected[0].product_price,
                        stock_qty: productSelected[0].product_qty
                    }
                    setCartItem([...cartItems, Item]);

                } else {
                    //add item
                    const Item = {
                        product_id: productSelected[0].id,
                        product_name: productSelected[0].product_name,
                        qty: 1,
                        product_code: productSelected[0].product_code,
                        product_price: productSelected[0].product_price,
                        stock_qty: productSelected[0].product_qty
                    }
                    setCartItem([...cartItems, Item]);
                }
            }
        } else {
            const Item = {
                product_id: productSelected[0].id,
                product_name: productSelected[0].product_name,
                qty: 1,
                product_code: productSelected[0].product_code,
                product_price: productSelected[0].product_price,
                stock_qty: productSelected[0].product_qty
            }
            setCartItem([...cartItems, Item]);
        }


    };
    //remove product from cart
    const handleDeleteFromCart = (id) => {

        const cartCopy = cartItems.filter((cartItem) => {
            // console.log(cartItem.product_id + " sjsj")
            return cartItem.product_id !== id
        })
        setCartItem(cartCopy);

    }


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));



    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };

    // retrieve products
    const retrieveProducts = () => {
        setLoadingProgress(true)

        api.get(products_url
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
                    setProducts([])
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

    // retrieve products categories
    const retrieveProductsCategories = () => {
        setLoadingProgress(true)

        api.get('/fetchAllCategories'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                if (response.data.error === false) {

                    // console.log(response.data.users)
                    setProductsCategories(response.data.categories)

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
                setAlertMessage("Error 500: Internal server error on categories")
                setOpen(true)
            });
    }

    // retrieve customers
    const retrieveCustomers = () => {

        api.get('/fetchAllCustomers'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {

                if (response.data.error === false) {

                    // console.log(response.data)
                    setCustomers(response.data.customers)

                } else {
                    // console.log(response.data.message)
                    // return [];
                    setCustomers([])

                }

            })
            .catch(function (error) {
            });
    }

    //get tax
    const retrieveTax = () => {

        api.get('/fetchActiveTax'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {

                if (response.data.error === false) {

                    setTaxAmount(response.data.tax.tax_amount)

                } else {
                    // console.log(response.data.message)
                    // return [];
                    setTaxAmount(-1)

                }

            })
            .catch(function (error) {
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

    const renderProductCategoryList = product_categories.map((product_category) => {
        return (
            <Tab key={product_category.id} value={product_category.id} label={product_category.category_name} />
        );
    })





    useEffect(() => {
        retrieveTax()
        retrieveProductsCategories();
        retrieveCustomers()
        retrieveProducts();
    }, [])

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
                                        <li className="breadcrumb-item active" aria-current="page">POS</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">

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

                            <div className="container-fluid mt-5">

                            </div>

                            <Box sx={{ flexGrow: 6 }}>
                                <Grid container spacing={2} columns={16}>


                                    <Grid item xs={16} sm={16} md={10} lg={10}>
                                        <Item >
                                            <Box sx={{ width: '100%' }}>
                                                <Tabs
                                                    value={value}
                                                    onChange={handleChangeTab}
                                                    textColor="primary"
                                                    indicatorColor="primary"
                                                    aria-label="primary tabs example"

                                                    variant="scrollable"
                                                    scrollButtons
                                                    allowScrollButtonsMobile
                                                    aria-label="scrollable force tabs example"
                                                >
                                                    <Tab key="2S" value={-1} label="All" />
                                                    {renderProductCategoryList}
                                                </Tabs>
                                            </Box>

                                            {/* <Search getSearchValue={handleSearch} /> */}

                                            {/* {renderProductList} */}
                                            <ProductsLeft products={products} addToCartProductId={handleClickAddCart} />

                                        </Item>
                                    </Grid>

                                    <Grid item xs={16} sm={16} md={6} lg={6}>
                                        <ProductsRight tax_amount={tax_amount} retrieveCustomers={retrieveCustomers} cartItems={cartItems} products={products} customers={customers} handleClickAddCart={handleClickAddCart} handleDeleteFromCart={handleDeleteFromCart} />
                                    </Grid>

                                </Grid>


                            </Box>

                        </div>
                    </div>
                </div>
            </div>

            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default Pos;
