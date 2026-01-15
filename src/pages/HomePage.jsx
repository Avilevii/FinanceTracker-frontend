import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Logout from "../comps/Logout";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import { fetchBalance, selectBalance, } from "../features/balanceSlice";
import { selectUserId } from "../features/authSlice";
import { styleBoxHome, styleHeaderHome, stylepaperBalance } from "../styles/homePageStyel";
import Paper from "@mui/material/Paper";
import HistoryTableHomePage from "../comps/tables/HistoryTableHomePage";


const HomePage = () => {
  const { setHeaderRight } = useOutletContext();

  const dispatch = useDispatch();

  const balance = useSelector(selectBalance);
  const userId = useSelector(selectUserId);
  const isBalance = balance < 0 ? "red" : 'green';

  const navigate = useNavigate();

  useEffect(() => {
    setHeaderRight(<Logout/>);
    return () => {
      setHeaderRight(null);
    };
  }, [setHeaderRight]);

  useEffect(() => {
  if (userId) {
    dispatch(fetchBalance(userId));
  }
}, [dispatch, userId]);

  return (
    <Box sx={styleBoxHome}>
      <Box
        sx={styleHeaderHome}
      >
        <Paper elevation={12} sx={stylepaperBalance}>
        <Box>Balance</Box>
        <Box sx={{color: isBalance, fontSize: "2rem"}} >₪ {balance}</Box>
        </Paper>
        <ButtonGlobal sx={{my: 2 }} onClick={() => navigate('/transactions')}>All Action</ButtonGlobal>
      </Box>
      <HistoryTableHomePage  />
    </Box>
  );
};

export default HomePage;
