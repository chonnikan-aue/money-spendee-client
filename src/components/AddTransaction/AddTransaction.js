import React from "react";
import { Container, Row, Accordion } from "react-bootstrap";

const AddTransaction = (props) => {
  return (
    <Container className="content">
      <Row className="header">Add Transaction</Row>
      <Row className="mb-3">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Deposit Fixed Income</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Add Deposit</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Add Withdrawal</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
};

export default AddTransaction;
