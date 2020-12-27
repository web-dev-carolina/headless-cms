import React, { useState, useEffect } from "react";
import { Container, Button, Row } from "react-bootstrap";
import "../styles/Login.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [collectionsList, setCollectionsList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const result = await axios('http://localhost:9000/info');
            setCollectionsList(result.data[0].collections);
        }
        fetchData();
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
                {collectionsList.filter((c) => c !== "")
                    .map(c =>
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