import React, { useState, useRef } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";

const FixedIncome = (props) => {
  const fixedIncome = useRef();
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
    if (fixedIncome.current.value) {
      let token = localStorage.getItem("jwt");
      axios
        .put(`http://localhost:3001/user/${props.userData.id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          props.getUserData();
        })
        .then(() => {
          alert("Fixed income has been changed.");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Fixed income cannot be empty.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel label="Fixed Income" className="mb-3">
        <Form.Control
          name="fixedIncome"
          type="number"
          placeholder="Fixed Income"
          onChange={handleChange}
          ref={fixedIncome}
          defaultValue={props.userData.fixedIncome}
        />
      </FloatingLabel>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default FixedIncome;
