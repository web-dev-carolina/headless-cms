import React, { useState, useEffect } from "react";
import { Form, Container, Button, Modal, Breadcrumb } from "react-bootstrap";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Testimonials from './Testimonials.jsx';
import '../../styles/Testimonials.css';

const TestimonialsPage = () => {
    const history = useHistory();
    const [testimonials, setTestimonials] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newText, setNewText] = useState("");
    const [newAuthor, setNewAuthor] = useState("");

    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get(process.env.REACT_APP_API_URL + "/testimonials");
            const data = result.data;
            setTestimonials(data);
        }
        fetchData();
    }, []);

    const showCreateModal = () => setShowCreate(true);
    const closeCreateModal = () => setShowCreate(false);
    const saveNewTestimonial = async () => {
        const url = process.env.REACT_APP_API_URL + "/testimonials";
        await Axios.post(url, {
            text: newText,
            author: newAuthor
        })
        setShowCreate(false);
        history.replace('/dashboard');
        history.replace('/testimonials');
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{to:"/projectselect"}}>Projects</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{to:"/dashboard"}}>Collections</Breadcrumb.Item>
                <Breadcrumb.Item active>Testimonials</Breadcrumb.Item>
            </Breadcrumb> 
            <Container className="home pt-3">
                <h3 className="text-center">Testimonials collection:</h3>
                <Button variant="secondary" onClick={showCreateModal}>Add new testimonial</Button>
                <div className="row">
                    { testimonials.map(testimony => <Testimonials testimony={testimony} key={testimony._id}/>) }
                </div>
            </Container>
            <Modal show={showCreate} onHide={closeCreateModal}>
                <Modal.Header className="border-0">
                    <Modal.Title>Create new testimonial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Form.Group size="lg" controlId="text">
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                autoFocus
                                as="textarea"
                                rows={3}
                                placeholder="Excellent service. Will use again."
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John Doe"
                                value={newAuthor}
                                onChange={(e) => setNewAuthor(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={closeCreateModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveNewTestimonial}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TestimonialsPage;