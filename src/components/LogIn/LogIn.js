import React, { useState } from "react";
import axios from "axios"
import './LogIn.css';
import { Button, Form, Container, Row, Col} from 'react-bootstrap'

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

    // // Version 1
    // axios.post("http://localhost:3004/auth/login", logInData)
    // .then(res => {
    //     console.log(res.data);
    //     let token = res.data
    //     localStorage.setItem("jwt", token)
    // })

    // console.log(logInData.username);
    // console.log(logInData.password);
    // console.log(logInData);

    // Version 2
    axios.get("http://localhost:3004/auth/", logInData)
    .then(res => {
        // console.log(res.data);
        // let token = res.data
        // localStorage.setItem("jwt", token)
    })
  }

  return (
    <Container>
      <Row>
        <h3>This is the log in page!</h3>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Col>
                <Form.Control type="text" onChange={handleChange} placeholder="Enter Username" />
              </Col>
              <Form.Text className="text-muted">
                This will be used as your profile name too.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Col>
                <Form.Control type="password" onChange={handleChange} placeholder="Enter Password" />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" onChange={handleChange} label="Stay signed in for 30 days" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LogIn