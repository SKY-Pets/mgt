import React, { useState, useEffect } from "react";
import {Card,CardContent,  Typography,  Button,  TextField,  Grid,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  IconButton,  Switch,  FormControlLabel,  Dialog,  DialogActions,  DialogTitle,  DialogContent,} from "@mui/material";
import { Edit, Delete, CameraAlt } from "@mui/icons-material";
import ProductImageManager from "../ProductImageManager/ProductImageManager";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../api/api";

const ProductStockManager = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
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
const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  useEffect(() => {
    // Cargar los productos al montar el componente
    
    fetchProducts();
  }, []);

  const handleAddOrEditProduct = async () => {
    if (newProduct.name && newProduct.price) {
      try {
        if (editingId) {
          // Actualizar producto
          const updatedProduct = await updateProduct(editingId, newProduct);
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === editingId ? updatedProduct : product
            )
          );
        } else {
          // Crear nuevo producto
          const createdProduct = await createProduct(newProduct);

          fetchProducts()
        }
        setNewProduct({
          name: "",
          price: "",
          stock: false,
          instructions: "",
          presentation: "",
          details: "",
        });
        setEditingId(null);
      } catch (error) {
        console.error("Error saving product:", error);
      }
    } else {
      alert("Por favor completa todos los campos obligatorios.");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
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
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Precio"
              value={newProduct.price}
              type="number"
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.checked })
                  }
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
              onChange={(e) =>
                setNewProduct({ ...newProduct, instructions: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Presentación"
              value={newProduct.presentation}
              onChange={(e) =>
                setNewProduct({ ...newProduct, presentation: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Detalles"
              value={newProduct.details}
              onChange={(e) =>
                setNewProduct({ ...newProduct, details: e.target.value })
              }
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
                    p.id === selectedProduct.id
                      ? { ...p, images: updatedImages }
                      : p
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
