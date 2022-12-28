import React from "react"
// import './DashboardView.css';
import { Container, Row } from 'react-bootstrap'

const DashboardView = props => {
  return (
    <Container>
      <Row id="dashboard-header-row">
        <h2>Dashboard View</h2>
      </Row>
      <Row id="pie-chart-row">
        <p>Pie chart goes here</p>
      </Row>
    </Container>
  )
}

export default DashboardView