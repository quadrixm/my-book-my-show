import React from 'react';
import {Navbar, Col, Container, Row, Nav, NavDropdown} from "react-bootstrap";
import {AUTH_USER_ID_KEY, AUTH_USER_NAME_KEY, BOOKINGS_PATH} from "../constants";

export type HomeLayoutProps = {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<HomeLayoutProps> = ({children}) => {

  const onLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem(AUTH_USER_ID_KEY);
      localStorage.removeItem(AUTH_USER_NAME_KEY);
      window.location.reload();
    }
  }

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">My Book My Show</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href={`#${BOOKINGS_PATH}`}>My Bookings</Nav.Link>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => onLogout()}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row>
        <Col>
          {children}
        </Col>
      </Row>
    </Container>
  );
}
