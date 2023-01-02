import React, { useState } from "react"
import axios from "axios"
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap';

const AddWithdrawTransaction = (props) => {
  const userId = props.userData.id
  console.log(props.userData)
  const [data, setData] = useState({
    userId: userId
  })
  const [formData, setFormData] = useState({
    withdrawFromId: 0,
    typeId: 0,
  });
  const [show, setShow] = useState(false);
  const [alertAmount, setAlertAmount] = useState('')

  const handleChange = (e) => {
    let value = e.target.value;
    let matchType;
    let totalAmount;
    let matchWithdrawType;
    let budgetAmount = 0;

    if (e.target.name === "typeId" || e.target.name === "withdrawFromId") {
      setFormData((prevState) => ({
        ...prevState,
        withdrawFromId: value,
        typeId: value,
      }));
    }

    console.log(formData);

    let { withdrawFromId, typeId } = formData;
    if (withdrawFromId != 0 && typeId != 0) {
      matchType = props.userData.Deposits.filter(
        (deposit) => deposit.typeId == withdrawFromId
      );

      totalAmount = matchType.reduce(
        (total, deposit) => total + deposit.amount,
        0
      );
      console.log(`this is total ${totalAmount}`);

      matchWithdrawType = props.userData.WithdrawTypes.find(
        (withdrawType) => withdrawType.id == typeId
      );
      console.log(matchWithdrawType);
      budgetAmount = totalAmount * (matchWithdrawType.budgetPercent / 100);
      console.log(`this is budget ${budgetAmount}`);

      const alertBudget = budgetAmount * (matchWithdrawType.alertPercent / 100);
      console.log(`this is alert ${alertBudget}`);
      setAlertAmount(alertBudget);
    }

    value = parseInt(value, 10);
    console.log(value);
    console.log(alertAmount);
    if (formData.typeId != 0 && formData.withdrawFromId != 0) {
      if (value > alertAmount) {
        setShow(true);
      } else {
        setShow(false);
      }
    }

    setData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
      userId: props.userData.id,
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    let token = localStorage.getItem("jwt");

    axios.post(`http://localhost:3001/withdraw/user/${props.userData.id}`, data,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        props.getUserData();
        alert("Transaction has been withdrawn.");
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {show && (
        <Alert variant="warning" onClose={() => setShow(false)}>
          `Your transaction is over the budget limit which is {alertAmount} THB`
        </Alert>
      )}
      <FloatingLabel label="Title" className="mb-3">
        <Form.Control
          name="name"
          type="text"
          placeholder="What did you pay?"
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel label="Amount" className="mb-3">
        <Form.Control
          name="amount"
          type="text"
          placeholder="Amount"
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel label="Type" className="mb-3">
        <Form.Select name="typeId" onChange={handleChange} required>
          <option value="">Select Type</option>
          {props.userData.WithdrawTypes
            ? props.userData.WithdrawTypes.map((type, index) => (
              <option key={index} value={type.id}>
                {type.name}
              </option>
            ))
            : null}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel label="Account:" className="mb-3">
        <Form.Select name="withdrawFromId" onChange={handleChange} required>
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

      <FloatingLabel label="Date" className="mb-3">
        <Form.Control
          name="date"
          type="date"
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button color="primary" type="submit">Submit</Button>
    </Form>
  )
}
export default AddWithdrawTransaction