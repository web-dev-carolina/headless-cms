import React, { useState, useEffect } from "react";
import { Form, Container, Button, Modal, Breadcrumb } from "react-bootstrap";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import TextContent from './TextContent.jsx';
import '../../styles/TextContent.css';
import RichTextEditor from "react-rte";

const TextContentPage = () => {
    const history = useHistory();
    const [textContent, setTextContent] = useState([]);
    const [textAreas, setTextAreas] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newContent, setNewContent] = useState("");
    const [newSection, setNewSection] = useState("");
    const [editorState, setEditorState] = useState(RichTextEditor.createValueFromString("", 'html'));
    const [newDescription, setNewDescription] = useState("");


    useEffect(() => {
        async function fetchData() {
            const contentRes = await Axios.get(process.env.REACT_APP_API_URL + "/textContent");
            setTextContent(contentRes.data);
            const areasRes = await Axios.get(process.env.REACT_APP_API_URL + "/textContent/sections");
            if (areasRes.data[0] !== undefined) {
                setTextAreas(areasRes.data[0].sections);
            }
        }
        fetchData();
    }, []);

    const showCreateModal = () => setShowCreate(true);
    const closeCreateModal = () => setShowCreate(false);
    const saveNewBlock = async () => {
        const url = process.env.REACT_APP_API_URL + "/textContent";
        await Axios.post(url, {
            content: newContent,
            section: newSection,
            desc: newDescription
        })
        setShowCreate(false);
        history.replace('/dashboard');
        history.replace('/text');
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/projectselect" }}>Projects</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>Collections</Breadcrumb.Item>
                <Breadcrumb.Item active>Text Content</Breadcrumb.Item>
            </Breadcrumb>
            <Container className="home pt-3">
                <h3 className="text-center">Text content collection:</h3>
                <Button variant="secondary" onClick={showCreateModal} className="mb-3">Add new text block</Button>
                {textAreas.map(area =>
                    <div key={area}>
                        <div className="row" key={area + "-title"}>
                            <h4 className="m-0">{area}</h4>
                        </div>
                        <div className="row mb-3" key={area + "-list"}>
                            {textContent.filter(t => t.section === area).map(text => <TextContent text={text} key={text._id} />)}
                        </div>
                    </div>)}
            </Container>
            <Modal show={showCreate} onHide={closeCreateModal} dialogClassName="write-text-modal">
                <Modal.Header className="border-0">
                    <Modal.Title>Create new text block</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Form.Group size="lg" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <RichTextEditor
                                value={editorState}
                                onChange={val => setEditorState(val)}
                            />
                            <Form.Control
                                autoFocus
                                as="textarea"
                                rows={3}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nibh tortor, interdum quis feugiat nec, volutpat non tellus. Aenean rutrum vitae ex in tristique."
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Description of where the text is within its section on the site so that it is easy to identify."
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="section">
                            <Form.Label>Section</Form.Label>
                            <Form.Control
                                as="select"
                                value={newSection}
                                onChange={(e) => setNewSection(e.target.value)}
                            >
                                {textAreas.map(a =>
                                    <option>{a}</option>
                                )}
                            </Form.Control>
                            <Form.Text muted>You must click on a section for it to save</Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={closeCreateModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveNewBlock}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TextContentPage;