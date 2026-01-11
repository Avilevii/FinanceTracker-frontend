import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {useDispatch, useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { backgroundStyle } from "../styles/headecolor";
import Logout from "../comps/Logout";
import ButtonGlobal from "../globalComps/ButtonGlobal";
import { fetchBalance, selectBalance, } from "../features/balanceSlice";
import { selectUserId } from "../features/authSlice";
const HomePage = () => {
  const { setHeaderRight } = useOutletContext();

  const dispatch = useDispatch();

  const balance = useSelector(selectBalance);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    setHeaderRight(<ButtonGlobal>Logout</ButtonGlobal>);
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
    <Box sx={{ height: "100vh" }}>
      <Toolbar sx={backgroundStyle} />
      <Box
        sx={{
          minHeight: "40%",
          ...backgroundStyle,
          borderEndEndRadius: "20px",
          borderEndStartRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box>Balance</Box>
        <Box sx={{color: balance < 0 ? "red" : 'white', fontSize: "2rem"}} >₪ {balance}</Box>
        <ButtonGlobal sx={{marginTop: "120px"}}>All Action</ButtonGlobal>
      </Box>
      <Box></Box>
      <Box>hi{userId}</Box>
      <Box>HomePage</Box>
    </Box>
  );
};

export default HomePage;
