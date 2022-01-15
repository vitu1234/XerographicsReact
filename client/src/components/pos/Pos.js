import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import React from "react";
import api from "../../api/api";
import Alert from "../alerts/alert";
import Dialogs from "../alerts/dialog";
import LinearProgressLoad from "../alerts/LinearProgress";
import ProductCard from "./ProductCard";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Grid from "@material-ui/core/Grid";

import Typography from '@mui/material/Typography';

import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';


import TableCart from "./TableCart";
import Button from '@mui/material/Button';
import Search from "./Search";
import ProductsLeft from "./ProductsLeft";



function Pos() {
    //user state
    const [products, setProducts] = useState([])
    const [search_results, setSearchResults] = useState([])
    const [product_categories, setProductsCategories] = useState([])
    const [del_id, setId] = useState(-1)
    // const [searchTerm, setSearchTerm] = useState('')
    const [cartItems, setCartItem] = useState([])
    let products_url = 'fetchAllProducts';


    //alert state
    const [open, setOpen] = useState(false);
    //dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(false);
    const [value, setValue] = useState(-1);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");
    const [productCartId, setCartProductId] = React.useState(-1);

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
    const handleClickAddCart = (id) => {
        setId(id)
        setCartProductId(id)
        console.log("added product: " + id + " to cart")
        const productSelected = products.filter((product) => {
            return product.id === id
        })

        // console.log(productSelected)
        //check if product is already added, if it does, delete and readd with new data
        if (cartItems.length > 0) {

            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].product_id === productSelected[0].id) {

                    const newQty = cartItems[i].qty + 1;

                    const cartCopy = cartItems.splice(i, 1)//remove item
                    setCartItem(cartCopy);

                    //readd item
                    const Item = {
                        product_id: productSelected[0].id,
                        product_name: productSelected[0].product_name,
                        qty: newQty,
                        product_code: productSelected[0].product_code,
                        product_price: productSelected[0].product_price
                    }
                    setCartItem([...cartItems, Item]);

                } else {
                    //add item
                    const Item = {
                        product_id: productSelected[0].id,
                        product_name: productSelected[0].product_name,
                        qty: 1,
                        product_code: productSelected[0].product_code,
                        product_price: productSelected[0].product_price
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
                product_price: productSelected[0].product_price
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

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogTitle('')
        setDialogMessage('')
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

    //delete category
    const dialogAction = () => {


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

    // const renderProductList = products.map((product) => {
    //     return (
    //         <ProductCard addToCartProductId={handleClickAddCart} key={`d${product.id}`} product={product} ></ProductCard>
    //     );
    // })

    const renderProductCategoryList = product_categories.map((product_category) => {
        return (
            <Tab key={product_category.id} value={product_category.id} label={product_category.category_name} />
        );
    })

    //style shopping cart badge
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    // const handleSearch = (searchText) => {
    //     const productsOG = products;
    //     // setSearchTerm(searchText)
    //     console.log(searchText)
    //     // if (searchTerm !== "") {

    //     //     const productsCopy = products.filter((product) => {
    //     //         return Object.values(product)
    //     //             .join(" ")
    //     //             .toLowerCase()
    //     //             .includes(searchTerm.toLowerCase());
    //     //     });
    //     //     console.log(productsCopy)
    //     //     // setSearchResults(productsCopy);
    //     // } else {
    //     //     setSearchResults(products);
    //     // }

    //     setSearchResults(searchText);
    // }

    useEffect(() => {
        retrieveProductsCategories();
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
                                        <Item>
                                            <Typography spacing={2} style={{ textAlign: 'left' }} variant="h5" gutterBottom component="div">
                                                Shopping Cart
                                                <IconButton spacing={2} aria-label="cart">
                                                    <StyledBadge badgeContent={cartItems.length} color="secondary">
                                                        <ShoppingCartIcon />
                                                    </StyledBadge>
                                                </IconButton>
                                            </Typography>
                                            <Grid container spacing={2} columns={16} sx={{ mb: '30px', mt: '10px' }}>
                                                <Grid item xs={16} sm={16} md={8} lg={8}>
                                                    <Button style={{ width: "100%" }} variant="outlined">Existing Customer ID</Button>

                                                </Grid>
                                                <Grid item xs={16} sm={16} md={8} lg={8}>
                                                    <Button style={{ width: "100%" }} variant="outlined">New Customer</Button>

                                                </Grid>
                                            </Grid>
                                            <TableCart cartItems={cartItems} handleClickAddCart={handleClickAddCart} getDeleteProductIdFromCart={handleDeleteFromCart} />
                                        </Item>
                                    </Grid>

                                </Grid>
                            </Box>

                        </div>
                    </div>
                </div>
            </div>

            <Dialogs dialogOpen={dialogOpen} dialogAction={dialogAction} dialogTitle={dialogTitle} dialogMessage={dialogMessage} handleDialogClose={handleDialogClose} />
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default Pos;
