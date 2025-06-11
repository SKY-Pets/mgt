import React, { useState } from "react";
import { AppBar, IconButton, Toolbar, Typography, useMediaQuery , Divider} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTheme } from "@mui/material/styles";


const Footer = () => {
  const theme = useTheme();
  const [showLottie, setShowLottie] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = () => {
    setShowLottie(true);
    setTimeout(() => {
      setShowLottie(false);
    }, 3000);
  };

  return (
    <>
      <Divider sx={{ backgroundColor: "black", height: 2, my: 2 }} />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          top: "auto",
          bottom: 0,
          mt: 1,
          bgcolor: theme.palette.background.default,
          color: theme.palette.primary.main,
        }}
      >
        <Toolbar sx={{ justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}>
          <Typography variant="h6" pl={3}>
            Corrientes, Argentina
          <IconButton color="inherit" size="large" onClick={handleClick}>
            <PetsIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.instagram.com/skypetsctes"
            target="_blank"
            rel="noopener"
            size="large"
          >
            <InstagramIcon />
          </IconButton>
          </Typography>
          
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;

