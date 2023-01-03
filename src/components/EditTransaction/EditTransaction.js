import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Form, FloatingLabel, Container, Row, Col} from 'react-bootstrap'

const EditTransaction = props => {

  const [editedTransaction, setEditedTransaction] = useState()

  const handleChange = (e) => {
    // setEditedTransaction((prevState) => ({
    //   ...prevState,
    //   [e.target.type === "text" ? "username" : e.target.type]: e.target.value
    // }))
  };

  const handleSubmit = e => {
    e.preventDefault()
    
    let token = localStorage.getItem("jwt");

    axios
      .put(
        `http://localhost:3001/${props.selectedTransaction.type}/${props.selectedTransaction.id}/user/${props.userData.id}`,
        props.profileData, // BUG
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        props.getUserData();
      })
      .then(() => {
        alert("Transaction has been updated.");
      })
      .catch((err) => {
        console.error(err);
      });

    return console.log(props.selectedTransaction.date);
  };

  useEffect(() => {
    if (props.selectedTransaction) {
    }
  }, [props.selectedTransaction]);

  return (
    <Container className="content">
      <Row className="header">Edit Transaction</Row>
      <Row>
        <Col>         
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="date">
              <FloatingLabel label="Date">
                <Form.Control
                  required
                  type="date"
                  onChange={handleChange}
                  defaultValue={props.selectedTransaction.date}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel label="Title">
                <Form.Control
                  required
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Title"
                  defaultValue={props.selectedTransaction.name}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Type">
                <Form.Select id="type" required>
                  <option disabled value=""></option>
                  <option value="checkings">Checkings</option>
                  <option value="savings">Savings</option>
                  <option value="daily-expenses">Daily Expenses</option>
                  <option value="investment">Investment</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="amount">
              <FloatingLabel label="Amount">
                <Form.Control
                  required
                  type="number"
                  onChange={handleChange}
                  defaultValue={props.selectedTransaction.amount}
                  min={0.01}
                  step="any"
                />
              </FloatingLabel>
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTransaction;
