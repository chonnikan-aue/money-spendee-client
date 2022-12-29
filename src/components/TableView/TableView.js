import React from "react"
import axios from "axios"
import editIcon from '../../images/edit.png'
import deleteIcon from '../../images/delete.png'
import './TableView.css';
import { Container, Row, Table, Pagination } from "react-bootstrap"

const TableView = props => {

  const editTransaction = () => {
    
    return console.log("editted");
  } 

  const deleteTransaction = (type, id) => {
    axios.delete(`http://localhost:3004/${type}/${id}`)
        .then(res => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    return console.log(`delete transaction <type: ${type}, id: ${id}>`);
  } 
  
  const depositsList = props.transactions.deposits.map((deposit, index) => {

    let type = "deposit"

    return ( 
      <tr key={index}>
        <th scope="row">{deposit.date}</th>
        <td>{deposit.name}</td>
        <td>{deposit.typeId === 1 ? "Checkings" : "Savings"}</td> 
        {/* Q: Shouldn't 'fixed income' be savings in DB? */}
        <td>{deposit.amount}</td>
        <td>
          <img src={editIcon} alt="Edit icon" href="" onClick={editTransaction}></img>
          <img src={deleteIcon} alt="Delete icon" href="" onClick={()=>{deleteTransaction(type, deposit.id)}}></img> 
        </td>
      </tr>
    ) 
  })

  const withdrawsList = props.transactions.withdraws.map((withdraw, index) => {
    return ( 
      <tr key={index}>
        <th scope="row">{withdraw.date}</th>
        <td>{withdraw.name}</td>
        <td>{withdraw.typeId === 1 ? "Daily Expenses" : "Investment"}</td>
        <td>{withdraw.amount}</td>
        <td>
          <img src={editIcon} alt="Edit icon" href="" onClick={editTransaction}></img>
          <img src={deleteIcon} alt="Delete icon" href="" onClick={deleteTransaction}></img>
        </td>
      </tr>
    ) 
  })

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
        <Table bordered responsive hover>
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
            {depositsList}
            {withdrawsList}
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