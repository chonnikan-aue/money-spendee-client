import React, { useState, useRef } from "react";
import axios from "axios";
import { Form, Button, FloatingLabel } from "react-bootstrap";

const NewDepositType = (props) => {
  const newDepositType = useRef();
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
    if (newDepositType.current.value) {
      let token = localStorage.getItem("jwt");
      axios
        .post(
          `http://localhost:3001/deposit-type/user/${props.userData.id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          props.getUserData();
        })
        .then(() => {
          alert("New deposit type has been added.");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("Name cannot be empty.");
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
          ref={newDepositType}
        />
      </FloatingLabel>
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
};

export default NewDepositType;
