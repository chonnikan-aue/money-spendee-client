import './App.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import Home from "./components/Home/Home"
import TableView from "./components/TableView/TableView"
import DashboardView from "./components/DashboardView/DashboardView"
import SummaryView from "./components/SummaryView/SummaryView"
import AddTransaction from "./components/AddTransaction/AddTransaction"
import UpdateInfo from "./components/UpdateInfo/UpdateInfo"
import LogIn from "./components/LogIn/LogIn"
import { Route, Routes, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Dropdown } from 'react-bootstrap'

function App() {
     
  // TBD: Data structure 
  const [transactions, setTransactions] = useState({
    deposits: [],
    withdraws: []
  }) 

  const getDeposits = () => {
    axios.get('http://localhost:3004/deposit')
    .then(res => {
      setTransactions((prevState) => ({
        ...prevState, 
        deposits: res.data
      }))

      // console.log(res.data)

      // console.log(transactions);
    })
    .catch((err) => {
      console.error(err);
    });
  }
  
  useEffect(() => {
    getDeposits()
  }, [])
  
  const getWithdraws = () => {
    axios.get('http://localhost:3004/withdraw')
    .then(res => {      
      setTransactions((prevState) => ({
        ...prevState, 
        withdraws: res.data
      }))

      // console.log(res.data)

      // console.log(transactions);
    })
    .catch((err) => {
      console.error(err);
    });        
  }

  useEffect(() => {
    getWithdraws()
  }, [])

  return (
    <div className="App">
      <Container>
        <Row id="app-header">
          <div>
            <h1>Welcome to MONey Spendee</h1>
          </div>
        </Row>
        <Row id="nav-bar">
          <nav>
            <Col>
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  View Transaction
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/table-view">
                    Table View
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/dashboard-view">
                    Dashboard View
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/summary-view">
                    Summary View
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Link to="/add-transaction">
                <Button>Add Transaction</Button>
              </Link>
            </Col>
            <Col>
              <Link to="/update-info">
                <Button>Update Personal Info</Button>
              </Link>
            </Col>
            <Col>
              <Link to="/log-in">
                <Button>Log In</Button>
              </Link>
            </Col>
          </nav>
        </Row>
      </Container>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/table-view"
            element={<TableView transactions={transactions} />}
          />
          <Route
            path="/dashboard-view"
            element={<DashboardView transactions={transactions} />}
          />
          <Route
            path="/summary-view"
            element={<SummaryView transactions={transactions} />}
          />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/update-info" element={<UpdateInfo />} />
          <Route path="/log-in" element={<LogIn />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;
