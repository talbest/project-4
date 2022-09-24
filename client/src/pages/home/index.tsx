import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, FormControl, InputLabel, Paper, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useEffect, useState } from "react";
import { Product } from "../../components/product";
import { BaseApi } from "../../services/BaseApi";


export const Home = (props: any) => {
  const { getCartDetails } = props
  const [categories, setCategories] = useState([] as any)
  const [categoryToDisplay, setCategoryToDisplay] = useState("")
  const [products, setProducts] = useState([] as any)
  const [search, setSearch] = useState("")

  useEffect(() => {
    getCategories()

  }, [])

  useEffect(() => {
    if (search) {
      fetchProductsBySearch()
    }
    else {
      fetchProducts()
    }

  }, [categoryToDisplay, search])


  const fetchProducts = async () => {
    try {
      const res = await BaseApi.getProducts(categoryToDisplay)
      setProducts(res?.data?.results)
    }
    catch (error) {
      console.log(error)
    }
  }

  const fetchProductsBySearch = async () => {
    try {
      const res = await BaseApi.getProductsBySearch(search)
      setProducts(res?.data?.results)
    }
    catch (error) {
      console.log(error)
    }
  }


  const getCategories = async () => {
    try {
      const res = await BaseApi.getCategories()
      setCategories(res?.data?.results)

    }
    catch (error) {
      console.log(error)
    }
  }

  const handleClick = async (categoryId: string = "") => {
    setCategoryToDisplay(categoryId)
  }



  return (
    <>
      <Paper sx={{ minHeight: "600px" }}>

        <Typography variant="h4">Just A store</Typography>
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

        <Box sx={{ display: "flex" }}>
          <Button onClick={() => {
            setCategoryToDisplay("")
            fetchProducts()
          }} variant="contained" sx={{ flex: 1, m: 2 }} > All  </Button>
          {categories ? categories?.map((c: any, i: any) => {
            return <Button onClick={() => { handleClick(c.id) }} variant="contained" key={i} sx={{ flex: 1, m: 2 }} > {c?.catagoryName}  </Button>
          }) : null}
        </Box>

        <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {products ? products?.map((c: any, i: any) => {
            return <Product key={i} product={c} getCartDetails={getCartDetails} />
          }) : null}

        </Box>


      </Paper>
    </>
  );
};
