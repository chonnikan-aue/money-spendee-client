import React from "react";
import "./SummaryView.css";
import { Table } from "react-bootstrap";

const SummaryView = (props) => {
  return (
    <Table striped bordered responsive>
      <thead>
        <tr>
          <th colSpan={2}>Total: 3000</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Balance: 2000</th>
          <td>
            Checkings: 1000
            <br />
            Savings: 1000
            <br />
          </td>
        </tr>
        <tr>
          <th>Expenses: 1000</th>
          <td>
            Shoppings: 500
            <br />
            Investment: 500
            <br />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SummaryView;
