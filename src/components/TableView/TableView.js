import React, { useState } from "react"
import axios from "axios"
import { Table } from "react-bootstrap"
const TableView = props => {
  return (
    <Table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Title</th>
          <th scope="col">Type</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
    <tr>
      <th scope="row">2 Jan 2023</th>
      <td>Fixed Income</td>
      <td>Income</td>
      <td>1,000</td>
    </tr>
    <tr>
      <th scope="row">1 Jan 2023</th>
      <td>Shopping</td>
      <td>Daily Expenses</td>
      <td>500</td>
    </tr>
    <tr>
      <th scope="row">1 Jan 2023</th>
      <td>Bank Deposit</td>
      <td>Savings</td>
      <td>500</td>
    </tr>
  </tbody> 
    </Table>
  )
}

export default TableView