import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./component/layout/Layout";
import ExpenseList from "./component/expense-list/ExpenseList";
import AddExpense from "./component/add-expense/AddExpense";
import SearchExpense from "./component/search-expense/SearchExpense";
import Profile from "./component/profile/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import EditExpense from "./component/edit-expense/EditExpense";
import { ThemeProvider } from "./context/ThemeContext";
import Register from "./component/register/Register";
import Login from "./component/login/Login";

function App() {
  const [expensedata, setExpensedata] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsloading(true);
        setErrorMsg("");
        const { data } = await axios.get("http://localhost:400/expenses");
        setExpensedata(data);
      } catch (err) {
        console.log(err);
        setErrorMsg("Error while getting List of expenses");
      } finally {
        setIsloading(false);
      }
    };
    getData();
  }, [refresh]);
  const handleRefresh = () => {
    setRefresh((sss) => !sss);
  };
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout isloggedin={isloggedin}>
          <Routes>
            <Route
              path="/"
              element={
                <ExpenseList
                  expensedata={expensedata}
                  isloading={isloading}
                  errorMsg={errorMsg}
                  handleRefresh={handleRefresh}
                />
              }
            />
            <Route
              path="/add"
              element={<AddExpense handleRefresh={handleRefresh} />}
            />
            <Route
              path="/edit/:id"
              element={<EditExpense handleRefresh={handleRefresh} />}
            />
            <Route
              path="/search"
              element={
                <SearchExpense
                  expensedata={expensedata}
                  handleRefresh={handleRefresh}
                  isloading={isloading}
                  errorMsg={errorMsg}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/register"
              element={<Register setIsloggedin={setIsloggedin} />}
            />
            <Route
              path="/login"
              element={<Login setIsloggedin={setIsloggedin} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
