import React, { useState, useContext } from "react";
import UserContext from '../context/UserContext.js';
import { Form, Container, Button } from "react-bootstrap";
import "../styles/Signup.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { setUserData } = useContext(UserContext);

  function validateForm() {
    return username.length > 0 && password.length > 0 && passwordCheck.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const signupUser = { username, password, passwordCheck };
    await Axios.post(process.env.REACT_APP_API_URL+"/users/signup", signupUser);
    const loginUser = { username, password };
    const loginRes = await Axios.post(process.env.REACT_APP_API_URL+"/users/login", loginUser);
    setUserData({
      token: loginRes.data.token,
      userInfo: loginRes.data.userInfo
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    history.push('/projectselect');
  }

  return (
    <Container className="signup pt-3">
      <h3 className="text-center">Create an account to manage your site.</h3>
      <h5 className="text-center">Signing up will automatically send a request for write permissions. You will be notified when your permissions are assigned. </h5>
      <Form onSubmit={handleSubmit} className="pt-3">
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            placeholder="johnny_appleseed"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="•••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="passwordCheck">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            value={passwordCheck}
            placeholder="•••••••••••"
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