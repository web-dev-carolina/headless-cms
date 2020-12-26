import React from 'react';
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import '../../styles/People.css'

const People = (props) => {
    return (
        <>
            <div class="col-md-4">
                <Card style={{ width: '25vw' }}>
                    <Card.Body>
                        <Card.Title>{props.people.fname} {props.people.lname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.people.pos}</Card.Subtitle>
                        <Card.Text>
                            {props.people.bio}
                        </Card.Text>
                        <Container className="card-buttons">
                            <a href="#" class="btn btn-outline-primary mr-2">Edit</a>
                            <a href="#" class="btn btn-outline-danger ml-2">Delete</a>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default People;
