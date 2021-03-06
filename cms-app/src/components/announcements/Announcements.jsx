import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import { Container, Button, Form, Modal } from "react-bootstrap";
import '../../styles/Announcements.css';
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Announcements = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editInfo, setEditInfo] = useState(props.announcement.info);
    const [editDate, setEditDate] = useState(props.announcement.date);
    const [editTitle, setEditTitle] = useState(props.announcement.title);
    const [editLink, setEditLink] = useState(props.announcement.link);
    const history = useHistory();

    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleSaveEdit = async () => {
        const url = process.env.REACT_APP_API_URL + '/announcements/' + props.announcement._id;
        await Axios.put(url, {
            title: editTitle,
            info: editInfo,
            date: editDate,
            link: editLink
        })
        setShowEdit(false);
        history.replace('/dashboard');
        history.replace('/announcements');
    }

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleConfirmDelete = async () => {
        const url = process.env.REACT_APP_API_URL + '/announcements/' + props.announcement._id;
        await Axios.delete(url)
        setShowDelete(false);
        history.replace('/dashboard');
        history.replace('/announcements');
    }

    const getLink = () => {
        let hostname;
        if (editLink.indexOf("//") > -1) {
            hostname = editLink.split('/')[2];
        }
        else {
            hostname = editLink.split('/')[0];
        }
        hostname = hostname.split(':')[0];
        hostname = hostname.split('?')[0];

        let splitArr = hostname.split('.');
        let arrLen = splitArr.length;
        if (arrLen > 2) {
            hostname = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
            if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
                hostname = splitArr[arrLen - 3] + '.' + hostname;
            }
        }
        return hostname;
    }

    return (
        <>
            <div className="col-md-4 pt-3" key={props.announcement._id}>
                <Card style={{ width: '25vw' }} border='secondary'>
                    <Card.Body>
                        <Card.Text>
                            <span className="announcement-title">
                                {editTitle}
                            </span>
                            <br></br>
                            {editInfo}
                            <br></br>
                            <a href={editLink}>{getLink()}</a>
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{editDate}</Card.Subtitle>
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
                        <Form.Group size="lg" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                placeholder="Spring Commencement"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="info">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Excellent service. Will use again."
                                value={editInfo}
                                onChange={(e) => setEditInfo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="January 1, 2021"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="link">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John Doe"
                                value={editLink}
                                onChange={(e) => setEditLink(e.target.value)}
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
                                <span className="announcement-title">
                                    {props.announcement.title}
                                </span>
                                <br></br>
                                {props.announcement.info}
                                <br></br>
                                <a href={props.announcement.link}>{getLink()}</a>
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{props.announcement.date}</Card.Subtitle>
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

export default Announcements;
