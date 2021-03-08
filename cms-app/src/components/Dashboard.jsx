import React, { useState, useContext } from "react";
import { Container, Button, Row, Breadcrumb } from "react-bootstrap";
import "../styles/Login.css";
import { useHistory, Link } from "react-router-dom";
import DbContext from '../context/DbContext.js';

const Dashboard = () => {
    const db = useContext(DbContext);
    const history = useHistory();
    function clickHandler(collection) {
        history.push('/' + collection.toString().toLowerCase());
    }
    const collectionsList = db.dbInfo.collections;

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/projectselect" }}>Projects</Breadcrumb.Item>
                <Breadcrumb.Item active>Collections</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <h1>Dashboard</h1>
                <h3 className="text-center">Select the collection you want to work on.</h3>
            </Container>
            <Container className="collections-list col-md-6 pt-3" id="collection-select">
                {collectionsList.filter((c) => c !== "")
                    .map(c =>
                        <Button className="mb-3" key={c} id={c} variant="secondary" size="lg" block onClick={(e) => clickHandler(e.target.firstChild.data)}>
                            {c}
                        </Button>
                    )}
            </Container>
        </>
    )
}

export default Dashboard;