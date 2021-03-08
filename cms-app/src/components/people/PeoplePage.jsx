import React, { useState, useContext, useEffect } from "react";
import { Form, Container, Button, Modal, Row, Col, Breadcrumb } from "react-bootstrap";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import People from './People.jsx';
const PeoplePage = () => {
    const history = useHistory();
    const [people, setPeople] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newFname, setNewFname] = useState("");
    const [newLname, setNewLname] = useState("");
    const [newPos, setNewPos] = useState("");
    const [newBio, setNewBio] = useState("");

    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get(process.env.REACT_APP_API_URL + "/people");
            const data = result.data;
            setPeople(data);
        }
        fetchData();
    }, []);

    const showCreateModal = () => setShowCreate(true);
    const closeCreateModal = () => setShowCreate(false);
    const saveNewPerson = async () => {
        const url = process.env.REACT_APP_API_URL + "/people/";
        await Axios.post(url, {
            fname: newFname,
            lname: newLname,
            pos: newPos,
            bio: newBio
        })
        setShowCreate(false);
        history.replace('/dashboard');
        history.replace('/people');
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{to:"/projectselect"}}>Projects</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{to:"/dashboard"}}>Collections</Breadcrumb.Item>
                <Breadcrumb.Item active>People</Breadcrumb.Item>
            </Breadcrumb> 
            <Container className="home pt-3">
                <h3 className="text-center">People collection:</h3>
                <Button variant="secondary" onClick={showCreateModal}>Add new organization member</Button>
                <div className="row" key="people">
                    {people.map(person => <People person={person} key={person._id}/>)}
                </div>
            </Container>
            <Modal show={showCreate} onHide={closeCreateModal}>
                <Modal.Header className="border-0">
                    <Modal.Title>Create a new organization member</Modal.Title>
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
                                        placeholder="John"
                                        value={newFname}
                                        onChange={(e) => setNewFname(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group size="lg" controlId="lname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Doe"
                                        value={newLname}
                                        onChange={(e) => setNewLname(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group size="lg" controlId="pos">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="President"
                                value={newPos}
                                onChange={(e) => setNewPos(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Received his MBA from UNC Kenan-Flagler and is an avid bird-watcher."
                                value={newBio}
                                onChange={(e) => setNewBio(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={closeCreateModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveNewPerson}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PeoplePage;