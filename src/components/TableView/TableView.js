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
    </Table>
  )
}

export default TableView