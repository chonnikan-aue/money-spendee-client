import './AddTransaction.css'
import React, { useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css';

const type = ["food", "transportation", "rentals", "bill"] // Hard code just for testing. The real one will be brought from the DB
const account = ["income", "saving"]


const AddTransaction = () => {

  const [data, setData] = useState({
    userId: 1
  })
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
      <div className="container box">

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Title:</label>
            <input
              type="text"
              name="name"
              placeholder="What did you pay?"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              name="amount"
              placeholder="THB"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="typeId">Type:</label>
            <select
              name="typeId"
              onChange={handleChange}
              className="form-control"
            >
              <option disabled selected>Select Type</option>
              {
                type.map((type, index) => (
                  <option value={index}>{type}</option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="withdrawFromId">Account:</label>
            <select
              name="withdrawFromId"
              onChange={handleChange}
              className="form-control"
            >
              <option disabled selected>Select Account</option>
              {
                account.map((account, index) => (
                  <option value={index}>{account}</option>
                ))
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <input type="submit" value="Save" className="btn btn-primary" />
        </form>
      </div>
    </div>
  )
}

export default AddTransaction
