import TabsGeneri from "../comps/TabsGeneri";

const TransactionsPage = () => {
  const tabs = [
    {label: "incom", content: "Hello"},
    {label: "expenses", content: "Avraham"}
  ]
  return <div> <TabsGeneri tabs={tabs}/></div>;
};
export default TransactionsPage;
