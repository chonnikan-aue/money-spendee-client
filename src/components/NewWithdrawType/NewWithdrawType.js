import React, { useState, useRef } from "react";
import axios from "axios";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const NewWithdrawType = (props) => {
  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      userId: props.userData.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("jwt");
    axios
      .post(
        `http://localhost:3001/withdraw-type/user/${props.userData.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.name === "SequelizeUniqueConstraintError") {
          alert("This name is already taken. Please try another.");
        } else {
          props.getUserData();
          alert("New withdraw type has been added.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          min={1}
          max={100}
          placeholder="Budget (%)"
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <FloatingLabel label="Alert when exceed __% of budget" className="mb-3">
        <Form.Control
          name="alertPercent"
          type="number"
          min={1}
          max={100}
          placeholder="Alert when exceed __% of budget"
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default NewWithdrawType;
