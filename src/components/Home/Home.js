import React from "react";
import axios from "axios";
import "./Home.css";
import { Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.id === "login") {
      axios
        .get("https://kind-ruby-hen-hem.cyclic.app/auth", { params: props.profileData })
        .then((res) => {
          let token = res.data;
          localStorage.setItem("jwt", token);
          props.getUserData();
          navigate("/view-transaction");
        })
        .catch((err) => {
          console.log(err);
          alert("Please try again. Username or Password is incorrect.");
        });
    } else if (e.nativeEvent.submitter.id === "signup") {
      axios
        .post("https://kind-ruby-hen-hem.cyclic.app/auth", props.profileData)
        .then((res) => {
          if (res.data.name === "SequelizeUniqueConstraintError") {
            alert("This username is already taken. Please try another.");
          } else {
            let token = res.data;
            localStorage.setItem("jwt", token);
            props.getUserData();
            navigate("/update-info");
          }
        });
    }
  };

  return (
    <Row className="home">
      <Col sm>
        <Col className="title">MONey Spendee</Col>
        <Col className="sub-title">
          MONey Spendee helps you track spending and follow your budget.
        </Col>
        <br />
      </Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel label="Username" className="mb-3">
            <Form.Control
              id="username"
              type="text"
              placeholder="Username"
              onChange={props.handleProfileChange}
            />
          </FloatingLabel>
          <FloatingLabel label="Password">
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              onChange={props.handleProfileChange}
            />
          </FloatingLabel>
          <Button
            id="login"
            className="login-btn"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          &emsp;or&emsp;
          <Button id="signup" variant="primary" type="submit">
            Signup
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Home;
