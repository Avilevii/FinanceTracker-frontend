import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import TransactionsPage from "./pages/TransactionsPage";
import AppLayout from "./layout/AppLayout";
import "./index.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUserId } from "./features/authSlice";
import { getCategoriesThunk } from "./thunks/categoriesThunk";
import { getAllHistoryThunk } from "./thunks/historyThunk";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) return;

    const userId = Number(storedUserId);
    dispatch(setUserId(userId));
    dispatch(getCategoriesThunk(userId));
    dispatch(getAllHistoryThunk(userId));
  }, [dispatch]);

  return (
    <div>
      
      <Routes>
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
