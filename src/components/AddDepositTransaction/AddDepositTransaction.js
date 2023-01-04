import React, { useState } from "react";
import axios from "axios";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const AddDepositTransaction = (props) => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      userId: props.userData.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("jwt");
    axios
      .post(`https://kind-ruby-hen-hem.cyclic.app/deposit/user/${props.userData.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        props.getUserData();
        alert("Transaction has been deposited.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
      <FloatingLabel label="Deposit to Account" className="mb-3">
        <Form.Select name="typeId" onChange={handleChange} required>
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

export default AddDepositTransaction;
