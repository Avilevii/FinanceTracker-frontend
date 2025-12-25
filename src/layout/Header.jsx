import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

const Header = ({ left, center, right }) => {
  const style = {
    backgroundColor: "transparent",
    boxShadow: "none",
  };
  return (
    <AppBar sx={style} position="static">
      <Box>{left}</Box>
      <Box>{center}</Box>
      <Box>{right}</Box>
    </AppBar>
  );
};
export default Header;
