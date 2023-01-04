import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";

const AddWithdrawTransaction = (props) => {
  const amountRef = useRef();
  const withdrawTypeRef = useRef();
  const depositTypeRef = useRef();
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      userId: props.userData.id,
    }));
    if (
      amountRef.current.value &&
      withdrawTypeRef.current.value &&
      depositTypeRef.current.value
    ) {
      props.alertBudget(
        depositTypeRef.current.value,
        withdrawTypeRef.current.value,
        amountRef.current.value
      );
    }
  };

  useEffect(() => {
    props.setShow(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("jwt");
    axios
      .post(`https://kind-ruby-hen-hem.cyclic.app/withdraw/user/${props.userData.id}`, data, {
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
      {props.show && (
        <Alert variant="warning">
          Your transaction is about to over the budget limit.
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
          ref={amountRef}
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
          ref={withdrawTypeRef}
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
          ref={depositTypeRef}
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
