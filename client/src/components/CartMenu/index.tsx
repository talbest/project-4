import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, FormControl, InputLabel, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useEffect, useState } from 'react';
import { BaseApi } from '../../services/BaseApi';
import { getUserCity, getUserstreet, validateCreditCard } from '../../utils/common';
import { CartItem } from '../cartItem';

export const CartMenu = (props: any) => {
    const { open, getCartDetails, cartDetails, products, totalPrice } = props
    const [openModal, setOpenModal] = useState(false)
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [shepingDate, setShepingDate] = useState("")
    const [creditCard, setCreditCard] = useState("")
    const [search, setSearch] = useState("")
    const [creditError, setCreditError] = useState(false)
    const [isChekout, setIsCheckOut] = useState(false)


    useEffect(() => {
        try {
            getCartDetails()
        }

        catch (error) {
            console.log(error)
        }
    }, [])

    const clearCartHandler = async () => {
        try {
            await BaseApi.clearCart(cartDetails?.resultCart?.[0]?.id)
            getCartDetails()

        }
        catch (error) {
            console.log(error)
        }

    }

    const handleClose = () => {
        setOpenModal(false)
        setCity("")
        setStreet("")
        setShepingDate("")
        setCreditCard("")
        setSearch("")
    }

    const handleSubmit = () => {
        try {
            const res = BaseApi.submitOrder({
                cartId: cartDetails?.resultCart?.[0]?.id,
                totalPrice,
                city,
                street,
                date: shepingDate,
                creditCard: creditCard.slice(-4)
            })
            getCartDetails()
            setIsCheckOut(true)

        }
        catch (error) {
            console.log(error)
        }
    }



    return (
        open ? (
            <>
                <Box sx={{ display: "flex", flexDirection: "column", height: "90%" }}>
                    <Box sx={{ p: 1, my: 2, borderBottom: "1px solid black" }}>My Cart</Box>
                    <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "500px", overflow: "auto" }}>
                        {products?.map((c: any, i: any) => {
                            return (<Card key={i} sx={{ display: "flex", flex: 1, height: "80px", minHeight: "65px", alignItems: "center", my: 2 }}>
                                <CartItem cartItem={c} getCartDetails={getCartDetails} />
                            </Card>)
                        })}


                    </Box>

                    <Box sx={{ justifySelf: "flex-end", flex: 1 }}>
                        total price :{totalPrice}
                    </Box>


                    <Box sx={{ display: "flex", justifySelf: "flex-end" }}>
                        <Box sx={{ justifySelf: "flex-end", flex: 1 }}>
                            <Button onClick={() => {
                                clearCartHandler()
                            }} variant="contained">Clear Cart</Button>
                        </Box>

                        <Box sx={{ justifySelf: "flex-end", flex: 1 }}>
                            <Button variant="contained" onClick={() => { setOpenModal(true) }}>Checkout</Button>
                        </Box>
                    </Box>

                </Box>
                <Modal
                    open={openModal}
                    onClose={() => { handleClose() }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    {isChekout ? (<>
                        <Box sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 800,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>
                            you order Placed
                        </Box>

                    </>) : (<>  <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 800,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>


                        <Box sx={{ display: "flex" }}>
                            <h2 id="parent-modal-title">create  Checkout</h2>
                            <Box sx={{ alignSelf: "flex-end", ml: 8 }}>
                                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">search</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                        label="search"
                                    />
                                </FormControl>
                            </Box>
                        </Box>


                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ flex: 1, mx: 2 }}>
                                {products ? products?.map((c: any, i: any) => {
                                    if (c?.name.toLowerCase()?.includes(search?.toLowerCase()) && search !== "") {
                                        return (<Card key={i} sx={{ display: "flex", flex: 1, height: "80px", minHeight: "65px", alignItems: "center", my: 2, backgroundColor: "yellow" }}>
                                            <CartItem cartItem={c} getCartDetails={getCartDetails} modalView={true} />
                                        </Card>
                                        )
                                    }
                                    else {
                                        return (<Card key={i} sx={{ display: "flex", flex: 1, height: "80px", minHeight: "65px", alignItems: "center", my: 2, }}>
                                            <CartItem cartItem={c} getCartDetails={getCartDetails} modalView={true} />
                                        </Card>
                                        )
                                    }
                                }) : null}
                            </Box>
                            <Box sx={{ mt: 2, flex: 1 }}>
                                <TextField sx={{ my: 1 }} value={city} onChange={(e) => {
                                    setCity(e.target.value)
                                }} onDoubleClick={() => { setCity(getUserCity()) }} id="City" label="City" variant="outlined" fullWidth />
                                <TextField sx={{ my: 1 }} value={street} onChange={(e) => { setStreet(e.target.value) }} onDoubleClick={() => {
                                    setStreet(getUserstreet())
                                }} id="street" label="street" variant="outlined" fullWidth />
                                <InputLabel>shipping Date</InputLabel>
                                <TextField sx={{ my: 1 }} value={shepingDate} onChange={(e) => { setShepingDate(e.target.value) }} type="date" id="shipingDate" fullWidth />
                                <TextField sx={{ my: 1 }} value={creditCard} onChange={(e) => {
                                    setCreditCard(e.target.value)
                                }}
                                    onBlur={() => { validateCreditCard(creditCard) ? setCreditError(false) : setCreditError(true) }
                                    }
                                    id="creditCard" error={creditError} label="creditCard" placeholder={"XXXX XXXX XXXX XXXX"} fullWidth />
                                <Button variant="contained" color="primary" onClick={() => { handleSubmit() }}>  CHECKOUT </Button>
                            </Box>
                        </Box>
                    </Box></>)}

                </Modal>
            </>

        ) :
            <div>Total Price:{totalPrice}$</div>


    )
}
