import { Box, Paper, Typography } from "@mui/material";

import { backgroundStyle } from "../styles/headerColor";
import SignUp from "../comps/SignUp";
import Login from "../comps/Login";
import TabsGeneric from "../comps/TabsGeneric";

const stylePaper = {
  width: 250,
  minHeight: 300,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const AuthPage = () => {
  const tabs = [
    { label: "login", content: <Login /> },
    { label: "sign up", content: <SignUp /> },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        ...backgroundStyle,
        gap: 5,
      }}
    >
      <Typography sx={{ fontSize: 30 }}>WELCOME TO FINANCE TRACKER!</Typography>
      <Paper elevation={4} sx={stylePaper}>
        <TabsGeneric tabs={tabs} />
      </Paper>
    </Box>
  );
};
export default AuthPage;
