import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "../styles/Signup.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [projects, setProjects] = useState([]);

  function validateForm() {
    return username.length > 0 && password.length > 0 && passwordCheck.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

  }

  return (
    <Container className="signup pt-3">
      <h3 className="text-center">Sign up to create an account.</h3>
      <h5 className="text-center">This will automatically send a request for write permissions.</h5>
      <h5 className="text-center">You will be notified when your permissions are assigned.</h5>
      <Form onSubmit={handleSubmit} className="pt-3">
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="passwordCheck">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}