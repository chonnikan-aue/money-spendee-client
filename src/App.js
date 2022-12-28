import './App.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import Home from "./components/Home/Home"
import TableView from "./components/TableView/TableView"
import DashboardView from "./components/DashboardView/DashboardView"
import SummaryView from "./components/SummaryView/SummaryView"
import AddTransaction from "./components/AddTransaction/AddTransaction"
import UpdateInfo from "./components/UpdateInfo/UpdateInfo"
import { Route, Routes, Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Column, Dropdown } from 'react-bootstrap'

function App() {
     
  // TBD: Data structure 
  const [transactions, setTransactions] = useState({
    depositions: [],
    witdrawals: []
  }) 

  // BUG: url, setTransactions' argument 
  // const getDepositions = () => {
  //   axios.get('http://localhost:3001/depositions')
  //   .then(res => {
  //     console.log(res.data);
  //     setTransactions(res.data)
  //   })        
  // }

  // useEffect(() => {
  //   getDepositions()
  // }, [])

  // BUG: url, setTransactions' argument 
  // const getWitdrawals = () => {
  //   axios.get('http://localhost:3001/withdrawals')
  //   .then(res => {
  //     console.log(res.data);
  //     setTransactions((prevState) => ({
  //       ...prevState,
  //       [transactions.witdrawals]: res.data
  //     }))
  //   })        
  // }

  // useEffect(() => {
  //   getWitdrawals()
  // }, [])

  return (
    <div className="App">
      <div>
        <h1>Welcome to MONey Spendee</h1>
      </div>
      <nav>
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            View Transaction
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* <Dropdown.Item href="/table-view">Table View</Dropdown.Item> */}
            <Dropdown.Item as={Link} to="/table-view">Table View</Dropdown.Item>
            {/* <Dropdown.Item href="/dashboard-view">Dashboard View</Dropdown.Item> */}
            <Dropdown.Item as={Link} to="/dashboard-view">Dashboard View</Dropdown.Item>
            {/* <Dropdown.Item href="/summary-view">Summary View</Dropdown.Item> */}
            <Dropdown.Item as={Link} to="/summary-view">Summary View</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
          <Route path="/dashboard-view" element={<DashboardView />}/>
          <Route path="/summary-view" element={<SummaryView />}/>
          <Route path="/add-transaction" element={<AddTransaction />}/>
          <Route path="/update-info" element={<UpdateInfo />}/>
        </Routes>

      </main>
    </div>
  );
}

export default App;
