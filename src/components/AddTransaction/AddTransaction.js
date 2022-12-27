import React, { useState } from "react"
// import axios from "axios"

const type = ["food", "transportation", "rentals", "bill"] // Hard code just for testing. The real one will be brought from the DB
const account = ["income", "saving"]


const AddTransaction = () => {

  const [data, setData] = useState({
    title: '',
    amount: '',
    type: '',
    account: '',
  })
  const handleChange = e => {
    let value = e.target.value;
    if (e.target.name === 'amount') {
      value = parseInt(value, 10);
    } else if (e.target.name === 'type' || e.target.name === 'account') {
      value = value
      console.log(value)
    }
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: value
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(data)
    console.log(type)
  }

  return (
    <div>
      <h3>Title:</h3>
      <input
        type="text"
        name="title"
        placeholder="What did you pay?"
        onChange={handleChange}
      />
      <h3>Amount:</h3>
      <input
        type="text"
        name="amount"
        placeholder="THB"
        onChange={handleChange}
      />

      <h3>Type:</h3>
      <select
        name="type"
        onChange={handleChange} >
        <option disabled selected>Select Type</option>
        {
          type.map((type, index) => (
            <option value={index}>{type}</option>
          ))
        }
      </select>

      <h3>Account:</h3>
      <select
        name="account"
        onChange={handleChange}>
        <option disabled selected>Select Account</option>
        {
          account.map((account, index) => (
            <option value={index}>{account}</option>
          ))
        }
      </select>

      <form onSubmit={handleSubmit}>
        <input type="submit" value="Save" />
      </form>

    </div>
  )
}

export default AddTransaction
