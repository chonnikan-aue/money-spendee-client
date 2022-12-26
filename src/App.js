import './App.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import TableView from "./components/TableView/TableView"
import Home from "./components/Home/Home"
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/table-view">
          <h2>View Transaction</h2>
        </Link>
      </nav>
      <main>
        <div>
          <h1>Welcome to MONey Spendee</h1>
          {/* <h2>View Transaction | Add Transaction | Update Personal Info</h2> */}
        </div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/table-view" element={<TableView />}/>

        </Routes>

      </main>
    </div>
  );
}

export default App;
