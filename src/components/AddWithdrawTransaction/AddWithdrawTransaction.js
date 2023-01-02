import React, { useState } from "react"
import axios from "axios"
import { Form, Button, FloatingLabel } from 'react-bootstrap';

const AddWithdrawTransaction = (props) => {
  const userId = props.userData.id
  // console.log(props.userData)
  const [data, setData] = useState({
    userId: userId
  })
  const withdrawTypes = props.userData.WithdrawTypes
  const withdraws = props.userData.Withdraws
  let Invest = 0
  // console.log(withdrawTypes)
  console.log(withdraws)

  // const sumInvest = () => {
  //   // for (let i = 0; i < withdraws.length; i++) {
  //   //   for (let j = 0; j < withdrawTypes.length; j++) {
  //       if (withdraws.typeId === 6)
  //         withdraws.reduce((total, transaction) => {
  //           // if (transaction.typeId === 6) {
  //             return total + transaction.amount
  //           // }
  //         }, 0)
  //     // }
  //   // }
  // }

  // const sumByType = () => {
  //   const typeTotals = {};
  //   for (const transaction of withdraws.transactions) {
  //     if (typeTotals[transaction.typeId] === undefined) {
  //       typeTotals[transaction.typeId] = transaction.amount;
  //     } else {
  //       typeTotals[withdraws.typeId] += transaction.amount;
  //     }
  //   }
  //   return typeTotals;
  // }
  
  // console.log(sumByType());

  // const sumInvest = () => {
  // const transactionsWithTypeId6 = withdraws.filter(transaction => transaction.typeId === 6);
  //   return transactionsWithTypeId6.reduce((total, transaction) => {
  //     return total + transaction.amount;
  //   }, 0);
  // }

  //   sumInvest()
  //   const total = sumInvest();
  //   console.log(total);


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
    // test
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