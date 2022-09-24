import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { BaseApi } from '../../services/BaseApi';


export const Product = (props: any) => {
    const { product, getCartDetails } = props


    const AddProduct = async (productId: string) => {
        try {
            const res = await BaseApi.addProduct(productId)
            getCartDetails()

        }
        catch (error) {
            console.log(error)
        }
    }
    return (

        <Card sx={{ maxWidth: 345, minHeight: "350px", width: "33%", display: "flex", flexDirection: "column", height: "90%" }}>
            <CardMedia
                component="img"
                height="140"
                image={product?.photoUrl}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product?.price}$
                </Typography>
            </CardContent>

            <CardActions sx={{ justifySelf: "flex-end", flex: 1 }} >
                <Button onClick={() => {
                    AddProduct(product?.id)
                }} sx={{ justifySelf: "flex-end", flex: 1 }} size="small">ADD TO CART</Button>
            </CardActions>
        </Card>
    )
}
