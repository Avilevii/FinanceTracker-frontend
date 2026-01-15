import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuList from "../comps/MenuList";
import Header from "./Header";
import HamburgerMenu from "../comps/HamburgerMenu";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";

const AppLayout = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  
  const [open, setOpen] = useState(false);
  const [headerCenter, setHeaderCenter] = useState(null);
  const [headerRight, setHeaderRight] = useState(null);

  const headerLeft = isDesktop ? null : <HamburgerMenu onClick={() => setOpen(true)}/>

  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
    setOpen(false);
  };



  return (
    <>
      <Header
        sx={{  width: isDesktop ? `calc(100% - 158px)` : '100%',
    ml: isDesktop ? '150px' : 0, mr: {md: 1} }}
        left={headerLeft}
        center={headerCenter}
        right={headerRight}
      />
      <Toolbar/>

      <MenuList
        isDesktop={isDesktop}
        open={open}
        onClose={() => setOpen(false)}
        onItemClick={handleMenuClick}
        paperProps={{ sx: { width: "140px", boxSizing: "border-box" } }}
      />

      <Box sx={{ ml: {md: '150px'}, mr: {md: 1} }}>
        <Outlet context={{  setHeaderCenter, setHeaderRight }} />
      </Box>
    </>
  );
};

export default AppLayout;
