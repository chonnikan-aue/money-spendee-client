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

  return (
    <div className="App">
      <Container>
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
                {/* <TableView /> */}
              </>
            }
          />
          <Route
            path="/dashboard-view"
            element={
              <>
                <Header userData={userData} />
                {/* <DashboardView /> */}
              </>
            }
          />
          <Route
            path="/summary-view"
            element={
              <>
                <Header userData={userData} />
                {/* <SummaryView /> */}
              </>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <>
                <Header userData={userData} />
                {/* <AddTransaction /> */}
              </>
            }
          />
          <Route
            path="/update-info"
            element={
              <>
                <Header userData={userData} />
                {/* <UpdateInfo /> */}
              </>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
