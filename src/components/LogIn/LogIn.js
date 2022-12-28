import React, { useState } from "react";
import axios from "axios"
import './LogIn.css';
import { Button, Form, Container, Row} from 'react-bootstrap'

const LogIn = props => {

  const [logInData, setLogInData] = useState({})

  const handleChange = (e) => {
    setLogInData((prevState) => ({
      ...prevState,
      [e.target.type === "text" ? "username" : e.target.type]: e.target.value
    }))
  }
  
  const handleSubmit = e => {
    e.preventDefault()

    axios.post("http://localhost:3004/auth/login", logInData)
    .then(res => {
        console.log(res.data);
        let token = res.data
        localStorage.setItem("jwt", token)
    })

    console.log(logInData.username);
    console.log(logInData.password);
    console.log(logInData);
  }

  return (
    <Container>
      <Row>
        <h3>This is the log in page!</h3>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" onChange={handleChange} placeholder="Enter Username" />
            <Form.Text className="text-muted">
              This will be used as your profile name too.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={handleChange} placeholder="Enter Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" onChange={handleChange} label="Stay signed in for 30 days" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  )
}

export default LogIn