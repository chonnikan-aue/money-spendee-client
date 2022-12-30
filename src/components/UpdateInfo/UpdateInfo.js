import React, { useState, useEffect } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Label, Button, Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { InputGroup, FloatingLabel } from 'react-bootstrap';


const UpdateInfo = () => {
  // const [budget, setBudget] = useState({
  //   income: '',
  //   expenses: '',
  //   saving: '',
  //   invest: '',
  // });

  const [alert, setAlert] = useState(true);

  const handleChange1 = e => {
    setBudget((prevState) => ({
      ...prevState,
      [e.target.name]: parseInt(e.target.value, 10)
    })
    );
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   console.log(budget);
  //   axios.put('http://localhost:3001/deposit-type/1', budget)
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // };

  const [withdrawTypeData, setWithdrawTypeData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/withdraw-type/user/1')
      .then(res => {
        setWithdrawTypeData(res.data.WithdrawTypes);
        console.log(res.data.WithdrawTypes)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  const [newDepositType, setNewDepositType] = useState({
    name: "",
    userId: 1,
    budgetPercent: '',
    alertPercent: ''
  });
  
  const handleChange2 = e => {
    let value = e.target.value
    if (e.target.name === 'alertPercent' || e.target.name === 'budgetPercent') {
      value = parseInt(value, 10)
    }
    setNewDepositType((prevState) => ({
      ...prevState,
      [e.target.name]: value
    })
    );
  }
  
  const handleSubmit2 = e => {
    e.preventDefault();
    console.log(newDepositType);
    axios.post('http://localhost:3001/deposit-type', newDepositType)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };


  const [depositTypeData, setDepositTypeData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/deposit-type/user/1')
      .then(res => {
        setDepositTypeData(res.data.DepositTypes);
        console.log(res.data.DepositTypes)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  // return (
  //   <Container className="box">
  //     <Form onSubmit={handleSubmit}>
  //       <h2 className="header">Update Budget Information</h2>
  //       <Row>
  //         <Col xs={12} md={6}>
  //           <h3 className="header mb-3">Fix Income</h3>
  //           <p className="mb-3">- this will be automatically added to transactions every 1st of each month -</p>
  //           <Form.Group controlId="formIncomeAmount">
  //             <Form.Label >Amount</Form.Label>
  //             <Form.Control
  //               type="text"
  //               name="income"
  //               placeholder="THB"
  //               onChange={handleChange1}
  //             />
  //           </Form.Group>
  //         </Col>
  //         <Col xs={12} md={6}>
  //           <h3 className="header mb-3">Budget</h3>
  //           <Form.Group controlId="formDailyExpenses">
  //             <Form.Label>Daily Expenses</Form.Label>
  //             <Form.Control
  //               type="text"
  //               name="expenses"
  //               placeholder="60%"
  //               onChange={handleChange1}
  //             />
  //           </Form.Group>
  //           <Form.Group controlId="formSavings">
  //             <Form.Label>Savings</Form.Label>
  //             <Form.Control
  //               type="text"
  //               name="saving"
  //               placeholder="20%"
  //               onChange={handleChange1}
  //             />
  //           </Form.Group>
  //           <Form.Group controlId="formInvestment">
  //             <Form.Label>Investment</Form.Label>
  //             <Form.Control
  //               type="text"
  //               name="invest"
  //               placeholder="20%"
  //               onChange={handleChange1}
  //             />
  //           </Form.Group>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col xs={12}>
  //           <Form.Group controlId="formAlertCheckbox">
  //             <Form.Check
  //               type="checkbox"
  //               name="alert"
  //               checked={alert}
  //               onChange={() => setAlert(!alert)}
  //               label="Alert me when I spend more than 90% of my budget limit"
  //             />
  //           </Form.Group>
  //         </Col>
  //       </Row>
  //       <Button variant="primary" type="submit">
  //         Update
  //       </Button>
  //     </Form>
  //   </Container>
  // );

  return (
    <Container className="box">
      <h2 className="header">Update Budget Information</h2>

      <ListGroup>
        {
          withdrawTypeData.map(type => (
            <ListGroupItem key={type.id}>{type.name}</ListGroupItem>
          ))
        }
      </ListGroup>
      <ListGroup>
        {
          depositTypeData.map(type => (
            <ListGroupItem key={type.id}>{type.name}</ListGroupItem>
          ))
        }
      </ListGroup>
      <FormGroup>
        <FloatingLabel for="amount">Amount:</FloatingLabel>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter new deposit type"
            onChange={handleChange2}
          />
          <Form.Control
            type="text"
            name="alertPercent"
            placeholder="How much you want us to alert (In percent)"
            onChange={handleChange2}
          />
          <Form.Control
            type="text"
            name="budgetPercent"
            placeholder="How much you want to spend on this budget"
            onChange={handleChange2}
          />
        </InputGroup>
      </FormGroup>
      <Form onSubmit={handleSubmit2}>
        <Button color="primary" type="submit">Save</Button>
      </Form>
    </Container>
  );
};

export default UpdateInfo;
