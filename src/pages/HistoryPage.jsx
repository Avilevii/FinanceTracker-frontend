import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TableHistoryPage from "../comps/tables/TableHistoryPage";
import { styleHeader } from "../styles/historyPageStyle";


const HistoryPage = () => {

  return (
   <Box>
    <Typography sx={styleHeader}>HISTORY</Typography>
    <TableHistoryPage/>
   </Box>
  );
};
export default HistoryPage;
