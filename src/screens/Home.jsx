// Home.jsx
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { getProducts, getOrders,filterOrders } from "../api/api";
import ProductStockManager from "../components/ProductStockManager/ProductStockManager";
import OrdersDashboard from "../components/OrdersDashboard/OrderDashboard";
import PendingOrders from "../components/PendingOrders/PendingOrders";
import Loader from "../components/Loader/Loader";
import dayjs from "dayjs";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(dayjs().subtract(1, "month").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    setLoading(true);
    // Fetch products and orders
    Promise.all([getProducts(), getOrders(), filterOrders(startDate, endDate, "pending")])
      .then(([productData, orderData, orderDataFilter]) => {
        setProducts(productData);
        setOrders(orderDataFilter);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = () => {
    setLoading(true);
    // Filter orders based on date range (mocked in this example)
    filterOrders(startDate, endDate, "pending")
      .then((filteredOrders) => {
        if (!filteredOrders) {
          throw new Error("No hay pedidos pendientes");
      }
        setOrders(filteredOrders);
      })
      .catch((err) => console.error("Error filtering orders:", err))
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h4" gutterBottom>
              <hr />
            </Typography>
            <Box display="flex" gap={2} mb={3}>
              <TextField
                label="Fecha desde"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Fecha hasta"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Button variant="contained" onClick={handleFilter}>
                Filtrar
              </Button>
            </Box>
            <OrdersDashboard orders={orders} />
          </Box>
          <PendingOrders orders={orders} />
          <Divider />
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>
              Gestión de Stock de Productos
            </Typography>
            <ProductStockManager initialProducts={products} />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;


