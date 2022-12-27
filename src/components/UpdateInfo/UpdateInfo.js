import React, { useState } from "react"
import './UpdateInfo.css'
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
    // axios.post("http://localhost:3001/", budget)
    // .then(res => {
    //     console.log(res)
    // })
  }

  return (
    <div>
      <span className="changeIncome">
        <h1>Fix income</h1>
        <p>- this will be automatically added to transactions every 1st of each month -</p>
        <h3 className='input'>Amount:</h3>
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
        <h3 className='input'>Daily Expenses:</h3>
        <input
          type="text"
          name="expenses"
          placeholder="60%" // need to update to default value from DB
          onChange={handleChange}
        />
        <br />
        <h3 className='input'>Savings:</h3>
        <input
          type="text"
          name="saving"
          placeholder="20%" // need to update to default value from DB
          onChange={handleChange}
        />
        <br />
        <h3 className='input'>Investment:</h3>
        <input
          type="text"
          name="invest"
          placeholder="20%" // need to update to default value from DB
          onChange={handleChange}
          />
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
  )
}

export default UpdateInfo