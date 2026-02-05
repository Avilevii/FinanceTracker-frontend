import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { styleHumburgerMenue } from "../styles/humburgerMenue";

const HamburgerMenu = ({ onClick }) => {
  
  return (
    <IconButton onClick={onClick}>
      <MenuIcon sx={styleHumburgerMenue} />
    </IconButton>
  );
};
export default HamburgerMenu;
