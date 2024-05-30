import React, { FC } from "react";
import Expenseform from "../expense-form/Expenseform";
import axios from "axios";
import { BASE_API_URL } from "../../utils/constant";
import { Expense } from "../../ExpenseProp.types";
interface AddExpenseProps {
  handleRefresh: () => void;
}
const AddExpense: FC<AddExpenseProps> = ({ handleRefresh }) => {
  const handleSubmit = async (inputdata: Expense): Promise<boolean> => {
    try {
      await axios.post(`${BASE_API_URL}/expenses`, {
        ...inputdata,
      });
      handleRefresh();
      return true;
    } catch (err) {
      return false;
    }
  };
  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Add expense</h2>
      <Expenseform onSubmitform={handleSubmit} />
    </div>
  );
};

export default AddExpense;
