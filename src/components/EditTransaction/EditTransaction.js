import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Button, Form, FloatingLabel, Container, Row } from "react-bootstrap";

const EditTransaction = (props) => {
  const type = useParams().type;
  const id = useParams().id;
  const amount = useRef();
  const withdrawType = useRef();
  const depositType = useRef();
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
  };

  useEffect(() => {}, []);

  return (
    <Container className="content">
      <Row className="header">Edit Transaction</Row>
      <Row className="mb-3">
        <Form onSubmit={handleSubmit}>
          {type === "deposit" ? (
            <>
              <FloatingLabel label="Name" className="mb-3">
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Amount" className="mb-3">
                <Form.Control
                  name="amount"
                  type="number"
                  min={0.01}
                  step="any"
                  placeholder="Amount"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Date" className="mb-3">
                <Form.Control
                  name="date"
                  type="date"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Deposit to Account" className="mb-3">
                <Form.Select name="typeId" onChange={handleChange} required>
                  <option value="">Select Account</option>
                  {props.userData.DepositTypes
                    ? props.userData.DepositTypes.map((account, index) => (
                        <option key={index} value={account.id}>
                          {account.name}
                        </option>
                      ))
                    : null}
                </Form.Select>
              </FloatingLabel>
            </>
          ) : (
            <>
              <FloatingLabel label="Name" className="mb-3">
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Amount" className="mb-3">
                <Form.Control
                  name="amount"
                  type="number"
                  min={0.01}
                  step="any"
                  placeholder="Amount"
                  onChange={handleChange}
                  ref={amount}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Date" className="mb-3">
                <Form.Control
                  name="date"
                  type="date"
                  onChange={handleChange}
                  required
                />
              </FloatingLabel>
              <FloatingLabel label="Withdraw Type" className="mb-3">
                <Form.Select
                  name="typeId"
                  onChange={handleChange}
                  ref={withdrawType}
                  required
                >
                  <option value="">Select Withdraw Type</option>
                  {props.userData.WithdrawTypes
                    ? props.userData.WithdrawTypes.map(
                        (withdrawType, index) => (
                          <option key={index} value={withdrawType.id}>
                            {withdrawType.name}
                          </option>
                        )
                      )
                    : null}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel label="Withdraw from Account" className="mb-3">
                <Form.Select
                  name="withdrawFromId"
                  onChange={handleChange}
                  ref={depositType}
                  required
                >
                  <option value="">Select Account</option>
                  {props.userData.DepositTypes
                    ? props.userData.DepositTypes.map((account, index) => (
                        <option key={index} value={account.id}>
                          {account.name}
                        </option>
                      ))
                    : null}
                </Form.Select>
              </FloatingLabel>
            </>
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default EditTransaction;
