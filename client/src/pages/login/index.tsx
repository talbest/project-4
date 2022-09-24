
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { BaseApi } from '../../services/BaseApi';





const theme = createTheme();

export function LoginPage(props: any) {
    const { setToken, SetEnterStore, token } = props;
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [isStep1, setIsStep1] = useState(true)


    const [productCount, setProductCount] = useState(0)
    const [orderSubmited, setOrderSubmited] = useState(0)
    const [cartDetails, setCartDetails] = useState({} as any)
    const [products, setProducts] = useState([] as any)


    useEffect(() => {
        try {
            getCartDetails()
        }

        catch (error) {
            console.log(error)
        }
    }, [token])

    const getCartDetails = async () => {
        if (token) {
            const res = await BaseApi.getCart()
            setProductCount(res?.data?.results?.result.length)
            setCartDetails(res?.data?.results)
            setProducts(res?.data?.results?.result)

        }
    }





    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!isRegister) {
                const response = await BaseApi.loginAction({ email: email, password: password })
                localStorage.setItem('token', response?.data?.results);
                console.log(response)
                localStorage.setItem('enterStore', "false");
                setToken(response.data.results);
                setTimeout(() => {
                    window.location.reload();
                }, 200);

            } else {
                if (!isStep1 && street) {
                    if (!email || !password || !firstName || !lastName) return alert('Please fill all fields');
                    const response = await BaseApi.registerAction({ email: email, password: password, firstName: firstName, lastName: lastName, city: city, street: street })
                    alert("register success");
                    setIsRegister(false);
                    setIsStep1(true)
                }
            }
        } catch (error: any) {
            alert(error?.response?.data?.message);
            console.log(error)
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {!token ? (<Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        {!isRegister ? "Sign in" : "Sign up"}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {isRegister ? (
                            <>
                                {!isStep1 ? (
                                    <>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="firstName"
                                            label="firstName"
                                            type="text"
                                            id="firstName"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="LastName"
                                            label="LastName"
                                            type="text"
                                            id="LastName"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="city"
                                            label="city"
                                            type="text"
                                            id="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="street"
                                            label="street"
                                            type="text"
                                            id="street"
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                    </>
                                ) : null}
                            </>
                        ) : (null)
                        }
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="email"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {!isRegister ? (<Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            sign in
                        </Button>) : (<Button
                            onClick={() => { setIsStep1(false) }}
                            type={isStep1 ? "button" : "submit"}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isStep1 ? "next" : "register"}
                        </Button>)}

                        {!isRegister ? (
                            <Grid container sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                                <Grid item >
                                    <Link variant="body2" onClick={() => setIsRegister(true)}>
                                        {"Don't have an account? register"}
                                    </Link>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                                <Grid item >
                                    <Link variant="body2" onClick={() => setIsRegister(false)}>
                                        {"Back To Login"}
                                    </Link>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </Box>) : (
                    <>
                        <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", maxHeight: "400px", mt: 1 }}>
                            <Box sx={{ flex: 1 }}>
                                <img height={"400px"} style={{ opacity: 0.7 }} src="https://www.tripsavvy.com/thmb/_FUfY0RBw9WWCTMe88sciMcUJKI=/1280x720/smart/filters:no_upscale()/1280px-Moore_Street_market_Dublin-593c95225f9b58d58a899bee.jpg" />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignContent: "flex-end", justifyContent: "flex-end", mt: 1 }}>

                            {productCount > 0 ? (<Box sx={{ flex: 1, alignSelf: "flex-end" }}>
                                <Button variant="contained" onClick={() => {
                                    localStorage.setItem('enterStore', "true");
                                    SetEnterStore(true)
                                }}>Cointinu last Cart</Button>
                            </Box>) : (<Box sx={{ flex: 1, alignSelf: "flex-end" }}>
                                <Button variant="contained" onClick={() => {
                                    localStorage.setItem('enterStore', "true");
                                    SetEnterStore(true)
                                }}>Start Shoping</Button>
                            </Box>)}

                            <Box sx={{ flex: 1, alignSelf: "flex-end" }}>
                                <Button variant="contained" onClick={() => {
                                    localStorage.removeItem("token")
                                    window.location.reload()
                                }}>Logout</Button>
                            </Box>

                        </Box></>)}


            </Container>
        </ThemeProvider >
    );
}