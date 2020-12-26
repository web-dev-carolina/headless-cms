import React, { useState, useContext, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import { Container, Button } from "react-bootstrap";
import '../../styles/People.css';
import Modal from "react";

const People = (props) => {
    const handleShowEdit = () => (true);
    const handleShowDelete = () => (true);

    return (
        <>
            <div className="col-md-4 pt-3" key={props.people._id}>
                <Card style={{ width: '25vw' }} border='secondary'>
                    <Card.Body>
                        <Card.Title>{props.people.fname} {props.people.fname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.people.pos}</Card.Subtitle>
                        <Card.Text>
                            {props.people.bio}
                        </Card.Text>
                        <Container className="card-buttons">
                            <Button onClick={handleShowEdit} variant="outline-primary" className="mr-2">Edit</Button>
                            <Button onClick={handleShowDelete} variant="outline-danger" className="ml-2">Delete</Button>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default People;
