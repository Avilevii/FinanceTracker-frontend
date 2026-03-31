import { TiChevronRightOutline } from "react-icons/ti";

import {
  Drawer,
  List,
  ListItemText,
  IconButton,
  Box,
  Divider,
  ListItemButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import Logout from "./Logout";

const MenuList = ({
  open,
  onClose,
  onItemClick,
  isDesktop = false,
  paperProps,
}) => {
  const menuList = [
    { name: "Home page", path: "/home" },
    { name: "History", path: "/history" },
    { name: "Transactions", path: "/transactions" },
  ];

  return (
    <Drawer
      anchor="left"
      open={isDesktop ? true : open}
      variant={isDesktop ? "permanent" : "temporary"}
      onClose={onClose}
      slotProps={{ paper: paperProps }}
    >
      <List>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "flex-end",
            gap: 17,
          }}
        >
          <Logout variant="outlined" sx={{ mt: 0.5 }} />

          <IconButton onClick={() => onClose()}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2, borderBottomWidth: 3, borderColor: "black" }} />
        {menuList.map(({ path, name }) => (
          <ListItemButton
            sx={{ cursor: "pointer" }}
            key={name}
            onClick={() => onItemClick(path)}
          >
            <Box
              component={TiChevronRightOutline}
              sx={{ fontSize: 20, mr: 1 }}
            />

            <ListItemText primary={name} />
          </ListItemButton>
        ))}
        <Divider sx={{ my: 2, borderBottomWidth: 3, borderColor: "black" }} />
      </List>
    </Drawer>
  );
};
export default MenuList;
