import React, { useState, useEffect } from "react";
import axios from "axios";
import deleteIcon from "../../images/delete.png";
import "./TableView.css";
import { Container, Row, Col, Table, Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const TableView = (props) => {
  const navigate = useNavigate();

  const deleteTransaction = (type, id) => {
    let token = localStorage.getItem("jwt");

    axios
      .delete(`http://localhost:3001/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        props.getUserData();
        alert("Transaction has been deleted.");
      })
      .catch((err) => {
        console.log(err);
      });
    return console.log(`delete transaction <type: ${type}, id: ${id}>`);
  };

  const findDepositType = (depositTypeId) => {
    let depositType = `${
      props.userData.DepositTypes.find((type) => type.id === depositTypeId).name
    }`;

    return depositType;
  };

  const depositsList = props.userData.Deposits.map((deposit, index) => {
    let type = "deposit";

    return (
      <tr key={index} id={`tr-id-${index}`} className={`tr-class-${index}`}>
        <td id={`td-id-${index}`} className={`td-class-${index}`}>
          {deposit.date}
        </td>
        <td>{deposit.name}</td>
        <td>{findDepositType(deposit.typeId)}</td>
        <td>{deposit.amount}</td>
        <td>
          <FiEdit
            onClick={() => {
              navigate(`/edit-transaction/${type}/${deposit.id}`);
            }}
          />
          <img
            src={deleteIcon}
            alt="Delete icon"
            href=""
            onClick={() => {
              deleteTransaction(type, deposit.id);
            }}
          ></img>
        </td>
      </tr>
    );
  });

  const findWithdrawType = (withdrawTypeId) => {
    let withdrawType = `${
      props.userData.WithdrawTypes.find((type) => type.id === withdrawTypeId)
        .name
    }`;

    return withdrawType;
  };

  const withdrawsList = props.userData.Withdraws.map((withdraw, index) => {
    let type = "withdraw";

    return (
      <tr key={index} id={`tr-id-${index}`} className={`tr-class-${index}`}>
        <td id={`td-id-${index}`} className={`td-class-${index}`}>
          {withdraw.date}
        </td>
        <td>{withdraw.name}</td>
        <td>{findWithdrawType(withdraw.typeId)}</td>
        <td>{withdraw.amount}</td>
        <td>
          <FiEdit
            onClick={() => {
              navigate(`/edit-transaction/${type}/${withdraw.id}`);
            }}
          />
          <img
            src={deleteIcon}
            alt="Delete icon"
            href=""
            onClick={() => {
              deleteTransaction(type, withdraw.id);
            }}
          ></img>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    if (props.userData) {
      props.setTransactions({
        deposits: depositsList,
        withdraws: withdrawsList,
      });
    }
  }, [props.userData]);

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
    <div id="table-div">
      <table
        id="table"
        data-toggle="table"
        data-search="true"
        data-show-columns="true"
      >
        <thead>
          <tr className="tr-class-1">
            <th
              data-field="date"
              data-sortable="true"
              colspan="1"
              data-valign="middle"
            >
              Date
            </th>
            <th
              data-field="title"
              data-sortable="true"
              colspan="1"
              data-valign="middle"
            >
              Title
            </th>
            <th
              data-field="type"
              data-sortable="true"
              colspan="1"
              data-valign="middle"
            >
              Type
            </th>
            <th
              data-field="amount"
              data-sortable="true"
              colspan="1"
              data-valign="middle"
            >
              Amount
            </th>
            <th
              data-field="edit-delete"
              data-sortable="true"
              colspan="1"
              data-valign="middle"
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
  );
};

export default TableView;
