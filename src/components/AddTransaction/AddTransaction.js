import './AddTransaction.css'
import React, { useEffect, useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css';

const AddTransaction = () => {

  // Collect the overall data 
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


  // show type dropdown
  const [withdrawTypeData, setWithdrawTypeData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/withdraw-type')
      .then(res => {
        setWithdrawTypeData(res.data);
      });
  }, []);

  // show withdraw from dropdown
  const [depositTypeData, setDepositTypeData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/deposit-type')
      .then(res => {
        setDepositTypeData(res.data);
      });
  }, []);

  // Pass over all data to database
  const handleSubmit = e => {
    e.preventDefault();

    console.log(data)

    axios.post("http://localhost:3001/withdraw", data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    }

  return (
    <div>
      <div className="container box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h2 className="header">Add your transactions here</h2>
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
                withdrawTypeData.map(type => (
                  <option value={type.id}>{type.name}</option>
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
                depositTypeData.map((account, index) => (
                  <option value={index}>{account.name}</option>
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
