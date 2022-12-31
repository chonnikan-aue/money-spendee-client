import React, { useState, useRef } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";

const NewWithdrawType = (props) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      withdrawTypeName.current.value &&
      budgetPercent.current.value &&
      alertPercent.current.value
    ) {
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
          props.getUserData();
        })
        .then(() => {
          alert("New withdraw type has been added.");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Name, Budget, and Alert cannot be empty.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel label="Name" className="mb-3">
        <Form.Control
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          ref={withdrawTypeName}
        />
      </FloatingLabel>
      <FloatingLabel label="Budget (%)" className="mb-3">
        <Form.Control
          name="budgetPercent"
          type="number"
          placeholder="Budget (%)"
          onChange={handleChange}
          ref={budgetPercent}
        />
      </FloatingLabel>
      <FloatingLabel label="Alert when exceed __% of budget" className="mb-3">
        <Form.Control
          name="alertPercent"
          type="number"
          placeholder="Alert when exceed __% of budget"
          onChange={handleChange}
          ref={alertPercent}
        />
      </FloatingLabel>
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default NewWithdrawType;
