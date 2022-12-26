import './App.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import TableView from "./components/TableView/TableView"
import Home from "./components/Home/Home"
import AddTransaction from "./AddTransaction/AddTransaction"
import UpdateInfo from "./UpdateInfo/UpdateInfo"
import { Route, Routes, Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function App() {
     
  // TBD: Data structure 
  const [transactions, setTransactions] = useState({
    depositions: [],
    witdrawals: []
  }) 

  // BUG: url, setTransactions' argument 
  const getDepositions = () => {
    axios.get('http://localhost:3001/depositions')
    .then(res => {
      console.log(res.data);
      setTransactions(res.data)
    })        
  }

  useEffect(() => {
    getDepositions()
  }, [])

  // BUG: url, setTransactions' argument 
  const getWitdrawals = () => {
    axios.get('http://localhost:3001/withdrawals')
    .then(res => {
      console.log(res.data);
      setTransactions((prevState) => ({
        ...prevState,
        [transactions.witdrawals]: res.data
      }))
    })        
  }

  useEffect(() => {
    getWitdrawals()
  }, [])

  return (
    <div className="App">
      <div>
        <h1>Welcome to MONey Spendee</h1>
      </div>
      <nav>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        {/* BUG: Wrong links */}
        <Link to="/table-view"> 
          <select class="form-select" id="">
            <option value="">View Transaction</option>
            <option value="">Table View</option>
            <option value="">Dashboard View</option>
            <option value="">Summary View</option>
          </select>
        </Link>
        <Link to="/add-transaction">
          <Button>Add Transaction</Button>
        </Link>
        <Link to="/update-info">
          <Button>Update Personal Info</Button>
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/table-view" element={<TableView />}/>
          <Route path="/add-transaction" element={<AddTransaction />}/>
          <Route path="/update-info" element={<UpdateInfo />}/>
        </Routes>

      </main>
    </div>
  );
}

export default App;
