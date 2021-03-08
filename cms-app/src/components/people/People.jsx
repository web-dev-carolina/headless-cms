import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import { Container, Button, Form, Modal, Row, Col } from "react-bootstrap";
import '../../styles/People.css';
import Axios from "axios";
import { useHistory } from "react-router-dom";

const People = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editFname, setEditFname] = useState(props.person.fname);
    const [editLname, setEditLname] = useState(props.person.lname);
    const [editPos, setEditPos] = useState(props.person.pos);
    const [editBio, setEditBio] = useState(props.person.bio);
    const history = useHistory();

    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleSaveEdit = async () => {
        const url = process.env.REACT_APP_API_URL + '/people/' + props.person._id;
        await Axios.put(url, {
            fname: editFname,
            lname: editLname,
            pos: editPos,
            bio: editBio
        })
        setShowEdit(false);
        history.replace('/dashboard');
        history.replace('/people');
    }

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleConfirmDelete = async () => {
        const url = process.env.REACT_APP_API_URL + '/people/' + props.person._id;
        await Axios.delete(url)
        setShowDelete(false);
        history.replace('/dashboard');
        history.replace('/people');
    }

    return (
        <>
            <div className="col-md-4 pt-3">
                <Card style={{ width: '25vw' }} border='secondary'>
                    <Card.Body>
                        <Card.Title>{props.person.fname} {props.person.lname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.person.pos}</Card.Subtitle>
                        <Card.Text>
                            {props.person.bio}
                        </Card.Text>
                        <Container className="card-buttons">
                            <Button onClick={handleShowEdit} variant="outline-primary" className="mr-2">Edit</Button>
                            <Button onClick={handleShowDelete} variant="outline-danger" className="ml-2">Remove</Button>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
            <Modal className="edit-person-modal" show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header className="border-0">
                    <Modal.Title>Edit organization member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Row>
                            <Col>
                                <Form.Group size="lg" controlId="fname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        type="text"
                                        value={editFname}
                                        onChange={(e) => setEditFname(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group size="lg" controlId="lname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editLname}
                                        onChange={(e) => setEditLname(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group size="lg" controlId="pos">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                value={editPos}
                                onChange={(e) => setEditPos(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editBio}
                                onChange={(e) => setEditBio(e.target.value)}
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
            <Modal className="delete-person-modal" show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header className="border-0">
                    <Modal.Title>Remove person from organization</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove this person from the organization?
                    <Card style={{ width: '25vw' }} border='secondary' className="mx-auto my-3">
                        <Card.Body>
                            <Card.Title>{props.person.fname} {props.person.lname}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{props.person.pos}</Card.Subtitle>
                            <Card.Text>
                                {props.person.bio}
                            </Card.Text>
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

export default People;
