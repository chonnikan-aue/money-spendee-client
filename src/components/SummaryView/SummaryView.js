import React from "react";
import "./SummaryView.css";
import { Table } from "react-bootstrap";

const SummaryView = (props) => {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th colSpan={2}>
            Total:{" "}
            {props.userData.sumDepositAmount + props.userData.sumWithdrawAmount}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Balance: {props.userData.sumDepositAmount}</th>
          <td>
            {props.userData.DepositTypes
              ? props.userData.DepositTypes.map((depositType, index) => (
                  <>
                    {depositType.name}: {depositType.sumAmount}
                    <br />
                  </>
                ))
              : null}
          </td>
        </tr>
        <tr>
          <th>Expenses: {props.userData.sumWithdrawAmount}</th>
          <td>
            {props.userData.WithdrawTypes
              ? props.userData.WithdrawTypes.map((withdrawType, index) => (
                  <>
                    {withdrawType.name}: {withdrawType.sumAmount}
                    <br />
                  </>
                ))
              : null}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SummaryView;
