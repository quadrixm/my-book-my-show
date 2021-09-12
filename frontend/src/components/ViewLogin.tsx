import React from 'react';
import axios from 'axios';
import {AUTH_USER_ID_KEY, ROOT_PATH} from "../constants";
import {Redirect} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

export const ViewLogin = () => {
  const signedIn = localStorage.getItem(AUTH_USER_ID_KEY) && localStorage.getItem(AUTH_USER_ID_KEY)?.length;

  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const onSubmit = () => {
    if (!email || !email.length) {
      alert('Please enter email id');
      return;
    }
    if (!password || !password.length) {
      alert('Please enter password');
      return;
    }
    axios.post('login', {email, password}).then(
      ({data}) => {
        console.log({data})
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
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={() => onSubmit()}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
