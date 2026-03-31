import React from "react";
import TransactionForm from "./TransactionForm";
import { EXPENSES } from "../constants";

const ExpensesTransaction = () => {
  return <TransactionForm categoryType={EXPENSES} />;
};

export default ExpensesTransaction;
