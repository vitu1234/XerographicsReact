import ProductCard from './ProductCard'
import Grid from '@mui/material/Grid';
import Search from './Search';
import { useEffect, useState } from 'react';
import React from "react";


function ProductsLeft(props) {
    // const products = props.products;
    // const search_results = props.search_results;

    const [searchTerm, setSearchTerm] = useState('')
    const [message, setMessage] = useState('')
    const [products, setProducts] = useState(props.products)
    const [search_results, setSearchResults] = useState([])


    const handleSearch = (searchText) => {
        setSearchTerm(searchText)
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

            if (productsCopy.length == 0) {
                setMessage("No products found!")
            }
            setSearchResults(productsCopy);
        } else {
            setSearchResults(products);
        }

        // setSearchResults(searchText);
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
                <Grid container style={{ maxHeight: 500, overflow: 'auto' }}>
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

        console.log("sjncjb")

        return (
            <div >
                <Search getSearchValue={handleSearch} />
                <p>{message}</p>
                <Grid container style={{ maxHeight: 500, overflow: 'auto' }}>
                    {renderProductList}
                </Grid>
            </div>
        );
    }


}

export default ProductsLeft;