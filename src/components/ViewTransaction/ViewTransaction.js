import React from "react";
import { Container, Row, Accordion } from "react-bootstrap";
import TableView from "../TableView/TableView";

const ViewTransaction = (props) => {

  return (
    <Container>
      <Row className="header">Update Personal Info</Row>
      <Row className="mb-3">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Table View</Accordion.Header>
            <Accordion.Body>
              <TableView
                userData={props.userData}
                
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Dashboard View</Accordion.Header>
            <Accordion.Body>
              <TableView
                userData={props.userData}
                
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  )
};

export default ViewTransaction;
