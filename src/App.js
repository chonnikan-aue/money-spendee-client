import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import ViewTransaction from "./components/ViewTransaction/ViewTransaction";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import UpdateInfo from "./components/UpdateInfo/UpdateInfo";
import EditTransaction from "./components/EditTransaction/EditTransaction";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  const [profileData, setProfileData] = useState({});
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);

  // Ougrid's Section Starts
  //
  const [transactions, setTransactions] = useState({
    deposits: [],
    withdraws: [],
  });
  //
  // Ougrid's Section Ends

  const handleProfileChange = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const getUserData = () => {
    let token = localStorage.getItem("jwt");
    axios
      .get(
        `https://kind-ruby-hen-hem.cyclic.app/user/username/${profileData.username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        for (let i = 0; i < res.data.Deposits.length; i++) {
          res.data.Deposits[i].date = res.data.Deposits[i].date.split("T")[0];
        }
        for (let i = 0; i < res.data.Withdraws.length; i++) {
          res.data.Withdraws[i].date = res.data.Withdraws[i].date.split("T")[0];
        }
        res.data.WithdrawTypes.sort((a, b) => b.id - a.id);
        res.data.sumDepositAmount = res.data.Deposits.reduce(
          (sum, deposit) => sum + deposit.amount,
          0
        );
        res.data.sumWithdrawAmount = res.data.Withdraws.reduce(
          (sum, withdraw) => sum + withdraw.amount,
          0
        );
        for (let i = 0; i < res.data.DepositTypes.length; i++) {
          res.data.DepositTypes[i].sumAmount = res.data.Deposits.reduce(
            (sum, deposit) => {
              if (deposit.typeId === res.data.DepositTypes[i].id) {
                return sum + deposit.amount;
              }
              return sum + 0;
            },
            0
          );
        }
        for (let i = 0; i < res.data.WithdrawTypes.length; i++) {
          res.data.WithdrawTypes[i].sumAmount = res.data.Withdraws.reduce(
            (sum, withdraw) => {
              if (withdraw.typeId === res.data.WithdrawTypes[i].id) {
                return sum + withdraw.amount;
              }
              return sum + 0;
            },
            0
          );
        }
        setUserData(res.data);
      });
  };

  const alertBudget = (depositTypeValue, withdrawTypeValue, amountValue) => {
    const sumAmountDepositType = userData.DepositTypes.filter((depositType) => {
      return depositType.id == depositTypeValue;
    })[0].sumAmount;
    const withdrawTypeSelected = userData.WithdrawTypes.filter(
      (withdrawType) => {
        return withdrawType.id == withdrawTypeValue;
      }
    );
    const sumAmountWithdrawType = withdrawTypeSelected[0].sumAmount;
    const budgetPercent = withdrawTypeSelected[0].budgetPercent;
    const alertPercent = withdrawTypeSelected[0].alertPercent;
    const canUseMoney = (budgetPercent / 100) * sumAmountDepositType;
    if (
      parseFloat(amountValue) + sumAmountWithdrawType >
      (alertPercent / 100) * canUseMoney
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
    if (localStorage.getItem("profileData")) {
      setProfileData(JSON.parse(localStorage.getItem("profileData")));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (Object.keys(profileData).length !== 0) {
      localStorage.setItem(
        "profileData",
        JSON.stringify({ username: profileData.username })
      );
    }
  }, [profileData]);

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
            path="/view-transaction"
            element={
              <>
                <Header userData={userData} />
                <ViewTransaction
                  userData={userData}
                  setUserData={setUserData}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  getUserData={getUserData}
                />
              </>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <>
                <Header userData={userData} />
                <AddTransaction
                  userData={userData}
                  getUserData={getUserData}
                  alertBudget={alertBudget}
                  show={show}
                  setShow={setShow}
                />
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
            path="/edit-transaction/:type/:id"
            element={
              <>
                <Header userData={userData} />
                <EditTransaction
                  userData={userData}
                  getUserData={getUserData}
                  alertBudget={alertBudget}
                  show={show}
                  setShow={setShow}
                />
              </>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
