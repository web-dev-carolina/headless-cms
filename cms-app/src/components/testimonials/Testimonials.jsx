import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import { Container, Button, Form, Modal } from "react-bootstrap";
import '../../styles/Testimonials.css';
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Testimonials = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editText, setEditText] = useState(props.testimony.text);
    const [editAuthor, setEditAuthor] = useState(props.testimony.author);
    const history = useHistory();

    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleSaveEdit = async () => {
        const url = process.env.REACT_APP_API_URL + '/testimonials/' + props.testimony._id;
        await Axios.put(url, {
            text: editText,
            author: editAuthor
        })
        setShowEdit(false);
        history.replace('/dashboard');
        history.replace('/testimonials');
    }

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleConfirmDelete = async () => {
        const url = process.env.REACT_APP_API_URL + '/testimonials/' + props.testimony._id;
        await Axios.delete(url)
        setShowDelete(false);
        history.replace('/dashboard');
        history.replace('/testimonials');
    }

    return (
        <>
            <div className="col-md-4 pt-3" >
                <Card style={{ width: '25vw' }} border='secondary'>
                    <Card.Body>
                        <Card.Text>
                            {props.testimony.text}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{props.testimony.author}</Card.Subtitle>
                        <Container className="card-buttons">
                            <Button onClick={handleShowEdit} variant="outline-primary" className="mr-2">Edit</Button>
                            <Button onClick={handleShowDelete} variant="outline-danger" className="ml-2">Delete</Button>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
            <Modal className="edit-testimonial-modal" show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header className="border-0">
                    <Modal.Title>Edit testimonial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                autoFocus
                                as="textarea"
                                rows={3}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                value={editAuthor}
                                onChange={(e) => setEditAuthor(e.target.value)}
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
            <Modal className="delete-testimonial-modal" show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header className="border-0">
                    <Modal.Title>Delete testimonial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this testimonial?
                    <Card style={{ width: '25vw' }} border='secondary' className="mx-auto my-3">
                        <Card.Body>
                            <Card.Text>
                                {props.testimony.text}
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{props.testimony.author}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                    <strong>This action is irreversible.</strong>
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
