import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import { Container, Button, Form, Modal, Col } from "react-bootstrap";
import '../../styles/Articles.css';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import RichTextEditor from "react-rte";

const Articles = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [editDate, setEditDate] = useState(props.article.date);
    const [editTitle, setEditTitle] = useState(props.article.title);
    const [editAuthor, setEditAuthor] = useState(props.article.author);
    const [editorState, setEditorState] = useState(RichTextEditor.createValueFromString(props.article.body, 'html'));
    const history = useHistory();

    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleSaveEdit = async () => {
        const url = process.env.REACT_APP_API_URL + '/articles/' + props.article._id;
        await Axios.put(url, {
            title: editTitle,
            body: editorState.toString('html'),
            date: editDate,
            author: editAuthor,
            image: ""
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
            <div className="mx-2 pt-3" >
                <Card style={{ width: '40vw' }} border='secondary'>
                    <Card.Body>
                        <Card.Text>
                            <span className="article-title">
                                {props.article.title}
                            </span>
                            <br />
                            <span className="article-author-date">
                                {props.article.author + " - "}
                            </span>
                            <span className="article-author-date">
                                {props.article.date}
                            </span>
                            <br /><br />
                            <div dangerouslySetInnerHTML={{ __html: props.article.body }} />
                        </Card.Text>
                        <Container className="card-buttons">
                            <Button onClick={handleShowEdit} variant="outline-primary" className="mr-2">Edit</Button>
                            <Button onClick={handleShowDelete} variant="outline-danger" className="ml-2">Delete</Button>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
            <Modal dialogClassName="edit-article-modal" show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header className="border-0">
                    <Modal.Title>Edit article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mx-5">

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
                                <RichTextEditor
                                    value={editorState}
                                    onChange={val => setEditorState(val)}
                                />
                            </Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Group size="lg" controlId="author">
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Benjamin Franklin"
                                            value={editAuthor}
                                            onChange={(e) => setEditAuthor(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group size="lg" controlId="date">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="November 83, 1609"
                                            value={editDate}
                                            onChange={(e) => setEditDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
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
            <Modal dialogClassName="delete-article-modal" show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header className="border-0">
                    <Modal.Title>Delete article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this article?
                    <Card style={{ width: '50vw' }} border='secondary' className="mx-auto my-3">
                        <Card.Body>
                            <Card.Text>
                                <span className="article-title">
                                    {props.article.title}
                                </span>
                                <br />
                                <span className="article-author-date">
                                    {props.article.author + " - "}
                                </span>
                                <span className="article-author-date">
                                    {props.article.date}
                                </span>
                                <br /><br />
                                <div dangerouslySetInnerHTML={{ __html: props.article.body }} />
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

export default Articles;
