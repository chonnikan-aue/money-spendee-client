import React from "react";
import { Button, Form, Container, Row, Col} from 'react-bootstrap'

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
              <Form.Label>Date</Form.Label>
              <Col>
                <Form.Control type="date" onChange={handleChange} />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Title"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select>
                <option>Checkings</option>
                <option>Savings</option>
                <option>Daily Expenses</option>
                <option>Investment</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  onChange={handleChange}
                  placeholder="Enter Amount"
                />
              </Col>
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