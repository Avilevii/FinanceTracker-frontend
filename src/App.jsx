import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import TransactionsPage from "./pages/TransactionsPage";
import AppLayout from "./layout/AppLayout";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
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
