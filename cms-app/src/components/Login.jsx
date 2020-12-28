import React, { useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import "../styles/Login.css";
import Axios from "axios";
import UserContext from '../context/UserContext.js';
import { useHistory } from "react-router-dom";


export default function Login() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUserData } = useContext(UserContext);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const loginUser = { username, password };
        const loginRes = await Axios.post(process.env.REACT_APP_API_URL + "/users/login", loginUser);
        setUserData({
            token: loginRes.data.token,
            userInfo: loginRes.data.userInfo
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push('/projectselect');
    }

    return (
        <Container className="login pt-3 col-md-6">
            <h3 className="text-center">Sign in to use this app.</h3>
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
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Sign in
        </Button>
            </Form>
        </Container>
    );
}