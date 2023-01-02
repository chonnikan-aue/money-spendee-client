import React from "react";
import "./DashboardView.css";
import CanvasJSReact from "../../lib/canvasjs.react";

const DashboardView = (props) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const getDataPoints = () => {
    const depositTypesData = props.userData.DepositTypes.map((depositType) => {
      return { y: depositType.sumAmount, label: depositType.name };
    });
    const withdrawTypesData = props.userData.WithdrawTypes.map(
      (withdrawType) => {
        return { y: withdrawType.sumAmount, label: withdrawType.name };
      }
    );
    return depositTypesData.concat(withdrawTypesData);
  };

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}",
        dataPoints: getDataPoints(),
      },
    ],
  };

  return <CanvasJSChart options={options} />;
};

export default DashboardView;
