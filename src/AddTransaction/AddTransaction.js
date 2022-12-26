import React, { useState } from "react"
import axios from "axios"

const type = ["food", "transportation", "rentals", "bill"] // Hard code just for testing. The real one will be brought from the DB
const account = ["income", "saving"]

const [data, setData] = useState({})

const AddTransaction = () => {
  return (
    <div>
      <h3>Title:</h3> <input type="text" placeholder="What did you pay?"></input>
      <h3>Amount:</h3> <input type="text" placeholder="THB"></input>

      <h3>Type:</h3>
      <select name="type">
        <option disabled selected>Select Type</option>
        {
          type.map(type => {
            <option value={type}>{type}</option>
          })
        }
      </select>

      <h3>Account:</h3>
      <select name="account">
        <option disabled selected>Select Account</option>
        {
          account.map(account => (
            <option value={account}>{account}</option>
          ))
        }
      </select>

      <input type="submit" value="Save" />
    </div>
  )
}

export default AddTransaction
