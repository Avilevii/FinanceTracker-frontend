import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ButtonGlobal from "../../globalComps/ButtonGlobal";
import DatesGlobal from "../../globalComps/DatesGlobal";
import {
  selectHistoryByfilter,
  selectHistoryItems,
} from "../../features/historySlice";
import {
  styleBoxOption,
  styleBoxSelect,
  styleBoxSort,
  styleDateMonth,
  styleDateRange,
  styleInputDate,
  styleSelectDate,
} from "../../styles/tableHistoryPageStyle";
import TableHistoryGlobal from "../../globalComps/TableHistoryGlobal";
import { selectUserId } from "../../features/authSlice";
import {
  getAllHistoryThunk,
  getHistoryByMonthThunk,
  getHistoryByRangeThunk,
} from "../../thunks/historyThunk";
import SelectHistoryBySort from "../../globalComps/SelectHistoryBySort";
import { selectCategories } from "../../features/categoriesSlice";

const TableHistoryPage = () => {

  const allHistory = useSelector(selectHistoryItems);
  const userId = useSelector(selectUserId);
  const filterHistory = useSelector(selectHistoryByfilter);
  const categories = useSelector(selectCategories);
  
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [singleDate, setSingleDate] = useState(null);
  const [rangeDate, setRangeDate] = useState([null, null]);
  const [openOption, setOpenOption] = useState(false);
  const [sortCategory, setSortCategory] = useState("");
  const [sortTypeCategory, setSortTypeCategory] = useState("");
  
  const isStartRangeDate = rangeDate[0];
  const isEndRangeDate = rangeDate[1];
  
  const formatDate = (date) => (date ? date.format("DD/MM/YYYY") : "");

  const isEmpty = isStartRangeDate !== null && isEndRangeDate !== null;
  
  let currentHistory =
  isEmpty || singleDate !== null ? filterHistory : allHistory;
  
  const listSortCategories = categories.map(({ categoryName }) => categoryName);

  const listSortTypeCategories = ["income", "expenses"];


  useEffect(() => {
    if(!userId) return;
    dispatch(getAllHistoryThunk({userId, period: "all", sortCategory, sortTypeCategory }))
  }, [dispatch, userId, sortCategory, sortTypeCategory])

  useEffect(() => {
    const startDate = formatDate(isStartRangeDate);
    const endDate = formatDate(isEndRangeDate);

    if (startDate && endDate) {
      dispatch(
        getHistoryByRangeThunk({
          userId,
          period: "rangeDates",
          startDate,
          endDate,
           sortCategory,
          sortTypeCategory,
        }),
      );
    }
  }, [isEndRangeDate, isStartRangeDate, dispatch, userId, sortCategory, sortTypeCategory]);

  useEffect(() => {
    const month = singleDate?.format("MM");
    const year = singleDate?.format("YYYY");
    if (month && year) {
      dispatch(
        getHistoryByMonthThunk({
          userId,
          period: "month",
          month,
          year,
          sortCategory,
          sortTypeCategory,
        }),
      );
    }
  }, [singleDate, dispatch, userId, sortCategory, sortTypeCategory]);

  const handleClickRange = () => {
    setMode("range");
    setOpenOption(!openOption);
  };

  const handleChangeDateRange = (arrayDates) => {
    setSingleDate(null);
    setRangeDate(arrayDates);
  };

  const handleChangeMonth = (newValue) => {
    setRangeDate([null, null]);
    setSingleDate(newValue);
    
  };

  const handleClickMonth = () => {
    setMode("single");
    setOpen(true);
    setOpenOption(false)
  };

  const handleclickAll = () => {
    setMode("");
    setRangeDate([null, null]);
    setSingleDate(null);
  };

  const handleChangeSortCategory = (event) =>
    setSortCategory(event.target.value);

  const handleChangeSelectType = (event) =>
    setSortTypeCategory(event.target.value);

  return (
    <Box>

      <Box sx={styleBoxOption}>
        <ButtonGlobal onClick={handleclickAll}>ALL</ButtonGlobal>
        <ButtonGlobal onClick={handleClickMonth}>MONTH</ButtonGlobal>
        <ButtonGlobal onClick={handleClickRange}>RANGE</ButtonGlobal>
      </Box>

      {mode === "range" && openOption && (
        <Box>
          <DatesGlobal
            onChange={handleChangeDateRange}
            valueRange={rangeDate}
            onlyPast={true}
            mode={mode}
            sx={styleInputDate}
            slotProps={styleDateRange}
          />
        </Box>
      )}

      {mode === "single" && (
        <Box sx={styleDateMonth}>
          <DatesGlobal
            onChange={handleChangeMonth}
            valueSingle={singleDate}
            open={open}
            onClose={() => setOpen(false)}
            onlyPast={true}
            mode={mode}
            views={["month", "year"]}
            variant="button"
          />
        </Box>
      )}

      <Box sx={styleSelectDate}>
        {isStartRangeDate && isEndRangeDate && (
          <Typography>
            RESULT: {formatDate(isStartRangeDate)} TO {" "}
            {formatDate(isEndRangeDate)}{" "}
          </Typography>
        )}

        {singleDate && (
          <Typography>RESULT : {singleDate.format("MMMM YYYY")}</Typography>
        )}

      </Box>
      
        <Box sx={styleBoxSort}>

          <Typography sx={{px: '95px'}}>SORT BY</Typography>

      <Box sx={styleBoxSelect}>
        <SelectHistoryBySort
          label="CATEGORY"
          onChange={handleChangeSortCategory}
          value={sortCategory}
          widthElement={120}
          listItems={listSortCategories}
          />

        <SelectHistoryBySort
          label="TYPE"
          onChange={handleChangeSelectType}
          value={sortTypeCategory}
          widthElement={70}
          listItems={listSortTypeCategories}
          />

          </Box>
      </Box>
      <TableHistoryGlobal items={currentHistory} />
    </Box>
  );
};
export default TableHistoryPage;
