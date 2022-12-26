import './App.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import TableView from "./components/TableView"

function App() {
  return (
    <div className="App">
      {/* <homepage/> */}
      <h1>Welcome to MONey Spendee</h1>
      <h2>View Transaction | Add Transaction | Update Personal Info</h2>
      <p>Is this the homepage, or are we gonna create another one?</p>
      <TableView/>
    </div>
  );
}

export default App;
