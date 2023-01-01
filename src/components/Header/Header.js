import React from "react";
import "./Header.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = (props) => {
  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userData");
    localStorage.removeItem("profileData");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>MONey Spendee</Navbar.Brand>
        <Nav>
          <Navbar.Text>
            Signed in as:{" "}
            <Link to="/update-info">{props.userData.username}</Link>
          </Navbar.Text>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavDropdown title="View Transaction" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/table-view" className="dropdown-link">
                  Table View
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/dashboard-view" className="dropdown-link">
                  Dashboard View
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/summary-view" className="dropdown-link">
                  Summary View
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Link to="/add-transaction" className="normal-link">
                Add Transaction
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/update-info" className="normal-link">
                Update Personal Info
              </Link>
            </Nav.Item>
            <Nav.Item onClick={logout}>
              <Link to="/" className="normal-link">
                Logout
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
