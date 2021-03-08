import React, { useState, useEffect } from "react";
import { Form, Container, Button, Modal, Breadcrumb, Col } from "react-bootstrap";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Articles from './Articles.jsx';
import '../../styles/Articles.css';
import RichTextEditor from "react-rte";



const ArticlesPage = () => {
    const history = useHistory();
    const [articles, setArticles] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newDate, setNewDate] = useState("");
    const [editorState, setEditorState] = useState(RichTextEditor.createEmptyValue());

    useEffect(() => {
        async function fetchData() {
            const result = await Axios.get(process.env.REACT_APP_API_URL + "/articles");
            const data = result.data;
            setArticles(data);
        }
        fetchData();
    }, []);

    const showCreateModal = () => setShowCreate(true);
    const closeCreateModal = () => setShowCreate(false);
    const saveNewArticle = async () => {
        const url = process.env.REACT_APP_API_URL + "/articles";
        await Axios.post(url, {
            title: newTitle,
            body: editorState.toString('html'),
            date: newDate,
            author: newAuthor
        });
        setShowCreate(false);
        history.replace('/dashboard');
        history.replace('/articles');
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/projectselect" }}>Projects</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>Collections</Breadcrumb.Item>
                <Breadcrumb.Item active>Articles</Breadcrumb.Item>
            </Breadcrumb>
            <Container className="home pt-3">
                <h3 className="text-center">Articles collection:</h3>
                <Button variant="secondary" onClick={showCreateModal}>Add new article</Button>
                <div className="row" key="articles">
                    {articles.map(article => <Articles article={article} key={article._id} />)}
                </div>
            </Container>
            <Modal dialogClassName="write-article-modal" show={showCreate} onHide={closeCreateModal}>
                <Modal.Header className="border-0">
                    <Modal.Title>Create new article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mx-5">
                        <Form>
                            <Form.Group size="lg" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    placeholder="Lebron scores his 40,000th point"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
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
                                            placeholder="Adrian Wojnarowski"
                                            value={newAuthor}
                                            onChange={(e) => setNewAuthor(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group size="lg" controlId="date">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="November 24, 2024"
                                            value={newDate}
                                            onChange={(e) => setNewDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button variant="secondary" onClick={closeCreateModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={saveNewArticle}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ArticlesPage;