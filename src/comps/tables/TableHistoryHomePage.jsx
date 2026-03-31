import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectHistoryItems,
  selectHistoryLimit,
  selectHistoryPage,
} from "../../features/historySlice";
import TableHistoryGlobal from "../../globalComps/TableHistoryGlobal";
import { selectUserId } from "../../features/authSlice";
import { getAllHistoryThunk } from "../../thunks/historyThunk";

const TableHistoryHomePage = () => {
  const dispatch = useDispatch();

  const allHistory = useSelector(selectHistoryItems);
  const userId = useSelector(selectUserId);
  const limit = useSelector(selectHistoryLimit);
  const page = useSelector(selectHistoryPage);

  const filteredHistory = allHistory?.slice(-10).map((item) => ({
    ...item,
    date: item.date.split(" ")[0],
  }));

  const firstLoad = useRef(true);

  useEffect(() => {
    if (userId && allHistory.length === 0 && firstLoad.current) {
      dispatch(
        getAllHistoryThunk({
          userId,
          period: "all",
          sortCategory: "",
          sortTypeCategory: "",
          limit,
          page,
        }),
      );

      firstLoad.current = false;
    }
  }, [dispatch, userId, limit, page, allHistory]);

  return <TableHistoryGlobal items={filteredHistory} />;
};
export default TableHistoryHomePage;
