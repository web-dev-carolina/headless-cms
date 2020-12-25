import React, { useState, useContext } from "react";
import { Form, Container, Button, Row } from "react-bootstrap";
import "../styles/Login.css";
import Axios from "axios";
import UserContext from '../context/UserContext.js';
import {useHistory} from "react-router-dom";

const Home = () => {
    const history = useHistory();
    return (
        <Container className="home pt-3">
            <h3 className="text-center">Edit your site's contents.</h3>
            <Row>
                <Button variant="secondary" size="lg" onClick={(e)=> history.push('/dashboard')}>
                    Dashboard
                </Button>
            </Row>
        </Container>

    )
}

export default Home;