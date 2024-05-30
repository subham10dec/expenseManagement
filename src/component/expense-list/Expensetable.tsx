import { FC, useState } from "react";
import { Expense } from "../../ExpenseProp.types";
import { Button, Table } from "react-bootstrap";
import "./ExpensesTable.css";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../utils/constant";
import axios from "axios";
import {
  getFormattedDate,
  getFormattedPrice,
  getShortDescription,
} from "../../utils/functions";
interface ExpenseProp {
  expensedata: Expense[];
  handleRefresh: () => void;
}
const Expensetable: FC<ExpenseProp> = ({ expensedata, handleRefresh }) => {
  const [errmsg, setErrmsg] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(-1);

  const handledelete = async (id: number) => {
    const shoulddelete = window.confirm("Are you sure want to delete?");
    if (shoulddelete) {
      try {
        setErrmsg("");
        await axios.delete(`${BASE_API_URL}/expenses/${id}`);
        handleRefresh();
      } catch (err) {
        setErrmsg("Error while deleting");
      }
    }
    setDeleteIndex(-1);
  };
  return (
    <>
      {errmsg && <p className="error-msg">{errmsg}</p>}
      {expensedata.length > 0 ? (
        <Table striped bordered hover responsive className="expense-list">
          <thead>
            <tr>
              <th className="heading">#</th>
              <th className="heading">Expense Type</th>
              <th className="heading">Expense Date</th>
              <th className="heading">Expense Amount</th>
              <th className="heading">Description</th>
              <th className="heading">Edit</th>
              <th className="heading">Delete</th>
            </tr>
          </thead>
          <tbody>
            {expensedata.map((expensedata, index) => (
              <tr
                key={expensedata.id}
                className={`${expensedata.id === deleteIndex ? "active" : ""}`}
              >
                <td className="expense-item">{index + 1}</td>
                <td className="expense-item">{expensedata.expense_type}</td>
                <td className="expense-item">
                  {getFormattedDate(expensedata.expense_date)}
                </td>
                <td className="expense-item">
                  {getFormattedPrice(expensedata.expense_amount)}
                </td>
                <td className="expense-item" title={expensedata.description}>
                  {getShortDescription(expensedata.description)}
                </td>
                <td className="expense-item">
                  <Link to={`/edit/${expensedata.id}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="button btn-edit"
                    >
                      Edit
                    </Button>{" "}
                  </Link>
                </td>
                <td className="expense-item">
                  <Button
                    variant="danger"
                    size="sm"
                    onMouseDown={() => setDeleteIndex(expensedata.id)}
                    onClick={() => handledelete(expensedata.id)}
                    className="button btn-delete"
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="error-msg">No Matching Results found</p>
      )}
    </>
  );
};

export default Expensetable;
