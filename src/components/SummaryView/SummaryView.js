import React from "react"
import './SummaryView.css';
import { Container, Row, Col } from 'react-bootstrap'

const SummaryView = props => {

  // BUG:
  // const sumIncome = props.transactions.deposits.reduce((sum, deposit) => {
  //   return sum + deposit.amount
  // }, 0)  
  // console.log(sumIncome);      
  
  // BUG:
  // const sumSavings = props.transactions.withdraws.reduce((sum, withdraw) => {
  //   return sum + withdraw.amount
  // }, 0)
  // console.log(sumSavings);    
  
  const sumDailyExpenses = props.transactions.withdraws
    .filter((withdraw) => withdraw.typeId === 1)
    .reduce((sum, withdraw) => {
      return sum + withdraw.amount
    }, 0)  
  // console.log(sumDailyExpenses);   

  // TO DO: make it dynamic
  let incomeValue = 20000
  // let incomeValue = sumIncome
  let savingsValue = 50000
  // let savingsValue = sumSavings
  let balanceValue = incomeValue + savingsValue
  // let dailyExpensesValue = 5000
  let dailyExpensesValue = sumDailyExpenses
  let investmentValue = 10000
  let expensesValue = dailyExpensesValue + investmentValue
  let totalValue = balanceValue + expensesValue

  return (
    <Container>
      <Row>
          <h2>Summary View</h2>
      </Row>
      <Row>
        <Col id="total-box">
          Total: {totalValue}
        </Col>
      </Row>
      <Row>
        <Col id="balance-box">
          Balance: {balanceValue}
        </Col>
        <Col id="income-savings-box">   
          <Row id="income-box">
            Income: {incomeValue}
          </Row>
          <Row id="savings-box">
            Savings: {savingsValue}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col id="expenses-box">
          Expenses: {expensesValue}
        </Col>
        <Col id="daily-expenses-investment-box">
          <Row id="daily-expenses-box">
            Daily Expenses: {dailyExpensesValue} 
          </Row>
          <Row id="investment-box">
            Investment: {investmentValue}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default SummaryView