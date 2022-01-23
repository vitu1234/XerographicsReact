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
    console.log(props)

    const [values, setValues] = useState({
        amount_paid: '',
        discount_percent: '',
        discount_amount: '',
        tax_amount: '',
        tax_percent: props.tax_amount,
        payment_type: 1,
        total: props.total_calculated,
        total_without_mod: props.total_calculated,
    });





    const formatNumber = (number) => {
        var nf = new Intl.NumberFormat();
        var result = nf.format(number); // "1,234,567,890"
        return result;
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });

        if (prop === 'discount_percent') {
            let discount_amount_ = (parseInt(values.total_without_mod) * parseInt(event.target.value)) / 100;
            setValues({ ...values, ['discount_amount']: discount_amount_ });

        } else if (prop === 'amount_paid') {
            console.log('amount_paid')
        } else if ('apply_tax') {
            if (event.target.value === 1) {
                let tax_amount = (parseInt(values.total_without_mod) * parseInt(props.tax_amount)) / 100;
                setValues({ ...values, ['tax_amount']: tax_amount });
            } else {
                setValues({ ...values, ['tax_amount']: 0 });
            }

            if (values.discount_amount.length === 0) {
                let total = (parseInt(values.total_without_mod) + parseInt(values.tax_amount)) - (parseInt(0));
                setValues({ ...values, ['total']: total });
            } else {
                let total = (parseInt(values.total_without_mod) + parseInt(values.tax_amount)) - (parseInt(values.discount_amount));
                setValues({ ...values, ['total']: total });
            }

        }

        console.log(values)
    };


    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }));

    return (
        <div >

            <Box sx={{ width: '60%', mt: 3 }}>

                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Discount (%)</InputLabel>
                    <Input
                        onKeyPress={(event) => {
                            if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        id="standard-adornment-amount"
                        value={values.discount_percent}
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
                        value={values.amount_paid}
                        onChange={handleChange('amount_paid')}
                        startAdornment={<InputAdornment position="start">MWK</InputAdornment>}
                    />
                </FormControl>

                <FormControl style={{ textAlign: 'left' }} fullWidth sx={{ m: 1 }} variant="standard">
                    <FormLabel htmlFor="html_tax">Apply VAT ({props.tax_amount}%)</FormLabel>
                    <RadioGroup
                        onChange={handleChange('apply_tax')}
                        defaultValue="0"
                        id='html_tax'
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="0" control={<Radio />} label="No" />
                        <FormControlLabel value="1" control={<Radio />} label="Yes" />


                    </RadioGroup>
                </FormControl>
                <FormControl style={{ textAlign: 'left' }} fullWidth sx={{ m: 1 }} variant="standard" style={{ textAlign: 'left' }} fullWidth sx={{ m: 1 }}>
                    <InputLabel id="demo-simple-select-standard-label">Payment Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={values.payment_type}
                        onChange={handleChange('payment_type')}
                        label="Payment Type"
                    >
                        <MenuItem value={1}>Cash Payment</MenuItem>
                        <MenuItem value={2}>Mobile Money Payment</MenuItem>
                        <MenuItem value={3}>Bank Payment</MenuItem>
                    </Select>
                </FormControl>
                <Div style={{ textAlign: 'left' }} sx={{ m: 1 }}>{`Total: MWK ${formatNumber(values.total)}`}</Div>;

            </Box>
            <Button style={{ width: "100%" }} variant="outlined">Chekout (MWK {formatNumber(values.total)})</Button>
        </div>

    );
}

export default Checkout;