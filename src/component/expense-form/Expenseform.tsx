import React, { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Expense } from "../../ExpenseProp.types";
import { useNavigate } from "react-router-dom";
interface ExpenseFormProps {
  onSubmitform: (data: Expense) => Promise<boolean>;
  expensedata?: Expense | null;
}
const Expenseform: FC<ExpenseFormProps> = ({ onSubmitform, expensedata }) => {
  const [succesmessage, setSuccesmessage] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Expense>();
  const { id, description, expense_amount, expense_date, expense_type } =
    expensedata || {};
  useEffect(() => {
    reset({
      description,
      expense_amount,
      expense_date,
      expense_type,
    });
  }, [id]);
  const navigate = useNavigate();
  const onSubmit = async (data: Expense) => {
    const isSuccess = await onSubmitform(data);
    if (isSuccess) {
      if (!expensedata) {
        reset();
      }
      setErrmsg("");
      setTimeout(() => {
        setSuccesmessage("");
        setErrmsg("");
        navigate("/");
      }, 3000);
      setSuccesmessage(
        `Expense ${expensedata ? "updated" : "added"} succesfully`
      );
    } else {
      setErrmsg(
        `Error while ${expensedata ? "updated" : "added"}.Try again Later`
      );
      setSuccesmessage("");
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {succesmessage && <p className="success-msg">{succesmessage}</p>}
      {errmsg && <p className="error-msg">{errmsg}</p>}
      <Form.Group className="mb-3" controlId="expense_type">
        <Form.Label>Expense Type</Form.Label>
        <Form.Select
          aria-label="Expense Type"
          {...register("expense_type", {
            required: true,
          })}
        >
          <option value="">Select expense Type</option>
          <option value="cash">cash</option>
          <option value="card">card</option>
        </Form.Select>
        {errors.expense_type && (
          <p className="error-msg">Please enter expense type</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="expense_date">
        <Form.Label>Expense Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Expense Date"
          {...register("expense_date", {
            required: true,
          })}
        />
        {errors.expense_date && (
          <p className="error-msg">Please enter expense date</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="expense_amount">
        <Form.Label>Expense Amount (In USD)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Expense Amount"
          {...register("expense_amount", {
            required: true,
          })}
        />
        {errors.expense_amount && (
          <p className="error-msg">Please enter expense amount</p>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Description"
          {...register("description", {
            required: true,
          })}
        />
        {errors.description && (
          <p className="error-msg">Please enter description</p>
        )}
      </Form.Group>
      <Form.Group>
        <Button variant="primary" type="submit">
          {expensedata ? "Update" : "Add"} Expense
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Expenseform;
