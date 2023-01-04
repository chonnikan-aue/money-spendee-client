import React from "react";
import "./SummaryView.css";
import { Table } from "react-bootstrap";

const SummaryView = (props) => {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th colSpan={2} className="summary-view">
            Total:{" "}
            {props.userData.sumDepositAmount + props.userData.sumWithdrawAmount}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th className="summary-view">
            Balance: {props.userData.sumDepositAmount}
          </th>
          <td className="summary-view">
            {props.userData.DepositTypes
              ? props.userData.DepositTypes.map((depositType, index) => (
                  <div key={index}>
                    {depositType.name}: {depositType.sumAmount}
                    <br />
                  </div>
                ))
              : null}
          </td>
        </tr>
        <tr>
          <th className="summary-view">
            Expenses: {props.userData.sumWithdrawAmount}
          </th>
          <td className="summary-view">
            {props.userData.WithdrawTypes
              ? props.userData.WithdrawTypes.map((withdrawType, index) => (
                  <div key={index}>
                    {withdrawType.name}: {withdrawType.sumAmount}
                    <br />
                  </div>
                ))
              : null}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SummaryView;
