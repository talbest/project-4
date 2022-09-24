import Star from "@mui/icons-material/Star";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import { BaseApi } from '../../services/BaseApi';

interface VacationCardProps {
    id: number,
    name: string,
    photoUrl: string,
    price: string,
    selected: boolean,
    category: string
    setChildRender: any
    setIsModalOpen?: any
    setIsEdit?: any
    adminPage?: boolean
    setRowData?: any;

}

export const PrudctAdminCard = (props: VacationCardProps) => {
    const { id, name, photoUrl, category, price, selected, setChildRender, adminPage = false, setIsModalOpen, setIsEdit, setRowData } = props





    return (


        <Grid item key={id} xs={12} sm={6} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                {!adminPage ? (<Box>
                    <IconButton aria-label="up" size="large" onClick={() => { }}>
                        {!selected ? <Star fontSize="inherit" /> : <Star fontSize="inherit" sx={{ color: "blue" }} />}
                    </IconButton>
                </Box>) : null}

                <CardMedia
                    component="img"
                    image={photoUrl}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1, p: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {category}
                    </Typography>

                    <Typography>
                        price: {price}
                    </Typography>
                </CardContent>

                {adminPage ? (<CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Button size="small" onClick={() => {
                        setIsEdit(true)
                        setIsModalOpen(true)
                        setRowData(props)
                    }} >Edit</Button>
                </CardActions>) : null}

            </Card>
        </Grid>


    )
}
