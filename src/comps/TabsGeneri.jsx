import { useState } from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import TabPanel from "./TabPanel";

const TabsGeneri = ({tabs, style}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => setValue(newValue)
    
  return (
    <Box>
        <Tabs value={value} onChange={handleChange} centered>
           {tabs.map(({label}, index) => (
            <Tab key={index} label={label} sx={style}/>
           ))}
        </Tabs>
        
        {tabs.map(({content}, index) => (
          <TabPanel key={index} value={value} index={index}>
            {content}
          </TabPanel>
        ))}
    </Box>
  )
}
export default  TabsGeneri