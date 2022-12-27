import React, { useState } from "react"
import axios from "axios"
import { Container, Row, Col } from 'react-bootstrap'

const SummaryView = props => {

  // TO DO: make it dynamic
  let totalValue = 85000
  let balanceValue = 70000
  let incomeValue = 20000
  let savingsValue = 50000
  let expensesValue = 15000
  let dailyExpensesValue = 5000
  let investmentValue = 10000

  return (
    <Container>
      <Row>
          <h2>SummaryView Component</h2>
      </Row>
      <Row>
        <p>Summary goes here</p>
      </Row>
      <Row>
        <Col>
          Total: {totalValue}
        </Col>
      </Row>
      <Row>
        <Col>
          Balance: {balanceValue}
        </Col>
        <Col>   
          <Row>
            Income: {incomeValue}
          </Row>
          <Row>
            Savings: {savingsValue}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          Espenses: {expensesValue}
        </Col>
        <Col>
          <Row>
            Daily Expenses: {dailyExpensesValue}
          </Row>
          <Row>
            Investment: {investmentValue}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default SummaryView