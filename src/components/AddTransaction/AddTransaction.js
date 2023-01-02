import React from "react";
import { Container, Row, Accordion } from "react-bootstrap";
import DepositFixedIncome from "../DepositFixedIncome/DepositFixedIncome";
import AddWithdrawTransaction from "../AddWithdrawTransaction/AddWithdrawTransaction";
import AddDepositTransaction from "../AddDepositTransaction/AddDepositTransaction";

const AddTransaction = (props) => {
  return (
    <Container className="content">
      <Row className="header">Add Transaction</Row>
      <Row className="mb-3">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Deposit Fixed Income</Accordion.Header>
            <Accordion.Body>
              <DepositFixedIncome
                userData={props.userData}
                getUserData={props.getUserData}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Add Deposit</Accordion.Header>
            <Accordion.Body>
              <AddDepositTransaction                 
                userData={props.userData}
                getUserData={props.getUserData}
              />
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Add Withdrawal</Accordion.Header>
            <Accordion.Body>
                <AddWithdrawTransaction                 
                userData={props.userData}
                getUserData={props.getUserData}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
};

export default AddTransaction;
