import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MenuList from "../comps/MenuList";
import Header from "./Header";
import HamburgerMenu from "../comps/HamburgerMenu";
import Box from "@mui/material/Box";
import useIsDesktop from "../hooks/useIsDesktopjs";

const AppLayout = () => {
  const isDesktop = useIsDesktop();

  const [open, setOpen] = useState(false);
  const [headerCenter, setHeaderCenter] = useState(null);
  const [headerRight, setHeaderRight] = useState(null);
  const [headerLeftExtra, setHeaderLeftExtra] = useState(null)

  const headerLeft = (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    {!isDesktop && (
      <HamburgerMenu onClick={() => setOpen(true)} />
    )}

    {headerLeftExtra}
  </Box>
);

  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Box sx={{minHeight: "100%",  backgroundColor: "var(--muidocs-palette-success-50, hsl(144, 72%, 95%))",
}}>
      <Header
        sx={{
          width: isDesktop ? `calc(100% - 268px)` : "100%",
          ml: isDesktop ? "260px" : 0,
          mr: { md: 1 },
           display: "flex",
      flexDirection: "column",
        }}
        left={headerLeft}
        center={headerCenter}
        right={headerRight}
      />
      <Box sx={{height: "64px", }}></Box>

      <MenuList
        isDesktop={isDesktop}
        open={open}
        onClose={() => setOpen(false)}
        onItemClick={handleMenuClick}
        paperProps={{ sx: { width: "250px", boxSizing: "border-box" } }}
      />

      <Box sx={{ ml: { md: "260px" }, mr: { md: 1 }, minHeight: `calc(100vh - 64px)` }}>
        <Outlet context={{ setHeaderCenter, setHeaderRight, setHeaderLeftExtra }} />
      </Box>
    </Box>
  );
};

export default AppLayout;
