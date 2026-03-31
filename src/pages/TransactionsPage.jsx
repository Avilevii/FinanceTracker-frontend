import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import ExpensesTransaction from "../comps/ExpensesTransaction";
import IncomeTranaction from "../comps/IncomeTranaction";
import TabsGeneric from "../comps/TabsGeneric";

const TransactionsPage = () => {
  const { setHeaderCenter } = useOutletContext();

  const tabs = [
    { label: "income", content: <IncomeTranaction /> },
    { label: "expenses", content: <ExpensesTransaction /> },
  ];

  useEffect(() => {
    setHeaderCenter(<Typography>TRANSACTION</Typography>);

    return () => setHeaderCenter(null);
  }, [setHeaderCenter]);

  return (
    <Box sx={{ backgroundColor: "var(--muidocs-palette-success-50, #e9fbf0)" }}>
      <TabsGeneric tabs={tabs} style={{ mx: 5 }} />
    </Box>
  );
};
export default TransactionsPage;
