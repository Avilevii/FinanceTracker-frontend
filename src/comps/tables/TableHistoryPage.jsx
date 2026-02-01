import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import ButtonGlobal from "../../globalComps/ButtonGlobal";
import DatesGlobal from "../../globalComps/DatesGlobal";
import {
  selectHistoryByfilter,
  selectHistoryItems,
} from "../../features/historySlice";
import {
  styleBoxOption,
  styleDateRange,
  styleInputDate,
} from "../../styles/tableHistoryPageStyle";
import TableHistoryGlobal from "../../globalComps/TableHistoryGlobal";
import { selectUserId } from "../../features/authSlice";
import {
  getHistoryByMonthThunk,
  getHistoryByRangeThunk,
} from "../../thunks/historyThunk";

const TableHistoryPage = () => {
  const allHistory = useSelector(selectHistoryItems);
  const userId = useSelector(selectUserId);
  const filterHistory = useSelector(selectHistoryByfilter);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [singleDate, setSingleDate] = useState(null);
  const [rangeDate, setRangeDate] = useState([null, null]);
  const [openOption, setOpenOption] = useState(false);

  const isEmpty = rangeDate[0] !== null && rangeDate[1] !== null;

  let currentHistory =
    isEmpty || singleDate !== null ? filterHistory : allHistory;
  const dispatch = useDispatch();

  useEffect(() => {
    const startDate = rangeDate[0]?.format("DD/MM/YYYY");
    const endDate = rangeDate[1]?.format("DD/MM/YYYY");

    if (startDate && endDate) {
      dispatch(
        getHistoryByRangeThunk({
          userId,
          period: "rangeDates",
          startDate,
          endDate,
        }),
      );
    }
  }, [rangeDate, dispatch, userId]);

  useEffect(() => {
    const month = singleDate?.format("MM");
    const year = singleDate?.format("YYYY");
    if (month && year) {
      dispatch(
        getHistoryByMonthThunk({ userId, period: "month", month, year }),
      );
    }
  }, [singleDate, dispatch, userId]);

  const handleClickRange = () => {
    setMode("range");
    setOpenOption(!openOption);
  };

  const handleChangeDateRange = (arrayDates) => {
    setRangeDate(arrayDates);
  };

  const handleClickMonth = () => {
    setMode("single");
    setOpen(true);
  };

  const handleclickAll = () => {
    setRangeDate([null, null]);
    setSingleDate(null);
  };

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
        <Box>
          <DatesGlobal
            onChange={setSingleDate}
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
      <TableHistoryGlobal items={currentHistory} />
    </Box>
  );
};
export default TableHistoryPage;
