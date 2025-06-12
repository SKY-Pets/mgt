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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Edit, Delete, CameraAlt } from "@mui/icons-material";
import ProductImageManager from "../ProductImageManager/ProductImageManager"; // Importa tu componente de gestión de imágenes

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
  const [editingId, setEditingId] = useState(null);
  const [openImageManager, setOpenImageManager] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddOrEditProduct = () => {
    if (newProduct.name && newProduct.price) {
      if (editingId) {
        // Actualizar producto
        setProducts(
          products.map((product) =>
            product.id === editingId ? { ...newProduct, id: editingId } : product
          )
        );
        setEditingId(null);
      } else {
        // Agregar nuevo producto
        setProducts([...products, { ...newProduct, id: Date.now() }]);
      }
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
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditingId(product.id);
  };

  const handleOpenImageManager = (product) => {
    setSelectedProduct(product);
    setOpenImageManager(true);
  };

  const handleCloseImageManager = () => {
    setOpenImageManager(false);
    setSelectedProduct(null);
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
            <Button fullWidth variant="contained" onClick={handleAddOrEditProduct}>
              {editingId ? "Actualizar Producto" : "Agregar Producto"}
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
                    <IconButton onClick={() => handleEditProduct(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                      <Delete />
                    </IconButton>
                    <IconButton onClick={() => handleOpenImageManager(product)}>
                      <CameraAlt />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <Dialog open={openImageManager} onClose={handleCloseImageManager} maxWidth="md" fullWidth>
        <DialogTitle>Gestión de Imágenes</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <ProductImageManager
              product={selectedProduct}
              onClose={handleCloseImageManager}
              onUpdate={(updatedImages) =>
                setProducts((prevProducts) =>
                  prevProducts.map((p) =>
                    p.id === selectedProduct.id ? { ...p, images: updatedImages } : p
                  )
                )
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProductStockManager;
