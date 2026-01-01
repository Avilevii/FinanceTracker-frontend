import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import {useDispatch, useSelector } from 'react-redux'
import { backgroundStyle } from "../styles/headecolor";
import Logout from "../comps/Logout";
import ButtonGlobal from "../globalComps/ButtonGlobal";
// import { fetchBalance, selectBalance, selectStatus } from "../features/balanceSlice";

const HomePage = () => {
  const { setHeaderRight } = useOutletContext();

  useEffect(() => {
    setHeaderRight(<ButtonGlobal>Logout</ButtonGlobal>);
    return () => {
      setHeaderRight(null);
    };
  }, [setHeaderRight]);

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
        HomePage
      </Box>
      <Box></Box>
      <Box>HomePage</Box>
      <Box>HomePage</Box>
    </Box>
  );
};

export default HomePage;
