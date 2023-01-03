import React, { useEffect, useState } from "react";
import CanvasJSReact from "../../lib/canvasjs.react";

const DashboardView = (props) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [options, setOptions] = useState({});

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

  useEffect(() => {
    if (props.userData) {
      if (props.userData.DepositTypes && props.userData.WithdrawTypes) {
        const option = {
          exportEnabled: true,
          theme: "light1",
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
        setOptions(option);
      }
    }
  }, [props.userData]);

  return (
    <>
      {props.userData ? (
        props.userData.DepositTypes && props.userData.WithdrawTypes ? (
          <CanvasJSChart className="chart" options={options} />
        ) : null
      ) : null}
    </>
  );
};

export default DashboardView;
