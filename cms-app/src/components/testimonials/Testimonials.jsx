import React, { useState, useContext, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import { Container, Button, Form, Modal } from "react-bootstrap";
import '../../styles/Testimonials.css';
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Testimonials = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [newText, setNewText] = useState(props.testimony.text);
    const [newAuthor, setNewAuthor] = useState(props.testimony.author);
    const history = useHistory();

    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleSaveEdit = () => {
        const url = process.env.REACT_APP_API_URL + '/testimonials/' + props.testimony._id;
        const editRes = Axios.put(url, {
            text: newText,
            author: newAuthor
        })
        setShowEdit(false);
    }

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleConfirmDelete = () => {
        const url = process.env.REACT_APP_API_URL + '/testimonials/' + props.testimony._id;
        const deleteRes = Axios.delete(url)
        setShowDelete(false);
    }

    return (
        <>
            <div className="col-md-4 pt-3" key={props.testimony._id}>
                <Card style={{ width: '25vw' }} border='secondary'>
                    <Card.Body>
                        <Card.Text>
                            {props.testimony.text}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{props.testimony.author}</Card.Subtitle>
                        <Container className="card-buttons">
                            {/* <a href="#" onClick={handleShowEdit} className="btn btn-outline-primary mr-2">Edit</a> */}
                            <Button onClick={handleShowEdit} variant="outline-primary" className="mr-2">Edit</Button>
                            <Button onClick={handleShowDelete} variant="outline-danger" className="ml-2">Delete</Button>
                        </Container>
                    </Card.Body>
                </Card>
            </div>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header className="border-0">
                    <Modal.Title>Edit testimonial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"

                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                value={newAuthor}
                                onChange={(e) => setNewAuthor(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header className="border-0">
                    <Modal.Title>Delete testimonial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this testimonial? <br></br>This action is irreversible.
                    <Card style={{ width: '25vw' }} border='secondary' className="mx-auto mt-3">
                        <Card.Body>
                            <Card.Text>
                                {props.testimony.text}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{props.testimony.author}</Card.Subtitle>

                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Testimonials;
