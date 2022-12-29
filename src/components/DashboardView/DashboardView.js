import React from "react"
import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
// import './DashboardView.css';
import { Container, Row } from 'react-bootstrap'

const DashboardView = props => {

  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      datasets: [
        {
          label: "Hours Studied in Geeksforgeeks",
          data: [2, 5, 6, 7, 3],
          backgroundColor: ["blue", "green", "yellow", "pink", "orange"],
        }
      ]
  }

  return (
    <Container>
      <Row id="dashboard-header-row">
        <h2>Dashboard View</h2>
      </Row>
      <Row id="pie-chart-row">
        <p>Pie chart goes here</p>
      </Row> 
      <MDBContainer>
        <Pie data={data} />
      </MDBContainer> 
    </Container>
  )
}

export default DashboardView