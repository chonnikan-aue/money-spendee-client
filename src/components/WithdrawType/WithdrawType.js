import React, { useState, useRef } from "react";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import axios from "axios";

const WithdrawType = (props) => {
  const withdrawTypeName = useRef();
  const budgetPercent = useRef();
  const alertPercent = useRef();
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      userId: props.userData.id,
    }));
  };

  const editWithdrawType = (withdrawTypeId) => {
    if (
      withdrawTypeName.current.value &&
      budgetPercent.current.value &&
      alertPercent.current.value
    ) {
      let token = localStorage.getItem("jwt");
      axios
        .put(
          `http://localhost:3001/withdraw-type/${withdrawTypeId}/user/${props.userData.id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          props.getUserData();
        })
        .then(() => {
          alert("Withdraw type has been updated.");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Name, Budget, and Alert cannot be empty.");
    }
  };

  const deleteWithdrawType = (withdrawTypeId) => {
    let token = localStorage.getItem("jwt");
    axios
      .delete(`http://localhost:3001/withdraw-type/${withdrawTypeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        props.getUserData();
      })
      .then(() => {
        alert("Withdraw type has been deleted.");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {props.withdrawType ? (
        <>
          <p>{props.withdrawType.name}</p>
          <Form className="mb-3">
            <FloatingLabel label="Name" className="mb-3">
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                ref={withdrawTypeName}
                defaultValue={props.withdrawType.name}
              />
            </FloatingLabel>
            <FloatingLabel label="Budget (%)" className="mb-3">
              <Form.Control
                name="budgetPercent"
                type="number"
                placeholder="Budget (%)"
                onChange={handleChange}
                ref={budgetPercent}
                defaultValue={props.withdrawType.budgetPercent}
              />
            </FloatingLabel>
            <FloatingLabel
              label="Alert when exceed __% of budget"
              className="mb-3"
            >
              <Form.Control
                name="alertPercent"
                type="number"
                placeholder="Alert when exceed __% of budget"
                onChange={handleChange}
                ref={alertPercent}
                defaultValue={props.withdrawType.alertPercent}
              />
            </FloatingLabel>
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                editWithdrawType(props.withdrawType.id);
              }}
            >
              Save Changes
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => {
                deleteWithdrawType(props.withdrawType.id);
              }}
            >
              Delete
            </Button>
          </Form>
          <hr />
        </>
      ) : null}
    </>
  );
};

export default WithdrawType;
