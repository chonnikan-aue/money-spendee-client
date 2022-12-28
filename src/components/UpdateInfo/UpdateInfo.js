import React, { useState } from "react"
import './UpdateInfo.css'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css';

const UpdateInfo = () => {
  const [budget, setBudget] = useState({
    income: '',
    expenses: '',
    saving: '',
    invest: '',
  });

  const [alert, setAlert] = useState(true);

  const handleChange = e => {
    const intValue = parseInt(e.target.value, 10);
    setBudget((prevState) => ({
      ...prevState,
      [e.target.name]: intValue
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(budget);
  };

  return (
    <div className="container box">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <span className="changeIncome">
            <h2>Fix income</h2>
            <p>- this will be automatically added to transactions every 1st of each month -</p>
            <div className="input-group">
            <label htmlFor="income" className="input-label">Amount:</label>
              <input
                type="text"
                name="income"
                placeholder="THB"
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </span>
          <span className="changeBudget">
            <h2>Budget</h2>
            <div className="input-group">
              <label htmlFor="expenses" className="input-label">Daily Expenses:</label>
              <input
                type="text"
                name="expenses"
                placeholder="60%"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <br />
            <div className="input-group">
              <label htmlFor="saving" className="input-label">Savings:</label>
              <input
                type="text"
                name="saving"
                placeholder="20%"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <br />
            <div className="input-group">
              <label htmlFor="invest" className="input-label">Investment:</label>

              <input
                type="text"
                name="invest"
                placeholder="20%"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="input-group">

            </div>
            <br />
            <input
              type="checkbox"
              name="alert"
              checked={alert}
              onChange={() => setAlert(!alert)}
            />
            <p className='input'>Alert me when I spend more than 90% of my budget limit</p>

            <form onSubmit={handleSubmit}>
              <input type="submit" value="Save" />
            </form>
          </span>
        </div>
      </form>
    </div>
  );
};

export default UpdateInfo;
