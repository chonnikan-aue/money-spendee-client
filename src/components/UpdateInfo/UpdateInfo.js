import React from "react";
import { Container, Row, Accordion } from "react-bootstrap";
import EditProfile from "../EditProfile/EditProfile";
import FixedIncome from "../FixedIncome/FixedIncome";
import NewDepositType from "../NewDepositType/NewDepositType";
import NewWithdrawType from "../NewWithdrawType/NewWithdrawType";
import WithdrawTypeList from "../WithdrawTypeList/WithdrawTypeList";

const UpdateInfo = (props) => {
  return (
    <Container className="content">
      <Row className="header">Update Personal Info</Row>
      <Row className="mb-3">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Edit Profile</Accordion.Header>
            <Accordion.Body>
              <EditProfile
                userData={props.userData}
                profileData={props.profileData}
                setProfileData={props.setProfileData}
                getUserData={props.getUserData}
                handleProfileChange={props.handleProfileChange}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Edit Fixed Income</Accordion.Header>
            <Accordion.Body>
              <FixedIncome
                userData={props.userData}
                getUserData={props.getUserData}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Add Account</Accordion.Header>
            <Accordion.Body>
              <NewDepositType
                userData={props.userData}
                getUserData={props.getUserData}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Add Withdraw Type</Accordion.Header>
            <Accordion.Body>
              <NewWithdrawType
                userData={props.userData}
                getUserData={props.getUserData}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Edit Withdraw Type & Budget</Accordion.Header>
            <Accordion.Body>
              <WithdrawTypeList
                userData={props.userData}
                getUserData={props.getUserData}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </Container>
  );
};

export default UpdateInfo;
