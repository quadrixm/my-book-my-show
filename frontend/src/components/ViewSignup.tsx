import React from 'react';
import {AUTH_USER_ID_KEY, LOGIN_PATH, ROOT_PATH} from "../constants";
import {Link, Redirect} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

export const ViewSignup = () => {
  const signedIn = localStorage.getItem(AUTH_USER_ID_KEY) && localStorage.getItem(AUTH_USER_ID_KEY)?.length;

  const [name, setName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [confirmPassword, setConfirmPassword] = React.useState<string>();

  const onSubmit = () => {
    if (!name || !name.length) {
      alert('Please enter name');
      return;
    }
    if (!email || !email.length) {
      alert('Please enter email id');
      return;
    }
    if (!password || !password.length) {
      alert('Please enter password');
      return;
    }
    if (!confirmPassword || !confirmPassword.length || confirmPassword !== password) {
      alert('Password not confirmed');
      return;
    }

    axios.post('signup', {name, email, password}).then(
      ({data}) => {
        console.log({data})
        alert('Account created successfully. Please login now.')
      },
      (err) => alert((err?.response?.data?.message || 'Server error.')),
    );
  }

  if (signedIn) {
    return <Redirect to={ROOT_PATH} />;
  }
  return (
    <Container>
      <Row>
        <Col lg={{ span: 4, offset: 4 }}>
          <h1>Create a new for My Book My Show</h1>
          <br/>
          <br/>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Password"onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Password again</Form.Label>
              <Form.Control type="password" placeholder="Password"onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={() => onSubmit()}>
              Signup
            </Button>
            <br/>
            <br/>
            <Link to={{pathname: LOGIN_PATH}}>
              Login now!
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
