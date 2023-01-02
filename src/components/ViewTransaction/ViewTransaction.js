import React from "react";
import { Container, Row, Accordion } from "react-bootstrap";
import TableView from "../TableView/TableView";
import DashboardView from "../DashboardView/DashboardView";
import SummaryView from "../SummaryView/SummaryView";

const ViewTransaction = (props) => {

  return (
    <Container>
      <Row className="header">View Transaction</Row>
      <Row className="mb-3">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Table View</Accordion.Header>
            <Accordion.Body>
              <TableView
                userData={props.userData}
                setUserData={props.setUserData} 
                transactions={props.transactions}
                setTransactions={props.setTransactions}
                getUserData={props.getUserData}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Dashboard View</Accordion.Header>
            <Accordion.Body>
              <DashboardView
                userData={props.userData}
                
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Summary View</Accordion.Header>
            <Accordion.Body>
              <p>To insert SummaryView</p>
              {/* <SummaryView
                transactions={props.transactions}
                setTransactions={props.setTransactions}
              /> */}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  )
};

export default ViewTransaction;
