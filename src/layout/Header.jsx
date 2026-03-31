import { AppBar, Box, Toolbar } from "@mui/material";

import { backgroundStyle } from "../styles/headerColor";

const toolBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: 0,
  padding: 0,
  minHeight: 64,
  height: 64,
};
const Header = ({ left, center, right, sx }) => {
  const style = {
    ...backgroundStyle,
    boxShadow: "none",
  };

  return (
    <AppBar sx={{ ...style, ...sx }} position="fixed">
      <Toolbar sx={{ ...toolBar }} disableGutters>
        <Box>{left}</Box>

        <Box sx={{ flexGrow: 1, textAlign: "center" }}>{center}</Box>

        <Box sx={{ marginRight: 2 }}>{right}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
