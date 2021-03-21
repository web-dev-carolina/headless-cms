import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import { Container, Button, Form, Modal } from "react-bootstrap";
import '../../styles/TextContent.css';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import RichTextEditor from "react-rte";

const TextContent = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editDescription, setEditDescription] = useState(props.text.desc);
    const [editorState, setEditorState] = useState(RichTextEditor.createValueFromString(props.text.content, 'html'));
    const section = props.text.section;
    const history = useHistory();

    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleSaveEdit = async () => {
        const url = process.env.REACT_APP_API_URL + '/textContent/' + props.text._id;
        await Axios.put(url, {
            content: editorState.toString('html'),
            desc: editDescription,
            section
        })
        setShowEdit(false);
        history.replace('/dashboard');
        history.replace('/text');
    }

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleConfirmDelete = async () => {
        const url = process.env.REACT_APP_API_URL + '/textContent/' + props.text._id;
        await Axios.delete(url)
        setShowDelete(false);
        history.replace('/dashboard');
        history.replace('/text');
    }

    return (
        <>
            <div className="col-md-6 pt-3" >
                <Card style={{ width: '45vw' }} border='secondary'>
                    <Card.Body>
                        <Card.Text>  <div dangerouslySetInnerHTML={{ __html: props.text.content }} /> </Card.Text>
                        
                        <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{props.text.desc}</Card.Subtitle>
                        <Container className="card-buttons">
                            <Button onClick={handleShowEdit} variant="outline-primary" className="mr-2">Edit</Button>
                            <Button onClick={handleShowDelete} variant="outline-danger" className="ml-2">Delete</Button>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
            <Modal dialogClassName="edit-text-modal" show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header className="border-0">
                    <Modal.Title>Edit text block</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Form.Group size="lg" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <RichTextEditor
                                    value={editorState}
                                    onChange={val => setEditorState(val)}
                                />
                        </Form.Group>
                        <Form.Group size="lg" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
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
            <Modal className="delete-text-modal" show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header className="border-0">
                    <Modal.Title>Delete text block</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this text block?
                    
                    <Card style={{ width: '35vw' }} border='secondary' className="mx-auto my-3">
                    <Card.Body>
                        <Card.Text> {props.text.content} </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{props.text.desc}</Card.Subtitle>
                        
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

export default TextContent;
