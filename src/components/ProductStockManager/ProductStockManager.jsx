import React, { useState } from "react";
import { Card, CardContent, Typography, Button, TextField, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const ProductStockManager = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ id: "", name: "", price: "", stock: false });

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({ id: "", name: "", price: "", stock: false });
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
        <Typography variant="h5">Gestión de Stock de Productos</Typography>
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
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </Grid>
          <Grid item xs={6}>
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
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleUpdateProduct(product.id, { ...product, name: "Updated Name" })}>
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
