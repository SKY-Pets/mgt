import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import NavListDrawer from "./NavListDrawer";
import "./Navbar.css";
import { useState } from "react";
const Navigationbar = () => {
const [openDrawer, setOpenDrawer] = useState(false);
  const navLinks = [
    {
      title: "Inicio",
      path: "/",
      icon: <HomeIcon />,
      visible: true,
    }
  ].filter((item) => item.visible === true);

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "white" }}>
        <Toolbar>
          {/* Botón para menú móvil */}
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }}
            color="black"
            size="large"
            onClick={() => setOpenDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <a href="/">
            <img src="/logo-arg.png" width={70} alt="Logo"></img>
          </a>

          {/* Título */}
          <Typography
            variant="h5"
            color="black"
            fontWeight="bold"
            pl={3}
            flexGrow={1}
            onClick={() => window.location.href = '/'}
            sx={{ cursor: "pointer" }}

          >
            SKY Pets Management 🤖
          </Typography>

          {/* Navegación en pantallas grandes */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((item) => (
              <Button
                color="primary"
                key={item.title}
                component="a"
                href={item.path}
              >
                {item.title}
              </Button>
            ))}
          </Box>
         
        </Toolbar>
      </AppBar>

      {/* Menú móvil */}
      <Drawer
        sx={{ display: { xs: "block", sm: "none" } }}
        open={openDrawer}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>

    </>
  );
};

export default Navigationbar;
