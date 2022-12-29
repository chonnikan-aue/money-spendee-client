import React, { useState, useEffect } from "react"
import axios from "axios"
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const UpdateInfo = () => {
  const [budget, setBudget] = useState({
    income: '',
    expenses: '',
    saving: '',
    invest: '',
  });

  const [alert, setAlert] = useState(true);

  const handleChange = e => {
    const intValue = parseInt(e.target.value, 10);
    setBudget((prevState) => ({
      ...prevState,
      [e.target.name]: intValue
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(budget);
    axios.put('http://localhost:3001/deposit-type/1', budget)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const [depositTypeData, setDepositTypeData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/deposit-type/')
      .then(res => {
        setDepositTypeData(res.data);
        console.log(res.data)
      });
  }, []);

  return (
    <Container className="box">
      <Form onSubmit={handleSubmit}>
        <h2 className="header text-center mb-4">Update Budget Information</h2>
        <Row>
          <Col xs={12} md={6}>
            <h3 className="header mb-3">Fix Income</h3>
            <p className="mb-3">- this will be automatically added to transactions every 1st of each month -</p>
            <Form.Group controlId="formIncomeAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                name="income"
                placeholder="THB"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <h3 className="header mb-3">Budget</h3>
            <Form.Group controlId="formDailyExpenses">
              <Form.Label>Daily Expenses</Form.Label>
              <Form.Control
                type="text"
                name="expenses"
                placeholder="60%"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formSavings">
              <Form.Label>Savings</Form.Label>
              <Form.Control
                type="text"
                name="saving"
                placeholder="20%"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formInvestment">
              <Form.Label>Investment</Form.Label>
              <Form.Control
                type="text"
                name="invest"
                placeholder="20%"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group controlId="formAlertCheckbox">
              <Form.Check
                type="checkbox"
                name="alert"
                checked={alert}
                onChange={() => setAlert(!alert)}
                label="Alert me when I spend more than 90% of my budget limit"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
      <hr />
      <Form.Group controlId="formWithdrawFrom">
        <Form.Label>Withdraw From</Form.Label>
        <Form.Control
          as="select"
          name="withdrawFromId"
          onChange={handleChange}
        >
          <option disabled selected>Select Account</option>
          {
            depositTypeData.map((account, index) => (
              <option key={index} value={account.id}>{account.name}</option>
            ))
          }
        </Form.Control>
      </Form.Group>
      
    </Container>
  );
};

export default UpdateInfo;
