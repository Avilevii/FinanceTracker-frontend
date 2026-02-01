import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Logout from "../comps/Logout";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import { fetchBalance, selectBalance, } from "../features/balanceSlice";
import { selectUserId } from "../features/authSlice";
import { styleHeaderHome, stylepaperBalance } from "../styles/homePageStyel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useIsDesktop from "../hooks/useIsDesktopjs";
import TableHistoryHomePage from "../comps/tables/TableHistoryHomePage";

const HomePage = () => {
  const { setHeaderRight, setHeaderCenter } = useOutletContext();

  const dispatch = useDispatch();

const isDesktop = useIsDesktop();

  const balance = useSelector(selectBalance);
  const userId = useSelector(selectUserId);
  const isBalance = balance < 0 ? "red" : 'green';

  const navigate = useNavigate();

  useEffect(() => {
  if (isDesktop) {
    setHeaderRight(<Logout />);
  } else {
    setHeaderRight(null);
  }

  setHeaderCenter(<Typography>HOME PAGE</Typography>);

  return () => {
    setHeaderRight(null);
    setHeaderCenter(null);
  };
}, [isDesktop, setHeaderRight, setHeaderCenter]);

  useEffect(() => {
  if (userId) {
    dispatch(fetchBalance(userId));
  }
}, [dispatch, userId]);

  return (
    <Box>
      <Box
        sx={styleHeaderHome}
      >
        <Paper elevation={12} sx={stylepaperBalance}>
        <Box>Balance</Box>
        <Box sx={{color: isBalance, fontSize: "2rem"}} >₪ {balance}</Box>
        </Paper>
        <ButtonGlobal sx={{my: 2 }} onClick={() => navigate('/transactions')}>transaction</ButtonGlobal>
      </Box>
      <TableHistoryHomePage/>
    </Box>
  );
};

export default HomePage;
