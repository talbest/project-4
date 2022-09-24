import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateProductModal } from "../../components/createvacationModal";
import { PrudctAdminCard } from "../../components/VacationCard";
import { BaseApi } from "../../services/BaseApi";
import { inAdmin } from "../../utils/common";


export const AdminPage = () => {
  const [product, setProducts] = useState<Array<any>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childRender, setChildRender] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState<any>({});
  const [page, setPage] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    if (!inAdmin()) {
      navigate("/");
    }
    getVacations()

    setChildRender(false);
  }, [page, childRender]);



  const getVacations = async () => {
    try {
      const response = await BaseApi.getProducts();
      setProducts(response?.data?.results);
      console.log(response?.data?.results);
    }
    catch (error) {
      console.log(error);
    }
  }




  return (
    <>
      <Paper>
        <Typography variant="h4">Admin Page</Typography>
        <Container sx={{ py: 4 }} maxWidth="md">
          {/* End hero unit */}

          <Button sx={{ mb: 2 }} variant="contained" color="primary" onClick={() => { setIsModalOpen(true) }}> create Product </Button>

          <Grid container spacing={4}>
            {product?.map((product: any, index) => (
              <PrudctAdminCard key={product.id} id={product.id} name={product.name} category={product?.categoryId} photoUrl={product.photoUrl}
                price={product.price} setChildRender={setChildRender} selected={false} adminPage={true} setIsModalOpen={setIsModalOpen} setIsEdit={setIsEdit} setRowData={setRowData} />
            ))}
          </Grid>
        </Container>

      </Paper>
      <CreateProductModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refresh={setChildRender} setIsEdit={setIsEdit} isEdit={isEdit} setRowData={setRowData} rowData={rowData} />
    </>
  );
};

