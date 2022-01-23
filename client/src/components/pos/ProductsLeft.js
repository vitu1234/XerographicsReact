import ProductCard from './ProductCard'
import Grid from '@mui/material/Grid';
import Search from './Search';
import { useState } from 'react';
import React from "react";
import Alert from '@mui/material/Alert';



function ProductsLeft(props) {
    // const products = props.products;
    // const search_results = props.search_results;

    const [message, setMessage] = useState('')
    const [products, setProducts] = useState(props.products)
    const [search_results, setSearchResults] = useState([])


    const handleSearch = (searchText) => {
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

    const error = () => {
        if (message !== '') {
            return (<Alert sx={{ width: '97%' }} variant="outlined" severity="error">{message}</Alert>)
        }
    }

    if (search_results.length > 0) {
        const renderProductList = search_results.map((product) => {
            return (
                <ProductCard addToCartProductId={props.addToCartProductId} key={`d${product.id}`} product={product} ></ProductCard>
            );
        })


        return (
            <div >
                <Search getSearchValue={handleSearch} />
                <Grid container style={{ maxHeight: 855, overflow: 'auto' }}>
                    {renderProductList}
                </Grid>
            </div>
        );
    } else {
        const renderProductList = products.map((product) => {
            return (
                <ProductCard addToCartProductId={props.addToCartProductId} key={`d${product.id}`} product={product} ></ProductCard>
            );
        })


        return (
            <div >
                <Search getSearchValue={handleSearch} />
                {error()}
                <Grid container style={{ maxHeight: 888, overflow: 'auto' }}>
                    {renderProductList}
                </Grid>
            </div>
        );
    }


}

export default ProductsLeft;