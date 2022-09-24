
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inAdmin } from "../../utils/common";
import { CartMenu } from "../CartMenu";

const drawerWidth: number = 400;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(18),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent(props: any) {
  const { getCartDetails, cartDetails, products, totalPrice } = props
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <ShoppingCartIcon />
            </IconButton>

            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>

            <Box sx={{ display: "flex", position: "absolute", ml: 5, gap: "20px" }}>
              <Button variant="contained" onClick={() => {

                localStorage.removeItem("token")
                window.location.reload()
              }}> Logout </Button>


              {inAdmin() ? (<Button variant="contained" onClick={() => {
                navigate("/AdminPage")
              }}> Admin Page </Button>) : null}

              {inAdmin() ? (<Button variant="contained" onClick={() => {
                navigate("/")
              }}> storePage </Button>) : null}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <CartMenu open={open} getCartDetails={getCartDetails} cartDetails={cartDetails} products={products} totalPrice={totalPrice} />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                {props.children}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard(props: any) {
  const { getCartDetails, cartDetails, products, totalPrice } = props
  return <DashboardContent getCartDetails={getCartDetails} cartDetails={cartDetails} products={products} totalPrice={totalPrice} >{props?.children}</DashboardContent>;
}
