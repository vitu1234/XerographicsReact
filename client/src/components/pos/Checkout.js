import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function Checkout(props) {
    // console.log(props)

    const [amount_paid, setAmountPaid] = useState('');
    const [discount_amount, setDiscountAmount] = useState('');
    const [discount_percent, setDiscountPercent] = useState(0);
    const [tax_amount, setTaxAmount] = useState('');
    const [tax_percent, setTaxPercent] = useState(props.tax_amount);
    const [payment_type, setPaymentType] = useState(1);
    const [total, setTotal] = useState(props.total_calculated);
    const [total_without_mod, setTotalWithoutMod] = useState(props.total_calculated);
    const [amount_due, setAmountDue] = useState(total);
    const [disable_status, setButtonStatus] = useState('disabled');

    const formatNumber = (number) => {
        var nf = new Intl.NumberFormat();
        var result = nf.format(number); // "1,234,567,890"
        return result;
    }

    const handleChange = (prop) => (e) => {

        if (prop === 'discount_percent') {
            let discount = 0;
            if (e.target.value.length !== 0) {
                discount = e.target.value;
            }

            setDiscountPercent(discount);
            let discount_amount_ = (parseInt(total_without_mod) * parseInt(discount)) / 100;
            setDiscountAmount(discount_amount_);

            if (tax_amount.length === 0) {
                let total = (parseInt(total_without_mod)) - (parseInt(discount_amount_));
                setTotal(total)
                if (amount_paid.length > 0) {
                    let amt_due = parseInt(total) - parseInt(amount_paid);
                    setAmountDue(amt_due)
                    if (parseInt(amt_due) <= 0) {
                        setButtonStatus('')
                    } else {
                        setButtonStatus('disabled')
                    }
                } else {
                    setAmountDue(total)
                }
            } else {

                let total = (parseInt(total_without_mod) - parseInt(tax_amount)) - (parseInt(discount_amount));
                setTotal(total)
                if (amount_paid.length > 0) {
                    let amt_due = parseInt(total) - parseInt(amount_paid);
                    setAmountDue(amt_due)
                    if (parseInt(amt_due) <= 0) {
                        setButtonStatus('')
                    } else {
                        setButtonStatus('disabled')
                    }
                } else {
                    setAmountDue(total)
                }
            }




        } else if (prop === 'amount_paid') {
            // console.log('amount_paid')
            let amount_paid_ = 0;
            if (e.target.value.length > 0) {
                amount_paid_ = e.target.value
            }
            setAmountPaid(e.target.value)
            // console.log(e.target.value)
            // console.log(amount_paid_)

            let amt_due = parseInt(total) - parseInt(amount_paid_);
            setAmountDue(amt_due)
            if (parseInt(amt_due) <= 0) {
                setButtonStatus('')
            } else {
                setButtonStatus('disabled')
            }


        } else if ('apply_tax') {

            let tax_amount_ = 0;
            if (parseInt(e.target.value) === 0) {
                tax_amount_ = (parseInt(total_without_mod) * parseInt(tax_percent)) / 100;
                setTaxAmount(tax_amount_)

                if (discount_amount.length === 0) {
                    let total = (parseInt(total_without_mod) - parseInt(tax_amount_));
                    setTotal(total)
                    if (amount_paid.length > 0) {
                        let amt_due = parseInt(total) - parseInt(amount_paid);
                        setAmountDue(amt_due)
                        if (parseInt(amt_due) <= 0) {
                            setButtonStatus('')
                        } else {
                            setButtonStatus('disabled')
                        }
                    } else {
                        setAmountDue(total)
                    }
                } else {
                    let total = (parseInt(total_without_mod) - parseInt(tax_amount_)) - (parseInt(discount_amount));
                    setTotal(total)
                    if (amount_paid.length > 0) {
                        let amt_due = parseInt(total) - parseInt(amount_paid);
                        setAmountDue(amt_due)
                        if (parseInt(amt_due) <= 0) {
                            setButtonStatus('')
                        } else {
                            setButtonStatus('disabled')
                        }
                    } else {
                        setAmountDue(total)
                    }
                }

            } else {
                tax_amount_ = 0;
                setTaxAmount(tax_amount_)

                if (discount_amount.length === 0) {
                    let total = (parseInt(total_without_mod) + parseInt(tax_amount_));
                    setTotal(total)
                    if (amount_paid.length > 0) {
                        let amt_due = parseInt(total) - parseInt(amount_paid);
                        setAmountDue(amt_due)
                        if (parseInt(amt_due) <= 0) {
                            setButtonStatus('')
                        } else {
                            setButtonStatus('disabled')
                        }
                    } else {
                        setAmountDue(total)
                    }
                } else {
                    let total = (parseInt(total_without_mod) + parseInt(tax_amount_)) - (parseInt(discount_amount));
                    setTotal(total)
                    if (amount_paid.length > 0) {
                        let amt_due = parseInt(total) - parseInt(amount_paid);
                        setAmountDue(amt_due)
                        if (parseInt(amt_due) <= 0) {
                            setButtonStatus('')
                        } else {
                            setButtonStatus('disabled')
                        }
                    } else {
                        setAmountDue(total)
                    }
                }
            }

        }

    };


    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }));

    const checkoutPayment = (e) => {
        const data = {
            customerId: props.customerId,
            amount_paid: amount_paid,
            discount_amount: discount_amount,
            discount_percent: discount_percent,
            tax_amount: tax_amount,
            tax_percent: tax_percent,
            payment_type: payment_type,
            total: total,
            total_without_mod: total_without_mod,
            amount_due: amount_due,
            cartItems: props.cartItems
        }

        props.checkoutProducts(data)
    }

    return (
        <div >

            <Box sx={{ width: '80%', mt: 3 }}>

                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Discount (%)</InputLabel>
                    <Input
                        onKeyPress={(event) => {
                            if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        id="standard-adornment-amount"
                        value={discount_percent}
                        onChange={handleChange('discount_percent')}

                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Amount Paid</InputLabel>
                    <Input
                        required
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        id="standard-adornment-amount"
                        value={amount_paid}
                        onChange={handleChange('amount_paid')}
                        startAdornment={<InputAdornment position="start">MWK</InputAdornment>}
                    />
                </FormControl>

                <FormControl style={{ textAlign: 'left' }} fullWidth sx={{ m: 1 }} variant="standard">
                    <FormLabel htmlFor="html_tax">Apply VAT ({props.tax_amount}%)</FormLabel>
                    <RadioGroup
                        onChange={handleChange('apply_tax')}
                        defaultValue="1"
                        id='html_tax'
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="0" control={<Radio />} label="No" />
                        <FormControlLabel value="1" control={<Radio />} label="Yes" />


                    </RadioGroup>
                </FormControl>
                <FormControl style={{ textAlign: 'left' }} fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">Payment Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={payment_type}
                        onChange={handleChange('payment_type')}
                        label="Payment Type"
                    >
                        <MenuItem value={1}>Cash Payment</MenuItem>
                        <MenuItem value={2}>Mobile Money Payment</MenuItem>
                        <MenuItem value={3}>Bank Payment</MenuItem>
                    </Select>
                </FormControl>
                <Div style={{ textAlign: 'left' }} sx={{ m: 1 }}>{`Total: MWK ${formatNumber(total)}`}</Div>
                <Div style={{ textAlign: 'left' }} sx={{ m: 1 }}>{`Amount Due: MWK ${formatNumber(amount_due)}`}</Div>

            </Box>
            <Button onClick={checkoutPayment} disabled={disable_status} style={{ width: "100%" }} variant="outlined">Chekout (MWK {formatNumber(total)})</Button>
        </div>

    );
}

export default Checkout;