import { useEffect, useState } from "react";
import { Container, Typography, Divider, Box } from "@mui/material";
import { getProducts, getOrders } from "../api/api";
import ProductStockManager from "../components/ProductStockManager/ProductStockManager";
import OrdersDashboard from "../components/OrdersDashboard/OrderDashboard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch products
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch orders
    getOrders()
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <Container>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard de Pedidos
        </Typography>
        <OrdersDashboard orders={orders} />
      </Box>
      <Divider />
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Stock de Productos
        </Typography>
        <ProductStockManager initialProducts={products} />
      </Box>
    </Container>
  );
};

export default Home;
