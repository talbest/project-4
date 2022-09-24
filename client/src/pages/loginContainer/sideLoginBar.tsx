import { Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react';
import { BaseApi } from '../../services/BaseApi';

export const SideLoginBar = (props: any) => {
    const { token } = props
    const [productCount, setProductCount] = useState(0)
    const [orderSubmited, setOrderSubmited] = useState(0)
    const [cartDetails, setCartDetails] = useState({} as any)
    const [products, setProducts] = useState([] as any)
    const [lastCartDate, setLastCartDate] = useState("")
    const [lastCartSetteld, setLastCartSetteld] = useState({} as any)
    const [lastCartSetteledDate, setLastCartSetteledDate] = useState("")
    useEffect(() => {
        try {
            getData()
        }

        catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        try {
            getCartDetails()
        }

        catch (error) {
            console.log(error)
        }
    }, [token])

    const getData = async () => {
        const res = await BaseApi.getSummaryData()
        setProductCount(res?.data?.results?.[0]?.productCount)
        setOrderSubmited(res?.data?.results?.[0]?.numberOfOrders)
    }

    const getCartDetails = async () => {
        if (token) {
            const res = await BaseApi.getCart()
            const resLastCart = await BaseApi.getLastCart()
            setCartDetails(res?.data?.results)
            setLastCartDate(res?.data?.results?.resultCart?.[0]?.created)
            setProducts(res?.data?.results?.result)
            
            setLastCartSetteld(resLastCart?.data?.result?.result)
            setLastCartSetteledDate(resLastCart?.data?.result?.cartResult?.[0]?.created)

        }
    }



    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>

            <img
                src={`https://a.cdn-hotels.com/gdcs/production76/d1116/1e97b4de-e17e-4f10-adac-e83383ce020d.jpg`}
                loading="lazy"
            />

            <Box sx={{ my: 2 }}>
                <Typography>
                    product in Our Store {productCount}
                </Typography>
            </Box>
            <Box sx={{ my: 2 }}>
                <Typography>
                    order submited in our store {orderSubmited}
                </Typography>
            </Box>

            {products?.length > 0 ? (<> <Box sx={{ my: 2 }}>
                <Typography>
                    you have Cart From  {lastCartDate}
                </Typography>
            </Box>
            </>
            ) : (
                lastCartSetteld?.length > 0 ?
                    <Box sx={{ my: 2 }}>
                        <Typography>
                            last cart you settled from date  {lastCartSetteledDate}
                        </Typography>
                    </Box> : <Box sx={{ my: 2 }}>
                        <Typography>
                            start New Cart
                        </Typography>
                    </Box>)}
        </Box >
    )
}
