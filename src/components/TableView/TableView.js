import React, { useState, useEffect } from "react"
import axios from "axios"
import editIcon from "../../images/edit.png"
import deleteIcon from "../../images/delete.png"
import "./TableView.css"
import { Container, Row, Col, Table, Pagination } from "react-bootstrap"
import { Link } from "react-router-dom"

const TableView = (props) => {
  const [div, setDiv] = useState();

  useEffect(()=>{
    if (props.userData){
      setDiv(depositsList)
    }
  }, [props.userData])

  // const [transactions, setTransactions] = useState({
  //   deposits: [],
  //   withdraws: []
  // })
  // const [transactions, setTransactions] = useState([])

  // // Mai's recommendation
  // useEffect(()=>{
  //   if (props.userData) {
  //     console.log(props.userData);
  //   }
  // },[props.userData])

  // return (
  //   <h1>{props.userData.Deposits[0].name}</h1>
  // )
  //

  // Start of Test 01: Static version
  //
  //

  const editTransaction = (type, id) => {
    // selectedTransaction
    props.setSelectedTransaction({
      id: id, // Either depositId or withdrawId
      name: props.userData.type.filter((transaction) => transaction.id === id)
        .name, // Q: Will type be passed in from the fn?
      amount: props.userData.type.filter((transaction) => transaction.id === id)
        .amount,
      date: props.userData.type.filter((transaction) => transaction.id === id)
        .date,
      typeId: props.userData.type.filter((transaction) => transaction.id === id)
        .typeId,
      userId: props.userData.type.filter((transaction) => transaction.id === id)
        .userId,
    })

    return console.log(`edit transaction <type: ${type}, ${type}Id: ${id}>`)
  }

  const deleteTransaction = (type, id) => {
    axios
      .delete(`http://localhost:3001/${type}/${id}`)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    return console.log(`delete transaction <type: ${type}, id: ${id}>`)
  }

  // console.log(props.userData);
  // console.log(props.userData.Deposits[0].date);

  const depositsList = props.userData.Deposits.map((deposit, index) => {
    let type = "deposit"

    return (
      //
      <tr key={index}>
        <th scope="row">{deposit.date}</th>
        <td>{deposit.name}</td>
        <td>{deposit.typeId === 1 ? "Checkings" : "Savings"}</td>
        <td>{deposit.amount}</td>
        <td>
          <Col as={Link} to="/edit-transaction">
            <img
              src={editIcon}
              alt="Edit icon"
              href=""
              onClick={() => {
                editTransaction(type, deposit.id)
              }}
            ></img>
            {/* TO DO: Use React-icon */}
          </Col>
          <img
            src={deleteIcon}
            alt="Delete icon"
            href=""
            onClick={() => {
              deleteTransaction(type, deposit.id)
            }}
          ></img>
        </td>
      </tr>
    )
  })

  // useEffect(()=>{
  //   setTransactions({
  //     deposits: depositsList
  //   })
  // }, [depositsList])

  const withdrawsList = props.userData.Withdraws.map((withdraw, index) => {
    return (
      <tr key={index}>
        <th scope="row">{withdraw.date}</th>
        <td>{withdraw.name}</td>
        <td>{withdraw.typeId === 1 ? "Daily Expenses" : "Investment"}</td>
        <td>{withdraw.amount}</td>
        <td>
          <Col as={Link} to="/edit-transaction">
            <img
              src={editIcon}
              alt="Edit icon"
              href=""
              onClick={editTransaction}
            ></img>
          </Col>
          <img
            src={deleteIcon}
            alt="Delete icon"
            href=""
            onClick={deleteTransaction}
          ></img>
        </td>
      </tr>
    )
  })

  // DELETE
  // useEffect(()=>{
  //   setTransactions({
  //     deposits: depositsList,
  //     withdraws: withdrawsList
  //   })
  // }, [depositsList, withdrawsList])

  //
  //
  // End of Test 01

  // Start of Test 02: Dynamic version
  //
  //

  //
  //
  // End of Test 02

  let active = 1
  let items = []
  for (let number = 1; number <= 10; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    )
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
            {/* {depositsList} */}
            {/* {withdrawsList} */}
            {/* {transactions} */}
            {transactions.deposits}
            {transactions.withdraws}
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
