import React from "react"
import './SummaryView.css';
import { Container, Row, Col } from 'react-bootstrap'

// TO DO: Dynamic code
const SummaryView = props => { 

  const sumCheckings = props.userData.Deposits
    .filter((deposit) => deposit.typeId === 1)
    .reduce((sum, deposit) => {
      return sum + deposit.amount
    }, 0)
  // console.log(sumCheckings)
  
  const sumSavings = props.userData.Deposits
    .filter((deposit) => deposit.typeId === 4)
    .reduce((sum, deposit) => {
      return sum + deposit.amount
    }, 0)
  // console.log(sumSavings)
  
  const sumDailyExpenses = props.userData.Withdraws
    .filter((withdraw) => withdraw.typeId === 1)
    .reduce((sum, withdraw) => {
      return sum + withdraw.amount
    }, 0)
  // console.log(sumDailyExpenses);  
  
  const sumInvestment = props.userData.Withdraws
    .filter((withdraw) => withdraw.typeId === 2)
    .reduce((sum, withdraw) => {
      return sum + withdraw.amount
    }, 0)  
  // console.log(sumDailyExpenses);  

  // TO DO: make the `<types>Value` dynamic
  let checkingsValue = sumCheckings
  let savingsValue = sumSavings
  let balanceValue = checkingsValue + savingsValue
  let dailyExpensesValue = sumDailyExpenses
  let investmentValue = sumInvestment
  let expensesValue = dailyExpensesValue + investmentValue
  let totalValue = balanceValue + expensesValue

  props.setSummary({
    checkingsValue: checkingsValue,
    savingsValue: savingsValue,
    dailyExpensesValue: dailyExpensesValue,
    investmentValue: investmentValue,
    totalValue: totalValue
  })

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
        <Col id="checkings-savings-box">   
          <Row id="checkings-box">
            Checkings: {checkingsValue}
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