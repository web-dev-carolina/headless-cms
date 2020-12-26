import React from 'react';
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import '../../styles/Testimonials.css';

const Testimonials = (props) => {
    return (
        <>
            <div class="col-md-4">
                <Card style={{ width: '25vw' }}>
                    <Card.Body>
                        <Card.Text>
                            {props.testimony.text}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{props.testimony.author}</Card.Subtitle>
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

export default Testimonials;
