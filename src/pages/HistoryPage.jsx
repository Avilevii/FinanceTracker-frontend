import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import TableHistoryPage from "../comps/tables/TableHistoryPage";
import Box from "@mui/material/Box";
import { styleHeader } from "../styles/historyPageStyle";


const HistoryPage = () => {
  const { setHeaderLeftExtra } = useOutletContext();

  useEffect(() => {
    setHeaderLeftExtra(<p>HI</p>);

    return () => setHeaderLeftExtra(null)
  }, [setHeaderLeftExtra]);

  return (
   <Box>
    <Box sx={styleHeader}>SEARCH RESULTS</Box>
    <TableHistoryPage/>
   </Box>
  );
};
export default HistoryPage;
