import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "./confetti.json";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const OkSale = () => {
   const { cart, clearCart } = useContext(AppContext);
  const navigate = useNavigate();
  handleClose = () => {
    clearCart(); // Vaciar el carrito
    navigate("/checkout");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "20vh",
      }}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "150px", width: "150px" }}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          ¡Compra exitosa! Gracias por confiar en nosotros ! 🦦
        </Typography>
        
      </Typography>
      <Button variant="outlined" onClick={handleClose}>
                Seguir comprando
              </Button>
    </Box>
  );
};

export default OkSale;
