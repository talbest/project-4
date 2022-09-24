import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard";
import { Pages } from "./pages";
import { LoginContainer } from "./pages/loginContainer";
import { BaseApi } from "./services/BaseApi";
function App() {
  const [token, setToken] = useState("");
  const [enterStore, SetEnterStore] = useState(false)
  const [cartDetails, setCartDetails] = useState({} as any)
  const [products, setProducts] = useState([] as any)
  const [lastCartDate, setLastCartDate] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)



  onstorage = (e) => {
    window.location.reload();
  }

  const handleTocken = () => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token") || "");
    }
    if ((localStorage.getItem("enterStore") === "true")) {
      SetEnterStore(true)
    }
    else { SetEnterStore(false) }
  }

  useEffect(() => {
    handleTocken()
  }, [token]);

  const getCartDetails = async () => {
    try {
      const res = await BaseApi.getCart()
      setCartDetails(res?.data?.results)
      setLastCartDate(res?.data?.results?.resultCart?.[0]?.created)
      setProducts(res?.data?.results?.result)
      const total = res?.data?.results?.result?.reduce((acc: any, item: any) => {
        return acc + item?.totalPrice;
      }, 0);
      setTotalPrice(total);
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App">
      <BrowserRouter>
        {!token || !enterStore ? <LoginContainer setToken={setToken} token={token} SetEnterStore={SetEnterStore} /> : (
          <Dashboard getCartDetails={getCartDetails} cartDetails={cartDetails} products={products} totalPrice={totalPrice} >
            <Pages getCartDetails={getCartDetails} />
          </Dashboard>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
