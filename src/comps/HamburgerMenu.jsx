import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const HamburgerMenu = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
};
export default HamburgerMenu;
