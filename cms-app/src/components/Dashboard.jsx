import React, { useState, useEffect } from "react";
import { Container, Button, Row, Breadcrumb } from "react-bootstrap";
import "../styles/Login.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const Dashboard = () => {
    const [collectionsList, setCollectionsList] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get('http://localhost:9000/info');
            setCollectionsList(result.data[0].collections);
        }
        fetchData();
    }, []);

    async function clickHandler(collection) {
        history.push('/' + collection.toString().toLowerCase());
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item href="/projectselect">Projects</Breadcrumb.Item>
                <Breadcrumb.Item active>Collections</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <h1>Dashboard</h1>
                <h3 className="text-center">Select the collection you want to work on.</h3>
            </Container>
            <Container className="collections-list col-md-6 pt-3" id="collection-select">
                {collectionsList.filter((c) => c !== "")
                    .map(c =>
                        <>
                            <Button id={c} variant="secondary" size="lg" block onClick={(e) => clickHandler(e.target.firstChild.data)}>
                                {c}
                            </Button>
                            <br></br>
                        </>
                    )}
            </Container>
        </>
    )
}

export default Dashboard;