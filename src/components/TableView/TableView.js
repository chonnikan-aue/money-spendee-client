import React, { useState, useEffect } from "react"
import axios from "axios"
import editIcon from "../../images/edit.png"
import deleteIcon from "../../images/delete.png"
import "./TableView.css"
import { Container, Row, Col, Table, Pagination } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

const TableView = (props) => {

  const editTransaction = (type, id) => {

    props.setSelectedTransaction({
      id: id, // Either depositId or withdrawId
      type: type, // Either deposit or withdraw
      name: props.userData[type].filter(
        (transaction) => transaction.id === id
      ).name,
      amount: props.userData[type].filter(
        (transaction) => transaction.id === id
      ).amount,
      date: props.userData[type].filter(
        (transaction) => transaction.id === id
      ).date,
      typeId: props.userData[type].filter(
        (transaction) => transaction.id === id
      ).typeId,
      userId: props.userData[type].filter(
        (transaction) => transaction.id === id
      ).userId
    })
      
    return console.log(`Now editting transaction <type: ${type}, ${type}Id: ${id}>`)
  }  

  const deleteTransaction = (type, id) => {

    let token = localStorage.getItem("jwt");

    axios
      .delete(`http://localhost:3001/${type}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res.data)
        props.getUserData()
        alert("Transaction has been deleted.");
      })
      .catch((err) => {
        console.log(err)
      })
    return console.log(`delete transaction <type: ${type}, id: ${id}>`)
  }
  
  const findDepositType = (depositTypeId) => {
    let depositType = `${props.userData.DepositTypes.find(type => type.id === depositTypeId).name}`

    return depositType
  }

  const depositsList = props.userData.Deposits.map((deposit, index) => {

    let type = "deposit"
    
    return ( // Use react-bootstrap
      <tr key={index}>
        <th scope="row">{deposit.date}</th>
        <td>{deposit.name}</td>
        <td>{findDepositType(deposit.typeId)}</td>
        <td>{deposit.amount}</td>
        <td>
          <Col as={Link} to="/edit-transaction">
            <img
              src={editIcon}
              alt="Edit icon"
              href=""
              onClick={() => {
                editTransaction(type, deposit.id);
              }}
            ></img>
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

    // return ( // Use bootstrap-table
    //   <tr key={index} id={`tr-id-${index}`} className={`tr-class-${index}`}>
    //     <td id={`td-id-${index}`} className={`td-class-${index}`}>{deposit.date}</td>
    //     <td>{deposit.name}</td>
    //     <td>{deposit.typeId === 1 ? "Checkings" : "Savings"}</td>
    //     <td>{deposit.amount}</td>
    //     <td>
    //       <Col as={Link} to="/edit-transaction">
    //         <img
    //           src={editIcon}
    //           alt="Edit icon"
    //           href=""
    //           onClick={() => {
    //             editTransaction(type, deposit.id);
    //           }}
    //         ></img>
    //         {/* TO DO: Use React-icon */}
    //       </Col>
    //       <img
    //         src={deleteIcon}
    //         alt="Delete icon"
    //         href=""
    //         onClick={() => {
    //           deleteTransaction(type, deposit.id)
    //         }}
    //       ></img>
    //     </td>
    //   </tr>
    // )
  })

  const findWithdrawType = (withdrawTypeId) => {
    let withdrawType = `${props.userData.WithdrawTypes.find(type => type.id === withdrawTypeId).name}`

    return withdrawType
  }

  const withdrawsList = props.userData.Withdraws.map((withdraw, index) => {

    let type = "withdraw"

    return (
      <tr key={index}>
        <th scope="row">{withdraw.date}</th>
        <td>{withdraw.name}</td>
        <td>{findWithdrawType(withdraw.typeId)}</td>
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
            onClick={() => {
              deleteTransaction(type, withdraw.id)}
            }
          ></img>
        </td>
      </tr>
    )
  })

  useEffect(() => {
    if (props.userData) {
      props.setTransactions({
        deposits: depositsList,
        withdraws: withdrawsList
      })
    }
  }, [props.userData])

  let active = 1
  let items = []
  for (let number = 1; number <= 10; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    )
  }

  // return ( // Not using react-bootstrap
  //   <div>
  //     <script src="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.js"></script>
  //       <table 
  //         data-toggle="table"
  //         data-search="true"
  //         data-show-columns="true"
  //         >
  //         <thead>
  //           <tr className="tr-class-1">
  //             <th data-field="date" colspan="2" data-valign="middle">Date</th>
  //             <th data-field="title" colspan="2" data-valign="middle">Title</th>
  //             <th data-field="type" colspan="2" data-valign="middle">Type</th>
  //             <th data-field="amount" colspan="2" data-valign="middle">Amount</th>
  //             <th data-field="edit-delete" colspan="2" data-valign="middle">Edit/ Delete</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr>
  //            {depositsList}
  //            {withdrawsList}
  //           </tr>
  //         </tbody>
  //       </table>
  //   </div>
  // )

  return (
    <Container>
      <Row>
        <script src="https://unpkg.com/bootstrap-table@1.21.2/dist/bootstrap-table.min.js"></script>
        <table data-toggle="table" data-search="true" data-show-columns="true">
          <thead>
            <tr className="tr-class-1">
              <th data-field="date" colspan="2" data-valign="middle">
                Date
              </th>
              <th data-field="title" colspan="2" data-valign="middle">
                Title
              </th>
              <th data-field="type" colspan="2" data-valign="middle">
                Type
              </th>
              <th data-field="amount" colspan="2" data-valign="middle">
                Amount
              </th>
              <th data-field="edit-delete" colspan="2" data-valign="middle">
                Edit/ Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {depositsList}
              {withdrawsList}
            </tr>
          </tbody>
        </table>
      </Row>

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
        <Pagination text="dark">{items}</Pagination>
      </Row>
    </Container>
  )
}

export default TableView
