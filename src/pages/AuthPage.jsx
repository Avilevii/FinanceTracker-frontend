import Box from "@mui/material/Box";
import { backgroundStyle } from "../styles/headecolor";
import SignUp from "../comps/SignUp";
import Login from "../comps/Login";
import Paper from "@mui/material/Paper";
import TabsGeneri from "../comps/TabsGeneri";

const stylePaper = {width: 250, minHeight: 300, borderRadius: 2, display: 'flex', flexDirection: "column", alignItems: 'center'}

const AuthPage = () => {
  const tabs = [{label: "sign up", content: <SignUp/>}, {label: 'login', content: <Login/>}]
  return(
   <Box sx={{display: "flex",flexDirection: "column" , justifyContent: "center", alignItems: "center", minHeight: "100vh", ...backgroundStyle, gap: 5}}>
   <h1>ברוכים הבאים למערכת ניהול הכספים שלי!</h1>
    <Paper elevation={4} sx={stylePaper}>
      <TabsGeneri tabs={tabs}/>
    </Paper>
    </Box>
  )
};
export default AuthPage;
