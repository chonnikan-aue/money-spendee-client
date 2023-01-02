import React, { useState } from "react"
import axios from "axios"
import { Container } from 'reactstrap';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

const AddDepositTransaction = (props) => {
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
    axios.post(`http://localhost:3001/deposit/user/${props.userData.id}`, data,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        props.getUserData();
        alert("Transaction has been deposited.");
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
      <Form onSubmit={handleSubmit}>
        <FloatingLabel label="Title" className="mb-3">
          <Form.Control
            name="name"
            type="text"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel label="Amount" className="mb-3">
          <Form.Control
            name="amount"
            type="text"
            onChange={handleChange}
          />
        </FloatingLabel>

        <FloatingLabel label="Account:" className="mb-3">
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

export default AddDepositTransaction
