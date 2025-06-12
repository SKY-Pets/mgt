import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ProductStockManager = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    stock: false,
    instructions: "",
    presentation: "",
    details: "",
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({
        id: "",
        name: "",
        price: "",
        stock: false,
        instructions: "",
        presentation: "",
        details: "",
      });
    } else {
      alert("Por favor completa todos los campos obligatorios.");
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts(products.map((product) => (product.id === id ? updatedProduct : product)));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Gestión de Stock de Productos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Producto"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Precio"
              value={newProduct.price}
              type="number"
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.checked })}
                />
              }
              label="En Stock"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Instrucciones"
              value={newProduct.instructions}
              onChange={(e) => setNewProduct({ ...newProduct, instructions: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Presentación"
              value={newProduct.presentation}
              onChange={(e) => setNewProduct({ ...newProduct, presentation: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Detalles"
              value={newProduct.details}
              onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleAddProduct}>
              Agregar Producto
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Presentación</TableCell>
                <TableCell>Detalles</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock ? "Sí" : "No"}</TableCell>
                  <TableCell>{product.presentation}</TableCell>
                  <TableCell>{product.details}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleUpdateProduct(product.id, { ...product, name: "Nombre Actualizado" })
                      }
                    >
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ProductStockManager;
