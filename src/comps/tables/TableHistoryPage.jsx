import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";

import ButtonGlobal from "../../globalComps/ButtonGlobal";
import DatesGlobal from "../../globalComps/DatesGlobal";
import {
  nextPage,
  resetFilteredHistory,
  resetFirstLoad,
  resetHistoryItems,
  resetPage,
  selectFirstLoad,
  selectHasMoreHistory,
  selectHistoryByfilter,
  selectHistoryItems,
  selectHistoryLimit,
  selectHistoryPage,
} from "../../features/historySlice";
import {
  styleBoxMore,
  styleBoxOption,
  styleBoxSelect,
  styleBoxSort,
  styleButtonMore,
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
import ButtonsSelectHistory from "../ButtonsSelectHistory";
import ButtonMoreData from "../ButtonMoreData";

const TableHistoryPage = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [singleDate, setSingleDate] = useState(null);
  const [rangeDate, setRangeDate] = useState([null, null]);
  const [openOption, setOpenOption] = useState(false);
  const [sortCategory, setSortCategory] = useState("");
  const [sortTypeCategory, setSortTypeCategory] = useState("");
  const [hasDependencyChanged, setHasDependencyChanged] = useState(false);

  const allHistory = useSelector(selectHistoryItems);
  const userId = useSelector(selectUserId);
  const filterHistory = useSelector(selectHistoryByfilter);
  const categories = useSelector(selectCategories);
  const hasMore = useSelector(selectHasMoreHistory);
  const limit = useSelector(selectHistoryLimit);
  const page = useSelector(selectHistoryPage);
  const firstLoad = useSelector(selectFirstLoad);

  const isStartRangeDate = rangeDate[0];
  const isEndRangeDate = rangeDate[1];
  const single = "single";

  const formatDate = (date) => (date ? date.format("DD/MM/YYYY") : "");

  const isEmpty = isStartRangeDate !== null && isEndRangeDate !== null;

  let currentHistory =
    isEmpty || singleDate !== null ? filterHistory : allHistory;

  const listSortCategories = categories.map(({ categoryName }) => categoryName);

  const listSortTypeCategories = ["income", "expenses"];

  useEffect(() => {
    if (userId && (firstLoad || hasDependencyChanged)) {
      dispatch(
        getAllHistoryThunk({
          userId,
          period: "all",
          sortCategory,
          sortTypeCategory,
          limit,
          page,
        }),
      );

      if (firstLoad) {
        dispatch(resetFirstLoad());
      }
    }
  }, [
    dispatch,
    userId,
    sortCategory,
    sortTypeCategory,
    limit,
    page,
    firstLoad,
    hasDependencyChanged,
  ]);

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
          limit,
          page,
        }),
      );
    }
  }, [
    isEndRangeDate,
    isStartRangeDate,
    dispatch,
    userId,
    sortCategory,
    sortTypeCategory,
    limit,
    page,
  ]);

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
          limit,
          page,
        }),
      );
    }
  }, [
    singleDate,
    dispatch,
    userId,
    sortCategory,
    sortTypeCategory,
    limit,
    page,
  ]);

  const handleClickRange = () => {
    setMode("range");
    setOpenOption(!openOption);
  };

  const handleChangeDateRange = (arrayDates) => {
    setHasDependencyChanged(true);
    dispatch(resetPage());
    setSingleDate(null);
    dispatch(resetHistoryItems());
    setRangeDate(arrayDates);
  };

  const handleChangeMonth = (selectMonth) => {
    dispatch(resetHistoryItems());
    setRangeDate([null, null]);
    setSingleDate(selectMonth);
  };

  const handleClickMonth = () => {
    setMode(single);
    setOpen(true);
    setOpenOption(false);
  };

  const handleclickAll = () => {
    setHasDependencyChanged(true);
    dispatch(resetPage());
    dispatch(resetFilteredHistory());
    setMode("");
    setRangeDate([null, null]);
    setSingleDate(null);
  };

  const handleChangeSortCategory = ({ target: { value } }) => {
    setHasDependencyChanged(true);
    setSortCategory(value);
    dispatch(resetFilteredHistory());
    dispatch(resetHistoryItems());
    dispatch(resetPage());
  };

  const handleChangeSelectType = ({ target: { value } }) => {
    setHasDependencyChanged(true);
    setSortTypeCategory(value);
    dispatch(resetPage());
  };

  const handleClickMore = () => {
    setHasDependencyChanged(true);
    dispatch(nextPage());
  };

  return (
    <Box>
      <ButtonsSelectHistory
        sx={styleBoxOption}
        onClickAll={handleclickAll}
        onClickMonth={handleClickMonth}
        onClickRange={handleClickRange}
      />
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

      {mode === single && (
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
            RESULT: {formatDate(isStartRangeDate)} TO{" "}
            {formatDate(isEndRangeDate)}{" "}
          </Typography>
        )}

        {singleDate && (
          <Typography>RESULT : {singleDate.format("MMMM YYYY")}</Typography>
        )}
      </Box>

      <Box sx={styleBoxSort}>
        <Typography sx={{ px: "95px" }}>SORT BY</Typography>

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

      {hasMore && (
        <ButtonMoreData
          sx={styleBoxMore}
          onClick={handleClickMore}
          styleButton={styleButtonMore}
        />
      )}
    </Box>
  );
};
export default TableHistoryPage;
