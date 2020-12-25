import React, { useState, useContext, useEffect} from "react";
import { Form, Container, Button, Row } from "react-bootstrap";
import Axios from "axios";
import {useHistory} from "react-router-dom";
import PeopleContainer from './PeopleContainer.jsx';
const PeoplePage = () => {
    const history = useHistory();
    const [people, setPeople] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const result = await Axios.get("http://localhost:9000/people");
            const data = result.data;
            setPeople(data);
        }
        fetchData();
    }, []);

    return (
        <Container className="home pt-3">
            <h3 className="text-center">People Collection</h3>
            <PeopleContainer peoples={people} />
        </Container>

    )
}

export default PeoplePage;