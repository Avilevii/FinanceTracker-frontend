import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectHistoryItems } from "../../features/historySlice";
import TableHistoryGlobal from "../../globalComps/TableHistoryGlobal";
import { selectUserId } from "../../features/authSlice";
import { getAllHistoryThunk } from "../../thunks/historyThunk";

const TableHistoryHomePage = () => {
  const allHistory = useSelector(selectHistoryItems);
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();

  const filteredHistory = allHistory?.slice(-10).map( item => ({
    ...item,
    date: item.date.split(" ")[0]
  }));

useEffect(() => {
  if(!userId) return;
  dispatch(getAllHistoryThunk({userId, period: 'all', sortCategory:'', sortTypeCategory: ''}))
},[dispatch, userId])

  return <TableHistoryGlobal items={filteredHistory} />;
};
export default TableHistoryHomePage;
