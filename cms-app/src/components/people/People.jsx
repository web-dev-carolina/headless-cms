import React from 'react';
import Card from "react-bootstrap/Card";

const People = (props) => {
    return(
        <>
        <div class="col-md-4">
        <Card style={{ width: '25vw' }}>
            <Card.Body>
                <Card.Title>{props.people.fname} {props.people.lname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.people.pos}</Card.Subtitle>
                <Card.Text>
                    {props.people.bio}
                </Card.Text>
                <a href="#" class="btn btn-primary">Edit</a>
                <a href="#" class="btn btn-danger">Delete</a>
            </Card.Body>
        </Card>
        </div>
        </>
    )
}

export default People;
