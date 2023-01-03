import React, { useState, useRef } from "react";
import axios from "axios";
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";

const AddWithdrawTransaction = (props) => {
  const amount = useRef();
  const withdrawType = useRef();
  const depositType = useRef();
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      userId: props.userData.id,
    }));
    if (
      amount.current.value &&
      withdrawType.current.value &&
      depositType.current.value
    ) {
      const depositTypeValue = depositType.current.value;
      const sumAmountDepositType = props.userData.DepositTypes.filter(
        (depositType) => {
          return depositType.id == depositTypeValue;
        }
      )[0].sumAmount;
      const withdrawTypeValue = withdrawType.current.value;
      const withdrawTypeSelected = props.userData.WithdrawTypes.filter(
        (withdrawType) => {
          return withdrawType.id == withdrawTypeValue;
        }
      );
      const sumAmountWithdrawType = withdrawTypeSelected[0].sumAmount;
      const budgetPercent = withdrawTypeSelected[0].budgetPercent;
      const alertPercent = withdrawTypeSelected[0].alertPercent;
      const canUseMoney = (budgetPercent / 100) * sumAmountDepositType;
      if (
        parseFloat(amount.current.value) + sumAmountWithdrawType >
        (alertPercent / 100) * canUseMoney
      ) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("jwt");
    axios
      .post(`http://localhost:3001/withdraw/user/${props.userData.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        props.getUserData();
        alert("Transaction has been withdrawn.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {show && (
        <Alert variant="warning" onClose={() => setShow(false)}>
          Your transaction is over the budget limit
        </Alert>
      )}
      <FloatingLabel label="Name" className="mb-3">
        <Form.Control
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel label="Amount" className="mb-3">
        <Form.Control
          name="amount"
          type="number"
          min={0.01}
          step="any"
          placeholder="Amount"
          onChange={handleChange}
          ref={amount}
          required
        />
      </FloatingLabel>
      <FloatingLabel label="Date" className="mb-3">
        <Form.Control
          name="date"
          type="date"
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel label="Withdraw Type" className="mb-3">
        <Form.Select
          name="typeId"
          onChange={handleChange}
          ref={withdrawType}
          required
        >
          <option value="">Select Withdraw Type</option>
          {props.userData.WithdrawTypes
            ? props.userData.WithdrawTypes.map((withdrawType, index) => (
                <option key={index} value={withdrawType.id}>
                  {withdrawType.name}
                </option>
              ))
            : null}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel label="Withdraw from Account" className="mb-3">
        <Form.Select
          name="withdrawFromId"
          onChange={handleChange}
          ref={depositType}
          required
        >
          <option value="">Select Account</option>
          {props.userData.DepositTypes
            ? props.userData.DepositTypes.map((account, index) => (
                <option key={index} value={account.id}>
                  {account.name}
                </option>
              ))
            : null}
        </Form.Select>
      </FloatingLabel>
      <Button color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
export default AddWithdrawTransaction;
