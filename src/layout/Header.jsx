import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { backgroundStyle } from "../styles/headecolor";

const toolBar = { display: "flex", justifyContent: "space-between", alignItems: "center", margin: 0, padding: 0 }
const Header = ({ left, center, right }) => {
  const style = {
    ...backgroundStyle,
    boxShadow: "none",
  };

  return (
    <AppBar sx={style} position="fixed">
      <Toolbar sx={toolBar} disableGutters>
        <Box>{left}</Box>

        <Box sx={{ flexGrow: 1, textAlign: "center" }}>{center}</Box>

        <Box sx={{marginRight: 2}}>{right}</Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
