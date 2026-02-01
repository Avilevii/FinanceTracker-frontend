import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId, setUserId } from "./features/authSlice";
import { getCategoriesThunk } from "./thunks/categoriesThunk";
import { getAllHistoryThunk } from "./thunks/historyThunk";
import "./index.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import AppLayout from "./layout/AppLayout";
import TransactionsPage from "./pages/TransactionsPage";
const App = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect (() => {
    if( !userId) return;
    dispatch(getCategoriesThunk(userId));
    dispatch(getAllHistoryThunk(userId));
  },[dispatch, userId]);


  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId ) return;
    dispatch(setUserId(Number(storedUserId)));
  }, [dispatch]);

  return (
    <div>
      
      <Routes>
         <Route path="/" element={<Navigate to="/auth" replace />} />

        <Route path="/auth" element={<AuthPage />}></Route>
        <Route element={<AppLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
