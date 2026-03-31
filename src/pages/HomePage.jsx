import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Paper, Typography } from "@mui/material";

import Logout from "../comps/Logout";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import { balanceThunk, selectBalance } from "../features/balanceSlice";
import { selectUserId } from "../features/authSlice";
import { styleHeaderHome, stylepaperBalance } from "../styles/homePageStyel";
import useIsDesktop from "../hooks/useIsDesktop.js";
import TableHistoryHomePage from "../comps/tables/TableHistoryHomePage";

const HomePage = () => {
  const { setHeaderRight, setHeaderCenter } = useOutletContext();
  const isDesktop = useIsDesktop();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const balance = useSelector(selectBalance);
  const userId = useSelector(selectUserId);

  const balanceColor = balance < 0 ? "red" : "green";

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
      dispatch(balanceThunk(userId));
    }
  }, [dispatch, userId]);

  return (
    <Box>
      <Box sx={styleHeaderHome}>
        <Paper elevation={12} sx={stylepaperBalance}>
          <Typography>BALANCE</Typography>
          <Box sx={{ color: balanceColor, fontSize: "2rem" }}>₪ {balance}</Box>
        </Paper>
        <ButtonGlobal sx={{ my: 2 }} onClick={() => navigate("/transactions")}>
          transaction
        </ButtonGlobal>
      </Box>

      <TableHistoryHomePage />
    </Box>
  );
};

export default HomePage;
