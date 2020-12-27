import React, { useState, useContext, useEffect } from "react";
import { Form, Container, Button, Row } from "react-bootstrap";
import "../styles/Login.css";
import Axios from "axios";
import UserContext from '../context/UserContext.js';
import { useHistory } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
      const [info, setInfo] = useState([]);
      const history = useHistory();

      useEffect(async () => {
            const result = await axios('http://localhost:9000/info');
            if (result.data[0].collections.slice(-1) == "") setInfo(result.data[0].collections.slice(0, -1));
            setInfo(result.data[0].collections);
      }, []);

      async function clickHandler(collection) {
            history.push('/' + collection);
      }

      return (
            <Container className="collection-select pt-3" id="dashboard">
                  <Row>
                        <h1>Dashboard</h1>
                  </Row>
                  <h3 className="text-center">Select the collection you want to work on.</h3>
                  <div className="collections-list pt-3">
                        {info.map(c =>
                              <>
                                    <Button id={c} variant="secondary" size="lg" block onClick={(e) => clickHandler(e.target.firstChild.data)}>
                                          {c}
                                    </Button>
                                    <br></br>
                              </>
                        )}
                  </div>
            </Container>
      )
}

export default Dashboard;