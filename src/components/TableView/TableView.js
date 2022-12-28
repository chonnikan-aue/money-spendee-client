import React, { useState } from "react"
import axios from "axios"
import editIcon from '../../images/edit.png'
import deleteIcon from '../../images/delete.png'
import './TableView.css';
import { Container, Row, Column, Table, Pagination } from "react-bootstrap"

const TableView = props => {

  let active = 1;
  let items = [];
    for (let number = 1; number <= 10; number++) {
      items.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
    }

  return (
    <Container>
      {/* {<script src="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.js"></script>}  */}
      <Row id="table-row">
        <Table bordered responsive>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Title</th>
              <th scope="col">Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Edit/ Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">2 Jan 2023</th>
              <td>Fixed Income</td>
              <td>Income</td>
              <td>1,000</td>
              <img src={editIcon} alt="Edit icon" href=""></img>
              <img src={deleteIcon} alt="Delete icon" href=""></img>
            </tr>
            <tr>
              <th scope="row">1 Jan 2023</th>
              <td>Shopping</td>
              <td>Daily Expenses</td>
              <td>500</td>
              <img src={editIcon} alt="Edit icon" href=""></img>
              <img src={deleteIcon} alt="Delete icon" href=""></img>
            </tr>
            <tr>
              <th scope="row">1 Jan 2023</th>
              <td>Bank Deposit</td>
              <td>Savings</td>
              <td>500</td>
              <img src={editIcon} alt="Edit icon" href=""></img>
              <img src={deleteIcon} alt="Delete icon" href=""></img>
            </tr>
          </tbody>
        </Table>
      </Row>
      <br />
      <Row id="pagination-row">
        <Pagination>{items}</Pagination>
      </Row>
    </Container>
  )
}

export default TableView