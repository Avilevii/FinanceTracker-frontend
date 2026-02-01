import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import { selectItems } from "../features/categoriesSlice";
import { financeIconsMap } from "../icons";
import { selectError } from "../features/historySlice";
import { styleErrorTableGlobal } from "../styles/tableGlobalStyle";
import { HEAD_TABLE_NAME } from "../constance";
import { MdSearchOff } from "react-icons/md";
import Box from "@mui/material/Box";


const TableHistoryGlobal = ({ items }) => {
  const categories = useSelector(selectItems);
  const error = useSelector(selectError);
  const align = "center";

  const headTableCell = HEAD_TABLE_NAME.map((name, index) => (
    <TableCell
      align={align}
      key={index}
      sx={{
        backgroundColor: "#f5f5f5",
        display: {
          xs: "none",
          sm: "table-cell",
        },
      }}
    >
      {name}
    </TableCell>
  ));

  if (!items || items.length === 0) {
    
    return (
      <Box sx={styleErrorTableGlobal}>
        <Typography >{error}</Typography>
        <MdSearchOff size={50}/>
      </Box>
  );
  }

  const bodyTableCell = items
    .slice()
    .reverse()
    .map((item, index) => {
      const category = categories.find((cat) => cat.id === item?.categoryId);
      if (!category) return null;
      const Icon = financeIconsMap[category?.iconName];
      const isType = category?.categoryType === "income" ? "green" : "red";
      return (
        <TableRow
          key={index}
          sx={{ backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5" }}
        >
          <TableCell align={align}>
            <Icon
              style={{
                color: isType,
              }}
              size={35}
            />
          </TableCell>
          <TableCell align={align}>{category?.categoryName}</TableCell>
          <TableCell
            align={align}
            sx={{
              color: isType,
            }}
          >
            ₪{item?.amount}{category?.categoryType === 'income' ? ' +' : '-'}
          </TableCell>
          <TableCell align={align} sx={{display: {xs: 'none', sm: 'table-cell'}}}>{item?.date}</TableCell>
        </TableRow>
      );
    });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{headTableCell}</TableRow>
        </TableHead>

        <TableBody>{bodyTableCell}</TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableHistoryGlobal;
