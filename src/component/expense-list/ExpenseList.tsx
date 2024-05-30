import React, { FC } from "react";
import Expensetable from "./Expensetable";
import { Expense } from "../../ExpenseProp.types";

interface ExpenseListProp {
  expensedata: Expense[];
  isloading: boolean;
  errorMsg: string;
  handleRefresh: () => void;
}
const ExpenseList: FC<ExpenseListProp> = ({
  expensedata,
  isloading,
  errorMsg,
  handleRefresh,
}) => {
  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Expense List</h2>
      {isloading && <p className="loading">Loading ....</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {expensedata.length > 0 ? (
        <Expensetable expensedata={expensedata} handleRefresh={handleRefresh} />
      ) : (
        !isloading &&
        !errorMsg && <h4 className="error-msg">No Matching expenses Found</h4>
      )}
    </div>
  );
};

export default ExpenseList;
