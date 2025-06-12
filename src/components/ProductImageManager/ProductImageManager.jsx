import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { uploadImage, deleteImage } from "../../utils/firebaseImage";
import { updateProduct } from "../../api/api";

const ProductImageManager = ({ product }) => {
  const [images, setImages] = useState(product.images || []);
  const [newImage, setNewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const updateProductImages = async (updatedImages) => {
    try {
      const updatedProduct = { ...product, images: updatedImages };
      await updateProduct(product.id, updatedProduct);
    } catch (error) {
      console.error("Error actualizando el producto:", error);
      alert("Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo.");
    }
  };

  const handleImageUpload = async () => {
    if (!newImage) {
      alert("Por favor selecciona una imagen para subir.");
      return;
    }

    setIsUploading(true);

    try {
      const profileUid = "user123"; // Reemplazar con el ID del usuario o perfil actual.
      const uploadedUrl = await uploadImage(newImage, profileUid, product.name);
      const updatedImages = [...images, uploadedUrl];
      setImages(updatedImages);
      setNewImage(null);
      await updateProductImages(updatedImages);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      alert("Hubo un error al subir la imagen. Por favor, inténtalo de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageDelete = async (imageUrl) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
      try {
        const filePath = imageUrl.split("/patitas_images/")[1]; // Ajustar si la estructura del path cambia.
        await deleteImage(`patitas_images/${filePath}`);
        const updatedImages = images.filter((img) => img !== imageUrl);
        setImages(updatedImages);
        await updateProductImages(updatedImages);
      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        alert("Hubo un error al eliminar la imagen. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Gestión de Imágenes - {product.name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          {product.details}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {product.presentation}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Precio: ${product.price}
        </Typography>

        <Box mt={4}>
          <Typography variant="h6">Imágenes del Producto:</Typography>
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box position="relative">
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <IconButton
                    style={{ position: "absolute", top: 8, right: 8 }}
                    onClick={() => handleImageDelete(image)}
                  >
                    <Delete color="error" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={4}>
          <Typography variant="h6">Agregar Nueva Imagen:</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                type="file"
                fullWidth
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleImageUpload}
                disabled={isUploading}
              >
                {isUploading ? "Subiendo..." : "Subir Imagen"}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box mt={4}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/")}
          >
            Cerrar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductImageManager;
