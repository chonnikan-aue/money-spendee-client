import './AddWithdrawTransaction.css'
import React, { useEffect, useState } from "react"
import axios from "axios"
import { FormGroup, Label, Input, Container } from 'reactstrap';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

const AddWithdrawTransaction = (props) => {
  const userId = props.userData.id

  const [data, setData] = useState({
    userId: userId
  })

  const handleChange = e => {
    let value = e.target.value;
    if (e.target.name === 'amount') {
      value = parseInt(value, 10);
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
        console.log(res)
        console.log(data)
        alert("Transaction has been updated.");
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Container className="content">
      <h2 className="header text-center">Add your transactions here</h2>
      <Form onSubmit={handleSubmit}>
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
    </Container>
  )
}

export default AddWithdrawTransaction
