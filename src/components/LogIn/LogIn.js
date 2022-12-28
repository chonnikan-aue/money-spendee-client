import React from "react";
import './LogIn.css';
import { Button, Form, Container, Row, Col} from 'react-bootstrap'

const LogIn = props => {
  return (
    <Container>
      <Row>
        <h3>This is the log in page!</h3>
      </Row>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter Username" />
            <Form.Text className="text-muted">
              This will be used as your profile name too.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Stay signed in for 30 days" />
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