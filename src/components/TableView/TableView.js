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

    let indexPlusOne = index + 1

    return (
      <tr key={index} id={`tr-id-${indexPlusOne}`} className={`tr-class-${indexPlusOne} deposit`}>
        <td id={`td-id-${indexPlusOne}`} className={`td-class-${indexPlusOne}`}>{deposit.date}</td>
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
  })

  const findWithdrawType = (withdrawTypeId) => {
    let withdrawType = `${props.userData.WithdrawTypes.find(type => type.id === withdrawTypeId).name}`

    return withdrawType
  }

  const withdrawsList = props.userData.Withdraws.map((withdraw, index) => {

    let type = "withdraw"

    let indexPlusOne = index + 1

    return (
      <tr key={index} id={`tr-id-${indexPlusOne}`} className={`tr-class-${indexPlusOne} withdraw`}>
        <td id={`td-id-${indexPlusOne}`} className={`td-class-${indexPlusOne}`}>{withdraw.date}</td>
        <td>{withdraw.name}</td>
        <td>{findWithdrawType(withdraw.typeId)}</td>
        <td>{withdraw.amount}</td>
        <td>
          <Col as={Link} to="/edit-transaction">
            <img
              src={editIcon}
              alt="Edit icon"
              href=""
              onClick={() => {
                editTransaction(type, withdraw.id);
              }}
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

  return (
    <div id="table-div">
      <table
        id="table"
        data-toggle="table"
        data-search="true"
        data-show-columns="true"
        data-pagination="true"
      >
        <thead>
          <tr className="tr-class-1">
            <th
              data-sortable="true"
              data-field="date"
              colspan="1"
              data-valign="middle"
              data-halign="center" 
              data-align="center"
            >
              Date
            </th>
            <th
              data-sortable="true"
              data-field="title"
              colspan="1"
              data-valign="middle"
              data-halign="center" 
              data-align="center"
            >
              Title
            </th>
            <th
              data-sortable="true"
              data-field="type"
              colspan="1"
              data-valign="middle"
              data-halign="center" 
              data-align="center"
            >
              Type
            </th>
            <th
              data-sortable="true"
              data-field="amount"
              colspan="1"
              data-valign="middle"
              data-halign="center" 
              data-align="center"
            >
              Amount
            </th>
            <th
              data-field="edit-delete"
              data-sortable="true"
              colspan="1"
              data-valign="middle"
              data-halign="center" 
              data-align="center"
            >
              Edit/ Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {depositsList}
          {withdrawsList}
        </tbody>
      </table>
    </div>
  )
}

export default TableView
