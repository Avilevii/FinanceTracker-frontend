import { useSelector } from "react-redux";
import { MdSearchOff } from "react-icons/md";

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Box,
} from "@mui/material";

import { selectCategories } from "../features/categoriesSlice";
import { financeIconsMap } from "../icons";
import { selectError } from "../features/historySlice";
import { styleErrorTableGlobal } from "../styles/tableGlobalStyle";
import { HEAD_TABLE_NAME } from "../constants";

const TableHistoryGlobal = ({ items }) => {
  const categories = useSelector(selectCategories);
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
        <Typography>{error}</Typography>
        <MdSearchOff size={50} />
      </Box>
    );
  }

  const bodyTableCell = items.slice().map((item, index) => {
    const category = categories.find(({ id }) => id === item?.categoryId);
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
          ₪{category?.categoryType === "income" ? " +" : " -"}
          {item?.amount}
        </TableCell>

        <TableCell
          align={align}
          sx={{ display: { xs: "none", sm: "table-cell" } }}
        >
          {item?.date}
        </TableCell>
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
