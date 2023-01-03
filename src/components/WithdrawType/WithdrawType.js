import React, { useState, useRef } from "react";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import axios from "axios";

const WithdrawType = (props) => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      withdrawTypeId: props.withdrawType.id,
      userId: props.userData.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("jwt");
    axios
      .put(
        `http://localhost:3001/withdraw-type/${data.withdrawTypeId}/user/${props.userData.id}`,
        {
          name: data.name,
          budgetPercent: data.budgetPercent,
          alertPercent: data.alertPercent,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.name === "SequelizeUniqueConstraintError") {
          alert("This name is already taken. Please try another.");
        } else {
          props.getUserData();
          alert("Withdraw type has been updated.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {props.withdrawType ? (
        <>
          <h5>{props.withdrawType.name}</h5>
          <p className="mb-0">Budget = {props.withdrawType.budgetPercent}%</p>
          <p>Alert when exceed {props.withdrawType.alertPercent}% of budget</p>
          <Form className="mb-3" onSubmit={handleSubmit}>
            <FloatingLabel label="Name" className="mb-3">
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel label="Budget (%)" className="mb-3">
              <Form.Control
                name="budgetPercent"
                type="number"
                min={0.1}
                max={100}
                step="any"
                placeholder="Budget (%)"
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <FloatingLabel
              label="Alert when exceed __% of budget"
              className="mb-3"
            >
              <Form.Control
                name="alertPercent"
                type="number"
                min={0.1}
                max={100}
                step="any"
                placeholder="Alert when exceed __% of budget"
                onChange={handleChange}
                required
              />
            </FloatingLabel>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
          <hr />
        </>
      ) : null}
    </>
  );
};

export default WithdrawType;
