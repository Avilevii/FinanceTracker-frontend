import { useSelector } from "react-redux";
import { selectHistoryItems } from "../../features/historySlice";
import TableHistoryGlobal from "../../globalComps/TableHistoryGlobal";
// import { useNavigate } from "react-router-dom";

const TableHistoryHomePage = () => {
  const allHistory = useSelector(selectHistoryItems);
  const filteredHistory = allHistory.slice(-10).map( item => ({
    ...item,
    date: item.date.split(" ")[0]
  }));

//   const navigate = useNavigate();

//   const handleClickTable = () => navigate('/history')

  return <TableHistoryGlobal items={filteredHistory} />;
};
export default TableHistoryHomePage;
