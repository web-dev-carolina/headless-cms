import React, { useState, useEffect } from "react";
import { Form, Container, Button, Modal, Breadcrumb } from "react-bootstrap";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Announcements from './Announcements.jsx';
import '../../styles/Testimonials.css';

const AnnouncementsPage = () => {
    const history = useHistory();
    const [announcements, setAnnouncements] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newInfo, setNewInfo] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newLink, setNewLink] = useState("");

    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get(process.env.REACT_APP_API_URL + "/announcements");
            const data = result.data;
            setAnnouncements(data);
        }
        fetchData();
    }, []);

    const showCreateModal = () => setShowCreate(true);
    const closeCreateModal = () => setShowCreate(false);
    const saveNewAnnouncement = async () => {
        const url = process.env.REACT_APP_API_URL + "/announcements";
        await Axios.post(url, {
            info: newInfo,
            date: newDate,
            title: newTitle,
            link: newLink
        })
        setShowCreate(false);
        history.replace('/dashboard');
        history.replace('/announcements');
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/projectselect" }}>Projects</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>Collections</Breadcrumb.Item>
                <Breadcrumb.Item active>Announcements</Breadcrumb.Item>
            </Breadcrumb>
            <Container className="home pt-3">
                <h3 className="text-center">Announcements collection:</h3>
                <Button variant="secondary" onClick={showCreateModal}>Add new announcement</Button>
                <div className="row" key="announcements">
                    {announcements.map(announcement => <Announcements announcement={announcement} key={announcement._id}/>)}
                </div>
            </Container>
            <Modal show={showCreate} onHide={closeCreateModal}>
                <Modal.Header className="border-0">
                    <Modal.Title>Create new announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Form.Group size="lg" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Spring Commencement"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="info">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                autoFocus
                                as="textarea"
                                rows={2}
                                placeholder="Excellent service. Will use again."
                                value={newInfo}
                                onChange={(e) => setNewInfo(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                placeholder="January 1, 2021"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="link">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John Doe"
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={closeCreateModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveNewAnnouncement}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AnnouncementsPage;