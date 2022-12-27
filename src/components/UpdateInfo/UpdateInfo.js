import React, { useState } from "react"
import axios from "axios"

const UpdateInfo = () => {

  const [budget, setBudget] = useState({
    income: '',
    expenses: '',
    saving: '',
    invest: '',
  })

  const [alert, setAlert] = useState(true)

  const handleChange = e => {
    const intValue = parseInt(e.target.value, 10);
    setBudget((prevState) => ({
      ...prevState,
      [e.target.name]: intValue
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(budget)
  }

  return (
    <div>
      <span className="changeIncome">
        <h1>Fix income</h1>
        <p>- this will be automatically added to transactions every 1st of each month -</p>
        <h3>Amount:</h3>
        <input
          type="text"
          name="income"
          placeholder="THB"
          onChange={handleChange}
        />
        <form onSubmit={handleSubmit}>
          <input type="submit" value="Save" />
        </form>
      </span>
      <span className="changeBudget">
        <h1>Budget</h1>
        <h3>Daily Expenses:</h3>
        <input
          type="text"
          name="expenses"
          placeholder="60%" // need to update to default value from DB
          onChange={handleChange}
        />
        <h3>Savings:</h3>
        <input
          type="text"
          name="saving"
          placeholder="20%" // need to update to default value from DB
          onChange={handleChange}
        />
        <h3>Investment:</h3>
        <input
          type="text"
          name="invest"
          placeholder="20%" // need to update to default value from DB
          onChange={handleChange}
          />
      
        <input
          type="checkbox"
          name="alert"
          checked={alert}
          onChange={() => setAlert(!alert)}
        />
        <p>Alert me when I spend more than 90% of my budget limit</p>

        <form onSubmit={handleSubmit}>
          <input type="submit" value="Save" />
        </form>
      </span>

    </div>
  )
}

export default UpdateInfo