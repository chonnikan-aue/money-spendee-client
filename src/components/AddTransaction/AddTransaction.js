import './AddTransaction.css'
import React, { useEffect, useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const AddTransaction = (props) => {
  console.log(props.userData)

  const userId = props.userData.id
  const [data, setData] = useState({
    userId: userId
  })
  const [withdrawTypeData, setWithdrawTypeData] = useState([]);
  const [depositTypeData, setDepositTypeData] = useState([]);

  let token = localStorage.getItem("jwt");
  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/3`,
        props.profileData,
        {
          headers: { Authorization: `Bearer ${token}` },
        })
      .then(res => {
        console.log(res.data)
        setWithdrawTypeData(res.data.WithdrawTypes);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/user/3',
      props.profileData,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setDepositTypeData(res.data.DepositTypes);
      });
  }, []);

  const handleChange = e => {
    let value = e.target.value;
    if (e.target.name === 'amount') {
      value = parseInt(value, 10);
    }
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: value,
      userId: props.userData.id,
    }));
  }

  const handleSubmit = e => {
    e.preventDefault();

    console.log(data)
    let token = localStorage.getItem("jwt");
    axios.post("http://localhost:3001/withdraw/user/3", data,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (
    <Container className="content">
      <Form onSubmit={handleSubmit}>
        <h2 className="header text-center">Add your transactions here</h2>
        <FormGroup>
          <Label for="name">Title:</Label>
          <Input
            type="text"
            name="name"
            placeholder="What did you pay?"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="amount">Amount:</Label>
          <Input
            type="text"
            name="amount"
            placeholder="THB"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="typeId">Type:</Label>
          <Input
            type="select"
            name="typeId"
            onChange={handleChange}
          >
            <option disabled selected>Select Type</option>
            {
              withdrawTypeData.map((type, index) => (
                <option key={index} value={type.id}>{type.name}</option>
              ))
            }
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="withdrawFromId">Account:</Label>
          <Input
            type="select"
            name="withdrawFromId"
            onChange={handleChange}
          >
            <option disabled selected>Select Account</option>
            {
              depositTypeData.map((account, index) => (
                <option key={index} value={index}>{account.name}</option>
              ))
            }
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="date">Date:</Label>
          <Input
            type="date"
            name="date"
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">Save</Button>
      </Form>
    </Container>
  )
}

export default AddTransaction
