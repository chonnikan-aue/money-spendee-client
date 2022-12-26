import './App.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import TableView from "./components/TableView/TableView"
import Home from "./components/Home/Home"
import { Route, Routes, Link, Navigate } from "react-router-dom";

function App() {

  const [transactions, setTransactions] = useState({
    depositions: [],
    witdrawals: []
  })

  const getDepositions = () => {
    axios.get('http://localhost:3001/depositions')
    .then(res => {
      console.log(res.data);
      setTransactions()
    })        
  }

  useEffect(() => {
    getDepositions()
  }, [])

  return (
    <div className="App">
      <div>
        <h1>Welcome to MONey Spendee</h1>
      </div>
      <nav>
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/table-view">
          <h2>View Transaction</h2>
        </Link>
        <Link to="/add-transaction">
          <h2>Add Transaction</h2>
        </Link>
        <Link to="/update-personal-info">
          <h2>Update Personal Info</h2>
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/table-view" element={<TableView />}/>
          {/* <Route path="/add-transaction" element={<AddTransaction />}/> */}
          {/* <Route path="/update-personal-info" element={<UpdatePersonalInfo />}/> */}
        </Routes>

      </main>
    </div>
  );
}

export default App;
