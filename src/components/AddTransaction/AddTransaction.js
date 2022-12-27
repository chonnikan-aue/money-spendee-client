import './AddTransaction.css'
import React, { useState } from "react"
import axios from "axios"

const type = ["food", "transportation", "rentals", "bill"] // Hard code just for testing. The real one will be brought from the DB
const account = ["income", "saving"]


const AddTransaction = () => {

  const [data, setData] = useState({})
  const handleChange = e => {
    let value = e.target.value;
    if (e.target.name === 'amount') {
      value = parseInt(value, 10);
    }
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: value
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();

    console.log(data)

    axios.post("http://localhost:3001/withdraw", data)
      .then(res => {
        console.log(res)
      })
  }

  return (
    <div>
      <h4 className='input'>Title:</h4>
      
      <input
        type="text"
        name="name"
        placeholder="What did you pay?"
        onChange={handleChange}
      />
      <br />
      <h4 className='input'>Amount:</h4>
      <input
        type="text"
        name="amount"
        placeholder="THB"
        onChange={handleChange}
      />
      <br />
      <h4 className='input'>Type:</h4>
      <select
        name="typeId"
        onChange={handleChange} >
        <option disabled selected>Select Type</option>
        {
          type.map((type, index) => (
            <option value={index}>{type}</option>
          ))
        }
      </select>
      <br />
      <h4 className='input'>Account:</h4>
      <select
        name="withdrawFromId"
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
