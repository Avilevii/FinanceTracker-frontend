import Box from "@mui/material/Box";

const TabPanel = ({ children, index, value }) => {
  return <div>{value === index && <Box>{children}</Box>}</div>;
};
export default TabPanel;
