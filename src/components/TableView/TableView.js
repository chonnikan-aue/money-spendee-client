import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TableView.css";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineSortAscending } from "react-icons/ai";
import { BsSortNumericDown } from "react-icons/bs";

const TableView = (props) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState(null);
  const [depositsList, setDepositsList] = useState();
  const [withdrawsList, setWithdrawsList] = useState();

  const sortBy = (column) => {
    setSortType(column);
  };

  const deleteTransaction = (type, id) => {
    let token = localStorage.getItem("jwt");

    axios
      .delete(`https://kind-ruby-hen-hem.cyclic.app/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        props.getUserData();
        alert("Transaction has been deleted.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findDepositType = (depositTypeId) => {
    let depositType = `${
      props.userData.DepositTypes.find((type) => type.id === depositTypeId).name
    }`;

    return depositType;
  };

  const findWithdrawType = (withdrawTypeId) => {
    let withdrawType = `${
      props.userData.WithdrawTypes.find((type) => type.id === withdrawTypeId)
        .name
    }`;
    return withdrawType;
  };

  useEffect(() => {
    if (props.userData) {
      props.setTransactions({
        deposits: depositsList,
        withdraws: withdrawsList,
      });
      if (props.userData.Deposits && props.userData.Withdraws) {
        const deposits = props.userData.Deposits.sort((a, b) => {
          if (sortType === "date") {
            return a.date > b.date ? 1 : -1;
          } else if (sortType === "name") {
            return a.name > b.name ? 1 : -1;
          } else if (sortType === "type") {
            return findDepositType(a.typeId) > findDepositType(b.typeId)
              ? 1
              : -1;
          } else if (sortType === "amount") {
            return a.amount > b.amount ? 1 : -1;
          } else {
            return 0;
          }
        }).map((deposit, index) => {
          let type = "deposit";
          let indexPlusOne = index + 1;
          return (
            <tr
              key={index}
              id={`tr-id-${indexPlusOne}`}
              className={`tr-class-${indexPlusOne} deposit`}
            >
              <td
                id={`td-id-${indexPlusOne}`}
                className={`td-class-${indexPlusOne}`}
              >
                {deposit.date}
              </td>
              <td>{deposit.name}</td>
              <td>{findDepositType(deposit.typeId)}</td>
              <td>{deposit.amount}</td>
              <td>
                <FiEdit
                  className="edit-btn"
                  onClick={() => {
                    navigate(`/edit-transaction/${type}/${deposit.id}`);
                  }}
                />
                <RiDeleteBinLine
                  className="delete-btn"
                  onClick={() => {
                    deleteTransaction(type, deposit.id);
                  }}
                />
              </td>
            </tr>
          );
        });
        setDepositsList(deposits);
        const withdraws = props.userData.Withdraws.sort((a, b) => {
          if (sortType === "date") {
            return a.date > b.date ? 1 : -1;
          } else if (sortType === "name") {
            return a.name > b.name ? 1 : -1;
          } else if (sortType === "type") {
            return findWithdrawType(a.typeId) > findWithdrawType(b.typeId)
              ? 1
              : -1;
          } else if (sortType === "amount") {
            return a.amount > b.amount ? 1 : -1;
          } else {
            return 0;
          }
        }).map((withdraw, index) => {
          let type = "withdraw";
          let indexPlusOne = index + 1;
          return (
            <tr
              key={index}
              id={`tr-id-${indexPlusOne}`}
              className={`tr-class-${indexPlusOne} withdraw`}
            >
              <td
                id={`td-id-${indexPlusOne}`}
                className={`td-class-${indexPlusOne}`}
              >
                {withdraw.date}
              </td>
              <td>{withdraw.name}</td>
              <td>{findWithdrawType(withdraw.typeId)}</td>
              <td>{withdraw.amount}</td>
              <td>
                <FiEdit
                  className="edit-btn"
                  onClick={() => {
                    navigate(`/edit-transaction/${type}/${withdraw.id}`);
                  }}
                />
                <RiDeleteBinLine
                  className="delete-btn"
                  onClick={() => {
                    deleteTransaction(type, withdraw.id);
                  }}
                />
              </td>
            </tr>
          );
        });
        setWithdrawsList(withdraws);
      }
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
          <tr>
            <th id={`th-id-date`}>
              Date
              <BsSortNumericDown
                className="sort-btn"
                onClick={() => sortBy("date")}
              />
            </th>
            <th id={`th-id-name`}>
              Name
              <AiOutlineSortAscending
                className="sort-btn"
                onClick={() => sortBy("name")}
              />
            </th>
            <th id={`th-id-type`}>
              Type
              <AiOutlineSortAscending
                className="sort-btn"
                onClick={() => sortBy("type")}
              />
            </th>
            <th id={`th-id-amount`}>
              Amount
              <BsSortNumericDown
                className="sort-btn"
                onClick={() => sortBy("amount")}
              />
            </th>
            <th></th>
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
