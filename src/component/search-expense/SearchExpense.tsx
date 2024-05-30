import React, { FC, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./SearchExpenses.css";
import Expensetable from "../expense-list/Expensetable";
import { Expense } from "../../ExpenseProp.types";
interface SearchExpenseProp {
  expensedata: Expense[];
  handleRefresh: () => void;
  isloading: boolean;
  errorMsg: string;
}
const SearchExpense: FC<SearchExpenseProp> = ({
  expensedata,
  handleRefresh,
  isloading,
  errorMsg,
}) => {
  const [searchterm, setSearchterm] = useState("");
  const [filteredExpense, setFilteredExpense] = useState<Expense[]>([]);
  const [expensetype, setExpensetype] = useState("");
  const [expenseyear, setExpenseyear] = useState("");
  const [sortby, setSortby] = useState("");
  useEffect(() => {
    setFilteredExpense(expensedata);
  }, [expensedata]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchterm.trim() !== "") {
      setFilteredExpense(
        expensedata.filter((expense) =>
          expense.description.toLowerCase().includes(searchterm.toLowerCase())
        )
      );
    } else {
      setFilteredExpense(expensedata);
    }
  };
  const handleSelectChange = (selectedval: { type: string; value: string }) => {
    const { type, value } = selectedval;
    switch (type) {
      case "expense_type":
        setExpensetype(value);
        if (value) {
          setFilteredExpense(
            expensedata.filter((expense) => expense.expense_type === value)
          );
        } else {
          setFilteredExpense(expensedata);
        }
        setExpenseyear("");
        setSortby("");
        setSearchterm("");
        break;
      case "expense_year":
        if (value) {
          setExpenseyear(value);
          const current_year = new Date().getFullYear();
          setFilteredExpense(
            expensedata.filter((expense) =>
              expense.expense_date.includes(
                value === "current_year"
                  ? `${current_year}`
                  : `${current_year - 1}`
              )
            )
          );
        } else {
          setFilteredExpense(expensedata);
        }
        setExpensetype("");
        setSortby("");
        setSearchterm("");
        break;
      case "sort_by":
        if (value) {
          setSortby(value);
          if (value === "asc") {
            setFilteredExpense(
              expensedata.slice().sort((firstExpense, secondExpense) => {
                if (firstExpense.expense_date < secondExpense.expense_date)
                  return -1;
                if (firstExpense.expense_date > secondExpense.expense_date)
                  return 1;
                return 0;
              })
            );
          } else if (value === "desc") {
            setFilteredExpense(
              expensedata.slice().sort((firstExpense, secondExpense) => {
                if (firstExpense.expense_date < secondExpense.expense_date)
                  return 1;
                if (firstExpense.expense_date > secondExpense.expense_date)
                  return -1;
                return 0;
              })
            );
          } else {
            setFilteredExpense(expensedata);
          }
        }
        setExpensetype("");
        setExpenseyear("");
        setSearchterm("");
        break;
      default:
        setFilteredExpense(expensedata);
        break;
    }
  };
  return (
    <div className="search-expenses">
      <h2 className="my-3 text-center">Search Expenses</h2>
      <div className="search-box">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Control
              type="search"
              value={searchterm}
              onChange={(event) => {
                setExpensetype("");
                setExpenseyear("");
                setSortby("");
                setSearchterm(event.target.value);
              }}
              placeholder="Enter description to search and presss enter key"
            ></Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="filters">
        <div className="expense-type-filter">
          <Form.Label>Expense Type</Form.Label>
          <Form.Select
            aria-label="Select Expense Type"
            value={expensetype}
            onChange={(e) =>
              handleSelectChange({
                type: "expense_type",
                value: e.target.value,
              })
            }
          >
            <option value="">Select Expense Type</option>
            <option value="card">Card</option>
            <option value="cash">cash</option>
          </Form.Select>
        </div>
        <div className="date-filter">
          <Form.Label>Expense Year</Form.Label>
          <Form.Select
            aria-label="Select Year"
            value={expenseyear}
            onChange={(e) =>
              handleSelectChange({
                type: "expense_year",
                value: e.target.value,
              })
            }
          >
            <option value="">Select Year</option>
            <option value="current_year">Current Year</option>
            <option value="previous_year"> Previous Year</option>
          </Form.Select>
        </div>
        <div className="sort-filter">
          <Form.Label>Sort By</Form.Label>
          <Form.Select
            aria-label="Select Sort By"
            value={sortby}
            onChange={(event) =>
              handleSelectChange({
                type: "sort_by",
                value: event.target.value,
              })
            }
          >
            <option value="">Select Sort By</option>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest first</option>
          </Form.Select>
        </div>
      </div>
      {isloading && <p className="loading">Loading...</p>}
      {errorMsg && (
        <p className="error-msg" style={{ textAlign: "center" }}>
          {errorMsg}
        </p>
      )}
      {!isloading &&
        !errorMsg &&
        (expensedata.length > 0 ? (
          <Expensetable
            expensedata={filteredExpense}
            handleRefresh={handleRefresh}
          />
        ) : (
          <h4 className="error-msg">No Matching Expenses Found</h4>
        ))}
    </div>
  );
};

export default SearchExpense;
