import React from "react";
import "./Header.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const Header = (props) => {
  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userData");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>MONey Spendee</Navbar.Brand>
        <Nav>
          <Navbar.Text>
            Signed in as: <a href="/update-info">{props.userData.username}</a>
          </Navbar.Text>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="float-right">
            <NavDropdown title="View Transaction" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/table-view">Table View</NavDropdown.Item>
              <NavDropdown.Item href="/dashboard-view">
                Dashboard View
              </NavDropdown.Item>
              <NavDropdown.Item href="/summary-view">
                Summary View
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/add-transaction">Add Transaction</Nav.Link>
            <Nav.Link href="/update-info">Update Personal Info</Nav.Link>
            <Nav.Link href="/" onClick={logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
