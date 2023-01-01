import React from "react"
// import './DashboardView.css';
import { Container, Row } from 'react-bootstrap'

import CanvasJSReact from '../../lib/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DashboardView = props => {

  // props.userData...

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Allocated Budget in Percentages"
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
        { y: 10, label: "Checkings" },
        { y: 30, label: "Savings" },
        { y: 40, label: "Daily Expenses" },
        { y: 20, label: "Investment" },
      ]
    }]
  }

  return (
    <Container>
      <Row id="dashboard-header-row">
        <h2>Dashboard View</h2>
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