import React from "react"
// import './DashboardView.css';
import { Container, Row } from 'react-bootstrap'

import CanvasJSReact from '../../lib/canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DashboardView = props => {

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Website Traffic Sources"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: [
        { y: 18, label: "Direct" },
        { y: 49, label: "Organic Search" },
        { y: 9, label: "Paid Search" },
        { y: 5, label: "Referral" },
        { y: 19, label: "Social" }
      ]
    }]
  }

  return (
    <Container>
      <Row id="dashboard-header-row">
        <h2>Dashboard View</h2>
      </Row>
      <Row id="pie-chart-row">
        <p>Pie chart goes here</p>
      </Row>
      <Row>
        {props.userData.Deposits}
      </Row>
      <Row>
        <CanvasJSChart options = {options}
			  	/* onRef={ref => this.chart = ref} */
			  />
        {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
      </Row>

    </Container>
  )
}

export default DashboardView