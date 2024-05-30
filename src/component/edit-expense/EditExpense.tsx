import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Expenseform from "../expense-form/Expenseform";
import { BASE_API_URL } from "../../utils/constant";
import axios from "axios";
import { Expense } from "../../ExpenseProp.types";
interface EditExpenseprop {
  handleRefresh: () => void;
}
const EditExpense: FC<EditExpenseprop> = ({ handleRefresh }) => {
  const [isloading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [expensedata, setExpensedata] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getParticularid = async () => {
      try {
        setIsloading(true);
        setErrorMsg("");
        const { data } = await axios.get(`${BASE_API_URL}/expenses/${id}`);
        setExpensedata(data);
      } catch (error) {
        setErrorMsg("Something went wrong");
      } finally {
        setIsloading(false);
      }
    };
    getParticularid();
  }, [id]);
  const handleSubmit = async (inputdata: Expense): Promise<boolean> => {
    try {
      await axios.patch(`${BASE_API_URL}/expenses/${id}`, {
        ...inputdata,
      });
      handleRefresh();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Edit Expense</h2>
      {isloading && <p className="loading">Loading ....</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      <Expenseform onSubmitform={handleSubmit} expensedata={expensedata} />
    </div>
  );
};

export default EditExpense;
