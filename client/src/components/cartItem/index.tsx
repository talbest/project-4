import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, IconButton, TextField } from "@mui/material";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { BaseApi } from '../../services/BaseApi';

export const CartItem = (props: any) => {
    const { cartItem, getCartDetails, modalView } = props
    const [open, setOpen] = useState(false)
    const [itemCount, setItemCount] = useState(cartItem?.quantity)

    const handleCount = async (productId: string, quantity: number) => {
        try {
            await BaseApi.editQuantity(productId, quantity)
            getCartDetails()
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (productId: string) => {
        try {
            await BaseApi.deleteProduct(productId)
            getCartDetails()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <img height="80px" width="80px" src={cartItem?.photoUrl} style={{ margin: "8px", flex: 1 }} />
            <Typography sx={{ m: 1, flex: 1 }}>
                {cartItem?.name}
            </Typography>
            <Typography sx={{ m: 1, flex: 1 }}>
                X  {cartItem?.quantity}
            </Typography>
            <Typography sx={{ m: 1, flex: 1, mx: 1 }}>
                {cartItem?.totalPrice}$
            </Typography>
            {!modalView ? (<IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => { setOpen(true) }}
                sx={{
                    flex: 1,
                    m: 1
                }}
            >
                <AddIcon />
            </IconButton>) : null}


            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={(e) => { handleDelete(cartItem?.cartItemId) }}
                sx={{
                    flex: 1,
                    m: 1
                }}
            >
                <DeleteIcon />
            </IconButton>



            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                    setItemCount(cartItem?.quantity)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    display: "flex"

                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ flex: 1, mx: 1 }}>
                        Count
                    </Typography>
                    <TextField sx={{ flex: 1 }} id="outlined-basic" variant="outlined" type="number" value={itemCount} onChange={(e) => {
                        if (parseInt(e.target.value) < 0) {
                            setItemCount("0")
                        }
                        else {
                            setItemCount(parseInt(e.target.value))
                        }
                    }} />

                    <Button sx={{ flex: 1 }} onClick={() => {
                        handleCount(cartItem?.productId, itemCount)
                        setOpen(false)

                    }} >
                        set Count
                    </Button>
                </Box>
            </Modal>
        </>
    )
}
