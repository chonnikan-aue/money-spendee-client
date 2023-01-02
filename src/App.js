import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import ViewTransaction from "./components/ViewTransaction/ViewTransaction";
import TableView from "./components/TableView/TableView";
import DashboardView from "./components/DashboardView/DashboardView";
import SummaryView from "./components/SummaryView/SummaryView";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import UpdateInfo from "./components/UpdateInfo/UpdateInfo";
import EditTransaction from "./components/EditTransaction/EditTransaction";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Dropdown } from "react-bootstrap";


function App() {
  const [profileData, setProfileData] = useState({})
  const [userData, setUserData] = useState({})
  // Ougrid's Section Starts
  //
  const [transactions, setTransactions] = useState({
    deposits: [],
    withdraws: []
  })
  const [selectedTransaction, setSelectedTransaction] = useState({
    id: 0, // Either depositId or withdrawId
    name: "",
    amount: 0,
    date: "2023-01-05", 
    typeId: 0,
    userId: 0
  })
  const [summary, setSummary] = useState({})
  //
  // Ougrid's Section Ends

  const handleProfileChange = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const getUserData = () => {
    let token = localStorage.getItem("jwt")
    axios
      .get(`http://localhost:3001/user/username/${profileData.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        res.data.WithdrawTypes.sort((a, b) => b.id - a.id);
        console.log(res.data);
        setUserData(res.data);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUserData(JSON.parse(localStorage.getItem("userData")))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      localStorage.setItem("userData", JSON.stringify(userData))
    }
  }, [userData])

  return (
    <div className="App">
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                profileData={profileData}
                getUserData={getUserData}
                handleProfileChange={handleProfileChange}
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
                  setTransactions={setTransactions}
                />
              </>
            }
          />
          <Route
            path="/dashboard-view"
            element={
              <>
                <Header userData={userData} />
                <DashboardView userData={userData} setUserData={setUserData} />
              </>
            }
          />
          <Route
            path="/summary-view"
            element={
              <>
                <Header userData={userData} />
                <SummaryView 
                transactions={transactions}
                setTransactions={setTransactions}
                /> 
              </>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <>
                <Header userData={userData} />
                <AddTransaction userData={userData} getUserData={getUserData} />
              </>
            }
          />
          <Route
            path="/update-info"
            element={
              <>
                <Header userData={userData} />
                <UpdateInfo
                  handleProfileChange={handleProfileChange}
                  profileData={profileData}
                  setProfileData={setProfileData}
                  userData={userData}
                  getUserData={getUserData}
                />
              </>
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
                  selectedTransaction={selectedTransaction}
                  setSelectedTransaction={setSelectedTransaction}
                />
              </>
            }
          />
          <Route
            path="/dashboard-view"
            element={
              <>
                <Header userData={userData} />
                <DashboardView
                  userData={userData}
                  summary={summary}
                  setSummary={setSummary}
                />
              </>
            }
          />
          <Route
            path="/summary-view"
            element={
              <>
                <Header userData={userData} />
                <SummaryView summary={summary} setSummary={setSummary} />
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
          <Route
            path="/edit-transaction"
            element={
              <>
                <Header userData={userData} />
                <EditTransaction
                  selectedTransaction={selectedTransaction}
                  setSelectedTransaction={setSelectedTransaction}
                />
              </>
            }
          />
        </Routes>
      </Container>
    </div>
  )
}

export default App
