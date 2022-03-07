import { useState } from 'react';
import React from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';


import TableCart from "./TableCart";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import AddCustomerModal from "../customers/AddCustomerModal";
import Checkout from './Checkout';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';


function ProductsRight(props) {
    const customers = props.customers;
    const cartItems = props.cartItems;

    //dialog/modal state
    const [dialogOpen, setDialogOpen] = useState(false);

    const [customerId, setCustomerId] = useState(-1);
    const [customerName, setCustomerName] = useState('Customer: Default');



    //dialog open
    const handleClickOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };


    //style shopping cart badge
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    //customer auto complete
    const handleAutocomplete = (event, newValue) => {
        if (newValue != null) {
            console.log(newValue)
            setCustomerId(newValue.id);
            setCustomerName('Customer: ' + newValue.customer_name);
        }
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    const btnCheckout = () => {
        if (cartItems.length > 0) {

            let total_calculated = 0;
            for (var i = 0; i < cartItems.length; i++) {
                total_calculated += (parseInt(cartItems[i].qty) * parseInt(cartItems[i].product_price));
            }

            return (
                <Checkout customerId={customerId} checkoutProducts={props.checkoutProducts} total_calculated={total_calculated} tax_amount={props.tax_amount} cartItems={cartItems} customerId={customerId} />
            )
        }
    }

    return (
        <Item>
            <Typography spacing={2} style={{ textAlign: 'left' }} variant="h5" gutterBottom component="div">
                Shopping Cart
                <IconButton spacing={2} aria-label="cart">
                    <StyledBadge badgeContent={cartItems.length} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
            </Typography>
            <Grid container spacing={2} columns={16} sx={{ mb: '20px', mt: '10px' }}>

                <Paper
                    container
                    style={{ width: "100%" }}
                    component="form"
                    sx={{ p: '2px 4px', ml: '20px', mr: '20px', mb: '10px', display: 'flex', alignItems: 'center', width: '100%' }}
                >

                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={customers}
                        style={{ width: '80%', padding: '2px ' }}
                        getOptionLabel={customers => (customers.customer_name)}
                        onChange={handleAutocomplete}
                        renderInput={params => (<TextField
                            {...params}
                            label="Select customer..."
                            fullWidth />
                        )}
                    />


                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                    <IconButton onClick={handleClickOpen} color="primary" sx={{ p: '10px' }} aria-label="directions">
                        <PersonAddAlt1Icon />
                    </IconButton>
                </Paper>

            </Grid>
            <Typography spacing={2} style={{ textAlign: 'left' }} variant="p" gutterBottom component="div">
                <i>{customerName}</i>
            </Typography>
            <TableCart style={{ maxHeight: 500, overflow: 'auto' }} cartItems={cartItems} handleClickAddCart={props.handleClickAddCart} getDeleteProductIdFromCart={props.handleDeleteFromCart} />

            {btnCheckout()}



            <AddCustomerModal handleContactUpdate={props.retrieveCustomers} dialogOpen={dialogOpen} handleDialogClose={handleDialogClose} />

        </Item>

    );
}

export default ProductsRight;