import { useOutletContext } from "react-router-dom";
import ExpensesTransaction from "../comps/ExpensesTransaction";
import IncomeTranaction from "../comps/IncomeTranaction";
import TabsGeneri from "../comps/TabsGeneri";
import Box from "@mui/material/Box";
import { useEffect } from "react";

const TransactionsPage = () => {
  const { setHeaderCenter } = useOutletContext();

  const tabs = [
    {label: 'income', content: <IncomeTranaction/>},
    {label: 'expenses', content: <ExpensesTransaction/>}
  ];

  useEffect(() => {
    setHeaderCenter(<p>transaction</p>);

    return () => (setHeaderCenter(null));
  },[setHeaderCenter])
  
  return (
    <Box sx={{ backgroundColor:
        "var(--muidocs-palette-success-50, #e9fbf0)"}}>
      <TabsGeneri tabs={tabs} style={{mx: 5}}/>
    </Box>
 
);
};
export default TransactionsPage;
