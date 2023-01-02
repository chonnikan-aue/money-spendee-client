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
    axios.post(`http://localhost:3001/withdraw/user/${userId}`, data,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
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
      <FloatingLabel label= "Amount" className="mb-3">
        <Form.Control
          name="name"
          type="text"
          placeholder="Amount"
          onChange={handleChange}
        />
      </FloatingLabel>
        <FormGroup>
          <Label for="typeId">Type:</Label>
          <Input
            type="select"
            name="typeId"
            onChange={handleChange}
          >
            <option disabled selected>Select Type</option>
            {props.userData.DepositTypes
            ? props.userData.WithdrawTypes.map((type, index) => (
                <option key={index} value={type.id}>
                  {type.name}
                </option>
              ))
            : null}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="withdrawFromId">Account:</Label>
          <Input
            type="select"
            name="withdrawFromId"
            onChange={handleChange}
          >
            <option disabled selected>Select Account</option>
            {props.userData.DepositTypes
            ? props.userData.DepositTypes.map((account, index) => (
                <option key={index} value={account.id}>
                  {account.name}
                </option>
              ))
            : null}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="date">Date:</Label>
          <Input
            type="date"
            name="date"
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">Save</Button>
      </Form>
    </Container>
  )
}

export default AddWithdrawTransaction
