import { Box, Typography } from "@mui/material";

import TableHistoryPage from "../comps/tables/TableHistoryPage";
import { styleHeader } from "../styles/historyPageStyle";

const HistoryPage = () => {
  return (
    <Box>
      <Typography sx={styleHeader}>HISTORY</Typography>
      <TableHistoryPage />
    </Box>
  );
};
export default HistoryPage;
