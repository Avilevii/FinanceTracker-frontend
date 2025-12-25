import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const MenuList = ({ open, onClose, onItemClick }) => {
  const menuList = [
    { name: "Home page", path: "/home" },
    { name: "History", path: "/history" },
    { name: "Transactions", path: "/transactions" },
  ];
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {menuList.map(({ path, name }) => (
          <ListItem button key={name} onClick={() => onItemClick(path)}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default MenuList;
