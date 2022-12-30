import './App.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import Home from "./components/Home/Home"
import TableView from "./components/TableView/TableView"
import DashboardView from "./components/DashboardView/DashboardView"
import SummaryView from "./components/SummaryView/SummaryView"
import AddTransaction from "./components/AddTransaction/AddTransaction"
import UpdateInfo from "./components/UpdateInfo/UpdateInfo"
import SignUp from "./components/SignUp/SignUp"
import LogIn from "./components/LogIn/LogIn"
import EditTransaction from "./components/EditTransaction/EditTransaction"
import { Route, Routes, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Dropdown } from 'react-bootstrap'

function App() {
    
  const [transactions, setTransactions] = useState({
    deposits: [],
    withdraws: []
  }) 

  // TO DO: Make it fetch user's data dynamically.
  const [userData, setUserData] = useState({
    id: 1,
    username: "Mai"
  })

  const getDeposits = () => {
    axios.get(`http://localhost:3001/deposit/user/${userData.id}`)
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
    axios.get(`http://localhost:3001/withdraw/user/${userData.id}`)
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
        <Row>
          <h4>Currently Signed In as :  "{userData.username}"</h4>
        </Row>
        <Row id="nav-bar">
          <nav>
            <Col xs={4} md={2}>
              <Link to="/">
                <Button>Home</Button>
              </Link>
            </Col>
            <Col xs={4} md={2}>
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
            <Col xs={4} md={2}>
              <Link to="/add-transaction">
                <Button>Add Transaction</Button>
              </Link>
            </Col>
            <Col xs={4} md={2}>
              <Link to="/update-info">
                <Button>Update Personal Info</Button>
              </Link>
            </Col>
            <Col xs={4} md={2}>
              <Link to="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </Col>
            <Col xs={4} md={2}>
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
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/edit-transaction" element={<EditTransaction />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;
