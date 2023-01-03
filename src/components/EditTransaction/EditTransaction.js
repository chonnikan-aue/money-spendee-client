import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import {
  Button,
  Form,
  FloatingLabel,
  Container,
  Row,
  Alert,
} from "react-bootstrap";

const EditTransaction = (props) => {
  const navigate = useNavigate();
  const type = useParams().type;
  const id = useParams().id;
  const amountRef = useRef();
  const withdrawTypeRef = useRef();
  const depositTypeRef = useRef();
  const [data, setData] = useState({});
  const [initData, setInitData] = useState([]);

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      userId: props.userData.id,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("jwt");
    axios
      .put(
        `http://localhost:3001/${type}/${id}/user/${props.userData.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        props.getUserData();
        alert("Transaction has been updated.");
        navigate("/view-transaction");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    props.setShow(false);
  }, []);

  useEffect(() => {
    if (props.userData) {
      if (props.userData.Withdraws && props.userData.Deposits) {
        if (type === "withdraw") {
          const withdrawSelected = props.userData.Withdraws.filter(
            (withdraw) => {
              return withdraw.id == id;
            }
          );
          setInitData(withdrawSelected);
        } else if (type === "deposit") {
          const depositSelected = props.userData.Deposits.filter((deposit) => {
            return deposit.id == id;
          });
          setInitData(depositSelected);
        }
      }
    }
  }, [props.userData]);

  useEffect(() => {
    if (initData.length !== 0) {
      if (type === "withdraw") {
        setData((prevState) => ({
          ...prevState,
          name: initData[0].name,
          amount: initData[0].amount,
          date: initData[0].date,
          typeId: initData[0].typeId,
          withdrawFromId: initData[0].withdrawFromId,
          userId: props.userData.id,
        }));
      } else if (type === "deposit") {
        setData((prevState) => ({
          ...prevState,
          name: initData[0].name,
          amount: initData[0].amount,
          date: initData[0].date,
          typeId: initData[0].typeId,
          userId: props.userData.id,
        }));
      }
    }
  }, [initData]);

  useEffect(() => {
    if (JSON.stringify(data) !== "{}") {
      if (
        type === "withdraw" &&
        amountRef.current.value &&
        withdrawTypeRef.current.value &&
        depositTypeRef.current.value
      ) {
        props.alertBudget(
          depositTypeRef.current.value,
          withdrawTypeRef.current.value,
          amountRef.current.value
        );
      }
    }
  }, [data]);

  return (
    <Container className="content">
      <Row className="header">Edit Transaction</Row>
      <Row className="mb-3">
        <Form onSubmit={handleSubmit}>
          {initData.length !== 0 ? (
            type === "deposit" ? (
              <>
                <FloatingLabel label="Name" className="mb-3">
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    defaultValue={initData[0].name}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel label="Amount" className="mb-3">
                  <Form.Control
                    name="amount"
                    type="number"
                    min={0.01}
                    step="any"
                    placeholder="Amount"
                    onChange={handleChange}
                    defaultValue={initData[0].amount}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel label="Date" className="mb-3">
                  <Form.Control
                    name="date"
                    type="date"
                    onChange={handleChange}
                    defaultValue={initData[0].date}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel label="Deposit to Account" className="mb-3">
                  <Form.Select
                    name="typeId"
                    onChange={handleChange}
                    defaultValue={initData[0].typeId}
                    required
                  >
                    <option value="">Select Account</option>
                    {props.userData.DepositTypes
                      ? props.userData.DepositTypes.map((account, index) => (
                          <option key={index} value={account.id}>
                            {account.name}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                </FloatingLabel>
              </>
            ) : (
              <>
                {props.show && (
                  <Alert variant="warning">
                    Your transaction is about to over the budget limit.
                  </Alert>
                )}
                <FloatingLabel label="Name" className="mb-3">
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    defaultValue={initData[0].name}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel label="Amount" className="mb-3">
                  <Form.Control
                    name="amount"
                    type="number"
                    min={0.01}
                    step="any"
                    placeholder="Amount"
                    onChange={handleChange}
                    ref={amountRef}
                    defaultValue={initData[0].amount}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel label="Date" className="mb-3">
                  <Form.Control
                    name="date"
                    type="date"
                    onChange={handleChange}
                    defaultValue={initData[0].date}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel label="Withdraw Type" className="mb-3">
                  <Form.Select
                    name="typeId"
                    onChange={handleChange}
                    ref={withdrawTypeRef}
                    defaultValue={initData[0].typeId}
                    required
                  >
                    <option value="">Select Withdraw Type</option>
                    {props.userData.WithdrawTypes
                      ? props.userData.WithdrawTypes.map(
                          (withdrawType, index) => (
                            <option key={index} value={withdrawType.id}>
                              {withdrawType.name}
                            </option>
                          )
                        )
                      : null}
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel label="Withdraw from Account" className="mb-3">
                  <Form.Select
                    name="withdrawFromId"
                    onChange={handleChange}
                    ref={depositTypeRef}
                    defaultValue={initData[0].withdrawFromId}
                    required
                  >
                    <option value="">Select Account</option>
                    {props.userData.DepositTypes
                      ? props.userData.DepositTypes.map((account, index) => (
                          <option key={index} value={account.id}>
                            {account.name}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                </FloatingLabel>
              </>
            )
          ) : null}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default EditTransaction;
