import React from "react";
import { Button, Form, FloatingLabel, Container, Row, Col} from 'react-bootstrap'

const EditTransaction = props => {

  const handleChange = (e) => {
    // setLogInData((prevState) => ({
    //   ...prevState,
    //   [e.target.type === "text" ? "username" : e.target.type]: e.target.value
    // }))
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <Container>
      <Row>
        <h3>Edit Transaction</h3>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="date">
              <FloatingLabel label="Date">
                <Form.Control type="date" onChange={handleChange} />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel label="Title">
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Title"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Type">
              <Form.Select id="type">
                <option disabled></option>
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
                  type="number"
                  onChange={handleChange}
                />
              </FloatingLabel>
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

export default EditTransaction