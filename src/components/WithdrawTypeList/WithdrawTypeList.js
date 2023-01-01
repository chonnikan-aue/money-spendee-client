import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import WithdrawType from "../WithdrawType/WithdrawType";

const WithdrawTypeList = (props) => {
  const [withdrawTypesDiv, setWithdrawTypesDiv] = useState();

  useEffect(() => {
    if (props.userData.WithdrawTypes) {
      if (props.userData.WithdrawTypes.length) {
        const withdrawTypes = props.userData.WithdrawTypes.map(
          (withdrawType, index) => {
            return (
              <WithdrawType
                key={index}
                userData={props.userData}
                getUserData={props.getUserData}
                withdrawType={withdrawType}
              />
            );
          }
        );
        setWithdrawTypesDiv(withdrawTypes);
      } else {
        setWithdrawTypesDiv(
          <Alert className="mb-0" variant="success">
            You don't have any withdraw type.
          </Alert>
        );
      }
    }
  }, [props.userData]);

  return <>{withdrawTypesDiv}</>;
};

export default WithdrawTypeList;
