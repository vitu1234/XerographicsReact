import Button from '@mui/material/Button';


function Checkout(props) {

    const cartItems = props.cartItems;
    let total = 0;

    return (
        <div>
            <Button style={{ width: "100%" }} sx={{ mt: 4 }} variant="outlined">Chekout</Button>

        </div>
    );
}

export default Checkout;