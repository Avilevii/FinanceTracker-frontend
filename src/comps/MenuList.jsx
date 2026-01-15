import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

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
        <Box sx={{ display: {xs:"flex", md: 'none'}, justifyContent: "end" }}>
          <IconButton onClick={() => onClose()}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </Box>
        <Divider sx={{ my: 2, borderBottomWidth: 3, borderColor: "black" }} />
        {menuList.map(({ path, name }) => (
          <ListItem
            sx={{ cursor: "pointer" }}
            button
            key={name}
            onClick={() => onItemClick(path)}
          >
            <ListItemText primary={name} />
          </ListItem>
        ))}
        <Divider sx={{ my: 2, borderBottomWidth: 3, borderColor: "black" }} />
      </List>
    </Drawer>
  );
};
export default MenuList;
