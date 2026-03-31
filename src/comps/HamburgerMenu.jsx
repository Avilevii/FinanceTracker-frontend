import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const HamburgerMenu = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <MenuIcon sx={{ color: "white" }} />
    </IconButton>
  );
};
export default HamburgerMenu;
