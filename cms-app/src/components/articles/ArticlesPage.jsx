import React, { useState, useEffect } from "react";
import { Form, Container, Button, Modal, Breadcrumb } from "react-bootstrap";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Articles from './Articles.jsx';
import '../../styles/Articles.css';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const ArticlesPage = () => {
    const history = useHistory();
    const [articles, setArticles] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newBody, setNewBody] = useState("");
    const [newDate, setNewDate] = useState("");

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
            body: newBody,
            date: newDate,
            author: newAuthor
        }).then(res => console.log("article post: " + res));
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
                    {articles.map(article => <Articles article={article} />)}
                </div>
            </Container>
            <Modal show={showCreate} onHide={closeCreateModal}>
                <Modal.Header className="border-0">
                    <Modal.Title>Create new article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        <Form.Group size="lg" controlId="text">
                            <Form.Label>Article Body</Form.Label>
                            <Form.Control
                                autoFocus
                                as="textarea"
                                rows={3}
                                placeholder="Excellent service. Will use again."
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
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
                    <Button variant="primary" onClick={saveNewArticle}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ArticlesPage;