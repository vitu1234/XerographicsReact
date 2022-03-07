import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BaseUrl from '../../api/baseUrl';
import { CardActionArea } from '@mui/material';


function ProductCard(props) {
    const product = props.product;

    const formatNumber = (number) => {
        var nf = new Intl.NumberFormat();
        var result = nf.format(number); // "1,234,567,890"
        return result;
    }
    return (
        // <Grid item xs={4}>
        <Card style={{ margin: "27px", marginLeft: "30px", width: "100%" }} item xs={16} sm={16} md={8} lg={8} sx={{ maxWidth: 210 }}>
            <CardActionArea onClick={() => props.addToCartProductId(product.id, -1)}>

                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <CardMedia

                        component="img"
                        alt="green iguana"
                        height="140"
                        image={`${BaseUrl}/storage/product_images/${product.img_url}`}
                    />
                </div>
                <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        MWK {formatNumber(product.product_price)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={() => props.addToCartProductId(product.id)} style={{ width: "100%" }} variant="contained">Add to cart</Button>
            </CardActions>

        </Card>
        // </Grid>
    );
}

export default ProductCard;