import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { backgroundStyle } from "../styles/headecolor";
import SignUp from "../comps/SignUp";
import Login from "../comps/Login";
import TabsGeneri from "../comps/TabsGeneri";

const stylePaper = {width: 250, minHeight: 300, borderRadius: 2, display: 'flex', flexDirection: "column", alignItems: 'center'}

const AuthPage = () => {
  const tabs = [ {label: 'login', content: <Login/>}, {label: "sign up", content: <SignUp/>}]
  return(
   <Box sx={{display: "flex",flexDirection: "column" , justifyContent: "center", alignItems: "center", minHeight: "100vh", ...backgroundStyle, gap: 5}}>
   <Typography sx={{fontSize: 30}}>WELCOME FOR FINANCE TRACKER!</Typography>
    <Paper elevation={4} sx={stylePaper}>
      <TabsGeneri tabs={tabs}/>
    </Paper>
    </Box>
  )
};
export default AuthPage;
