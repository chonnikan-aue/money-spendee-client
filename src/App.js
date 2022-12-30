import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import TableView from "./components/TableView/TableView";
import DashboardView from "./components/DashboardView/DashboardView";
import SummaryView from "./components/SummaryView/SummaryView";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import UpdateInfo from "./components/UpdateInfo/UpdateInfo";
import EditTransaction from "./components/EditTransaction/EditTransaction"
import { Route, Routes, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Dropdown } from "react-bootstrap";

function App() {
  const [loginData, setLoginData] = useState({});
  const [userData, setUserData] = useState({});

  const getUserData = () => {
    let token = localStorage.getItem("jwt");
    axios
      .get(`http://localhost:3001/user/username/${loginData.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      });
  };  

  const [transactions, setTransactions] = useState({
    deposits: [],
    withdraws: []
  }) 

  // TO DO: Make it fetch user's data dynamically.
  // const [userData, setUserData] = useState({
  //   id: 1,
  //   username: "Mai"
  // })

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
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  loginData={loginData}
                  setLoginData={setLoginData}
                  getUserData={getUserData}
                />
              }
            />
            <Route
              path="/table-view"
              element={
                <>
                  <Header userData={userData} />
                  <TableView
                    userData={userData}
                    setUserData={setUserData}
                    transactions={transactions}
                    loginData={loginData}
                  />
                </>
              }
            />
            <Route
              path="/dashboard-view"
              element={
                <>
                  <Header userData={userData} />
                  <DashboardView transactions={transactions} />
                </>
              }
            />
            <Route
              path="/summary-view"
              element={
                <>
                  <Header userData={userData} />
                  <SummaryView transactions={transactions} />
                </>
              }
            />
            <Route
              path="/add-transaction"
              element={
                <>
                  <Header userData={userData} />
                  <AddTransaction />
                </>
              }
            />
            <Route
              path="/update-info"
              element={
                <>
                  <Header userData={userData} />
                  <UpdateInfo />
                </>
              }
            />
            <Route
              path="/edit-transaction"
              element={
                <>
                  <Header userData={userData} />
                  <EditTransaction />
                </>
              }
            />
          </Routes>
        </main>
      </Container>
    </div>
  )
}

export default App;
