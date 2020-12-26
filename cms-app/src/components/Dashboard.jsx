import React, { useState, useContext, useEffect } from "react";
import { Form, Container, Button, Row } from "react-bootstrap";
import "../styles/Login.css";
import Axios from "axios";
import UserContext from '../context/UserContext.js';
import {useHistory} from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    // const [info, setInfo] = useState([]);
    // useEffect(async () => {
    //     const result = await axios('http://localhost:9000/info');
    //     setInfo(result.data);
    // }, []);
    const history = useHistory();
 
    return (
        <Container className="projectselect pt-3">
        <Row>
                <h1>Dashboard</h1>
            </Row>
        <h3 className="text-center">Select the collection you want to work on.</h3>
        <div className="projects-list pt-3">
              <Button variant="secondary" size="lg" block onClick={(e)=> history.push('/people')}>
                    People
              </Button>
              <Button variant="secondary" size="lg" block onClick={(e)=> history.push('/testimonials')}>
                    Testimonials
              </Button>
              <br></br>
        </div>
      </Container>
    )
}

export default Dashboard;