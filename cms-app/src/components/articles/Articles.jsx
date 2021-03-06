import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import { Container, Button, Form, Modal } from "react-bootstrap";
import '../../styles/Articles.css';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Articles = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editBody, setEditBody] = useState(props.article.body);
    const [editDate, setEditDate] = useState(props.article.date);
    const [editTitle, setEditTitle] = useState(props.article.title);
    const [editAuthor, setEditAuthor] = useState(props.article.author);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const history = useHistory();

    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleSaveEdit = async () => {
        const url = process.env.REACT_APP_API_URL + '/articles/' + props.article._id;
        await Axios.put(url, {
            title: editTitle,
            body: editBody,
            date: editDate,
            author: editAuthor
        })
        setShowEdit(false);
        history.replace('/dashboard');
        history.replace('/articles');
    }

    const handleShowDelete = () => setShowDelete(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleConfirmDelete = async () => {
        const url = process.env.REACT_APP_API_URL + '/articles/' + props.article._id;
        await Axios.delete(url)
        setShowDelete(false);
        history.replace('/dashboard');
        history.replace('/articles');
    }

    return (
        <>
            <div className="col-md-4 pt-3" key={props.article._id}>
                <Card style={{ width: '25vw' }} border='secondary'>
                    <Card.Body>
                        <Card.Text>
                            <span className="article-title">
                                {props.article.title}
                            </span>
                            <span className="article-author">
                                {props.article.author}
                            </span>
                            {props.article.date}
                            <br></br>
                            {props.article.body}
                            <br></br>
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
                        <Form.Group size="lg" controlId="body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                value={editBody}
                                onChange={(e) => setEditBody(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Benjamin Franklin"
                                value={editAuthor}
                                onChange={(e) => setEditAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="date">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="November 83, 1609"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                            />
                        </Form.Group>
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={setEditorState(editorState)}
                        />;
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
                                <span className="article-title">
                                    {props.article.title}
                                </span>
                                <span className="article-author">
                                    {props.article.author}
                                </span>
                                {props.article.date}
                                <br></br>
                                {props.article.body}
                                <br></br>
                            </Card.Text>
                            <Card.Subtitle className="mb-2 text-muted" style={{ fontWeight: 'normal' }}>{props.article.date}</Card.Subtitle>
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

export default Articles;
